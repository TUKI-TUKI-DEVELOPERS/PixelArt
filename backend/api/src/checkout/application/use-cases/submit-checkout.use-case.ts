import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PublicLinksService } from '../../../public-links/public-links.service';
import { OrdersService } from '../../../orders/orders.service';
import { FileStoragePort } from '../../../assets/domain/ports/file-storage.port';
import { EmailService } from '../../../email/email.service';
import { PublicLink } from '../../../public-links/domain/public-link';
import { detectPaymentProofImage, INVALID_PAYMENT_PROOF_MESSAGE } from '../../../payments/domain/payment-proof-file';
import { AppliedOrderPromotion, OrderRecord } from '../../../orders/domain/ports/order-repository.port';
import { EvaluatePromoCodeUseCase } from '../../../promotions/application/use-cases/evaluate-promo-code.use-case';
import { isPromoRejected } from '../../../promotions/domain/services/promo-code-evaluator';
import { normalizePromoCode } from '../../../promotions/domain/value-objects/promo-code';
import { discountableBaseCents, extraTemplatesAmountFor } from '../../domain/checkout-pricing';
import { appliedPromotionOf, promoRejectionException } from '../checkout-promotion';

const STANDARD_ADDITIONAL = 7;   // 10 plantillas total − 3 del demo
const PREMIUM_ADDITIONAL = 12;   // 15 plantillas total − 3 del demo
const ADMIN_NOTIFICATION_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'luccano5@hotmail.com';

export type SubmitCheckoutInput = {
  token: string;
  additionalTemplateIds: number[];
  packageType: 'STANDARD' | 'PREMIUM';
  paymentBuffer: Buffer;
  originalFilename: string;
  mimeType: string;
  /** Optional promotion code; re-validated here, never trusted from the client. */
  promoCode?: string | null;
};

@Injectable()
export class SubmitCheckoutUseCase {
  constructor(
    private readonly publicLinksService: PublicLinksService,
    private readonly ordersService: OrdersService,
    private readonly fileStorage: FileStoragePort,
    private readonly emailService: EmailService,
    private readonly dataSource: DataSource,
    private readonly evaluatePromoCode: EvaluatePromoCodeUseCase,
  ) {}

  async execute(input: SubmitCheckoutInput) {
    // Validate the real bytes first, before any side effect; the client mimetype is never trusted.
    const voucher = detectPaymentProofImage(input.paymentBuffer);
    if (!voucher) throw new BadRequestException(INVALID_PAYMENT_PROOF_MESSAGE);

    const link: PublicLink = await this.publicLinksService.validate(input.token);
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

    // Package amount + promotion snapshot + total, in one guarded update.
    // The code is validated before any write, so a rejection leaves no side effects.
    const extraTemplatesAmountCents = extraTemplatesAmountFor(input.packageType);
    const promotion = await this.resolvePromotion(order, input.promoCode, extraTemplatesAmountCents);
    const stored = await this.ordersService.applyCheckoutPricing(order.id, { extraTemplatesAmountCents, promotion });
    if (!stored) throw promoRejectionException('already_applied');

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
    const storageKey = `uploads/vouchers/${order.id}.${voucher.extension}`;
    await this.fileStorage.upload(storageKey, input.paymentBuffer, voucher.mimeType);

    // Insert payment_proof record
    await this.dataSource.query(
      `INSERT INTO payment_proofs (order_id, storage_key, original_filename, mime_type, size_bytes, payment_method, amount_cents)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        order.id,
        storageKey,
        input.originalFilename,
        voucher.mimeType,
        input.paymentBuffer.length,
        'YAPE_QR',
        updatedOrder.totalAmountCents,
      ],
    );

    // Revocar el link para que no pueda ser usado nuevamente
    await this.publicLinksService.revoke(link.id);

    // Avanzar la orden a UNDER_PAYMENT_REVIEW automáticamente
    await this.ordersService.advanceStatus(
      order.id,
      'UNDER_PAYMENT_REVIEW',
      'Comprobante enviado por el cliente',
    );

    const frontendBase = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    await this.emailService.queue({
      eventType: 'NEW_PAYMENT_TO_ADMIN',
      orderId: order.id,
      toEmail: ADMIN_NOTIFICATION_EMAIL,
      subject: 'PixelArt — Nuevo comprobante de pago para revisar',
      payload: {
        customerName: updatedOrder.customerFullName,
        totalAmountCents: updatedOrder.totalAmountCents,
        adminUrl: `${frontendBase}/admin/ordenes/${order.id}`,
      },
    });

    return {
      success: true,
      totalAmountCents: updatedOrder.totalAmountCents,
      currency: updatedOrder.currency,
      message: 'Pedido confirmado. Tu comprobante será revisado pronto.',
    };
  }

  /**
   * One code per order: an order that already holds a code keeps it (the same
   * code again is idempotent, a different one is rejected); otherwise the typed
   * code, if any, is validated against the product price only.
   */
  private async resolvePromotion(
    order: OrderRecord,
    promoCode: string | null | undefined,
    extraTemplatesAmountCents: number,
  ): Promise<AppliedOrderPromotion | null> {
    const applied = appliedPromotionOf(order);
    const code = normalizePromoCode(promoCode) || applied?.code || '';
    if (!code) return null;
    if (!order.personalizedModelId) throw promoRejectionException('not_applicable');

    const evaluation = await this.evaluatePromoCode.execute({
      code,
      product: { kind: 'PERSONALIZED_BOOK', modelId: order.personalizedModelId },
      discountableBaseCents: discountableBaseCents({ baseAmountCents: order.baseAmountCents, extraTemplatesAmountCents }),
      applied,
    });
    if (isPromoRejected(evaluation)) throw promoRejectionException(evaluation.reason);
    return {
      promotionId: evaluation.promotionId,
      code: evaluation.code,
      percent: evaluation.percent,
      discountCents: evaluation.discountCents,
    };
  }
}
