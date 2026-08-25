-- "Te amo, abuelo" — agrega la versión nieta→abuelo (hoy solo existía
-- nieto→abuelo). Mismo patrón que "Papá, Mi Héroe"/"Mamá, Mi Heroína":
-- backfillea gender_direction en las 20 filas nieto existentes (hoy NULL) e
-- inserta las 20 filas nuevas nieta→abuelo. Contenido derivado mecánicamente
-- del contenido real de producción (nieto->nieta con artículo correcto,
-- pequeño->pequeña, protegido->protegida, emocionado->emocionada,
-- fascinado->fascinada, envuelto->envuelta; "dragón pequeño" en la
-- Plantilla 13 se preserva sin cambios, no describe al nieto/a).
UPDATE personalized_templates SET
  name = CASE WHEN name LIKE '% De Nieto a Abuelo' THEN name ELSE name || ' De Nieto a Abuelo' END,
  gender_direction = 'HE_TO_HE'
WHERE template_preview_key LIKE 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/%' AND is_active = true;


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'Mi Superhéroe de Canas Plateadas De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_1_Mi_Superhéroe_de_Canas_Plateadas.png',
  'SHE_TO_HE',
  $ta1a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite admiración absoluta y la certeza de que el abuelo es un superhéroe real sin necesidad de poderes.

Ligeramente descentrado en postura heroica, el abuelo, expresión orgullosa y cálida, vestido como superhéroe clásico con traje azul y rojo, capa ondeando, brazos cruzados. Junto a él mirándolo con admiración absoluta, su nieta, ojos brillantes y sonrisa enorme.$ta1a$,
  $ta1b$Ciudad estilizada con edificios, cielo azul brillante con nubes, rayos de sol dorados iluminando a el abuelo.$ta1b$,
  $ta1c$Un destello heroico rodea a el abuelo y estrellas doradas flotan suavemente. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$ta1c$,
  $ta1d$Iluminación de cómic épico pero cálido, cielo azul brillante con rayos dorados. Atmósfera heroica, inspiradora y llena de amor.$ta1d$,
  $ta1e$No necesitas capa ni poderes de ficción,
Eres mi superhéroe con tu sabiduría y corazón.
Tus canas son de plata, tu fuerza es real,
{APODO_DESTINATARIO}, contigo todo mal se vuelve bien al final.

Salvas mis días con tu risa y tu calma,
Eres el guardián que protege mi alma.
No hay villano que pueda contra tu amor,
Mi superhéroe eterno, mi gran protector.$ta1e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_1_Mi_Superhéroe_de_Canas_Plateadas.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'El Rey de Mi Corazón De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_2_El_Rey_de_Mi_Corazón.png',
  'SHE_TO_HE',
  $ta2a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad y respeto reverente hacia el abuelo rey del hogar.

Ligeramente descentrado sentado en un trono elegante, el abuelo, expresión noble y cálida, vestido con túnica real en tonos dorados y púrpuras, corona brillante, cetro en una mano. Junto al trono, su nieta, expresión de amor y respeto, mirándolo con admiración.$ta2a$,
  $ta2b$Salón de castillo con columnas, cortinas de terciopelo, ventanas con luz dorada entrando, tapices en las paredes.$ta2b$,
  $ta2c$Luz celestial ilumina a el abuelo y destellos dorados brillan alrededor de la corona. La magia debe sentirse majestuosa y completamente integrada dentro de una fotografía realista.$ta2c$,
  $ta2d$Iluminación cálida con luz dorada entrando por las ventanas. Atmósfera majestuosa, noble y llena de amor.$ta2d$,
  $ta2e$Con corona de oro y trono de amor,
Eres el rey que gobierna mi corazón con honor.
No necesitas castillo ni ejército leal,
Tu reino es mi vida, tu poder es ancestral.

Me enseñas a ser fuerte, noble y valiente,
{APODO_DESTINATARIO}, eres mi rey, mi guía permanente.
En tu reino de abrazos siempre hay paz,
Mi rey del corazón, mi hogar, mi faz.$ta2e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_2_El_Rey_de_Mi_Corazón.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'Mi Caballero de Armadura Dorada De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_3_Mi_Caballero_de_Armadura_Dorada.png',
  'SHE_TO_HE',
  $ta3a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite lealtad protectora y el asombro de una nieta ante su caballero.

