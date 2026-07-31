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
    this.client = new Resend(process.env.RESEND_API_KEY);
    this.from = process.env.EMAIL_FROM ?? 'onboarding@resend.dev';
  }

  async send(to: string, subject: string, html: string, replyTo?: string): Promise<void> {
    const { error } = await this.client.emails.send({
      from: this.from,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });

    if (error) {
      this.logger.error(`Resend rechazó el envío a ${to}: ${error.message}`);
      throw new Error(error.message);
    }
  }
}
