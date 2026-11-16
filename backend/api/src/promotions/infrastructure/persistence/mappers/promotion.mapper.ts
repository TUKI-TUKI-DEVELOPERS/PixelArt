import { Promotion, TargetType, DiscountType } from '../../../domain/promotion';
import { EligibilityKind, EligibilityTarget } from '../../../domain/eligibility-target';
import { PromotionOrmEntity } from '../entities/promotion.orm-entity';

/** Raw row of promotion_eligibility_targets (pg returns BIGINT as string). */
export type EligibilityRow = {
  promotion_id: string;
  target_kind: string;
  personalized_category_id: string | null;
  personalized_model_id: string | null;
  photobook_theme_id: string | null;
};

export type EligibilityColumns = {
  personalizedCategoryId: number | null;
  personalizedModelId: number | null;
  photobookThemeId: number | null;
};

const toNumberOrNull = (value: string | null) => (value === null || value === undefined ? null : Number(value));

export class PromotionMapper {
  static toDomain(e: PromotionOrmEntity, targetIds: number[] = [], eligibility: EligibilityTarget[] = []): Promotion {
    return new Promotion({
      id:            Number(e.id),
      label:         e.label,
      code:          e.code ?? null,
      targetType:    (e.targetType ?? null) as TargetType | null,
      targetId:      e.targetId ? Number(e.targetId) : null,
      targetIds,
      eligibility,
      discountType:  e.discountType as DiscountType,
      discountValue: Number(e.discountValue),
      validFrom:     e.validFrom,
      validUntil:    e.validUntil,
      isActive:      e.isActive,
      createdAt:     e.createdAt,
      updatedAt:     e.updatedAt,
    });
  }

  static eligibilityFromRow(row: EligibilityRow): EligibilityTarget {
    const kind = row.target_kind as EligibilityKind;
    switch (kind) {
      case 'PERSONALIZED_CATEGORY':
        return { kind, refId: toNumberOrNull(row.personalized_category_id) };
      case 'PERSONALIZED_BOOK':
        return { kind, refId: toNumberOrNull(row.personalized_model_id) };
      case 'PHOTOBOOK_THEME':
        return { kind, refId: toNumberOrNull(row.photobook_theme_id) };
      default:
        return { kind, refId: null };
    }
  }

  static eligibilityToColumns(target: EligibilityTarget): EligibilityColumns {
    return {
      personalizedCategoryId: target.kind === 'PERSONALIZED_CATEGORY' ? target.refId : null,
      personalizedModelId:    target.kind === 'PERSONALIZED_BOOK' ? target.refId : null,
      photobookThemeId:       target.kind === 'PHOTOBOOK_THEME' ? target.refId : null,
    };
  }
}
