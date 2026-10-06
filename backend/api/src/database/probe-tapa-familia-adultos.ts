/**
 * Prueba de tapas de los libros adultos de "Familia" (el único dyad ya
 * aprobado es Papá Mi Héroe Adulto, no se repite acá). Mismo patrón que
 * probe-generacion-real.ts pero para buildCoverPrompt() en vez de
 * buildGenerationPrompt() — los cover_scene_visual de estos 5 libros todavía
 * NO están guardados en personalized_models (quedaron en borrador, pendientes
 * de aprobación), así que van hardcodeados acá, no leídos de la BD.
 *
 * Cuesta dinero: quality 'high', ~$0.18 por imagen — 5 tapas ≈ $0.90 USD.
 *
 *   npx ts-node --project tsconfig.json src/database/probe-tapa-familia-adultos.ts --dry-run
 *   npx ts-node --project tsconfig.json src/database/probe-tapa-familia-adultos.ts
 */

import { config } from 'dotenv';
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Client } from 'pg';
import { buildCoverPrompt } from '../personalized/domain/services/build-cover-prompt';
import { OpenAiImageGenerationAdapter } from '../personalized/infrastructure/ai/openai-image-generation.adapter';

config({ path: join(__dirname, '../../../../.env.docker') });

const FOTOS = join(__dirname, '../../../../PromptsPixelArtPlantillas/output/_FotosRecomendadas_Adultas');
const SALIDA = join(__dirname, '../../../../PromptsPixelArtPlantillas/output/_PRUEBA_TAPA_FAMILIA_ADULTOS');
const COVER_SIZE = '1456x1024';

type Caso = {
  id: string;
  libro: string;
  titulo: string;
  coverSceneVisual: string;
  nombreDestinatario: string;
  nombreDedicante: string;
  fotos: string[];
};

const CASOS: Caso[] = [
  {
    id: 'el-mejor-equipo',
    libro: 'El Mejor Equipo Adulto',
    titulo: 'El mejor equipo',
    coverSceneVisual: `{NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} caminan juntos por un malecón urbano al anochecer, uno con un brazo sobre el hombro del otro, riendo con complicidad genuina, vestidos con abrigos casuales elegantes de tonos oscuros.

Fondo y Detalles
Skyline de ciudad iluminado al fondo, farolas cálidas encendidas a lo largo del malecón, reflejos dorados sobre el agua.

Efectos Mágicos
Un resplandor dorado suave envuelve el contorno de ambos, como símbolo de una complicidad que nunca se apaga.

[ILUMINACIÓN Y COLOR]
Luz cálida de farolas nocturnas, tonos azul profundo y dorado. Atmósfera elegante, cómplice y adulta.`,
    nombreDestinatario: 'Diego',
    nombreDedicante: 'Valentina',
    fotos: ['hermano-adulto-32.png', 'hermana-adulta-30.png'],
  },
  {
    id: 'mi-familia',
    libro: 'Mi Familia Adulto',
    titulo: 'Mi familia',
    coverSceneVisual: `{NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} al centro, abrazados junto a su hijo adulto en un abrazo grupal cálido, todos sonriendo con calidez genuina, en una terraza al atardecer.

Fondo y Detalles
Patio cálido con enredaderas, luces colgantes cálidas encendidas, fachada de casa mediterránea al fondo.

Efectos Mágicos
Luciérnagas doradas suaves flotando alrededor del grupo, símbolo de hogar y unión.

[ILUMINACIÓN Y COLOR]
Luz cálida de atardecer, tonos ámbar y terracota. Atmósfera hogareña, íntima y festiva.`,
    nombreDestinatario: 'Jorge',
    nombreDedicante: 'Elena',
    fotos: ['papa-58.png', 'mama-58.png', 'hijo-adulto-32.png'],
  },
  {
    id: 'mama-mi-heroina',
    libro: 'Mamá, Mi Heroína Adulto',
    titulo: 'Mamá, mi heroína',
    coverSceneVisual: `{NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} muy cerca, mejilla con mejilla, ambas sonriendo con calidez genuina, en un jardín soleado lleno de flores.

Fondo y Detalles
Jardín frondoso con flores de distintos colores, luz dorada de atardecer filtrándose entre las plantas.

Efectos Mágicos
Un resplandor cálido y dorado envuelve suavemente a ambas, como símbolo de un amor incondicional.

[ILUMINACIÓN Y COLOR]
Luz dorada cálida de atardecer, tonos ámbar y verde suave. Atmósfera íntima, nostálgica y luminosa.`,
    nombreDestinatario: 'Elena',
    nombreDedicante: 'Valeria',
    fotos: ['mama-58.png', 'hija-adulta-30.png'],
  },
  {
    id: 'te-amo-abuelo',
    libro: 'Te Amo, Abuelo Adulto',
    titulo: 'Te amo, abuelo',
    coverSceneVisual: `{NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} caminando juntos por un sendero de jardín al atardecer, uno con un brazo sobre el hombro del otro, ambos riendo con calidez genuina.

Fondo y Detalles
Jardín frondoso con flores y un portón de hierro forjado al fondo, farol encendido junto al camino de piedra.

Efectos Mágicos
Mariposas doradas revoloteando suavemente alrededor de ambos, símbolo de los momentos compartidos que perduran.

[ILUMINACIÓN Y COLOR]
Luz cálida de atardecer dorado, tonos ámbar y verde profundo. Atmósfera nostálgica, cálida y luminosa.`,
    nombreDestinatario: 'Ricardo',
    nombreDedicante: 'Mateo',
    fotos: ['abuelo-75.png', 'hijo-adulto-32.png'],
  },
  {
    id: 'te-amo-abuela',
    libro: 'Te Amo, Abuela Adulto',
    titulo: 'Te amo, abuela',
    coverSceneVisual: `{NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} sentadas juntas, mejilla con mejilla, sonriendo con calidez genuina, en una terraza rústica campestre al atardecer.

Fondo y Detalles
Fachada cálida de casa de campo con ventana verde, macetas con flores rosadas, cielo dorado de atardecer al fondo.

Efectos Mágicos
Un resplandor suave y rosado envuelve a ambas, como símbolo de la ternura que las une.

[ILUMINACIÓN Y COLOR]
Luz cálida y rosada de atardecer, tonos coral y dorado suave. Atmósfera íntima, tierna y luminosa.`,
    nombreDestinatario: 'Carmen',
    nombreDedicante: 'Sofía',
    fotos: ['abuela-75.png', 'hija-adulta-30.png'],
  },
];

