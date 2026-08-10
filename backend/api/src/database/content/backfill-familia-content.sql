-- backfill-familia-content.sql — generado por scratchpad/gen_familia_backfill.py
-- Contenido de prompt (scene_visual/poem_template/character_roles/etc) para
-- los libros de Familia. Matchea por template_preview_key. Idempotente
-- (UPDATE incondicional): si el maestro se corrige, el fix llega solo en boot.

BEGIN;

UPDATE personalized_templates SET
  scene_visual = $f1a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza heroica y la certeza de que el amor de mamá lo hace invencible.

Ligeramente descentrada sobre una azotea de ciudad al atardecer, la mamá, expresión fuerte, confiada y protectora, vistiendo un bodysuit superheroico en rosa intenso, púrpura y dorado, cabello ondeando dramáticamente con el viento, una mano extendida protectoramente hacia su hijo. Junto a ella, su hijo, expresión de admiración y orgullo, con ropa casual infantil, mirando a su mamá con asombro.$f1a$,
  background_details = $f1b$Skyline de ciudad al atardecer con rascacielos, cielo dramático en tonos naranja, rosa y púrpura, luces de ciudad encendiéndose.$f1b$,
  magic_effects = $f1c$Un aura brillante rosa y dorada envuelve a la mamá, con partículas de energía flotando suavemente. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$f1c$,
  lighting_color = $f1d$Iluminación dramática de atardecer con rayos de luz solar atravesando las nubes. Predominan rosa intenso, púrpura, dorado y naranja atardecer. Atmósfera cinematográfica épica.$f1d$,
  poem_template = $f1e$No necesitas capa para volar,
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
mi superheroína a toda hora.$f1e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_1_Mi_Superheroína_Sin_Capa.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f2a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite valentía y la certeza de que el coraje de mamá es su mejor enseñanza.

Ligeramente descentrada en un campo al amanecer, la mamá, expresión determinada y victoriosa, vistiendo armadura elegante de guerrera en rosa metálico, púrpura y dorado, sosteniendo un escudo con corazón grabado y una espada apuntando al cielo. Junto a ella, su hijo, expresión valiente y orgullosa, con túnica de aprendiz, sosteniendo un pequeño escudo de madera.$f2a$,
  background_details = $f2b$Campo abierto al amanecer con montañas al fondo, cielo dramático en rosa, naranja y dorado, banderas ondeando suavemente.$f2b$,
  magic_effects = $f2c$La armadura de la mamá brilla con reflejos metálicos y un aura dorada la envuelve. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$f2c$,
  lighting_color = $f2d$Iluminación heroica de amanecer con rayos de luz dorada atravesando nubes. Predominan rosa metálico, púrpura, dorado y naranja amanecer. Atmósfera victoriosa e inspiracional.$f2d$,
  poem_template = $f2e$Eres la guerrera más valiente,
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
mi mamá, mi amor indestructible.$f2e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_2_La_Guerrera_Que_Nunca_Se_Rinde.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f3a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad tierna y la certeza de que mamá gobierna el corazón de su hijo con amor.

Ligeramente descentrada sentada en un trono dorado y rosa, la mamá, expresión amorosa y serena, con corona delicada dorada y gemas rosas, vestido de reina fluido en tonos rosa suave y lavanda, una mano extendida hacia su hijo. Junto al trono, su hijo, expresión de amor y admiración, con outfit elegante de príncipe infantil, sosteniendo la mano de su mamá.$f3a$,
  background_details = $f3b$Salón de trono mágico con columnas elegantes, ventanales con luz suave, cortinas de terciopelo rosa y dorado, flores decorativas.$f3b$,
  magic_effects = $f3c$Partículas doradas flotan suavemente alrededor del trono. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$f3c$,
  lighting_color = $f3d$Iluminación suave y cálida tipo cuento de hadas. Predominan rosa suave, lavanda, dorado y blanco marfil. Atmósfera elegante y amorosa.$f3d$,
  poem_template = $f3e$Eres la reina de mi corazón,
con tu corona de amor y pasión,
gobiernas mi mundo con ternura,
tu amor es mi mayor aventura.

Tu trono está en mi alma,
tu reino es mi calma,
con tu cetro de cariño,
me guías desde que soy niño.

No necesitas castillo ni oro,
tu riqueza es el amor que atesoro,
gracias por ser mi reina amada,
mi mamá, mi todo, mi adorada.$f3e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_3_Mi_Reina_Mi_Todo.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f4a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz celestial y la certeza de estar protegido bajo el amor incondicional de mamá.

Ligeramente descentrada, la mamá, expresión serena y protectora, con grandes alas de ángel blancas y doradas desplegadas, vestido largo blanco fluido, abrazando suavemente a su hijo. Envuelto en sus alas, su hijo, expresión de paz y confianza, con ropa clara y suave, mirando hacia arriba.$f4a$,
  background_details = $f4b$Cielo etéreo con nubes suaves blancas y doradas, luz divina emanando desde arriba.$f4b$,
  magic_effects = $f4c$Un halo sutil de luz dorada brilla sobre la cabeza de la mamá y partículas brillantes flotan como polvo de estrellas. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$f4c$,
  lighting_color = $f4d$Iluminación celestial suave con tonos dorados y blancos. Predominan blanco, crema, dorado suave y celeste claro. Atmósfera de protección divina y paz.$f4d$,
  poem_template = $f4e$Eres el ángel que Dios me envió,
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
mi mamá, mi consuelo.$f4e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_4_Mi_Ángel_Protector.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f5a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro mágico y la certeza de que el amor de mamá puede hacer milagros.

Ligeramente descentrada en un bosque místico, la mamá, expresión sabia y amorosa, vistiendo túnica de maga en púrpura profundo, azul místico y dorado, una mano extendida emanando partículas de luz, otra sosteniendo una vara mágica. Junto a ella, su hijo, expresión de asombro y fascinación, con túnica simple de aprendiz, extendiendo sus propias manos intentando imitar la magia.$f5a$,
  background_details = $f5b$Bosque encantado con árboles antiguos cubiertos de musgo brillante, luces mágicas flotando, luna llena parcialmente visible.$f5b$,
  magic_effects = $f5c$Partículas doradas, púrpuras y azules flotan por todo el bosque, y orbes de luz brillan entre las ramas. La magia debe sentirse mística y completamente integrada dentro de una fotografía realista.$f5c$,
  lighting_color = $f5d$Iluminación mágica emanando de las manos de la mamá contra la penumbra del bosque. Predominan púrpura profundo, azul místico, dorado y turquesa mágico. Atmósfera mística y encantadora.$f5d$,
  poem_template = $f5e$Con tu magia haces milagros,
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
mi mamá, la más maravillosa.$f5e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_5_La_Maga_de_Mi_Vida.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f6a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite determinación y la certeza de que mamá guía el rumbo con firmeza y amor.

Ligeramente descentrada al timón, la mamá, expresión determinada y confiada, con uniforme de capitana naval azul marino con botones dorados, cabello recogido en trenza práctica, sosteniendo el timón con ambas manos. Junto a ella, su hijo, expresión aventurera, con outfit náutico infantil, sosteniendo un catalejo mirando al horizonte.$f6a$,
  background_details = $f6b$Barco de madera en mar abierto, olas dinámicas, cielo de atardecer dramático, velas infladas por el viento.$f6b$,
  magic_effects = $f6c$El spray de agua marina brilla con destellos dorados de atardecer. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$f6c$,
  lighting_color = $f6d$Iluminación dramática de atardecer marino. Predominan azul marino profundo, dorado atardecer, naranja y blanco velas. Atmósfera de aventura y exploración.$f6d$,
  poem_template = $f6e$Eres la capitana de mi barco,
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
mi mamá, mi cielo, mi miel.$f6e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_6_Mi_Capitana_del_Corazón.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f7a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite protección silenciosa y la certeza de que mamá aleja cualquier miedo sin hacer ruido.

Ligeramente descentrada en postura de combate elegante, la mamá, expresión concentrada y alerta, con outfit ninja en negro, púrpura oscuro y detalles plateados, cabello recogido en moño alto. Detrás de ella protegido, su hijo, expresión segura y admirada, con outfit ninja infantil, en postura de aprendiz imitando a su mamá.$f7a$,
  background_details = $f7b$Templo japonés tradicional al anochecer, árboles de cerezo con flores cayendo, luna llena grande y brillante.$f7b$,
  magic_effects = $f7c$Pétalos de cerezo flotan suavemente en el aire bajo la luz lunar. La magia debe sentirse mística y completamente integrada dentro de una fotografía realista.$f7c$,
  lighting_color = $f7d$Iluminación lunar dramática con sombras suaves. Predominan negro, púrpura oscuro, plateado y azul nocturno. Atmósfera mística y protectora.$f7d$,
  poem_template = $f7e$Eres la ninja de mi vida,
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
mi mamá, mi protectora celestial.$f7e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_7_Mi_Ninja_Silenciosa.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f8a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ferocidad protectora y el orgullo de un hijo aprendiendo de su guerrera.

Ligeramente descentrada en pose noble de amazona, la mamá, expresión feroz y determinada, con outfit de amazona en tonos tierra, verde y dorado, trenzas guerreras y plumas decorativas, un arco decorativo colgado al hombro. Junto a ella, su hijo, expresión valiente y orgullosa, con outfit tribal infantil, sosteniendo un pequeño escudo de madera.$f8a$,
  background_details = $f8b$Selva exuberante con cascada, vegetación densa, luz natural filtrándose entre hojas.$f8b$,
  magic_effects = $f8c$Gotas de agua de la cascada brillan al reflejar la luz, y hojas flotan suavemente en el aire. La magia debe sentirse poderosa y completamente integrada dentro de una fotografía realista.$f8c$,
  lighting_color = $f8d$Luz natural filtrada de selva. Predominan verde selva, marrón tierra, dorado y turquesa agua. Atmósfera de tribu guerrera y naturaleza poderosa.$f8d$,
  poem_template = $f8e$Eres la amazona más feroz,
con tu arco y flecha de amor veloz,
proteges tu tribu de uno,
yo soy tu tesoro, tu todo en uno.

Tu valentía no tiene igual,
tu fuerza es monumental,
con tu corazón de guerrera,
me enseñas a luchar de manera sincera.

Gracias por ser mi amazona,
mi protectora en toda zona,
mi mamá, mi guerrera de honor,
mi amazona llena de amor.$f8e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_8_Mi_Amazona_Guerrera.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f9a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite devoción serena y la certeza de un amor materno divino.

Ligeramente descentrada frente a un templo griego flotante, la mamá, expresión serena y amorosa, con toga griega blanca y dorada, corona de flores rosas, una mano extendida emanando pequeños corazones brillantes. Junto a ella, su hijo, expresión de adoración y paz, con túnica blanca simple, recibiendo la luz amorosa.$f9a$,
  background_details = $f9b$Templo griego con columnas blancas flotando en cielo de nubes doradas y rosadas, pétalos de rosa flotando.$f9b$,
  magic_effects = $f9c$Corazones brillantes flotan suavemente entre ambas, y rayos de luz dorada atraviesan las nubes. La magia debe sentirse divina y completamente integrada dentro de una fotografía realista.$f9c$,
  lighting_color = $f9d$Iluminación celestial dorada. Predominan blanco, dorado brillante, rosa suave y lavanda celestial. Atmósfera divina y pacífica.$f9d$,
  poem_template = $f9e$Eres la diosa de mi universo,
con tu amor puro y diverso,
gobiernas mi mundo con ternura,
tu amor es mi mayor aventura.

Tu templo está en mi corazón,
tu poder es pura devoción,
con tu luz divina me iluminas,
y todas mis penas eliminas.

Gracias por ser mi diosa amada,
mi mamá, mi luz adorada,
diosa del amor maternal,
mi tesoro celestial.$f9e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_9_Mi_Diosa_del_Amor_Eterno.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f10a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza monumental y la seguridad absoluta de un hijo en brazos de su titán.

Ligeramente descentrada en escala poderosa, la mamá, expresión poderosa y amorosa, con túnica de titán en bronce, dorado y blanco, cargando en brazos a su hijo con facilidad. En sus brazos, su hijo, expresión de seguridad y confianza, abrazándola con paz total.$f10a$,
  background_details = $f10b$Cima de montaña alta con nubes alrededor, cielo dramático con rayos de luz atravesando nubes.$f10b$,
  magic_effects = $f10c$Un aura dorada de poder rodea a la mamá y el viento mueve dramáticamente su cabello y túnica. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$f10c$,
  lighting_color = $f10d$Iluminación épica dramática con rayos de luz atravesando nubes. Predominan bronce, dorado, blanco y gris nubes. Atmósfera mitológica y protectora.$f10d$,
  poem_template = $f10e$Eres el titán de mi vida,
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
mi mamá, mi amor grandioso.$f10e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_10_Mi_Titán_Inquebrantable.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f11a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite honor y disciplina, con su hijo aprendiendo el camino del guerrero de amor de su mamá.

Ligeramente descentrada en posición de combate honorable, la mamá, expresión honorable y sabia, con kimono samurái en rosa oscuro, negro y dorado, sosteniendo una katana con ambas manos en posición ceremonial. Junto a ella, su hijo, expresión de respeto y concentración, con kimono simple infantil, sosteniendo un bokken de madera.$f11a$,
  background_details = $f11b$Jardín zen japonés con puente rojo arqueado, árboles de cerezo en flor, templo japonés al fondo.$f11b$,
  magic_effects = $f11c$Pétalos de cerezo caen suavemente reflejándose en el agua del estanque. La magia debe sentirse honorable y completamente integrada dentro de una fotografía realista.$f11c$,
  lighting_color = $f11d$Iluminación suave de amanecer japonés. Predominan rosa oscuro, negro, dorado, rosa cerezo y verde zen. Atmósfera de honor, disciplina y tradición.$f11d$,
  poem_template = $f11e$Eres la samurái de mi hogar,
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
mi mamá, mi inspiración.$f11e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_11_Mi_Samurái_de_Honor.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f12a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite heroísmo cotidiano: mamá no necesita traje especial para ser la heroína de su hijo.

Ligeramente descentrada en su hogar, la mamá, expresión cálida y natural, con ropa cotidiana en colores suaves, abrazando protectoramente a su hijo, un aura rosa y dorada brillando sutilmente a su alrededor sin traje especial. Abrazándola, su hijo, expresión de amor y seguridad, con ropa casual cómoda.$f12a$,
  background_details = $f12b$Interior de hogar acogedor con fotos familiares en las paredes, muebles cómodos, luz cálida.$f12b$,
  magic_effects = $f12c$Partículas doradas flotan suavemente alrededor del abrazo, como magia cotidiana. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$f12c$,
  lighting_color = $f12d$Iluminación cálida de hogar con brillo heroico sutil. Predominan beige, crema, marrón suave con acentos rosa y dorado. Atmósfera de heroísmo cotidiano.$f12d$,
  poem_template = $f12e$No vistes capa ni traje especial,
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
mi mamá, mi héroe favorito.$f12e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_12_La_Heroína_Que_No_Necesita_Capa.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f13a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sanación emocional y la certeza de que un abrazo de mamá cura cualquier dolor.

Ligeramente descentrada, la mamá, expresión de ternura profunda, sentada abrazando completamente a su hijo contra su pecho, con ropa cómoda y suave en colores cálidos pastel. Envuelto en el abrazo, su hijo, expresión de paz y consuelo, con rostro contra el hombro de su mamá.$f13a$,
  background_details = $f13b$Ambiente íntimo de sala acogedora, luz cálida difusa, elementos de hogar desenfocados.$f13b$,
  magic_effects = $f13c$Un aura sanadora rosa suave y dorada emana del abrazo, con pequeños corazones flotando. La magia debe sentirse reconfortante y completamente integrada dentro de una fotografía realista.$f13c$,
  lighting_color = $f13d$Luz suave y cálida difusa. Predominan rosa suave, lavanda claro, dorado cálido y crema. Atmósfera de sanación emocional y refugio.$f13d$,
  poem_template = $f13e$Tus abrazos tienen magia especial,
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
mi mamá, mi bendición.$f13e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_13_Tus_Abrazos_Mágicos.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f14a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura nocturna y el ritual sagrado del beso de buenas noches.

Ligeramente descentrada inclinada sobre la cama, la mamá, expresión de ternura infinita, besando suavemente la frente de su hijo, una mano acariciando su cabello. Acostado en la cama, su hijo, expresión de paz y somnolencia, con ojos cerrados recibiendo el beso.$f14a$,
  background_details = $f14b$Habitación infantil acogedora de noche, ventana con luna llena y estrellas, peluches cerca.$f14b$,
  magic_effects = $f14c$Partículas mágicas como polvo de estrellas flotan suavemente por la habitación. La magia debe sentirse tierna y completamente integrada dentro de una fotografía realista.$f14c$,
  lighting_color = $f14d$Luz suave de luna entrando por la ventana. Predominan azul nocturno suave, lavanda, plateado lunar y rosa pálido. Atmósfera de ritual nocturno y paz.$f14d$,
  poem_template = $f14e$Cada noche antes de dormir,
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
mi mamá, mi protector.$f14e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_14_El_Ritual_Más_Sagrado.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f15a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad culinaria y memorias dulces creadas juntas.

Ligeramente descentrada en la cocina, la mamá, expresión feliz y paciente, con delantal decorativo, ayudando a su hijo a mezclar ingredientes. Junto a ella en un mesón, su hijo, expresión de concentración feliz, con delantal pequeño, decorando con ingredientes.$f15a$,
  background_details = $f15b$Cocina acogedora familiar con ingredientes frescos, utensilios, plantas en la ventana con luz natural.$f15b$,
  magic_effects = $f15c$Partículas de harina o polvo dorado flotan sutilmente en el aire de la cocina. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$f15c$,
  lighting_color = $f15d$Luz natural cálida de cocina. Predominan amarillo suave, naranja, marrón madera y verde fresco. Atmósfera familiar y alegre.$f15d$,
  poem_template = $f15e$En la cocina juntos creamos,
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
mi mamá, mi tesoro sencillo.$f15e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_15_Recetas_de_Amor.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f16a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el valor de un nuevo comienzo caminado de la mano.

Ligeramente descentradas caminando hacia la escuela, la mamá, expresión alentadora y orgullosa, sosteniendo firmemente la mano de su hijo, inclinándose con ánimo hacia ella. Junto a ella, su hijo, expresión de nervios y valentía, con mochila en la espalda, mirando hacia la escuela.$f16a$,
  background_details = $f16b$Entrada de escuela en mañana soleada, camino con árboles, cielo azul claro.$f16b$,
  magic_effects = $f16c$Un brillo sutil dorado rodea las manos unidas, simbolizando la valentía compartida. La magia debe sentirse esperanzadora y completamente integrada dentro de una fotografía realista.$f16c$,
  lighting_color = $f16d$Luz de mañana cálida y esperanzadora. Predominan azul cielo claro, verde naturaleza, amarillo sol mañanero. Atmósfera de nuevo comienzo y apoyo maternal.$f16d$,
  poem_template = $f16e$El primer día de escuela llegó,
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
mi mamá, mi abrazo.$f16e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_16_Mi_Valiente_Compañera.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f17a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite cuidado devoto y consuelo cuando su hijo no se siente bien.

Ligeramente descentrada sentada en un sofá acogedor, la mamá, expresión de ternura y cuidado, abrazando protectoramente a su hijo, sosteniendo una taza de té con la otra mano. Recostado contra ella, su hijo, expresión de gratitud y confianza, envuelto en una manta suave, mirando a su mamá.$f17a$,
  background_details = $f17b$Sala acogedora con sofá confortable, mesita con vaso de agua, peluches cerca.$f17b$,
  magic_effects = $f17c$Un vapor suave sale de la taza de té y un aura sanadora muy sutil rosa y dorada envuelve la escena. La magia debe sentirse reconfortante y completamente integrada dentro de una fotografía realista.$f17c$,
  lighting_color = $f17d$Luz suave y difusa de habitación. Predominan beige, crema, rosa pálido y lavanda claro. Atmósfera de cuidado amoroso y confort.$f17d$,
  poem_template = $f17e$Cuando la fiebre me hace temblar,
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
mi mamá, mi curación.$f17e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_17_Mi_Enfermera_del_Alma.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f18a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo profundo cuando mamá seca cada lágrima con ternura infinita.

