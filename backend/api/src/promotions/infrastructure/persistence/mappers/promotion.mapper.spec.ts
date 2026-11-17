import { PromotionOrmEntity } from '../entities/promotion.orm-entity';
import { EligibilityRow, PromotionMapper } from './promotion.mapper';

function entity(overrides: Partial<PromotionOrmEntity> = {}): PromotionOrmEntity {
  return Object.assign(new PromotionOrmEntity(), {
    id: '42',
    label: 'NAVIDAD15',
    code: 'NAVIDAD15',
    targetType: null,
    targetId: null,
    discountType: 'percent',
    discountValue: '15',
    validFrom: new Date('2026-12-01T05:00:00Z'),
    validUntil: new Date('2026-12-26T05:00:00Z'),
    isActive: true,
    createdAt: new Date('2026-11-01T00:00:00Z'),
    updatedAt: new Date('2026-11-01T00:00:00Z'),
    ...overrides,
  });
}

const row = (overrides: Partial<EligibilityRow>): EligibilityRow => ({
  promotion_id: '42',
  target_kind: 'PERSONALIZED_CATEGORY',
  personalized_category_id: null,
  personalized_model_id: null,
  photobook_theme_id: null,
  ...overrides,
});

describe('PromotionMapper', () => {
  it('maps a coded promotion with its eligibility', () => {
    const promotion = PromotionMapper.toDomain(entity(), [], [{ kind: 'PERSONALIZED_BOOK', refId: 8 }]);
    expect(promotion.id).toBe(42);
    expect(promotion.code).toBe('NAVIDAD15');
    expect(promotion.targetType).toBeNull();
    expect(promotion.discountValue).toBe(15);
    expect(promotion.eligibility).toEqual([{ kind: 'PERSONALIZED_BOOK', refId: 8 }]);
  });

  it('maps a legacy promotion without code', () => {
    const promotion = PromotionMapper.toDomain(entity({ code: null, targetType: 'models' }), [3, 5]);
    expect(promotion.code).toBeNull();
    expect(promotion.targetType).toBe('models');
    expect(promotion.targetIds).toEqual([3, 5]);
    expect(promotion.eligibility).toEqual([]);
  });

  it.each([
    [row({ target_kind: 'PERSONALIZED_CATEGORY', personalized_category_id: '3' }), { kind: 'PERSONALIZED_CATEGORY', refId: 3 }],
    [row({ target_kind: 'PERSONALIZED_BOOK', personalized_model_id: '8' }), { kind: 'PERSONALIZED_BOOK', refId: 8 }],
    [row({ target_kind: 'PHOTOBOOK_THEME', photobook_theme_id: '2' }), { kind: 'PHOTOBOOK_THEME', refId: 2 }],
    [row({ target_kind: 'TEMPLATE_PHOTOBOOKS_ALL' }), { kind: 'TEMPLATE_PHOTOBOOKS_ALL', refId: null }],
    [row({ target_kind: 'CUSTOM_PHOTOBOOK' }), { kind: 'CUSTOM_PHOTOBOOK', refId: null }],
  ])('reads eligibility row %o', (input, expected) => {
    expect(PromotionMapper.eligibilityFromRow(input)).toEqual(expected);
  });

  it.each([
    [{ kind: 'PERSONALIZED_CATEGORY', refId: 3 }, [3, null, null]],
    [{ kind: 'PERSONALIZED_BOOK', refId: 8 }, [null, 8, null]],
    [{ kind: 'PHOTOBOOK_THEME', refId: 2 }, [null, null, 2]],
    [{ kind: 'TEMPLATE_PHOTOBOOKS_ALL', refId: null }, [null, null, null]],
    [{ kind: 'CUSTOM_PHOTOBOOK', refId: null }, [null, null, null]],
  ] as const)('writes target %o into the typed FK columns', (target, columns) => {
    expect(PromotionMapper.eligibilityToColumns(target)).toEqual({
      personalizedCategoryId: columns[0],
      personalizedModelId: columns[1],
      photobookThemeId: columns[2],
    });
  });
});
