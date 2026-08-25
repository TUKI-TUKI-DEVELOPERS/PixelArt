-- "Mamá, Mi Heroína" — agrega la versión hija→mamá (hoy solo existía hijo→mamá).
-- Mismo patrón que "Papá, Mi Héroe" (ver backfill-papa-mi-heroe-hijo-content.sql):
-- backfillea gender_direction en las 20 filas hijo existentes (hoy NULL) e
-- inserta las 20 filas nuevas hija→mamá. Contenido derivado mecánicamente del
-- contenido real de producción (hijo→mamá) reemplazando hijo->hija y las
-- concordancias de género correspondientes (niño->niña, príncipe->princesa,
-- envuelto->envuelta, recostado->recostada, protegido->protegida).
UPDATE personalized_templates SET
  name = CASE WHEN name LIKE '% De Hijo a Mamá' THEN name ELSE name || ' De Hijo a Mamá' END,
  gender_direction = 'HE_TO_SHE'
WHERE template_preview_key LIKE 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/%' AND is_active = true;


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'Mi Superheroína Sin Capa De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_1_Mi_Superheroína_Sin_Capa.png',
  'SHE_TO_SHE',
  $hm1a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza heroica y la certeza de que el amor de mamá lo hace invencible.

Ligeramente descentrada sobre una azotea de ciudad al atardecer, la mamá, expresión fuerte, confiada y protectora, vistiendo un bodysuit superheroico en rosa intenso, púrpura y dorado, cabello ondeando dramáticamente con el viento, una mano extendida protectoramente hacia su hija. Junto a ella, su hija, expresión de admiración y orgullo, con ropa casual, mirando a su mamá con asombro.$hm1a$,
  $hm1b$Skyline de ciudad al atardecer con rascacielos, cielo dramático en tonos naranja, rosa y púrpura, luces de ciudad encendiéndose.$hm1b$,
  $hm1c$Un aura brillante rosa y dorada envuelve a la mamá, con partículas de energía flotando suavemente. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$hm1c$,
  $hm1d$Iluminación dramática de atardecer con rayos de luz solar atravesando las nubes. Predominan rosa intenso, púrpura, dorado y naranja atardecer. Atmósfera cinematográfica épica.$hm1d$,
  $hm1e$No necesitas capa para volar,
ni superpoderes para brillar,
con tu amor me haces invencible,
eres la heroína más increíble.

Salvas mi día con tu sonrisa,
me proteges con tu amor sin prisa,
eres más fuerte que cualquier villano,
mi superheroína, tomo tu mano.

Cuando el mundo se pone difícil,
tú me haces sentir invencible,
gracias por ser mi protectora,
mi {APODO_DESTINATARIO}, mi superheroína a toda hora.$hm1e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_1_Mi_Superheroína_Sin_Capa.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'La Guerrera Que Nunca Se Rinde De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_2_La_Guerrera_Que_Nunca_Se_Rinde.png',
  'SHE_TO_SHE',
  $hm2a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite valentía y la certeza de que el coraje de mamá es su mejor enseñanza.

Ligeramente descentrada en un campo al amanecer, la mamá, expresión determinada y victoriosa, vistiendo armadura elegante de guerrera en rosa metálico, púrpura y dorado, sosteniendo un escudo con corazón grabado y una espada apuntando al cielo. Junto a ella, su hija, expresión valiente y orgullosa, con túnica de aprendiz, sosteniendo un escudo de madera a juego.$hm2a$,
  $hm2b$Campo abierto al amanecer con montañas al fondo, cielo dramático en rosa, naranja y dorado, banderas ondeando suavemente.$hm2b$,
  $hm2c$La armadura de la mamá brilla con reflejos metálicos y un aura dorada la envuelve. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$hm2c$,
  $hm2d$Iluminación heroica de amanecer con rayos de luz dorada atravesando nubes. Predominan rosa metálico, púrpura, dorado y naranja amanecer. Atmósfera victoriosa e inspiracional.$hm2d$,
  $hm2e$Eres la guerrera más valiente,
que lucha por mí constantemente,
con tu fuerza y tu coraje,
me enseñas a ser fuerte en cada viaje.

