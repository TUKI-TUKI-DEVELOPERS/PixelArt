import { computePercentDiscountCents, isValidPromoCode, normalizePromoCode } from './promo-code';

describe('normalizePromoCode', () => {
  it('trims surrounding whitespace', () => {
    expect(normalizePromoCode('  NAVIDAD15 \n')).toBe('NAVIDAD15');
  });

  it('never changes the case', () => {
    expect(normalizePromoCode('NaviDad15')).toBe('NaviDad15');
  });

  it('returns an empty string for nullish input', () => {
    expect(normalizePromoCode(undefined)).toBe('');
    expect(normalizePromoCode(null)).toBe('');
  });
});

describe('isValidPromoCode', () => {
  it('accepts a trimmed code without inner whitespace up to 40 chars', () => {
    expect(isValidPromoCode('NAVIDAD15')).toBe(true);
    expect(isValidPromoCode('promo-2026_A')).toBe(true);
    expect(isValidPromoCode('A'.repeat(40))).toBe(true);
  });

  it('rejects empty, padded, inner-whitespace or too long codes', () => {
    expect(isValidPromoCode('')).toBe(false);
    expect(isValidPromoCode(' NAVIDAD')).toBe(false);
    expect(isValidPromoCode('NAVI DAD')).toBe(false);
    expect(isValidPromoCode('A'.repeat(41))).toBe(false);
  });
});

describe('computePercentDiscountCents', () => {
  it('rounds to the nearest centavo with Math.round', () => {
    expect(computePercentDiscountCents(8900, 15)).toBe(1335);
    // 999 × 15% = 149.85 → 150
    expect(computePercentDiscountCents(999, 15)).toBe(150);
    // 850 × 15% = 127.5 → 128
    expect(computePercentDiscountCents(850, 15)).toBe(128);
  });

  it('gives the whole base at 100% and never exceeds it', () => {
    expect(computePercentDiscountCents(12900, 100)).toBe(12900);
  });

  it('gives 0 on a zero base', () => {
    expect(computePercentDiscountCents(0, 30)).toBe(0);
  });
});
