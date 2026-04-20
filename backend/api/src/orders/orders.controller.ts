import { Controller, Get, Post, Param, Body, Inject, forwardRef, Logger } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { PaymentsService } from '../payments/payments.service';
import { EmailService } from '../email/email.service';
import { PhotobookPdfService } from '../photobook/infrastructure/pdf/photobook-pdf.service';

@Controller('admin/orders')
export class OrdersAdminController {
  private readonly logger = new Logger(OrdersAdminController.name);

  constructor(
    private readonly ordersService: OrdersService,
    private readonly paymentsService: PaymentsService,
    private readonly emailService: EmailService,
    @Inject(forwardRef(() => PhotobookPdfService))
    private readonly photobookPdfService: PhotobookPdfService,
  ) {}

  @Get()
  listAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async getDetail(@Param('id') id: string) {
    const order = await this.ordersService.findById(Number(id));
    const events = await this.ordersService.getStatusEvents(Number(id));
    const paymentProof = await this.paymentsService.findByOrderId(Number(id));
    return { ...order, statusEvents: events, paymentProof };
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
}
