/**
 * Prueba de tapas + contratapas de los 4 libros memorial dyad + el de
 * hermanos memorial, usando presencia etérea/translúcida para el fallecido
 * (sin marco ni álbum) y sin fotos de infancia inventadas.
 *
 *   npx ts-node --project tsconfig.json src/database/probe-tapa-memorial-adultos.ts --dry-run
 *   npx ts-node --project tsconfig.json src/database/probe-tapa-memorial-adultos.ts
 */

import { config } from 'dotenv';
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Client } from 'pg';
import { buildCoverPrompt, buildBackCoverPrompt } from '../personalized/domain/services/build-cover-prompt';
import { OpenAiImageGenerationAdapter } from '../personalized/infrastructure/ai/openai-image-generation.adapter';

config({ path: join(__dirname, '../../../../.env.docker') });

const FOTOS = join(__dirname, '../../../../PromptsPixelArtPlantillas/output/_FotosRecomendadas_Adultas');
const SALIDA = join(__dirname, '../../../../PromptsPixelArtPlantillas/output/_PRUEBA_TAPA_FAMILIA_ADULTOS');
const COVER_SIZE = '1456x1024';
const HASHTAG = '#RecuerdosPixelArt';

type Caso = {
  id: string;
  libro: string;
  titulo: string;
  coverSceneVisual: string;
  backCoverScene: string;
  tagline: string;
  nombreDestinatario: string;
  nombreDedicante: string;
  fotos: string[];
};

