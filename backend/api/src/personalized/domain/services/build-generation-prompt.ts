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

/** Separador decorativo debajo del poema. El bloque compartido trae el corazón
 * (Amor y default). Para Familia se reemplaza por una casita (hogar), para
 * Mascotas por una huella de pata y para Memorias Familiares por una paloma
 * (símbolo memorial) — la lógica vive acá y NO en el shared block, así el
 * bloque sigue siendo válido aunque el código no se haya actualizado todavía. */
export const DEFAULT_SEPARATOR = 'un corazón pequeño';
const DEFAULT_SEPARATOR_PHRASE = 'un corazón pequeño centrado en el medio';

/** Amor y default -> corazón; Familia -> casita; Mascotas -> huella de pata;
 * Memorias Familiares -> paloma. "Memorias Familiares" es una categoría
 * aparte (no Familia), por eso se chequea antes de "familia" con el guard de
 * "memoria" (que además excluye a Familia del branch de casita). */
export function resolveSeparator(categoryName?: string | null): string {
  const n = (categoryName ?? '').toLowerCase();
  if (n.includes('memoria')) return 'una pequeña paloma';
  if (n.includes('familia')) return 'una pequeña casa estilizada';
  if (n.includes('mascota')) return 'una pequeña huella de pata';
  return DEFAULT_SEPARATOR;
}

export type BuildGenerationPromptInput = {
  sharedBlocks: Record<string, string>;
  isPetCategory: boolean;
  /** Cuando la escena necesita AMBAS identidades (mascota Y humano) juntas —
   * ej. libros de memorial de mascotas donde el dueño/a también debe
   * parecerse a su foto real, no solo la mascota (ver needsDualIdentity).
   * Default false: se usa SOLO el bloque de mascota (el resto del catálogo
   * de Mascotas deja al dueño/a deliberadamente borroso/parcial, sin
   * necesitar matching de cara — verificado leyendo el catálogo completo). */
  needsHumanIdentityToo?: boolean;
  sceneVisual: string;
  backgroundDetails: string;
  magicEffects: string;
  lightingColor: string;
  title: string;
  poem: string;
  /** Frase del separador decorativo (ver resolveSeparator). Sin definir: corazón. */
  separator?: string;
  /** Sin definir: genera UN lienzo pensado para partirse al medio (demo y
   * backfill de órdenes desde el original del demo). 'A'/'B': genera una
   * página completa e independiente (libro apaisado, cada página =
   * WIDTH_CM/HEIGHT_CM real) — usado por la generación fresca de plantillas
   * de orden, que ya no corta ninguna imagen. */
  page?: 'A' | 'B';
};

/** Modelos (libros) de Mascotas donde tanto la mascota COMO el/los dueño/s
 * necesitan matching de cara real en la misma escena — a diferencia del
 * resto del catálogo de Mascotas, donde el dueño/a queda deliberadamente
 * borroso/parcial en el .md y no necesita identidad (confirmado leyendo las
 * 20 plantillas completas de Mi amigo Miauravilloso y Mi mejor amigo del
 * mundo, sin una sola excepción). "Nuestro Angel de 4 patas" es un libro de
 * memorial/duelo (Rainbow Bridge) donde el dueño real posando junto a su
 * mascota fallecida es el corazón emocional del producto. "Aventura entre
 * patas" tiene hasta 3 dueños (niños) reales, cuyas fotos matchean contra el
 * mismo texto colectivo ("los niños") sin importar cuántos sean. */
const DUAL_IDENTITY_MODELS = new Set(['Nuestro Angel de 4 patas', 'Aventura entre patas']);

export function needsDualIdentity(modelName?: string | null): boolean {
  return DUAL_IDENTITY_MODELS.has(modelName ?? '');
}

/** Arma el prompt final concatenando los bloques compartidos (fijos, viven
 * en prompt_shared_blocks) con el contenido propio de la plantilla — mismo
 * orden y estructura validados en el piloto real. */
