-- "Papá, Mi Héroe" — agrega la versión hijo→papá (hoy solo existía hija→papá).
-- Mismo patrón de doble género ya usado por los libros de Amor (gender_direction
-- + template_preview_key propio), aplicado acá con dedicante variable (hijo/hija)
-- y destinatario fijo (papá). Contenido fuente:
-- PromptsPixelArtPlantillas/Familia/Papá, Mi Héroe/Libro-1-De-Hijo-Para-Papa.md
--
-- Parte 1: backfillea gender_direction en las 20 filas hija existentes (hoy
-- NULL — fileToGender() en seed.ts nunca reconoció el patrón de nombre de
-- archivo de este libro) y les agrega el sufijo " De Hija a Papá" al name
-- para distinguirlas en el admin (derivePrintedTitle() ya sabe recortar este
-- sufijo antes de imprimir el título en la imagen).
UPDATE personalized_templates SET
  name = CASE WHEN name LIKE '% De Hija a Papá' THEN name ELSE name || ' De Hija a Papá' END,
  gender_direction = 'SHE_TO_HE'
WHERE template_preview_key LIKE 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/%' AND is_active = true;

-- Parte 2: las 20 filas nuevas hijo→papá (gender_direction = 'HE_TO_HE').
-- Idempotente vía NOT EXISTS (no hay índice único en template_preview_key).

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Mi Superhéroe Personal De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_1_Mi_Superhéroe_Personal.png',
  'HE_TO_HE',
  $h1a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite admiración pura y la certeza de que un padre puede ser un superhéroe real sin necesidad de poderes.

Ligeramente descentrado en posición heroica elevada, el papá, expresión noble, fuerte y protectora, vistiendo un traje de superhéroe elegante en azul profundo y dorado con detalles plateados, capa larga ondeando dramáticamente, símbolo de corazón brillante en el pecho, postura de poder con puño levantado. Mirando hacia arriba con admiración, su hijo, expresión de asombro y orgullo puro, con ropa casual en tonos azul y gris, cabello moviéndose por el viento, brazos extendidos hacia su papá.$h1a$,
  $h1b$Ciudad moderna al atardecer, edificios altos con ventanas iluminadas, cielo dramático en tonos naranja y púrpura con nubes dinámicas.$h1b$,
  $h1c$Rayos de luz dorada emanan del pecho del papá y partículas brillantes flotan alrededor de ambos. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$h1c$,
  $h1d$Iluminación cinematográfica dramática con rayos de luz dorada atravesando las nubes. Predominan tonos dorados, azul profundo y naranja de atardecer. Atmósfera épica y poderosa.$h1d$,
  $h1e${NOMBRE_DESTINATARIO}, eres mi superhéroe real,
Con poderes que no son de manual.
No necesitas capa ni disfraz,
Tu amor es tu superpoder más.

Me salvas cada día sin saber,
Con tu fuerza me haces crecer.
Eres mi protector y mi verdad,
Mi {APODO_DESTINATARIO}, mi héroe de verdad.$h1e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_1_Mi_Superhéroe_Personal.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Mi Caballero de Armadura Brillante De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_2_Mi_Caballero_de_Armadura_Brillante.png',
  'HE_TO_HE',
  $h2a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite nobleza medieval y la certeza de estar entrenado por el caballero más leal.

Ligeramente descentrado en postura heroica, el papá, expresión noble, valiente y protectora, vistiendo armadura medieval plateada con detalles dorados, capa azul ondeando, espada resplandeciente en posición de descanso noble, escudo con símbolo de corazón. Frente a él como su escudero en entrenamiento, su hijo, expresión de admiración y determinación, con armadura infantil ligera a juego en tonos plateado y azul, sosteniendo una pequeña espada de práctica de madera, mirando a su papá con orgullo.$h2a$,
  $h2b$Castillo majestuoso de piedra gris con torres altas, banderas azules y doradas ondeando, campo verde con flores silvestres, montañas en la distancia.$h2b$,
  $h2c$La armadura del papá brilla con reflejos dorados de luz solar, y pétalos de flores medievales flotan suavemente en el aire. La magia debe sentirse noble y completamente integrada dentro de una fotografía realista.$h2c$,
  $h2d$Iluminación de día medieval dorado con tonos cálidos, sombras suaves. Predominan plateado, dorado y azul real. Atmósfera de nobleza y valentía.$h2d$,
  $h2e${NOMBRE_DESTINATARIO}, eres mi caballero leal,