Ligeramente descentrada arrodillada a la altura de su hijo, la mamá, expresión de empatía profunda, secando suavemente una lágrima de su mejilla con el pulgar. Frente a ella, su hijo, expresión vulnerable pero encontrando alivio, con lágrimas siendo secadas, mirando a su mamá buscando consuelo.$f18a$,
  background_details = $f18b$Ambiente íntimo suave en sala o habitación, luz cálida difusa.$f18b$,
  magic_effects = $f18c$Un aura de consuelo suave rosa y lavanda emana del contacto entre madre e hijo. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$f18c$,
  lighting_color = $f18d$Luz cálida y difusa. Predominan rosa suave, lavanda claro, crema y beige. Atmósfera de refugio emocional y consuelo.$f18d$,
  poem_template = $f18e$Cuando las lágrimas caen sin parar,
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
mi mamá, mi fortaleza.$f18e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_18_Secadora_de_Tristezas.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f19a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite empoderamiento y la lección de levantarse con las propias fuerzas.

Ligeramente descentrada extendiendo la mano sin levantar completamente a su hijo, la mamá, expresión alentadora y sabia, en ropa deportiva casual, enseñando con paciencia. Levantándose con determinación, su hijo, expresión de determinación valiente, con rodilla raspada, extendiendo su mano hacia su mamá.$f19a$,
  background_details = $f19b$Parque o sendero natural con árboles, cielo claro, camino donde ocurrió la caída.$f19b$,
  magic_effects = $f19c$Partículas doradas de fortaleza flotan sutilmente alrededor de su hijo mientras se levanta. La magia debe sentirse empoderadora y completamente integrada dentro de una fotografía realista.$f19c$,
  lighting_color = $f19d$Luz natural clara y fuerte. Predominan verde naturaleza, azul cielo, marrón tierra y dorado fortaleza. Atmósfera de crecimiento y empoderamiento.$f19d$,
  poem_template = $f19e$Me enseñas que caer está bien,
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
mi mamá, mi grandeza.$f19e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_19_Lecciones_de_Fortaleza.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f20a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad genuina y la alegría de una amistad que trasciende el rol de madre.

Ligeramente descentradas riendo juntas en un banco de parque, la mamá, expresión de risa genuina, con ropa casual moderna, brazo alrededor de su hijo. Junto a ella, su hijo, expresión de risa y confianza, compartiendo un helado, contando algo con complicidad.$f20a$,
  background_details = $f20b$Parque con flores, luz natural brillante, ambiente alegre y colorido.$f20b$,
  magic_effects = $f20c$Pequeñas partículas de felicidad (corazones y estrellas sutiles) flotan alrededor de ambas mientras ríen. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$f20c$,
  lighting_color = $f20d$Luz natural brillante y alegre. Predominan rosa brillante, amarillo sol, verde fresco y dorado felicidad. Atmósfera de amistad genuina y diversión.$f20d$,
  poem_template = $f20e$Eres más que mi mamá querida,
eres mi mejor amiga en la vida,
compartimos secretos y risas,
momentos de amor sin prisas.

Contigo puedo ser yo mismo,
sin juicios, con tu carisma,
eres mi confidente especial,
mi amiga, mi amor maternal.

Gracias por ser mi mejor amiga,
por hacer mi vida tan bendiga,
mi mamá, mi compañera,
mi amiga verdadera.$f20e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas/PLANTILLA_20_Mamá_Mi_Mejor_Amiga.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f1a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite admiración pura y la certeza de que un padre puede ser un superhéroe real sin necesidad de poderes.

Ligeramente descentrado en posición heroica elevada, el papá, expresión noble, fuerte y protectora, vistiendo un traje de superhéroe elegante en azul profundo y dorado con detalles plateados, capa larga ondeando dramáticamente, símbolo de corazón brillante en el pecho, postura de poder con puño levantado. Mirando hacia arriba con admiración, su hija, expresión de asombro y orgullo puro, con vestido casual en tonos rosa y lavanda, cabello moviéndose por el viento, brazos extendidos hacia su papá.$f1a$,
  background_details = $f1b$Ciudad moderna al atardecer, edificios altos con ventanas iluminadas, cielo dramático en tonos naranja y púrpura con nubes dinámicas.$f1b$,
  magic_effects = $f1c$Rayos de luz dorada emanan del pecho del papá y partículas brillantes flotan alrededor de ambos. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$f1c$,
  lighting_color = $f1d$Iluminación cinematográfica dramática con rayos de luz dorada atravesando las nubes. Predominan tonos dorados, azul profundo y naranja de atardecer. Atmósfera épica y poderosa.$f1d$,
  poem_template = $f1e${NOMBRE_DESTINATARIO}, eres mi superhéroe real,
Con poderes que no son de manual.
No necesitas capa ni disfraz,
Tu amor es tu superpoder más.

Me salvas cada día sin saber,
Con tu fuerza me haces crecer.
Eres mi protector y mi verdad,
Mi {APODO_DESTINATARIO}, mi héroe de verdad.$f1e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_1_Mi_Superhéroe_Personal.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f2a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite nobleza medieval y la certeza de estar protegida por el caballero más leal.

Ligeramente descentrado en postura heroica, el papá, expresión noble, valiente y protectora, vistiendo armadura medieval plateada con detalles dorados, capa azul ondeando, espada resplandeciente en posición de descanso noble, escudo con símbolo de corazón. Frente a él como su princesa protegida, su hija, expresión de admiración y ternura, con vestido de princesa medieval en tonos rosa pastel y dorado, pequeña tiara brillante, mano extendida tocando suavemente el escudo.$f2a$,
  background_details = $f2b$Castillo majestuoso de piedra gris con torres altas, banderas azules y doradas ondeando, campo verde con flores silvestres, montañas en la distancia.$f2b$,
  magic_effects = $f2c$La armadura del papá brilla con reflejos dorados de luz solar, y pétalos de flores medievales flotan suavemente en el aire. La magia debe sentirse noble y completamente integrada dentro de una fotografía realista.$f2c$,
  lighting_color = $f2d$Iluminación de día medieval dorado con tonos cálidos, sombras suaves. Predominan plateado, dorado y azul real. Atmósfera de nobleza y valentía.$f2d$,
  poem_template = $f2e${NOMBRE_DESTINATARIO}, eres mi caballero leal,
Con armadura de amor celestial.
Luchas por mí sin descansar,
Tu honor me hace suspirar.

No necesitas espada ni escudo,
Tu corazón es mi refugio agudo.
Eres mi guerrero y mi verdad,
Mi {APODO_DESTINATARIO}, mi caballero de verdad.$f2e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_2_Mi_Caballero_de_Armadura_Brillante.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f3a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad y la certeza de que en el reino del corazón de su hija, el papá es el rey absoluto.

Ligeramente descentrado sentado en un trono dorado, el papá, expresión noble y cálida, vistiendo túnica real púrpura con bordados dorados, corona con joyas brillantes, cetro dorado en mano. A su lado como princesa del reino, su hija, expresión de orgullo y amor, con vestido de princesa en rosa y dorado, corona pequeña brillante, mano sosteniendo la de su papá.$f3a$,
  background_details = $f3b$Salón del trono real con columnas doradas, tapices púrpura y dorado, ventanas arqueadas con vitrales de luz colorida, alfombra roja con detalles dorados.$f3b$,
  magic_effects = $f3c$Luz divina dorada cae desde arriba iluminando el trono. La magia debe sentirse majestuosa y completamente integrada dentro de una fotografía realista.$f3c$,
  lighting_color = $f3d$Iluminación dramática con rayos de luz dorada desde arriba, sombras suaves. Predominan dorado, púrpura profundo y rojo real. Atmósfera de poder noble y amor familiar.$f3d$,
  poem_template = $f3e${NOMBRE_DESTINATARIO}, eres mi rey absoluto,
Quien gobierna mi corazón en bruto.
Tu reino es mi corazón entero,
Donde tú eres el heredero.

No necesitas trono ni corona,
Tu amor es quien me emociona.
Eres mi monarca y mi verdad,
Mi {APODO_DESTINATARIO}, mi rey de verdad.$f3e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_3_Mi_Rey.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f4a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz celestial y la certeza de estar protegida bajo unas alas de amor incondicional.

Ligeramente descentrado con postura protectora celestial, el papá, expresión serena y protectora, vistiendo túnica blanca elegante con detalles dorados, alas de ángel grandes y brillantes extendidas, aureola dorada sutil sobre su cabeza. Protegida frente a él, su hija, expresión de paz y seguridad total, con vestido en tonos pastel celeste, manos juntas en gesto de gratitud, mirando a su papá ángel.$f4a$,
  background_details = $f4b$Cielo divino en tonos azul suave, blanco puro y dorado celestial, nubes esponjosas flotando, rayos de luz divina atravesando las nubes.$f4b$,
  magic_effects = $f4c$Plumas blancas flotan suavemente en el aire junto con partículas de luz dorada. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$f4c$,
  lighting_color = $f4d$Iluminación celestial suave con tonos dorados y blancos, sombras delicadas. Atmósfera de paz y amor divino.$f4d$,
  poem_template = $f4e${NOMBRE_DESTINATARIO}, eres mi ángel guardián,
Quien cuida de mí sin afán.
Tus alas me protegen del mal,
Tu luz es mi guía celestial.

No necesitas cielo ni altar,
Tu amor me hace volar.
Eres mi protector divino y real,
Mi {APODO_DESTINATARIO}, mi ángel celestial.$f4e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_4_Mi_Ángel_Guardián.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f5a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite aventura y la complicidad de navegar la vida junto al capitán más valiente.

Ligeramente descentrado en el timón, el papá, expresión aventurera y carismática, vistiendo traje de pirata elegante con chaleco de cuero y sombrero tricornio con pluma, brújula dorada en mano. Sobre sus hombros como su primera oficial, su hija, expresión emocionada y feliz, con pañuelo pirata en la cabeza, catalejo en mano, mirando al horizonte.$f5a$,
  background_details = $f5b$Océano turquesa con olas dinámicas, barco pirata de madera con velas desplegadas y bandera con símbolo de corazón, cielo de atardecer con nubes naranjas y púrpuras, isla tropical en la distancia.$f5b$,
  magic_effects = $f5c$El cofre del tesoro cercano brilla con destellos dorados de monedas y joyas. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$f5c$,
  lighting_color = $f5d$Iluminación de atardecer cálido con tonos dorados y naranjas, sombras dinámicas. Atmósfera de aventura épica y complicidad padre-hija.$f5d$,
  poem_template = $f5e${NOMBRE_DESTINATARIO}, eres mi pirata valiente,
Quien navega mi corazón de frente.
Tu aventura es mi emoción,
Tu brújula marca mi dirección.

No necesitas barco ni tesoro,
Tu amor es mi mayor decoro.
Eres mi aventurero y mi verdad,
Mi {APODO_DESTINATARIO}, mi pirata de verdad.$f5e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_5_Mi_Pirata_Aventurero.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f6a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza protectora y la victoria silenciosa de un padre que lucha con amor.

Ligeramente descentrado en postura victoriosa, el papá, expresión fuerte pero amorosa, vistiendo armadura de guerrero en bronce y negro, capa roja ondeando, escudo con símbolo de corazón, espada en alto. Protegida junto a él, su hija, expresión de admiración y seguridad, con ropa clara sencilla, mano tocando el escudo de su papá.$f6a$,
  background_details = $f6b$Campo victorioso al atardecer, colinas verdes, cielo dramático en tonos naranja y rojo, banderas ondeando.$f6b$,
  magic_effects = $f6c$El escudo del papá refleja destellos dorados del atardecer. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$f6c$,
  lighting_color = $f6d$Iluminación dramática de atardecer con tonos rojos y dorados, sombras fuertes. Atmósfera épica de batalla ganada por amor.$f6d$,
  poem_template = $f6e${NOMBRE_DESTINATARIO}, eres mi guerrero fiel,
Quien lucha por mí hasta el nivel.
Tu fuerza es mi protección,
Tu valor mi inspiración.

No necesitas batalla ni escudo,
Tu corazón es mi refugio agudo.
Eres mi protector y mi verdad,
Mi {APODO_DESTINATARIO}, mi guerrero de verdad.$f6e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_6_Mi_Guerrero_Protector.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f7a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite confianza y liderazgo, con el papá guiando el rumbo con seguridad amorosa.

Ligeramente descentrado frente al avión, el papá, expresión confiada y profesional, vistiendo uniforme de piloto impecable con charreteras doradas y gorra de capitán, sosteniendo un mapa de vuelo. Como copiloto especial, su hija, expresión emocionada y confiada, con gorra de piloto pequeña, mirando los instrumentos de vuelo con curiosidad.$f7a$,
  background_details = $f7b$Cielo azul brillante al atardecer, nubes blancas y naranjas, avión moderno elegante, horizonte infinito.$f7b$,
  magic_effects = $f7c$La brújula dorada en manos del papá brilla suavemente. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$f7c$,
  lighting_color = $f7d$Iluminación de atardecer aéreo con tonos azules y dorados, sombras suaves. Atmósfera de aventura segura y confianza.$f7d$,
  poem_template = $f7e${NOMBRE_DESTINATARIO}, eres mi capitán seguro,
Quien guía mi rumbo más puro.
Tu dirección es mi destino,
Tu mapa mi camino.

No necesitas avión ni cielo,
Tu amor es mi mayor anhelo.
Eres mi piloto y mi verdad,
Mi {APODO_DESTINATARIO}, mi capitán de verdad.$f7e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_7_Mi_Capitán_Piloto.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f8a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza ancestral y el orgullo de una hija aprendiendo del guerrero más valiente.

Ligeramente descentrado en postura poderosa, el papá, expresión fuerte y protectora, vistiendo armadura vikinga con pieles, casco vikingo sin cuernos (históricamente correcto), hacha de guerra en mano, escudo con símbolos nórdicos. Junto a él como su pequeña guerrera, su hija, expresión valiente y orgullosa, con túnica vikinga adaptada, trenzas en el cabello, sosteniendo un escudo pequeño de juguete.$f8a$,
  background_details = $f8b$Paisaje nórdico con fiordos de agua azul profunda, montañas nevadas, cielo tormentoso con rayos de luz atravesando, barco vikingo con dragón tallado.$f8b$,
  magic_effects = $f8c$Símbolos rúnicos brillan sutilmente sobre el escudo del papá. La magia debe sentirse ancestral y completamente integrada dentro de una fotografía realista.$f8c$,
  lighting_color = $f8d$Iluminación dramática nórdica con tonos grises, azules y plateados, sombras fuertes. Atmósfera épica vikinga.$f8d$,
  poem_template = $f8e${NOMBRE_DESTINATARIO}, eres mi vikingo feroz,
Valiente y fuerte como una voz.
Tu fuerza conquista mi corazón,
Tu valor mi admiración.

No necesitas hacha ni barco,
Tu amor es mi mejor marco.
Eres mi guerrero nórdico real,
Mi {APODO_DESTINATARIO}, mi vikingo celestial.$f8e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_8_Mi_Vikingo_Valiente.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f9a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite creatividad e inspiración, con el papá construyendo mágicamente el futuro de su hija.

Ligeramente descentrado sosteniendo planos brillantes, el papá, expresión concentrada y amorosa, vistiendo camisa blanca arremangada y chaleco, herramientas de diseño doradas flotando alrededor. Observando con asombro, su hija, expresión de inspiración y felicidad, señalando hacia los castillos y edificios mágicos que su papá crea.$f9a$,
  background_details = $f9b$Espacio mágico de creación, planos arquitectónicos flotando transformándose en castillos y edificios, cielo en tonos azules y dorados.$f9b$,
  magic_effects = $f9c$Los planos brillantes se transforman lentamente en estructuras de luz dorada mientras flotan. La magia debe sentirse creativa y completamente integrada dentro de una fotografía realista.$f9c$,
  lighting_color = $f9d$Iluminación creativa con tonos azules, blancos y dorados, sombras suaves. Atmósfera de inspiración y construcción de sueños.$f9d$,
  poem_template = $f9e${NOMBRE_DESTINATARIO}, eres mi arquitecto ideal,
Quien construye mi vida especial.
Tus planos son mi futuro,
Tu diseño mi camino seguro.

No necesitas planos ni herramientas,
Tu amor construye mis cuentas.
Eres mi constructor y mi verdad,
Mi {APODO_DESTINATARIO}, mi arquitecto de verdad.$f9e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_9_Mi_Arquitecto_de_Sueños.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f10a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite triunfo y el orgullo desbordante de una hija celebrando a su campeón.

Ligeramente descentrado en postura victoriosa, el papá, expresión victoriosa pero amorosa, vistiendo armadura de gladiador romano con peto de bronce y capa roja corta, espada en alto, escudo con símbolo de corazón. Corriendo hacia él celebrando, su hija, expresión de orgullo y alegría extrema, con túnica romana blanca y corona de laurel pequeña, brazos abiertos.$f10a$,
  background_details = $f10b$Coliseo romano épico, arena dorada, columnas majestuosas, cielo azul con nubes dramáticas, banderas romanas ondeando.$f10b$,
  magic_effects = $f10c$Pétalos de flores caen suavemente celebrando la victoria del papá. La magia debe sentirse triunfal y completamente integrada dentro de una fotografía realista.$f10c$,
  lighting_color = $f10d$Iluminación dorada romana con tonos cálidos, sombras dramáticas. Atmósfera de victoria épica y orgullo familiar.$f10d$,
  poem_template = $f10e${NOMBRE_DESTINATARIO}, eres mi gladiador triunfante,
Fuerte, valiente y constante.
Tu victoria es mi orgullo,
Tu fuerza mi mejor arrullo.

No necesitas arena ni espada,
Tu amor es mi mejor jornada.
Eres mi campeón y mi verdad,
Mi {APODO_DESTINATARIO}, mi gladiador de verdad.$f10e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_10_Mi_Gladiador.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f11a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite honor y disciplina, con su hija mostrando respeto y admiración por su padre samurái.

Ligeramente descentrado en postura honorable, el papá, expresión seria y protectora, vistiendo armadura samurái tradicional en negro, rojo y dorado, katana en posición de descanso honorable. Junto a él como su aprendiz, su hija, expresión respetuosa y orgullosa, con kimono japonés en tonos rosa pastel, cabello recogido con flores de cerezo, manos juntas en gesto de honor.$f11a$,
  background_details = $f11b$Jardín zen japonés con cerezos en flor, puente de madera sobre estanque con carpas koi, templo japonés a la distancia, montañas neblinosas.$f11b$,
  magic_effects = $f11c$Pétalos de cerezo caen suavemente alrededor de ambos. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$f11c$,
  lighting_color = $f11d$Iluminación suave japonesa con tonos rosados y dorados, sombras delicadas. Atmósfera de honor y tradición.$f11d$,
  poem_template = $f11e${NOMBRE_DESTINATARIO}, eres mi samurái leal,
Con honor y disciplina celestial.
Tu espada protege mi corazón,
Tu código mi admiración.

No necesitas katana ni armadura,
Tu amor es mi mejoradura.
Eres mi guerrero honorable y real,
Mi {APODO_DESTINATARIO}, mi samurái celestial.$f11e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_11_Mi_Samurái.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f12a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite poder monumental y la seguridad absoluta de una hija protegida por una fuerza inmensa.

