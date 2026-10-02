/**
 * Prueba de punta a punta del prompt REAL, sin pasar por el wizard.
 *
 * Importa el mismo código que usa GenerateDemoProposalUseCase (buildGenerationPrompt,
 * fillNamePlaceholders, fillPoemPlaceholders, derivePrintedTitle, resolveSeparator,
 * needsDualIdentity) y llama al mismo adaptador con SPREAD_SIZE. Lo único simulado
 * son las fotos del cliente: usa los retratos de la guía "Así deben verse tus fotos".
 *
 * NO cubre el wizard, la subida de fotos ni resolve-reference-photos: eso solo se
 * prueba desde el navegador.
 *
 * Cuesta dinero: quality 'high', ~$0.18 por imagen. Corre solo los casos que le pidas.
 *
 *   npx ts-node --project tsconfig.json src/database/probe-generacion-real.ts --dry-run
 *   npx ts-node --project tsconfig.json src/database/probe-generacion-real.ts
 */

import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Client } from 'pg';
import {
  buildGenerationPrompt,
  fillNamePlaceholders,
  fillPoemPlaceholders,
  derivePrintedTitle,
  resolveSeparator,
  needsDualIdentity,
  SPREAD_SIZE,
} from '../personalized/domain/services/build-generation-prompt';
import { OpenAiImageGenerationAdapter } from '../personalized/infrastructure/ai/openai-image-generation.adapter';

const FOTOS = join(__dirname, '../../../../PromptsPixelArtPlantillas/output/_FotosRecomendadas_Adultas');
const SALIDA = join(__dirname, '../../../../PromptsPixelArtPlantillas/output/_PRUEBA_FLUJO_REAL');

/** Cada caso ataca un riesgo distinto que quedó sin verificar. */
const CASOS = [
  {
    id: 'apodo-mayusculas',
    riesgo: 'El verso más apretado de los 11 libros con el peor apodo posible',
    modelId: 9861,
    posicion: 28,  // SHE_TO_SHE arranca en 21 (block 20): la plantilla 8 de esa dirección es la 28
    direccion: 'SHE_TO_SHE',
    apodo: 'MAMI',
    nombreDestinatario: 'Carmen',
    nombreDedicante: 'María',
    fotos: ['mama-58.png', 'hija-adulta-30.png'],
  },
  {
    id: 'mascota-especie',
    riesgo: 'needsDualIdentity ya incluye el libro adulto; y si la escena no dice "perro", ¿lo inventa?',
    modelId: 9857,
    posicion: 1,
    direccion: '',
    apodo: 'Toby',
    nombreDestinatario: 'Toby',
    nombreDedicante: 'Mateo',
    fotos: ['hijo-adulto-32.png'],
  },
  {
    id: 'memorial-direccion-fija',
    riesgo: 'Memorial de dirección única, después del arreglo del wizard',
    modelId: 9864,
    posicion: 1,
    direccion: 'M',
    apodo: 'Jorge',
    nombreDestinatario: 'Jorge',
    nombreDedicante: 'Mateo',
    fotos: ['abuelo-75.png', 'hijo-adulto-32.png'],
  },
];

async function main(): Promise<void> {
  const dryRun = process.argv.includes('--dry-run');
  mkdirSync(SALIDA, { recursive: true });

  const db = new Client({
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: Number(process.env.POSTGRES_PORT ?? 5432),
    user: process.env.POSTGRES_USER ?? 'pixelart',
    // Sin fallback con la contraseña escrita: este repo es público.
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB ?? 'pixelart',
  });
  await db.connect();

  const blocks = await db.query('SELECT block_key, content FROM prompt_shared_blocks');
  const sharedBlocks: Record<string, string> = {};
  for (const r of blocks.rows) sharedBlocks[r.block_key] = r.content;

  const adapter = new OpenAiImageGenerationAdapter();

  for (const caso of CASOS) {
    const { rows } = await db.query(
      `SELECT t.name, t.scene_visual, t.background_details, t.magic_effects, t.lighting_color,
              t.poem_template, m.name AS model_name, c.name AS category_name
         FROM personalized_templates t
         JOIN personalized_models m ON m.id = t.model_id
         JOIN personalized_categories c ON c.id = m.category_id
        WHERE t.model_id = $1 AND t.is_active
          AND coalesce(t.gender_direction,'') = $2
          AND t.template_preview_key ~* ('lantilla_0*' || $3 || '_')
        LIMIT 1`,
      [caso.modelId, caso.direccion, caso.posicion],
    );
    if (rows.length === 0) {
      console.log(`[error] ${caso.id}: no encontré la plantilla ${caso.modelId}/${caso.posicion}/${caso.direccion || '(vacía)'}`);
      continue;
    }
    const t = rows[0];

    const nameValues = {
      nombreDestinatario: caso.nombreDestinatario,
      apodoDestinatario: caso.apodo,
      nombreDedicante: caso.nombreDedicante,
      apellido: '',
    };

    const prompt = buildGenerationPrompt({
      sharedBlocks,
      isPetCategory: (t.category_name ?? '').toLowerCase().includes('mascota'),
      needsHumanIdentityToo: needsDualIdentity(t.model_name),
      sceneVisual: fillNamePlaceholders(t.scene_visual, nameValues),
      backgroundDetails: fillNamePlaceholders(t.background_details ?? '', nameValues),
      magicEffects: fillNamePlaceholders(t.magic_effects ?? '', nameValues),
      lightingColor: fillNamePlaceholders(t.lighting_color ?? '', nameValues),
      title: derivePrintedTitle(t.name),
      poem: fillPoemPlaceholders(t.poem_template, nameValues),
      separator: resolveSeparator(t.category_name),
    });

    const sinRellenar = prompt.match(/\{[A-Z_]+\}/g);
    console.log(`\n=== ${caso.id} — ${t.model_name} / ${derivePrintedTitle(t.name)}`);
    console.log(`    riesgo    : ${caso.riesgo}`);
    console.log(`    identidad : ${needsDualIdentity(t.model_name) ? 'mascota + humano' : 'simple'}`);
    console.log(`    tamaño    : ${SPREAD_SIZE}`);
    console.log(`    llaves sin rellenar: ${sinRellenar ? sinRellenar.join(', ') : 'ninguna'}`);
    writeFileSync(join(SALIDA, `${caso.id}.prompt.txt`), prompt, 'utf8');

    if (dryRun) continue;

    const referencias = caso.fotos.map((f) => readFileSync(join(FOTOS, f)));
    const imagen = await adapter.generateWithReferences(prompt, referencias, SPREAD_SIZE);
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
