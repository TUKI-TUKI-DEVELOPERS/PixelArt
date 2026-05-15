import { Injectable, BadRequestException } from '@nestjs/common';

const RUSH_FEE_CENTS = 2500; // S/ 25.00
import { DemoRepositoryPort } from '../../domain/ports/demo-repository.port';
import { OrdersService } from '../../../orders/orders.service';
import { PublicLinksService } from '../../../public-links/public-links.service';
import { EmailService } from '../../../email/email.service';
import { DataSource } from 'typeorm';

@Injectable()
export class CreateOrderFromDemoUseCase {
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
    if (detail.status !== 'PROPOSALS_SENT') {
      throw new BadRequestException('Las propuestas deben estar enviadas primero');
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
      rushFeeCents: detail.wantsRush ? RUSH_FEE_CENTS : 0,
      estimatedDeliveryDate: detail.deliveryDate,
    });

    // Generate payment link
    const link = await this.publicLinksService.generate({
      linkType: 'PAYMENT_UPLOAD',
      orderId: order.id,
    });

    // Queue email
    const frontendBase = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';
    const paymentUrl = `${frontendBase}/pagar/${link.token}`;

    await this.emailService.queue({
      eventType: 'PAYMENT_PROOF_RECEIVED_ADMIN',
      demoRequestId,
      orderId: order.id,
      toEmail: detail.customerEmail,
      subject: 'PixelArt — Link de pago para tu libro',
      payload: {
        customerName: detail.customerFullName,
        paymentUrl,
        totalAmountCents: order.totalAmountCents,
      },
    });

    return {
      orderId: order.id,
      totalAmountCents: order.totalAmountCents,
      paymentLink: {
        token: link.token,
        url: paymentUrl,
        expiresAt: link.expiresAt,
      },
    };
  }
}
