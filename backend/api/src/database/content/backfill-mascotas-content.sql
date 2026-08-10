-- backfill-mascotas-content.sql — generado por scratchpad/gen_mascotas_backfill.py
-- Libros díada de Mascotas (mascota + 1 dueño/a). Matchea por
-- template_preview_key. Idempotente (UPDATE incondicional).

BEGIN;

UPDATE personalized_templates SET
  scene_visual = $mMiam1a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena captura con humor el contraste entre la indiferencia felina y el entusiasmo repentino que solo la comida despierta.

Ligeramente descentrado, {NOMBRE_DESTINATARIO} está sentado de espaldas, ignorando por completo a su dueño/a que lo llama con la mano extendida y expresión de "¿en serio?". En una segunda escena integrada dentro del mismo encuadre, el mismo gato corre a toda velocidad hacia su dueño/a, que sostiene un plato de comida, con los ojos enormes y emocionados.$mMiam1a$,
  background_details = $mMiam1b$Un ambiente hogareño cálido, con detalles domésticos desenfocados de fondo.$mMiam1b$,
  magic_effects = $mMiam1c$Un contraste visual sutil entre la indiferencia y la emoción rodea a {NOMBRE_DESTINATARIO}, con pequeños destellos cómicos en el momento de la carrera. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$mMiam1c$,
  lighting_color = $mMiam1d$Colores cálidos con contraste entre tonos apagados de indiferencia y dorados brillantes de emoción.$mMiam1d$,
  poem_template = $mMiam1e$Te llamo mil veces sin parar, y {NOMBRE_DESTINATARIO} ni voltea, su indiferencia es ejemplar, como si nada lo desea.
Pero cuando abro su comida, él aparece en un segundo, su actitud queda perdida, y corre como loco por el mundo.
Mi gato selectivo y real, que solo escucha lo que quiere, su amor es condicional, pero así lo prefiere.$mMiam1e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_1_Porque_Ignora_Mis_Llamados_Hasta_que_Abro_la_Comida.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam2a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra con humor la travesura calculada de una mascota que disfruta provocar una reacción.

{NOMBRE_DESTINATARIO}, una gata traviesa, está sobre una mesa, con la pata extendida empujando deliberadamente una taza hacia el borde, mirando directamente a su dueño/a con expresión desafiante. Su dueño/a observa con expresión de horror anticipando la caída (se distingue parcialmente).$mMiam2a$,
  background_details = $mMiam2b$Un comedor o cocina hogareña, desenfocado de fondo.$mMiam2b$,
  magic_effects = $mMiam2c$La taza a punto de caer tiene un sutil efecto de movimiento congelado en el aire. La magia debe sentirse traviesa y completamente integrada dentro de una fotografía realista.$mMiam2c$,
  lighting_color = $mMiam2d$Colores vibrantes y cálidos, luz de interior cotidiana.$mMiam2d$,
  poem_template = $mMiam2e${NOMBRE_DESTINATARIO} sube a la mesa, con mirada de traviesa, empuja mi taza con destreza, y espera mi proceso.
Ella sabe que me va a enojar, pero le divierte mi reacción, su patita va a empujar, y caerá sin compasión.
Mi pequeña provocadora, que disfruta el caos crear, aunque sea destructora, la sigo amando sin cesar.$mMiam2e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_2_Porque_Tira_Cosas_de_la_Mesa_Solo_para_Verme_Reaccionar.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam3a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite la energía caótica y adorable de las carreras nocturnas felinas sin razón aparente.

{NOMBRE_DESTINATARIO} corre a toda velocidad por un pasillo oscuro, ojos enormes y salvajes, orejas hacia atrás por la velocidad, patas en pleno sprint. Al fondo, su dueño/a se asoma en pijama desde la habitación con expresión de "¿qué está pasando?", un reloj marca las 3:00 AM.$mMiam3a$,
  background_details = $mMiam3b$Un pasillo de casa en penumbra nocturna.$mMiam3b$,
  magic_effects = $mMiam3c$Líneas dinámicas y desenfoque de movimiento acompañan la carrera de {NOMBRE_DESTINATARIO}, con destellos de energía felina. La magia debe sentirse enérgica y completamente integrada dentro de una fotografía realista.$mMiam3c$,
  lighting_color = $mMiam3d$Azules oscuros nocturnos con destellos de energía dorada.$mMiam3d$,
  poem_template = $mMiam3e$Son las tres de la madrugada, y {NOMBRE_DESTINATARIO} despierta, corre por toda la casa, como si hubiera puerta abierta.
Él salta, brinca y galopa, sin razón aparente, su energía no se agota, es loco completamente.
Yo solo quiero dormir, pero él tiene otros planes, su locura me hace reír, aunque sean horas tempranas.
Mi gato nocturno y salvaje, que convierte la noche en show, su energía es un mensaje, de que él manda aquí, yo no.$mMiam3e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_3_Porque_Corre_Como_Loco_a_las_3_AM.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam4a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite humor tierno, la manía felina de convertirse en el obstáculo más adorable del trabajo diario.

{NOMBRE_DESTINATARIO} está sentada cómodamente sobre un teclado de computadora, mirando directamente a la cámara con expresión de "¿problema?", patas sobre las teclas, cola envuelta. Su dueño/a intenta trabajar con las manos levantadas en frustración cómica (se distingue parcialmente), la pantalla muestra texto sin sentido.$mMiam4a$,
  background_details = $mMiam4b$Un escritorio de oficina en casa, cálido y desordenado.$mMiam4b$,
  magic_effects = $mMiam4c$Pequeños destellos cómicos alrededor del teclado sugieren el caos tecnológico. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$mMiam4c$,
  lighting_color = $mMiam4d$Colores cálidos, iluminación de escritorio.$mMiam4d$,
  poem_template = $mMiam4e$Intento trabajar tranquilo, y {NOMBRE_DESTINATARIO} llega veloz, se sienta en mi teclado, y bloquea mi labor atroz.
Ella sabe que necesito espacio, pero no le importa nada, prefiere ser un estorbo, y quedarse ahí sentada.
Su cola tapa la pantalla, sus patas escriben sin sentido, pero su carita me desarma, y acepto que sea atrevida.
Mi asistente peludita, que interrumpe sin cesar, aunque sea una saboteadorcita, la dejo ahí estar.$mMiam4e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_4_Porque_Se_Sienta_Justo_en_Mi_Teclado.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam5a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra con ternura la obsesión felina universal por comprimirse en espacios imposiblemente pequeños.

{NOMBRE_DESTINATARIO} está metido en una caja ridículamente pequeña, cuerpo comprimido pero con expresión de total satisfacción, patas y cola sobresaliendo de manera cómica. Alrededor, varias cajas más grandes y vacías permanecen ignoradas; su dueño/a observa con expresión de "no tiene sentido" (se distingue parcialmente).$mMiam5a$,
  background_details = $mMiam5b$Un ambiente hogareño con luz natural, varias cajas de cartón alrededor.$mMiam5b$,
  magic_effects = $mMiam5c$Un sutil brillo cálido rodea la caja elegida por {NOMBRE_DESTINATARIO}, resaltando su comodidad absoluta. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$mMiam5c$,
  lighting_color = $mMiam5d$Colores cálidos, iluminación natural de interior.$mMiam5d$,
  poem_template = $mMiam5e$Hay cajas grandes y espaciosas, pero {NOMBRE_DESTINATARIO} no las ve, prefiere las más pequeñosas, donde apenas cabe él también.
Él se comprime y se acomoda, en espacios imposibles, su lógica es toda, pero sus razones son terribles.
No importa si es incómodo, o si no tiene sentido, su amor por cajas es cómodo, y lo hace feliz y querido.
Mi gato contorsionista, que desafía la física real, su obsesión es simplista, pero lo hace especial.$mMiam5e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_5_Porque_Cabe_en_Cualquier_Caja_No_Importa_el_Tamaño.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam6a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra con humor la actitud majestuosa de una mascota que gobierna el hogar con total naturalidad.

{NOMBRE_DESTINATARIO} está sentada majestuosamente en el sofá principal de la sala, con postura de reina y mirada altiva. Su dueño/a está sentado en el suelo o en una silla incómoda, mirándola con resignación (se distingue parcialmente).$mMiam6a$,
  background_details = $mMiam6b$Una sala elegante, con el sofá como centro de la composición.$mMiam6b$,
  magic_effects = $mMiam6c$Una luz que destaca a {NOMBRE_DESTINATARIO} como figura central le da un aire de realeza felina. La magia debe sentirse elegante y completamente integrada dentro de una fotografía realista.$mMiam6c$,
  lighting_color = $mMiam6d$Colores elegantes, luz cálida que resalta a la protagonista.$mMiam6d$,
  poem_template = $mMiam6e${NOMBRE_DESTINATARIO} camina con altivez, por cada rincón del hogar, actúa con tal realeza, que yo soy su súbdito ejemplar.
Ella elige el mejor lugar, y yo me tengo que mover, su trono es el sofá, y yo debo obedecer.
No pide permiso jamás, porque esta es su propiedad, yo solo soy alguien más, en su reino de verdad.
Mi pequeña emperadora, que gobierna con amor, aunque sea dictadora, la amo con fervor.$mMiam6e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_6_Porque_Actúa_Como_Si_Fuera_el_Dueño_de_la_Casa.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam7a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite calidez pura, el ronroneo como bienvenida más sincera que existe.

{NOMBRE_DESTINATARIO} se acerca a su dueño/a con ojos entrecerrados de felicidad, boca ligeramente abierta en expresión de ronroneo, cola levantada. Su dueño/a sonríe con ternura, extendiendo la mano para acariciarlo (se distingue parcialmente).$mMiam7a$,
  background_details = $mMiam7b$Un recibidor cálido y acogedor.$mMiam7b$,
  magic_effects = $mMiam7c$Ondas visuales doradas, representando el ronroneo, emanan suavemente de {NOMBRE_DESTINATARIO}. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$mMiam7c$,
  lighting_color = $mMiam7d$Dorados y naranjas cálidos, luz suave de bienvenida.$mMiam7d$,
  poem_template = $mMiam7e$Cuando llego a casa al fin, {NOMBRE_DESTINATARIO} me recibe así, con su ronroneo sin fin, que me hace tan feliz aquí.
Su sonido es una canción, que calma mi corazón, su dulce vibración, es mi mejor bendición.
No necesita palabras, su ronroneo lo dice todo, su amor me desarma, y me hace sentir de otro modo.
Mi gato ronroneador, que me llena de emoción, su música interior, es mi mejor canción.$mMiam7e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_7_Porque_Ronronea_Cuando_Me_Ve.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam8a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura absoluta, la paz de una siesta compartida sin importar la incomodidad.

{NOMBRE_DESTINATARIO} está acurrucada cómodamente en el regazo de su dueño/a, completamente relajada, ojos cerrados en paz absoluta. Su dueño/a permanece inmóvil con expresión de ternura y resignación feliz, acariciándola suavemente (se distingue parcialmente).$mMiam8a$,
  background_details = $mMiam8b$Un ambiente hogareño con una manta suave, luz tenue y acogedora.$mMiam8b$,
  magic_effects = $mMiam8c$Un resplandor cálido y sutil envuelve a {NOMBRE_DESTINATARIO} y su regazo elegido. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$mMiam8c$,
  lighting_color = $mMiam8d$Beiges, cremas y dorados suaves.$mMiam8d$,
  poem_template = $mMiam8e${NOMBRE_DESTINATARIO} busca mi regazo, para dormir tranquila ahí, y aunque pierda todo espacio, no la moveré de mí.
