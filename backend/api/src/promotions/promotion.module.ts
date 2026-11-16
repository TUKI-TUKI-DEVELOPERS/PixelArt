import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { PromotionAdminController } from './promotion-admin.controller';
import { PromotionOrmEntity } from './infrastructure/persistence/entities/promotion.orm-entity';
import { TypeOrmPromotionRepository } from './infrastructure/persistence/repositories/typeorm-promotion.repository';
import { TypeOrmPromotionCatalogRepository } from './infrastructure/persistence/catalog/typeorm-promotion-catalog.repository';
import { PromotionRepositoryPort } from './domain/ports/promotion-repository.port';
import { PromotionCatalogPort } from './domain/ports/promotion-catalog.port';
import { SavePromotionUseCase } from './application/use-cases/save-promotion.use-case';
import { EvaluatePromoCodeUseCase } from './application/use-cases/evaluate-promo-code.use-case';
import { ListPublicPromoCodesUseCase } from './application/use-cases/list-public-promo-codes.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([PromotionOrmEntity])],
  controllers: [PromotionController, PromotionAdminController],
  providers: [
    PromotionService,
    SavePromotionUseCase,
    EvaluatePromoCodeUseCase,
    ListPublicPromoCodesUseCase,
    TypeOrmPromotionRepository,
    TypeOrmPromotionCatalogRepository,
    { provide: PromotionRepositoryPort, useExisting: TypeOrmPromotionRepository },
    { provide: PromotionCatalogPort, useExisting: TypeOrmPromotionCatalogRepository },
  ],
  exports: [PromotionService, EvaluatePromoCodeUseCase],
})
export class PromotionsModule {}