Ligeramente descentrado en postura protectora, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión noble y valiente, con armadura dorada brillante completa, casco bajo el brazo, espada noble en la mano. Junto a él tocando suavemente la armadura, su nieta, expresión de asombro y admiración.$ta3a$,
  $ta3b$Campo de batalla épico al atardecer, colinas verdes, cielo con tonos naranjas y dorados, banderas ondeando a lo lejos.$ta3b$,
  $ta3c$La luz dorada se refleja en la armadura con destellos heroicos sutiles. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$ta3c$,
  $ta3d$Iluminación de atardecer épico con tonos naranjas y dorados. Atmósfera épica, protectora y cálida.$ta3d$,
  $ta3e$Con armadura brillante y espada de verdad,
Eres mi caballero que lucha con lealtad.
Defiendes mis sueños, proteges mi camino,
{APODO_DESTINATARIO} valiente, mi héroe y mi destino.

En batallas de vida siempre estás ahí,
Tu honor y tu fuerza me inspiran a mí.
Caballero dorado de corazón sin igual,
Contigo a mi lado, nada puede salir mal.$ta3e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_3_Mi_Caballero_de_Armadura_Dorada.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'El Ángel Guardián de la Familia De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_4_El_Ángel_Guardián_de_la_Familia.png',
  'SHE_TO_HE',
  $ta4a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz celestial y la certeza de estar protegida desde el cielo del amor del abuelo.

Ligeramente descentrado flotando suavemente, el abuelo, expresión serena y protectora, con grandes alas de ángel blancas y doradas, túnica blanca suave. Debajo mirando hacia arriba con asombro, su nieta, expresión de paz, brazos extendidos.$ta4a$,
  $ta4b$Cielo celestial con nubes blancas y doradas, rayos de luz divina atravesando, estrellas brillantes dispersas.$ta4b$,
  $ta4c$Un halo dorado suave brilla sobre la cabeza del abuelo y plumas flotan suavemente. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$ta4c$,
  $ta4d$Iluminación celestial suave con tonos dorados y blancos. Atmósfera serena, protectora y de paz.$ta4d$,
  $ta4e$Con alas invisibles que siempre me cuidan,
Eres mi ángel guardián, mis pasos tú guías.
Desde el cielo de tu amor me proteges sin cesar,
{APODO_DESTINATARIO} celestial, mi guía estelar.

Tu luz me ilumina cuando hay oscuridad,
Tu voz me calma con pura serenidad.
Ángel de mi vida, guardián eternal,
Contigo a mi lado, todo es celestial.$ta4e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_4_El_Ángel_Guardián_de_la_Familia.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'Capitán de Mil Aventuras De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_5_Capitán_de_Mil_Aventuras.png',
  'SHE_TO_HE',
  $ta5a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite espíritu aventurero y la emoción compartida de explorar mundos de historias.

Ligeramente descentrado en la proa de un barco de madera elegante, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión determinada, vestido de capitán con chaqueta naval azul y botones dorados, catalejo en mano. Junto a él señalando emocionada hacia el horizonte, su nieta, expresión aventurera, con ropa de marinero.$ta5a$,
  $ta5b$Océano azul brillante con olas suaves, gaviotas volando, isla tropical visible a lo lejos.$ta5b$,
  $ta5c$El viento mueve la ropa y la luz del sol brilla suavemente sobre el agua. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$ta5c$,
  $ta5d$Iluminación náutica brillante con reflejos dorados en el agua. Atmósfera aventurera, emocionante y de complicidad.$ta5d$,
  $ta5e$Con timón en mano y brújula de experiencia,
Eres el capitán que navega con paciencia.
Me llevas a mares de historias sin fin,
{APODO_DESTINATARIO} aventurero, mi guía, mi fortín.

Juntos exploramos mundos de imaginación,
Tu barco es de sueños, tu vela es pasión.
Capitán de mi vida, navegante sin igual,
Contigo cada día es una aventura especial.$ta5e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_5_Capitán_de_Mil_Aventuras.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'El Sabio de Todas las Historias De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_6_El_Sabio_de_Todas_las_Historias.png',
  'SHE_TO_HE',
  $ta6a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sabiduría ancestral y la fascinación de escuchar historias que guardan tesoros de vida.

