import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackService } from './feedback.service';
import { FeedbackPublicController } from './feedback-public.controller';
import { FeedbackAdminController } from './feedback-admin.controller';
import { FeedbackOrmEntity } from './infrastructure/persistence/entities/feedback.orm-entity';
import { TypeOrmFeedbackRepository } from './infrastructure/persistence/repositories/typeorm-feedback.repository';
import { FeedbackRepositoryPort } from './domain/ports/feedback-repository.port';
import { PublicLinksModule } from '../public-links/public-links.module';
import { OrdersModule } from '../orders/orders.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FeedbackOrmEntity]),
    PublicLinksModule,
    OrdersModule,
    EmailModule,
  ],
  controllers: [FeedbackPublicController, FeedbackAdminController],
  providers: [
    FeedbackService,
    TypeOrmFeedbackRepository,
    { provide: FeedbackRepositoryPort, useExisting: TypeOrmFeedbackRepository },
  ],
  exports: [FeedbackService],
})
export class FeedbackModule {}
