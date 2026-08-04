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
        deliveryDate: data.deliveryDate ?? null,
        wantsRush: data.wantsRush ?? false,
        packagePreference: data.packagePreference ?? 'STANDARD',
        wantsCustomDedication: data.wantsCustomDedication,
        dedicationText: data.dedicationText ?? null,
        recipientName: data.recipientName ?? null,
        recipientNickname: data.recipientNickname ?? null,
        dedicatorName: data.dedicatorName ?? null,
        genderDirection: data.genderDirection ?? null,
        characterMeta: data.characterMeta ?? null,
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

    // Obtener cover_type de la variante seleccionada
    const variantRows: { cover_type: string }[] = await this.dataSource.query(
      `SELECT cover_type FROM catalog_book_variants WHERE id = $1`,
      [entity.catalogBookVariantId],
    );
    const coverType = variantRows[0]?.cover_type ?? null;

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
      coverType,
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

  /** Upsert por (demo_request_id, template_id) — regenerar una propuesta ya
   * no requiere borrarla primero, la nueva generación pisa la fila existente
   * (y el archivo en storage, que vive en la misma key determinística). */
  async saveProposal(data: SaveProposalData): Promise<{ id: number }> {
    const [row] = await this.dataSource.query(
      `INSERT INTO demo_proposals
         (demo_request_id, template_id, output_storage_key, original_storage_key, protection_mode, is_watermarked, generated_by_user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (demo_request_id, template_id)
       DO UPDATE SET output_storage_key = $3, original_storage_key = $4, protection_mode = $5,
                      is_watermarked = $6, generated_by_user_id = $7, generated_at = now()
       RETURNING id`,
      [
        data.demoRequestId,
        data.templateId,
        data.outputStorageKey,
        data.originalStorageKey ?? null,
        data.protectionMode,
        data.isWatermarked,
        data.generatedByUserId,
      ],
    );
    return { id: Number(row.id) };
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

  async hasOrder(demoRequestId: number): Promise<boolean> {
    const [row] = await this.dataSource.query(
      `SELECT 1 FROM orders WHERE demo_request_id = $1 LIMIT 1`,
      [demoRequestId],
    );
    return !!row;
  }

  async deleteRequest(demoRequestId: number): Promise<void> {
    await this.dataSource.query(`DELETE FROM demo_request WHERE id = $1`, [demoRequestId]);
  }

  async updateStatus(id: number, status: string): Promise<void> {
    await this.requestRepo.update(String(id), { status });
  }

  async replaceAsset(demoRequestId: number, oldAssetId: number, newAssetId: number): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      // 1. Relación plana (demo_request_assets) — delete + insert en vez de UPDATE:
      // si el nuevo asset (por hash duplicado con otra foto de esta misma
      // solicitud) ya estaba vinculado, un UPDATE directo choca contra el
      // UNIQUE(demo_request_id, asset_id). ON CONFLICT DO NOTHING lo absorbe.
      await manager.query(
        `DELETE FROM demo_request_assets WHERE demo_request_id = $1 AND asset_id = $2`,
        [demoRequestId, oldAssetId],
      );
      await manager.query(
        `INSERT INTO demo_request_assets (demo_request_id, asset_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [demoRequestId, newAssetId],
      );

      // 2. character_meta — el mismo asset_id se repite anidado por persona
      // (papa.assetIds, mama.assetIds, recipient.assetIds, etc. según el modo),
      // no hay forma genérica de saber en qué rama está sin conocer el shape,
      // así que se recorre todo el JSON reemplazando el valor donde aparezca.
      const rows: { character_meta: unknown }[] = await manager.query(
        `SELECT character_meta FROM demo_request WHERE id = $1`,
        [demoRequestId],
      );
      const meta = rows[0]?.character_meta;
      if (meta) {
        const updated = replaceAssetIdDeep(meta, oldAssetId, newAssetId);
        await manager.query(`UPDATE demo_request SET character_meta = $1 WHERE id = $2`, [
          JSON.stringify(updated),
          demoRequestId,
        ]);
      }
    });
  }
}

function replaceAssetIdDeep(value: unknown, oldId: number, newId: number): unknown {
  if (Array.isArray(value)) {
    return value.map((v) => (v === oldId ? newId : replaceAssetIdDeep(v, oldId, newId)));
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
      out[key] = replaceAssetIdDeep(v, oldId, newId);
    }
    return out;
  }
  return value;
}
