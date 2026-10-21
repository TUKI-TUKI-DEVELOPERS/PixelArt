import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PaymentsRepositoryPort } from './domain/ports/payments-repository.port';
import { PublicLinksService } from '../public-links/public-links.service';
import { OrdersService } from '../orders/orders.service';
import { FileStoragePort } from '../assets/domain/ports/file-storage.port';
import { EmailService, QueueEmailData } from '../email/email.service';
import { DataSource } from 'typeorm';
import { returningRows } from '../common/database/returning-rows';

export type PaymentReviewResult = {
  status: 'APPROVED' | 'REJECTED';
  alreadyReviewed?: true;
  rejectionReason?: string;
};

const ADMIN_NOTIFICATION_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'luccano5@hotmail.com';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly repo: PaymentsRepositoryPort,
    private readonly publicLinksService: PublicLinksService,
    private readonly ordersService: OrdersService,
    private readonly fileStorage: FileStoragePort,
    private readonly emailService: EmailService,
    private readonly dataSource: DataSource,
  ) {}

  /** Valida token PAYMENT_UPLOAD y devuelve detalle de orden */
  async getPaymentInfo(token: string) {
    const link = await this.publicLinksService.validate(token);
    if (link.linkType !== 'PAYMENT_UPLOAD' || !link.orderId) throw new BadRequestException('Link de pago inválido');
    const order = await this.ordersService.findById(link.orderId);
    if (!order) throw new NotFoundException('Orden no encontrada');
    const manualPricing = await this.isManuallyPriced(order.photobookProjectId);
    const customCoverSurchargeCents = manualPricing && order.photobookProjectId
      ? await this.getCustomCoverSurchargeCents(order.photobookProjectId)
      : null;
    return {
      orderId: order.id,
      customerName: order.customerFullName,
      ...(!manualPricing || customCoverSurchargeCents !== null
        ? { totalAmountCents: order.totalAmountCents }
        : {}),
      ...(customCoverSurchargeCents !== null ? { customCoverSurchargeCents } : {}),
      manualPricing,
      currency: order.currency,
      expiresAt: link.expiresAt,
    };
  }

  /** Cliente sube voucher. Persisted proofs can be resumed after a later step failed. */
  async uploadVoucher(token: string, buffer: Buffer, originalFilename: string, mimeType: string) {
    const link = await this.publicLinksService.validate(token);
    if (link.linkType !== 'PAYMENT_UPLOAD' || !link.orderId) throw new BadRequestException('Link de pago inválido');

    const order = await this.ordersService.findById(link.orderId);
    if (!order) throw new NotFoundException('Orden no encontrada');
    const manualPricing = await this.isManuallyPriced(order.photobookProjectId);
    let proof = await this.repo.findByOrderId(link.orderId);
    if (proof && proof.status !== 'PENDING') throw new BadRequestException('Ya se subió un voucher para esta orden');

    if (!proof) {
      // Unique per-attempt keys ensure a failed concurrent insert cannot delete another upload.
      const storageKey = `uploads/vouchers/${link.orderId}-${randomUUID()}.jpg`;
      await this.fileStorage.upload(storageKey, buffer, mimeType);
      try {
        proof = await this.repo.create({
          orderId: link.orderId,
          storageKey,
          originalFilename,
          mimeType,
          sizeBytes: buffer.length,
          paymentMethod: 'YAPE_QR',
          amountCents: manualPricing ? null : order.totalAmountCents,
        });
      } catch (error) {
        try {
          await this.fileStorage.delete(storageKey);
        } catch {
          // Keep the persistence error; an orphan can be cleaned up operationally.
        }
        throw error;
      }
    }

    if (order.status === 'AWAITING_PAYMENT_PROOF') {
      await this.ordersService.advanceStatus(link.orderId, 'UNDER_PAYMENT_REVIEW', 'Comprobante subido por el cliente');
    }

    const frontendBase = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    await this.queuePaymentEmailOnce({
      eventType: manualPricing ? 'CUSTOM_PHOTOBOOK_PAYMENT_TO_ADMIN' : 'NEW_PAYMENT_TO_ADMIN',
      orderId: order.id,
      toEmail: ADMIN_NOTIFICATION_EMAIL,
      subject: 'PixelArt — Nuevo comprobante de pago para revisar',
      payload: manualPricing
        ? { customerName: order.customerFullName, adminUrl: `${frontendBase}/admin/ordenes/${order.id}` }
        : { customerName: order.customerFullName, totalAmountCents: order.totalAmountCents, adminUrl: `${frontendBase}/admin/ordenes/${order.id}` },
    });

    if (order.channel === 'PHOTOBOOK') {
      await this.queuePaymentEmailOnce({
        eventType: manualPricing ? 'CUSTOM_PHOTOBOOK_PAYMENT_RECEIVED_TO_CUSTOMER' : 'PHOTOBOOK_PAYMENT_RECEIVED_TO_CUSTOMER',
        orderId: order.id,
        toEmail: order.customerEmail,
        subject: 'PixelArt — Recibimos tu comprobante de pago',
        payload: manualPricing ? { customerName: order.customerFullName } : { customerName: order.customerFullName, totalAmountCents: order.totalAmountCents },
      });
    }

    return { id: proof.id, status: proof.status, message: 'Voucher recibido. Tu pago será revisado pronto.' };
  }

  private async isManuallyPriced(photobookProjectId: number | null) {
    if (!photobookProjectId) return false;
    const rows = await this.dataSource.query(
      'SELECT id FROM custom_photobook_requests WHERE linked_photobook_project_id = $1 LIMIT 1',
      [photobookProjectId],
    );
    return rows.length > 0;
  }

  private async getCustomCoverSurchargeCents(photobookProjectId: number): Promise<number | null> {
    const rows: { draft_state: unknown }[] = await this.dataSource.query(
      'SELECT draft_state FROM photobook_projects WHERE id = $1',
      [photobookProjectId],
    );
    let state = rows[0]?.draft_state;
    if (typeof state === 'string') {
      try { state = JSON.parse(state) as unknown; } catch { return null; }
    }
    if (typeof state !== 'object' || state === null || Array.isArray(state)) return null;
    const surcharge = (state as Record<string, unknown>).customCoverSurchargeCents;
    return typeof surcharge === 'number' && Number.isSafeInteger(surcharge) && surcharge >= 0 ? surcharge : null;
  }

  private async queuePaymentEmailOnce(data: QueueEmailData) {
    await this.emailService.queueOnce(data);
  }

  async findByOrderId(orderId: number) {
    const proof = await this.repo.findByOrderId(orderId);
    if (!proof) return null;
    return { ...proof, voucherUrl: this.fileStorage.getPublicUrl(proof.storageKey) };
  }

  /**
   * Repeating the same decision (e.g. an admin double click) is idempotent and
   * reports `alreadyReviewed` so callers skip their side effects; the opposite
   * decision on a reviewed proof is refused.
   */
  async reviewPayment(orderId: number, action: 'APPROVE' | 'REJECT', rejectionReason?: string): Promise<PaymentReviewResult> {
    const targetStatus = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
    const proof = await this.repo.findByOrderId(orderId);
    if (!proof) throw new NotFoundException('No se encontró voucher para esta orden');
    if (proof.status !== 'PENDING') return this.resolveRepeatedReview(proof.status, targetStatus);

    // The PENDING guard makes the decision atomic: only one concurrent request can win it.
    const updated = returningRows<{ id: string }>(action === 'APPROVE'
      ? await this.dataSource.query(
        `UPDATE payment_proofs SET status = 'APPROVED', reviewed_at = NOW(), reviewed_by_user_id = 1
         WHERE order_id = $1 AND status = 'PENDING' RETURNING id`,
        [orderId],
      )
      : await this.dataSource.query(
        `UPDATE payment_proofs SET status = 'REJECTED', rejection_reason = $2, reviewed_at = NOW(), reviewed_by_user_id = 1
         WHERE order_id = $1 AND status = 'PENDING' RETURNING id`,
        [orderId, rejectionReason ?? null],
      ));
    if (updated.length === 0) {
      const current = await this.repo.findByOrderId(orderId);
      if (!current) throw new NotFoundException('No se encontró voucher para esta orden');
      return this.resolveRepeatedReview(current.status, targetStatus);
    }

    if (action === 'APPROVE') {
      // The admin order controller advances the status to PAYMENT_VERIFIED after this proof is approved.
      await this.dataSource.query(
        `UPDATE orders SET status = 'UNDER_PAYMENT_REVIEW' WHERE id = $1 AND status = 'AWAITING_PAYMENT_PROOF'`,
        [orderId],
      );
      return { status: 'APPROVED' };
    }
    return { status: 'REJECTED', rejectionReason };
  }

  /** Accepts a repeat of the stored decision; throws when it would contradict it. */
  private resolveRepeatedReview(currentStatus: string, targetStatus: 'APPROVED' | 'REJECTED'): PaymentReviewResult {
    if (currentStatus !== targetStatus) throw new BadRequestException('El voucher ya fue revisado');
    return { status: targetStatus, alreadyReviewed: true };
  }
}
