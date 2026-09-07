// Geometría del wrap (tapa + lomo + contratapa como UNA pieza continua).
//
// El wrap se imprime como una sola página horizontal. Vista desde afuera,
// de izquierda a derecha: CONTRATAPA | LOMO | TAPA, más un sangrado (bleed)
// que rodea todo el perímetro y se recorta al encuadernar.
//
//   ┌───────────────────────────────────────────────────────┐
//   │ bleed                                                  │
//   │   ┌───────────────┬────┬───────────────┐               │
//   │   │  CONTRATAPA   │LOMO│     TAPA       │  coverHeight  │
//   │   │  coverWidth   │spine  coverWidth    │               │
//   │   └───────────────┴────┴───────────────┘               │
//   │ bleed                                                  │
//   └───────────────────────────────────────────────────────┘
//
// Funciones PURAS (sin IO): dado el tamaño de tapa, el ancho de lomo ya
// calculado (ver photobook-spine.service.ts) y el sangrado, devuelven las
// dimensiones del wrap y los offsets de cada zona. El corte real de la
// imagen (sharp) y el overlay de texto (Puppeteer) consumen estos números.

export type WrapLayout = {
  /** Página completa del wrap, incluyendo sangrado a ambos lados. */
  totalWidthCm: number;
  totalHeightCm: number;
  /** Sangrado por lado, en cm. */
  bleedCm: number;
  coverWidthCm: number;
  coverHeightCm: number;
  spineWidthCm: number;
  /** Offset del borde izquierdo del wrap (incluye el sangrado) a cada zona. */
  backCoverLeftCm: number;
  spineLeftCm: number;
  frontCoverLeftCm: number;
  /** Centro horizontal del lomo — donde se compone el texto país+año. */
  spineCenterCm: number;
};

/**
 * @param coverWidthCm  ancho de UNA tapa (trim), ej. 22
 * @param coverHeightCm alto de la tapa (trim), ej. 22
 * @param spineWidthMm  ancho del lomo ya calculado (calculateSpineWidthMm)
 * @param bleedMm       sangrado de imprenta (SANGRADO_MM)
 */
export function computeWrapLayout(
  coverWidthCm: number,
  coverHeightCm: number,
  spineWidthMm: number,
  bleedMm: number,
): WrapLayout {
  const bleedCm = bleedMm / 10;
  const spineWidthCm = spineWidthMm / 10;

  const backCoverLeftCm = bleedCm;
  const spineLeftCm = bleedCm + coverWidthCm;
  const frontCoverLeftCm = bleedCm + coverWidthCm + spineWidthCm;

  const totalWidthCm = 2 * coverWidthCm + spineWidthCm + 2 * bleedCm;
  const totalHeightCm = coverHeightCm + 2 * bleedCm;

  return {
    totalWidthCm,
    totalHeightCm,
    bleedCm,
    coverWidthCm,
    coverHeightCm,
    spineWidthCm,
    backCoverLeftCm,
    spineLeftCm,
    frontCoverLeftCm,
    spineCenterCm: spineLeftCm + spineWidthCm / 2,
  };
}

/**
 * Rectángulo de recorte (en px, sobre la panorámica fuente) para cada zona.
 * La panorámica se genera con la franja central segura al medio (layout de
 * referencia 44/12/44), pero el corte REAL usa el ancho de lomo dinámico:
 * el contenido se mapea proporcionalmente sobre el ancho útil del wrap
 * (2×tapa + lomo, sin sangrado — el sangrado se agrega/extiende aparte).
 */
export type CropRect = { left: number; top: number; width: number; height: number };

export function computeSourceCrops(
  sourceWidthPx: number,
  sourceHeightPx: number,
  layout: WrapLayout,
): { backCover: CropRect; spine: CropRect; frontCover: CropRect } {
  const innerWidthCm = 2 * layout.coverWidthCm + layout.spineWidthCm;
  const pxPerCm = sourceWidthPx / innerWidthCm;

  const backW = Math.round(layout.coverWidthCm * pxPerCm);
  const spineW = Math.round(layout.spineWidthCm * pxPerCm);
  const frontW = sourceWidthPx - backW - spineW; // el resto, evita drift por redondeo

  return {
    backCover: { left: 0, top: 0, width: backW, height: sourceHeightPx },
    spine: { left: backW, top: 0, width: spineW, height: sourceHeightPx },
    frontCover: { left: backW + spineW, top: 0, width: frontW, height: sourceHeightPx },
  };
}