No hay batalla que no puedas ganar,
no hay obstáculo que te haga parar,
con tu escudo de amor me proteges,
y con tu espada de valentía me riges.

Gracias por pelear cada día,
por llenarme de amor y alegría,
eres mi guerrera invencible,
mi {APODO_DESTINATARIO}, mi amor indestructible.$hm2e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_2_La_Guerrera_Que_Nunca_Se_Rinde.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'Mi Reina Mi Todo De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_3_Mi_Reina_Mi_Todo.png',
  'SHE_TO_SHE',
  $hm3a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad tierna y la certeza de que mamá gobierna el corazón de su hija con amor.

Ligeramente descentrada sentada en un trono dorado y rosa, la mamá, expresión amorosa y serena, con corona delicada dorada y gemas rosas, vestido de reina fluido en tonos rosa suave y lavanda, una mano extendida hacia su hija. Junto al trono, su hija, expresión de amor y admiración, con outfit elegante de princesa, sosteniendo la mano de su mamá.$hm3a$,
  $hm3b$Salón de trono mágico con columnas elegantes, ventanales con luz suave, cortinas de terciopelo rosa y dorado, flores decorativas.$hm3b$,
  $hm3c$Partículas doradas flotan suavemente alrededor del trono. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$hm3c$,
  $hm3d$Iluminación suave y cálida tipo cuento de hadas. Predominan rosa suave, lavanda, dorado y blanco marfil. Atmósfera elegante y amorosa.$hm3d$,
  $hm3e$Eres la reina de mi corazón,
con tu corona de amor y pasión,
gobiernas mi mundo con ternura,
tu amor es mi mayor aventura.

Tu trono está en mi alma,
tu reino es mi calma,
con tu cetro de cariño,
me guías desde que soy niña.

No necesitas castillo ni oro,
tu riqueza es el amor que atesoro,
gracias por ser mi reina amada,
mi {APODO_DESTINATARIO}, mi todo, mi adorada.$hm3e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_3_Mi_Reina_Mi_Todo.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'Mi Ángel Protector De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_4_Mi_Ángel_Protector.png',
  'SHE_TO_SHE',
  $hm4a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz celestial y la certeza de estar protegida bajo el amor incondicional de mamá.

Ligeramente descentrada, la mamá, expresión serena y protectora, con grandes alas de ángel blancas y doradas desplegadas, vestido largo blanco fluido, abrazando suavemente a su hija. Envuelta en sus alas, su hija, expresión de paz y confianza, con ropa clara y suave, mirando hacia arriba.$hm4a$,
  $hm4b$Cielo etéreo con nubes suaves blancas y doradas, luz divina emanando desde arriba.$hm4b$,
  $hm4c$Un halo sutil de luz dorada brilla sobre la cabeza de la mamá y partículas brillantes flotan como polvo de estrellas. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$hm4c$,
  $hm4d$Iluminación celestial suave con tonos dorados y blancos. Predominan blanco, crema, dorado suave y celeste claro. Atmósfera de protección divina y paz.$hm4d$,
  $hm4e$Eres el ángel que Dios me envió,
con tus alas de amor me cubrió,
me proteges de todo mal,
mi guardián celestial.

Tus abrazos son mi refugio,
tu voz calma cualquier diluvio,
con tus alas me envuelves,
y todos mis miedos resuelves.

Gracias por cuidarme cada día,
por ser mi luz y mi guía,
mi ángel guardián del cielo,
mi {APODO_DESTINATARIO}, mi consuelo.$hm4e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_4_Mi_Ángel_Protector.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'La Maga de Mi Vida De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_5_La_Maga_de_Mi_Vida.png',
  'SHE_TO_SHE',
  $hm5a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro mágico y la certeza de que el amor de mamá puede hacer milagros.

