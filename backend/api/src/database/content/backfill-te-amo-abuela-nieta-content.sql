-- "Te amo, abuela" — agrega la versión nieta→abuela (hoy solo existía
-- nieto→abuela). Mismo patrón que los libros anteriores: backfillea
-- gender_direction en las 20 filas nieto existentes (hoy NULL) e inserta las
-- 20 filas nuevas nieta→abuela. Contenido derivado mecánicamente del
-- contenido real de producción (nieto->nieta con artículo correcto,
-- príncipe->princesa, envuelto->envuelta, acurrucado->acurrucada,
-- recostado->recostada, asombrado->asombrada, sabio y bondadoso->sabia y
-- bondadosa, sí mismo adulto reflejado->sí misma adulta reflejada). Además
-- corrige un bug encontrado en 2 de las 20 filas nieto (id 1578 y 1595, que
-- usaban {NOMBRE_DESTINATARIO} en vez de {APODO_DESTINATARIO} como el resto
-- del libro) — solo en esta versión nueva, sin tocar las filas nieto ya
-- publicadas (a pedido explícito del usuario).
UPDATE personalized_templates SET
  name = CASE WHEN name LIKE '% De Nieto a Abuela' THEN name ELSE name || ' De Nieto a Abuela' END,
  gender_direction = 'HE_TO_SHE'
WHERE template_preview_key LIKE 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas/%' AND is_active = true;


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Abrazos Que Curan Todo De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_1_Abrazos_Que_Curan_Todo.png',
  'SHE_TO_SHE',
  $tb1a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo profundo y la certeza de que un abrazo de abuela cura cualquier tristeza.

Ligeramente descentrada en un sillón cómodo, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de amor profundo y protección, con suéter de lana en tono lavanda, abrazando tiernamente a su nieta. Envuelta en el abrazo, su nieta, ojos cerrados en paz absoluta, con la cabeza apoyada en el pecho de la abuela.$tb1a$,
  $tb1b$Sala acogedora con luz suave de ventana, sillón cómodo en tonos crema, manta tejida sobre el respaldo, plantas en macetas.$tb1b$,
  $tb1c$Partículas de luz flotante sutiles simbolizan la magia sanadora del abrazo. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$tb1c$,
  $tb1d$Iluminación dorada y suave tipo atardecer envolviendo la escena. Atmósfera cálida de hogar y sanación.$tb1d$,
  $tb1e$Cuando el mundo se siente muy grande,
y mis lágrimas quieren salir,
tus brazos son mi refugio,
donde todo vuelve a sonreír.

No hay tristeza que resista,
ni miedo que pueda quedar,
cuando {APODO_DESTINATARIO} me abraza fuerte,
todo vuelve a su lugar.

Tus abrazos tienen magia,
son medicina de amor,
y en ellos siempre encuentro,
paz, calma y calor.$tb1e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_1_Abrazos_Que_Curan_Todo.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Cuentos Antes de Dormir De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_2_Cuentos_Antes_de_Dormir.png',
  'SHE_TO_SHE',
  $tb2a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el hechizo nocturno de un cuento que lleva a soñar.

Ligeramente descentrada sentada al borde de la cama, la abuela, con la edad y apariencia reales de su foto de referencia, expresión narrativa y cálida, con bata suave en tono rosa empolvado, gafas de lectura, leyendo un libro de cuentos ilustrado. Acurrucada bajo las cobijas, su nieta, ojos brillantes de fascinación, mirando el libro encantado.$tb2a$,
  $tb2b$Habitación acogedora de noche con luz tenue de lámpara, estantes con libros, ventana con cielo nocturno estrellado.$tb2b$,
  $tb2c$Pequeñas siluetas etéreas de personajes de cuentos (un dragón, un castillo) emergen suavemente del libro. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$tb2c$,
  $tb2d$Iluminación cálida y envolvente de lámpara de noche. Atmósfera íntima con toque de fantasía.$tb2d$,
  $tb2e$Cada noche es una aventura,
