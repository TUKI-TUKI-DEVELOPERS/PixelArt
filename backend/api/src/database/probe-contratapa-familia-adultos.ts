/**
 * Prueba de contratapas de los mismos 5 libros adultos de "Familia" probados
 * en probe-tapa-familia-adultos.ts. Sin fotos de referencia (contratapa nunca
 * lleva personas reales) — usa ImageGenerationPort.generate(), no
 * generateWithReferences().
 *
 *   npx ts-node --project tsconfig.json src/database/probe-contratapa-familia-adultos.ts --dry-run
 *   npx ts-node --project tsconfig.json src/database/probe-contratapa-familia-adultos.ts
 */

import { config } from 'dotenv';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Client } from 'pg';
import { buildBackCoverPrompt } from '../personalized/domain/services/build-cover-prompt';
import { OpenAiImageGenerationAdapter } from '../personalized/infrastructure/ai/openai-image-generation.adapter';

config({ path: join(__dirname, '../../../../.env.docker') });

const SALIDA = join(__dirname, '../../../../PromptsPixelArtPlantillas/output/_PRUEBA_TAPA_FAMILIA_ADULTOS');
const COVER_SIZE = '1456x1024';
const HASHTAG = '#FamiliaPixelArt';

type Caso = {
  id: string;
  libro: string;
  scene: string;
  tagline: string;
  nombreDestinatario: string;
  nombreDedicante: string;
};

const CASOS: Caso[] = [
  {
    id: 'el-mejor-equipo',
    libro: 'El Mejor Equipo Adulto',
    scene: `Malecón urbano al anochecer sin personajes, skyline de ciudad iluminado, farolas cálidas a lo largo del paseo, reflejos dorados sobre el agua. Un resplandor dorado suave cruza el encuadre, cubriendo generosamente el fondo de borde a borde.`,
    tagline: 'Para el equipo que elegimos sin saberlo.',
    nombreDestinatario: 'Diego',
    nombreDedicante: 'Valentina',
  },
  {
    id: 'mi-familia',
    libro: 'Mi Familia Adulto',
    scene: `Patio cálido al atardecer sin personajes, enredaderas, luces colgantes encendidas, fachada de casa mediterránea al fondo. Luciérnagas doradas suaves flotando por todo el encuadre, cubriendo el fondo de borde a borde.`,
    tagline: 'Donde siempre hay un lugar para volver.',
    nombreDestinatario: 'Jorge',
    nombreDedicante: 'Elena',
  },
  {
    id: 'mama-mi-heroina',
    libro: 'Mamá, Mi Heroína Adulto',
    scene: `Jardín soleado sin personajes, flores de distintos colores, luz dorada de atardecer filtrándose entre las plantas. Un resplandor cálido y dorado cubre generosamente todo el fondo de borde a borde.`,
    tagline: 'Para la mujer que nunca usó capa, pero fue mi héroe.',
    nombreDestinatario: 'Elena',
    nombreDedicante: 'Valeria',
  },
  {
    id: 'te-amo-abuelo',
    libro: 'Te Amo, Abuelo Adulto',
    scene: `Jardín sin personajes, flores y un portón de hierro forjado al fondo, farol encendido junto a un camino de piedra empedrado. Mariposas doradas revoloteando por todo el encuadre, cubriendo el fondo de borde a borde.`,
    tagline: 'Para el abuelo que convirtió cada tarde en magia.',
    nombreDestinatario: 'Ricardo',
    nombreDedicante: 'Mateo',
  },
  {
    id: 'te-amo-abuela',
    libro: 'Te Amo, Abuela Adulto',
    scene: `Terraza rústica campestre sin personajes, fachada cálida de casa de campo con ventana verde, macetas con flores rosadas, cielo dorado de atardecer. Un resplandor suave y rosado cubre todo el fondo de borde a borde.`,
    tagline: 'Para la abuela que hizo de su casa, mi refugio.',
    nombreDestinatario: 'Carmen',
    nombreDedicante: 'Sofía',
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
    const prompt = buildBackCoverPrompt({
      sharedBlocks,
      scene: caso.scene,
      tagline: caso.tagline,
      hashtag: HASHTAG,
      names: { nombreDestinatario: caso.nombreDestinatario, nombreDedicante: caso.nombreDedicante },
    });

    const sinRellenar = prompt.match(/\{[A-Z_]+\}/g);
    console.log(`\n=== ${caso.id} — ${caso.libro}`);
    console.log(`    llaves sin rellenar: ${sinRellenar ? sinRellenar.join(', ') : 'ninguna'}`);
    writeFileSync(join(SALIDA, `${caso.id}-contratapa.prompt.txt`), prompt, 'utf8');

    if (dryRun) continue;

    const imagen = await adapter.generate(prompt, COVER_SIZE);
    writeFileSync(join(SALIDA, `${caso.id}-contratapa.png`), imagen);
    console.log(`    -> ${caso.id}-contratapa.png`);
  }

  await db.end();
  console.log(`\nsalida: ${SALIDA}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
