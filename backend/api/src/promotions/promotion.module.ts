import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { PromotionAdminController } from './promotion-admin.controller';
import { PromotionOrmEntity } from './infrastructure/persistence/entities/promotion.orm-entity';
import { TypeOrmPromotionRepository } from './infrastructure/persistence/repositories/typeorm-promotion.repository';
import { PromotionRepositoryPort } from './domain/ports/promotion-repository.port';

@Module({
  imports: [TypeOrmModule.forFeature([PromotionOrmEntity])],
  controllers: [PromotionController, PromotionAdminController],
  providers: [
    PromotionService,
    TypeOrmPromotionRepository,
    { provide: PromotionRepositoryPort, useExisting: TypeOrmPromotionRepository },
  ],
  exports: [PromotionService],
})
export class PromotionsModule {}
