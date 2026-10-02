
BEGIN;

WITH cat AS (
  SELECT id FROM personalized_categories WHERE name = $q$Libros de Mascotas$q$
), inserted_model AS (
  INSERT INTO personalized_models (category_id, name, slug, is_active)
  SELECT id, $q$Aventura Entre Patas Adulto$q$, $q$aventura-entre-patas-adulto$q$, true FROM cat
  ON CONFLICT (category_id, name) DO UPDATE SET slug = EXCLUDED.slug, is_active = true, updated_at = now()
  RETURNING id
), model_row AS (
  SELECT id FROM inserted_model
  UNION ALL
  SELECT id FROM personalized_models WHERE name = $q$Aventura Entre Patas Adulto$q$ AND slug = $q$aventura-entre-patas-adulto$q$
  LIMIT 1
), inserted_catalog AS (
  INSERT INTO catalog_books (name, product_type, description, currency, is_active)
  SELECT $q$Aventura Entre Patas Adulto$q$, 'CUSTOM_BOOK', $q$Versión adulta del libro de mascotas para celebrar aventuras reales con la mascota como protagonista.$q$, 'PEN', true
  WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name = $q$Aventura Entre Patas Adulto$q$)
  RETURNING id
), catalog_row AS (
  SELECT id FROM inserted_catalog
  UNION ALL
  SELECT id FROM catalog_books WHERE name = $q$Aventura Entre Patas Adulto$q$
  LIMIT 1
)
INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT id, 'TAPA_DELGADA', 13000 FROM catalog_row
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();

WITH catalog_row AS (SELECT id FROM catalog_books WHERE name = $q$Aventura Entre Patas Adulto$q$ LIMIT 1)
INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT id, 'TAPA_GRUESA', 15000 FROM catalog_row
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();

CREATE TEMP TABLE tmp_adult_aventuras_templates (
  template_preview_key TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  scene_visual TEXT NOT NULL,
  background_details TEXT NOT NULL,
  magic_effects TEXT NOT NULL,
  lighting_color TEXT NOT NULL,
  poem_template TEXT NOT NULL,
  character_roles JSONB NOT NULL
) ON COMMIT DROP;