Ligeramente descentrada en un bosque místico, la mamá, expresión sabia y amorosa, vistiendo túnica de maga en púrpura profundo, azul místico y dorado, una mano extendida emanando partículas de luz, otra sosteniendo una vara mágica. Junto a ella, su hija, expresión de asombro y fascinación, con túnica simple de aprendiz, extendiendo sus propias manos intentando imitar la magia.$hm5a$,
  $hm5b$Bosque encantado con árboles antiguos cubiertos de musgo brillante, luces mágicas flotando, luna llena parcialmente visible.$hm5b$,
  $hm5c$Partículas doradas, púrpuras y azules flotan por todo el bosque, y orbes de luz brillan entre las ramas. La magia debe sentirse mística y completamente integrada dentro de una fotografía realista.$hm5c$,
  $hm5d$Iluminación mágica emanando de las manos de la mamá contra la penumbra del bosque. Predominan púrpura profundo, azul místico, dorado y turquesa mágico. Atmósfera mística y encantadora.$hm5d$,
  $hm5e$Con tu magia haces milagros,
conviertes lo malo en algo sagrado,
tu varita es tu amor infinito,
que hace mi mundo más bonito.

Hechizas mi tristeza y se va,
conjuras sonrisas acá y allá,
tu poder es el más especial,
mi maga, mi amor maternal.

Gracias por tu magia cada día,
por llenar mi vida de fantasía,
eres la maga más poderosa,
mi {APODO_DESTINATARIO}, la más maravillosa.$hm5e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_5_La_Maga_de_Mi_Vida.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'Mi Capitana del Corazón De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_6_Mi_Capitana_del_Corazón.png',
  'SHE_TO_SHE',
  $hm6a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite determinación y la certeza de que mamá guía el rumbo con firmeza y amor.

Ligeramente descentrada al timón, la mamá, expresión determinada y confiada, con uniforme de capitana naval azul marino con botones dorados, cabello recogido en trenza práctica, sosteniendo el timón con ambas manos. Junto a ella, su hija, expresión aventurera, con outfit náutico, sosteniendo un catalejo mirando al horizonte.$hm6a$,
  $hm6b$Barco de madera en mar abierto, olas dinámicas, cielo de atardecer dramático, velas infladas por el viento.$hm6b$,
  $hm6c$El spray de agua marina brilla con destellos dorados de atardecer. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$hm6c$,
  $hm6d$Iluminación dramática de atardecer marino. Predominan azul marino profundo, dorado atardecer, naranja y blanco velas. Atmósfera de aventura y exploración.$hm6d$,
  $hm6e$Eres la capitana de mi barco,
navegas mi vida sin descanso,
con tu timón de amor me guías,
a través de tormentas y alegrías.

Tu brújula siempre marca el norte,
tu valentía es mi soporte,
con tu tripulación de uno,
juntos somos más que ninguno.

Gracias por capitanear mi vida,
por ser mi fuerza y mi guarida,
mi capitana valiente y fiel,
mi {APODO_DESTINATARIO}, mi cielo, mi miel.$hm6e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_6_Mi_Capitana_del_Corazón.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'Mi Ninja Silenciosa De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_7_Mi_Ninja_Silenciosa.png',
  'SHE_TO_SHE',
  $hm7a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite protección silenciosa y la certeza de que mamá aleja cualquier miedo sin hacer ruido.

Ligeramente descentrada en postura de combate elegante, la mamá, expresión concentrada y alerta, con outfit ninja en negro, púrpura oscuro y detalles plateados, cabello recogido en moño alto. Detrás de ella protegida, su hija, expresión segura y admirada, con outfit ninja, en postura de aprendiz imitando a su mamá.$hm7a$,
  $hm7b$Templo japonés tradicional al anochecer, árboles de cerezo con flores cayendo, luna llena grande y brillante.$hm7b$,
  $hm7c$Pétalos de cerezo flotan suavemente en el aire bajo la luz lunar. La magia debe sentirse mística y completamente integrada dentro de una fotografía realista.$hm7c$,
  $hm7d$Iluminación lunar dramática con sombras suaves. Predominan negro, púrpura oscuro, plateado y azul nocturno. Atmósfera mística y protectora.$hm7d$,
  $hm7e$Eres la ninja de mi vida,
proteges en silencio mi guarida,
con tus movimientos sigilosos,
alejas todos los miedos odiosos.

Tu amor es tu arma secreta,
tu abrazo mi meta completa,
con tu fuerza ninja invencible,
haces lo imposible posible.