Con armadura de amor celestial.
Luchas por mí sin descansar,
Tu honor me hace suspirar.

No necesitas espada ni escudo,
Tu corazón es mi refugio agudo.
Eres mi guerrero y mi verdad,
Mi {APODO_DESTINATARIO}, mi caballero de verdad.$h2e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_2_Mi_Caballero_de_Armadura_Brillante.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Mi Rey De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_3_Mi_Rey.png',
  'HE_TO_HE',
  $h3a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad y la certeza de que en el reino del corazón de su hijo, el papá es el rey absoluto.

Ligeramente descentrado sentado en un trono dorado, el papá, expresión noble y cálida, vistiendo túnica real púrpura con bordados dorados, corona con joyas brillantes, cetro dorado en mano. A su lado como príncipe heredero del reino, su hijo, expresión de orgullo y amor, con túnica principesca en azul y dorado, corona pequeña brillante, mano sosteniendo la de su papá.$h3a$,
  $h3b$Salón del trono real con columnas doradas, tapices púrpura y dorado, ventanas arqueadas con vitrales de luz colorida, alfombra roja con detalles dorados.$h3b$,
  $h3c$Luz divina dorada cae desde arriba iluminando el trono. La magia debe sentirse majestuosa y completamente integrada dentro de una fotografía realista.$h3c$,
  $h3d$Iluminación dramática con rayos de luz dorada desde arriba, sombras suaves. Predominan dorado, púrpura profundo y rojo real. Atmósfera de poder noble y amor familiar.$h3d$,
  $h3e${NOMBRE_DESTINATARIO}, eres mi rey absoluto,
Quien gobierna mi corazón en bruto.
Tu reino es mi corazón entero,
Donde tú eres el heredero.

No necesitas trono ni corona,
Tu amor es quien me emociona.
Eres mi monarca y mi verdad,
Mi {APODO_DESTINATARIO}, mi rey de verdad.$h3e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_3_Mi_Rey.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Mi Ángel Guardián De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_4_Mi_Ángel_Guardián.png',
  'HE_TO_HE',
  $h4a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz celestial y la certeza de estar protegido bajo unas alas de amor incondicional.

Ligeramente descentrado con postura protectora celestial, el papá, expresión serena y protectora, vistiendo túnica blanca elegante con detalles dorados, alas de ángel grandes y brillantes extendidas, aureola dorada sutil sobre su cabeza. Protegido frente a él, su hijo, expresión de paz y seguridad total, con túnica infantil en tonos pastel celeste, manos juntas en gesto de gratitud, mirando a su papá ángel.$h4a$,
  $h4b$Cielo divino en tonos azul suave, blanco puro y dorado celestial, nubes esponjosas flotando, rayos de luz divina atravesando las nubes.$h4b$,
  $h4c$Plumas blancas flotan suavemente en el aire junto con partículas de luz dorada. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$h4c$,
  $h4d$Iluminación celestial suave con tonos dorados y blancos, sombras delicadas. Atmósfera de paz y amor divino.$h4d$,
  $h4e${NOMBRE_DESTINATARIO}, eres mi ángel guardián,
Quien cuida de mí sin afán.
Tus alas me protegen del mal,
Tu luz es mi guía celestial.

No necesitas cielo ni altar,
Tu amor me hace volar.
Eres mi protector divino y real,
Mi {APODO_DESTINATARIO}, mi ángel celestial.$h4e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_4_Mi_Ángel_Guardián.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Mi Pirata Aventurero De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_5_Mi_Pirata_Aventurero.png',
  'HE_TO_HE',
  $h5a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite aventura y la complicidad de navegar la vida junto al capitán más valiente.

