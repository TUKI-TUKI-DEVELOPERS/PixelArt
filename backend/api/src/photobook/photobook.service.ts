import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { createHash, randomBytes, randomUUID } from 'crypto';
import { DataSource } from 'typeorm';
import { PhotobookRepositoryPort, CreateProjectData } from './domain/ports/photobook-repository.port';
import { calculatePhotobookRushFeeCents, calculatePhotobookTotalCents, isValidPhotobookCoverType } from './domain/services/photobook-pricing.service';
import { FileStoragePort } from '../assets/domain/ports/file-storage.port';
import { AssetRepositoryPort } from '../assets/domain/ports/asset-repository.port';
import { AssetsService } from '../assets/assets.service';
import { ImageGenerationPort } from '../personalized/domain/ports/image-generation.port';
import { buildCustomPhotobookCoverPrompt, CUSTOM_PHOTOBOOK_PROPOSAL_SIZE } from './domain/services/build-custom-photobook-cover-prompt';
import { GenerateCustomPhotobookCoverProposalDto } from './dto/generate-custom-photobook-cover-proposal.dto';
import { PhotobookPdfService } from './infrastructure/pdf/photobook-pdf.service';
import { OrdersService } from '../orders/orders.service';
import { PublicLinksService } from '../public-links/public-links.service';
import { EmailService } from '../email/email.service';
import { CreateCustomPhotobookRequestDto } from './dto/create-custom-photobook-request.dto';
import { RequestCustomPhotobookCoverAdjustmentDto } from './dto/request-custom-photobook-cover-adjustment.dto';
import { RedeemCustomPhotobookEditorCodeDto } from './dto/redeem-custom-photobook-editor-code.dto';

type OrderInfo = { orderId: number; totalAmountCents: number; paymentLink: { token: string; url: string; expiresAt: Date } };

