import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import type { EmailEventType } from './email-worker.service';

export type QueueEmailData = {
  eventType: EmailEventType;
  demoRequestId?: number | null;
  orderId?: number | null;
  toEmail: string;
  subject: string;
  payload: Record<string, unknown>;
};

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly dataSource: DataSource) {}

  async queue(data: QueueEmailData): Promise<void> {
    await this.dataSource.query(
      `INSERT INTO email_outbox (event_type, demo_request_id, order_id, to_email, subject, payload)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      this.toParams(data),
    );
    this.logger.log(`Email queued: ${data.eventType} → ${data.toEmail}`);
  }

  /** Atomically enqueue at most one matching order event, including across concurrent retries. */
  async queueOnce(data: QueueEmailData): Promise<void> {
    let inserted = false;
    await this.dataSource.transaction(async (manager) => {
      const key = `${data.eventType}:${data.orderId ?? ''}:${data.toEmail}`;
      await manager.query('SELECT pg_advisory_xact_lock(hashtext($1))', [key]);
      const existing = await manager.query(
        'SELECT id, status FROM email_outbox WHERE event_type = $1 AND order_id = $2 AND to_email = $3 LIMIT 1',
        [data.eventType, data.orderId ?? null, data.toEmail],
      );
      if (existing.length > 0) {
        if (existing[0].status === 'FAILED') {
          await manager.query(
            `UPDATE email_outbox
             SET status = 'PENDING', attempts = 0, last_error = NULL,
                 claimed_at = NULL, claimed_by = NULL, sent_at = NULL,
                 demo_request_id = $1, subject = $2, payload = $3
             WHERE id = $4 AND status = 'FAILED'`,
            [data.demoRequestId ?? null, data.subject, JSON.stringify(data.payload), existing[0].id],
          );
        }
        return;
      }
      await manager.query(
        `INSERT INTO email_outbox (event_type, demo_request_id, order_id, to_email, subject, payload)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        this.toParams(data),
      );
      inserted = true;
    });
    if (inserted) this.logger.log(`Email queued once: ${data.eventType} → ${data.toEmail}`);
  }

  private toParams(data: QueueEmailData) {
    return [
      data.eventType,
      data.demoRequestId ?? null,
      data.orderId ?? null,
      data.toEmail,
      data.subject,
      JSON.stringify(data.payload),
    ];
  }
}