Ligeramente descentrado en escala épica, el papá, expresión poderosa pero amorosa, representado como titán gigante con energía cósmica dorada y azul emanando de su cuerpo, vestimenta de túnica épica. A sus pies en escala humana normal, su hija, expresión de asombro y seguridad total, mirando hacia arriba con admiración.$f12a$,
  background_details = $f12b$Paisaje monumental con montañas gigantes, cielo cósmico con nebulosas y estrellas, energía cósmica en tonos azul profundo y púrpura.$f12b$,
  magic_effects = $f12c$Partículas doradas y azules flotan alrededor del titán, con ondas de energía suaves. La magia debe sentirse monumental y completamente integrada dentro de una fotografía realista.$f12c$,
  lighting_color = $f12d$Iluminación cósmica dramática con tonos azules profundos, dorados y púrpuras, sombras épicas. Atmósfera de poder absoluto y amor protector.$f12d$,
  poem_template = $f12e${NOMBRE_DESTINATARIO}, eres mi titán poderoso,
Fuerte, grande y majestuoso.
Tu fuerza mueve mi mundo entero,
Tu poder es mi compañero.

No necesitas montañas ni cielo,
Tu amor es mi mayor anhelo.
Eres mi gigante y mi verdad,
Mi {APODO_DESTINATARIO}, mi titán de verdad.$f12e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_12_Mi_Titán.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f13a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura pura y el amor incondicional de un primer abrazo que define toda una vida.

Ligeramente descentrado en momento íntimo, el papá, expresión de amor puro y protección, vistiendo ropa casual cómoda, arrodillado a la altura de su hija, abrazándola tiernamente. En sus brazos, su hija, expresión de amor puro y seguridad total, con vestido simple en colores suaves, cabeza recostada en su pecho.$f13a$,
  background_details = $f13b$Sala de estar acogedora con luz natural suave, colores cálidos beige y crema, fotografías familiares en las paredes, sofá cómodo.$f13b$,
  magic_effects = $f13c$La luz natural crea un halo dorado suave alrededor del abrazo. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$f13c$,
  lighting_color = $f13d$Iluminación natural cálida con tonos dorados suaves, sombras delicadas. Atmósfera de ternura absoluta y amor puro.$f13d$,
  poem_template = $f13e${NOMBRE_DESTINATARIO}, fuiste mi primer amor,
El hombre que me enseñó el valor.
Antes de príncipes o cuentos de hadas,
Tú me mostraste lo que el amor nada.

Tu abrazo fue mi primer refugio,
Tu voz mi primer consuelo.
Eres mi primer amor y mi verdad,
Mi {APODO_DESTINATARIO}, mi amor de verdad.$f13e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_13_Mi_Primer_Amor.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f14a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría pura y la diversión de un baile improvisado en casa.

Ligeramente descentrados bailando, el papá, expresión de felicidad y diversión, vistiendo ropa casual elegante, sosteniendo las manos de su hija en posición de baile. Con los pies sobre los de su papá, su hija, expresión de alegría extrema y risa, con vestido que gira con el movimiento en tonos rosa vibrante.$f14a$,
  background_details = $f14b$Sala de estar familiar en tarde luminosa, piso de madera brillante, ventana con luz natural cálida, muebles movidos creando espacio de baile.$f14b$,
  magic_effects = $f14c$Un sutil efecto de movimiento captura el giro del vestido de su hija. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$f14c$,
  lighting_color = $f14d$Iluminación natural cálida con tonos dorados, efecto de movimiento capturado. Atmósfera de alegría y diversión.$f14d$,
  poem_template = $f14e${NOMBRE_DESTINATARIO}, cuando bailamos sin parar,
Mis pies sobre los tuyos al girar.
La música suena, el mundo desaparece,
Y en tus brazos todo florece.

No importa si no sé los pasos bien,
Contigo bailando todo está bien.
Eres mi pareja de baile y mi verdad,
Mi {APODO_DESTINATARIO}, mi bailarín de verdad.$f14e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_14_Cuando_Bailamos_en_la_Sala.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f15a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite empoderamiento y el orgullo de un padre coronando a su hija como la princesa que siempre fue.

Ligeramente descentrado frente al espejo, el papá, expresión de orgullo y amor, arrodillado a la altura de su hija, colocando una tiara brillante sobre su cabeza con cuidado. Mirándose al espejo, su hija, expresión de asombro y felicidad, con vestido elegante en tonos rosa y dorado, sonrisa de confianza.$f15a$,
  background_details = $f15b$Habitación elegante con espejo grande de marco dorado ornamentado, luz suave y dorada, cortinas elegantes.$f15b$,
  magic_effects = $f15c$La corona brilla suavemente reflejándose en el espejo. La magia debe sentirse empoderadora y completamente integrada dentro de una fotografía realista.$f15c$,
  lighting_color = $f15d$Iluminación dorada suave con reflejos en el espejo, sombras delicadas. Atmósfera de magia realista y empoderamiento.$f15d$,
  poem_template = $f15e${NOMBRE_DESTINATARIO}, me enseñaste desde pequeña,
Que soy una princesa, no una muñeca.
Me mostraste mi valor y mi corona,
Y que merezco quien me emociona.

No necesito castillo ni reino real,
Tu amor me hace sentir especial.
Eres quien me enseñó mi valor de verdad,
Mi {APODO_DESTINATARIO}, mi rey de verdad.$f15e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_15_Me_Enseñaste_Que_Soy_Una_Princesa.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f16a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad cotidiana y la calidez de un momento especial compartido.

Ligeramente descentrados en la mesa, el papá, expresión de felicidad y atención total, sosteniendo una taza de chocolate caliente, mirando a su hija con sonrisa genuina. Frente a él, su hija, expresión de felicidad pura, sosteniendo un helado grande de varios sabores, ojos brillantes.$f16a$,
  background_details = $f16b$Heladería acogedora con decoración vintage, mesas pequeñas, ventana mostrando calle con árboles, luz natural cálida.$f16b$,
  magic_effects = $f16c$Ninguno: escena cotidiana y cálida, sin elementos mágicos añadidos.$f16c$,
  lighting_color = $f16d$Iluminación natural cálida con tonos dorados y pasteles, sombras suaves. Atmósfera de complicidad y tiempo de calidad.$f16d$,
  poem_template = $f16e${NOMBRE_DESTINATARIO}, nuestras salidas son especiales,
Momentos únicos, casi rituales.
Helados, parques, o simplemente caminar,
Contigo cada cita es para recordar.

No importa el lugar ni la actividad,
Lo importante es nuestra complicidad.
Eres mi cita favorita y mi verdad,
Mi {APODO_DESTINATARIO}, mi compañero de verdad.$f16e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_16_Nuestras_Citas_de_Padre_e_Hija.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f17a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura cómica y el esfuerzo torpe pero amoroso de un padre aprendiendo a peinar.

Ligeramente descentrado detrás peinando con concentración, el papá, expresión de concentración extrema y ceño fruncido pero amoroso, sosteniendo un cepillo y una liga en la boca, intentando hacer una coleta. Sentada frente al espejo, su hija, expresión de diversión contenida, con coleta chueca resultado del intento, mirando el reflejo con sonrisa traviesa.$f17a$,
  background_details = $f17b$Baño familiar en mañana luminosa, espejo grande, tocador con cepillos y clips de cabello dispersos de forma caótica.$f17b$,
  magic_effects = $f17c$Ninguno: escena puramente cómica y cotidiana, sin elementos mágicos añadidos.$f17c$,
  lighting_color = $f17d$Iluminación natural de mañana con tonos cálidos, sombras suaves. Atmósfera de comedia familiar amorosa.$f17d$,
  poem_template = $f17e${NOMBRE_DESTINATARIO}, cuando intentas peinarme,
El resultado es para reírme.
Coletas chuecas, trenzas raras también,
Pero lo haces con amor, eso está bien.

No importa si no sale perfecto al final,
Tu esfuerzo es lo más especial.
Eres mi peluquero favorito y mi verdad,
Mi {APODO_DESTINATARIO}, mi peinador de verdad.$f17e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_17_Cuando_Me_Peinas_Aunque_No_Sepas.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f18a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite seriedad amorosa y la transmisión silenciosa de un valor de vida fundamental.

Ligeramente descentrados en conversación, el papá, expresión seria pero amorosa, sosteniendo la mano de su hija, mirada directa y firme. Escuchando con atención, su hija, expresión atenta y seria, con postura de escucha activa, ojos enfocados en su papá.$f18a$,
  background_details = $f18b$Biblioteca o estudio con libros en estantes, sillones cómodos, luz natural suave entrando por ventana.$f18b$,
  magic_effects = $f18c$Ninguno: escena seria y documental, sin elementos mágicos añadidos.$f18c$,
  lighting_color = $f18d$Iluminación natural suave con tonos cálidos pero serios, sombras delicadas. Atmósfera de lección de vida importante.$f18d$,
  poem_template = $f18e${NOMBRE_DESTINATARIO}, me enseñaste con tu ejemplo,
Cómo un hombre debe ser en todo tiempo.
Me mostraste respeto, amor y valor,
Y que merezco nada menos que lo mejor.

Estableciste el estándar tan alto,
Que ahora sé lo que no es falso.
Eres mi ejemplo y mi verdad,
Mi {APODO_DESTINATARIO}, mi maestro de verdad.$f18e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_18_El_Hombre_Que_Me_Enseñó_Cómo_Debo_Ser_Tratada.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f19a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite admiración pura y el instante mágico en que una hija se siente la más bonita del mundo.

Ligeramente descentrada bajando una escalera elegante, su hija, expresión de timidez mezclada con felicidad, con vestido especial bonito, cabello arreglado, buscando la aprobación de su papá. Mirándola con admiración total, el papá, expresión de admiración pura y orgullo, con mano en el corazón, sonrisa orgullosa.$f19a$,
  background_details = $f19b$Ambiente de hogar antes de evento especial, escalera elegante, luz natural cálida, flores frescas en jarrón.$f19b$,
  magic_effects = $f19c$Un efecto sutil de spotlight dorado ilumina a su hija como si su papá la viera brillar. La magia debe sentirse mágica y completamente integrada dentro de una fotografía realista.$f19c$,
  lighting_color = $f19d$Iluminación natural cálida con efecto de spotlight dorado sobre su hija, sombras suaves.  Atmósfera de admiración pura y empoderamiento.$f19d$,
  poem_template = $f19e${NOMBRE_DESTINATARIO}, cuando me miras y dices,
"Eres la más bonita", mis raíces.
Me haces sentir como una estrella brillar,
Tu admiración me hace volar.

No importa cómo me vea ese día,
Tu mirada me da alegría.
Eres quien me hace sentir especial de verdad,
Mi {APODO_DESTINATARIO}, mi admirador de verdad.$f19e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_19_Cuando_Me_Haces_Sentir_La_Más_Bonita.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f20a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite una promesa eterna: sin importar el paso del tiempo, el vínculo entre padre e hija permanece intacto.

En la mitad izquierda, ligeramente descentrado, el papá, edad actual, cargando en brazos a su hija pequeña (edad actual del cliente), ella abrazándolo con fuerza, cabeza en su hombro. En la mitad derecha, el mismo papá (ligeramente mayor, canas sutiles) abrazando a una versión futura de su hija ya adolescente, ella todavía abrazándolo de la misma forma, cabeza en su hombro, mostrando que sin importar la edad, sigue siendo su niña.$f20a$,
  background_details = $f20b$Un mismo jardín familiar bajo un gran árbol, mostrado en dos momentos distintos que fluyen naturalmente de un lado al otro de la escena, luz dorada atemporal en ambos.$f20b$,
  magic_effects = $f20c$Pétalos y hojas doradas caen suavemente en ambos momentos, conectando visualmente el pasado y el futuro. La magia debe sentirse atemporal y completamente integrada dentro de una fotografía realista.$f20c$,
  lighting_color = $f20d$Iluminación dorada atemporal con efecto de memoria y futuro, sombras suaves. Atmósfera de emoción profunda y promesa eterna.$f20d$,
  poem_template = $f20e${NOMBRE_DESTINATARIO}, aunque crezca y el tiempo pase,
Aunque la vida me lleve a otra clase.
Siempre seré tu niña pequeña,
Esa verdad nunca se despeña.

No importa cuántos años tenga al final,
En tus brazos siempre seré igual.
Eres mi papá eterno y mi verdad,
Mi {APODO_DESTINATARIO}, mi amor de verdad.$f20e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_20_Seré_Tu_Niña_Para_Siempre.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f1a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo profundo y la certeza de que un abrazo de abuela cura cualquier tristeza.

Ligeramente descentrada en un sillón cómodo, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión de amor profundo y protección, con suéter de lana en tono lavanda, abrazando tiernamente a su nieto. Envuelto en el abrazo, su nieto, ojos cerrados en paz absoluta, con la cabeza apoyada en el pecho de la abuela.$f1a$,
  background_details = $f1b$Sala acogedora con luz suave de ventana, sillón cómodo en tonos crema, manta tejida sobre el respaldo, plantas en macetas.$f1b$,
  magic_effects = $f1c$Partículas de luz flotante sutiles simbolizan la magia sanadora del abrazo. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$f1c$,
  lighting_color = $f1d$Iluminación dorada y suave tipo atardecer envolviendo la escena. Atmósfera cálida de hogar y sanación.$f1d$,
  poem_template = $f1e$Cuando el mundo se siente muy grande,
y mis lágrimas quieren salir,
tus brazos son mi refugio,
donde todo vuelve a sonreír.

No hay tristeza que resista,
ni miedo que pueda quedar,
cuando {NOMBRE_DESTINATARIO} me abraza fuerte,
todo vuelve a su lugar.

Tus abrazos tienen magia,
son medicina de amor,
y en ellos siempre encuentro,
paz, calma y calor.$f1e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_1_Abrazos_Que_Curan_Todo.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f2a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el hechizo nocturno de un cuento que lleva a soñar.

Ligeramente descentrada sentada al borde de la cama, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión narrativa y cálida, con bata suave en tono rosa empolvado, gafas de lectura, leyendo un libro de cuentos ilustrado. Acurrucado bajo las cobijas, su nieto, ojos brillantes de fascinación, mirando el libro encantado.$f2a$,
  background_details = $f2b$Habitación infantil acogedora con luz tenue de lámpara de noche, estantes con juguetes, ventana con cielo nocturno estrellado.$f2b$,
  magic_effects = $f2c$Pequeñas siluetas etéreas de personajes de cuentos (un dragón, un castillo) emergen suavemente del libro. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$f2c$,
  lighting_color = $f2d$Iluminación cálida y envolvente de lámpara de noche. Atmósfera íntima con toque de fantasía.$f2d$,
  poem_template = $f2e$Cada noche es una aventura,
cuando {NOMBRE_DESTINATARIO} me viene a arropar,
con su voz suave y dulce,
me lleva a un mundo a soñar.

Princesas, dragones y hadas,
castillos de cristal y luz,
sus historias son mágicas,
y me llenan de quietud.

No importa cuántas veces,
el mismo cuento quiera escuchar,
siempre lo cuenta con amor,
como si fuera la primera vez.$f2e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_2_Cuentos_Antes_de_Dormir.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f3a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría culinaria y el ingrediente secreto que es el amor de abuela.

Ligeramente descentrada en la cocina, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión alegre y paciente, con delantal vintage floral, manos enharinadas sosteniendo un rodillo. De pie en un banquito junto a la mesa, su nieto, rostro iluminado de felicidad, con delantal infantil presionando cortadores de galletas en la masa.$f3a$,
  background_details = $f3b$Cocina rústica acogedora con mesa de madera cubierta de masa, bandeja de galletas horneadas enfriándose, ventana con luz natural cálida.$f3b$,
  magic_effects = $f3c$Partículas doradas flotantes y pequeños corazones simbolizan el aroma de canela y vainilla en el aire. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$f3c$,
  lighting_color = $f3d$Iluminación natural y cálida de mañana. Atmósfera familiar, dulce y llena de calidez.$f3d$,
  poem_template = $f3e$En tu cocina huele a cielo,
a canela, vainilla y amor,
hacer galletas contigo, {NOMBRE_DESTINATARIO},
es mi actividad favorita, la mejor.

Me dejas probar la masa,
y me enseñas a amasar,
aunque la cocina quede llena de harina,
siempre me dejas ayudar.

Tus galletas son las más ricas,
no hay secreto ni receta igual,
porque el ingrediente especial,
es tu amor sin final.$f3e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_3_Las_Galletas_Más_Ricas_del_Mundo.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f4a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad íntima y la confianza absoluta entre nieto y abuela.

Ligeramente descentrados muy cerca en un banco de jardín, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión de ternura y complicidad, inclinada en actitud de escucha atenta. Junto a ella susurrando al oído, su nieto, expresión traviesa y feliz, con mano cerca de la boca en gesto cómplice.$f4a$,
  background_details = $f4b$Jardín tranquilo con flores silvestres, árbol grande con ramas protectoras, luz filtrada entre hojas.$f4b$,
  magic_effects = $f4c$Pequeños corazones flotantes simbolizan el vínculo entre ambos, con destellos dorados sutiles. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$f4c$,
  lighting_color = $f4d$Iluminación suave de tarde dorada filtrada entre las hojas. Atmósfera privada, mágica y de complicidad.$f4d$,
  poem_template = $f4e$Hay cosas que solo tú sabes,
secretos que guardo en mi corazón,
porque sé que {NOMBRE_DESTINATARIO} entiende,
sin juzgar, con puro amor.

Me escuchas con atención,
como si fuera lo más importante,
y tus palabras sabias,
me hacen sentir brillante.

Entre tú y yo hay un lazo,
especial, único, de verdad,
eres mi confidente, mi amiga,
mi abuela, mi complicidad.$f4e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_4_Secretos_Entre_Nosotros.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f5a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad alegre y el placer especial de ser consentida por abuela.

Ligeramente descentrados en una heladería, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión de complicidad y felicidad, con ropa casual chic, guiñando un ojo. Junto a ella sosteniendo un helado enorme, su nieto, ojos brillantes y sonrisa enorme, con ambas manos en el helado.$f5a$,
  background_details = $f5b$Escena urbana encantadora con tienda colorida de fondo, mesas con sombrillas, día soleado y feliz.$f5b$,
  magic_effects = $f5c$Confeti de colores y estrellitas brillantes flotan suavemente en el aire festivo. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$f5c$,
  lighting_color = $f5d$Iluminación brillante y alegre de día soleado. Atmósfera vibrante y llena de vida.$f5d$,
  poem_template = $f5e$Mamá dice que no, pero tú dices que sí,
un dulce más, un ratito más de jugar,
{NOMBRE_DESTINATARIO}, contigo todo es especial,
porque me dejas ser y me sabes mimar.

Me compras ese juguete,
me preparas mi comida favorita,
y cuando estoy contigo,
soy tu príncipe querido.

Gracias por consentirme,
por hacerme sentir tan especial,
eres mi cómplice favorita,
mi abuela sin igual.$f5e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_5_Cuando_Me_Consientes.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f6a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura pura en el gesto simple de dos manos entrelazadas.

Ligeramente descentradas en primer plano, las manos de la abuela, mujer mayor de unos 67 años, piel suave con marcas del tiempo, venas visibles y anillo sencillo, propias de una mano de abuela, sosteniendo delicadamente la mano pequeña de su nieto, manos pequeñas y suaves descansando con confianza.$f6a$,
  background_details = $f6b$Fondo suavemente desenfocado con elementos de tejido (agujas, ovillo de lana en tonos pastel) o jardín con flores difuminadas.$f6b$,
  magic_effects = $f6c$Hilos de luz dorada conectan sutilmente ambas manos simbolizando el vínculo. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$f6c$,
  lighting_color = $f6d$Luz natural suave y cálida tipo ventana de tarde. Atmósfera tierna y reconfortante.$f6d$,
  poem_template = $f6e$Tus manos tejen historias,
con agujas e hilos de color,
crean bufandas y suéteres,
hechos con paciencia y amor.

Tus manos curan raspones,
con caricias suaves y calor,
y cuando me acaricias el cabello,
desaparece cualquier dolor.

{NOMBRE_DESTINATARIO}, tus manos son mágicas,
llenas de ternura y bondad,
en ellas encuentro consuelo,
y una paz sin igual.$f6e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_6_Tus_Manos_Mágicas.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f7a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz absoluta y el refugio seguro del regazo de abuela.

