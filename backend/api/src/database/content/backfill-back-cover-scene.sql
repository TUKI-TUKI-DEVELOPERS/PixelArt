-- backfill-back-cover-scene.sql — fix: TODOS los libros generaban la
-- contratapa con el mismo fondo (bloque compartido prompt_shared_blocks
-- 'contratapa_fondo_efectos'), que resultó ser el fondo aprobado específico
-- de "10 Razones por las que Te Amo" (corazones en bokeh dorado/rosa) —
-- copiado sin querer como si fuera genérico. Este backfill carga la escena
-- propia de cada libro en la columna nueva personalized_models.back_cover_
-- scene, portada 1:1 de PromptsPixelArtPlantillas/tapa-contratapa-promocion/
-- fondos-contratapa-sin-personajes.md (ya probada — el usuario generó
-- imágenes con estos prompts y las aprobó). "10 Razones" no está en ese .md
-- (ya tenía su contratapa real aprobada) — se le copia el texto que hoy
-- vive en el bloque compartido, que le pertenece a él originalmente.
-- Idempotente (UPDATE incondicional, mismo patrón que backfill-tapa-
-- contratapa-resto.sql).

BEGIN;

UPDATE personalized_models SET back_cover_scene = 'Fondo de estudio cálido en degradado de tonos marrón dorado a rosa/coral profundo, sin arquitectura ni elementos exteriores.

Efectos Mágicos
El fondo entero está lleno de corazones suaves en bokeh, de distintos tamaños y profundidades, en tonos dorado cálido y rosa pastel, brillando con un resplandor difuso tipo luz de vela, cubriendo todo el encuadre de borde a borde de forma pareja y generosa.

[ILUMINACIÓN Y COLOR]
Iluminación cálida de estudio, tonos marrón dorado, rosa y coral profundo.'
WHERE name = '10 Razones por las que Te Amo';

UPDATE personalized_models SET back_cover_scene = 'Un rincón tipo altillo/loft acogedor con una ventana circular grande mostrando un cielo NOCTURNO con FUEGOS ARTIFICIALES estallando en tonos dorados, ámbar y cobre cálidos, silueta de la ciudad iluminada abajo en la ventana, una guirnalda de luces cálidas cruzando el techo en diagonal, una repisa desenfocada con polaroids desparramadas y una maleta vintage apilada al costado. Chispitas doradas y pequeñas partículas de luz flotan y caen suavemente en el aire, cubriendo generosamente el encuadre de borde a borde de forma pareja.'
WHERE name = '1025 Días enamorándome de ti';

UPDATE personalized_models SET back_cover_scene = 'Un balcón romántico de noche con barandal de piedra tallada que se extiende de punta a punta del encuadre, rosas rojas trepando y cayendo por ambos bordes, vista a un skyline de ciudad iluminado y desenfocado en la distancia, una luna llena grande y luminosa en el cielo nocturno degradado de azul profundo a violeta. Pequeñas luces cálidas tipo guirnalda de hadas flotan difuminadas, cubriendo generosamente el encuadre de borde a borde de forma pareja.'
WHERE name = 'Mi Amor';

UPDATE personalized_models SET back_cover_scene = 'Un living hogareño real y luminoso, ambiente candid y realista (no fantasía): plantas monstera grandes a ambos lados del encuadre, un sofá con almohadones desenfocado, un oso de peluche visible en una esquina, luz natural cálida de ventana, cubriendo generosamente el encuadre de borde a borde.'
WHERE name = 'Mi Familia';

UPDATE personalized_models SET back_cover_scene = 'Un cielo onírico de fantasía con nubes mullidas doradas extendiéndose de borde a borde, un arcoíris grande curvándose de un lado al otro del encuadre, pequeños castillos flotantes y aves volando en la distancia, destellos de estrellas dispersos entre las nubes, cubriendo generosamente el encuadre.'
WHERE name = 'El Mejor Equipo';

UPDATE personalized_models SET back_cover_scene = 'Un templo griego clásico de columnas blancas al fondo, rodeado de nubes doradas y rosadas que se extienden de borde a borde, escalinatas de mármol ascendiendo hacia el templo, pétalos de rosa y corazones translúcidos flotando suavemente en el aire, cubriendo generosamente el encuadre.'
WHERE name = 'Mamá, Mi Heroína';

UPDATE personalized_models SET back_cover_scene = 'Un cielo de atardecer dramático con nubes doradas y anaranjadas iluminadas desde atrás, rayos de sol visibles atravesando las nubes en haces definidos (god rays), una silueta de colinas o ciudad lejana en el horizonte, destellos de luz cálida flotando como polvo dorado, cubriendo generosamente el encuadre.'
WHERE name = 'Papá, Mi Héroe';

