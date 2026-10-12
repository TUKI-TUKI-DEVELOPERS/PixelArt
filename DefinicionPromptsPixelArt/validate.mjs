// Validacion de la receta ganadora (E) = quality:high + prompt endurecido +
// regla de proporcion cabeza-cuerpo. La corremos VARIAS veces por persona para
// ver si sube el piso siempre (no de suerte) y en caras distintas (mujer y
// hombre). gpt-image-2 NO acepta input_fidelity (400), asi que solo quality+prompt.
//
// Uso:  node DefinicionPromptsPixelArt/validate.mjs        (mujer x2 + hombre x3)
//       node DefinicionPromptsPixelArt/validate.mjs --dry  (arma prompts, $0)

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import OpenAI, { toFile } from 'openai';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..');
const ENV = join(REPO, 'PromptsPixelArtPlantillas', '.env');
const OUT = join(HERE, 'output');
const SIZE = '1536x1024';
const PRICE = { text_in: 5, image_in: 8, image_out: 30 };

// --- Bloques compartidos (verbatim de prompt-shared-blocks.sql) --------------
const IMAGEN_BASE = `Fotografía hiperrealista en formato horizontal apaisado, plana y a sangre completa, que ocupa el 100% del lienzo de borde a borde. Esta imagen ES la obra final que se imprimirá en las páginas de un libro: NO es la foto de un libro ni de ningún objeto. Prohibido mostrar libros, páginas, lomo, pliegues, curvatura de papel, sombras de encuadernación, mesas, marcos, bordes o cualquier fondo exterior a la escena.`;

const COMPOSICION = `- La imagen se imprimirá dividida en dos mitades (izquierda y derecha) mediante corte digital posterior, NO dibujado en la imagen. La escena, la luz y el ambiente fluyen de forma continua entre ambas mitades como una sola fotografía.
- Franja central prohibida: en el 10% central del ancho del lienzo NO debe haber rostros, ojos, manos ni texto. Solo escena y ambiente (paisaje, cielo, luz, telas, vegetación) pueden cruzar esa franja.
- Margen de seguridad: los rostros deben estar a más de un 8% de cada borde del lienzo. Los bloques de título y poema deben estar contenidos holgadamente dentro de cada mitad, a más de un 12% de los bordes laterales del lienzo y a más de un 8% de los bordes superior e inferior.
- Composición asimétrica: sujetos ligeramente descentrados. Prohibidas las composiciones simétricas o especulares.`;

const DETALLES = `Hiperrealismo extremo, profundidad de campo cinematográfica. Sin logotipos, marcas de agua, emojis ni elementos de plataformas de IA. Sin cajas de texto, sin fondos blancos detrás del texto, sin marcos. La fotografía debe cubrir el 100% del lienzo, de borde a borde, como una única imagen plana y continua — sin lomo, sin pliegue, sin curvatura de papel.`;

// --- Bloque de IDENTIDAD endurecido + proporcion (la receta E) ---------------
const IDENTITY_E = `Usá cada imagen de referencia adjunta ÚNICAMENTE como guía de identidad (estructura ósea, rasgos faciales, proporciones, edad y tono de piel) de la persona real. NO copies, recortes ni pegues la foto de referencia: RE-DIBUJÁ por completo el rostro y la cabeza desde cero como parte nativa de esta escena. Descartá el fondo, el encuadre, el ángulo de cabeza, la iluminación original y los accesorios incidentales de la foto (aros, collares, cadenas, mechones sueltos, ropa) — nada de eso debe aparecer salvo que la escena lo pida explícitamente. El ángulo de la cabeza, la inclinación y la dirección de la mirada deben coincidir con la pose del cuerpo en la escena. El rostro debe re-iluminarse íntegramente con la luz de la escena y compartir el mismo grano, nitidez, profundidad de campo y temperatura de color que el cuerpo — NO debe notarse un rostro fotográfico "pegado" sobre un cuerpo renderizado; la persona y la escena son una única fotografía tomada en ese mismo instante. Mantené fiel el parecido real de la persona. La edad aparente es la edad real de su foto de referencia. El vestuario y los accesorios son EXCLUSIVAMENTE los descritos en esta escena, excepto los lentes de armazón (no de sol), que se conservan si la persona los usa habitualmente.

Las proporciones anatómicas de la cabeza respecto al cuerpo deben ser realistas y naturales para la edad real de la persona: la cabeza NO debe verse grande ni pequeña respecto a los hombros, el torso y las extremidades. Construí un cuerpo completo (torso, brazos, piernas) a escala anatómicamente correcta para esa cabeza, como una persona real fotografiada de cuerpo entero en esa pose, evitando el efecto de "cabeza pegada sobre un cuerpo más chico".`;

