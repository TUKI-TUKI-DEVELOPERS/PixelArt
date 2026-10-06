-- backfill-tapa-contratapa-adultos.sql — cover_scene_visual, back_cover_scene
-- y back_cover_tagline de los 11 libros adultos que no tenían nada (Papá, Mi
-- Héroe Adulto ya estaba resuelto desde antes, no se toca acá).
--
-- Conceptos aprobados en sesión de pruebas reales con gpt-image-2 (fotos de
-- PromptsPixelArtPlantillas/output/_FotosRecomendadas_Adultas), resultados en
-- PromptsPixelArtPlantillas/output/_PRUEBA_TAPA_FAMILIA_ADULTOS/. Mismo
-- patrón de bloque único (escena + Fondo y Detalles + Efectos Mágicos +
-- [ILUMINACIÓN Y COLOR]) que ya usa Papá, Mi Héroe Adulto.
--
-- Libros de memorial (Siempre en mi Corazón ×2, Mi Ángel Guardián ×2): el
-- fallecido aparece como presencia etérea/translúcida DIRECTAMENTE en la
-- escena (nunca enmarcado en una foto/álbum — probado y descartado, se veía
-- como objeto en vez de persona). Texto explícito de "únicamente dos
-- personas" porque sin eso la IA a veces duplicaba al fallecido (sólido al
-- frente + translúcido atrás) — confirmado y corregido en Mi Ángel Guardián
-- Madre.
--
-- Siempre Serás Parte de Mí (hermanos, memorial): sin tratamiento de
-- presencia etérea — ambos hermanos están vivos en escena, solo UNO (el
-- recordado) lleva un contorno de luz dorada. Instrucción explícita de NO
-- mirarse cara a cara (se leía como pareja en la primera prueba, mismo tipo
-- de bug que ya existía antes en otros libros de memorial).
--
-- Aventura Entre Patas: cover_scene_visual NO describe raza/color de la
-- mascota a propósito (la prueba real sí lo hizo porque no había foto de
-- referencia disponible) — un cliente real sube su propia foto de mascota,
-- describir una raza fija rompería el matching de identidad real.
-- Composición aprobada solo visualmente; falta validar con una foto de
-- mascota real antes de confiar en el matching de identidad.
--
-- Idempotente (UPDATE incondicional, mismo patrón que backfill-tapa-contratapa-resto.sql).

-- 1. El Mejor Equipo Adulto (hermanos)
UPDATE personalized_models SET
  cover_scene_visual = $cs1$Los hermanos caminan juntos por un malecón urbano al anochecer, uno con un brazo sobre el hombro del otro, riendo con complicidad genuina, vestidos con abrigos casuales elegantes de tonos oscuros.

Fondo y Detalles
Skyline de ciudad iluminado al fondo, farolas cálidas encendidas a lo largo del malecón, reflejos dorados sobre el agua.

Efectos Mágicos
Un resplandor dorado suave envuelve el contorno de ambos, como símbolo de una complicidad que nunca se apaga.

[ILUMINACIÓN Y COLOR]
Luz cálida de farolas nocturnas, tonos azul profundo y dorado. Atmósfera elegante, cómplice y adulta.$cs1$,
  back_cover_scene = $bc1$Malecón urbano al anochecer sin personajes, skyline de ciudad iluminado, farolas cálidas a lo largo del paseo, reflejos dorados sobre el agua. Un resplandor dorado suave cruza el encuadre, cubriendo generosamente el fondo de borde a borde.$bc1$,
  back_cover_tagline = 'Para el equipo que elegimos sin saberlo.',
  updated_at = now()
WHERE name = 'El Mejor Equipo Adulto';

-- 2. Mi Familia Adulto (grupo)
UPDATE personalized_models SET
  cover_scene_visual = $cs2$Papá y mamá al centro, abrazados junto al resto de la familia en un abrazo grupal cálido, todos sonriendo con calidez genuina, en una terraza al atardecer.

Fondo y Detalles
Patio cálido con enredaderas, luces colgantes cálidas encendidas, fachada de casa mediterránea al fondo.

Efectos Mágicos
Luciérnagas doradas suaves flotando alrededor del grupo, símbolo de hogar y unión.

