import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  DemoRepositoryPort,
  CreateDemoRequestData,
  DemoRequestWithRelations,
  SaveProposalData,
} from '../../../domain/ports/demo-repository.port';
import { DemoProposalOrmEntity } from '../entities/demo-proposal.orm-entity';
import { DemoRequest } from '../../../domain/demo-request';
import { DemoRequestOrmEntity } from '../entities/demo-request.orm-entity';
import { DemoTemplateSelectionOrmEntity } from '../entities/demo-template-selection.orm-entity';
import { DemoRequestMapper } from '../mappers/demo-request.mapper';

@Injectable()
export class TypeOrmDemoRepository extends DemoRepositoryPort {
  constructor(
    @InjectRepository(DemoRequestOrmEntity)
    private readonly requestRepo: Repository<DemoRequestOrmEntity>,
    @InjectRepository(DemoTemplateSelectionOrmEntity)
    private readonly selectionRepo: Repository<DemoTemplateSelectionOrmEntity>,
    @InjectRepository(DemoProposalOrmEntity)
    private readonly proposalRepo: Repository<DemoProposalOrmEntity>,
    private readonly dataSource: DataSource,
  ) {
    super();
  }

  async create(data: CreateDemoRequestData): Promise<DemoRequest> {
    return this.dataSource.transaction(async (manager) => {
      // 1. Create demo_request
      const requestEntity = manager.create(DemoRequestOrmEntity, {
        catalogBookId: String(data.catalogBookId),
        catalogBookVariantId: String(data.catalogBookVariantId),
        personalizedCategoryId: String(data.personalizedCategoryId),
        personalizedModelId: String(data.personalizedModelId),
        customerFullName: data.customerFullName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        shippingAddressLine1: data.shippingAddressLine1,
        shippingAddressLine2: data.shippingAddressLine2 ?? null,
        shippingCity: data.shippingCity ?? null,
        shippingRegion: data.shippingRegion ?? null,
        shippingReference: data.shippingReference ?? null,
        deliveryDate: data.deliveryDate,
        wantsCustomDedication: data.wantsCustomDedication,
        dedicationText: data.dedicationText ?? null,
        messageOptional: data.messageOptional ?? null,
        status: 'RECEIVED',
      });
      const savedRequest = await manager.save(DemoRequestOrmEntity, requestEntity);

      // 2. Create demo_template_selections (max 3)
      for (const templateId of data.templateIds.slice(0, 3)) {
        const selection = manager.create(DemoTemplateSelectionOrmEntity, {
          demoRequestId: savedRequest.id,
          templateId: String(templateId),
        });
        await manager.save(DemoTemplateSelectionOrmEntity, selection);
      }

      // 3. Create demo_request_assets
      for (const assetId of data.assetIds) {
        await manager.query(
          `INSERT INTO demo_request_assets (demo_request_id, asset_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [savedRequest.id, assetId],
        );
      }

      return DemoRequestMapper.toDomain(savedRequest);
    });
  }

  async findAll(): Promise<DemoRequest[]> {
    const entities = await this.requestRepo.find({
      order: { createdAt: 'DESC' },
    });
    return entities.map(DemoRequestMapper.toDomain);
  }

  async findById(id: number): Promise<DemoRequestWithRelations | null> {
    const entity = await this.requestRepo.findOne({
      where: { id: String(id) },
    });
    if (!entity) return null;

    // JOIN con personalized_templates para obtener nombre y preview key
    const selectionRows: { id: string; template_id: string; template_name: string | null; template_preview_key: string | null }[] =
      await this.dataSource.query(
        `SELECT dts.id, dts.template_id, pt.name AS template_name, pt.template_preview_key
         FROM demo_template_selections dts
         LEFT JOIN personalized_templates pt ON pt.id = dts.template_id
         WHERE dts.demo_request_id = $1`,
        [id],
      );

    const assetRows: { asset_id: string }[] = await this.dataSource.query(
      `SELECT asset_id FROM demo_request_assets WHERE demo_request_id = $1`,
      [id],
    );

    const proposals = await this.proposalRepo.find({
      where: { demoRequestId: String(id) },
    });

    const base = DemoRequestMapper.toDomain(entity);
    return {
      ...base,
      templateSelections: selectionRows.map((s) => ({
        id: Number(s.id),
        templateId: Number(s.template_id),
        templateName: s.template_name,
        templatePreviewKey: s.template_preview_key,
      })),
      assetIds: assetRows.map((r) => Number(r.asset_id)),
      proposals: proposals.map((p) => ({
        id: Number(p.id),
        templateId: Number(p.templateId),
        outputStorageKey: p.outputStorageKey,
        protectionMode: p.protectionMode,
      })),
    };
  }

  async saveProposal(data: SaveProposalData): Promise<{ id: number }> {
    const entity = this.proposalRepo.create({
      demoRequestId: String(data.demoRequestId),
      templateId: String(data.templateId),
      outputStorageKey: data.outputStorageKey,
      protectionMode: data.protectionMode,
      isWatermarked: data.isWatermarked,
      generatedByUserId: data.generatedByUserId ? String(data.generatedByUserId) : null,
    });
    const saved = await this.proposalRepo.save(entity);
    return { id: Number(saved.id) };
  }

  async deleteProposal(proposalId: number, demoRequestId: number): Promise<string> {
    const proposal = await this.proposalRepo.findOne({
      where: { id: String(proposalId), demoRequestId: String(demoRequestId) },
    });
    if (!proposal) throw new Error('Propuesta no encontrada');
    const storageKey = proposal.outputStorageKey;
    await this.proposalRepo.delete(String(proposalId));
    return storageKey;
  }

  async updateStatus(id: number, status: string): Promise<void> {
    await this.requestRepo.update(String(id), { status });
  }
}
