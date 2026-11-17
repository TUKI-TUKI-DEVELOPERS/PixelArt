import { Promotion } from '../promotion';
import { ProductRef } from '../eligibility-target';
import { evaluatePromoCode, EvaluatePromoCodeInput } from './promo-code-evaluator';

const FROM = new Date('2026-12-01T05:00:00Z');
const UNTIL = new Date('2026-12-26T05:00:00Z');
const INSIDE = new Date('2026-12-10T12:00:00Z');
const PRODUCT: ProductRef = { kind: 'PERSONALIZED_BOOK', modelId: 8, categoryId: 3 };

function makePromotion(overrides: Partial<ConstructorParameters<typeof Promotion>[0]> = {}): Promotion {
  return new Promotion({
    id: 42,
    label: 'NAVIDAD15',
    code: 'NAVIDAD15',
    targetType: null,
    targetId: null,
    discountType: 'percent',
    discountValue: 15,
    validFrom: FROM,
    validUntil: UNTIL,
    isActive: true,
    eligibility: [{ kind: 'PERSONALIZED_CATEGORY', refId: 3 }],
    createdAt: FROM,
    updatedAt: FROM,
    ...overrides,
  });
}

function input(overrides: Partial<EvaluatePromoCodeInput> = {}): EvaluatePromoCodeInput {
  return {
    code: 'NAVIDAD15',
    promotion: makePromotion(),
    now: INSIDE,
    product: PRODUCT,
    discountableBaseCents: 12900,
    applied: null,
    ...overrides,
  };
}

describe('evaluatePromoCode — happy path', () => {
  it('returns the discount in cents rounded with Math.round', () => {
    // 12900 × 15% = 1935
    expect(evaluatePromoCode(input())).toEqual({
      ok: true,
      promotionId: 42,
      code: 'NAVIDAD15',
      percent: 15,
      discountCents: 1935,
    });
  });

  it('applies on the exact start instant (validity is [from, until))', () => {
    expect(evaluatePromoCode(input({ now: FROM })).ok).toBe(true);
  });
});

describe('evaluatePromoCode — rejections', () => {
  it('not_found when no promotion has that code', () => {
    expect(evaluatePromoCode(input({ promotion: null }))).toEqual({ ok: false, reason: 'not_found' });
  });

  it('not_found when the case differs (codes are case-sensitive)', () => {
    expect(evaluatePromoCode(input({ code: 'navidad15' }))).toEqual({ ok: false, reason: 'not_found' });
  });

  it('inactive when the promotion is switched off', () => {
    expect(evaluatePromoCode(input({ promotion: makePromotion({ isActive: false }) }))).toEqual({
      ok: false,
      reason: 'inactive',
    });
  });

  it('inactive when a coded promotion is not a percentage', () => {
    const promotion = makePromotion({ discountType: 'fixed_cents', discountValue: 2000 });
    expect(evaluatePromoCode(input({ promotion }))).toEqual({ ok: false, reason: 'inactive' });
  });

  it('not_started before valid_from', () => {
    expect(evaluatePromoCode(input({ now: new Date(FROM.getTime() - 1) }))).toEqual({
      ok: false,
      reason: 'not_started',
    });
  });

  it('expired at or after valid_until', () => {
    expect(evaluatePromoCode(input({ now: UNTIL }))).toEqual({ ok: false, reason: 'expired' });
    expect(evaluatePromoCode(input({ now: new Date('2027-01-05T00:00:00Z') }))).toEqual({
      ok: false,
      reason: 'expired',
    });
  });

  it('not_applicable when the product is outside every eligibility target', () => {
    const other: ProductRef = { kind: 'PERSONALIZED_BOOK', modelId: 1, categoryId: 1 };
    expect(evaluatePromoCode(input({ product: other }))).toEqual({ ok: false, reason: 'not_applicable' });
  });

  it('already_applied when the order already carries a different code', () => {
    const applied = { promotionId: 7, code: 'VERANO10', percent: 10 };
    expect(evaluatePromoCode(input({ applied }))).toEqual({ ok: false, reason: 'already_applied' });
  });

  it('already_applied wins even when the new code does not exist', () => {
    const applied = { promotionId: 7, code: 'VERANO10', percent: 10 };
    expect(evaluatePromoCode(input({ applied, promotion: null, code: 'NOPE' }))).toEqual({
      ok: false,
      reason: 'already_applied',
    });
  });
});

describe('evaluatePromoCode — idempotent re-submission of the applied code', () => {
  it('reuses the snapshot percent without re-checking the promotion window', () => {
    const applied = { promotionId: 42, code: 'NAVIDAD15', percent: 15 };
    const result = evaluatePromoCode(
      input({ applied, now: new Date('2027-03-01T00:00:00Z'), promotion: makePromotion({ isActive: false }) }),
    );
    expect(result).toEqual({ ok: true, promotionId: 42, code: 'NAVIDAD15', percent: 15, discountCents: 1935 });
  });

  it('keeps the snapshot even when the promotion was deleted (promotionId null)', () => {
    const applied = { promotionId: null, code: 'NAVIDAD15', percent: 20 };
    const result = evaluatePromoCode(input({ applied, promotion: null, discountableBaseCents: 8900 }));
    expect(result).toEqual({ ok: true, promotionId: null, code: 'NAVIDAD15', percent: 20, discountCents: 1780 });
  });
});
