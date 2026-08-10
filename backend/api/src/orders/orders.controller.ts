import {
  Controller, Get, Post, Patch, Delete, Param, Query, Body, Inject, forwardRef, Logger,
  UploadedFile, UseInterceptors, BadRequestException, NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataSource } from 'typeorm';
import { OrdersService } from './orders.service';
import { PaymentsService } from '../payments/payments.service';
import { EmailService } from '../email/email.service';
import { PhotobookPdfService } from '../photobook/infrastructure/pdf/photobook-pdf.service';
import { CustomBookPdfService } from './infrastructure/pdf/custom-book-pdf.service';
import { GenerateOrderTemplateUseCase } from './application/use-cases/generate-order-template.use-case';
import { GenerateOrderCoverUseCase } from './application/use-cases/generate-order-cover.use-case';
import { GenerateOrderAddonUseCase } from './application/use-cases/generate-order-addon.use-case';
import { FileStoragePort } from '../assets/domain/ports/file-storage.port';

@Controller('admin/orders')
export class OrdersAdminController {
  private readonly logger = new Logger(OrdersAdminController.name);

  constructor(
    private readonly ordersService: OrdersService,
    private readonly paymentsService: PaymentsService,
    private readonly emailService: EmailService,
    @Inject(forwardRef(() => PhotobookPdfService))
    private readonly photobookPdfService: PhotobookPdfService,
    private readonly customBookPdfService: CustomBookPdfService,
    private readonly generateOrderTemplateUseCase: GenerateOrderTemplateUseCase,
    private readonly generateOrderCoverUseCase: GenerateOrderCoverUseCase,
    private readonly generateOrderAddonUseCase: GenerateOrderAddonUseCase,
    private readonly fileStorage: FileStoragePort,
    private readonly dataSource: DataSource,
  ) {}

  @Get()
  listAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async getDetail(@Param('id') id: string) {
    const orderId = Number(id);
    const order = await this.ordersService.findById(orderId);
    const events = await this.ordersService.getStatusEvents(orderId);
    const paymentProof = await this.paymentsService.findByOrderId(orderId);

    // Para libros personalizados: lista de plantillas seleccionadas
    let templateSelections: { templateId: number; templateName: string | null; slotIndex: number; hasPromptContent: boolean }[] = [];
    if (order?.channel === 'CUSTOM_BOOK') {
      const rows: { template_id: string; name: string | null; has_prompt_content: boolean }[] = await this.dataSource.query(
        `SELECT ots.template_id, pt.name,
                (pt.scene_visual IS NOT NULL AND pt.poem_template IS NOT NULL AND pt.character_roles IS NOT NULL) AS has_prompt_content
         FROM order_template_selections ots
         LEFT JOIN personalized_templates pt ON pt.id = ots.template_id
         WHERE ots.order_id = $1
         ORDER BY ots.id ASC`,
        [orderId],
      );
      templateSelections = rows.map((r, i) => ({
        templateId: Number(r.template_id),
        templateName: r.name,
        slotIndex: i,
        hasPromptContent: r.has_prompt_content,
      }));
    }

    // characterMeta + fotos del cliente — necesarios para el selector de fotos
    // del botón "Generar con IA" (mismo dato que ya usa solicitudes/[id]).
    let characterMeta: Record<string, unknown> | null = null;
    let demoAssetIds: number[] = [];
    let demoDedicationText: string | null = null;
    if (order?.demoRequestId) {
      const [demoRow] = await this.dataSource.query(
        `SELECT character_meta, dedication_text FROM demo_request WHERE id = $1`,
        [order.demoRequestId],
      ) as { character_meta: Record<string, unknown> | null; dedication_text: string | null }[];
      characterMeta = demoRow?.character_meta ?? null;
      demoDedicationText = demoRow?.dedication_text ?? null;

      const assetRows: { asset_id: string }[] = await this.dataSource.query(
        `SELECT asset_id FROM demo_request_assets WHERE demo_request_id = $1`,
        [order.demoRequestId],
      );
      demoAssetIds = assetRows.map((r) => Number(r.asset_id));
    }

    // Diseño del libro (degradado + dedicatoria editable por el admin) — ver
    // custom-book-pdf.service.ts, que usa estos mismos valores para el PDF.
    const [designRow] = await this.dataSource.query(
      `SELECT gradient_color_start, gradient_color_end, dedication_text FROM orders WHERE id = $1`,
      [orderId],
    ) as { gradient_color_start: string; gradient_color_end: string; dedication_text: string | null }[];

    return {
      ...order,
      statusEvents: events,
      paymentProof,
      templateSelections,
      characterMeta,
      demoAssetIds,
      demoDedicationText,
      dedicationText: designRow?.dedication_text ?? null,
      gradientColorStart: designRow?.gradient_color_start ?? '#DF1F74',
      gradientColorEnd: designRow?.gradient_color_end ?? '#804187',
    };
  }

