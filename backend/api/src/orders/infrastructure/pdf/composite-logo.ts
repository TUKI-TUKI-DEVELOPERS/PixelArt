import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join } from 'path';

// Snippet validado en PromptsPixelArtPlantillas/TAPA_CONTRATAPA_PROMOCION.md §4
// — el logo NUNCA se le pide a la IA (los modelos no reproducen tipografía de
// marca multicolor de forma confiable), siempre se reserva una zona limpia en
// el prompt y se pega DESPUÉS por código. Posiciones/tamaños ya validados con
// el cliente contra las dimensiones reales del libro (29cm de ancho).
const COVER_LOGO_WIDTH_RATIO = 0.18;
const COVER_MARGIN_RATIO = 0.03;
const BACK_COVER_LOGO_WIDTH_RATIO = 0.2;
const BACK_COVER_TOP_RATIO = 0.12;

let logoSvgBuffer: Buffer | null = null;
function getLogoSvgBuffer(): Buffer {
  if (!logoSvgBuffer) {
    logoSvgBuffer = readFileSync(join(__dirname, 'branding', 'pixelart-logo.svg'));
  }
  return logoSvgBuffer;
}

/** El logo es multicolor fijo (P roja, I naranja, X amarilla, E verde...) —
 * pegado directo sobre la foto, cualquier letra cuyo color se parezca al
 * fondo pierde contraste (la X amarilla y la I naranja son las de mayor
 * riesgo, y varios libros usan fondos cálidos dorado/naranja). En vez de
 * intentar detectar el color del fondo, se le agrega un halo oscuro
 * difuminado detrás — funciona igual sin importar el tono del fondo, sin
 * tocar los colores de marca. Mismo truco que un text-shadow. */
async function buildLogoHalo(logoBuffer: Buffer): Promise<Buffer> {
  const meta = await sharp(logoBuffer).metadata();
  const width = meta.width ?? 1;
  const height = meta.height ?? 1;
  const blackFill = await sharp({
    create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 1 } },
  })
    .png()
    .toBuffer();
  // dest-in: conserva el negro solo donde el logo tiene alpha — silueta exacta.
  const silhouette = await sharp(blackFill)
    .composite([{ input: logoBuffer, blend: 'dest-in' }])
    .png()
    .toBuffer();
  return sharp(silhouette)
    .blur(6)
    .linear([1, 1, 1, 0.6], [0, 0, 0, 0]) // atenúa el halo al 60% de opacidad, sin tocar RGB
    .png()
    .toBuffer();
}

/**
 * Compone el logo de PixelArt sobre una imagen ya generada.
 * - 'cover': esquina inferior derecha, ~18% del ancho, margen 3%.
 * - 'back-cover': arriba-centro, ~20% del ancho, a ~12% del alto desde arriba.
 */
export async function compositeLogo(imageBuffer: Buffer, position: 'cover' | 'back-cover'): Promise<Buffer> {
  const image = sharp(imageBuffer);
  const meta = await image.metadata();
  const width = meta.width ?? 1456;
  const height = meta.height ?? 1024;

  const logoWidthRatio = position === 'cover' ? COVER_LOGO_WIDTH_RATIO : BACK_COVER_LOGO_WIDTH_RATIO;
  const logoWidth = Math.round(width * logoWidthRatio);

  const logoBuffer = await sharp(getLogoSvgBuffer(), { density: 600 })
    .resize({ width: logoWidth })
    .png()
    .toBuffer();
  const logoMeta = await sharp(logoBuffer).metadata();
  const logoHeight = logoMeta.height ?? logoWidth;

  const left =
    position === 'cover'
      ? width - logoWidth - Math.round(width * COVER_MARGIN_RATIO)
      : Math.round((width - logoWidth) / 2);
  const top =
    position === 'cover'
      ? height - logoHeight - Math.round(width * COVER_MARGIN_RATIO)
      : Math.round(height * BACK_COVER_TOP_RATIO);

  const halo = await buildLogoHalo(logoBuffer);
  return image
    .composite([
      { input: halo, left, top },
      { input: logoBuffer, left, top },
    ])
    .png()
    .toBuffer();
}