Ligeramente descentrado sentado en una silla de madera antigua, el abuelo, expresión sabia y cálida, vestido como sabio anciano con túnica en tonos tierra, bastón tallado con símbolos místicos. Sentado en el suelo escuchando atentamente, su nieta, ojos llenos de fascinación.$ta6a$,
  $ta6b$Biblioteca mágica con estanterías infinitas, libros antiguos flotantes, pergaminos brillantes, velas flotantes.$ta6b$,
  $ta6c$Símbolos místicos brillan suavemente en el aire cerca de los libros flotantes. La magia debe sentirse sabia y completamente integrada dentro de una fotografía realista.$ta6c$,
  $ta6d$Iluminación dorada suave de biblioteca mágica con polvo de estrellas en el aire. Atmósfera sabia, mística y de conocimiento.$ta6d$,
  $ta6e$Con barba de sabio y ojos de experiencia,
Guardas mil historias con tu paciencia.
Cada cuento tuyo es una lección de vida,
{APODO_DESTINATARIO} maestro, tu sabiduría es mi guía querida.

Me enseñas del mundo con tus palabras de oro,
Eres la biblioteca viviente que más adoro.
Sabio de mi corazón, maestro sin igual,
Tus historias son tesoros, tu conocimiento ancestral.$ta6e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_6_El_Sabio_de_Todas_las_Historias.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'Mi Guerrero Invencible De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_7_Mi_Guerrero_Invencible.png',
  'SHE_TO_HE',
  $ta7a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza victoriosa y la determinación de nunca rendirse.

Ligeramente descentrado en postura de batalla victoriosa, el abuelo, expresión heroica, con armadura de cuero y metal, casco con plumas, escudo con emblema familiar, espada en mano. A su lado imitando su postura con determinación, su nieta, expresión valiente, con armadura a juego.$ta7a$,
  $ta7b$Campo de batalla al amanecer, montañas al fondo, cielo con nubes dramáticas pero luz esperanzadora.$ta7b$,
  $ta7c$Una luz heroica ilumina a el abuelo y destellos brillan en las armas. La magia debe sentirse victoriosa y completamente integrada dentro de una fotografía realista.$ta7c$,
  $ta7d$Iluminación de amanecer con nubes dramáticas y luz esperanzadora. Atmósfera épica, heroica y determinada.$ta7d$,
  $ta7e$Con escudo de amor y espada de valor,
Eres mi guerrero, mi eterno luchador.
Has vencido batallas que yo nunca vi,
{APODO_DESTINATARIO} valiente, eres mi héroe aquí.

Tu fuerza me inspira a nunca rendirme,
Tu coraje me enseña a siempre seguir firme.
Guerrero invencible de corazón leal,
Contigo a mi lado, puedo enfrentar cualquier mal.$ta7e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_7_Mi_Guerrero_Invencible.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'El Arquitecto de Mis Recuerdos De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_8_El_Arquitecto_de_Mis_Recuerdos.png',
  'SHE_TO_HE',
  $ta8a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite creación amorosa: el abuelo construyendo memorias que forman el corazón de su nieta.

Ligeramente descentrado frente a una estructura mágica de recuerdos, el abuelo, expresión creativa y amorosa, vestido como arquitecto clásico con planos enrollados en mano. Junto a él colocando un bloque brillante, su nieta, sonrisa feliz.$ta8a$,
  $ta8b$Espacio mágico con planos flotantes, herramientas brillantes, estructura de recuerdos con fotos flotantes y bloques de luz dorada.$ta8b$,
  $ta8c$Luz dorada emana de los recuerdos y partículas brillantes flotan alrededor. La magia debe sentirse creativa y completamente integrada dentro de una fotografía realista.$ta8c$,
  $ta8d$Iluminación dorada mágica de creación. Atmósfera creativa, constructiva y llena de amor.$ta8d$,
  $ta8e$Con tus manos construyes memorias de amor,
Eres el arquitecto de mi vida, mi creador.
Cada momento contigo es un ladrillo especial,
{APODO_DESTINATARIO} constructor, edificas mi hogar emocional.

Diseñas mi futuro con tus enseñanzas sabias,
Construyes mi carácter con tus palabras diarias.
Arquitecto del alma, maestro de la vida,
Tu obra maestra soy yo, tu creación querida.$ta8e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_8_El_Arquitecto_de_Mis_Recuerdos.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'Mi Titán de Amor De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_9_Mi_Titán_de_Amor.png',
  'SHE_TO_HE',
  $ta9a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite poder monumental y la seguridad absoluta de una nieta sostenida con ternura por su titán.

