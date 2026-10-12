export const CUSTOM_PHOTOBOOK_PROPOSAL_SIZE = '1024x1024';

export type CustomPhotobookCoverSurface = 'FRONT_COVER' | 'BACK_COVER';

type CustomPhotobookCoverPromptInput = {
  request: {
    occasion: string;
    requestedTheme: string;
    coverTitle: string | null;
    coverMode: string;
    brief: string;
  };
  surface: CustomPhotobookCoverSurface;
  creativeDirection?: string;
  continuationSource?: 'PREVIOUS_FRONT_PROPOSAL' | 'SELECTED_FRONT_PROPOSAL';
};

const surfaceLabel: Record<CustomPhotobookCoverSurface, string> = {
  FRONT_COVER: 'TAPA FRONTAL',
  BACK_COVER: 'CONTRATAPA',
};

export function buildCustomPhotobookCoverPrompt({
  request,
  surface,
  creativeDirection,
  continuationSource,
}: CustomPhotobookCoverPromptInput): string {
  const title = request.coverTitle?.trim() || 'Sin título definido';
  const direction = creativeDirection?.trim() || 'Respeta y desarrolla la intención expresada por el cliente.';
  const coverModeLabel = request.coverMode === 'PIXELART_DESIGNED'
    ? 'Diseño editorial a cargo de PixelArt a partir de la idea y las referencias del cliente.'
    : request.coverMode === 'CUSTOMER_ARTWORK'
      ? 'Arte base aportado por el cliente.'
      : 'Cubierta construida a partir de fotografías del cliente.';
  const artworkInstruction = request.coverMode === 'CUSTOMER_ARTWORK'
    ? 'El cliente aportó un arte base. Úsalo como referencia para proponer una adaptación de composición, estilo o encuadre que pueda funcionar en la cubierta. No afirmes que modificas ni sustituyes el archivo original: el administrador decidirá después qué versión aprobar y preparar para imprenta.'
    : request.coverMode === 'PHOTO_BASED'
      ? 'Crea una propuesta de fotografía editorial fotorrealista a partir de las fotografías de referencia y la dirección creativa. No conviertas las fotografías en ilustración, pixel art, estética de videojuego, anime ni render 3D, salvo que la dirección del administrador lo pida expresamente.'
      : 'Crea una propuesta editorial fotorrealista a partir del briefing y las referencias fotográficas. PixelArt es el nombre de la marca, no una instrucción de estilo pixel art: no generes ilustración, pixel art, estética de videojuego, anime ni render 3D, salvo que la dirección del administrador lo pida expresamente.';

  return [
    'Crea una propuesta visual para un photobook impreso de PixelArt.',
    `[SUPERFICIE]
${surfaceLabel[surface]}`,
    `[CONTEXTO DEL CLIENTE]
Ocasión: ${request.occasion}
Tema o idea: ${request.requestedTheme}
Título: ${title}
Modalidad de cubierta: ${coverModeLabel}
Brief: ${request.brief}`,
    `[TRATAMIENTO DEL MATERIAL]
${artworkInstruction}`,
    ...(continuationSource === 'PREVIOUS_FRONT_PROPOSAL' ? [`[ITERACIÓN DESDE LA PROPUESTA ANTERIOR]
La imagen de referencia adicional es la última propuesta de tapa frontal. Úsala como base obligatoria de esta iteración: conserva sus sujetos principales, composición y jerarquía visual, salvo que la dirección del administrador pida un cambio explícito. La nueva dirección describe los ajustes a aplicar, no debe eliminar elementos relevantes de la propuesta anterior.`] : []),
    ...(continuationSource === 'SELECTED_FRONT_PROPOSAL' ? [`[CONTINUIDAD CON LA TAPA SELECCIONADA]
La imagen de referencia adicional corresponde a la tapa frontal que el administrador seleccionó. Crea una contratapa que continúe su paleta, atmósfera, lenguaje visual y jerarquía sin copiarla literalmente.`] : []),
    `[PRIORIDAD DE INSTRUCCIONES]
La dirección creativa del administrador define la propuesta actual y prevalece sobre el brief del cliente cuando ambos indiquen escenarios, sujetos, composición o estilo diferentes.`,
    `[DIRECCIÓN CREATIVA DEL ADMIN]
${direction}`,
    `[REQUISITOS TÉCNICOS]
Esta propuesta corresponde a un panel cuadrado de 22 × 22 cm. La impresión final tiene 3 mm de sangrado exterior. El lomo se calculará después según la cantidad de páginas y el tipo de tapa; no intentes dibujar ni adivinar el lomo en esta imagen. Deja las zonas de texto importantes alejadas de los bordes.`,
    `[ENTREGA]
Devuelve únicamente una propuesta visual sin mockups, sin marcas de agua y sin texto ilegible generado por IA. Esta imagen es una propuesta visual que luego se compondrá en la cubierta final de imprenta.`,
  ].join('\n\n');
}