Ligeramente descentrado en el timón, el papá, expresión aventurera y carismática, vistiendo traje de pirata elegante con chaleco de cuero y sombrero tricornio con pluma, brújula dorada en mano. Sobre sus hombros como su primer oficial, su hijo, expresión emocionada y feliz, con pañuelo pirata en la cabeza, catalejo en mano, mirando al horizonte.$h5a$,
  $h5b$Océano turquesa con olas dinámicas, barco pirata de madera con velas desplegadas y bandera con símbolo de corazón, cielo de atardecer con nubes naranjas y púrpuras, isla tropical en la distancia.$h5b$,
  $h5c$El cofre del tesoro cercano brilla con destellos dorados de monedas y joyas. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$h5c$,
  $h5d$Iluminación de atardecer cálido con tonos dorados y naranjas, sombras dinámicas. Atmósfera de aventura épica y complicidad padre e hijo.$h5d$,
  $h5e${NOMBRE_DESTINATARIO}, eres mi pirata valiente,
Quien navega mi corazón de frente.
Tu aventura es mi emoción,
Tu brújula marca mi dirección.

No necesitas barco ni tesoro,
Tu amor es mi mayor decoro.
Eres mi aventurero y mi verdad,
Mi {APODO_DESTINATARIO}, mi pirata de verdad.$h5e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_5_Mi_Pirata_Aventurero.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Mi Guerrero Protector De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_6_Mi_Guerrero_Protector.png',
  'HE_TO_HE',
  $h6a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza protectora y la victoria silenciosa de un padre que lucha con amor.

Ligeramente descentrado en postura victoriosa, el papá, expresión fuerte pero amorosa, vistiendo armadura de guerrero en bronce y negro, capa roja ondeando, escudo con símbolo de corazón, espada en alto. Protegido junto a él, su hijo, expresión de admiración y seguridad, con ropa clara sencilla, mano tocando el escudo de su papá.$h6a$,
  $h6b$Campo victorioso al atardecer, colinas verdes, cielo dramático en tonos naranja y rojo, banderas ondeando.$h6b$,
  $h6c$El escudo del papá refleja destellos dorados del atardecer. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$h6c$,
  $h6d$Iluminación dramática de atardecer con tonos rojos y dorados, sombras fuertes. Atmósfera épica de batalla ganada por amor.$h6d$,
  $h6e${NOMBRE_DESTINATARIO}, eres mi guerrero fiel,
Quien lucha por mí hasta el nivel.
Tu fuerza es mi protección,
Tu valor mi inspiración.

No necesitas batalla ni escudo,
Tu corazón es mi refugio agudo.
Eres mi protector y mi verdad,
Mi {APODO_DESTINATARIO}, mi guerrero de verdad.$h6e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_6_Mi_Guerrero_Protector.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Mi Capitán Piloto De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_7_Mi_Capitán_Piloto.png',
  'HE_TO_HE',
  $h7a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite confianza y liderazgo, con el papá guiando el rumbo con seguridad amorosa.

Ligeramente descentrado frente al avión, el papá, expresión confiada y profesional, vistiendo uniforme de piloto impecable con charreteras doradas y gorra de capitán, sosteniendo un mapa de vuelo. Como copiloto especial, su hijo, expresión emocionada y confiada, con gorra de piloto pequeña, mirando los instrumentos de vuelo con curiosidad.$h7a$,
  $h7b$Cielo azul brillante al atardecer, nubes blancas y naranjas, avión moderno elegante, horizonte infinito.$h7b$,
  $h7c$La brújula dorada en manos del papá brilla suavemente. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$h7c$,
  $h7d$Iluminación de atardecer aéreo con tonos azules y dorados, sombras suaves. Atmósfera de aventura segura y confianza.$h7d$,
  $h7e${NOMBRE_DESTINATARIO}, eres mi capitán seguro,
Quien guía mi rumbo más puro.
Tu dirección es mi destino,
Tu mapa mi camino.