[ILUMINACIÓN Y COLOR]
Luz cálida de atardecer, tonos ámbar y terracota. Atmósfera hogareña, íntima y festiva.$cs2$,
  back_cover_scene = $bc2$Patio cálido al atardecer sin personajes, enredaderas, luces colgantes encendidas, fachada de casa mediterránea al fondo. Luciérnagas doradas suaves flotando por todo el encuadre, cubriendo el fondo de borde a borde.$bc2$,
  back_cover_tagline = 'Donde siempre hay un lugar para volver.',
  updated_at = now()
WHERE name = 'Mi Familia Adulto';

-- 3. Mamá, Mi Heroína Adulto
UPDATE personalized_models SET
  cover_scene_visual = $cs3${NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} muy cerca, mejilla con mejilla, ambas sonriendo con calidez genuina, en un jardín soleado lleno de flores.

Fondo y Detalles
Jardín frondoso con flores de distintos colores, luz dorada de atardecer filtrándose entre las plantas.

Efectos Mágicos
Un resplandor cálido y dorado envuelve suavemente a ambas, como símbolo de un amor incondicional.

[ILUMINACIÓN Y COLOR]
Luz dorada cálida de atardecer, tonos ámbar y verde suave. Atmósfera íntima, nostálgica y luminosa.$cs3$,
  back_cover_scene = $bc3$Jardín soleado sin personajes, flores de distintos colores, luz dorada de atardecer filtrándose entre las plantas. Un resplandor cálido y dorado cubre generosamente todo el fondo de borde a borde.$bc3$,
  back_cover_tagline = 'Para la mujer que nunca usó capa, pero fue mi heroína.',
  updated_at = now()
WHERE name = 'Mamá, Mi Heroína Adulto';

-- 4. Te Amo, Abuelo Adulto
UPDATE personalized_models SET
  cover_scene_visual = $cs4${NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} caminando juntos por un sendero de jardín al atardecer, uno con un brazo sobre el hombro del otro, ambos riendo con calidez genuina.

Fondo y Detalles
Jardín frondoso con flores y un portón de hierro forjado al fondo, farol encendido junto al camino de piedra.

Efectos Mágicos
Mariposas doradas revoloteando suavemente alrededor de ambos, símbolo de los momentos compartidos que perduran.

[ILUMINACIÓN Y COLOR]
Luz cálida de atardecer dorado, tonos ámbar y verde profundo. Atmósfera nostálgica, cálida y luminosa.$cs4$,
  back_cover_scene = $bc4$Jardín sin personajes, flores y un portón de hierro forjado al fondo, farol encendido junto a un camino de piedra empedrado. Mariposas doradas revoloteando por todo el encuadre, cubriendo el fondo de borde a borde.$bc4$,
  back_cover_tagline = 'Para el abuelo que convirtió cada tarde en magia.',
  updated_at = now()
WHERE name = 'Te Amo, Abuelo Adulto';

-- 5. Te Amo, Abuela Adulto
UPDATE personalized_models SET
  cover_scene_visual = $cs5${NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} sentadas juntas, mejilla con mejilla, sonriendo con calidez genuina, en una terraza rústica campestre al atardecer.

Fondo y Detalles
Fachada cálida de casa de campo con ventana verde, macetas con flores rosadas, cielo dorado de atardecer al fondo.

Efectos Mágicos
Un resplandor suave y rosado envuelve a ambas, como símbolo de la ternura que las une.

[ILUMINACIÓN Y COLOR]
Luz cálida y rosada de atardecer, tonos coral y dorado suave. Atmósfera íntima, tierna y luminosa.$cs5$,
  back_cover_scene = $bc5$Terraza rústica campestre sin personajes, fachada cálida de casa de campo con ventana verde, macetas con flores rosadas, cielo dorado de atardecer. Un resplandor suave y rosado cubre todo el fondo de borde a borde.$bc5$,
  back_cover_tagline = 'Para la abuela que hizo de su casa, mi refugio.',
  updated_at = now()
WHERE name = 'Te Amo, Abuela Adulto';

-- 6. Siempre en mi Corazón Abuelo Adulto (memorial, presencia etérea)
UPDATE personalized_models SET
  cover_scene_visual = $cs6$ÚNICAMENTE dos personas en la escena: {NOMBRE_DEDICANTE}, sentado y sólido, en una terraza soleada rodeada de flores blancas; y la presencia etérea y translúcida de {NOMBRE_DESTINATARIO} apareciendo UNA SOLA VEZ, acompañándolo con calidez. Nunca una versión sólida adicional ni una tercera figura de {NOMBRE_DESTINATARIO}.

