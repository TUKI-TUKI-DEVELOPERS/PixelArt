import { buildCustomPhotobookCoverPrompt } from './build-custom-photobook-cover-prompt';

describe('buildCustomPhotobookCoverPrompt', () => {
  it('combines the customer brief, admin direction, selected surface, and fixed print facts', () => {
    const prompt = buildCustomPhotobookCoverPrompt({
      request: {
        occasion: 'Viaje',
        requestedTheme: 'Japón',
        coverTitle: 'Japón, otoño de 2026',
        coverMode: 'PHOTO_BASED',
        brief: 'Una cubierta serena con los recuerdos del viaje.',
      },
      surface: 'FRONT_COVER',
      creativeDirection: 'Luz azul de madrugada y composición limpia.',
    });

    expect(prompt).toContain('Una cubierta serena con los recuerdos del viaje.');
    expect(prompt).toContain('Luz azul de madrugada y composición limpia.');
    expect(prompt).toContain('TAPA FRONTAL');
    expect(prompt).toContain('22 × 22 cm');
    expect(prompt).toContain('3 mm');
    expect(prompt).toContain('propuesta visual');
    expect(prompt).toContain('fotografía editorial fotorrealista');
    expect(prompt).toContain('La dirección creativa del administrador define la propuesta actual');
  });

  it('does not expose the PixelArt brand mode as a pixel-art style instruction', () => {
    const prompt = buildCustomPhotobookCoverPrompt({
      request: {
        occasion: 'Viaje',
        requestedTheme: 'Japón',
        coverTitle: 'Fukuoka',
        coverMode: 'PIXELART_DESIGNED',
        brief: 'Una playa de Fukuoka.',
      },
      surface: 'FRONT_COVER',
      creativeDirection: 'El hombre aparece delante del paisaje antártico.',
    });

    expect(prompt).not.toContain('Modalidad de cubierta: PIXELART_DESIGNED');
    expect(prompt).toContain('PixelArt es el nombre de la marca, no una instrucción de estilo pixel art');
    expect(prompt).toContain('fotorrealista');
    expect(prompt).toContain('estética de videojuego');
  });

  it('marks a back cover as a continuation when a front proposal is selected', () => {
    const prompt = buildCustomPhotobookCoverPrompt({
      request: {
        occasion: 'Viaje',
        requestedTheme: 'Japón',
        coverTitle: null,
        coverMode: 'PHOTO_BASED',
        brief: 'Una cubierta coherente.',
      },
      surface: 'BACK_COVER',
      continuationSource: 'SELECTED_FRONT_PROPOSAL',
    });

    expect(prompt).toContain('CONTINUIDAD CON LA TAPA SELECCIONADA');
    expect(prompt).toContain('paleta, atmósfera, lenguaje visual');
  });

  it('makes a front-cover regeneration preserve the previous proposal unless the admin requests a change', () => {
    const prompt = buildCustomPhotobookCoverPrompt({
      request: {
        occasion: 'Viaje',
        requestedTheme: 'Japón',
        coverTitle: 'Fukuoka 2025',
        coverMode: 'PHOTO_BASED',
        brief: 'Una cubierta de recuerdos de viaje.',
      },
      surface: 'FRONT_COVER',
      creativeDirection: 'Haz la imagen fotorrealista.',
      continuationSource: 'PREVIOUS_FRONT_PROPOSAL',
    });

    expect(prompt).toContain('ITERACIÓN DESDE LA PROPUESTA ANTERIOR');
    expect(prompt).toContain('conserva sus sujetos principales, composición y jerarquía visual');
    expect(prompt).toContain('Haz la imagen fotorrealista.');
  });

  it('treats customer artwork as an adaptation reference, never an automatic replacement', () => {
    const prompt = buildCustomPhotobookCoverPrompt({
      request: {
        occasion: 'Boda',
        requestedTheme: 'Nuestro día',
        coverTitle: null,
        coverMode: 'CUSTOMER_ARTWORK',
        brief: 'El cliente compartió una portada propia.',
      },
      surface: 'BACK_COVER',
    });

    expect(prompt).toContain('arte base');
    expect(prompt).toContain('adaptación de composición, estilo o encuadre');
    expect(prompt).toContain('No afirmes que modificas ni sustituyes el archivo original');
  });
});
