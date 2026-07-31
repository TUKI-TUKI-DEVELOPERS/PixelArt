import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailService } from './email.service';
import { EmailWorkerService } from './email-worker.service';
import { EmailSenderPort } from './domain/ports/email-sender.port';
import { ResendEmailSender } from './infrastructure/resend-email-sender';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    EmailService,
    EmailWorkerService,
    { provide: EmailSenderPort, useClass: ResendEmailSender },
  ],
  exports: [EmailService],
})
export class EmailModule {}
