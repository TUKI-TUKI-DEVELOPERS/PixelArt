// TODO: Utilidad convertir centavos -> "S/ 89.00"
export function formatPrice(cents: number): string {
  return `S/ ${(cents / 100).toFixed(2)}`;
}

/** Percentage discount in centavos, rounded like the backend (Math.round). */
export function percentDiscountCents(baseCents: number, percent: number): number {
  return Math.round((baseCents * percent) / 100);
}
