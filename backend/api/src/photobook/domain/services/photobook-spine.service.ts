import { PhotobookCoverType } from './photobook-pricing.service';

// Ancho del lomo (spine) de un fotolibro, en milímetros.
//
// Constantes calibradas contra UNA medición física de un libro real
// (TAPA_GRUESA, 15 hojas): bloque de hojas = 3.75 cm, lomo ≈ 4 cm.
// Detalle completo en PromptsPixelArtPlantillas/AUTOMATIZACION_PHOTOBOOKS.md
// ("Fase 2 — RESUELTO por medición física").
//
// Son constantes de ARRANQUE: se afinan con una prueba impresa real (Fase 6).
// Por eso viven acá centralizadas y no dispersas en el código.

/** Grosor de una hoja física, en mm. 3.75 cm ÷ 15 hojas = 2.5 mm/hoja.
 * Es alto porque el fotolibro es rígido/lay-flat (hojas gruesas montadas),
 * no papel fino pegado (~0.25 mm). */
export const CALIPER_MM_POR_HOJA = 2.5;

/** Cuánto suma la tapa al lomo, por encima del bloque de hojas, en mm.
 * TAPA_GRUESA es el ancla medida (lomo 40mm − bloque 37.5mm = 2.5mm).
 * TAPA_DELGADA lleva ~1mm menos (cartoncillo más fino: 0.75cm vs 0.85cm). */
export const OFFSET_TAPA_MM: Record<PhotobookCoverType, number> = {
  TAPA_DELGADA: 1.5,
  TAPA_GRUESA: 2.5,
};

/** Sangrado (bleed) estándar de imprenta, en mm. NO forma parte del ancho del
 * lomo (el lomo es interior al wrap, no se recorta ahí) — es margen del
 * perímetro exterior del wrap. Lo consume la geometría del wrap, no esta fn. */
export const SANGRADO_MM = 3;

/** Hojas físicas a partir de page_count. `page_count` son CARAS; una hoja
 * física = 2 caras. Mismo modelo que photobook-pricing.service.ts. */
export function hojasFromPageCount(pageCount: number): number {
  return Math.ceil(pageCount / 2);
}

/**
 * Ancho del lomo en mm para un pedido concreto.
 * lomo = hojas × caliper + offset_tapa  (sin sangrado — ver nota arriba).
 * Ejemplo ancla: 30 caras (15 hojas) TAPA_GRUESA → 15×2.5 + 2.5 = 40 mm.
 */
export function calculateSpineWidthMm(pageCount: number, coverType: PhotobookCoverType): number {
  const hojas = hojasFromPageCount(pageCount);
  return hojas * CALIPER_MM_POR_HOJA + OFFSET_TAPA_MM[coverType];
}
