export type BuildGenerationPromptInput = {
  sharedBlocks: Record<string, string>;
  isPetCategory: boolean;
  sceneVisual: string;
  backgroundDetails: string;
  magicEffects: string;
  lightingColor: string;
  title: string;
  poem: string;
};

/** Arma el prompt final concatenando los bloques compartidos (fijos, viven
 * en prompt_shared_blocks) con el contenido propio de la plantilla — mismo
 * orden y estructura validados en el piloto real. */
export function buildGenerationPrompt(input: BuildGenerationPromptInput): string {
  const identidad = input.isPetCategory
    ? input.sharedBlocks['identidad_mascota']
    : input.sharedBlocks['identidad_humano'];

  const disenoEditorial = input.sharedBlocks['diseno_editorial_wrapper']
    .replace('{TITULO}', input.title)
    .replace('{POEMA}', input.poem);

  return [
    `[IMAGEN BASE]\n${input.sharedBlocks['imagen_base']}`,
    `[ESCENA VISUAL]\n${input.sceneVisual}\n\n${identidad}`,
    `Fondo y Detalles\n${input.backgroundDetails}`,
    `Efectos Mágicos\n${input.magicEffects}`,
    `[ILUMINACIÓN Y COLOR]\n${input.lightingColor}`,
    `[COMPOSICIÓN — REGLAS OBLIGATORIAS]\n${input.sharedBlocks['composicion_reglas']}`,
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