cuando {APODO_DESTINATARIO} me viene a arropar,
con su voz suave y dulce,
me lleva a un mundo a soñar.

Princesas, dragones y hadas,
castillos de cristal y luz,
sus historias son mágicas,
y me llenan de quietud.

No importa cuántas veces,
el mismo cuento quiera escuchar,
siempre lo cuenta con amor,
como si fuera la primera vez.$tb2e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_2_Cuentos_Antes_de_Dormir.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Las Galletas Más Ricas del Mundo De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_3_Las_Galletas_Más_Ricas_del_Mundo.png',
  'SHE_TO_SHE',
  $tb3a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría culinaria y el ingrediente secreto que es el amor de abuela.

Ligeramente descentrada en la cocina, la abuela, con la edad y apariencia reales de su foto de referencia, expresión alegre y paciente, con delantal vintage floral, manos enharinadas sosteniendo un rodillo. De pie en un banquito junto a la mesa, su nieta, rostro iluminado de felicidad, con delantal presionando cortadores de galletas en la masa.$tb3a$,
  $tb3b$Cocina rústica acogedora con mesa de madera cubierta de masa, bandeja de galletas horneadas enfriándose, ventana con luz natural cálida.$tb3b$,
  $tb3c$Partículas doradas flotantes y pequeños corazones simbolizan el aroma de canela y vainilla en el aire. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$tb3c$,
  $tb3d$Iluminación natural y cálida de mañana. Atmósfera familiar, dulce y llena de calidez.$tb3d$,
  $tb3e$En tu cocina huele a cielo,
a canela, vainilla y amor,
hacer galletas contigo, {APODO_DESTINATARIO},
es mi actividad favorita, la mejor.

Me dejas probar la masa,
y me enseñas a amasar,
aunque la cocina quede llena de harina,
siempre me dejas ayudar.

Tus galletas son las más ricas,
no hay secreto ni receta igual,
porque el ingrediente especial,
es tu amor sin final.$tb3e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_3_Las_Galletas_Más_Ricas_del_Mundo.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Secretos Entre Nosotros De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_4_Secretos_Entre_Nosotros.png',
  'SHE_TO_SHE',
  $tb4a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad íntima y la confianza absoluta entre nieta y abuela.

Ligeramente descentrados muy cerca en un banco de jardín, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de ternura y complicidad, inclinada en actitud de escucha atenta. Junto a ella susurrando al oído, su nieta, expresión traviesa y feliz, con mano cerca de la boca en gesto cómplice.$tb4a$,
  $tb4b$Jardín tranquilo con flores silvestres, árbol grande con ramas protectoras, luz filtrada entre hojas.$tb4b$,
  $tb4c$Pequeños corazones flotantes simbolizan el vínculo entre ambos, con destellos dorados sutiles. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$tb4c$,
  $tb4d$Iluminación suave de tarde dorada filtrada entre las hojas. Atmósfera privada, mágica y de complicidad.$tb4d$,
  $tb4e$Hay cosas que solo tú sabes,
secretos que guardo en mi corazón,
porque sé que {APODO_DESTINATARIO} entiende,
sin juzgar, con puro amor.

Me escuchas con atención,
como si fuera lo más importante,
y tus palabras sabias,
me hacen sentir brillante.

Entre tú y yo hay un lazo,
especial, único, de verdad,
eres mi confidente, mi amiga,
mi abuela, mi complicidad.$tb4e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_4_Secretos_Entre_Nosotros.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Cuando Me Consientes De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_5_Cuando_Me_Consientes.png',
  'SHE_TO_SHE',
  $tb5a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad alegre y el placer especial de ser consentida por abuela.