No necesitas avión ni cielo,
Tu amor es mi mayor anhelo.
Eres mi piloto y mi verdad,
Mi {APODO_DESTINATARIO}, mi capitán de verdad.$h7e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_7_Mi_Capitán_Piloto.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Mi Vikingo Valiente De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_8_Mi_Vikingo_Valiente.png',
  'HE_TO_HE',
  $h8a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza ancestral y el orgullo de un hijo aprendiendo del guerrero más valiente.

Ligeramente descentrado en postura poderosa, el papá, expresión fuerte y protectora, vistiendo armadura vikinga con pieles, casco vikingo sin cuernos (históricamente correcto), hacha de guerra en mano, escudo con símbolos nórdicos. Junto a él como su pequeño guerrero, su hijo, expresión valiente y orgullosa, con túnica vikinga adaptada, cabello corto alborotado, sosteniendo un escudo pequeño de juguete.$h8a$,
  $h8b$Paisaje nórdico con fiordos de agua azul profunda, montañas nevadas, cielo tormentoso con rayos de luz atravesando, barco vikingo con dragón tallado.$h8b$,
  $h8c$Símbolos rúnicos brillan sutilmente sobre el escudo del papá. La magia debe sentirse ancestral y completamente integrada dentro de una fotografía realista.$h8c$,
  $h8d$Iluminación dramática nórdica con tonos grises, azules y plateados, sombras fuertes. Atmósfera épica vikinga.$h8d$,
  $h8e${NOMBRE_DESTINATARIO}, eres mi vikingo feroz,
Valiente y fuerte como una voz.
Tu fuerza conquista mi corazón,
Tu valor mi admiración.

No necesitas hacha ni barco,
Tu amor es mi mejor marco.
Eres mi guerrero nórdico real,
Mi {APODO_DESTINATARIO}, mi vikingo celestial.$h8e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_8_Mi_Vikingo_Valiente.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Mi Arquitecto de Sueños De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_9_Mi_Arquitecto_de_Sueños.png',
  'HE_TO_HE',
  $h9a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite creatividad e inspiración, con el papá construyendo mágicamente el futuro de su hijo.

Ligeramente descentrado sosteniendo planos brillantes, el papá, expresión concentrada y amorosa, vistiendo camisa blanca arremangada y chaleco, herramientas de diseño doradas flotando alrededor. Observando con asombro, su hijo, expresión de inspiración y felicidad, señalando hacia los castillos y edificios mágicos que su papá crea.$h9a$,
  $h9b$Espacio mágico de creación, planos arquitectónicos flotando transformándose en castillos y edificios, cielo en tonos azules y dorados.$h9b$,
  $h9c$Los planos brillantes se transforman lentamente en estructuras de luz dorada mientras flotan. La magia debe sentirse creativa y completamente integrada dentro de una fotografía realista.$h9c$,
  $h9d$Iluminación creativa con tonos azules, blancos y dorados, sombras suaves. Atmósfera de inspiración y construcción de sueños.$h9d$,
  $h9e${NOMBRE_DESTINATARIO}, eres mi arquitecto ideal,
Quien construye mi vida especial.
Tus planos son mi futuro,
Tu diseño mi camino seguro.

No necesitas planos ni herramientas,
Tu amor construye mis cuentas.
Eres mi constructor y mi verdad,
Mi {APODO_DESTINATARIO}, mi arquitecto de verdad.$h9e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_9_Mi_Arquitecto_de_Sueños.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Mi Gladiador De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_10_Mi_Gladiador.png',
  'HE_TO_HE',
  $h10a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite triunfo y el orgullo desbordante de un hijo celebrando a su campeón.

Ligeramente descentrado en postura victoriosa, el papá, expresión victoriosa pero amorosa, vistiendo armadura de gladiador romano con peto de bronce y capa roja corta, espada en alto, escudo con símbolo de corazón. Corriendo hacia él celebrando, su hijo, expresión de orgullo y alegría extrema, con túnica romana blanca y corona de laurel pequeña, brazos abiertos.$h10a$,
  $h10b$Coliseo romano épico, arena dorada, columnas majestuosas, cielo azul con nubes dramáticas, banderas romanas ondeando.$h10b$,
  $h10c$Pétalos de flores caen suavemente celebrando la victoria del papá. La magia debe sentirse triunfal y completamente integrada dentro de una fotografía realista.$h10c$,
  $h10d$Iluminación dorada romana con tonos cálidos, sombras dramáticas. Atmósfera de victoria épica y orgullo familiar.$h10d$,
  $h10e${NOMBRE_DESTINATARIO}, eres mi gladiador triunfante,