Su peso es reconfortante, su calor me hace bien, su presencia es constante, mi pequeña edén.
Mis piernas se duermen ya, pero no me importa nada, su paz me llena más, que cualquier cosa deseada.
Mi gata acurrucada, que elige mi regazo, su confianza me ha regalado, el más hermoso abrazo.$mMiam8e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_8_Porque_Duerme_en_Mi_Regazo.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam9a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite conexión hipnótica, el poder de una mirada felina llena de amor puro.

En primer plano, {NOMBRE_DESTINATARIO} mira directamente a la cámara con ojos enormes, brillantes y expresivos, pupilas ligeramente dilatadas. Su dueño/a aparece desenfocado al fondo, sonriendo emocionado.$mMiam9a$,
  background_details = $mMiam9b$Un ambiente íntimo y cálido, desenfocado de fondo.$mMiam9b$,
  magic_effects = $mMiam9c$Pequeños destellos de luz se reflejan en los ojos de {NOMBRE_DESTINATARIO}. La magia debe sentirse hipnótica y completamente integrada dentro de una fotografía realista.$mMiam9c$,
  lighting_color = $mMiam9d$Cálidos, con énfasis dorado y verde en los ojos.$mMiam9d$,
  poem_template = $mMiam9e$Esos ojos me hipnotizan, cuando {NOMBRE_DESTINATARIO} me ve, sus pupilas me hechizan, y me pierdo en su querer.
Su mirada es profunda, llena de amor sincero, su conexión me inunda, y lo quiero verdadero.
No necesita hablar, sus ojos dicen todo, me saben conquistar, de un modo puro y hondo.
Mi gato de mirada intensa, que me ve con devoción, su amor es tan inmenso, que llena mi corazón.$mMiam9e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_9_Porque_Me_Mira_con_Esos_Ojos_de_Amor.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam10a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite calidez protectora, el refugio compartido en una noche fría.

{NOMBRE_DESTINATARIO} está acurrucada junto a su dueño/a en una cama, ambos bajo una manta suave, compartiendo calor con expresión de comodidad absoluta. Una ventana muestra la noche fría afuera.$mMiam10a$,
  background_details = $mMiam10b$Un dormitorio cálido, ventana con noche fría o lluvia visible.$mMiam10b$,
  magic_effects = $mMiam10c$Un contraste suave entre el frío exterior y la calidez dorada interior envuelve la escena. La magia debe sentirse acogedora y completamente integrada dentro de una fotografía realista.$mMiam10c$,
  lighting_color = $mMiam10d$Naranjas y marrones cálidos por dentro, azules oscuros fríos por la ventana.$mMiam10d$,
  poem_template = $mMiam10e$Cuando el frío de la noche, se cuela por el hogar, {NOMBRE_DESTINATARIO} se acerca, y me viene a acompañar.
Su calor es mi refugio, su presencia mi abrigo, su cuerpo es mi consuelo, y la llevo siempre conmigo.
No hay manta más cálida, que su pelaje suave, su compañía es válida, y su amor es la llave.
Mi gata calentita, que me cuida en el invierno, su amor es infinito, y su calor es eterno.$mMiam10e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_10_Porque_Se_Acurruca_Junto_a_Mí_en_las_Noches_Frías.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam11a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el privilegio emotivo de ser elegido, la conexión especial que no se comparte con cualquiera.

{NOMBRE_DESTINATARIO} camina entre varias personas desenfocadas, dirigiéndose directamente hacia su dueño/a principal, ignorando a los demás. Su dueño/a extiende los brazos con expresión de orgullo y emoción.$mMiam11a$,
  background_details = $mMiam11b$Una sala con varias personas presentes, desenfocadas, resaltando el camino de {NOMBRE_DESTINATARIO}.$mMiam11b$,
  magic_effects = $mMiam11c$Una luz cálida ilumina sutilmente el camino de {NOMBRE_DESTINATARIO} hacia su persona elegida. La magia debe sentirse especial y completamente integrada dentro de una fotografía realista.$mMiam11c$,
  lighting_color = $mMiam11d$Cálidos, con un haz de luz que resalta el camino elegido.$mMiam11d$,
  poem_template = $mMiam11e$Entre tantas personas, {NOMBRE_DESTINATARIO} me elige a mí, su preferencia me corona, y me hace tan feliz aquí.
Él podría ir con cualquiera, pero viene a mi lado, su elección es sincera, y me siento afortunado.
No es casualidad, es una conexión real, su lealtad de verdad, me hace sentir especial.
Mi gato selectivo, que me escoge entre la gente, su amor es exclusivo, y lo amo eternamente.$mMiam11e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_11_Porque_Me_Elige_a_Mí.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam12a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite serenidad musical, el ronroneo convertido en la melodía favorita de quien lo escucha.

{NOMBRE_DESTINATARIO} ronronea visiblemente, boca ligeramente abierta, ojos entrecerrados de placer. Su dueño/a escucha con los ojos cerrados y expresión de paz absoluta, como si fuera música celestial.$mMiam12a$,
  background_details = $mMiam12b$Un ambiente sereno y hogareño, desenfocado de fondo.$mMiam12b$,
  magic_effects = $mMiam12c$Pequeñas notas musicales doradas flotan suavemente, representando las ondas de sonido del ronroneo. La magia debe sentirse musical y completamente integrada dentro de una fotografía realista.$mMiam12c$,
  lighting_color = $mMiam12d$Dorados y púrpuras suaves, luz cálida y serena.$mMiam12d$,
  poem_template = $mMiam12e$No necesito melodías, ni canciones del radio, el ronroneo de {NOMBRE_DESTINATARIO} guía, mis días con su sonido.
Su vibración es música, que calma mi ansiedad, su frecuencia es única, mi personal serenidad.
Cada nota que emite, es un verso de amor, su canción me permite, encontrar paz interior.
Mi gata música, que canta sin parar, su sinfonía es mágica, y me hace descansar.$mMiam12e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_12_Porque_Su_Ronroneo_Es_Mi_Canción_Favorita.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam13a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra el espíritu curioso e incansable de una mascota que convierte la casa en su propio territorio de exploración.

{NOMBRE_DESTINATARIO} aparece en distintos puntos de exploración integrados dentro de la misma escena continua: asomado desde un armario entreabierto, trepando un estante alto, investigando detrás de un mueble. Su dueño/a observa con diversión (se distingue parcialmente).$mMiam13a$,
  background_details = $mMiam13b$Un interior hogareño con distintos rincones sugeridos, huellas brillantes marcando su recorrido.$mMiam13b$,
  magic_effects = $mMiam13c$Pequeñas huellas doradas brillantes trazan el camino explorador de {NOMBRE_DESTINATARIO}. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$mMiam13c$,
  lighting_color = $mMiam13d$Colores vibrantes que resaltan a {NOMBRE_DESTINATARIO} en cada punto explorado.$mMiam13d$,
  poem_template = $mMiam13e${NOMBRE_DESTINATARIO} es explorador, de cada espacio del hogar, su curiosidad devoradora, no deja nada sin investigar.
Él sube, baja y trepa, por lugares imposibles, su aventura nunca cesa, descubre cosas increíbles.
Cada rincón es un misterio, que él debe descubrir, su espíritu es serio, en su misión de explorar sin fin.
Mi gato aventurero, que nunca se detiene, su alma es viajera, y siempre algo nuevo tiene.$mMiam13e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_13_Porque_Explora_Cada_Rincón_de_la_Casa.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam14a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra el instinto cazador felino con espíritu épico, convirtiendo un juego cotidiano en una batalla legendaria.

{NOMBRE_DESTINATARIO} está agachada en posición de caza intensa, trasero en alto, ojos enormes y enfocados, persiguiendo un rayo de luz en movimiento sobre el suelo. Al fondo, su dueño/a sonríe sosteniendo la fuente de luz (se distingue parcialmente).$mMiam14a$,
  background_details = $mMiam14b$Un interior con efectos de luz y sombra dramáticos.$mMiam14b$,
  magic_effects = $mMiam14c$El rayo de luz perseguido brilla intensamente, con la silueta de {NOMBRE_DESTINATARIO} tensa y lista para saltar. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$mMiam14c$,
  lighting_color = $mMiam14d$Contrastes dramáticos de luz y sombra, colores intensos.$mMiam14d$,
  poem_template = $mMiam14e${NOMBRE_DESTINATARIO} es una guerrera, que caza con precisión, su presa es ligera, pero su instinto es de león.
Ella persigue cada sombra, cada luz que ve pasar, su espíritu se asombra, y no deja de cazar.
No importa si es invisible, o si no se puede atrapar, su determinación es terrible, y nunca va a parar.
Mi cazadorcita feroz, que batalla sin cesar, aunque su presa sea atroz, la veo siempre cazar.$mMiam14e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_14_Porque_Caza_Sombras_y_Luces_Como_un_Guerrero.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam15a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sanación profunda, la llegada de una mascota justo en el momento en que más se necesitaba compañía.

{NOMBRE_DESTINATARIO}, un gato de mirada tierna, se acerca con expresión de empatía y amor a su dueño/a, quien se ve vulnerable y melancólico, tocándolo suavemente con la cabeza. La escena transiciona sutilmente de tonos fríos y oscuros a cálidos e iluminados.$mMiam15a$,
  background_details = $mMiam15b$Un ambiente que combina penumbra y luz cálida naciente, simbolizando la transformación emocional.$mMiam15b$,
  magic_effects = $mMiam15c$Una luz cálida y suave emana de {NOMBRE_DESTINATARIO}, disolviendo la penumbra alrededor. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$mMiam15c$,
  lighting_color = $mMiam15d$Transición de azules fríos a dorados cálidos.$mMiam15d$,
  poem_template = $mMiam15e$Cuando todo era oscuro, y me sentía perdido, {NOMBRE_DESTINATARIO} llegó seguro, y mi mundo fue encendido.
Él apareció justo a tiempo, cuando más lo necesitaba, su amor fue mi sustento, y mi alma sanaba.
No fue casualidad, fue destino que nos unió, su llegada fue verdad, y mi vida transformó.
Mi ángel peludito, que llegó para salvarme, su amor es infinito, y nunca va a abandonarme.$mMiam15e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_15_Porque_Llegó_a_Mi_Vida_Cuando_Más_Lo_Necesitaba.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam16a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra el rol místico y protector de la mascota como guardián silencioso durante la noche.

{NOMBRE_DESTINATARIO} está sentado majestuosamente en el alféizar de una ventana nocturna, con ojos brillantes como lunas llenas (iris luminoso plateado/dorado), una aura de energía plateada y azul lo rodea suavemente. Su dueño/a duerme pacíficamente en una cama al fondo.$mMiam16a$,
  background_details = $mMiam16b$Una habitación nocturna, luna llena visible a través de la ventana, constelaciones reflejadas en el pelaje de {NOMBRE_DESTINATARIO}.$mMiam16b$,
  magic_effects = $mMiam16c$Sombras místicas se disuelven suavemente alrededor de {NOMBRE_DESTINATARIO}, como si las estuviera protegiendo. La magia debe sentirse mística y completamente integrada dentro de una fotografía realista.$mMiam16c$,
  lighting_color = $mMiam16d$Azules profundos, plateados brillantes y dorados lunares.$mMiam16d$,
  poem_template = $mMiam16e$Cuando la noche cae al fin, {NOMBRE_DESTINATARIO} vigila mi descansar, su mirada de luz sin fin, me protege de todo mal.