function assemblePrompt({ escena, efectos, iluminacion, titulo, poema }) {
  return [
    `[IMAGEN BASE]\n${IMAGEN_BASE}`,
    `[ESCENA VISUAL]\n${escena}\n\n${IDENTITY_E}`,
    `Fondo y Detalles\nLa ciudad se extiende debajo, con rascacielos iluminados por la luz cálida del atardecer, el cielo en tonos naranja, púrpura y dorado. Nubes dispersas reflejan los colores del ocaso.`,
    `Efectos Mágicos\n${efectos}`,
    `[ILUMINACIÓN Y COLOR]\n${iluminacion}`,
    `[COMPOSICIÓN — REGLAS OBLIGATORIAS]\n${COMPOSICION}`,
    `[DISEÑO EDITORIAL]\nMitad izquierda: título en tipografía Montserrat de alta gama, integrado con ligero relieve sobre la fotografía, dentro del margen de seguridad y sin cruzar la franja central.\nTítulo: ${titulo}\n\nMitad derecha: poema en tipografía Montserrat moderna, limpia y legible, sobre una zona tranquila de la fotografía, sin tocar rostros ni la franja central. Debajo, un separador fino con un corazón pequeño centrado.\n\nPoema (verbatim):\n"${poema}"`,
    `[DETALLES TÉCNICOS]\n${DETALLES}`,
  ].join('\n\n');
}

const ESCENA_MUJER = `Una única fotografía continua que fluye de lado a lado del lienzo. Lucca representada como una superheroína épica y elegante, en pleno vuelo sobre una ciudad al atardecer. Lucca viste un traje de superheroína elegante y moderno en tonos azul profundo y dorado, con detalles metálicos sutiles y silueta femenina estilizada. Su capa ondea dramáticamente al viento mientras vuela en una pose dinámica y poderosa. De su pecho emana luz dorada, como si su propio corazón fuera la fuente de su poder. El sujeto principal ligeramente descentrado, con el rostro fuera de la franja central.`;

const ESCENA_HOMBRE = `Una única fotografía continua que fluye de lado a lado del lienzo. Mateo representado como un superhéroe épico y elegante, en pleno vuelo sobre una ciudad al atardecer. Mateo viste un traje de superhéroe elegante y moderno en tonos azul profundo y dorado, con detalles metálicos sutiles y silueta masculina atlética. Su capa ondea dramáticamente al viento mientras vuela en una pose dinámica y poderosa. De su pecho emana luz dorada, como si su propio corazón fuera la fuente de su poder. El sujeto principal ligeramente descentrado, con el rostro fuera de la franja central.`;

