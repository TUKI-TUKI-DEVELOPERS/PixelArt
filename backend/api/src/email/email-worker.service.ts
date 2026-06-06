import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { EmailSenderPort } from './domain/ports/email-sender.port';

const MAX_ATTEMPTS = 3;

// Maps each event type to its HTML template file and how to extract
// the variables from the payload stored in the DB.
const TEMPLATE_MAP: Record<string, { file: string; vars: (p: Record<string, unknown>) => Record<string, string> }> = {
  PROPOSALS_SENT_TO_CUSTOMER: {
    file: 'proposals-sent.html',
    vars: (p) => ({
      customerName: String(p['customerName'] ?? ''),
      demoViewUrl:  String(p['demoViewUrl']  ?? ''),
    }),
  },
  UNIFIED_CHECKOUT_SENT: {
    file: 'delivery-feedback.html',
    vars: (p) => ({
      customerName: String(p['customerName'] ?? ''),
      actionUrl:    String(p['checkoutUrl']  ?? ''),
      totalAmount:  centavosToSoles(p['totalAmountCents']),
    }),
  },
  PAYMENT_PROOF_RECEIVED_ADMIN: {
    file: 'delivery-feedback.html',
    vars: (p) => ({
      customerName: String(p['customerName'] ?? ''),
      actionUrl:    String(p['paymentUrl']   ?? ''),
      totalAmount:  centavosToSoles(p['totalAmountCents']),
    }),
  },
  PAYMENT_APPROVED_TO_CUSTOMER: {
    file: 'payment-approved.html',
    vars: (p) => ({
      customerName:          String(p['customerName']          ?? ''),
      estimatedDeliveryDate: String(p['estimatedDeliveryDate'] ?? ''),
    }),
  },
  PAYMENT_REJECTED_TO_CUSTOMER: {
    file: 'payment-rejected.html',
    vars: (p) => ({
      customerName:    String(p['customerName']    ?? ''),
      rejectionReason: String(p['rejectionReason'] ?? 'Sin motivo especificado'),
    }),
  },
};

function centavosToSoles(value: unknown): string {
  const cents = Number(value ?? 0);
  return `S/ ${(cents / 100).toFixed(2)}`;
}

function renderTemplate(templatePath: string, vars: Record<string, string>): string {
  let html = fs.readFileSync(templatePath, 'utf-8');
  for (const [key, value] of Object.entries(vars)) {
    html = html.replaceAll(`{{${key}}}`, value);
  }
  return html;
}

@Injectable()
export class EmailWorkerService {
  private readonly logger = new Logger(EmailWorkerService.name);
  private readonly templatesDir: string;

  constructor(
    private readonly dataSource: DataSource,
    private readonly sender: EmailSenderPort,
  ) {
    // Works both in dev (ts-node from src/) and production (dist/)
    this.templatesDir = path.join(__dirname, 'templates');
  }

  @Cron('*/10 * * * * *')
  async tick(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let rows: {
      id: string;
      event_type: string;
      to_email: string;
      subject: string;
      payload: Record<string, unknown>;
      attempts: number;
    }[] = [];

    try {
      rows = await queryRunner.query(
        `SELECT id, event_type, to_email, subject, payload, attempts
         FROM email_outbox
         WHERE status = 'PENDING'::email_outbox_status
           AND attempts < $1
           AND (claimed_at IS NULL OR claimed_at < now() - INTERVAL '2 minutes')
         ORDER BY created_at ASC
         LIMIT 5
         FOR UPDATE SKIP LOCKED`,
        [MAX_ATTEMPTS],
      );

      if (rows.length > 0) {
        const ids = rows.map((r) => r.id);
        await queryRunner.query(
          `UPDATE email_outbox
           SET claimed_at = now(), claimed_by = 'worker'
           WHERE id = ANY($1::bigint[])`,
          [ids],
        );
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`Error claiming emails: ${(err as Error).message}`);
      return;
    } finally {
      await queryRunner.release();
    }

    for (const row of rows) {
      await this.process(row);
    }
  }

  private async process(row: {
    id: string;
    event_type: string;
    to_email: string;
    subject: string;
    payload: Record<string, unknown>;
    attempts: number;
  }): Promise<void> {
    const mapping = TEMPLATE_MAP[row.event_type];

    if (!mapping) {
      this.logger.warn(`No template for event_type: ${row.event_type} (id=${row.id})`);
      await this.markFailed(row.id, `No template mapped for event_type: ${row.event_type}`);
      return;
    }

    const templatePath = path.join(this.templatesDir, mapping.file);

    if (!fs.existsSync(templatePath)) {
      this.logger.warn(`Template file not found: ${templatePath}`);
      await this.markFailed(row.id, `Template file not found: ${mapping.file}`);
      return;
    }

    try {
      const vars = mapping.vars(row.payload);
      const html = renderTemplate(templatePath, vars);

      await this.sender.send({ to: row.to_email, subject: row.subject, html });
      await this.markSent(row.id);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      this.logger.error(`Failed to send email id=${row.id}: ${message}`);
      await this.markFailed(row.id, message);
    }
  }

  private async markSent(id: string): Promise<void> {
    await this.dataSource.query(
      `UPDATE email_outbox
       SET status = 'SENT'::email_outbox_status, sent_at = now(), attempts = attempts + 1
       WHERE id = $1`,
      [id],
    );
  }

  private async markFailed(id: string, error: string): Promise<void> {
    await this.dataSource.query(
      `UPDATE email_outbox
       SET status = CASE WHEN attempts + 1 >= $2 THEN 'FAILED'::email_outbox_status ELSE 'PENDING'::email_outbox_status END,
           attempts = attempts + 1,
           last_error = $3,
           claimed_at = NULL
       WHERE id = $1`,
      [id, MAX_ATTEMPTS, error],
    );
  }
}