Ligeramente descentrada sentada en un sillón, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión de amor profundo y paz, acariciando suavemente el cabello de su nieto. Profundamente dormido en su regazo, su nieto, expresión de paz absoluta, acurrucado en posición fetal.$f7a$,
  background_details = $f7b$Sala acogedora con luz suave de tarde, manta tejida sobre el brazo del sillón, taza de té en mesa lateral.$f7b$,
  magic_effects = $f7c$Un aura cálida envuelve a ambos con partículas de luz dorada muy suaves. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$f7c$,
  lighting_color = $f7d$Luz dorada suave de atardecer, muy cálida y envolvente. Atmósfera de tranquilidad absoluta.$f7d$,
  poem_template = $f7e$No hay almohada más cómoda,
ni lugar más seguro para estar,
que dormido en tu regazo, {NOMBRE_DESTINATARIO},
donde puedo soñar y descansar.

Tu mano acaricia mi frente,
tu voz tararea una canción,
y en ese momento perfecto,
siento tu inmenso amor.

Aunque crezca y sea grande,
siempre recordaré este lugar,
tu regazo, mi refugio,
donde siempre quiero estar.$f7e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_7_Durmiendo_en_Tu_Regazo.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f8a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite aprendizaje amoroso al descubrir la magia en las cosas simples.

Ligeramente descentrados en un jardín, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión sabia y amorosa, señalando una mariposa con postura de maestra paciente. Junto a ella mirando en la misma dirección, su nieto, expresión de asombro y curiosidad, con ojos brillantes.$f8a$,
  background_details = $f8b$Jardín exuberante con flores coloridas, mariposas volando, árboles frondosos, cielo azul con nubes suaves.$f8b$,
  magic_effects = $f8c$Siluetas brillantes sutiles de pájaros y estrellas flotan en el aire como símbolos de aprendizaje. La magia debe sentirse educativa y completamente integrada dentro de una fotografía realista.$f8c$,
  lighting_color = $f8d$Luz natural brillante de día, cálida y clara. Atmósfera educativa y llena de asombro.$f8d$,
  poem_template = $f8e$Me enseñaste a ver las estrellas,
a escuchar el canto de los pájaros,
a apreciar las cosas simples,
y a encontrar magia en lo ordinario.

Me enseñaste que el amor,
no necesita de grandes gestos,
que está en los detalles pequeños,
en los abrazos y en los momentos.

Gracias, {NOMBRE_DESTINATARIO}, por tus lecciones,
por enseñarme a vivir con el corazón,
todo lo que soy hoy,
lo aprendí de tu amor.$f8e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_8_Me_Enseñaste_A.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f9a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sabiduría transmitida con amor y reverencia.

Ligeramente descentrados sentados en un porche, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión de sabiduría y amor, con mano posada suavemente sobre la de su nieto, mirándolo con profundidad. Escuchando con atención absoluta, su nieto, expresión seria y receptiva.$f9a$,
  background_details = $f9b$Porche acogedor o banco en jardín tranquilo, luz de atardecer dorado, plantas en macetas.$f9b$,
  magic_effects = $f9c$Palabras doradas flotantes sutiles ("amor", "valentía") y pequeñas llaves doradas simbolizan consejos valiosos. La magia debe sentirse contemplativa y completamente integrada dentro de una fotografía realista.$f9c$,
  lighting_color = $f9d$Luz dorada de atardecer, cálida y envolvente. Atmósfera de intimidad y confianza.$f9d$,
  poem_template = $f9e$Cuando no sé qué hacer,
cuando el camino se ve difícil,
tus palabras me guían, {NOMBRE_DESTINATARIO},
como un faro en la noche.

"Sé amable", "Sé valiente",
"Nunca dejes de soñar",
tus consejos son tesoros,
que siempre voy a guardar.

Tu sabiduría es un regalo,
fruto de años y experiencia,
y yo escucho con atención,
cada palabra con reverencia.$f9e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_9_Tus_Consejos_de_Oro.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f10a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo silencioso y la comprensión profunda sin necesidad de palabras.

Ligeramente descentrada arrodillada a la altura de su nieto, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión de comprensión profunda, sosteniendo su rostro con ambas manos, limpiando una lágrima con el pulgar. Frente a ella, su nieto, expresión vulnerable encontrando consuelo, con manos aferradas suavemente a la ropa de la abuela.$f10a$,
  background_details = $f10b$Interior cálido y privado con luz suave envolvente, elementos difuminados para mantener intimidad.$f10b$,
  magic_effects = $f10c$Partículas de luz dorada suave envuelven a ambos como un abrazo invisible. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$f10c$,
  lighting_color = $f10d$Luz suave y cálida, íntima y reconfortante. Atmósfera de consuelo profundo y comprensión.$f10d$,
  poem_template = $f10e$Cuando las lágrimas caen,
y no encuentro las palabras,
tú me abrazas en silencio,
y mi corazón se calma.

No me preguntas qué pasó,
no necesitas explicación,
simplemente estás ahí, {NOMBRE_DESTINATARIO},
con tu infinita comprensión.

Tus abrazos secan mis lágrimas,
tu amor cura mi dolor,
y aunque el mundo sea difícil,
contigo todo es mejor.$f10e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_10_Cuando_Lloro_Tú_Entiendes.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f11a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite nostalgia compartida al descubrir juntos la historia familiar.

Ligeramente descentrados rodeados de álbumes de fotos antiguos, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión nostálgica pero feliz, sosteniendo una foto antigua, señalándola con el dedo. Muy cerca mirando la foto con fascinación, su nieto, expresión de asombro y curiosidad.$f11a$,
  background_details = $f11b$Sala familiar acogedora con álbumes de fotos vintage apilados, cajas de recuerdos, marcos de fotos antiguas.$f11b$,
  magic_effects = $f11c$Algunas fotos antiguas flotan sutilmente en el aire con brillo dorado, conectando el pasado con el presente. La magia debe sentirse nostálgica y completamente integrada dentro de una fotografía realista.$f11c$,
  lighting_color = $f11d$Luz natural cálida de ventana, creando atmósfera nostálgica. Atmósfera íntima y llena de historia.$f11d$,
  poem_template = $f11e$Me encanta ver tus fotos antiguas,
cuando eras joven y hermosa,
me cuentas historias de otros tiempos,
y cada una es maravillosa.

"Esta era yo a tu edad",
me dices con una sonrisa,
y veo en tus ojos jóvenes,
la misma luz que hoy me hechiza.

Gracias por compartir tu historia, {NOMBRE_DESTINATARIO},
por dejarme conocer tu pasado,
cada foto es un tesoro,
de amor que has regalado.$f11e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_11_Fotos_del_Pasado.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f12a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite amor maternal profundo en un abrazo frontal cercano.

Ligeramente descentrados frente a frente, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión de amor maternal profundo, sosteniendo el rostro de su nieto con ternura infinita. Su nieto, expresión de amor puro y gratitud, con manos tocando los brazos de la abuela.$f12a$,
  background_details = $f12b$Interior cálido con luz dorada envolvente, o jardín con flores difuminadas de fondo.$f12b$,
  magic_effects = $f12c$Un aura de luz dorada brillante rodea a ambos con hilos de luz conectando sus corazones. La magia debe sentirse profundamente emotiva y completamente integrada dentro de una fotografía realista.$f12c$,
  lighting_color = $f12d$Luz cálida y envolvente tipo atardecer dorado. Atmósfera emotiva y de conexión maternal.$f12d$,
  poem_template = $f12e$Mamá es mamá, eso es verdad,
pero tú, {NOMBRE_DESTINATARIO}, eres especial,
eres mi segunda mamá,
mi confidente, mi hogar.

Cuando mamá está ocupada,
tú siempre estás para mí,
con tus brazos abiertos,
y tu amor sin fin.

No sé qué haría sin ti,
eres parte de mi corazón,
mi segunda mamá querida,
mi eterna bendición.$f12e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_12_Eres_Mi_Segunda_Mamá.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f13a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite magia natural y el tiempo detenido en un jardín compartido.

Ligeramente descentrados arrodillados junto a un parterre de flores, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión de alegría y enseñanza, con sombrero de jardín elegante, señalando una mariposa. Junto a ella con botas de lluvia coloridas, su nieto, expresión de asombro, sosteniendo una regadera pequeña.$f13a$,
  background_details = $f13b$Jardín exuberante tipo cuento de hadas con flores de todos colores, mariposas monarca, arco de jardín cubierto de rosas.$f13b$,
  magic_effects = $f13c$Las flores tienen un brillo sutil y pequeñas hadas se esconden entre ellas con destellos de luz dorada. La magia debe sentirse encantadora y completamente integrada dentro de una fotografía realista.$f13c$,
  lighting_color = $f13d$Luz natural mágica de mañana, cálida y brillante. Atmósfera de cuento de hadas.$f13d$,
  poem_template = $f13e$Tu jardín es un lugar mágico,
donde las flores bailan al viento,
y las mariposas nos visitan,
en cada dulce momento.

Me enseñas los nombres de las plantas,
y juntos regamos con amor,
en tu jardín encantado, {NOMBRE_DESTINATARIO},
todo tiene color.

Aquí el tiempo se detiene,
y solo existimos tú y yo,
en nuestro jardín secreto,
donde crece nuestro amor.$f13e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_13_El_Jardín_Encantado_de_la_Abuela.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f14a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite un viaje fantástico entre generaciones a través de los recuerdos de la abuela.

Ligeramente descentrada, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión narrativa y cálida, en su versión actual, con una versión joven y etérea de sí misma (años 50-60, cabello oscuro) apareciendo como una proyección mágica detrás de ella. Junto a la abuela actual, su nieto, expresión de fascinación total, mirando asombrado la versión joven de su abuela.$f14a$,
  background_details = $f14b$Ambiente surrealista con objetos vintage (radio antigua, cartas) flotando junto a elementos modernos, portal de luz dorada conectando épocas.$f14b$,
  magic_effects = $f14c$Espirales de tiempo doradas y partículas brillantes conectan las dos versiones de la abuela. La magia debe sentirse conceptual y completamente integrada dentro de una fotografía realista.$f14c$,
  lighting_color = $f14d$Luz mágica y cinematográfica, mezcla de tonos sepia y dorados cálidos. Atmósfera de distorsión temporal suave.$f14d$,
  poem_template = $f14e$Cuando me cuentas de tu infancia,
de cómo era el mundo antes,
viajamos juntos en el tiempo,
a lugares fascinantes.

Me hablas de juegos sin pantallas,
de cartas escritas a mano,
y yo imagino ese mundo,
de la mano de mi {NOMBRE_DESTINATARIO} amada.

Eres mi máquina del tiempo,
mi puente entre ayer y hoy,
y en cada historia que compartes,
descubro quién soy.$f14e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_14_Viajeros_del_Tiempo.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f15a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad tierna: en el reino de amor de la abuela, su nieto es el protagonista.

Ligeramente descentrada vestida como reina benevolente, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión de orgullo maternal, con vestido largo en tonos lavanda, corona delicada de flores, sosteniendo la mano de su nieto. Vestido como príncipe infantil, su nieto, expresión de felicidad absoluta, con traje elegante y corona pequeña.$f15a$,
  background_details = $f15b$Escenario de cuento de hadas con trono decorado con flores, cortinas de terciopelo púrpura y dorado, alfombra roja.$f15b$,
  magic_effects = $f15c$Destellos de luz dorada flotan alrededor con pequeñas estrellas brillantes. La magia debe sentirse majestuosa y completamente integrada dentro de una fotografía realista.$f15c$,
  lighting_color = $f15d$Luz dorada y majestuosa tipo atardecer de cuento de hadas. Atmósfera de castillo encantado pero acogedor.$f15d$,
  poem_template = $f15e$Para ti soy realeza,
tu príncipe de verdad,
me tratas como si fuera especial,
con amor y dignidad.

Me haces sentir importante,
valioso y sin igual,
porque en tu reino de amor, {NOMBRE_DESTINATARIO},
yo soy lo principal.

Gracias por hacerme sentir,
como la persona más especial,
en tu corazón soy realeza,
y eso es algo celestial.$f15e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_15_Príncipe_de_la_Abuela.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f16a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el vuelo de la imaginación al leer juntos.

Ligeramente descentrados en un sillón grande rodeados de libros, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión cálida y narrativa, con gafas de lectura, leyendo un libro grande ilustrado. Acurrucado junto a ella, su nieto, ojos brillantes de fascinación, mirando el libro.$f16a$,
  background_details = $f16b$Biblioteca hogareña con estantes de madera llenos de libros, escalera de biblioteca, lámpara de lectura cálida.$f16b$,
  magic_effects = $f16c$Personajes de cuentos (dragones, princesas) emergen sutilmente de las páginas como hologramas etéreos y brillantes. La magia debe sentirse literaria y completamente integrada dentro de una fotografía realista.$f16c$,
  lighting_color = $f16d$Luz cálida y acogedora de lámpara y ventana. Atmósfera de fantasía literaria y calidez.$f16d$,
  poem_template = $f16e$En la biblioteca contigo,
cada libro es una aventura nueva,
exploramos mundos lejanos,
sin salir de tu biblioteca.

Me lees sobre piratas y dragones,
sobre tierras lejanas y mar,
y en cada página que pasas,
me enseñas a soñar.

Gracias, {NOMBRE_DESTINATARIO}, por abrir mi mente,
por mostrarme que leer es volar,
contigo cada libro es mágico,
y juntos podemos viajar.$f16e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_16_Aventureros_en_la_Biblioteca.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f17a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite poder heroico con ternura: el amor de la abuela es su verdadero superpoder.

Ligeramente descentrada en postura heroica, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión poderosa pero cálida, vestida como superheroína con capa brillante en dorado y lavanda, símbolo de corazón en el pecho. Junto a ella como compañero superhéroe infantil, su nieto, expresión de admiración y orgullo, con capa pequeña a juego y máscara colorida.$f17a$,
  background_details = $f17b$Escenario urbano estilizado tipo cómic con edificios en perspectiva, cielo dramático con nubes y rayos de luz.$f17b$,
  magic_effects = $f17c$Corazones brillantes flotan como símbolo del superpoder de la abuela, con un aura dorada rodeándola. La magia debe sentirse heroica y completamente integrada dentro de una fotografía realista.$f17c$,
  lighting_color = $f17d$Iluminación dramática y cinematográfica con luz heroica. Atmósfera épica pero tierna y familiar.$f17d$,
  poem_template = $f17e$No necesitas capa ni poderes,
para ser mi superheroína,
tu fuerza está en tu amor,
y en tu sonrisa cristalina.

Salvas mis días tristes,
combates mis miedos con valor,
y con tus abrazos mágicos,
derrotas cualquier dolor.

{NOMBRE_DESTINATARIO}, eres mi superheroína,
la más poderosa de verdad,
porque tu superpoder es el amor,
y eso nunca cambiará.$f17e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_17_Superheroína_Abuela.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f18a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite continuidad y la promesa de un legado de amor que perdurará para siempre.

Ligeramente descentrados caminando de la mano por un sendero, vistos de perfil, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión serena, sosteniendo con ternura la mano de su nieto. Su nieto, expresión de confianza, caminando junto a ella mirando hacia adelante.$f18a$,
  background_details = $f18b$Camino hermoso que se extiende hacia el horizonte rodeado de naturaleza exuberante, cielo con colores de atardecer espectacular.$f18b$,
  magic_effects = $f18c$Huellas brillantes detrás de ellas se transforman sutilmente en flores, y mariposas las siguen. La magia debe sentirse esperanzadora y completamente integrada dentro de una fotografía realista.$f18c$,
  lighting_color = $f18d$Luz dorada de atardecer, cálida y esperanzadora. Atmósfera de paz y continuidad.$f18d$,
  poem_template = $f18e$Cuando sea grande y tenga hijos,
les hablaré de ti con amor,
les contaré de mi {NOMBRE_DESTINATARIO},
y de tu inmenso corazón.

Les enseñaré lo que me enseñaste,
a amar, a ser bondadoso y fuerte,
porque tu legado vive en mí,
y vivirá para siempre.

Gracias por todo lo que me diste,
por ser mi guía y mi luz,
tu amor es eterno, {NOMBRE_DESTINATARIO},
y yo lo llevaré con gratitud.$f18e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_18_Tu_Legado_de_Amor.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f19a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite aspiración amorosa: su nieto soñando con ser tan sabio y bondadoso como su abuela.

Ligeramente descentrada con elegancia digna, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión serena y orgullosa, vistiendo ropa elegante, cabello plateado hermoso. Junto a ella, su nieto, expresión de admiración, mirando a su abuela, con una versión etérea de sí mismo adulto reflejado sutilmente imitando su postura.$f19a$,
  background_details = $f19b$Espacio con elementos que conectan presente y futuro, portal de luz suave uniendo ambas escenas.$f19b$,
  magic_effects = $f19c$Líneas de luz conectan a la abuela con su nieto y su versión futura, con símbolos de cualidades (corazón, libro) flotando entre ellas. La magia debe sentirse aspiracional y completamente integrada dentro de una fotografía realista.$f19c$,
  lighting_color = $f19d$Luz cálida y esperanzadora que une ambas figuras. Atmósfera de aspiración y legado.$f19d$,
  poem_template = $f19e$Cuando crezca quiero ser,
tan amable y sabio como tú,
quiero tener tu paciencia,
y tu corazón de luz.

Quiero cocinar como tú,
abrazar como tú lo haces,
y dar amor incondicional,
como tú siempre me das.

Eres mi ejemplo, {NOMBRE_DESTINATARIO},
mi inspiración de verdad,
y cuando crezca, seré como tú,
lleno de amor y bondad.$f19e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_19_Cuando_Crezca_Seré_Como_Tú.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f20a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite gratitud absoluta y amor puro en el cierre emotivo del libro.

Ligeramente descentrados en un abrazo frontal muy estrecho, la abuela, mujer mayor de unos 67 años, cabello canoso plateado, expresión de amor incondicional y felicidad profunda, con ojos cerrados, frente casi tocando la de su nieto. Su nieto, expresión de amor puro y gratitud, completamente envuelto en el abrazo.$f20a$,
  background_details = $f20b$Fondo desenfocado con luz dorada envolvente que crea un halo alrededor de ambos, eliminando distracciones.$f20b$,
  magic_effects = $f20c$Un aura de luz dorada brillante e intensa rodea a ambos, con corazones grandes y pequeños flotando abundantemente. La magia debe sentirse celestial y completamente integrada dentro de una fotografía realista.$f20c$,
  lighting_color = $f20d$Luz dorada intensa y envolvente, casi celestial. Atmósfera de máxima intensidad emotiva y gratitud.$f20d$,
  poem_template = $f20e$Gracias por cada abrazo,
por cada cuento y canción,
gracias por tu paciencia infinita,
y tu inmenso corazón.

Gracias por enseñarme tanto,
por amarme sin condición,
por ser mi refugio seguro,
y mi mayor bendición.

No hay palabras suficientes,
para expresar lo que siento por ti,
pero estas tres palabras lo resumen:
Te amo, {NOMBRE_DESTINATARIO}, gracias por existir.$f20e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/PLANTILLA_20_Gracias_Por_Ser_Mi_Abuela.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f1a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite admiración absoluta y la certeza de que el abuelo es un superhéroe real sin necesidad de poderes.

Ligeramente descentrado en postura heroica, el abuelo, expresión orgullosa y cálida, vestido como superhéroe clásico con traje azul y rojo, capa ondeando, brazos cruzados. Junto a él mirándolo con admiración absoluta, su nieto, ojos brillantes y sonrisa enorme.$f1a$,
  background_details = $f1b$Ciudad estilizada con edificios, cielo azul brillante con nubes, rayos de sol dorados iluminando a el abuelo.$f1b$,
  magic_effects = $f1c$Un destello heroico rodea a el abuelo y estrellas doradas flotan suavemente. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$f1c$,
  lighting_color = $f1d$Iluminación de cómic épico pero cálido, cielo azul brillante con rayos dorados. Atmósfera heroica, inspiradora y llena de amor.$f1d$,
  poem_template = $f1e$No necesitas capa ni poderes de ficción,