Ligeramente descentrado en escala imponente, el abuelo, expresión benevolente, representado como titán gigante con vestimenta mitológica en tonos tierra y dorado, sosteniendo suavemente en su mano a su nieta, expresión de confianza sin miedo.$ta9a$,
  $ta9b$Paisaje épico con montañas enormes, cielo dramático con nubes, valle verde abajo.$ta9b$,
  $ta9c$Luz divina ilumina al titán creando un contraste de tamaño dramático pero tierno. La magia debe sentirse poderosa y completamente integrada dentro de una fotografía realista.$ta9c$,
  $ta9d$Iluminación épica con rayos de sol atravesando nubes dramáticas. Atmósfera poderosa, protectora y llena de amor incondicional.$ta9d$,
  $ta9e$Grande como montaña, fuerte como el mar,
Eres mi titán, mi gigante sin par.
Tu amor es inmenso, tu fuerza colosal,
{APODO_DESTINATARIO} poderoso, mi protector celestial.

Cargas el mundo en tus hombros con gracia,
Y aún así me levantas con tu abrazo y tu audacia.
Titán de mi vida, gigante de bondad,
Tu grandeza es tu amor, tu fuerza es tu lealtad.$ta9e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_9_Mi_Titán_de_Amor.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'El Guardián del Tiempo De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_10_El_Guardián_del_Tiempo.png',
  'SHE_TO_HE',
  $ta10a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite conexión generacional, como si el abuelo fuera el puente entre el pasado y el futuro de la familia.

Ligeramente descentrado en un espacio dimensional donde las épocas se mezclan, el abuelo, expresión mística, vestido con túnica de símbolos de relojes y engranajes, reloj de bolsillo antiguo brillante en mano. Junto a él tocando el reloj fascinada, su nieta, expresión de asombro.$ta10a$,
  $ta10b$Espacio mágico con relojes flotantes de diferentes épocas, engranajes dorados girando, portales de tiempo mostrando momentos familiares.$ta10b$,
  $ta10c$Partículas de tiempo flotan y luz dorada y azul emana del reloj antiguo. La magia debe sentirse atemporal y completamente integrada dentro de una fotografía realista.$ta10c$,
  $ta10d$Iluminación mística dorada y azul del espacio temporal. Atmósfera mística, atemporal y de conexión generacional.$ta10d$,
  $ta10e$Guardas en tu corazón años de historias,
Eres el guardián del tiempo y sus memorias.
Viajas entre épocas con tu sabiduría ancestral,
{APODO_DESTINATARIO} eterno, mi puente temporal.

Me conectas con el pasado de nuestra familia,
Me guías al futuro con tu luz que brilla.
Guardián del tiempo, maestro de las eras,
Contigo el tiempo es amor, no solo lo que esperas.$ta10e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_10_El_Guardián_del_Tiempo.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'Mi Faro en la Tormenta De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_11_Mi_Faro_en_la_Tormenta.png',
  'SHE_TO_HE',
  $ta11a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite guía segura en medio de la tormenta, con el abuelo como luz que nunca se apaga.

Ligeramente descentrado de pie junto a un faro majestuoso, el abuelo, expresión protectora, con una luz brillante emanando del faro detrás de él. A su lado en un barquito seguro, su nieta, expresión de alivio mirándolo con confianza.$ta11a$,
  $ta11b$Océano con olas grandes pero controladas, cielo nocturno con nubes dramáticas pero estrellas visibles, costa rocosa.$ta11b$,
  $ta11c$Un haz de luz poderoso del faro atraviesa la tormenta guiando el camino. La magia debe sentirse protectora y completamente integrada dentro de una fotografía realista.$ta11c$,
  $ta11d$Iluminación dramática nocturna con el haz de luz del faro como fuente principal. Atmósfera dramática pero esperanzadora, protectora.$ta11d$,
  $ta11e$Cuando la vida se vuelve oscura y fría,
Eres mi faro, mi luz, mi guía.
Tu amor ilumina mi camino sin cesar,
{APODO_DESTINATARIO} luminoso, mi estrella polar.

En las tormentas más fuertes siempre estás,
Tu luz me dice "no temas, aquí estás".
Faro de mi vida, guardián del mar,
Contigo nunca me puedo perder o naufragar.$ta11e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_11_Mi_Faro_en_la_Tormenta.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'El Gigante de Corazón Tierno De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_12_El_Gigante_de_Corazón_Tierno.png',
  'SHE_TO_HE',
  $ta12a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura pura: un gigante amable que ama sin reservas.

