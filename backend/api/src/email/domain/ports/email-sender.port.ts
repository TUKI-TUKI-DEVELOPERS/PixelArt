export abstract class EmailSenderPort {
  abstract send(to: string, subject: string, html: string, replyTo?: string): Promise<void>;
}