Él es mi guardián silente, que cuida mis sueños con devoción, su presencia siempre presente, es mi mística protección.
Con ojos de luna brillante, él ahuyenta la oscuridad, mi felino vigilante, me regala tranquilidad.
No temo a las sombras ya, porque {NOMBRE_DESTINATARIO} está aquí, mi guardián que nunca se va, mi protector hasta el fin.$mMiam16e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_16_Porque_Es_Mi_Guardián_Místico_de_la_Noche.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam17a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra el espíritu aventurero legendario de la mascota, como si viviera mil vidas en una sola.

{NOMBRE_DESTINATARIO}, una gata legendaria, aparece en el centro, rodeada de siluetas translúcidas y fantasmales de sí misma en distintas poses aventureras (escalando, saltando, explorando, cazando, jugando), cada una con un brillo de color diferente. Su dueño/a observa maravillado (se distingue parcialmente).$mMiam17a$,
  background_details = $mMiam17b$Pequeños portales dimensionales circulares flotantes muestran distintos escenarios de aventura (bosque, montaña, ciudad).$mMiam17b$,
  magic_effects = $mMiam17c$Efectos de multiplicidad y movimiento envuelven a {NOMBRE_DESTINATARIO} con un espectro de colores brillantes. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$mMiam17c$,
  lighting_color = $mMiam17d$Espectro completo de colores brillantes, efectos de energía vital.$mMiam17d$,
  poem_template = $mMiam17e${NOMBRE_DESTINATARIO} es legendaria, con nueve vidas por vivir, cada día es extraordinario, mil aventuras por descubrir.
Ella ha escalado mil montañas, ha cruzado dimensiones sin fin, con sus travesuras extrañas, me lleva en su festín.
Cada vida es una historia, cada salto una misión, su espíritu lleno de gloria, late en mi corazón.
Mi aventurera eterna, mi compañera sin igual, con ella nada es invierno, todo es mágico y vital.$mMiam17e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_17_Porque_Tiene_Nueve_Vidas_y_Mil_Aventuras.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam18a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra la magia cotidiana que una mascota trae consigo, transformando lo simple en encantador.

{NOMBRE_DESTINATARIO}, un gato con aire de hechicero, tiene un sombrero de mago puntiagudo translúcido y brillante flotando sobre su cabeza, con una varita mágica pequeña cerca de su pata delantera. Objetos cotidianos levitan suavemente alrededor (plumas, juguetes, bolas de estambre). Su dueño/a observa asombrado y sonriente (se distingue parcialmente).$mMiam18a$,
  background_details = $mMiam18b$Un pequeño caldero humeante con humo de colores arcoíris y pergaminos antiguos flotantes completan la escena.$mMiam18b$,
  magic_effects = $mMiam18c$Estrellas doradas y destellos mágicos multicolores rodean a {NOMBRE_DESTINATARIO}. La magia debe sentirse encantadora y completamente integrada dentro de una fotografía realista.$mMiam18c$,
  lighting_color = $mMiam18d$Púrpuras profundos, dorados brillantes y azules místicos.$mMiam18d$,
  poem_template = $mMiam18e$Con su varita invisible, {NOMBRE_DESTINATARIO} hace magia real, su poder es irresistible, mi hechicero celestial.
Él convierte lo imposible, en algo cotidiano y normal, con su encanto invencible, todo se vuelve especial.
Levita mis preocupaciones, las hace desaparecer, con sus mágicas canciones, me enseña a renacer.
Mi mago de cuatro patas, mi brujo del amor, con sus hechizos de plata, me llena de esplendor.$mMiam18e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_18_Porque_Es_Mi_Mago_Peludo.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam19a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ensoñación compartida, la protección tierna de los sueños durante la noche.

{NOMBRE_DESTINATARIO}, una gata, duerme junto a su dueño/a en una cama, pacíficamente. De su cuerpo emana una burbuja translúcida grande llena de escenas oníricas mágicas que envuelve protectoramente a ambos.$mMiam19a$,
  background_details = $mMiam19b$Dentro de la burbuja: nubes de algodón de azúcar, peces de colores volando, plumas flotantes brillantes, pequeñas galaxias suaves y flores luminosas.$mMiam19b$,
  magic_effects = $mMiam19c$Mariposas de ensueño flotan suavemente dentro de la burbuja onírica. La magia debe sentirse tierna y completamente integrada dentro de una fotografía realista.$mMiam19c$,
  lighting_color = $mMiam19d$Pasteles suaves: rosas, azules bebé, lavandas y amarillos cremosos.$mMiam19d$,
  poem_template = $mMiam19e$Cuando cierro los ojos al fin, {NOMBRE_DESTINATARIO} se acurruca junto a mí, su ronroneo es mi violín, que me lleva lejos de aquí.
Ella me acompaña al soñar, protege mis noches con amor, en su presencia puedo volar, hacia mundos de esplendor.
Sus patitas suaves y tibias, me arrullan con dulzura, sus caricias tan sabias, me dan paz y ternura.
Mi guardiana de los sueños, mi compañera fiel, con ella no hay desempeños, solo amor de miel.$mMiam19e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_19_Porque_Es_Mi_Compañero_de_Sueños.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMiam20a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo luminoso, la compañía que disuelve la soledad más profunda.

{NOMBRE_DESTINATARIO}, un gato que brilla intensamente con una luz cálida interior dorada y naranja suave que emana desde su cuerpo. Su dueño/a está sentado solo en una habitación en penumbra, con expresión melancólica, siendo iluminado y reconfortado por la presencia radiante de {NOMBRE_DESTINATARIO}.$mMiam20a$,
  background_details = $mMiam20b$Sombras sutiles de soledad se disuelven al contacto con la luz de {NOMBRE_DESTINATARIO}.$mMiam20b$,
  magic_effects = $mMiam20c$Mariposas luminosas doradas nacen de la conexión entre {NOMBRE_DESTINATARIO} y su dueño/a, formando un círculo protector de luz. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$mMiam20c$,
  lighting_color = $mMiam20d$Contraste de grises y azules noche transformándose en dorados y naranjas cálidos.$mMiam20d$,
  poem_template = $mMiam20e$Cuando la soledad me abraza, y el silencio pesa más, {NOMBRE_DESTINATARIO} me enlaza, y la oscuridad se va.
Su luz cálida y brillante, ilumina mi corazón, su presencia constante, es mi mayor bendición.
No necesito multitudes, ni voces que me acompañen, sus suaves actitudes, hacen que las penas se desvanezcan.
Él es mi faro en la tormenta, mi luz en la oscuridad, y aunque la vida me atormenta, su amor me da claridad.$mMiam20e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas/PLANTILLA_20_Porque_Es_Mi_Faro_en_la_Soledad.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime1a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra el recibimiento eufórico de la mascota, la certeza pura de ser el centro del mundo de alguien apenas cruza la puerta.

Ligeramente descentrado, {NOMBRE_DESTINATARIO}, un perro de mediana edad, salta de emoción en la entrada de la casa con las patas delanteras levantadas y la cola en pleno movimiento (efecto de desenfoque de velocidad), boca abierta en sonrisa canina. La puerta está abierta y deja entrar luz dorada desde afuera; se distingue parcialmente la silueta de su dueño/a llegando a casa.$mMime1a$,
  background_details = $mMime1b$Un pasillo de entrada acogedor y cálido, con detalles hogareños desenfocados de fondo.$mMime1b$,
  magic_effects = $mMime1c$Pequeños destellos mágicos y estrellas brillantes flotan alrededor de {NOMBRE_DESTINATARIO}, simbolizando la emoción pura del reencuentro. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$mMime1c$,
  lighting_color = $mMime1d$Luz cálida de atardecer entrando por la puerta abierta, con dorados intensos, amarillos suaves y blancos brillantes.$mMime1d$,
  poem_template = $mMime1e$Cada vez que llego a casa, {NOMBRE_DESTINATARIO} está ahí, saltando, moviendo su cola, como si yo fuera lo mejor que hay.
No importa si estuve fuera cinco minutos o todo el día, me recibe como una estrella, con amor y alegría.
Esa emoción en sus ojos, ese salto lleno de amor, me recuerda cada día que soy su mundo, su tesoro mayor.$mMime1e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_1_Porque_Siempre_Me_Recibe_Como_Si_Fuera_una_Estrella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime2a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz nocturna y la certeza reconfortante de una compañía incondicional mientras se duerme.

Ligeramente descentrada, {NOMBRE_DESTINATARIO}, una gata acurrucada, duerme plácidamente junto a su dueño/a sobre una cama acogedora (se distingue parcialmente la silueta de la persona), en posición relajada y respirando en calma.$mMime2a$,
  background_details = $mMime2b$Un dormitorio en penumbra nocturna, iluminado suavemente por luz de luna que entra por la ventana.$mMime2b$,
  magic_effects = $mMime2c$Polvo de estrellas mágico flota suavemente en el aire y la luz de luna crea un halo dorado tenue alrededor de {NOMBRE_DESTINATARIO}. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$mMime2c$,
  lighting_color = $mMime2d$Azules nocturnos suaves, plateados y dorados tenues, atmósfera de calma absoluta.$mMime2d$,
  poem_template = $mMime2e$Cada noche, sin falta alguna, {NOMBRE_DESTINATARIO} duerme a mi lado, su calor me da tranquilidad, su presencia, un regalo sagrado.
No necesita palabras ni gestos, solo estar ahí, ronroneando en paz, me hace sentir acompañado, protegido, nunca solo jamás.
En la oscuridad de la noche, su lealtad brilla como el sol, y sé que mientras ella esté cerca, todo estará bien, todo es amor.$mMime2e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_2_Porque_Duerme_a_Mi_Lado_Todas_las_Noches.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime3a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite empatía profunda, el consuelo silencioso de una mascota que percibe el dolor sin necesidad de palabras.

Ligeramente descentrado, {NOMBRE_DESTINATARIO}, un perro de mirada empática, se acerca con expresión empática a su dueño/a sentado (se distinguen parcialmente sus piernas y manos), apoyando la cabeza sobre su regazo con ojos tiernos y comprensivos mirando hacia arriba.$mMime3a$,
  background_details = $mMime3b$Una sala cálida con luz suave, ambiente hogareño e íntimo.$mMime3b$,
  magic_effects = $mMime3c$Un aura dorada brillante envuelve suavemente a {NOMBRE_DESTINATARIO}, simbolizando su energía sanadora, con pequeñas luces mágicas flotando alrededor. La magia debe sentirse reconfortante y completamente integrada dentro de una fotografía realista.$mMime3c$,
  lighting_color = $mMime3d$Dorados cálidos, marrones suaves y luz ambiental acogedora.$mMime3d$,
  poem_template = $mMime3e$Hay días en que todo pesa, en que el mundo se siente gris, pero {NOMBRE_DESTINATARIO} lo percibe, y viene a estar junto a mí.
