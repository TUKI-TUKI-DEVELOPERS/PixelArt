import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PublicLinksService } from '../../../public-links/public-links.service';
import { OrdersService } from '../../../orders/orders.service';
import { FileStoragePort } from '../../../assets/domain/ports/file-storage.port';

const STANDARD_ADDITIONAL = 12;
const PREMIUM_ADDITIONAL = 17;
const EXTRA_TEMPLATES_PRICE_CENTS = 5000; // S/ 50

export type SubmitCheckoutInput = {
  token: string;
  additionalTemplateIds: number[];
  packageType: 'STANDARD' | 'PREMIUM';
  paymentBuffer: Buffer;
  originalFilename: string;
  mimeType: string;
};

@Injectable()
export class SubmitCheckoutUseCase {
  constructor(
    private readonly publicLinksService: PublicLinksService,
    private readonly ordersService: OrdersService,
    private readonly fileStorage: FileStoragePort,
    private readonly dataSource: DataSource,
  ) {}

  async execute(input: SubmitCheckoutInput) {
    const link = await this.publicLinksService.validate(input.token);
    if (link.linkType !== 'CHECKOUT' || !link.orderId) {
      throw new BadRequestException('Link de checkout inválido');
    }

    const order = await this.ordersService.findById(link.orderId);
    if (!order) throw new NotFoundException('Orden no encontrada');
    if (!order.demoRequestId) throw new BadRequestException('Orden sin demo request asociada');

    // Check if payment proof already submitted
    const [existingProof] = await this.dataSource.query(
      `SELECT id FROM payment_proofs WHERE order_id = $1`,
      [order.id],
    );
    if (existingProof) throw new BadRequestException('Ya se envió el comprobante para esta orden');

    // Validate template count
    const expectedCount = input.packageType === 'PREMIUM' ? PREMIUM_ADDITIONAL : STANDARD_ADDITIONAL;
    if (input.additionalTemplateIds.length !== expectedCount) {
      throw new BadRequestException(
        `Debes seleccionar ${expectedCount} plantillas adicionales para el paquete ${input.packageType}`,
      );
    }

    // Validate templates belong to the correct model
    if (input.additionalTemplateIds.length > 0) {
      const validRows: { count: string }[] = await this.dataSource.query(
        `SELECT COUNT(*)::int AS count
         FROM personalized_templates
         WHERE id = ANY($1::bigint[])
           AND model_id = $2
           AND is_active = TRUE`,
        [input.additionalTemplateIds, order.personalizedModelId],
      );
      const validCount = Number(validRows[0]?.count ?? 0);
      if (validCount !== input.additionalTemplateIds.length) {
        throw new BadRequestException('Alguna plantilla seleccionada no pertenece al modelo de tu solicitud');
      }
    }

    // Update extra_templates_amount if premium
    if (input.packageType === 'PREMIUM') {
      await this.ordersService.updateExtraTemplates(order.id, EXTRA_TEMPLATES_PRICE_CENTS);
    }

    // Reload order to get updated total
    const updatedOrder = await this.ordersService.findById(order.id);
    if (!updatedOrder) throw new NotFoundException('Orden no encontrada');

    // Get original 3 template IDs from demo_template_selections
    const originalSelections: { template_id: string }[] = await this.dataSource.query(
      `SELECT template_id FROM demo_template_selections WHERE demo_request_id = $1`,
      [order.demoRequestId],
    );
    const originalIds = originalSelections.map((r) => Number(r.template_id));

    // Insert all order_template_selections (original 3 + additional)
    const allTemplateIds = [...originalIds, ...input.additionalTemplateIds];
    for (const templateId of allTemplateIds) {
      await this.dataSource.query(
        `INSERT INTO order_template_selections (order_id, template_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [order.id, templateId],
      );
    }

    // Upload payment proof to MinIO
    const ext = input.mimeType.includes('png') ? 'png' : 'jpg';
    const storageKey = `uploads/vouchers/${order.id}.${ext}`;
    await this.fileStorage.upload(storageKey, input.paymentBuffer, input.mimeType);

    // Insert payment_proof record
    await this.dataSource.query(
      `INSERT INTO payment_proofs (order_id, storage_key, original_filename, mime_type, size_bytes, payment_method, amount_cents)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        order.id,
        storageKey,
        input.originalFilename,
        input.mimeType,
        input.paymentBuffer.length,
        'YAPE_QR',
        updatedOrder.totalAmountCents,
      ],
    );

    return {
      success: true,
      totalAmountCents: updatedOrder.totalAmountCents,
      currency: updatedOrder.currency,
      message: 'Pedido confirmado. Tu comprobante será revisado pronto.',
    };
  }
}
