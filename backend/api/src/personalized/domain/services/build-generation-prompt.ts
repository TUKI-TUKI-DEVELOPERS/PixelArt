// gpt-image-2 acepta resoluciones arbitrarias (múltiplo de 16, ratio entre
// 1:3 y 3:1) — a diferencia de gpt-image-1, que solo permite 1024x1024 /
// 1536x1024 / 1024x1536. 2896x1024 = ratio 2.828:1, calcado al ratio real del
// libro abierto (WIDTH_CM/HEIGHT_CM en custom-book-pdf.service.ts, 29/20.5 ×
// 2 = 2.829:1) — al partirlo al medio, cada mitad queda en ~1448x1024,
// ratio 1.414:1, calzando exacto con una página real (29:20.5) sin recortar
// nada. Usado tanto por la generación del demo como por la generación fresca
// de plantillas de orden — el original del demo tiene que nacer con este
// mismo tamaño para poder reusarse tal cual en el PDF de imprenta
// (backfillFromDemoOriginals), sin gastar una segunda llamada a OpenAI.
export const SPREAD_SIZE = '2896x1024';

export type BuildGenerationPromptInput = {
  sharedBlocks: Record<string, string>;
  isPetCategory: boolean;
  sceneVisual: string;
  backgroundDetails: string;
  magicEffects: string;
  lightingColor: string;
  title: string;
  poem: string;
  /** Sin definir: genera UN lienzo pensado para partirse al medio (demo y
   * backfill de órdenes desde el original del demo). 'A'/'B': genera una
   * página completa e independiente (libro apaisado, cada página =
   * WIDTH_CM/HEIGHT_CM real) — usado por la generación fresca de plantillas
   * de orden, que ya no corta ninguna imagen. */
  page?: 'A' | 'B';
};

/** Arma el prompt final concatenando los bloques compartidos (fijos, viven
 * en prompt_shared_blocks) con el contenido propio de la plantilla — mismo
 * orden y estructura validados en el piloto real. */
export function buildGenerationPrompt(input: BuildGenerationPromptInput): string {
  const identidad = input.isPetCategory
    ? input.sharedBlocks['identidad_mascota']
    : input.sharedBlocks['identidad_humano'];

  const editorialKey = input.page ? `diseno_editorial_pagina_${input.page.toLowerCase()}` : 'diseno_editorial_wrapper';
  const composicionKey = input.page ? 'composicion_reglas_paginas' : 'composicion_reglas';

  const disenoEditorial = input.sharedBlocks[editorialKey]
    .replace('{TITULO}', input.title)
    .replace('{POEMA}', input.poem);

  return [
    `[IMAGEN BASE]\n${input.sharedBlocks['imagen_base']}`,
    `[ESCENA VISUAL]\n${input.sceneVisual}\n\n${identidad}`,
    `Fondo y Detalles\n${input.backgroundDetails}`,
    `Efectos Mágicos\n${input.magicEffects}`,
    `[ILUMINACIÓN Y COLOR]\n${input.lightingColor}`,
    `[COMPOSICIÓN — REGLAS OBLIGATORIAS]\n${input.sharedBlocks[composicionKey]}`,
    `[DISEÑO EDITORIAL]\n${disenoEditorial}`,
    `[DETALLES TÉCNICOS]\n${input.sharedBlocks['detalles_tecnicos']}`,
  ].join('\n\n');
}

export type NamePlaceholderValues = {
  nombreDestinatario?: string | null;
  apodoDestinatario?: string | null;
  nombreDedicante?: string | null;
  apellido?: string | null;
};

/** Rellena los placeholders {NOMBRE_X} de scene_visual/poem_template con los
 * datos reales del cliente — nunca con los nombres de ejemplo del catálogo. */
export function fillNamePlaceholders(text: string, values: NamePlaceholderValues): string {
  return text
    .replaceAll('{NOMBRE_DESTINATARIO}', values.nombreDestinatario ?? '')
    .replaceAll('{APODO_DESTINATARIO}', values.apodoDestinatario ?? values.nombreDestinatario ?? '')
    .replaceAll('{NOMBRE_DEDICANTE}', values.nombreDedicante ?? '')
    .replaceAll('{APELLIDO}', values.apellido ?? '');
}

/** El `name` en BD incluye el sufijo de dirección ("... El a Ella") para
 * distinguirlo en el admin — el título impreso en la imagen no lo lleva. */
export function derivePrintedTitle(templateName: string | null): string {
  if (!templateName) return '';
  return templateName.replace(/\s+(El a Ella|Ella a El)$/i, '').toUpperCase();
}
