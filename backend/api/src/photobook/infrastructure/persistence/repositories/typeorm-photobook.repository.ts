import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import {
  PhotobookRepositoryPort, PhotobookThemeRecord, PhotobookProductRecord,
  CreateProjectData, ProjectRecord, ProjectDetailRecord, RenderRecord, DraftInput, DraftRecord,
} from '../../../domain/ports/photobook-repository.port';
import { PhotobookThemeOrmEntity } from '../entities/photobook-theme.orm-entity';
import { PhotobookProductOrmEntity } from '../entities/photobook-product.orm-entity';
import { PhotobookProjectOrmEntity } from '../entities/photobook-project.orm-entity';
import { PhotobookPageOrmEntity } from '../entities/photobook-page.orm-entity';
import { PhotobookPageSlotOrmEntity } from '../entities/photobook-page-slot.orm-entity';
import { PhotobookRenderOrmEntity } from '../entities/photobook-render.orm-entity';

@Injectable()
export class TypeOrmPhotobookRepository extends PhotobookRepositoryPort {
  constructor(
    @InjectRepository(PhotobookThemeOrmEntity) private readonly themeRepo: Repository<PhotobookThemeOrmEntity>,
    @InjectRepository(PhotobookProductOrmEntity) private readonly productRepo: Repository<PhotobookProductOrmEntity>,
    @InjectRepository(PhotobookProjectOrmEntity) private readonly projectRepo: Repository<PhotobookProjectOrmEntity>,
    @InjectRepository(PhotobookPageOrmEntity) private readonly pageRepo: Repository<PhotobookPageOrmEntity>,
    @InjectRepository(PhotobookPageSlotOrmEntity) private readonly slotRepo: Repository<PhotobookPageSlotOrmEntity>,
    @InjectRepository(PhotobookRenderOrmEntity) private readonly renderRepo: Repository<PhotobookRenderOrmEntity>,
    private readonly dataSource: DataSource,
  ) { super(); }

  async listThemes(): Promise<PhotobookThemeRecord[]> {
    const entities = await this.themeRepo.find({ where: { isActive: true }, order: { name: 'ASC' } });
    return entities.map((e) => ({ id: Number(e.id), name: e.name, coverPreviewKey: e.coverPreviewKey, coverTemplateKey: e.coverTemplateKey, backCoverKey: e.backCoverKey, isActive: e.isActive }));
  }

  async getTheme(id: number): Promise<PhotobookThemeRecord | null> {
    const e = await this.themeRepo.findOne({ where: { id: String(id) } });
    return e ? { id: Number(e.id), name: e.name, coverPreviewKey: e.coverPreviewKey, coverTemplateKey: e.coverTemplateKey, backCoverKey: e.backCoverKey, isActive: e.isActive } : null;
  }

  async listProducts(): Promise<PhotobookProductRecord[]> {
    const entities = await this.productRepo.find({ where: { isActive: true }, order: { id: 'ASC' } });
    return entities.map((e) => ({ id: Number(e.id), name: e.name, pricePerPageCents: Number(e.pricePerPageCents), minPages: e.minPages, currency: e.currency, allowsCustomDimensions: e.allowsCustomDimensions }));
  }

  async getProduct(id: number): Promise<PhotobookProductRecord | null> {
    const e = await this.productRepo.findOne({ where: { id: String(id) } });
    return e ? { id: Number(e.id), name: e.name, pricePerPageCents: Number(e.pricePerPageCents), minPages: e.minPages, currency: e.currency, allowsCustomDimensions: e.allowsCustomDimensions } : null;
  }

  async createProject(data: CreateProjectData): Promise<ProjectRecord> {
    return this.dataSource.transaction(async (manager) => {
      const project = manager.create(PhotobookProjectOrmEntity, {
        ...this.projectFieldsFromData(data),
        status: 'CONFIRMED',
      });
      const savedProject = await manager.save(PhotobookProjectOrmEntity, project);
      await this.insertPagesSlotsAssets(manager, savedProject.id, data);
      return this.toProjectRecord(savedProject);
    });
  }