No hace falta que yo hable, él simplemente lo sabe ya, se acerca, pone su cabeza en mi regazo, y me dice sin palabras: "aquí estoy, no te vas a quedar mal".
Su mirada lo dice todo, su presencia es mi consuelo, y en ese abrazo silencioso, encuentro paz, encuentro cielo.$mMime3e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_3_Porque_Sabe_Cuándo_Necesito_un_Abrazo.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime4a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite conexión profunda y silenciosa, el vínculo de quien se entiende sin necesidad de decir nada.

En primer plano cercano, {NOMBRE_DESTINATARIO}, una coneja de mirada serena, permanece tranquila en brazos de su dueño/a (se distingue parcialmente su mano acariciándola), con las orejas relajadas y la nariz moviéndose suavemente, mirándose fijamente en un momento de entendimiento mutuo.$mMime4a$,
  background_details = $mMime4b$Un rincón hogareño con luz natural suave, fondo difuminado con destellos mágicos discretos.$mMime4b$,
  magic_effects = $mMime4c$Una luz dorada brillante conecta sutilmente sus miradas, simbolizando la comunicación sin palabras. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$mMime4c$,
  lighting_color = $mMime4d$Dorados suaves, marrones cálidos y luz natural tenue.$mMime4d$,
  poem_template = $mMime4e$No necesitamos palabras, {NOMBRE_DESTINATARIO} y yo nos entendemos así, con una mirada basta, para saber qué siente ella, qué siento yo aquí.
Cuando estoy feliz, ella lo celebra, cuando estoy triste, ella lo percibe, es como si leyera mi alma, como si mi corazón en el suyo vive.
Esta conexión que tenemos, va más allá de lo que puedo explicar, es un lenguaje del corazón, un vínculo que nadie puede igualar.$mMime4e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_4_Porque_Me_Entiende_Sin_Palabras.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime5a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura pura a través de la mirada expresiva de la mascota, un amor que no necesita palabras.

En primer plano, {NOMBRE_DESTINATARIO}, un cuy de ojos grandes y brillantes, es sostenido con delicadeza entre las manos de su dueño/a (se distinguen parcialmente), mirando fijamente a la cámara con expresión de devoción.$mMime5a$,
  background_details = $mMime5b$Un ambiente cálido y difuminado, con tonos suaves de fondo.$mMime5b$,
  magic_effects = $mMime5c$Un resplandor dorado suave y pequeñas partículas de luz mágica rodean su cabeza, simbolizando la pureza de su mirada. La magia debe sentirse tierna y completamente integrada dentro de una fotografía realista.$mMime5c$,
  lighting_color = $mMime5d$Marrones, dorados y luz natural cálida.$mMime5d$,
  poem_template = $mMime5e$Los ojos de {NOMBRE_DESTINATARIO}, cuentan historias sin hablar, en su mirada veo amor, lealtad que no tiene final.
Cuando me mira así, con esos ojos tan sinceros, sé que soy su mundo entero, su humano, su compañero.
No hace falta que me diga nada, su mirada lo dice todo ya, me ama sin condiciones, y ese amor nunca se irá.$mMime5e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_5_Porque_Su_Mirada_Lo_Dice_Todo.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime6a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite amor puro e incondicional en un abrazo tierno entre mascota y dueño/a.

{NOMBRE_DESTINATARIO}, un gato de expresión serena, se acurruca contra el pecho de su dueño/a (se distingue parcialmente) con los ojos cerrados en paz, ronroneando suavemente mientras es correspondido con una caricia.$mMime6a$,
  background_details = $mMime6b$Un ambiente hogareño difuminado, con luz natural cálida de fondo.$mMime6b$,
  magic_effects = $mMime6c$Un resplandor dorado intenso y cálido envuelve a ambos, con pequeños corazones luminosos flotando suavemente en el aire. La magia debe sentirse pura y completamente integrada dentro de una fotografía realista.$mMime6c$,
  lighting_color = $mMime6d$Dorados intensos, rosas suaves y luz cálida envolvente.$mMime6d$,
  poem_template = $mMime6e$El amor de {NOMBRE_DESTINATARIO}, no tiene condiciones ni final, no importa si tengo poco o mucho, su amor es siempre igual.
No me juzga por mis errores, no me pide nada a cambio, solo me ama como soy, con un corazón tan amplio.
Este amor tan puro y sincero, es el regalo más grande que tengo, porque {NOMBRE_DESTINATARIO} me ama, sin razones, sin tiempo, sin freno.$mMime6e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_6_Porque_Me_Ama_Sin_Condiciones.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime7a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite humor tierno, la travesura entrañable de una mascota que se adueña de todo el espacio.

{NOMBRE_DESTINATARIO}, una hurona completamente estirada y relajada, ocupa todo el espacio disponible de un sofá, con expresión de satisfacción total. Su dueño/a está de pie al lado (se distingue parcialmente), con postura resignada pero divertida.$mMime7a$,
  background_details = $mMime7b$Una sala acogedora con tonos cálidos de fondo.$mMime7b$,
  magic_effects = $mMime7c$Pequeñas coronas doradas brillantes flotan sobre {NOMBRE_DESTINATARIO}, como si fuera la reina del sofá. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$mMime7c$,
  lighting_color = $mMime7d$Marrones, beiges y dorados cómicos.$mMime7d$,
  poem_template = $mMime7e$Llego cansado a casa, listo para descansar, pero {NOMBRE_DESTINATARIO} ya está ahí, ocupando mi lugar.
Estirada en el sofá, como si fuera la reina, me mira con esa cara, que dice: "este es mi espacio, ¿ok?"
Y aunque debería molestarme, solo puedo sonreír, porque verla tan feliz ahí, vale más que mi lugar para dormir.$mMime7e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_7_Porque_Me_Roba_Mi_Lugar_en_el_Sofá.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime8a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite humor cotidiano, la resignación cariñosa de compartir la cama con quien se la adueña por completo.

Vista desde arriba de una cama, {NOMBRE_DESTINATARIO}, un perro, está completamente estirado en diagonal ocupando la mayor parte del espacio, durmiendo profundamente. Su dueño/a ocupa apenas el borde de la cama (se distingue parcialmente), en equilibrio precario.$mMime8a$,
  background_details = $mMime8b$Sábanas desordenadas, luz de noche suave.$mMime8b$,
  magic_effects = $mMime8c$Pequeñas "Z" brillantes flotan sobre {NOMBRE_DESTINATARIO}, indicando sueño profundo. La magia debe sentirse cómica y completamente integrada dentro de una fotografía realista.$mMime8c$,
  lighting_color = $mMime8d$Azules nocturnos, blancos y grises suaves.$mMime8d$,
  poem_template = $mMime8e$Cada noche es lo mismo, {NOMBRE_DESTINATARIO} se adueña de la cama, se estira, se acomoda, y yo termino en la esquina, sin espacio ni nada.
Él duerme como un rey, roncando sin preocupación, mientras yo me equilibro en el borde, tratando de no caer al piso, ¡qué situación!
Pero aunque amanezco adolorido, no lo cambiaría por nada, porque compartir mi cama con él, es la mejor parte de mi jornada.$mMime8e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_8_Porque_Ocupa_Toda_la_Cama_y_Yo_Duermo_en_la_Orilla.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime9a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite travesura irresistible, la ternura desarmante de un pequeño ladrón imposible de regañar.

{NOMBRE_DESTINATARIO}, un hurón con restos de comida cerca del hocico, mira hacia arriba con ojos grandes de inocencia fingida, sentado junto a un plato vacío en una mesa o mostrador.$mMime9a$,
  background_details = $mMime9b$Una cocina o comedor cálido, desenfocado de fondo.$mMime9b$,
  magic_effects = $mMime9c$Pequeñas huellas brillantes y migajas mágicas flotan en el aire, evidenciando el "crimen". La magia debe sentirse juguetona y completamente integrada dentro de una fotografía realista.$mMime9c$,
  lighting_color = $mMime9d$Cálidos, marrones, dorados y tonos de comida.$mMime9d$,
  poem_template = $mMime9e$Me doy vuelta un segundo, y {NOMBRE_DESTINATARIO} ya actuó, mi comida ha desaparecido, y él me mira como si nada pasó.
Con esa cara de inocente, y esos ojos que me derriten, ¿cómo puedo enojarme?, si es imposible resistirse.
Aunque me robe mi comida, aunque sea un travieso ladrón, su ternura me desarma, y solo puedo darle mi perdón.$mMime9e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_9_Porque_Roba_Mi_Comida_y_No_Puedo_Enojarme.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime10a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite humor tierno, el poder irresistible de una mirada suplicante a la hora de comer.

{NOMBRE_DESTINATARIO}, un perro, está sentado frente a su dueño/a que está comiendo (se distingue parcialmente la mesa y la persona), con la cabeza ligeramente inclinada y ojos grandes y brillantes de súplica tierna.$mMime10a$,
  background_details = $mMime10b$Un comedor cálido, desenfocado de fondo.$mMime10b$,
  magic_effects = $mMime10c$Corazones brillantes y estrellas mágicas flotan alrededor de su cabeza, simbolizando su poder de manipulación adorable. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$mMime10c$,
  lighting_color = $mMime10d$Cálidos, dorados y marrones.$mMime10d$,
  poem_template = $mMime10e$Cuando me siento a comer, {NOMBRE_DESTINATARIO} aparece al instante, se sienta frente a mí, con esa mirada suplicante.
Inclina su cabeza, pone esos ojos que me matan, y aunque sé que ya comió, esa mirada me delata.
No puedo resistirme, su poder es demasiado fuerte, y termino compartiendo mi comida, porque esa mirada es mi suerte.$mMime10e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_10_Porque_Pide_Comida_Con_Esa_Mirada_Que_No_Puedo_Resistir.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime11a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite energía explosiva y humor, el ritual caótico y adorable después de cada baño.

{NOMBRE_DESTINATARIO}, un perro, corre a toda velocidad por la casa con el pelaje mojado, gotas de agua volando, orejas al viento y expresión de euforia total.$mMime11a$,
  background_details = $mMime11b$Un pasillo o sala de casa, con una toalla tirada de fondo.$mMime11b$,
  magic_effects = $mMime11c$Rayos de velocidad brillantes y gotas de agua mágicas congeladas en el aire acompañan su carrera. La magia debe sentirse enérgica y completamente integrada dentro de una fotografía realista.$mMime11c$,
  lighting_color = $mMime11d$Azules del agua, blancos brillantes, sensación de movimiento dinámico.$mMime11d$,
  poem_template = $mMime11e$Después de cada baño, {NOMBRE_DESTINATARIO} se vuelve loco, corre por toda la casa, como si fuera un cohete, no poco.
Salta, gira, se sacude, con energía sin control, y yo solo puedo reírme, de este espectáculo sin igual, ¡qué show!
No sé qué le pasa, pero es su ritual especial, y verlo tan feliz corriendo, es algo que no tiene igual.$mMime11e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_11_Porque_Corre_Como_Loco_Después_del_Baño.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime12a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra el humor espontáneo de una mascota con un talento único para las expresiones cómicas.

Collage fotorrealista de 3-4 expresiones faciales cómicas de {NOMBRE_DESTINATARIO}, una gata: lengua de lado, ojos entrecerrados, orejas en posiciones graciosas, boca entreabierta en gesto torcido. Cada expresión enmarcada con un borde dorado brillante tipo polaroid mágica.$mMime12a$,
  background_details = $mMime12b$Un fondo neutro y cálido, con destellos de estrellas flotando alrededor.$mMime12b$,
  magic_effects = $mMime12c$Pequeñas estrellas y destellos de risa flotan entre los recuadros. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$mMime12c$,
  lighting_color = $mMime12d$Vibrantes, dorados y tonos cálidos.$mMime12d$,
  poem_template = $mMime12e${NOMBRE_DESTINATARIO} tiene un don, para hacer las caras más raras, lengua de lado, ojos bizcos, expresiones que me matan de risa, claras.
