import { config } from 'dotenv';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Client } from 'pg';
import { buildCoverPrompt } from '../personalized/domain/services/build-cover-prompt';
import { OpenAiImageGenerationAdapter } from '../personalized/infrastructure/ai/openai-image-generation.adapter';

config({ path: join(__dirname, '../../../../.env.docker') });

const FOTOS = join(__dirname, '../../../../PromptsPixelArtPlantillas/output/_FotosRecomendadas_Adultas');
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

  const coverSceneVisual = `Elena y Valeria muy cerca, mejilla con mejilla, ambas sonriendo con calidez genuina, en un jardín soleado lleno de flores.

Fondo y Detalles
Jardín frondoso con flores de distintos colores, luz dorada de atardecer filtrándose entre las plantas.

Efectos Mágicos
Un resplandor cálido y dorado envuelve suavemente a ambas, como símbolo de un amor incondicional.

[ILUMINACIÓN Y COLOR]
Luz dorada cálida de atardecer, tonos ámbar y verde suave. Atmósfera íntima, nostálgica y luminosa.`;

  const prompt = buildCoverPrompt({
    sharedBlocks,
    coverSceneVisual,
    title: 'Mamá, mi heroína',
    names: { nombreDestinatario: 'Elena', nombreDedicante: 'Valeria' },
  });

  writeFileSync(join(SALIDA, 'mama-mi-heroina-v2.prompt.txt'), prompt, 'utf8');

  const adapter = new OpenAiImageGenerationAdapter();
  const referencias = ['mama-58.png', 'hija-adulta-30.png'].map((f) => readFileSync(join(FOTOS, f)));
  const imagen = await adapter.generateWithReferences(prompt, referencias, '1456x1024');
  writeFileSync(join(SALIDA, 'mama-mi-heroina-v2.png'), imagen);
  console.log('listo: mama-mi-heroina-v2.png');

  await db.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