  async createDraft(input: DraftInput): Promise<DraftRecord> {
    const project = this.projectRepo.create({
      photobookProductId: String(input.photobookProductId),
      photobookThemeId: String(input.photobookThemeId),
      status: 'DRAFT',
      draftState: input.state,
      pricePerPageCents: '0',
    });
    const saved = await this.projectRepo.save(project);
    return { id: Number(saved.id), draftToken: saved.draftToken, status: saved.status, state: saved.draftState };
  }

  async updateDraftState(draftToken: string, state: Record<string, unknown>): Promise<boolean> {
    const result = await this.projectRepo.update({ draftToken, status: 'DRAFT' }, { draftState: state });
    return (result.affected ?? 0) > 0;
  }

  async findDraftByToken(draftToken: string): Promise<DraftRecord | null> {
    // Sin filtro de status a propósito: si el token ya fue confirmado, el
    // servicio necesita saberlo para mandar al cliente a pagar en vez de
    // mostrarle un editor vacío.
    const e = await this.projectRepo.findOne({ where: { draftToken } });
    return e ? { id: Number(e.id), draftToken: e.draftToken, status: e.status, state: e.draftState } : null;
  }

  async confirmDraft(draftToken: string, data: CreateProjectData): Promise<ProjectRecord | null> {
    return this.dataSource.transaction(async (manager) => {
      const existing = await manager.findOne(PhotobookProjectOrmEntity, { where: { draftToken, status: 'DRAFT' } });
      if (!existing) return null;

      manager.merge(PhotobookProjectOrmEntity, existing, {
        ...this.projectFieldsFromData(data),
        status: 'CONFIRMED',
        draftState: null,
      });
      const savedProject = await manager.save(PhotobookProjectOrmEntity, existing);
      await this.insertPagesSlotsAssets(manager, savedProject.id, data);
      return this.toProjectRecord(savedProject);
    });
  }

  private projectFieldsFromData(data: CreateProjectData) {
    return {
      photobookProductId: String(data.photobookProductId),
      photobookThemeId: String(data.photobookThemeId),
      customerEmail: data.customerEmail,
      customerFullName: data.customerFullName,
      customerPhone: data.customerPhone,
      deliveryAddress: data.deliveryAddress,
      deliveryDistrict: data.deliveryDistrict ?? null,
      deliveryCity: data.deliveryCity ?? null,
      deliveryDepartment: data.deliveryDepartment ?? null,
      deliveryRegion: data.deliveryRegion ?? null,
      desiredDeliveryDate: data.desiredDeliveryDate ?? null,
      coverTitle: data.coverTitle ?? null,
      customerDni: data.customerDni ?? null,
      customWidthCm: data.customWidthCm ?? null,
      customHeightCm: data.customHeightCm ?? null,
      coverType: data.coverType,
      pricePerPageCents: String(data.pricePerPageCents),
      rushFeeCents: String(data.rushFeeCents),
      pageCount: data.pages.length,
      calculatedTotalCents: String(data.calculatedTotalCents),
    };
  }

