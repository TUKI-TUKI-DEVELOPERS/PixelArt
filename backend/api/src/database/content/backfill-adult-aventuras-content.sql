-- Aventura Entre Patas Adulto custom-book model/templates.
-- Generated from the validated local DB after the adult pet interior loop.
-- Idempotent: updates existing rows by (model_id, template_preview_key), inserts missing rows.

-- Aventura Entre Patas Adulto

INSERT INTO catalog_books (name, product_type, description, currency, is_active)
SELECT 'Aventura Entre Patas Adulto', 'CUSTOM_BOOK', 'Versión adulta de Aventura Entre Patas para el catálogo PixelArt.', 'PEN', TRUE
WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name = 'Aventura Entre Patas Adulto');

UPDATE catalog_books
SET product_type = 'CUSTOM_BOOK', description = 'Versión adulta de Aventura Entre Patas para el catálogo PixelArt.', currency = 'PEN', is_active = TRUE, updated_at = now()
WHERE name = 'Aventura Entre Patas Adulto';

INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_DELGADA', 13000
FROM catalog_books cb
WHERE cb.name = 'Aventura Entre Patas Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();

INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_GRUESA', 15000
FROM catalog_books cb
WHERE cb.name = 'Aventura Entre Patas Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();

WITH category AS (
  SELECT id FROM personalized_categories WHERE name = 'Libros de Mascotas'
)
INSERT INTO personalized_models (category_id, name, slug, is_active)
SELECT category.id, 'Aventura Entre Patas Adulto', 'aventura-entre-patas-adulto', TRUE
FROM category
ON CONFLICT (category_id, name) DO UPDATE
SET slug = EXCLUDED.slug, is_active = TRUE, updated_at = now();