Gracias por protegerme en secreto,
por ser mi guardiana en concreto,
mi ninja del amor maternal,
mi {APODO_DESTINATARIO}, mi protectora celestial.$hm7e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_7_Mi_Ninja_Silenciosa.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'Mi Amazona Guerrera De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_8_Mi_Amazona_Guerrera.png',
  'SHE_TO_SHE',
  $hm8a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ferocidad protectora y el orgullo de una hija aprendiendo de su guerrera.

Ligeramente descentrada en pose noble de amazona, la mamá, expresión feroz y determinada, con outfit de amazona en tonos tierra, verde y dorado, trenzas guerreras y plumas decorativas, un arco decorativo colgado al hombro. Junto a ella, su hija, expresión valiente y orgullosa, con outfit tribal, sosteniendo un escudo de madera a juego.$hm8a$,
  $hm8b$Selva exuberante con cascada, vegetación densa, luz natural filtrándose entre hojas.$hm8b$,
  $hm8c$Gotas de agua de la cascada brillan al reflejar la luz, y hojas flotan suavemente en el aire. La magia debe sentirse poderosa y completamente integrada dentro de una fotografía realista.$hm8c$,
  $hm8d$Luz natural filtrada de selva. Predominan verde selva, marrón tierra, dorado y turquesa agua. Atmósfera de tribu guerrera y naturaleza poderosa.$hm8d$,
  $hm8e$Eres la amazona más feroz,
con tu arco y flecha de amor veloz,
proteges tu tribu de uno,
yo soy tu tesoro, tu todo en uno.

Tu valentía no tiene igual,
tu fuerza es monumental,
con tu corazón de guerrera,
me enseñas a luchar de manera sincera.

Gracias por ser mi amazona,
mi protectora en toda zona,
mi {APODO_DESTINATARIO}, mi guerrera de honor,
mi amazona llena de amor.$hm8e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_8_Mi_Amazona_Guerrera.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'Mi Diosa del Amor Eterno De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_9_Mi_Diosa_del_Amor_Eterno.png',
  'SHE_TO_SHE',
  $hm9a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite devoción serena y la certeza de un amor materno divino.

Ligeramente descentrada frente a un templo griego flotante, la mamá, expresión serena y amorosa, con toga griega blanca y dorada, corona de flores rosas, una mano extendida emanando pequeños corazones brillantes. Junto a ella, su hija, expresión de adoración y paz, con túnica blanca simple, recibiendo la luz amorosa.$hm9a$,
  $hm9b$Templo griego con columnas blancas flotando en cielo de nubes doradas y rosadas, pétalos de rosa flotando.$hm9b$,
  $hm9c$Corazones brillantes flotan suavemente entre ambas, y rayos de luz dorada atraviesan las nubes. La magia debe sentirse divina y completamente integrada dentro de una fotografía realista.$hm9c$,
  $hm9d$Iluminación celestial dorada. Predominan blanco, dorado brillante, rosa suave y lavanda celestial. Atmósfera divina y pacífica.$hm9d$,
  $hm9e$Eres la diosa de mi universo,
con tu amor puro y diverso,
gobiernas mi mundo con ternura,
tu amor es mi mayor aventura.

Tu templo está en mi corazón,
tu poder es pura devoción,
con tu luz divina me iluminas,
y todas mis penas eliminas.

Gracias por ser mi diosa amada,
mi {APODO_DESTINATARIO}, mi luz adorada,
diosa del amor maternal,
mi tesoro celestial.$hm9e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_9_Mi_Diosa_del_Amor_Eterno.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'Mi Titán Inquebrantable De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_10_Mi_Titán_Inquebrantable.png',
  'SHE_TO_SHE',
  $hm10a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza monumental y la seguridad absoluta de una hija en brazos de su titán.

