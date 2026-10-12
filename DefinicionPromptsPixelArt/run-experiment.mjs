// Experimento aislado: matar el artefacto de "cara pegada" en libros de foto real.
// NO toca el codigo de produccion. Reproduce el piloto "Mi Superheroe Personal"
// y aisla, una por una, las palancas que proponemos:
//
//   A  baseline        quality=medium, sin input_fidelity, foto CRUDA, prompt ORIGINAL
//   B  perillas        quality=high,   input_fidelity=high, foto CRUDA, prompt ORIGINAL
//   C  B + prompt       quality=high,   input_fidelity=high, foto CRUDA, prompt ENDURECIDO
//   D  C + preprocesado quality=high,   input_fidelity=high, foto PREPROCESADA (sharp), prompt ENDURECIDO
//
//   A -> B  = cuanto aporta solo cambiar los 2 parametros de la API
//   B -> C  = cuanto aporta endurecer el prompt (prohibir pegar / re-iluminar)
//   C -> D  = cuanto aporta limpiar la entrada por codigo (crop cabeza+hombros + normalizado suave)
//
// Uso:
//   node DefinicionPromptsPixelArt/run-experiment.mjs --dry      (valida + preprocesa, $0)
//   node DefinicionPromptsPixelArt/run-experiment.mjs            (corre las 4 reales)
//   node DefinicionPromptsPixelArt/run-experiment.mjs --only D   (corre solo una variante)

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import OpenAI, { toFile } from 'openai';
import sharp from 'sharp';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..');
const FOTO = join(REPO, 'PromptsPixelArtPlantillas', 'imagensubida.jpeg');
const ENV = join(REPO, 'PromptsPixelArtPlantillas', '.env');
const OUT = join(HERE, 'output');

const SIZE = '1536x1024'; // mismo tamano que el piloto (mas barato); el pegado es igual a cualquier tamano
const PRICE = { text_in: 5, image_in: 8, image_out: 30 }; // USD / millon de tokens (gpt-image-2)

// ---------------------------------------------------------------------------
// PROMPT: verbatim del piloto real, con la unica diferencia siendo el bloque de
// IDENTIDAD (el que controla como trata la cara). {IDENTITY} se reemplaza por la
// version ORIGINAL (la de produccion hoy) o la ENDURECIDA (anti-pegado).
// ---------------------------------------------------------------------------
const IDENTITY_ORIGINAL = `Usá cada imagen de referencia adjunta para que el personaje correspondiente sea la persona real de esa foto — mantené su parecido real (rasgos, edad, tono de piel) e integralo de forma natural y fotorrealista con la iluminación, el enfoque y el estilo del resto de la escena, como si hubiera sido fotografiado ahí mismo. La edad aparente de cada personaje es la edad real de su foto de referencia, sea niño, adolescente o adulto, sin importar lo que sugiera el contexto de la escena. El vestuario y los accesorios de cada personaje son EXCLUSIVAMENTE los descritos en esta escena (no lo que tenga puesto en su foto de referencia), excepto los lentes de armazón (no de sol), que sí se conservan si la persona los usa habitualmente.`;

const IDENTITY_HARDENED = `Usá cada imagen de referencia adjunta ÚNICAMENTE como guía de identidad (estructura ósea, rasgos faciales, proporciones, edad y tono de piel) de la persona real. NO copies, recortes ni pegues la foto de referencia: RE-DIBUJÁ por completo el rostro y la cabeza desde cero como parte nativa de esta escena. Descartá el fondo, el encuadre, el ángulo de cabeza, la iluminación original y los accesorios incidentales de la foto (aros, collares, mechones sueltos, maquillaje marcado): nada de eso debe aparecer salvo que la escena lo pida explícitamente. El ángulo de la cabeza, la inclinación y la dirección de la mirada deben coincidir con la pose del cuerpo en la escena, aunque difieran de la foto de referencia. El rostro debe re-iluminarse íntegramente con la luz de la escena y compartir exactamente el mismo grano, nitidez, profundidad de campo y temperatura de color que el cuerpo y el entorno — NO debe notarse un rostro fotográfico "pegado" sobre un cuerpo renderizado; la persona y la escena son una única fotografía tomada en ese mismo instante. Mantené fiel el parecido real de la persona. La edad aparente de cada personaje es la edad real de su foto de referencia, sea niño, adolescente o adulto, sin importar lo que sugiera el contexto de la escena. El vestuario y los accesorios de cada personaje son EXCLUSIVAMENTE los descritos en esta escena (no lo que tenga puesto en su foto de referencia), excepto los lentes de armazón (no de sol), que sí se conservan si la persona los usa habitualmente.`;

