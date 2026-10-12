/**
 * 1) Re-prueba "Siempre Serás Parte de Mí" con el mismo contorno brillante
 *    que ya funcionó en los otros 3 de memorial (sin volverlos "fantasma",
 *    solo el mismo tratamiento de luz mágica alrededor de ambos).
 * 2) Primera prueba de "Aventura Entre Patas Adulto" — SIN foto real de
 *    mascota (no hay ninguna disponible): se usan solo las 2 fotos de
 *    dueños, el perro lo inventa la IA desde el texto. No valida matching
 *    real de identidad de mascota, solo composición.
 *
 *   npx ts-node --project tsconfig.json src/database/probe-tapa-final-v3.ts --dry-run
 *   npx ts-node --project tsconfig.json src/database/probe-tapa-final-v3.ts
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
    id: 'siempre-seras-parte-de-mi-v3',
    libro: 'Siempre Serás Parte de Mí Adulto',
    titulo: 'Siempre serás parte de mí',
    coverSceneVisual: `{NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} sentados juntos en un patio nocturno con luces cálidas colgantes, riendo con complicidad genuina, rodeados de plantas y una vela encendida.

Fondo y Detalles
Patio nocturno con luces cálidas colgantes, plantas y una fachada cálida al fondo.

Efectos Mágicos
Un resplandor dorado brillante contornea a ambos, como una luz cálida que nunca se apaga, mientras partículas de luz dorada flotan suavemente a su alrededor.

[ILUMINACIÓN Y COLOR]
Luz cálida nocturna, tonos dorados y azules profundos. Atmósfera íntima, cómplice y nostálgica.`,
    nombreDestinatario: 'Andrea',
    nombreDedicante: 'Lucas',
    fotos: ['hermana-adulta-30.png', 'hermano-adulto-32.png'],
  },
  {
    id: 'aventura-entre-patas',
    libro: 'Aventura Entre Patas Adulto',
    titulo: 'Aventura entre patas',
    coverSceneVisual: `{NOMBRE_DESTINATARIO}, un perro dorado tipo golden retriever con un pañuelo verde al cuello, en el centro de la escena, con los dueños adultos sentados a ambos lados en un mirador de montaña al atardecer, con mochilas de trekking, mirándose con complicidad y alegría.

Fondo y Detalles
Mirador de montaña con un lago y pinos de fondo, luz dorada de atardecer.

Efectos Mágicos
Un resplandor cálido dorado envuelve a los tres, como símbolo de la aventura compartida.

[ILUMINACIÓN Y COLOR]
Luz cálida de atardecer, tonos dorados y verdes profundos. Atmósfera aventurera, cálida y luminosa.`,
    nombreDestinatario: 'Rocky',
    nombreDedicante: 'Carlos & Daniela',
    fotos: ['papa-58.png', 'mama-58.png'],
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