Ligeramente descentrada en escala poderosa, la mamá, expresión poderosa y amorosa, con túnica de titán en bronce, dorado y blanco, cargando en brazos a su hija con facilidad. En sus brazos, su hija, expresión de seguridad y confianza, abrazándola con paz total.$hm10a$,
  $hm10b$Cima de montaña alta con nubes alrededor, cielo dramático con rayos de luz atravesando nubes.$hm10b$,
  $hm10c$Un aura dorada de poder rodea a la mamá y el viento mueve dramáticamente su cabello y túnica. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$hm10c$,
  $hm10d$Iluminación épica dramática con rayos de luz atravesando nubes. Predominan bronce, dorado, blanco y gris nubes. Atmósfera mitológica y protectora.$hm10d$,
  $hm10e$Eres el titán de mi vida,
con fuerza nunca vencida,
cargas el mundo en tus hombros,
y aún me das amor sin asombros.

Tu poder es monumental,
tu amor es colosal,
como titán inquebrantable,
haces lo imposible alcanzable.

Gracias por tu fuerza infinita,
por ser mi roca bendita,
mi titán maternal poderoso,
mi {APODO_DESTINATARIO}, mi amor grandioso.$hm10e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_10_Mi_Titán_Inquebrantable.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'Mi Samurái de Honor De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_11_Mi_Samurái_de_Honor.png',
  'SHE_TO_SHE',
  $hm11a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite honor y disciplina, con su hija aprendiendo el camino del guerrero de amor de su mamá.

Ligeramente descentrada en posición de combate honorable, la mamá, expresión honorable y sabia, con kimono samurái en rosa oscuro, negro y dorado, sosteniendo una katana con ambas manos en posición ceremonial. Junto a ella, su hija, expresión de respeto y concentración, con kimono simple, sosteniendo un bokken de madera.$hm11a$,
  $hm11b$Jardín zen japonés con puente rojo arqueado, árboles de cerezo en flor, templo japonés al fondo.$hm11b$,
  $hm11c$Pétalos de cerezo caen suavemente reflejándose en el agua del estanque. La magia debe sentirse honorable y completamente integrada dentro de una fotografía realista.$hm11c$,
  $hm11d$Iluminación suave de amanecer japonés. Predominan rosa oscuro, negro, dorado, rosa cerezo y verde zen. Atmósfera de honor, disciplina y tradición.$hm11d$,
  $hm11e$Eres la samurái de mi hogar,
con honor y disciplina sin par,
tu katana es tu amor filoso,
que corta todo lo doloroso.

Con tu código de honor maternal,
me enseñas lo que es esencial,
tu camino del guerrero es amor,
mi samurái, mi protector.

Gracias por tu honor y lealtad,
por enseñarme la verdad,
mi samurái del corazón,
mi {APODO_DESTINATARIO}, mi inspiración.$hm11e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_11_Mi_Samurái_de_Honor.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'La Heroína Que No Necesita Capa De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_12_La_Heroína_Que_No_Necesita_Capa.png',
  'SHE_TO_SHE',
  $hm12a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite heroísmo cotidiano: mamá no necesita traje especial para ser la heroína de su hija.

Ligeramente descentrada en su hogar, la mamá, expresión cálida y natural, con ropa cotidiana en colores suaves, abrazando protectoramente a su hija, un aura rosa y dorada brillando sutilmente a su alrededor sin traje especial. Abrazándola, su hija, expresión de amor y seguridad, con ropa casual cómoda.$hm12a$,
  $hm12b$Interior de hogar acogedor con fotos familiares en las paredes, muebles cómodos, luz cálida.$hm12b$,
  $hm12c$Partículas doradas flotan suavemente alrededor del abrazo, como magia cotidiana. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$hm12c$,
  $hm12d$Iluminación cálida de hogar con brillo heroico sutil. Predominan beige, crema, marrón suave con acentos rosa y dorado. Atmósfera de heroísmo cotidiano.$hm12d$,
  $hm12e$No vistes capa ni traje especial,
pero eres mi heroína principal,
tu superpoder es tu amor puro,
que me hace sentir seguro.

Salvas mi día con un abrazo,
vences mis miedos con un lazo,
de amor tan fuerte y verdadero,
mi heroína, mi mundo entero.

Gracias por ser mi salvación,
mi heroína del corazón,
sin capa pero con amor infinito,
mi {APODO_DESTINATARIO}, mi héroe favorito.$hm12e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_12_La_Heroína_Que_No_Necesita_Capa.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'Tus Abrazos Mágicos De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_13_Tus_Abrazos_Mágicos.png',
  'SHE_TO_SHE',
  $hm13a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sanación emocional y la certeza de que un abrazo de mamá cura cualquier dolor.