Cada foto que le tomo, es una obra de arte cómica, no sé cómo lo hace, pero su cara es única.
Esas expresiones graciosas, alegran cualquier día gris, porque con {NOMBRE_DESTINATARIO} cerca, la risa nunca tiene fin.$mMime12e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_12_Porque_Hace_las_Caras_Más_Chistosas.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime13a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite espíritu aventurero y compañerismo, la certeza de que cada camino es mejor acompañado.

{NOMBRE_DESTINATARIO}, un perro, camina con paso seguro y feliz junto a su dueño/a (se distingue parcialmente) por un sendero de bosque o playa al atardecer, mirando hacia adelante con expresión de explorador.$mMime13a$,
  background_details = $mMime13b$Un sendero natural al atardecer, luz dorada iluminando la escena.$mMime13b$,
  magic_effects = $mMime13c$Un camino brillante mágico se extiende hacia el horizonte, con una brújula mágica y estrellas de viaje sutiles. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$mMime13c$,
  lighting_color = $mMime13d$Dorados, naranjas y verdes naturales de atardecer.$mMime13d$,
  poem_template = $mMime13e$Cada aventura que vivo, {NOMBRE_DESTINATARIO} está a mi lado, explorando nuevos caminos, siendo mi compañero amado.
No importa si es el parque, la playa o la montaña, él siempre está listo, para vivir cada hazaña.
Con {NOMBRE_DESTINATARIO} de compañero, cada día es una aventura nueva, y sé que mientras estemos juntos, la vida siempre será buena.$mMime13e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_13_Porque_Es_Mi_Compañero_de_Aventuras.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime14a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite lealtad constante, la presencia fiel de una mascota en cada circunstancia de la vida.

{NOMBRE_DESTINATARIO}, una gata, aparece sentada fielmente junto a su dueño/a en distintos momentos sutilmente sugeridos dentro de la misma escena continua, manteniendo siempre la misma expresión leal y presente.$mMime14a$,
  background_details = $mMime14b$Un ambiente hogareño cálido que sutilmente evoca distintos momentos del día.$mMime14b$,
  magic_effects = $mMime14c$Un hilo dorado brillante conecta visualmente la escena, simbolizando lealtad constante. La magia debe sentirse reconfortante y completamente integrada dentro de una fotografía realista.$mMime14c$,
  lighting_color = $mMime14d$Tonos cálidos unificados por una luz dorada constante.$mMime14d$,
  poem_template = $mMime14e$En los días buenos, {NOMBRE_DESTINATARIO} está ahí, en los días difíciles, también está junto a mí.
No importa qué suceda, no importa cómo me sienta, ella nunca me abandona, su lealtad es permanente.
Esta constancia que tiene, este amor que nunca falla, es lo que hace de {NOMBRE_DESTINATARIO}, la mejor amiga, sin batalla.$mMime14e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_14_Porque_Siempre_Está_Ahí_Sin_Importar_Qué.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime15a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite protección heroica, la nobleza silenciosa de una mascota que vigila con devoción.

{NOMBRE_DESTINATARIO}, un perro, se posiciona de forma protectora frente a su dueño/a (se distingue parcialmente detrás de él), con postura alerta, mirada vigilante y noble, orejas atentas.$mMime15a$,
  background_details = $mMime15b$Un fondo neutro con luz dramática tipo héroe iluminando a {NOMBRE_DESTINATARIO} desde atrás.$mMime15b$,
  magic_effects = $mMime15c$Un escudo mágico dorado translúcido y brillante envuelve suavemente su silueta, simbolizando protección. La magia debe sentirse noble y completamente integrada dentro de una fotografía realista.$mMime15c$,
  lighting_color = $mMime15d$Dorados intensos, azules nobles y luz dramática.$mMime15d$,
  poem_template = $mMime15e${NOMBRE_DESTINATARIO} es mi guardián, mi protector fiel y valiente, siempre está alerta, cuidándome constantemente.
No importa el tamaño, ni lo que pueda enfrentar, él me protege sin dudarlo, dispuesto a todo por mí estar.
Con {NOMBRE_DESTINATARIO} a mi lado, me siento seguro y en paz, porque sé que su amor, me protegerá siempre, sin más.$mMime15e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_15_Porque_Me_Protege_Como_un_Guardián.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime16a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite libertad e ingravidez mágica, el vuelo compartido de quien te enseña a soñar.

{NOMBRE_DESTINATARIO}, un loro de plumaje colorido, vuela junto a su dueño/a, quien también flota suavemente en el aire dentro de una sala de estar (se distingue parcialmente su silueta), ambos con expresión de alegría y libertad.$mMime16a$,
  background_details = $mMime16b$Una sala de estar con una ventana grande que muestra un cielo estrellado imposible con galaxias visibles, libros y objetos cotidianos flotando alrededor.$mMime16b$,
  magic_effects = $mMime16c$Mariposas luminosas multicolores flotan alrededor mientras plumas brillantes se desprenden suavemente de {NOMBRE_DESTINATARIO}. La magia debe sentirse onírica y completamente integrada dentro de una fotografía realista.$mMime16c$,
  lighting_color = $mMime16d$Azules profundos, púrpuras, dorados y plateados brillantes.$mMime16d$,
  poem_template = $mMime16e$Con {NOMBRE_DESTINATARIO} a mi lado, desafío la gravedad, juntos hemos despegado, hacia nuestra libertad.
No hay cielo que nos detenga, ni límite que alcanzar, su espíritu me sostiene, y me enseña a soñar.
Él es mi viento, mi impulso, mi razón para volar, y aunque no tengamos alas, juntos podemos llegar.$mMime16e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_16_Porque_Juntos_Volamos_Sin_Alas.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime17a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra el heroísmo cotidiano de una mascota leal, un poder que no necesita disfraz.

{NOMBRE_DESTINATARIO}, un hurón, posa en actitud heroica (pecho hacia adelante, postura orgullosa), con una capa translúcida de energía brillante flotando dramáticamente detrás. Su dueño/a lo mira con admiración y sonrisa (se distingue parcialmente).$mMime17a$,
  background_details = $mMime17b$Un fondo con efectos sutiles de cómic integrados (estrellas de impacto, líneas de velocidad).$mMime17b$,
  magic_effects = $mMime17c$Rayos de luz dorada salen de sus patas como superpoderes, con relámpagos de energía y un símbolo heroico brillante en su pecho. La magia debe sentirse poderosa y completamente integrada dentro de una fotografía realista.$mMime17c$,
  lighting_color = $mMime17d$Azules eléctricos, rojos intensos y dorados brillantes.$mMime17d$,
  poem_template = $mMime17e$No necesita un traje especial, ni poderes que demostrar, {NOMBRE_DESTINATARIO} es mi guardián leal, mi superhéroe sin igual.
Él me protege cada día, con su valentía sin fin, su amor es mi energía, mi héroe hasta el fin.
Aunque no vuele por los cielos, ni tenga fuerza sobrenatural, su lealtad rompe los velos, es mi protector celestial.$mMime17e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_17_Porque_Es_Mi_Superhéroe_Sin_Capa.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime18a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro cotidiano, la magia de una mascota que transforma lo simple en maravilloso.

{NOMBRE_DESTINATARIO}, un cuy (conejillo de indias), corretea felizmente por una cocina cotidiana donde los objetos se transforman mágicamente a su paso, dejando pequeñas huellas de estrellas doradas brillantes.$mMime18a$,
  background_details = $mMime18b$Una cocina hogareña donde el plato de comida brilla como oro fundido y la luz del sol se convierte en rayos arcoíris.$mMime18b$,
  magic_effects = $mMime18c$Burbujas de agua flotan como diminutos planetas con anillos y flores luminosas crecen de sus huellas. La magia debe sentirse maravillosa y completamente integrada dentro de una fotografía realista.$mMime18c$,
  lighting_color = $mMime18d$Dorados, arcoíris pastel y brillos plateados.$mMime18d$,
  poem_template = $mMime18e$Un día común se transforma, cuando {NOMBRE_DESTINATARIO} está aquí, su magia todo lo reforma, y me hace sonreír así.
Ella convierte cada momento, en algo mágico y especial, con su simple movimiento, lo ordinario es celestial.
No necesito grandes cosas, ni aventuras por buscar, con mi amiga a mi lado, cada instante es un lugar donde la magia es real, y el amor puede brillar.$mMime18e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_18_Porque_Convierte_lo_Ordinario_en_Extraordinario.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime19a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sanación y esperanza, la luz reconfortante de una mascota en los momentos más grises.

{NOMBRE_DESTINATARIO}, una gata, brilla suavemente con una luz interior dorada y blanca cálida, acercándose con ternura a su dueño/a sentado con expresión melancólica (se distingue parcialmente), tocándolo suavemente.$mMime19a$,
  background_details = $mMime19b$Un ambiente donde sombras oscuras alrededor se disuelven al contacto con la luz de {NOMBRE_DESTINATARIO}.$mMime19b$,
  magic_effects = $mMime19c$Mariposas luminosas nacen de los rayos de luz que emanan de ella. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$mMime19c$,
  lighting_color = $mMime19d$Contraste de grises y azules profundos transformándose en dorados cálidos y blancos brillantes.$mMime19d$,
  poem_template = $mMime19e$Cuando la tristeza me rodea, y el mundo se vuelve gris, {NOMBRE_DESTINATARIO} me acompaña, y me devuelve la luz aquí.
Su presencia es un faro, que alumbra mi oscuridad, su amor puro y claro, me regresa la claridad.
No necesita decir nada, su mirada basta ya, con su luz tan dorada, mi tristeza se va.
Ella es mi sol en la tormenta, mi esperanza al despertar, y aunque el dolor me atormenta, su amor me hace sanar.$mMime19e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_19_Porque_Ilumina_Mis_Días_Oscuros.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mMime20a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite aventura épica e infinita, la certeza de que cada día con esta mascota es un mundo nuevo por descubrir.

{NOMBRE_DESTINATARIO}, un loro posado sobre el hombro de su dueño/a (se distingue parcialmente), avanza junto a él hacia un portal dimensional circular brillante que se abre en medio de la sala de estar, con las alas ligeramente extendidas de emoción.$mMime20a$,
  background_details = $mMime20b$Un lado del portal muestra la casa normal; el otro revela un mundo de fantasía épico con montañas flotantes, cascadas de estrellas líquidas y un cielo con múltiples lunas.$mMime20b$,
  magic_effects = $mMime20c$Ondas dimensionales rodean el portal y luz mágica emana del otro mundo. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$mMime20c$,
  lighting_color = $mMime20d$Contraste entre tonos cálidos hogareños y colores fantásticos vibrantes (púrpuras, verdes neón, azules eléctricos).$mMime20d$,
  poem_template = $mMime20e$Cada paseo es un viaje, cada salida una misión, con {NOMBRE_DESTINATARIO} no hay paraje, que no explore mi corazón.
