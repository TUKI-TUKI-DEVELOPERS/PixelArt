import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';
import { EmailSenderPort } from '../domain/ports/email-sender.port';

@Injectable()
export class ResendEmailSender extends EmailSenderPort {
  private readonly logger = new Logger(ResendEmailSender.name);
  private readonly client: Resend;
  private readonly from: string;

  constructor() {
    super();
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error('RESEND_API_KEY env var is missing');
    this.client = new Resend(apiKey);
    this.from = process.env.EMAIL_FROM ?? 'onboarding@resend.dev';
  }

  async send(params: { to: string; subject: string; html: string }): Promise<void> {
    const { error } = await this.client.emails.send({
      from: this.from,
      to: params.to,
      subject: params.subject,
      html: params.html,
    });

    if (error) {
      this.logger.error(`Resend error → ${params.to}: ${error.message}`);
      throw new Error(error.message);
    }

    this.logger.log(`Email sent → ${params.to} [${params.subject}]`);
  }
}