Ligeramente descentrados en una heladería, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de complicidad y felicidad, con ropa casual chic, guiñando un ojo. Junto a ella sosteniendo un helado enorme, su nieta, ojos brillantes y sonrisa enorme, con ambas manos en el helado.$tb5a$,
  $tb5b$Escena urbana encantadora con tienda colorida de fondo, mesas con sombrillas, día soleado y feliz.$tb5b$,
  $tb5c$Confeti de colores y estrellitas brillantes flotan suavemente en el aire festivo. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$tb5c$,
  $tb5d$Iluminación brillante y alegre de día soleado. Atmósfera vibrante y llena de vida.$tb5d$,
  $tb5e$Mamá dice que no, pero tú dices que sí,
un dulce más, un ratito más de jugar,
{APODO_DESTINATARIO}, contigo todo es especial,
porque me dejas ser y me sabes mimar.

Me compras ese juguete,
me preparas mi comida favorita,
y cuando estoy contigo,
soy tu princesa querido.

Gracias por consentirme,
por hacerme sentir tan especial,
eres mi cómplice favorita,
mi abuela sin igual.$tb5e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_5_Cuando_Me_Consientes.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Tus Manos Mágicas De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_6_Tus_Manos_Mágicas.png',
  'SHE_TO_SHE',
  $tb6a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura pura en el gesto simple de dos manos entrelazadas.

Ligeramente descentradas en primer plano, las manos de la abuela, con la edad y apariencia reales de su foto de referencia, anillo sencillo, propias de una mano de abuela, sosteniendo delicadamente la mano de su nieta, con la edad y apariencia reales de su foto de referencia, descansando con confianza.$tb6a$,
  $tb6b$Fondo suavemente desenfocado con elementos de tejido (agujas, ovillo de lana en tonos pastel) o jardín con flores difuminadas.$tb6b$,
  $tb6c$Hilos de luz dorada conectan sutilmente ambas manos simbolizando el vínculo. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$tb6c$,
  $tb6d$Luz natural suave y cálida tipo ventana de tarde. Atmósfera tierna y reconfortante.$tb6d$,
  $tb6e$Tus manos tejen historias,
con agujas e hilos de color,
crean bufandas y suéteres,
hechos con paciencia y amor.

Tus manos curan raspones,
con caricias suaves y calor,
y cuando me acaricias el cabello,
desaparece cualquier dolor.

{APODO_DESTINATARIO}, tus manos son mágicas,
llenas de ternura y bondad,
en ellas encuentro consuelo,
y una paz sin igual.$tb6e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_6_Tus_Manos_Mágicas.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Durmiendo en Tu Regazo De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_7_Durmiendo_en_Tu_Regazo.png',
  'SHE_TO_SHE',
  $tb7a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz absoluta y el refugio seguro del regazo de abuela.

Ligeramente descentrada sentada en un sillón, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de amor profundo y paz, acariciando suavemente el cabello de su nieta. Recostada en su regazo, su nieta, expresión de paz absoluta con los ojos abiertos mirando hacia arriba con ternura, acurrucada cómodamente.$tb7a$,
  $tb7b$Sala acogedora con luz suave de tarde, manta tejida sobre el brazo del sillón, taza de té en mesa lateral.$tb7b$,
  $tb7c$Un aura cálida envuelve a ambos con partículas de luz dorada muy suaves. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$tb7c$,
  $tb7d$Luz dorada suave de atardecer, muy cálida y envolvente. Atmósfera de tranquilidad absoluta.$tb7d$,
  $tb7e$No hay almohada más cómoda,
ni lugar más seguro para estar,
que dormido en tu regazo, {APODO_DESTINATARIO},
donde puedo soñar y descansar.

Tu mano acaricia mi frente,
tu voz tararea una canción,
y en ese momento perfecto,
siento tu inmenso amor.

Aunque crezca y sea grande,
siempre recordaré este lugar,
tu regazo, mi refugio,
donde siempre quiero estar.$tb7e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_7_Durmiendo_en_Tu_Regazo.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Me Enseñaste A De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_8_Me_Enseñaste_A.png',
  'SHE_TO_SHE',
  $tb8a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite aprendizaje amoroso al descubrir la magia en las cosas simples.