export function buildGenerationPrompt(input: BuildGenerationPromptInput): string {
  const identidad = input.needsHumanIdentityToo
    ? `${input.sharedBlocks['identidad_mascota']}\n\n${input.sharedBlocks['identidad_humano']}`
    : input.isPetCategory
      ? input.sharedBlocks['identidad_mascota']
      : input.sharedBlocks['identidad_humano'];

  const editorialKey = input.page ? `diseno_editorial_pagina_${input.page.toLowerCase()}` : 'diseno_editorial_wrapper';
  const composicionKey = input.page ? 'composicion_reglas_paginas' : 'composicion_reglas';

  const separator = input.separator ?? DEFAULT_SEPARATOR;
  let disenoEditorial = input.sharedBlocks[editorialKey]
    .replace('{TITULO}', input.title)
    .replace('{POEMA}', input.poem);
  if (separator !== DEFAULT_SEPARATOR) {
    disenoEditorial = disenoEditorial.replace(DEFAULT_SEPARATOR_PHRASE, `${separator} en el centro`);
  }

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

/** El cliente puede haber tipeado su nombre en cualquier capitalización
 * ("zoe", "JAVIER", etc.) en el wizard — como esto termina impreso en un
 * libro físico, se normaliza acá, en el único punto por el que pasan todos
 * los nombres antes de entrar a un prompt de imagen (tapa, contratapa y
 * páginas interiores). No toca la BD, solo lo que ve la IA. */
function capitalizeName(name: string): string {
  return name
    .split(' ')
    .map((word) => (word.length > 0 ? word[0].toUpperCase() + word.slice(1).toLowerCase() : word))
    .join(' ');
}

/** Rellena los placeholders {NOMBRE_X} de scene_visual/poem_template con los
 * datos reales del cliente — nunca con los nombres de ejemplo del catálogo. */
export function fillNamePlaceholders(text: string, values: NamePlaceholderValues): string {
  return text
    .replaceAll('{NOMBRE_DESTINATARIO}', capitalizeName(values.nombreDestinatario ?? ''))
    .replaceAll('{APODO_DESTINATARIO}', capitalizeName(values.apodoDestinatario ?? values.nombreDestinatario ?? ''))
    .replaceAll('{NOMBRE_DEDICANTE}', capitalizeName(values.nombreDedicante ?? ''))
    .replaceAll('{APELLIDO}', capitalizeName(values.apellido ?? ''));
}

type FamilyGroupCharacterMeta = {
  familyName?: string | null;
  papa?: { name?: string | null } | null;
  mama?: { name?: string | null } | null;
};

/** Para el modo "familia-grupo" (libro Mi Familia) el wizard NO recolecta
 * recipientName/dedicatorName (quedan NULL a propósito — no hay un único
 * "destinatario"/"dedicante" en un libro de toda la familia). El nombre real
 * de papá, mamá y el apellido viven en characterMeta.papa.name/mama.name/
 * familyName en su lugar. Reusa los mismos 3 placeholders existentes
 * ({NOMBRE_DESTINATARIO}=papá, {NOMBRE_DEDICANTE}=mamá, {APELLIDO}) en vez de
 * inventar tokens nuevos — esos slots están libres para este modo porque las
 * columnas de demo_request quedan NULL. Devuelve null si characterMeta no
 * tiene forma de familia-grupo (no rompe ningún otro libro). */
export function resolveFamilyGroupNameValues(
  characterMeta: Record<string, unknown> | null | undefined,
): NamePlaceholderValues | null {
  if (!characterMeta || typeof characterMeta !== 'object') return null;
  const meta = characterMeta as FamilyGroupCharacterMeta;
  if (!meta.papa && !meta.mama) return null;
  return {
    nombreDestinatario: meta.papa?.name ?? null,
    nombreDedicante: meta.mama?.name ?? null,
    apellido: meta.familyName ?? null,
  };
}

/** "A" / "A & B" / "A, B & C" — mismo criterio en todos los libros de
 * reparto variable que necesitan listar N nombres en un solo placeholder. */
function joinNamesOxford(names: string[]): string {
  if (names.length <= 1) return names[0] ?? '';
  const last = names[names.length - 1];
  const rest = names.slice(0, -1).join(', ');
  return `${rest} & ${last}`;
}

type HermanosCharacterMeta = {
  hermanos?: Array<{ name?: string | null } | null> | null;
};

/** Para el modo "hermanos" (libro El Mejor Equipo) el wizard tampoco
 * recolecta recipientName/dedicatorName (quedan NULL — no hay un único
 * "destinatario"/"dedicante" entre 2 o 3 hermanos). Los nombres reales viven
 * en characterMeta.hermanos[].name. No hay slot dedicado para una lista de
 * N nombres, así que se reparten en los 2 placeholders existentes: todos
 * menos el último en {NOMBRE_DESTINATARIO} (separados por coma) y el último
 * en {NOMBRE_DEDICANTE} — el subtítulo fijo "{NOMBRE_DESTINATARIO} &
 * {NOMBRE_DEDICANTE}" termina leyéndose como una lista natural ("Valentina,
 * Mateo & Sofía"). Devuelve null si characterMeta no tiene forma de
 * "hermanos" (no rompe ningún otro libro). */
export function resolveHermanosNameValues(
  characterMeta: Record<string, unknown> | null | undefined,
): NamePlaceholderValues | null {
  if (!characterMeta || typeof characterMeta !== 'object') return null;
  const meta = characterMeta as HermanosCharacterMeta;
  if (!Array.isArray(meta.hermanos)) return null;
  const names = meta.hermanos.map((h) => h?.name).filter((n): n is string => !!n);
  if (names.length === 0) return null;
  const last = names[names.length - 1];
  const rest = names.slice(0, -1).join(', ');
  return {
    nombreDestinatario: rest || null,
    nombreDedicante: last,
  };
}

type AventuraEntrePatasCharacterMeta = {
  mode?: string;
  pet?: { name?: string | null } | null;
  owners?: Array<{ name?: string | null } | null> | null;
};

/** Para "Aventura entre patas" (mascota + 1 a 3 niños dueños), a diferencia
 * de "hermanos", el wizard SÍ guarda recipientName/dedicatorName (no quedan
 * NULL) — pero dedicatorName es solo el nombre del PRIMER dueño; el 2do y
 * 3ro viven únicamente en characterMeta.owners[1]/[2], invisibles para
 * resolveNameValues() por defecto. Sin este resolver, el subtítulo de la
 * tapa imprime solo "Mascota & Dueño1" y pierde a los demás dueños en
 * silencio cuando hay 2 o 3. {NOMBRE_DESTINATARIO}=mascota (ya andaba bien),
 * {NOMBRE_DEDICANTE}=todos los dueños unidos ("Mateo & Sofía" / "Mateo,
 * Sofía & Lucía"). Devuelve null si characterMeta no tiene forma de
 * "mascotas-aventura" (no rompe ningún otro libro). */
export function resolveAventuraEntrePatasNameValues(
  characterMeta: Record<string, unknown> | null | undefined,
): NamePlaceholderValues | null {
  if (!characterMeta || typeof characterMeta !== 'object') return null;
  const meta = characterMeta as AventuraEntrePatasCharacterMeta;
  if (meta.mode !== 'mascotas-aventura') return null;
  const ownerNames = (meta.owners ?? []).map((o) => o?.name).filter((n): n is string => !!n);
  if (ownerNames.length === 0 && !meta.pet?.name) return null;
  return {
    nombreDestinatario: meta.pet?.name ?? null,
    nombreDedicante: ownerNames.length > 0 ? joinNamesOxford(ownerNames) : null,
  };
}

type MemorialHermanosCharacterMeta = {
  mode?: string;
  recipient?: { name?: string | null } | null;
  livingSiblings?: Array<{ name?: string | null } | null> | null;
};

/** Para "Siempre serás parte de mí" (hermano/a fallecido + 1 o 2 hermanos
 * vivos que dedican), mismo problema que "Aventura entre patas": el wizard
 * SÍ guarda recipientName/dedicatorName (no quedan NULL), pero dedicatorName
 * es solo el nombre del PRIMER hermano vivo — el segundo vive únicamente en
 * characterMeta.livingSiblings[1], invisible para resolveNameValues() por
 * defecto. Sin esto, el subtítulo pierde al segundo hermano en silencio
 * cuando numSiblings=3. {NOMBRE_DESTINATARIO}=hermano/a fallecido,
 * {NOMBRE_DEDICANTE}=todos los hermanos vivos unidos. Devuelve null si
 * characterMeta no tiene forma de "memorial-hermanos". */
export function resolveMemorialHermanosNameValues(
  characterMeta: Record<string, unknown> | null | undefined,
): NamePlaceholderValues | null {
  if (!characterMeta || typeof characterMeta !== 'object') return null;
  const meta = characterMeta as MemorialHermanosCharacterMeta;
  if (meta.mode !== 'memorial-hermanos') return null;
  const livingNames = (meta.livingSiblings ?? []).map((s) => s?.name).filter((n): n is string => !!n);
  if (livingNames.length === 0 && !meta.recipient?.name) return null;
  return {
    nombreDestinatario: meta.recipient?.name ?? null,
    nombreDedicante: livingNames.length > 0 ? joinNamesOxford(livingNames) : null,
  };
}

/** El `name` en BD incluye el sufijo de dirección ("... El a Ella") para
 * distinguirlo en el admin — el título impreso en la imagen no lo lleva. */
export function derivePrintedTitle(templateName: string | null): string {
  if (!templateName) return '';
  return templateName.replace(/\s+(El a Ella|Ella a El)$/i, '').toUpperCase();
}