Eres mi superhéroe con tu sabiduría y corazón.
Tus canas son de plata, tu fuerza es real,
{NOMBRE_DESTINATARIO}, contigo todo mal se vuelve bien al final.

Salvas mis días con tu risa y tu calma,
Eres el guardián que protege mi alma.
No hay villano que pueda contra tu amor,
Mi superhéroe eterno, mi gran protector.$f1e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_1_Mi_Superhéroe_de_Canas_Plateadas.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f2a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad y respeto reverente hacia el abuelo rey del hogar.

Ligeramente descentrado sentado en un trono elegante, el abuelo, expresión noble y cálida, vestido con túnica real en tonos dorados y púrpuras, corona brillante, cetro en una mano. Junto al trono, su nieto, expresión de amor y respeto, mirándolo con admiración.$f2a$,
  background_details = $f2b$Salón de castillo con columnas, cortinas de terciopelo, ventanas con luz dorada entrando, tapices en las paredes.$f2b$,
  magic_effects = $f2c$Luz celestial ilumina a el abuelo y destellos dorados brillan alrededor de la corona. La magia debe sentirse majestuosa y completamente integrada dentro de una fotografía realista.$f2c$,
  lighting_color = $f2d$Iluminación cálida con luz dorada entrando por las ventanas. Atmósfera majestuosa, noble y llena de amor.$f2d$,
  poem_template = $f2e$Con corona de oro y trono de amor,
Eres el rey que gobierna mi corazón con honor.
No necesitas castillo ni ejército leal,
Tu reino es mi vida, tu poder es ancestral.

Me enseñas a ser fuerte, noble y valiente,
{NOMBRE_DESTINATARIO}, eres mi rey, mi guía permanente.
En tu reino de abrazos siempre hay paz,
Mi rey del corazón, mi hogar, mi faz.$f2e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_2_El_Rey_de_Mi_Corazón.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f3a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite lealtad protectora y el asombro de un nieto ante su caballero.

Ligeramente descentrado en postura protectora, el abuelo, hombre mayor de unos 68 años, cabello y barba canosos, expresión noble y valiente, con armadura dorada brillante completa, casco bajo el brazo, espada noble en la mano. Junto a él tocando suavemente la armadura, su nieto, expresión de asombro y admiración.$f3a$,
  background_details = $f3b$Campo de batalla épico al atardecer, colinas verdes, cielo con tonos naranjas y dorados, banderas ondeando a lo lejos.$f3b$,
  magic_effects = $f3c$La luz dorada se refleja en la armadura con destellos heroicos sutiles. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$f3c$,
  lighting_color = $f3d$Iluminación de atardecer épico con tonos naranjas y dorados. Atmósfera épica, protectora y cálida.$f3d$,
  poem_template = $f3e$Con armadura brillante y espada de verdad,
Eres mi caballero que lucha con lealtad.
Defiendes mis sueños, proteges mi camino,
{NOMBRE_DESTINATARIO} valiente, mi héroe y mi destino.

En batallas de vida siempre estás ahí,
Tu honor y tu fuerza me inspiran a mí.
Caballero dorado de corazón sin igual,
Contigo a mi lado, nada puede salir mal.$f3e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_3_Mi_Caballero_de_Armadura_Dorada.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f4a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz celestial y la certeza de estar protegido desde el cielo del amor del abuelo.

Ligeramente descentrado flotando suavemente, el abuelo, expresión serena y protectora, con grandes alas de ángel blancas y doradas, túnica blanca suave. Debajo mirando hacia arriba con asombro, su nieto, expresión de paz, brazos extendidos.$f4a$,
  background_details = $f4b$Cielo celestial con nubes blancas y doradas, rayos de luz divina atravesando, estrellas brillantes dispersas.$f4b$,
  magic_effects = $f4c$Un halo dorado suave brilla sobre la cabeza del abuelo y plumas flotan suavemente. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$f4c$,
  lighting_color = $f4d$Iluminación celestial suave con tonos dorados y blancos. Atmósfera serena, protectora y de paz.$f4d$,
  poem_template = $f4e$Con alas invisibles que siempre me cuidan,
Eres mi ángel guardián, mis pasos tú guías.
Desde el cielo de tu amor me proteges sin cesar,
{NOMBRE_DESTINATARIO} celestial, mi guía estelar.

Tu luz me ilumina cuando hay oscuridad,
Tu voz me calma con pura serenidad.
Ángel de mi vida, guardián eternal,
Contigo a mi lado, todo es celestial.$f4e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_4_El_Ángel_Guardián_de_la_Familia.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f5a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite espíritu aventurero y la emoción compartida de explorar mundos de historias.

Ligeramente descentrado en la proa de un barco de madera elegante, el abuelo, hombre mayor de unos 68 años, cabello y barba canosos, expresión determinada, vestido de capitán con chaqueta naval azul y botones dorados, catalejo en mano. Junto a él señalando emocionado hacia el horizonte, su nieto, expresión aventurera, con ropa de marinero.$f5a$,
  background_details = $f5b$Océano azul brillante con olas suaves, gaviotas volando, isla tropical visible a lo lejos.$f5b$,
  magic_effects = $f5c$El viento mueve la ropa y la luz del sol brilla suavemente sobre el agua. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$f5c$,
  lighting_color = $f5d$Iluminación náutica brillante con reflejos dorados en el agua. Atmósfera aventurera, emocionante y de complicidad.$f5d$,
  poem_template = $f5e$Con timón en mano y brújula de experiencia,
Eres el capitán que navega con paciencia.
Me llevas a mares de historias sin fin,
{NOMBRE_DESTINATARIO} aventurero, mi guía, mi fortín.

Juntos exploramos mundos de imaginación,
Tu barco es de sueños, tu vela es pasión.
Capitán de mi vida, navegante sin igual,
Contigo cada día es una aventura especial.$f5e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_5_Capitán_de_Mil_Aventuras.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f6a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sabiduría ancestral y la fascinación de escuchar historias que guardan tesoros de vida.

Ligeramente descentrado sentado en una silla de madera antigua, el abuelo, expresión sabia y cálida, vestido como sabio anciano con túnica en tonos tierra, bastón tallado con símbolos místicos. Sentado en el suelo escuchando atentamente, su nieto, ojos llenos de fascinación.$f6a$,
  background_details = $f6b$Biblioteca mágica con estanterías infinitas, libros antiguos flotantes, pergaminos brillantes, velas flotantes.$f6b$,
  magic_effects = $f6c$Símbolos místicos brillan suavemente en el aire cerca de los libros flotantes. La magia debe sentirse sabia y completamente integrada dentro de una fotografía realista.$f6c$,
  lighting_color = $f6d$Iluminación dorada suave de biblioteca mágica con polvo de estrellas en el aire. Atmósfera sabia, mística y de conocimiento.$f6d$,
  poem_template = $f6e$Con barba de sabio y ojos de experiencia,
Guardas mil historias con tu paciencia.
Cada cuento tuyo es una lección de vida,
{NOMBRE_DESTINATARIO} maestro, tu sabiduría es mi guía querida.

Me enseñas del mundo con tus palabras de oro,
Eres la biblioteca viviente que más adoro.
Sabio de mi corazón, maestro sin igual,
Tus historias son tesoros, tu conocimiento ancestral.$f6e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_6_El_Sabio_de_Todas_las_Historias.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f7a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza victoriosa y la determinación de nunca rendirse.

Ligeramente descentrado en postura de batalla victoriosa, el abuelo, expresión heroica, con armadura de cuero y metal, casco con plumas, escudo con emblema familiar, espada en mano. A su lado imitando su postura con determinación, su nieto, expresión valiente, con armadura infantil.$f7a$,
  background_details = $f7b$Campo de batalla al amanecer, montañas al fondo, cielo con nubes dramáticas pero luz esperanzadora.$f7b$,
  magic_effects = $f7c$Una luz heroica ilumina a el abuelo y destellos brillan en las armas. La magia debe sentirse victoriosa y completamente integrada dentro de una fotografía realista.$f7c$,
  lighting_color = $f7d$Iluminación de amanecer con nubes dramáticas y luz esperanzadora. Atmósfera épica, heroica y determinada.$f7d$,
  poem_template = $f7e$Con escudo de amor y espada de valor,
Eres mi guerrero, mi eterno luchador.
Has vencido batallas que yo nunca vi,
{NOMBRE_DESTINATARIO} valiente, eres mi héroe aquí.

Tu fuerza me inspira a nunca rendirme,
Tu coraje me enseña a siempre seguir firme.
Guerrero invencible de corazón leal,
Contigo a mi lado, puedo enfrentar cualquier mal.$f7e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_7_Mi_Guerrero_Invencible.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f8a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite creación amorosa: el abuelo construyendo memorias que forman el corazón de su nieto.

Ligeramente descentrado frente a una estructura mágica de recuerdos, el abuelo, expresión creativa y amorosa, vestido como arquitecto clásico con planos enrollados en mano. Junto a él colocando un bloque brillante, su nieto, sonrisa feliz.$f8a$,
  background_details = $f8b$Espacio mágico con planos flotantes, herramientas brillantes, estructura de recuerdos con fotos flotantes y bloques de luz dorada.$f8b$,
  magic_effects = $f8c$Luz dorada emana de los recuerdos y partículas brillantes flotan alrededor. La magia debe sentirse creativa y completamente integrada dentro de una fotografía realista.$f8c$,
  lighting_color = $f8d$Iluminación dorada mágica de creación. Atmósfera creativa, constructiva y llena de amor.$f8d$,
  poem_template = $f8e$Con tus manos construyes memorias de amor,
Eres el arquitecto de mi vida, mi creador.
Cada momento contigo es un ladrillo especial,
{NOMBRE_DESTINATARIO} constructor, edificas mi hogar emocional.

Diseñas mi futuro con tus enseñanzas sabias,
Construyes mi carácter con tus palabras diarias.
Arquitecto del alma, maestro de la vida,
Tu obra maestra soy yo, tu creación querida.$f8e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_8_El_Arquitecto_de_Mis_Recuerdos.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f9a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite poder monumental y la seguridad absoluta de un nieto sostenido con ternura por su titán.

Ligeramente descentrado en escala imponente, el abuelo, expresión benevolente, representado como titán gigante con vestimenta mitológica en tonos tierra y dorado, sosteniendo suavemente en su mano a su nieto, expresión de confianza sin miedo.$f9a$,
  background_details = $f9b$Paisaje épico con montañas enormes, cielo dramático con nubes, valle verde abajo.$f9b$,
  magic_effects = $f9c$Luz divina ilumina al titán creando un contraste de tamaño dramático pero tierno. La magia debe sentirse poderosa y completamente integrada dentro de una fotografía realista.$f9c$,
  lighting_color = $f9d$Iluminación épica con rayos de sol atravesando nubes dramáticas. Atmósfera poderosa, protectora y llena de amor incondicional.$f9d$,
  poem_template = $f9e$Grande como montaña, fuerte como el mar,
Eres mi titán, mi gigante sin par.
Tu amor es inmenso, tu fuerza colosal,
{NOMBRE_DESTINATARIO} poderoso, mi protector celestial.

Cargas el mundo en tus hombros con gracia,
Y aún así me levantas con tu abrazo y tu audacia.
Titán de mi vida, gigante de bondad,
Tu grandeza es tu amor, tu fuerza es tu lealtad.$f9e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_9_Mi_Titán_de_Amor.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f10a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite conexión generacional, como si el abuelo fuera el puente entre el pasado y el futuro de la familia.

Ligeramente descentrado en un espacio dimensional donde las épocas se mezclan, el abuelo, expresión mística, vestido con túnica de símbolos de relojes y engranajes, reloj de bolsillo antiguo brillante en mano. Junto a él tocando el reloj fascinado, su nieto, expresión de asombro.$f10a$,
  background_details = $f10b$Espacio mágico con relojes flotantes de diferentes épocas, engranajes dorados girando, portales de tiempo mostrando momentos familiares.$f10b$,
  magic_effects = $f10c$Partículas de tiempo flotan y luz dorada y azul emana del reloj antiguo. La magia debe sentirse atemporal y completamente integrada dentro de una fotografía realista.$f10c$,
  lighting_color = $f10d$Iluminación mística dorada y azul del espacio temporal. Atmósfera mística, atemporal y de conexión generacional.$f10d$,
  poem_template = $f10e$Guardas en tu corazón años de historias,
Eres el guardián del tiempo y sus memorias.
Viajas entre épocas con tu sabiduría ancestral,
{NOMBRE_DESTINATARIO} eterno, mi puente temporal.

Me conectas con el pasado de nuestra familia,
Me guías al futuro con tu luz que brilla.
Guardián del tiempo, maestro de las eras,
Contigo el tiempo es amor, no solo lo que esperas.$f10e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_10_El_Guardián_del_Tiempo.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f11a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite guía segura en medio de la tormenta, con el abuelo como luz que nunca se apaga.

Ligeramente descentrado en la cima de un faro majestuoso, el abuelo, expresión protectora, con una luz brillante emanando del faro. Abajo en un barquito seguro mirando hacia arriba con confianza, su nieto, expresión de alivio.$f11a$,
  background_details = $f11b$Océano con olas grandes pero controladas, cielo nocturno con nubes dramáticas pero estrellas visibles, costa rocosa.$f11b$,
  magic_effects = $f11c$Un haz de luz poderoso del faro atraviesa la tormenta guiando el camino. La magia debe sentirse protectora y completamente integrada dentro de una fotografía realista.$f11c$,
  lighting_color = $f11d$Iluminación dramática nocturna con el haz de luz del faro como fuente principal. Atmósfera dramática pero esperanzadora, protectora.$f11d$,
  poem_template = $f11e$Cuando la vida se vuelve oscura y fría,
Eres mi faro, mi luz, mi guía.
Tu amor ilumina mi camino sin cesar,
{NOMBRE_DESTINATARIO} luminoso, mi estrella polar.

En las tormentas más fuertes siempre estás,
Tu luz me dice "no temas, aquí estás".
Faro de mi vida, guardián del mar,
Contigo nunca me puedo perder o naufragar.$f11e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_11_Mi_Faro_en_la_Tormenta.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f12a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura pura: un gigante amable que ama sin reservas.

Ligeramente descentrado arrodillado para estar a la altura de su nieto, el abuelo, hombre mayor de unos 68 años, cabello y barba canosos, expresión dulce, representado como gigante amable de vestimenta simple en tonos tierra, abrazando suavemente con sus manos grandes. Su nieto, sonrisa sin miedo, sintiendo amor puro en el abrazo.$f12a$,
  background_details = $f12b$Jardín mágico con flores gigantes, árboles enormes, mariposas grandes volando.$f12b$,
  magic_effects = $f12c$Pétalos flotan suavemente mientras una luz cálida envuelve el abrazo. La magia debe sentirse tierna y completamente integrada dentro de una fotografía realista.$f12c$,
  lighting_color = $f12d$Luz suave de atardecer envolviendo el jardín mágico. Atmósfera tierna, protectora y de amor gentil.$f12d$,
  poem_template = $f12e$Grande en estatura, gigante en bondad,
Eres el coloso de pura ternura y lealtad.
Tus manos enormes me abrazan con amor,
{NOMBRE_DESTINATARIO} gentil, mi gigante protector.

Fuerte por fuera, suave por dentro,
Tu corazón tierno es mi mejor aliento.
Gigante de amor, titán de dulzura,
Contigo me siento en completa segura.$f12e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_12_El_Gigante_de_Corazón_Tierno.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f13a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el hechizo cotidiano de un cuento contado con el corazón.

Ligeramente descentrado en una mecedora acogedora junto a la chimenea, el abuelo, hombre mayor de unos 68 años, cabello y barba canosos, expresión animada, con un libro grande abierto en su regazo, contando una historia con gestos expresivos. Sentado a sus pies en el suelo con pijama, su nieto, ojos llenos de asombro.$f13a$,
  background_details = $f13b$Sala acogedora con luz cálida de chimenea, estantes con libros, ventana mostrando noche estrellada.$f13b$,
  magic_effects = $f13c$Elementos de la historia cobran vida sutilmente: un dragón pequeño translúcido y un castillo brillante flotan cerca del libro. La magia debe sentirse acogedora y completamente integrada dentro de una fotografía realista.$f13c$,
  lighting_color = $f13d$Luz dorada cálida de la chimenea. Atmósfera mágica, acogedora y llena de imaginación.$f13d$,
  poem_template = $f13e$Cuando cuentas historias el mundo se detiene,
Cada palabra tuya un hechizo que me entretiene.
Tus cuentos son ventanas a mundos sin fin,
{NOMBRE_DESTINATARIO} narrador, mi mago del confín.

Dragones y héroes cobran vida en tu voz,
Me llevas a lugares mágicos, atroz.
Contador de historias, mago de la palabra,
Cada cuento tuyo mi corazón lo labra.$f13e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_13_Tus_Historias_Mágicas.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f14a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite conexión con la naturaleza y la paciencia de aprender juntos a cultivar vida.

Ligeramente descentrados arrodillados junto a un cantero de flores, el abuelo, hombre mayor de unos 68 años, cabello y barba canosos, expresión paciente, señalando algo con amor mientras planta. Junto a él con tierra en las manos, su nieto, expresión de curiosidad y alegría, plantando con una herramienta pequeña.$f14a$,
  background_details = $f14b$Jardín exuberante con flores de todos los colores, mariposas volando, regadera vintage, árboles frutales.$f14b$,
  magic_effects = $f14c$Partículas de polen brillan suavemente bajo la luz del sol. La magia debe sentirse pacífica y completamente integrada dentro de una fotografía realista.$f14c$,
  lighting_color = $f14d$Luz dorada del sol filtrándose entre las flores. Atmósfera pacífica, educativa y conectada con la naturaleza.$f14d$,
  poem_template = $f14e$Tu jardín es un reino de exploración,
Cada planta, cada flor, una nueva lección.
Me enseñas los secretos de la tierra y el sol,
{NOMBRE_DESTINATARIO} jardinero, mi maestro español.

Juntos plantamos semillas de amor y paciencia,
Vemos crecer la vida con tu sabia presencia.
Aventurero del jardín, guardián de la naturaleza,
Contigo cada día florece con belleza.$f14e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_14_Aventuras_en_Tu_Jardín.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f15a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sabiduría transmitida con amor bajo un árbol sereno.

Ligeramente descentrados sentados en un banco de madera bajo un árbol grande, el abuelo, expresión sabia y amorosa, señalando algo importante con gesto sabio. Junto a él escuchando atentamente, su nieto, expresión de comprensión y admiración.$f15a$,
  background_details = $f15b$Parque tranquilo al atardecer, sendero de piedra, luz dorada filtrándose entre las hojas.$f15b$,
  magic_effects = $f15c$Pequeños símbolos brillantes de lecciones de vida (un corazón, manos unidas) flotan suavemente entre ambos. La magia debe sentirse sabia y completamente integrada dentro de una fotografía realista.$f15c$,
  lighting_color = $f15d$Luz cálida de atardecer filtrándose entre las hojas. Atmósfera sabia, educativa y de transmisión de valores.$f15d$,
  poem_template = $f15e$No están en libros ni en escuelas formales,
Tus lecciones son de vida, profundas y ancestrales.
Me enseñas con ejemplo, con amor y paciencia,
{NOMBRE_DESTINATARIO} maestro, mi fuente de sapiencia.

Cada momento contigo es una clase especial,
Aprendo a ser mejor, a vivir sin mal.
Maestro de la vida, profesor del corazón,
Tus lecciones son tesoros, mi mejor educación.$f15e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_15_Las_Lecciones_Que_Solo_Tú_Me_Das.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f16a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad íntima y la confianza absoluta de un secreto compartido.