Ligeramente descentrados en un jardín, la abuela, con la edad y apariencia reales de su foto de referencia, expresión sabia y amorosa, señalando una mariposa con postura de maestra paciente. Junto a ella mirando en la misma dirección, su nieta, expresión de asombro y curiosidad, con ojos brillantes.$tb8a$,
  $tb8b$Jardín exuberante con flores coloridas, mariposas volando, árboles frondosos, cielo azul con nubes suaves.$tb8b$,
  $tb8c$Siluetas brillantes sutiles de pájaros y estrellas flotan en el aire como símbolos de aprendizaje. La magia debe sentirse educativa y completamente integrada dentro de una fotografía realista.$tb8c$,
  $tb8d$Luz natural brillante de día, cálida y clara. Atmósfera educativa y llena de asombro.$tb8d$,
  $tb8e$Me enseñaste a ver las estrellas,
a escuchar el canto de los pájaros,
a apreciar las cosas simples,
y a encontrar magia en lo ordinario.

Me enseñaste que el amor,
no necesita de grandes gestos,
que está en los detalles pequeños,
en los abrazos y en los momentos.

Gracias, {APODO_DESTINATARIO}, por tus lecciones,
por enseñarme a vivir con el corazón,
todo lo que soy hoy,
lo aprendí de tu amor.$tb8e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_8_Me_Enseñaste_A.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Tus Consejos de Oro De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_9_Tus_Consejos_de_Oro.png',
  'SHE_TO_SHE',
  $tb9a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sabiduría transmitida con amor y reverencia.

Ligeramente descentrados sentados en un porche, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de sabiduría y amor, con mano posada suavemente sobre la de su nieta, mirándolo con profundidad. Escuchando con atención absoluta, su nieta, expresión seria y receptiva.$tb9a$,
  $tb9b$Porche acogedor o banco en jardín tranquilo, luz de atardecer dorado, plantas en macetas.$tb9b$,
  $tb9c$Palabras doradas flotantes sutiles ("amor", "valentía") y pequeñas llaves doradas simbolizan consejos valiosos. La magia debe sentirse contemplativa y completamente integrada dentro de una fotografía realista.$tb9c$,
  $tb9d$Luz dorada de atardecer, cálida y envolvente. Atmósfera de intimidad y confianza.$tb9d$,
  $tb9e$Cuando no sé qué hacer,
cuando el camino se ve difícil,
tus palabras me guían, {APODO_DESTINATARIO},
como un faro en la noche.

"Sé amable", "Sé valiente",
"Nunca dejes de soñar",
tus consejos son tesoros,
que siempre voy a guardar.

Tu sabiduría es un regalo,
fruto de años y experiencia,
y yo escucho con atención,
cada palabra con reverencia.$tb9e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_9_Tus_Consejos_de_Oro.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Cuando Lloro Tú Entiendes De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_10_Cuando_Lloro_Tú_Entiendes.png',
  'SHE_TO_SHE',
  $tb10a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo silencioso y la comprensión profunda sin necesidad de palabras.

Ligeramente descentrada arrodillada a la altura de su nieta, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de comprensión profunda, con una mano secando suavemente una lágrima de su mejilla con el pulgar, sin cubrir su rostro. Frente a ella, su nieta, expresión vulnerable encontrando consuelo, con manos aferradas suavemente a la ropa de la abuela.$tb10a$,
  $tb10b$Interior cálido y privado con luz suave envolvente, elementos difuminados para mantener intimidad.$tb10b$,
  $tb10c$Partículas de luz dorada suave envuelven a ambos como un abrazo invisible. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$tb10c$,
  $tb10d$Luz suave y cálida, íntima y reconfortante. Atmósfera de consuelo profundo y comprensión.$tb10d$,
  $tb10e$Cuando las lágrimas caen,
y no encuentro las palabras,
tú me abrazas en silencio,
y mi corazón se calma.

No me preguntas qué pasó,
no necesitas explicación,
simplemente estás ahí, {APODO_DESTINATARIO},
con tu infinita comprensión.