Él me lleva a otros mundos, sin salir de mi ciudad, en sus ojos tan profundos, veo toda la inmensidad.
Juntos cruzamos portales, que otros no pueden ver, vivimos cuentos reales, que nunca voy a perder.
Mi amigo aventurero, mi compañero sin fin, con él soy explorador, y cada día es un festín.$mMime20e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas/PLANTILLA_20_Porque_Es_Mi_Compañero_de_Aventuras_Infinitas.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues1a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite la calidez entrañable de la cercanía física compartida, el recuerdo vivo de un lugar favorito que nunca cambiaba.

Ligeramente descentrada, {NOMBRE_DEDICANTE} está sentada en un sofá con ropa cómoda, expresión serena y nostálgica, acariciando suavemente la cabeza de {NOMBRE_DESTINATARIO}, un perro acurrucado junto a ella con la cabeza apoyada en su regazo, ojos entrecerrados de calma.$mNues1a$,
  background_details = $mNues1b$Un interior acogedor de sala o dormitorio, mantas suaves y cojines, luz cálida de atardecer entrando por la ventana.$mNues1b$,
  magic_effects = $mNues1c$Un halo de luz dorada tenue envuelve suavemente a ambos, como un recuerdo que sigue vivo. La magia debe sentirse sutil y completamente integrada dentro de una fotografía realista.$mNues1c$,
  lighting_color = $mNues1d$Dorados, beige y crema cálidos, luz suave de atardecer.$mNues1d$,
  poem_template = $mNues1e$Recuerdo cuando te acurrucabas junto a mí, tu calor era mi refugio, mi paz, mi sentir.
No importaba el lugar, la hora o el día, tu lugar favorito siempre era a mi lado, {NOMBRE_DESTINATARIO} mío.
En el sofá, en la cama, en cualquier rincón, buscabas mi cercanía con tanto amor y devoción.
Tu cabeza en mi regazo, tus ojos mirándome así, como diciéndome en silencio: "Aquí quiero estar, junto a ti."
Ahora que no estás, siento tu presencia aún, en cada espacio vacío donde solías estar tú.
Tu lugar favorito sigue siendo a mi lado, lo sé, porque en mi corazón, {NOMBRE_DESTINATARIO}, siempre te tendré.$mNues1e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_1_Porque_Tu_Lugar_Favorito_Era_a_Mi_Lado.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues2a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite la alegría compartida de una rutina diaria convertida en pequeña aventura.

{NOMBRE_DEDICANTE} camina por un sendero con sonrisa amplia, ropa casual, sosteniendo una correa. A su lado, {NOMBRE_DESTINATARIO}, una gata de paso elegante, camina con la cola en alto, mirando alrededor con expresión curiosa y alegre.$mNues2a$,
  background_details = $mNues2b$Un parque soleado con árboles verdes y flores silvestres, cielo azul con nubes suaves, mañana luminosa.$mNues2b$,
  magic_effects = $mNues2c$Un suave brillo dorado acompaña sus pasos, como una estela de recuerdos felices. La magia debe sentirse sutil y completamente integrada dentro de una fotografía realista.$mNues2c$,
  lighting_color = $mNues2d$Verdes, azules y dorados vibrantes, luz solar cálida.$mNues2d$,
  poem_template = $mNues2e$Cada paseo contigo era una aventura sin igual, explorar el mundo juntos, nuestro ritual especial.
Tú oliendo cada árbol, cada esquina, cada flor, yo disfrutando tu alegría, tu energía, tu fervor.
La correa entre nosotros era más que una conexión, era el lazo que unía nuestros pasos, nuestro corazón.
Caminábamos sin prisa, sin destino que alcanzar, solo tú y yo, {NOMBRE_DESTINATARIO}, disfrutando el caminar.
Ahora cuando salgo, siento tu presencia a mi lado, como si siguieras ahí, mi compañera adorada.
Nuestros paseos eran mágicos, y aunque ya no estés, cada calle que recorro, la recorro pensando en ti otra vez.$mNues2e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_2_Porque_Nuestros_Paseos_Eran_Nuestra_Aventura_Diaria.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues3a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra la alegría desbordante del juego compartido, esa complicidad que hace sentir niño otra vez.

{NOMBRE_DEDICANTE}, agachada y riendo con energía juvenil, lanza un juguete. {NOMBRE_DESTINATARIO}, un perro en plena acción, salta para atraparlo con la lengua afuera y expresión juguetona.$mNues3a$,
  background_details = $mNues3b$Un jardín o sala de estar espaciosa con luz natural brillante, juguetes dispersos sobre el pasto o la alfombra.$mNues3b$,
  magic_effects = $mNues3c$Pequeñas partículas doradas de luz siguen el movimiento del juguete en el aire. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$mNues3c$,
  lighting_color = $mNues3d$Colores brillantes y alegres, luz de día radiante.$mNues3d$,
  poem_template = $mNues3e$Contigo volví a ser niña, sin preocupaciones ni edad, jugábamos con pelotas, con juguetes, con pura felicidad.
Tu energía era contagiosa, tus ladridos mi canción, cada juego era una fiesta, cada momento una bendición.
Perseguías tu juguete favorito con tanta emoción, y yo corría contigo, compartiendo tu diversión.
No importaba si estaba cansada o si el día fue largo, contigo, {NOMBRE_DESTINATARIO}, el juego nunca fue un cargo.
Ahora guardo tus juguetes como tesoros de amor, recuerdos de risas compartidas, de puro esplendor.
Jugábamos como niños, y aunque ya no estés aquí, esos momentos de alegría vivirán siempre en mí.$mNues3e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_3_Porque_Jugábamos_Como_Niños_Sin_Importar_la_Edad.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues4a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo profundo, la intuición silenciosa de una mascota que siempre supo cuándo hacía falta un abrazo.

{NOMBRE_DEDICANTE} está sentado con expresión vulnerable pero reconfortada, ojos cerrados. {NOMBRE_DESTINATARIO}, una gata, está acurrucada contra su pecho, cabeza apoyada, ronroneando suavemente mientras él la acaricia.$mNues4a$,
  background_details = $mNues4b$Un interior íntimo (dormitorio o sala) con luz tenue y cálida, atmósfera tranquila.$mNues4b$,
  magic_effects = $mNues4c$Un resplandor dorado suave envuelve el abrazo compartido. La magia debe sentirse reconfortante y completamente integrada dentro de una fotografía realista.$mNues4c$,
  lighting_color = $mNues4d$Dorados cálidos y suaves, luz tenue de lámpara o ventana filtrada.$mNues4d$,
  poem_template = $mNues4e$Tenías un don especial, una intuición sin par, sabías cuándo estaba triste, cuándo necesitaba un abrazar.
Sin palabras, sin preguntas, solo con tu presencia fiel, llegabas a mi lado y todo volvía a estar bien.
Tu mirada comprensiva, tu calor reconfortante, eran el mejor remedio, el consuelo más constante.
Apoyabas tu cabeza en mi pecho, en mi regazo, en mi ser, y con ese simple gesto, me hacías renacer.
Ahora que no estás, extraño tus abrazos peludos, pero sé que desde el cielo, sigues enviándome escudos.
Siempre supiste cuándo necesitaba tu amor, y ese amor, {NOMBRE_DESTINATARIO}, sigue siendo mi mayor tesoro.$mNues4e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_4_Porque_Siempre_Supiste_Cuándo_Necesitaba_un_Abrazo.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues5a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite la alegría matutina de un ritual diario, el amor que era mejor despertador que cualquier alarma.

{NOMBRE_DEDICANTE} despierta en la cama con sonrisa somnolienta y feliz. {NOMBRE_DESTINATARIO}, un perro sobre la cama junto a ella, cola en movimiento y lengua afuera, la saluda con lamidas emocionadas.$mNues5a$,
  background_details = $mNues5b$Un dormitorio al amanecer, luz suave de sol entrando por la ventana, sábanas arrugadas.$mNues5b$,
  magic_effects = $mNues5c$La luz matutina dorada envuelve a ambos con un brillo cálido y vivo. La magia debe sentirse luminosa y completamente integrada dentro de una fotografía realista.$mNues5c$,
  lighting_color = $mNues5d$Dorados, blancos y crema cálidos, luz de amanecer.$mNues5d$,
  poem_template = $mNues5e$Cada mañana comenzaba con tu saludo especial, tus lamidas, tu energía matutinal.
No necesitaba alarma, tu amor era mi despertar, tu alegría al verme abrir los ojos, mi razón para empezar.
Saltabas a la cama, me mirabas con emoción, como si cada amanecer fuera una nueva celebración.
Tu cola moviéndose, tus ladridos de alegría, eran la mejor forma de comenzar cada día.
Ahora las mañanas son más silenciosas, es verdad, pero siento tu espíritu despertándome con tu bondad.
Me despertabas con amor, y aunque ya no estés aquí, cada mañana te recuerdo, {NOMBRE_DESTINATARIO}, y sonrío por ti.$mNues5e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_5_Porque_Me_Despertabas_Cada_Mañana_con_Tu_Amor.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues6a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite la sabiduría silenciosa del amor incondicional, esa comunicación que no necesitaba palabras.

{NOMBRE_DEDICANTE} está sentado en el suelo con expresión serena y reflexiva, mirando a {NOMBRE_DESTINATARIO}, una gata sentada junto a él, con los ojos fijos en los de él en un momento de conexión profunda.$mNues6a$,
  background_details = $mNues6b$Un jardín al atardecer con luz dorada suave, atmósfera tranquila y contemplativa.$mNues6b$,
  magic_effects = $mNues6c$Un brillo dorado tenue conecta sutilmente sus miradas. La magia debe sentirse contemplativa y completamente integrada dentro de una fotografía realista.$mNues6c$,
  lighting_color = $mNues6d$Dorados, naranjas suaves y verdes cálidos de atardecer.$mNues6d$,
  poem_template = $mNues6e$Nunca dijiste "te quiero" con palabras, es verdad, pero tu amor lo sentí en cada gesto, en cada lealtad.
Tu mirada lo decía todo, tu presencia era mi hogar, no necesitabas hablar para hacerme amar.
Cada movimiento de cola, cada ronroneo suave, cada vez que me buscabas, cada momento clave.
Me enseñaste que el amor más puro no necesita voz, solo presencia, fidelidad, y un corazón feroz.
Ahora que no estás, escucho tu silencio amoroso, en cada recuerdo tuyo, en cada instante hermoso.
Me enseñaste que el amor trasciende las palabras, y ese amor, {NOMBRE_DESTINATARIO}, en mi alma nunca se apaga.$mNues6e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_6_Porque_Me_Enseñaste_Que_el_Amor_No_Necesita_Palabras.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues7a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite espíritu aventurero, la certeza de que cada viaje era mejor compartido.

{NOMBRE_DEDICANTE} está de pie en una playa, ropa de aventura, expresión emocionada y libre, brazos abiertos hacia el horizonte. {NOMBRE_DESTINATARIO}, un perro junto a ella, olfatea el aire con la cola levantada y expresión curiosa.$mNues7a$,
  background_details = $mNues7b$Una playa soleada con olas y cielo azul, día claro y luminoso.$mNues7b$,
  magic_effects = $mNues7c$Un brillo dorado sutil bordea el horizonte, como una promesa de aventuras compartidas. La magia debe sentirse expansiva y completamente integrada dentro de una fotografía realista.$mNues7c$,
  lighting_color = $mNues7d$Azules, verdes y dorados vivos, luz solar brillante.$mNues7d$,
  poem_template = $mNues7e$Cada viaje, cada salida, cada nueva experiencia, tú estabas a mi lado, con tu alegre presencia.
