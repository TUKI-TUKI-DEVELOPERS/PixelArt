// TODO: Utilidad convertir centavos -> "S/ 89.00"
export function formatPrice(cents: number): string {
  return `S/ ${(cents / 100).toFixed(2)}`;
}