Tus abrazos secan mis lágrimas,
tu amor cura mi dolor,
y aunque el mundo sea difícil,
contigo todo es mejor.$tb10e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_10_Cuando_Lloro_Tú_Entiendes.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Fotos del Pasado De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_11_Fotos_del_Pasado.png',
  'SHE_TO_SHE',
  $tb11a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite nostalgia compartida al descubrir juntos la historia familiar.

Ligeramente descentrados rodeados de álbumes de fotos antiguos, la abuela, con la edad y apariencia reales de su foto de referencia, expresión nostálgica pero feliz, sosteniendo una foto antigua, señalándola con el dedo. Muy cerca mirando la foto con fascinación, su nieta, expresión de asombro y curiosidad.$tb11a$,
  $tb11b$Sala familiar acogedora con álbumes de fotos vintage apilados, cajas de recuerdos, marcos de fotos antiguas.$tb11b$,
  $tb11c$Algunas fotos antiguas flotan sutilmente en el aire con brillo dorado, conectando el pasado con el presente. La magia debe sentirse nostálgica y completamente integrada dentro de una fotografía realista.$tb11c$,
  $tb11d$Luz natural cálida de ventana, creando atmósfera nostálgica. Atmósfera íntima y llena de historia.$tb11d$,
  $tb11e$Me encanta ver tus fotos antiguas,
cuando eras joven y hermosa,
me cuentas historias de otros tiempos,
y cada una es maravillosa.

"Esta era yo a tu edad",
me dices con una sonrisa,
y veo en tus ojos jóvenes,
la misma luz que hoy me hechiza.

Gracias por compartir tu historia, {APODO_DESTINATARIO},
por dejarme conocer tu pasado,
cada foto es un tesoro,
de amor que has regalado.$tb11e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_11_Fotos_del_Pasado.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Eres Mi Segunda Mamá De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_12_Eres_Mi_Segunda_Mamá.png',
  'SHE_TO_SHE',
  $tb12a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite amor maternal profundo en un abrazo frontal cercano.

Ligeramente descentrados frente a frente, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de amor maternal profundo, acariciando suavemente la mejilla de su nieta sin cubrir su rostro, con ternura infinita. Su nieta, expresión de amor puro y gratitud, con manos tocando los brazos de la abuela.$tb12a$,
  $tb12b$Interior cálido con luz dorada envolvente, o jardín con flores difuminadas de fondo.$tb12b$,
  $tb12c$Un aura de luz dorada brillante rodea a ambos con hilos de luz conectando sus corazones. La magia debe sentirse profundamente emotiva y completamente integrada dentro de una fotografía realista.$tb12c$,
  $tb12d$Luz cálida y envolvente tipo atardecer dorado. Atmósfera emotiva y de conexión maternal.$tb12d$,
  $tb12e$Mamá es mamá, eso es verdad,
pero tú, {APODO_DESTINATARIO}, eres especial,
eres mi segunda mamá,
mi confidente, mi hogar.

Cuando mamá está ocupada,
tú siempre estás para mí,
con tus brazos abiertos,
y tu amor sin fin.

No sé qué haría sin ti,
eres parte de mi corazón,
mi segunda mamá querida,
mi eterna bendición.$tb12e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_12_Eres_Mi_Segunda_Mamá.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'El Jardín Encantado de la Abuela De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_13_El_Jardín_Encantado_de_la_Abuela.png',
  'SHE_TO_SHE',
  $tb13a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite magia natural y el tiempo detenido en un jardín compartido.