const PROMPT_TEMPLATE = `[IMAGEN BASE]
Fotografía hiperrealista en formato horizontal apaisado, plana y a sangre completa, que ocupa el 100% del lienzo de borde a borde. Esta imagen ES la obra final que se imprimirá en las páginas de un libro: NO es la foto de un libro ni de ningún objeto. Prohibido mostrar libros, páginas, lomo, pliegues, curvatura de papel, sombras de encuadernación, mesas, marcos, bordes o cualquier fondo exterior a la escena.

[ESCENA VISUAL]
Una única fotografía continua que fluye de lado a lado del lienzo. Primera plantilla del libro Mi Amor, versión de arquetipos femeninos: Lucca representada como una superheroína épica y elegante, en pleno vuelo sobre una ciudad al atardecer, en composición paralela a la Plantilla 1 de la versión masculina ("Mi Superhéroe Personal").

Lucca viste un traje de superheroína elegante y moderno en tonos azul profundo y dorado, con detalles metálicos sutiles y silueta femenina estilizada. Su capa ondea dramáticamente al viento mientras vuela en una pose dinámica y poderosa sobre el perfil de una ciudad. De su pecho emana luz dorada, como si su propio corazón fuera la fuente de su poder. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.

{IDENTITY}

Fondo y Detalles
La ciudad se extiende debajo, con rascacielos iluminados por la luz cálida del atardecer, el cielo en tonos naranja, púrpura y dorado. Nubes dispersas reflejan los colores del ocaso.

Efectos Mágicos
Los rayos de luz dorada del pecho de Lucca se extienden brevemente hacia el cielo antes de disiparse en partículas brillantes. El borde de su capa deja una estela luminosa sutil al moverse con el viento. La magia se siente épica, poderosa y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico, con acabado moderno de cómic.

[ILUMINACIÓN Y COLOR]
Iluminación de atardecer dramática y cinematográfica, con el resplandor dorado del pecho de Lucca como acento de luz adicional. Predominan tonos azul profundo, dorado brillante, naranja atardecer y púrpura crepuscular.

[COMPOSICIÓN — REGLAS OBLIGATORIAS]
- La imagen se imprimirá dividida en dos mitades (izquierda y derecha) mediante corte digital posterior, NO dibujado en la imagen. La escena, la luz y el ambiente fluyen de forma continua entre ambas mitades como una sola fotografía.
- Franja central prohibida: en el 10% central del ancho del lienzo NO debe haber rostros, ojos, manos ni texto. Solo escena y ambiente (paisaje, cielo, luz, telas, vegetación) pueden cruzar esa franja.
- Margen de seguridad: los rostros deben estar a más de un 8% de cada borde del lienzo. Los bloques de título y poema deben estar contenidos holgadamente dentro de cada mitad, a más de un 12% de los bordes laterales del lienzo y a más de un 8% de los bordes superior e inferior.
- Composición asimétrica: sujetos ligeramente descentrados. Prohibidas las composiciones simétricas o especulares (elementos duplicados en espejo, columnas idénticas a ambos lados, sujeto exactamente en el centro).

[DISEÑO EDITORIAL]
Mitad izquierda del lienzo
Título en tipografía de la familia Montserrat de alta gama, integrado como impresión elegante con ligero relieve sobre la fotografía, dentro del margen de seguridad y sin cruzar la franja central.
Título: MI SUPERHÉROE PERSONAL

Mitad derecha del lienzo
Poema integrado en tipografía Montserrat moderna, limpia y perfectamente legible, ubicado sobre una zona visualmente tranquila de la fotografía, sin tocar rostros ni la franja central. Debajo del poema, un pequeño separador decorativo: una línea fina horizontal con un corazón pequeño centrado en el medio, en el mismo tono del título.

Poema (Texto final impreso verbatim en el libro)
"Lucca, eres mi superheroína real,
Con poderes que no son de manual.
No necesitas capa ni disfraz,
Tu amor es tu superpoder más.
Me salvas cada día sin saber,
Con tu fuerza me haces renacer.
Eres mi protectora y mi verdad,
Mi Bebe, mi heroína de verdad."

[DETALLES TÉCNICOS]
Hiperrealismo extremo, profundidad de campo cinematográfica. Sin logotipos, marcas de agua, emojis ni elementos de plataformas de IA. Sin cajas de texto, sin fondos blancos detrás del texto, sin marcos. La fotografía debe cubrir el 100% del lienzo, de borde a borde, como una única imagen plana y continua — sin lomo, sin pliegue, sin curvatura de papel, sin ningún elemento que sugiera un libro físico.`;