Ligeramente descentrado arrodillado para estar a la altura de su nieta, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión dulce, representado como gigante amable de vestimenta simple en tonos tierra, abrazando suavemente con sus manos grandes. Su nieta, sonrisa sin miedo, sintiendo amor puro en el abrazo.$ta12a$,
  $ta12b$Jardín mágico con flores gigantes, árboles enormes, mariposas grandes volando.$ta12b$,
  $ta12c$Pétalos flotan suavemente mientras una luz cálida envuelve el abrazo. La magia debe sentirse tierna y completamente integrada dentro de una fotografía realista.$ta12c$,
  $ta12d$Luz suave de atardecer envolviendo el jardín mágico. Atmósfera tierna, protectora y de amor gentil.$ta12d$,
  $ta12e$Grande en estatura, gigante en bondad,
Eres el coloso de pura ternura y lealtad.
Tus manos enormes me abrazan con amor,
{APODO_DESTINATARIO} gentil, mi gigante protector.

Fuerte por fuera, suave por dentro,
Tu corazón tierno es mi mejor aliento.
Gigante de amor, titán de dulzura,
Contigo me siento en completa segura.$ta12e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_12_El_Gigante_de_Corazón_Tierno.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'Tus Historias Mágicas De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_13_Tus_Historias_Mágicas.png',
  'SHE_TO_HE',
  $ta13a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el hechizo cotidiano de un cuento contado con el corazón.

Ligeramente descentrado en una mecedora acogedora junto a la chimenea, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión animada, con un libro grande abierto en su regazo, contando una historia con gestos expresivos. Sentado a sus pies en el suelo con pijama, su nieta, ojos llenos de asombro.$ta13a$,
  $ta13b$Sala acogedora con luz cálida de chimenea, estantes con libros, ventana mostrando noche estrellada.$ta13b$,
  $ta13c$Elementos de la historia cobran vida sutilmente: un dragón pequeño translúcido y un castillo brillante flotan cerca del libro. La magia debe sentirse acogedora y completamente integrada dentro de una fotografía realista.$ta13c$,
  $ta13d$Luz dorada cálida de la chimenea. Atmósfera mágica, acogedora y llena de imaginación.$ta13d$,
  $ta13e$Cuando cuentas historias el mundo se detiene,
Cada palabra tuya un hechizo que me entretiene.
Tus cuentos son ventanas a mundos sin fin,
{APODO_DESTINATARIO} narrador, mi mago del confín.

Dragones y héroes cobran vida en tu voz,
Me llevas a lugares mágicos, atroz.
Contador de historias, mago de la palabra,
Cada cuento tuyo mi corazón lo labra.$ta13e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_13_Tus_Historias_Mágicas.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'Aventuras en Tu Jardín De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_14_Aventuras_en_Tu_Jardín.png',
  'SHE_TO_HE',
  $ta14a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite conexión con la naturaleza y la paciencia de aprender juntos a cultivar vida.

Ligeramente descentrados arrodillados junto a un cantero de flores, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión paciente, señalando algo con amor mientras planta. Junto a él con tierra en las manos, su nieta, expresión de curiosidad y alegría, plantando con una herramienta pequeña.$ta14a$,
  $ta14b$Jardín exuberante con flores de todos los colores, mariposas volando, regadera vintage, árboles frutales.$ta14b$,
  $ta14c$Partículas de polen brillan suavemente bajo la luz del sol. La magia debe sentirse pacífica y completamente integrada dentro de una fotografía realista.$ta14c$,
  $ta14d$Luz dorada del sol filtrándose entre las flores. Atmósfera pacífica, educativa y conectada con la naturaleza.$ta14d$,
  $ta14e$Tu jardín es un reino de exploración,
Cada planta, cada flor, una nueva lección.
Me enseñas los secretos de la tierra y el sol,
{APODO_DESTINATARIO} jardinero, mi maestro español.

Juntos plantamos semillas de amor y paciencia,
Vemos crecer la vida con tu sabia presencia.
Aventurero del jardín, guardián de la naturaleza,
Contigo cada día florece con belleza.$ta14e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_14_Aventuras_en_Tu_Jardín.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'Las Lecciones Que Solo Tú Me Das De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_15_Las_Lecciones_Que_Solo_Tú_Me_Das.png',
  'SHE_TO_HE',
  $ta15a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sabiduría transmitida con amor bajo un árbol sereno.