Ligeramente descentrados arrodillados junto a un parterre de flores, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de alegría y enseñanza, con sombrero de jardín elegante, señalando una mariposa. Junto a ella con botas de lluvia coloridas, su nieta, expresión de asombro, sosteniendo una regadera pequeña.$tb13a$,
  $tb13b$Jardín exuberante tipo cuento de hadas con flores de todos colores, mariposas monarca, arco de jardín cubierto de rosas.$tb13b$,
  $tb13c$Las flores tienen un brillo sutil y pequeñas hadas se esconden entre ellas con destellos de luz dorada. La magia debe sentirse encantadora y completamente integrada dentro de una fotografía realista.$tb13c$,
  $tb13d$Luz natural mágica de mañana, cálida y brillante. Atmósfera de cuento de hadas.$tb13d$,
  $tb13e$Tu jardín es un lugar mágico,
donde las flores bailan al viento,
y las mariposas nos visitan,
en cada dulce momento.

Me enseñas los nombres de las plantas,
y juntos regamos con amor,
en tu jardín encantado, {APODO_DESTINATARIO},
todo tiene color.

Aquí el tiempo se detiene,
y solo existimos tú y yo,
en nuestro jardín secreto,
donde crece nuestro amor.$tb13e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_13_El_Jardín_Encantado_de_la_Abuela.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Viajeros del Tiempo De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_14_Viajeros_del_Tiempo.png',
  'SHE_TO_SHE',
  $tb14a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite un viaje fantástico entre generaciones a través de los recuerdos de la abuela.

Ligeramente descentrada, la abuela, con la edad y apariencia reales de su foto de referencia, expresión narrativa y cálida, en su versión actual, con una versión joven y etérea de sí misma (años 50-60, cabello oscuro) apareciendo como una proyección mágica detrás de ella. Junto a la abuela actual, su nieta, expresión de fascinación total, mirando asombrada la versión joven de su abuela.$tb14a$,
  $tb14b$Ambiente surrealista con objetos vintage (radio antigua, cartas) flotando junto a elementos modernos, portal de luz dorada conectando épocas.$tb14b$,
  $tb14c$Espirales de tiempo doradas y partículas brillantes conectan las dos versiones de la abuela. La magia debe sentirse conceptual y completamente integrada dentro de una fotografía realista.$tb14c$,
  $tb14d$Luz mágica y cinematográfica, mezcla de tonos sepia y dorados cálidos. Atmósfera de distorsión temporal suave.$tb14d$,
  $tb14e$Cuando me cuentas de tu infancia,
de cómo era el mundo antes,
viajamos juntos en el tiempo,
a lugares fascinantes.

Me hablas de juegos sin pantallas,
de cartas escritas a mano,
y yo imagino ese mundo,
de la mano de mi {APODO_DESTINATARIO} amada.

Eres mi máquina del tiempo,
mi puente entre ayer y hoy,
y en cada historia que compartes,
descubro quién soy.$tb14e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_14_Viajeros_del_Tiempo.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Princesa de la Abuela De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_15_Princesa_de_la_Abuela.png',
  'SHE_TO_SHE',
  $tb15a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad tierna: en el reino de amor de la abuela, su nieta es el protagonista.

Ligeramente descentrada vestida como reina benevolente, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de orgullo maternal, con vestido largo en tonos lavanda, corona delicada de flores, sosteniendo la mano de su nieta. Vestido como princesa, su nieta, expresión de felicidad absoluta, con traje elegante y corona a juego.$tb15a$,
  $tb15b$Escenario de cuento de hadas con trono decorado con flores, cortinas de terciopelo púrpura y dorado, alfombra roja.$tb15b$,
  $tb15c$Destellos de luz dorada flotan alrededor con pequeñas estrellas brillantes. La magia debe sentirse majestuosa y completamente integrada dentro de una fotografía realista.$tb15c$,
  $tb15d$Luz dorada y majestuosa tipo atardecer de cuento de hadas. Atmósfera de castillo encantado pero acogedor.$tb15d$,
  $tb15e$Para ti soy realeza,
tu princesa de verdad,
me tratas como si fuera especial,
con amor y dignidad.

Me haces sentir importante,
valioso y sin igual,
porque en tu reino de amor, {APODO_DESTINATARIO},
yo soy lo principal.

