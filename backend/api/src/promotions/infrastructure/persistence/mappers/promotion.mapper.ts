import { Promotion, TargetType, DiscountType } from '../../../domain/promotion';
import { PromotionOrmEntity } from '../entities/promotion.orm-entity';

export class PromotionMapper {
  static toDomain(e: PromotionOrmEntity, targetIds: number[] = []): Promotion {
    return new Promotion({
      id:            Number(e.id),
      label:         e.label,
      targetType:    e.targetType as TargetType,
      targetId:      e.targetId ? Number(e.targetId) : null,
      targetIds,
      discountType:  e.discountType as DiscountType,
      discountValue: Number(e.discountValue),
      validFrom:     e.validFrom,
      validUntil:    e.validUntil,
      isActive:      e.isActive,
      createdAt:     e.createdAt,
      updatedAt:     e.updatedAt,
    });
  }
}