Fondo y Detalles
Terraza con flores blancas y plantas frondosas, luz cálida de atardecer filtrándose entre las hojas.

Efectos Mágicos
Rayos de luz dorada cálida irradian suavemente desde la presencia etérea del abuelo, como un resplandor de luz guía que envuelve a ambos con un aire mágico y luminoso.

[ILUMINACIÓN Y COLOR]
Luz cálida de atardecer, tonos dorados y verdes suaves. Atmósfera serena, nostálgica y luminosa.$cs6$,
  back_cover_scene = $bc6$Terraza con flores blancas y plantas frondosas sin personajes, luz cálida de atardecer filtrándose entre las hojas. Un resplandor dorado suave cubre generosamente todo el fondo de borde a borde.$bc6$,
  back_cover_tagline = 'Tu ejemplo sigue guiando cada página de mi vida.',
  updated_at = now()
WHERE name = 'Siempre en mi Corazón Abuelo Adulto';

-- 7. Siempre en mi Corazón Abuela Adulto (memorial, presencia etérea)
UPDATE personalized_models SET
  cover_scene_visual = $cs7$ÚNICAMENTE dos personas en la escena: {NOMBRE_DEDICANTE}, sentada y sólida, en un patio luminoso con flores lilas y velas encendidas; y la presencia etérea y translúcida de {NOMBRE_DESTINATARIO} apareciendo UNA SOLA VEZ, acompañándola con calidez. Nunca una versión sólida adicional ni una tercera figura de {NOMBRE_DESTINATARIO}.

Fondo y Detalles
Patio con flores lilas, velas encendidas y plantas frondosas, luz cálida de atardecer.

Efectos Mágicos
Rayos de luz suave en tonos lavanda y dorado irradian desde la presencia etérea de la abuela, como un resplandor de luz guía que envuelve a ambas con un aire mágico y luminoso.

[ILUMINACIÓN Y COLOR]
Luz cálida de atardecer, tonos lavanda y dorado suave. Atmósfera serena, nostálgica y luminosa.$cs7$,
  back_cover_scene = $bc7$Patio con flores lilas y velas encendidas sin personajes, plantas frondosas, luz cálida de atardecer. Un resplandor suave en tonos lavanda cubre todo el fondo de borde a borde.$bc7$,
  back_cover_tagline = 'Tu amor quedó para siempre entre estas páginas.',
  updated_at = now()
WHERE name = 'Siempre en mi Corazón Abuela Adulto';

-- 8. Mi Ángel Guardián Padre Adulto (memorial, presencia etérea)
UPDATE personalized_models SET
  cover_scene_visual = $cs8${NOMBRE_DEDICANTE} camina por un sendero de montaña al anochecer, con una brújula en la mano, mientras la presencia etérea y translúcida de {NOMBRE_DESTINATARIO} lo guía desde el sendero iluminado hacia la cima.

Fondo y Detalles
Montaña nocturna con un sendero de luces cálidas ascendiendo hacia la cima, cielo estrellado.

Efectos Mágicos
Un resplandor dorado suave envuelve la figura etérea del padre, como una luz que guía el camino.

[ILUMINACIÓN Y COLOR]
Luz nocturna fría con destellos cálidos dorados en el sendero. Atmósfera íntima, esperanzadora y luminosa.$cs8$,
  back_cover_scene = $bc8$Montaña nocturna sin personajes, con un sendero de luces cálidas ascendiendo hacia la cima, cielo estrellado. Un resplandor dorado suave recorre el sendero, cubriendo el fondo de borde a borde.$bc8$,
  back_cover_tagline = 'Tu brújula sigue marcando mi camino.',
  updated_at = now()
WHERE name = 'Mi Ángel Guardián Padre Adulto';