type CustomPhotobookRequestRow = {
  id: string;
  status: string;
  occasion: string;
  requestedTheme: string;
  coverTitle: string | null;
  coverMode: string;
  brief: string;
  customerFullName: string;
  customerEmail: string;
  customerPhone: string;
  referenceAssetIds: string[] | number[];
  linkedPhotobookProjectId?: string | number | null;
  openCoverAdjustment?: {
    id: string | number;
    surface: 'FRONT_COVER' | 'BACK_COVER' | 'BOTH';
    message: string;
    createdAt: Date | string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
};

const ADMIN_NOTIFICATION_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'luccano5@hotmail.com';

@Injectable()
export class PhotobookService {
  private readonly logger = new Logger(PhotobookService.name);

  constructor(
    private readonly repo: PhotobookRepositoryPort,
    private readonly fileStorage: FileStoragePort,
    private readonly assetRepo: AssetRepositoryPort,
    private readonly assetsService: AssetsService,
    private readonly imageGeneration: ImageGenerationPort,
    private readonly ordersService: OrdersService,
    private readonly publicLinksService: PublicLinksService,
    private readonly emailService: EmailService,
    private readonly dataSource: DataSource,
    private readonly pdfService?: PhotobookPdfService,
  ) {}

  async listThemes() {
    const themes = await this.repo.listThemes();
    return themes.map((t) => ({
      id: t.id,
      name: t.name,
      coverPreviewUrl: this.fileStorage.getPublicUrl(t.coverPreviewKey),
      coverTemplateUrl: this.fileStorage.getPublicUrl(t.coverTemplateKey),
      backCoverUrl: t.backCoverKey ? this.fileStorage.getPublicUrl(t.backCoverKey) : null,
      isActive: t.isActive,
    }));
  }
  listProducts() { return this.repo.listProducts(); }
  listProjects() { return this.repo.findAllProjects(); }

  async createCustomRequest(data: CreateCustomPhotobookRequestDto) {
    const referenceSlots = data.referenceSlots;
    const expectedSlots = new Set(['FRONT_COVER:1', 'FRONT_COVER:2', 'BACK_COVER:1', 'BACK_COVER:2']);
    const submittedSlots = new Set(referenceSlots.map((slot) => `${slot.surface}:${slot.slotIndex}`));
    const referenceAssetIds = [...new Set(referenceSlots.map((slot) => slot.assetId))];
    if (referenceSlots.length !== 4 || submittedSlots.size !== 4 || referenceAssetIds.length !== 4 || [...expectedSlots].some((slot) => !submittedSlots.has(slot))) {
      throw new BadRequestException('Debes enviar dos fotos para tapa y dos fotos para contratapa');
    }

    const requestId = await this.dataSource.transaction(async (manager) => {
      if (referenceAssetIds.length > 0) {
        const assets: { id: string }[] = await manager.query(
          `SELECT id FROM assets WHERE id = ANY($1::bigint[])`,
          [referenceAssetIds],
        );
        if (assets.length !== referenceAssetIds.length) {
          throw new BadRequestException('Una o más imágenes de referencia no existen');
        }
      }

      const inserted: { id: string }[] = await manager.query(
        `INSERT INTO custom_photobook_requests
          (occasion, requested_theme, cover_title, cover_mode, brief, customer_full_name, customer_email, customer_phone)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id`,
        [
          data.occasion.trim(),
          data.requestedTheme.trim(),
          data.coverTitle?.trim() || null,
          data.coverMode,
          data.brief.trim(),
          data.customerFullName.trim(),
          data.customerEmail.trim().toLowerCase(),
          data.customerPhone.trim(),
        ],
      );

      for (const slot of referenceSlots) {
        await manager.query(
          `INSERT INTO custom_photobook_request_reference_assets (request_id, asset_id)
           VALUES ($1, $2)`,
          [inserted[0].id, slot.assetId],
        );
        await manager.query(
          `INSERT INTO custom_photobook_request_reference_slots (request_id, asset_id, surface, slot_index)
           VALUES ($1, $2, $3, $4)`,
          [inserted[0].id, slot.assetId, slot.surface, slot.slotIndex],
        );
      }

      return Number(inserted[0].id);
    });

    const request = await this.getCustomRequest(requestId);
    if (!request) throw new NotFoundException('Solicitud de photobook a medida no encontrada');

    try {
      const frontendBase = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
      await this.emailService.queue({
        eventType: 'NEW_PHOTOBOOK_REQUEST_TO_ADMIN',
        toEmail: ADMIN_NOTIFICATION_EMAIL,
        subject: 'PixelArt — Nueva solicitud de photobook a medida',
        payload: {
          customerName: request.customerFullName,
          adminUrl: `${frontendBase}/admin/photobooks/a-medida/${request.id}`,
        },
      });
    } catch (err) {
      this.logger.warn(`No se pudo encolar el aviso de solicitud a medida #${request.id}: ${(err as Error).message}`);
    }

    return request;
  }

  async listCustomRequests() {
    const rows: CustomPhotobookRequestRow[] = await this.dataSource.query(`
      SELECT
        r.id::text AS "id",
        r.status,
        r.occasion AS "occasion",
        r.requested_theme AS "requestedTheme",
        r.cover_title AS "coverTitle",
        r.cover_mode AS "coverMode",
        r.brief,
        r.customer_full_name AS "customerFullName",
        r.customer_email AS "customerEmail",
        r.customer_phone AS "customerPhone",
        COALESCE(array_agg(ra.asset_id) FILTER (WHERE ra.asset_id IS NOT NULL), '{}') AS "referenceAssetIds",
        r.created_at AS "createdAt",
        r.updated_at AS "updatedAt"
      FROM custom_photobook_requests r
      LEFT JOIN custom_photobook_request_reference_assets ra ON ra.request_id = r.id
      GROUP BY r.id
      ORDER BY r.created_at DESC
    `);
    return rows.map((row) => this.normalizeCustomRequest(row));
  }

  async getCustomRequest(id: number) {
    const rows: CustomPhotobookRequestRow[] = await this.dataSource.query(
      `SELECT
         r.id::text AS "id",
         r.status,
         r.occasion AS "occasion",
         r.requested_theme AS "requestedTheme",
         r.cover_title AS "coverTitle",
         r.cover_mode AS "coverMode",
         r.brief,
         r.customer_full_name AS "customerFullName",
         r.customer_email AS "customerEmail",
         r.customer_phone AS "customerPhone",
         r.linked_photobook_project_id::text AS "linkedPhotobookProjectId",
         (
           SELECT jsonb_build_object(
             'id', a.id,
             'surface', a.surface,
             'message', a.message,
             'createdAt', a.created_at
           )
           FROM custom_photobook_cover_adjustment_requests a
           WHERE a.request_id = r.id AND a.resolved_at IS NULL
           ORDER BY a.created_at DESC, a.id DESC
           LIMIT 1
         ) AS "openCoverAdjustment",
         COALESCE(array_agg(ra.asset_id) FILTER (WHERE ra.asset_id IS NOT NULL), '{}') AS "referenceAssetIds",
         r.created_at AS "createdAt",
         r.updated_at AS "updatedAt"
       FROM custom_photobook_requests r
       LEFT JOIN custom_photobook_request_reference_assets ra ON ra.request_id = r.id
       WHERE r.id = $1
       GROUP BY r.id`,
      [id],
    );
    return rows[0] ? this.normalizeCustomRequest(rows[0]) : null;
  }

  private normalizeCustomRequest(row: CustomPhotobookRequestRow) {
    return {
      ...row,
      id: Number(row.id),
      referenceAssetIds: (row.referenceAssetIds ?? []).map(Number),
      linkedPhotobookProjectId: row.linkedPhotobookProjectId === null || row.linkedPhotobookProjectId === undefined
        ? null
        : Number(row.linkedPhotobookProjectId),
    };
  }

  async listCustomReferenceAssets(requestId: number) {
    const rows: { asset_id: string; is_active: boolean; original_filename: string | null; storage_key: string; created_at: Date; surface: 'FRONT_COVER' | 'BACK_COVER' | null; slot_index: number | null }[] = await this.dataSource.query(
      `SELECT r.asset_id, r.is_active, a.original_filename, a.storage_key, r.created_at, s.surface, s.slot_index
       FROM custom_photobook_request_reference_assets r
       JOIN assets a ON a.id = r.asset_id
       LEFT JOIN custom_photobook_request_reference_slots s ON s.request_id = r.request_id AND s.asset_id = r.asset_id
       WHERE r.request_id = $1
       ORDER BY CASE s.surface WHEN 'FRONT_COVER' THEN 1 WHEN 'BACK_COVER' THEN 2 ELSE 3 END, s.slot_index ASC NULLS LAST, r.created_at ASC`,
      [requestId],
    );
    return rows.map((row) => ({
      assetId: Number(row.asset_id),
      isActive: Boolean(row.is_active),
      originalFilename: row.original_filename,
      surface: row.surface,
      slotIndex: row.slot_index === null ? null : Number(row.slot_index),
      url: this.fileStorage.getPublicUrl(row.storage_key),
      createdAt: row.created_at,
    }));
  }

  async addCustomReferenceAsset(
    requestId: number,
    file: { buffer: Buffer; originalFilename: string; mimeType: string },
  ) {
    const [request] = await this.dataSource.query(`SELECT id FROM custom_photobook_requests WHERE id = $1`, [requestId]) as { id: string }[];
    if (!request) throw new NotFoundException('Solicitud de photobook a medida no encontrada');

    const uploaded = await this.assetsService.uploadAsset({
      ...file,
      folder: 'uploads/photobooks',
    });
    await this.dataSource.transaction(async (manager) => {
      // Serializa altas concurrentes por solicitud para nunca superar cinco referencias.
      const lockedRequests: { id: string }[] = await manager.query(
        `SELECT id FROM custom_photobook_requests WHERE id = $1 FOR UPDATE`,
        [requestId],
      );
      if (!lockedRequests[0]) throw new NotFoundException('Solicitud de photobook a medida no encontrada');
      const [{ slot_count }] = await manager.query(
        `SELECT COUNT(*)::int AS slot_count FROM custom_photobook_request_reference_slots WHERE request_id = $1`,
        [requestId],
      ) as { slot_count: number }[];
      if (Number(slot_count) > 0) throw new BadRequestException('Esta solicitud usa cuatro posiciones fijas. Reemplaza una foto existente en lugar de agregar otra.');
      const [{ count }] = await manager.query(
        `SELECT COUNT(*)::int AS count FROM custom_photobook_request_reference_assets WHERE request_id = $1`,
        [requestId],
      ) as { count: number }[];
      if (Number(count) >= 5) throw new BadRequestException('Esta solicitud ya tiene el máximo de cinco fotos de trabajo');
      await manager.query(
        `INSERT INTO custom_photobook_request_reference_assets (request_id, asset_id, is_active)
         VALUES ($1, $2, true)
         ON CONFLICT (request_id, asset_id) DO UPDATE SET is_active = true`,
        [requestId, uploaded.id],
      );
      await this.invalidateCustomCoverPreparation(requestId, manager);
    });
    return { assetId: uploaded.id, url: uploaded.url, isActive: true };
  }

  async replaceCustomReferenceAsset(
    requestId: number,
    oldAssetId: number,
    file: { buffer: Buffer; originalFilename: string; mimeType: string },
  ) {
    const rows: { is_active: boolean; surface: 'FRONT_COVER' | 'BACK_COVER' | null; slot_index: number | null }[] = await this.dataSource.query(
      `SELECT r.is_active, s.surface, s.slot_index
       FROM custom_photobook_request_reference_assets r
       LEFT JOIN custom_photobook_request_reference_slots s ON s.request_id = r.request_id AND s.asset_id = r.asset_id
       WHERE r.request_id = $1 AND r.asset_id = $2`,
      [requestId, oldAssetId],
    );
    const existing = rows[0];
    if (!existing) throw new BadRequestException('Esa foto no pertenece a esta solicitud');

    const uploaded = await this.assetsService.uploadAsset({
      ...file,
      folder: 'uploads/photobooks',
    });
    await this.dataSource.transaction(async (manager) => {
      await manager.query(
        `DELETE FROM custom_photobook_request_reference_slots
         WHERE request_id = $1 AND asset_id = $2`,
        [requestId, oldAssetId],
      );
      await manager.query(
        `DELETE FROM custom_photobook_request_reference_assets
         WHERE request_id = $1 AND asset_id = $2`,
        [requestId, oldAssetId],
      );
      await manager.query(
        `INSERT INTO custom_photobook_request_reference_assets (request_id, asset_id, is_active)
         VALUES ($1, $2, $3)
         ON CONFLICT (request_id, asset_id) DO UPDATE SET is_active = EXCLUDED.is_active`,
        [requestId, uploaded.id, existing.is_active],
      );
      if (existing.surface && existing.slot_index !== null) {
        await manager.query(
          `INSERT INTO custom_photobook_request_reference_slots (request_id, asset_id, surface, slot_index)
           VALUES ($1, $2, $3, $4)`,
          [requestId, uploaded.id, existing.surface, existing.slot_index],
        );
      }
      await this.invalidateCustomCoverPreparation(requestId, manager, existing.surface);
    });
    return { assetId: uploaded.id, url: uploaded.url, isActive: existing.is_active };
  }

  async setCustomReferenceAssetActive(requestId: number, assetId: number, isActive: boolean) {
    await this.dataSource.transaction(async (manager) => {
      const references: { surface: 'FRONT_COVER' | 'BACK_COVER' | null }[] = await manager.query(
        `SELECT s.surface
         FROM custom_photobook_request_reference_assets r
         LEFT JOIN custom_photobook_request_reference_slots s
           ON s.request_id = r.request_id AND s.asset_id = r.asset_id
         WHERE r.request_id = $1 AND r.asset_id = $2`,
        [requestId, assetId],
      );
      const reference = references[0];
      if (!reference) throw new BadRequestException('Esa foto no pertenece a esta solicitud');

      await manager.query(
        `UPDATE custom_photobook_request_reference_assets
         SET is_active = $3
         WHERE request_id = $1 AND asset_id = $2`,
        [requestId, assetId, isActive],
      );
      await this.invalidateCustomCoverPreparation(requestId, manager, reference.surface);
    });
    return { assetId, isActive };
  }

  private async getActiveCustomReferenceAssetIds(requestId: number, surface: 'FRONT_COVER' | 'BACK_COVER') {
    const rows: { asset_id: string }[] = await this.dataSource.query(
      `SELECT r.asset_id
       FROM custom_photobook_request_reference_assets r
       WHERE r.request_id = $1
         AND r.is_active = true
         AND (
           NOT EXISTS (SELECT 1 FROM custom_photobook_request_reference_slots s WHERE s.request_id = $1)
           OR EXISTS (
             SELECT 1
             FROM custom_photobook_request_reference_slots s
             WHERE s.request_id = r.request_id AND s.asset_id = r.asset_id AND s.surface = $2
           )
         )
       ORDER BY r.created_at ASC`,
      [requestId, surface],
    );
    return rows.map((row) => Number(row.asset_id));
  }

  private async deleteUnreferencedCustomCoverAssets(assetIds: number[]) {
    for (const assetId of new Set(assetIds)) {
      try {
        const rows: { storage_key: string }[] = await this.dataSource.query(
          `DELETE FROM assets
           WHERE id = $1
             AND NOT EXISTS (SELECT 1 FROM custom_photobook_request_designs WHERE asset_id = $1)
             AND NOT EXISTS (SELECT 1 FROM custom_photobook_request_reference_assets WHERE asset_id = $1)
             AND NOT EXISTS (SELECT 1 FROM custom_photobook_requests WHERE front_cover_asset_id = $1 OR back_cover_asset_id = $1 OR cover_wrap_asset_id = $1)
           RETURNING storage_key`,
          [assetId],
        );
        if (rows[0]) await this.fileStorage.delete(rows[0].storage_key);
      } catch (error) {
        this.logger.warn(`No se pudo limpiar el asset de propuesta ${assetId}: ${error instanceof Error ? error.message : 'error desconocido'}`);
      }
    }
  }

  private async invalidateCustomCoverPreparation(
    requestId: number,
    manager: { query: DataSource['query'] } = this.dataSource,
    changedSurface: 'FRONT_COVER' | 'BACK_COVER' | null = null,
  ) {
    const isBackCoverOnlyChange = changedSurface === 'BACK_COVER';
    await manager.query(
      `UPDATE custom_photobook_request_designs
       SET is_selected = false
       WHERE request_id = $1${isBackCoverOnlyChange ? " AND surface = 'BACK_COVER'" : ''}`,
      [requestId],
    );
    await manager.query(
      isBackCoverOnlyChange
        ? `UPDATE custom_photobook_requests
           SET back_cover_asset_id = NULL,
               cover_approved_at = NULL,
               updated_at = now()
           WHERE id = $1`
        : `UPDATE custom_photobook_requests
           SET front_cover_asset_id = NULL,
               back_cover_asset_id = NULL,
               cover_approved_at = NULL,
               updated_at = now()
           WHERE id = $1`,
      [requestId],
    );
    await manager.query(
      `UPDATE public_links
       SET revoked_at = now()
       WHERE link_type = 'PHOTOBOOK_COVER_APPROVAL'
         AND custom_photobook_request_id = $1
         AND revoked_at IS NULL`,
      [requestId],
    );
  }

  async listCustomCoverProposals(requestId: number) {
    const rows: { id: string; surface: string; asset_id: string; source_design_id: string | null; is_selected: boolean; assembled_prompt: string; provider: string; created_at: Date; storage_key: string }[] = await this.dataSource.query(
      `SELECT DISTINCT ON (d.surface) d.id, d.surface, d.asset_id, d.source_design_id, d.is_selected, d.assembled_prompt, d.provider, d.created_at, a.storage_key
       FROM custom_photobook_request_designs d
       JOIN assets a ON a.id = d.asset_id
       WHERE d.request_id = $1
       ORDER BY d.surface, d.created_at DESC, d.id DESC`,
      [requestId],
    );
    return rows.map((row) => ({
      id: Number(row.id),
      surface: row.surface,
      sourceDesignId: row.source_design_id ? Number(row.source_design_id) : null,
      isSelected: Boolean(row.is_selected),
      prompt: row.assembled_prompt,
      provider: row.provider,
      createdAt: row.created_at,
      asset: { id: Number(row.asset_id), url: this.fileStorage.getPublicUrl(row.storage_key) },
    }));
  }

  async downloadCustomCoverProposal(requestId: number, designId: number) {
    const rows: { surface: 'FRONT_COVER' | 'BACK_COVER'; storage_key: string }[] = await this.dataSource.query(
      `SELECT d.surface, a.storage_key
       FROM custom_photobook_request_designs d
       JOIN assets a ON a.id = d.asset_id
       WHERE d.id = $1 AND d.request_id = $2`,
      [designId, requestId],
    );
    const design = rows[0];
    if (!design) throw new NotFoundException('La propuesta no pertenece a esta solicitud');
    return {
      buffer: await this.fileStorage.download(design.storage_key),
      filename: `${design.surface === 'FRONT_COVER' ? 'tapa-frontal' : 'contratapa'}-${designId}.png`,
    };
  }

  async deleteCustomCoverProposal(requestId: number, designId: number) {
    const deleted = await this.dataSource.transaction(async (manager) => {
      const rows: { id: string; surface: 'FRONT_COVER' | 'BACK_COVER'; is_selected: boolean }[] = await manager.query(
        `SELECT id, surface, is_selected
         FROM custom_photobook_request_designs
         WHERE id = $1 AND request_id = $2`,
        [designId, requestId],
      );
      const design = rows[0];
      if (!design) throw new NotFoundException('La propuesta no pertenece a esta solicitud');
      if (design.is_selected) {
        throw new BadRequestException('No puedes borrar una propuesta seleccionada. Conserva la selección para no invalidar la contratapa o la aprobación.');
      }
      const selectedRows: { id: string }[] = await manager.query(
        `SELECT id
         FROM custom_photobook_request_designs
         WHERE request_id = $1 AND surface = $2 AND is_selected = true
         LIMIT 1`,
        [requestId, design.surface],
      );
      if (selectedRows[0]) {
        throw new BadRequestException('No puedes borrar esta propuesta mientras exista otra tapa seleccionada en esta etapa.');
      }
      const deletedRows: { asset_id: string }[] = await manager.query(
        `DELETE FROM custom_photobook_request_designs
         WHERE request_id = $1 AND surface = $2 AND is_selected = false
         RETURNING asset_id`,
        [requestId, design.surface],
      );
      return { surface: design.surface, assetIds: deletedRows.map((row) => Number(row.asset_id)) };
    });
    await this.deleteUnreferencedCustomCoverAssets(deleted.assetIds);
    return { surface: deleted.surface, deletedCount: deleted.assetIds.length };
  }

  async selectCustomCoverProposal(requestId: number, designId: number) {
    return this.dataSource.transaction(async (manager) => {
      const designs: { id: string; surface: 'FRONT_COVER' | 'BACK_COVER'; asset_id: string; source_design_id: string | null }[] = await manager.query(
        `SELECT id, surface, asset_id, source_design_id
         FROM custom_photobook_request_designs
         WHERE id = $1 AND request_id = $2 AND surface IN ('FRONT_COVER', 'BACK_COVER')`,
        [designId, requestId],
      );
      const design = designs[0];
      if (!design) throw new BadRequestException('La propuesta elegida no pertenece a esta solicitud');
      if (design.surface === 'BACK_COVER') {
        const fronts: { id: string }[] = await manager.query(
          `SELECT id FROM custom_photobook_request_designs
           WHERE request_id = $1 AND surface = 'FRONT_COVER' AND is_selected = true`,
          [requestId],
        );
        if (!fronts[0] || design.source_design_id !== fronts[0].id) {
          throw new BadRequestException('La contratapa debe provenir de la tapa frontal seleccionada actualmente');
        }
      }

      await manager.query(
        `UPDATE custom_photobook_request_designs
         SET is_selected = false
         WHERE request_id = $1 AND surface = $2`,
        [requestId, design.surface],
      );
      const assetColumn = design.surface === 'FRONT_COVER' ? 'front_cover_asset_id' : 'back_cover_asset_id';
      const clearBackCover = design.surface === 'FRONT_COVER' ? ', back_cover_asset_id = NULL' : '';
      await manager.query(
        `UPDATE custom_photobook_requests
         SET ${assetColumn} = $1${clearBackCover}, cover_approved_at = NULL, updated_at = now()
         WHERE id = $2`,
        [design.asset_id, requestId],
      );
      await manager.query(
        `UPDATE public_links
         SET revoked_at = now()
         WHERE link_type = 'PHOTOBOOK_COVER_APPROVAL'
           AND custom_photobook_request_id = $1
           AND revoked_at IS NULL`,
        [requestId],
      );
      if (design.surface === 'FRONT_COVER') {
        await manager.query(
          `UPDATE custom_photobook_request_designs
           SET is_selected = false
           WHERE request_id = $1 AND surface = 'BACK_COVER'`,
          [requestId],
        );
      }
      const rows: { id: string }[] = await manager.query(
        `UPDATE custom_photobook_request_designs
         SET is_selected = true
         WHERE id = $1 AND request_id = $2
         RETURNING id`,
        [designId, requestId],
      );
      return { id: Number(rows[0].id), surface: design.surface, isSelected: true };
    });
  }

  async sendCustomCoverApproval(requestId: number) {
    const rows: { id: string; customer_full_name: string; customer_email: string; status: string; cover_approved_at: Date | null; front_cover_asset_id: string | null; back_cover_asset_id: string | null; selected_front_id: string | null; selected_back_id: string | null }[] = await this.dataSource.query(
      `SELECT r.id, r.customer_full_name, r.customer_email, r.status, r.cover_approved_at, r.front_cover_asset_id, r.back_cover_asset_id,
              front_design.id AS selected_front_id, back_design.id AS selected_back_id
       FROM custom_photobook_requests r
       LEFT JOIN custom_photobook_request_designs front_design
         ON front_design.request_id = r.id
        AND front_design.surface = 'FRONT_COVER'
        AND front_design.is_selected = true
       LEFT JOIN custom_photobook_request_designs back_design
         ON back_design.request_id = r.id
        AND back_design.surface = 'BACK_COVER'
        AND back_design.is_selected = true
        AND back_design.source_design_id = front_design.id
       WHERE r.id = $1`,
      [requestId],
    );
    const request = rows[0];
    if (!request) throw new NotFoundException('Solicitud de photobook a medida no encontrada');
    if (!request.selected_front_id || !request.selected_back_id || !request.front_cover_asset_id || !request.back_cover_asset_id) {
      throw new BadRequestException('Selecciona una tapa y una contratapa antes de solicitar la aprobación del cliente');
    }
    if (request.cover_approved_at) {
      throw new BadRequestException('Las cubiertas ya fueron aprobadas. Envía el código del editor al cliente.');
    }

    await this.dataSource.query(
      `UPDATE public_links
       SET revoked_at = now()
       WHERE link_type = 'PHOTOBOOK_COVER_APPROVAL'
         AND custom_photobook_request_id = $1
         AND revoked_at IS NULL`,
      [requestId],
    );
    const link = await this.publicLinksService.generate({
      linkType: 'PHOTOBOOK_COVER_APPROVAL',
      customPhotobookRequestId: requestId,
      ttlDays: 7,
    });
    const frontendBase = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    const coverApprovalUrl = `${frontendBase}/photobooks/a-medida/aprobar/${link.token}`;

    await this.emailService.queue({
      eventType: 'PHOTOBOOK_COVER_APPROVAL_SENT',
      toEmail: request.customer_email,
      subject: 'PixelArt — Revisa y aprueba la cubierta de tu photobook',
      payload: {
        customerName: request.customer_full_name,
        coverApprovalUrl,
        expiresAt: link.expiresAt.toLocaleDateString('es-PE'),
      },
    });
    await this.dataSource.query(
      `UPDATE custom_photobook_cover_adjustment_requests
       SET resolved_at = now()
       WHERE request_id = $1 AND resolved_at IS NULL`,
      [requestId],
    );
    await this.dataSource.query(
      `UPDATE custom_photobook_requests
       SET status = 'AWAITING_CUSTOMER', updated_at = now()
       WHERE id = $1`,
      [requestId],
    );

    return {
      status: 'AWAITING_CUSTOMER',
      publicLink: { token: link.token, url: coverApprovalUrl, expiresAt: link.expiresAt },
    };
  }

  async getCustomCoverApproval(token: string) {
    const link = await this.publicLinksService.validate(token);
    if (link.linkType !== 'PHOTOBOOK_COVER_APPROVAL' || !link.customPhotobookRequestId) {
      throw new NotFoundException('El enlace no corresponde a una aprobación de cubierta');
    }
    const rows: { customer_full_name: string; cover_title: string | null; requested_theme: string; status: string; cover_approved_at: Date | null; front_storage_key: string | null; back_storage_key: string | null }[] = await this.dataSource.query(
      `SELECT r.customer_full_name, r.cover_title, r.requested_theme, r.status, r.cover_approved_at,
              front_asset.storage_key AS front_storage_key, back_asset.storage_key AS back_storage_key
       FROM custom_photobook_requests r
       LEFT JOIN assets front_asset ON front_asset.id = r.front_cover_asset_id
       LEFT JOIN assets back_asset ON back_asset.id = r.back_cover_asset_id
       WHERE r.id = $1`,
      [link.customPhotobookRequestId],
    );
    const request = rows[0];
    if (!request || !request.front_storage_key || !request.back_storage_key) {
      throw new NotFoundException('La propuesta de cubierta ya no está disponible');
    }
    return {
      customerName: request.customer_full_name,
      title: request.cover_title || request.requested_theme,
      status: request.status,
      isApproved: Boolean(request.cover_approved_at),
      frontCoverUrl: this.fileStorage.getPublicUrl(request.front_storage_key),
      backCoverUrl: this.fileStorage.getPublicUrl(request.back_storage_key),
      expiresAt: link.expiresAt,
    };
  }

  async approveCustomCover(token: string) {
    const link = await this.publicLinksService.validate(token);
    if (link.linkType !== 'PHOTOBOOK_COVER_APPROVAL' || !link.customPhotobookRequestId) {
      throw new NotFoundException('El enlace no corresponde a una aprobación de cubierta');
    }

    const result = await this.dataSource.transaction(async (manager) => {
      const rows: { id: string; linked_photobook_project_id: string | null; customer_full_name: string; customer_email: string; customer_phone: string }[] = await manager.query(
        `SELECT id, linked_photobook_project_id, customer_full_name, customer_email, customer_phone
         FROM custom_photobook_requests
         WHERE id = $1
           AND status IN ('AWAITING_CUSTOMER', 'EDITOR_READY')
           AND front_cover_asset_id IS NOT NULL
           AND back_cover_asset_id IS NOT NULL
         FOR UPDATE`,
        [link.customPhotobookRequestId],
      );
      const request = rows[0];
      if (!request) throw new BadRequestException('La cubierta ya no está lista para aprobación');

      let projectId = request.linked_photobook_project_id ? Number(request.linked_photobook_project_id) : null;
      if (!projectId) {
        const productRows: { id: string }[] = await manager.query(
          `SELECT id
           FROM photobook_products
           WHERE is_active = true
           ORDER BY id ASC
           LIMIT 1`,
        );
        const productId = productRows[0]?.id;
        if (!productId) throw new BadRequestException('No hay productos de photobook activos para crear el borrador');

        // The request row is locked above, so only one approval can materialize a draft.
        // Reuse the standard draft workflow instead of duplicating its persistence defaults.
        const draft = await this.createDraft(Number(productId), null, {
          source: 'custom_photobook_request',
          customPhotobookRequestId: link.customPhotobookRequestId,
        });
        projectId = draft.id;
      }

      await manager.query(
        `UPDATE custom_photobook_requests
         SET status = 'EDITOR_READY',
             cover_approved_at = COALESCE(cover_approved_at, now()),
             linked_photobook_project_id = $2,
             updated_at = now()
         WHERE id = $1`,
        [link.customPhotobookRequestId, projectId],
      );

      return {
        projectId,
        customerFullName: request.customer_full_name,
        customerEmail: request.customer_email,
        customerPhone: request.customer_phone,
      };
    });

    const order = await this.ordersService.ensurePhotobookConfigurationOrder({
      photobookProjectId: result.projectId,
      customerFullName: result.customerFullName,
      customerEmail: result.customerEmail,
      customerPhone: result.customerPhone,
      baseAmountCents: 0,
    });
    await this.publicLinksService.revoke(link.id);
    return { status: 'EDITOR_READY', approved: true, linkedPhotobookProjectId: result.projectId, orderId: order.id };
  }

  async requestCustomCoverAdjustment(token: string, data: RequestCustomPhotobookCoverAdjustmentDto) {
    const link = await this.publicLinksService.validate(token);
    if (link.linkType !== 'PHOTOBOOK_COVER_APPROVAL' || !link.customPhotobookRequestId) {
      throw new NotFoundException('El enlace no corresponde a una aprobación de cubierta');
    }

    const message = data.message.trim();
    if (message.length < 5 || message.length > 1200) {
      throw new BadRequestException('Describe los ajustes que necesitas en un máximo de 1200 caracteres');
    }
    const changedSurface = data.surface === 'BOTH' ? null : data.surface;
    const adjustmentSurfaceLabel = {
      FRONT_COVER: 'Tapa frontal',
      BACK_COVER: 'Contratapa',
      BOTH: 'Tapa y contratapa',
    }[data.surface];

    const adjustment = await this.dataSource.transaction(async (manager) => {
      const requests: { id: string; customer_full_name: string }[] = await manager.query(
        `SELECT id, customer_full_name
         FROM custom_photobook_requests
         WHERE id = $1 AND status = 'AWAITING_CUSTOMER'
         FOR UPDATE`,
        [link.customPhotobookRequestId],
      );
      const request = requests[0];
      if (!request) throw new BadRequestException('Esta cubierta ya no está disponible para solicitar ajustes');

      await manager.query(
        `INSERT INTO custom_photobook_cover_adjustment_requests (request_id, surface, message)
         VALUES ($1, $2, $3)`,
        [link.customPhotobookRequestId, data.surface, message],
      );
      await this.invalidateCustomCoverPreparation(link.customPhotobookRequestId, manager, changedSurface);
      await manager.query(
        `UPDATE custom_photobook_requests
         SET status = 'CHANGES_REQUESTED', updated_at = now()
         WHERE id = $1`,
        [link.customPhotobookRequestId],
      );
      return { customerName: request.customer_full_name };
    });

    try {
      const frontendBase = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
      await this.emailService.queue({
        eventType: 'PHOTOBOOK_COVER_CHANGES_REQUESTED_TO_ADMIN',
        toEmail: ADMIN_NOTIFICATION_EMAIL,
        subject: 'PixelArt — El cliente solicitó ajustes para su cubierta',
        payload: {
          customerName: adjustment.customerName,
          adjustmentSurface: adjustmentSurfaceLabel,
          adjustmentMessage: message,
          adminUrl: `${frontendBase}/admin/photobooks/a-medida/${link.customPhotobookRequestId}`,
        },
      });
    } catch (error) {
      this.logger.warn(`No se pudo encolar el aviso de ajustes para la solicitud #${link.customPhotobookRequestId}: ${(error as Error).message}`);
    }

    return { status: 'CHANGES_REQUESTED', adjustmentRequested: true };
  }

  private hashCustomEditorSecret(value: string) {
    return createHash('sha256').update(value).digest('hex');
  }

  private normalizeCustomEditorCode(code: string) {
    return code.toUpperCase().replace(/[^A-Z0-9]/g, '');
  }

  private generateCustomEditorCode() {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    while (code.length < 12) {
      const byte = randomBytes(1)[0];
      if (byte >= 224) continue;
      code += alphabet[byte % alphabet.length];
    }
    return `${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8, 12)}`;
  }

  private async resolveCustomEditorSession(sessionToken: string) {
    const rows: { request_id: string }[] = await this.dataSource.query(
      `SELECT request_id
       FROM custom_photobook_editor_sessions
       WHERE token_hash = $1
         AND revoked_at IS NULL
         AND expires_at > now()`,
      [this.hashCustomEditorSecret(sessionToken)],
    );
    const session = rows[0];
    if (!session) throw new NotFoundException('Tu sesión de editor ya no está disponible');
    return Number(session.request_id);
  }

  async redeemCustomEditorCode(data: RedeemCustomPhotobookEditorCodeDto) {
    const normalizedCode = this.normalizeCustomEditorCode(data.code);
    if (normalizedCode.length !== 12) throw new BadRequestException('Ingresa el código completo de 12 caracteres');

    const sessionToken = randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const result = await this.dataSource.transaction(async (manager) => {
      const rows: { id: string; request_id: string }[] = await manager.query(
        `SELECT c.id, c.request_id
         FROM custom_photobook_editor_access_codes c
         JOIN custom_photobook_requests r ON r.id = c.request_id
         WHERE c.code_hash = $1
           AND c.revoked_at IS NULL
           AND c.expires_at > now()
           AND r.status IN ('EDITOR_READY', 'EDITOR_IN_PROGRESS')
         FOR UPDATE`,
        [this.hashCustomEditorSecret(normalizedCode)],
      );
      const accessCode = rows[0];
      if (!accessCode) throw new BadRequestException('El código no es válido o ya venció');

      await manager.query(
        `UPDATE custom_photobook_editor_access_codes
         SET last_redeemed_at = now(),
             redeem_count = redeem_count + 1
         WHERE id = $1`,
        [accessCode.id],
      );
      await manager.query(
        `INSERT INTO custom_photobook_editor_sessions (id, request_id, token_hash, expires_at)
         VALUES ($1, $2, $3, $4)`,
        [randomUUID(), accessCode.request_id, this.hashCustomEditorSecret(sessionToken), expiresAt],
      );
      return { requestId: Number(accessCode.request_id) };
    });

    return { sessionToken, expiresAt, requestId: result.requestId };
  }

  async getCustomEditorSession(sessionToken: string) {
    const requestId = await this.resolveCustomEditorSession(sessionToken);
    const rows: { customer_full_name: string; cover_title: string | null; requested_theme: string; status: string; linked_photobook_project_id: string | null; front_storage_key: string | null; back_storage_key: string | null }[] = await this.dataSource.query(
      `SELECT r.customer_full_name, r.cover_title, r.requested_theme, r.status, r.linked_photobook_project_id,
              front_asset.storage_key AS front_storage_key, back_asset.storage_key AS back_storage_key
       FROM custom_photobook_requests r
       LEFT JOIN assets front_asset ON front_asset.id = r.front_cover_asset_id
       LEFT JOIN assets back_asset ON back_asset.id = r.back_cover_asset_id
       WHERE r.id = $1
         AND r.status IN ('EDITOR_READY', 'EDITOR_IN_PROGRESS')`,
      [requestId],
    );
    const request = rows[0];
    if (!request || !request.linked_photobook_project_id || !request.front_storage_key) {
      throw new NotFoundException('El editor todavía no está disponible para esta solicitud');
    }

    return {
      customerName: request.customer_full_name,
      title: request.cover_title || request.requested_theme,
      status: request.status,
      linkedPhotobookProjectId: Number(request.linked_photobook_project_id),
      frontCoverUrl: this.fileStorage.getPublicUrl(request.front_storage_key),
      backCoverUrl: request.back_storage_key ? this.fileStorage.getPublicUrl(request.back_storage_key) : null,
    };
  }

  async getCustomEditorDraft(sessionToken: string) {
    const requestId = await this.resolveCustomEditorSession(sessionToken);
    const rows: { draft_state: Record<string, unknown> | null }[] = await this.dataSource.query(
      `SELECT p.draft_state
       FROM custom_photobook_requests r
       JOIN photobook_projects p ON p.id = r.linked_photobook_project_id
       WHERE r.id = $1
         AND r.status IN ('EDITOR_READY', 'EDITOR_IN_PROGRESS')`,
      [requestId],
    );
    if (!rows[0]) throw new NotFoundException('El editor todavía no está disponible para esta solicitud');
    return { state: rows[0].draft_state ?? {} };
  }

  async saveCustomEditorDraft(sessionToken: string, state: Record<string, unknown>) {
    const requestId = await this.resolveCustomEditorSession(sessionToken);
    return this.dataSource.transaction(async (manager) => {
      const rows: { id: string; status: string; linked_photobook_project_id: string | null }[] = await manager.query(
        `SELECT id, status, linked_photobook_project_id
         FROM custom_photobook_requests
         WHERE id = $1
         FOR UPDATE`,
        [requestId],
      );
      const request = rows[0];
      if (!request?.linked_photobook_project_id) throw new NotFoundException('El editor todavía no está disponible para esta solicitud');
      if (request.status === 'READY_FOR_PRODUCTION') throw new BadRequestException('Este photobook ya fue finalizado');
      if (!['EDITOR_READY', 'EDITOR_IN_PROGRESS'].includes(request.status)) throw new BadRequestException('Este editor ya no está disponible');

      await manager.query(
        `UPDATE photobook_projects SET draft_state = $2::jsonb, updated_at = now() WHERE id = $1`,
        [request.linked_photobook_project_id, JSON.stringify(state)],
      );
      await manager.query(
        `UPDATE custom_photobook_requests
         SET status = CASE WHEN status = 'EDITOR_READY' THEN 'EDITOR_IN_PROGRESS'::custom_photobook_request_status ELSE status END,
             updated_at = now()
         WHERE id = $1`,
        [requestId],
      );
      return { ok: true, status: request.status === 'EDITOR_READY' ? 'EDITOR_IN_PROGRESS' : request.status };
    });
  }

  async finalizeCustomEditor(sessionToken: string, state: Record<string, unknown>) {
    const requestId = await this.resolveCustomEditorSession(sessionToken);
    const result = await this.dataSource.transaction(async (manager) => {
      const rows: { id: string; status: string; linked_photobook_project_id: string | null }[] = await manager.query(
        `SELECT id, status, linked_photobook_project_id
         FROM custom_photobook_requests
         WHERE id = $1
         FOR UPDATE`,
        [requestId],
      );
      const request = rows[0];
      if (!request?.linked_photobook_project_id) throw new NotFoundException('El editor todavía no está disponible para esta solicitud');
      if (request.status === 'AWAITING_PAYMENT') return { projectId: Number(request.linked_photobook_project_id), status: request.status };
      if (!['EDITOR_READY', 'EDITOR_IN_PROGRESS'].includes(request.status)) throw new BadRequestException('Este editor ya no está disponible');

      const pages = Array.isArray(state.pages) ? state.pages : [];
      const coverType = typeof state.coverType === 'string' ? state.coverType : 'TAPA_GRUESA';
      const sheets = pages.length / 2;
      const allowedSheets = coverType === 'TAPA_DELGADA' ? [15, 20, 25, 35] : [15, 20, 25, 35, 50];
      if (state.formatConfigured !== true || !allowedSheets.includes(sheets)) {
        throw new BadRequestException('El formato seleccionado no es válido. Elige nuevamente la tapa y cantidad de hojas.');
      }
      const incompletePages = pages.filter((page) => {
        const slots = typeof page === 'object' && page !== null ? (page as { slots?: unknown[] }).slots : undefined;
        return !Array.isArray(slots) || !slots.some((slot) => typeof slot === 'object' && slot !== null && Number.isFinite(Number((slot as { id?: unknown; assetId?: unknown }).assetId ?? (slot as { id?: unknown }).id)));
      });
      if (incompletePages.length > 0) {
        throw new BadRequestException(`Completa las ${incompletePages.length} página${incompletePages.length === 1 ? '' : 's'} pendientes antes de finalizar tu photobook.`);
      }
      const form = typeof state.form === 'object' && state.form !== null ? state.form as Record<string, unknown> : {};
      const requiredFields: [string, string][] = [
        ['name', 'nombre'], ['email', 'email'], ['phone', 'teléfono'], ['deliveryAddress', 'dirección de entrega'],
        ['deliveryDistrict', 'distrito'], ['deliveryCity', 'ciudad'], ['deliveryRegion', 'región'], ['deliveryDepartment', 'departamento'],
      ];
      const missingFields = requiredFields.filter(([key]) => typeof form[key] !== 'string' || !(form[key] as string).trim()).map(([, label]) => label);
      if (missingFields.length > 0) throw new BadRequestException(`Completa los datos obligatorios: ${missingFields.join(', ')}.`);
      const wantsRush = Boolean(state.wantsRush);
      const rushFeeCents = calculatePhotobookRushFeeCents(wantsRush);
      const calculatedTotalCents = calculatePhotobookTotalCents(coverType as 'TAPA_DELGADA' | 'TAPA_GRUESA', pages.length, wantsRush);

      await manager.query(`DELETE FROM photobook_project_assets WHERE project_id = $1`, [request.linked_photobook_project_id]);
      await manager.query(`DELETE FROM photobook_pages WHERE project_id = $1`, [request.linked_photobook_project_id]);

      const assetIds = new Set<number>();
      for (const [index, page] of pages.entries()) {
        const pageData = page as { pageNumber?: number; layoutKey?: string; slots?: unknown[]; slotPositions?: Record<string, unknown> };
        const inserted: { id: string }[] = await manager.query(
          `INSERT INTO photobook_pages (project_id, page_number, layout_key)
           VALUES ($1, $2, $3)
           RETURNING id`,
          [request.linked_photobook_project_id, pageData.pageNumber ?? index + 1, pageData.layoutKey ?? 'FULL_1'],
        );
        for (const [slotIndex, slot] of (pageData.slots ?? []).entries()) {
          const assetId = typeof slot === 'object' && slot !== null ? Number((slot as { id?: unknown; assetId?: unknown }).assetId ?? (slot as { id?: unknown }).id) : NaN;
          if (!Number.isFinite(assetId)) continue;
          assetIds.add(assetId);
          await manager.query(
            `INSERT INTO photobook_page_slots (page_id, asset_id, slot_index, crop_data)
             VALUES ($1, $2, $3, $4::jsonb)`,
            [inserted[0].id, assetId, slotIndex, JSON.stringify(pageData.slotPositions?.[String(slotIndex)] ?? null)],
          );
        }
      }
      for (const assetId of assetIds) {
        await manager.query(
          `INSERT INTO photobook_project_assets (project_id, asset_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [request.linked_photobook_project_id, assetId],
        );
      }

      await manager.query(
        `UPDATE photobook_projects
         SET status = 'CONFIRMED',
             customer_full_name = $2,
             customer_email = $3,
             customer_phone = $4,
             delivery_address = $5,
             delivery_district = $6,
             delivery_city = $7,
             delivery_region = $8,
             delivery_department = $9,
             cover_type = $10,
             page_count = $11,
             rush_fee_cents = $12,
             calculated_total_cents = $13,
             draft_state = $14::jsonb,
             updated_at = now()
         WHERE id = $1`,
        [request.linked_photobook_project_id, form.name, form.email, form.phone, form.deliveryAddress, form.deliveryDistrict, form.deliveryCity, form.deliveryRegion, form.deliveryDepartment, coverType, pages.length, rushFeeCents, calculatedTotalCents, JSON.stringify(state)],
      );
      await manager.query(
        `UPDATE custom_photobook_requests
         SET status = 'AWAITING_PAYMENT', updated_at = now()
         WHERE id = $1`,
        [requestId],
      );
      return { projectId: Number(request.linked_photobook_project_id), status: 'AWAITING_PAYMENT' };
    });

    const order = await this.createOrderFromProject(result.projectId);
    if (this.pdfService) {
      void this.pdfService.generateAndStore(result.projectId).catch((err: Error) => {
        this.logger.error(`Error generando PDF final para photobook a medida #${result.projectId}: ${err.message}`);
      });
    }
    return { ...result, order };
  }

  async sendCustomEditorCode(requestId: number) {
    const code = this.generateCustomEditorCode();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const request = await this.dataSource.transaction(async (manager) => {
      const rows: { id: string; status: 'EDITOR_READY' | 'EDITOR_IN_PROGRESS'; customer_full_name: string; customer_email: string; linked_photobook_project_id: string | null }[] = await manager.query(
        `SELECT id, status, customer_full_name, customer_email, linked_photobook_project_id
         FROM custom_photobook_requests
         WHERE id = $1
           AND status IN ('EDITOR_READY', 'EDITOR_IN_PROGRESS')
           AND linked_photobook_project_id IS NOT NULL
         FOR UPDATE`,
        [requestId],
      );
      const current = rows[0];
      if (!current) throw new BadRequestException('La solicitud todavía no tiene un proyecto listo para el editor');

      await manager.query(`UPDATE custom_photobook_editor_access_codes SET revoked_at = now() WHERE request_id = $1 AND revoked_at IS NULL`, [requestId]);
      await manager.query(`UPDATE custom_photobook_editor_sessions SET revoked_at = now() WHERE request_id = $1 AND revoked_at IS NULL`, [requestId]);
      await manager.query(
        `INSERT INTO custom_photobook_editor_access_codes (request_id, code_hash, expires_at)
         VALUES ($1, $2, $3)`,
        [requestId, this.hashCustomEditorSecret(this.normalizeCustomEditorCode(code)), expiresAt],
      );
      return current;
    });

    const frontendBase = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    const editorPortalUrl = `${frontendBase}/photobooks/acceso`;
    await this.emailService.queue({
      eventType: 'PHOTOBOOK_EDITOR_CODE_SENT',
      toEmail: request.customer_email,
      subject: 'PixelArt — Código para continuar tu photobook',
      payload: {
        customerName: request.customer_full_name,
        editorCode: code,
        editorPortalUrl,
        expiresAt: expiresAt.toLocaleDateString('es-PE'),
      },
    });

    return {
      status: request.status,
      codeExpiresAt: expiresAt,
      linkedPhotobookProjectId: Number(request.linked_photobook_project_id),
    };
  }

  async generateCustomCoverProposal(requestId: number, input: GenerateCustomPhotobookCoverProposalDto) {
    const request = await this.getCustomRequest(requestId);
    if (!request) throw new NotFoundException('Solicitud de photobook a medida no encontrada');
    if (input.surface === 'FRONT_COVER' && !input.creativeDirection?.trim()) {
      throw new BadRequestException('Escribe una dirección creativa antes de generar la tapa frontal');
    }
    const activeReferenceAssetIds = await this.getActiveCustomReferenceAssetIds(requestId, input.surface);
    if (activeReferenceAssetIds.length < 1 || activeReferenceAssetIds.length > 5) {
      throw new BadRequestException('Selecciona entre una y cinco fotos de trabajo antes de generar una propuesta');
    }

    const referenceAssets = await Promise.all(activeReferenceAssetIds.map(async (assetId) => {
      const asset = await this.assetRepo.findById(assetId);
      if (!asset) throw new BadRequestException(`No se encontró la referencia ${assetId}`);
      return asset;
    }));

    let sourceDesignId: number | null = null;
    let continuationSource: 'PREVIOUS_FRONT_PROPOSAL' | 'SELECTED_FRONT_PROPOSAL' | undefined;
    if (input.surface === 'FRONT_COVER') {
      const previousFrontRows: { id: string; asset_id: string; is_selected: boolean }[] = await this.dataSource.query(
        `SELECT id, asset_id, is_selected
         FROM custom_photobook_request_designs
         WHERE request_id = $1 AND surface = 'FRONT_COVER'
         ORDER BY created_at DESC, id DESC
         LIMIT 1`,
        [requestId],
      );
      const previousFront = previousFrontRows[0];
      if (previousFront) {
        if (previousFront.is_selected) {
          throw new BadRequestException('No puedes regenerar una tapa frontal seleccionada. Conserva la selección para no invalidar la contratapa o la aprobación.');
        }
        const previousFrontAsset = await this.assetRepo.findById(Number(previousFront.asset_id));
        if (!previousFrontAsset) throw new BadRequestException('No se encontró el archivo de la propuesta anterior');
        sourceDesignId = Number(previousFront.id);
        continuationSource = 'PREVIOUS_FRONT_PROPOSAL';
        referenceAssets.push(previousFrontAsset);
      }
    }
    if (input.surface === 'BACK_COVER') {
      const selectedFrontRows: { id: string; asset_id: string }[] = await this.dataSource.query(
        `SELECT id, asset_id
         FROM custom_photobook_request_designs
         WHERE request_id = $1 AND surface = 'FRONT_COVER' AND is_selected = true
         LIMIT 1`,
        [requestId],
      );
      const selectedFront = selectedFrontRows[0];
      if (!selectedFront) throw new BadRequestException('Selecciona una tapa frontal antes de generar la contratapa');
      const selectedFrontAsset = await this.assetRepo.findById(Number(selectedFront.asset_id));
      if (!selectedFrontAsset) throw new BadRequestException('No se encontró el archivo de la tapa frontal seleccionada');
      sourceDesignId = Number(selectedFront.id);
      continuationSource = 'SELECTED_FRONT_PROPOSAL';
      referenceAssets.push(selectedFrontAsset);
    }

    const prompt = buildCustomPhotobookCoverPrompt({
      request,
      surface: input.surface,
      creativeDirection: input.creativeDirection,
      continuationSource,
    });
    const referenceBuffers = await Promise.all(referenceAssets.map((asset) => this.fileStorage.download(asset.storageKey)));
    const image = referenceBuffers.length > 0
      ? await this.imageGeneration.generateWithReferences(prompt, referenceBuffers, CUSTOM_PHOTOBOOK_PROPOSAL_SIZE)
      : await this.imageGeneration.generate(prompt, CUSTOM_PHOTOBOOK_PROPOSAL_SIZE);
    const storageKey = `photobooks/custom-requests/${requestId}/designs/${input.surface.toLowerCase()}-${randomUUID()}.png`;
    let assetId: number | null = null;

    try {
      await this.fileStorage.upload(storageKey, image, 'image/png');
      const asset = await this.assetRepo.save({
        storageKey,
        originalFilename: `${input.surface.toLowerCase()}.png`,
        mimeType: 'image/png',
        sizeBytes: image.length,
        width: null,
        height: null,
        contentHash: createHash('sha256').update(image).digest('hex'),
      });
      assetId = asset.id;
      const created = await this.dataSource.transaction(async (manager) => {
        const rows: { id: string; created_at: Date }[] = await manager.query(
          `INSERT INTO custom_photobook_request_designs
            (request_id, surface, asset_id, source_design_id, assembled_prompt, provider)
           VALUES ($1, $2, $3, $4, $5, 'openai')
           RETURNING id, created_at`,
          [requestId, input.surface, asset.id, sourceDesignId, prompt],
        );
        const design = rows[0];
        const replacedRows: { asset_id: string }[] = input.surface === 'FRONT_COVER'
          ? await manager.query(
            `DELETE FROM custom_photobook_request_designs
             WHERE request_id = $1 AND surface = 'FRONT_COVER' AND id <> $2 AND is_selected = false
             RETURNING asset_id`,
            [requestId, design.id],
          )
          : [];
        const replacedAssetIds = (replacedRows ?? []).map((row) => Number(row.asset_id));
        await manager.query(
          `UPDATE custom_photobook_requests
           SET status = CASE WHEN status = 'PENDING_REVIEW' THEN 'DESIGN_IN_PROGRESS'::custom_photobook_request_status ELSE status END,
               updated_at = now()
           WHERE id = $1`,
          [requestId],
        );
        return { design, replacedAssetIds };
      });
      await this.deleteUnreferencedCustomCoverAssets(created.replacedAssetIds);

      return {
        id: Number(created.design.id),
        surface: input.surface,
        sourceDesignId: input.surface === 'FRONT_COVER' ? null : sourceDesignId,
        isSelected: false,
        provider: 'openai',
        prompt,
        asset: { id: asset.id, url: this.fileStorage.getPublicUrl(storageKey) },
        createdAt: created.design.created_at,
      };
    } catch (error) {
      if (assetId) await this.dataSource.query('DELETE FROM assets WHERE id = $1', [assetId]).catch(() => undefined);
      await this.fileStorage.delete(storageKey).catch(() => undefined);
      throw error;
    }
  }

  async createDraft(photobookProductId: number, photobookThemeId: number | null, state: Record<string, unknown>) {
    const [product, theme] = await Promise.all([
      this.repo.getProduct(photobookProductId),
      photobookThemeId === null ? Promise.resolve(null) : this.repo.getTheme(photobookThemeId),
    ]);
    if (!product) throw new NotFoundException('Producto no encontrado');
    if (photobookThemeId !== null && !theme) throw new NotFoundException('Tema no encontrado');
    return this.repo.createDraft({ photobookProductId, photobookThemeId, state });
  }

  updateDraftState(draftToken: string, state: Record<string, unknown>) {
    return this.repo.updateDraftState(draftToken, state);
  }

  // Si el token ya no está en DRAFT (el cliente ya confirmó y volvió a esta
  // URL, ej. con el botón atrás), no tiene sentido devolver un editor vacío —
  // lo mandamos de nuevo a pagar. createOrderFromProject es idempotente, así
  // que llamarla de nuevo acá es seguro: no crea nada, solo devuelve el
  // mismo link que ya existía.
  async getDraft(draftToken: string) {
    const draft = await this.repo.findDraftByToken(draftToken);
    if (!draft) return null;
    if (draft.status === 'DRAFT') return draft;

    try {
      const order = await this.createOrderFromProject(draft.id);
      return { ...draft, paymentUrl: order.paymentLink.url };
    } catch {
      return { ...draft, paymentUrl: null };
    }
  }

  async getProjectDetail(id: number) {
    const detail = await this.repo.findProjectById(id);
    if (!detail) return null;

    const orderRows: { id: string }[] = await this.dataSource.query(
      `SELECT id FROM orders WHERE photobook_project_id = $1 LIMIT 1`,
      [id],
    );
    const orderId = orderRows.length > 0 ? Number(orderRows[0].id) : null;

    let hasPaymentProof = false;
    if (orderId) {
      const proofRows: { id: string }[] = await this.dataSource.query(
        `SELECT id FROM payment_proofs WHERE order_id = $1 LIMIT 1`,
        [orderId],
      );
      hasPaymentProof = proofRows.length > 0;
    }

    return { ...detail, orderId, hasPaymentProof };
  }

  async createProject(data: CreateProjectData, draftToken?: string) {
    const product = await this.repo.getProduct(data.photobookProductId);
    if (!product) throw new NotFoundException('Producto no encontrado');
    if (data.pages.length < product.minPages) {
      throw new BadRequestException(`Mínimo ${product.minPages} páginas requeridas`);
    }
    if (product.allowsCustomDimensions && (!data.customWidthCm || !data.customHeightCm)) {
      throw new BadRequestException('Este producto requiere dimensiones personalizadas (ancho y alto)');
    }
    if (!isValidPhotobookCoverType(data.coverType)) {
      throw new BadRequestException('Tipo de tapa inválido');
    }

    // El precio nunca se confía del cliente — se recalcula acá con el mismo
    // criterio que muestra el editor (tapa + hojas + rush), no con el
    // price_per_page_cents plano del producto.
    const wantsRush = !!data.wantsRush;
    const rushFeeCents = calculatePhotobookRushFeeCents(wantsRush);
    const calculatedTotalCents = calculatePhotobookTotalCents(data.coverType, data.pages.length, wantsRush);

    const finalData: CreateProjectData = {
      ...data,
      pricePerPageCents: product.pricePerPageCents,
      rushFeeCents,
      calculatedTotalCents,
    };

    // Si vino de un borrador (URL con ?draft=...), convierte esa misma fila en
    // vez de crear un proyecto duplicado. Si el token ya no es válido (borrador
    // ajeno, ya confirmado, etc.), sigue de largo y crea uno nuevo para no
    // bloquear al cliente.
    let savedProject;
    if (draftToken) {
      savedProject = await this.repo.confirmDraft(draftToken, finalData);
    }
    if (!savedProject) {
      savedProject = await this.repo.createProject(finalData);
    }

    // Crea la orden + link de pago automáticamente, sin esperar a que un admin
    // lo procese a mano. Si esto falla, el proyecto ya quedó guardado bien —
    // no rompemos la respuesta al cliente por un error acá; queda como
    // excepción para procesar a mano desde el admin (createOrderFromProject
    // es idempotente, así que reintentarlo después es seguro).
    let order: OrderInfo | null = null;
    try {
      order = await this.createOrderFromProject(savedProject.id);
    } catch (err) {
      this.logger.warn(`No se pudo crear la orden automática para el proyecto #${savedProject.id}: ${(err as Error).message}`);
    }

    // Aviso al admin de que entró una solicitud de photobook (paridad con el
    // flujo de libros personalizados). Igual que la orden automática de arriba,
    // un fallo de correo no debe romper la respuesta: el proyecto ya se guardó.
    try {
      const frontendBase = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
      await this.emailService.queue({
        eventType: 'NEW_PHOTOBOOK_REQUEST_TO_ADMIN',
        orderId: order?.orderId ?? null,
        toEmail: ADMIN_NOTIFICATION_EMAIL,
        subject: 'PixelArt — Nueva solicitud de photobook',
        payload: {
          customerName: data.customerFullName,
          adminUrl: `${frontendBase}/admin/photobooks/proyectos/${savedProject.id}`,
        },
      });
    } catch (err) {
      this.logger.warn(`No se pudo encolar el aviso de photobook al admin para el proyecto #${savedProject.id}: ${(err as Error).message}`);
    }

    return { ...savedProject, order };
  }

  // Idempotente: si el proyecto ya tiene una orden (doble click, reintento por
  // timeout, o ya se procesó antes), devuelve esa misma orden/link en vez de
  // intentar crear otra — evita chocar contra la restricción única
  // orders.photobook_project_id y evita mandar el email de pago dos veces.
  async createOrderFromProject(projectId: number): Promise<OrderInfo> {
    const frontendBase = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    const detail = await this.repo.findProjectById(projectId);
    if (!detail) throw new NotFoundException('Proyecto no encontrado');
    if (!['CONFIRMED', 'CONVERTED_TO_ORDER'].includes(detail.status)) {
      throw new BadRequestException('El proyecto debe estar confirmado');
    }

    const order = await this.ordersService.activatePhotobookOrder({
      photobookProjectId: projectId,
      customerFullName: detail.customerFullName ?? '',
      customerEmail: detail.customerEmail ?? '',
      customerPhone: detail.customerPhone ?? '',
      baseAmountCents: detail.calculatedTotalCents,
    });

    if (detail.status === 'CONFIRMED') await this.repo.updateProjectStatus(projectId, 'CONVERTED_TO_ORDER');

    const existingLinkRows: { token: string; expires_at: Date }[] = await this.dataSource.query(
      `SELECT token, expires_at FROM public_links
       WHERE order_id = $1 AND link_type = 'PAYMENT_UPLOAD' AND revoked_at IS NULL
       ORDER BY created_at DESC LIMIT 1`,
      [order.id],
    );
    const reusedLink = existingLinkRows.length > 0;
    const link = reusedLink
      ? { token: existingLinkRows[0].token, expiresAt: existingLinkRows[0].expires_at }
      : await this.publicLinksService.generate({ linkType: 'PAYMENT_UPLOAD', orderId: order.id });
    const paymentUrl = `${frontendBase}/pagar/${link.token}`;

    if (!reusedLink) {
      await this.emailService.queue({
        eventType: 'PAYMENT_PROOF_RECEIVED_ADMIN',
        orderId: order.id,
        toEmail: detail.customerEmail ?? '',
        subject: 'PixelArt — Link de pago para tu Photobook',
        payload: { customerName: detail.customerFullName, paymentUrl, totalAmountCents: order.totalAmountCents },
      });
    }

    return {
      orderId: order.id,
      totalAmountCents: order.totalAmountCents,
      paymentLink: { token: link.token, url: paymentUrl, expiresAt: link.expiresAt },
    };
  }
}
