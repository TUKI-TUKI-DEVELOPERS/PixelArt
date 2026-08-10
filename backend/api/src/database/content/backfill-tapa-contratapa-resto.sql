-- backfill-tapa-contratapa-resto.sql — Fase D: resto del catálogo de tapa/
-- contratapa (16 libros restantes tras el piloto "10 Razones por las que Te
-- Amo", ver backfill-cover-content.sql). Contenido portado 1:1 de
-- PromptsPixelArtPlantillas/tapa-contratapa-promocion/fondos-tapa-sin-
-- personajes.md y fondos-contratapa-sin-personajes.md, ya validado con el
-- script generate_tapa_contratapa_piloto.py (34 imágenes generadas).
--
-- CONTRATAPA (back_cover_tagline + back_cover_hashtag): se completa para
-- LOS 16 LIBROS + 3 CATEGORÍAS restantes sin excepción — la contratapa
-- nunca lleva personas reales, no hay ambigüedad de identidad posible.
--
-- TAPA (cover_scene_visual): se completa SOLO para los 10 libros "directos"
-- donde el mapeo de roles (recipient/dedicator vía character_roles, ver
-- personalized_templates) es 1:1 y sin tratamiento especial de identidad.
-- QUEDAN AFUERA A PROPÓSITO (tapa aún NULL, contratapa sí resuelta):
--   - Mi Amor: vestuario de época (renacentista) obligatorio — no es "poner
--     la cara real en la escena", falta decidir cómo se resuelve con fotos
--     reales del cliente.
--   - Nuestro Angel de 4 patas: mascota FALLECIDA + dueño real, doble
--     identidad (needsDualIdentity) — el fondo ya está aprobado visualmente
--     pero el tratamiento de "mascota fallecida" en el prompt no está
--     resuelto todavía.
--   - Gracias por tu Amor, Mi Ángel Guardián, Siempre Serás Parte de Mí,
--     Siempre en mi Corazón (Memorias Familiares, las 4): persona fallecida
--     representada como presencia etérea/translúcida — mismo problema sin
--     resolver, afecta a las 4 por igual.
-- Idempotente (UPDATE incondicional, mismo patrón que backfill-cover-content.sql).

BEGIN;

-- ═══════════════════════════ CONTRATAPA — 16 libros ═══════════════════════

UPDATE personalized_models SET back_cover_tagline = 'Días enamorándome de ti.' WHERE name = '1025 Días enamorándome de ti';
UPDATE personalized_models SET back_cover_tagline = 'Un amor real, escrito para durar para siempre.' WHERE name = 'Mi Amor';
UPDATE personalized_models SET back_cover_tagline = 'Las mejores aventuras se viven en familia.' WHERE name = 'Mi Familia';
UPDATE personalized_models SET back_cover_tagline = 'Hermanos hoy, el mejor equipo de siempre.' WHERE name = 'El Mejor Equipo';
UPDATE personalized_models SET back_cover_tagline = 'El amor de mamá, la fuerza más grande del mundo.' WHERE name = 'Mamá, Mi Heroína';
UPDATE personalized_models SET back_cover_tagline = 'Para el héroe que siempre estuvo ahí.' WHERE name = 'Papá, Mi Héroe';
UPDATE personalized_models SET back_cover_tagline = 'El cariño de abuela se queda para siempre.' WHERE name = 'Te amo, abuela';
UPDATE personalized_models SET back_cover_tagline = 'Las mejores historias las cuenta el abuelo.' WHERE name = 'Te amo, abuelo';
UPDATE personalized_models SET back_cover_tagline = 'Cada aventura es mejor con cuatro patas al lado.' WHERE name = 'Aventura entre patas';
UPDATE personalized_models SET back_cover_tagline = 'El mejor amigo no necesita palabras, solo una cola que mueve.' WHERE name = 'Mi mejor amigo del mundo';
UPDATE personalized_models SET back_cover_tagline = 'Un ronroneo vale más que mil palabras.' WHERE name = 'Mi amigo Miauravilloso';
UPDATE personalized_models SET back_cover_tagline = 'Su amor nunca se fue, solo cambió de forma.' WHERE name = 'Nuestro Angel de 4 patas';
UPDATE personalized_models SET back_cover_tagline = 'Su amor sigue vivo en cada recuerdo.' WHERE name = 'Gracias por tu amor';
UPDATE personalized_models SET back_cover_tagline = 'Siempre presente, aunque no lo veamos.' WHERE name = 'Mi angel guardian';
UPDATE personalized_models SET back_cover_tagline = 'Lo que se ama de verdad, nunca se va del todo.' WHERE name = 'Siempre seras parte de mi';
UPDATE personalized_models SET back_cover_tagline = 'Algunos recuerdos nunca se apagan.' WHERE name = 'Siempre en mi corazon';

-- ═══════════════════════════ HASHTAG — 3 categorías ════════════════════════

UPDATE personalized_categories SET back_cover_hashtag = '#FamiliaPixelArt' WHERE name = 'Libros de Familia';
UPDATE personalized_categories SET back_cover_hashtag = '#MascotasPixelArt' WHERE name = 'Libros de Mascotas';
UPDATE personalized_categories SET back_cover_hashtag = '#RecuerdosPixelArt' WHERE name = 'Libros de Memorias Familiares';

-- ═══════════════════════ TAPA — 10 libros directos ═════════════════════════

UPDATE personalized_models SET cover_scene_visual = $cov2${NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} en un beso romántico y tierno, ojos cerrados, uno con la mano en la mejilla o la nuca del otro, el otro con la mano en el pecho o el brazo, centrados, de la cintura hacia arriba.

Fondo y Detalles
Un rincón tipo altillo/loft acogedor con una ventana circular grande mostrando un cielo nocturno con fuegos artificiales estallando en tonos dorados, ámbar y cobre cálidos (varias explosiones a distintas alturas y tamaños, con estelas de humo dorado tenue), silueta de la ciudad iluminada abajo en la ventana, una guirnalda de luces cálidas cruzando el techo en diagonal, una repisa desenfocada con polaroids desparramadas y una maleta vintage apilada al costado.

Efectos Mágicos
Chispitas doradas y pequeñas partículas de luz flotan y caen suavemente en el aire, cubriendo generosamente el encuadre.

[ILUMINACIÓN Y COLOR]
Iluminación cálida nocturna, tonos dorado, ámbar y cobre. Atmósfera íntima, nostálgica y festiva.$cov2$
WHERE name = '1025 Días enamorándome de ti';

UPDATE personalized_models SET cover_scene_visual = $cov3${NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} junto a sus hijos, en un momento de juego caótico y divertido — uno con las manos en alto, otro riendo mientras lanza una manta al aire, otro con binoculares de juguete, otro riendo cerca del piso, todos distribuidos a lo ancho de la escena.

Fondo y Detalles
Un living hogareño real y luminoso, ambiente candid y realista (no fantasía, no cuento): plantas monstera grandes a ambos lados del encuadre, un sofá con almohadones desenfocado, un oso de peluche visible en una esquina, luz natural cálida de ventana.

Efectos Mágicos
Una manta o bufanda verde en pleno vuelo por el aire, como si acabaran de lanzarla.

[ILUMINACIÓN Y COLOR]
Luz natural cálida de ventana. Atmósfera hogareña, genuina y alegre.$cov3$
WHERE name = 'Mi Familia';

UPDATE personalized_models SET cover_scene_visual = $cov4$Los hermanos sentados juntos sobre un banco de nubes, uno de ellos sosteniendo un timón de barco de madera clavado entre las nubes, todos mirando al horizonte con expresión de aventura.

Fondo y Detalles
Un cielo onírico de fantasía con nubes mullidas doradas extendiéndose de borde a borde, un arcoíris grande curvándose de un lado al otro del encuadre, pequeños castillos flotantes y aves volando en la distancia.

Efectos Mágicos
Destellos de estrellas dispersos entre las nubes.

[ILUMINACIÓN Y COLOR]
Luz dorada difusa de cuento de fantasía. Atmósfera onírica, cálida y aventurera.$cov4$
WHERE name = 'El Mejor Equipo';

UPDATE personalized_models SET cover_scene_visual = $cov5${NOMBRE_DESTINATARIO} de pie con gracia, vestida como una diosa griega con toga blanca y dorada y un halo dorado tenue; {NOMBRE_DEDICANTE} arrodillado suavemente frente a ella, mirándola con admiración y extendiendo la mano.

Fondo y Detalles
Un templo griego clásico de columnas blancas al fondo, rodeado de nubes doradas y rosadas que se extienden de borde a borde, escalinatas de mármol ascendiendo hacia el templo.

Efectos Mágicos
Pétalos de rosa y corazones translúcidos flotando suavemente en el aire.

[ILUMINACIÓN Y COLOR]
Luz dorada y rosada celestial. Atmósfera majestuosa, cálida y reverente.$cov5$
WHERE name = 'Mamá, Mi Heroína';

UPDATE personalized_models SET cover_scene_visual = $cov6${NOMBRE_DESTINATARIO} de pie con {NOMBRE_DEDICANTE} sentada sobre sus hombros, ella con una pequeña capa de superhéroe ondeando al viento, brazos abiertos como si volara, ambos sonriendo a cámara.

Fondo y Detalles
Un cielo de atardecer dramático con nubes doradas y anaranjadas iluminadas desde atrás, rayos de sol visibles atravesando las nubes en haces definidos (efecto rayos de dios/god rays), una silueta de colinas o ciudad lejana en el horizonte.

Efectos Mágicos
Destellos de luz cálida flotando como polvo dorado.

[ILUMINACIÓN Y COLOR]
Luz de atardecer dramática, tonos dorados y anaranjados. Atmósfera épica y heroica.$cov6$
WHERE name = 'Papá, Mi Héroe';

UPDATE personalized_models SET cover_scene_visual = $cov7${NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} frente con frente, con las frentes apoyadas suavemente, ojos cerrados, ambas sonriendo con ternura, de la cintura hacia arriba.

Fondo y Detalles
Un interior cálido tipo sala de estar al atardecer, luz dorada entrando por una ventana grande desenfocada a un costado, cortinas suaves moviéndose levemente, siluetas de muebles y un jarrón con flores desenfocados de fondo.

Efectos Mágicos
Pequeños corazones dorados translúcidos y partículas de luz cálida flotan.

[ILUMINACIÓN Y COLOR]
Luz dorada de atardecer. Atmósfera cálida, hogareña y tierna.$cov7$
WHERE name = 'Te amo, abuela';

UPDATE personalized_models SET cover_scene_visual = $cov8${NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} en un abrazo tierno, con la cabeza apoyada en el pecho del otro, ambos con expresión cálida y serena.

Fondo y Detalles
Un jardín frondoso al atardecer con árboles frondosos a ambos lados del encuadre, macizos de flores rosadas y blancas en primer plano a los costados, luz dorada de atardecer filtrándose entre las hojas en haces visibles, un cielo cálido degradado asomando entre las ramas.

Efectos Mágicos
Mariposas revoloteando.

[ILUMINACIÓN Y COLOR]
Luz dorada de atardecer filtrándose entre las hojas. Atmósfera serena y afectuosa.$cov8$
WHERE name = 'Te amo, abuelo';

UPDATE personalized_models SET cover_scene_visual = $cov9$Los niños abrazando a la mascota entre ellos, todos sonriendo con complicidad a cámara, de la cintura hacia arriba.

Fondo y Detalles
Un sendero de bosque encantado al atardecer con árboles altos a ambos lados del encuadre, luz dorada filtrándose entre las hojas en haces visibles, un cielo degradado de durazno a violeta suave asomando entre las copas, hojas doradas cayendo suavemente.

Efectos Mágicos
Pequeñas huellas de pata doradas brillantes flotan.

[ILUMINACIÓN Y COLOR]
Luz dorada de atardecer filtrándose entre las hojas, tonos durazno y violeta suave. Atmósfera de aventura mágica y cálida.$cov9$
WHERE name = 'Aventura entre patas';

UPDATE personalized_models SET cover_scene_visual = $cov10${NOMBRE_DESTINATARIO} sentado o recostado relajadamente en el centro de la escena, mirando a cámara con expresión cálida y serena, de cuerpo entero o de tres cuartos.

Fondo y Detalles
Un campo dorado al atardecer con pasto alto ondeando que se extiende de borde a borde, sol bajo en el horizonte creando un resplandor cálido y rayos de luz rasante visibles entre el pasto.

Efectos Mágicos
Mariposas doradas translúcidas revoloteando.

[ILUMINACIÓN Y COLOR]
Resplandor cálido de atardecer, tonos dorado a durazno y violeta suave. Atmósfera panorámica y serena.$cov10$
WHERE name = 'Mi mejor amigo del mundo';

UPDATE personalized_models SET cover_scene_visual = $cov11${NOMBRE_DESTINATARIO} sentado en el centro con postura elegante, mirando a cámara con expresión serena, de cuerpo entero o de tres cuartos.

Fondo y Detalles
Un living acogedor de noche, cortinas de gasa translúcida cayendo a ambos lados del encuadre, una estantería de madera con libros y velas encendidas desenfocada al fondo, una guirnalda de luces cálidas entrelazada entre las cortinas, almohadones en tonos pastel (lila, rosa, celeste) asomando en primer plano a los costados, una ventana central con luz cálida de atardecer filtrándose.

Efectos Mágicos
Pequeñas partículas doradas flotan.

[ILUMINACIÓN Y COLOR]
Luz cálida nocturna filtrándose entre las cortinas. Atmósfera acogedora y elegante.$cov11$
WHERE name = 'Mi amigo Miauravilloso';

COMMIT;