  @Post(':id/review-payment')
  async reviewPayment(
    @Param('id') id: string,
    @Body() body: { action: 'APPROVE' | 'REJECT'; rejectionReason?: string },
  ) {
    const result = await this.paymentsService.reviewPayment(Number(id), body.action, body.rejectionReason);

    if (body.action === 'APPROVE') {
      await this.ordersService.advanceStatus(Number(id), 'PAYMENT_VERIFIED', 'Pago aprobado por admin');
      const order = await this.ordersService.findById(Number(id));
      if (order) {
        await this.emailService.queue({
          eventType: 'PAYMENT_APPROVED_TO_CUSTOMER',
          orderId: order.id,
          toEmail: order.customerEmail,
          subject: 'PixelArt — Tu pago fue aprobado',
          payload: { customerName: order.customerFullName, estimatedDeliveryDate: order.estimatedDeliveryDate },
        });

        // Disparar generación de PDF en background si es un photobook
        if (order.channel === 'PHOTOBOOK' && order.photobookProjectId) {
          const projectId = order.photobookProjectId;
          void this.photobookPdfService.generateAndStore(projectId).catch((err: Error) => {
            this.logger.error(`Error generando PDF para proyecto #${projectId}: ${err.message}`);
          });
        }
      }
    } else if (body.action === 'REJECT') {
      const order = await this.ordersService.findById(Number(id));
      if (order) {
        await this.emailService.queue({
          eventType: 'PAYMENT_REJECTED_TO_CUSTOMER',
          orderId: order.id,
          toEmail: order.customerEmail,
          subject: 'PixelArt — Hubo un problema con tu pago',
          payload: {
            customerName: order.customerFullName,
            rejectionReason: body.rejectionReason ?? 'No especificado',
          },
        });
      }
    }

    return result;
  }

  @Post(':id/advance-status')
  advanceStatus(
    @Param('id') id: string,
    @Body() body: { newStatus: string; note?: string },
  ) {
    return this.ordersService.advanceStatus(Number(id), body.newStatus, body.note);
  }

  /**
   * PATCH /api/admin/orders/:id/print-design
   * Guarda el "diseño del libro" para el PDF de imprenta — colores del
   * degradado y el texto final de la dedicatoria (el admin puede editar el
   * mensaje del cliente antes de que se use, ej. si pidió un cambio de
   * último momento por fuera del sistema). dedicationText null/vacío borra
   * el override y vuelve a usar el original del cliente (demo_request).
   */
  @Patch(':id/print-design')
  async savePrintDesign(
    @Param('id') id: string,
    @Body() body: { dedicationText?: string | null; gradientColorStart?: string; gradientColorEnd?: string },
  ) {
    const orderId = Number(id);
    await this.dataSource.query(
      `UPDATE orders SET dedication_text = $1, gradient_color_start = $2, gradient_color_end = $3 WHERE id = $4`,
      [
        body.dedicationText?.trim() || null,
        body.gradientColorStart ?? '#DF1F74',
        body.gradientColorEnd ?? '#804187',
        orderId,
      ],
    );
    return { saved: true };
  }