Ligeramente descentrada, la mamá, expresión de ternura profunda, sentada abrazando completamente a su hija contra su pecho, con ropa cómoda y suave en colores cálidos pastel. Envuelta en el abrazo, su hija, expresión de paz y consuelo, con rostro contra el hombro de su mamá.$hm13a$,
  $hm13b$Ambiente íntimo de sala acogedora, luz cálida difusa, elementos de hogar desenfocados.$hm13b$,
  $hm13c$Un aura sanadora rosa suave y dorada emana del abrazo, con pequeños corazones flotando. La magia debe sentirse reconfortante y completamente integrada dentro de una fotografía realista.$hm13c$,
  $hm13d$Luz suave y cálida difusa. Predominan rosa suave, lavanda claro, dorado cálido y crema. Atmósfera de sanación emocional y refugio.$hm13d$,
  $hm13e$Tus abrazos tienen magia especial,
curan cualquier dolor o mal,
cuando el mundo me hace llorar,
tus brazos me vienen a rescatar.

No hay medicina más poderosa,
que tu abrazo, mamá hermosa,
con tu calor y tu ternura,
sanas cualquier herida o ruptura.

Gracias por tus abrazos sanadores,
que alejan todos los dolores,
mi refugio, mi sanación,
mi {APODO_DESTINATARIO}, mi bendición.$hm13e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_13_Tus_Abrazos_Mágicos.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'El Ritual Más Sagrado De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_14_El_Ritual_Más_Sagrado.png',
  'SHE_TO_SHE',
  $hm14a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura nocturna y el ritual sagrado del beso de buenas noches.

Ligeramente descentrada inclinada sobre la cama, la mamá, expresión de ternura infinita, besando suavemente la frente de su hija, una mano acariciando su cabello. Acostado en la cama, su hija, expresión de paz y somnolencia, con ojos cerrados recibiendo el beso.$hm14a$,
  $hm14b$Habitación acogedora de noche, ventana con luna llena y estrellas, elementos decorativos cerca.$hm14b$,
  $hm14c$Partículas mágicas como polvo de estrellas flotan suavemente por la habitación. La magia debe sentirse tierna y completamente integrada dentro de una fotografía realista.$hm14c$,
  $hm14d$Luz suave de luna entrando por la ventana. Predominan azul nocturno suave, lavanda, plateado lunar y rosa pálido. Atmósfera de ritual nocturno y paz.$hm14d$,
  $hm14e$Cada noche antes de dormir,
tu beso me hace sonreír,
es el ritual más especial,
mi momento más celestial.

Tu beso aleja las pesadillas,
y trae sueños de maravillas,
con tu amor sellado en mi frente,
duermo tranquilo y felizmente.

Gracias por cada beso nocturno,
por hacer mi sueño tan oportuno,
mi ritual sagrado de amor,
mi {APODO_DESTINATARIO}, mi protector.$hm14e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_14_El_Ritual_Más_Sagrado.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'Recetas de Amor De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_15_Recetas_de_Amor.png',
  'SHE_TO_SHE',
  $hm15a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad culinaria y memorias dulces creadas juntas.

Ligeramente descentrada en la cocina, la mamá, expresión feliz y paciente, con delantal decorativo, ayudando a su hija a mezclar ingredientes. Junto a ella en un mesón, su hija, expresión de concentración feliz, con delantal pequeño, decorando con ingredientes.$hm15a$,
  $hm15b$Cocina acogedora familiar con ingredientes frescos, utensilios, plantas en la ventana con luz natural.$hm15b$,
  $hm15c$Partículas de harina o polvo dorado flotan sutilmente en el aire de la cocina. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$hm15c$,
  $hm15d$Luz natural cálida de cocina. Predominan amarillo suave, naranja, marrón madera y verde fresco. Atmósfera familiar y alegre.$hm15d$,
  $hm15e$En la cocina juntos creamos,
recetas de amor que cocinamos,
no solo comida preparamos,
memorias dulces que guardamos.