Desde paseos en auto hasta excursiones al mar, eras mi compañero fiel, listo para explorar.
Tu emoción era contagiosa, tu curiosidad sin fin, juntos descubríamos el mundo, desde el principio hasta el fin.
No importaba el destino, solo importaba estar juntos, cada aventura contigo era mágica, en todos los puntos.
Ahora cuando viajo, siento tu espíritu conmigo, como si siguieras ahí, mi eterno amigo.
Eras mi compañero en cada aventura, y lo seguirás siendo, porque en mi corazón, {NOMBRE_DESTINATARIO}, sigues viviendo.$mNues7e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_7_Porque_Eras_Mi_Compañero_en_Cada_Aventura.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues8a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite humor tierno, ese ritual diario de compartir comida sin poder resistirse a la mirada suplicante.

{NOMBRE_DEDICANTE} está sentado a la mesa con un plato de comida, expresión divertida y cariñosa, sosteniendo un bocado en la mano. Frente a él, {NOMBRE_DESTINATARIO}, una gata con mirada fija e intensa, espera pacientemente sentada.$mNues8a$,
  background_details = $mNues8b$Una cocina o comedor hogareño con luz natural cálida.$mNues8b$,
  magic_effects = $mNues8c$Un pequeño destello dorado resalta el bocado ofrecido, como un ritual amoroso cotidiano. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$mNues8c$,
  lighting_color = $mNues8d$Cálidos, dorados y marrones acogedores.$mNues8d$,
  poem_template = $mNues8e$Cada vez que me sentaba a comer, ahí estabas tú, con esos ojos suplicantes que no podía resistir, es la verdad absoluta.
Tu comida favorita no era la tuya, sino la mía, y aunque sabía que no debía, te daba un pedacito cada día.
Esa mirada tuya era imposible de ignorar, tu cola moviéndose, tu paciencia al esperar.
Y cuando te daba un bocado, tu felicidad era inmensa, como si fuera el mejor regalo, la mejor recompensa.
Ahora cuando como, siento tu mirada aún, esperando tu pedacito, mi compañera común.
Tu comida favorita era cualquier cosa que yo comiera, y ese recuerdo, {NOMBRE_DESTINATARIO}, siempre me hará sonreír de manera sincera.$mNues8e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_8_Porque_Tu_Comida_Favorita_Era_Cualquier_Cosa_Que_Yo_Comiera.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues9a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra la valentía silenciosa de un guardián leal que cuidaba el hogar con devoción.

{NOMBRE_DEDICANTE} está de pie junto a la entrada de la casa, con la mano apoyada sobre {NOMBRE_DESTINATARIO}, un perro en posición alerta y protectora, orejas levantadas, postura firme.$mNues9a$,
  background_details = $mNues9b$La entrada de una casa o jardín frontal al atardecer, luz de porche encendida.$mNues9b$,
  magic_effects = $mNues9c$Un halo dorado tenue rodea a {NOMBRE_DESTINATARIO}, como un escudo protector invisible. La magia debe sentirse noble y completamente integrada dentro de una fotografía realista.$mNues9c$,
  lighting_color = $mNues9d$Cálidos con toques dramáticos, dorados y ámbar.$mNues9d$,
  poem_template = $mNues9e$Eras el guardián de nuestro hogar, valiente y leal, cada ruido extraño te ponía en alerta total.
Ladrabas para protegernos, para hacernos saber, que mientras estuvieras tú, nada malo iba a suceder.
Tu valentía no conocía límites, tu amor era tu escudo, protegías a tu familia con un corazón puro y desnudo.
No importaba tu tamaño, tu espíritu era gigante, eras nuestro protector, nuestro guerrero constante.
Ahora que no estás, siento tu presencia vigilante, como un ángel guardián, siempre adelante.
Protegías nuestra casa con amor y devoción, y esa protección, {NOMBRE_DESTINATARIO}, sigue viva en mi corazón.$mNues9e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_9_Porque_Protegías_Nuestra_Casa_Como_un_Verdadero_Guardián.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues10a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra con humor la picardía entrañable de una mascota traviesa, esos desastres que terminaban siempre en risas.

{NOMBRE_DEDICANTE} está de pie con expresión de risa genuina mezclada con falsa exasperación, manos en la cabeza. {NOMBRE_DESTINATARIO}, una gata, está en medio de un pequeño desastre de cojines y objetos dispersos, con expresión traviesa e inocente.$mNues10a$,
  background_details = $mNues10b$Una sala de estar con cojines desparramados y objetos dispersos, luz natural brillante.$mNues10b$,
  magic_effects = $mNues10c$Pequeñas partículas doradas y brillantes flotan sobre el desorden, como si la travesura misma brillara. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$mNues10c$,
  lighting_color = $mNues10d$Colores brillantes y alegres, luz de interior cálida.$mNues10d$,
  poem_template = $mNues10e$Eras una traviesa de corazón, lo confieso con amor, tus travesuras me sacaban canas, pero también risa y fervor.
Robabas calcetines, hacías desastres sin parar, pero tu carita inocente siempre me hacía perdonar.
Incluso cuando debía regañarte, no podía contener mi risa, tu picardía era parte de tu encanto, de tu forma tan precisa.
Cada travesura era una aventura, un recuerdo divertido, que ahora atesoro con cariño, con amor compartido.
Ahora que no estás, extraño tus travesuras locas, esos momentos caóticos que llenaban mi vida de cosas.
Tus travesuras me hacían reír, y aunque ya no estés aquí, esos recuerdos graciosos, {NOMBRE_DESTINATARIO}, siempre vivirán en mí.$mNues10e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_10_Porque_Tus_Travesuras_Me_Hacían_Reír_Incluso_Cuando_No_Debía.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues11a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra la alegría compartida de las festividades, esos momentos en que la mascota era parte esencial de la familia.

{NOMBRE_DEDICANTE} está sentada junto a {NOMBRE_DESTINATARIO}, un gato con una pequeña bandana festiva, ambos con expresión de alegría genuina rodeados de decoraciones.$mNues11a$,
  background_details = $mNues11b$Una sala decorada para una celebración (cumpleaños o Navidad), luces cálidas y guirnaldas.$mNues11b$,
  magic_effects = $mNues11c$Pequeñas luces doradas festivas flotan suavemente en el aire. La magia debe sentirse festiva y completamente integrada dentro de una fotografía realista.$mNues11c$,
  lighting_color = $mNues11d$Vibrantes y alegres, dorados y colores festivos cálidos.$mNues11d$,
  poem_template = $mNues11e$Cada cumpleaños, cada Navidad, cada día festivo, tú estabas ahí, haciendo todo más vivo.
Te poníamos sombreros, te dábamos regalos especiales, y tu alegría convertía esos días en momentos memoriales.
Celebrábamos juntos como una verdadera familia, tú eras parte esencial de cada ceremonia.
Desde fotos navideñas hasta pasteles de cumpleaños, cada celebración contigo era mágica, sin engaños.
Ahora en cada festividad, siento tu ausencia profunda, pero también tu espíritu que aún me circunda.
Celebrábamos juntos cada momento especial, y esos recuerdos, {NOMBRE_DESTINATARIO}, son mi tesoro celestial.$mNues11e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_11_Porque_Celebrábamos_Juntos_Cada_Momento_Especial.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues12a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite la emoción pura del reencuentro diario, esa bienvenida que transformaba cualquier día difícil.

{NOMBRE_DEDICANTE} entra por la puerta con expresión de felicidad anticipada, agachándose para recibir a {NOMBRE_DESTINATARIO}, una gata que corre hacia él frotándose contra sus piernas con la cola en alto, ronroneando de alegría.$mNues12a$,
  background_details = $mNues12b$La entrada de una casa acogedora, luz cálida de hogar.$mNues12b$,
  magic_effects = $mNues12c$Un destello dorado cálido acompaña el momento del reencuentro. La magia debe sentirse emotiva y completamente integrada dentro de una fotografía realista.$mNues12c$,
  lighting_color = $mNues12d$Cálidos, dorados intensos de bienvenida.$mNues12d$,
  poem_template = $mNues12e$Cada día al volver a casa, sabía lo que me esperaba, tu emoción desbordante, tu alegría desatada.
Corrías hacia la puerta, saltabas de felicidad, como si hubiera estado ausente una eternidad.
Eras mi razón para apurar el paso de regreso, sabiendo que tu amor me esperaba, puro y expreso.
No importaba qué tan difícil fue mi día, tu recibimiento lo transformaba en pura alegría.
Ahora cuando llego a casa, el silencio es profundo, pero siento tu espíritu dándome la bienvenida al mundo.
Eras mi razón para llegar a casa cada día, y ese amor de bienvenida, {NOMBRE_DESTINATARIO}, aún me guía.$mNues12e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_12_Porque_Eras_Mi_Razón_Para_Llegar_a_Casa.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues13a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite compañía silenciosa y sanadora, esa presencia que llenaba los momentos de soledad sin necesidad de palabras.

{NOMBRE_DEDICANTE} está sentada junto a una ventana, expresión reflexiva pero reconfortada, acariciando suavemente a {NOMBRE_DESTINATARIO}, un gato acurrucado junto a ella con la cabeza apoyada en su regazo.$mNues13a$,
  background_details = $mNues13b$Un interior tranquilo con luz tenue de atardecer, ventana con vista exterior.$mNues13b$,
  magic_effects = $mNues13c$Un resplandor dorado suave envuelve el momento de compañía silenciosa. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$mNues13c$,
  lighting_color = $mNues13d$Suaves y apagados, grises, azules y dorados tenues.$mNues13d$,
  poem_template = $mNues13e$En mis días más solitarios, ahí estabas tú, sin juzgar, sin preguntar, solo siendo mi luz.
Tu compañía silenciosa era todo lo que necesitaba, tu presencia a mi lado, mi alma reconfortaba.
No necesitaba explicarte nada, tú simplemente sabías, que en esos momentos difíciles, tu amor me sostenía.
Te acurrucabas junto a mí, tu calor era mi refugio, y en tu mirada encontraba paz, mi mejor diluvio.
Ahora en mi soledad, siento tu compañía aún, como un abrazo invisible, mi guardián común.
Me acompañabas en mis momentos más oscuros, y ese acompañamiento, {NOMBRE_DESTINATARIO}, sigue siendo puro.$mNues13e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_13_Porque_Me_Acompañabas_en_Mis_Momentos_de_Soledad.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues14a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite nostalgia amorosa, el consuelo de los recuerdos que mantienen viva la presencia de quien ya no está físicamente.

{NOMBRE_DEDICANTE} está sentado con un álbum de fotos abierto en las manos, expresión de sonrisa nostálgica y ojos brillantes, tocando las fotos con ternura. Junto a él, de forma etérea y translúcida, aparece {NOMBRE_DESTINATARIO}, una gata que mira a {NOMBRE_DEDICANTE} con amor, como un espíritu presente.$mNues14a$,
  background_details = $mNues14b$Un interior cálido con fotos enmarcadas visibles, luz dorada suave y nostálgica.$mNues14b$,
  magic_effects = $mNues14c$Una luz dorada suave envuelve la silueta translúcida de {NOMBRE_DESTINATARIO}, conectando el pasado con el presente. La magia debe sentirse tierna y completamente integrada dentro de una fotografía realista.$mNues14c$,
  lighting_color = $mNues14d$Cálidos, dorados suaves y nostálgicos.$mNues14d$,
  poem_template = $mNues14e$Cada foto que tengo de ti es un tesoro invaluable, momentos congelados en el tiempo, amor inquebrantable.
