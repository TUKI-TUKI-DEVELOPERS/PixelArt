import { config } from 'dotenv';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { Client } from 'pg';
import { buildBackCoverPrompt } from '../personalized/domain/services/build-cover-prompt';
import { OpenAiImageGenerationAdapter } from '../personalized/infrastructure/ai/openai-image-generation.adapter';

config({ path: join(__dirname, '../../../../.env.docker') });

const SALIDA = join(__dirname, '../../../../PromptsPixelArtPlantillas/output/_PRUEBA_TAPA_FAMILIA_ADULTOS');

async function main(): Promise<void> {
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

  const prompt = buildBackCoverPrompt({
    sharedBlocks,
    scene: `Jardín soleado sin personajes, flores de distintos colores, luz dorada de atardecer filtrándose entre las plantas. Un resplandor cálido y dorado cubre generosamente todo el fondo de borde a borde.`,
    tagline: 'Para la mujer que nunca usó capa, pero fue mi heroína.',
    hashtag: '#FamiliaPixelArt',
    names: { nombreDestinatario: 'Elena', nombreDedicante: 'Valeria' },
  });

  writeFileSync(join(SALIDA, 'mama-mi-heroina-contratapa-v2.prompt.txt'), prompt, 'utf8');

  const adapter = new OpenAiImageGenerationAdapter();
  const imagen = await adapter.generate(prompt, '1456x1024');
  writeFileSync(join(SALIDA, 'mama-mi-heroina-contratapa-v2.png'), imagen);
  console.log('listo: mama-mi-heroina-contratapa-v2.png');

  await db.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