async function main(): Promise<void> {
  const dryRun = process.argv.includes('--dry-run');
  mkdirSync(SALIDA, { recursive: true });

  const db = new Client({
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: Number(process.env.POSTGRES_PORT ?? 5432),
    user: process.env.POSTGRES_USER ?? 'pixelart',
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB ?? 'pixelart',
  });
  await db.connect();

  const blocks = await db.query('SELECT block_key, content FROM prompt_shared_blocks');
  const sharedBlocks: Record<string, string> = {};
  for (const r of blocks.rows) sharedBlocks[r.block_key] = r.content;

  const adapter = new OpenAiImageGenerationAdapter();

  for (const caso of CASOS) {
    const names = {
      nombreDestinatario: caso.nombreDestinatario,
      nombreDedicante: caso.nombreDedicante,
    };

    const prompt = buildCoverPrompt({
      sharedBlocks,
      coverSceneVisual: caso.coverSceneVisual
        .replaceAll('{NOMBRE_DESTINATARIO}', caso.nombreDestinatario)
        .replaceAll('{NOMBRE_DEDICANTE}', caso.nombreDedicante),
      title: caso.titulo,
      names,
    });

    const sinRellenar = prompt.match(/\{[A-Z_]+\}/g);
    console.log(`\n=== ${caso.id} — ${caso.libro}`);
    console.log(`    fotos: ${caso.fotos.join(', ')}`);
    console.log(`    llaves sin rellenar: ${sinRellenar ? sinRellenar.join(', ') : 'ninguna'}`);
    writeFileSync(join(SALIDA, `${caso.id}.prompt.txt`), prompt, 'utf8');

    if (dryRun) continue;

    const referencias = caso.fotos.map((f) => readFileSync(join(FOTOS, f)));
    const imagen = await adapter.generateWithReferences(prompt, referencias, COVER_SIZE);
    writeFileSync(join(SALIDA, `${caso.id}.png`), imagen);
    console.log(`    -> ${caso.id}.png`);
  }

  await db.end();
  console.log(`\nsalida: ${SALIDA}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