const CASOS: Caso[] = [
  {
    id: 'siempre-en-mi-corazon-abuelo',
    libro: 'Siempre en mi Corazón Abuelo Adulto',
    titulo: 'Siempre en mi corazón',
    coverSceneVisual: `La presencia etérea y translúcida de {NOMBRE_DESTINATARIO} acompaña a {NOMBRE_DEDICANTE} en una terraza soleada rodeada de flores blancas, compartiendo un momento de calidez y conexión.

Fondo y Detalles
Terraza con flores blancas y plantas frondosas, luz cálida de atardecer filtrándose entre las hojas.

Efectos Mágicos
Un resplandor dorado suave envuelve la figura etérea del abuelo, como símbolo de un amor que permanece.

[ILUMINACIÓN Y COLOR]
Luz cálida de atardecer, tonos dorados y verdes suaves. Atmósfera serena, nostálgica y luminosa.`,
    backCoverScene: `Terraza con flores blancas y plantas frondosas sin personajes, luz cálida de atardecer filtrándose entre las hojas. Un resplandor dorado suave cubre generosamente todo el fondo de borde a borde.`,
    tagline: 'Tu ejemplo sigue guiando cada página de mi vida.',
    nombreDestinatario: 'Jorge',
    nombreDedicante: 'Mateo',
    fotos: ['abuelo-75.png', 'hijo-adulto-32.png'],
  },
  {
    id: 'siempre-en-mi-corazon-abuela',
    libro: 'Siempre en mi Corazón Abuela Adulto',
    titulo: 'Siempre en mi corazón',
    coverSceneVisual: `La presencia etérea y translúcida de {NOMBRE_DESTINATARIO} acompaña a {NOMBRE_DEDICANTE} en un patio luminoso con flores lilas y velas encendidas, compartiendo un momento de calidez y conexión.

Fondo y Detalles
Patio con flores lilas, velas encendidas y plantas frondosas, luz cálida de atardecer.

Efectos Mágicos
Un resplandor suave en tonos lavanda envuelve la figura etérea de la abuela, como símbolo de un amor que permanece.

[ILUMINACIÓN Y COLOR]
Luz cálida de atardecer, tonos lavanda y dorado suave. Atmósfera serena, nostálgica y luminosa.`,
    backCoverScene: `Patio con flores lilas y velas encendidas sin personajes, plantas frondosas, luz cálida de atardecer. Un resplandor suave en tonos lavanda cubre todo el fondo de borde a borde.`,
    tagline: 'Tu amor quedó para siempre entre estas páginas.',
    nombreDestinatario: 'Carmen',
    nombreDedicante: 'Sofía',
    fotos: ['abuela-75.png', 'hija-adulta-30.png'],
  },
  {
    id: 'mi-angel-guardian-padre',
    libro: 'Mi Ángel Guardián Padre Adulto',
    titulo: 'Mi ángel guardián',
    coverSceneVisual: `{NOMBRE_DEDICANTE} camina por un sendero de montaña al anochecer, con una brújula en la mano, mientras la presencia etérea y translúcida de {NOMBRE_DESTINATARIO} lo guía desde el sendero iluminado hacia la cima.

Fondo y Detalles
Montaña nocturna con un sendero de luces cálidas ascendiendo hacia la cima, cielo estrellado.

Efectos Mágicos
Un resplandor dorado suave envuelve la figura etérea del padre, como una luz que guía el camino.

[ILUMINACIÓN Y COLOR]
Luz nocturna fría con destellos cálidos dorados en el sendero. Atmósfera íntima, esperanzadora y luminosa.`,
    backCoverScene: `Montaña nocturna sin personajes, con un sendero de luces cálidas ascendiendo hacia la cima, cielo estrellado. Un resplandor dorado suave recorre el sendero, cubriendo el fondo de borde a borde.`,
    tagline: 'Tu brújula sigue marcando mi camino.',
    nombreDestinatario: 'Luis',
    nombreDedicante: 'Mateo',
    fotos: ['papa-58.png', 'hijo-adulto-32.png'],
  },
  {
    id: 'mi-angel-guardian-madre',
    libro: 'Mi Ángel Guardián Madre Adulto',
    titulo: 'Mi ángel guardián',
    coverSceneVisual: `{NOMBRE_DEDICANTE} está sentada en un patio soleado con un arco de piedra, mientras la presencia etérea y translúcida de {NOMBRE_DESTINATARIO} la acompaña entre la luz cálida de la ventana.

Fondo y Detalles
Patio con arco de piedra, flores y una ventana luminosa al fondo, luz cálida de atardecer.

Efectos Mágicos
Un resplandor suave y dorado envuelve la figura etérea de la madre, como símbolo de su presencia constante.

[ILUMINACIÓN Y COLOR]
Luz cálida de atardecer, tonos dorados y rosados suaves. Atmósfera serena, cálida y luminosa.`,
    backCoverScene: `Patio con arco de piedra sin personajes, flores y una ventana luminosa al fondo, luz cálida de atardecer. Un resplandor suave y dorado cubre todo el fondo de borde a borde.`,
    tagline: 'Tu voz todavía me acompaña en cada paso.',
    nombreDestinatario: 'Elena',
    nombreDedicante: 'Valeria',
    fotos: ['mama-58.png', 'hija-adulta-30.png'],
  },
  {
    id: 'siempre-seras-parte-de-mi',
    libro: 'Siempre Serás Parte de Mí Adulto',
    titulo: 'Siempre serás parte de mí',
    coverSceneVisual: `{NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} sentados juntos en un patio nocturno con luces cálidas colgantes, riendo con complicidad genuina, rodeados de plantas y una vela encendida.

Fondo y Detalles
Patio nocturno con luces cálidas colgantes, plantas y una fachada cálida al fondo.

Efectos Mágicos
Un resplandor dorado suave envuelve a ambos, como símbolo de un vínculo que nunca se rompe.

[ILUMINACIÓN Y COLOR]
Luz cálida nocturna, tonos dorados y azules profundos. Atmósfera íntima, cómplice y nostálgica.`,
    backCoverScene: `Patio nocturno con luces cálidas colgantes sin personajes, plantas y una fachada cálida al fondo. Un resplandor dorado suave cubre generosamente todo el fondo de borde a borde.`,
    tagline: 'Lo que fuimos de niños, sigue vivo entre nosotros.',
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
    const names = { nombreDestinatario: caso.nombreDestinatario, nombreDedicante: caso.nombreDedicante };

    // Tapa
    const tapaPrompt = buildCoverPrompt({
      sharedBlocks,
      coverSceneVisual: caso.coverSceneVisual
        .replaceAll('{NOMBRE_DESTINATARIO}', caso.nombreDestinatario)
        .replaceAll('{NOMBRE_DEDICANTE}', caso.nombreDedicante),
      title: caso.titulo,
      names,
    });
    writeFileSync(join(SALIDA, `${caso.id}.prompt.txt`), tapaPrompt, 'utf8');

    // Contratapa
    const contratapaPrompt = buildBackCoverPrompt({
      sharedBlocks,
      scene: caso.backCoverScene,
      tagline: caso.tagline,
      hashtag: HASHTAG,
      names,
    });
    writeFileSync(join(SALIDA, `${caso.id}-contratapa.prompt.txt`), contratapaPrompt, 'utf8');

    console.log(`\n=== ${caso.id} — ${caso.libro}`);
    console.log(`    fotos tapa: ${caso.fotos.join(', ')}`);

    if (dryRun) continue;

    const referencias = caso.fotos.map((f) => readFileSync(join(FOTOS, f)));
    const tapaImagen = await adapter.generateWithReferences(tapaPrompt, referencias, COVER_SIZE);
    writeFileSync(join(SALIDA, `${caso.id}.png`), tapaImagen);
    console.log(`    -> ${caso.id}.png`);

    const contratapaImagen = await adapter.generate(contratapaPrompt, COVER_SIZE);
    writeFileSync(join(SALIDA, `${caso.id}-contratapa.png`), contratapaImagen);
    console.log(`    -> ${caso.id}-contratapa.png`);
  }

  await db.end();
  console.log(`\nsalida: ${SALIDA}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