Ligeramente descentrados muy cerca en un sofá acogedor, el abuelo, hombre mayor de unos 68 años, cabello y barba canosos, expresión cómplice, inclinándose para susurrar algo al oído de su nieto con sonrisa traviesa. Su nieto, ojos brillantes, escuchando con sonrisa de complicidad.$f16a$,
  background_details = $f16b$Sala cálida con luz suave, ventana mostrando atardecer, cojines cómodos.$f16b$,
  magic_effects = $f16c$Pequeñas estrellas brillantes flotan alrededor simbolizando el secreto compartido. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$f16c$,
  lighting_color = $f16d$Luz dorada suave de atardecer entrando por la ventana. Atmósfera cómplice, íntima y llena de confianza.$f16d$,
  poem_template = $f16e$Tenemos secretos que nadie más sabe,
Complicidad única, conexión que no cabe.
Eres mi confidente, mi amigo leal,
{NOMBRE_DESTINATARIO} cómplice, mi tesoro especial.

Guardas mis secretos con amor y cuidado,
Yo guardo los tuyos, nuestro pacto sagrado.
Cómplices eternos, amigos del alma,
Nuestros secretos son lazos que nada desarma.$f16e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_16_Nuestros_Secretos_Compartidos.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f17a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría contagiosa y una carcajada compartida sin límites.

Ligeramente descentrados en medio de una carcajada genuina, el abuelo, hombre mayor de unos 68 años, cabello y barba canosos, expresión de gesto cómico, haciendo una cara graciosa. Junto a él sosteniéndose el estómago de tanto reír, su nieto, expresión de risa desbordante.$f17a$,
  background_details = $f17b$Espacio alegre y colorido tipo jardín o cocina, luz brillante y cálida, elementos cotidianos de un momento espontáneo.$f17b$,
  magic_effects = $f17c$Pequeños símbolos de risa (notas musicales, estrellas) flotan alrededor con un brillo dorado sutil. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$f17c$,
  lighting_color = $f17d$Luz brillante y cálida de un momento espontáneo. Atmósfera alegre, divertida y llena de risa.$f17d$,
  poem_template = $f17e$Tus chistes y bromas iluminan mi día,
Tu risa contagiosa es pura alegría.
Me haces reír hasta que me duele el costado,
{NOMBRE_DESTINATARIO} divertido, mi comediante amado.

Con tus ocurrencias el mundo es mejor,
Tu humor es medicina, tu risa es amor.
Payaso de mi vida, mago de la risa,
Contigo cada momento es una sonrisa.$f17e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_17_Cuando_Me_Haces_Reír.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f18a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sanación emocional profunda en un abrazo protector.

Ligeramente descentrado abrazando tiernamente a su nieto, el abuelo, hombre mayor de unos 68 años, cabello y barba canosos, expresión de amor incondicional, en un abrazo profundo y protector. Su nieto, ojos cerrados sintiendo paz absoluta, envuelto en el abrazo.$f18a$,
  background_details = $f18b$Espacio suave y difuminado, interior cálido con luz dorada envolvente.$f18b$,
  magic_effects = $f18c$Corazones dorados flotan suavemente y ondas de energía amorosa son visibles alrededor del abrazo. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$f18c$,
  lighting_color = $f18d$Luz cálida y dorada envolvente. Atmósfera sanadora, amorosa y llena de consuelo.$f18d$,
  poem_template = $f18e$Cuando estoy triste o el mundo me duele,
Tu abrazo es el remedio que todo lo resuelve.
Tus brazos son refugio, tu pecho es mi hogar,
{NOMBRE_DESTINATARIO} amoroso, mi puerto, mi lugar.

En tu abrazo encuentro paz y consuelo,
Tus brazos son alas que me llevan al cielo.
Sanador del alma, médico del corazón,
Tu abrazo es magia, tu amor es la razón.$f18e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_18_Tu_Abrazo_Que_Todo_lo_Arregla.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f19a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite curiosidad compartida y el asombro de descubrir juntos la belleza del mundo.

Ligeramente descentrados caminando por un sendero, el abuelo, hombre mayor de unos 68 años, cabello y barba canosos, expresión de descubrimiento, señalando algo maravilloso en la naturaleza. Junto a él mirando hacia donde señala, su nieto, expresión de asombro y curiosidad.$f19a$,
  background_details = $f19b$Paisaje natural hermoso tipo bosque o campo, luz del sol creando atmósfera mágica, elementos naturales detallados.$f19b$,
  magic_effects = $f19c$Un destello de luz brilla suavemente sobre lo que están observando, y partículas brillantes flotan en el aire. La magia debe sentirse inspiradora y completamente integrada dentro de una fotografía realista.$f19c$,
  lighting_color = $f19d$Luz natural brillante de día, cálida y clara. Atmósfera exploradora, educativa y llena de asombro.$f19d$,
  poem_template = $f19e$Me muestras el mundo con ojos de asombro,
Cada lugar contigo es un nuevo descombro.
Me enseñas a ver la belleza en lo simple,
{NOMBRE_DESTINATARIO} explorador, mi guía que no se extingue.

Juntos descubrimos maravillas cada día,
Tu curiosidad eterna es mi mejor guía.
Maestro del mundo, explorador sin edad,
Contigo aprendo a vivir con curiosidad.$f19e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_19_Enseñándome_el_Mundo.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f20a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite una promesa eterna: sin importar el paso del tiempo, el nieto siempre será su pequeño.

En la mitad izquierda, ligeramente descentrado, el abuelo, edad actual, sosteniendo con ternura infinita a su nieto pequeño (edad actual del cliente). En la mitad derecha, el mismo abuelo (ligeramente mayor) abrazando a una versión futura de su nieto ya adolescente, con el mismo amor incondicional.$f20a$,
  background_details = $f20b$Espacio atemporal con elementos que representan el paso del tiempo (reloj suave, estaciones cambiando), un mismo lugar familiar mostrado en dos momentos.$f20b$,
  magic_effects = $f20c$Una línea de tiempo visual sutil y partículas de luz dorada conectan ambos momentos. La magia debe sentirse eterna y completamente integrada dentro de una fotografía realista.$f20c$,
  lighting_color = $f20d$Luz dorada atemporal con efecto de memoria y futuro. Atmósfera eterna, nostálgica y llena de amor incondicional.$f20d$,
  poem_template = $f20e$No importa cuánto crezca o qué edad tenga yo,
En tus ojos siempre seré tu pequeño, lo sé yo.
Tu amor no cambia con el paso del tiempo,
{NOMBRE_DESTINATARIO} eterno, mi amor, mi aliento.

Puedo ser grande pero en tu corazón,
Siempre seré tu nieto, tu bendición.
Guardián de mi infancia, protector eternal,
Para ti siempre seré tu pequeño especial.$f20e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas/PLANTILLA_20_Siempre_Seré_Tu_Pequeño.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f1a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite calidez creativa: la familia convertida en la primera banda de rock de la prehistoria.

Ligeramente descentrados en una cueva iluminada, el papá, expresión alegre y creativa, vestido de cavernícola, tallando una guitarra de piedra y ramas. Junto a él, la mamá, sonrisa cálida, inventando una canción junto al fuego. Sus hijos, felices, bailando al ritmo de la música improvisada.$f1a$,
  background_details = $f1b$Cueva prehistórica cálida con fuego encendido, instrumentos hechos de piedra y madera, paredes con dibujos rupestres.$f1b$,
  magic_effects = $f1c$Luciérnagas gigantes iluminan la escena con un resplandor dorado suave. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$f1c$,
  lighting_color = $f1d$Luz cálida del fuego de la cueva con destellos dorados de las luciérnagas. Atmósfera cálida, divertida y llena de energía creativa.$f1d$,
  poem_template = $f1e$En la cueva de los {APELLIDO}, la chispa nunca se apaga,
papá {NOMBRE_DESTINATARIO} talla guitarras con piedras y ramas,
mamá {NOMBRE_DEDICANTE} inventa canciones junto al fuego encendido,
y sus hijos bailan al ritmo divertido.

Las luciérnagas gigantes iluminan la función,
la música resuena como un gran tamborón.
Entre risas y saltos, la noche se enciende,
¡y la primera banda de rock familiar sorprende!

El eco repite nuestro canto ancestral,
y juntos creamos un recuerdo especial.
En la prehistoria o en el salón de estar,
¡la familia unida siempre sabe rockear!$f1e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_1_Si_Fuéramos_Cavernícolas.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f2a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría desbordante en un bosque encantado donde los animales tienen talento.

Ligeramente descentrados en un bosque mágico, el papá, expresión de asombro divertido, anunciando a un león que canta. Junto a él, la mamá, sonrisa aplaudiendo, celebrando a un conejo mago con sombrero de espuma. Sus hijos, felices, invitando a pájaros a participar del espectáculo.$f2a$,
  background_details = $f2b$Bosque encantado con escenario natural, ardillas repartiendo nueces doradas, mariposas bailando.$f2b$,
  magic_effects = $f2c$Las mariposas brillan sutilmente al bailar sobre su propio escenario de hojas. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$f2c$,
  lighting_color = $f2d$Luz colorida y fantasiosa filtrada entre los árboles. Atmósfera colorida, fantasiosa y llena de vida.$f2d$,
  poem_template = $f2e$En el bosque encantado, la familia {APELLIDO} se reúne,
papá {NOMBRE_DESTINATARIO} anuncia al león que canta y se deslumbra,
mamá {NOMBRE_DEDICANTE} aplaude al conejo mago con sombrero de espuma,
y sus hijos invitan a los pájaros a hacer una suma.

Las ardillas reparten nueces doradas de premio,
las mariposas bailan en su propio escenario,
y entre risas y abrazos, premiamos a los mejores,
¡pues hasta los animales quieren ser parte de nuestros honores!

El bosque se llena de magia y emoción,
y cada talento es una celebración.
¡En la familia {APELLIDO} la aventura animal,
es un concurso de sueños y cariño sin igual!$f2e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_2_Si_Pudiéramos_Hablar_Con_Los_Animales.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f3a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite diversión espacial: la familia maneja una pizzería lunar sin gravedad.

Ligeramente descentrados flotando en gravedad cero, el papá, expresión hábil y divertida, en traje de astronauta lanzando masa de pizza al aire. Junto a él, la mamá, expresión concentrada, eligiendo ingredientes flotantes de Marte y Saturno. Sus hijos, felices, repartiendo pizzas a marcianos simpáticos.$f3a$,
  background_details = $f3b$Pizzería lunar futurista con ventanas al espacio, la Tierra visible de fondo, ingredientes flotando.$f3b$,
  magic_effects = $f3c$Las estrellas parecen aplaudir desde la ventana con destellos sutiles. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$f3c$,
  lighting_color = $f3d$Luz futurista azul y plateada con destellos de estrellas. Atmósfera divertida, brillante y espacial.$f3d$,
  poem_template = $f3e$En la pizzería lunar de los {APELLIDO} no hay gravedad,
papá {NOMBRE_DESTINATARIO} lanza la masa con gran habilidad,
mamá {NOMBRE_DEDICANTE} elige ingredientes de Marte y Saturno,
y sus hijos reparten pizzas en un segundo.

Las estrellas aplauden desde la ventana azul,
y los marcianos sonríen en su mesa de tul.
Entre risas flotantes y bocados espaciales,
la familia conquista el universo, ¡sin finales!

El universo entero gira en derredor,
y juntos viajamos con sabor y amor.
¡En la Luna o en la Tierra, la alegría es igual,
cuando la familia comparte un momento espacial!$f3e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_3_Si_Fuéramos_Astronautas.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f4a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite creatividad familiar transformando el tráfico aburrido en pura diversión.

Ligeramente descentrados dentro del auto, el papá, expresión narrativa divertida, inventando historias de dragones desde el asiento del conductor. Junto a él, la mamá, sonrisa competitiva, iniciando una competencia de chistes. Sus hijos, felices, convirtiendo los semáforos en portales mágicos.$f4a$,
  background_details = $f4b$Interior de auto familiar rodeado de tráfico, ventanas con dibujos de vapor, dragones volando fuera de la ventana como fantasía.$f4b$,
  magic_effects = $f4c$Globos de diálogo brillantes con chistes flotan sutilmente sobre las ventanas. La magia debe sentirse creativa y completamente integrada dentro de una fotografía realista.$f4c$,
  lighting_color = $f4d$Luz cálida de interior de auto con destellos de color de la imaginación desbordante. Atmósfera cálida y llena de creatividad.$f4d$,
  poem_template = $f4e$En el auto de los {APELLIDO} no hay lugar para el tedio,
papá {NOMBRE_DESTINATARIO} inventa historias de dragones de remedio,
mamá {NOMBRE_DEDICANTE} inicia la competencia de chistes geniales,
y sus hijos convierten semáforos en portales.

Las ventanas se llenan de dibujos y vapor,
los asientos se vuelven escenarios de color.
Así, el tráfico más lento se vuelve diversión,
¡porque juntos la aventura vive en el corazón!

Hasta los autos vecinos quieren participar,
y en cada parada volvemos a imaginar.
¡Con la familia unida, ningún viaje es igual,
pues el aburrimiento aquí no tiene rival!$f4e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_4_Si_Estuviéramos_Atascados_En_El_Tráfico.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f5a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fantasía medieval: hacer las compras se convierte en un festival encantado.

Ligeramente descentrados cruzando un puente dorado, el papá, expresión aventurera, cabalgando un carrito de compras con forma de dragón. Junto a él, la mamá, expresión mágica, lanzando hechizos con una varita de pan. Sus hijos, felices, buscando tesoros entre los pasillos.$f5a$,
  background_details = $f5b$Supermercado convertido en castillo medieval, estanterías como murallas, frascos de mermelada bailando en el pasillo.$f5b$,
  magic_effects = $f5c$Los productos brillan sutilmente como si tuvieran una misión secreta que cumplir. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$f5c$,
  lighting_color = $f5d$Luz dorada de cuento de hadas iluminando los pasillos. Atmósfera mágica, festiva y colorida.$f5d$,
  poem_template = $f5e$Los {APELLIDO} entran al mercado, cruzando un puente dorado,
papá {NOMBRE_DESTINATARIO} cabalga un carrito-dragón alocado,
mamá {NOMBRE_DEDICANTE} lanza hechizos con su varita de pan,
y sus hijos buscan tesoros en cada rincón.

El rey Quesito nos invita a un banquete real,
y los frascos de mermelada bailan en el pasillo central.
Cada producto tiene una misión secreta,
¡hoy la lista de compras es una aventura completa!

Entre dragones y magos, la magia es total,
y la familia transforma el mercado en un festival.
¡Con imaginación y amor, todo puede pasar,
y hasta en la compra nos podemos encantar!$f5e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_5_Si_El_Supermercado_Fuera_Un_Castillo_Encantado.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f6a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite aventura pirata familiar en busca de tesoros de risa.

Ligeramente descentrados en su barco fantástico, el papá, expresión de capitán, gritando "al abordaje" mientras navega. Junto a él, la mamá, expresión aventurera, con mapa de noche y de día descubriendo islas secretas. Sus hijos, felices, buscando cofres de risas entre olas de almohadas.$f6a$,
  background_details = $f6b$Barco fantástico sobre mares de colores, loros parlantes, gaviotas sin prisa volando.$f6b$,
  magic_effects = $f6c$Los loros repiten historias de mares dorados con un brillo mágico sutil. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$f6c$,
  lighting_color = $f6d$Luz cálida y dorada de mar de colores fantásticos. Atmósfera de aventura familiar y alegría.$f6d$,
  poem_template = $f6e$En el barco de los {APELLIDO} la aventura es ley,
papá {NOMBRE_DESTINATARIO} grita "¡al abordaje!" mientras navega como un rey,
mamá {NOMBRE_DEDICANTE} con su mapa de noche y de día,
descubre islas secretas llenas de alegría.

sus hijos buscan cofres de risas,
entre olas de almohadas y gaviotas sin prisas.
Los loros repiten historias de mares dorados,
y juntos hallamos tesoros jamás encontrados.

Con parches y espadas de cartón pintado,
el viento nos lleva a un puerto encantado.
Y al final del arcoíris, entre abrazos y canciones,
descubrimos que estar juntos es la mejor de las razones.$f6e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_6_Si_Fuéramos_Piratas.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f7a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite exploración salvaje y divertida dentro del propio living.

Ligeramente descentrados en la sala transformada en selva, el papá, expresión de rugido divertido, rugiendo listo para explorar. Junto a él, la mamá, expresión alegre, bailando entre lianas hechas de mantas. Sus hijos, felices, con binoculares de cartón descubriendo rincones.$f7a$,
  background_details = $f7b$Sala convertida en jungla exuberante, muebles cubiertos de hojas, peluches como animales salvajes.$f7b$,
  magic_effects = $f7c$Debajo de la mesa se esconde un hada pequeña y brillante. La magia debe sentirse juguetona y completamente integrada dentro de una fotografía realista.$f7c$,
  lighting_color = $f7d$Luz cálida de interior con acentos verdes vibrantes de la jungla improvisada. Atmósfera de juego total.$f7d$,
  poem_template = $f7e$En la jungla de la casa todo puede pasar,
papá {NOMBRE_DESTINATARIO} ruge fuerte, listo para explorar,
mamá {NOMBRE_DEDICANTE} baila entre lianas de mantas,
y los peluches salvajes saltan como plantas.

sus hijos con binoculares de cartón,
descubren rincones llenos de emoción.
Los cojines son cuevas, las sillas montañas,
y las risas resuenan como mil campanas.

La selva crece con cada carcajada,
y debajo de la mesa se esconde una hada.
¡Hoy la aventura se vive en el salón,
donde la familia es la tribu del corazón!$f7e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_7_Si_La_Sala_Fuera_Una_Jungla.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f8a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ciencia divertida convertida en un experimento familiar delicioso.

Ligeramente descentrados en la cocina-laboratorio, el papá, expresión de científico preciso, mezclando pociones de colores con bata y gafas. Junto a él, la mamá, expresión creativa, inventando helados de arcoíris brillante. Sus hijos, felices, creando burbujas flotantes.$f8a$,
  background_details = $f8b$Cocina convertida en laboratorio, tubos de ensayo, ingredientes de colores brillantes.$f8b$,
  magic_effects = $f8c$Las cucharas parecen varitas y los vasos calderos, con destellos suaves al mezclar los ingredientes. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$f8c$,
  lighting_color = $f8d$Luz brillante de laboratorio con destellos de colores vivos. Atmósfera divertida y llena de energía creativa.$f8d$,
  poem_template = $f8e$En el laboratorio de los {APELLIDO} la ciencia es diversión,
papá {NOMBRE_DESTINATARIO} mezcla pociones con gran precisión,
mamá {NOMBRE_DEDICANTE} inventa helados de arcoíris brillante,
y sus hijos crean burbujas flotantes.

Las cucharas son varitas, los vasos calderos,
los ingredientes bailan y lanzan destellos.
Cada receta es magia, cada risa un hechizo,
y al final del experimento, ¡siempre hay un gran abrazo y un rico platillo!$f8e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_8_Si_La_Cocina_Fuera_Un_Laboratorio_Loco.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f9a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite libertad y paz al volar juntos entre nubes y arcoíris.

Ligeramente descentrados en un globo aerostático, el papá, expresión amorosa, saludando a las nubes. Junto a él, la mamá, expresión curiosa, entrevistando a pájaros viajeros imaginarios. Sus hijos, felices, lanzando besos al viento.$f9a$,
  background_details = $f9b$Globo aerostático con detalles personalizados en colores pastel, paisajes de nubes y arcoíris.$f9b$,
  magic_effects = $f9c$El paisaje se pinta suavemente de sueños y contento con destellos pastel. La magia debe sentirse pacífica y completamente integrada dentro de una fotografía realista.$f9c$,
  lighting_color = $f9d$Luz suave pastel de cielo despejado. Atmósfera pacífica, soñadora y llena de amor.$f9d$,
  poem_template = $f9e$En el globo de los {APELLIDO} volamos sin temor,
papá {NOMBRE_DESTINATARIO} saluda a las nubes con amor,
mamá {NOMBRE_DEDICANTE} entrevista a pájaros viajeros,
que cuentan historias de cielos y senderos.

sus hijos lanzan besos al viento,
y el paisaje se pinta de sueños y contento.
Sobre arcoíris flotamos, cantando canciones,
y el sol nos regala mil bendiciones.

