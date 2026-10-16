import { COVER_SIZE, buildBackCoverPrompt, buildCoverPrompt } from './build-cover-prompt';

describe('COVER_SIZE', () => {
  it('keeps the print-ratio cover size', () => {
    expect(COVER_SIZE).toBe('3424x2416');
  });
});

describe('buildCoverPrompt', () => {
  const sharedBlocks = {
    tapa_imagen_base: 'TAPA-BASE',
    tapa_proporcion_conexion: 'PROPORCION',
    tapa_composicion_reglas: 'Reglas con {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE}',
    tapa_diseno_editorial_wrapper: 'Titulo: {TITULO}. Subtitulo: {NOMBRE_DESTINATARIO} & {NOMBRE_DEDICANTE}',
    tapa_detalles_tecnicos: 'TAPA-TECNICOS',
  };

  const input = {
    sharedBlocks,
    coverSceneVisual: 'ESCENA-TAPA',
    title: 'Mi Amor',
    names: { nombreDestinatario: 'maría', nombreDedicante: 'JAVIER' },
  };

  it('assembles the cover sections in order, joined by blank lines', () => {
    const prompt = buildCoverPrompt(input);
    expect(prompt.split('\n\n')).toEqual([
      '[IMAGEN BASE]\nTAPA-BASE',
      '[ESCENA VISUAL]\nESCENA-TAPA',
      'Proporción y conexión física entre ambos (crítico)\nPROPORCION',
      '[COMPOSICIÓN — REGLAS OBLIGATORIAS]\nReglas con María y Javier',
      '[DISEÑO EDITORIAL]\nTitulo: Mi Amor. Subtitulo: María & Javier',
      '[DETALLES TÉCNICOS]\nTAPA-TECNICOS',
    ]);
  });

  it('replaces {TITULO} before filling names', () => {
    const prompt = buildCoverPrompt(input);
    expect(prompt).toContain('Titulo: Mi Amor.');
    expect(prompt).not.toContain('{TITULO}');
  });

  it('fills and capitalizes name placeholders in editorial and composition blocks', () => {
    const prompt = buildCoverPrompt(input);
    expect(prompt).toContain('Subtitulo: María & Javier');
    expect(prompt).toContain('Reglas con María y Javier');
    expect(prompt).not.toContain('{NOMBRE_DESTINATARIO}');
    expect(prompt).not.toContain('{NOMBRE_DEDICANTE}');
  });

  it('adds a non-empty refinement as high-priority full-image guidance', () => {
    const prompt = buildCoverPrompt({ ...input, refinementPrompt: 'Haz la escena más luminosa' });
    expect(prompt).toContain('[AJUSTE PRIORITARIO DEL EDITOR]\nLa imagen completa debe regenerarse. Haz la escena más luminosa');
    expect(prompt).toContain('[COMPOSICIÓN — REGLAS OBLIGATORIAS]');
    expect(prompt).toContain('[DETALLES TÉCNICOS]');
  });

  it('ignores whitespace-only refinement', () => {
    expect(buildCoverPrompt({ ...input, refinementPrompt: '  \n ' })).not.toContain('[AJUSTE PRIORITARIO DEL EDITOR]');
  });
});

describe('buildBackCoverPrompt', () => {
  const sharedBlocks = {
    contratapa_imagen_base: 'CONTRA-BASE',
    contratapa_composicion_reglas: 'CONTRA-COMP',
    contratapa_diseno_editorial_wrapper:
      'Frase: {TAGLINE} | Tag: {HASHTAG} | Cierre: {LINEA_CIERRE} | Para {NOMBRE_DESTINATARIO}',
    contratapa_detalles_tecnicos: 'CONTRA-TECNICOS',
  };

  const input = {
    sharedBlocks,
    scene: 'BALCON ROMANTICO',
    tagline: 'un libro hecho con amor',
    hashtag: '#PixelArtPeru',
    names: { nombreDestinatario: 'lucía' },
  };

  it('assembles the back cover sections in order', () => {
    const prompt = buildBackCoverPrompt(input);
    expect(prompt.split('\n\n')).toEqual([
      '[IMAGEN BASE]\nCONTRA-BASE',
      '[ESCENA VISUAL]\nBALCON ROMANTICO',
      '[COMPOSICIÓN — REGLAS OBLIGATORIAS]\nCONTRA-COMP',
      '[DISEÑO EDITORIAL]\nFrase: UN LIBRO HECHO CON AMOR | Tag: #PixelArtPeru | ' +
        'Cierre: Impreso con cariño en Perú, para quien más quieres. | Para Lucía',
      '[DETALLES TÉCNICOS]\nCONTRA-TECNICOS',
    ]);
  });

  it('uppercases the tagline in code, not via the prompt', () => {
    const prompt = buildBackCoverPrompt(input);
    expect(prompt).toContain('UN LIBRO HECHO CON AMOR');
    expect(prompt).not.toContain('un libro hecho con amor');
  });

  it('keeps the hashtag as-is', () => {
    expect(buildBackCoverPrompt(input)).toContain('#PixelArtPeru');
  });

  it('substitutes the fixed closing line', () => {
    const prompt = buildBackCoverPrompt(input);
    expect(prompt).toContain('Impreso con cariño en Perú, para quien más quieres.');
    expect(prompt).not.toContain('{LINEA_CIERRE}');
  });

  it('fills name placeholders in the editorial wrapper', () => {
    expect(buildBackCoverPrompt(input)).toContain('Para Lucía');
  });

  it('adds a non-empty refinement as high-priority full-image guidance', () => {
    const prompt = buildBackCoverPrompt({ ...input, refinementPrompt: 'Quita las nubes' });
    expect(prompt).toContain('[AJUSTE PRIORITARIO DEL EDITOR]\nLa imagen completa debe regenerarse. Quita las nubes');
    expect(prompt).toContain('[COMPOSICIÓN — REGLAS OBLIGATORIAS]');
    expect(prompt).toContain('[DETALLES TÉCNICOS]');
  });

  it('ignores whitespace-only refinement', () => {
    expect(buildBackCoverPrompt({ ...input, refinementPrompt: '  ' })).not.toContain('[AJUSTE PRIORITARIO DEL EDITOR]');
  });
});