Fuerte, valiente y constante.
Tu victoria es mi orgullo,
Tu fuerza mi mejor arrullo.

No necesitas arena ni espada,
Tu amor es mi mejor jornada.
Eres mi campeón y mi verdad,
Mi {APODO_DESTINATARIO}, mi gladiador de verdad.$h10e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_10_Mi_Gladiador.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Mi Samurái De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_11_Mi_Samurái.png',
  'HE_TO_HE',
  $h11a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite honor y disciplina, con su hijo mostrando respeto y admiración por su padre samurái.

Ligeramente descentrado en postura honorable, el papá, expresión seria y protectora, vistiendo armadura samurái tradicional en negro, rojo y dorado, katana en posición de descanso honorable. Junto a él como su aprendiz, su hijo, expresión respetuosa y orgullosa, con kimono japonés tradicional en tonos azul índigo y gris, cabello corto prolijo, manos juntas en gesto de honor.$h11a$,
  $h11b$Jardín zen japonés con cerezos en flor, puente de madera sobre estanque con carpas koi, templo japonés a la distancia, montañas neblinosas.$h11b$,
  $h11c$Pétalos de cerezo caen suavemente alrededor de ambos. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$h11c$,
  $h11d$Iluminación suave japonesa con tonos rosados y dorados, sombras delicadas. Atmósfera de honor y tradición.$h11d$,
  $h11e${NOMBRE_DESTINATARIO}, eres mi samurái leal,
Con honor y disciplina celestial.
Tu espada protege mi corazón,
Tu código mi admiración.

No necesitas katana ni armadura,
Tu amor es mi mejoradura.
Eres mi guerrero honorable y real,
Mi {APODO_DESTINATARIO}, mi samurái celestial.$h11e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_11_Mi_Samurái.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Mi Titán De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_12_Mi_Titán.png',
  'HE_TO_HE',
  $h12a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite poder monumental y la seguridad absoluta de un hijo protegido por una fuerza inmensa.

Ligeramente descentrado en escala épica, el papá, expresión poderosa pero amorosa, representado como titán gigante con energía cósmica dorada y azul emanando de su cuerpo, vestimenta de túnica épica. A sus pies en escala humana normal, su hijo, expresión de asombro y seguridad total, mirando hacia arriba con admiración.$h12a$,
  $h12b$Paisaje monumental con montañas gigantes, cielo cósmico con nebulosas y estrellas, energía cósmica en tonos azul profundo y púrpura.$h12b$,
  $h12c$Partículas doradas y azules flotan alrededor del titán, con ondas de energía suaves. La magia debe sentirse monumental y completamente integrada dentro de una fotografía realista.$h12c$,
  $h12d$Iluminación cósmica dramática con tonos azules profundos, dorados y púrpuras, sombras épicas. Atmósfera de poder absoluto y amor protector.$h12d$,
  $h12e${NOMBRE_DESTINATARIO}, eres mi titán poderoso,
Fuerte, grande y majestuoso.
Tu fuerza mueve mi mundo entero,
Tu poder es mi compañero.

No necesitas montañas ni cielo,
Tu amor es mi mayor anhelo.
Eres mi gigante y mi verdad,
Mi {APODO_DESTINATARIO}, mi titán de verdad.$h12e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_12_Mi_Titán.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Mi Primer Héroe De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_13_Mi_Primer_Héroe.png',
  'HE_TO_HE',
  $h13a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura pura y el amor incondicional de un primer abrazo que define toda una vida.