El mundo se ve pequeño desde nuestro rincón,
pero el amor familiar ¡es gigante en el corazón!$f9e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_9_Si_Viajáramos_En_Globo_Por_El_Cielo.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f10a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite la magia cotidiana de una familia con "superpoderes" domésticos divertidos.

Ligeramente descentrados en casa, el papá, expresión traviesa, convirtiendo un bostezo en pequeñas luces especiales. Junto a él, la mamá, expresión divertida, encontrando calcetines perdidos con solo chasquear los dedos. Sus hijos, felices, haciendo que la comida humee deliciosamente.$f10a$,
  background_details = $f10b$Interior de casa con plantas bailando suavemente y juguetes flotando levemente.$f10b$,
  magic_effects = $f10c$Fuegos artificiales de colores pequeños y suaves acompañan cada superpoder casero. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$f10c$,
  lighting_color = $f10d$Luz cálida de hogar con destellos de colores mágicos. Atmósfera alegre y llena de acción.$f10d$,
  poem_template = $f10e$En la casa de los {APELLIDO} los poderes son reales,
papá {NOMBRE_DESTINATARIO} convierte bostezos en luces especiales,
mamá {NOMBRE_DEDICANTE} encuentra calcetines con solo chasquear,
y sus hijos hacen que la comida siempre sepa a hogar.

Las plantas bailan, los juguetes flotan,
y las carcajadas en el aire rebotan.
Pero el mayor superpoder, sin comparación,
es querernos tanto y estar juntos de corazón.$f10e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_10_Si_Tuviéramos_Superpoderes.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f11a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite espíritu explorador y el descubrimiento de que el mayor tesoro es el amor familiar.

Ligeramente descentrados con brújulas de cartón, el papá, expresión decidida, liderando la marcha con paso firme. Junto a él, la mamá, expresión observadora, encontrando pistas que nadie más ha visto. Sus hijos, felices, saltando entre rocas buscando joyas escondidas.$f11a$,
  background_details = $f11b$Jungla o bosque mágico con mapas, mochilas, cofres y piedras preciosas visibles.$f11b$,
  magic_effects = $f11c$Animales fantásticos pequeños se asoman tímidamente entre la vegetación. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$f11c$,
  lighting_color = $f11d$Luz dorada de día en el bosque con toques plateados de luna en la distancia. Atmósfera de descubrimiento y unión.$f11d$,
  poem_template = $f11e$Con brújulas de cartón y mapas arrugados,
la familia {APELLIDO} recorre caminos encantados.
Papá {NOMBRE_DESTINATARIO} lidera la marcha con paso decidido,
mamá {NOMBRE_DEDICANTE} encuentra pistas que nadie ha visto.

sus hijos saltan entre rocas y ríos,
buscando joyas escondidas y secretos antiguos.
Al final del viaje, entre risas y abrazos,
el mayor tesoro es el amor que llevamos.

Bajo el sol dorado y la luna brillante,
la aventura continúa a cada instante.
¡Exploradores unidos en cada misión,
la familia es siempre la mejor expedición!$f11e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_11_Si_Fuéramos_Exploradores_De_Tesoros.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f12a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite espectáculo familiar y la alegría de una función de circo improvisada en el jardín.

Ligeramente descentrados en el jardín transformado, el papá, expresión de equilibrista, haciendo equilibrio listo para saltar. Junto a él, la mamá, expresión alegre, lanzando flores como confeti brillante. Sus hijos, felices, actuando como pequeños magos.$f12a$,
  background_details = $f12b$Jardín convertido en pista de circo, arbustos disfrazados de payasos, columpios girando como trapecios.$f12b$,
  magic_effects = $f12c$Los gnomos del jardín aplauden suavemente la función con un brillo mágico sutil. La magia debe sentirse festiva y completamente integrada dentro de una fotografía realista.$f12c$,
  lighting_color = $f12d$Luz festiva y colorida de día de circo. Atmósfera festiva, colorida y llena de diversión.$f12d$,
  poem_template = $f12e$En el circo de los {APELLIDO} todo puede pasar,
papá {NOMBRE_DESTINATARIO} es equilibrista, listo para saltar,
mamá {NOMBRE_DEDICANTE} lanza flores como confeti brillante,
y sus hijos son magos deslumbrantes.

Los arbustos se visten de payasos risueños,
y los columpios giran como trapecios pequeños.
Ríen las flores, aplauden los gnomos,
y la función termina con abrazos y aplausos.

El jardín se transforma en pista estelar,
donde la familia es la estrella principal.
¡Con magia y alegría en cada rincón,
el circo en casa es pura diversión!$f12e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_12_Si_El_Jardín_Fuera_Un_Circo_Mágico.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f13a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ingenio familiar sin límites en un taller de invenciones.

Ligeramente descentrados en su taller, el papá, expresión inventiva, creando una máquina que todo repara. Junto a él, la mamá, expresión soñadora, diseñando alas de cartón para volar. Sus hijos, felices, inventando risas sin cesar.$f13a$,
  background_details = $f13b$Taller mágico lleno de herramientas, planos, robots caseros, tuercas y engranajes.$f13b$,
  magic_effects = $f13c$Los engranajes giran con una chispa de emoción visible, como si el invento cobrara vida. La magia debe sentirse creativa y completamente integrada dentro de una fotografía realista.$f13c$,
  lighting_color = $f13d$Luz cálida de taller con destellos metálicos. Atmósfera de invención, imaginación y felicidad.$f13d$,
  poem_template = $f13e$En el taller de los {APELLIDO} las ideas no paran,
papá {NOMBRE_DESTINATARIO} crea máquinas que todo reparan,
mamá {NOMBRE_DEDICANTE} diseña alas para volar,
y sus hijos inventan risas sin cesar.

Tuercas y engranajes giran con emoción,
los planos se llenan de imaginación.
Cada invento es un sueño hecho realidad,
¡en familia la ciencia es felicidad!

Entre cables y ruedas, la chispa no acaba,
y juntos creamos la risa más preciada.
¡Inventores unidos, sin limitación,
la familia es pura invención!$f13e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_13_Si_Fuéramos_Inventores_Locos.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f14a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite calidez nocturna y la magia del ritual familiar antes de dormir.

Ligeramente descentrados en la habitación nocturna, el papá, expresión de trovador, contando historias con voz animada. Junto a él, la mamá, expresión tierna, encendiendo estrellas proyectadas en el techo. Sus hijos, felices, atrapando sueños bajo las cobijas.$f14a$,
  background_details = $f14b$Habitación de noche con luces suaves, estrellas proyectadas en el techo, peluches y pijamas.$f14b$,
  magic_effects = $f14c$Las sábanas parecen volar suavemente como capas de magos mientras los peluches bailan bajo cielos dorados. La magia debe sentirse tierna y completamente integrada dentro de una fotografía realista.$f14c$,
  lighting_color = $f14d$Luz suave nocturna con estrellas doradas proyectadas. Atmósfera mágica y cálida.$f14d$,
  poem_template = $f14e$Cuando cae la noche sobre el hogar {APELLIDO},
papá {NOMBRE_DESTINATARIO} cuenta historias con voz de trovador,
mamá {NOMBRE_DEDICANTE} enciende estrellas en el techo,
y sus hijos atrapan sueños bajo el colchón.

Las sábanas vuelan como capas de magos,
y los peluches bailan bajo cielos dorados.
Cada palabra es un hechizo de amor,
y dormimos felices, soñando mejor.

En la familia, los sueños se hacen canción,
y la noche se llena de imaginación.
¡Cuento de hadas en cada rincón,
donde el final feliz es nuestro colchón!$f14e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_14_Si_La_Noche_Fuera_Un_Cuento_De_Hadas.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f15a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite aventura real: el parque convertido en un reino donde la familia gobierna con felicidad.

Ligeramente descentrados en el parque-reino, el papá, expresión de caballero valiente, como caballero que nunca se rinde. Junto a él, la mamá, expresión sabia, como reina de flores y juegos. Sus hijos, felices, como príncipes de sueños eternos.$f15a$,
  background_details = $f15b$Parque convertido en reino mágico, columpios como barcos, toboganes como montañas, árboles como castillos.$f15b$,
  magic_effects = $f15c$Los árboles con ramas extrañas parecen tener un brillo de castillo encantado. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$f15c$,
  lighting_color = $f15d$Luz brillante de día soleado en el parque-reino. Atmósfera fantástica y alegre.$f15d$,
  poem_template = $f15e$En el parque de los {APELLIDO} hay dragones y reyes,
papá {NOMBRE_DESTINATARIO} es caballero que nunca se rinde,
mamá {NOMBRE_DEDICANTE} reina sabia de flores y juegos,
y sus hijos príncipes de sueños eternos.

Los columpios son barcos, los toboganes montañas,
y los árboles castillos con ramas extrañas.
Corremos y reímos en la corte real,
y juntos vivimos una historia sin final.

En el reino del parque, la magia es verdad,
y la familia gobierna con felicidad.
¡Aventuras y cuentos bajo el sol,
y el mejor tesoro: nuestro amor!$f15e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_15_Si_El_Parque_Fuera_Un_Reino_Fantástico.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f16a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite diversión acuática con la familia convertida en criaturas marinas.

Ligeramente descentrados entre burbujas, el papá, expresión juguetona, como tritón nadando con gran entusiasmo. Junto a él, la mamá, expresión alegre, peinando cabellos con conchas brillantes. Sus hijos, felices, chapoteando como sirenas.$f16a$,
  background_details = $f16b$Baño transformado en spa marino, burbujas, conchas y juguetes de mar, toallas como capas.$f16b$,
  magic_effects = $f16c$El agua baila reflejando mil colores como si tuviera vida propia. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$f16c$,
  lighting_color = $f16d$Luz azul brillante llena de reflejos de agua. Atmósfera alegre y llena de luz marina.$f16d$,
  poem_template = $f16e$En el spa de los {APELLIDO} las burbujas no paran,
papá {NOMBRE_DESTINATARIO} es tritón que nada con gran ganas,
mamá {NOMBRE_DEDICANTE} peina cabellos con conchas brillantes,
y sus hijos chapotean como sirenas radiantes.

Las toallas son capas, las esponjas tesoros,
y el agua baila reflejando mil colores.
Entre risas y espuma, la tarde se pasa,
¡y el baño es un mar de alegría en casa!$f16e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_16_Si_El_Baño_Fuera_Un_Spa_De_Sirenas.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f17a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite exploración espacial familiar rumbo a un mundo mejor.

Ligeramente descentrados en la nave-casa, el papá, expresión de piloto seguro, pilotando rumbo a un nuevo color. Junto a él, la mamá, expresión estudiosa, estudiando estrellas y planetas lejanos. Sus hijos, felices, saludando marcianos con las manos.$f17a$,
  background_details = $f17b$Casa convertida en nave espacial, ventanas con vistas a planetas, controles futuristas, juguetes flotando.$f17b$,
  magic_effects = $f17c$Las ventanas se llenan de galaxias brillantes que parecen respirar suavemente. La magia debe sentirse futurista y completamente integrada dentro de una fotografía realista.$f17c$,
  lighting_color = $f17d$Luz futurista azul y violeta de las galaxias. Atmósfera futurista y alegre.$f17d$,
  poem_template = $f17e$En la nave de los {APELLIDO} despegamos sin temor,
papá {NOMBRE_DESTINATARIO} pilota rumbo a un nuevo color,
mamá {NOMBRE_DEDICANTE} estudia estrellas y planetas lejanos,
y sus hijos saludan marcianos con manos.

Las ventanas se llenan de galaxias brillantes,
y flotamos felices como astronautas gigantes.
En cada misión descubrimos un mundo mejor,
¡la familia viaja unida por el espacio y el amor!$f17e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_17_Si_La_Casa_Fuera_Una_Nave_Espacial.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f18a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite dulzura familiar en una pastelería llena de magia y aroma a hogar.

Ligeramente descentrados en la pastelería, el papá, expresión de panadero orgulloso, amasando pan con destreza. Junto a él, la mamá, expresión creativa, decorando pasteles con azúcar brillante. Sus hijos, felices, robando chispas de colores con las manos.$f18a$,
  background_details = $f18b$Cocina transformada en pastelería, mesas llenas de pasteles, harina en el aire, gorros de chef.$f18b$,
  magic_effects = $f18c$El aroma dulce se representa con líneas onduladas brillantes flotando sobre los pasteles. La magia debe sentirse deliciosa y completamente integrada dentro de una fotografía realista.$f18c$,
  lighting_color = $f18d$Luz cálida de pastelería con destellos dorados de azúcar. Atmósfera cálida y deliciosa.$f18d$,
  poem_template = $f18e$En la pastelería de los {APELLIDO} la harina vuela,
papá {NOMBRE_DESTINATARIO} amasa pan con manos de novela,
mamá {NOMBRE_DEDICANTE} decora pasteles con azúcar brillante,
y sus hijos roban chispas en un instante.

El aroma endulza toda la mañana,
y los dulces se multiplican de forma extraña.
Entre glaseado y risas la magia se ve,
¡y la familia disfruta un banquete de chef!$f18e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_18_Si_La_Cocina_Fuera_Una_Pastelería_Mágica.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f19a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite energía festiva: toda la familia bailando junta hasta el amanecer.

Ligeramente descentrados en la pista improvisada, el papá, expresión de bailarín afinado, bailando salsa con paso seguro. Junto a él, la mamá, expresión radiante, girando como estrella brillante. Sus hijos, felices, inventando coreografías fascinantes.$f19a$,
  background_details = $f19b$Salón convertido en pista de baile con luces de colores, bola disco, ropa divertida.$f19b$,
  magic_effects = $f19c$Las luces titilan al ritmo de la música como si bailaran también. La magia debe sentirse festiva y completamente integrada dentro de una fotografía realista.$f19c$,
  lighting_color = $f19d$Luces de colores festivas con efecto de bola disco. Atmósfera festiva y llena de energía.$f19d$,
  poem_template = $f19e$En la pista de los {APELLIDO} nadie se queda sentado,
papá {NOMBRE_DESTINATARIO} baila salsa con paso afinado,
mamá {NOMBRE_DEDICANTE} gira y ríe como estrella brillante,
y sus hijos inventan coreografías fascinantes.

Las luces titilan, la música invita,
y las zapatillas vuelan en cada vueltita.
Bailamos juntos hasta el amanecer,
¡la familia celebra el poder de mover!$f19e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_19_Si_El_Salón_Fuera_Una_Pista_De_Baile.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f20a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el cierre perfecto: la familia viviendo dentro de su propio cuento sin final.

Ligeramente descentrados junto a un libro gigante abierto y flotante, el papá, expresión cálida, escribiendo capítulos con gestos de abrazo. Junto a él, la mamá, expresión soñadora, ilustrando sueños con besos y canciones. Sus hijos, felices, agregando aventuras y emociones al libro.$f20a$,
  background_details = $f20b$Libro abierto gigante con ilustraciones de la familia viviendo aventuras, páginas flotantes con detalles mágicos.$f20b$,
  magic_effects = $f20c$Las páginas del libro se llenan de magia y calor con un brillo dorado suave. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$f20c$,
  lighting_color = $f20d$Luz cálida de ensueño envolviendo el libro flotante. Atmósfera cálida, mágica y de cierre emotivo.$f20d$,
  poem_template = $f20e$En el cuento de los {APELLIDO} la historia sigue y sigue,
papá {NOMBRE_DESTINATARIO} escribe capítulos con abrazos que persiguen,
mamá {NOMBRE_DEDICANTE} ilustra sueños con besos y canciones,
y sus hijos agregan aventuras y emociones.

Las páginas se llenan de magia y calor,
y juntos creamos el mejor libro de amor.
Porque la familia es un cuento especial,
¡que nunca termina y siempre es genial!$f20e$,
  character_roles = '[{"key":"papa","count":1},{"key":"mama","count":1},{"key":"hijos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas/PLANTILLA_20_Si_La_Familia_Fuera_Un_Cuento_Sin_Final.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f1a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad y la emoción de que a los hermanos se les ocurran planes increíbles juntos.

Ligeramente descentrados en un bosque prehistórico, los hermanos, con expresión de aventura y complicidad, vestidos de exploradores, construyen juntos una cabaña de ramas y acarician con cuidado a un pequeño dinosaurio amigable.$f1a$,
  background_details = $f1b$Bosque prehistórico con helechos gigantes y árboles enormes, huellas de dinosaurio en el suelo, cabaña hecha de ramas.$f1b$,
  magic_effects = $f1c$Huevos de dinosaurio brillan suavemente y plantas fosforescentes iluminan el follaje. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$f1c$,
  lighting_color = $f1d$Iluminación cálida de selva prehistórica, luz dorada filtrada entre helechos. Atmósfera de aventura, creatividad y diversión.$f1d$,
  poem_template = $f1e$Juntos imaginan mundos donde todo es posible,
crean mapas secretos y rutas invisibles.
El Parque Triásico es su gran invención,
dinosaurios y aventuras, ¡pura emoción!

Construyen guaridas entre helechos gigantes,
corren de velociraptors, son exploradores vibrantes.
Inventan códigos, trampas y leyendas,
su equipo es invencible, ¡nadie los detenga!$f1e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_1_Parque_Triásico.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f2a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite un sueño compartido de explorar mundos desconocidos juntos.

Ligeramente descentrados a bordo de una nave hecha de nubes, los hermanos, con expresión de asombro soñador, señalan juntos una isla flotante y extienden los brazos hacia un arcoíris.$f2a$,
  background_details = $f2b$Cielo mágico con nubes esponjosas formando una nave, islas flotantes con castillos en el aire, pájaros fantásticos.$f2b$,
  magic_effects = $f2c$Arcoíris y estrellas brillan suavemente alrededor de la nave de nubes. La magia debe sentirse soñadora y completamente integrada dentro de una fotografía realista.$f2c$,
  lighting_color = $f2d$Atardecer pastel con destellos dorados y estrellas tempranas. Atmósfera etérea y soñadora.$f2d$,
  poem_template = $f2e$Suben a su nave hecha de nubes y sueños,
viajan por cielos de algodón y paisajes risueños.
Descubren islas flotantes, castillos en el aire,
juntos no hay límites, todo pueden alcanzar.

Vuelan sobre arcoíris, saludan a las estrellas,
avistan planetas mágicos y criaturas tan bellas.
El timón lo llevan juntos, sin miedo al viento,
su equipo navega alto, ¡siempre en movimiento!$f2e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_2_Nave_de_las_Nubes.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f3a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite creatividad desbordante e ingenio compartido entre los hermanos.

Ligeramente descentrados en su laboratorio de juegos, los hermanos, con expresión de diversión traviesa, con batas de "científicos del juego", lanzan un dado gigante y arman juntos un tablero brillante rodeado de piezas de colores flotando.$f3a$,
  background_details = $f3b$Habitación llena de mesas con piezas de colores, cartas mágicas, pizarras con fórmulas de juegos dibujadas.$f3b$,
  magic_effects = $f3c$Juguetes y piezas flotan suavemente con un brillo de neón mágico. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$f3c$,
  lighting_color = $f3d$Luz de neón colorida mezclada con luz cálida de interior. Atmósfera creativa, colorida y caótica.$f3d$,
  poem_template = $f3e$En su laboratorio no existen las reglas,
inventan competencias, desafíos y sorpresas.
Cada día un juego nuevo, nunca se repite,
su creatividad es infinita, ¡nadie los compite!

Construyen tableros con piezas de colores,
lanzan dados mágicos, crean mundos mejores.
Entre risas y saltos, el tiempo se detiene,
y el mejor equipo siempre gana… ¡o entretiene!$f3e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_3_Laboratorio_de_Juegos.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f4a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite travesura cómica y valentía compartida frente a fantasmas simpáticos.

