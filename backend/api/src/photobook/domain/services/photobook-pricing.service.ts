export type PhotobookCoverType = 'TAPA_DELGADA' | 'TAPA_GRUESA';

const MIN_HOJAS = 15;
const RUSH_FEE_CENTS = 2500;

const BASE_CENTS: Record<PhotobookCoverType, number> = {
  TAPA_DELGADA: 9000,
  TAPA_GRUESA: 12000,
};
const EXTRA_PER_HOJA_CENTS: Record<PhotobookCoverType, number> = {
  TAPA_DELGADA: 300,
  TAPA_GRUESA: 400,
};

export function isValidPhotobookCoverType(value: string): value is PhotobookCoverType {
  return value === 'TAPA_DELGADA' || value === 'TAPA_GRUESA';
}

export function calculatePhotobookRushFeeCents(wantsRush: boolean): number {
  return wantsRush ? RUSH_FEE_CENTS : 0;
}

// Misma fórmula que el editor (frontend PhotobookEditorClient.tsx getPriceCents):
// base por tipo de tapa + incremento por hoja sobre MIN_HOJAS, más rush fee.
// Es la única fuente de verdad del precio — el backend nunca confía en un total
// calculado en el cliente.
export function calculatePhotobookTotalCents(coverType: PhotobookCoverType, caraCount: number, wantsRush: boolean): number {
  const hojas = Math.ceil(caraCount / 2);
  const coverPriceCents = hojas < MIN_HOJAS
    ? 0
    : BASE_CENTS[coverType] + (hojas - MIN_HOJAS) * EXTRA_PER_HOJA_CENTS[coverType];
  return coverPriceCents + calculatePhotobookRushFeeCents(wantsRush);
}
