import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PaymentsRepositoryPort } from './domain/ports/payments-repository.port';
import { PublicLinksService } from '../public-links/public-links.service';
import { OrdersService } from '../orders/orders.service';
import { FileStoragePort } from '../assets/domain/ports/file-storage.port';
import { EmailService, QueueEmailData } from '../email/email.service';
import { DataSource } from 'typeorm';

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
    return {
      orderId: order.id,
      customerName: order.customerFullName,
      ...(!manualPricing ? { totalAmountCents: order.totalAmountCents } : {}),
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

  private async queuePaymentEmailOnce(data: QueueEmailData) {
    await this.emailService.queueOnce(data);
  }

  async findByOrderId(orderId: number) {
    const proof = await this.repo.findByOrderId(orderId);
    if (!proof) return null;
    return { ...proof, voucherUrl: this.fileStorage.getPublicUrl(proof.storageKey) };
  }

  async reviewPayment(orderId: number, action: 'APPROVE' | 'REJECT', rejectionReason?: string) {
    const proof = await this.repo.findByOrderId(orderId);
    if (!proof) throw new NotFoundException('No se encontró voucher para esta orden');
    if (proof.status !== 'PENDING') throw new BadRequestException('El voucher ya fue revisado');

    if (action === 'APPROVE') {
      await this.dataSource.query(
        `UPDATE payment_proofs SET status = 'APPROVED', reviewed_at = NOW(), reviewed_by_user_id = 1 WHERE order_id = $1`,
        [orderId],
      );
      // The admin order controller advances the status to PAYMENT_VERIFIED after this proof is approved.
      await this.dataSource.query(
        `UPDATE orders SET status = 'UNDER_PAYMENT_REVIEW' WHERE id = $1 AND status = 'AWAITING_PAYMENT_PROOF'`,
        [orderId],
      );
      return { status: 'APPROVED' };
    }

    await this.dataSource.query(
      `UPDATE payment_proofs SET status = 'REJECTED', rejection_reason = $2, reviewed_at = NOW(), reviewed_by_user_id = 1 WHERE order_id = $1`,
      [orderId, rejectionReason ?? null],
    );
    return { status: 'REJECTED', rejectionReason };
  }
}