Ligeramente descentrados sentados en un banco de madera bajo un árbol grande, el abuelo, expresión sabia y amorosa, señalando algo importante con gesto sabio. Junto a él escuchando atentamente, su nieta, expresión de comprensión y admiración.$ta15a$,
  $ta15b$Parque tranquilo al atardecer, sendero de piedra, luz dorada filtrándose entre las hojas.$ta15b$,
  $ta15c$Pequeñas símbolos brillantes de lecciones de vida (un corazón, manos unidas) flotan suavemente entre ambos. La magia debe sentirse sabia y completamente integrada dentro de una fotografía realista.$ta15c$,
  $ta15d$Luz cálida de atardecer filtrándose entre las hojas. Atmósfera sabia, educativa y de transmisión de valores.$ta15d$,
  $ta15e$No están en libros ni en escuelas formales,
Tus lecciones son de vida, profundas y ancestrales.
Me enseñas con ejemplo, con amor y paciencia,
{APODO_DESTINATARIO} maestro, mi fuente de sapiencia.

Cada momento contigo es una clase especial,
Aprendo a ser mejor, a vivir sin mal.
Maestro de la vida, profesor del corazón,
Tus lecciones son tesoros, mi mejor educación.$ta15e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_15_Las_Lecciones_Que_Solo_Tú_Me_Das.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'Nuestros Secretos Compartidos De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_16_Nuestros_Secretos_Compartidos.png',
  'SHE_TO_HE',
  $ta16a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad íntima y la confianza absoluta de un secreto compartido.

Ligeramente descentrados muy cerca en un sofá acogedor, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión cómplice, inclinándose para susurrar algo al oído de su nieta con sonrisa traviesa. Su nieta, ojos brillantes, escuchando con sonrisa de complicidad.$ta16a$,
  $ta16b$Sala cálida con luz suave, ventana mostrando atardecer, cojines cómodos.$ta16b$,
  $ta16c$Pequeñas estrellas brillantes flotan alrededor simbolizando el secreto compartido. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$ta16c$,
  $ta16d$Luz dorada suave de atardecer entrando por la ventana. Atmósfera cómplice, íntima y llena de confianza.$ta16d$,
  $ta16e$Tenemos secretos que nadie más sabe,
Complicidad única, conexión que no cabe.
Eres mi confidente, mi amigo leal,
{APODO_DESTINATARIO} cómplice, mi tesoro especial.

Guardas mis secretos con amor y cuidado,
Yo guardo los tuyos, nuestro pacto sagrado.
Cómplices eternos, amigos del alma,
Nuestros secretos son lazos que nada desarma.$ta16e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_16_Nuestros_Secretos_Compartidos.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'Cuando Me Haces Reír De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_17_Cuando_Me_Haces_Reír.png',
  'SHE_TO_HE',
  $ta17a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría contagiosa y una carcajada compartida sin límites.

Ligeramente descentrados en medio de una carcajada genuina, el abuelo, con la edad y apariencia reales de su foto de referencia, con los ojos entrecerrados por la risa genuina y una sonrisa amplia. Junto a él sosteniéndose el estómago de tanto reír, su nieta, expresión de risa desbordante.$ta17a$,
  $ta17b$Espacio alegre y colorido tipo jardín o cocina, luz brillante y cálida, elementos cotidianos de un momento espontáneo.$ta17b$,
  $ta17c$Pequeñas símbolos de risa (notas musicales, estrellas) flotan alrededor con un brillo dorado sutil. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$ta17c$,
  $ta17d$Luz brillante y cálida de un momento espontáneo. Atmósfera alegre, divertida y llena de risa.$ta17d$,
  $ta17e$Tus chistes y bromas iluminan mi día,
Tu risa contagiosa es pura alegría.
Me haces reír hasta que me duele el costado,
{APODO_DESTINATARIO} divertido, mi comediante amado.

Con tus ocurrencias el mundo es mejor,
Tu humor es medicina, tu risa es amor.
Payaso de mi vida, mago de la risa,
Contigo cada momento es una sonrisa.$ta17e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_17_Cuando_Me_Haces_Reír.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'Tu Abrazo Que Todo lo Arregla De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_18_Tu_Abrazo_Que_Todo_lo_Arregla.png',
  'SHE_TO_HE',
  $ta18a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sanación emocional profunda en un abrazo protector.