WITH model AS (
  SELECT m.id
  FROM personalized_models m
  JOIN personalized_categories c ON c.id = m.category_id
  WHERE c.name = 'Libros de Mascotas' AND m.name = 'Aventura Entre Patas Adulto'
), rows(sort_order, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles, is_active) AS (
  VALUES
    (1, 'El explorador de senderos secretos', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_01_el_explorador_de_senderos_secretos.webp', NULL, $scene1$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Bosque húmedo de montaña; Rocky avanza al frente siguiendo huellas luminosas mientras dos adultos leen un mapa y una brújula. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene1$, $bg1$Sendero natural con hojas mojadas, raíces, neblina suave y luz filtrada entre árboles.$bg1$, $fx1$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx1$, $light1$Iluminación cinematográfica adulta con paleta verde bosque, ámbar y sombra cinematográfica. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light1$, $poem1$Para {APODO_DESTINATARIO}, cada sendero empieza al mirar,
tu cola encendida queriendo avanzar.
No importa la ruta ni la dirección,
contigo el camino se vuelve emoción.
Hoy sigo tus huellas con lenta alegría,
tu paso convierte la tarde en guía.
Si el mundo se cansa de tanto correr,
tu forma de andar me enseña a volver.$poem1$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (2, 'El capitán de las tardes de playa', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_02_el_capitan_de_las_tardes_de_playa.webp', NULL, $scene2$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Playa adulta al atardecer; Rocky corre delante de dos adultos caminando por la orilla, con linterna, cuerda náutica y huellas brillantes. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene2$, $bg2$Costa amplia, mar bajo, cielo naranja, manta sobria y farol encendido en la arena.$bg2$, $fx2$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx2$, $light2$Iluminación cinematográfica adulta con paleta turquesa profundo, coral, naranja de atardecer. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light2$, $poem2$Cuando la tarde se empieza a dorar,
tu paso en la arena nos llama a jugar.
No llevas bandera ni gran timón,
pero haces del viento una celebración.
Hoy, {APODO_DESTINATARIO}, volvemos al mismo lugar,
donde cada ola nos sabe esperar.
Si el día fue largo y perdió su color,
tu playa secreta devuelve el humor.$poem2$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (3, 'El detective de huellas felices', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_03_el_detective_de_huellas_felices.webp', NULL, $scene3$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Calle lluviosa elegante; Rocky olfatea huellas luminosas mientras dos adultos lo siguen con paraguas, linterna y libreta. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene3$, $bg3$Café urbano, adoquines mojados, faroles cálidos reflejados en el piso y lluvia fina.$bg3$, $fx3$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx3$, $light3$Iluminación cinematográfica adulta con paleta azul grisáceo, dorado cálido, reflejos de lluvia. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light3$, $poem3$La lluvia dibuja secretos al pasar,
y tú los descubres con solo olfatear.
Cada pisada parece contar
un pequeño misterio listo para jugar.
Si falta una risa o sobra preocupación,
tu hocico encuentra la mejor solución.
Ningún día gris se queda aquí,
cuando aparece mi detective {APODO_DESTINATARIO}.$poem3$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (4, 'El guardián del campamento', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_04_el_guardian_del_campamento.webp', NULL, $scene4$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Campamento nocturno adulto; Rocky sentado alerta junto a una fogata, dos adultos toman café alrededor, montañas y estrellas al fondo. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene4$, $bg4$Carpa sobria, manta de lana, termo, lámpara de camping, pinos y cielo estrellado.$bg4$, $fx4$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx4$, $light4$Iluminación cinematográfica adulta con paleta azul noche, naranja fogata, plata lunar. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light4$, $poem4$Cuando la noche se abre alrededor,
tu calma enciende pequeño valor.
No hace falta hablar para proteger:
tu mirada sabe quedarse y creer.
Tu amor, {APODO_DESTINATARIO}, sabe acompañar,
en rutas de estrellas y viento al pasar.
Si afuera la vida se vuelve feroz,
tu fuego en nosotros levanta su voz.$poem4$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (5, 'La ruta que elegimos juntos', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_05_la_ruta_que_elegimos_juntos.webp', NULL, $scene5$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Carretera panorámica; una persona adulta abre la puerta de una camioneta vintage mientras Rocky espera listo para subir, protagonista y sonriente. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene5$, $bg5$Mirador andino, maleta de lona, termo, mapa doblado sobre el capó y horizonte despejado.$bg5$, $fx5$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx5$, $light5$Iluminación cinematográfica adulta con paleta azul mineral, beige arena y cobre de tarde. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light5$, $poem5$No hace falta saber dónde llegar,
si vienes conmigo listo para avanzar.
Tu mirada pregunta, mi mano responde,
y el día se abre por cualquier horizonte.
{APODO_DESTINATARIO}, contigo la ruta es señal,
un mapa sencillo hacia algo especial.
Si el mundo se vuelve difícil de leer,
tu paso me enseña por dónde volver.$poem5$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (6, 'Tres huellas en la ciudad', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_06_tres_huellas_en_la_ciudad.webp', NULL, $scene6$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Tres personas adultas cruzan una avenida tranquila de noche con Rocky al centro, todos con rostros visibles, como equipo urbano de aventuras cotidianas. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene6$, $bg6$Ciudad moderna con cruces peatonales brillantes, letreros cálidos, cafeterías y reflejos sobre asfalto limpio.$bg6$, $fx6$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx6$, $light6$Iluminación cinematográfica adulta con paleta azul petróleo, neón suave y dorado urbano. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light6$, $poem6$La ciudad se enciende, empieza a sonar,
y tú vas al centro marcando el compás.
Tres pasos humanos siguen tu señal,
la noche se vuelve paseo especial.
{APODO_DESTINATARIO}, pequeño faro de buen humor,
haces de cada esquina un lugar mejor.
Si el ruido nos quiere hacer olvidar,
tu huella nos vuelve a encontrar.$poem6$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (7, 'El mapa de los domingos', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_07_el_mapa_de_los_domingos.webp', NULL, $scene7$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Una persona adulta y Rocky revisan un mapa sobre una mesa de picnic exterior; Rocky apoya una pata cerca de la próxima ruta. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene7$, $bg7$Parque amplio, bicicleta apoyada, canasta de picnic sobria, árboles altos y luz de domingo.$bg7$, $fx7$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx7$, $light7$Iluminación cinematográfica adulta con paleta verde oliva, crema y amarillo suave. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light7$, $poem7$Hay mapas que no se aprenden mirando,
se entienden contigo saliendo andando.
Una pata decide la dirección,
y el domingo despierta nueva emoción.
{APODO_DESTINATARIO}, mi brújula de libertad,
me recuerdas mirar con curiosidad.
Si la semana pesó más de lo normal,
tu mapa sencillo me devuelve al final.$poem7$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (8, 'El copiloto de las montañas', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_08_el_copiloto_de_las_montanas.webp', NULL, $scene8$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Dos personas adultas y Rocky contemplan una cadena de montañas desde un mirador; Rocky en primer plano con pañuelo sobrio. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene8$, $bg8$Mirador de piedra, viento suave, mochila técnica, nubes bajas y valle profundo.$bg8$, $fx8$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx8$, $light8$Iluminación cinematográfica adulta con paleta gris montaña, azul frío y naranja amanecer. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light8$, $poem8$Sube la altura, respira el lugar,
tu cola me invita a no abandonar.
No dices palabra, no das explicación,
pero llenas de calma cada decisión.
{APODO_DESTINATARIO}, copiloto de cielo y sendero,
contigo el esfuerzo se vuelve ligero.
Si falta energía para continuar,
tu forma de mirar me ayuda a llegar.$poem8$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (9, 'El café donde siempre volvemos', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_09_el_cafe_donde_siempre_volvemos.webp', NULL, $scene9$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Una persona adulta en terraza de café con Rocky descansando junto a la silla, ambos mirando hacia la calle con calma feliz. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene9$, $bg9$Café europeo sobrio, mesa pequeña, taza humeante, plantas, vitrales y luz de mañana.$bg9$, $fx9$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx9$, $light9$Iluminación cinematográfica adulta con paleta madera oscura, crema, verde salvia. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light9$, $poem9$Hay días que piden bajar la velocidad,
sentarse contigo y mirar la ciudad.
Tu calma se queda junto a mi café,
como si supieras todo sin saber.
{APODO_DESTINATARIO}, compañero de pausa y andar,
hasta el silencio se vuelve hogar.
Si afuera la prisa me quiere arrastrar,
tu sueño tranquilo me enseña a estar.$poem9$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (10, 'La patrulla de las luces', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_10_la_patrulla_de_las_luces.webp', NULL, $scene10$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Tres personas adultas caminan con Rocky por un malecón nocturno; Rocky guía con una correa luminosa muy sutil y postura alegre. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene10$, $bg10$Malecón junto al agua, faroles en línea, reflejos, bancas de madera y cielo azul profundo.$bg10$, $fx10$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx10$, $light10$Iluminación cinematográfica adulta con paleta azul noche, oro viejo y blanco lunar. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light10$, $poem10$Cuando las luces empiezan a arder,
sales primero queriendo entender.
Tres voces te siguen con buen corazón,
y el paseo se vuelve pequeña misión.
{APODO_DESTINATARIO}, guardián de la ruta final,
haces segura la noche normal.
Si alguna sombra nos quiere alcanzar,
tu paso contento nos sabe cuidar.$poem10$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (11, 'El buscador de tesoros simples', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_11_el_buscador_de_tesoros_simples.webp', NULL, $scene11$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Dos personas adultas y Rocky en un mercado de pulgas al aire libre; Rocky descubre una caja de objetos antiguos con una pata curiosa. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene11$, $bg11$Puestos de madera, cámaras antiguas, brújulas, libros usados, toldos de lona y luz cálida.$bg11$, $fx11$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx11$, $light11$Iluminación cinematográfica adulta con paleta ocre, terracota y verde botella. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light11$, $poem11$No todo tesoro se esconde en el mar,
a veces espera en un viejo lugar.
Tú lo descubres con pura emoción,
nariz de aventura, mirada de sol.
{APODO_DESTINATARIO}, experto en hallar claridad,
ves magia sencilla donde otros no están.
Si busco motivos para sonreír,
tu pata me muestra por dónde seguir.$poem11$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (12, 'La carrera contra el viento', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_12_la_carrera_contra_el_viento.webp', NULL, $scene12$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Una persona adulta corre por un sendero costero mientras Rocky corre delante con alegría, movimiento fuerte y rostros visibles. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene12$, $bg12$Acantilado seguro, mar al fondo, pasto movido por viento, zapatillas, reloj deportivo y cielo amplio.$bg12$, $fx12$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx12$, $light12$Iluminación cinematográfica adulta con paleta azul océano, blanco espuma, verde seco. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light12$, $poem12$El viento pregunta quién va a ganar,
y tú ya respondes saliendo a volar.
No corres por premio ni por competir,
corres porque el mundo te invita a vivir.
{APODO_DESTINATARIO}, alegría que sabe empujar,
tu ritmo me ayuda a respirar.
Si el cansancio me quiere vencer,
tu risa peluda me enseña a correr.$poem12$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (13, 'El picnic de las grandes historias', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_13_el_picnic_de_las_grandes_historias.webp', NULL, $scene13$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Tres personas adultas sentadas sobre una manta en parque amplio, no rígidas ni posadas; Rocky en primer plano roba la atención con expresión divertida. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene13$, $bg13$Parque urbano maduro, manta de lino, frutas, libro abierto, cámara instantánea y árboles de sombra.$bg13$, $fx13$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx13$, $light13$Iluminación cinematográfica adulta con paleta verde parque, rojo suave y crema. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light13$, $poem13$Entre historias, fruta y conversación,
tu hocico aparece robando atención.
No necesitas saber qué contar,
te basta mirarnos para hacer reír más.
{APODO_DESTINATARIO}, maestro del buen compartir,
contigo un picnic aprende a latir.
Si la tarde se quiere dormir,
tu gesto travieso la vuelve a encender aquí.$poem13$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (14, 'El faro de los días largos', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_14_el_faro_de_los_dias_largos.webp', NULL, $scene14$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Una persona adulta vuelve a casa al anochecer; Rocky la recibe en una entrada iluminada, protagonista, grande y emotivo. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene14$, $bg14$Puerta moderna cálida, paraguas, abrigo, luz interior dorada y calle tranquila con lluvia fina.$bg14$, $fx14$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx14$, $light14$Iluminación cinematográfica adulta con paleta azul lluvia, ámbar hogar y gris suave. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light14$, $poem14$Cuando el día se hizo demasiado largo,
tu espera convierte el cansancio en abrazo.
No preguntas nada, sabes mirar,
como si supieras curar al llegar.
{APODO_DESTINATARIO}, faro pequeño de mi habitación,
enciendes la casa con pura emoción.
Si afuera la vida pesa al volver,
tu bienvenida me enseña a creer.$poem14$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (15, 'El guardián de la biblioteca', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_15_el_guardian_de_la_biblioteca.webp', NULL, $scene15$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Dos personas adultas en biblioteca antigua con Rocky acostado entre libros, alerta y sereno, con una huella luminosa en el piso. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene15$, $bg15$Biblioteca de madera, lámparas verdes, escaleras, libros antiguos y polvo dorado en luz lateral.$bg15$, $fx15$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx15$, $light15$Iluminación cinematográfica adulta con paleta marrón nogal, verde biblioteca y oro suave. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light15$, $poem15$Entre páginas viejas y olor a papel,
te quedas atento cuidando mi fe.
Cada historia parece empezar
cuando tu mirada decide escuchar.
{APODO_DESTINATARIO}, guardián de relatos sin fin,
conviertes silencio en lugar feliz.
Si pierdo una frase para continuar,
tu calma me ayuda a volver a empezar.$poem15$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (16, 'La brújula de los días nuevos', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_16_la_brujula_de_los_dias_nuevos.webp', NULL, $scene16$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Tres personas adultas y Rocky preparan mochilas en un muelle al amanecer; Rocky al centro con postura de guía. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene16$, $bg16$Muelle de madera, lago sereno, termos metálicos, remos, mochilas y niebla baja.$bg16$, $fx16$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx16$, $light16$Iluminación cinematográfica adulta con paleta azul lago, cobre amanecer y verde pino. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light16$, $poem16$Amanece lento sobre el lugar,
y tú ya sabes por dónde empezar.
Tres manos preparan la nueva estación,
tu cola confirma la dirección.
{APODO_DESTINATARIO}, brújula de días por abrir,
contigo es más fácil salir y vivir.
Si el futuro parece difícil de ver,
tu paso primero me invita a creer.$poem16$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (17, 'El taller de trucos imposibles', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_17_el_taller_de_trucos_imposibles.webp', NULL, $scene17$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Una persona adulta entrena trucos con Rocky en un taller creativo; Rocky salta atravesando un aro bajo con expresión feliz. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene17$, $bg17$Taller luminoso con madera, herramientas seguras, aro, premios de entrenamiento, plantas y luz lateral.$bg17$, $fx17$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx17$, $light17$Iluminación cinematográfica adulta con paleta madera clara, azul acero y amarillo cálido. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light17$, $poem17$Una vuelta, una pata, un salto audaz,
contigo lo imposible se ríe un poco más.
No importa si sale perfecto o no,
tu intento ya llena de gracia el salón.
{APODO_DESTINATARIO}, inventor de torpes hazañas,
vuelves brillante cualquier mañana.
Si la vida exige hacerlo todo bien,
tu juego me enseña a probar otra vez.$poem17$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (18, 'La noche de cine bajo estrellas', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_18_la_noche_de_cine_bajo_estrellas.webp', NULL, $scene18$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Dos personas adultas ven cine al aire libre con Rocky entre mantas; los adultos están sentados de costado en vista tres cuartos hacia cámara, rostros claramente visibles iluminados por el proyector, con la pantalla visible detrás en segundo plano. Rocky queda protagonista en primer plano. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene18$, $bg18$Patio o terraza con proyector, pantalla blanca al fondo, mantas, luces colgantes y cielo con estrellas.$bg18$, $fx18$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx18$, $light18$Iluminación cinematográfica adulta con paleta azul profundo, blanco proyector y naranja cálido. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light18$, $poem18$La pantalla brilla, la noche se va,
y tú eliges sitio para acompañar.
No entiendes la trama ni el final,
pero haces la escena más especial.
{APODO_DESTINATARIO}, función de ternura real,
tu sombra en la manta nos sabe cuidar.
Si el mundo parece ponerse gris,
tu noche de cine me deja feliz.$poem18$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (19, 'El jardín de las huellas brillantes', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_19_el_jardin_de_las_huellas_brillantes.webp', NULL, $scene19$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Tres personas adultas y Rocky atraviesan un jardín botánico al atardecer; huellas doradas discretas marcan el camino. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene19$, $bg19$Invernadero de cristal, plantas grandes, senderos húmedos, bancos de hierro y luz verde dorada.$bg19$, $fx19$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx19$, $light19$Iluminación cinematográfica adulta con paleta verde botánico, oro tenue y cristal. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light19$, $poem19$En cada hoja parece latir
una pequeña ruta lista para seguir.
Tú vas dejando señales de luz,
y el jardín entero camina según tú.
{APODO_DESTINATARIO}, jardinero de felicidad,
haces florecer nuestra complicidad.
Si faltan razones para celebrar,
tus huellas brillantes nos vuelven a juntar.$poem19$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (20, 'Aventuras que siempre vuelven', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_20_aventuras_que_siempre_vuelven.webp', NULL, $scene20$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Escena final: dos personas adultas y Rocky miran un álbum de fotos de viajes en una terraza nocturna; Rocky grande y cercano, emocional. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene20$, $bg20$Terraza con mesa baja, álbum abierto, luces cálidas, ciudad lejana y cielo despejado.$bg20$, $fx20$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx20$, $light20$Iluminación cinematográfica adulta con paleta azul medianoche, dorado íntimo y crema. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light20$, $poem20$Algunas aventuras terminan por hoy,
pero dejan caminos en donde voy.
Tu nombre se queda en cada estación,
huella pequeña, enorme emoción.
{APODO_DESTINATARIO}, compañero de tanto vivir,
contigo siempre hay algo por descubrir.
Si cierro el libro para descansar,
mañana tus patas lo vuelven a empezar.$poem20$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE)
)
UPDATE personalized_templates t
SET name = rows.name,
    gender_direction = rows.gender_direction,
    scene_visual = rows.scene_visual,
    background_details = rows.background_details,
    magic_effects = rows.magic_effects,
    lighting_color = rows.lighting_color,
    poem_template = rows.poem_template,
    character_roles = rows.character_roles,
    is_active = rows.is_active,
    updated_at = now()
FROM model, rows
WHERE t.model_id = model.id AND t.template_preview_key = rows.template_preview_key;

WITH model AS (
  SELECT m.id
  FROM personalized_models m
  JOIN personalized_categories c ON c.id = m.category_id
  WHERE c.name = 'Libros de Mascotas' AND m.name = 'Aventura Entre Patas Adulto'
), rows(sort_order, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles, is_active) AS (
  VALUES
    (1, 'El explorador de senderos secretos', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_01_el_explorador_de_senderos_secretos.webp', NULL, $scene1$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Bosque húmedo de montaña; Rocky avanza al frente siguiendo huellas luminosas mientras dos adultos leen un mapa y una brújula. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene1$, $bg1$Sendero natural con hojas mojadas, raíces, neblina suave y luz filtrada entre árboles.$bg1$, $fx1$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx1$, $light1$Iluminación cinematográfica adulta con paleta verde bosque, ámbar y sombra cinematográfica. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light1$, $poem1$Para {APODO_DESTINATARIO}, cada sendero empieza al mirar,
tu cola encendida queriendo avanzar.
No importa la ruta ni la dirección,
contigo el camino se vuelve emoción.
Hoy sigo tus huellas con lenta alegría,
tu paso convierte la tarde en guía.
Si el mundo se cansa de tanto correr,
tu forma de andar me enseña a volver.$poem1$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (2, 'El capitán de las tardes de playa', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_02_el_capitan_de_las_tardes_de_playa.webp', NULL, $scene2$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Playa adulta al atardecer; Rocky corre delante de dos adultos caminando por la orilla, con linterna, cuerda náutica y huellas brillantes. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene2$, $bg2$Costa amplia, mar bajo, cielo naranja, manta sobria y farol encendido en la arena.$bg2$, $fx2$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx2$, $light2$Iluminación cinematográfica adulta con paleta turquesa profundo, coral, naranja de atardecer. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light2$, $poem2$Cuando la tarde se empieza a dorar,
tu paso en la arena nos llama a jugar.
No llevas bandera ni gran timón,
pero haces del viento una celebración.
Hoy, {APODO_DESTINATARIO}, volvemos al mismo lugar,
donde cada ola nos sabe esperar.
Si el día fue largo y perdió su color,
tu playa secreta devuelve el humor.$poem2$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (3, 'El detective de huellas felices', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_03_el_detective_de_huellas_felices.webp', NULL, $scene3$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Calle lluviosa elegante; Rocky olfatea huellas luminosas mientras dos adultos lo siguen con paraguas, linterna y libreta. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene3$, $bg3$Café urbano, adoquines mojados, faroles cálidos reflejados en el piso y lluvia fina.$bg3$, $fx3$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx3$, $light3$Iluminación cinematográfica adulta con paleta azul grisáceo, dorado cálido, reflejos de lluvia. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light3$, $poem3$La lluvia dibuja secretos al pasar,
y tú los descubres con solo olfatear.
Cada pisada parece contar
un pequeño misterio listo para jugar.
Si falta una risa o sobra preocupación,
tu hocico encuentra la mejor solución.
Ningún día gris se queda aquí,
cuando aparece mi detective {APODO_DESTINATARIO}.$poem3$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (4, 'El guardián del campamento', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_04_el_guardian_del_campamento.webp', NULL, $scene4$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Campamento nocturno adulto; Rocky sentado alerta junto a una fogata, dos adultos toman café alrededor, montañas y estrellas al fondo. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene4$, $bg4$Carpa sobria, manta de lana, termo, lámpara de camping, pinos y cielo estrellado.$bg4$, $fx4$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx4$, $light4$Iluminación cinematográfica adulta con paleta azul noche, naranja fogata, plata lunar. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light4$, $poem4$Cuando la noche se abre alrededor,
tu calma enciende pequeño valor.
No hace falta hablar para proteger:
tu mirada sabe quedarse y creer.
Tu amor, {APODO_DESTINATARIO}, sabe acompañar,
en rutas de estrellas y viento al pasar.
Si afuera la vida se vuelve feroz,
tu fuego en nosotros levanta su voz.$poem4$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (5, 'La ruta que elegimos juntos', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_05_la_ruta_que_elegimos_juntos.webp', NULL, $scene5$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Carretera panorámica; una persona adulta abre la puerta de una camioneta vintage mientras Rocky espera listo para subir, protagonista y sonriente. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene5$, $bg5$Mirador andino, maleta de lona, termo, mapa doblado sobre el capó y horizonte despejado.$bg5$, $fx5$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx5$, $light5$Iluminación cinematográfica adulta con paleta azul mineral, beige arena y cobre de tarde. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light5$, $poem5$No hace falta saber dónde llegar,
si vienes conmigo listo para avanzar.
Tu mirada pregunta, mi mano responde,
y el día se abre por cualquier horizonte.
{APODO_DESTINATARIO}, contigo la ruta es señal,
un mapa sencillo hacia algo especial.
Si el mundo se vuelve difícil de leer,
tu paso me enseña por dónde volver.$poem5$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (6, 'Tres huellas en la ciudad', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_06_tres_huellas_en_la_ciudad.webp', NULL, $scene6$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Tres personas adultas cruzan una avenida tranquila de noche con Rocky al centro, todos con rostros visibles, como equipo urbano de aventuras cotidianas. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene6$, $bg6$Ciudad moderna con cruces peatonales brillantes, letreros cálidos, cafeterías y reflejos sobre asfalto limpio.$bg6$, $fx6$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx6$, $light6$Iluminación cinematográfica adulta con paleta azul petróleo, neón suave y dorado urbano. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light6$, $poem6$La ciudad se enciende, empieza a sonar,
y tú vas al centro marcando el compás.
Tres pasos humanos siguen tu señal,
la noche se vuelve paseo especial.
{APODO_DESTINATARIO}, pequeño faro de buen humor,
haces de cada esquina un lugar mejor.
Si el ruido nos quiere hacer olvidar,
tu huella nos vuelve a encontrar.$poem6$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (7, 'El mapa de los domingos', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_07_el_mapa_de_los_domingos.webp', NULL, $scene7$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Una persona adulta y Rocky revisan un mapa sobre una mesa de picnic exterior; Rocky apoya una pata cerca de la próxima ruta. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene7$, $bg7$Parque amplio, bicicleta apoyada, canasta de picnic sobria, árboles altos y luz de domingo.$bg7$, $fx7$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx7$, $light7$Iluminación cinematográfica adulta con paleta verde oliva, crema y amarillo suave. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light7$, $poem7$Hay mapas que no se aprenden mirando,
se entienden contigo saliendo andando.
Una pata decide la dirección,
y el domingo despierta nueva emoción.
{APODO_DESTINATARIO}, mi brújula de libertad,
me recuerdas mirar con curiosidad.
Si la semana pesó más de lo normal,
tu mapa sencillo me devuelve al final.$poem7$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (8, 'El copiloto de las montañas', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_08_el_copiloto_de_las_montanas.webp', NULL, $scene8$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Dos personas adultas y Rocky contemplan una cadena de montañas desde un mirador; Rocky en primer plano con pañuelo sobrio. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene8$, $bg8$Mirador de piedra, viento suave, mochila técnica, nubes bajas y valle profundo.$bg8$, $fx8$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx8$, $light8$Iluminación cinematográfica adulta con paleta gris montaña, azul frío y naranja amanecer. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light8$, $poem8$Sube la altura, respira el lugar,
tu cola me invita a no abandonar.
No dices palabra, no das explicación,
pero llenas de calma cada decisión.
{APODO_DESTINATARIO}, copiloto de cielo y sendero,
contigo el esfuerzo se vuelve ligero.
Si falta energía para continuar,
tu forma de mirar me ayuda a llegar.$poem8$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (9, 'El café donde siempre volvemos', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_09_el_cafe_donde_siempre_volvemos.webp', NULL, $scene9$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Una persona adulta en terraza de café con Rocky descansando junto a la silla, ambos mirando hacia la calle con calma feliz. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene9$, $bg9$Café europeo sobrio, mesa pequeña, taza humeante, plantas, vitrales y luz de mañana.$bg9$, $fx9$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx9$, $light9$Iluminación cinematográfica adulta con paleta madera oscura, crema, verde salvia. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light9$, $poem9$Hay días que piden bajar la velocidad,
sentarse contigo y mirar la ciudad.
Tu calma se queda junto a mi café,
como si supieras todo sin saber.
{APODO_DESTINATARIO}, compañero de pausa y andar,
hasta el silencio se vuelve hogar.
Si afuera la prisa me quiere arrastrar,
tu sueño tranquilo me enseña a estar.$poem9$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (10, 'La patrulla de las luces', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_10_la_patrulla_de_las_luces.webp', NULL, $scene10$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Tres personas adultas caminan con Rocky por un malecón nocturno; Rocky guía con una correa luminosa muy sutil y postura alegre. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene10$, $bg10$Malecón junto al agua, faroles en línea, reflejos, bancas de madera y cielo azul profundo.$bg10$, $fx10$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx10$, $light10$Iluminación cinematográfica adulta con paleta azul noche, oro viejo y blanco lunar. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light10$, $poem10$Cuando las luces empiezan a arder,
sales primero queriendo entender.
Tres voces te siguen con buen corazón,
y el paseo se vuelve pequeña misión.
{APODO_DESTINATARIO}, guardián de la ruta final,
haces segura la noche normal.
Si alguna sombra nos quiere alcanzar,
tu paso contento nos sabe cuidar.$poem10$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (11, 'El buscador de tesoros simples', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_11_el_buscador_de_tesoros_simples.webp', NULL, $scene11$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Dos personas adultas y Rocky en un mercado de pulgas al aire libre; Rocky descubre una caja de objetos antiguos con una pata curiosa. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene11$, $bg11$Puestos de madera, cámaras antiguas, brújulas, libros usados, toldos de lona y luz cálida.$bg11$, $fx11$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx11$, $light11$Iluminación cinematográfica adulta con paleta ocre, terracota y verde botella. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light11$, $poem11$No todo tesoro se esconde en el mar,
a veces espera en un viejo lugar.
Tú lo descubres con pura emoción,
nariz de aventura, mirada de sol.
{APODO_DESTINATARIO}, experto en hallar claridad,
ves magia sencilla donde otros no están.
Si busco motivos para sonreír,
tu pata me muestra por dónde seguir.$poem11$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (12, 'La carrera contra el viento', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_12_la_carrera_contra_el_viento.webp', NULL, $scene12$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Una persona adulta corre por un sendero costero mientras Rocky corre delante con alegría, movimiento fuerte y rostros visibles. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene12$, $bg12$Acantilado seguro, mar al fondo, pasto movido por viento, zapatillas, reloj deportivo y cielo amplio.$bg12$, $fx12$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx12$, $light12$Iluminación cinematográfica adulta con paleta azul océano, blanco espuma, verde seco. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light12$, $poem12$El viento pregunta quién va a ganar,
y tú ya respondes saliendo a volar.
No corres por premio ni por competir,
corres porque el mundo te invita a vivir.
{APODO_DESTINATARIO}, alegría que sabe empujar,
tu ritmo me ayuda a respirar.
Si el cansancio me quiere vencer,
tu risa peluda me enseña a correr.$poem12$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (13, 'El picnic de las grandes historias', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_13_el_picnic_de_las_grandes_historias.webp', NULL, $scene13$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Tres personas adultas sentadas sobre una manta en parque amplio, no rígidas ni posadas; Rocky en primer plano roba la atención con expresión divertida. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene13$, $bg13$Parque urbano maduro, manta de lino, frutas, libro abierto, cámara instantánea y árboles de sombra.$bg13$, $fx13$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx13$, $light13$Iluminación cinematográfica adulta con paleta verde parque, rojo suave y crema. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light13$, $poem13$Entre historias, fruta y conversación,
tu hocico aparece robando atención.
No necesitas saber qué contar,
te basta mirarnos para hacer reír más.
{APODO_DESTINATARIO}, maestro del buen compartir,
contigo un picnic aprende a latir.
Si la tarde se quiere dormir,
tu gesto travieso la vuelve a encender aquí.$poem13$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (14, 'El faro de los días largos', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_14_el_faro_de_los_dias_largos.webp', NULL, $scene14$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Una persona adulta vuelve a casa al anochecer; Rocky la recibe en una entrada iluminada, protagonista, grande y emotivo. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene14$, $bg14$Puerta moderna cálida, paraguas, abrigo, luz interior dorada y calle tranquila con lluvia fina.$bg14$, $fx14$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx14$, $light14$Iluminación cinematográfica adulta con paleta azul lluvia, ámbar hogar y gris suave. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light14$, $poem14$Cuando el día se hizo demasiado largo,
tu espera convierte el cansancio en abrazo.
No preguntas nada, sabes mirar,
como si supieras curar al llegar.
{APODO_DESTINATARIO}, faro pequeño de mi habitación,
enciendes la casa con pura emoción.
Si afuera la vida pesa al volver,
tu bienvenida me enseña a creer.$poem14$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (15, 'El guardián de la biblioteca', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_15_el_guardian_de_la_biblioteca.webp', NULL, $scene15$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Dos personas adultas en biblioteca antigua con Rocky acostado entre libros, alerta y sereno, con una huella luminosa en el piso. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene15$, $bg15$Biblioteca de madera, lámparas verdes, escaleras, libros antiguos y polvo dorado en luz lateral.$bg15$, $fx15$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx15$, $light15$Iluminación cinematográfica adulta con paleta marrón nogal, verde biblioteca y oro suave. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light15$, $poem15$Entre páginas viejas y olor a papel,
te quedas atento cuidando mi fe.
Cada historia parece empezar
cuando tu mirada decide escuchar.
{APODO_DESTINATARIO}, guardián de relatos sin fin,
conviertes silencio en lugar feliz.
Si pierdo una frase para continuar,
tu calma me ayuda a volver a empezar.$poem15$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (16, 'La brújula de los días nuevos', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_16_la_brujula_de_los_dias_nuevos.webp', NULL, $scene16$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Tres personas adultas y Rocky preparan mochilas en un muelle al amanecer; Rocky al centro con postura de guía. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene16$, $bg16$Muelle de madera, lago sereno, termos metálicos, remos, mochilas y niebla baja.$bg16$, $fx16$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx16$, $light16$Iluminación cinematográfica adulta con paleta azul lago, cobre amanecer y verde pino. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light16$, $poem16$Amanece lento sobre el lugar,
y tú ya sabes por dónde empezar.
Tres manos preparan la nueva estación,
tu cola confirma la dirección.
{APODO_DESTINATARIO}, brújula de días por abrir,
contigo es más fácil salir y vivir.
Si el futuro parece difícil de ver,
tu paso primero me invita a creer.$poem16$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (17, 'El taller de trucos imposibles', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_17_el_taller_de_trucos_imposibles.webp', NULL, $scene17$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Una persona adulta entrena trucos con Rocky en un taller creativo; Rocky salta atravesando un aro bajo con expresión feliz. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene17$, $bg17$Taller luminoso con madera, herramientas seguras, aro, premios de entrenamiento, plantas y luz lateral.$bg17$, $fx17$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx17$, $light17$Iluminación cinematográfica adulta con paleta madera clara, azul acero y amarillo cálido. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light17$, $poem17$Una vuelta, una pata, un salto audaz,
contigo lo imposible se ríe un poco más.
No importa si sale perfecto o no,
tu intento ya llena de gracia el salón.
{APODO_DESTINATARIO}, inventor de torpes hazañas,
vuelves brillante cualquier mañana.
Si la vida exige hacerlo todo bien,
tu juego me enseña a probar otra vez.$poem17$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (18, 'La noche de cine bajo estrellas', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_18_la_noche_de_cine_bajo_estrellas.webp', NULL, $scene18$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Dos personas adultas ven cine al aire libre con Rocky entre mantas; los adultos están sentados de costado en vista tres cuartos hacia cámara, rostros claramente visibles iluminados por el proyector, con la pantalla visible detrás en segundo plano. Rocky queda protagonista en primer plano. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene18$, $bg18$Patio o terraza con proyector, pantalla blanca al fondo, mantas, luces colgantes y cielo con estrellas.$bg18$, $fx18$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx18$, $light18$Iluminación cinematográfica adulta con paleta azul profundo, blanco proyector y naranja cálido. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light18$, $poem18$La pantalla brilla, la noche se va,
y tú eliges sitio para acompañar.
No entiendes la trama ni el final,
pero haces la escena más especial.
{APODO_DESTINATARIO}, función de ternura real,
tu sombra en la manta nos sabe cuidar.
Si el mundo parece ponerse gris,
tu noche de cine me deja feliz.$poem18$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (19, 'El jardín de las huellas brillantes', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_19_el_jardin_de_las_huellas_brillantes.webp', NULL, $scene19$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Tres personas adultas y Rocky atraviesan un jardín botánico al atardecer; huellas doradas discretas marcan el camino. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene19$, $bg19$Invernadero de cristal, plantas grandes, senderos húmedos, bancos de hierro y luz verde dorada.$bg19$, $fx19$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx19$, $light19$Iluminación cinematográfica adulta con paleta verde botánico, oro tenue y cristal. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light19$, $poem19$En cada hoja parece latir
una pequeña ruta lista para seguir.
Tú vas dejando señales de luz,
y el jardín entero camina según tú.
{APODO_DESTINATARIO}, jardinero de felicidad,
haces florecer nuestra complicidad.
Si faltan razones para celebrar,
tus huellas brillantes nos vuelven a juntar.$poem19$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE),
    (20, 'Aventuras que siempre vuelven', 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_20_aventuras_que_siempre_vuelven.webp', NULL, $scene20$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Escena final: dos personas adultas y Rocky miran un álbum de fotos de viajes en una terraza nocturna; Rocky grande y cercano, emocional. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$scene20$, $bg20$Terraza con mesa baja, álbum abierto, luces cálidas, ciudad lejana y cielo despejado.$bg20$, $fx20$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$fx20$, $light20$Iluminación cinematográfica adulta con paleta azul medianoche, dorado íntimo y crema. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$light20$, $poem20$Algunas aventuras terminan por hoy,
pero dejan caminos en donde voy.
Tu nombre se queda en cada estación,
huella pequeña, enorme emoción.
{APODO_DESTINATARIO}, compañero de tanto vivir,
contigo siempre hay algo por descubrir.
Si cierro el libro para descansar,
mañana tus patas lo vuelven a empezar.$poem20$, '[{"key":"pet","count":1},{"key":"owners","max":3}]'::jsonb, TRUE)
)
INSERT INTO personalized_templates (
  model_id, name, template_preview_key, gender_direction,
  scene_visual, background_details, magic_effects, lighting_color,
  poem_template, character_roles, is_active
)
SELECT model.id, rows.name, rows.template_preview_key, rows.gender_direction,
       rows.scene_visual, rows.background_details, rows.magic_effects, rows.lighting_color,
       rows.poem_template, rows.character_roles, rows.is_active
FROM model, rows
WHERE NOT EXISTS (
  SELECT 1 FROM personalized_templates t
  WHERE t.model_id = model.id AND t.template_preview_key = rows.template_preview_key
);