INSERT INTO tmp_adult_aventuras_templates VALUES
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_01_el_explorador_de_senderos_secretos.webp$q$, $q$El explorador de senderos secretos$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Bosque húmedo de montaña; Rocky avanza al frente siguiendo huellas luminosas mientras dos adultos leen un mapa y una brújula. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Sendero natural con hojas mojadas, raíces, neblina suave y luz filtrada entre árboles.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta verde bosque, ámbar y sombra cinematográfica. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$Para {APODO_DESTINATARIO}, cada sendero empieza al mirar,
tu cola encendida queriendo avanzar.
No importa la ruta ni la dirección,
contigo el camino se vuelve emoción.
Hoy sigo tus huellas con lenta alegría,
tu paso convierte la tarde en guía.
Si el mundo se cansa de tanto correr,
tu forma de andar me enseña a volver.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_02_el_capitan_de_las_tardes_de_playa.webp$q$, $q$El capitán de las tardes de playa$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Playa adulta al atardecer; Rocky corre delante de dos adultos caminando por la orilla, con linterna, cuerda náutica y huellas brillantes. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Costa amplia, mar bajo, cielo naranja, manta sobria y farol encendido en la arena.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta turquesa profundo, coral, naranja de atardecer. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$Cuando la tarde se empieza a dorar,
tu paso en la arena nos llama a jugar.
No llevas bandera ni gran timón,
pero haces del viento una celebración.
Hoy, {APODO_DESTINATARIO}, volvemos al mismo lugar,
donde cada ola nos sabe esperar.
Si el día fue largo y perdió su color,
tu playa secreta devuelve el humor.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_03_el_detective_de_huellas_felices.webp$q$, $q$El detective de huellas felices$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Calle lluviosa elegante; Rocky olfatea huellas luminosas mientras dos adultos lo siguen con paraguas, linterna y libreta. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Café urbano, adoquines mojados, faroles cálidos reflejados en el piso y lluvia fina.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta azul grisáceo, dorado cálido, reflejos de lluvia. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$La lluvia dibuja secretos al pasar,
y tú los descubres con solo olfatear.
Cada pisada parece contar
un pequeño misterio listo para jugar.
Si falta una risa o sobra preocupación,
tu hocico encuentra la mejor solución.
Ningún día gris se queda aquí,
cuando aparece mi detective {APODO_DESTINATARIO}.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_04_el_guardian_del_campamento.webp$q$, $q$El guardián del campamento$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Campamento nocturno adulto; Rocky sentado alerta junto a una fogata, dos adultos toman café alrededor, montañas y estrellas al fondo. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Carpa sobria, manta de lana, termo, lámpara de camping, pinos y cielo estrellado.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta azul noche, naranja fogata, plata lunar. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$Cuando la noche se abre alrededor,
tu calma enciende pequeño valor.
No hace falta hablar para proteger:
tu mirada sabe quedarse y creer.
Tu amor, {APODO_DESTINATARIO}, sabe acompañar,
en rutas de estrellas y viento al pasar.
Si afuera la vida se vuelve feroz,
tu fuego en nosotros levanta su voz.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_05_la_ruta_que_elegimos_juntos.webp$q$, $q$La ruta que elegimos juntos$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Carretera panorámica; una persona adulta abre la puerta de una camioneta vintage mientras Rocky espera listo para subir, protagonista y sonriente. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Mirador andino, maleta de lona, termo, mapa doblado sobre el capó y horizonte despejado.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta azul mineral, beige arena y cobre de tarde. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$No hace falta saber dónde llegar,
si vienes conmigo listo para avanzar.
Tu mirada pregunta, mi mano responde,
y el día se abre por cualquier horizonte.
{APODO_DESTINATARIO}, contigo la ruta es señal,
un mapa sencillo hacia algo especial.
Si el mundo se vuelve difícil de leer,
tu paso me enseña por dónde volver.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_06_tres_huellas_en_la_ciudad.webp$q$, $q$Tres huellas en la ciudad$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Tres personas adultas cruzan una avenida tranquila de noche con Rocky al centro, todos con rostros visibles, como equipo urbano de aventuras cotidianas. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Ciudad moderna con cruces peatonales brillantes, letreros cálidos, cafeterías y reflejos sobre asfalto limpio.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta azul petróleo, neón suave y dorado urbano. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$La ciudad se enciende, empieza a sonar,
y tú vas al centro marcando el compás.
Tres pasos humanos siguen tu señal,
la noche se vuelve paseo especial.
{APODO_DESTINATARIO}, pequeño faro de buen humor,
haces de cada esquina un lugar mejor.
Si el ruido nos quiere hacer olvidar,
tu huella nos vuelve a encontrar.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_07_el_mapa_de_los_domingos.webp$q$, $q$El mapa de los domingos$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Una persona adulta y Rocky revisan un mapa sobre una mesa de picnic exterior; Rocky apoya una pata cerca de la próxima ruta. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Parque amplio, bicicleta apoyada, canasta de picnic sobria, árboles altos y luz de domingo.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta verde oliva, crema y amarillo suave. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$Hay mapas que no se aprenden mirando,
se entienden contigo saliendo andando.
Una pata decide la dirección,
y el domingo despierta nueva emoción.
{APODO_DESTINATARIO}, mi brújula de libertad,
me recuerdas mirar con curiosidad.
Si la semana pesó más de lo normal,
tu mapa sencillo me devuelve al final.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_08_el_copiloto_de_las_montanas.webp$q$, $q$El copiloto de las montañas$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Dos personas adultas y Rocky contemplan una cadena de montañas desde un mirador; Rocky en primer plano con pañuelo sobrio. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Mirador de piedra, viento suave, mochila técnica, nubes bajas y valle profundo.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta gris montaña, azul frío y naranja amanecer. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$Sube la altura, respira el lugar,
tu cola me invita a no abandonar.
No dices palabra, no das explicación,
pero llenas de calma cada decisión.
{APODO_DESTINATARIO}, copiloto de cielo y sendero,
contigo el esfuerzo se vuelve ligero.
Si falta energía para continuar,
tu forma de mirar me ayuda a llegar.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_09_el_cafe_donde_siempre_volvemos.webp$q$, $q$El café donde siempre volvemos$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Una persona adulta en terraza de café con Rocky descansando junto a la silla, ambos mirando hacia la calle con calma feliz. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Café europeo sobrio, mesa pequeña, taza humeante, plantas, vitrales y luz de mañana.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta madera oscura, crema, verde salvia. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$Hay días que piden bajar la velocidad,
sentarse contigo y mirar la ciudad.
Tu calma se queda junto a mi café,
como si supieras todo sin saber.
{APODO_DESTINATARIO}, compañero de pausa y andar,
hasta el silencio se vuelve hogar.
Si afuera la prisa me quiere arrastrar,
tu sueño tranquilo me enseña a estar.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_10_la_patrulla_de_las_luces.webp$q$, $q$La patrulla de las luces$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Tres personas adultas caminan con Rocky por un malecón nocturno; Rocky guía con una correa luminosa muy sutil y postura alegre. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Malecón junto al agua, faroles en línea, reflejos, bancas de madera y cielo azul profundo.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta azul noche, oro viejo y blanco lunar. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$Cuando las luces empiezan a arder,
sales primero queriendo entender.
Tres voces te siguen con buen corazón,
y el paseo se vuelve pequeña misión.
{APODO_DESTINATARIO}, guardián de la ruta final,
haces segura la noche normal.
Si alguna sombra nos quiere alcanzar,
tu paso contento nos sabe cuidar.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_11_el_buscador_de_tesoros_simples.webp$q$, $q$El buscador de tesoros simples$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Dos personas adultas y Rocky en un mercado de pulgas al aire libre; Rocky descubre una caja de objetos antiguos con una pata curiosa. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Puestos de madera, cámaras antiguas, brújulas, libros usados, toldos de lona y luz cálida.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta ocre, terracota y verde botella. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$No todo tesoro se esconde en el mar,
a veces espera en un viejo lugar.
Tú lo descubres con pura emoción,
nariz de aventura, mirada de sol.
{APODO_DESTINATARIO}, experto en hallar claridad,
ves magia sencilla donde otros no están.
Si busco motivos para sonreír,
tu pata me muestra por dónde seguir.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_12_la_carrera_contra_el_viento.webp$q$, $q$La carrera contra el viento$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Una persona adulta corre por un sendero costero mientras Rocky corre delante con alegría, movimiento fuerte y rostros visibles. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Acantilado seguro, mar al fondo, pasto movido por viento, zapatillas, reloj deportivo y cielo amplio.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta azul océano, blanco espuma, verde seco. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$El viento pregunta quién va a ganar,
y tú ya respondes saliendo a volar.
No corres por premio ni por competir,
corres porque el mundo te invita a vivir.
{APODO_DESTINATARIO}, alegría que sabe empujar,
tu ritmo me ayuda a respirar.
Si el cansancio me quiere vencer,
tu risa peluda me enseña a correr.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_13_el_picnic_de_las_grandes_historias.webp$q$, $q$El picnic de las grandes historias$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Tres personas adultas sentadas sobre una manta en parque amplio, no rígidas ni posadas; Rocky en primer plano roba la atención con expresión divertida. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Parque urbano maduro, manta de lino, frutas, libro abierto, cámara instantánea y árboles de sombra.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta verde parque, rojo suave y crema. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$Entre historias, fruta y conversación,
tu hocico aparece robando atención.
No necesitas saber qué contar,
te basta mirarnos para hacer reír más.
{APODO_DESTINATARIO}, maestro del buen compartir,
contigo un picnic aprende a latir.
Si la tarde se quiere dormir,
tu gesto travieso la vuelve a encender aquí.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_14_el_faro_de_los_dias_largos.webp$q$, $q$El faro de los días largos$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Una persona adulta vuelve a casa al anochecer; Rocky la recibe en una entrada iluminada, protagonista, grande y emotivo. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Puerta moderna cálida, paraguas, abrigo, luz interior dorada y calle tranquila con lluvia fina.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta azul lluvia, ámbar hogar y gris suave. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$Cuando el día se hizo demasiado largo,
tu espera convierte el cansancio en abrazo.
No preguntas nada, sabes mirar,
como si supieras curar al llegar.
{APODO_DESTINATARIO}, faro pequeño de mi habitación,
enciendes la casa con pura emoción.
Si afuera la vida pesa al volver,
tu bienvenida me enseña a creer.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_15_el_guardian_de_la_biblioteca.webp$q$, $q$El guardián de la biblioteca$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Dos personas adultas en biblioteca antigua con Rocky acostado entre libros, alerta y sereno, con una huella luminosa en el piso. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Biblioteca de madera, lámparas verdes, escaleras, libros antiguos y polvo dorado en luz lateral.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta marrón nogal, verde biblioteca y oro suave. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$Entre páginas viejas y olor a papel,
te quedas atento cuidando mi fe.
Cada historia parece empezar
cuando tu mirada decide escuchar.
{APODO_DESTINATARIO}, guardián de relatos sin fin,
conviertes silencio en lugar feliz.
Si pierdo una frase para continuar,
tu calma me ayuda a volver a empezar.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_16_la_brujula_de_los_dias_nuevos.webp$q$, $q$La brújula de los días nuevos$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Tres personas adultas y Rocky preparan mochilas en un muelle al amanecer; Rocky al centro con postura de guía. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Muelle de madera, lago sereno, termos metálicos, remos, mochilas y niebla baja.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta azul lago, cobre amanecer y verde pino. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$Amanece lento sobre el lugar,
y tú ya sabes por dónde empezar.
Tres manos preparan la nueva estación,
tu cola confirma la dirección.
{APODO_DESTINATARIO}, brújula de días por abrir,
contigo es más fácil salir y vivir.
Si el futuro parece difícil de ver,
tu paso primero me invita a creer.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_17_el_taller_de_trucos_imposibles.webp$q$, $q$El taller de trucos imposibles$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Una persona adulta entrena trucos con Rocky en un taller creativo; Rocky salta atravesando un aro bajo con expresión feliz. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Taller luminoso con madera, herramientas seguras, aro, premios de entrenamiento, plantas y luz lateral.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta madera clara, azul acero y amarillo cálido. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$Una vuelta, una pata, un salto audaz,
contigo lo imposible se ríe un poco más.
No importa si sale perfecto o no,
tu intento ya llena de gracia el salón.
{APODO_DESTINATARIO}, inventor de torpes hazañas,
vuelves brillante cualquier mañana.
Si la vida exige hacerlo todo bien,
tu juego me enseña a probar otra vez.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_18_la_noche_de_cine_bajo_estrellas.webp$q$, $q$La noche de cine bajo estrellas$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Dos personas adultas ven cine al aire libre con Rocky entre mantas; los adultos están sentados de costado en vista tres cuartos hacia cámara, rostros claramente visibles iluminados por el proyector, con la pantalla visible detrás en segundo plano. Rocky queda protagonista en primer plano. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Patio o terraza con proyector, pantalla blanca al fondo, mantas, luces colgantes y cielo con estrellas.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta azul profundo, blanco proyector y naranja cálido. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$La pantalla brilla, la noche se va,
y tú eliges sitio para acompañar.
No entiendes la trama ni el final,
pero haces la escena más especial.
{APODO_DESTINATARIO}, función de ternura real,
tu sombra en la manta nos sabe cuidar.
Si el mundo parece ponerse gris,
tu noche de cine me deja feliz.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_19_el_jardin_de_las_huellas_brillantes.webp$q$, $q$El jardín de las huellas brillantes$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Tres personas adultas y Rocky atraviesan un jardín botánico al atardecer; huellas doradas discretas marcan el camino. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Invernadero de cristal, plantas grandes, senderos húmedos, bancos de hierro y luz verde dorada.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta verde botánico, oro tenue y cristal. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$En cada hoja parece latir
una pequeña ruta lista para seguir.
Tú vas dejando señales de luz,
y el jardín entero camina según tú.
{APODO_DESTINATARIO}, jardinero de felicidad,
haces florecer nuestra complicidad.
Si faltan razones para celebrar,
tus huellas brillantes nos vuelven a juntar.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$),
($q$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_20_aventuras_que_siempre_vuelven.webp$q$, $q$Aventuras que siempre vuelven$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. Escena final: dos personas adultas y Rocky miran un álbum de fotos de viajes en una terraza nocturna; Rocky grande y cercano, emocional. Rocky ({NOMBRE_DESTINATARIO}) debe verse como mascota protagonista, reconocible y central. La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas.$q$, $q$Terraza con mesa baja, álbum abierto, luces cálidas, ciudad lejana y cielo despejado.$q$, $q$Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma.$q$, $q$Iluminación cinematográfica adulta con paleta azul medianoche, dorado íntimo y crema. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar.$q$, $q$Algunas aventuras terminan por hoy,
pero dejan caminos en donde voy.
Tu nombre se queda en cada estación,
huella pequeña, enorme emoción.
{APODO_DESTINATARIO}, compañero de tanto vivir,
contigo siempre hay algo por descubrir.
Si cierro el libro para descansar,
mañana tus patas lo vuelven a empezar.$q$, $q$[{"key": "pet", "count": 1}, {"key": "owners", "max": 3}]$q$);

WITH model_row AS (
  SELECT id FROM personalized_models WHERE name = $q$Aventura Entre Patas Adulto$q$ AND slug = $q$aventura-entre-patas-adulto$q$ LIMIT 1
)
INSERT INTO personalized_templates (
  model_id, name, template_preview_key, gender_direction, scene_visual, background_details,
  magic_effects, lighting_color, poem_template, character_roles, is_active
)
SELECT model_row.id, t.name, t.template_preview_key, NULL, t.scene_visual, t.background_details,
       t.magic_effects, t.lighting_color, t.poem_template, t.character_roles, true
FROM tmp_adult_aventuras_templates t CROSS JOIN model_row
ON CONFLICT DO NOTHING;

UPDATE personalized_templates p
SET name = t.name,
    scene_visual = t.scene_visual,
    background_details = t.background_details,
    magic_effects = t.magic_effects,
    lighting_color = t.lighting_color,
    poem_template = t.poem_template,
    character_roles = t.character_roles,
    is_active = true,
    updated_at = now()
FROM tmp_adult_aventuras_templates t
WHERE p.template_preview_key = t.template_preview_key;

COMMIT;
