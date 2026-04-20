import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PaymentsRepositoryPort } from './domain/ports/payments-repository.port';
import { PublicLinksService } from '../public-links/public-links.service';
import { OrdersService } from '../orders/orders.service';
import { FileStoragePort } from '../assets/domain/ports/file-storage.port';
import { DataSource } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly repo: PaymentsRepositoryPort,
    private readonly publicLinksService: PublicLinksService,
    private readonly ordersService: OrdersService,
    private readonly fileStorage: FileStoragePort,
    private readonly dataSource: DataSource,
  ) {}

  /** Valida token PAYMENT_UPLOAD y devuelve detalle de orden */
  async getPaymentInfo(token: string) {
    const link = await this.publicLinksService.validate(token);
    if (link.linkType !== 'PAYMENT_UPLOAD' || !link.orderId) {
      throw new BadRequestException('Link de pago inválido');
    }
    const order = await this.ordersService.findById(link.orderId);
    if (!order) throw new NotFoundException('Orden no encontrada');

    return {
      orderId: order.id,
      customerName: order.customerFullName,
      totalAmountCents: order.totalAmountCents,
      currency: order.currency,
      expiresAt: link.expiresAt,
    };
  }

  /** Cliente sube voucher */
  async uploadVoucher(token: string, buffer: Buffer, originalFilename: string, mimeType: string) {
    const link = await this.publicLinksService.validate(token);
    if (link.linkType !== 'PAYMENT_UPLOAD' || !link.orderId) {
      throw new BadRequestException('Link de pago inválido');
    }

    // Check if already has a voucher
    const existing = await this.repo.findByOrderId(link.orderId);
    if (existing) throw new BadRequestException('Ya se subió un voucher para esta orden');

    // Upload to MinIO
    const storageKey = `uploads/vouchers/${link.orderId}.jpg`;
    await this.fileStorage.upload(storageKey, buffer, mimeType);

    // Get order for amount
    const order = await this.ordersService.findById(link.orderId);
    if (!order) throw new NotFoundException('Orden no encontrada');

    // Save payment proof
    const proof = await this.repo.create({
      orderId: link.orderId,
      storageKey,
      originalFilename,
      mimeType,
      sizeBytes: buffer.length,
      paymentMethod: 'YAPE_QR',
      amountCents: order.totalAmountCents,
    });

    return {
      id: proof.id,
      status: proof.status,
      message: 'Voucher recibido. Tu pago será revisado pronto.',
    };
  }

  async findByOrderId(orderId: number) {
    const proof = await this.repo.findByOrderId(orderId);
    if (!proof) return null;
    return {
      ...proof,
      voucherUrl: this.fileStorage.getPublicUrl(proof.storageKey),
    };
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
      // Also advance order to UNDER_PAYMENT_REVIEW first
      await this.dataSource.query(
        `UPDATE orders SET status = 'UNDER_PAYMENT_REVIEW' WHERE id = $1 AND status = 'AWAITING_PAYMENT_PROOF'`,
        [orderId],
      );
      return { status: 'APPROVED' };
    } else {
      await this.dataSource.query(
        `UPDATE payment_proofs SET status = 'REJECTED', rejection_reason = $2, reviewed_at = NOW(), reviewed_by_user_id = 1 WHERE order_id = $1`,
        [orderId, rejectionReason ?? null],
      );
      return { status: 'REJECTED', rejectionReason };
    }
  }
}