Ligeramente descentrado abrazando tiernamente a su nieta, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión de amor incondicional, en un abrazo profundo y protector. Su nieta, ojos cerrados sintiendo paz absoluta, envuelta en el abrazo.$ta18a$,
  $ta18b$Espacio suave y difuminado, interior cálido con luz dorada envolvente.$ta18b$,
  $ta18c$Corazones dorados flotan suavemente y ondas de energía amorosa son visibles alrededor del abrazo. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$ta18c$,
  $ta18d$Luz cálida y dorada envolvente. Atmósfera sanadora, amorosa y llena de consuelo.$ta18d$,
  $ta18e$Cuando estoy triste o el mundo me duele,
Tu abrazo es el remedio que todo lo resuelve.
Tus brazos son refugio, tu pecho es mi hogar,
{APODO_DESTINATARIO} amoroso, mi puerto, mi lugar.

En tu abrazo encuentro paz y consuelo,
Tus brazos son alas que me llevan al cielo.
Sanador del alma, médico del corazón,
Tu abrazo es magia, tu amor es la razón.$ta18e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_18_Tu_Abrazo_Que_Todo_lo_Arregla.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'Enseñándome el Mundo De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_19_Enseñándome_el_Mundo.png',
  'SHE_TO_HE',
  $ta19a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite curiosidad compartida y el asombro de descubrir juntos la belleza del mundo.

Ligeramente descentrados caminando por un sendero, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión de descubrimiento, señalando algo maravilloso en la naturaleza. Junto a él mirando hacia donde señala, su nieta, expresión de asombro y curiosidad.$ta19a$,
  $ta19b$Paisaje natural hermoso tipo bosque o campo, luz del sol creando atmósfera mágica, elementos naturales detallados.$ta19b$,
  $ta19c$Un destello de luz brilla suavemente sobre lo que están observando, y partículas brillantes flotan en el aire. La magia debe sentirse inspiradora y completamente integrada dentro de una fotografía realista.$ta19c$,
  $ta19d$Luz natural brillante de día, cálida y clara. Atmósfera exploradora, educativa y llena de asombro.$ta19d$,
  $ta19e$Me muestras el mundo con ojos de asombro,
Cada lugar contigo es un nuevo descombro.
Me enseñas a ver la belleza en lo simple,
{APODO_DESTINATARIO} explorador, mi guía que no se extingue.

Juntos descubrimos maravillas cada día,
Tu curiosidad eterna es mi mejor guía.
Maestro del mundo, explorador sin edad,
Contigo aprendo a vivir con curiosidad.$ta19e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_19_Enseñándome_el_Mundo.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuelo'),
  'Siempre Seré Tu Pequeño De Nieta a Abuelo',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_20_Siempre_Seré_Tu_Pequeña.png',
  'SHE_TO_HE',
  $ta20a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite una promesa eterna: sin importar el paso del tiempo, la nieta siempre será su pequeña.

En la mitad izquierda, ligeramente descentrado, el abuelo, edad actual, sosteniendo con ternura infinita a su nieta pequeña (edad actual del cliente). En la mitad derecha, el mismo abuelo (ligeramente mayor) abrazando a una versión futura de su nieta ya adolescente, con el mismo amor incondicional.$ta20a$,
  $ta20b$Espacio atemporal con elementos que representan el paso del tiempo (reloj suave, estaciones cambiando), un mismo lugar familiar mostrado en dos momentos.$ta20b$,
  $ta20c$Una línea de tiempo visual sutil y partículas de luz dorada conectan ambos momentos. La magia debe sentirse eterna y completamente integrada dentro de una fotografía realista.$ta20c$,
  $ta20d$Luz dorada atemporal con efecto de memoria y futuro. Atmósfera eterna, nostálgica y llena de amor incondicional.$ta20d$,
  $ta20e$No importa cuánto crezca o qué edad tenga yo,
En tus ojos siempre seré tu pequeña, lo sé yo.
Tu amor no cambia con el paso del tiempo,
{APODO_DESTINATARIO} eterno, mi amor, mi aliento.

Puedo ser grande pero en tu corazón,
Siempre seré tu nieta, tu bendición.
Guardián de mi infancia, protector eternal,
Para ti siempre seré tu pequeña especial.$ta20e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas_Nieta/PLANTILLA_20_Siempre_Seré_Tu_Pequeña.png');
