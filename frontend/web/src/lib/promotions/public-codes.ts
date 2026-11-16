/** A coded promotion valid right now, as GET /api/promotions/codes returns it. */
export type PublicPromoCode = {
  code: string;
  percent: number;
  /** Short scope, e.g. "en photobooks"; null when it cannot be summarized. */
  scope: string | null;
  audience: 'personalized' | 'photobook' | 'mixed';
  validUntil: string;
};

export function promoBannerMessage(promo: PublicPromoCode): string {
  const base = `Usa el código ${promo.code} y obtén ${promo.percent}% de descuento`;
  return promo.scope ? `${base} ${promo.scope}` : base;
}

/** Where a promotion's call to action should take the customer. */
export function promoLandingHref(promo: PublicPromoCode): string {
  if (promo.audience === 'photobook') return '/photobooks';
  if (promo.audience === 'personalized') return '/libros-personalizados';
  return '/';
}
