import {
  Controller, Get, Post, Param, Body, Inject, forwardRef, Logger,
  UploadedFile, UseInterceptors, BadRequestException, NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataSource } from 'typeorm';
import { OrdersService } from './orders.service';
import { PaymentsService } from '../payments/payments.service';
import { EmailService } from '../email/email.service';
import { PhotobookPdfService } from '../photobook/infrastructure/pdf/photobook-pdf.service';
import { CustomBookPdfService } from './infrastructure/pdf/custom-book-pdf.service';
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
    let templateSelections: { templateId: number; templateName: string | null; slotIndex: number }[] = [];
    if (order?.channel === 'CUSTOM_BOOK') {
      const rows: { template_id: string; name: string | null }[] = await this.dataSource.query(
        `SELECT ots.template_id, pt.name
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
      }));
    }

    return { ...order, statusEvents: events, paymentProof, templateSelections };
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

  // ── Print assets (libros personalizados) ──────────────────────────────────

  @Get(':id/print-assets')
  async getPrintAssets(@Param('id') id: string) {
    const rows: { id: string; asset_type: string; template_id: string | null; slot_index: number | null; storage_key: string; original_filename: string | null; uploaded_at: Date }[] =
      await this.dataSource.query(
        `SELECT pa.id, pa.asset_type, pa.template_id, pa.slot_index, pa.storage_key, pa.original_filename, pa.uploaded_at,
                pt.name AS template_name
         FROM order_print_assets pa
         LEFT JOIN personalized_templates pt ON pt.id = pa.template_id
         WHERE pa.order_id = $1
         ORDER BY
           CASE pa.asset_type WHEN 'COVER' THEN 0 WHEN 'TEMPLATE' THEN 1 ELSE 2 END,
           pa.slot_index ASC NULLS LAST`,
        [Number(id)],
      );
    return rows.map((r) => ({
      id: Number(r.id),
      assetType: r.asset_type,
      templateId: r.template_id ? Number(r.template_id) : null,
      templateName: (r as { template_name?: string }).template_name ?? null,
      slotIndex: r.slot_index,
      storageKey: r.storage_key,
      originalFilename: r.original_filename,
      previewUrl: this.fileStorage.getPublicUrl(r.storage_key),
      uploadedAt: r.uploaded_at,
    }));
  }

  @Post(':id/print-assets')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 50 * 1024 * 1024 } }))
  async uploadPrintAsset(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { assetType: string; templateId?: string; slotIndex?: string },
  ) {
    if (!file) throw new BadRequestException('Archivo requerido');
    if (!['COVER', 'BACK_COVER', 'TEMPLATE'].includes(body.assetType)) {
      throw new BadRequestException('assetType debe ser COVER, BACK_COVER o TEMPLATE');
    }
    if (body.assetType === 'TEMPLATE' && !body.templateId) {
      throw new BadRequestException('templateId requerido para TEMPLATE');
    }

    const orderId    = Number(id);
    const templateId = body.templateId ? Number(body.templateId) : null;
    const slotIndex  = body.slotIndex  ? Number(body.slotIndex)  : null;
    const ext        = file.mimetype.includes('png') ? 'png' : file.mimetype.includes('pdf') ? 'pdf' : 'jpg';
    const suffix     = templateId ? `template_${templateId}` : body.assetType.toLowerCase();
    const storageKey = `custom-books/print-assets/${orderId}/${suffix}.${ext}`;

    await this.fileStorage.upload(storageKey, file.buffer, file.mimetype);

    if (templateId !== null) {
      // TEMPLATE: upsert por (order_id, asset_type, template_id)
      await this.dataSource.query(
        `INSERT INTO order_print_assets (order_id, asset_type, template_id, slot_index, storage_key, original_filename, mime_type, size_bytes)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (order_id, asset_type, template_id)
         DO UPDATE SET storage_key = $5, original_filename = $6, mime_type = $7, size_bytes = $8, uploaded_at = now()`,
        [orderId, body.assetType, templateId, slotIndex, storageKey, file.originalname, file.mimetype, file.size],
      );
    } else {
      // COVER / BACK_COVER: upsert usando el índice parcial (template_id IS NULL)
      await this.dataSource.query(
        `INSERT INTO order_print_assets (order_id, asset_type, template_id, slot_index, storage_key, original_filename, mime_type, size_bytes)
         VALUES ($1, $2, NULL, $3, $4, $5, $6, $7)
         ON CONFLICT (order_id, asset_type) WHERE template_id IS NULL
         DO UPDATE SET storage_key = $4, original_filename = $5, mime_type = $6, size_bytes = $7, uploaded_at = now()`,
        [orderId, body.assetType, slotIndex, storageKey, file.originalname, file.mimetype, file.size],
      );
    }

    return { storageKey, previewUrl: this.fileStorage.getPublicUrl(storageKey) };
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