  // ── Print assets (libros personalizados) ──────────────────────────────────

  @Get(':id/print-assets')
  async getPrintAssets(@Param('id') id: string) {
    const rows: { id: string; asset_type: string; template_id: string | null; slot_index: number | null; page_part: string; storage_key: string; original_filename: string | null; uploaded_at: Date; status: string }[] =
      await this.dataSource.query(
        `SELECT pa.id, pa.asset_type, pa.template_id, pa.slot_index, pa.page_part, pa.storage_key, pa.original_filename, pa.uploaded_at, pa.status,
                pt.name AS template_name
         FROM order_print_assets pa
         LEFT JOIN personalized_templates pt ON pt.id = pa.template_id
         WHERE pa.order_id = $1
         ORDER BY
           CASE pa.asset_type
             WHEN 'COVER'                THEN 0
             WHEN 'BLANK_PRE_DEDICATION' THEN 1
             WHEN 'DEDICATION'           THEN 2
             WHEN 'TEMPLATE'             THEN 3
             WHEN 'BLANK_PRE_ADDON'      THEN 4
             WHEN 'ADDON'                THEN 5
             WHEN 'BACK_COVER'           THEN 6
             ELSE 7
           END,
           pa.slot_index ASC NULLS LAST,
           pa.page_part ASC`,
        [Number(id)],
      );
    return rows.map((r) => ({
      id: Number(r.id),
      assetType: r.asset_type,
      templateId: r.template_id ? Number(r.template_id) : null,
      templateName: (r as { template_name?: string }).template_name ?? null,
      slotIndex: r.slot_index,
      pagePart: r.page_part,
      storageKey: r.storage_key,
      originalFilename: r.original_filename,
      // El storage_key es siempre el mismo por (orden, plantilla, cara) — al
      // regenerar se pisa el archivo en MinIO pero la URL quedaría idéntica,
      // así que el navegador serviría la versión vieja cacheada sin este
      // cache-buster (mismo patrón que ya se usa para el PDF con ?v=).
      previewUrl: `${this.fileStorage.getPublicUrl(r.storage_key)}?v=${new Date(r.uploaded_at).getTime()}`,
      uploadedAt: r.uploaded_at,
      status: r.status,
    }));
  }

