import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PublicLinksService } from '../../../public-links/public-links.service';
import { EmailService } from '../../../email/email.service';
import { DemoRepositoryPort } from '../../domain/ports/demo-repository.port';

@Injectable()
export class ReissueCheckoutLinkUseCase {
  constructor(
    private readonly demoRepo: DemoRepositoryPort,
    private readonly publicLinksService: PublicLinksService,
    private readonly emailService: EmailService,
    private readonly dataSource: DataSource,
  ) {}

  async execute(demoRequestId: number) {
    const detail = await this.demoRepo.findById(demoRequestId);
    if (!detail) throw new NotFoundException(`Demo request #${demoRequestId} no encontrada`);
    if (detail.status !== 'PROPOSALS_SENT') {
      throw new BadRequestException('Solo se puede renovar el link de una solicitud ya enviada');
    }

    // Find current CHECKOUT link for this demo
    const rows: { id: string; order_id: string }[] = await this.dataSource.query(
      `SELECT pl.id, pl.order_id
       FROM public_links pl
       JOIN orders o ON o.id = pl.order_id
       WHERE o.demo_request_id = $1
         AND pl.link_type = 'CHECKOUT'
       ORDER BY pl.created_at DESC
       LIMIT 1`,
      [demoRequestId],
    );

    if (rows.length === 0) {
      throw new BadRequestException('No se encontró un link de checkout existente para esta solicitud');
    }

    // Bloquear renovación si el cliente ya realizó el pago
    const orderId = Number(rows[0].order_id);
    const proofRows: { id: string }[] = await this.dataSource.query(
      `SELECT id FROM payment_proofs WHERE order_id = $1 LIMIT 1`,
      [orderId],
    );
    if (proofRows.length > 0) {
      throw new BadRequestException('El cliente ya realizó el pago. No es necesario renovar el link.');
    }

    const oldLinkId = Number(rows[0].id);

    // Revoke old link
    await this.publicLinksService.revoke(oldLinkId);

    // Create new link pointing to same order
    const newLink = await this.publicLinksService.reissue({ oldLinkId, orderId });

    const frontendBase = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';
    const checkoutUrl = `${frontendBase}/checkout/${newLink.token}`;

    // Queue email notification
    await this.emailService.queue({
      eventType: 'UNIFIED_CHECKOUT_SENT',
      demoRequestId,
      orderId,
      toEmail: detail.customerEmail,
      subject: 'PixelArt — Link de pago renovado',
      payload: {
        customerName: detail.customerFullName,
        checkoutUrl,
        totalAmountCents: 0,
      },
    });

    return {
      orderId,
      checkoutLink: {
        token: newLink.token,
        url: checkoutUrl,
        expiresAt: newLink.expiresAt,
      },
    };
  }
}
