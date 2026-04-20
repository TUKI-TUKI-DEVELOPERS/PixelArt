import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DemoRepositoryPort } from '../../domain/ports/demo-repository.port';
import { OrdersService } from '../../../orders/orders.service';
import { PublicLinksService } from '../../../public-links/public-links.service';
import { EmailService } from '../../../email/email.service';

@Injectable()
export class SendUnifiedCheckoutUseCase {
  constructor(
    private readonly demoRepo: DemoRepositoryPort,
    private readonly ordersService: OrdersService,
    private readonly publicLinksService: PublicLinksService,
    private readonly emailService: EmailService,
    private readonly dataSource: DataSource,
  ) {}

  async execute(demoRequestId: number) {
    const detail = await this.demoRepo.findById(demoRequestId);
    if (!detail) throw new BadRequestException('Demo request no encontrada');
    if (detail.status !== 'RECEIVED') {
      throw new BadRequestException('La solicitud ya fue procesada');
    }
    if (detail.proposals.length === 0) {
      throw new BadRequestException('Debe subir al menos una propuesta antes de enviar');
    }

    // Get variant price
    const variantRow = await this.dataSource.query(
      `SELECT base_price_cents FROM catalog_book_variants WHERE id = $1`,
      [detail.catalogBookVariantId],
    );
    const baseAmountCents = variantRow[0]?.base_price_cents ?? 0;

    // Create order
    const order = await this.ordersService.create({
      channel: 'CUSTOM_BOOK',
      demoRequestId,
      catalogBookVariantId: detail.catalogBookVariantId,
      personalizedModelId: detail.personalizedModelId,
      customerFullName: detail.customerFullName,
      customerEmail: detail.customerEmail,
      customerPhone: detail.customerPhone,
      baseAmountCents: Number(baseAmountCents),
      estimatedDeliveryDate: detail.deliveryDate,
    });

    // Generate unified CHECKOUT link referencing order_id
    const link = await this.publicLinksService.generate({
      linkType: 'CHECKOUT',
      orderId: order.id,
    });

    // Queue email
    const frontendBase = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';
    const checkoutUrl = `${frontendBase}/checkout/${link.token}`;

    await this.emailService.queue({
      eventType: 'UNIFIED_CHECKOUT_SENT',
      demoRequestId,
      orderId: order.id,
      toEmail: detail.customerEmail,
      subject: 'PixelArt — Completá tu pedido',
      payload: {
        customerName: detail.customerFullName,
        checkoutUrl,
        totalAmountCents: order.totalAmountCents,
      },
    });

    // Update demo request status
    await this.demoRepo.updateStatus(demoRequestId, 'PROPOSALS_SENT');

    return {
      status: 'PROPOSALS_SENT',
      orderId: order.id,
      checkoutLink: {
        token: link.token,
        url: checkoutUrl,
        expiresAt: link.expiresAt,
      },
    };
  }
}
