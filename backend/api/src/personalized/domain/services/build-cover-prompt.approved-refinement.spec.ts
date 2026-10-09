import { buildBackCoverPrompt, buildCoverPrompt } from './build-cover-prompt';

const sharedBlocks = {
  tapa_diseno_editorial_wrapper: 'Title: {TITULO}; names: {NOMBRE_DEDICANTE} / {NOMBRE_DESTINATARIO}',
  tapa_composicion_reglas: 'cover composition',
  tapa_imagen_base: 'cover base',
  tapa_proporcion_conexion: 'cover proportion',
  tapa_detalles_tecnicos: 'cover details',
  contratapa_diseno_editorial_wrapper: '{TAGLINE} {HASHTAG} {LINEA_CIERRE}',
  contratapa_imagen_base: 'back cover base',
  contratapa_composicion_reglas: 'back cover composition',
  contratapa_detalles_tecnicos: 'back cover details',
};
const names = { nombreDedicante: 'Alex', nombreDestinatario: 'Sam' };

describe('cover prompt optional refinement', () => {
  it('includes a trimmed optional cover refinement as a priority instruction', () => {
    const prompt = buildCoverPrompt({
      sharedBlocks, coverSceneVisual: 'garden scene', title: 'BOOK', names, refinementPrompt: '  brighten the sky  ',
    });
    expect(prompt).toContain('[AJUSTE PRIORITARIO DEL EDITOR]');
    expect(prompt).toContain('La imagen completa debe regenerarse. brighten the sky');
    expect(prompt).not.toContain('  brighten the sky  ');
  });

  it('omits the refinement section when no refinement is provided', () => {
    const prompt = buildCoverPrompt({ sharedBlocks, coverSceneVisual: 'garden scene', title: 'BOOK', names });
    expect(prompt).not.toContain('[AJUSTE PRIORITARIO DEL EDITOR]');
  });

  it('supports optional back-cover refinement without changing required editorial content', () => {
    const prompt = buildBackCoverPrompt({
      sharedBlocks, scene: 'night sky', tagline: 'a story', hashtag: '#family', names, refinementPrompt: 'add stars',
    });
    expect(prompt).toContain('[AJUSTE PRIORITARIO DEL EDITOR]');
    expect(prompt).toContain('add stars');
    expect(prompt).toContain('A STORY #family');
    expect(prompt).toContain('Impreso con cariño en Perú, para quien más quieres.');
  });
});