-- 9. Mi Ángel Guardián Madre Adulto (memorial, presencia etérea — "única vez"
-- explícito porque la IA duplicaba a la madre sin esta aclaración)
UPDATE personalized_models SET
  cover_scene_visual = $cs9$ÚNICAMENTE dos personas en la escena: {NOMBRE_DEDICANTE}, sentada y sólida, en un patio soleado con un arco de piedra; y la presencia etérea y translúcida de {NOMBRE_DESTINATARIO} apareciendo UNA SOLA VEZ, entre la luz cálida de la ventana. Nunca una versión sólida adicional ni una tercera figura de {NOMBRE_DESTINATARIO} — en total son solo dos personas en la imagen.

Fondo y Detalles
Patio con arco de piedra, flores y una ventana luminosa al fondo, luz cálida de atardecer.

Efectos Mágicos
Rayos de luz dorada cálida irradian suavemente desde la presencia etérea de la madre, como un resplandor de luz guía que envuelve a ambas con un aire mágico y luminoso.

[ILUMINACIÓN Y COLOR]
Luz cálida de atardecer, tonos dorados y rosados suaves. Atmósfera serena, cálida y luminosa.$cs9$,
  back_cover_scene = $bc9$Patio con arco de piedra sin personajes, flores y una ventana luminosa al fondo, luz cálida de atardecer. Un resplandor suave y dorado cubre todo el fondo de borde a borde.$bc9$,
  back_cover_tagline = 'Tu voz todavía me acompaña en cada paso.',
  updated_at = now()
WHERE name = 'Mi Ángel Guardián Madre Adulto';

-- 10. Siempre Serás Parte de Mí Adulto (hermanos, memorial — SIN presencia
-- etérea: ambos vivos en escena, solo el recordado lleva contorno de luz.
-- Instrucción explícita de no mirarse cara a cara: se leía como pareja sin
-- esto, mismo bug que ya existía en otros libros de memorial.)
UPDATE personalized_models SET
  cover_scene_visual = $cs10${NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} sentados juntos en un patio nocturno con luces cálidas colgantes, ambos mirando hacia adelante con sonrisas cómplices — NUNCA mirándose fijamente cara a cara como una pareja: es un vínculo fraternal entre hermanos, no romántico. Rodeados de plantas y una vela encendida.

Fondo y Detalles
Patio nocturno con luces cálidas colgantes, plantas y una fachada cálida al fondo.

Efectos Mágicos
Un resplandor dorado brillante contornea ÚNICAMENTE a {NOMBRE_DESTINATARIO}, como una luz cálida que nunca se apaga. {NOMBRE_DEDICANTE} NO tiene ningún resplandor ni contorno de luz — luce completamente natural, sin efectos.

[ILUMINACIÓN Y COLOR]
Luz cálida nocturna, tonos dorados y azules profundos. Atmósfera íntima, cómplice y nostálgica.$cs10$,
  back_cover_scene = $bc10$Patio nocturno con luces cálidas colgantes sin personajes, plantas y una fachada cálida al fondo. Un resplandor dorado suave cubre generosamente todo el fondo de borde a borde.$bc10$,
  back_cover_tagline = 'Lo que fuimos de niños, sigue vivo entre nosotros.',
  updated_at = now()
WHERE name = 'Siempre Serás Parte de Mí Adulto';

-- 11. Aventura Entre Patas Adulto (mascota + dueños — sin raza/color fijo a
-- propósito, ver nota arriba; composición aprobada, matching de identidad de
-- mascota real pendiente de validar)
UPDATE personalized_models SET
  cover_scene_visual = $cs11${NOMBRE_DESTINATARIO} en el centro de la escena, con los dueños adultos sentados a ambos lados en un mirador de montaña al atardecer, con mochilas de trekking, mirándose con complicidad y alegría.

Fondo y Detalles
Mirador de montaña con un lago y pinos de fondo, luz dorada de atardecer.

Efectos Mágicos
Un resplandor cálido dorado envuelve a los tres, como símbolo de la aventura compartida.

[ILUMINACIÓN Y COLOR]
Luz cálida de atardecer, tonos dorados y verdes profundos. Atmósfera aventurera, cálida y luminosa.$cs11$,
  back_cover_scene = $bc11$Mirador de montaña sin personajes, con un lago y pinos de fondo, luz dorada de atardecer. Un resplandor cálido dorado cubre todo el fondo de borde a borde.$bc11$,
  back_cover_tagline = 'La mejor compañía no necesita palabras.',
  updated_at = now()
WHERE name = 'Aventura Entre Patas Adulto';
