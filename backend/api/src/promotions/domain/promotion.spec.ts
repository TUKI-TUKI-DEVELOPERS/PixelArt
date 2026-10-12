import { Promotion } from './promotion';

function makePromotion(overrides: Partial<ConstructorParameters<typeof Promotion>[0]> = {}): Promotion {
  return new Promotion({
    id: 1,
    label: 'Promo',
    targetType: 'all',
    targetId: null,
    discountType: 'percent',
    discountValue: 10,
    validFrom: new Date('2026-01-01T00:00:00Z'),
    validUntil: new Date('2026-12-31T23:59:59Z'),
    isActive: true,
    createdAt: new Date('2026-01-01T00:00:00Z'),
    updatedAt: new Date('2026-01-01T00:00:00Z'),
    ...overrides,
  });
}

describe('Promotion constructor', () => {
  it('defaults targetIds to an empty array when not provided', () => {
    expect(makePromotion().targetIds).toEqual([]);
  });

  it('keeps a provided targetIds array', () => {
    expect(makePromotion({ targetIds: [3, 5] }).targetIds).toEqual([3, 5]);
  });
});

describe('Promotion.applyTo — percent', () => {
  it('applies a percentage discount with Math.round', () => {
    expect(makePromotion({ discountValue: 10 }).applyTo(8900)).toBe(8010);
    // 999 × 0.85 = 849.15 → rounds down
    expect(makePromotion({ discountValue: 15 }).applyTo(999)).toBe(849);
    // 850 × 0.85 = 722.5 → rounds up
    expect(makePromotion({ discountValue: 15 }).applyTo(850)).toBe(723);
  });

  it('returns the base price unchanged at 0 percent', () => {
    expect(makePromotion({ discountValue: 0 }).applyTo(8900)).toBe(8900);
  });

  it('returns 0 at 100 percent', () => {
    expect(makePromotion({ discountValue: 100 }).applyTo(8900)).toBe(0);
  });

  it('goes negative above 100 percent (no clamp on the percent branch)', () => {
    // Characterization: only the fixed branch clamps at 0.
    expect(makePromotion({ discountValue: 150 }).applyTo(1000)).toBe(-500);
  });
});

describe('Promotion.applyTo — fixed_cents', () => {
  it('subtracts the fixed amount from the base price', () => {
    expect(makePromotion({ discountType: 'fixed_cents', discountValue: 2000 }).applyTo(8900)).toBe(6900);
  });

  it('clamps at 0 when the discount exceeds the base price', () => {
    expect(makePromotion({ discountType: 'fixed_cents', discountValue: 10000 }).applyTo(8900)).toBe(0);
  });

  it('returns 0 when the discount equals the base price', () => {
    expect(makePromotion({ discountType: 'fixed_cents', discountValue: 8900 }).applyTo(8900)).toBe(0);
  });

  it('returns the base price for a zero fixed discount', () => {
    expect(makePromotion({ discountType: 'fixed_cents', discountValue: 0 }).applyTo(8900)).toBe(8900);
  });
});