UPDATE personalized_models SET back_cover_scene = 'Un interior cálido tipo sala de estar al atardecer, luz dorada entrando por una ventana grande desenfocada a un costado, cortinas suaves moviéndose levemente, siluetas de muebles y un jarrón con flores desenfocados de fondo. Pequeños corazones dorados translúcidos y partículas de luz cálida flotan, cubriendo generosamente el encuadre.'
WHERE name = 'Te amo, abuela';

UPDATE personalized_models SET back_cover_scene = 'Un jardín frondoso al atardecer con árboles frondosos a ambos lados del encuadre, macizos de flores rosadas y blancas en primer plano a los costados, luz dorada de atardecer filtrándose entre las hojas en haces visibles, un cielo cálido degradado asomando entre las ramas. Mariposas revoloteando, cubriendo generosamente el encuadre.'
WHERE name = 'Te amo, abuelo';

UPDATE personalized_models SET back_cover_scene = 'Un sendero de bosque encantado al atardecer con árboles altos a ambos lados del encuadre, luz dorada filtrándose entre las hojas en haces visibles, un cielo degradado de durazno a violeta suave asomando entre las copas, hojas doradas cayendo suavemente. Pequeñas huellas de pata doradas brillantes flotan, cubriendo generosamente el encuadre.'
WHERE name = 'Aventura entre patas';

UPDATE personalized_models SET back_cover_scene = 'Un campo dorado al atardecer con pasto alto ondeando que se extiende de borde a borde, sol bajo en el horizonte creando un resplandor cálido y rayos de luz rasante visibles entre el pasto, un cielo degradado de dorado a durazno y violeta suave en las esquinas superiores. Mariposas doradas translúcidas revoloteando, cubriendo generosamente el encuadre.'
WHERE name = 'Mi mejor amigo del mundo';

UPDATE personalized_models SET back_cover_scene = 'Un living acogedor de noche, cortinas de gasa translúcida cayendo a ambos lados del encuadre, una estantería de madera con libros y velas encendidas desenfocada al fondo, una guirnalda de luces cálidas entrelazada entre las cortinas, almohadones en tonos pastel (lila, rosa, celeste) asomando en primer plano a los costados, una ventana central con luz cálida de atardecer filtrándose. Pequeñas partículas doradas flotan, cubriendo generosamente el encuadre.'
WHERE name = 'Mi amigo Miauravilloso';

UPDATE personalized_models SET back_cover_scene = 'Un cielo de nubes doradas y rosadas mullidas que se extienden de borde a borde, un halo dorado tenue y difuso flotando en el aire, mariposas doradas translúcidas revoloteando, destellos de luz tipo estrellas dispersos entre las nubes, cubriendo generosamente el encuadre.'
WHERE name = 'Nuestro Angel de 4 patas';

UPDATE personalized_models SET back_cover_scene = 'Un árbol ancestral enorme con ramas que se extienden de borde a borde, hojas doradas cayendo y formando un puente luminoso, un cielo nocturno estrellado detrás con destellos suaves, raíces brillantes visibles en la base, cubriendo generosamente el encuadre.'
WHERE name = 'Gracias por tu amor';

UPDATE personalized_models SET back_cover_scene = 'Un cielo nocturno profundo con una vía láctea visible, estrellas fugaces y constelaciones dispersas de borde a borde, una silueta de montañas oscuras en el horizonte inferior, luz plateada y dorada tenue irradiando suavemente, cubriendo generosamente el encuadre.'
WHERE name = 'Mi angel guardian';

UPDATE personalized_models SET back_cover_scene = 'Un sendero tropical al atardecer con palmeras y follaje denso a ambos lados del encuadre, el mar y un horizonte dorado visibles entre la vegetación, una luna tenue asomando en el cielo cálido degradado. Notas musicales doradas translúcidas y partículas de luz flotan, cubriendo generosamente el encuadre.'
WHERE name = 'Siempre seras parte de mi';

UPDATE personalized_models SET back_cover_scene = 'Un jardín florido al atardecer con rosales y flores durazno/rosadas a ambos lados del encuadre, un cielo cálido degradado de dorado a rosa pálido, mariposas doradas revoloteando, luz de sol filtrándose entre árboles lejanos, cubriendo generosamente el encuadre.'
WHERE name = 'Siempre en mi corazon';

-- El bloque compartido queda huérfano después de este backfill — build-
-- cover-prompt.ts ya no lo lee (usa personalized_models.back_cover_scene
-- por libro). Se borra para que nadie lo vuelva a reusar "genérico" por
-- error, que es exactamente como se originó este bug.
DELETE FROM prompt_shared_blocks WHERE block_key = 'contratapa_fondo_efectos';

COMMIT;