  private async insertPagesSlotsAssets(
    manager: import('typeorm').EntityManager,
    projectId: string,
    data: CreateProjectData,
  ): Promise<void> {
    for (const pageData of data.pages) {
      const page = manager.create(PhotobookPageOrmEntity, {
        projectId,
        pageNumber: pageData.pageNumber,
        layoutKey: pageData.layoutKey,
      });
      const savedPage = await manager.save(PhotobookPageOrmEntity, page);

      for (const slotData of pageData.slots) {
        const slot = manager.create(PhotobookPageSlotOrmEntity, {
          pageId: savedPage.id,
          assetId: String(slotData.assetId),
          slotIndex: slotData.slotIndex,
          cropData: slotData.cropData ?? null,
        });
        await manager.save(PhotobookPageSlotOrmEntity, slot);
      }
    }

    for (const assetId of data.assetIds) {
      await manager.query(
        `INSERT INTO photobook_project_assets (project_id, asset_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [projectId, assetId],
      );
    }
  }

  async findAllProjects(): Promise<ProjectRecord[]> {
    const entities = await this.projectRepo.find({ order: { createdAt: 'DESC' } });
    return entities.map((e) => this.toProjectRecord(e));
  }

  async findProjectById(id: number): Promise<ProjectDetailRecord | null> {
    const project = await this.projectRepo.findOne({ where: { id: String(id) } });
    if (!project) return null;

    const pages = await this.pageRepo.find({ where: { projectId: String(id) }, order: { pageNumber: 'ASC' } });
    const pageIds = pages.map((page) => page.id);
    const allSlots = pageIds.length
      ? await this.slotRepo.find({ where: { pageId: In(pageIds) }, order: { slotIndex: 'ASC' } })
      : [];
    const slotsByPageId = new Map<string, PhotobookPageSlotOrmEntity[]>();
    for (const slot of allSlots) {
      const bucket = slotsByPageId.get(slot.pageId);
      if (bucket) bucket.push(slot); else slotsByPageId.set(slot.pageId, [slot]);
    }
    const pagesWithSlots = pages.map((page) => ({
      id: Number(page.id),
      pageNumber: page.pageNumber,
      layoutKey: page.layoutKey,
      slots: (slotsByPageId.get(page.id) ?? []).map((s) => ({ slotIndex: s.slotIndex, assetId: Number(s.assetId), cropData: s.cropData as import('../../../domain/ports/photobook-repository.port').CropData | null })),
    }));

    const assetRows: { asset_id: string }[] = await this.dataSource.query(
      `SELECT asset_id FROM photobook_project_assets WHERE project_id = $1`, [id],
    );

    return {
      ...this.toProjectRecord(project),
      pages: pagesWithSlots,
      assetIds: assetRows.map((r) => Number(r.asset_id)),
    };
  }

  async updateProjectStatus(id: number, status: string): Promise<void> {
    await this.projectRepo.update(String(id), { status });
  }

  async saveRender(projectId: number, pdfStorageKey: string): Promise<void> {
    await this.dataSource.query(
      `INSERT INTO photobook_renders (project_id, pdf_storage_key)
       VALUES ($1, $2)
       ON CONFLICT (project_id) DO UPDATE SET pdf_storage_key = $2, generated_at = now()`,
      [projectId, pdfStorageKey],
    );
  }

  async findRenderByProjectId(projectId: number): Promise<RenderRecord | null> {
    const e = await this.renderRepo.findOne({ where: { projectId: String(projectId) } });
    return e ? { pdfStorageKey: e.pdfStorageKey, generatedAt: e.generatedAt } : null;
  }

  private toProjectRecord(e: PhotobookProjectOrmEntity): ProjectRecord {
    return {
      id: Number(e.id), photobookProductId: Number(e.photobookProductId), photobookThemeId: Number(e.photobookThemeId),
      draftToken: e.draftToken,
      customerEmail: e.customerEmail, customerFullName: e.customerFullName, customerPhone: e.customerPhone,
      deliveryAddress: e.deliveryAddress, deliveryDistrict: e.deliveryDistrict,
      deliveryCity: e.deliveryCity, deliveryDepartment: e.deliveryDepartment, deliveryRegion: e.deliveryRegion, desiredDeliveryDate: e.desiredDeliveryDate,
      coverTitle: e.coverTitle,
      customerDni: e.customerDni, customWidthCm: e.customWidthCm ? Number(e.customWidthCm) : null, customHeightCm: e.customHeightCm ? Number(e.customHeightCm) : null,
      status: e.status, coverType: e.coverType, pricePerPageCents: Number(e.pricePerPageCents), rushFeeCents: Number(e.rushFeeCents), pageCount: e.pageCount,
      calculatedTotalCents: Number(e.calculatedTotalCents), currency: e.currency, createdAt: e.createdAt,
    };
  }
}