Me enseñas con paciencia infinita,
cada receta es una cita,
contigo aprendo más que cocinar,
aprendo a amar y a cuidar.

Gracias por cada receta compartida,
por hacer la cocina mi lugar de vida,
cocinando amor en cada platillo,
mi {APODO_DESTINATARIO}, mi tesoro sencillo.$hm15e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_15_Recetas_de_Amor.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'Mi Valiente Compañera De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_16_Mi_Valiente_Compañera.png',
  'SHE_TO_SHE',
  $hm16a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el valor de un nuevo comienzo caminado de la mano.

Ligeramente descentradas caminando hacia la escuela, la mamá, expresión alentadora y orgullosa, sosteniendo firmemente la mano de su hija, inclinándose con ánimo hacia ella. Junto a ella, su hija, expresión de nervios y valentía, con mochila en la espalda, mirando hacia la escuela.$hm16a$,
  $hm16b$Entrada de escuela en mañana soleada, camino con árboles, cielo azul claro.$hm16b$,
  $hm16c$Un brillo sutil dorado rodea las manos unidas, simbolizando la valentía compartida. La magia debe sentirse esperanzadora y completamente integrada dentro de una fotografía realista.$hm16c$,
  $hm16d$Luz de mañana cálida y esperanzadora. Predominan azul cielo claro, verde naturaleza, amarillo sol mañanero. Atmósfera de nuevo comienzo y apoyo maternal.$hm16d$,
  $hm16e$El primer día de escuela llegó,
mi corazón nervioso latió,
pero tu mano sosteniendo la mía,
me dio toda la valentía.

Caminamos juntos hacia lo nuevo,
tu amor me dio el valor que llevo,
con tu sonrisa me animaste,
y mis miedos alejaste.

Gracias por estar en cada inicio,
por ser mi fuerza y mi servicio,
mi compañera en cada paso,
mi {APODO_DESTINATARIO}, mi abrazo.$hm16e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_16_Mi_Valiente_Compañera.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'Mi Enfermera del Alma De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_17_Mi_Enfermera_del_Alma.png',
  'SHE_TO_SHE',
  $hm17a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite cuidado devoto y consuelo cuando su hija no se siente bien.

Ligeramente descentrada sentada en un sofá acogedor, la mamá, expresión de ternura y cuidado, abrazando protectoramente a su hija, sosteniendo una taza de té con la otra mano. Recostada contra ella, su hija, expresión de gratitud y confianza, envuelta en una manta suave, mirando a su mamá.$hm17a$,
  $hm17b$Sala acogedora con sofá confortable, mesita con vaso de agua, peluches cerca.$hm17b$,
  $hm17c$Un vapor suave sale de la taza de té y un aura sanadora muy sutil rosa y dorada envuelve la escena. La magia debe sentirse reconfortante y completamente integrada dentro de una fotografía realista.$hm17c$,
  $hm17d$Luz suave y difusa de habitación. Predominan beige, crema, rosa pálido y lavanda claro. Atmósfera de cuidado amoroso y confort.$hm17d$,
  $hm17e$Cuando la fiebre me hace temblar,
tú estás ahí para cuidar,
con tu mano en mi frente,
me siento mejor inmediatamente.

Tu sopa sabe a medicina,
tu amor es mi vitamina,
con tu cuidado y tu ternura,
cualquier enfermedad cura.

Gracias por cuidarme sin descanso,
por ser mi enfermera en cada caso,
mi sanadora del corazón,
mi {APODO_DESTINATARIO}, mi curación.$hm17e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_17_Mi_Enfermera_del_Alma.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'Secadora de Tristezas De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_18_Secadora_de_Tristezas.png',
  'SHE_TO_SHE',
  $hm18a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo profundo cuando mamá seca cada lágrima con ternura infinita.