const SUBJECTS = [
  {
    id: 'mujer', rolls: 2,
    foto: join(REPO, 'PromptsPixelArtPlantillas', 'imagensubida.jpeg'),
    prompt: assemblePrompt({
      escena: ESCENA_MUJER,
      efectos: `Los rayos de luz dorada del pecho del personaje se extienden hacia el cielo antes de disiparse en partículas brillantes. El borde de su capa deja una estela luminosa sutil. Magia épica integrada en una fotografía cinematográfica.`,
      iluminacion: `Iluminación de atardecer dramática y cinematográfica. Predominan azul profundo, dorado brillante, naranja atardecer y púrpura crepuscular.`,
      titulo: 'MI SUPERHÉROE PERSONAL',
      poema: `Lucca, eres mi superheroína real,\nCon poderes que no son de manual.\nNo necesitas capa ni disfraz,\nTu amor es tu superpoder más.\nMe salvas cada día sin saber,\nCon tu fuerza me haces renacer.\nEres mi protectora y mi verdad,\nMi Bebe, mi heroína de verdad.`,
    }),
  },
  {
    id: 'hombre', rolls: 3,
    foto: join(REPO, 'imagenhombre.jpeg'),
    prompt: assemblePrompt({
      escena: ESCENA_HOMBRE,
      efectos: `Los rayos de luz dorada del pecho del personaje se extienden hacia el cielo antes de disiparse en partículas brillantes. El borde de su capa deja una estela luminosa sutil. Magia épica integrada en una fotografía cinematográfica.`,
      iluminacion: `Iluminación de atardecer dramática y cinematográfica. Predominan azul profundo, dorado brillante, naranja atardecer y púrpura crepuscular.`,
      titulo: 'MI SUPERHÉROE PERSONAL',
      poema: `Mateo, eres mi superhéroe real,\nCon poderes que no son de manual.\nNo necesitas capa ni disfraz,\nTu amor es tu superpoder más.\nMe salvas cada día sin saber,\nCon tu fuerza me haces renacer.\nEres mi protector y mi verdad,\nMi amor, mi héroe de verdad.`,
    }),
  },
];

function costUsd(usage) {
  if (!usage) return null;
  const d = usage.input_tokens_details ?? {};
  return ((d.text_tokens ?? 0) * PRICE.text_in + (d.image_tokens ?? 0) * PRICE.image_in + (usage.output_tokens ?? 0) * PRICE.image_out) / 1e6;
}

function loadApiKey() {
  for (const line of readFileSync(ENV, 'utf8').split('\n')) {
    if (line.startsWith('OPENAI_API_KEY=') && !line.includes('PEGA-TU-KEY')) return line.split('=').slice(1).join('=').trim();
  }
  throw new Error('No encontre OPENAI_API_KEY con valor en el .env');
}

async function main() {
  const dry = process.argv.includes('--dry');
  mkdirSync(OUT, { recursive: true });
  for (const s of SUBJECTS) if (!existsSync(s.foto)) throw new Error(`No existe la foto: ${s.foto}`);

  const total = SUBJECTS.reduce((n, s) => n + s.rolls, 0);
  console.log(`Plan: ${SUBJECTS.map((s) => `${s.id} x${s.rolls}`).join(' + ')}  = ${total} generaciones (quality:high, receta E)\n`);

  if (dry) {
    for (const s of SUBJECTS) writeFileSync(join(OUT, `prompt_${s.id}.txt`), s.prompt);
    console.log('[DRY] Prompts escritos a output/prompt_mujer.txt y output/prompt_hombre.txt. Costo $0.');
    return;
  }

  const client = new OpenAI({ apiKey: loadApiKey() });
  console.log('API key: OK\n');
  let spent = 0;
  for (const s of SUBJECTS) {
    const raw = readFileSync(s.foto);
    for (let i = 1; i <= s.rolls; i++) {
      const file = await toFile(raw, 'reference.png', { type: 'image/png' });
      process.stdout.write(`Generando ${s.id} #${i}/${s.rolls} ...`);
      try {
        const resp = await client.images.edit({ model: 'gpt-image-2', image: [file], prompt: s.prompt, size: SIZE, quality: 'high', n: 1 });
        const out = join(OUT, `val_${s.id}_${i}.png`);
        writeFileSync(out, Buffer.from(resp.data[0].b64_json, 'base64'));
        const c = costUsd(resp.usage); spent += c ?? 0;
        console.log(`  OK -> val_${s.id}_${i}.png   ~$${c?.toFixed(4) ?? '?'}`);
      } catch (err) {
        console.log(`  FALLO: ${err?.message ?? err}`);
      }
    }
  }
  console.log(`\nCosto total real: ~$${spent.toFixed(4)} USD`);
}

main().catch((e) => { console.error('\nERROR:', e.message); process.exit(1); });