  @Post(':id/print-assets')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 50 * 1024 * 1024 } }))
  async uploadPrintAsset(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { assetType: string; templateId?: string; slotIndex?: string; pagePart?: string },
  ) {
    if (!file) throw new BadRequestException('Archivo requerido');
    const VALID_TYPES = ['COVER','BLANK_PRE_DEDICATION','DEDICATION','TEMPLATE','BLANK_PRE_ADDON','ADDON','BACK_COVER'];
    if (!VALID_TYPES.includes(body.assetType)) {
      throw new BadRequestException(`assetType debe ser uno de: ${VALID_TYPES.join(', ')}`);
    }
    if (body.assetType === 'TEMPLATE' && !body.templateId) {
      throw new BadRequestException('templateId requerido para TEMPLATE');
    }
    if (body.assetType === 'TEMPLATE' && !body.pagePart) {
      throw new BadRequestException('pagePart requerido para TEMPLATE (A o B)');
    }

    const orderId    = Number(id);
    const templateId = body.templateId ? Number(body.templateId) : null;
    const slotIndex  = body.slotIndex  ? Number(body.slotIndex)  : null;
    const pagePart   = body.pagePart   ?? 'ONLY';
    const ext        = file.mimetype.includes('png') ? 'png' : file.mimetype.includes('pdf') ? 'pdf' : 'jpg';
    const suffix     = templateId ? `template_${templateId}_${pagePart.toLowerCase()}` : body.assetType.toLowerCase();
    const storageKey = `custom-books/print-assets/${orderId}/${suffix}.${ext}`;

    await this.fileStorage.upload(storageKey, file.buffer, file.mimetype);

    if (templateId !== null) {
      // Si se sube Cara A o B, eliminar la fila 'ONLY' vieja del mismo template (migración de single → double page)
      if (pagePart === 'A' || pagePart === 'B') {
        await this.dataSource.query(
          `DELETE FROM order_print_assets WHERE order_id = $1 AND template_id = $2 AND page_part = 'ONLY'`,
          [orderId, templateId],
        );
      }
      // TEMPLATE: upsert por (order_id, template_id, page_part) — el upload manual
      // siempre entra CONFIRMED (un humano ya lo vetó), pisando cualquier
      // PENDING_REVIEW que hubiera quedado de una generación con IA.
      await this.dataSource.query(
        `INSERT INTO order_print_assets (order_id, asset_type, template_id, slot_index, page_part, storage_key, original_filename, mime_type, size_bytes, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'CONFIRMED')
         ON CONFLICT (order_id, template_id, page_part) WHERE template_id IS NOT NULL
         DO UPDATE SET storage_key = $6, original_filename = $7, mime_type = $8, size_bytes = $9, status = 'CONFIRMED', uploaded_at = now()`,
        [orderId, body.assetType, templateId, slotIndex, pagePart, storageKey, file.originalname, file.mimetype, file.size],
      );
    } else {
      // Páginas simples: upsert por (order_id, asset_type) WHERE template_id IS NULL
      await this.dataSource.query(
        `INSERT INTO order_print_assets (order_id, asset_type, template_id, slot_index, page_part, storage_key, original_filename, mime_type, size_bytes, status)
         VALUES ($1, $2, NULL, $3, $4, $5, $6, $7, $8, 'CONFIRMED')
         ON CONFLICT (order_id, asset_type) WHERE template_id IS NULL
         DO UPDATE SET storage_key = $5, original_filename = $6, mime_type = $7, size_bytes = $8, status = 'CONFIRMED', uploaded_at = now()`,
        [orderId, body.assetType, slotIndex, pagePart, storageKey, file.originalname, file.mimetype, file.size],
      );
    }

    return { storageKey, previewUrl: this.fileStorage.getPublicUrl(storageKey) };
  }

  /**
   * POST /api/admin/orders/:id/print-assets/backfill-from-demo
   * Las plantillas del pedido que ya tenían un original limpio generado en la
   * demo (demo_proposals.original_storage_key) se cargan solas como
   * PENDING_REVIEW — no hace falta gastar una llamada nueva a OpenAI para algo
   * que el cliente ya vio y eligió. Idempotente: no toca plantillas que ya
   * tengan cualquier archivo de imprenta (manual, generado, o backfillado antes).
   * El frontend la llama sola al abrir la orden.
   */
  @Post(':id/print-assets/backfill-from-demo')
  backfillFromDemo(@Param('id') id: string) {
    return this.generateOrderTemplateUseCase.backfillFromDemoOriginals(Number(id));
  }

  /**
   * POST /api/admin/orders/:id/print-assets/generate
   * Query: templateId
   * Body opcional: { selectedAssetIds: { [roleKey]: assetId } }
   * Genera Cara A y Cara B con IA (mismo prompt/fotos que el demo) y las sube
   * directo como archivos de imprenta — sin marca de agua, listo para el PDF.
   */
  @Post(':id/print-assets/generate')
  generatePrintAsset(
    @Param('id') id: string,
    @Query('templateId') templateId: string,
    @Body('selectedAssetIds') selectedAssetIds?: Record<string, number>,
  ) {
    if (!templateId) throw new BadRequestException('templateId is required');
    return this.generateOrderTemplateUseCase.execute({
      orderId: Number(id),
      templateId: Number(templateId),
      selectedAssetIds,
    });
  }

  /**
   * POST /api/admin/orders/:id/print-assets/generate-cover
   * Body opcional: { selectedAssetIds: { [roleKey]: assetId } }
   * Genera la TAPA con IA (fotos reales del cliente) y la sube directo como
   * archivo de imprenta, PENDING_REVIEW. Mismo patrón que .../generate para TEMPLATE.
   */
  @Post(':id/print-assets/generate-cover')
  generateCover(
    @Param('id') id: string,
    @Body('selectedAssetIds') selectedAssetIds?: Record<string, number>,
  ) {
    return this.generateOrderCoverUseCase.generateCover({ orderId: Number(id), selectedAssetIds });
  }

  /**
   * POST /api/admin/orders/:id/print-assets/generate-back-cover
   * Genera la CONTRATAPA con IA (sin fotos reales, solo diseño/copy) y la
   * sube directo como archivo de imprenta, PENDING_REVIEW.
   */
  @Post(':id/print-assets/generate-back-cover')
  generateBackCover(@Param('id') id: string) {
    return this.generateOrderCoverUseCase.generateBackCover({ orderId: Number(id) });
  }

  /**
   * GET /api/admin/orders/:id/cross-sell-candidates
   * Lista todos los libros elegibles para la página de venta cruzada (activo,
   * con miniatura y slug cargados, excluye el libro de esta orden) — para que
   * el admin elija hasta 3 en vez de dejarlo al azar.
   */
  @Get(':id/cross-sell-candidates')
  listCrossSellCandidates(@Param('id') id: string) {
    return this.generateOrderAddonUseCase.listCandidates(Number(id));
  }

  /**
   * POST /api/admin/orders/:id/print-assets/generate-addon
   * Body opcional: { selectedModelIds: number[] } — hasta 3, elegidos por el
   * admin. Sin body, cae al azar (comportamiento original).
   * Genera la página de venta cruzada SIN IA (maquetación con miniaturas y
   * slugs de otros libros del catálogo) y la sube como PENDING_REVIEW. Si la
   * orden ya tiene un ADDON subido manualmente, esto lo reemplaza.
   */
  @Post(':id/print-assets/generate-addon')
  generateAddon(@Param('id') id: string, @Body('selectedModelIds') selectedModelIds?: number[]) {
    return this.generateOrderAddonUseCase.generateAddon(Number(id), selectedModelIds);
  }

  /**
   * POST /api/admin/orders/:id/character-photos
   * Body: { roleKey: string; oldAssetId?: number; newAssetId: number }
   * Con oldAssetId: reemplaza ESA foto puntual del rol por newAssetId (las
   * demás fotos del rol quedan intactas). Sin oldAssetId: agrega newAssetId
   * como opción nueva (para roles que se quedaron con menos fotos de las
   * que deberían — ej. por un reemplazo viejo que pisaba el array entero).
   * La foto vieja no se borra de la tabla assets, solo deja de estar
   * referenciada acá. Afecta a todas las plantillas de la orden que usen
   * ese rol, no solo la que se esté generando en el momento.
   */
  @Post(':id/character-photos')
  async replaceCharacterPhoto(
    @Param('id') id: string,
    @Body('roleKey') roleKey: string,
    @Body('oldAssetId') oldAssetId: number | undefined,
    @Body('newAssetId') newAssetId: number,
  ) {
    if (!roleKey || !newAssetId) {
      throw new BadRequestException('roleKey y newAssetId son requeridos');
    }

    const order = await this.ordersService.findById(Number(id));
    if (!order?.demoRequestId) throw new BadRequestException('Orden sin demo request asociada');

    const [assetRow] = await this.dataSource.query(`SELECT id FROM assets WHERE id = $1`, [newAssetId]);
    if (!assetRow) throw new NotFoundException('No se encontró la foto subida');

    const [demoRow] = (await this.dataSource.query(
      `SELECT character_meta FROM demo_request WHERE id = $1`,
      [order.demoRequestId],
    )) as { character_meta: Record<string, unknown> | null }[];
    const characterMeta = demoRow?.character_meta ?? {};

    const target = this.resolveCharacterMetaTarget(characterMeta, roleKey);
    if (!target) throw new BadRequestException(`No se encontró el rol "${roleKey}" en esta orden`);

    target.assetIds = target.assetIds ?? [];
    if (oldAssetId) {
      const index = target.assetIds.indexOf(oldAssetId);
      if (index === -1) throw new BadRequestException('Esa foto ya no pertenece a este rol — refrescá la página e intentá de nuevo');
      target.assetIds[index] = newAssetId;
    } else if (!target.assetIds.includes(newAssetId)) {
      target.assetIds.push(newAssetId);
    }

    await this.dataSource.query(`UPDATE demo_request SET character_meta = $1 WHERE id = $2`, [
      JSON.stringify(characterMeta),
      order.demoRequestId,
    ]);

    // demoAssetIds (para resolver la URL del thumbnail en el admin) sale de
    // esta tabla, no de character_meta directamente.
    await this.dataSource.query(
      `INSERT INTO demo_request_assets (demo_request_id, asset_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [order.demoRequestId, newAssetId],
    );

    return { characterMeta };
  }

  /** roleKey plano ("papa", "pet", "recipient") apunta directo a
   * characterMeta[roleKey]; indexado ("hijos[0]", "owners[1]") apunta a un
   * elemento de una lista — mismo formato que ya arma el frontend en
   * ordenes/[id]/page.tsx al construir los roleKey de photoGroups. */
  private resolveCharacterMetaTarget(
    characterMeta: Record<string, unknown>,
    roleKey: string,
  ): { name?: string; assetIds?: number[] } | null {
    const match = roleKey.match(/^([a-zA-Z]+)\[(\d+)\]$/);
    if (match) {
      const [, listKey, indexStr] = match;
      const list = characterMeta[listKey];
      if (!Array.isArray(list)) return null;
      return (list[Number(indexStr)] as { name?: string; assetIds?: number[] } | undefined) ?? null;
    }
    const value = characterMeta[roleKey];
    return value && typeof value === 'object' ? (value as { name?: string; assetIds?: number[] }) : null;
  }

  /**
   * POST /api/admin/orders/:id/print-assets/confirm
   * Pasa TODAS las plantillas generadas con IA que estén PENDING_REVIEW a
   * CONFIRMED de una — recién ahí cuentan para el checklist y el PDF final.
   */
  @Post(':id/print-assets/confirm')
  async confirmPrintAssets(@Param('id') id: string) {
    const rows: { id: string }[] = await this.dataSource.query(
      `UPDATE order_print_assets SET status = 'CONFIRMED' WHERE order_id = $1 AND status = 'PENDING_REVIEW' RETURNING id`,
      [Number(id)],
    );
    return { confirmed: rows.length };
  }

  @Delete(':id/print-assets/:assetId')
  async deletePrintAsset(@Param('id') id: string, @Param('assetId') assetId: string) {
    const rows: { storage_key: string }[] = await this.dataSource.query(
      `DELETE FROM order_print_assets WHERE id = $1 AND order_id = $2 RETURNING storage_key`,
      [Number(assetId), Number(id)],
    );
    if (rows.length === 0) throw new NotFoundException('Asset no encontrado');
    try { await this.fileStorage.delete(rows[0].storage_key); } catch { /* ignorar si falla el borrado del archivo */ }
    return { deleted: true };
  }

  @Post(':id/render')
  async renderCustomBook(@Param('id') id: string) {
    const order = await this.ordersService.findById(Number(id));
    if (!order || order.channel !== 'CUSTOM_BOOK') {
      throw new BadRequestException('Esta orden no es un libro personalizado');
    }
    void this.customBookPdfService.generateAndStore(Number(id)).catch((err: Error) => {
      this.logger.error(`Error generando PDF orden #${id}: ${err.message}`);
    });
    return { queued: true };
  }

  @Get(':id/render')
  async getCustomBookRender(@Param('id') id: string) {
    const rows: { pdf_storage_key: string; generated_at: Date }[] = await this.dataSource.query(
      `SELECT pdf_storage_key, generated_at FROM custom_book_renders WHERE order_id = $1`,
      [Number(id)],
    );
    if (rows.length === 0) throw new NotFoundException('PDF no generado aún');
    return {
      pdfUrl: this.customBookPdfService.getPdfUrl(rows[0].pdf_storage_key),
      generatedAt: rows[0].generated_at,
    };
  }
}