Ligeramente descentrada arrodillada a la altura de su hija, la mamá, expresión de empatía profunda, secando suavemente una lágrima de su mejilla con el pulgar. Frente a ella, su hija, expresión vulnerable pero encontrando alivio, con lágrimas siendo secadas, mirando a su mamá buscando consuelo.$hm18a$,
  $hm18b$Ambiente íntimo suave en sala o habitación, luz cálida difusa.$hm18b$,
  $hm18c$Un aura de consuelo suave rosa y lavanda emana del contacto entre madre e hija. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$hm18c$,
  $hm18d$Luz cálida y difusa. Predominan rosa suave, lavanda claro, crema y beige. Atmósfera de refugio emocional y consuelo.$hm18d$,
  $hm18e$Cuando las lágrimas caen sin parar,
tú siempre estás para secar,
con tu pulgar suave y tierno,
alejas todo lo que es eterno.

No preguntas, solo abrazas,
y todas mis tristezas desplazas,
tu amor es el pañuelo perfecto,
que seca mi llanto directo.

Gracias por secar cada lágrima,
por ser mi consuelo y mi rima,
mi secadora de tristezas,
mi {APODO_DESTINATARIO}, mi fortaleza.$hm18e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_18_Secadora_de_Tristezas.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'Lecciones de Fortaleza De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_19_Lecciones_de_Fortaleza.png',
  'SHE_TO_SHE',
  $hm19a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite empoderamiento y la lección de levantarse con las propias fuerzas.

Ligeramente descentrada extendiendo la mano sin levantar completamente a su hija, la mamá, expresión alentadora y sabia, en ropa deportiva casual, enseñando con paciencia. Levantándose con determinación, su hija, expresión de determinación valiente, con rodilla raspada, extendiendo su mano hacia su mamá.$hm19a$,
  $hm19b$Parque o sendero natural con árboles, cielo claro, camino donde ocurrió la caída.$hm19b$,
  $hm19c$Partículas doradas de fortaleza flotan sutilmente alrededor de su hija mientras se levanta. La magia debe sentirse empoderadora y completamente integrada dentro de una fotografía realista.$hm19c$,
  $hm19d$Luz natural clara y fuerte. Predominan verde naturaleza, azul cielo, marrón tierra y dorado fortaleza. Atmósfera de crecimiento y empoderamiento.$hm19d$,
  $hm19e$Me enseñas que caer está bien,
que levantarse es el bien también,
con tu ejemplo de valentía,
aprendo a enfrentar cada día.

No me proteges de todo dolor,
me enseñas a ser luchador,
con tu sabiduría maternal,
me haces fuerte y especial.

Gracias por enseñarme a ser valiente,
por hacerme fuerte y consciente,
mi maestra de fortaleza,
mi {APODO_DESTINATARIO}, mi grandeza.$hm19e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_19_Lecciones_de_Fortaleza.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Mamá, Mi Heroína'),
  'Mamá Mi Mejor Amiga De Hija a Mamá',
  'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_20_Mamá_Mi_Mejor_Amiga.png',
  'SHE_TO_SHE',
  $hm20a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad genuina y la alegría de una amistad que trasciende el rol de madre.

Ligeramente descentradas riendo juntas en un banco de parque, la mamá, expresión de risa genuina, con ropa casual moderna, brazo alrededor de su hija. Junto a ella, su hija, expresión de risa y confianza, compartiendo un helado, contando algo con complicidad.$hm20a$,
  $hm20b$Parque con flores, luz natural brillante, ambiente alegre y colorido.$hm20b$,
  $hm20c$Pequeñas partículas de felicidad (corazones y estrellas sutiles) flotan alrededor de ambas mientras ríen. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$hm20c$,
  $hm20d$Luz natural brillante y alegre. Predominan rosa brillante, amarillo sol, verde fresco y dorado felicidad. Atmósfera de amistad genuina y diversión.$hm20d$,
  $hm20e$Eres más que mi mamá querida,
eres mi mejor amiga en la vida,
compartimos secretos y risas,
momentos de amor sin prisas.

Contigo puedo ser yo mismo,
sin juicios, con tu carisma,
eres mi confidente especial,
mi amiga, mi amor maternal.

Gracias por ser mi mejor amiga,
por hacer mi vida tan bendiga,
mi {APODO_DESTINATARIO}, mi compañera,
mi amiga verdadera.$hm20e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas_Hija/PLANTILLA_20_Mamá_Mi_Mejor_Amiga.png');
