import sharp from 'sharp';

// Margen de doblez de encuadernado — GARANTÍA DURA por código, no por prompt.
//
// Historia del problema: la imprenta reportó (prueba física impresa, "Mamá,
// Mi Heroína Adulto") título, cabello/hombros y nombres llegando hasta el
// borde del lienzo. Se intentó:
//   1. Reglas de margen en el prompt (5%/10% en prompt_shared_blocks) —
//      instrucción blanda: el modelo compone de borde a borde por naturaleza
//      y la obedece solo a veces. Queda como primera línea, no como garantía.
//   2. Generar la imagen MÁS GRANDE y recortar al centro — REVERTIDO
//      (2026-10-12): el modelo es invariante a la escala, llena cualquier
//      lienzo hasta el borde, y el recorte cortaba el título y la firma.
//      Agrandar + cortar = mismo comportamiento de la IA + corte destructivo.
//
// La operación correcta es la inversa: ENCOGER y RELLENAR. El contenido que
// la IA generó se conserva íntegro (nada se corta jamás), encogido al 90% y
// centrado sobre un fondo que extiende los propios bordes de la imagen con
// blur fuerte (técnica "pillarbox fill"). El 5% resultante en los 4 lados es
// siempre fondo difuminado — exactamente lo que pide la regla del prompt
// ("solo fondo o bokeh puede llegar hasta el borde"), pero como hecho
// matemático y no como súplica al modelo.
//
// 5% de 1456px ≈ 72.8px > 1cm físico (~50.2px a 29cm de ancho) — mismo
// margen que pidió la imprenta y que usa COVER_MARGIN_RATIO del logo.
//
// Costo conocido y aceptado: ~12% menos de detalle efectivo en el contenido
// (1456 -> 1310px útiles). Si el costurón entre imagen y fondo se notara en
// algún fondo con textura marcada, subir BACKDROP_BLUR lo suaviza.
const SAFE_MARGIN_RATIO = 0.05;
const BACKDROP_BLUR = 40;

/**
 * Aplica el margen de seguridad de encuadernado a una imagen ya generada.
 * Debe llamarse DESPUÉS de la generación IA y ANTES de compositeLogo (el logo
 * se posiciona sobre el lienzo final, ya con margen). El clean-source que se
 * guarda para ediciones futuras debe seguir siendo la imagen cruda, sin
 * margen — las regeneraciones editan sobre el original y el margen se
 * re-aplica al resultado.
 */
export async function applySafeMargin(imageBuffer: Buffer): Promise<Buffer> {
  const meta = await sharp(imageBuffer).metadata();
  const width = meta.width ?? 1456;
  const height = meta.height ?? 1024;
  const innerWidth = Math.round(width * (1 - SAFE_MARGIN_RATIO * 2));
  const innerHeight = Math.round(height * (1 - SAFE_MARGIN_RATIO * 2));

  // Fondo: la misma imagen estirada al lienzo completo + blur fuerte. Los
  // colores de borde coinciden con los del contenido, así que la transición
  // en la franja es prácticamente invisible en fondos bokeh/degradado.
  const backdrop = await sharp(imageBuffer)
    .resize(width, height, { fit: 'fill' })
    .blur(BACKDROP_BLUR)
    .png()
    .toBuffer();

  // Contenido: la imagen original encogida al 90%, centrada — íntegra.
  const inner = await sharp(imageBuffer)
    .resize(innerWidth, innerHeight)
    .png()
    .toBuffer();

  return sharp(backdrop)
    .composite([{ input: inner, gravity: 'center' }])
    .png()
    .toBuffer();
}