Gracias por hacerme sentir,
como la persona más especial,
en tu corazón soy realeza,
y eso es algo celestial.$tb15e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_15_Princesa_de_la_Abuela.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Aventureros en la Biblioteca De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_16_Aventureros_en_la_Biblioteca.png',
  'SHE_TO_SHE',
  $tb16a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el vuelo de la imaginación al leer juntos.

Ligeramente descentrados en un sillón grande rodeados de libros, la abuela, con la edad y apariencia reales de su foto de referencia, expresión cálida y narrativa, con gafas de lectura, leyendo un libro grande ilustrado. Acurrucada junto a ella, su nieta, ojos brillantes de fascinación, mirando el libro.$tb16a$,
  $tb16b$Biblioteca hogareña con estantes de madera llenos de libros, escalera de biblioteca, lámpara de lectura cálida.$tb16b$,
  $tb16c$Personajes de cuentos (dragones, princesas) emergen sutilmente de las páginas como hologramas etéreos y brillantes. La magia debe sentirse literaria y completamente integrada dentro de una fotografía realista.$tb16c$,
  $tb16d$Luz cálida y acogedora de lámpara y ventana. Atmósfera de fantasía literaria y calidez.$tb16d$,
  $tb16e$En la biblioteca contigo,
cada libro es una aventura nueva,
exploramos mundos lejanos,
sin salir de tu biblioteca.

Me lees sobre piratas y dragones,
sobre tierras lejanas y mar,
y en cada página que pasas,
me enseñas a soñar.

Gracias, {APODO_DESTINATARIO}, por abrir mi mente,
por mostrarme que leer es volar,
contigo cada libro es mágico,
y juntos podemos viajar.$tb16e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_16_Aventureros_en_la_Biblioteca.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Superheroína Abuela De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_17_Superheroína_Abuela.png',
  'SHE_TO_SHE',
  $tb17a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite poder heroico con ternura: el amor de la abuela es su verdadero superpoder.

Ligeramente descentrada en postura heroica, la abuela, con la edad y apariencia reales de su foto de referencia, expresión poderosa pero cálida, vestida como superheroína con capa brillante en dorado y lavanda, símbolo de corazón en el pecho. Junto a ella como compañero superhéroe, su nieta, expresión de admiración y orgullo, con capa a juego, rostro completamente visible.$tb17a$,
  $tb17b$Escenario urbano estilizado tipo cómic con edificios en perspectiva, cielo dramático con nubes y rayos de luz.$tb17b$,
  $tb17c$Corazones brillantes flotan como símbolo del superpoder de la abuela, con un aura dorada rodeándola. La magia debe sentirse heroica y completamente integrada dentro de una fotografía realista.$tb17c$,
  $tb17d$Iluminación dramática y cinematográfica con luz heroica. Atmósfera épica pero tierna y familiar.$tb17d$,
  $tb17e$No necesitas capa ni poderes,
para ser mi superheroína,
tu fuerza está en tu amor,
y en tu sonrisa cristalina.

Salvas mis días tristes,
combates mis miedos con valor,
y con tus abrazos mágicos,
derrotas cualquier dolor.

{APODO_DESTINATARIO}, eres mi superheroína,
la más poderosa de verdad,
porque tu superpoder es el amor,
y eso nunca cambiará.$tb17e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_17_Superheroína_Abuela.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Tu Legado de Amor De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_18_Tu_Legado_de_Amor.png',
  'SHE_TO_SHE',
  $tb18a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite continuidad y la promesa de un legado de amor que perdurará para siempre.

Ligeramente descentrados caminando de la mano por un sendero, vistos en ángulo de tres cuartos con los rostros visibles, la abuela, con la edad y apariencia reales de su foto de referencia, expresión serena, sosteniendo con ternura la mano de su nieta. Su nieta, expresión de confianza, caminando junto a ella mirando hacia adelante.$tb18a$,
  $tb18b$Camino hermoso que se extiende hacia el horizonte rodeado de naturaleza exuberante, cielo con colores de atardecer espectacular.$tb18b$,
  $tb18c$Huellas brillantes detrás de ellas se transforman sutilmente en flores, y mariposas las siguen. La magia debe sentirse esperanzadora y completamente integrada dentro de una fotografía realista.$tb18c$,
  $tb18d$Luz dorada de atardecer, cálida y esperanzadora. Atmósfera de paz y continuidad.$tb18d$,
  $tb18e$Cuando sea grande y tenga hijos,