Ligeramente descentrado en momento íntimo, el papá, expresión de amor puro y protección, vistiendo ropa casual cómoda, arrodillado a la altura de su hijo, abrazándolo tiernamente. En sus brazos, su hijo, expresión de amor puro y seguridad total, con ropa cómoda en colores suaves, cabeza recostada en su pecho.$h13a$,
  $h13b$Sala de estar acogedora con luz natural suave, colores cálidos beige y crema, fotografías familiares en las paredes, sofá cómodo.$h13b$,
  $h13c$La luz natural crea un halo dorado suave alrededor del abrazo. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$h13c$,
  $h13d$Iluminación natural cálida con tonos dorados suaves, sombras delicadas. Atmósfera de ternura absoluta y amor puro.$h13d$,
  $h13e${NOMBRE_DESTINATARIO}, fuiste mi primer héroe,
El hombre que marcó mi camino y mi credo.
Antes de capas o historias de valor,
Tú me mostraste lo que es el amor.

Tu abrazo fue mi primer refugio,
Tu voz mi primer consuelo.
Eres mi primer héroe y mi verdad,
Mi {APODO_DESTINATARIO}, mi héroe de verdad.$h13e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_13_Mi_Primer_Héroe.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Cuando Bailamos en la Sala De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_14_Cuando_Bailamos_en_la_Sala.png',
  'HE_TO_HE',
  $h14a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría pura y la diversión de un baile improvisado en casa.

Ligeramente descentrados bailando, el papá, expresión de felicidad y diversión, vistiendo ropa casual elegante, sosteniendo las manos de su hijo en posición de baile. Con los pies sobre los de su papá, su hijo, expresión de alegría extrema y risa, con ropa cómoda que se mueve con el baile en tonos azul vibrante.$h14a$,
  $h14b$Sala de estar familiar en tarde luminosa, piso de madera brillante, ventana con luz natural cálida, muebles movidos creando espacio de baile.$h14b$,
  $h14c$Un sutil efecto de movimiento captura el giro y el salto de su hijo. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$h14c$,
  $h14d$Iluminación natural cálida con tonos dorados, efecto de movimiento capturado. Atmósfera de alegría y diversión.$h14d$,
  $h14e${NOMBRE_DESTINATARIO}, cuando bailamos sin parar,
Mis pies sobre los tuyos al girar.
La música suena, el mundo desaparece,
Y en tus brazos todo florece.

No importa si no sé los pasos bien,
Contigo bailando todo está bien.
Eres mi pareja de baile y mi verdad,
Mi {APODO_DESTINATARIO}, mi bailarín de verdad.$h14e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_14_Cuando_Bailamos_en_la_Sala.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Me Enseñaste Que Soy un Rey De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_15_Me_Enseñaste_Que_Soy_un_Rey.png',
  'HE_TO_HE',
  $h15a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite empoderamiento y el orgullo de un padre coronando a su hijo como el rey que siempre fue.

Ligeramente descentrado frente al espejo, el papá, expresión de orgullo y amor, arrodillado a la altura de su hijo, colocando una pequeña corona dorada sobre su cabeza con cuidado. Mirándose al espejo, su hijo, expresión de asombro y felicidad, con ropa elegante en tonos azul y dorado, sonrisa de confianza.$h15a$,
  $h15b$Habitación elegante con espejo grande de marco dorado ornamentado, luz suave y dorada, cortinas elegantes.$h15b$,
  $h15c$La corona brilla suavemente reflejándose en el espejo. La magia debe sentirse empoderadora y completamente integrada dentro de una fotografía realista.$h15c$,
  $h15d$Iluminación dorada suave con reflejos en el espejo, sombras delicadas. Atmósfera de magia realista y empoderamiento.$h15d$,
  $h15e${NOMBRE_DESTINATARIO}, me enseñaste desde pequeño,
Que soy un rey, no solo un sueño.
Me mostraste mi valor y mi corona,
Y que mi fuerza a nadie abandona.

No necesito castillo ni reino real,
Tu amor me hace sentir especial.
Eres quien me enseñó mi valor de verdad,
Mi {APODO_DESTINATARIO}, mi rey de verdad.$h15e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_15_Me_Enseñaste_Que_Soy_un_Rey.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Nuestras Citas de Padre e Hijo De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_16_Nuestras_Citas_de_Padre_e_Hijo.png',
  'HE_TO_HE',
  $h16a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad cotidiana y la calidez de un momento especial compartido.

