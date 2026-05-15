import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  PhotobookRepositoryPort, PhotobookThemeRecord, PhotobookProductRecord,
  CreateProjectData, ProjectRecord, ProjectDetailRecord, RenderRecord,
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
    const entities = await this.productRepo.find({ where: { isActive: true } });
    return entities.map((e) => ({ id: Number(e.id), name: e.name, pricePerPageCents: Number(e.pricePerPageCents), minPages: e.minPages, currency: e.currency, allowsCustomDimensions: e.allowsCustomDimensions }));
  }

  async getProduct(id: number): Promise<PhotobookProductRecord | null> {
    const e = await this.productRepo.findOne({ where: { id: String(id) } });
    return e ? { id: Number(e.id), name: e.name, pricePerPageCents: Number(e.pricePerPageCents), minPages: e.minPages, currency: e.currency, allowsCustomDimensions: e.allowsCustomDimensions } : null;
  }

  async createProject(data: CreateProjectData): Promise<ProjectRecord> {
    return this.dataSource.transaction(async (manager) => {
      const pageCount = data.pages.length;
      const total = data.pricePerPageCents * pageCount;

      const project = manager.create(PhotobookProjectOrmEntity, {
        photobookProductId: String(data.photobookProductId),
        photobookThemeId: String(data.photobookThemeId),
        customerEmail: data.customerEmail,
        customerFullName: data.customerFullName,
        customerPhone: data.customerPhone,
        deliveryAddress: data.deliveryAddress,
        deliveryDistrict: data.deliveryDistrict ?? null,
        coverTitle: data.coverTitle ?? null,
        customerDni: data.customerDni ?? null,
        customWidthCm: data.customWidthCm ?? null,
        customHeightCm: data.customHeightCm ?? null,
        status: 'CONFIRMED',
        pricePerPageCents: String(data.pricePerPageCents),
        pageCount,
        calculatedTotalCents: String(total),
      });
      const savedProject = await manager.save(PhotobookProjectOrmEntity, project);

      // Pages + slots
      for (const pageData of data.pages) {
        const page = manager.create(PhotobookPageOrmEntity, {
          projectId: savedProject.id,
          pageNumber: pageData.pageNumber,
          layoutKey: pageData.layoutKey,
        });
        const savedPage = await manager.save(PhotobookPageOrmEntity, page);

        for (const slotData of pageData.slots) {
          const slot = manager.create(PhotobookPageSlotOrmEntity, {
            pageId: savedPage.id,
            assetId: String(slotData.assetId),
            slotIndex: slotData.slotIndex,
          });
          await manager.save(PhotobookPageSlotOrmEntity, slot);
        }
      }

      // Project assets
      for (const assetId of data.assetIds) {
        await manager.query(
          `INSERT INTO photobook_project_assets (project_id, asset_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [savedProject.id, assetId],
        );
      }

      return this.toProjectRecord(savedProject);
    });
  }

  async findAllProjects(): Promise<ProjectRecord[]> {
    const entities = await this.projectRepo.find({ order: { createdAt: 'DESC' } });
    return entities.map((e) => this.toProjectRecord(e));
  }

  async findProjectById(id: number): Promise<ProjectDetailRecord | null> {
    const project = await this.projectRepo.findOne({ where: { id: String(id) } });
    if (!project) return null;

    const pages = await this.pageRepo.find({ where: { projectId: String(id) }, order: { pageNumber: 'ASC' } });
    const pagesWithSlots = [];
    for (const page of pages) {
      const slots = await this.slotRepo.find({ where: { pageId: page.id }, order: { slotIndex: 'ASC' } });
      pagesWithSlots.push({
        id: Number(page.id),
        pageNumber: page.pageNumber,
        layoutKey: page.layoutKey,
        slots: slots.map((s) => ({ slotIndex: s.slotIndex, assetId: Number(s.assetId) })),
      });
    }

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
      customerEmail: e.customerEmail, customerFullName: e.customerFullName, customerPhone: e.customerPhone,
      deliveryAddress: e.deliveryAddress, deliveryDistrict: e.deliveryDistrict, coverTitle: e.coverTitle,
      customerDni: e.customerDni, customWidthCm: e.customWidthCm ? Number(e.customWidthCm) : null, customHeightCm: e.customHeightCm ? Number(e.customHeightCm) : null,
      status: e.status, pricePerPageCents: Number(e.pricePerPageCents), pageCount: e.pageCount,
      calculatedTotalCents: Number(e.calculatedTotalCents), currency: e.currency, createdAt: e.createdAt,
    };
  }
}
