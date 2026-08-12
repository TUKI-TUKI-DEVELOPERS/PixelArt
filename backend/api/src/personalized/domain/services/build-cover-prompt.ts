import { fillNamePlaceholders, NamePlaceholderValues } from './build-generation-prompt';

// COVER/BACK_COVER se insertan como página única completa (no se parten en
// Cara A/B como TEMPLATE) a la proporción REAL de impresión —
// WIDTH_CM/HEIGHT_CM = 29/20.5 ≈ 1.4146:1 (custom-book-pdf.service.ts) — no
// al 3:2 (1.5:1) usado libremente durante el piloto manual en ChatGPT.
// 1456x1024 = 1.4219:1, el múltiplo de 16 más cercano a la proporción real
// (mismo tipo de cálculo que ya usa SPREAD_SIZE en build-generation-prompt.ts).
export const COVER_SIZE = '1456x1024';

// Idéntica en todos los libros — no amerita columna en BD (mismo criterio
// que DEFAULT_SEPARATOR).
const CLOSING_LINE = 'Impreso con cariño en Perú, para quien más quieres.';

export type BuildCoverPromptInput = {
  sharedBlocks: Record<string, string>;
  /** cover_scene_visual del modelo, YA con los placeholders rellenados
   * (fillNamePlaceholders) — incluye escena, fondo, efectos e iluminación
   * como un solo bloque (ver personalized_models.cover_scene_visual). */
  coverSceneVisual: string;
  title: string;
  /** tapa_diseno_editorial_wrapper (subtítulo impreso) y tapa_composicion_reglas
   * también traen {NOMBRE_DESTINATARIO}/{NOMBRE_DEDICANTE} sin rellenar —
   * antes de este fix llegaban literales al prompt de imagen, y la IA
   * terminaba inventando nombres para poder renderizar el subtítulo. */
  names: NamePlaceholderValues;
};

/** Arma el prompt final de TAPA — mismo patrón de bloques fijos (tapa_*) +
 * contenido propio del libro que buildGenerationPrompt() ya usa para las
 * páginas interiores. */
export function buildCoverPrompt(input: BuildCoverPromptInput): string {
  const disenoEditorial = fillNamePlaceholders(
    input.sharedBlocks['tapa_diseno_editorial_wrapper'].replace('{TITULO}', input.title),
    input.names,
  );
  const composicionReglas = fillNamePlaceholders(input.sharedBlocks['tapa_composicion_reglas'], input.names);

  return [
    `[IMAGEN BASE]\n${input.sharedBlocks['tapa_imagen_base']}`,
    `[ESCENA VISUAL]\n${input.coverSceneVisual}`,
    `Proporción y conexión física entre ambos (crítico)\n${input.sharedBlocks['tapa_proporcion_conexion']}`,
    `[COMPOSICIÓN — REGLAS OBLIGATORIAS]\n${composicionReglas}`,
    `[DISEÑO EDITORIAL]\n${disenoEditorial}`,
    `[DETALLES TÉCNICOS]\n${input.sharedBlocks['tapa_detalles_tecnicos']}`,
  ].join('\n\n');
}

export type BuildBackCoverPromptInput = {
  sharedBlocks: Record<string, string>;
  /** back_cover_scene del modelo — fondo/escena propio del libro (ej. balcón
   * romántico para "Mi Amor", cielo con arcoíris para "El Mejor Equipo").
   * Antes esto leía un único bloque compartido ('contratapa_fondo_efectos'),
   * por lo que TODOS los libros generaban con el mismo fondo — quedó
   * documentado en personalized_models.back_cover_scene. */
  scene: string;
  /** back_cover_tagline del modelo (copy propio del libro). */
  tagline: string;
  /** back_cover_hashtag de la categoría. */
  hashtag: string;
  names: NamePlaceholderValues;
};

/** Arma el prompt final de CONTRATAPA — sin fotos de referencia (se genera
 * con ImageGenerationPort.generate(), no generateWithReferences()). */
export function buildBackCoverPrompt(input: BuildBackCoverPromptInput): string {
  const wrapper = input.sharedBlocks['contratapa_diseno_editorial_wrapper']
    // En mayúsculas por código, no por instrucción de texto — gpt-image
    // renderiza el string tal cual viene (back_cover_tagline vive en BD en
    // minúscula de oración, se usa así en otros contextos), confiarle el
    // mayusculeo a la IA es menos confiable que garantizarlo acá.
    .replace('{TAGLINE}', input.tagline.toUpperCase())
    .replace('{HASHTAG}', input.hashtag)
    .replace('{LINEA_CIERRE}', CLOSING_LINE);
  const disenoEditorial = fillNamePlaceholders(wrapper, input.names);

  return [
    `[IMAGEN BASE]\n${input.sharedBlocks['contratapa_imagen_base']}`,
    `[ESCENA VISUAL]\n${input.scene}`,
    `[COMPOSICIÓN — REGLAS OBLIGATORIAS]\n${input.sharedBlocks['contratapa_composicion_reglas']}`,
    `[DISEÑO EDITORIAL]\n${disenoEditorial}`,
    `[DETALLES TÉCNICOS]\n${input.sharedBlocks['contratapa_detalles_tecnicos']}`,
  ].join('\n\n');
}
