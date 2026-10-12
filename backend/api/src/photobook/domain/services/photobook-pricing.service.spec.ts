import {
  calculatePhotobookRushFeeCents,
  calculatePhotobookTotalCents,
  isValidPhotobookCoverType,
} from './photobook-pricing.service';

describe('isValidPhotobookCoverType', () => {
  it('accepts TAPA_DELGADA', () => {
    expect(isValidPhotobookCoverType('TAPA_DELGADA')).toBe(true);
  });

  it('accepts TAPA_GRUESA', () => {
    expect(isValidPhotobookCoverType('TAPA_GRUESA')).toBe(true);
  });

  it('rejects unknown values', () => {
    expect(isValidPhotobookCoverType('TAPA_MEDIA')).toBe(false);
    expect(isValidPhotobookCoverType('')).toBe(false);
    expect(isValidPhotobookCoverType('tapa_delgada')).toBe(false);
  });
});

describe('calculatePhotobookRushFeeCents', () => {
  it('returns 2500 centavos when rush is requested', () => {
    expect(calculatePhotobookRushFeeCents(true)).toBe(2500);
  });

  it('returns 0 when rush is not requested', () => {
    expect(calculatePhotobookRushFeeCents(false)).toBe(0);
  });
});

describe('calculatePhotobookTotalCents', () => {
  it('charges the base price at exactly MIN_HOJAS (30 caras = 15 hojas)', () => {
    expect(calculatePhotobookTotalCents('TAPA_DELGADA', 30, false)).toBe(9000);
    expect(calculatePhotobookTotalCents('TAPA_GRUESA', 30, false)).toBe(12000);
  });

  it('rounds odd cara counts up to the next full hoja (29 caras = 15 hojas)', () => {
    expect(calculatePhotobookTotalCents('TAPA_DELGADA', 29, false)).toBe(9000);
    expect(calculatePhotobookTotalCents('TAPA_GRUESA', 29, false)).toBe(12000);
  });

  it('adds the per-hoja increment for each hoja over the minimum', () => {
    // 32 caras = 16 hojas → 1 extra hoja
    expect(calculatePhotobookTotalCents('TAPA_DELGADA', 32, false)).toBe(9300);
    expect(calculatePhotobookTotalCents('TAPA_GRUESA', 32, false)).toBe(12400);
    // 40 caras = 20 hojas → 5 extra hojas
    expect(calculatePhotobookTotalCents('TAPA_DELGADA', 40, false)).toBe(9000 + 5 * 300);
    expect(calculatePhotobookTotalCents('TAPA_GRUESA', 40, false)).toBe(12000 + 5 * 400);
  });

  it('counts an odd extra cara as a full extra hoja (31 caras = 16 hojas)', () => {
    expect(calculatePhotobookTotalCents('TAPA_DELGADA', 31, false)).toBe(9300);
  });

  it('adds the rush fee on top of the cover price', () => {
    expect(calculatePhotobookTotalCents('TAPA_GRUESA', 30, true)).toBe(14500);
    expect(calculatePhotobookTotalCents('TAPA_DELGADA', 32, true)).toBe(9300 + 2500);
  });

  it('prices the cover at 0 below the minimum hoja count (28 caras = 14 hojas)', () => {
    expect(calculatePhotobookTotalCents('TAPA_DELGADA', 28, false)).toBe(0);
    expect(calculatePhotobookTotalCents('TAPA_GRUESA', 28, false)).toBe(0);
  });

  it('still charges the rush fee below the minimum hoja count', () => {
    expect(calculatePhotobookTotalCents('TAPA_GRUESA', 28, true)).toBe(2500);
  });

  it('returns 0 for zero caras without rush', () => {
    expect(calculatePhotobookTotalCents('TAPA_DELGADA', 0, false)).toBe(0);
  });

  it('returns NaN for an invalid cover type at or above the minimum (no internal validation)', () => {
    // Callers are expected to gate with isValidPhotobookCoverType first.
    const total = calculatePhotobookTotalCents('INVALID' as any, 30, false);
    expect(Number.isNaN(total)).toBe(true);
  });

  it('returns only the rush fee for an invalid cover type below the minimum', () => {
    // Below MIN_HOJAS the cover branch short-circuits to 0, so the invalid
    // type is never looked up and the result is just the rush fee.
    expect(calculatePhotobookTotalCents('INVALID' as any, 28, true)).toBe(2500);
  });
});