Tu sonrisa peluda, tus ojos llenos de vida, cada imagen me recuerda por qué fuiste mi elegida.
Miro esas fotos y revivo cada instante, cada aventura, cada abrazo, cada momento brillante.
Son más que imágenes, son pedazos de mi corazón, recuerdos tangibles de nuestra profunda conexión.
Ahora esas fotos son mi consuelo y mi alegría, me recuerdan que tu amor sigue vivo cada día.
Tus fotos llenan mi corazón de recuerdos hermosos, y en cada una, {NOMBRE_DESTINATARIO}, veo momentos preciosos.$mNues14e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_14_Porque_Tus_Fotos_Llenan_Mi_Corazón_de_Recuerdos.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues15a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra la lección de vivir el presente con plenitud, esa filosofía simple que solo una mascota puede enseñar sin palabras.

{NOMBRE_DEDICANTE} corre con los brazos abiertos, cabello al viento, expresión de alegría pura y libertad. Junto a ella, {NOMBRE_DESTINATARIO}, un gato de paso ágil, corre con energía y expresión de felicidad absoluta.$mNues15a$,
  background_details = $mNues15b$Un campo abierto vibrante con hierba alta y flores silvestres, cielo azul brillante.$mNues15b$,
  magic_effects = $mNues15c$Pequeñas partículas doradas de luz siguen su movimiento libre. La magia debe sentirse vital y completamente integrada dentro de una fotografía realista.$mNues15c$,
  lighting_color = $mNues15d$Vibrantes y saturados, dorados y verdes brillantes.$mNues15d$,
  poem_template = $mNues15e$Vivías cada momento como si fuera el último, con alegría pura, sin pensar en el pasado o futuro vasto.
Me enseñaste que la felicidad está en el ahora, en cada juego, cada caricia, cada hora.
No te preocupabas por mañana ni por ayer, solo disfrutabas el presente con todo tu ser.
Tu forma de vivir era una lección de vida, una filosofía simple pero profundamente sentida.
Ahora intento vivir como tú me enseñaste, disfrutando cada instante, como tú lo demostraste.
Me enseñaste a vivir el presente con pasión, y esa lección, {NOMBRE_DESTINATARIO}, vive en mi corazón.$mNues15e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_15_Porque_Me_Enseñaste_a_Vivir_el_Presente.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues16a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite amor trascendental, la certeza de que un cariño puro puede seguir presente más allá de lo físico.

{NOMBRE_DEDICANTE} está arrodillado con expresión de gratitud profunda, manos sobre el corazón. Rodeándolo con una suave luz dorada, aparece {NOMBRE_DESTINATARIO}, una gata de forma etérea y translúcida, mirando a {NOMBRE_DEDICANTE} con postura protectora y amorosa, como un ángel guardián.$mNues16a$,
  background_details = $mNues16b$Un jardín sereno al atardecer, atmósfera de paz profunda.$mNues16b$,
  magic_effects = $mNues16c$Luz dorada suave envolvente y partículas de luz flotando alrededor de ambos. La magia debe sentirse trascendental y completamente integrada dentro de una fotografía realista.$mNues16c$,
  lighting_color = $mNues16d$Dorados y blancos suaves, luz mística reconfortante.$mNues16d$,
  poem_template = $mNues16e$Tu amor nunca tuvo condiciones ni expectativas, solo pureza absoluta, sin barreras negativas.
No importaba si estaba feliz o triste, rico o pobre, tu amor era constante, tu lealtad era noble.
Me amabas por quien era, sin pedir nada a cambio, tu corazón generoso era mi mayor halago.
Ese amor incondicional es difícil de encontrar, pero tú me lo diste sin dudar ni vacilar.
Ahora que no estás, llevo tu amor conmigo, como un escudo protector, como mi mejor abrigo.
Tu amor era incondicional y puro hasta el final, y ese amor, {NOMBRE_DESTINATARIO}, es mi tesoro celestial.$mNues16e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_16_Porque_Tu_Amor_Era_Incondicional_y_Puro.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues17a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite la comunicación profunda de la quietud compartida, esos silencios que decían más que mil palabras.

{NOMBRE_DEDICANTE} está sentada en un muelle, expresión serena y contemplativa, mirando hacia el horizonte. Junto a ella, {NOMBRE_DESTINATARIO}, un gato sentado en la misma postura tranquila, mira en la misma dirección con expresión sabia.$mNues17a$,
  background_details = $mNues17b$Un muelle junto a un lago al atardecer, agua tranquila y cielo dorado.$mNues17b$,
  magic_effects = $mNues17c$La luz de atardecer dorada envuelve suavemente la escena de quietud compartida. La magia debe sentirse contemplativa y completamente integrada dentro de una fotografía realista.$mNues17c$,
  lighting_color = $mNues17d$Cálidos y suaves, dorados de atardecer sobre el agua.$mNues17d$,
  poem_template = $mNues17e$Compartimos silencios más elocuentes que mil palabras, momentos donde solo estar juntos era la magia que obraba.
No necesitábamos hablar para entendernos, tu presencia y la mía eran suficientes para sostenernos.
En esos silencios encontraba paz y comprensión, tu compañía silenciosa era mi mejor canción.
Simplemente estar juntos, respirando el mismo aire, era todo lo que necesitábamos, nuestro mejor donaire.
Ahora en el silencio, siento tu presencia aún, como si estuvieras ahí, mi compañero común.
Compartimos silencios que decían todo sin decir nada, y esa comunicación, {NOMBRE_DESTINATARIO}, sigue siendo sagrada.$mNues17e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_17_Porque_Compartimos_Silencios_Que_Decían_Todo.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues18a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra el rol de guía silenciosa de una mascota, esas lecciones de amor y lealtad aprendidas sin palabras.

{NOMBRE_DEDICANTE} camina por un sendero con expresión reflexiva y agradecida. Adelante de él, guiando el camino, camina {NOMBRE_DESTINATARIO}, una gata que mira ocasionalmente hacia atrás para asegurarse de que él la sigue, con expresión sabia y protectora.$mNues18a$,
  background_details = $mNues18b$Un sendero de bosque con luz filtrada entre los árboles, rayos de luz visibles.$mNues18b$,
  magic_effects = $mNues18c$Rayos de luz dorada se filtran entre las hojas, iluminando el camino compartido. La magia debe sentirse mística y completamente integrada dentro de una fotografía realista.$mNues18c$,
  lighting_color = $mNues18d$Verdes y dorados místicos, luz filtrada de bosque.$mNues18d$,
  poem_template = $mNues18e$Fuiste más que mi mascota, fuiste mi maestra de vida, me enseñaste sobre amor, lealtad, y entrega compartida.
Cada día a tu lado era una lección valiosa, sobre cómo amar sin límites, de forma generosa.
Tu lealtad inquebrantable era mi ejemplo a seguir, tu capacidad de perdonar, de amar sin medir.
Me enseñaste que el amor verdadero es simple y puro, que la felicidad está en los momentos, no en el futuro.
Ahora llevo tus enseñanzas en cada paso que doy, intentando ser mejor persona, como tú me enseñaste hoy.
Fuiste mi maestra de amor y lealtad sin igual, y esas lecciones, {NOMBRE_DESTINATARIO}, son mi legado ancestral.$mNues18e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_18_Porque_Fuiste_Mi_Maestra_de_Amor_y_Lealtad.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues19a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite la calidez de un hogar construido por el amor de una mascota, esa presencia que transformaba cuatro paredes en un santuario.

{NOMBRE_DEDICANTE} está de pie en la sala, tocando con ternura la camita y los juguetes de {NOMBRE_DESTINATARIO}. Cerca de ella, de forma etérea y suave, aparece {NOMBRE_DESTINATARIO}, un gato que mira a {NOMBRE_DEDICANTE} mientras su presencia translúcida llena el espacio de calidez.$mNues19a$,
  background_details = $mNues19b$Una sala acogedora con la camita y juguetes del gato visibles, luz cálida de lámparas.$mNues19b$,
  magic_effects = $mNues19c$Una luz dorada suave envuelve la presencia etérea de {NOMBRE_DESTINATARIO}, integrándose naturalmente al hogar. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$mNues19c$,
  lighting_color = $mNues19d$Marrones, beige y dorados cálidos de hogar.$mNues19d$,
  poem_template = $mNues19e$Una casa es solo un lugar, cuatro paredes y un techo, pero tú la convertiste en hogar, con tu amor hecho y derecho.
Tu presencia llenaba cada rincón de calidez, tu energía transformaba el espacio con sencillez.
Cada habitación guardaba tus huellas y tu esencia, tu camita, tus juguetes, tu amorosa presencia.
No era solo donde vivíamos, era nuestro santuario, porque tú estabas ahí, haciendo todo extraordinario.
Ahora la casa sigue en pie, pero el hogar te extraña, porque tú eras el corazón que todo lo acompaña.
Hiciste de nuestra casa un hogar verdadero, y ese hogar, {NOMBRE_DESTINATARIO}, vive en mi corazón entero.$mNues19e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_19_Porque_Hiciste_de_Nuestra_Casa_un_Hogar.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $mNues20a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite la promesa de un reencuentro eterno, el amor que trasciende la distancia entre la vida y lo que sigue después.

{NOMBRE_DEDICANTE} está de pie en el inicio de un puente arcoíris etéreo, mano extendida hacia adelante, expresión de amor eterno y esperanza. Al otro extremo del puente, rodeada de luz dorada brillante, aparece {NOMBRE_DESTINATARIO}, una gata con expresión de amor puro, mirando hacia {NOMBRE_DEDICANTE} con espera paciente.$mNues20a$,
  background_details = $mNues20b$Un puente arcoíris vibrante conectando tierra y cielo, nubes doradas y luz celestial.$mNues20b$,
  magic_effects = $mNues20c$Una corriente de luz dorada fluye entre ambos a través del puente, como una promesa de reencuentro. La magia debe sentirse esperanzadora y completamente integrada dentro de una fotografía realista.$mNues20c$,
  lighting_color = $mNues20d$Vibrantes colores de arcoíris y dorados intensos, luz celestial.$mNues20d$,
  poem_template = $mNues20e$La muerte puede separar cuerpos, pero no corazones, nuestro amor trasciende el tiempo, las dimensiones.
Aunque ya no estés físicamente a mi lado, tu amor vive en mí, nunca ha terminado.
Cada latido de mi corazón lleva tu nombre, cada recuerdo tuyo me hace más fuerte, no me derrumbe.
El amor que compartimos no conoce final, es eterno, infinito, celestial.
Hasta que nos volvamos a encontrar algún día, llevaré tu amor conmigo, tu luz, tu alegría.
Nuestro amor es eterno, más allá de la vida terrenal, y ese amor, {NOMBRE_DESTINATARIO}, es mi verdad fundamental.$mNues20e$,
  character_roles = '[{"key":"recipient","count":1},{"key":"dedicator","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas/PLANTILLA_20_Porque_Nuestro_Amor_Es_Eterno.png' AND is_active = true;

COMMIT;
