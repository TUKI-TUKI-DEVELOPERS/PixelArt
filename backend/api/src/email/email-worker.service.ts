import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DataSource } from 'typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';
import { EmailSenderPort } from './domain/ports/email-sender.port';

const MAX_ATTEMPTS = 3;
const WORKER_ID = `worker-${process.pid}`;

// Cada evento usa un template propio, salvo los dos que en esencia mandan
// lo mismo ("acá está tu link de pago/checkout") — comparten uno.
const TEMPLATE_BY_EVENT: Record<string, string> = {
  PROPOSALS_SENT_TO_CUSTOMER: 'proposals-sent.html',
  UNIFIED_CHECKOUT_SENT: 'checkout-link.html',
  PAYMENT_PROOF_RECEIVED_ADMIN: 'checkout-link.html',
  PAYMENT_APPROVED_TO_CUSTOMER: 'payment-approved.html',
  PAYMENT_REJECTED_TO_CUSTOMER: 'payment-rejected.html',
  DELIVERY_FEEDBACK_REQUEST: 'delivery-feedback.html',
};

type OutboxRow = {
  id: string;
  event_type: string;
  to_email: string;
  subject: string;
  payload: Record<string, unknown>;
  attempts: number;
};

@Injectable()
export class EmailWorkerService {
  private readonly logger = new Logger(EmailWorkerService.name);
  private ticking = false;

  constructor(
    private readonly dataSource: DataSource,
    private readonly emailSender: EmailSenderPort,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async tick(): Promise<void> {
    // Evita que dos ticks se pisen si un envío tarda más de 10s.
    if (this.ticking) return;
    this.ticking = true;
    try {
      const claimed = await this.claimPending();
      for (const row of claimed) {
        await this.processOne(row);
      }
    } finally {
      this.ticking = false;
    }
  }

  private async claimPending(): Promise<OutboxRow[]> {
    return this.dataSource.transaction(async (manager) => {
      const rows: OutboxRow[] = await manager.query(
        `SELECT id, event_type, to_email, subject, payload, attempts
         FROM email_outbox
         WHERE status = 'PENDING' AND attempts < $1
         ORDER BY created_at ASC
         LIMIT 10
         FOR UPDATE SKIP LOCKED`,
        [MAX_ATTEMPTS],
      );
      if (rows.length === 0) return [];

      const ids = rows.map((r) => r.id);
      await manager.query(
        `UPDATE email_outbox SET claimed_at = now(), claimed_by = $1 WHERE id = ANY($2)`,
        [WORKER_ID, ids],
      );
      return rows;
    });
  }

  private async processOne(row: OutboxRow): Promise<void> {
    try {
      const html = this.renderTemplate(row.event_type, row.payload);
      const replyTo = process.env.EMAIL_REPLY_TO || undefined;
      await this.emailSender.send(row.to_email, row.subject, html, replyTo);
      await this.dataSource.query(
        `UPDATE email_outbox SET status = 'SENT', sent_at = now() WHERE id = $1`,
        [row.id],
      );
      this.logger.log(`Enviado: ${row.event_type} → ${row.to_email}`);
    } catch (err) {
      const attempts = row.attempts + 1;
      const status = attempts >= MAX_ATTEMPTS ? 'FAILED' : 'PENDING';
      const message = err instanceof Error ? err.message : String(err);
      await this.dataSource.query(
        `UPDATE email_outbox
         SET attempts = $1, status = $2, last_error = $3, claimed_at = NULL, claimed_by = NULL
         WHERE id = $4`,
        [attempts, status, message, row.id],
      );
      this.logger.error(`Falló (${attempts}/${MAX_ATTEMPTS}) ${row.event_type} → ${row.to_email}: ${message}`);
    }
  }

  private renderTemplate(eventType: string, payload: Record<string, unknown>): string {
    const fileName = TEMPLATE_BY_EVENT[eventType];
    if (!fileName) {
      throw new Error(`No hay template configurado para el evento "${eventType}"`);
    }

    let html = readFileSync(join(__dirname, 'templates', fileName), 'utf-8');

    const amountCents = payload.totalAmountCents;
    const vars: Record<string, string> = {
      customerName: String(payload.customerName ?? ''),
      actionUrl: String(
        payload.checkoutUrl ?? payload.paymentUrl ?? payload.demoViewUrl ?? payload.feedbackUrl ?? '',
      ),
      totalAmount: typeof amountCents === 'number' ? `S/ ${(amountCents / 100).toFixed(2)}` : '',
      estimatedDeliveryDate: String(payload.estimatedDeliveryDate ?? ''),
      rejectionReason: String(payload.rejectionReason ?? 'No especificado'),
    };

    for (const [key, value] of Object.entries(vars)) {
      html = html.replaceAll(`{{${key}}}`, value);
    }
    return html;
  }
}