Ligeramente descentrados en un pasillo de mansión antigua, los hermanos, con expresión pícara y divertida, con linternas en mano, señalan un cuadro que se mueve y saludan juntos a un fantasma simpático y translúcido.$f4a$,
  background_details = $f4b$Mansión antigua con pasillos largos, cuadros que se mueven, lámparas flotantes, muebles antiguos.$f4b$,
  magic_effects = $f4c$Un fantasma simpático flota entre risas y las puertas se entreabren con luces misteriosas. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$f4c$,
  lighting_color = $f4d$Luz tenue y misteriosa con destellos violetas de las lámparas flotantes. Atmósfera de misterio divertido.$f4d$,
  poem_template = $f4e$La mansión encantada es su territorio,
allí inventan bromas y viven su propio repertorio.
Esconden fantasmas de mentira, puertas que chirrían,
y cada cuarto esconde una nueva travesía.

Entre risas y gritos corren por los pasillos,
planean travesuras, juegan a asustar a los pillos.
El mejor equipo nunca teme a los fantasmas,
su valentía y humor siempre se plasman.$f4e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_4_Mansión_Encantada.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f5a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el orgullo de defender juntos una fortaleza indestructible construida con amor.

Ligeramente descentrados defendiendo su fortaleza, los hermanos, con expresión heroica y feliz, con coronas de papel y escudos de cartón, custodian juntos su castillo de cojines desde la torre principal.$f5a$,
  background_details = $f5b$Sala familiar convertida en castillo de cojines y mantas de colores, peluches "dragones", banderas hechas a mano.$f5b$,
  magic_effects = $f5c$Luces cálidas parpadean como si el castillo tuviera su propia magia protectora. La magia debe sentirse acogedora y completamente integrada dentro de una fotografía realista.$f5c$,
  lighting_color = $f5d$Luz cálida de interior con tonos anaranjados y dorados. Atmósfera acogedora, divertida y mágica.$f5d$,
  poem_template = $f5e$En la sala levantan castillos de almohadas y mantas,
crean murallas, torres y entradas encantadas.
Defienden su reino de dragones y monstruos,
su fortaleza resiste todos los sustos.

Coronan reyes y reinas, pactan alianzas,
juegan a esconderse, lanzan carcajadas.
El mejor equipo nunca cae en batalla,
su castillo de cojines es leyenda en casa.$f5e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_5_Castillo_de_Cojines.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f6a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite misterio y la emoción de un hallazgo compartido entre los hermanos.

Ligeramente descentrados dentro de una cueva iluminada por linternas, los hermanos, con expresión de sigilo y alegría, avanzan juntos entre piedras brillantes sosteniendo un mapa hecho a mano y un cofre pequeño con monedas.$f6a$,
  background_details = $f6b$Cueva mágica iluminada por piedras brillantes, cofres, monedas y joyas antiguas dispersas.$f6b$,
  magic_effects = $f6c$Las piedras de la cueva emiten un resplandor suave que guía el camino. La magia debe sentirse misteriosa y completamente integrada dentro de una fotografía realista.$f6c$,
  lighting_color = $f6d$Luz de linterna cálida contra la penumbra azulada de la cueva, con reflejos dorados en las piedras. Atmósfera de misterio y alegría.$f6d$,
  poem_template = $f6e$Con linternas y mapas hechos a mano,
buscan tesoros donde nadie más ha llegado.
La cueva misteriosa es su gran misión,
llena de acertijos, secretos y emoción.

Sigilosos avanzan entre piedras y brillos,
hallando cofres dorados y antiguos anillos.
Juntos celebran cada hallazgo y risa,
el mejor equipo nunca pierde la pista.$f6e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_6_Cueva_del_Tesoro_Escondido.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f7a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite caos alegre y diversión pura en plena batalla de almohadas.

Ligeramente descentrados en plena batalla, los hermanos, con expresión de risa desbordante, lanzan y esquivan almohadas entre plumas flotantes, cayendo juntos entre cojines suaves riendo a carcajadas.$f7a$,
  background_details = $f7b$Sala llena de almohadas y plumas flotando, pijamas coloridas, trincheras improvisadas de cojines.$f7b$,
  magic_effects = $f7c$Las plumas flotan en el aire como si el tiempo se ralentizara en cada golpe de almohada. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$f7c$,
  lighting_color = $f7d$Luz cálida de interior con tonos alegres y brillantes. Atmósfera caótica y divertida.$f7d$,
  poem_template = $f7e$Las almohadas vuelan como nubes en tormenta,
risas y saltos llenan la escena.
Entre plumas y carcajadas sin fin,
su batalla es legendaria, ¡nadie puede huir!

Construyen trincheras, lanzan ataques suaves,
y al final todos caen rendidos en suaves naves.
El mejor equipo convierte la sala en campo de juegos,
donde la diversión nunca tiene peros.$f7e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_7_Batalla_de_Almohadas.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f8a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite orgullo creativo y la alegría de dejar huella juntos.

Ligeramente descentrados frente a sus obras, los hermanos, con expresión de orgullo artístico, con manchas de pintura en la ropa, firman y muestran juntos sus cuadros recién pintados, con las manos llenas de color.$f8a$,
  background_details = $f8b$Habitación convertida en galería de arte con cuadros coloridos, caballetes, esculturas de plastilina.$f8b$,
  magic_effects = $f8c$Los colores de las pinturas parecen brillar con vida propia sobre los lienzos. La magia debe sentirse creativa y completamente integrada dentro de una fotografía realista.$f8c$,
  lighting_color = $f8d$Luz cálida de estudio de arte con acentos de colores vivos. Atmósfera artística, alegre y creativa.$f8d$,
  poem_template = $f8e$Lienzos, pinceles y colores por doquier,
sus obras llenan la casa de placer.
La galería de los genios es su rincón especial,
donde la creatividad nunca tiene final.

Pintan dragones, castillos y sueños dorados,
firman sus cuadros, dejan nombres pintados.
El mejor equipo crea mundos de fantasía,
y cada obra es muestra de su alegría.$f8e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_8_Galería_de_los_Genios.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f9a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ingenio compartido resolviendo un misterio familiar.

Ligeramente descentrados analizando pistas, los hermanos, con expresión analítica y de descubrimiento, con gabardina de detective y lupa, examinan juntos una pizarra llena de pistas y señalan una huella con emoción.$f9a$,
  background_details = $f9b$Cuarto decorado como oficina de detectives, con mapas, pizarras y lupas colgadas.$f9b$,
  magic_effects = $f9c$Las pistas en la pizarra parecen conectarse solas con hilos de luz sutil. La magia debe sentirse intrigante y completamente integrada dentro de una fotografía realista.$f9c$,
  lighting_color = $f9d$Luz tenue de oficina con un foco cálido sobre la pizarra de pistas. Atmósfera intrigante y divertida.$f9d$,
  poem_template = $f9e$Lupa en mano y cuaderno de pistas,
resuelven misterios, nunca se despistan.
La agencia secreta es su cuartel general,
donde cada caso es un reto especial.

Descubren huellas, analizan migas de pan,
resuelven enigmas como ningún otro clan.
El mejor equipo nunca deja un misterio sin resolver,
su ingenio y unión los hace sobresalir.$f9e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_9_Agencia_Secreta_de_Detectives.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f10a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite la emoción épica de viajar juntos por distintas épocas.

Ligeramente descentrados junto a una máquina del tiempo brillante, los hermanos, con expresión de asombro explorador, disfrazados de caballero medieval, científica futurista y pequeña pirata, observan juntos los engranajes brillantes.$f10a$,
  background_details = $f10b$Máquina del tiempo fantástica con luces, engranajes y pantallas, portales brillantes de distintas épocas.$f10b$,
  magic_effects = $f10c$Relojes flotantes giran suavemente mientras portales de luz muestran destellos de otras épocas. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$f10c$,
  lighting_color = $f10d$Luz azul y dorada dinámica de la máquina, contraste entre tonos futuristas e históricos. Atmósfera épica y fantástica.$f10d$,
  poem_template = $f10e$Construyen una máquina que gira y brilla,
y viajan juntos a cualquier orilla.
Visitan dinosaurios, castillos y el futuro lejano,
cada época es aventura de la mano.

Se disfrazan de piratas, caballeros y científicos locos,
y en cada parada viven momentos únicos y pocos.
El mejor equipo desafía el reloj y el calendario,
y juntos hacen del tiempo un viaje extraordinario.$f10e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_10_Máquina_del_Tiempo.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f11a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite espíritu aventurero y complicidad pirata entre los hermanos.

Ligeramente descentrados en su barco improvisado, los hermanos, con expresión decidida y pícara, con sombrero y parche de pirata, sostienen juntos un mapa del tesoro y una espada de juguete gritando "al abordaje".$f11a$,
  background_details = $f11b$Sala o jardín convertido en mar de aventuras con barco improvisado, cofres, banderas pirata.$f11b$,
  magic_effects = $f11c$Las olas de mantas parecen moverse suavemente como si fueran mar de verdad. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$f11c$,
  lighting_color = $f11d$Luz cálida y dorada de aventura pirata. Atmósfera colorida, alegre y llena de emoción.$f11d$,
  poem_template = $f11e$Barcos de cartón y parches en el ojo,
surcan mares de mantas y sueños flojos.
En la Isla Calavera, el tesoro es la risa,
y cada ola es una nueva prisa.

Con mapas secretos y gritos de "¡al abordaje!",
exploran cuevas, vencen cualquier oleaje.
El mejor equipo navega sin temor ni reparo,
y juntos descubren el oro más raro.$f11e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_11_Isla_Calavera.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f12a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite valentía compartida al cuidar y domar criaturas fantásticas.

Ligeramente descentrados junto a dragones amigables, los hermanos, con expresión valiente y encantada, montan y acarician juntos a dragones de escamas doradas y turquesas, abrazando con ternura a un dragón bebé.$f12a$,
  background_details = $f12b$Paisaje fantástico con montañas, dragones de colores y ríos de lava a la distancia.$f12b$,
  magic_effects = $f12c$Pequeñas chispas doradas se desprenden suavemente de las escamas de los dragones. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$f12c$,
  lighting_color = $f12d$Luz dorada y anaranjada con reflejos de lava distante. Atmósfera épica, mágica y cálida.$f12d$,
  poem_template = $f12e$En el valle escondido donde viven dragones,
los hermanos se vuelven héroes de canciones.
Montan criaturas de fuego y escamas brillantes,
y juntos doman miedos, se sienten gigantes.

Vuelan entre nubes, cruzan ríos de lava,
protegen a los dragones, nadie los acaba.
El mejor equipo cuida y aprende sin miedo,
y en cada aventura, su amistad es el credo.$f12e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_12_Valle_de_los_Dragones.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f13a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad secreta e ingenio compartido entre los hermanos.

Ligeramente descentrados en su torre de mantas y cojines, los hermanos, con expresión cómplice y curiosa, escriben y señalan juntos símbolos secretos en papeles y una pizarra pequeña.$f13a$,
  background_details = $f13b$Torre de juegos hecha con mantas, cojines y libros, pizarras y notas con dibujos misteriosos.$f13b$,
  magic_effects = $f13c$Los símbolos dibujados parecen brillar tenuemente como si guardaran un secreto real. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$f13c$,
  lighting_color = $f13d$Luz íntima y cálida de interior. Atmósfera íntima, divertida y creativa.$f13d$,
  poem_template = $f13e$Entre papeles y miradas cómplices,
crean lenguajes que sólo ellos entienden.
La torre de los códigos es su fortaleza,
donde los secretos se guardan con destreza.

Inventan símbolos, palabras y señales,
juegan a espías en tardes especiales.
El mejor equipo se comunica sin hablar,
y sus códigos nadie los puede descifrar.$f13e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_13_Torre_de_los_Códigos.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f14a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite energía competitiva sana y diversión entre los hermanos.

Ligeramente descentrados en poses dinámicas de artes marciales, los hermanos, con expresión de esfuerzo alegre y decidido, con cintas de colores, adoptan juntos posturas de patada y defensa, luciendo sus medallas con orgullo.$f14a$,
  background_details = $f14b$Dojo o templo oriental con cintas de colores, medallas y banderines colgando.$f14b$,
  magic_effects = $f14c$Un brillo sutil de energía rodea sus movimientos como si tuvieran un poder especial. La magia debe sentirse enérgica y completamente integrada dentro de una fotografía realista.$f14c$,
  lighting_color = $f14d$Luz enérgica y cálida con acentos rojos y dorados. Atmósfera enérgica y alegre.$f14d$,
  poem_template = $f14e$En el templo secreto de artes marciales,
compiten con saltos, patadas y rituales.
Aprenden juntos, se retan sin parar,
y en cada combate, logran mejorar.

Con cintas de colores y gritos de emoción,
su amistad es la mayor lección.
El mejor equipo nunca se rinde ni teme,
y cada torneo es un nuevo meme.$f14e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_14_Templo_Kung_Fu.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f15a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro compartido al transformar lo cotidiano en algo mágico.

Ligeramente descentrados haciendo trucos de magia, los hermanos, con expresión de asombro encantado, con sombrero y capa de mago, hacen aparecer juntos un pañuelo de colores mientras aplauden el truco.$f15a$,
  background_details = $f15b$Habitación mágica con mesas llenas de trucos, cartas, pañuelos y sombreros de mago.$f15b$,
  magic_effects = $f15c$Destellos brillantes acompañan cada truco, como pequeñas explosiones de luz dorada. La magia debe sentirse fantástica y completamente integrada dentro de una fotografía realista.$f15c$,
  lighting_color = $f15d$Luz fantástica llena de destellos y brillos. Atmósfera fantástica y colorida.$f15d$,
  poem_template = $f15e$Con sombreros de mago y varitas brillantes,
crean ilusiones, se sienten gigantes.
El taller de magia es su rincón especial,
donde los sueños se hacen realidad.

Hacen aparecer risas, desaparecen los enojos,
y cada truco es motivo de asombro y antojos.
El mejor equipo transforma lo cotidiano,
y convierte la vida en algo extraordinario.$f15e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_15_Taller_de_Magia_Creativa.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f16a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite descubrimiento y asombro compartido explorando un jardín encantado.

Ligeramente descentrados explorando entre flores gigantes, los hermanos, con expresión curiosa y maravillada, con lupa y mochila de aventureros, tocan juntos un hongo brillante y siguen a un pequeño animal fantástico.$f16a$,
  background_details = $f16b$Jardín hiperrealista y mágico con flores enormes, hongos brillantes, árboles con rostros simpáticos.$f16b$,
  magic_effects = $f16c$Luces de hadas y caminos de piedras luminosas guían el paso entre las flores. La magia debe sentirse fantástica y completamente integrada dentro de una fotografía realista.$f16c$,
  lighting_color = $f16d$Luz colorida y luminosa de jardín encantado. Atmósfera de descubrimiento, colorida y fantástica.$f16d$,
  poem_template = $f16e$Entre flores gigantes y árboles parlantes,
exploran caminos con pasos vibrantes.
Descubren insectos que bailan y piedras que brillan,
y cada rincón es una sorpresa que brilla.

Construyen cabañas, recogen tesoros secretos,
y en cada aventura suman mil anécdotas y retos.
El mejor equipo convierte el jardín en universo,
donde la naturaleza es magia y cada día es diverso.$f16e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_16_Jardín_de_las_Maravillas.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f17a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad traviesa y humor compartido.

Ligeramente descentrados planeando una broma, los hermanos, con expresión pícara y de risa contenida, sostienen juntos un globo de agua y una caja sorpresa, escondidos parcialmente detrás de un cojín de ruido.$f17a$,
  background_details = $f17b$Habitación llena de artilugios para bromas: globos de agua, cajas misteriosas, confeti.$f17b$,
  magic_effects = $f17c$El confeti flota suavemente en el aire como si la broma tuviera su propia chispa de energía. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$f17c$,
  lighting_color = $f17d$Luz alegre y brillante con acentos de confeti de colores. Atmósfera alegre, caótica y cómica.$f17d$,
  poem_template = $f17e$Entre globos de agua y cajas sorpresa,
preparan bromas con destreza traviesa.
El laboratorio de bromas es su centro de acción,
donde la risa es la mejor invención.

Inventan trucos, disfrazan los objetos,
y cada día sorprenden con nuevos proyectos.
El mejor equipo convierte cualquier día gris,
en una fiesta de risas y bromas sin fin.$f17e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_17_Laboratorio_de_Bromas.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f18a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite intriga y el ingenio compartido para resolver un enigma misterioso.

Ligeramente descentrados en un bosque de niebla, los hermanos, con expresión de concentración analítica, iluminan juntos con una linterna un símbolo extraño en un árbol mientras sostienen un mapa de pistas y señalan un cofre cerrado entre las raíces.$f18a$,
  background_details = $f18b$Bosque oscuro y mágico, con árboles altos, niebla y luces misteriosas, símbolos extraños tallados en los troncos.$f18b$,
  magic_effects = $f18c$Los símbolos en los árboles brillan sutilmente cuando se acercan, como si reconocieran a los hermanos. La magia debe sentirse intrigante y completamente integrada dentro de una fotografía realista.$f18c$,
  lighting_color = $f18d$Luz tenue y misteriosa filtrada entre la niebla, con destellos verdosos y azulados. Atmósfera intrigante y mágica.$f18d$,
  poem_template = $f18e$En el bosque encantado, los árboles susurran,
y cada sendero un enigma encierra y murmura.
Resuelven acertijos, buscan pistas secretas,
y juntos descifran las rutas más complejas.

El mejor equipo nunca teme al misterio,
su ingenio y unión son el mayor criterio.
Entre sombras y luces, hallan la salida,
y celebran los logros con alegría compartida.$f18e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_18_Bosque_de_los_Enigmas.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f19a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite energía deportiva y el espíritu de equipo en plena competencia sana.

Ligeramente descentrados en plena carrera, los hermanos, con expresión de esfuerzo alegre y decidido, saltan sobre una rampa, atraviesan un aro flotante y corren juntos por un túnel de colores.$f19a$,
  background_details = $f19b$Pista de obstáculos mágica con túneles, rampas, trampolines y aros flotantes.$f19b$,
  magic_effects = $f19c$Los aros y plataformas brillan levemente marcando el camino, dando una sensación de carrera encantada. La magia debe sentirse enérgica y completamente integrada dentro de una fotografía realista.$f19c$,
  lighting_color = $f19d$Luces brillantes de pista festiva. Atmósfera enérgica, festiva y llena de acción.$f19d$,
  poem_template = $f19e$Saltan, trepan, corren sin parar,
superan obstáculos con gran destreza y un toque singular.
La pista fantástica es su lugar de hazañas,
donde cada reto los une y acompaña.

Compiten sanamente, se animan a ganar,
y celebran juntos cada logro al terminar.
El mejor equipo es rápido, ágil y divertido,
y en cada carrera, el cariño es compartido.$f19e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_19_Pista_de_Obstáculos_Fantásticos.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $f20a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz onírica y la magia de soñar juntos.

Ligeramente descentrados flotando en camas voladoras entre nubes de colores pastel, los hermanos, con expresión soñadora y pacífica, persiguen juntos una luciérnaga mirando las estrellas mientras descansan entre las nubes.$f20a$,
  background_details = $f20b$Escena nocturna mágica con camas voladoras, lunas gigantes y estrellas sonrientes, nubes de colores pastel.$f20b$,
  magic_effects = $f20c$Luciérnagas doradas flotan suavemente iluminando el camino entre las nubes. La magia debe sentirse onírica y completamente integrada dentro de una fotografía realista.$f20c$,
  lighting_color = $f20d$Luz nocturna suave y plateada con acentos pastel. Atmósfera pacífica, onírica y reconfortante.$f20d$,
  poem_template = $f20e$Al cerrar los ojos, viajan sin fin,
a un mundo de sueños donde todo es jardín.
Vuelan en camas, conversan con estrellas,
y cada noche es una historia tan bella.

Persiguen lunas, bailan con luciérnagas,
y despiertan contentos, llenos de ganas.
El mejor equipo sueña, ríe y descansa,
y juntos descubren la magia de la esperanza.$f20e$,
  character_roles = '[{"key":"hermanos","count":3}]'::jsonb
WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas/PLANTILLA_20_País_de_las_Maravillas_Nocturnas.png' AND is_active = true;

COMMIT;