// Igual que el endurecido, pero SUMA una regla explícita de proporción
// cabeza-cuerpo. Ataca el "cabeza un poco grande" que aparece cuando la foto de
// referencia es SOLO una cara (la IA no tiene ancla de escala para el cuerpo que
// tiene que inventar). El bloque de TAPA ya tiene una regla asi
// (tapa_proporcion_conexion); las paginas interiores NO — este es el hueco.
const IDENTITY_HARDENED_PROP = `${IDENTITY_HARDENED}\n\nLas proporciones anatómicas de la cabeza respecto al cuerpo deben ser realistas y naturales para la edad real de la persona: la cabeza NO debe verse grande ni pequeña respecto a los hombros, el torso y las extremidades. Construí un cuerpo completo (torso, brazos, piernas) a escala anatómicamente correcta para esa cabeza, como una persona real fotografiada de cuerpo entero en esa pose, evitando el efecto de "cabeza pegada sobre un cuerpo más chico".`;

const PROMPT_ORIGINAL = PROMPT_TEMPLATE.replace('{IDENTITY}', IDENTITY_ORIGINAL);
const PROMPT_HARDENED = PROMPT_TEMPLATE.replace('{IDENTITY}', IDENTITY_HARDENED);
const PROMPT_HARDENED_PROP = PROMPT_TEMPLATE.replace('{IDENTITY}', IDENTITY_HARDENED_PROP);

// ---------------------------------------------------------------------------
// Preprocesado con sharp — DELIBERADAMENTE SUAVE. La meta es sacarle a la foto
// su "firma" propia (fondo distractor, luz dura de celular, HDR, sobre-nitidez)
// para que el modelo NO tenga tanto de donde copiar y funda mejor la cara —
// SIN borrar la identidad (rasgos, tono de piel). Si te pasas de mano cambias
// la persona; por eso cada paso es minimo.
// ---------------------------------------------------------------------------
async function preprocess(inputPath) {
  return sharp(inputPath)
    .rotate() // respeta orientacion EXIF y limpia metadata de rotacion
    // Recorte a cabeza+hombros (4:5) hacia la region mas saliente (la cara en un
    // selfie). Quita el fondo (lago, bote, cielo) del que el modelo se ancla.
    .resize(900, 1125, { fit: 'cover', position: sharp.strategy.attention })
    .modulate({ saturation: 0.94 })  // apenas baja el "pop" de saturacion
    .linear(0.94, 10)                // muy leve: baja contraste y levanta sombras (mata luz dura/HDR)
    .gamma(1.05)                     // leve, uniforma medios tonos
    .blur(0.4)                       // minimo: afloja el sobre-sharpening del celular
    .removeAlpha()
    .toColourspace('srgb')
    .png()
    .toBuffer();
}

function costUsd(usage) {
  if (!usage) return null;
  const d = usage.input_tokens_details ?? {};
  const t = d.text_tokens ?? 0, i = d.image_tokens ?? 0, o = usage.output_tokens ?? 0;
  return (t * PRICE.text_in + i * PRICE.image_in + o * PRICE.image_out) / 1e6;
}

function loadApiKey() {
  if (!existsSync(ENV)) throw new Error(`No existe ${ENV}`);
  for (const line of readFileSync(ENV, 'utf8').split('\n')) {
    if (line.startsWith('OPENAI_API_KEY=') && !line.includes('PEGA-TU-KEY')) {
      return line.split('=').slice(1).join('=').trim();
    }
  }
  throw new Error('No encontre OPENAI_API_KEY con valor en el .env');
}

