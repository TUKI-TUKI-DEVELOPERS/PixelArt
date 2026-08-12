import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { FeedbackRepositoryPort } from './domain/ports/feedback-repository.port';
import { PublicLinksService } from '../public-links/public-links.service';
import { OrdersService } from '../orders/orders.service';
import { EmailService } from '../email/email.service';

const GOOGLE_REVIEW_URL = process.env.GOOGLE_REVIEW_URL ?? 'https://g.page/pixelart-peru/review';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly repo: FeedbackRepositoryPort,
    private readonly publicLinksService: PublicLinksService,
    private readonly ordersService: OrdersService,
    private readonly emailService: EmailService,
  ) {}

  /** Admin genera link de feedback — solo cuando la orden ya está DELIVERED.
   * Antes se permitía desde PAYMENT_VERIFIED y se disparaba automáticamente
   * al aprobar el pago (ver reviewPayment en el admin) — el cliente recibía
   * "¿Cómo te fue con tu libro?" días o semanas antes de tenerlo en la mano. */
  async generateFeedbackLink(orderId: number) {
    const order = await this.ordersService.findById(orderId);
    if (!order) throw new NotFoundException('Orden no encontrada');

    if (order.status !== 'DELIVERED') {
      throw new BadRequestException('La orden debe estar marcada como entregada para generar el link de feedback');
    }

    const link = await this.publicLinksService.generate({ linkType: 'FEEDBACK', orderId });

    const frontendBase = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    const feedbackUrl = `${frontendBase}/feedback/${link.token}`;

    await this.emailService.queue({
      eventType: 'DELIVERY_FEEDBACK_REQUEST',
      orderId: order.id,
      toEmail: order.customerEmail,
      subject: 'PixelArt — ¿Cómo te fue con tu libro?',
      payload: { customerName: order.customerFullName, feedbackUrl },
    });

    return { token: link.token, url: feedbackUrl, expiresAt: link.expiresAt };
  }

  /** Cliente obtiene info para calificar */
  async getFeedbackInfo(token: string) {
    const link = await this.publicLinksService.validate(token);
    if (link.linkType !== 'FEEDBACK' || !link.orderId) throw new BadRequestException('Link inválido');

    const order = await this.ordersService.findById(link.orderId);
    if (!order) throw new NotFoundException('Orden no encontrada');

    const existing = await this.repo.findByOrderId(link.orderId);
    if (existing) throw new BadRequestException('Ya se envió feedback para esta orden');

    return { orderId: order.id, customerName: order.customerFullName, channel: order.channel };
  }

  /** Cliente envía su rating */
  async submitFeedback(token: string, ratingX2: number, comment?: string) {
    if (ratingX2 < 1 || ratingX2 > 10) throw new BadRequestException('Rating debe ser entre 1 y 10');

    const link = await this.publicLinksService.validate(token);
    if (link.linkType !== 'FEEDBACK' || !link.orderId) throw new BadRequestException('Link inválido');

    const existing = await this.repo.findByOrderId(link.orderId);
    if (existing) throw new BadRequestException('Ya se envió feedback para esta orden');

    const order = await this.ordersService.findById(link.orderId);
    if (!order) throw new NotFoundException('Orden no encontrada');

    const stars = ratingX2 / 2;
    const redirectToGoogle = stars >= 4.5;

    // Get model_id from order (for custom books) — query directly
    const feedback = await this.repo.create({
      orderId: link.orderId,
      modelId: order.channel === 'CUSTOM_BOOK' ? order.personalizedModelId ?? null : null,
      photobookThemeId: null,
      ratingX2,
      comment: comment ?? null,
      redirectedToGoogle: redirectToGoogle,
    });

    return {
      id: feedback.id,
      stars: feedback.stars,
      redirectToGoogle,
      googleReviewUrl: redirectToGoogle ? GOOGLE_REVIEW_URL : null,
    };
  }

  /** Admin lista todos los feedbacks */
  async listAll() {
    return this.repo.findAll();
  }

  /** Público — promedio de ratings por libro/tema para mostrar en tarjetas */
  async getPublicRatings() {
    return this.repo.getAverageRatings();
  }
}
