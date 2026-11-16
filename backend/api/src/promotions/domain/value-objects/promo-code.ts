export const PROMO_CODE_MAX_LENGTH = 40;

/**
 * Codes are matched exactly and are case-sensitive: only surrounding
 * whitespace is removed, the case is never changed.
 */
export function normalizePromoCode(raw: string | null | undefined): string {
  return (raw ?? '').trim();
}

export function isValidPromoCode(code: string): boolean {
  return code.length > 0 && code.length <= PROMO_CODE_MAX_LENGTH && !/\s/.test(code);
}

/** Percentage discount rounded to the nearest centavo. */
export function computePercentDiscountCents(baseCents: number, percent: number): number {
  return Math.round((baseCents * percent) / 100);
}
