import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email.service';
import { EmailWorkerService } from './email-worker.service';
import { ResendEmailSender } from './infrastructure/resend-email-sender';
import { EmailSenderPort } from './domain/ports/email-sender.port';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([]),
  ],
  providers: [
    EmailService,
    EmailWorkerService,
    {
      provide: EmailSenderPort,
      useClass: ResendEmailSender,
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}