Ligeramente descentrados en la mesa, el papá, expresión de felicidad y atención total, sosteniendo una taza de chocolate caliente, mirando a su hijo con sonrisa genuina. Frente a él, su hijo, expresión de felicidad pura, sosteniendo un helado grande de varios sabores, ojos brillantes.$h16a$,
  $h16b$Heladería acogedora con decoración vintage, mesas pequeñas, ventana mostrando calle con árboles, luz natural cálida.$h16b$,
  $h16c$Ninguno: escena cotidiana y cálida, sin elementos mágicos añadidos.$h16c$,
  $h16d$Iluminación natural cálida con tonos dorados y pasteles, sombras suaves. Atmósfera de complicidad y tiempo de calidad.$h16d$,
  $h16e${NOMBRE_DESTINATARIO}, nuestras salidas son especiales,
Momentos únicos, casi rituales.
Helados, parques, o simplemente caminar,
Contigo cada cita es para recordar.

No importa el lugar ni la actividad,
Lo importante es nuestra complicidad.
Eres mi cita favorita y mi verdad,
Mi {APODO_DESTINATARIO}, mi compañero de verdad.$h16e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_16_Nuestras_Citas_de_Padre_e_Hijo.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Cuando Me Peinas Aunque No Sepas De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_17_Cuando_Me_Peinas_Aunque_No_Sepas.png',
  'HE_TO_HE',
  $h17a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura cómica y el esfuerzo torpe pero amoroso de un padre aprendiendo a peinar.

Ligeramente descentrado detrás peinando con concentración, el papá, expresión de concentración extrema y ceño fruncido pero amoroso, sosteniendo un peine y gel para el cabello, intentando peinar un mechón rebelde hacia arriba. Sentado frente al espejo, su hijo, expresión de diversión contenida, con el cabello parado en un peinado torcido resultado del intento, mirando el reflejo con sonrisa traviesa.$h17a$,
  $h17b$Baño familiar en mañana luminosa, espejo grande, tocador con cepillos y clips de cabello dispersos de forma caótica.$h17b$,
  $h17c$Ninguno: escena puramente cómica y cotidiana, sin elementos mágicos añadidos.$h17c$,
  $h17d$Iluminación natural de mañana con tonos cálidos, sombras suaves. Atmósfera de comedia familiar amorosa.$h17d$,
  $h17e${NOMBRE_DESTINATARIO}, cuando intentas peinarme,
El resultado es para reírme.
Mechones parados, peinados raros también,
Pero lo haces con amor, eso está bien.

No importa si no sale perfecto al final,
Tu esfuerzo es lo más especial.
Eres mi peluquero favorito y mi verdad,
Mi {APODO_DESTINATARIO}, mi peinador de verdad.$h17e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_17_Cuando_Me_Peinas_Aunque_No_Sepas.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'El Hombre Que Me Enseñó a Ser un Hombre de Bien De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_18_El_Hombre_Que_Me_Enseñó_a_Ser_un_Hombre_de_Bien.png',
  'HE_TO_HE',
  $h18a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite seriedad amorosa y la transmisión silenciosa de un valor de vida fundamental.

Ligeramente descentrados en conversación, el papá, expresión seria pero amorosa, sosteniendo la mano de su hijo, mirada directa y firme. Escuchando con atención, su hijo, expresión atenta y seria, con postura de escucha activa, ojos enfocados en su papá.$h18a$,
  $h18b$Biblioteca o estudio con libros en estantes, sillones cómodos, luz natural suave entrando por ventana.$h18b$,
  $h18c$Ninguno: escena seria y documental, sin elementos mágicos añadidos.$h18c$,
  $h18d$Iluminación natural suave con tonos cálidos pero serios, sombras delicadas. Atmósfera de lección de vida importante.$h18d$,
  $h18e${NOMBRE_DESTINATARIO}, me enseñaste con tu ejemplo,
