/**
 * Re-prueba "Siempre Serás Parte de Mí" (v4): vuelve a la pose original
 * (ambos mirando hacia adelante, NO uno al otro como pareja — libro de
 * hermanos, no romántico) y pone el resplandor dorado SOLO en el hermano/a
 * recordado/a (NOMBRE_DESTINATARIO), no en ambos.
 *
 *   npx ts-node --project tsconfig.json src/database/probe-tapa-final-v4.ts --dry-run
 *   npx ts-node --project tsconfig.json src/database/probe-tapa-final-v4.ts
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

  const nombreDestinatario = 'Andrea';
  const nombreDedicante = 'Lucas';

  const coverSceneVisual = `${nombreDestinatario} y ${nombreDedicante} sentados juntos en un patio nocturno con luces cálidas colgantes, ambos mirando hacia adelante con sonrisas cómplices — NUNCA mirándose fijamente cara a cara como una pareja: es un vínculo fraternal entre hermanos, no romántico. Rodeados de plantas y una vela encendida.

Fondo y Detalles
Patio nocturno con luces cálidas colgantes, plantas y una fachada cálida al fondo.

Efectos Mágicos
Un resplandor dorado brillante contornea ÚNICAMENTE a ${nombreDestinatario}, como una luz cálida que nunca se apaga. ${nombreDedicante} NO tiene ningún resplandor ni contorno de luz — luce completamente natural, sin efectos.

[ILUMINACIÓN Y COLOR]
Luz cálida nocturna, tonos dorados y azules profundos. Atmósfera íntima, cómplice y nostálgica.`;

  const prompt = buildCoverPrompt({
    sharedBlocks,
    coverSceneVisual,
    title: 'Siempre serás parte de mí',
    names: { nombreDestinatario, nombreDedicante },
  });
  writeFileSync(join(SALIDA, 'siempre-seras-parte-de-mi-v4.prompt.txt'), prompt, 'utf8');

  console.log('=== siempre-seras-parte-de-mi-v4');
  if (dryRun) {
    await db.end();
    return;
  }

  const adapter = new OpenAiImageGenerationAdapter();
  const referencias = ['hermana-adulta-30.png', 'hermano-adulto-32.png'].map((f) => readFileSync(join(FOTOS, f)));
  const imagen = await adapter.generateWithReferences(prompt, referencias, COVER_SIZE);
  writeFileSync(join(SALIDA, 'siempre-seras-parte-de-mi-v4.png'), imagen);
  console.log('-> siempre-seras-parte-de-mi-v4.png');

  await db.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
