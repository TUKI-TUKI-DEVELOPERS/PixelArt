import { Promotion } from '../promotion';
import { ProductRef, isProductEligible } from '../eligibility-target';
import { computePercentDiscountCents } from '../value-objects/promo-code';

export type PromoRejectionReason =
  | 'not_found'
  | 'inactive'
  | 'not_started'
  | 'expired'
  | 'not_applicable'
  | 'already_applied';

/** Snapshot of the code already stored on an order. */
export type AppliedPromotionSnapshot = {
  promotionId: number | null;
  code: string;
  percent: number;
};

export type PromoAccepted = { ok: true; promotionId: number | null; code: string; percent: number; discountCents: number };
export type PromoRejected = { ok: false; reason: PromoRejectionReason };
export type PromoEvaluation = PromoAccepted | PromoRejected;

/** Explicit guard: the project compiles without strictNullChecks, where `!e.ok` does not narrow. */
export function isPromoRejected(evaluation: PromoEvaluation): evaluation is PromoRejected {
  return evaluation.ok === false;
}

export type EvaluatePromoCodeInput = {
  /** Normalized (trimmed) code typed by the customer. */
  code: string;
  /** Promotion found by exact code, or null. */
  promotion: Promotion | null;
  now: Date;
  product: ProductRef;
  /** Product price only: base + premium package. Never rush fee or cover surcharge. */
  discountableBaseCents: number;
  applied: AppliedPromotionSnapshot | null;
};

/**
 * Decides whether `code` gives a discount on `product` at `now`.
 *
 * Validity is the half-open interval [validFrom, validUntil).
 * Only one code per order: a different code on an order that already has one is
 * rejected; the same code again is idempotent and reuses the snapshot percent,
 * so a promotion that expired after it was applied keeps its discount.
 */
export function evaluatePromoCode(input: EvaluatePromoCodeInput): PromoEvaluation {
  const { code, promotion, now, product, discountableBaseCents, applied } = input;

  if (applied) {
    if (applied.code !== code) return { ok: false, reason: 'already_applied' };
    return {
      ok: true,
      promotionId: applied.promotionId,
      code: applied.code,
      percent: applied.percent,
      discountCents: computePercentDiscountCents(discountableBaseCents, applied.percent),
    };
  }

  if (!promotion || promotion.code === null || promotion.code !== code) {
    return { ok: false, reason: 'not_found' };
  }
  if (!promotion.isActive || promotion.discountType !== 'percent') {
    return { ok: false, reason: 'inactive' };
  }
  if (now.getTime() < promotion.validFrom.getTime()) return { ok: false, reason: 'not_started' };
  if (now.getTime() >= promotion.validUntil.getTime()) return { ok: false, reason: 'expired' };
  if (!isProductEligible(promotion.eligibility, product)) return { ok: false, reason: 'not_applicable' };

  return {
    ok: true,
    promotionId: promotion.id,
    code: promotion.code,
    percent: promotion.discountValue,
    discountCents: computePercentDiscountCents(discountableBaseCents, promotion.discountValue),
  };
}
