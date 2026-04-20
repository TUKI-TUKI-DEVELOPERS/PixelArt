import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

export type QueueEmailData = {
  eventType: string;
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
      [
        data.eventType,
        data.demoRequestId ?? null,
        data.orderId ?? null,
        data.toEmail,
        data.subject,
        JSON.stringify(data.payload),
      ],
    );
    this.logger.log(`Email queued: ${data.eventType} → ${data.toEmail}`);
  }
}