Cómo un hombre debe ser en todo tiempo.
Me mostraste respeto, entrega y valor,
Y a dar siempre lo mejor de mi honor.

Estableciste el estándar tan alto,
Que ahora sé lo que no es falso.
Eres mi ejemplo y mi verdad,
Mi {APODO_DESTINATARIO}, mi maestro de verdad.$h18e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_18_El_Hombre_Que_Me_Enseñó_a_Ser_un_Hombre_de_Bien.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Cuando Me Haces Sentir El Más Valiente De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_19_Cuando_Me_Haces_Sentir_El_Más_Valiente.png',
  'HE_TO_HE',
  $h19a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite admiración pura y el instante mágico en que un hijo se siente el más valiente del mundo.

Ligeramente descentrado mostrándole a su papá un disfraz de superhéroe casero completo, su hijo, expresión de timidez mezclada con felicidad, con capa improvisada y pose heroica, buscando la aprobación de su papá. Mirándolo con admiración total, el papá, expresión de admiración pura y orgullo, con mano en el corazón, sonrisa orgullosa.$h19a$,
  $h19b$Ambiente de hogar en tarde de juegos, sala familiar luminosa, luz natural cálida, juguetes de héroes dispersos con cariño.$h19b$,
  $h19c$Un efecto sutil de spotlight dorado ilumina a su hijo como si su papá lo viera brillar. La magia debe sentirse mágica y completamente integrada dentro de una fotografía realista.$h19c$,
  $h19d$Iluminación natural cálida con efecto de spotlight dorado sobre su hijo, sombras suaves. Atmósfera de admiración pura y empoderamiento.$h19d$,
  $h19e${NOMBRE_DESTINATARIO}, cuando me miras y dices,
"Eres el más valiente", mis raíces.
Me haces sentir como un héroe brillar,
Tu admiración me hace volar.

No importa si tengo miedo ese día,
Tu mirada me da valentía.
Eres quien me hace sentir especial de verdad,
Mi {APODO_DESTINATARIO}, mi admirador de verdad.$h19e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_19_Cuando_Me_Haces_Sentir_El_Más_Valiente.png');

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe'),
  'Seré Tu Niño Para Siempre De Hijo a Papá',
  'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_20_Seré_Tu_Niño_Para_Siempre.png',
  'HE_TO_HE',
  $h20a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite una promesa eterna: sin importar el paso del tiempo, el vínculo entre padre e hijo permanece intacto.

En la mitad izquierda, ligeramente descentrado, el papá (edad actual) cargando en brazos a su hijo pequeño (edad actual del cliente), él abrazándolo con fuerza, cabeza en su hombro. En la mitad derecha, el mismo papá (ligeramente mayor, canas sutiles) abrazando a una versión futura de su hijo ya adolescente, él todavía abrazándolo de la misma forma, cabeza en su hombro, mostrando que sin importar la edad, sigue siendo su niño.$h20a$,
  $h20b$Un mismo jardín familiar bajo un gran árbol, mostrado en dos momentos distintos que fluyen naturalmente de un lado al otro de la escena, luz dorada atemporal en ambos.$h20b$,
  $h20c$Pétalos y hojas doradas caen suavemente en ambos momentos, conectando visualmente el pasado y el futuro. La magia debe sentirse atemporal y completamente integrada dentro de una fotografía realista.$h20c$,
  $h20d$Iluminación dorada atemporal con efecto de memoria y futuro, sombras suaves. Atmósfera de emoción profunda y promesa eterna.$h20d$,
  $h20e${NOMBRE_DESTINATARIO}, aunque crezca y el tiempo pase,
Aunque la vida me lleve a otra clase.
Siempre seré tu niño pequeño,
Esa verdad nunca será un sueño.

No importa cuántos años tenga al final,
En tus brazos siempre seré igual.
Eres mi papá eterno y mi verdad,
Mi {APODO_DESTINATARIO}, mi amor de verdad.$h20e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas_Hijo/PLANTILLA_20_Seré_Tu_Niño_Para_Siempre.png');