// NOTA: gpt-image-2 RECHAZA input_fidelity (400 confirmado 2026-08-15) — los
// typings del SDK lo listan pero el modelo no lo acepta. Por eso fidelity=null
// en todo. Las palancas reales para este modelo son quality y el prompt.
const VARIANTS = [
  { id: 'A', label: 'baseline (prod hoy)',         prompt: PROMPT_ORIGINAL, quality: 'medium', fidelity: null, pre: false },
  { id: 'B', label: 'quality high (prompt orig)',  prompt: PROMPT_ORIGINAL, quality: 'high',   fidelity: null, pre: false },
  { id: 'C', label: 'quality high + prompt duro',  prompt: PROMPT_HARDENED, quality: 'high',   fidelity: null, pre: false },
  { id: 'D', label: 'C + preproc sharp',           prompt: PROMPT_HARDENED, quality: 'high',   fidelity: null, pre: true  },
  { id: 'E', label: 'C + regla proporcion cabeza', prompt: PROMPT_HARDENED_PROP, quality: 'high', fidelity: null, pre: false },
];

async function main() {
  const args = process.argv.slice(2);
  const dry = args.includes('--dry');
  const all = args.includes('--all'); // incluye D (preprocesado sharp — demostrado flojo en el dry run)
  const onlyIdx = args.indexOf('--only');
  const only = onlyIdx >= 0 ? args[onlyIdx + 1]?.toUpperCase() : null;

  if (!existsSync(FOTO)) throw new Error(`No existe la foto: ${FOTO}`);
  mkdirSync(OUT, { recursive: true });

  // Preprocesado (siempre, para que puedas VER que hizo el crop/normalizado)
  const preBuf = await preprocess(FOTO);
  const prePath = join(OUT, 'input_preprocesada.png');
  writeFileSync(prePath, preBuf);
  const rawBuf = readFileSync(FOTO);
  console.log(`\nFoto cruda:         ${FOTO}`);
  console.log(`Foto preprocesada:  ${prePath}  (mirala para juzgar el crop/normalizado)\n`);

  const key = loadApiKey();
  console.log(`API key: cargada OK (…${key.slice(-4)})`);
  console.log(`Tamano: ${SIZE}   Salida: ${OUT}\n`);

  // Default: A/B/C. D (preprocesado sharp) solo con --all o --only D, porque el
  // dry run mostro que el crop/normalizado suave no aporta en esta foto.
  const run = VARIANTS.filter((v) => (only ? v.id === only : all || v.id !== 'D'));
  console.log('Plan:');
  for (const v of run) {
    console.log(`  ${v.id}  ${v.label.padEnd(30)} quality=${v.quality.padEnd(6)} input_fidelity=${String(v.fidelity).padEnd(4)} foto=${v.pre ? 'preprocesada' : 'cruda'}`);
  }

  if (dry) {
    console.log('\n[DRY RUN] No se llamo a OpenAI. Costo: $0. Revisa input_preprocesada.png y, si esta bien, corre sin --dry.');
    return;
  }

  const client = new OpenAI({ apiKey: key });
  let total = 0;
  console.log('');
  for (const v of run) {
    const buf = v.pre ? preBuf : rawBuf;
    const file = await toFile(buf, 'reference.png', { type: 'image/png' });
    const params = { model: 'gpt-image-2', image: [file], prompt: v.prompt, size: SIZE, quality: v.quality, n: 1 };
    if (v.fidelity) params.input_fidelity = v.fidelity;

    process.stdout.write(`Generando ${v.id} (${v.label}) ...`);
    try {
      const resp = await client.images.edit(params);
      const out = join(OUT, `variante_${v.id}.png`);
      writeFileSync(out, Buffer.from(resp.data[0].b64_json, 'base64'));
      const c = costUsd(resp.usage);
      total += c ?? 0;
      console.log(`  OK -> ${out}   ~$${c?.toFixed(4) ?? '?'}`);
    } catch (err) {
      console.log(`  FALLO: ${err?.message ?? err}`);
    }
  }
  console.log(`\nCosto total real de la corrida: ~$${total.toFixed(4)} USD`);
  console.log('Compara: variante_A (pegado) vs B vs C vs D. Shippeamos la primera que ya no pegue.');
}

main().catch((e) => { console.error('\nERROR:', e.message); process.exit(1); });
