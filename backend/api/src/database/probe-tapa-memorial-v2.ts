/**
 * Re-prueba de 4 tapas memorial: sube la "magia" (rayos de luz dorada, como
 * ya salió bien en Mi Ángel Guardián Padre) a los otros 3, y corrige el bug
 * de Mi Ángel Guardián Madre (la IA duplicaba a la madre: sólida al frente +
 * translúcida atrás, en vez de aparecer una sola vez).
 *
 *   npx ts-node --project tsconfig.json src/database/probe-tapa-memorial-v2.ts --dry-run
 *   npx ts-node --project tsconfig.json src/database/probe-tapa-memorial-v2.ts
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
    id: 'siempre-en-mi-corazon-abuelo-v2',
    libro: 'Siempre en mi Corazón Abuelo Adulto',
    titulo: 'Siempre en mi corazón',
    coverSceneVisual: `ÚNICAMENTE dos personas en la escena: {NOMBRE_DEDICANTE}, sentado y sólido, en una terraza soleada rodeada de flores blancas; y la presencia etérea y translúcida de {NOMBRE_DESTINATARIO} apareciendo UNA SOLA VEZ, acompañándolo con calidez. Nunca una versión sólida adicional ni una tercera figura de {NOMBRE_DESTINATARIO}.

Fondo y Detalles
Terraza con flores blancas y plantas frondosas, luz cálida de atardecer filtrándose entre las hojas.

Efectos Mágicos
Rayos de luz dorada cálida irradian suavemente desde la presencia etérea del abuelo, como un resplandor de luz guía que envuelve a ambos con un aire mágico y luminoso.

[ILUMINACIÓN Y COLOR]
Luz cálida de atardecer, tonos dorados y verdes suaves. Atmósfera serena, nostálgica y luminosa.`,
    nombreDestinatario: 'Jorge',
    nombreDedicante: 'Mateo',
    fotos: ['abuelo-75.png', 'hijo-adulto-32.png'],
  },
  {
    id: 'siempre-en-mi-corazon-abuela-v2',
    libro: 'Siempre en mi Corazón Abuela Adulto',
    titulo: 'Siempre en mi corazón',
    coverSceneVisual: `ÚNICAMENTE dos personas en la escena: {NOMBRE_DEDICANTE}, sentada y sólida, en un patio luminoso con flores lilas y velas encendidas; y la presencia etérea y translúcida de {NOMBRE_DESTINATARIO} apareciendo UNA SOLA VEZ, acompañándola con calidez. Nunca una versión sólida adicional ni una tercera figura de {NOMBRE_DESTINATARIO}.

Fondo y Detalles
Patio con flores lilas, velas encendidas y plantas frondosas, luz cálida de atardecer.

Efectos Mágicos
Rayos de luz suave en tonos lavanda y dorado irradian desde la presencia etérea de la abuela, como un resplandor de luz guía que envuelve a ambas con un aire mágico y luminoso.

[ILUMINACIÓN Y COLOR]
Luz cálida de atardecer, tonos lavanda y dorado suave. Atmósfera serena, nostálgica y luminosa.`,
    nombreDestinatario: 'Carmen',
    nombreDedicante: 'Sofía',
    fotos: ['abuela-75.png', 'hija-adulta-30.png'],
  },
  {
    id: 'mi-angel-guardian-madre-v2',
    libro: 'Mi Ángel Guardián Madre Adulto',
    titulo: 'Mi ángel guardián',
    coverSceneVisual: `ÚNICAMENTE dos personas en la escena: {NOMBRE_DEDICANTE}, sentada y sólida, en un patio soleado con un arco de piedra; y la presencia etérea y translúcida de {NOMBRE_DESTINATARIO} apareciendo UNA SOLA VEZ, entre la luz cálida de la ventana. Nunca una versión sólida adicional ni una tercera figura de {NOMBRE_DESTINATARIO} — en total son solo dos personas en la imagen.

Fondo y Detalles
Patio con arco de piedra, flores y una ventana luminosa al fondo, luz cálida de atardecer.

Efectos Mágicos
Rayos de luz dorada cálida irradian suavemente desde la presencia etérea de la madre, como un resplandor de luz guía que envuelve a ambas con un aire mágico y luminoso.

[ILUMINACIÓN Y COLOR]
Luz cálida de atardecer, tonos dorados y rosados suaves. Atmósfera serena, cálida y luminosa.`,
    nombreDestinatario: 'Elena',
    nombreDedicante: 'Valeria',
    fotos: ['mama-58.png', 'hija-adulta-30.png'],
  },
  {
    id: 'siempre-seras-parte-de-mi-v2',
    libro: 'Siempre Serás Parte de Mí Adulto',
    titulo: 'Siempre serás parte de mí',
    coverSceneVisual: `{NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} sentados juntos en un patio nocturno con luces cálidas colgantes, riendo con complicidad genuina, rodeados de plantas y una vela encendida.

Fondo y Detalles
Patio nocturno con luces cálidas colgantes, plantas y una fachada cálida al fondo.

Efectos Mágicos
Partículas de luz dorada flotan suavemente alrededor de ambos, como pequeñas luciérnagas de complicidad, dándole un aire mágico y cálido a toda la escena.

[ILUMINACIÓN Y COLOR]
Luz cálida nocturna, tonos dorados y azules profundos. Atmósfera íntima, cómplice y nostálgica.`,
    nombreDestinatario: 'Andrea',
    nombreDedicante: 'Lucas',
    fotos: ['hermana-adulta-30.png', 'hermano-adulto-32.png'],
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
    const prompt = buildCoverPrompt({
      sharedBlocks,
      coverSceneVisual: caso.coverSceneVisual
        .replaceAll('{NOMBRE_DESTINATARIO}', caso.nombreDestinatario)
        .replaceAll('{NOMBRE_DEDICANTE}', caso.nombreDedicante),
      title: caso.titulo,
      names: { nombreDestinatario: caso.nombreDestinatario, nombreDedicante: caso.nombreDedicante },
    });
    writeFileSync(join(SALIDA, `${caso.id}.prompt.txt`), prompt, 'utf8');

    console.log(`\n=== ${caso.id} — ${caso.libro}`);
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