les hablaré de ti con amor,
les contaré de mi {APODO_DESTINATARIO},
y de tu inmenso corazón.

Les enseñaré lo que me enseñaste,
a amar, a ser bondadoso y fuerte,
porque tu legado vive en mí,
y vivirá para siempre.

Gracias por todo lo que me diste,
por ser mi guía y mi luz,
tu amor es eterno, {APODO_DESTINATARIO},
y yo lo llevaré con gratitud.$tb18e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_18_Tu_Legado_de_Amor.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Cuando Crezca Seré Como Tú De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_19_Cuando_Crezca_Seré_Como_Tú.png',
  'SHE_TO_SHE',
  $tb19a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite aspiración amorosa: su nieta soñando con ser tan sabia y bondadosa como su abuela.

Ligeramente descentrada con elegancia digna, la abuela, con la edad y apariencia reales de su foto de referencia, expresión serena y orgullosa, vistiendo ropa elegante. Junto a ella, su nieta, expresión de admiración, mirando a su abuela, con una versión etérea de sí misma adulta reflejada sutilmente imitando su postura.$tb19a$,
  $tb19b$Espacio con elementos que conectan presente y futuro, portal de luz suave uniendo ambas escenas.$tb19b$,
  $tb19c$Líneas de luz conectan a la abuela con su nieta y su versión futura, con símbolos de cualidades (corazón, libro) flotando entre ellas. La magia debe sentirse aspiracional y completamente integrada dentro de una fotografía realista.$tb19c$,
  $tb19d$Luz cálida y esperanzadora que une ambas figuras. Atmósfera de aspiración y legado.$tb19d$,
  $tb19e$Cuando crezca quiero ser,
tan amable y sabio como tú,
quiero tener tu paciencia,
y tu corazón de luz.

Quiero cocinar como tú,
abrazar como tú lo haces,
y dar amor incondicional,
como tú siempre me das.

Eres mi ejemplo, {APODO_DESTINATARIO},
mi inspiración de verdad,
y cuando crezca, seré como tú,
lleno de amor y bondad.$tb19e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_19_Cuando_Crezca_Seré_Como_Tú.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Te amo, abuela'),
  'Gracias Por Ser Mi Abuela De Nieta a Abuela',
  'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_20_Gracias_Por_Ser_Mi_Abuela.png',
  'SHE_TO_SHE',
  $tb20a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite gratitud absoluta y amor puro en el cierre emotivo del libro.

Ligeramente descentrados en un abrazo frontal muy estrecho, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de amor incondicional y felicidad profunda, con ojos cerrados, frente casi tocando la de su nieta. Su nieta, expresión de amor puro y gratitud, envuelta en el abrazo con el rostro visible hacia la cámara.$tb20a$,
  $tb20b$Fondo desenfocado con luz dorada envolvente que crea un halo alrededor de ambos, eliminando distracciones.$tb20b$,
  $tb20c$Un aura de luz dorada brillante e intensa rodea a ambos, con corazones grandes y pequeños flotando abundantemente. La magia debe sentirse celestial y completamente integrada dentro de una fotografía realista.$tb20c$,
  $tb20d$Luz dorada intensa y envolvente, casi celestial. Atmósfera de máxima intensidad emotiva y gratitud.$tb20d$,
  $tb20e$Gracias por cada abrazo,
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
Te amo, {APODO_DESTINATARIO}, gracias por existir.$tb20e$,
  '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas_Nieta/PLANTILLA_20_Gracias_Por_Ser_Mi_Abuela.png');
