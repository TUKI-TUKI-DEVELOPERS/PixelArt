export type CheckoutPackage = 'STANDARD' | 'PREMIUM';

/** S/ 40.00 — premium package (5 extra templates), independent of the cover. */
export const EXTRA_TEMPLATES_PRICE_CENTS = 4000;

export function extraTemplatesAmountFor(packageType: CheckoutPackage): number {
  return packageType === 'PREMIUM' ? EXTRA_TEMPLATES_PRICE_CENTS : 0;
}

/**
 * The amount a promotion percentage applies to: the product price only
 * (book base price + premium package). The rush fee is never discounted.
 */
export function discountableBaseCents(amounts: { baseAmountCents: number; extraTemplatesAmountCents: number }): number {
  return amounts.baseAmountCents + amounts.extraTemplatesAmountCents;
}

export function checkoutTotalCents(amounts: {
  baseAmountCents: number;
  rushFeeCents: number;
  extraTemplatesAmountCents: number;
  discountCents: number;
}): number {
  return amounts.baseAmountCents + amounts.rushFeeCents + amounts.extraTemplatesAmountCents - amounts.discountCents;
}
