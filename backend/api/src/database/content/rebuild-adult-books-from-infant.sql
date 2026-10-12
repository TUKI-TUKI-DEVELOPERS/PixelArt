-- Reconstruye el contenido de los libros adultos a partir de su libro infantil.
-- Siete de los doce tenían UNA sola escena y UN solo poema repetidos en todas sus
-- plantillas, y nombres inventados en vez de adaptados. Esto devuelve nombre,
-- escena, fondo, efectos mágicos e iluminación del infantil que le corresponde a
-- cada plantilla adulta, con la edad de los protagonistas ajustada.
--
-- Los poemas NO se tocan acá: se escriben originales, libro por libro.
-- Matchea por template_preview_key, nunca por id (los ids difieren entre entornos).

UPDATE personalized_templates SET
  name = $r9775_1_he_to_hen$Mi Superhéroe Personal De Hijo a Papá$r9775_1_he_to_hen$,
  scene_visual = $r9775_1_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite admiración pura y la certeza de que un padre puede ser un superhéroe real sin necesidad de poderes.

Ligeramente descentrado en posición heroica elevada, el papá, expresión noble, fuerte y protectora, vistiendo un traje de superhéroe elegante en azul profundo y dorado con detalles plateados, capa larga ondeando dramáticamente, símbolo de corazón brillante en el pecho, postura de poder con puño levantado. Mirando hacia arriba con admiración, su hijo ya adulto, expresión de asombro y orgullo puro, con ropa casual en tonos azul y gris, cabello moviéndose por el viento, brazos extendidos hacia su papá.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_1_he_to_hea$,
  background_details = $r9775_1_he_to_heb$Ciudad moderna al atardecer, edificios altos con ventanas iluminadas, cielo dramático en tonos naranja y púrpura con nubes dinámicas.$r9775_1_he_to_heb$,
  magic_effects = $r9775_1_he_to_hec$Rayos de luz dorada emanan del pecho del papá y partículas brillantes flotan alrededor de ambos. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9775_1_he_to_hec$,
  lighting_color = $r9775_1_he_to_hed$Iluminación cinematográfica dramática con rayos de luz dorada atravesando las nubes. Predominan tonos dorados, azul profundo y naranja de atardecer. Atmósfera épica y poderosa.$r9775_1_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 1
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_1_she_to_hen$Mi Superhéroe Personal De Hija a Papá$r9775_1_she_to_hen$,
  scene_visual = $r9775_1_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite admiración pura y la certeza de que un padre puede ser un superhéroe real sin necesidad de poderes.

Ligeramente descentrado en posición heroica elevada, el papá, expresión noble, fuerte y protectora, vistiendo un traje de superhéroe elegante en azul profundo y dorado con detalles plateados, capa larga ondeando dramáticamente, símbolo de corazón brillante en el pecho, postura de poder con puño levantado. Mirando hacia arriba con admiración, su hija ya adulta, expresión de asombro y orgullo puro, con vestido casual en tonos rosa y lavanda, cabello moviéndose por el viento, brazos extendidos hacia su papá.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_1_she_to_hea$,
  background_details = $r9775_1_she_to_heb$Ciudad moderna al atardecer, edificios altos con ventanas iluminadas, cielo dramático en tonos naranja y púrpura con nubes dinámicas.$r9775_1_she_to_heb$,
  magic_effects = $r9775_1_she_to_hec$Rayos de luz dorada emanan del pecho del papá y partículas brillantes flotan alrededor de ambos. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9775_1_she_to_hec$,
  lighting_color = $r9775_1_she_to_hed$Iluminación cinematográfica dramática con rayos de luz dorada atravesando las nubes. Predominan tonos dorados, azul profundo y naranja de atardecer. Atmósfera épica y poderosa.$r9775_1_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 21
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_2_he_to_hen$Mi Caballero de Armadura Brillante De Hijo a Papá$r9775_2_he_to_hen$,
  scene_visual = $r9775_2_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite nobleza medieval y la certeza de estar entrenado por el caballero más leal.

Ligeramente descentrado en postura heroica, el papá, expresión noble, valiente y protectora, vistiendo armadura medieval plateada con detalles dorados, capa azul ondeando, espada resplandeciente en posición de descanso noble, escudo con símbolo de corazón. Frente a él como su escudero en entrenamiento, su hijo ya adulto, expresión de admiración y determinación, con armadura infantil ligera a juego en tonos plateado y azul, sosteniendo una pequeña espada de práctica de madera, mirando a su papá con orgullo.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_2_he_to_hea$,
  background_details = $r9775_2_he_to_heb$Castillo majestuoso de piedra gris con torres altas, banderas azules y doradas ondeando, campo verde con flores silvestres, montañas en la distancia.$r9775_2_he_to_heb$,
  magic_effects = $r9775_2_he_to_hec$La armadura del papá brilla con reflejos dorados de luz solar, y pétalos de flores medievales flotan suavemente en el aire. La magia debe sentirse noble y completamente integrada dentro de una fotografía realista.$r9775_2_he_to_hec$,
  lighting_color = $r9775_2_he_to_hed$Iluminación de día medieval dorado con tonos cálidos, sombras suaves. Predominan plateado, dorado y azul real. Atmósfera de nobleza y valentía.$r9775_2_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 2
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_2_she_to_hen$Mi Caballero de Armadura Brillante De Hija a Papá$r9775_2_she_to_hen$,
  scene_visual = $r9775_2_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite nobleza medieval y la certeza de estar protegida por el caballero más leal.

Ligeramente descentrado en postura heroica, el papá, expresión noble, valiente y protectora, vistiendo armadura medieval plateada con detalles dorados, capa azul ondeando, espada resplandeciente en posición de descanso noble, escudo con símbolo de corazón. Frente a él como su princesa protegida, su hija ya adulta, expresión de admiración y ternura, con vestido de princesa medieval en tonos rosa pastel y dorado, pequeña tiara brillante, mano extendida tocando suavemente el escudo.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_2_she_to_hea$,
  background_details = $r9775_2_she_to_heb$Castillo majestuoso de piedra gris con torres altas, banderas azules y doradas ondeando, campo verde con flores silvestres, montañas en la distancia.$r9775_2_she_to_heb$,
  magic_effects = $r9775_2_she_to_hec$La armadura del papá brilla con reflejos dorados de luz solar, y pétalos de flores medievales flotan suavemente en el aire. La magia debe sentirse noble y completamente integrada dentro de una fotografía realista.$r9775_2_she_to_hec$,
  lighting_color = $r9775_2_she_to_hed$Iluminación de día medieval dorado con tonos cálidos, sombras suaves. Predominan plateado, dorado y azul real. Atmósfera de nobleza y valentía.$r9775_2_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 22
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_3_he_to_hen$Mi Rey De Hijo a Papá$r9775_3_he_to_hen$,
  scene_visual = $r9775_3_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad y la certeza de que en el reino del corazón de su hijo ya adulto, el papá es el rey absoluto.

Ligeramente descentrado sentado en un trono dorado, el papá, expresión noble y cálida, vistiendo túnica real púrpura con bordados dorados, corona con joyas brillantes, cetro dorado en mano. A su lado como príncipe heredero del reino, su hijo ya adulto, expresión de orgullo y amor, con túnica principesca en azul y dorado, corona pequeña brillante, mano sosteniendo la de su papá.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_3_he_to_hea$,
  background_details = $r9775_3_he_to_heb$Salón del trono real con columnas doradas, tapices púrpura y dorado, ventanas arqueadas con vitrales de luz colorida, alfombra roja con detalles dorados.$r9775_3_he_to_heb$,
  magic_effects = $r9775_3_he_to_hec$Luz divina dorada cae desde arriba iluminando el trono. La magia debe sentirse majestuosa y completamente integrada dentro de una fotografía realista.$r9775_3_he_to_hec$,
  lighting_color = $r9775_3_he_to_hed$Iluminación dramática con rayos de luz dorada desde arriba, sombras suaves. Predominan dorado, púrpura profundo y rojo real. Atmósfera de poder noble y amor familiar.$r9775_3_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 3
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_3_she_to_hen$Mi Rey De Hija a Papá$r9775_3_she_to_hen$,
  scene_visual = $r9775_3_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad y la certeza de que en el reino del corazón de su hija ya adulta, el papá es el rey absoluto.

Ligeramente descentrado sentado en un trono dorado, el papá, expresión noble y cálida, vistiendo túnica real púrpura con bordados dorados, corona con joyas brillantes, cetro dorado en mano. A su lado como princesa del reino, su hija ya adulta, expresión de orgullo y amor, con vestido de princesa en rosa y dorado, corona pequeña brillante, mano sosteniendo la de su papá.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_3_she_to_hea$,
  background_details = $r9775_3_she_to_heb$Salón del trono real con columnas doradas, tapices púrpura y dorado, ventanas arqueadas con vitrales de luz colorida, alfombra roja con detalles dorados.$r9775_3_she_to_heb$,
  magic_effects = $r9775_3_she_to_hec$Luz divina dorada cae desde arriba iluminando el trono. La magia debe sentirse majestuosa y completamente integrada dentro de una fotografía realista.$r9775_3_she_to_hec$,
  lighting_color = $r9775_3_she_to_hed$Iluminación dramática con rayos de luz dorada desde arriba, sombras suaves. Predominan dorado, púrpura profundo y rojo real. Atmósfera de poder noble y amor familiar.$r9775_3_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 23
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_4_he_to_hen$Mi Ángel Guardián De Hijo a Papá$r9775_4_he_to_hen$,
  scene_visual = $r9775_4_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz celestial y la certeza de estar protegido bajo unas alas de amor incondicional.

Ligeramente descentrado con postura protectora celestial, el papá, expresión serena y protectora, vistiendo túnica blanca elegante con detalles dorados, alas de ángel grandes y brillantes extendidas, aureola dorada sutil sobre su cabeza. Protegido frente a él, su hijo ya adulto, expresión de paz y seguridad total, con túnica infantil en tonos pastel celeste, manos juntas en gesto de gratitud, mirando a su papá ángel.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_4_he_to_hea$,
  background_details = $r9775_4_he_to_heb$Cielo divino en tonos azul suave, blanco puro y dorado celestial, nubes esponjosas flotando, rayos de luz divina atravesando las nubes.$r9775_4_he_to_heb$,
  magic_effects = $r9775_4_he_to_hec$Plumas blancas flotan suavemente en el aire junto con partículas de luz dorada. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$r9775_4_he_to_hec$,
  lighting_color = $r9775_4_he_to_hed$Iluminación celestial suave con tonos dorados y blancos, sombras delicadas. Atmósfera de paz y amor divino.$r9775_4_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 4
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_4_she_to_hen$Mi Ángel Guardián De Hija a Papá$r9775_4_she_to_hen$,
  scene_visual = $r9775_4_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz celestial y la certeza de estar protegida bajo unas alas de amor incondicional.

Ligeramente descentrado con postura protectora celestial, el papá, expresión serena y protectora, vistiendo túnica blanca elegante con detalles dorados, alas de ángel grandes y brillantes extendidas, aureola dorada sutil sobre su cabeza. Protegida frente a él, su hija ya adulta, expresión de paz y seguridad total, con vestido en tonos pastel celeste, manos juntas en gesto de gratitud, mirando a su papá ángel.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_4_she_to_hea$,
  background_details = $r9775_4_she_to_heb$Cielo divino en tonos azul suave, blanco puro y dorado celestial, nubes esponjosas flotando, rayos de luz divina atravesando las nubes.$r9775_4_she_to_heb$,
  magic_effects = $r9775_4_she_to_hec$Plumas blancas flotan suavemente en el aire junto con partículas de luz dorada. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$r9775_4_she_to_hec$,
  lighting_color = $r9775_4_she_to_hed$Iluminación celestial suave con tonos dorados y blancos, sombras delicadas. Atmósfera de paz y amor divino.$r9775_4_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 24
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_5_he_to_hen$Mi Pirata Aventurero De Hijo a Papá$r9775_5_he_to_hen$,
  scene_visual = $r9775_5_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite aventura y la complicidad de navegar la vida junto al capitán más valiente.

Ligeramente descentrado en el timón, el papá, expresión aventurera y carismática, vistiendo traje de pirata elegante con chaleco de cuero y sombrero tricornio con pluma, brújula dorada en mano. a su lado como su primer oficial, su hijo ya adulto, expresión emocionada y feliz, con pañuelo pirata en la cabeza, catalejo en mano, mirando al horizonte.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_5_he_to_hea$,
  background_details = $r9775_5_he_to_heb$Océano turquesa con olas dinámicas, barco pirata de madera con velas desplegadas y bandera con símbolo de corazón, cielo de atardecer con nubes naranjas y púrpuras, isla tropical en la distancia.$r9775_5_he_to_heb$,
  magic_effects = $r9775_5_he_to_hec$El cofre del tesoro cercano brilla con destellos dorados de monedas y joyas. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$r9775_5_he_to_hec$,
  lighting_color = $r9775_5_he_to_hed$Iluminación de atardecer cálido con tonos dorados y naranjas, sombras dinámicas. Atmósfera de aventura épica y complicidad padre e hijo.$r9775_5_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 5
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_5_she_to_hen$Mi Pirata Aventurero De Hija a Papá$r9775_5_she_to_hen$,
  scene_visual = $r9775_5_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite aventura y la complicidad de navegar la vida junto al capitán más valiente.

Ligeramente descentrado en el timón, el papá, expresión aventurera y carismática, vistiendo traje de pirata elegante con chaleco de cuero y sombrero tricornio con pluma, brújula dorada en mano. a su lado como su primera oficial, su hija ya adulta, expresión emocionada y feliz, con pañuelo pirata en la cabeza, catalejo en mano, mirando al horizonte.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_5_she_to_hea$,
  background_details = $r9775_5_she_to_heb$Océano turquesa con olas dinámicas, barco pirata de madera con velas desplegadas y bandera con símbolo de corazón, cielo de atardecer con nubes naranjas y púrpuras, isla tropical en la distancia.$r9775_5_she_to_heb$,
  magic_effects = $r9775_5_she_to_hec$El cofre del tesoro cercano brilla con destellos dorados de monedas y joyas. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$r9775_5_she_to_hec$,
  lighting_color = $r9775_5_she_to_hed$Iluminación de atardecer cálido con tonos dorados y naranjas, sombras dinámicas. Atmósfera de aventura épica y complicidad padre-hija.$r9775_5_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 25
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_6_he_to_hen$Mi Guerrero Protector De Hijo a Papá$r9775_6_he_to_hen$,
  scene_visual = $r9775_6_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza protectora y la victoria silenciosa de un padre que lucha con amor.

Ligeramente descentrado en postura victoriosa, el papá, expresión fuerte pero amorosa, vistiendo armadura de guerrero en bronce y negro, capa roja ondeando, escudo con símbolo de corazón, espada en alto. Protegido junto a él, su hijo ya adulto, expresión de admiración y seguridad, con ropa clara sencilla, mano tocando el escudo de su papá.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_6_he_to_hea$,
  background_details = $r9775_6_he_to_heb$Campo victorioso al atardecer, colinas verdes, cielo dramático en tonos naranja y rojo, banderas ondeando.$r9775_6_he_to_heb$,
  magic_effects = $r9775_6_he_to_hec$El escudo del papá refleja destellos dorados del atardecer. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9775_6_he_to_hec$,
  lighting_color = $r9775_6_he_to_hed$Iluminación dramática de atardecer con tonos rojos y dorados, sombras fuertes. Atmósfera épica de batalla ganada por amor.$r9775_6_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 6
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_6_she_to_hen$Mi Guerrero Protector De Hija a Papá$r9775_6_she_to_hen$,
  scene_visual = $r9775_6_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza protectora y la victoria silenciosa de un padre que lucha con amor.

Ligeramente descentrado en postura victoriosa, el papá, expresión fuerte pero amorosa, vistiendo armadura de guerrero en bronce y negro, capa roja ondeando, escudo con símbolo de corazón, espada en alto. Protegida junto a él, su hija ya adulta, expresión de admiración y seguridad, con ropa clara sencilla, mano tocando el escudo de su papá.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_6_she_to_hea$,
  background_details = $r9775_6_she_to_heb$Campo victorioso al atardecer, colinas verdes, cielo dramático en tonos naranja y rojo, banderas ondeando.$r9775_6_she_to_heb$,
  magic_effects = $r9775_6_she_to_hec$El escudo del papá refleja destellos dorados del atardecer. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9775_6_she_to_hec$,
  lighting_color = $r9775_6_she_to_hed$Iluminación dramática de atardecer con tonos rojos y dorados, sombras fuertes. Atmósfera épica de batalla ganada por amor.$r9775_6_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 26
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_7_he_to_hen$Mi Capitán Piloto De Hijo a Papá$r9775_7_he_to_hen$,
  scene_visual = $r9775_7_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite confianza y liderazgo, con el papá guiando el rumbo con seguridad amorosa.

Ligeramente descentrado frente al avión, el papá, expresión confiada y profesional, vistiendo uniforme de piloto impecable con charreteras doradas y gorra de capitán, sosteniendo un mapa de vuelo. Como copiloto especial, su hijo ya adulto, expresión emocionada y confiada, con gorra de piloto pequeña, mirando los instrumentos de vuelo con curiosidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_7_he_to_hea$,
  background_details = $r9775_7_he_to_heb$Cielo azul brillante al atardecer, nubes blancas y naranjas, avión moderno elegante, horizonte infinito.$r9775_7_he_to_heb$,
  magic_effects = $r9775_7_he_to_hec$La brújula dorada en manos del papá brilla suavemente. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$r9775_7_he_to_hec$,
  lighting_color = $r9775_7_he_to_hed$Iluminación de atardecer aéreo con tonos azules y dorados, sombras suaves. Atmósfera de aventura segura y confianza.$r9775_7_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 7
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_7_she_to_hen$Mi Capitán Piloto De Hija a Papá$r9775_7_she_to_hen$,
  scene_visual = $r9775_7_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite confianza y liderazgo, con el papá guiando el rumbo con seguridad amorosa.

Ligeramente descentrado frente al avión, el papá, expresión confiada y profesional, vistiendo uniforme de piloto impecable con charreteras doradas y gorra de capitán, sosteniendo un mapa de vuelo. Como copiloto especial, su hija ya adulta, expresión emocionada y confiada, con gorra de piloto pequeña, mirando los instrumentos de vuelo con curiosidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_7_she_to_hea$,
  background_details = $r9775_7_she_to_heb$Cielo azul brillante al atardecer, nubes blancas y naranjas, avión moderno elegante, horizonte infinito.$r9775_7_she_to_heb$,
  magic_effects = $r9775_7_she_to_hec$La brújula dorada en manos del papá brilla suavemente. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$r9775_7_she_to_hec$,
  lighting_color = $r9775_7_she_to_hed$Iluminación de atardecer aéreo con tonos azules y dorados, sombras suaves. Atmósfera de aventura segura y confianza.$r9775_7_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 27
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_8_he_to_hen$Mi Vikingo Valiente De Hijo a Papá$r9775_8_he_to_hen$,
  scene_visual = $r9775_8_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza ancestral y el orgullo de un hijo aprendiendo del guerrero más valiente.

Ligeramente descentrado en postura poderosa, el papá, expresión fuerte y protectora, vistiendo armadura vikinga con pieles, casco vikingo sin cuernos (históricamente correcto), hacha de guerra en mano, escudo con símbolos nórdicos. Junto a él como su pequeño guerrero, su hijo ya adulto, expresión valiente y orgullosa, con túnica vikinga adaptada, cabello corto alborotado, sosteniendo un escudo pequeño de.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_8_he_to_hea$,
  background_details = $r9775_8_he_to_heb$Paisaje nórdico con fiordos de agua azul profunda, montañas nevadas, cielo tormentoso con rayos de luz atravesando, barco vikingo con dragón tallado.$r9775_8_he_to_heb$,
  magic_effects = $r9775_8_he_to_hec$Símbolos rúnicos brillan sutilmente sobre el escudo del papá. La magia debe sentirse ancestral y completamente integrada dentro de una fotografía realista.$r9775_8_he_to_hec$,
  lighting_color = $r9775_8_he_to_hed$Iluminación dramática nórdica con tonos grises, azules y plateados, sombras fuertes. Atmósfera épica vikinga.$r9775_8_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 8
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_8_she_to_hen$Mi Vikingo Valiente De Hija a Papá$r9775_8_she_to_hen$,
  scene_visual = $r9775_8_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza ancestral y el orgullo de una hija aprendiendo del guerrero más valiente.

Ligeramente descentrado en postura poderosa, el papá, expresión fuerte y protectora, vistiendo armadura vikinga con pieles, casco vikingo sin cuernos (históricamente correcto), hacha de guerra en mano, escudo con símbolos nórdicos. Junto a él como su pequeña guerrera, su hija ya adulta, expresión valiente y orgullosa, con túnica vikinga adaptada, trenzas en el cabello, sosteniendo un escudo pequeño de.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_8_she_to_hea$,
  background_details = $r9775_8_she_to_heb$Paisaje nórdico con fiordos de agua azul profunda, montañas nevadas, cielo tormentoso con rayos de luz atravesando, barco vikingo con dragón tallado.$r9775_8_she_to_heb$,
  magic_effects = $r9775_8_she_to_hec$Símbolos rúnicos brillan sutilmente sobre el escudo del papá. La magia debe sentirse ancestral y completamente integrada dentro de una fotografía realista.$r9775_8_she_to_hec$,
  lighting_color = $r9775_8_she_to_hed$Iluminación dramática nórdica con tonos grises, azules y plateados, sombras fuertes. Atmósfera épica vikinga.$r9775_8_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 28
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_9_he_to_hen$Mi Arquitecto de Sueños De Hijo a Papá$r9775_9_he_to_hen$,
  scene_visual = $r9775_9_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite creatividad e inspiración, con el papá construyendo mágicamente el futuro de su hijo ya adulto.

Ligeramente descentrado sosteniendo planos brillantes, el papá, expresión concentrada y amorosa, vistiendo camisa blanca arremangada y chaleco, herramientas de diseño doradas flotando alrededor. Observando con asombro, su hijo ya adulto, expresión de inspiración y felicidad, señalando hacia los castillos y edificios mágicos que su papá crea.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_9_he_to_hea$,
  background_details = $r9775_9_he_to_heb$Espacio mágico de creación, planos arquitectónicos flotando transformándose en castillos y edificios, cielo en tonos azules y dorados.$r9775_9_he_to_heb$,
  magic_effects = $r9775_9_he_to_hec$Los planos brillantes se transforman lentamente en estructuras de luz dorada mientras flotan. La magia debe sentirse creativa y completamente integrada dentro de una fotografía realista.$r9775_9_he_to_hec$,
  lighting_color = $r9775_9_he_to_hed$Iluminación creativa con tonos azules, blancos y dorados, sombras suaves. Atmósfera de inspiración y construcción de sueños.$r9775_9_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 9
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_9_she_to_hen$Mi Arquitecto de Sueños De Hija a Papá$r9775_9_she_to_hen$,
  scene_visual = $r9775_9_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite creatividad e inspiración, con el papá construyendo mágicamente el futuro de su hija ya adulta.

Ligeramente descentrado sosteniendo planos brillantes, el papá, expresión concentrada y amorosa, vistiendo camisa blanca arremangada y chaleco, herramientas de diseño doradas flotando alrededor. Observando con asombro, su hija ya adulta, expresión de inspiración y felicidad, señalando hacia los castillos y edificios mágicos que su papá crea.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_9_she_to_hea$,
  background_details = $r9775_9_she_to_heb$Espacio mágico de creación, planos arquitectónicos flotando transformándose en castillos y edificios, cielo en tonos azules y dorados.$r9775_9_she_to_heb$,
  magic_effects = $r9775_9_she_to_hec$Los planos brillantes se transforman lentamente en estructuras de luz dorada mientras flotan. La magia debe sentirse creativa y completamente integrada dentro de una fotografía realista.$r9775_9_she_to_hec$,
  lighting_color = $r9775_9_she_to_hed$Iluminación creativa con tonos azules, blancos y dorados, sombras suaves. Atmósfera de inspiración y construcción de sueños.$r9775_9_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 29
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_10_he_to_hen$Mi Gladiador De Hijo a Papá$r9775_10_he_to_hen$,
  scene_visual = $r9775_10_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite triunfo y el orgullo desbordante de un hijo celebrando a su campeón.

Ligeramente descentrado en postura victoriosa, el papá, expresión victoriosa pero amorosa, vistiendo armadura de gladiador romano con peto de bronce y capa roja corta, espada en alto, escudo con símbolo de corazón. Corriendo hacia él celebrando, su hijo ya adulto, expresión de orgullo y alegría extrema, con túnica romana blanca y corona de laurel pequeña, brazos abiertos.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_10_he_to_hea$,
  background_details = $r9775_10_he_to_heb$Coliseo romano épico, arena dorada, columnas majestuosas, cielo azul con nubes dramáticas, banderas romanas ondeando.$r9775_10_he_to_heb$,
  magic_effects = $r9775_10_he_to_hec$Pétalos de flores caen suavemente celebrando la victoria del papá. La magia debe sentirse triunfal y completamente integrada dentro de una fotografía realista.$r9775_10_he_to_hec$,
  lighting_color = $r9775_10_he_to_hed$Iluminación dorada romana con tonos cálidos, sombras dramáticas. Atmósfera de victoria épica y orgullo familiar.$r9775_10_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 10
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_10_she_to_hen$Mi Gladiador De Hija a Papá$r9775_10_she_to_hen$,
  scene_visual = $r9775_10_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite triunfo y el orgullo desbordante de una hija celebrando a su campeón.

Ligeramente descentrado en postura victoriosa, el papá, expresión victoriosa pero amorosa, vistiendo armadura de gladiador romano con peto de bronce y capa roja corta, espada en alto, escudo con símbolo de corazón. Corriendo hacia él celebrando, su hija ya adulta, expresión de orgullo y alegría extrema, con túnica romana blanca y corona de laurel pequeña, brazos abiertos.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_10_she_to_hea$,
  background_details = $r9775_10_she_to_heb$Coliseo romano épico, arena dorada, columnas majestuosas, cielo azul con nubes dramáticas, banderas romanas ondeando.$r9775_10_she_to_heb$,
  magic_effects = $r9775_10_she_to_hec$Pétalos de flores caen suavemente celebrando la victoria del papá. La magia debe sentirse triunfal y completamente integrada dentro de una fotografía realista.$r9775_10_she_to_hec$,
  lighting_color = $r9775_10_she_to_hed$Iluminación dorada romana con tonos cálidos, sombras dramáticas. Atmósfera de victoria épica y orgullo familiar.$r9775_10_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 30
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_11_he_to_hen$Mi Samurái De Hijo a Papá$r9775_11_he_to_hen$,
  scene_visual = $r9775_11_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite honor y disciplina, con su hijo ya adulto mostrando respeto y admiración por su padre samurái.

Ligeramente descentrado en postura honorable, el papá, expresión seria y protectora, vistiendo armadura samurái tradicional en negro, rojo y dorado, katana en posición de descanso honorable. Junto a él como su aprendiz, su hijo ya adulto, expresión respetuosa y orgullosa, con kimono japonés tradicional en tonos azul índigo y gris, cabello corto prolijo, manos juntas en gesto de honor.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_11_he_to_hea$,
  background_details = $r9775_11_he_to_heb$Jardín zen japonés con cerezos en flor, puente de madera sobre estanque con carpas koi, templo japonés a la distancia, montañas neblinosas.$r9775_11_he_to_heb$,
  magic_effects = $r9775_11_he_to_hec$Pétalos de cerezo caen suavemente alrededor de ambos. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$r9775_11_he_to_hec$,
  lighting_color = $r9775_11_he_to_hed$Iluminación suave japonesa con tonos rosados y dorados, sombras delicadas. Atmósfera de honor y tradición.$r9775_11_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 11
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_11_she_to_hen$Mi Samurái De Hija a Papá$r9775_11_she_to_hen$,
  scene_visual = $r9775_11_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite honor y disciplina, con su hija ya adulta mostrando respeto y admiración por su padre samurái.

Ligeramente descentrado en postura honorable, el papá, expresión seria y protectora, vistiendo armadura samurái tradicional en negro, rojo y dorado, katana en posición de descanso honorable. Junto a él como su aprendiz, su hija ya adulta, expresión respetuosa y orgullosa, con kimono japonés en tonos rosa pastel, cabello recogido con flores de cerezo, manos juntas en gesto de honor.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_11_she_to_hea$,
  background_details = $r9775_11_she_to_heb$Jardín zen japonés con cerezos en flor, puente de madera sobre estanque con carpas koi, templo japonés a la distancia, montañas neblinosas.$r9775_11_she_to_heb$,
  magic_effects = $r9775_11_she_to_hec$Pétalos de cerezo caen suavemente alrededor de ambos. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$r9775_11_she_to_hec$,
  lighting_color = $r9775_11_she_to_hed$Iluminación suave japonesa con tonos rosados y dorados, sombras delicadas. Atmósfera de honor y tradición.$r9775_11_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 31
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_12_he_to_hen$Mi Titán De Hijo a Papá$r9775_12_he_to_hen$,
  scene_visual = $r9775_12_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite poder monumental y la seguridad absoluta de un hijo protegido por una fuerza inmensa.

Ligeramente descentrado en escala épica, el papá, expresión poderosa pero amorosa, representado como titán gigante con energía cósmica dorada y azul emanando de su cuerpo, vestimenta de túnica épica. A sus pies en escala humana normal, su hijo ya adulto, expresión de asombro y seguridad total, mirando hacia arriba con admiración.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_12_he_to_hea$,
  background_details = $r9775_12_he_to_heb$Paisaje monumental con montañas gigantes, cielo cósmico con nebulosas y estrellas, energía cósmica en tonos azul profundo y púrpura.$r9775_12_he_to_heb$,
  magic_effects = $r9775_12_he_to_hec$Partículas doradas y azules flotan alrededor del titán, con ondas de energía suaves. La magia debe sentirse monumental y completamente integrada dentro de una fotografía realista.$r9775_12_he_to_hec$,
  lighting_color = $r9775_12_he_to_hed$Iluminación cósmica dramática con tonos azules profundos, dorados y púrpuras, sombras épicas. Atmósfera de poder absoluto y amor protector.$r9775_12_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 12
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_12_she_to_hen$Mi Titán De Hija a Papá$r9775_12_she_to_hen$,
  scene_visual = $r9775_12_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite poder monumental y la seguridad absoluta de una hija protegida por una fuerza inmensa.

Ligeramente descentrado en escala épica, el papá, expresión poderosa pero amorosa, representado como titán gigante con energía cósmica dorada y azul emanando de su cuerpo, vestimenta de túnica épica. A sus pies en escala humana normal, su hija ya adulta, expresión de asombro y seguridad total, mirando hacia arriba con admiración.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_12_she_to_hea$,
  background_details = $r9775_12_she_to_heb$Paisaje monumental con montañas gigantes, cielo cósmico con nebulosas y estrellas, energía cósmica en tonos azul profundo y púrpura.$r9775_12_she_to_heb$,
  magic_effects = $r9775_12_she_to_hec$Partículas doradas y azules flotan alrededor del titán, con ondas de energía suaves. La magia debe sentirse monumental y completamente integrada dentro de una fotografía realista.$r9775_12_she_to_hec$,
  lighting_color = $r9775_12_she_to_hed$Iluminación cósmica dramática con tonos azules profundos, dorados y púrpuras, sombras épicas. Atmósfera de poder absoluto y amor protector.$r9775_12_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 32
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_13_he_to_hen$Mi Primer Héroe De Hijo a Papá$r9775_13_he_to_hen$,
  scene_visual = $r9775_13_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura pura y el amor incondicional de un primer abrazo que define toda una vida.

Ligeramente descentrado en momento íntimo, el papá, expresión de amor puro y protección, vistiendo ropa casual cómoda, de pie junto a su hijo ya adulto, abrazándolo tiernamente. A su lado, su hijo ya adulto, expresión de amor puro y seguridad total, con ropa cómoda en colores suaves, cabeza recostada en su pecho.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_13_he_to_hea$,
  background_details = $r9775_13_he_to_heb$Sala de estar acogedora con luz natural suave, colores cálidos beige y crema, fotografías familiares en las paredes, sofá cómodo.$r9775_13_he_to_heb$,
  magic_effects = $r9775_13_he_to_hec$La luz natural crea un halo dorado suave alrededor del abrazo. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$r9775_13_he_to_hec$,
  lighting_color = $r9775_13_he_to_hed$Iluminación natural cálida con tonos dorados suaves, sombras delicadas. Atmósfera de ternura absoluta y amor puro.$r9775_13_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 13
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_13_she_to_hen$Mi Primer Amor De Hija a Papá$r9775_13_she_to_hen$,
  scene_visual = $r9775_13_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura pura y el amor incondicional de un primer abrazo que define toda una vida.

Ligeramente descentrado en momento íntimo, el papá, expresión de amor puro y protección, vistiendo ropa casual cómoda, de pie junto a su hija ya adulta, abrazándola tiernamente. A su lado, su hija ya adulta, expresión de amor puro y seguridad total, con vestido simple en colores suaves, cabeza recostada en su pecho.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_13_she_to_hea$,
  background_details = $r9775_13_she_to_heb$Sala de estar acogedora con luz natural suave, colores cálidos beige y crema, fotografías familiares en las paredes, sofá cómodo.$r9775_13_she_to_heb$,
  magic_effects = $r9775_13_she_to_hec$La luz natural crea un halo dorado suave alrededor del abrazo. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$r9775_13_she_to_hec$,
  lighting_color = $r9775_13_she_to_hed$Iluminación natural cálida con tonos dorados suaves, sombras delicadas. Atmósfera de ternura absoluta y amor puro.$r9775_13_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 33
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_14_he_to_hen$Cuando Bailamos en la Sala De Hijo a Papá$r9775_14_he_to_hen$,
  scene_visual = $r9775_14_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría pura y la diversión de un baile improvisado en casa.

Ligeramente descentrados bailando, el papá, expresión de felicidad y diversión, vistiendo ropa casual elegante, sosteniendo las manos de su hijo ya adulto en posición de baile. bailando de pie sobre el suelo, su hijo ya adulto, expresión de alegría extrema y risa, con ropa cómoda que se mueve con el baile en tonos azul vibrante.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_14_he_to_hea$,
  background_details = $r9775_14_he_to_heb$Sala de estar familiar en tarde luminosa, piso de madera brillante, ventana con luz natural cálida, muebles movidos creando espacio de baile.$r9775_14_he_to_heb$,
  magic_effects = $r9775_14_he_to_hec$Un sutil efecto de movimiento captura el giro y el salto de su hijo. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$r9775_14_he_to_hec$,
  lighting_color = $r9775_14_he_to_hed$Iluminación natural cálida con tonos dorados, efecto de movimiento capturado. Atmósfera de alegría y diversión.$r9775_14_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 14
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_14_she_to_hen$Cuando Bailamos en la Sala De Hija a Papá$r9775_14_she_to_hen$,
  scene_visual = $r9775_14_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría pura y la diversión de un baile improvisado en casa.

Ligeramente descentrados bailando, el papá, expresión de felicidad y diversión, vistiendo ropa casual elegante, sosteniendo las manos de su hija ya adulta en posición de baile. bailando de pie sobre el suelo, su hija ya adulta, expresión de alegría extrema y risa, con vestido que gira con el movimiento en tonos rosa vibrante.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_14_she_to_hea$,
  background_details = $r9775_14_she_to_heb$Sala de estar familiar en tarde luminosa, piso de madera brillante, ventana con luz natural cálida, muebles movidos creando espacio de baile.$r9775_14_she_to_heb$,
  magic_effects = $r9775_14_she_to_hec$Un sutil efecto de movimiento captura el giro del vestido de su hija. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$r9775_14_she_to_hec$,
  lighting_color = $r9775_14_she_to_hed$Iluminación natural cálida con tonos dorados, efecto de movimiento capturado. Atmósfera de alegría y diversión.$r9775_14_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 34
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_15_he_to_hen$Me Enseñaste Que Soy un Rey De Hijo a Papá$r9775_15_he_to_hen$,
  scene_visual = $r9775_15_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite empoderamiento y el orgullo de un padre coronando a su hijo ya adulto como el rey que siempre fue.

Ligeramente descentrado frente al espejo, el papá, expresión de orgullo y amor, de pie junto a su hijo ya adulto, colocando una pequeña corona dorada sobre su cabeza con cuidado. Mirándose al espejo, su hijo ya adulto, expresión de asombro y felicidad, con ropa elegante en tonos azul y dorado, sonrisa de confianza.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_15_he_to_hea$,
  background_details = $r9775_15_he_to_heb$Habitación elegante con espejo grande de marco dorado ornamentado, luz suave y dorada, cortinas elegantes.$r9775_15_he_to_heb$,
  magic_effects = $r9775_15_he_to_hec$La corona brilla suavemente reflejándose en el espejo. La magia debe sentirse empoderadora y completamente integrada dentro de una fotografía realista.$r9775_15_he_to_hec$,
  lighting_color = $r9775_15_he_to_hed$Iluminación dorada suave con reflejos en el espejo, sombras delicadas. Atmósfera de magia realista y empoderamiento.$r9775_15_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 15
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_15_she_to_hen$Me Enseñaste Que Soy Una Princesa De Hija a Papá$r9775_15_she_to_hen$,
  scene_visual = $r9775_15_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite empoderamiento y el orgullo de un padre coronando a su hija ya adulta como la princesa que siempre fue.

Ligeramente descentrado frente al espejo, el papá, expresión de orgullo y amor, de pie junto a su hija ya adulta, colocando una tiara brillante sobre su cabeza con cuidado. Mirándose al espejo, su hija ya adulta, expresión de asombro y felicidad, con vestido elegante en tonos rosa y dorado, sonrisa de confianza.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_15_she_to_hea$,
  background_details = $r9775_15_she_to_heb$Habitación elegante con espejo grande de marco dorado ornamentado, luz suave y dorada, cortinas elegantes.$r9775_15_she_to_heb$,
  magic_effects = $r9775_15_she_to_hec$La corona brilla suavemente reflejándose en el espejo. La magia debe sentirse empoderadora y completamente integrada dentro de una fotografía realista.$r9775_15_she_to_hec$,
  lighting_color = $r9775_15_she_to_hed$Iluminación dorada suave con reflejos en el espejo, sombras delicadas. Atmósfera de magia realista y empoderamiento.$r9775_15_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 35
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_16_he_to_hen$Nuestras Citas de Padre e Hijo De Hijo a Papá$r9775_16_he_to_hen$,
  scene_visual = $r9775_16_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad cotidiana y la calidez de un momento especial compartido.

Ligeramente descentrados en la mesa, el papá, expresión de felicidad y atención total, sosteniendo una taza de chocolate caliente, mirando a su hijo ya adulto con sonrisa genuina. Frente a él, su hijo ya adulto, expresión de felicidad pura, sosteniendo un helado grande de varios sabores, ojos brillantes.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_16_he_to_hea$,
  background_details = $r9775_16_he_to_heb$Heladería acogedora con decoración vintage, mesas pequeñas, ventana mostrando calle con árboles, luz natural cálida.$r9775_16_he_to_heb$,
  magic_effects = $r9775_16_he_to_hec$Ninguno: escena cotidiana y cálida, sin elementos mágicos añadidos.$r9775_16_he_to_hec$,
  lighting_color = $r9775_16_he_to_hed$Iluminación natural cálida con tonos dorados y pasteles, sombras suaves. Atmósfera de complicidad y tiempo de calidad.$r9775_16_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 16
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_16_she_to_hen$Nuestras Citas de Padre e Hija De Hija a Papá$r9775_16_she_to_hen$,
  scene_visual = $r9775_16_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad cotidiana y la calidez de un momento especial compartido.

Ligeramente descentrados en la mesa, el papá, expresión de felicidad y atención total, sosteniendo una taza de chocolate caliente, mirando a su hija ya adulta con sonrisa genuina. Frente a él, su hija ya adulta, expresión de felicidad pura, sosteniendo un helado grande de varios sabores, ojos brillantes.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_16_she_to_hea$,
  background_details = $r9775_16_she_to_heb$Heladería acogedora con decoración vintage, mesas pequeñas, ventana mostrando calle con árboles, luz natural cálida.$r9775_16_she_to_heb$,
  magic_effects = $r9775_16_she_to_hec$Ninguno: escena cotidiana y cálida, sin elementos mágicos añadidos.$r9775_16_she_to_hec$,
  lighting_color = $r9775_16_she_to_hed$Iluminación natural cálida con tonos dorados y pasteles, sombras suaves. Atmósfera de complicidad y tiempo de calidad.$r9775_16_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 36
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_17_he_to_hen$Cuando Me Peinas Aunque No Sepas De Hijo a Papá$r9775_17_he_to_hen$,
  scene_visual = $r9775_17_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura cómica y el esfuerzo torpe pero amoroso de un padre aprendiendo a peinar.

Ligeramente descentrado detrás peinando con concentración, el papá, expresión de concentración extrema y ceño fruncido pero amoroso, sosteniendo un peine y gel para el cabello, intentando peinar un mechón rebelde hacia arriba. Sentado frente al espejo, su hijo ya adulto, expresión de diversión contenida, con el cabello parado en un peinado torcido resultado del intento, mirando el reflejo con sonrisa traviesa.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_17_he_to_hea$,
  background_details = $r9775_17_he_to_heb$Baño familiar en mañana luminosa, espejo grande, tocador con cepillos y clips de cabello dispersos de forma caótica.$r9775_17_he_to_heb$,
  magic_effects = $r9775_17_he_to_hec$Ninguno: escena puramente cómica y cotidiana, sin elementos mágicos añadidos.$r9775_17_he_to_hec$,
  lighting_color = $r9775_17_he_to_hed$Iluminación natural de mañana con tonos cálidos, sombras suaves. Atmósfera de comedia familiar amorosa.$r9775_17_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 17
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_17_she_to_hen$Cuando Me Peinas Aunque No Sepas De Hija a Papá$r9775_17_she_to_hen$,
  scene_visual = $r9775_17_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura cómica y el esfuerzo torpe pero amoroso de un padre aprendiendo a peinar.

Ligeramente descentrado detrás peinando con concentración, el papá, expresión de concentración extrema y ceño fruncido pero amoroso, sosteniendo un cepillo y una liga en la boca, intentando hacer una coleta. Sentada frente al espejo, su hija ya adulta, expresión de diversión contenida, con coleta chueca resultado del intento, mirando el reflejo con sonrisa traviesa.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_17_she_to_hea$,
  background_details = $r9775_17_she_to_heb$Baño familiar en mañana luminosa, espejo grande, tocador con cepillos y clips de cabello dispersos de forma caótica.$r9775_17_she_to_heb$,
  magic_effects = $r9775_17_she_to_hec$Ninguno: escena puramente cómica y cotidiana, sin elementos mágicos añadidos.$r9775_17_she_to_hec$,
  lighting_color = $r9775_17_she_to_hed$Iluminación natural de mañana con tonos cálidos, sombras suaves. Atmósfera de comedia familiar amorosa.$r9775_17_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 37
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_18_he_to_hen$El Hombre Que Me Enseñó a Ser un Hombre de Bien De Hijo a Papá$r9775_18_he_to_hen$,
  scene_visual = $r9775_18_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite seriedad amorosa y la transmisión silenciosa de un valor de vida fundamental.

Ligeramente descentrados en conversación, el papá, expresión seria pero amorosa, sosteniendo la mano de su hijo ya adulto, mirada directa y firme. Escuchando con atención, su hijo ya adulto, expresión atenta y seria, con postura de escucha activa, ojos enfocados en su papá.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_18_he_to_hea$,
  background_details = $r9775_18_he_to_heb$Biblioteca o estudio con libros en estantes, sillones cómodos, luz natural suave entrando por ventana.$r9775_18_he_to_heb$,
  magic_effects = $r9775_18_he_to_hec$Ninguno: escena seria y documental, sin elementos mágicos añadidos.$r9775_18_he_to_hec$,
  lighting_color = $r9775_18_he_to_hed$Iluminación natural suave con tonos cálidos pero serios, sombras delicadas. Atmósfera de lección de vida importante.$r9775_18_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 18
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_18_she_to_hen$El Hombre Que Me Enseñó Cómo Debo Ser Tratada De Hija a Papá$r9775_18_she_to_hen$,
  scene_visual = $r9775_18_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite seriedad amorosa y la transmisión silenciosa de un valor de vida fundamental.

Ligeramente descentrados en conversación, el papá, expresión seria pero amorosa, sosteniendo la mano de su hija ya adulta, mirada directa y firme. Escuchando con atención, su hija ya adulta, expresión atenta y seria, con postura de escucha activa, ojos enfocados en su papá.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_18_she_to_hea$,
  background_details = $r9775_18_she_to_heb$Biblioteca o estudio con libros en estantes, sillones cómodos, luz natural suave entrando por ventana.$r9775_18_she_to_heb$,
  magic_effects = $r9775_18_she_to_hec$Ninguno: escena seria y documental, sin elementos mágicos añadidos.$r9775_18_she_to_hec$,
  lighting_color = $r9775_18_she_to_hed$Iluminación natural suave con tonos cálidos pero serios, sombras delicadas. Atmósfera de lección de vida importante.$r9775_18_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 38
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_19_he_to_hen$Cuando Me Haces Sentir El Más Valiente De Hijo a Papá$r9775_19_he_to_hen$,
  scene_visual = $r9775_19_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite admiración pura y el instante mágico en que un hijo se siente el más valiente del mundo.

Ligeramente descentrado mostrándole a su papá un disfraz de superhéroe casero completo, su hijo ya adulto, expresión de timidez mezclada con felicidad, con capa improvisada y pose heroica, buscando la aprobación de su papá. Mirándolo con admiración total, el papá, expresión de admiración pura y orgullo, con mano en el corazón, sonrisa orgullosa.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_19_he_to_hea$,
  background_details = $r9775_19_he_to_heb$Ambiente de hogar en tarde de juegos, sala familiar luminosa, luz natural cálida, juguetes de héroes dispersos con cariño.$r9775_19_he_to_heb$,
  magic_effects = $r9775_19_he_to_hec$Un efecto sutil de spotlight dorado ilumina a su hijo como si su papá lo viera brillar. La magia debe sentirse mágica y completamente integrada dentro de una fotografía realista.$r9775_19_he_to_hec$,
  lighting_color = $r9775_19_he_to_hed$Iluminación natural cálida con efecto de spotlight dorado sobre su hijo, sombras suaves. Atmósfera de admiración pura y empoderamiento.$r9775_19_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 19
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_19_she_to_hen$Cuando Me Haces Sentir La Más Bonita De Hija a Papá$r9775_19_she_to_hen$,
  scene_visual = $r9775_19_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite admiración pura y el instante mágico en que una hija se siente la más bonita del mundo.

Ligeramente descentrada bajando una escalera elegante, su hija ya adulta, expresión de timidez mezclada con felicidad, con vestido especial bonito, cabello arreglado, buscando la aprobación de su papá. Mirándola con admiración total, el papá, expresión de admiración pura y orgullo, con mano en el corazón, sonrisa orgullosa.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_19_she_to_hea$,
  background_details = $r9775_19_she_to_heb$Ambiente de hogar antes de evento especial, escalera elegante, luz natural cálida, flores frescas en jarrón.$r9775_19_she_to_heb$,
  magic_effects = $r9775_19_she_to_hec$Un efecto sutil de spotlight dorado ilumina a su hija como si su papá la viera brillar. La magia debe sentirse mágica y completamente integrada dentro de una fotografía realista.$r9775_19_she_to_hec$,
  lighting_color = $r9775_19_she_to_hed$Iluminación natural cálida con efecto de spotlight dorado sobre su hija, sombras suaves.  Atmósfera de admiración pura y empoderamiento.$r9775_19_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 39
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_20_he_to_hen$Seré Tu Niño Para Siempre De Hijo a Papá$r9775_20_he_to_hen$,
  scene_visual = $r9775_20_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite una promesa eterna: sin importar el paso del tiempo, el vínculo entre padre e hijo permanece intacto.

En la mitad izquierda, ligeramente descentrado, el papá (edad actual) abrazando de pie a su hijo ya adulto ya adulto (edad actual del cliente), él abrazándolo con fuerza, cabeza en su hombro. En la mitad derecha, el mismo papá (ligeramente mayor, canas sutiles) abrazando a una versión futura de su hijo ya adulto ya adolescente, él todavía abrazándolo de la misma forma, cabeza en su hombro, mostrando que sin importar la edad, sigue siendo su niño.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_20_he_to_hea$,
  background_details = $r9775_20_he_to_heb$Un mismo jardín familiar bajo un gran árbol, mostrado en dos momentos distintos que fluyen naturalmente de un lado al otro de la escena, luz dorada atemporal en ambos.$r9775_20_he_to_heb$,
  magic_effects = $r9775_20_he_to_hec$Pétalos y hojas doradas caen suavemente en ambos momentos, conectando visualmente el pasado y el futuro. La magia debe sentirse atemporal y completamente integrada dentro de una fotografía realista.$r9775_20_he_to_hec$,
  lighting_color = $r9775_20_he_to_hed$Iluminación dorada atemporal con efecto de memoria y futuro, sombras suaves. Atmósfera de emoción profunda y promesa eterna.
$r9775_20_he_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'HE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 20
  AND is_active;

UPDATE personalized_templates SET
  name = $r9775_20_she_to_hen$Seré Tu Niña Para Siempre De Hija a Papá$r9775_20_she_to_hen$,
  scene_visual = $r9775_20_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite una promesa eterna: sin importar el paso del tiempo, el vínculo entre padre e hija permanece intacto.

En la mitad izquierda, ligeramente descentrado, el papá, edad actual, abrazando de pie a su hija ya adulta ya adulta (edad actual del cliente), ella abrazándolo con fuerza, cabeza en su hombro. En la mitad derecha, el mismo papá (ligeramente mayor, canas sutiles) abrazando a una versión futura de su hija ya adulta ya adolescente, ella todavía abrazándolo de la misma forma, cabeza en su hombro, mostrando que sin importar la edad, sigue siendo su niña.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9775_20_she_to_hea$,
  background_details = $r9775_20_she_to_heb$Un mismo jardín familiar bajo un gran árbol, mostrado en dos momentos distintos que fluyen naturalmente de un lado al otro de la escena, luz dorada atemporal en ambos.$r9775_20_she_to_heb$,
  magic_effects = $r9775_20_she_to_hec$Pétalos y hojas doradas caen suavemente en ambos momentos, conectando visualmente el pasado y el futuro. La magia debe sentirse atemporal y completamente integrada dentro de una fotografía realista.$r9775_20_she_to_hec$,
  lighting_color = $r9775_20_she_to_hed$Iluminación dorada atemporal con efecto de memoria y futuro, sombras suaves. Atmósfera de emoción profunda y promesa eterna.$r9775_20_she_to_hed$,
  updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND gender_direction = 'SHE_TO_HE'
  AND (regexp_replace(template_preview_key,'^.*Plantilla_0*(\d+)_.*$','\1'))::int = 40
  AND is_active;

UPDATE personalized_templates SET
  name = $r9861_1_he_to_shen$Mi Superheroína Sin Capa De Hijo a Mamá$r9861_1_he_to_shen$,
  scene_visual = $r9861_1_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza heroica y la certeza de que el amor de mamá lo hace invencible.

Ligeramente descentrada sobre una azotea de ciudad al atardecer, la mamá, expresión fuerte, confiada y protectora, vistiendo un bodysuit superheroico en rosa intenso, púrpura y dorado, cabello ondeando dramáticamente con el viento, una mano extendida protectoramente hacia su hijo ya adulto. Junto a ella, su hijo ya adulto, expresión de admiración y orgullo, con ropa casual, mirando a su mamá con asombro.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_1_he_to_shea$,
  background_details = $r9861_1_he_to_sheb$Skyline de ciudad al atardecer con rascacielos, cielo dramático en tonos naranja, rosa y púrpura, luces de ciudad encendiéndose.$r9861_1_he_to_sheb$,
  magic_effects = $r9861_1_he_to_shec$Un aura brillante rosa y dorada envuelve a la mamá, con partículas de energía flotando suavemente. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9861_1_he_to_shec$,
  lighting_color = $r9861_1_he_to_shed$Iluminación dramática de atardecer con rayos de luz solar atravesando las nubes. Predominan rosa intenso, púrpura, dorado y naranja atardecer. Atmósfera cinematográfica épica.$r9861_1_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_1_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_01_la_calma_que_me_enseno_a_respirar_de_hijo_a_mama.webp$r9861_1_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_1_she_to_shen$Mi Superheroína Sin Capa De Hija a Mamá$r9861_1_she_to_shen$,
  scene_visual = $r9861_1_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza heroica y la certeza de que el amor de mamá lo hace invencible.

Ligeramente descentrada sobre una azotea de ciudad al atardecer, la mamá, expresión fuerte, confiada y protectora, vistiendo un bodysuit superheroico en rosa intenso, púrpura y dorado, cabello ondeando dramáticamente con el viento, una mano extendida protectoramente hacia su hija ya adulta. Junto a ella, su hija ya adulta, expresión de admiración y orgullo, con ropa casual, mirando a su mamá con asombro.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_1_she_to_shea$,
  background_details = $r9861_1_she_to_sheb$Skyline de ciudad al atardecer con rascacielos, cielo dramático en tonos naranja, rosa y púrpura, luces de ciudad encendiéndose.$r9861_1_she_to_sheb$,
  magic_effects = $r9861_1_she_to_shec$Un aura brillante rosa y dorada envuelve a la mamá, con partículas de energía flotando suavemente. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9861_1_she_to_shec$,
  lighting_color = $r9861_1_she_to_shed$Iluminación dramática de atardecer con rayos de luz solar atravesando las nubes. Predominan rosa intenso, púrpura, dorado y naranja atardecer. Atmósfera cinematográfica épica.$r9861_1_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_1_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_21_la_calma_que_me_enseno_a_respirar_de_hija_a_mama.webp$r9861_1_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_2_he_to_shen$La Guerrera Que Nunca Se Rinde De Hijo a Mamá$r9861_2_he_to_shen$,
  scene_visual = $r9861_2_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite valentía y la certeza de que el coraje de mamá es su mejor enseñanza.

Ligeramente descentrada en un campo al amanecer, la mamá, expresión determinada y victoriosa, vistiendo armadura elegante de guerrera en rosa metálico, púrpura y dorado, sosteniendo un escudo con corazón grabado y una espada apuntando al cielo. Junto a ella, su hijo ya adulto, expresión valiente y orgullosa, con túnica de aprendiz, sosteniendo un escudo de madera a juego.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_2_he_to_shea$,
  background_details = $r9861_2_he_to_sheb$Campo abierto al amanecer con montañas al fondo, cielo dramático en rosa, naranja y dorado, banderas ondeando suavemente.$r9861_2_he_to_sheb$,
  magic_effects = $r9861_2_he_to_shec$La armadura de la mamá brilla con reflejos metálicos y un aura dorada la envuelve. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9861_2_he_to_shec$,
  lighting_color = $r9861_2_he_to_shed$Iluminación heroica de amanecer con rayos de luz dorada atravesando nubes. Predominan rosa metálico, púrpura, dorado y naranja amanecer. Atmósfera victoriosa e inspiracional.$r9861_2_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_2_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_02_el_mapa_de_tus_consejos_de_hijo_a_mama.webp$r9861_2_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_2_she_to_shen$La Guerrera Que Nunca Se Rinde De Hija a Mamá$r9861_2_she_to_shen$,
  scene_visual = $r9861_2_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite valentía y la certeza de que el coraje de mamá es su mejor enseñanza.

Ligeramente descentrada en un campo al amanecer, la mamá, expresión determinada y victoriosa, vistiendo armadura elegante de guerrera en rosa metálico, púrpura y dorado, sosteniendo un escudo con corazón grabado y una espada apuntando al cielo. Junto a ella, su hija ya adulta, expresión valiente y orgullosa, con túnica de aprendiz, sosteniendo un escudo de madera a juego.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_2_she_to_shea$,
  background_details = $r9861_2_she_to_sheb$Campo abierto al amanecer con montañas al fondo, cielo dramático en rosa, naranja y dorado, banderas ondeando suavemente.$r9861_2_she_to_sheb$,
  magic_effects = $r9861_2_she_to_shec$La armadura de la mamá brilla con reflejos metálicos y un aura dorada la envuelve. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9861_2_she_to_shec$,
  lighting_color = $r9861_2_she_to_shed$Iluminación heroica de amanecer con rayos de luz dorada atravesando nubes. Predominan rosa metálico, púrpura, dorado y naranja amanecer. Atmósfera victoriosa e inspiracional.$r9861_2_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_2_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_22_el_mapa_de_tus_consejos_de_hija_a_mama.webp$r9861_2_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_3_he_to_shen$Mi Reina Mi Todo De Hijo a Mamá$r9861_3_he_to_shen$,
  scene_visual = $r9861_3_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad tierna y la certeza de que mamá gobierna el corazón de su hijo ya adulto con amor.

Ligeramente descentrada sentada en un trono dorado y rosa, la mamá, expresión amorosa y serena, con corona delicada dorada y gemas rosas, vestido de reina fluido en tonos rosa suave y lavanda, una mano extendida hacia su hijo ya adulto. Junto al trono, su hijo ya adulto, expresión de amor y admiración, con outfit elegante de príncipe, sosteniendo la mano de su mamá.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_3_he_to_shea$,
  background_details = $r9861_3_he_to_sheb$Salón de trono mágico con columnas elegantes, ventanales con luz suave, cortinas de terciopelo rosa y dorado, flores decorativas.$r9861_3_he_to_sheb$,
  magic_effects = $r9861_3_he_to_shec$Partículas doradas flotan suavemente alrededor del trono. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$r9861_3_he_to_shec$,
  lighting_color = $r9861_3_he_to_shed$Iluminación suave y cálida tipo cuento de hadas. Predominan rosa suave, lavanda, dorado y blanco marfil. Atmósfera elegante y amorosa.$r9861_3_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_3_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_03_la_mesa_donde_siempre_vuelvo_de_hijo_a_mama.webp$r9861_3_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_3_she_to_shen$Mi Reina Mi Todo De Hija a Mamá$r9861_3_she_to_shen$,
  scene_visual = $r9861_3_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad tierna y la certeza de que mamá gobierna el corazón de su hija ya adulta con amor.

Ligeramente descentrada sentada en un trono dorado y rosa, la mamá, expresión amorosa y serena, con corona delicada dorada y gemas rosas, vestido de reina fluido en tonos rosa suave y lavanda, una mano extendida hacia su hija ya adulta. Junto al trono, su hija ya adulta, expresión de amor y admiración, con outfit elegante de princesa, sosteniendo la mano de su mamá.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_3_she_to_shea$,
  background_details = $r9861_3_she_to_sheb$Salón de trono mágico con columnas elegantes, ventanales con luz suave, cortinas de terciopelo rosa y dorado, flores decorativas.$r9861_3_she_to_sheb$,
  magic_effects = $r9861_3_she_to_shec$Partículas doradas flotan suavemente alrededor del trono. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$r9861_3_she_to_shec$,
  lighting_color = $r9861_3_she_to_shed$Iluminación suave y cálida tipo cuento de hadas. Predominan rosa suave, lavanda, dorado y blanco marfil. Atmósfera elegante y amorosa.$r9861_3_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_3_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_23_la_mesa_donde_siempre_vuelvo_de_hija_a_mama.webp$r9861_3_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_4_he_to_shen$Mi Ángel Protector De Hijo a Mamá$r9861_4_he_to_shen$,
  scene_visual = $r9861_4_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz celestial y la certeza de estar protegido bajo el amor incondicional de mamá.

Ligeramente descentrada, la mamá, expresión serena y protectora, con grandes alas de ángel blancas y doradas desplegadas, vestido largo blanco fluido, abrazando suavemente a su hijo ya adulto. Envuelto en sus alas, su hijo ya adulto, expresión de paz y confianza, con ropa clara y suave, mirando hacia arriba.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_4_he_to_shea$,
  background_details = $r9861_4_he_to_sheb$Cielo etéreo con nubes suaves blancas y doradas, luz divina emanando desde arriba.$r9861_4_he_to_sheb$,
  magic_effects = $r9861_4_he_to_shec$Un halo sutil de luz dorada brilla sobre la cabeza de la mamá y partículas brillantes flotan como polvo de estrellas. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$r9861_4_he_to_shec$,
  lighting_color = $r9861_4_he_to_shed$Iluminación celestial suave con tonos dorados y blancos. Predominan blanco, crema, dorado suave y celeste claro. Atmósfera de protección divina y paz.$r9861_4_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_4_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_04_tus_manos_hicieron_hogar_de_hijo_a_mama.webp$r9861_4_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_4_she_to_shen$Mi Ángel Protector De Hija a Mamá$r9861_4_she_to_shen$,
  scene_visual = $r9861_4_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz celestial y la certeza de estar protegida bajo el amor incondicional de mamá.

Ligeramente descentrada, la mamá, expresión serena y protectora, con grandes alas de ángel blancas y doradas desplegadas, vestido largo blanco fluido, abrazando suavemente a su hija ya adulta. Envuelta en sus alas, su hija ya adulta, expresión de paz y confianza, con ropa clara y suave, mirando hacia arriba.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_4_she_to_shea$,
  background_details = $r9861_4_she_to_sheb$Cielo etéreo con nubes suaves blancas y doradas, luz divina emanando desde arriba.$r9861_4_she_to_sheb$,
  magic_effects = $r9861_4_she_to_shec$Un halo sutil de luz dorada brilla sobre la cabeza de la mamá y partículas brillantes flotan como polvo de estrellas. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$r9861_4_she_to_shec$,
  lighting_color = $r9861_4_she_to_shed$Iluminación celestial suave con tonos dorados y blancos. Predominan blanco, crema, dorado suave y celeste claro. Atmósfera de protección divina y paz.$r9861_4_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_4_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_24_tus_manos_hicieron_hogar_de_hija_a_mama.webp$r9861_4_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_5_he_to_shen$La Maga de Mi Vida De Hijo a Mamá$r9861_5_he_to_shen$,
  scene_visual = $r9861_5_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro mágico y la certeza de que el amor de mamá puede hacer milagros.

Ligeramente descentrada en un bosque místico, la mamá, expresión sabia y amorosa, vistiendo túnica de maga en púrpura profundo, azul místico y dorado, una mano extendida emanando partículas de luz, otra sosteniendo una vara mágica. Junto a ella, su hijo ya adulto, expresión de asombro y fascinación, con túnica simple de aprendiz, extendiendo sus propias manos intentando imitar la magia.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_5_he_to_shea$,
  background_details = $r9861_5_he_to_sheb$Bosque encantado con árboles antiguos cubiertos de musgo brillante, luces mágicas flotando, luna llena parcialmente visible.$r9861_5_he_to_sheb$,
  magic_effects = $r9861_5_he_to_shec$Partículas doradas, púrpuras y azules flotan por todo el bosque, y orbes de luz brillan entre las ramas. La magia debe sentirse mística y completamente integrada dentro de una fotografía realista.$r9861_5_he_to_shec$,
  lighting_color = $r9861_5_he_to_shed$Iluminación mágica emanando de las manos de la mamá contra la penumbra del bosque. Predominan púrpura profundo, azul místico, dorado y turquesa mágico. Atmósfera mística y encantadora.$r9861_5_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_5_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_05_la_fuerza_que_no_hacia_ruido_de_hijo_a_mama.webp$r9861_5_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_5_she_to_shen$La Maga de Mi Vida De Hija a Mamá$r9861_5_she_to_shen$,
  scene_visual = $r9861_5_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro mágico y la certeza de que el amor de mamá puede hacer milagros.

Ligeramente descentrada en un bosque místico, la mamá, expresión sabia y amorosa, vistiendo túnica de maga en púrpura profundo, azul místico y dorado, una mano extendida emanando partículas de luz, otra sosteniendo una vara mágica. Junto a ella, su hija ya adulta, expresión de asombro y fascinación, con túnica simple de aprendiz, extendiendo sus propias manos intentando imitar la magia.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_5_she_to_shea$,
  background_details = $r9861_5_she_to_sheb$Bosque encantado con árboles antiguos cubiertos de musgo brillante, luces mágicas flotando, luna llena parcialmente visible.$r9861_5_she_to_sheb$,
  magic_effects = $r9861_5_she_to_shec$Partículas doradas, púrpuras y azules flotan por todo el bosque, y orbes de luz brillan entre las ramas. La magia debe sentirse mística y completamente integrada dentro de una fotografía realista.$r9861_5_she_to_shec$,
  lighting_color = $r9861_5_she_to_shed$Iluminación mágica emanando de las manos de la mamá contra la penumbra del bosque. Predominan púrpura profundo, azul místico, dorado y turquesa mágico. Atmósfera mística y encantadora.$r9861_5_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_5_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_25_la_fuerza_que_no_hacia_ruido_de_hija_a_mama.webp$r9861_5_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_6_he_to_shen$Mi Capitana del Corazón De Hijo a Mamá$r9861_6_he_to_shen$,
  scene_visual = $r9861_6_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite determinación y la certeza de que mamá guía el rumbo con firmeza y amor.

Ligeramente descentrada al timón, la mamá, expresión determinada y confiada, con uniforme de capitana naval azul marino con botones dorados, cabello recogido en trenza práctica, sosteniendo el timón con ambas manos. Junto a ella, su hijo ya adulto, expresión aventurera, con outfit náutico, sosteniendo un catalejo mirando al horizonte.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_6_he_to_shea$,
  background_details = $r9861_6_he_to_sheb$Barco de madera en mar abierto, olas dinámicas, cielo de atardecer dramático, velas infladas por el viento.$r9861_6_he_to_sheb$,
  magic_effects = $r9861_6_he_to_shec$El spray de agua marina brilla con destellos dorados de atardecer. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$r9861_6_he_to_shec$,
  lighting_color = $r9861_6_he_to_shed$Iluminación dramática de atardecer marino. Predominan azul marino profundo, dorado atardecer, naranja y blanco velas. Atmósfera de aventura y exploración.$r9861_6_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_6_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_06_el_abrigo_de_los_dias_dificiles_de_hijo_a_mama.webp$r9861_6_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_6_she_to_shen$Mi Capitana del Corazón De Hija a Mamá$r9861_6_she_to_shen$,
  scene_visual = $r9861_6_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite determinación y la certeza de que mamá guía el rumbo con firmeza y amor.

Ligeramente descentrada al timón, la mamá, expresión determinada y confiada, con uniforme de capitana naval azul marino con botones dorados, cabello recogido en trenza práctica, sosteniendo el timón con ambas manos. Junto a ella, su hija ya adulta, expresión aventurera, con outfit náutico, sosteniendo un catalejo mirando al horizonte.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_6_she_to_shea$,
  background_details = $r9861_6_she_to_sheb$Barco de madera en mar abierto, olas dinámicas, cielo de atardecer dramático, velas infladas por el viento.$r9861_6_she_to_sheb$,
  magic_effects = $r9861_6_she_to_shec$El spray de agua marina brilla con destellos dorados de atardecer. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$r9861_6_she_to_shec$,
  lighting_color = $r9861_6_she_to_shed$Iluminación dramática de atardecer marino. Predominan azul marino profundo, dorado atardecer, naranja y blanco velas. Atmósfera de aventura y exploración.$r9861_6_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_6_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_26_el_abrigo_de_los_dias_dificiles_de_hija_a_mama.webp$r9861_6_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_7_he_to_shen$Mi Ninja Silenciosa De Hijo a Mamá$r9861_7_he_to_shen$,
  scene_visual = $r9861_7_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite protección silenciosa y la certeza de que mamá aleja cualquier miedo sin hacer ruido.

Ligeramente descentrada en postura de combate elegante, la mamá, expresión concentrada y alerta, con outfit ninja en negro, púrpura oscuro y detalles plateados, cabello recogido en moño alto. Detrás de ella protegido, su hijo ya adulto, expresión segura y admirada, con outfit ninja, en postura de aprendiz imitando a su mamá.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_7_he_to_shea$,
  background_details = $r9861_7_he_to_sheb$Templo japonés tradicional al anochecer, árboles de cerezo con flores cayendo, luna llena grande y brillante.$r9861_7_he_to_sheb$,
  magic_effects = $r9861_7_he_to_shec$Pétalos de cerezo flotan suavemente en el aire bajo la luz lunar. La magia debe sentirse mística y completamente integrada dentro de una fotografía realista.$r9861_7_he_to_shec$,
  lighting_color = $r9861_7_he_to_shed$Iluminación lunar dramática con sombras suaves. Predominan negro, púrpura oscuro, plateado y azul nocturno. Atmósfera mística y protectora.$r9861_7_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_7_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_07_la_luz_de_las_pequenas_costumbres_de_hijo_a_mama.webp$r9861_7_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_7_she_to_shen$Mi Ninja Silenciosa De Hija a Mamá$r9861_7_she_to_shen$,
  scene_visual = $r9861_7_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite protección silenciosa y la certeza de que mamá aleja cualquier miedo sin hacer ruido.

Ligeramente descentrada en postura de combate elegante, la mamá, expresión concentrada y alerta, con outfit ninja en negro, púrpura oscuro y detalles plateados, cabello recogido en moño alto. Detrás de ella protegida, su hija ya adulta, expresión segura y admirada, con outfit ninja, en postura de aprendiz imitando a su mamá.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_7_she_to_shea$,
  background_details = $r9861_7_she_to_sheb$Templo japonés tradicional al anochecer, árboles de cerezo con flores cayendo, luna llena grande y brillante.$r9861_7_she_to_sheb$,
  magic_effects = $r9861_7_she_to_shec$Pétalos de cerezo flotan suavemente en el aire bajo la luz lunar. La magia debe sentirse mística y completamente integrada dentro de una fotografía realista.$r9861_7_she_to_shec$,
  lighting_color = $r9861_7_she_to_shed$Iluminación lunar dramática con sombras suaves. Predominan negro, púrpura oscuro, plateado y azul nocturno. Atmósfera mística y protectora.$r9861_7_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_7_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_27_la_luz_de_las_pequenas_costumbres_de_hija_a_mama.webp$r9861_7_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_8_he_to_shen$Mi Amazona Guerrera De Hijo a Mamá$r9861_8_he_to_shen$,
  scene_visual = $r9861_8_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ferocidad protectora y el orgullo de un hijo aprendiendo de su guerrera.

Ligeramente descentrada en pose noble de amazona, la mamá, expresión feroz y determinada, con outfit de amazona en tonos tierra, verde y dorado, trenzas guerreras y plumas decorativas, un arco decorativo colgado al hombro. Junto a ella, su hijo ya adulto, expresión valiente y orgullosa, con outfit tribal, sosteniendo un escudo de madera a juego.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_8_he_to_shea$,
  background_details = $r9861_8_he_to_sheb$Selva exuberante con cascada, vegetación densa, luz natural filtrándose entre hojas.$r9861_8_he_to_sheb$,
  magic_effects = $r9861_8_he_to_shec$Gotas de agua de la cascada brillan al reflejar la luz, y hojas flotan suavemente en el aire. La magia debe sentirse poderosa y completamente integrada dentro de una fotografía realista.$r9861_8_he_to_shec$,
  lighting_color = $r9861_8_he_to_shed$Luz natural filtrada de selva. Predominan verde selva, marrón tierra, dorado y turquesa agua. Atmósfera de tribu guerrera y naturaleza poderosa.$r9861_8_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_8_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_08_el_puente_hacia_mi_propio_camino_de_hijo_a_mama.webp$r9861_8_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_8_she_to_shen$Mi Amazona Guerrera De Hija a Mamá$r9861_8_she_to_shen$,
  scene_visual = $r9861_8_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ferocidad protectora y el orgullo de una hija aprendiendo de su guerrera.

Ligeramente descentrada en pose noble de amazona, la mamá, expresión feroz y determinada, con outfit de amazona en tonos tierra, verde y dorado, trenzas guerreras y plumas decorativas, un arco decorativo colgado al hombro. Junto a ella, su hija ya adulta, expresión valiente y orgullosa, con outfit tribal, sosteniendo un escudo de madera a juego.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_8_she_to_shea$,
  background_details = $r9861_8_she_to_sheb$Selva exuberante con cascada, vegetación densa, luz natural filtrándose entre hojas.$r9861_8_she_to_sheb$,
  magic_effects = $r9861_8_she_to_shec$Gotas de agua de la cascada brillan al reflejar la luz, y hojas flotan suavemente en el aire. La magia debe sentirse poderosa y completamente integrada dentro de una fotografía realista.$r9861_8_she_to_shec$,
  lighting_color = $r9861_8_she_to_shed$Luz natural filtrada de selva. Predominan verde selva, marrón tierra, dorado y turquesa agua. Atmósfera de tribu guerrera y naturaleza poderosa.$r9861_8_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_8_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_28_el_puente_hacia_mi_propio_camino_de_hija_a_mama.webp$r9861_8_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_9_he_to_shen$Mi Diosa del Amor Eterno De Hijo a Mamá$r9861_9_he_to_shen$,
  scene_visual = $r9861_9_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite devoción serena y la certeza de un amor materno divino.

Ligeramente descentrada frente a un templo griego flotante, la mamá, expresión serena y amorosa, con toga griega blanca y dorada, corona de flores rosas, una mano extendida emanando pequeños corazones brillantes. Junto a ella, su hijo ya adulto, expresión de adoración y paz, con túnica blanca simple, recibiendo la luz amorosa.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_9_he_to_shea$,
  background_details = $r9861_9_he_to_sheb$Templo griego con columnas blancas flotando en cielo de nubes doradas y rosadas, pétalos de rosa flotando.$r9861_9_he_to_sheb$,
  magic_effects = $r9861_9_he_to_shec$Corazones brillantes flotan suavemente entre ambas, y rayos de luz dorada atraviesan las nubes. La magia debe sentirse divina y completamente integrada dentro de una fotografía realista.$r9861_9_he_to_shec$,
  lighting_color = $r9861_9_he_to_shed$Iluminación celestial dorada. Predominan blanco, dorado brillante, rosa suave y lavanda celestial. Atmósfera divina y pacífica.$r9861_9_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_9_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_09_la_paciencia_que_me_dio_raices_de_hijo_a_mama.webp$r9861_9_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_9_she_to_shen$Mi Diosa del Amor Eterno De Hija a Mamá$r9861_9_she_to_shen$,
  scene_visual = $r9861_9_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite devoción serena y la certeza de un amor materno divino.

Ligeramente descentrada frente a un templo griego flotante, la mamá, expresión serena y amorosa, con toga griega blanca y dorada, corona de flores rosas, una mano extendida emanando pequeños corazones brillantes. Junto a ella, su hija ya adulta, expresión de adoración y paz, con túnica blanca simple, recibiendo la luz amorosa.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_9_she_to_shea$,
  background_details = $r9861_9_she_to_sheb$Templo griego con columnas blancas flotando en cielo de nubes doradas y rosadas, pétalos de rosa flotando.$r9861_9_she_to_sheb$,
  magic_effects = $r9861_9_she_to_shec$Corazones brillantes flotan suavemente entre ambas, y rayos de luz dorada atraviesan las nubes. La magia debe sentirse divina y completamente integrada dentro de una fotografía realista.$r9861_9_she_to_shec$,
  lighting_color = $r9861_9_she_to_shed$Iluminación celestial dorada. Predominan blanco, dorado brillante, rosa suave y lavanda celestial. Atmósfera divina y pacífica.$r9861_9_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_9_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_29_la_paciencia_que_me_dio_raices_de_hija_a_mama.webp$r9861_9_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_10_he_to_shen$Mi Titán Inquebrantable De Hijo a Mamá$r9861_10_he_to_shen$,
  scene_visual = $r9861_10_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza monumental y la seguridad absoluta de un hijo junto a su titán.

Ligeramente descentrada en escala poderosa, la mamá, expresión poderosa y amorosa, con túnica de titán en bronce, dorado y blanco, abrazando de pie a su hijo ya adulto. A su lado, su hijo ya adulto, expresión de seguridad y confianza, abrazándola con paz total.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_10_he_to_shea$,
  background_details = $r9861_10_he_to_sheb$Cima de montaña alta con nubes alrededor, cielo dramático con rayos de luz atravesando nubes.$r9861_10_he_to_sheb$,
  magic_effects = $r9861_10_he_to_shec$Un aura dorada de poder rodea a la mamá y el viento mueve dramáticamente su cabello y túnica. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9861_10_he_to_shec$,
  lighting_color = $r9861_10_he_to_shed$Iluminación épica dramática con rayos de luz atravesando nubes. Predominan bronce, dorado, blanco y gris nubes. Atmósfera mitológica y protectora.$r9861_10_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_10_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_10_la_voz_que_todavia_me_ordena_el_mundo_de_hijo_a_mama.webp$r9861_10_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_10_she_to_shen$Mi Titán Inquebrantable De Hija a Mamá$r9861_10_she_to_shen$,
  scene_visual = $r9861_10_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza monumental y la seguridad absoluta de una hija junto a su titán.

Ligeramente descentrada en escala poderosa, la mamá, expresión poderosa y amorosa, con túnica de titán en bronce, dorado y blanco, abrazando de pie a su hija ya adulta. A su lado, su hija ya adulta, expresión de seguridad y confianza, abrazándola con paz total.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_10_she_to_shea$,
  background_details = $r9861_10_she_to_sheb$Cima de montaña alta con nubes alrededor, cielo dramático con rayos de luz atravesando nubes.$r9861_10_she_to_sheb$,
  magic_effects = $r9861_10_she_to_shec$Un aura dorada de poder rodea a la mamá y el viento mueve dramáticamente su cabello y túnica. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9861_10_she_to_shec$,
  lighting_color = $r9861_10_she_to_shed$Iluminación épica dramática con rayos de luz atravesando nubes. Predominan bronce, dorado, blanco y gris nubes. Atmósfera mitológica y protectora.$r9861_10_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_10_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_30_la_voz_que_todavia_me_ordena_el_mundo_de_hija_a_mama.webp$r9861_10_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_11_he_to_shen$Mi Samurái de Honor De Hijo a Mamá$r9861_11_he_to_shen$,
  scene_visual = $r9861_11_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite honor y disciplina, con su hijo ya adulto aprendiendo el camino del guerrero de amor de su mamá.

Ligeramente descentrada en posición de combate honorable, la mamá, expresión honorable y sabia, con kimono samurái en rosa oscuro, negro y dorado, sosteniendo una katana con ambas manos en posición ceremonial. Junto a ella, su hijo ya adulto, expresión de respeto y concentración, con kimono simple, sosteniendo un bokken de madera.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_11_he_to_shea$,
  background_details = $r9861_11_he_to_sheb$Jardín zen japonés con puente rojo arqueado, árboles de cerezo en flor, templo japonés al fondo.$r9861_11_he_to_sheb$,
  magic_effects = $r9861_11_he_to_shec$Pétalos de cerezo caen suavemente reflejándose en el agua del estanque. La magia debe sentirse honorable y completamente integrada dentro de una fotografía realista.$r9861_11_he_to_shec$,
  lighting_color = $r9861_11_he_to_shed$Iluminación suave de amanecer japonés. Predominan rosa oscuro, negro, dorado, rosa cerezo y verde zen. Atmósfera de honor, disciplina y tradición.$r9861_11_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_11_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_11_el_refugio_de_las_conversaciones_pendientes_de_hijo_a_mama.webp$r9861_11_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_11_she_to_shen$Mi Samurái de Honor De Hija a Mamá$r9861_11_she_to_shen$,
  scene_visual = $r9861_11_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite honor y disciplina, con su hija ya adulta aprendiendo el camino del guerrero de amor de su mamá.

Ligeramente descentrada en posición de combate honorable, la mamá, expresión honorable y sabia, con kimono samurái en rosa oscuro, negro y dorado, sosteniendo una katana con ambas manos en posición ceremonial. Junto a ella, su hija ya adulta, expresión de respeto y concentración, con kimono simple, sosteniendo un bokken de madera.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_11_she_to_shea$,
  background_details = $r9861_11_she_to_sheb$Jardín zen japonés con puente rojo arqueado, árboles de cerezo en flor, templo japonés al fondo.$r9861_11_she_to_sheb$,
  magic_effects = $r9861_11_she_to_shec$Pétalos de cerezo caen suavemente reflejándose en el agua del estanque. La magia debe sentirse honorable y completamente integrada dentro de una fotografía realista.$r9861_11_she_to_shec$,
  lighting_color = $r9861_11_she_to_shed$Iluminación suave de amanecer japonés. Predominan rosa oscuro, negro, dorado, rosa cerezo y verde zen. Atmósfera de honor, disciplina y tradición.$r9861_11_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_11_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_31_el_refugio_de_las_conversaciones_pendientes_de_hija_a_mama.webp$r9861_11_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_12_he_to_shen$La Heroína Que No Necesita Capa De Hijo a Mamá$r9861_12_he_to_shen$,
  scene_visual = $r9861_12_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite heroísmo cotidiano: mamá no necesita traje especial para ser la heroína de su hijo ya adulto.

Ligeramente descentrada en su hogar, la mamá, expresión cálida y natural, con ropa cotidiana en colores suaves, abrazando protectoramente a su hijo ya adulto, un aura rosa y dorada brillando sutilmente a su alrededor sin traje especial. Abrazándola, su hijo ya adulto, expresión de amor y seguridad, con ropa casual cómoda.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_12_he_to_shea$,
  background_details = $r9861_12_he_to_sheb$Interior de hogar acogedor con fotos familiares en las paredes, muebles cómodos, luz cálida.$r9861_12_he_to_sheb$,
  magic_effects = $r9861_12_he_to_shec$Partículas doradas flotan suavemente alrededor del abrazo, como magia cotidiana. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$r9861_12_he_to_shec$,
  lighting_color = $r9861_12_he_to_shed$Iluminación cálida de hogar con brillo heroico sutil. Predominan beige, crema, marrón suave con acentos rosa y dorado. Atmósfera de heroísmo cotidiano.$r9861_12_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_12_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_12_la_brujula_de_mis_decisiones_de_hijo_a_mama.webp$r9861_12_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_12_she_to_shen$La Heroína Que No Necesita Capa De Hija a Mamá$r9861_12_she_to_shen$,
  scene_visual = $r9861_12_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite heroísmo cotidiano: mamá no necesita traje especial para ser la heroína de su hija ya adulta.

Ligeramente descentrada en su hogar, la mamá, expresión cálida y natural, con ropa cotidiana en colores suaves, abrazando protectoramente a su hija ya adulta, un aura rosa y dorada brillando sutilmente a su alrededor sin traje especial. Abrazándola, su hija ya adulta, expresión de amor y seguridad, con ropa casual cómoda.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_12_she_to_shea$,
  background_details = $r9861_12_she_to_sheb$Interior de hogar acogedor con fotos familiares en las paredes, muebles cómodos, luz cálida.$r9861_12_she_to_sheb$,
  magic_effects = $r9861_12_she_to_shec$Partículas doradas flotan suavemente alrededor del abrazo, como magia cotidiana. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$r9861_12_she_to_shec$,
  lighting_color = $r9861_12_she_to_shed$Iluminación cálida de hogar con brillo heroico sutil. Predominan beige, crema, marrón suave con acentos rosa y dorado. Atmósfera de heroísmo cotidiano.$r9861_12_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_12_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_32_la_brujula_de_mis_decisiones_de_hija_a_mama.webp$r9861_12_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_13_he_to_shen$Tus Abrazos Mágicos De Hijo a Mamá$r9861_13_he_to_shen$,
  scene_visual = $r9861_13_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sanación emocional y la certeza de que un abrazo de mamá cura cualquier dolor.

Ligeramente descentrada, la mamá, expresión de ternura profunda, sentada abrazando completamente a su hijo ya adulto contra su pecho, con ropa cómoda y suave en colores cálidos pastel. Envuelto en el abrazo, su hijo ya adulto, expresión de paz y consuelo, con rostro contra el hombro de su mamá.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_13_he_to_shea$,
  background_details = $r9861_13_he_to_sheb$Ambiente íntimo de sala acogedora, luz cálida difusa, elementos de hogar desenfocados.$r9861_13_he_to_sheb$,
  magic_effects = $r9861_13_he_to_shec$Un aura sanadora rosa suave y dorada emana del abrazo, con pequeños corazones flotando. La magia debe sentirse reconfortante y completamente integrada dentro de una fotografía realista.$r9861_13_he_to_shec$,
  lighting_color = $r9861_13_he_to_shed$Luz suave y cálida difusa. Predominan rosa suave, lavanda claro, dorado cálido y crema. Atmósfera de sanación emocional y refugio.$r9861_13_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_13_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_13_el_jardin_de_lo_que_sembraste_en_mi_de_hijo_a_mama.webp$r9861_13_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_13_she_to_shen$Tus Abrazos Mágicos De Hija a Mamá$r9861_13_she_to_shen$,
  scene_visual = $r9861_13_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sanación emocional y la certeza de que un abrazo de mamá cura cualquier dolor.

Ligeramente descentrada, la mamá, expresión de ternura profunda, sentada abrazando completamente a su hija ya adulta contra su pecho, con ropa cómoda y suave en colores cálidos pastel. Envuelta en el abrazo, su hija ya adulta, expresión de paz y consuelo, con rostro contra el hombro de su mamá.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_13_she_to_shea$,
  background_details = $r9861_13_she_to_sheb$Ambiente íntimo de sala acogedora, luz cálida difusa, elementos de hogar desenfocados.$r9861_13_she_to_sheb$,
  magic_effects = $r9861_13_she_to_shec$Un aura sanadora rosa suave y dorada emana del abrazo, con pequeños corazones flotando. La magia debe sentirse reconfortante y completamente integrada dentro de una fotografía realista.$r9861_13_she_to_shec$,
  lighting_color = $r9861_13_she_to_shed$Luz suave y cálida difusa. Predominan rosa suave, lavanda claro, dorado cálido y crema. Atmósfera de sanación emocional y refugio.$r9861_13_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_13_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_33_el_jardin_de_lo_que_sembraste_en_mi_de_hija_a_mama.webp$r9861_13_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_14_he_to_shen$El Ritual Más Sagrado De Hijo a Mamá$r9861_14_he_to_shen$,
  scene_visual = $r9861_14_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura nocturna y el ritual sagrado del beso de buenas noches.

Ligeramente descentrada inclinada sobre la cama, la mamá, expresión de ternura infinita, besando suavemente la frente de su hijo ya adulto, una mano acariciando su cabello. Acostado en la cama, su hijo ya adulto, expresión de paz y somnolencia, con ojos cerrados recibiendo el beso.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_14_he_to_shea$,
  background_details = $r9861_14_he_to_sheb$Habitación acogedora de noche, ventana con luna llena y estrellas, elementos decorativos cerca.$r9861_14_he_to_sheb$,
  magic_effects = $r9861_14_he_to_shec$Partículas mágicas como polvo de estrellas flotan suavemente por la habitación. La magia debe sentirse tierna y completamente integrada dentro de una fotografía realista.$r9861_14_he_to_shec$,
  lighting_color = $r9861_14_he_to_shed$Luz suave de luna entrando por la ventana. Predominan azul nocturno suave, lavanda, plateado lunar y rosa pálido. Atmósfera de ritual nocturno y paz.$r9861_14_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_14_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_14_la_casa_que_llevo_por_dentro_de_hijo_a_mama.webp$r9861_14_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_14_she_to_shen$El Ritual Más Sagrado De Hija a Mamá$r9861_14_she_to_shen$,
  scene_visual = $r9861_14_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura nocturna y el ritual sagrado del beso de buenas noches.

Ligeramente descentrada inclinada sobre la cama, la mamá, expresión de ternura infinita, besando suavemente la frente de su hija ya adulta, una mano acariciando su cabello. Acostado en la cama, su hija ya adulta, expresión de paz y somnolencia, con ojos cerrados recibiendo el beso.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_14_she_to_shea$,
  background_details = $r9861_14_she_to_sheb$Habitación acogedora de noche, ventana con luna llena y estrellas, elementos decorativos cerca.$r9861_14_she_to_sheb$,
  magic_effects = $r9861_14_she_to_shec$Partículas mágicas como polvo de estrellas flotan suavemente por la habitación. La magia debe sentirse tierna y completamente integrada dentro de una fotografía realista.$r9861_14_she_to_shec$,
  lighting_color = $r9861_14_she_to_shed$Luz suave de luna entrando por la ventana. Predominan azul nocturno suave, lavanda, plateado lunar y rosa pálido. Atmósfera de ritual nocturno y paz.$r9861_14_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_14_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_34_la_casa_que_llevo_por_dentro_de_hija_a_mama.webp$r9861_14_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_15_he_to_shen$Recetas de Amor De Hijo a Mamá$r9861_15_he_to_shen$,
  scene_visual = $r9861_15_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad culinaria y memorias dulces creadas juntas.

Ligeramente descentrada en la cocina, la mamá, expresión feliz y paciente, con delantal decorativo, ayudando a su hijo ya adulto a mezclar ingredientes. Junto a ella en un mesón, su hijo ya adulto, expresión de concentración feliz, con delantal pequeño, decorando con ingredientes.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_15_he_to_shea$,
  background_details = $r9861_15_he_to_sheb$Cocina acogedora familiar con ingredientes frescos, utensilios, plantas en la ventana con luz natural.$r9861_15_he_to_sheb$,
  magic_effects = $r9861_15_he_to_shec$Partículas de harina o polvo dorado flotan sutilmente en el aire de la cocina. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$r9861_15_he_to_shec$,
  lighting_color = $r9861_15_he_to_shed$Luz natural cálida de cocina. Predominan amarillo suave, naranja, marrón madera y verde fresco. Atmósfera familiar y alegre.$r9861_15_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_15_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_15_el_oficio_silencioso_de_cuidar_de_hijo_a_mama.webp$r9861_15_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_15_she_to_shen$Recetas de Amor De Hija a Mamá$r9861_15_she_to_shen$,
  scene_visual = $r9861_15_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad culinaria y memorias dulces creadas juntas.

Ligeramente descentrada en la cocina, la mamá, expresión feliz y paciente, con delantal decorativo, ayudando a su hija ya adulta a mezclar ingredientes. Junto a ella en un mesón, su hija ya adulta, expresión de concentración feliz, con delantal pequeño, decorando con ingredientes.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_15_she_to_shea$,
  background_details = $r9861_15_she_to_sheb$Cocina acogedora familiar con ingredientes frescos, utensilios, plantas en la ventana con luz natural.$r9861_15_she_to_sheb$,
  magic_effects = $r9861_15_she_to_shec$Partículas de harina o polvo dorado flotan sutilmente en el aire de la cocina. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$r9861_15_she_to_shec$,
  lighting_color = $r9861_15_she_to_shed$Luz natural cálida de cocina. Predominan amarillo suave, naranja, marrón madera y verde fresco. Atmósfera familiar y alegre.$r9861_15_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_15_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_35_el_oficio_silencioso_de_cuidar_de_hija_a_mama.webp$r9861_15_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_16_he_to_shen$Mi Valiente Compañera De Hijo a Mamá$r9861_16_he_to_shen$,
  scene_visual = $r9861_16_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el valor de un nuevo comienzo caminado de la mano.

Ligeramente descentradas caminando hacia la escuela, la mamá, expresión alentadora y orgullosa, sosteniendo firmemente la mano de su hijo ya adulto, inclinándose con ánimo hacia ella. Junto a ella, su hijo ya adulto, expresión de nervios y valentía, con mochila en la espalda, mirando hacia la escuela.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_16_he_to_shea$,
  background_details = $r9861_16_he_to_sheb$Entrada de escuela en mañana soleada, camino con árboles, cielo azul claro.$r9861_16_he_to_sheb$,
  magic_effects = $r9861_16_he_to_shec$Un brillo sutil dorado rodea las manos unidas, simbolizando la valentía compartida. La magia debe sentirse esperanzadora y completamente integrada dentro de una fotografía realista.$r9861_16_he_to_shec$,
  lighting_color = $r9861_16_he_to_shed$Luz de mañana cálida y esperanzadora. Predominan azul cielo claro, verde naturaleza, amarillo sol mañanero. Atmósfera de nuevo comienzo y apoyo maternal.$r9861_16_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_16_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_16_la_risa_que_me_devuelve_al_origen_de_hijo_a_mama.webp$r9861_16_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_16_she_to_shen$Mi Valiente Compañera De Hija a Mamá$r9861_16_she_to_shen$,
  scene_visual = $r9861_16_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el valor de un nuevo comienzo caminado de la mano.

Ligeramente descentradas caminando hacia la escuela, la mamá, expresión alentadora y orgullosa, sosteniendo firmemente la mano de su hija ya adulta, inclinándose con ánimo hacia ella. Junto a ella, su hija ya adulta, expresión de nervios y valentía, con mochila en la espalda, mirando hacia la escuela.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_16_she_to_shea$,
  background_details = $r9861_16_she_to_sheb$Entrada de escuela en mañana soleada, camino con árboles, cielo azul claro.$r9861_16_she_to_sheb$,
  magic_effects = $r9861_16_she_to_shec$Un brillo sutil dorado rodea las manos unidas, simbolizando la valentía compartida. La magia debe sentirse esperanzadora y completamente integrada dentro de una fotografía realista.$r9861_16_she_to_shec$,
  lighting_color = $r9861_16_she_to_shed$Luz de mañana cálida y esperanzadora. Predominan azul cielo claro, verde naturaleza, amarillo sol mañanero. Atmósfera de nuevo comienzo y apoyo maternal.$r9861_16_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_16_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_36_la_risa_que_me_devuelve_al_origen_de_hija_a_mama.webp$r9861_16_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_17_he_to_shen$Mi Enfermera del Alma De Hijo a Mamá$r9861_17_he_to_shen$,
  scene_visual = $r9861_17_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite cuidado devoto y consuelo cuando su hijo ya adulto no se siente bien.

Ligeramente descentrada sentada en un sofá acogedor, la mamá, expresión de ternura y cuidado, abrazando protectoramente a su hijo ya adulto, sosteniendo una taza de té con la otra mano. Recostado contra ella, su hijo ya adulto, expresión de gratitud y confianza, envuelto en una manta suave, mirando a su mamá.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_17_he_to_shea$,
  background_details = $r9861_17_he_to_sheb$Sala acogedora con sofá confortable, mesita con vaso de agua, peluches cerca.$r9861_17_he_to_sheb$,
  magic_effects = $r9861_17_he_to_shec$Un vapor suave sale de la taza de té y un aura sanadora muy sutil rosa y dorada envuelve la escena. La magia debe sentirse reconfortante y completamente integrada dentro de una fotografía realista.$r9861_17_he_to_shec$,
  lighting_color = $r9861_17_he_to_shed$Luz suave y difusa de habitación. Predominan beige, crema, rosa pálido y lavanda claro. Atmósfera de cuidado amoroso y confort.$r9861_17_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_17_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_17_el_legado_de_mirar_con_ternura_de_hijo_a_mama.webp$r9861_17_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_17_she_to_shen$Mi Enfermera del Alma De Hija a Mamá$r9861_17_she_to_shen$,
  scene_visual = $r9861_17_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite cuidado devoto y consuelo cuando su hija ya adulta no se siente bien.

Ligeramente descentrada sentada en un sofá acogedor, la mamá, expresión de ternura y cuidado, abrazando protectoramente a su hija ya adulta, sosteniendo una taza de té con la otra mano. Recostada contra ella, su hija ya adulta, expresión de gratitud y confianza, envuelta en una manta suave, mirando a su mamá.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_17_she_to_shea$,
  background_details = $r9861_17_she_to_sheb$Sala acogedora con sofá confortable, mesita con vaso de agua, peluches cerca.$r9861_17_she_to_sheb$,
  magic_effects = $r9861_17_she_to_shec$Un vapor suave sale de la taza de té y un aura sanadora muy sutil rosa y dorada envuelve la escena. La magia debe sentirse reconfortante y completamente integrada dentro de una fotografía realista.$r9861_17_she_to_shec$,
  lighting_color = $r9861_17_she_to_shed$Luz suave y difusa de habitación. Predominan beige, crema, rosa pálido y lavanda claro. Atmósfera de cuidado amoroso y confort.$r9861_17_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_17_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_37_el_legado_de_mirar_con_ternura_de_hija_a_mama.webp$r9861_17_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_18_he_to_shen$Secadora de Tristezas De Hijo a Mamá$r9861_18_he_to_shen$,
  scene_visual = $r9861_18_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo profundo cuando mamá seca cada lágrima con ternura infinita.

Ligeramente descentrada de pie junto a su hijo ya adulto, la mamá, expresión de empatía profunda, secando suavemente una lágrima de su mejilla con el pulgar. Frente a ella, su hijo ya adulto, expresión vulnerable pero encontrando alivio, con lágrimas siendo secadas, mirando a su mamá buscando consuelo.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_18_he_to_shea$,
  background_details = $r9861_18_he_to_sheb$Ambiente íntimo suave en sala o habitación, luz cálida difusa.$r9861_18_he_to_sheb$,
  magic_effects = $r9861_18_he_to_shec$Un aura de consuelo suave rosa y lavanda emana del contacto entre madre e hijo. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$r9861_18_he_to_shec$,
  lighting_color = $r9861_18_he_to_shed$Luz cálida y difusa. Predominan rosa suave, lavanda claro, crema y beige. Atmósfera de refugio emocional y consuelo.$r9861_18_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_18_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_18_la_ventana_donde_aprendi_a_esperar_de_hijo_a_mama.webp$r9861_18_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_18_she_to_shen$Secadora de Tristezas De Hija a Mamá$r9861_18_she_to_shen$,
  scene_visual = $r9861_18_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo profundo cuando mamá seca cada lágrima con ternura infinita.

Ligeramente descentrada de pie junto a su hija ya adulta, la mamá, expresión de empatía profunda, secando suavemente una lágrima de su mejilla con el pulgar. Frente a ella, su hija ya adulta, expresión vulnerable pero encontrando alivio, con lágrimas siendo secadas, mirando a su mamá buscando consuelo.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_18_she_to_shea$,
  background_details = $r9861_18_she_to_sheb$Ambiente íntimo suave en sala o habitación, luz cálida difusa.$r9861_18_she_to_sheb$,
  magic_effects = $r9861_18_she_to_shec$Un aura de consuelo suave rosa y lavanda emana del contacto entre madre e hija. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$r9861_18_she_to_shec$,
  lighting_color = $r9861_18_she_to_shed$Luz cálida y difusa. Predominan rosa suave, lavanda claro, crema y beige. Atmósfera de refugio emocional y consuelo.$r9861_18_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_18_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_38_la_ventana_donde_aprendi_a_esperar_de_hija_a_mama.webp$r9861_18_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_19_he_to_shen$Lecciones de Fortaleza De Hijo a Mamá$r9861_19_he_to_shen$,
  scene_visual = $r9861_19_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite empoderamiento y la lección de levantarse con las propias fuerzas.

Ligeramente descentrada extendiendo la mano sin levantar completamente a su hijo ya adulto, la mamá, expresión alentadora y sabia, en ropa deportiva casual, enseñando con paciencia. Levantándose con determinación, su hijo ya adulto, expresión de determinación valiente, con rodilla raspada, extendiendo su mano hacia su mamá.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_19_he_to_shea$,
  background_details = $r9861_19_he_to_sheb$Parque o sendero natural con árboles, cielo claro, camino donde ocurrió la caída.$r9861_19_he_to_sheb$,
  magic_effects = $r9861_19_he_to_shec$Partículas doradas de fortaleza flotan sutilmente alrededor de su hijo mientras se levanta. La magia debe sentirse empoderadora y completamente integrada dentro de una fotografía realista.$r9861_19_he_to_shec$,
  lighting_color = $r9861_19_he_to_shed$Luz natural clara y fuerte. Predominan verde naturaleza, azul cielo, marrón tierra y dorado fortaleza. Atmósfera de crecimiento y empoderamiento.$r9861_19_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_19_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_19_la_promesa_de_volver_a_casa_de_hijo_a_mama.webp$r9861_19_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_19_she_to_shen$Lecciones de Fortaleza De Hija a Mamá$r9861_19_she_to_shen$,
  scene_visual = $r9861_19_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite empoderamiento y la lección de levantarse con las propias fuerzas.

Ligeramente descentrada extendiendo la mano sin levantar completamente a su hija ya adulta, la mamá, expresión alentadora y sabia, en ropa deportiva casual, enseñando con paciencia. Levantándose con determinación, su hija ya adulta, expresión de determinación valiente, con rodilla raspada, extendiendo su mano hacia su mamá.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_19_she_to_shea$,
  background_details = $r9861_19_she_to_sheb$Parque o sendero natural con árboles, cielo claro, camino donde ocurrió la caída.$r9861_19_she_to_sheb$,
  magic_effects = $r9861_19_she_to_shec$Partículas doradas de fortaleza flotan sutilmente alrededor de su hija mientras se levanta. La magia debe sentirse empoderadora y completamente integrada dentro de una fotografía realista.$r9861_19_she_to_shec$,
  lighting_color = $r9861_19_she_to_shed$Luz natural clara y fuerte. Predominan verde naturaleza, azul cielo, marrón tierra y dorado fortaleza. Atmósfera de crecimiento y empoderamiento.$r9861_19_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_19_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_39_la_promesa_de_volver_a_casa_de_hija_a_mama.webp$r9861_19_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_20_he_to_shen$Mamá Mi Mejor Amiga De Hijo a Mamá$r9861_20_he_to_shen$,
  scene_visual = $r9861_20_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad genuina y la alegría de una amistad que trasciende el rol de madre.

Ligeramente descentradas riendo juntas en un banco de parque, la mamá, expresión de risa genuina, con ropa casual moderna, brazo alrededor de su hijo ya adulto. Junto a ella, su hijo ya adulto, expresión de risa y confianza, compartiendo un helado, contando algo con complicidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_20_he_to_shea$,
  background_details = $r9861_20_he_to_sheb$Parque con flores, luz natural brillante, ambiente alegre y colorido.$r9861_20_he_to_sheb$,
  magic_effects = $r9861_20_he_to_shec$Pequeñas partículas de felicidad (corazones y estrellas sutiles) flotan alrededor de ambas mientras ríen. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$r9861_20_he_to_shec$,
  lighting_color = $r9861_20_he_to_shed$Luz natural brillante y alegre. Predominan rosa brillante, amarillo sol, verde fresco y dorado felicidad. Atmósfera de amistad genuina y diversión.$r9861_20_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_20_he_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_20_siempre_sere_parte_de_tu_historia_de_hijo_a_mama.webp$r9861_20_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9861_20_she_to_shen$Mamá Mi Mejor Amiga De Hija a Mamá$r9861_20_she_to_shen$,
  scene_visual = $r9861_20_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad genuina y la alegría de una amistad que trasciende el rol de madre.

Ligeramente descentradas riendo juntas en un banco de parque, la mamá, expresión de risa genuina, con ropa casual moderna, brazo alrededor de su hija ya adulta. Junto a ella, su hija ya adulta, expresión de risa y confianza, compartiendo un helado, contando algo con complicidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9861_20_she_to_shea$,
  background_details = $r9861_20_she_to_sheb$Parque con flores, luz natural brillante, ambiente alegre y colorido.$r9861_20_she_to_sheb$,
  magic_effects = $r9861_20_she_to_shec$Pequeñas partículas de felicidad (corazones y estrellas sutiles) flotan alrededor de ambas mientras ríen. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$r9861_20_she_to_shec$,
  lighting_color = $r9861_20_she_to_shed$Luz natural brillante y alegre. Predominan rosa brillante, amarillo sol, verde fresco y dorado felicidad. Atmósfera de amistad genuina y diversión.
$r9861_20_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9861_20_she_to_shek$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_40_siempre_sere_parte_de_tu_historia_de_hija_a_mama.webp$r9861_20_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_1_he_to_hen$Mi Superhéroe de Canas Plateadas De Nieto a Abuelo$r9862_1_he_to_hen$,
  scene_visual = $r9862_1_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite admiración absoluta y la certeza de que el abuelo es un superhéroe real sin necesidad de poderes.

Ligeramente descentrado en postura heroica, el abuelo, expresión orgullosa y cálida, vestido como superhéroe clásico con traje azul y rojo, capa ondeando, brazos cruzados. Junto a él mirándolo con admiración absoluta, su nieto ya adulto, ojos brillantes y sonrisa enorme.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_1_he_to_hea$,
  background_details = $r9862_1_he_to_heb$Ciudad estilizada con edificios, cielo azul brillante con nubes, rayos de sol dorados iluminando a el abuelo.$r9862_1_he_to_heb$,
  magic_effects = $r9862_1_he_to_hec$Un destello heroico rodea a el abuelo y estrellas doradas flotan suavemente. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9862_1_he_to_hec$,
  lighting_color = $r9862_1_he_to_hed$Iluminación de cómic épico pero cálido, cielo azul brillante con rayos dorados. Atmósfera heroica, inspiradora y llena de amor.$r9862_1_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_1_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_01_la_calma_que_me_enseno_a_respirar_de_nieto_a_abuelo.webp$r9862_1_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_1_she_to_hen$Mi Superhéroe de Canas Plateadas De Nieta a Abuelo$r9862_1_she_to_hen$,
  scene_visual = $r9862_1_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite admiración absoluta y la certeza de que el abuelo es un superhéroe real sin necesidad de poderes.

Ligeramente descentrado en postura heroica, el abuelo, expresión orgullosa y cálida, vestido como superhéroe clásico con traje azul y rojo, capa ondeando, brazos cruzados. Junto a él mirándolo con admiración absoluta, su nieta ya adulta, ojos brillantes y sonrisa enorme.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_1_she_to_hea$,
  background_details = $r9862_1_she_to_heb$Ciudad estilizada con edificios, cielo azul brillante con nubes, rayos de sol dorados iluminando a el abuelo.$r9862_1_she_to_heb$,
  magic_effects = $r9862_1_she_to_hec$Un destello heroico rodea a el abuelo y estrellas doradas flotan suavemente. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9862_1_she_to_hec$,
  lighting_color = $r9862_1_she_to_hed$Iluminación de cómic épico pero cálido, cielo azul brillante con rayos dorados. Atmósfera heroica, inspiradora y llena de amor.$r9862_1_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_1_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_21_la_calma_que_me_enseno_a_respirar_de_nieta_a_abuelo.webp$r9862_1_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_2_he_to_hen$El Rey de Mi Corazón De Nieto a Abuelo$r9862_2_he_to_hen$,
  scene_visual = $r9862_2_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad y respeto reverente hacia el abuelo rey del hogar.

Ligeramente descentrado sentado en un trono elegante, el abuelo, expresión noble y cálida, vestido con túnica real en tonos dorados y púrpuras, corona brillante, cetro en una mano. Junto al trono, su nieto ya adulto, expresión de amor y respeto, mirándolo con admiración.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_2_he_to_hea$,
  background_details = $r9862_2_he_to_heb$Salón de castillo con columnas, cortinas de terciopelo, ventanas con luz dorada entrando, tapices en las paredes.$r9862_2_he_to_heb$,
  magic_effects = $r9862_2_he_to_hec$Luz celestial ilumina a el abuelo y destellos dorados brillan alrededor de la corona. La magia debe sentirse majestuosa y completamente integrada dentro de una fotografía realista.$r9862_2_he_to_hec$,
  lighting_color = $r9862_2_he_to_hed$Iluminación cálida con luz dorada entrando por las ventanas. Atmósfera majestuosa, noble y llena de amor.$r9862_2_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_2_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_02_el_mapa_de_tus_consejos_de_nieto_a_abuelo.webp$r9862_2_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_2_she_to_hen$El Rey de Mi Corazón De Nieta a Abuelo$r9862_2_she_to_hen$,
  scene_visual = $r9862_2_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad y respeto reverente hacia el abuelo rey del hogar.

Ligeramente descentrado sentado en un trono elegante, el abuelo, expresión noble y cálida, vestido con túnica real en tonos dorados y púrpuras, corona brillante, cetro en una mano. Junto al trono, su nieta ya adulta, expresión de amor y respeto, mirándolo con admiración.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_2_she_to_hea$,
  background_details = $r9862_2_she_to_heb$Salón de castillo con columnas, cortinas de terciopelo, ventanas con luz dorada entrando, tapices en las paredes.$r9862_2_she_to_heb$,
  magic_effects = $r9862_2_she_to_hec$Luz celestial ilumina a el abuelo y destellos dorados brillan alrededor de la corona. La magia debe sentirse majestuosa y completamente integrada dentro de una fotografía realista.$r9862_2_she_to_hec$,
  lighting_color = $r9862_2_she_to_hed$Iluminación cálida con luz dorada entrando por las ventanas. Atmósfera majestuosa, noble y llena de amor.$r9862_2_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_2_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_22_el_mapa_de_tus_consejos_de_nieta_a_abuelo.webp$r9862_2_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_3_he_to_hen$Mi Caballero de Armadura Dorada De Nieto a Abuelo$r9862_3_he_to_hen$,
  scene_visual = $r9862_3_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite lealtad protectora y el asombro de un nieto ante su caballero.

Ligeramente descentrado en postura protectora, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión noble y valiente, con armadura dorada brillante completa, casco bajo el brazo, espada noble en la mano. Junto a él tocando suavemente la armadura, su nieto ya adulto, expresión de asombro y admiración.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_3_he_to_hea$,
  background_details = $r9862_3_he_to_heb$Campo de batalla épico al atardecer, colinas verdes, cielo con tonos naranjas y dorados, banderas ondeando a lo lejos.$r9862_3_he_to_heb$,
  magic_effects = $r9862_3_he_to_hec$La luz dorada se refleja en la armadura con destellos heroicos sutiles. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9862_3_he_to_hec$,
  lighting_color = $r9862_3_he_to_hed$Iluminación de atardecer épico con tonos naranjas y dorados. Atmósfera épica, protectora y cálida.$r9862_3_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_3_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_03_la_mesa_donde_siempre_vuelvo_de_nieto_a_abuelo.webp$r9862_3_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_3_she_to_hen$Mi Caballero de Armadura Dorada De Nieta a Abuelo$r9862_3_she_to_hen$,
  scene_visual = $r9862_3_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite lealtad protectora y el asombro de una nieta ante su caballero.

Ligeramente descentrado en postura protectora, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión noble y valiente, con armadura dorada brillante completa, casco bajo el brazo, espada noble en la mano. Junto a él tocando suavemente la armadura, su nieta ya adulta, expresión de asombro y admiración.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_3_she_to_hea$,
  background_details = $r9862_3_she_to_heb$Campo de batalla épico al atardecer, colinas verdes, cielo con tonos naranjas y dorados, banderas ondeando a lo lejos.$r9862_3_she_to_heb$,
  magic_effects = $r9862_3_she_to_hec$La luz dorada se refleja en la armadura con destellos heroicos sutiles. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9862_3_she_to_hec$,
  lighting_color = $r9862_3_she_to_hed$Iluminación de atardecer épico con tonos naranjas y dorados. Atmósfera épica, protectora y cálida.$r9862_3_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_3_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_23_la_mesa_donde_siempre_vuelvo_de_nieta_a_abuelo.webp$r9862_3_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_4_he_to_hen$El Ángel Guardián de la Familia De Nieto a Abuelo$r9862_4_he_to_hen$,
  scene_visual = $r9862_4_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz celestial y la certeza de estar protegido desde el cielo del amor del abuelo.

Ligeramente descentrado flotando suavemente, el abuelo, expresión serena y protectora, con grandes alas de ángel blancas y doradas, túnica blanca suave. Debajo mirando hacia arriba con asombro, su nieto ya adulto, expresión de paz, brazos extendidos.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_4_he_to_hea$,
  background_details = $r9862_4_he_to_heb$Cielo celestial con nubes blancas y doradas, rayos de luz divina atravesando, estrellas brillantes dispersas.$r9862_4_he_to_heb$,
  magic_effects = $r9862_4_he_to_hec$Un halo dorado suave brilla sobre la cabeza del abuelo y plumas flotan suavemente. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$r9862_4_he_to_hec$,
  lighting_color = $r9862_4_he_to_hed$Iluminación celestial suave con tonos dorados y blancos. Atmósfera serena, protectora y de paz.$r9862_4_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_4_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_04_tus_manos_hicieron_hogar_de_nieto_a_abuelo.webp$r9862_4_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_4_she_to_hen$El Ángel Guardián de la Familia De Nieta a Abuelo$r9862_4_she_to_hen$,
  scene_visual = $r9862_4_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz celestial y la certeza de estar protegida desde el cielo del amor del abuelo.

Ligeramente descentrado flotando suavemente, el abuelo, expresión serena y protectora, con grandes alas de ángel blancas y doradas, túnica blanca suave. Debajo mirando hacia arriba con asombro, su nieta ya adulta, expresión de paz, brazos extendidos.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_4_she_to_hea$,
  background_details = $r9862_4_she_to_heb$Cielo celestial con nubes blancas y doradas, rayos de luz divina atravesando, estrellas brillantes dispersas.$r9862_4_she_to_heb$,
  magic_effects = $r9862_4_she_to_hec$Un halo dorado suave brilla sobre la cabeza del abuelo y plumas flotan suavemente. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$r9862_4_she_to_hec$,
  lighting_color = $r9862_4_she_to_hed$Iluminación celestial suave con tonos dorados y blancos. Atmósfera serena, protectora y de paz.$r9862_4_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_4_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_24_tus_manos_hicieron_hogar_de_nieta_a_abuelo.webp$r9862_4_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_5_he_to_hen$Capitán de Mil Aventuras De Nieto a Abuelo$r9862_5_he_to_hen$,
  scene_visual = $r9862_5_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite espíritu aventurero y la emoción compartida de explorar mundos de historias.

Ligeramente descentrado en la proa de un barco de madera elegante, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión determinada, vestido de capitán con chaqueta naval azul y botones dorados, catalejo en mano. Junto a él señalando emocionado hacia el horizonte, su nieto ya adulto, expresión aventurera, con ropa de marinero.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_5_he_to_hea$,
  background_details = $r9862_5_he_to_heb$Océano azul brillante con olas suaves, gaviotas volando, isla tropical visible a lo lejos.$r9862_5_he_to_heb$,
  magic_effects = $r9862_5_he_to_hec$El viento mueve la ropa y la luz del sol brilla suavemente sobre el agua. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$r9862_5_he_to_hec$,
  lighting_color = $r9862_5_he_to_hed$Iluminación náutica brillante con reflejos dorados en el agua. Atmósfera aventurera, emocionante y de complicidad.$r9862_5_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_5_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_05_la_fuerza_que_no_hacia_ruido_de_nieto_a_abuelo.webp$r9862_5_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_5_she_to_hen$Capitán de Mil Aventuras De Nieta a Abuelo$r9862_5_she_to_hen$,
  scene_visual = $r9862_5_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite espíritu aventurero y la emoción compartida de explorar mundos de historias.

Ligeramente descentrado en la proa de un barco de madera elegante, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión determinada, vestido de capitán con chaqueta naval azul y botones dorados, catalejo en mano. Junto a él señalando emocionada hacia el horizonte, su nieta ya adulta, expresión aventurera, con ropa de marinero.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_5_she_to_hea$,
  background_details = $r9862_5_she_to_heb$Océano azul brillante con olas suaves, gaviotas volando, isla tropical visible a lo lejos.$r9862_5_she_to_heb$,
  magic_effects = $r9862_5_she_to_hec$El viento mueve la ropa y la luz del sol brilla suavemente sobre el agua. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$r9862_5_she_to_hec$,
  lighting_color = $r9862_5_she_to_hed$Iluminación náutica brillante con reflejos dorados en el agua. Atmósfera aventurera, emocionante y de complicidad.$r9862_5_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_5_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_25_la_fuerza_que_no_hacia_ruido_de_nieta_a_abuelo.webp$r9862_5_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_6_he_to_hen$El Sabio de Todas las Historias De Nieto a Abuelo$r9862_6_he_to_hen$,
  scene_visual = $r9862_6_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sabiduría ancestral y la fascinación de escuchar historias que guardan tesoros de vida.

Ligeramente descentrado sentado en una silla de madera antigua, el abuelo, expresión sabia y cálida, vestido como sabio anciano con túnica en tonos tierra, bastón tallado con símbolos místicos. Sentado en el suelo escuchando atentamente, su nieto ya adulto, ojos llenos de fascinación.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_6_he_to_hea$,
  background_details = $r9862_6_he_to_heb$Biblioteca mágica con estanterías infinitas, libros antiguos flotantes, pergaminos brillantes, velas flotantes.$r9862_6_he_to_heb$,
  magic_effects = $r9862_6_he_to_hec$Símbolos místicos brillan suavemente en el aire cerca de los libros flotantes. La magia debe sentirse sabia y completamente integrada dentro de una fotografía realista.$r9862_6_he_to_hec$,
  lighting_color = $r9862_6_he_to_hed$Iluminación dorada suave de biblioteca mágica con polvo de estrellas en el aire. Atmósfera sabia, mística y de conocimiento.$r9862_6_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_6_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_06_el_abrigo_de_los_dias_dificiles_de_nieto_a_abuelo.webp$r9862_6_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_6_she_to_hen$El Sabio de Todas las Historias De Nieta a Abuelo$r9862_6_she_to_hen$,
  scene_visual = $r9862_6_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sabiduría ancestral y la fascinación de escuchar historias que guardan tesoros de vida.

Ligeramente descentrado sentado en una silla de madera antigua, el abuelo, expresión sabia y cálida, vestido como sabio anciano con túnica en tonos tierra, bastón tallado con símbolos místicos. Sentado en el suelo escuchando atentamente, su nieta ya adulta, ojos llenos de fascinación.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_6_she_to_hea$,
  background_details = $r9862_6_she_to_heb$Biblioteca mágica con estanterías infinitas, libros antiguos flotantes, pergaminos brillantes, velas flotantes.$r9862_6_she_to_heb$,
  magic_effects = $r9862_6_she_to_hec$Símbolos místicos brillan suavemente en el aire cerca de los libros flotantes. La magia debe sentirse sabia y completamente integrada dentro de una fotografía realista.$r9862_6_she_to_hec$,
  lighting_color = $r9862_6_she_to_hed$Iluminación dorada suave de biblioteca mágica con polvo de estrellas en el aire. Atmósfera sabia, mística y de conocimiento.$r9862_6_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_6_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_26_el_abrigo_de_los_dias_dificiles_de_nieta_a_abuelo.webp$r9862_6_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_7_he_to_hen$Mi Guerrero Invencible De Nieto a Abuelo$r9862_7_he_to_hen$,
  scene_visual = $r9862_7_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza victoriosa y la determinación de nunca rendirse.

Ligeramente descentrado en postura de batalla victoriosa, el abuelo, expresión heroica, con armadura de cuero y metal, casco con plumas, escudo con emblema familiar, espada en mano. A su lado imitando su postura con determinación, su nieto ya adulto, expresión valiente, con armadura a juego.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_7_he_to_hea$,
  background_details = $r9862_7_he_to_heb$Campo de batalla al amanecer, montañas al fondo, cielo con nubes dramáticas pero luz esperanzadora.$r9862_7_he_to_heb$,
  magic_effects = $r9862_7_he_to_hec$Una luz heroica ilumina a el abuelo y destellos brillan en las armas. La magia debe sentirse victoriosa y completamente integrada dentro de una fotografía realista.$r9862_7_he_to_hec$,
  lighting_color = $r9862_7_he_to_hed$Iluminación de amanecer con nubes dramáticas y luz esperanzadora. Atmósfera épica, heroica y determinada.$r9862_7_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_7_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_07_la_luz_de_las_pequenas_costumbres_de_nieto_a_abuelo.webp$r9862_7_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_7_she_to_hen$Mi Guerrero Invencible De Nieta a Abuelo$r9862_7_she_to_hen$,
  scene_visual = $r9862_7_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza victoriosa y la determinación de nunca rendirse.

Ligeramente descentrado en postura de batalla victoriosa, el abuelo, expresión heroica, con armadura de cuero y metal, casco con plumas, escudo con emblema familiar, espada en mano. A su lado imitando su postura con determinación, su nieta ya adulta, expresión valiente, con armadura a juego.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_7_she_to_hea$,
  background_details = $r9862_7_she_to_heb$Campo de batalla al amanecer, montañas al fondo, cielo con nubes dramáticas pero luz esperanzadora.$r9862_7_she_to_heb$,
  magic_effects = $r9862_7_she_to_hec$Una luz heroica ilumina a el abuelo y destellos brillan en las armas. La magia debe sentirse victoriosa y completamente integrada dentro de una fotografía realista.$r9862_7_she_to_hec$,
  lighting_color = $r9862_7_she_to_hed$Iluminación de amanecer con nubes dramáticas y luz esperanzadora. Atmósfera épica, heroica y determinada.$r9862_7_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_7_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_27_la_luz_de_las_pequenas_costumbres_de_nieta_a_abuelo.webp$r9862_7_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_8_he_to_hen$El Arquitecto de Mis Recuerdos De Nieto a Abuelo$r9862_8_he_to_hen$,
  scene_visual = $r9862_8_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite creación amorosa: el abuelo construyendo memorias que forman el corazón de su nieto ya adulto.

Ligeramente descentrado frente a una estructura mágica de recuerdos, el abuelo, expresión creativa y amorosa, vestido como arquitecto clásico con planos enrollados en mano. Junto a él colocando un bloque brillante, su nieto ya adulto, sonrisa feliz.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_8_he_to_hea$,
  background_details = $r9862_8_he_to_heb$Espacio mágico con planos flotantes, herramientas brillantes, estructura de recuerdos con fotos flotantes y bloques de luz dorada.$r9862_8_he_to_heb$,
  magic_effects = $r9862_8_he_to_hec$Luz dorada emana de los recuerdos y partículas brillantes flotan alrededor. La magia debe sentirse creativa y completamente integrada dentro de una fotografía realista.$r9862_8_he_to_hec$,
  lighting_color = $r9862_8_he_to_hed$Iluminación dorada mágica de creación. Atmósfera creativa, constructiva y llena de amor.$r9862_8_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_8_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_08_el_puente_hacia_mi_propio_camino_de_nieto_a_abuelo.webp$r9862_8_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_8_she_to_hen$El Arquitecto de Mis Recuerdos De Nieta a Abuelo$r9862_8_she_to_hen$,
  scene_visual = $r9862_8_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite creación amorosa: el abuelo construyendo memorias que forman el corazón de su nieta ya adulta.

Ligeramente descentrado frente a una estructura mágica de recuerdos, el abuelo, expresión creativa y amorosa, vestido como arquitecto clásico con planos enrollados en mano. Junto a él colocando un bloque brillante, su nieta ya adulta, sonrisa feliz.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_8_she_to_hea$,
  background_details = $r9862_8_she_to_heb$Espacio mágico con planos flotantes, herramientas brillantes, estructura de recuerdos con fotos flotantes y bloques de luz dorada.$r9862_8_she_to_heb$,
  magic_effects = $r9862_8_she_to_hec$Luz dorada emana de los recuerdos y partículas brillantes flotan alrededor. La magia debe sentirse creativa y completamente integrada dentro de una fotografía realista.$r9862_8_she_to_hec$,
  lighting_color = $r9862_8_she_to_hed$Iluminación dorada mágica de creación. Atmósfera creativa, constructiva y llena de amor.$r9862_8_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_8_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_28_el_puente_hacia_mi_propio_camino_de_nieta_a_abuelo.webp$r9862_8_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_9_he_to_hen$Mi Titán de Amor De Nieto a Abuelo$r9862_9_he_to_hen$,
  scene_visual = $r9862_9_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite poder monumental y la seguridad absoluta de un nieto sostenido con ternura por su titán.

Ligeramente descentrado en escala imponente, el abuelo, expresión benevolente, representado como titán gigante con vestimenta mitológica en tonos tierra y dorado, sosteniendo suavemente en su mano a su nieto ya adulto, expresión de confianza sin miedo.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_9_he_to_hea$,
  background_details = $r9862_9_he_to_heb$Paisaje épico con montañas enormes, cielo dramático con nubes, valle verde abajo.$r9862_9_he_to_heb$,
  magic_effects = $r9862_9_he_to_hec$Luz divina ilumina al titán creando un contraste de tamaño dramático pero tierno. La magia debe sentirse poderosa y completamente integrada dentro de una fotografía realista.$r9862_9_he_to_hec$,
  lighting_color = $r9862_9_he_to_hed$Iluminación épica con rayos de sol atravesando nubes dramáticas. Atmósfera poderosa, protectora y llena de amor incondicional.$r9862_9_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_9_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_09_la_paciencia_que_me_dio_raices_de_nieto_a_abuelo.webp$r9862_9_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_9_she_to_hen$Mi Titán de Amor De Nieta a Abuelo$r9862_9_she_to_hen$,
  scene_visual = $r9862_9_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite poder monumental y la seguridad absoluta de una nieta sostenida con ternura por su titán.

Ligeramente descentrado en escala imponente, el abuelo, expresión benevolente, representado como titán gigante con vestimenta mitológica en tonos tierra y dorado, sosteniendo suavemente en su mano a su nieta ya adulta, expresión de confianza sin miedo.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_9_she_to_hea$,
  background_details = $r9862_9_she_to_heb$Paisaje épico con montañas enormes, cielo dramático con nubes, valle verde abajo.$r9862_9_she_to_heb$,
  magic_effects = $r9862_9_she_to_hec$Luz divina ilumina al titán creando un contraste de tamaño dramático pero tierno. La magia debe sentirse poderosa y completamente integrada dentro de una fotografía realista.$r9862_9_she_to_hec$,
  lighting_color = $r9862_9_she_to_hed$Iluminación épica con rayos de sol atravesando nubes dramáticas. Atmósfera poderosa, protectora y llena de amor incondicional.$r9862_9_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_9_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_29_la_paciencia_que_me_dio_raices_de_nieta_a_abuelo.webp$r9862_9_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_10_he_to_hen$El Guardián del Tiempo De Nieto a Abuelo$r9862_10_he_to_hen$,
  scene_visual = $r9862_10_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite conexión generacional, como si el abuelo fuera el puente entre el pasado y el futuro de la familia.

Ligeramente descentrado en un espacio dimensional donde las épocas se mezclan, el abuelo, expresión mística, vestido con túnica de símbolos de relojes y engranajes, reloj de bolsillo antiguo brillante en mano. Junto a él tocando el reloj fascinado, su nieto ya adulto, expresión de asombro.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_10_he_to_hea$,
  background_details = $r9862_10_he_to_heb$Espacio mágico con relojes flotantes de diferentes épocas, engranajes dorados girando, portales de tiempo mostrando momentos familiares.$r9862_10_he_to_heb$,
  magic_effects = $r9862_10_he_to_hec$Partículas de tiempo flotan y luz dorada y azul emana del reloj antiguo. La magia debe sentirse atemporal y completamente integrada dentro de una fotografía realista.$r9862_10_he_to_hec$,
  lighting_color = $r9862_10_he_to_hed$Iluminación mística dorada y azul del espacio temporal. Atmósfera mística, atemporal y de conexión generacional.$r9862_10_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_10_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_10_la_voz_que_todavia_me_ordena_el_mundo_de_nieto_a_abuelo.webp$r9862_10_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_10_she_to_hen$El Guardián del Tiempo De Nieta a Abuelo$r9862_10_she_to_hen$,
  scene_visual = $r9862_10_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite conexión generacional, como si el abuelo fuera el puente entre el pasado y el futuro de la familia.

Ligeramente descentrado en un espacio dimensional donde las épocas se mezclan, el abuelo, expresión mística, vestido con túnica de símbolos de relojes y engranajes, reloj de bolsillo antiguo brillante en mano. Junto a él tocando el reloj fascinada, su nieta ya adulta, expresión de asombro.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_10_she_to_hea$,
  background_details = $r9862_10_she_to_heb$Espacio mágico con relojes flotantes de diferentes épocas, engranajes dorados girando, portales de tiempo mostrando momentos familiares.$r9862_10_she_to_heb$,
  magic_effects = $r9862_10_she_to_hec$Partículas de tiempo flotan y luz dorada y azul emana del reloj antiguo. La magia debe sentirse atemporal y completamente integrada dentro de una fotografía realista.$r9862_10_she_to_hec$,
  lighting_color = $r9862_10_she_to_hed$Iluminación mística dorada y azul del espacio temporal. Atmósfera mística, atemporal y de conexión generacional.$r9862_10_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_10_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_30_la_voz_que_todavia_me_ordena_el_mundo_de_nieta_a_abuelo.webp$r9862_10_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_11_he_to_hen$Mi Faro en la Tormenta De Nieto a Abuelo$r9862_11_he_to_hen$,
  scene_visual = $r9862_11_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite guía segura en medio de la tormenta, con el abuelo como luz que nunca se apaga.

Ligeramente descentrado de pie junto a un faro majestuoso, el abuelo, expresión protectora, con una luz brillante emanando del faro detrás de él. A su lado en un barquito seguro, su nieto ya adulto, expresión de alivio mirándolo con confianza.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_11_he_to_hea$,
  background_details = $r9862_11_he_to_heb$Océano con olas grandes pero controladas, cielo nocturno con nubes dramáticas pero estrellas visibles, costa rocosa.$r9862_11_he_to_heb$,
  magic_effects = $r9862_11_he_to_hec$Un haz de luz poderoso del faro atraviesa la tormenta guiando el camino. La magia debe sentirse protectora y completamente integrada dentro de una fotografía realista.$r9862_11_he_to_hec$,
  lighting_color = $r9862_11_he_to_hed$Iluminación dramática nocturna con el haz de luz del faro como fuente principal. Atmósfera dramática pero esperanzadora, protectora.$r9862_11_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_11_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_11_el_refugio_de_las_conversaciones_pendientes_de_nieto_a_abuelo.webp$r9862_11_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_11_she_to_hen$Mi Faro en la Tormenta De Nieta a Abuelo$r9862_11_she_to_hen$,
  scene_visual = $r9862_11_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite guía segura en medio de la tormenta, con el abuelo como luz que nunca se apaga.

Ligeramente descentrado de pie junto a un faro majestuoso, el abuelo, expresión protectora, con una luz brillante emanando del faro detrás de él. A su lado en un barquito seguro, su nieta ya adulta, expresión de alivio mirándolo con confianza.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_11_she_to_hea$,
  background_details = $r9862_11_she_to_heb$Océano con olas grandes pero controladas, cielo nocturno con nubes dramáticas pero estrellas visibles, costa rocosa.$r9862_11_she_to_heb$,
  magic_effects = $r9862_11_she_to_hec$Un haz de luz poderoso del faro atraviesa la tormenta guiando el camino. La magia debe sentirse protectora y completamente integrada dentro de una fotografía realista.$r9862_11_she_to_hec$,
  lighting_color = $r9862_11_she_to_hed$Iluminación dramática nocturna con el haz de luz del faro como fuente principal. Atmósfera dramática pero esperanzadora, protectora.$r9862_11_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_11_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_31_el_refugio_de_las_conversaciones_pendientes_de_nieta_a_abuelo.webp$r9862_11_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_12_he_to_hen$El Gigante de Corazón Tierno De Nieto a Abuelo$r9862_12_he_to_hen$,
  scene_visual = $r9862_12_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura pura: un gigante amable que ama sin reservas.

Ligeramente descentrado de pie junto a su nieto ya adulto, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión dulce, representado como gigante amable de vestimenta simple en tonos tierra, abrazando suavemente con sus manos grandes. su nieto ya adulto, sonrisa sin miedo, sintiendo amor puro en el abrazo.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_12_he_to_hea$,
  background_details = $r9862_12_he_to_heb$Jardín mágico con flores gigantes, árboles enormes, mariposas grandes volando.$r9862_12_he_to_heb$,
  magic_effects = $r9862_12_he_to_hec$Pétalos flotan suavemente mientras una luz cálida envuelve el abrazo. La magia debe sentirse tierna y completamente integrada dentro de una fotografía realista.$r9862_12_he_to_hec$,
  lighting_color = $r9862_12_he_to_hed$Luz suave de atardecer envolviendo el jardín mágico. Atmósfera tierna, protectora y de amor gentil.$r9862_12_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_12_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_12_la_brujula_de_mis_decisiones_de_nieto_a_abuelo.webp$r9862_12_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_12_she_to_hen$El Gigante de Corazón Tierno De Nieta a Abuelo$r9862_12_she_to_hen$,
  scene_visual = $r9862_12_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura pura: un gigante amable que ama sin reservas.

Ligeramente descentrado de pie junto a su nieta ya adulta, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión dulce, representado como gigante amable de vestimenta simple en tonos tierra, abrazando suavemente con sus manos grandes. su nieta ya adulta, sonrisa sin miedo, sintiendo amor puro en el abrazo.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_12_she_to_hea$,
  background_details = $r9862_12_she_to_heb$Jardín mágico con flores gigantes, árboles enormes, mariposas grandes volando.$r9862_12_she_to_heb$,
  magic_effects = $r9862_12_she_to_hec$Pétalos flotan suavemente mientras una luz cálida envuelve el abrazo. La magia debe sentirse tierna y completamente integrada dentro de una fotografía realista.$r9862_12_she_to_hec$,
  lighting_color = $r9862_12_she_to_hed$Luz suave de atardecer envolviendo el jardín mágico. Atmósfera tierna, protectora y de amor gentil.$r9862_12_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_12_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_32_la_brujula_de_mis_decisiones_de_nieta_a_abuelo.webp$r9862_12_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_13_he_to_hen$Tus Historias Mágicas De Nieto a Abuelo$r9862_13_he_to_hen$,
  scene_visual = $r9862_13_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el hechizo cotidiano de un cuento contado con el corazón.

Ligeramente descentrado en una mecedora acogedora junto a la chimenea, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión animada, con un libro grande abierto en su regazo, contando una historia con gestos expresivos. Sentado a sus pies en el suelo con pijama, su nieto ya adulto, ojos llenos de asombro.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_13_he_to_hea$,
  background_details = $r9862_13_he_to_heb$Sala acogedora con luz cálida de chimenea, estantes con libros, ventana mostrando noche estrellada.$r9862_13_he_to_heb$,
  magic_effects = $r9862_13_he_to_hec$Elementos de la historia cobran vida sutilmente: un dragón pequeño translúcido y un castillo brillante flotan cerca del libro. La magia debe sentirse acogedora y completamente integrada dentro de una fotografía realista.$r9862_13_he_to_hec$,
  lighting_color = $r9862_13_he_to_hed$Luz dorada cálida de la chimenea. Atmósfera mágica, acogedora y llena de imaginación.$r9862_13_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_13_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_13_el_jardin_de_lo_que_sembraste_en_mi_de_nieto_a_abuelo.webp$r9862_13_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_13_she_to_hen$Tus Historias Mágicas De Nieta a Abuelo$r9862_13_she_to_hen$,
  scene_visual = $r9862_13_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el hechizo cotidiano de un cuento contado con el corazón.

Ligeramente descentrado en una mecedora acogedora junto a la chimenea, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión animada, con un libro grande abierto en su regazo, contando una historia con gestos expresivos. Sentado a sus pies en el suelo con pijama, su nieta ya adulta, ojos llenos de asombro.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_13_she_to_hea$,
  background_details = $r9862_13_she_to_heb$Sala acogedora con luz cálida de chimenea, estantes con libros, ventana mostrando noche estrellada.$r9862_13_she_to_heb$,
  magic_effects = $r9862_13_she_to_hec$Elementos de la historia cobran vida sutilmente: un dragón pequeño translúcido y un castillo brillante flotan cerca del libro. La magia debe sentirse acogedora y completamente integrada dentro de una fotografía realista.$r9862_13_she_to_hec$,
  lighting_color = $r9862_13_she_to_hed$Luz dorada cálida de la chimenea. Atmósfera mágica, acogedora y llena de imaginación.$r9862_13_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_13_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_33_el_jardin_de_lo_que_sembraste_en_mi_de_nieta_a_abuelo.webp$r9862_13_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_14_he_to_hen$Aventuras en Tu Jardín De Nieto a Abuelo$r9862_14_he_to_hen$,
  scene_visual = $r9862_14_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite conexión con la naturaleza y la paciencia de aprender juntos a cultivar vida.

Ligeramente descentrados arrodillados junto a un cantero de flores, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión paciente, señalando algo con amor mientras planta. Junto a él con tierra en las manos, su nieto ya adulto, expresión de curiosidad y alegría, plantando con una herramienta pequeña.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_14_he_to_hea$,
  background_details = $r9862_14_he_to_heb$Jardín exuberante con flores de todos los colores, mariposas volando, regadera vintage, árboles frutales.$r9862_14_he_to_heb$,
  magic_effects = $r9862_14_he_to_hec$Partículas de polen brillan suavemente bajo la luz del sol. La magia debe sentirse pacífica y completamente integrada dentro de una fotografía realista.$r9862_14_he_to_hec$,
  lighting_color = $r9862_14_he_to_hed$Luz dorada del sol filtrándose entre las flores. Atmósfera pacífica, educativa y conectada con la naturaleza.$r9862_14_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_14_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_14_la_casa_que_llevo_por_dentro_de_nieto_a_abuelo.webp$r9862_14_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_14_she_to_hen$Aventuras en Tu Jardín De Nieta a Abuelo$r9862_14_she_to_hen$,
  scene_visual = $r9862_14_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite conexión con la naturaleza y la paciencia de aprender juntos a cultivar vida.

Ligeramente descentrados arrodillados junto a un cantero de flores, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión paciente, señalando algo con amor mientras planta. Junto a él con tierra en las manos, su nieta ya adulta, expresión de curiosidad y alegría, plantando con una herramienta pequeña.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_14_she_to_hea$,
  background_details = $r9862_14_she_to_heb$Jardín exuberante con flores de todos los colores, mariposas volando, regadera vintage, árboles frutales.$r9862_14_she_to_heb$,
  magic_effects = $r9862_14_she_to_hec$Partículas de polen brillan suavemente bajo la luz del sol. La magia debe sentirse pacífica y completamente integrada dentro de una fotografía realista.$r9862_14_she_to_hec$,
  lighting_color = $r9862_14_she_to_hed$Luz dorada del sol filtrándose entre las flores. Atmósfera pacífica, educativa y conectada con la naturaleza.$r9862_14_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_14_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_34_la_casa_que_llevo_por_dentro_de_nieta_a_abuelo.webp$r9862_14_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_15_he_to_hen$Las Lecciones Que Solo Tú Me Das De Nieto a Abuelo$r9862_15_he_to_hen$,
  scene_visual = $r9862_15_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sabiduría transmitida con amor bajo un árbol sereno.

Ligeramente descentrados sentados en un banco de madera bajo un árbol grande, el abuelo, expresión sabia y amorosa, señalando algo importante con gesto sabio. Junto a él escuchando atentamente, su nieto ya adulto, expresión de comprensión y admiración.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_15_he_to_hea$,
  background_details = $r9862_15_he_to_heb$Parque tranquilo al atardecer, sendero de piedra, luz dorada filtrándose entre las hojas.$r9862_15_he_to_heb$,
  magic_effects = $r9862_15_he_to_hec$Pequeños símbolos brillantes de lecciones de vida (un corazón, manos unidas) flotan suavemente entre ambos. La magia debe sentirse sabia y completamente integrada dentro de una fotografía realista.$r9862_15_he_to_hec$,
  lighting_color = $r9862_15_he_to_hed$Luz cálida de atardecer filtrándose entre las hojas. Atmósfera sabia, educativa y de transmisión de valores.$r9862_15_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_15_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_15_el_oficio_silencioso_de_cuidar_de_nieto_a_abuelo.webp$r9862_15_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_15_she_to_hen$Las Lecciones Que Solo Tú Me Das De Nieta a Abuelo$r9862_15_she_to_hen$,
  scene_visual = $r9862_15_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sabiduría transmitida con amor bajo un árbol sereno.

Ligeramente descentrados sentados en un banco de madera bajo un árbol grande, el abuelo, expresión sabia y amorosa, señalando algo importante con gesto sabio. Junto a él escuchando atentamente, su nieta ya adulta, expresión de comprensión y admiración.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_15_she_to_hea$,
  background_details = $r9862_15_she_to_heb$Parque tranquilo al atardecer, sendero de piedra, luz dorada filtrándose entre las hojas.$r9862_15_she_to_heb$,
  magic_effects = $r9862_15_she_to_hec$Pequeñas símbolos brillantes de lecciones de vida (un corazón, manos unidas) flotan suavemente entre ambos. La magia debe sentirse sabia y completamente integrada dentro de una fotografía realista.$r9862_15_she_to_hec$,
  lighting_color = $r9862_15_she_to_hed$Luz cálida de atardecer filtrándose entre las hojas. Atmósfera sabia, educativa y de transmisión de valores.$r9862_15_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_15_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_35_el_oficio_silencioso_de_cuidar_de_nieta_a_abuelo.webp$r9862_15_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_16_he_to_hen$Nuestros Secretos Compartidos De Nieto a Abuelo$r9862_16_he_to_hen$,
  scene_visual = $r9862_16_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad íntima y la confianza absoluta de un secreto compartido.

Ligeramente descentrados muy cerca en un sofá acogedor, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión cómplice, inclinándose para susurrar algo al oído de su nieto ya adulto con sonrisa traviesa. su nieto ya adulto, ojos brillantes, escuchando con sonrisa de complicidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_16_he_to_hea$,
  background_details = $r9862_16_he_to_heb$Sala cálida con luz suave, ventana mostrando atardecer, cojines cómodos.$r9862_16_he_to_heb$,
  magic_effects = $r9862_16_he_to_hec$Pequeñas estrellas brillantes flotan alrededor simbolizando el secreto compartido. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$r9862_16_he_to_hec$,
  lighting_color = $r9862_16_he_to_hed$Luz dorada suave de atardecer entrando por la ventana. Atmósfera cómplice, íntima y llena de confianza.$r9862_16_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_16_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_16_la_risa_que_me_devuelve_al_origen_de_nieto_a_abuelo.webp$r9862_16_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_16_she_to_hen$Nuestros Secretos Compartidos De Nieta a Abuelo$r9862_16_she_to_hen$,
  scene_visual = $r9862_16_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad íntima y la confianza absoluta de un secreto compartido.

Ligeramente descentrados muy cerca en un sofá acogedor, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión cómplice, inclinándose para susurrar algo al oído de su nieta ya adulta con sonrisa traviesa. su nieta ya adulta, ojos brillantes, escuchando con sonrisa de complicidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_16_she_to_hea$,
  background_details = $r9862_16_she_to_heb$Sala cálida con luz suave, ventana mostrando atardecer, cojines cómodos.$r9862_16_she_to_heb$,
  magic_effects = $r9862_16_she_to_hec$Pequeñas estrellas brillantes flotan alrededor simbolizando el secreto compartido. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$r9862_16_she_to_hec$,
  lighting_color = $r9862_16_she_to_hed$Luz dorada suave de atardecer entrando por la ventana. Atmósfera cómplice, íntima y llena de confianza.$r9862_16_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_16_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_36_la_risa_que_me_devuelve_al_origen_de_nieta_a_abuelo.webp$r9862_16_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_17_he_to_hen$Cuando Me Haces Reír De Nieto a Abuelo$r9862_17_he_to_hen$,
  scene_visual = $r9862_17_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría contagiosa y una carcajada compartida sin límites.

Ligeramente descentrados en medio de una carcajada genuina, el abuelo, con la edad y apariencia reales de su foto de referencia, con los ojos entrecerrados por la risa genuina y una sonrisa amplia. Junto a él sosteniéndose el estómago de tanto reír, su nieto ya adulto, expresión de risa desbordante.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_17_he_to_hea$,
  background_details = $r9862_17_he_to_heb$Espacio alegre y colorido tipo jardín o cocina, luz brillante y cálida, elementos cotidianos de un momento espontáneo.$r9862_17_he_to_heb$,
  magic_effects = $r9862_17_he_to_hec$Pequeños símbolos de risa (notas musicales, estrellas) flotan alrededor con un brillo dorado sutil. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$r9862_17_he_to_hec$,
  lighting_color = $r9862_17_he_to_hed$Luz brillante y cálida de un momento espontáneo. Atmósfera alegre, divertida y llena de risa.$r9862_17_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_17_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_17_el_legado_de_mirar_con_ternura_de_nieto_a_abuelo.webp$r9862_17_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_17_she_to_hen$Cuando Me Haces Reír De Nieta a Abuelo$r9862_17_she_to_hen$,
  scene_visual = $r9862_17_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría contagiosa y una carcajada compartida sin límites.

Ligeramente descentrados en medio de una carcajada genuina, el abuelo, con la edad y apariencia reales de su foto de referencia, con los ojos entrecerrados por la risa genuina y una sonrisa amplia. Junto a él sosteniéndose el estómago de tanto reír, su nieta ya adulta, expresión de risa desbordante.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_17_she_to_hea$,
  background_details = $r9862_17_she_to_heb$Espacio alegre y colorido tipo jardín o cocina, luz brillante y cálida, elementos cotidianos de un momento espontáneo.$r9862_17_she_to_heb$,
  magic_effects = $r9862_17_she_to_hec$Pequeñas símbolos de risa (notas musicales, estrellas) flotan alrededor con un brillo dorado sutil. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$r9862_17_she_to_hec$,
  lighting_color = $r9862_17_she_to_hed$Luz brillante y cálida de un momento espontáneo. Atmósfera alegre, divertida y llena de risa.$r9862_17_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_17_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_37_el_legado_de_mirar_con_ternura_de_nieta_a_abuelo.webp$r9862_17_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_18_he_to_hen$Tu Abrazo Que Todo lo Arregla De Nieto a Abuelo$r9862_18_he_to_hen$,
  scene_visual = $r9862_18_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sanación emocional profunda en un abrazo protector.

Ligeramente descentrado abrazando tiernamente a su nieto ya adulto, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión de amor incondicional, en un abrazo profundo y protector. su nieto ya adulto, ojos cerrados sintiendo paz absoluta, envuelto en el abrazo.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_18_he_to_hea$,
  background_details = $r9862_18_he_to_heb$Espacio suave y difuminado, interior cálido con luz dorada envolvente.$r9862_18_he_to_heb$,
  magic_effects = $r9862_18_he_to_hec$Corazones dorados flotan suavemente y ondas de energía amorosa son visibles alrededor del abrazo. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$r9862_18_he_to_hec$,
  lighting_color = $r9862_18_he_to_hed$Luz cálida y dorada envolvente. Atmósfera sanadora, amorosa y llena de consuelo.$r9862_18_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_18_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_18_la_ventana_donde_aprendi_a_esperar_de_nieto_a_abuelo.webp$r9862_18_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_18_she_to_hen$Tu Abrazo Que Todo lo Arregla De Nieta a Abuelo$r9862_18_she_to_hen$,
  scene_visual = $r9862_18_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sanación emocional profunda en un abrazo protector.

Ligeramente descentrado abrazando tiernamente a su nieta ya adulta, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión de amor incondicional, en un abrazo profundo y protector. su nieta ya adulta, ojos cerrados sintiendo paz absoluta, envuelta en el abrazo.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_18_she_to_hea$,
  background_details = $r9862_18_she_to_heb$Espacio suave y difuminado, interior cálido con luz dorada envolvente.$r9862_18_she_to_heb$,
  magic_effects = $r9862_18_she_to_hec$Corazones dorados flotan suavemente y ondas de energía amorosa son visibles alrededor del abrazo. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$r9862_18_she_to_hec$,
  lighting_color = $r9862_18_she_to_hed$Luz cálida y dorada envolvente. Atmósfera sanadora, amorosa y llena de consuelo.$r9862_18_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_18_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_38_la_ventana_donde_aprendi_a_esperar_de_nieta_a_abuelo.webp$r9862_18_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_19_he_to_hen$Enseñándome el Mundo De Nieto a Abuelo$r9862_19_he_to_hen$,
  scene_visual = $r9862_19_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite curiosidad compartida y el asombro de descubrir juntos la belleza del mundo.

Ligeramente descentrados caminando por un sendero, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión de descubrimiento, señalando algo maravilloso en la naturaleza. Junto a él mirando hacia donde señala, su nieto ya adulto, expresión de asombro y curiosidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_19_he_to_hea$,
  background_details = $r9862_19_he_to_heb$Paisaje natural hermoso tipo bosque o campo, luz del sol creando atmósfera mágica, elementos naturales detallados.$r9862_19_he_to_heb$,
  magic_effects = $r9862_19_he_to_hec$Un destello de luz brilla suavemente sobre lo que están observando, y partículas brillantes flotan en el aire. La magia debe sentirse inspiradora y completamente integrada dentro de una fotografía realista.$r9862_19_he_to_hec$,
  lighting_color = $r9862_19_he_to_hed$Luz natural brillante de día, cálida y clara. Atmósfera exploradora, educativa y llena de asombro.$r9862_19_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_19_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_19_la_promesa_de_volver_a_casa_de_nieto_a_abuelo.webp$r9862_19_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_19_she_to_hen$Enseñándome el Mundo De Nieta a Abuelo$r9862_19_she_to_hen$,
  scene_visual = $r9862_19_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite curiosidad compartida y el asombro de descubrir juntos la belleza del mundo.

Ligeramente descentrados caminando por un sendero, el abuelo, con la edad y apariencia reales de su foto de referencia, expresión de descubrimiento, señalando algo maravilloso en la naturaleza. Junto a él mirando hacia donde señala, su nieta ya adulta, expresión de asombro y curiosidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_19_she_to_hea$,
  background_details = $r9862_19_she_to_heb$Paisaje natural hermoso tipo bosque o campo, luz del sol creando atmósfera mágica, elementos naturales detallados.$r9862_19_she_to_heb$,
  magic_effects = $r9862_19_she_to_hec$Un destello de luz brilla suavemente sobre lo que están observando, y partículas brillantes flotan en el aire. La magia debe sentirse inspiradora y completamente integrada dentro de una fotografía realista.$r9862_19_she_to_hec$,
  lighting_color = $r9862_19_she_to_hed$Luz natural brillante de día, cálida y clara. Atmósfera exploradora, educativa y llena de asombro.$r9862_19_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_19_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_39_la_promesa_de_volver_a_casa_de_nieta_a_abuelo.webp$r9862_19_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_20_he_to_hen$Siempre Seré Tu Pequeño De Nieto a Abuelo$r9862_20_he_to_hen$,
  scene_visual = $r9862_20_he_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite una promesa eterna: sin importar el paso del tiempo, el nieto siempre será su pequeño.

En la mitad izquierda, ligeramente descentrado, el abuelo, edad actual, sosteniendo con ternura infinita a su nieto ya adulto pequeño (edad actual del cliente). En la mitad derecha, el mismo abuelo (ligeramente mayor) abrazando a una versión futura de su nieto ya adulto ya adolescente, con el mismo amor incondicional.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_20_he_to_hea$,
  background_details = $r9862_20_he_to_heb$Espacio atemporal con elementos que representan el paso del tiempo (reloj suave, estaciones cambiando), un mismo lugar familiar mostrado en dos momentos.$r9862_20_he_to_heb$,
  magic_effects = $r9862_20_he_to_hec$Una línea de tiempo visual sutil y partículas de luz dorada conectan ambos momentos. La magia debe sentirse eterna y completamente integrada dentro de una fotografía realista.$r9862_20_he_to_hec$,
  lighting_color = $r9862_20_he_to_hed$Luz dorada atemporal con efecto de memoria y futuro. Atmósfera eterna, nostálgica y llena de amor incondicional.$r9862_20_he_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_20_he_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_20_siempre_sere_parte_de_tu_historia_de_nieto_a_abuelo.webp$r9862_20_he_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9862_20_she_to_hen$Siempre Seré Tu Pequeño De Nieta a Abuelo$r9862_20_she_to_hen$,
  scene_visual = $r9862_20_she_to_hea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite una promesa eterna: sin importar el paso del tiempo, la nieta siempre será su pequeña.

En la mitad izquierda, ligeramente descentrado, el abuelo, edad actual, sosteniendo con ternura infinita a su nieta ya adulta pequeña (edad actual del cliente). En la mitad derecha, el mismo abuelo (ligeramente mayor) abrazando a una versión futura de su nieta ya adulta ya adolescente, con el mismo amor incondicional.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9862_20_she_to_hea$,
  background_details = $r9862_20_she_to_heb$Espacio atemporal con elementos que representan el paso del tiempo (reloj suave, estaciones cambiando), un mismo lugar familiar mostrado en dos momentos.$r9862_20_she_to_heb$,
  magic_effects = $r9862_20_she_to_hec$Una línea de tiempo visual sutil y partículas de luz dorada conectan ambos momentos. La magia debe sentirse eterna y completamente integrada dentro de una fotografía realista.$r9862_20_she_to_hec$,
  lighting_color = $r9862_20_she_to_hed$Luz dorada atemporal con efecto de memoria y futuro. Atmósfera eterna, nostálgica y llena de amor incondicional.
$r9862_20_she_to_hed$,
  updated_at = now()
WHERE template_preview_key = $r9862_20_she_to_hek$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_40_siempre_sere_parte_de_tu_historia_de_nieta_a_abuelo.webp$r9862_20_she_to_hek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_1_he_to_shen$Abrazos Que Curan Todo De Hijo a Abuela$r9863_1_he_to_shen$,
  scene_visual = $r9863_1_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo profundo y la certeza de que un abrazo de abuela cura cualquier tristeza.

Ligeramente descentrada en un sillón cómodo, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de amor profundo y protección, con suéter de lana en tono lavanda, abrazando tiernamente a su nieto ya adulto. Envuelto en el abrazo, su nieto ya adulto, ojos cerrados en paz absoluta, con la cabeza apoyada en el pecho de la abuela.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_1_he_to_shea$,
  background_details = $r9863_1_he_to_sheb$Sala acogedora con luz suave de ventana, sillón cómodo en tonos crema, manta tejida sobre el respaldo, plantas en macetas.$r9863_1_he_to_sheb$,
  magic_effects = $r9863_1_he_to_shec$Partículas de luz flotante sutiles simbolizan la magia sanadora del abrazo. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$r9863_1_he_to_shec$,
  lighting_color = $r9863_1_he_to_shed$Iluminación dorada y suave tipo atardecer envolviendo la escena. Atmósfera cálida de hogar y sanación.$r9863_1_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_1_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_01_la_calma_que_me_enseno_a_respirar_de_hijo_a_abuela.webp$r9863_1_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_1_she_to_shen$Abrazos Que Curan Todo De Hija a Abuela$r9863_1_she_to_shen$,
  scene_visual = $r9863_1_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo profundo y la certeza de que un abrazo de abuela cura cualquier tristeza.

Ligeramente descentrada en un sillón cómodo, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de amor profundo y protección, con suéter de lana en tono lavanda, abrazando tiernamente a su nieta ya adulta. Envuelta en el abrazo, su nieta ya adulta, ojos cerrados en paz absoluta, con la cabeza apoyada en el pecho de la abuela.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_1_she_to_shea$,
  background_details = $r9863_1_she_to_sheb$Sala acogedora con luz suave de ventana, sillón cómodo en tonos crema, manta tejida sobre el respaldo, plantas en macetas.$r9863_1_she_to_sheb$,
  magic_effects = $r9863_1_she_to_shec$Partículas de luz flotante sutiles simbolizan la magia sanadora del abrazo. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$r9863_1_she_to_shec$,
  lighting_color = $r9863_1_she_to_shed$Iluminación dorada y suave tipo atardecer envolviendo la escena. Atmósfera cálida de hogar y sanación.$r9863_1_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_1_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_21_la_calma_que_me_enseno_a_respirar_de_hija_a_abuela.webp$r9863_1_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_2_he_to_shen$Cuentos Antes de Dormir De Hijo a Abuela$r9863_2_he_to_shen$,
  scene_visual = $r9863_2_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el hechizo nocturno de un cuento que lleva a soñar.

Ligeramente descentrada sentada al borde de la cama, la abuela, con la edad y apariencia reales de su foto de referencia, expresión narrativa y cálida, con bata suave en tono rosa empolvado, gafas de lectura, leyendo un libro de cuentos ilustrado. Acurrucado bajo las cobijas, su nieto ya adulto, ojos brillantes de fascinación, mirando el libro encantado.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_2_he_to_shea$,
  background_details = $r9863_2_he_to_sheb$Habitación acogedora de noche con luz tenue de lámpara, estantes con libros, ventana con cielo nocturno estrellado.$r9863_2_he_to_sheb$,
  magic_effects = $r9863_2_he_to_shec$Pequeñas siluetas etéreas de personajes de cuentos (un dragón, un castillo) emergen suavemente del libro. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$r9863_2_he_to_shec$,
  lighting_color = $r9863_2_he_to_shed$Iluminación cálida y envolvente de lámpara de noche. Atmósfera íntima con toque de fantasía.$r9863_2_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_2_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_02_el_mapa_de_tus_consejos_de_hijo_a_abuela.webp$r9863_2_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_2_she_to_shen$Cuentos Antes de Dormir De Hija a Abuela$r9863_2_she_to_shen$,
  scene_visual = $r9863_2_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el hechizo nocturno de un cuento que lleva a soñar.

Ligeramente descentrada sentada al borde de la cama, la abuela, con la edad y apariencia reales de su foto de referencia, expresión narrativa y cálida, con bata suave en tono rosa empolvado, gafas de lectura, leyendo un libro de cuentos ilustrado. Acurrucada bajo las cobijas, su nieta ya adulta, ojos brillantes de fascinación, mirando el libro encantado.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_2_she_to_shea$,
  background_details = $r9863_2_she_to_sheb$Habitación acogedora de noche con luz tenue de lámpara, estantes con libros, ventana con cielo nocturno estrellado.$r9863_2_she_to_sheb$,
  magic_effects = $r9863_2_she_to_shec$Pequeñas siluetas etéreas de personajes de cuentos (un dragón, un castillo) emergen suavemente del libro. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$r9863_2_she_to_shec$,
  lighting_color = $r9863_2_she_to_shed$Iluminación cálida y envolvente de lámpara de noche. Atmósfera íntima con toque de fantasía.$r9863_2_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_2_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_22_el_mapa_de_tus_consejos_de_hija_a_abuela.webp$r9863_2_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_3_he_to_shen$Las Galletas Más Ricas del Mundo De Hijo a Abuela$r9863_3_he_to_shen$,
  scene_visual = $r9863_3_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría culinaria y el ingrediente secreto que es el amor de abuela.

Ligeramente descentrada en la cocina, la abuela, con la edad y apariencia reales de su foto de referencia, expresión alegre y paciente, con delantal vintage floral, manos enharinadas sosteniendo un rodillo. De pie en un banquito junto a la mesa, su nieto ya adulto, rostro iluminado de felicidad, con delantal presionando cortadores de galletas en la masa.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_3_he_to_shea$,
  background_details = $r9863_3_he_to_sheb$Cocina rústica acogedora con mesa de madera cubierta de masa, bandeja de galletas horneadas enfriándose, ventana con luz natural cálida.$r9863_3_he_to_sheb$,
  magic_effects = $r9863_3_he_to_shec$Partículas doradas flotantes y pequeños corazones simbolizan el aroma de canela y vainilla en el aire. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$r9863_3_he_to_shec$,
  lighting_color = $r9863_3_he_to_shed$Iluminación natural y cálida de mañana. Atmósfera familiar, dulce y llena de calidez.$r9863_3_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_3_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_03_la_mesa_donde_siempre_vuelvo_de_hijo_a_abuela.webp$r9863_3_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_3_she_to_shen$Las Galletas Más Ricas del Mundo De Hija a Abuela$r9863_3_she_to_shen$,
  scene_visual = $r9863_3_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría culinaria y el ingrediente secreto que es el amor de abuela.

Ligeramente descentrada en la cocina, la abuela, con la edad y apariencia reales de su foto de referencia, expresión alegre y paciente, con delantal vintage floral, manos enharinadas sosteniendo un rodillo. De pie en un banquito junto a la mesa, su nieta ya adulta, rostro iluminado de felicidad, con delantal presionando cortadores de galletas en la masa.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_3_she_to_shea$,
  background_details = $r9863_3_she_to_sheb$Cocina rústica acogedora con mesa de madera cubierta de masa, bandeja de galletas horneadas enfriándose, ventana con luz natural cálida.$r9863_3_she_to_sheb$,
  magic_effects = $r9863_3_she_to_shec$Partículas doradas flotantes y pequeños corazones simbolizan el aroma de canela y vainilla en el aire. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$r9863_3_she_to_shec$,
  lighting_color = $r9863_3_she_to_shed$Iluminación natural y cálida de mañana. Atmósfera familiar, dulce y llena de calidez.$r9863_3_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_3_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_23_la_mesa_donde_siempre_vuelvo_de_hija_a_abuela.webp$r9863_3_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_4_he_to_shen$Secretos Entre Nosotros De Hijo a Abuela$r9863_4_he_to_shen$,
  scene_visual = $r9863_4_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad íntima y la confianza absoluta entre nieto y abuela.

Ligeramente descentrados muy cerca en un banco de jardín, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de ternura y complicidad, inclinada en actitud de escucha atenta. Junto a ella susurrando al oído, su nieto ya adulto, expresión traviesa y feliz, con mano cerca de la boca en gesto cómplice.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_4_he_to_shea$,
  background_details = $r9863_4_he_to_sheb$Jardín tranquilo con flores silvestres, árbol grande con ramas protectoras, luz filtrada entre hojas.$r9863_4_he_to_sheb$,
  magic_effects = $r9863_4_he_to_shec$Pequeños corazones flotantes simbolizan el vínculo entre ambos, con destellos dorados sutiles. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$r9863_4_he_to_shec$,
  lighting_color = $r9863_4_he_to_shed$Iluminación suave de tarde dorada filtrada entre las hojas. Atmósfera privada, mágica y de complicidad.$r9863_4_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_4_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_04_tus_manos_hicieron_hogar_de_hijo_a_abuela.webp$r9863_4_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_4_she_to_shen$Secretos Entre Nosotros De Hija a Abuela$r9863_4_she_to_shen$,
  scene_visual = $r9863_4_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad íntima y la confianza absoluta entre nieta y abuela.

Ligeramente descentrados muy cerca en un banco de jardín, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de ternura y complicidad, inclinada en actitud de escucha atenta. Junto a ella susurrando al oído, su nieta ya adulta, expresión traviesa y feliz, con mano cerca de la boca en gesto cómplice.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_4_she_to_shea$,
  background_details = $r9863_4_she_to_sheb$Jardín tranquilo con flores silvestres, árbol grande con ramas protectoras, luz filtrada entre hojas.$r9863_4_she_to_sheb$,
  magic_effects = $r9863_4_she_to_shec$Pequeños corazones flotantes simbolizan el vínculo entre ambos, con destellos dorados sutiles. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$r9863_4_she_to_shec$,
  lighting_color = $r9863_4_she_to_shed$Iluminación suave de tarde dorada filtrada entre las hojas. Atmósfera privada, mágica y de complicidad.$r9863_4_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_4_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_24_tus_manos_hicieron_hogar_de_hija_a_abuela.webp$r9863_4_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_5_he_to_shen$Cuando Me Consientes De Hijo a Abuela$r9863_5_he_to_shen$,
  scene_visual = $r9863_5_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad alegre y el placer especial de ser consentida por abuela.

Ligeramente descentrados en una heladería, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de complicidad y felicidad, con ropa casual chic, guiñando un ojo. Junto a ella sosteniendo un helado enorme, su nieto ya adulto, ojos brillantes y sonrisa enorme, con ambas manos en el helado.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_5_he_to_shea$,
  background_details = $r9863_5_he_to_sheb$Escena urbana encantadora con tienda colorida de fondo, mesas con sombrillas, día soleado y feliz.$r9863_5_he_to_sheb$,
  magic_effects = $r9863_5_he_to_shec$Confeti de colores y estrellitas brillantes flotan suavemente en el aire festivo. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$r9863_5_he_to_shec$,
  lighting_color = $r9863_5_he_to_shed$Iluminación brillante y alegre de día soleado. Atmósfera vibrante y llena de vida.$r9863_5_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_5_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_05_la_fuerza_que_no_hacia_ruido_de_hijo_a_abuela.webp$r9863_5_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_5_she_to_shen$Cuando Me Consientes De Hija a Abuela$r9863_5_she_to_shen$,
  scene_visual = $r9863_5_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad alegre y el placer especial de ser consentida por abuela.

Ligeramente descentrados en una heladería, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de complicidad y felicidad, con ropa casual chic, guiñando un ojo. Junto a ella sosteniendo un helado enorme, su nieta ya adulta, ojos brillantes y sonrisa enorme, con ambas manos en el helado.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_5_she_to_shea$,
  background_details = $r9863_5_she_to_sheb$Escena urbana encantadora con tienda colorida de fondo, mesas con sombrillas, día soleado y feliz.$r9863_5_she_to_sheb$,
  magic_effects = $r9863_5_she_to_shec$Confeti de colores y estrellitas brillantes flotan suavemente en el aire festivo. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$r9863_5_she_to_shec$,
  lighting_color = $r9863_5_she_to_shed$Iluminación brillante y alegre de día soleado. Atmósfera vibrante y llena de vida.$r9863_5_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_5_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_25_la_fuerza_que_no_hacia_ruido_de_hija_a_abuela.webp$r9863_5_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_6_he_to_shen$Tus Manos Mágicas De Hijo a Abuela$r9863_6_he_to_shen$,
  scene_visual = $r9863_6_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura pura en el gesto simple de dos manos entrelazadas.

Ligeramente descentradas en primer plano, las manos de la abuela, con la edad y apariencia reales de su foto de referencia, anillo sencillo, propias de una mano de abuela, sosteniendo delicadamente la mano de su nieto ya adulto, con la edad y apariencia reales de su foto de referencia, descansando con confianza.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_6_he_to_shea$,
  background_details = $r9863_6_he_to_sheb$Fondo suavemente desenfocado con elementos de tejido (agujas, ovillo de lana en tonos pastel) o jardín con flores difuminadas.$r9863_6_he_to_sheb$,
  magic_effects = $r9863_6_he_to_shec$Hilos de luz dorada conectan sutilmente ambas manos simbolizando el vínculo. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$r9863_6_he_to_shec$,
  lighting_color = $r9863_6_he_to_shed$Luz natural suave y cálida tipo ventana de tarde. Atmósfera tierna y reconfortante.$r9863_6_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_6_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_06_el_abrigo_de_los_dias_dificiles_de_hijo_a_abuela.webp$r9863_6_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_6_she_to_shen$Tus Manos Mágicas De Hija a Abuela$r9863_6_she_to_shen$,
  scene_visual = $r9863_6_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura pura en el gesto simple de dos manos entrelazadas.

Ligeramente descentradas en primer plano, las manos de la abuela, con la edad y apariencia reales de su foto de referencia, anillo sencillo, propias de una mano de abuela, sosteniendo delicadamente la mano de su nieta ya adulta, con la edad y apariencia reales de su foto de referencia, descansando con confianza.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_6_she_to_shea$,
  background_details = $r9863_6_she_to_sheb$Fondo suavemente desenfocado con elementos de tejido (agujas, ovillo de lana en tonos pastel) o jardín con flores difuminadas.$r9863_6_she_to_sheb$,
  magic_effects = $r9863_6_she_to_shec$Hilos de luz dorada conectan sutilmente ambas manos simbolizando el vínculo. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$r9863_6_she_to_shec$,
  lighting_color = $r9863_6_she_to_shed$Luz natural suave y cálida tipo ventana de tarde. Atmósfera tierna y reconfortante.$r9863_6_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_6_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_26_el_abrigo_de_los_dias_dificiles_de_hija_a_abuela.webp$r9863_6_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_7_he_to_shen$Durmiendo en Tu Regazo De Hijo a Abuela$r9863_7_he_to_shen$,
  scene_visual = $r9863_7_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz absoluta y el refugio seguro del regazo de abuela.

Ligeramente descentrada sentada en un sillón, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de amor profundo y paz, acariciando suavemente el cabello de su nieto ya adulto. Sentado a su lado, su nieto ya adulto, expresión de paz absoluta con los ojos abiertos mirando hacia arriba con ternura, acurrucado cómodamente.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_7_he_to_shea$,
  background_details = $r9863_7_he_to_sheb$Sala acogedora con luz suave de tarde, manta tejida sobre el brazo del sillón, taza de té en mesa lateral.$r9863_7_he_to_sheb$,
  magic_effects = $r9863_7_he_to_shec$Un aura cálida envuelve a ambos con partículas de luz dorada muy suaves. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$r9863_7_he_to_shec$,
  lighting_color = $r9863_7_he_to_shed$Luz dorada suave de atardecer, muy cálida y envolvente. Atmósfera de tranquilidad absoluta.$r9863_7_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_7_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_07_la_luz_de_las_pequenas_costumbres_de_hijo_a_abuela.webp$r9863_7_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_7_she_to_shen$Durmiendo en Tu Regazo De Hija a Abuela$r9863_7_she_to_shen$,
  scene_visual = $r9863_7_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz absoluta y el refugio seguro del regazo de abuela.

Ligeramente descentrada sentada en un sillón, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de amor profundo y paz, acariciando suavemente el cabello de su nieta ya adulta. Sentada a su lado, su nieta ya adulta, expresión de paz absoluta con los ojos abiertos mirando hacia arriba con ternura, acurrucada cómodamente.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_7_she_to_shea$,
  background_details = $r9863_7_she_to_sheb$Sala acogedora con luz suave de tarde, manta tejida sobre el brazo del sillón, taza de té en mesa lateral.$r9863_7_she_to_sheb$,
  magic_effects = $r9863_7_she_to_shec$Un aura cálida envuelve a ambos con partículas de luz dorada muy suaves. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$r9863_7_she_to_shec$,
  lighting_color = $r9863_7_she_to_shed$Luz dorada suave de atardecer, muy cálida y envolvente. Atmósfera de tranquilidad absoluta.$r9863_7_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_7_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_27_la_luz_de_las_pequenas_costumbres_de_hija_a_abuela.webp$r9863_7_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_8_he_to_shen$Me Enseñaste A De Hijo a Abuela$r9863_8_he_to_shen$,
  scene_visual = $r9863_8_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite aprendizaje amoroso al descubrir la magia en las cosas simples.

Ligeramente descentrados en un jardín, la abuela, con la edad y apariencia reales de su foto de referencia, expresión sabia y amorosa, señalando una mariposa con postura de maestra paciente. Junto a ella mirando en la misma dirección, su nieto ya adulto, expresión de asombro y curiosidad, con ojos brillantes.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_8_he_to_shea$,
  background_details = $r9863_8_he_to_sheb$Jardín exuberante con flores coloridas, mariposas volando, árboles frondosos, cielo azul con nubes suaves.$r9863_8_he_to_sheb$,
  magic_effects = $r9863_8_he_to_shec$Siluetas brillantes sutiles de pájaros y estrellas flotan en el aire como símbolos de aprendizaje. La magia debe sentirse educativa y completamente integrada dentro de una fotografía realista.$r9863_8_he_to_shec$,
  lighting_color = $r9863_8_he_to_shed$Luz natural brillante de día, cálida y clara. Atmósfera educativa y llena de asombro.$r9863_8_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_8_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_08_el_puente_hacia_mi_propio_camino_de_hijo_a_abuela.webp$r9863_8_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_8_she_to_shen$Me Enseñaste A De Hija a Abuela$r9863_8_she_to_shen$,
  scene_visual = $r9863_8_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite aprendizaje amoroso al descubrir la magia en las cosas simples.

Ligeramente descentrados en un jardín, la abuela, con la edad y apariencia reales de su foto de referencia, expresión sabia y amorosa, señalando una mariposa con postura de maestra paciente. Junto a ella mirando en la misma dirección, su nieta ya adulta, expresión de asombro y curiosidad, con ojos brillantes.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_8_she_to_shea$,
  background_details = $r9863_8_she_to_sheb$Jardín exuberante con flores coloridas, mariposas volando, árboles frondosos, cielo azul con nubes suaves.$r9863_8_she_to_sheb$,
  magic_effects = $r9863_8_she_to_shec$Siluetas brillantes sutiles de pájaros y estrellas flotan en el aire como símbolos de aprendizaje. La magia debe sentirse educativa y completamente integrada dentro de una fotografía realista.$r9863_8_she_to_shec$,
  lighting_color = $r9863_8_she_to_shed$Luz natural brillante de día, cálida y clara. Atmósfera educativa y llena de asombro.$r9863_8_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_8_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_28_el_puente_hacia_mi_propio_camino_de_hija_a_abuela.webp$r9863_8_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_9_he_to_shen$Tus Consejos de Oro De Hijo a Abuela$r9863_9_he_to_shen$,
  scene_visual = $r9863_9_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sabiduría transmitida con amor y reverencia.

Ligeramente descentrados sentados en un porche, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de sabiduría y amor, con mano posada suavemente sobre la de su nieto ya adulto, mirándolo con profundidad. Escuchando con atención absoluta, su nieto ya adulto, expresión seria y receptiva.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_9_he_to_shea$,
  background_details = $r9863_9_he_to_sheb$Porche acogedor o banco en jardín tranquilo, luz de atardecer dorado, plantas en macetas.$r9863_9_he_to_sheb$,
  magic_effects = $r9863_9_he_to_shec$Palabras doradas flotantes sutiles ("amor", "valentía") y pequeñas llaves doradas simbolizan consejos valiosos. La magia debe sentirse contemplativa y completamente integrada dentro de una fotografía realista.$r9863_9_he_to_shec$,
  lighting_color = $r9863_9_he_to_shed$Luz dorada de atardecer, cálida y envolvente. Atmósfera de intimidad y confianza.$r9863_9_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_9_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_09_la_paciencia_que_me_dio_raices_de_hijo_a_abuela.webp$r9863_9_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_9_she_to_shen$Tus Consejos de Oro De Hija a Abuela$r9863_9_she_to_shen$,
  scene_visual = $r9863_9_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sabiduría transmitida con amor y reverencia.

Ligeramente descentrados sentados en un porche, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de sabiduría y amor, con mano posada suavemente sobre la de su nieta ya adulta, mirándolo con profundidad. Escuchando con atención absoluta, su nieta ya adulta, expresión seria y receptiva.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_9_she_to_shea$,
  background_details = $r9863_9_she_to_sheb$Porche acogedor o banco en jardín tranquilo, luz de atardecer dorado, plantas en macetas.$r9863_9_she_to_sheb$,
  magic_effects = $r9863_9_she_to_shec$Palabras doradas flotantes sutiles ("amor", "valentía") y pequeñas llaves doradas simbolizan consejos valiosos. La magia debe sentirse contemplativa y completamente integrada dentro de una fotografía realista.$r9863_9_she_to_shec$,
  lighting_color = $r9863_9_she_to_shed$Luz dorada de atardecer, cálida y envolvente. Atmósfera de intimidad y confianza.$r9863_9_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_9_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_29_la_paciencia_que_me_dio_raices_de_hija_a_abuela.webp$r9863_9_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_10_he_to_shen$Cuando Lloro Tú Entiendes De Hijo a Abuela$r9863_10_he_to_shen$,
  scene_visual = $r9863_10_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo silencioso y la comprensión profunda sin necesidad de palabras.

Ligeramente descentrada de pie junto a su nieto ya adulto, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de comprensión profunda, con una mano secando suavemente una lágrima de su mejilla con el pulgar, sin cubrir su rostro. Frente a ella, su nieto ya adulto, expresión vulnerable encontrando consuelo, con manos aferradas suavemente a la ropa de la abuela.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_10_he_to_shea$,
  background_details = $r9863_10_he_to_sheb$Interior cálido y privado con luz suave envolvente, elementos difuminados para mantener intimidad.$r9863_10_he_to_sheb$,
  magic_effects = $r9863_10_he_to_shec$Partículas de luz dorada suave envuelven a ambos como un abrazo invisible. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$r9863_10_he_to_shec$,
  lighting_color = $r9863_10_he_to_shed$Luz suave y cálida, íntima y reconfortante. Atmósfera de consuelo profundo y comprensión.$r9863_10_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_10_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_10_la_voz_que_todavia_me_ordena_el_mundo_de_hijo_a_abuela.webp$r9863_10_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_10_she_to_shen$Cuando Lloro Tú Entiendes De Hija a Abuela$r9863_10_she_to_shen$,
  scene_visual = $r9863_10_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo silencioso y la comprensión profunda sin necesidad de palabras.

Ligeramente descentrada de pie junto a su nieta ya adulta, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de comprensión profunda, con una mano secando suavemente una lágrima de su mejilla con el pulgar, sin cubrir su rostro. Frente a ella, su nieta ya adulta, expresión vulnerable encontrando consuelo, con manos aferradas suavemente a la ropa de la abuela.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_10_she_to_shea$,
  background_details = $r9863_10_she_to_sheb$Interior cálido y privado con luz suave envolvente, elementos difuminados para mantener intimidad.$r9863_10_she_to_sheb$,
  magic_effects = $r9863_10_she_to_shec$Partículas de luz dorada suave envuelven a ambos como un abrazo invisible. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$r9863_10_she_to_shec$,
  lighting_color = $r9863_10_she_to_shed$Luz suave y cálida, íntima y reconfortante. Atmósfera de consuelo profundo y comprensión.$r9863_10_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_10_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_30_la_voz_que_todavia_me_ordena_el_mundo_de_hija_a_abuela.webp$r9863_10_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_11_he_to_shen$Fotos del Pasado De Hijo a Abuela$r9863_11_he_to_shen$,
  scene_visual = $r9863_11_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite nostalgia compartida al descubrir juntos la historia familiar.

Ligeramente descentrados rodeados de álbumes de fotos antiguos, la abuela, con la edad y apariencia reales de su foto de referencia, expresión nostálgica pero feliz, sosteniendo una foto antigua, señalándola con el dedo. Muy cerca mirando la foto con fascinación, su nieto ya adulto, expresión de asombro y curiosidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_11_he_to_shea$,
  background_details = $r9863_11_he_to_sheb$Sala familiar acogedora con álbumes de fotos vintage apilados, cajas de recuerdos, marcos de fotos antiguas.$r9863_11_he_to_sheb$,
  magic_effects = $r9863_11_he_to_shec$Algunas fotos antiguas flotan sutilmente en el aire con brillo dorado, conectando el pasado con el presente. La magia debe sentirse nostálgica y completamente integrada dentro de una fotografía realista.$r9863_11_he_to_shec$,
  lighting_color = $r9863_11_he_to_shed$Luz natural cálida de ventana, creando atmósfera nostálgica. Atmósfera íntima y llena de historia.$r9863_11_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_11_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_11_el_refugio_de_las_conversaciones_pendientes_de_hijo_a_abuela.webp$r9863_11_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_11_she_to_shen$Fotos del Pasado De Hija a Abuela$r9863_11_she_to_shen$,
  scene_visual = $r9863_11_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite nostalgia compartida al descubrir juntos la historia familiar.

Ligeramente descentrados rodeados de álbumes de fotos antiguos, la abuela, con la edad y apariencia reales de su foto de referencia, expresión nostálgica pero feliz, sosteniendo una foto antigua, señalándola con el dedo. Muy cerca mirando la foto con fascinación, su nieta ya adulta, expresión de asombro y curiosidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_11_she_to_shea$,
  background_details = $r9863_11_she_to_sheb$Sala familiar acogedora con álbumes de fotos vintage apilados, cajas de recuerdos, marcos de fotos antiguas.$r9863_11_she_to_sheb$,
  magic_effects = $r9863_11_she_to_shec$Algunas fotos antiguas flotan sutilmente en el aire con brillo dorado, conectando el pasado con el presente. La magia debe sentirse nostálgica y completamente integrada dentro de una fotografía realista.$r9863_11_she_to_shec$,
  lighting_color = $r9863_11_she_to_shed$Luz natural cálida de ventana, creando atmósfera nostálgica. Atmósfera íntima y llena de historia.$r9863_11_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_11_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_31_el_refugio_de_las_conversaciones_pendientes_de_hija_a_abuela.webp$r9863_11_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_12_he_to_shen$Eres Mi Segunda Mamá De Hijo a Abuela$r9863_12_he_to_shen$,
  scene_visual = $r9863_12_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite amor maternal profundo en un abrazo frontal cercano.

Ligeramente descentrados frente a frente, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de amor maternal profundo, acariciando suavemente la mejilla de su nieto ya adulto sin cubrir su rostro, con ternura infinita. su nieto ya adulto, expresión de amor puro y gratitud, con manos tocando los brazos de la abuela.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_12_he_to_shea$,
  background_details = $r9863_12_he_to_sheb$Interior cálido con luz dorada envolvente, o jardín con flores difuminadas de fondo.$r9863_12_he_to_sheb$,
  magic_effects = $r9863_12_he_to_shec$Un aura de luz dorada brillante rodea a ambos con hilos de luz conectando sus corazones. La magia debe sentirse profundamente emotiva y completamente integrada dentro de una fotografía realista.$r9863_12_he_to_shec$,
  lighting_color = $r9863_12_he_to_shed$Luz cálida y envolvente tipo atardecer dorado. Atmósfera emotiva y de conexión maternal.$r9863_12_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_12_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_12_la_brujula_de_mis_decisiones_de_hijo_a_abuela.webp$r9863_12_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_12_she_to_shen$Eres Mi Segunda Mamá De Hija a Abuela$r9863_12_she_to_shen$,
  scene_visual = $r9863_12_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite amor maternal profundo en un abrazo frontal cercano.

Ligeramente descentrados frente a frente, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de amor maternal profundo, acariciando suavemente la mejilla de su nieta ya adulta sin cubrir su rostro, con ternura infinita. su nieta ya adulta, expresión de amor puro y gratitud, con manos tocando los brazos de la abuela.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_12_she_to_shea$,
  background_details = $r9863_12_she_to_sheb$Interior cálido con luz dorada envolvente, o jardín con flores difuminadas de fondo.$r9863_12_she_to_sheb$,
  magic_effects = $r9863_12_she_to_shec$Un aura de luz dorada brillante rodea a ambos con hilos de luz conectando sus corazones. La magia debe sentirse profundamente emotiva y completamente integrada dentro de una fotografía realista.$r9863_12_she_to_shec$,
  lighting_color = $r9863_12_she_to_shed$Luz cálida y envolvente tipo atardecer dorado. Atmósfera emotiva y de conexión maternal.$r9863_12_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_12_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_32_la_brujula_de_mis_decisiones_de_hija_a_abuela.webp$r9863_12_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_13_he_to_shen$El Jardín Encantado de la Abuela De Hijo a Abuela$r9863_13_he_to_shen$,
  scene_visual = $r9863_13_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite magia natural y el tiempo detenido en un jardín compartido.

Ligeramente descentrados arrodillados junto a un parterre de flores, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de alegría y enseñanza, con sombrero de jardín elegante, señalando una mariposa. Junto a ella con botas de lluvia coloridas, su nieto ya adulto, expresión de asombro, sosteniendo una regadera pequeña.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_13_he_to_shea$,
  background_details = $r9863_13_he_to_sheb$Jardín exuberante tipo cuento de hadas con flores de todos colores, mariposas monarca, arco de jardín cubierto de rosas.$r9863_13_he_to_sheb$,
  magic_effects = $r9863_13_he_to_shec$Las flores tienen un brillo sutil y pequeñas hadas se esconden entre ellas con destellos de luz dorada. La magia debe sentirse encantadora y completamente integrada dentro de una fotografía realista.$r9863_13_he_to_shec$,
  lighting_color = $r9863_13_he_to_shed$Luz natural mágica de mañana, cálida y brillante. Atmósfera de cuento de hadas.$r9863_13_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_13_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_13_el_jardin_de_lo_que_sembraste_en_mi_de_hijo_a_abuela.webp$r9863_13_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_13_she_to_shen$El Jardín Encantado de la Abuela De Hija a Abuela$r9863_13_she_to_shen$,
  scene_visual = $r9863_13_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite magia natural y el tiempo detenido en un jardín compartido.

Ligeramente descentrados arrodillados junto a un parterre de flores, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de alegría y enseñanza, con sombrero de jardín elegante, señalando una mariposa. Junto a ella con botas de lluvia coloridas, su nieta ya adulta, expresión de asombro, sosteniendo una regadera pequeña.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_13_she_to_shea$,
  background_details = $r9863_13_she_to_sheb$Jardín exuberante tipo cuento de hadas con flores de todos colores, mariposas monarca, arco de jardín cubierto de rosas.$r9863_13_she_to_sheb$,
  magic_effects = $r9863_13_she_to_shec$Las flores tienen un brillo sutil y pequeñas hadas se esconden entre ellas con destellos de luz dorada. La magia debe sentirse encantadora y completamente integrada dentro de una fotografía realista.$r9863_13_she_to_shec$,
  lighting_color = $r9863_13_she_to_shed$Luz natural mágica de mañana, cálida y brillante. Atmósfera de cuento de hadas.$r9863_13_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_13_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_33_el_jardin_de_lo_que_sembraste_en_mi_de_hija_a_abuela.webp$r9863_13_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_14_he_to_shen$Viajeros del Tiempo De Hijo a Abuela$r9863_14_he_to_shen$,
  scene_visual = $r9863_14_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite un viaje fantástico entre generaciones a través de los recuerdos de la abuela.

Ligeramente descentrada, la abuela, con la edad y apariencia reales de su foto de referencia, expresión narrativa y cálida, en su versión actual, con una versión joven y etérea de sí misma (años 50-60, cabello oscuro) apareciendo como una proyección mágica detrás de ella. Junto a la abuela actual, su nieto ya adulto, expresión de fascinación total, mirando asombrado la versión joven de su abuela.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_14_he_to_shea$,
  background_details = $r9863_14_he_to_sheb$Ambiente surrealista con objetos vintage (radio antigua, cartas) flotando junto a elementos modernos, portal de luz dorada conectando épocas.$r9863_14_he_to_sheb$,
  magic_effects = $r9863_14_he_to_shec$Espirales de tiempo doradas y partículas brillantes conectan las dos versiones de la abuela. La magia debe sentirse conceptual y completamente integrada dentro de una fotografía realista.$r9863_14_he_to_shec$,
  lighting_color = $r9863_14_he_to_shed$Luz mágica y cinematográfica, mezcla de tonos sepia y dorados cálidos. Atmósfera de distorsión temporal suave.$r9863_14_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_14_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_14_la_casa_que_llevo_por_dentro_de_hijo_a_abuela.webp$r9863_14_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_14_she_to_shen$Viajeros del Tiempo De Hija a Abuela$r9863_14_she_to_shen$,
  scene_visual = $r9863_14_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite un viaje fantástico entre generaciones a través de los recuerdos de la abuela.

Ligeramente descentrada, la abuela, con la edad y apariencia reales de su foto de referencia, expresión narrativa y cálida, en su versión actual, con una versión joven y etérea de sí misma (años 50-60, cabello oscuro) apareciendo como una proyección mágica detrás de ella. Junto a la abuela actual, su nieta ya adulta, expresión de fascinación total, mirando asombrada la versión joven de su abuela.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_14_she_to_shea$,
  background_details = $r9863_14_she_to_sheb$Ambiente surrealista con objetos vintage (radio antigua, cartas) flotando junto a elementos modernos, portal de luz dorada conectando épocas.$r9863_14_she_to_sheb$,
  magic_effects = $r9863_14_she_to_shec$Espirales de tiempo doradas y partículas brillantes conectan las dos versiones de la abuela. La magia debe sentirse conceptual y completamente integrada dentro de una fotografía realista.$r9863_14_she_to_shec$,
  lighting_color = $r9863_14_she_to_shed$Luz mágica y cinematográfica, mezcla de tonos sepia y dorados cálidos. Atmósfera de distorsión temporal suave.$r9863_14_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_14_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_34_la_casa_que_llevo_por_dentro_de_hija_a_abuela.webp$r9863_14_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_15_he_to_shen$Príncipe de la Abuela De Hijo a Abuela$r9863_15_he_to_shen$,
  scene_visual = $r9863_15_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad tierna: en el reino de amor de la abuela, su nieto ya adulto es el protagonista.

Ligeramente descentrada vestida como reina benevolente, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de orgullo maternal, con vestido largo en tonos lavanda, corona delicada de flores, sosteniendo la mano de su nieto ya adulto. Vestido como príncipe, su nieto ya adulto, expresión de felicidad absoluta, con traje elegante y corona a juego.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_15_he_to_shea$,
  background_details = $r9863_15_he_to_sheb$Escenario de cuento de hadas con trono decorado con flores, cortinas de terciopelo púrpura y dorado, alfombra roja.$r9863_15_he_to_sheb$,
  magic_effects = $r9863_15_he_to_shec$Destellos de luz dorada flotan alrededor con pequeñas estrellas brillantes. La magia debe sentirse majestuosa y completamente integrada dentro de una fotografía realista.$r9863_15_he_to_shec$,
  lighting_color = $r9863_15_he_to_shed$Luz dorada y majestuosa tipo atardecer de cuento de hadas. Atmósfera de castillo encantado pero acogedor.$r9863_15_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_15_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_15_el_oficio_silencioso_de_cuidar_de_hijo_a_abuela.webp$r9863_15_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_15_she_to_shen$Princesa de la Abuela De Hija a Abuela$r9863_15_she_to_shen$,
  scene_visual = $r9863_15_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad tierna: en el reino de amor de la abuela, su nieta ya adulta es el protagonista.

Ligeramente descentrada vestida como reina benevolente, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de orgullo maternal, con vestido largo en tonos lavanda, corona delicada de flores, sosteniendo la mano de su nieta ya adulta. Vestido como princesa, su nieta ya adulta, expresión de felicidad absoluta, con traje elegante y corona a juego.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_15_she_to_shea$,
  background_details = $r9863_15_she_to_sheb$Escenario de cuento de hadas con trono decorado con flores, cortinas de terciopelo púrpura y dorado, alfombra roja.$r9863_15_she_to_sheb$,
  magic_effects = $r9863_15_she_to_shec$Destellos de luz dorada flotan alrededor con pequeñas estrellas brillantes. La magia debe sentirse majestuosa y completamente integrada dentro de una fotografía realista.$r9863_15_she_to_shec$,
  lighting_color = $r9863_15_she_to_shed$Luz dorada y majestuosa tipo atardecer de cuento de hadas. Atmósfera de castillo encantado pero acogedor.$r9863_15_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_15_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_35_el_oficio_silencioso_de_cuidar_de_hija_a_abuela.webp$r9863_15_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_16_he_to_shen$Aventureros en la Biblioteca De Hijo a Abuela$r9863_16_he_to_shen$,
  scene_visual = $r9863_16_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el vuelo de la imaginación al leer juntos.

Ligeramente descentrados en un sillón grande rodeados de libros, la abuela, con la edad y apariencia reales de su foto de referencia, expresión cálida y narrativa, con gafas de lectura, leyendo un libro grande ilustrado. Acurrucado junto a ella, su nieto ya adulto, ojos brillantes de fascinación, mirando el libro.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_16_he_to_shea$,
  background_details = $r9863_16_he_to_sheb$Biblioteca hogareña con estantes de madera llenos de libros, escalera de biblioteca, lámpara de lectura cálida.$r9863_16_he_to_sheb$,
  magic_effects = $r9863_16_he_to_shec$Personajes de cuentos (dragones, princesas) emergen sutilmente de las páginas como hologramas etéreos y brillantes. La magia debe sentirse literaria y completamente integrada dentro de una fotografía realista.$r9863_16_he_to_shec$,
  lighting_color = $r9863_16_he_to_shed$Luz cálida y acogedora de lámpara y ventana. Atmósfera de fantasía literaria y calidez.$r9863_16_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_16_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_16_la_risa_que_me_devuelve_al_origen_de_hijo_a_abuela.webp$r9863_16_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_16_she_to_shen$Aventureros en la Biblioteca De Hija a Abuela$r9863_16_she_to_shen$,
  scene_visual = $r9863_16_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el vuelo de la imaginación al leer juntos.

Ligeramente descentrados en un sillón grande rodeados de libros, la abuela, con la edad y apariencia reales de su foto de referencia, expresión cálida y narrativa, con gafas de lectura, leyendo un libro grande ilustrado. Acurrucada junto a ella, su nieta ya adulta, ojos brillantes de fascinación, mirando el libro.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_16_she_to_shea$,
  background_details = $r9863_16_she_to_sheb$Biblioteca hogareña con estantes de madera llenos de libros, escalera de biblioteca, lámpara de lectura cálida.$r9863_16_she_to_sheb$,
  magic_effects = $r9863_16_she_to_shec$Personajes de cuentos (dragones, princesas) emergen sutilmente de las páginas como hologramas etéreos y brillantes. La magia debe sentirse literaria y completamente integrada dentro de una fotografía realista.$r9863_16_she_to_shec$,
  lighting_color = $r9863_16_she_to_shed$Luz cálida y acogedora de lámpara y ventana. Atmósfera de fantasía literaria y calidez.$r9863_16_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_16_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_36_la_risa_que_me_devuelve_al_origen_de_hija_a_abuela.webp$r9863_16_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_17_he_to_shen$Superheroína Abuela De Hijo a Abuela$r9863_17_he_to_shen$,
  scene_visual = $r9863_17_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite poder heroico con ternura: el amor de la abuela es su verdadero superpoder.

Ligeramente descentrada en postura heroica, la abuela, con la edad y apariencia reales de su foto de referencia, expresión poderosa pero cálida, vestida como superheroína con capa brillante en dorado y lavanda, símbolo de corazón en el pecho. Junto a ella como compañero superhéroe, su nieto ya adulto, expresión de admiración y orgullo, con capa a juego, rostro completamente visible.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_17_he_to_shea$,
  background_details = $r9863_17_he_to_sheb$Escenario urbano estilizado tipo cómic con edificios en perspectiva, cielo dramático con nubes y rayos de luz.$r9863_17_he_to_sheb$,
  magic_effects = $r9863_17_he_to_shec$Corazones brillantes flotan como símbolo del superpoder de la abuela, con un aura dorada rodeándola. La magia debe sentirse heroica y completamente integrada dentro de una fotografía realista.$r9863_17_he_to_shec$,
  lighting_color = $r9863_17_he_to_shed$Iluminación dramática y cinematográfica con luz heroica. Atmósfera épica pero tierna y familiar.$r9863_17_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_17_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_17_el_legado_de_mirar_con_ternura_de_hijo_a_abuela.webp$r9863_17_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_17_she_to_shen$Superheroína Abuela De Hija a Abuela$r9863_17_she_to_shen$,
  scene_visual = $r9863_17_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite poder heroico con ternura: el amor de la abuela es su verdadero superpoder.

Ligeramente descentrada en postura heroica, la abuela, con la edad y apariencia reales de su foto de referencia, expresión poderosa pero cálida, vestida como superheroína con capa brillante en dorado y lavanda, símbolo de corazón en el pecho. Junto a ella como compañero superhéroe, su nieta ya adulta, expresión de admiración y orgullo, con capa a juego, rostro completamente visible.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_17_she_to_shea$,
  background_details = $r9863_17_she_to_sheb$Escenario urbano estilizado tipo cómic con edificios en perspectiva, cielo dramático con nubes y rayos de luz.$r9863_17_she_to_sheb$,
  magic_effects = $r9863_17_she_to_shec$Corazones brillantes flotan como símbolo del superpoder de la abuela, con un aura dorada rodeándola. La magia debe sentirse heroica y completamente integrada dentro de una fotografía realista.$r9863_17_she_to_shec$,
  lighting_color = $r9863_17_she_to_shed$Iluminación dramática y cinematográfica con luz heroica. Atmósfera épica pero tierna y familiar.$r9863_17_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_17_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_37_el_legado_de_mirar_con_ternura_de_hija_a_abuela.webp$r9863_17_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_18_he_to_shen$Tu Legado de Amor De Hijo a Abuela$r9863_18_he_to_shen$,
  scene_visual = $r9863_18_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite continuidad y la promesa de un legado de amor que perdurará para siempre.

Ligeramente descentrados caminando de la mano por un sendero, vistos en ángulo de tres cuartos con los rostros visibles, la abuela, con la edad y apariencia reales de su foto de referencia, expresión serena, sosteniendo con ternura la mano de su nieto ya adulto. su nieto ya adulto, expresión de confianza, caminando junto a ella mirando hacia adelante.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_18_he_to_shea$,
  background_details = $r9863_18_he_to_sheb$Camino hermoso que se extiende hacia el horizonte rodeado de naturaleza exuberante, cielo con colores de atardecer espectacular.$r9863_18_he_to_sheb$,
  magic_effects = $r9863_18_he_to_shec$Huellas brillantes detrás de ellas se transforman sutilmente en flores, y mariposas las siguen. La magia debe sentirse esperanzadora y completamente integrada dentro de una fotografía realista.$r9863_18_he_to_shec$,
  lighting_color = $r9863_18_he_to_shed$Luz dorada de atardecer, cálida y esperanzadora. Atmósfera de paz y continuidad.$r9863_18_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_18_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_18_la_ventana_donde_aprendi_a_esperar_de_hijo_a_abuela.webp$r9863_18_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_18_she_to_shen$Tu Legado de Amor De Hija a Abuela$r9863_18_she_to_shen$,
  scene_visual = $r9863_18_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite continuidad y la promesa de un legado de amor que perdurará para siempre.

Ligeramente descentrados caminando de la mano por un sendero, vistos en ángulo de tres cuartos con los rostros visibles, la abuela, con la edad y apariencia reales de su foto de referencia, expresión serena, sosteniendo con ternura la mano de su nieta ya adulta. su nieta ya adulta, expresión de confianza, caminando junto a ella mirando hacia adelante.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_18_she_to_shea$,
  background_details = $r9863_18_she_to_sheb$Camino hermoso que se extiende hacia el horizonte rodeado de naturaleza exuberante, cielo con colores de atardecer espectacular.$r9863_18_she_to_sheb$,
  magic_effects = $r9863_18_she_to_shec$Huellas brillantes detrás de ellas se transforman sutilmente en flores, y mariposas las siguen. La magia debe sentirse esperanzadora y completamente integrada dentro de una fotografía realista.$r9863_18_she_to_shec$,
  lighting_color = $r9863_18_she_to_shed$Luz dorada de atardecer, cálida y esperanzadora. Atmósfera de paz y continuidad.$r9863_18_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_18_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_38_la_ventana_donde_aprendi_a_esperar_de_hija_a_abuela.webp$r9863_18_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_19_he_to_shen$Cuando Crezca Seré Como Tú De Hijo a Abuela$r9863_19_he_to_shen$,
  scene_visual = $r9863_19_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite aspiración amorosa: su nieto ya adulto soñando con ser tan sabio y bondadoso como su abuela.

Ligeramente descentrada con elegancia digna, la abuela, con la edad y apariencia reales de su foto de referencia, expresión serena y orgullosa, vistiendo ropa elegante. Junto a ella, su nieto ya adulto, expresión de admiración, mirando a su abuela, con una versión etérea de sí mismo adulto reflejado sutilmente imitando su postura.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_19_he_to_shea$,
  background_details = $r9863_19_he_to_sheb$Espacio con elementos que conectan presente y futuro, portal de luz suave uniendo ambas escenas.$r9863_19_he_to_sheb$,
  magic_effects = $r9863_19_he_to_shec$Líneas de luz conectan a la abuela con su nieto y su versión futura, con símbolos de cualidades (corazón, libro) flotando entre ellas. La magia debe sentirse aspiracional y completamente integrada dentro de una fotografía realista.$r9863_19_he_to_shec$,
  lighting_color = $r9863_19_he_to_shed$Luz cálida y esperanzadora que une ambas figuras. Atmósfera de aspiración y legado.$r9863_19_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_19_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_19_la_promesa_de_volver_a_casa_de_hijo_a_abuela.webp$r9863_19_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_19_she_to_shen$Cuando Crezca Seré Como Tú De Hija a Abuela$r9863_19_she_to_shen$,
  scene_visual = $r9863_19_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite aspiración amorosa: su nieta ya adulta soñando con ser tan sabia y bondadosa como su abuela.

Ligeramente descentrada con elegancia digna, la abuela, con la edad y apariencia reales de su foto de referencia, expresión serena y orgullosa, vistiendo ropa elegante. Junto a ella, su nieta ya adulta, expresión de admiración, mirando a su abuela, con una versión etérea de sí misma adulta reflejada sutilmente imitando su postura.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_19_she_to_shea$,
  background_details = $r9863_19_she_to_sheb$Espacio con elementos que conectan presente y futuro, portal de luz suave uniendo ambas escenas.$r9863_19_she_to_sheb$,
  magic_effects = $r9863_19_she_to_shec$Líneas de luz conectan a la abuela con su nieta y su versión futura, con símbolos de cualidades (corazón, libro) flotando entre ellas. La magia debe sentirse aspiracional y completamente integrada dentro de una fotografía realista.$r9863_19_she_to_shec$,
  lighting_color = $r9863_19_she_to_shed$Luz cálida y esperanzadora que une ambas figuras. Atmósfera de aspiración y legado.$r9863_19_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_19_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_39_la_promesa_de_volver_a_casa_de_hija_a_abuela.webp$r9863_19_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_20_he_to_shen$Gracias Por Ser Mi Abuela De Hijo a Abuela$r9863_20_he_to_shen$,
  scene_visual = $r9863_20_he_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite gratitud absoluta y amor puro en el cierre emotivo del libro.

Ligeramente descentrados en un abrazo frontal muy estrecho, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de amor incondicional y felicidad profunda, con ojos cerrados, frente casi tocando la de su nieto ya adulto. su nieto ya adulto, expresión de amor puro y gratitud, envuelto en el abrazo con el rostro visible hacia la cámara.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_20_he_to_shea$,
  background_details = $r9863_20_he_to_sheb$Fondo desenfocado con luz dorada envolvente que crea un halo alrededor de ambos, eliminando distracciones.$r9863_20_he_to_sheb$,
  magic_effects = $r9863_20_he_to_shec$Un aura de luz dorada brillante e intensa rodea a ambos, con corazones grandes y pequeños flotando abundantemente. La magia debe sentirse celestial y completamente integrada dentro de una fotografía realista.$r9863_20_he_to_shec$,
  lighting_color = $r9863_20_he_to_shed$Luz dorada intensa y envolvente, casi celestial. Atmósfera de máxima intensidad emotiva y gratitud.$r9863_20_he_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_20_he_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_20_siempre_sere_parte_de_tu_historia_de_hijo_a_abuela.webp$r9863_20_he_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9863_20_she_to_shen$Gracias Por Ser Mi Abuela De Hija a Abuela$r9863_20_she_to_shen$,
  scene_visual = $r9863_20_she_to_shea$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite gratitud absoluta y amor puro en el cierre emotivo del libro.

Ligeramente descentrados en un abrazo frontal muy estrecho, la abuela, con la edad y apariencia reales de su foto de referencia, expresión de amor incondicional y felicidad profunda, con ojos cerrados, frente casi tocando la de su nieta ya adulta. su nieta ya adulta, expresión de amor puro y gratitud, envuelta en el abrazo con el rostro visible hacia la cámara.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9863_20_she_to_shea$,
  background_details = $r9863_20_she_to_sheb$Fondo desenfocado con luz dorada envolvente que crea un halo alrededor de ambos, eliminando distracciones.$r9863_20_she_to_sheb$,
  magic_effects = $r9863_20_she_to_shec$Un aura de luz dorada brillante e intensa rodea a ambos, con corazones grandes y pequeños flotando abundantemente. La magia debe sentirse celestial y completamente integrada dentro de una fotografía realista.$r9863_20_she_to_shec$,
  lighting_color = $r9863_20_she_to_shed$Luz dorada intensa y envolvente, casi celestial. Atmósfera de máxima intensidad emotiva y gratitud.
$r9863_20_she_to_shed$,
  updated_at = now()
WHERE template_preview_key = $r9863_20_she_to_shek$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_40_siempre_sere_parte_de_tu_historia_de_hija_a_abuela.webp$r9863_20_she_to_shek$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_1_xn$Parque Triásico$r9859_1_xn$,
  scene_visual = $r9859_1_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad y la emoción de que a los hermanos se les ocurran planes increíbles juntos.

Ligeramente descentrados en un bosque prehistórico, los hermanos, con expresión de aventura y complicidad, vestidos de exploradores, construyen juntos una cabaña de ramas y acarician con cuidado a un pequeño dinosaurio amigable.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_1_xa$,
  background_details = $r9859_1_xb$Bosque prehistórico con helechos gigantes y árboles enormes, huellas de dinosaurio en el suelo, cabaña hecha de ramas.$r9859_1_xb$,
  magic_effects = $r9859_1_xc$Huevos de dinosaurio brillan suavemente y plantas fosforescentes iluminan el follaje. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$r9859_1_xc$,
  lighting_color = $r9859_1_xd$Iluminación cálida de selva prehistórica, luz dorada filtrada entre helechos. Atmósfera de aventura, creatividad y diversión.$r9859_1_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_1_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_01_la_estrategia_de_nuestras_locuras.webp$r9859_1_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_2_xn$Nave de las Nubes$r9859_2_xn$,
  scene_visual = $r9859_2_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite un sueño compartido de explorar mundos desconocidos juntos.

Ligeramente descentrados a bordo de una nave hecha de nubes, los hermanos, con expresión de asombro soñador, señalan juntos una isla flotante y extienden los brazos hacia un arcoíris.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_2_xa$,
  background_details = $r9859_2_xb$Cielo mágico con nubes esponjosas formando una nave, islas flotantes con castillos en el aire, pájaros fantásticos.$r9859_2_xb$,
  magic_effects = $r9859_2_xc$Arcoíris y estrellas brillan suavemente alrededor de la nave de nubes. La magia debe sentirse soñadora y completamente integrada dentro de una fotografía realista.$r9859_2_xc$,
  lighting_color = $r9859_2_xd$Atardecer pastel con destellos dorados y estrellas tempranas. Atmósfera etérea y soñadora.$r9859_2_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_2_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_02_el_pacto_de_llegar_juntos.webp$r9859_2_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_3_xn$Laboratorio de Juegos$r9859_3_xn$,
  scene_visual = $r9859_3_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite creatividad desbordante e ingenio compartido entre los hermanos.

Ligeramente descentrados en su laboratorio de juegos, los hermanos, con expresión de diversión traviesa, con batas de "científicos del juego", lanzan un dado gigante y arman juntos un tablero brillante rodeado de piezas de colores flotando.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_3_xa$,
  background_details = $r9859_3_xb$Habitación llena de mesas con piezas de colores, cartas mágicas, pizarras con fórmulas de juegos dibujadas.$r9859_3_xb$,
  magic_effects = $r9859_3_xc$Juguetes y piezas flotan suavemente con un brillo de neón mágico. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$r9859_3_xc$,
  lighting_color = $r9859_3_xd$Luz de neón colorida mezclada con luz cálida de interior. Atmósfera creativa, colorida y caótica.$r9859_3_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_3_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_03_la_banda_sonora_de_nuestras_batallas.webp$r9859_3_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_4_xn$Mansión Encantada$r9859_4_xn$,
  scene_visual = $r9859_4_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite travesura cómica y valentía compartida frente a fantasmas simpáticos.

Ligeramente descentrados en un pasillo de mansión antigua, los hermanos, con expresión pícara y divertida, con linternas en mano, señalan un cuadro que se mueve y saludan juntos a un fantasma simpático y translúcido.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_4_xa$,
  background_details = $r9859_4_xb$Mansión antigua con pasillos largos, cuadros que se mueven, lámparas flotantes, muebles antiguos.$r9859_4_xb$,
  magic_effects = $r9859_4_xc$Un fantasma simpático flota entre risas y las puertas se entreabren con luces misteriosas. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$r9859_4_xc$,
  lighting_color = $r9859_4_xd$Luz tenue y misteriosa con destellos violetas de las lámparas flotantes. Atmósfera de misterio divertido.$r9859_4_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_4_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_04_el_idioma_privado_de_las_bromas.webp$r9859_4_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_5_xn$Castillo de Cojines$r9859_5_xn$,
  scene_visual = $r9859_5_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el orgullo de defender juntos una fortaleza indestructible construida con amor.

Ligeramente descentrados defendiendo su fortaleza, los hermanos, con expresión heroica y feliz, con coronas de papel y escudos de cartón, custodian juntos su castillo de cojines desde la torre principal.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_5_xa$,
  background_details = $r9859_5_xb$Sala familiar convertida en castillo de cojines y mantas de colores, peluches "dragones", banderas hechas a mano.$r9859_5_xb$,
  magic_effects = $r9859_5_xc$Luces cálidas parpadean como si el castillo tuviera su propia magia protectora. La magia debe sentirse acogedora y completamente integrada dentro de una fotografía realista.$r9859_5_xc$,
  lighting_color = $r9859_5_xd$Luz cálida de interior con tonos anaranjados y dorados. Atmósfera acogedora, divertida y mágica.$r9859_5_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_5_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_05_la_ruta_que_inventamos_sin_mapa.webp$r9859_5_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_6_xn$Cueva del Tesoro Escondido$r9859_6_xn$,
  scene_visual = $r9859_6_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite misterio y la emoción de un hallazgo compartido entre los hermanos.

Ligeramente descentrados dentro de una cueva iluminada por linternas, los hermanos, con expresión de sigilo y alegría, avanzan juntos entre piedras brillantes sosteniendo un mapa hecho a mano y un cofre pequeño con monedas.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_6_xa$,
  background_details = $r9859_6_xb$Cueva mágica iluminada por piedras brillantes, cofres, monedas y joyas antiguas dispersas.$r9859_6_xb$,
  magic_effects = $r9859_6_xc$Las piedras de la cueva emiten un resplandor suave que guía el camino. La magia debe sentirse misteriosa y completamente integrada dentro de una fotografía realista.$r9859_6_xc$,
  lighting_color = $r9859_6_xd$Luz de linterna cálida contra la penumbra azulada de la cueva, con reflejos dorados en las piedras. Atmósfera de misterio y alegría.$r9859_6_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_6_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_06_el_archivo_de_nuestras_victorias_pequenas.webp$r9859_6_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_7_xn$Batalla de Almohadas$r9859_7_xn$,
  scene_visual = $r9859_7_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite caos alegre y diversión pura en plena batalla de almohadas.

Ligeramente descentrados en plena batalla, los hermanos, con expresión de risa desbordante, lanzan y esquivan almohadas entre plumas flotantes, cayendo juntos entre cojines suaves riendo a carcajadas.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_7_xa$,
  background_details = $r9859_7_xb$Sala llena de almohadas y plumas flotando, pijamas coloridas, trincheras improvisadas de cojines.$r9859_7_xb$,
  magic_effects = $r9859_7_xc$Las plumas flotan en el aire como si el tiempo se ralentizara en cada golpe de almohada. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$r9859_7_xc$,
  lighting_color = $r9859_7_xd$Luz cálida de interior con tonos alegres y brillantes. Atmósfera caótica y divertida.$r9859_7_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_7_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_07_la_mesa_de_los_planes_imposibles.webp$r9859_7_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_8_xn$Galería de los Genios$r9859_8_xn$,
  scene_visual = $r9859_8_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite orgullo creativo y la alegría de dejar huella juntos.

Ligeramente descentrados frente a sus obras, los hermanos, con expresión de orgullo artístico, con manchas de pintura en la ropa, firman y muestran juntos sus cuadros recién pintados, con las manos llenas de color.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_8_xa$,
  background_details = $r9859_8_xb$Habitación convertida en galería de arte con cuadros coloridos, caballetes, esculturas de plastilina.$r9859_8_xb$,
  magic_effects = $r9859_8_xc$Los colores de las pinturas parecen brillar con vida propia sobre los lienzos. La magia debe sentirse creativa y completamente integrada dentro de una fotografía realista.$r9859_8_xc$,
  lighting_color = $r9859_8_xd$Luz cálida de estudio de arte con acentos de colores vivos. Atmósfera artística, alegre y creativa.$r9859_8_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_8_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_08_el_codigo_secreto_de_la_confianza.webp$r9859_8_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_9_xn$Agencia Secreta de Detectives$r9859_9_xn$,
  scene_visual = $r9859_9_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ingenio compartido resolviendo un misterio familiar.

Ligeramente descentrados analizando pistas, los hermanos, con expresión analítica y de descubrimiento, con gabardina de detective y lupa, examinan juntos una pizarra llena de pistas y señalan una huella con emoción.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_9_xa$,
  background_details = $r9859_9_xb$Cuarto decorado como oficina de detectives, con mapas, pizarras y lupas colgadas.$r9859_9_xb$,
  magic_effects = $r9859_9_xc$Las pistas en la pizarra parecen conectarse solas con hilos de luz sutil. La magia debe sentirse intrigante y completamente integrada dentro de una fotografía realista.$r9859_9_xc$,
  lighting_color = $r9859_9_xd$Luz tenue de oficina con un foco cálido sobre la pizarra de pistas. Atmósfera intrigante y divertida.$r9859_9_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_9_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_09_la_noche_en_que_supimos_cubrirnos.webp$r9859_9_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_10_xn$Máquina del Tiempo$r9859_10_xn$,
  scene_visual = $r9859_10_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite la emoción épica de viajar juntos por distintas épocas.

Ligeramente descentrados junto a una máquina del tiempo brillante, los hermanos, con expresión de asombro explorador, disfrazados de caballero medieval, científica futurista y pequeña pirata, observan juntos los engranajes brillantes.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_10_xa$,
  background_details = $r9859_10_xb$Máquina del tiempo fantástica con luces, engranajes y pantallas, portales brillantes de distintas épocas.$r9859_10_xb$,
  magic_effects = $r9859_10_xc$Relojes flotantes giran suavemente mientras portales de luz muestran destellos de otras épocas. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9859_10_xc$,
  lighting_color = $r9859_10_xd$Luz azul y dorada dinámica de la máquina, contraste entre tonos futuristas e históricos. Atmósfera épica y fantástica.$r9859_10_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_10_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_10_el_taller_de_las_soluciones_raras.webp$r9859_10_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_11_xn$Isla Calavera$r9859_11_xn$,
  scene_visual = $r9859_11_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite espíritu aventurero y complicidad pirata entre los hermanos.

Ligeramente descentrados en su barco improvisado, los hermanos, con expresión decidida y pícara, con sombrero y parche de pirata, sostienen juntos un mapa del tesoro y una espada de.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_11_xa$,
  background_details = $r9859_11_xb$Sala o jardín convertido en mar de aventuras con barco improvisado, cofres, banderas pirata.$r9859_11_xb$,
  magic_effects = $r9859_11_xc$Las olas de mantas parecen moverse suavemente como si fueran mar de verdad. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$r9859_11_xc$,
  lighting_color = $r9859_11_xd$Luz cálida y dorada de aventura pirata. Atmósfera colorida, alegre y llena de emoción.$r9859_11_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_11_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_11_la_patrulla_de_los_dias_dificiles.webp$r9859_11_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_12_xn$Valle de los Dragones$r9859_12_xn$,
  scene_visual = $r9859_12_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite valentía compartida al cuidar y domar criaturas fantásticas.

Ligeramente descentrados junto a dragones amigables, los hermanos, con expresión valiente y encantada, montan y acarician juntos a dragones de escamas doradas y turquesas, abrazando con ternura a un dragón bebé.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_12_xa$,
  background_details = $r9859_12_xb$Paisaje fantástico con montañas, dragones de colores y ríos de lava a la distancia.$r9859_12_xb$,
  magic_effects = $r9859_12_xc$Pequeñas chispas doradas se desprenden suavemente de las escamas de los dragones. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9859_12_xc$,
  lighting_color = $r9859_12_xd$Luz dorada y anaranjada con reflejos de lava distante. Atmósfera épica, mágica y cálida.$r9859_12_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_12_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_12_el_refugio_donde_nadie_actua_solo.webp$r9859_12_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_13_xn$Torre de los Códigos$r9859_13_xn$,
  scene_visual = $r9859_13_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad secreta e ingenio compartido entre los hermanos.

Ligeramente descentrados en su torre de mantas y cojines, los hermanos, con expresión cómplice y curiosa, escriben y señalan juntos símbolos secretos en papeles y una pizarra pequeña.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_13_xa$,
  background_details = $r9859_13_xb$Torre de juegos hecha con mantas, cojines y libros, pizarras y notas con dibujos misteriosos.$r9859_13_xb$,
  magic_effects = $r9859_13_xc$Los símbolos dibujados parecen brillar tenuemente como si guardaran un secreto real. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$r9859_13_xc$,
  lighting_color = $r9859_13_xd$Luz íntima y cálida de interior. Atmósfera íntima, divertida y creativa.$r9859_13_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_13_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_13_la_brujula_de_los_hermanos.webp$r9859_13_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_14_xn$Templo Kung Fu$r9859_14_xn$,
  scene_visual = $r9859_14_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite energía competitiva sana y diversión entre los hermanos.

Ligeramente descentrados en poses dinámicas de artes marciales, los hermanos, con expresión de esfuerzo alegre y decidido, con cintas de colores, adoptan juntos posturas de patada y defensa, luciendo sus medallas con orgullo.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_14_xa$,
  background_details = $r9859_14_xb$Dojo o templo oriental con cintas de colores, medallas y banderines colgando.$r9859_14_xb$,
  magic_effects = $r9859_14_xc$Un brillo sutil de energía rodea sus movimientos como si tuvieran un poder especial. La magia debe sentirse enérgica y completamente integrada dentro de una fotografía realista.$r9859_14_xc$,
  lighting_color = $r9859_14_xd$Luz enérgica y cálida con acentos rojos y dorados. Atmósfera enérgica y alegre.$r9859_14_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_14_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_14_el_puente_despues_de_cada_pelea.webp$r9859_14_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_15_xn$Taller de Magia Creativa$r9859_15_xn$,
  scene_visual = $r9859_15_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro compartido al transformar lo cotidiano en algo mágico.

Ligeramente descentrados haciendo trucos de magia, los hermanos, con expresión de asombro encantado, con sombrero y capa de mago, hacen aparecer juntos un pañuelo de colores mientras aplauden el truco.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_15_xa$,
  background_details = $r9859_15_xb$Habitación mágica con mesas llenas de trucos, cartas, pañuelos y sombreros de mago.$r9859_15_xb$,
  magic_effects = $r9859_15_xc$Destellos brillantes acompañan cada truco, como pequeñas explosiones de luz dorada. La magia debe sentirse fantástica y completamente integrada dentro de una fotografía realista.$r9859_15_xc$,
  lighting_color = $r9859_15_xd$Luz fantástica llena de destellos y brillos. Atmósfera fantástica y colorida.$r9859_15_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_15_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_15_la_celebracion_de_seguir_siendo_equipo.webp$r9859_15_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_16_xn$Jardín de las Maravillas$r9859_16_xn$,
  scene_visual = $r9859_16_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite descubrimiento y asombro compartido explorando un jardín encantado.

Ligeramente descentrados explorando entre flores gigantes, los hermanos, con expresión curiosa y maravillada, con lupa y mochila de aventureros, tocan juntos un hongo brillante y siguen a un pequeño animal fantástico.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_16_xa$,
  background_details = $r9859_16_xb$Jardín hiperrealista y mágico con flores enormes, hongos brillantes, árboles con rostros simpáticos.$r9859_16_xb$,
  magic_effects = $r9859_16_xc$Luces de hadas y caminos de piedras luminosas guían el paso entre las flores. La magia debe sentirse fantástica y completamente integrada dentro de una fotografía realista.$r9859_16_xc$,
  lighting_color = $r9859_16_xd$Luz colorida y luminosa de jardín encantado. Atmósfera de descubrimiento, colorida y fantástica.$r9859_16_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_16_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_16_el_mapa_de_nuestras_diferencias.webp$r9859_16_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_17_xn$Laboratorio de Bromas$r9859_17_xn$,
  scene_visual = $r9859_17_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad traviesa y humor compartido.

Ligeramente descentrados planeando una broma, los hermanos, con expresión pícara y de risa contenida, sostienen juntos un globo de agua y una caja sorpresa, escondidos parcialmente detrás de un cojín de ruido.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_17_xa$,
  background_details = $r9859_17_xb$Habitación llena de artilugios para bromas: globos de agua, cajas misteriosas, confeti.$r9859_17_xb$,
  magic_effects = $r9859_17_xc$El confeti flota suavemente en el aire como si la broma tuviera su propia chispa de energía. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$r9859_17_xc$,
  lighting_color = $r9859_17_xd$Luz alegre y brillante con acentos de confeti de colores. Atmósfera alegre, caótica y cómica.$r9859_17_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_17_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_17_la_carrera_donde_nadie_queda_atras.webp$r9859_17_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_18_xn$Bosque de los Enigmas$r9859_18_xn$,
  scene_visual = $r9859_18_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite intriga y el ingenio compartido para resolver un enigma misterioso.

Ligeramente descentrados en un bosque de niebla, los hermanos, con expresión de concentración analítica, iluminan juntos con una linterna un símbolo extraño en un árbol mientras sostienen un mapa de pistas y señalan un cofre cerrado entre las raíces.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_18_xa$,
  background_details = $r9859_18_xb$Bosque oscuro y mágico, con árboles altos, niebla y luces misteriosas, símbolos extraños tallados en los troncos.$r9859_18_xb$,
  magic_effects = $r9859_18_xc$Los símbolos en los árboles brillan sutilmente cuando se acercan, como si reconocieran a los hermanos. La magia debe sentirse intrigante y completamente integrada dentro de una fotografía realista.$r9859_18_xc$,
  lighting_color = $r9859_18_xd$Luz tenue y misteriosa filtrada entre la niebla, con destellos verdosos y azulados. Atmósfera intrigante y mágica.$r9859_18_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_18_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_18_el_laboratorio_de_la_complicidad.webp$r9859_18_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_19_xn$Pista de Obstáculos Fantásticos$r9859_19_xn$,
  scene_visual = $r9859_19_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite energía deportiva y el espíritu de equipo en plena competencia sana.

Ligeramente descentrados en plena carrera, los hermanos, con expresión de esfuerzo alegre y decidido, saltan sobre una rampa, atraviesan un aro flotante y corren juntos por un túnel de colores.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_19_xa$,
  background_details = $r9859_19_xb$Pista de obstáculos mágica con túneles, rampas, trampolines y aros flotantes.$r9859_19_xb$,
  magic_effects = $r9859_19_xc$Los aros y plataformas brillan levemente marcando el camino, dando una sensación de carrera encantada. La magia debe sentirse enérgica y completamente integrada dentro de una fotografía realista.$r9859_19_xc$,
  lighting_color = $r9859_19_xd$Luces brillantes de pista festiva. Atmósfera enérgica, festiva y llena de acción.$r9859_19_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_19_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_19_la_promesa_de_estar_cerca.webp$r9859_19_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9859_20_xn$País de las Maravillas Nocturnas$r9859_20_xn$,
  scene_visual = $r9859_20_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz onírica y la magia de soñar juntos.

Ligeramente descentrados flotando en camas voladoras entre nubes de colores pastel, los hermanos, con expresión soñadora y pacífica, persiguen juntos una luciérnaga mirando las estrellas mientras descansan entre las nubes.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9859_20_xa$,
  background_details = $r9859_20_xb$Escena nocturna mágica con camas voladoras, lunas gigantes y estrellas sonrientes, nubes de colores pastel.$r9859_20_xb$,
  magic_effects = $r9859_20_xc$Luciérnagas doradas flotan suavemente iluminando el camino entre las nubes. La magia debe sentirse onírica y completamente integrada dentro de una fotografía realista.$r9859_20_xc$,
  lighting_color = $r9859_20_xd$Luz nocturna suave y plateada con acentos pastel. Atmósfera pacífica, onírica y reconfortante.
$r9859_20_xd$,
  updated_at = now()
WHERE template_preview_key = $r9859_20_xk$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_20_el_mejor_equipo_todavia_en_marcha.webp$r9859_20_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_1_xn$Si Fuéramos Cavernícolas$r9860_1_xn$,
  scene_visual = $r9860_1_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite calidez creativa: la familia convertida en la primera banda de rock de la prehistoria.

Ligeramente descentrados en una cueva iluminada, el papá, expresión alegre y creativa, vestido de cavernícola, tallando una guitarra de piedra y ramas. Junto a él, la mamá, sonrisa cálida, inventando una canción junto al fuego. Sus hijos, felices, bailando al ritmo de la música improvisada.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_1_xa$,
  background_details = $r9860_1_xb$Cueva prehistórica cálida con fuego encendido, instrumentos hechos de piedra y madera, paredes con dibujos rupestres.$r9860_1_xb$,
  magic_effects = $r9860_1_xc$Luciérnagas gigantes iluminan la escena con un resplandor dorado suave. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$r9860_1_xc$,
  lighting_color = $r9860_1_xd$Luz cálida del fuego de la cueva con destellos dorados de las luciérnagas. Atmósfera cálida, divertida y llena de energía creativa.$r9860_1_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_1_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_01_la_casa_de_los_mil_regresos.webp$r9860_1_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_2_xn$Si Pudiéramos Hablar Con Los Animales$r9860_2_xn$,
  scene_visual = $r9860_2_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría desbordante en un bosque encantado donde los animales tienen talento.

Ligeramente descentrados en un bosque mágico, el papá, expresión de asombro divertido, anunciando a un león que canta. Junto a él, la mamá, sonrisa aplaudiendo, celebrando a un conejo mago con sombrero de espuma. Sus hijos, felices, invitando a pájaros a participar del espectáculo.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_2_xa$,
  background_details = $r9860_2_xb$Bosque encantado con escenario natural, ardillas repartiendo nueces doradas, mariposas bailando.$r9860_2_xb$,
  magic_effects = $r9860_2_xc$Las mariposas brillan sutilmente al bailar sobre su propio escenario de hojas. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$r9860_2_xc$,
  lighting_color = $r9860_2_xd$Luz colorida y fantasiosa filtrada entre los árboles. Atmósfera colorida, fantasiosa y llena de vida.$r9860_2_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_2_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_02_el_laboratorio_de_nuestras_mezclas.webp$r9860_2_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_3_xn$Si Fuéramos Astronautas$r9860_3_xn$,
  scene_visual = $r9860_3_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite diversión espacial: la familia maneja una pizzería lunar sin gravedad.

Ligeramente descentrados flotando en gravedad cero, el papá, expresión hábil y divertida, en traje de astronauta lanzando masa de pizza al aire. Junto a él, la mamá, expresión concentrada, eligiendo ingredientes flotantes de Marte y Saturno. Sus hijos, felices, repartiendo pizzas a marcianos simpáticos.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_3_xa$,
  background_details = $r9860_3_xb$Pizzería lunar futurista con ventanas al espacio, la Tierra visible de fondo, ingredientes flotando.$r9860_3_xb$,
  magic_effects = $r9860_3_xc$Las estrellas parecen aplaudir desde la ventana con destellos sutiles. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$r9860_3_xc$,
  lighting_color = $r9860_3_xd$Luz futurista azul y plateada con destellos de estrellas. Atmósfera divertida, brillante y espacial.$r9860_3_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_3_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_03_la_mesa_donde_todos_cabemos.webp$r9860_3_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_4_xn$Si Estuviéramos Atascados En El Tráfico$r9860_4_xn$,
  scene_visual = $r9860_4_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite creatividad familiar transformando el tráfico aburrido en pura diversión.

Ligeramente descentrados dentro del auto, el papá, expresión narrativa divertida, inventando historias de dragones desde el asiento del conductor. Junto a él, la mamá, sonrisa competitiva, iniciando una competencia de chistes. Sus hijos, felices, convirtiendo los semáforos en portales mágicos.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_4_xa$,
  background_details = $r9860_4_xb$Interior de auto familiar rodeado de tráfico, ventanas con dibujos de vapor, dragones volando fuera de la ventana como fantasía.$r9860_4_xb$,
  magic_effects = $r9860_4_xc$Globos de diálogo brillantes con chistes flotan sutilmente sobre las ventanas. La magia debe sentirse creativa y completamente integrada dentro de una fotografía realista.$r9860_4_xc$,
  lighting_color = $r9860_4_xd$Luz cálida de interior de auto con destellos de color de la imaginación desbordante. Atmósfera cálida y llena de creatividad.$r9860_4_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_4_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_04_la_ruta_de_las_voces_mezcladas.webp$r9860_4_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_5_xn$Si El Supermercado Fuera Un Castillo Encantado$r9860_5_xn$,
  scene_visual = $r9860_5_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fantasía medieval: hacer las compras se convierte en un festival encantado.

Ligeramente descentrados cruzando un puente dorado, el papá, expresión aventurera, cabalgando un carrito de compras con forma de dragón. Junto a él, la mamá, expresión mágica, lanzando hechizos con una varita de pan. Sus hijos, felices, buscando tesoros entre los pasillos.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_5_xa$,
  background_details = $r9860_5_xb$Supermercado convertido en castillo medieval, estanterías como murallas, frascos de mermelada bailando en el pasillo.$r9860_5_xb$,
  magic_effects = $r9860_5_xc$Los productos brillan sutilmente como si tuvieran una misión secreta que cumplir. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$r9860_5_xc$,
  lighting_color = $r9860_5_xd$Luz dorada de cuento de hadas iluminando los pasillos. Atmósfera mágica, festiva y colorida.$r9860_5_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_5_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_05_el_archivo_de_las_sobremesas.webp$r9860_5_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_6_xn$Si Fuéramos Piratas$r9860_6_xn$,
  scene_visual = $r9860_6_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite aventura pirata familiar en busca de tesoros de risa.

Ligeramente descentrados en su barco fantástico, el papá, expresión de capitán, gritando "al abordaje" mientras navega. Junto a él, la mamá, expresión aventurera, con mapa de noche y de día descubriendo islas secretas. Sus hijos, felices, buscando cofres de risas entre olas de almohadas.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_6_xa$,
  background_details = $r9860_6_xb$Barco fantástico sobre mares de colores, loros parlantes, gaviotas sin prisa volando.$r9860_6_xb$,
  magic_effects = $r9860_6_xc$Los loros repiten historias de mares dorados con un brillo mágico sutil. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$r9860_6_xc$,
  lighting_color = $r9860_6_xd$Luz cálida y dorada de mar de colores fantásticos. Atmósfera de aventura familiar y alegría.$r9860_6_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_6_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_06_la_coreografia_de_los_dias_comunes.webp$r9860_6_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_7_xn$Si La Sala Fuera Una Jungla$r9860_7_xn$,
  scene_visual = $r9860_7_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite exploración salvaje y divertida dentro del propio living.

Ligeramente descentrados en la sala transformada en selva, el papá, expresión de rugido divertido, rugiendo listo para explorar. Junto a él, la mamá, expresión alegre, bailando entre lianas hechas de mantas. Sus hijos, felices, con binoculares de cartón descubriendo rincones.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_7_xa$,
  background_details = $r9860_7_xb$Sala convertida en jungla exuberante, muebles cubiertos de hojas, peluches como animales salvajes.$r9860_7_xb$,
  magic_effects = $r9860_7_xc$Debajo de la mesa se esconde un hada pequeña y brillante. La magia debe sentirse juguetona y completamente integrada dentro de una fotografía realista.$r9860_7_xc$,
  lighting_color = $r9860_7_xd$Luz cálida de interior con acentos verdes vibrantes de la jungla improvisada. Atmósfera de juego total.$r9860_7_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_7_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_07_la_cocina_donde_empieza_la_historia.webp$r9860_7_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_8_xn$Si La Cocina Fuera Un Laboratorio Loco$r9860_8_xn$,
  scene_visual = $r9860_8_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ciencia divertida convertida en un experimento familiar delicioso.

Ligeramente descentrados en la cocina-laboratorio, el papá, expresión de científico preciso, mezclando pociones de colores con bata y gafas. Junto a él, la mamá, expresión creativa, inventando helados de arcoíris brillante. Sus hijos, felices, creando burbujas flotantes.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_8_xa$,
  background_details = $r9860_8_xb$Cocina convertida en laboratorio, tubos de ensayo, ingredientes de colores brillantes.$r9860_8_xb$,
  magic_effects = $r9860_8_xc$Las cucharas parecen varitas y los vasos calderos, con destellos suaves al mezclar los ingredientes. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$r9860_8_xc$,
  lighting_color = $r9860_8_xd$Luz brillante de laboratorio con destellos de colores vivos. Atmósfera divertida y llena de energía creativa.$r9860_8_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_8_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_08_el_mapa_de_nuestras_mudanzas.webp$r9860_8_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_9_xn$Si Viajáramos En Globo Por El Cielo$r9860_9_xn$,
  scene_visual = $r9860_9_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite libertad y paz al volar juntos entre nubes y arcoíris.

Ligeramente descentrados en un globo aerostático, el papá, expresión amorosa, saludando a las nubes. Junto a él, la mamá, expresión curiosa, entrevistando a pájaros viajeros imaginarios. Sus hijos, felices, lanzando besos al viento.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_9_xa$,
  background_details = $r9860_9_xb$Globo aerostático con detalles personalizados en colores pastel, paisajes de nubes y arcoíris.$r9860_9_xb$,
  magic_effects = $r9860_9_xc$El paisaje se pinta suavemente de sueños y contento con destellos pastel. La magia debe sentirse pacífica y completamente integrada dentro de una fotografía realista.$r9860_9_xc$,
  lighting_color = $r9860_9_xd$Luz suave pastel de cielo despejado. Atmósfera pacífica, soñadora y llena de amor.$r9860_9_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_9_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_09_la_sala_de_los_planes_pendientes.webp$r9860_9_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_10_xn$Si Tuviéramos Superpoderes$r9860_10_xn$,
  scene_visual = $r9860_10_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite la magia cotidiana de una familia con "superpoderes" domésticos divertidos.

Ligeramente descentrados en casa, el papá, expresión traviesa, convirtiendo un bostezo en pequeñas luces especiales. Junto a él, la mamá, expresión divertida, encontrando calcetines perdidos con solo chasquear los dedos. Sus hijos, felices, haciendo que la comida humee deliciosamente.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_10_xa$,
  background_details = $r9860_10_xb$Interior de casa con plantas bailando suavemente y juguetes flotando levemente.$r9860_10_xb$,
  magic_effects = $r9860_10_xc$Fuegos artificiales de colores pequeños y suaves acompañan cada superpoder casero. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$r9860_10_xc$,
  lighting_color = $r9860_10_xd$Luz cálida de hogar con destellos de colores mágicos. Atmósfera alegre y llena de acción.$r9860_10_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_10_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_10_el_jardin_de_las_generaciones.webp$r9860_10_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_11_xn$Si Fuéramos Exploradores$r9860_11_xn$,
  scene_visual = $r9860_11_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite espíritu explorador y el descubrimiento de que el mayor tesoro es el amor familiar.

Ligeramente descentrados con brújulas de cartón, el papá, expresión decidida, liderando la marcha con paso firme. Junto a él, la mamá, expresión observadora, encontrando pistas que nadie más ha visto. Sus hijos, felices, saltando entre rocas buscando joyas escondidas.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_11_xa$,
  background_details = $r9860_11_xb$Jungla o bosque mágico con mapas, mochilas, cofres y piedras preciosas visibles.$r9860_11_xb$,
  magic_effects = $r9860_11_xc$Animales fantásticos pequeños se asoman tímidamente entre la vegetación. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$r9860_11_xc$,
  lighting_color = $r9860_11_xd$Luz dorada de día en el bosque con toques plateados de luna en la distancia. Atmósfera de descubrimiento y unión.$r9860_11_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_11_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_11_la_noche_de_las_historias_repetidas.webp$r9860_11_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_12_xn$Si El Jardín Fuera Un Circo Mágico$r9860_12_xn$,
  scene_visual = $r9860_12_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite espectáculo familiar y la alegría de una función de circo improvisada en el jardín.

Ligeramente descentrados en el jardín transformado, el papá, expresión de equilibrista, haciendo equilibrio listo para saltar. Junto a él, la mamá, expresión alegre, lanzando flores como confeti brillante. Sus hijos, felices, actuando como pequeños magos.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_12_xa$,
  background_details = $r9860_12_xb$Jardín convertido en pista de circo, arbustos disfrazados de payasos, columpios girando como trapecios.$r9860_12_xb$,
  magic_effects = $r9860_12_xc$Los gnomos del jardín aplauden suavemente la función con un brillo mágico sutil. La magia debe sentirse festiva y completamente integrada dentro de una fotografía realista.$r9860_12_xc$,
  lighting_color = $r9860_12_xd$Luz festiva y colorida de día de circo. Atmósfera festiva, colorida y llena de diversión.$r9860_12_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_12_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_12_el_puente_de_los_apellidos.webp$r9860_12_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_13_xn$Si Fuéramos Inventores Locos$r9860_13_xn$,
  scene_visual = $r9860_13_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ingenio familiar sin límites en un taller de invenciones.

Ligeramente descentrados en su taller, el papá, expresión inventiva, creando una máquina que todo repara. Junto a él, la mamá, expresión soñadora, diseñando alas de cartón para volar. Sus hijos, felices, inventando risas sin cesar.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_13_xa$,
  background_details = $r9860_13_xb$Taller mágico lleno de herramientas, planos, robots caseros, tuercas y engranajes.$r9860_13_xb$,
  magic_effects = $r9860_13_xc$Los engranajes giran con una chispa de emoción visible, como si el invento cobrara vida. La magia debe sentirse creativa y completamente integrada dentro de una fotografía realista.$r9860_13_xc$,
  lighting_color = $r9860_13_xd$Luz cálida de taller con destellos metálicos. Atmósfera de invención, imaginación y felicidad.$r9860_13_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_13_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_13_la_estacion_de_los_abrazos_largos.webp$r9860_13_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_14_xn$Si La Noche Fuera Un Cuento$r9860_14_xn$,
  scene_visual = $r9860_14_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite calidez nocturna y la magia del ritual familiar antes de dormir.

Ligeramente descentrados en la habitación nocturna, el papá, expresión de trovador, contando historias con voz animada. Junto a él, la mamá, expresión tierna, encendiendo estrellas proyectadas en el techo. Sus hijos, felices, atrapando sueños bajo las cobijas.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_14_xa$,
  background_details = $r9860_14_xb$Habitación de noche con luces suaves, estrellas proyectadas en el techo, peluches y pijamas.$r9860_14_xb$,
  magic_effects = $r9860_14_xc$Las sábanas parecen volar suavemente como capas de magos mientras los peluches bailan bajo cielos dorados. La magia debe sentirse tierna y completamente integrada dentro de una fotografía realista.$r9860_14_xc$,
  lighting_color = $r9860_14_xd$Luz suave nocturna con estrellas doradas proyectadas. Atmósfera mágica y cálida.$r9860_14_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_14_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_14_la_biblioteca_de_fotos_familiares.webp$r9860_14_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_15_xn$Si El Parque Fuera Un Reino Fantástico$r9860_15_xn$,
  scene_visual = $r9860_15_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite aventura real: el parque convertido en un reino donde la familia gobierna con felicidad.

Ligeramente descentrados en el parque-reino, el papá, expresión de caballero valiente, como caballero que nunca se rinde. Junto a él, la mamá, expresión sabia, como reina de flores y juegos. Sus hijos, felices, como príncipes de sueños eternos.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_15_xa$,
  background_details = $r9860_15_xb$Parque convertido en reino mágico, columpios como barcos, toboganes como montañas, árboles como castillos.$r9860_15_xb$,
  magic_effects = $r9860_15_xc$Los árboles con ramas extrañas parecen tener un brillo de castillo encantado. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$r9860_15_xc$,
  lighting_color = $r9860_15_xd$Luz brillante de día soleado en el parque-reino. Atmósfera fantástica y alegre.$r9860_15_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_15_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_15_el_taller_de_arreglarlo_juntos.webp$r9860_15_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_16_xn$Si El Baño Fuera Un Spa$r9860_16_xn$,
  scene_visual = $r9860_16_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite diversión acuática con la familia convertida en criaturas marinas.

Ligeramente descentrados entre burbujas, el papá, expresión juguetona, como tritón nadando con gran entusiasmo. Junto a él, la mamá, expresión alegre, peinando cabellos con conchas brillantes. Sus hijos, felices, chapoteando como sirenas.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_16_xa$,
  background_details = $r9860_16_xb$Baño transformado en spa marino, burbujas, conchas y juguetes de mar, toallas como capas.$r9860_16_xb$,
  magic_effects = $r9860_16_xc$El agua baila reflejando mil colores como si tuviera vida propia. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$r9860_16_xc$,
  lighting_color = $r9860_16_xd$Luz azul brillante llena de reflejos de agua. Atmósfera alegre y llena de luz marina.$r9860_16_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_16_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_16_la_terraza_de_los_domingos.webp$r9860_16_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_17_xn$Si La Casa Fuera Una Nave Espacial$r9860_17_xn$,
  scene_visual = $r9860_17_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite exploración espacial familiar rumbo a un mundo mejor.

Ligeramente descentrados en la nave-casa, el papá, expresión de piloto seguro, pilotando rumbo a un nuevo color. Junto a él, la mamá, expresión estudiosa, estudiando estrellas y planetas lejanos. Sus hijos, felices, saludando marcianos con las manos.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_17_xa$,
  background_details = $r9860_17_xb$Casa convertida en nave espacial, ventanas con vistas a planetas, controles futuristas, juguetes flotando.$r9860_17_xb$,
  magic_effects = $r9860_17_xc$Las ventanas se llenan de galaxias brillantes que parecen respirar suavemente. La magia debe sentirse futurista y completamente integrada dentro de una fotografía realista.$r9860_17_xc$,
  lighting_color = $r9860_17_xd$Luz futurista azul y violeta de las galaxias. Atmósfera futurista y alegre.$r9860_17_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_17_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_17_el_viaje_donde_cabemos_todos.webp$r9860_17_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_18_xn$Si La Cocina Fuera Una Pastelería Mágica$r9860_18_xn$,
  scene_visual = $r9860_18_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite dulzura familiar en una pastelería llena de magia y aroma a hogar.

Ligeramente descentrados en la pastelería, el papá, expresión de panadero orgulloso, amasando pan con destreza. Junto a él, la mamá, expresión creativa, decorando pasteles con azúcar brillante. Sus hijos, felices, robando chispas de colores con las manos.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_18_xa$,
  background_details = $r9860_18_xb$Cocina transformada en pastelería, mesas llenas de pasteles, harina en el aire, gorros de chef.$r9860_18_xb$,
  magic_effects = $r9860_18_xc$El aroma dulce se representa con líneas onduladas brillantes flotando sobre los pasteles. La magia debe sentirse deliciosa y completamente integrada dentro de una fotografía realista.$r9860_18_xc$,
  lighting_color = $r9860_18_xd$Luz cálida de pastelería con destellos dorados de azúcar. Atmósfera cálida y deliciosa.$r9860_18_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_18_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_18_la_luz_que_prende_cada_regreso.webp$r9860_18_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_19_xn$Si El Salón Fuera Una Pista$r9860_19_xn$,
  scene_visual = $r9860_19_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite energía festiva: toda la familia bailando junta hasta el amanecer.

Ligeramente descentrados en la pista improvisada, el papá, expresión de bailarín afinado, bailando salsa con paso seguro. Junto a él, la mamá, expresión radiante, girando como estrella brillante. Sus hijos, felices, inventando coreografías fascinantes.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_19_xa$,
  background_details = $r9860_19_xb$Salón convertido en pista de baile con luces de colores, bola disco, ropa divertida.$r9860_19_xb$,
  magic_effects = $r9860_19_xc$Las luces titilan al ritmo de la música como si bailaran también. La magia debe sentirse festiva y completamente integrada dentro de una fotografía realista.$r9860_19_xc$,
  lighting_color = $r9860_19_xd$Luces de colores festivas con efecto de bola disco. Atmósfera festiva y llena de energía.$r9860_19_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_19_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_19_el_album_de_lo_que_somos.webp$r9860_19_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9860_20_xn$Si La Familia Fuera Un Cuento Sin Final$r9860_20_xn$,
  scene_visual = $r9860_20_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite el cierre perfecto: la familia viviendo dentro de su propio cuento sin final.

Ligeramente descentrados junto a un libro gigante abierto y flotante, el papá, expresión cálida, escribiendo capítulos con gestos de abrazo. Junto a él, la mamá, expresión soñadora, ilustrando sueños con besos y canciones. Sus hijos, felices, agregando aventuras y emociones al libro.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9860_20_xa$,
  background_details = $r9860_20_xb$Libro abierto gigante con ilustraciones de la familia viviendo aventuras, páginas flotantes con detalles mágicos.$r9860_20_xb$,
  magic_effects = $r9860_20_xc$Las páginas del libro se llenan de magia y calor con un brillo dorado suave. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$r9860_20_xc$,
  lighting_color = $r9860_20_xd$Luz cálida de ensueño envolviendo el libro flotante. Atmósfera cálida, mágica y de cierre emotivo.
$r9860_20_xd$,
  updated_at = now()
WHERE template_preview_key = $r9860_20_xk$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_20_la_familia_que_siempre_encuentra_camino.webp$r9860_20_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_1_xn$Piratas del Tesoro Escondido$r9857_1_xn$,
  scene_visual = $r9857_1_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite aventura, complicidad y la emoción de una búsqueda de tesoro compartida entre los niños y su mejor amigo peludo.

Sujetos Principales
Ligeramente descentrados y cruzando naturalmente el pliegue, los niños, con expresión emocionada y aventurera, vestidos de piratas con sombreros tricornio negros con calavera blanca, pañuelos rojos y camisas a rayas, sostienen juntos un catalejo de bronce y un mapa del tesoro enrollado. Entre ellos, {NOMBRE_DESTINATARIO}, con pelaje detallado y expresión alerta y juguetona, lleva un pequeño sombrero pirata y pañuelo rojo al cuello, una pata apoyada sobre un cofre del tesoro abierto rebosante de monedas de oro y joyas.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_1_xa$,
  background_details = $r9857_1_xb$Playa tropical de arena dorada, palmeras, océano turquesa con olas suaves, cielo con nubes esponjosas, y un barco pirata de madera visible en el horizonte con velas desplegadas.$r9857_1_xb$,
  magic_effects = $r9857_1_xc$Destellos dorados brillan sobre las monedas y joyas del cofre, y pequeñas motas de luz flotan suavemente sobre la arena. La magia debe sentirse sutil, elegante y completamente integrada dentro de una fotografía realista.$r9857_1_xc$,
  lighting_color = $r9857_1_xd$Iluminación cálida de atardecer dorado, con reflejos ámbar sobre el agua y la arena. Predominan tonos dorados, naranjas y turquesas. Atmósfera de aventura mágica y emocionante.$r9857_1_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_1_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_01_el_explorador_de_senderos_secretos.webp$r9857_1_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_2_xn$Superhéroes al Rescate$r9857_2_xn$,
  scene_visual = $r9857_2_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite heroísmo, unión familiar y la fantasía infantil de salvar el mundo en equipo.

Sujetos Principales
Ligeramente descentrados, los niños, con expresión heroica y valiente, con trajes de superhéroe de colores distintos y capas ondeando al viento, puños levantados hacia el cielo en pose de vuelo, tomados de la mano en señal de equipo. Al frente del grupo, {NOMBRE_DESTINATARIO}, con pelaje agitado por el viento, lleva una capa pequeña dorada atada al cuello y un antifaz ajustado a su carita, símbolo de rayo brillante en el pecho.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_2_xa$,
  background_details = $r9857_2_xb$Ciudad moderna estilizada al atardecer, edificios altos con ventanas iluminadas, cielo dramático con nubes rosas y púrpuras, rayos de luz dorada atravesando las nubes.$r9857_2_xb$,
  magic_effects = $r9857_2_xc$Un aura de luz brillante rodea al grupo, con partículas doradas flotando y una señal luminosa en el cielo con forma de huella de pata. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9857_2_xc$,
  lighting_color = $r9857_2_xd$Iluminación cinematográfica dramática de atardecer urbano. Predominan tonos rojo, azul eléctrico y dorado. Atmósfera épica y poderosa.$r9857_2_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_2_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_02_el_capitan_de_las_tardes_de_playa.webp$r9857_2_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_3_xn$Astronautas en el Espacio$r9857_3_xn$,
  scene_visual = $r9857_3_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro, exploración y la magia de descubrir el universo en compañía.

Sujetos Principales
Ligeramente descentrados, flotando en gravedad cero, los niños, con expresión maravillada visible a través de sus visores transparentes, con trajes espaciales blancos con detalles de colores y mochilas propulsoras con llamas azules, sosteniendo juntos una bandera pequeña con huella de pata. Flotando entre ellos, {NOMBRE_DESTINATARIO}, con pelaje visible a través de un traje espacial transparente especial, casco esférico transparente mostrando su carita completa, pequeña mochila propulsora y cola flotando libremente.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_3_xa$,
  background_details = $r9857_3_xb$Espacio profundo con estrellas brillantes, nebulosas en tonos rosa y turquesa, planetas visibles (Saturno con anillos dorados, Marte rojizo) y una luna grande y brillante.$r9857_3_xb$,
  magic_effects = $r9857_3_xc$Estelas de polvo estelar se desplazan lentamente y reflejos de luz cósmica brillan sobre los cascos. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$r9857_3_xc$,
  lighting_color = $r9857_3_xd$Iluminación espacial dramática con contrastes fuertes y reflejos plateados en los cascos. Predominan tonos azul marino, púrpura cósmico y dorado estelar. Atmósfera de exploración y asombro.$r9857_3_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_3_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_03_el_detective_de_huellas_felices.webp$r9857_3_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_4_xn$Caballeros del Reino Mágico$r9857_4_xn$,
  scene_visual = $r9857_4_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite nobleza, valentía infantil y la fantasía de defender un reino mágico junto a un fiel compañero.

Sujetos Principales
Ligeramente descentrados sobre el césped del castillo, los niños, con expresión valiente y orgullosa, con túnicas de colores distintos y capas, coronas de cartón doradas y plateadas, sosteniendo juntos una espada deielo y un escudo redondo pintado con un dragón amigable. Frente a ellos, {NOMBRE_DESTINATARIO}, con pelaje brillante, lleva una capa pequeña de terciopelo rojo y una corona diminuta de cartón entre las orejas, collar con medallón dorado en forma de escudo.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_4_xa$,
  background_details = $r9857_4_xb$Castillo de piedra gris con torres altas y banderas ondeando, jardín con césped verde brillante y flores silvestres coloridas, montañas verdes en la distancia.$r9857_4_xb$,
  magic_effects = $r9857_4_xc$Un dragón pequeño y amigable vuela en el cielo con escamas verdes brillantes, y flores mágicas destellan suavemente en el jardín. La magia debe sentirse elegante y completamente integrada dentro de una fotografía realista.$r9857_4_xc$,
  lighting_color = $r9857_4_xd$Iluminación de día soleado mágico, con sombras suaves. Predominan tonos dorados, verdes intensos y azul real. Atmósfera de cuento de hadas medieval.$r9857_4_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_4_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_04_el_guardian_del_campamento.webp$r9857_4_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_5_xn$Detectives del Misterio$r9857_5_xn$,
  scene_visual = $r9857_5_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite curiosidad, complicidad y la emoción de resolver un misterio en equipo.

Sujetos Principales
Ligeramente descentrados sobre la acera, los niños, con expresión concentrada y de descubrimiento, con gabardinas de detective en tonos beige y gris, sombreros y gorras a juego, sosteniendo juntos una lupa grande de mango de madera y una libreta de notas abierta. Agachado olfateando el suelo, {NOMBRE_DESTINATARIO}, con pelaje detallado, lleva un pequeño sombrero detective y bufanda a cuadros, nariz pegada al suelo siguiendo huellas invisibles.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_5_xa$,
  background_details = $r9857_5_xb$Vecindario suburbano al atardecer, casas con jardines, faroles vintage encendidos con luz cálida, árboles con hojas en tonos naranjas.$r9857_5_xb$,
  magic_effects = $r9857_5_xc$Huellas de pata marcadas en el suelo con un suave brillo dorado alrededor, como pistas iluminadas. La magia debe sentirse sutil y completamente integrada dentro de una fotografía realista.$r9857_5_xc$,
  lighting_color = $r9857_5_xd$Iluminación de atardecer cálido con tonos dorados y sombras suaves. Predominan ámbar, naranja y marrón cálido. Atmósfera de misterio intrigante pero amigable.$r9857_5_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_5_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_05_la_ruta_que_elegimos_juntos.webp$r9857_5_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_6_xn$Científicos Locos$r9857_6_xn$,
  scene_visual = $r9857_6_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite diversión, curiosidad científica y el caos alegre de experimentar en equipo.

Sujetos Principales
Ligeramente descentrados frente a la mesa de laboratorio, los niños, con expresión traviesa y de asombro, con batas blancas manchadas de colores y gafas de seguridad, sosteniendo juntos un tubo de ensayo con líquido verde burbujeante y un matraz con líquido morado. Sobre la mesa, {NOMBRE_DESTINATARIO}, con pelaje detallado, lleva pequeñas gafas de seguridad y una bata de laboratorio miniatura, una pata apoyada sobre un frasco con líquido azul brillante.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_6_xa$,
  background_details = $r9857_6_xb$Laboratorio colorido con estantes de frascos brillantes en tonos neón, tubos de ensayo en gradillas, pizarra blanca con fórmulas dibujadas con marcadores de colores.$r9857_6_xb$,
  magic_effects = $r9857_6_xc$Burbujas de colores flotan por todo el laboratorio y humo de colores sale de los frascos con chispas doradas. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$r9857_6_xc$,
  lighting_color = $r9857_6_xd$Iluminación brillante de laboratorio con reflejos en el vidrio. Predominan tonos neón: verde, rosa y azul eléctrico. Atmósfera de caos científico divertido.$r9857_6_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_6_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_06_tres_huellas_en_la_ciudad.webp$r9857_6_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_7_xn$Ninjas Secretos$r9857_7_xn$,
  scene_visual = $r9857_7_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite agilidad, sigilo y la complicidad de una misión secreta compartida.

Sujetos Principales
Ligeramente descentrados en poses de acción, los niños, con expresión concentrada y ágil, con trajes ninja negros con detalles de colores, máscaras cubriendo nariz y boca, bandas en la frente con huella de pata, sosteniendo juntos una estrella ninja de goma en pose de lanzamiento y capas ondeando en pose de salto. Agachado en posición de ataque, {NOMBRE_DESTINATARIO}, con pelaje detallado, lleva una pequeña máscara ninja, banda negra con símbolo dorado y capa miniatura.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_7_xa$,
  background_details = $r9857_7_xb$Bosque de bambú japonés al atardecer, tallos verdes altos y densos, niebla ligera flotando, templo japonés visible en la distancia con techo curvo rojo.$r9857_7_xb$,
  magic_effects = $r9857_7_xc$Humo ninja blanco se dispersa suavemente en el suelo y hojas de bambú caen en movimiento lento. La magia debe sentirse sigilosa y completamente integrada dentro de una fotografía realista.$r9857_7_xc$,
  lighting_color = $r9857_7_xd$Iluminación de atardecer con rayos de luz atravesando el bambú y sombras largas. Predominan tonos verdes naturales con acentos naranjas y rojos. Atmósfera misteriosa y sigilosa.$r9857_7_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_7_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_07_el_mapa_de_los_domingos.webp$r9857_7_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_8_xn$Magos y Hechiceros$r9857_8_xn$,
  scene_visual = $r9857_8_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro místico y la fantasía de hacer magia real en compañía de un fiel familiar peludo.

Sujetos Principales
Ligeramente descentrados sobre la alfombra persa, los niños, con expresión mística y encantada, con túnicas de colores distintos con estrellas y símbolos dorados, sombreros puntiagudos, sosteniendo juntos una varita mágica que emite chispas doradas y un libro de hechizos abierto con runas doradas flotando. Sentado frente a ellos, {NOMBRE_DESTINATARIO}, con pelaje con brillo mágico, lleva un sombrero de mago miniatura morado, capa pequeña estrellada y collar con colgante de cristal brillante.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_8_xa$,
  background_details = $r9857_8_xb$Torre de mago con paredes de piedra antigua, estantes con libros de lomos coloridos, frascos de pociones brillantes, velas flotantes encendidas, caldero humeante.$r9857_8_xb$,
  magic_effects = $r9857_8_xc$Partículas doradas y plateadas flotan por todo el espacio, y humo místico azul y morado sale del caldero. La magia debe sentirse profunda y completamente integrada dentro de una fotografía realista.$r9857_8_xc$,
  lighting_color = $r9857_8_xd$Iluminación mística con tonos dorados y azules, sombras suaves. Predominan púrpura profundo, azul medianoche y dorado brillante. Atmósfera encantada y misteriosa.$r9857_8_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_8_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_08_el_copiloto_de_las_montanas.webp$r9857_8_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_9_xn$Mi Guardián Peludo$r9857_9_xn$,
  scene_visual = $r9857_9_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite seguridad, calma y la certeza reconfortante de tener un protector incondicional.

Sujetos Principales
Ligeramente descentrados en el sofá, los niños, con expresión tranquila y segura, sentados cómodamente con ropa casual, abrazando con ternura a {NOMBRE_DESTINATARIO}, con pelaje suave y detallado y expresión vigilante pero calmada, sentado en posición protectora junto a ellos, mirada alerta dirigida hacia la ventana, orejas ligeramente levantadas en atención.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_9_xa$,
  background_details = $r9857_9_xb$Sala de estar acogedora al atardecer, sofá beige suave, ventana grande mostrando jardín con luz naranja y rosa entrando, lámpara de pie encendida con luz dorada cálida.$r9857_9_xb$,
  magic_effects = $r9857_9_xc$La luz del atardecer entra creando un halo dorado suave alrededor de todos. La magia debe sentirse íntima y completamente integrada dentro de una fotografía realista.$r9857_9_xc$,
  lighting_color = $r9857_9_xd$Iluminación cálida de atardecer con tonos dorados y naranjas, sombras suaves. Atmósfera de seguridad y paz.$r9857_9_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_9_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_09_el_cafe_donde_siempre_volvemos.webp$r9857_9_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_10_xn$Abrazos Que Curan Todo$r9857_10_xn$,
  scene_visual = $r9857_10_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite amor incondicional y la certeza de que un abrazo peludo puede curar cualquier tristeza.

Sujetos Principales
Ligeramente descentrados, arrodillados sobre el césped, los niños, con expresión de felicidad pura, abrazan fuertemente a {NOMBRE_DESTINATARIO}, con pelaje suave y textura realista y expresión tranquila y amorosa, con los brazos rodeando su cuerpo, mejillas presionadas contra el pelaje, ojos cerrados en expresión de paz.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_10_xa$,
  background_details = $r9857_10_xb$Jardín exterior en día soleado, césped verde brillante, flores silvestres coloridas dispersas, árbol grande con hojas frondosas creando sombra parcial, mariposas volando.$r9857_10_xb$,
  magic_effects = $r9857_10_xc$Rayos de sol dorados atraviesan las hojas del árbol creando luz filtrada, y pétalos de flores flotan suavemente en el aire. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$r9857_10_xc$,
  lighting_color = $r9857_10_xd$Iluminación natural de día soleado con tonos dorados cálidos, sombras suaves. Atmósfera de amor incondicional y conexión profunda.$r9857_10_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_10_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_10_la_patrulla_de_las_luces.webp$r9857_10_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_11_xn$Secretos Entre Mejores Amigos$r9857_11_xn$,
  scene_visual = $r9857_11_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura, confianza y la complicidad íntima de un secreto compartido solo entre mejores amigos.

Sujetos Principales
Ligeramente descentrados, sentados en la alfombra, los niños, con expresión tierna y confidencial, inclinados hacia {NOMBRE_DESTINATARIO}, con pelaje suave y detallado y expresión atenta y comprensiva, con las manos cerca de sus orejas, en gesto de susurrarle un secreto, orejas de {NOMBRE_DESTINATARIO} levantadas hacia adelante en señal de atención total.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_11_xa$,
  background_details = $r9857_11_xb$Dormitorio infantil acogedor en tarde tranquila, paredes en tonos pastel suaves, estante con juguetes y libros, ventana con luz dorada de tarde entrando.$r9857_11_xb$,
  magic_effects = $r9857_11_xc$La luz dorada de la tarde envuelve suavemente a todos, creando una atmósfera de intimidad. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$r9857_11_xc$,
  lighting_color = $r9857_11_xd$Iluminación suave de tarde con tonos dorados y cálidos, sombras delicadas. Atmósfera de complicidad y amistad profunda.$r9857_11_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_11_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_11_el_buscador_de_tesoros_simples.webp$r9857_11_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_12_xn$Lágrimas Secadas Con Lamidas$r9857_12_xn$,
  scene_visual = $r9857_12_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo, empatía y la sanación silenciosa de un amor incondicional.

Sujetos Principales
Ligeramente descentrados en el sofá, los niños, con expresión pensativa que se transforma en alivio y ternura, sentados con las piernas recogidas, abrazando con cariño a {NOMBRE_DESTINATARIO}, con pelaje suave y detallado y expresión empática y amorosa, quien levanta la cabeza dando una lamida suave y juguetona, orejas ligeramente hacia atrás en señal de empatía, arrancándoles una sonrisa espontánea.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_12_xa$,
  background_details = $r9857_12_xb$Rincón acogedor de sala de estar en tarde nublada, sofá grande en tonos beige, ventana con gotas de lluvia ligera cayendo, luz tenue y suave entrando.$r9857_12_xb$,
  magic_effects = $r9857_12_xc$La luz de la lámpara cercana crea un halo cálido reconfortante alrededor de todos. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$r9857_12_xc$,
  lighting_color = $r9857_12_xd$Iluminación suave y tenue con tonos grises y dorados cálidos, sombras delicadas. Atmósfera de empatía y amor incondicional.$r9857_12_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_12_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_12_la_carrera_contra_el_viento.webp$r9857_12_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_13_xn$Cama Compartida$r9857_13_xn$,
  scene_visual = $r9857_13_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz nocturna y la certeza reconfortante de una compañía incondicional al dormir en familia.

Sujetos Principales
Ligeramente descentrados en la cama, los niños, con expresión de sueño tranquilo y pacífico, acostados con pijamas cómodos, uno abrazando suavemente a {NOMBRE_DESTINATARIO} y otro con la mano descansando sobre su pelaje. En el centro de la cama ocupando espacio, {NOMBRE_DESTINATARIO}, con pelaje esponjoso y expresión de sueño profundo y felicidad, acostado boca arriba entre ellos, patas extendidas cómicamente, boca ligeramente abierta con la lengua de lado.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_13_xa$,
  background_details = $r9857_13_xb$Dormitorio infantil en noche tranquila, cama grande con edredón mullido en tonos azules con estrellas, ventana mostrando noche estrellada con luna brillante, lámpara de noche encendida con luz cálida.$r9857_13_xb$,
  magic_effects = $r9857_13_xc$La luz de luna entra suavemente creando sombras plateadas delicadas sobre el edredón. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$r9857_13_xc$,
  lighting_color = $r9857_13_xd$Iluminación nocturna suave con luz de lámpara dorada y luz de luna plateada, sombras delicadas. Atmósfera de seguridad y amor familiar.$r9857_13_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_13_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_13_el_picnic_de_las_grandes_historias.webp$r9857_13_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_14_xn$Protector de Pesadillas$r9857_14_xn$,
  scene_visual = $r9857_14_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite vigilancia protectora y la paz nocturna de saber que alguien fiel cuida el sueño de los más pequeños.

Sujetos Principales
Ligeramente descentrados durmiendo profundamente en la cama, los niños, con expresión de sueño profundo y pacífico, acurrucados cómodamente. Al pie de la cama en posición de guardián, {NOMBRE_DESTINATARIO}, con pelaje con reflejos plateados de luna y expresión alerta pero calmada, sentado con la cabeza levantada mirando hacia la puerta, orejas levantadas en atención, ojos brillantes reflejando la luz de luna.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_14_xa$,
  background_details = $r9857_14_xb$Dormitorio infantil en noche profunda, edredón en tonos azul oscuro con estrellas, ventana mostrando luna llena grande iluminando la habitación con luz plateada.$r9857_14_xb$,
  magic_effects = $r9857_14_xc$Sombras suaves de formas abstractas en las paredes parecen alejarse de la presencia de {NOMBRE_DESTINATARIO}, y la luz de luna crea un halo protector plateado alrededor de él. La magia debe sentirse protectora y completamente integrada dentro de una fotografía realista.$r9857_14_xc$,
  lighting_color = $r9857_14_xd$Iluminación nocturna dramática con luz de luna plateada dominante y sombras suaves, contrastes entre luz y oscuridad. Atmósfera de vigilancia protectora.$r9857_14_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_14_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_14_el_faro_de_los_dias_largos.webp$r9857_14_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_15_xn$El Primer Encuentro$r9857_15_xn$,
  scene_visual = $r9857_15_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro puro y la emoción imborrable de un primer encuentro que cambia la vida de una familia entera.

Sujetos Principales
Ligeramente descentrados en el piso de la sala, los niños, con expresión de asombro y felicidad extrema, arrodillados con los brazos extendidos en gesto de bienvenida, manos juntas en gesto de emoción contenida, ojos muy abiertos de sorpresa. Acercándose tímidamente, {NOMBRE_DESTINATARIO} cachorro, con pelaje de versión más joven y pequeña y expresión curiosa y ligeramente tímida, caminando hacia ellos, orejas levantadas en curiosidad, cola moviéndose suavemente.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_15_xa$,
  background_details = $r9857_15_xb$Sala de estar familiar en día soleado, paredes en tonos cálidos beige, ventana grande con luz natural brillante entrando, plantas de interior, cuadros familiares en las paredes.$r9857_15_xb$,
  magic_effects = $r9857_15_xc$La luz solar crea una atmósfera mágica y cálida alrededor del momento, con motas doradas suspendidas en el aire. La magia debe sentirse pura y completamente integrada dentro de una fotografía realista.$r9857_15_xc$,
  lighting_color = $r9857_15_xd$Iluminación natural brillante de día soleado con tonos dorados cálidos, sombras suaves. Atmósfera de alegría pura y amor a primera vista.$r9857_15_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_15_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_15_el_guardian_de_la_biblioteca.webp$r9857_15_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_16_xn$Escondidas Imposibles$r9857_16_xn$,
  scene_visual = $r9857_16_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite diversión familiar y la comicidad de un escondite que nunca engaña a nadie.

Sujetos Principales
Ligeramente descentrados, buscando activamente, los niños, con expresión de diversión conteniendo la risa, uno con las manos cubriendo los ojos en gesto de contar y otro señalando con el dedo hacia donde está "escondido" {NOMBRE_DESTINATARIO}. Detrás de una cortina larga, {NOMBRE_DESTINATARIO}, con pelaje detallado y expresión de concentración intentando estar quieto, con SOLO LA COLA completamente visible moviéndose fuera de la cortina, momento cómico clave de la escena.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_16_xa$,
  background_details = $r9857_16_xb$Sala de estar familiar en tarde luminosa, sofá beige, cortinas largas hasta el suelo en colores claros, alfombra mullida, ventana mostrando jardín con luz natural.$r9857_16_xb$,
  magic_effects = $r9857_16_xc$Ninguno: escena puramente cómica y cotidiana, sin elementos mágicos añadidos.$r9857_16_xc$,
  lighting_color = $r9857_16_xd$Iluminación natural brillante de tarde con tonos cálidos, sombras suaves. Atmósfera de diversión familiar y risa.$r9857_16_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_16_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_16_la_brujula_de_los_dias_nuevos.webp$r9857_16_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_17_xn$Persecución en el Jardín$r9857_17_xn$,
  scene_visual = $r9857_17_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite energía pura y el caos alegre de una persecución compartida bajo el sol.

Sujetos Principales
Ligeramente descentrados en plena carrera, los niños, con expresión de risa descontrolada y esfuerzo, corriendo a toda velocidad con el cabello despeinado por el movimiento. En plena persecución, {NOMBRE_DESTINATARIO}, con pelaje con movimiento visible y expresión de emoción intensa, con las cuatro patas capturadas en movimiento, orejas volando hacia atrás, lengua fuera con expresión de felicidad extrema.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_17_xa$,
  background_details = $r9857_17_xb$Jardín amplio y vibrante en día soleado, césped verde brillante, flores coloridas en macizos, árboles frondosos, cielo azul intenso con nubes esponjosas.$r9857_17_xb$,
  magic_effects = $r9857_17_xc$Ninguno: escena de energía pura y movimiento real, sin elementos mágicos añadidos.$r9857_17_xc$,
  lighting_color = $r9857_17_xd$Iluminación brillante de día soleado con tonos dorados, sombras dinámicas. Atmósfera de energía pura y diversión descontrolada.$r9857_17_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_17_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_17_el_taller_de_trucos_imposibles.webp$r9857_17_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_18_xn$Clase de Trucos Fallidos$r9857_18_xn$,
  scene_visual = $r9857_18_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite humor tierno y la aceptación alegre de que el amor no necesita trucos perfectos.

Sujetos Principales
Ligeramente descentrados en posición de entrenadores, los niños, con expresión de concentración con frustración cómica, con una mano extendida en gesto de comando y otra sosteniendo un premio, dando comandos exagerados. Haciendo todo menos lo pedido, {NOMBRE_DESTINATARIO}, con pelaje detallado y expresión de confusión adorable, acostado boca arriba cuando debería estar sentado, cabeza ladeada sin entender, claramente feliz de participar aunque no obedezca.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_18_xa$,
  background_details = $r9857_18_xb$Patio trasero en tarde luminosa, piso de césped corto, espacio despejado para entrenamiento, luz natural brillante.$r9857_18_xb$,
  magic_effects = $r9857_18_xc$Ninguno: escena puramente cómica y cotidiana, sin elementos mágicos añadidos.$r9857_18_xc$,
  lighting_color = $r9857_18_xd$Iluminación natural brillante con tonos cálidos, sombras suaves. Atmósfera de diversión y fracaso adorable.$r9857_18_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_18_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_18_la_noche_de_cine_bajo_estrellas.webp$r9857_18_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_19_xn$Aventureros de Dinosaurios$r9857_19_xn$,
  scene_visual = $r9857_19_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite descubrimiento épico y la emoción de explorar un pasado prehistórico lleno de maravillas.

Sujetos Principales
Ligeramente descentrados explorando, los niños, con expresión de asombro aventurero y maravilla, vistiendo chalecos caqui de explorador y sombreros, sosteniendo juntos un pincel para fósiles y una lupa grande examinando el terreno. Explorando con ellos, {NOMBRE_DESTINATARIO}, con pelaje detallado y expresión curiosa y alerta, con pequeño sombrero de explorador y pañuelo al cuello, olfateando un huevo de dinosaurio gigante parcialmente enterrado.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_19_xa$,
  background_details = $r9857_19_xb$Paisaje prehistórico vibrante, selva tropical con helechos gigantes, volcán humeante en la distancia, dinosaurios amigables de colores vivos en el fondo (T-Rex sonriente, Triceratops).$r9857_19_xb$,
  magic_effects = $r9857_19_xc$El huevo de dinosaurio agrietado deja asomar un bebé dinosaurio amigable de ojos grandes y tiernos. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$r9857_19_xc$,
  lighting_color = $r9857_19_xd$Iluminación de atardecer prehistórico con tonos cálidos naranjas y dorados, sombras dramáticas. Atmósfera de aventura épica y descubrimiento.$r9857_19_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_19_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_19_el_jardin_de_las_huellas_brillantes.webp$r9857_19_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9857_20_xn$Día de Playa Perfecto$r9857_20_xn$,
  scene_visual = $r9857_20_xa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría veraniega y la felicidad plena de un día de playa vivido en familia.

Sujetos Principales
Ligeramente descentrados en la orilla, los niños, con expresión de felicidad pura y descubrimiento emocionado, construyendo juntos un castillo de arena con pala y cubo de colores, sosteniendo una concha marina grande recién encontrada. Corriendo por la orilla completamente mojado, {NOMBRE_DESTINATARIO}, con pelaje empapado pegado al cuerpo, gotas de agua cayendo, expresión de felicidad extrema, con las patas salpicando agua, lengua fuera, orejas mojadas volando por el movimiento.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9857_20_xa$,
  background_details = $r9857_20_xb$Playa tropical paradisíaca en día soleado, arena dorada fina, océano turquesa cristalino con olas suaves, palmeras inclinadas, gaviotas volando en el cielo.$r9857_20_xb$,
  magic_effects = $r9857_20_xc$Destellos del sol se reflejan brillantes sobre el agua creando pequeños puntos de luz dorada. La magia debe sentirse luminosa y completamente integrada dentro de una fotografía realista.$r9857_20_xc$,
  lighting_color = $r9857_20_xd$Iluminación brillante de día soleado con tonos dorados cálidos, reflejos del sol en el agua. Atmósfera de vacaciones perfectas y diversión veraniega.
$r9857_20_xd$,
  updated_at = now()
WHERE template_preview_key = $r9857_20_xk$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_20_aventuras_que_siempre_vuelven.webp$r9857_20_xk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_1_fn$Memoria Familiar Hermana Porque somos el Mejor Equipo$r9868_1_fn$,
  scene_visual = $r9868_1_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad pura y la certeza de haber sido el mejor equipo del mundo.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos, vestidos con ropa casual aventurera en tonos azul y naranja, saltando dinámicamente en el aire al mismo tiempo, chocando los cinco con expresiones de extrema diversión. Sobre ellos flota una estrella dorada gigante brillante que acaban de alcanzar.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_1_fa$,
  background_details = $r9868_1_fb$Paisaje fantástico con colinas onduladas y pequeñas islas de piedra flotando en el aire. Luz de día soleado, vibrante y saturada.$r9868_1_fb$,
  magic_effects = $r9868_1_fc$Destellos dorados cayendo de la estrella central. Partículas de luz muy sutiles en el aire. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$r9868_1_fc$,
  lighting_color = $r9868_1_fd$Luz de día soleado y saturada, con azules vibrantes, naranjas cálidos y el destello dorado de la estrella.$r9868_1_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_1_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_21_el_equipo_que_sigue_conmigo_hermana.webp$r9868_1_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_1_mn$Memoria Familiar Hermano Porque somos el Mejor Equipo$r9868_1_mn$,
  scene_visual = $r9868_1_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad pura y la certeza de haber sido el mejor equipo del mundo.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos, vestidos con ropa casual aventurera en tonos azul y naranja, saltando dinámicamente en el aire al mismo tiempo, chocando los cinco con expresiones de extrema diversión. Sobre ellos flota una estrella dorada gigante brillante que acaban de alcanzar.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_1_ma$,
  background_details = $r9868_1_mb$Paisaje fantástico con colinas onduladas y pequeñas islas de piedra flotando en el aire. Luz de día soleado, vibrante y saturada.$r9868_1_mb$,
  magic_effects = $r9868_1_mc$Destellos dorados cayendo de la estrella central. Partículas de luz muy sutiles en el aire. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$r9868_1_mc$,
  lighting_color = $r9868_1_md$Luz de día soleado y saturada, con azules vibrantes, naranjas cálidos y el destello dorado de la estrella.$r9868_1_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_1_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_01_el_equipo_que_sigue_conmigo_hermano.webp$r9868_1_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_2_fn$Memoria Familiar Hermana Porque somos Cómplices de Travesuras$r9868_2_fn$,
  scene_visual = $r9868_2_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad pícara y la magia entrañable de las travesuras compartidas.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos, vestidos con capas ligeras de exploradores mágicos. Están agachados detrás de una gran estantería de madera tallada, sosteniendo juntos un pergamino antiguo desplegado que brilla con tinta mágica dorada. Todos sostienen pequeñas varitas de madera y se miran con una sonrisa pícara y cómplice, riendo en silencio por una travesura.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_2_fa$,
  background_details = $r9868_2_fb$Una acogedora biblioteca familiar repleta de libros antiguos, con una escalera de madera y luz cálida de lámparas de mesa.$r9868_2_fb$,
  magic_effects = $r9868_2_fc$Huellas brillantes moviéndose por el papel del mapa. Pequeñas chispas doradas saltando de las varitas. La magia debe sentirse traviesa y completamente integrada dentro de una fotografía realista.$r9868_2_fc$,
  lighting_color = $r9868_2_fd$Marrones cálidos de madera, dorado suave y el brillo cálido del mapa mágico.$r9868_2_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_2_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_22_la_ruta_de_nuestras_bromas_hermana.webp$r9868_2_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_2_mn$Memoria Familiar Hermano Porque somos Cómplices de Travesuras$r9868_2_mn$,
  scene_visual = $r9868_2_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad pícara y la magia entrañable de las travesuras compartidas.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos, vestidos con capas ligeras de exploradores mágicos. Están agachados detrás de una gran estantería de madera tallada, sosteniendo juntos un pergamino antiguo desplegado que brilla con tinta mágica dorada. Todos sostienen pequeñas varitas de madera y se miran con una sonrisa pícara y cómplice, riendo en silencio por una travesura.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_2_ma$,
  background_details = $r9868_2_mb$Una acogedora biblioteca familiar repleta de libros antiguos, con una escalera de madera y luz cálida de lámparas de mesa.$r9868_2_mb$,
  magic_effects = $r9868_2_mc$Huellas brillantes moviéndose por el papel del mapa. Pequeñas chispas doradas saltando de las varitas. La magia debe sentirse traviesa y completamente integrada dentro de una fotografía realista.$r9868_2_mc$,
  lighting_color = $r9868_2_md$Marrones cálidos de madera, dorado suave y el brillo cálido del mapa mágico.$r9868_2_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_2_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_02_la_ruta_de_nuestras_bromas_hermano.webp$r9868_2_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_3_fn$Memoria Familiar Hermana Porque nuestras Locuras Tienen Sentido$r9868_3_fn$,
  scene_visual = $r9868_3_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ingenio compartido y la certeza de que juntos podían construir cualquier locura.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos en el patio trasero de una casa. {NOMBRE_DESTINATARIO} sostiene un plano azul holográfico brillante en el aire con actitud de inventor genial. Tus hermanos están a su lado sosteniendo herramientas, todos admirando una gigantesca e imposible montaña rusa futurista que acaban de construir, elevándose hacia las nubes.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_3_fa$,
  background_details = $r9868_3_fb$Patio trasero verde con valla de madera bajo un cielo azul vibrante de verano. Estructura con detalles metálicos brillantes.$r9868_3_fb$,
  magic_effects = $r9868_3_fc$El plano es transparente y emite luz propia. Chispas sutiles cayendo de la estructura. La magia debe sentirse inventiva y completamente integrada dentro de una fotografía realista.$r9868_3_fc$,
  lighting_color = $r9868_3_fd$Verde hierba, azul cielo, plata metálica y neón cian del plano.$r9868_3_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_3_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_23_el_refugio_de_nuestras_locuras_hermana.webp$r9868_3_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_3_mn$Memoria Familiar Hermano Porque nuestras Locuras Tienen Sentido$r9868_3_mn$,
  scene_visual = $r9868_3_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ingenio compartido y la certeza de que juntos podían construir cualquier locura.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos en el patio trasero de una casa. {NOMBRE_DESTINATARIO} sostiene un plano azul holográfico brillante en el aire con actitud de inventor genial. Tus hermanos están a su lado sosteniendo herramientas, todos admirando una gigantesca e imposible montaña rusa futurista que acaban de construir, elevándose hacia las nubes.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_3_ma$,
  background_details = $r9868_3_mb$Patio trasero verde con valla de madera bajo un cielo azul vibrante de verano. Estructura con detalles metálicos brillantes.$r9868_3_mb$,
  magic_effects = $r9868_3_mc$El plano es transparente y emite luz propia. Chispas sutiles cayendo de la estructura. La magia debe sentirse inventiva y completamente integrada dentro de una fotografía realista.$r9868_3_mc$,
  lighting_color = $r9868_3_md$Verde hierba, azul cielo, plata metálica y neón cian del plano.$r9868_3_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_3_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_03_el_refugio_de_nuestras_locuras_hermano.webp$r9868_3_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_4_fn$Memoria Familiar Hermana Porque resolvemos Todos los Misterios$r9868_4_fn$,
  scene_visual = $r9868_4_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite astucia compartida y la certeza de que ningún misterio se les resistía juntos.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos, vestidos como elegantes detectives (gabardinas largas, bufandas a cuadros). Agachados en una calle empedrada; {NOMBRE_DESTINATARIO} examina el suelo con una gran lupa de borde dorado, mientras tus hermanos alumbran la zona con una linterna antigua. En el suelo hay huellas brillantes y mágicas.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_4_fa$,
  background_details = $r9868_4_fb$Calle adoquinada antigua cubierta por espesa niebla. Faroles de gas emitiendo luz amarilla cálida.$r9868_4_fb$,
  magic_effects = $r9868_4_fc$Las huellas en el suelo brillan como polvo de estrellas. El cristal de la lupa atrapa y magnifica esa luz. La magia debe sentirse misteriosa y completamente integrada dentro de una fotografía realista.$r9868_4_fc$,
  lighting_color = $r9868_4_fd$Grises azulados, amarillos cálidos y dorado brillante de las huellas.$r9868_4_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_4_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_24_la_promesa_de_seguir_jugando_hermana.webp$r9868_4_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_4_mn$Memoria Familiar Hermano Porque resolvemos Todos los Misterios$r9868_4_mn$,
  scene_visual = $r9868_4_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite astucia compartida y la certeza de que ningún misterio se les resistía juntos.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos, vestidos como elegantes detectives (gabardinas largas, bufandas a cuadros). Agachados en una calle empedrada; {NOMBRE_DESTINATARIO} examina el suelo con una gran lupa de borde dorado, mientras tus hermanos alumbran la zona con una linterna antigua. En el suelo hay huellas brillantes y mágicas.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_4_ma$,
  background_details = $r9868_4_mb$Calle adoquinada antigua cubierta por espesa niebla. Faroles de gas emitiendo luz amarilla cálida.$r9868_4_mb$,
  magic_effects = $r9868_4_mc$Las huellas en el suelo brillan como polvo de estrellas. El cristal de la lupa atrapa y magnifica esa luz. La magia debe sentirse misteriosa y completamente integrada dentro de una fotografía realista.$r9868_4_mc$,
  lighting_color = $r9868_4_md$Grises azulados, amarillos cálidos y dorado brillante de las huellas.$r9868_4_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_4_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_04_la_promesa_de_seguir_jugando_hermano.webp$r9868_4_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_5_fn$Memoria Familiar Hermana Porque eres mi Compañera de Infinito$r9868_5_fn$,
  scene_visual = $r9868_5_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite pura libertad y la emoción de volar juntos más allá de todo límite.

Sujetos Principales
{NOMBRE_DESTINATARIO} viste un casco espacial retro transparente con luces y alas desplegadas. Tus hermanos llevan trajes de piloto retro con gafas de aviador. Todos están literalmente flotando sin gravedad en medio de una dormitorio, tomados de la mano y apuntando hacia adelante, con expresiones de emoción épica.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_5_fa$,
  background_details = $r9868_5_fb$Habitación de juegos transformándose en el espacio exterior. Las paredes se desvanecen mostrando un universo estrellado. Cajas de cartón parecen naves.$r9868_5_fb$,
  magic_effects = $r9868_5_fc$Estelas de propulsión luminosa saliendo de los trajes. Juguetes flotando sin gravedad. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9868_5_fc$,
  lighting_color = $r9868_5_fd$Púrpuras y azules espaciales, con colores cálidos de los trajes.$r9868_5_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_5_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_25_la_complicidad_que_no_se_rompe_hermana.webp$r9868_5_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_5_mn$Memoria Familiar Hermano Porque eres mi Compañero de Infinito$r9868_5_mn$,
  scene_visual = $r9868_5_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite pura libertad y la emoción de volar juntos más allá de todo límite.

Sujetos Principales
{NOMBRE_DESTINATARIO} viste un casco espacial retro transparente con luces y alas desplegadas. Tus hermanos llevan trajes de piloto retro con gafas de aviador. Todos están literalmente flotando sin gravedad en medio de una dormitorio, tomados de la mano y apuntando hacia adelante, con expresiones de emoción épica.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_5_ma$,
  background_details = $r9868_5_mb$Habitación de juegos transformándose en el espacio exterior. Las paredes se desvanecen mostrando un universo estrellado. Cajas de cartón parecen naves.$r9868_5_mb$,
  magic_effects = $r9868_5_mc$Estelas de propulsión luminosa saliendo de los trajes. Juguetes flotando sin gravedad. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9868_5_mc$,
  lighting_color = $r9868_5_md$Púrpuras y azules espaciales, con colores cálidos de los trajes.$r9868_5_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_5_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_05_la_complicidad_que_no_se_rompe_hermano.webp$r9868_5_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_6_fn$Memoria Familiar Hermana Porque eres mi Copiloto Eterno$r9868_6_fn$,
  scene_visual = $r9868_6_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite confianza absoluta y la adrenalina de surcar el espacio codo a codo.

Sujetos Principales
En la cabina de una nave espacial hiperrealista y detallada, {NOMBRE_DESTINATARIO} y tus hermanos están sentados juntos en los controles. Todos jalan juntos una gran palanca central para saltar al hiperespacio. Miran al frente con una sonrisa de confianza y adrenalina pura.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_6_fa$,
  background_details = $r9868_6_fb$Interior de la cabina iluminado por los botones del panel de control. A través de la ventana frontal, el espacio oscuro se deforma: las estrellas se están convirtiendo en largas líneas de luz brillante.$r9868_6_fb$,
  magic_effects = $r9868_6_fc$El efecto de túnel de luz estelar reflejándose en los rostros de todos. La magia debe sentirse vertiginosa y completamente integrada dentro de una fotografía realista.$r9868_6_fc$,
  lighting_color = $r9868_6_fd$Negros cósmicos, luces azules, cian y neón blanco de las estrellas.$r9868_6_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_6_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_26_el_mapa_de_nuestros_secretos_hermana.webp$r9868_6_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_6_mn$Memoria Familiar Hermano Porque eres mi Copiloto Eterno$r9868_6_mn$,
  scene_visual = $r9868_6_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite confianza absoluta y la adrenalina de surcar el espacio codo a codo.

Sujetos Principales
En la cabina de una nave espacial hiperrealista y detallada, {NOMBRE_DESTINATARIO} y tus hermanos están sentados juntos en los controles. Todos jalan juntos una gran palanca central para saltar al hiperespacio. Miran al frente con una sonrisa de confianza y adrenalina pura.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_6_ma$,
  background_details = $r9868_6_mb$Interior de la cabina iluminado por los botones del panel de control. A través de la ventana frontal, el espacio oscuro se deforma: las estrellas se están convirtiendo en largas líneas de luz brillante.$r9868_6_mb$,
  magic_effects = $r9868_6_mc$El efecto de túnel de luz estelar reflejándose en los rostros de todos. La magia debe sentirse vertiginosa y completamente integrada dentro de una fotografía realista.$r9868_6_mc$,
  lighting_color = $r9868_6_md$Negros cósmicos, luces azules, cian y neón blanco de las estrellas.$r9868_6_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_6_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_06_el_mapa_de_nuestros_secretos_hermano.webp$r9868_6_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_7_fn$Memoria Familiar Hermana Porque llegamos Hasta el Fin del Mundo$r9868_7_fn$,
  scene_visual = $r9868_7_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite lealtad absoluta y la fuerza inquebrantable de llegar juntos hasta el final.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos escalando una montaña épica y escarpada. Están exhaustos y sucios, vistiendo rústicas capas de viajero. {NOMBRE_DESTINATARIO} apoya firmemente a tus hermanos, dándoles la mano para subir el último gran escalón de piedra. Sus miradas muestran lealtad absoluta.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_7_fa$,
  background_details = $r9868_7_fb$Paisaje volcánico oscuro y dramático, pero en el horizonte se abre un cielo amaneciendo con una luz dorada pura y sanadora.$r9868_7_fb$,
  magic_effects = $r9868_7_fc$Un pequeño frasco en la mano de uno de ellos emite una luz estelar mágica que ilumina sus rostros en la oscuridad. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9868_7_fc$,
  lighting_color = $r9868_7_fd$Grises oscuros de la roca, naranjas ardientes y el destello dorado de la esperanza en el cielo.$r9868_7_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_7_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_27_la_tarde_donde_todavia_te_escucho_hermana.webp$r9868_7_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_7_mn$Memoria Familiar Hermano Porque llegamos Hasta el Fin del Mundo$r9868_7_mn$,
  scene_visual = $r9868_7_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite lealtad absoluta y la fuerza inquebrantable de llegar juntos hasta el final.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos escalando una montaña épica y escarpada. Están exhaustos y sucios, vistiendo rústicas capas de viajero. {NOMBRE_DESTINATARIO} apoya firmemente a tus hermanos, dándoles la mano para subir el último gran escalón de piedra. Sus miradas muestran lealtad absoluta.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_7_ma$,
  background_details = $r9868_7_mb$Paisaje volcánico oscuro y dramático, pero en el horizonte se abre un cielo amaneciendo con una luz dorada pura y sanadora.$r9868_7_mb$,
  magic_effects = $r9868_7_mc$Un pequeño frasco en la mano de uno de ellos emite una luz estelar mágica que ilumina sus rostros en la oscuridad. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9868_7_mc$,
  lighting_color = $r9868_7_md$Grises oscuros de la roca, naranjas ardientes y el destello dorado de la esperanza en el cielo.$r9868_7_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_7_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_07_la_tarde_donde_todavia_te_escucho_hermano.webp$r9868_7_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_8_fn$Memoria Familiar Hermana Porque viajamos en Nuestro Propio Tiempo$r9868_8_fn$,
  scene_visual = $r9868_8_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro científico y la certeza de que el tiempo se detenía a su lado.

Sujetos Principales
Frente a un auto deportivo retro plateado que está levitando a unos centímetros del suelo, {NOMBRE_DESTINATARIO}, con bata de científico o chaleco vintage, y tus hermanos están de pie frente al auto, mirando relojes de pulsera o sosteniendo un control remoto antiguo. Atrás del auto hay dos estelas de fuego brillante en el asfalto.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_8_fa$,
  background_details = $r9868_8_fb$El estacionamiento de un centro comercial retro por la noche. Atmósfera eléctrica, luces de neón ochentosas.$r9868_8_fb$,
  magic_effects = $r9868_8_fc$Relámpagos de energía temporal rodeando el contorno del auto flotante. Fuego mágico en las llantas. La magia debe sentirse futurista y completamente integrada dentro de una fotografía realista.$r9868_8_fc$,
  lighting_color = $r9868_8_fd$Asfalto oscuro, fuego naranja intenso, luces de neón azules y púrpuras, y destellos eléctricos blancos.$r9868_8_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_8_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_28_el_puente_de_nuestras_peleas_y_risas_hermana.webp$r9868_8_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_8_mn$Memoria Familiar Hermano Porque viajamos en Nuestro Propio Tiempo$r9868_8_mn$,
  scene_visual = $r9868_8_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro científico y la certeza de que el tiempo se detenía a su lado.

Sujetos Principales
Frente a un auto deportivo retro plateado que está levitando a unos centímetros del suelo, {NOMBRE_DESTINATARIO}, con bata de científico o chaleco vintage, y tus hermanos están de pie frente al auto, mirando relojes de pulsera o sosteniendo un control remoto antiguo. Atrás del auto hay dos estelas de fuego brillante en el asfalto.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_8_ma$,
  background_details = $r9868_8_mb$El estacionamiento de un centro comercial retro por la noche. Atmósfera eléctrica, luces de neón ochentosas.$r9868_8_mb$,
  magic_effects = $r9868_8_mc$Relámpagos de energía temporal rodeando el contorno del auto flotante. Fuego mágico en las llantas. La magia debe sentirse futurista y completamente integrada dentro de una fotografía realista.$r9868_8_mc$,
  lighting_color = $r9868_8_md$Asfalto oscuro, fuego naranja intenso, luces de neón azules y púrpuras, y destellos eléctricos blancos.$r9868_8_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_8_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_08_el_puente_de_nuestras_peleas_y_risas_hermano.webp$r9868_8_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_9_fn$Memoria Familiar Hermana Porque volamos a Nunca Jamás$r9868_9_fn$,
  scene_visual = $r9868_9_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite libertad absoluta y la magia de volar sin miedo alguno.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos, vestidos con ropa cómoda de dormir o ropa casual ligera, volando mágicamente sobre los tejados de una ciudad antigua. Están tomados de la mano, con expresiones de libertad, asombro y felicidad absoluta.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_9_fa$,
  background_details = $r9868_9_fb$Una ciudad antigua vista desde arriba en una noche despejada. Una luna llena gigantesca y brillante domina el cielo nocturno.$r9868_9_fb$,
  magic_effects = $r9868_9_fc$Estelas de polvo dorado brillante rodeando sus cuerpos y dejando un rastro en el aire mientras vuelan. La magia debe sentirse libre y completamente integrada dentro de una fotografía realista.$r9868_9_fc$,
  lighting_color = $r9868_9_fd$Azules medianoche profundos, plata lunar y el dorado resplandeciente del polvo mágico.$r9868_9_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_9_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_29_la_cancion_que_era_de_los_dos_hermana.webp$r9868_9_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_9_mn$Memoria Familiar Hermano Porque volamos a Nunca Jamás$r9868_9_mn$,
  scene_visual = $r9868_9_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite libertad absoluta y la magia de volar sin miedo alguno.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos, vestidos con ropa cómoda de dormir o ropa casual ligera, volando mágicamente sobre los tejados de una ciudad antigua. Están tomados de la mano, con expresiones de libertad, asombro y felicidad absoluta.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_9_ma$,
  background_details = $r9868_9_mb$Una ciudad antigua vista desde arriba en una noche despejada. Una luna llena gigantesca y brillante domina el cielo nocturno.$r9868_9_mb$,
  magic_effects = $r9868_9_mc$Estelas de polvo dorado brillante rodeando sus cuerpos y dejando un rastro en el aire mientras vuelan. La magia debe sentirse libre y completamente integrada dentro de una fotografía realista.$r9868_9_mc$,
  lighting_color = $r9868_9_md$Azules medianoche profundos, plata lunar y el dorado resplandeciente del polvo mágico.$r9868_9_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_9_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_09_la_cancion_que_era_de_los_dos_hermano.webp$r9868_9_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_10_fn$Memoria Familiar Hermana Porque nos Protegemos la Espalda$r9868_10_fn$,
  scene_visual = $r9868_10_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite vigilancia mutua y la certeza de que juntos nada podía dañarlos.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos, vestidos con trajes elegantes de aventureros nocturnos, capas cortas ondeando suavemente al viento, sin máscaras que oculten sus rostros. Están de pie juntos en la terraza de un edificio, mirando la ciudad iluminada, protegiéndose la espalda mutuamente con confianza.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_10_fa$,
  background_details = $r9868_10_fb$Una ciudad iluminada de noche, vista serena desde la altura. Nubes suaves iluminadas por la luna llena.$r9868_10_fb$,
  magic_effects = $r9868_10_fc$Las capas tienen un movimiento dramático casi sobrenatural en el viento. Iluminación cinematográfica heroica en sus rostros. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9868_10_fc$,
  lighting_color = $r9868_10_fd$Azul noche suave, dorado cálido de las luces de la ciudad y la luz plateada de la luna entre las nubes.$r9868_10_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_10_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_30_la_patrulla_de_infancia_eterna_hermana.webp$r9868_10_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_10_mn$Memoria Familiar Hermano Porque nos Protegemos la Espalda$r9868_10_mn$,
  scene_visual = $r9868_10_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite vigilancia mutua y la certeza de que juntos nada podía dañarlos.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos, vestidos con trajes elegantes de aventureros nocturnos, capas cortas ondeando suavemente al viento, sin máscaras que oculten sus rostros. Están de pie juntos en la terraza de un edificio, mirando la ciudad iluminada, protegiéndose la espalda mutuamente con confianza.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_10_ma$,
  background_details = $r9868_10_mb$Una ciudad iluminada de noche, vista serena desde la altura. Nubes suaves iluminadas por la luna llena.$r9868_10_mb$,
  magic_effects = $r9868_10_mc$Las capas tienen un movimiento dramático casi sobrenatural en el viento. Iluminación cinematográfica heroica en sus rostros. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9868_10_mc$,
  lighting_color = $r9868_10_md$Azul noche suave, dorado cálido de las luces de la ciudad y la luz plateada de la luna entre las nubes.$r9868_10_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_10_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_10_la_patrulla_de_infancia_eterna_hermano.webp$r9868_10_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_11_fn$Memoria Familiar Hermana Porque juntos Somos Invencibles$r9868_11_fn$,
  scene_visual = $r9868_11_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite poder conjunto y la certeza de que juntos podían con todo.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, de pie, espalda con espalda, en una pose triunfal y segura. {NOMBRE_DESTINATARIO} sostiene un gran escudo dorado brillante y tus hermanos tienen las manos abiertas con un suave resplandor de energía dorada. Todos sonríen con confianza, envueltos en un halo de luz protectora.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_11_fa$,
  background_details = $r9868_11_fb$Una ciudad bañada por la hermosa luz dorada del amanecer. Nubes suaves iluminadas en el cielo.$r9868_11_fb$,
  magic_effects = $r9868_11_fc$Un suave resplandor dorado emana de sus manos y del escudo, iluminando el entorno con chispas cinematográficas. La magia debe sentirse triunfal y completamente integrada dentro de una fotografía realista.$r9868_11_fc$,
  lighting_color = $r9868_11_fd$Naranjas y dorados de victoria, contrastando con el cian de sus poderes.$r9868_11_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_11_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_31_la_mesa_de_nuestras_conspiraciones_hermana.webp$r9868_11_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_11_mn$Memoria Familiar Hermano Porque juntos Somos Invencibles$r9868_11_mn$,
  scene_visual = $r9868_11_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite poder conjunto y la certeza de que juntos podían con todo.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, de pie, espalda con espalda, en una pose triunfal y segura. {NOMBRE_DESTINATARIO} sostiene un gran escudo dorado brillante y tus hermanos tienen las manos abiertas con un suave resplandor de energía dorada. Todos sonríen con confianza, envueltos en un halo de luz protectora.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_11_ma$,
  background_details = $r9868_11_mb$Una ciudad bañada por la hermosa luz dorada del amanecer. Nubes suaves iluminadas en el cielo.$r9868_11_mb$,
  magic_effects = $r9868_11_mc$Un suave resplandor dorado emana de sus manos y del escudo, iluminando el entorno con chispas cinematográficas. La magia debe sentirse triunfal y completamente integrada dentro de una fotografía realista.$r9868_11_mc$,
  lighting_color = $r9868_11_md$Naranjas y dorados de victoria, contrastando con el cian de sus poderes.$r9868_11_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_11_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_11_la_mesa_de_nuestras_conspiraciones_hermano.webp$r9868_11_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_12_fn$Memoria Familiar Hermana Porque somos Cazafantasmas de Miedos$r9868_12_fn$,
  scene_visual = $r9868_12_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad divertida y la certeza de que ningún miedo podía con ellos.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, vestidos con trajes de exploradores nocturnos y linternas mágicas que emiten un haz de luz dorada. Todos sostienen sus linternas apuntando hacia una sombra fantasmagórica verde, translúcida y de aspecto divertido (no aterradora), que queda atrapada en la luz.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_12_fa$,
  background_details = $r9868_12_fb$Una biblioteca antigua y desordenada o un ático oscuro, con libros flotando en el aire.$r9868_12_fb$,
  magic_effects = $r9868_12_fc$Los haces de luz de las linternas crujen con chispas mágicas. El fantasma es luz translúcida y brillante. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$r9868_12_fc$,
  lighting_color = $r9868_12_fd$Marrones y negros ambientales rotos por el resplandor verde suave del fantasma y la luz dorada de las linternas.$r9868_12_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_12_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_32_el_album_donde_seguimos_juntos_hermana.webp$r9868_12_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_12_mn$Memoria Familiar Hermano Porque somos Cazafantasmas de Miedos$r9868_12_mn$,
  scene_visual = $r9868_12_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad divertida y la certeza de que ningún miedo podía con ellos.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, vestidos con trajes de exploradores nocturnos y linternas mágicas que emiten un haz de luz dorada. Todos sostienen sus linternas apuntando hacia una sombra fantasmagórica verde, translúcida y de aspecto divertido (no aterradora), que queda atrapada en la luz.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_12_ma$,
  background_details = $r9868_12_mb$Una biblioteca antigua y desordenada o un ático oscuro, con libros flotando en el aire.$r9868_12_mb$,
  magic_effects = $r9868_12_mc$Los haces de luz de las linternas crujen con chispas mágicas. El fantasma es luz translúcida y brillante. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$r9868_12_mc$,
  lighting_color = $r9868_12_md$Marrones y negros ambientales rotos por el resplandor verde suave del fantasma y la luz dorada de las linternas.$r9868_12_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_12_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_12_el_album_donde_seguimos_juntos_hermano.webp$r9868_12_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_13_fn$Memoria Familiar Hermana Porque somos el Yin de mi Yang$r9868_13_fn$,
  scene_visual = $r9868_13_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite equilibrio perfecto entre dos opuestos que se complementan.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, de pie, frente a frente, chocando las palmas en alto. {NOMBRE_DESTINATARIO} emite un aura de luz solar dorada y fuego cálido, mientras tus hermanos emiten un aura de luz lunar plateada y hielo cristalino. Justo donde sus manos chocan, se crea una explosión mágica de equilibrio formando un símbolo sutil del Yin Yang con luces y partículas.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_13_fa$,
  background_details = $r9868_13_fb$Un paisaje celestial partido a la mitad: una mitad es un amanecer cálido dorado y la otra es una noche estrellada brillante.$r9868_13_fb$,
  magic_effects = $r9868_13_fc$Aura de fuego en uno, aura de nieve/cristales en el otro. El impacto de sus manos crea una onda expansiva de polvo cósmico. La magia debe sentirse equilibrada y completamente integrada dentro de una fotografía realista.$r9868_13_fc$,
  lighting_color = $r9868_13_fd$Contraste fuerte y hermoso entre naranjas/rojos ardientes y azules/plata glaciales.$r9868_13_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_13_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_33_la_carrera_hasta_el_fin_del_mundo_hermana.webp$r9868_13_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_13_mn$Memoria Familiar Hermano Porque somos el Yin de mi Yang$r9868_13_mn$,
  scene_visual = $r9868_13_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite equilibrio perfecto entre dos opuestos que se complementan.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, de pie, frente a frente, chocando las palmas en alto. {NOMBRE_DESTINATARIO} emite un aura de luz solar dorada y fuego cálido, mientras tus hermanos emiten un aura de luz lunar plateada y hielo cristalino. Justo donde sus manos chocan, se crea una explosión mágica de equilibrio formando un símbolo sutil del Yin Yang con luces y partículas.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_13_ma$,
  background_details = $r9868_13_mb$Un paisaje celestial partido a la mitad: una mitad es un amanecer cálido dorado y la otra es una noche estrellada brillante.$r9868_13_mb$,
  magic_effects = $r9868_13_mc$Aura de fuego en uno, aura de nieve/cristales en el otro. El impacto de sus manos crea una onda expansiva de polvo cósmico. La magia debe sentirse equilibrada y completamente integrada dentro de una fotografía realista.$r9868_13_mc$,
  lighting_color = $r9868_13_md$Contraste fuerte y hermoso entre naranjas/rojos ardientes y azules/plata glaciales.$r9868_13_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_13_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_13_la_carrera_hasta_el_fin_del_mundo_hermano.webp$r9868_13_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_14_fn$Memoria Familiar Hermana Porque eres mi Refugio Constante$r9868_14_fn$,
  scene_visual = $r9868_14_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz absoluta y la certeza de que su compañía siempre fue un refugio seguro.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, sentados cómodamente en la arena de una playa tropical en la noche. Uno de ellos toca un ukelele mientras los demás escuchan sonrientes y relajados. Junto a ellos, un antiguo tocadiscos portátil y tablas de surf clavadas en la arena.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_14_fa$,
  background_details = $r9868_14_fb$Una playa nocturna. Olas suaves rompiendo en la orilla. Un cielo inmenso y cristalino lleno de estrellas y la Vía Láctea brillando.$r9868_14_fb$,
  magic_effects = $r9868_14_fc$Estrellas fugaces cruzando el cielo. El ambiente destila paz mágica y conexión emocional pura.$r9868_14_fc$,
  lighting_color = $r9868_14_fd$Azul medianoche, púrpuras cósmicos, el blanco de la espuma del mar y un fuego de fogata suave iluminándolos.$r9868_14_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_14_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_34_el_codigo_de_hermanos_hermana.webp$r9868_14_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_14_mn$Memoria Familiar Hermano Porque eres mi Refugio Constante$r9868_14_mn$,
  scene_visual = $r9868_14_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz absoluta y la certeza de que su compañía siempre fue un refugio seguro.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, sentados cómodamente en la arena de una playa tropical en la noche. Uno de ellos toca un ukelele mientras los demás escuchan sonrientes y relajados. Junto a ellos, un antiguo tocadiscos portátil y tablas de surf clavadas en la arena.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_14_ma$,
  background_details = $r9868_14_mb$Una playa nocturna. Olas suaves rompiendo en la orilla. Un cielo inmenso y cristalino lleno de estrellas y la Vía Láctea brillando.$r9868_14_mb$,
  magic_effects = $r9868_14_mc$Estrellas fugaces cruzando el cielo. El ambiente destila paz mágica y conexión emocional pura.$r9868_14_mc$,
  lighting_color = $r9868_14_md$Azul medianoche, púrpuras cósmicos, el blanco de la espuma del mar y un fuego de fogata suave iluminándolos.$r9868_14_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_14_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_14_el_codigo_de_hermanos_hermano.webp$r9868_14_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_15_fn$Memoria Familiar Hermana Porque somos Rivales y Mejores Amigos$r9868_15_fn$,
  scene_visual = $r9868_15_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad juguetona y la certeza de que hasta las peleas terminaban en risas.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, vestidos con armaduras mitológicas épicas pero modernas. Están chocando lúdicamente sus armas (un mazo dorado brillante y una vara mágica azul), pero en lugar de pelear con furia, todos se están riendo a carcajadas. El choque de sus armas no causa destrucción, sino que genera chispas de luz como fuegos artificiales.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_15_fa$,
  background_details = $r9868_15_fb$Una arena de gladiadores mítica o un puente celestial. Luz épica y brillante.$r9868_15_fb$,
  magic_effects = $r9868_15_fc$Chispas mágicas cayendo de las armas chocadas como si fuera confeti brillante. Relámpagos juguetones. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$r9868_15_fc$,
  lighting_color = $r9868_15_fd$Rojo poderoso, dorado, azul místico y destellos de relámpagos blancos.$r9868_15_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_15_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_35_la_noche_de_nuestras_historias_hermana.webp$r9868_15_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_15_mn$Memoria Familiar Hermano Porque somos Rivales y Mejores Amigos$r9868_15_mn$,
  scene_visual = $r9868_15_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad juguetona y la certeza de que hasta las peleas terminaban en risas.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, vestidos con armaduras mitológicas épicas pero modernas. Están chocando lúdicamente sus armas (un mazo dorado brillante y una vara mágica azul), pero en lugar de pelear con furia, todos se están riendo a carcajadas. El choque de sus armas no causa destrucción, sino que genera chispas de luz como fuegos artificiales.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_15_ma$,
  background_details = $r9868_15_mb$Una arena de gladiadores mítica o un puente celestial. Luz épica y brillante.$r9868_15_mb$,
  magic_effects = $r9868_15_mc$Chispas mágicas cayendo de las armas chocadas como si fuera confeti brillante. Relámpagos juguetones. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$r9868_15_mc$,
  lighting_color = $r9868_15_md$Rojo poderoso, dorado, azul místico y destellos de relámpagos blancos.$r9868_15_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_15_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_15_la_noche_de_nuestras_historias_hermano.webp$r9868_15_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_16_fn$Memoria Familiar Hermana Porque cantamos la Misma Canción$r9868_16_fn$,
  scene_visual = $r9868_16_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite despreocupación total y la alegría de cantar sin miedo a los problemas.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, caminando despreocupadamente sobre un gigantesco tronco de árbol caído que sirve como puente sobre un río o cascada. Todos tienen la cabeza levantada hacia el cielo, cantando a todo pulmón con expresiones de felicidad absoluta.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_16_fa$,
  background_details = $r9868_16_fb$Una selva tropical vibrante y luminosa. Detrás de ellos cae una cascada cristalina. El sol brillante de la tarde se filtra por las hojas.$r9868_16_fb$,
  magic_effects = $r9868_16_fc$Notas musicales doradas sutiles flotando en el aire alrededor de sus bocas. Mariposas mágicas revoloteando. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$r9868_16_fc$,
  lighting_color = $r9868_16_fd$Verdes exuberantes, turquesa del agua y dorado del sol de la tarde.$r9868_16_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_16_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_36_el_jardin_de_los_recuerdos_vivos_hermana.webp$r9868_16_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_16_mn$Memoria Familiar Hermano Porque cantamos la Misma Canción$r9868_16_mn$,
  scene_visual = $r9868_16_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite despreocupación total y la alegría de cantar sin miedo a los problemas.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, caminando despreocupadamente sobre un gigantesco tronco de árbol caído que sirve como puente sobre un río o cascada. Todos tienen la cabeza levantada hacia el cielo, cantando a todo pulmón con expresiones de felicidad absoluta.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_16_ma$,
  background_details = $r9868_16_mb$Una selva tropical vibrante y luminosa. Detrás de ellos cae una cascada cristalina. El sol brillante de la tarde se filtra por las hojas.$r9868_16_mb$,
  magic_effects = $r9868_16_mc$Notas musicales doradas sutiles flotando en el aire alrededor de sus bocas. Mariposas mágicas revoloteando. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$r9868_16_mc$,
  lighting_color = $r9868_16_md$Verdes exuberantes, turquesa del agua y dorado del sol de la tarde.$r9868_16_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_16_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_16_el_jardin_de_los_recuerdos_vivos_hermano.webp$r9868_16_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_17_fn$Memoria Familiar Hermana Porque eres la Magia de mi Invierno$r9868_17_fn$,
  scene_visual = $r9868_17_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro puro ante la magia invernal compartida.

Sujetos Principales
{NOMBRE_DESTINATARIO}, en un paisaje nevado, con los brazos extendidos creando formas mágicas de cristal de hielo en el aire (una pequeña escultura de hielo brillante). Tus hermanos lo observan maravillados con las manos en las mejillas, abrigados con ropa de invierno elegante. Todos sonríen llenos de asombro.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_17_fa$,
  background_details = $r9868_17_fb$Un bosque de pinos cubiertos de nieve virgen y un lago congelado. El cielo es de un azul gélido con auroras boreales sutiles al fondo.$r9868_17_fb$,
  magic_effects = $r9868_17_fc$La magia de hielo en las manos de {NOMBRE_DESTINATARIO} brilla como diamantes bajo la luz de la luna. Polvo de nieve destellando. La magia debe sentirse deslumbrante y completamente integrada dentro de una fotografía realista.$r9868_17_fc$,
  lighting_color = $r9868_17_fd$Cian puro, blanco nieve, plata y tonos magenta/violeta de la aurora.$r9868_17_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_17_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_37_la_luz_que_dejo_tu_risa_hermana.webp$r9868_17_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_17_mn$Memoria Familiar Hermano Porque eres la Magia de mi Invierno$r9868_17_mn$,
  scene_visual = $r9868_17_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro puro ante la magia invernal compartida.

Sujetos Principales
{NOMBRE_DESTINATARIO}, en un paisaje nevado, con los brazos extendidos creando formas mágicas de cristal de hielo en el aire (una pequeña escultura de hielo brillante). Tus hermanos lo observan maravillados con las manos en las mejillas, abrigados con ropa de invierno elegante. Todos sonríen llenos de asombro.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_17_ma$,
  background_details = $r9868_17_mb$Un bosque de pinos cubiertos de nieve virgen y un lago congelado. El cielo es de un azul gélido con auroras boreales sutiles al fondo.$r9868_17_mb$,
  magic_effects = $r9868_17_mc$La magia de hielo en las manos de {NOMBRE_DESTINATARIO} brilla como diamantes bajo la luz de la luna. Polvo de nieve destellando. La magia debe sentirse deslumbrante y completamente integrada dentro de una fotografía realista.$r9868_17_mc$,
  lighting_color = $r9868_17_md$Cian puro, blanco nieve, plata y tonos magenta/violeta de la aurora.$r9868_17_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_17_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_17_la_luz_que_dejo_tu_risa_hermano.webp$r9868_17_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_18_fn$Memoria Familiar Hermana Porque nos reímos del Peligro$r9868_18_fn$,
  scene_visual = $r9868_18_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite humor compartido incluso frente a lo que debería dar miedo.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, cruzando un puente colgante viejo de madera que parece estar a punto de romperse, sobre un río de lava brillante. En lugar de estar aterrorizados, {NOMBRE_DESTINATARIO} está haciendo un chiste o una mueca cómica, y tus hermanos se están riendo a carcajadas agarrándose el estómago, ignorando completamente el "peligro".

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_18_fa$,
  background_details = $r9868_18_fb$El interior de un volcán o una fortaleza oscura, iluminada dramáticamente desde abajo por el resplandor de la lava.$r9868_18_fb$,
  magic_effects = $r9868_18_fc$Chispas de lava saltando como fuegos artificiales cómicos. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$r9868_18_fc$,
  lighting_color = $r9868_18_fd$Sombras oscuras, piedra negra y la luz roja/naranja vibrante y ardiente desde abajo.$r9868_18_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_18_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_38_la_esquina_donde_empieza_la_memoria_hermana.webp$r9868_18_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_18_mn$Memoria Familiar Hermano Porque nos reímos del Peligro$r9868_18_mn$,
  scene_visual = $r9868_18_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite humor compartido incluso frente a lo que debería dar miedo.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, cruzando un puente colgante viejo de madera que parece estar a punto de romperse, sobre un río de lava brillante. En lugar de estar aterrorizados, {NOMBRE_DESTINATARIO} está haciendo un chiste o una mueca cómica, y tus hermanos se están riendo a carcajadas agarrándose el estómago, ignorando completamente el "peligro".

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_18_ma$,
  background_details = $r9868_18_mb$El interior de un volcán o una fortaleza oscura, iluminada dramáticamente desde abajo por el resplandor de la lava.$r9868_18_mb$,
  magic_effects = $r9868_18_mc$Chispas de lava saltando como fuegos artificiales cómicos. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$r9868_18_mc$,
  lighting_color = $r9868_18_md$Sombras oscuras, piedra negra y la luz roja/naranja vibrante y ardiente desde abajo.$r9868_18_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_18_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_18_la_esquina_donde_empieza_la_memoria_hermano.webp$r9868_18_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_19_fn$Memoria Familiar Hermana Porque nuestros Caminos Siempre se Cruzan$r9868_19_fn$,
  scene_visual = $r9868_19_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite un lazo que ni la distancia ni el tiempo pueden romper.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, caminando sobre el cielo. Cada uno camina sobre un sendero de luz sólida (dorado cálido o azul plateado). Los senderos se entrelazan de forma hermosa formando repetidamente un símbolo del infinito gigante detrás de ellos. Todos caminan en paralelo, mirándose y sonriéndose con profundo amor de hermanos.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_19_fa$,
  background_details = $r9868_19_fb$Un espacio onírico de nubes crepusculares.$r9868_19_fb$,
  magic_effects = $r9868_19_fc$Los senderos de luz desprenden polvo de estrellas. El símbolo de infinito gigante brilla en el fondo. La magia debe sentirse conceptual y completamente integrada dentro de una fotografía realista.$r9868_19_fc$,
  lighting_color = $r9868_19_fd$Púrpuras suaves, índigos, y la luz radiante contrastante (oro y plata) de los dos caminos entrelazados.$r9868_19_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_19_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_39_el_lazo_que_no_aprende_a_irse_hermana.webp$r9868_19_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_19_mn$Memoria Familiar Hermano Porque nuestros Caminos Siempre se Cruzan$r9868_19_mn$,
  scene_visual = $r9868_19_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite un lazo que ni la distancia ni el tiempo pueden romper.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, caminando sobre el cielo. Cada uno camina sobre un sendero de luz sólida (dorado cálido o azul plateado). Los senderos se entrelazan de forma hermosa formando repetidamente un símbolo del infinito gigante detrás de ellos. Todos caminan en paralelo, mirándose y sonriéndose con profundo amor de hermanos.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_19_ma$,
  background_details = $r9868_19_mb$Un espacio onírico de nubes crepusculares.$r9868_19_mb$,
  magic_effects = $r9868_19_mc$Los senderos de luz desprenden polvo de estrellas. El símbolo de infinito gigante brilla en el fondo. La magia debe sentirse conceptual y completamente integrada dentro de una fotografía realista.$r9868_19_mc$,
  lighting_color = $r9868_19_md$Púrpuras suaves, índigos, y la luz radiante contrastante (oro y plata) de los dos caminos entrelazados.$r9868_19_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_19_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_19_el_lazo_que_no_aprende_a_irse_hermano.webp$r9868_19_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_20_fn$Memoria Familiar Hermana Porque nuestro Vínculo es Eterno$r9868_20_fn$,
  scene_visual = $r9868_20_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz absoluta y el amor eterno que trasciende la partida física.

Sujetos Principales
Un paisaje celestial vibrante. {NOMBRE_DESTINATARIO} aparece en el lado derecho de un puente de luz etéreo, bañada en una luz dorada brillante y translúcida, extendiendo la mano con una sonrisa llena de paz. Tus hermanos están en el lado izquierdo (terrenal) extendiendo sus manos hacia ella. El momento antes del toque, con las manos casi entrelazadas, simboliza un amor que cruza dimensiones.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_20_fa$,
  background_details = $r9868_20_fb$Puente de luz vibrante pero elegante. Cielo celestial con nubes doradas y luz divina. El lado terrenal es verde y sereno, el lado de {NOMBRE_DESTINATARIO} es luz pura.$r9868_20_fb$,
  magic_effects = $r9868_20_fc$El puente emite partículas de luz doradas. Un lazo de energía sutil une sus manos. La magia debe sentirse esperanzadora y completamente integrada dentro de una fotografía realista.$r9868_20_fc$,
  lighting_color = $r9868_20_fd$Naranja caléndula vibrante, oro divino, cielo crepuscular mágico.
$r9868_20_fd$,
  updated_at = now()
WHERE template_preview_key = $r9868_20_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_40_siempre_seras_parte_de_mi_hermana.webp$r9868_20_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9868_20_mn$Memoria Familiar Hermano Porque nuestro Vínculo es Eterno$r9868_20_mn$,
  scene_visual = $r9868_20_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz absoluta y el amor eterno que trasciende la partida física.

Sujetos Principales
Un paisaje celestial vibrante. {NOMBRE_DESTINATARIO} aparece en el lado derecho de un puente de luz etéreo, bañado en una luz dorada brillante y translúcida, extendiendo la mano con una sonrisa llena de paz. Tus hermanos están en el lado izquierdo (terrenal) extendiendo sus manos hacia él. El momento antes del toque, con las manos casi entrelazadas, simboliza un amor que cruza dimensiones.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9868_20_ma$,
  background_details = $r9868_20_mb$Puente de luz vibrante pero elegante. Cielo celestial con nubes doradas y luz divina. El lado terrenal es verde y sereno, el lado de {NOMBRE_DESTINATARIO} es luz pura.$r9868_20_mb$,
  magic_effects = $r9868_20_mc$El puente emite partículas de luz doradas. Un lazo de energía sutil une sus manos. La magia debe sentirse esperanzadora y completamente integrada dentro de una fotografía realista.$r9868_20_mc$,
  lighting_color = $r9868_20_md$Naranja caléndula vibrante, oro divino, cielo crepuscular mágico.$r9868_20_md$,
  updated_at = now()
WHERE template_preview_key = $r9868_20_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_20_siempre_seras_parte_de_mi_hermano.webp$r9868_20_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_1_mn$Memoria Familiar Abuelo Porque eres mi Superhéroe$r9864_1_mn$,
  scene_visual = $r9864_1_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra al abuelo como el superhéroe protector que siempre fue, un homenaje lleno de fuerza y ternura.

Sujetos Principales
Ligeramente descentrado, el abuelo {NOMBRE_DESTINATARIO} vuela con un traje de superhéroe original en tonos dorados y azul profundo con detalles plateados, capa larga ondeando, símbolo de corazón brillante en el pecho, sobre una ciudad iluminada al atardecer. A su lado, su nieta ya adulta {NOMBRE_DEDICANTE} vuela sostenida de su mano, mirándolo con admiración y una sonrisa de total seguridad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_1_ma$,
  background_details = $r9864_1_mb$Una ciudad moderna vista desde el cielo al atardecer, nubes esponjosas en tonos naranjas, morados y dorados, rayos de sol atravesando las nubes.$r9864_1_mb$,
  magic_effects = $r9864_1_mc$Una estela de luz suave se despliega detrás de la capa de {NOMBRE_DESTINATARIO}, con pequeñas partículas doradas flotando en el aire. La magia debe sentirse heroica y completamente integrada dentro de una fotografía realista.$r9864_1_mc$,
  lighting_color = $r9864_1_md$Iluminación cinematográfica cálida y heroica de atardecer, con dorados intensos, naranjas y morados suaves.$r9864_1_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_1_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_01_el_faro_que_aun_me_guia.webp$r9864_1_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_2_mn$Memoria Familiar Abuelo Porque eres mi Guía$r9864_2_mn$,
  scene_visual = $r9864_2_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sabiduría, protección y el consuelo de sentir el camino siempre iluminado por su recuerdo.

Sujetos Principales
Ligeramente descentrado, el abuelo {NOMBRE_DESTINATARIO} camina como un sabio guía, envuelto en un abrigo elegante y atemporal, sosteniendo un bastón de madera antigua que emite luz brillante en la punta, iluminando el sendero. su nieta ya adulta {NOMBRE_DEDICANTE} camina un paso atrás, sintiéndose protegida y mirando el camino iluminado con asombro y paz.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_2_ma$,
  background_details = $r9864_2_mb$Un sendero dentro de un bosque místico al atardecer, árboles antiguos gigantes, raíces pronunciadas y musgo suave.$r9864_2_mb$,
  magic_effects = $r9864_2_mc$El cristal del bastón brilla iluminando las hojas cercanas y luciérnagas doradas flotan suavemente alrededor del sendero. La magia debe sentirse sabia y completamente integrada dentro de una fotografía realista.$r9864_2_mc$,
  lighting_color = $r9864_2_md$Iluminación cálida de atardecer en el bosque, con azules profundos, verdes esmeralda y el contraste dorado que emana del bastón.$r9864_2_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_2_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_02_la_ruta_de_tus_pasos_buenos.webp$r9864_2_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_3_mn$Memoria Familiar Abuelo Porque eres un Hechicero$r9864_3_mn$,
  scene_visual = $r9864_3_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro, sabiduría y la magia entrañable de quien convertía lo cotidiano en algo extraordinario.

Sujetos Principales
Ligeramente descentrado, el abuelo {NOMBRE_DESTINATARIO} aparece como un elegante hechicero, con una túnica de detalles dorados y aterciopelados, de pie frente a un atril antiguo con un gran libro de hechizos abierto, sosteniendo una varita elegante. su nieta ya adulta {NOMBRE_DEDICANTE} está a su lado, asomándose al libro con ojos llenos de asombro.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_3_ma$,
  background_details = $r9864_3_mb$Un estudio mágico o biblioteca antigua, estanterías de madera oscura llenas de libros, frascos de cristal con pociones de colores, pergaminos arrugados.$r9864_3_mb$,
  magic_effects = $r9864_3_mc$Símbolos dorados y fórmulas flotan sutilmente sobre el libro abierto, con un brillo suave en las botellas de cristal del fondo. La magia debe sentirse intelectual y completamente integrada dentro de una fotografía realista.$r9864_3_mc$,
  lighting_color = $r9864_3_md$Luz cálida de velas y el brillo mágico que sale del libro central, con marrones oscuros, púrpuras y dorados intensos.$r9864_3_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_3_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_03_el_jardin_de_tus_fechas_queridas.webp$r9864_3_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_4_mn$Memoria Familiar Abuelo Porque eres un Líder$r9864_4_mn$,
  scene_visual = $r9864_4_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad, justicia y el orgullo de haber sido guiados por su fuerza y su voz de mando.

Sujetos Principales
Ligeramente descentrado, el abuelo {NOMBRE_DESTINATARIO} aparece como un imponente emperador egipcio, con tocado dorado Nemes, túnica blanca de lino y collares lujosos de oro y lapislázuli, sentado en un trono dorado ornamentado sosteniendo un cetro. su nieta ya adulta {NOMBRE_DEDICANTE} está de pie a su lado, con vestimenta egipcia elegante a juego, mirándolo con orgullo y respeto.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_4_ma$,
  background_details = $r9864_4_mb$Un palacio monumental abierto, enormes pirámides bajo un cielo cálido de desierto despejado, sol brillante iluminando el oro del trono.$r9864_4_mb$,
  magic_effects = $r9864_4_mc$Sutiles destellos de sol rebotan en el oro de las joyas y el trono, con polvo fino brillando en la luz cálida. La magia debe sentirse majestuosa y completamente integrada dentro de una fotografía realista.$r9864_4_mc$,
  lighting_color = $r9864_4_md$Luz de desierto vibrante con dorados intensos, tonos arena, blanco brillante y acentos de azul cobalto.$r9864_4_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_4_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_04_el_manto_de_tus_historias.webp$r9864_4_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_5_mn$Memoria Familiar Abuelo Porque eres Encantador$r9864_5_mn$,
  scene_visual = $r9864_5_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite elegancia, calidez y el encanto sereno que curaba cualquier pena con solo una sonrisa.

Sujetos Principales
Ligeramente descentrado, el abuelo {NOMBRE_DESTINATARIO} luce como un elegante príncipe o noble de alta alcurnia, con un traje de gala deslumbrante y fluido, de pie a mitad de una imponente escalera de mármol de palacio, extendiendo la mano gentilmente hacia su nieta ya adulta {NOMBRE_DEDICANTE}, quien viste ropa formal de gala y le devuelve la sonrisa subiendo a su lado.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_5_ma$,
  background_details = $r9864_5_mb$El interior de un palacio majestuoso, candelabros de cristal gigantes, columnas de mármol blanco, escaleras curvas con pasamanos dorados.$r9864_5_mb$,
  magic_effects = $r9864_5_mc$Destellos de luz sutiles se reflejan en los candelabros y los detalles del traje. La magia debe sentirse elegante y completamente integrada dentro de una fotografía realista.$r9864_5_mc$,
  lighting_color = $r9864_5_md$Luz cálida, festiva y de ensueño, con blanco perla, dorado, plata y tonos cristalinos.$r9864_5_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_5_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_05_la_lampara_de_tu_cuidado.webp$r9864_5_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_6_mn$Memoria Familiar Abuelo Porque eres Aventurero$r9864_6_mn$,
  scene_visual = $r9864_6_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite emoción, curiosidad y el espíritu aventurero que convertía cualquier lugar en un descubrimiento.

Sujetos Principales
Ligeramente descentrado, el abuelo {NOMBRE_DESTINATARIO} aparece vestido como un clásico explorador aventurero (sombrero fedora marrón, chaqueta de cuero desgastada, camisa caqui), sosteniendo un mapa antiguo, frente a la entrada de un templo cubierto de enredaderas, descubriendo un tesoro dorado que brilla en la penumbra. su nieta ya adulta {NOMBRE_DEDICANTE}, vestida también de exploradora, sonríe a su lado con espíritu de aventura.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_6_ma$,
  background_details = $r9864_6_mb$Una selva densa y misteriosa, ruinas de piedra antigua tallada, luz penetrando entre el follaje de árboles gigantes.$r9864_6_mb$,
  magic_effects = $r9864_6_mc$Un haz de luz ilumina el tesoro y el rostro de {NOMBRE_DESTINATARIO}, con polvo flotante iluminado. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$r9864_6_mc$,
  lighting_color = $r9864_6_md$Luz cálida filtrada entre el follaje, con verdes profundos, marrones tierra y el brillo dorado del tesoro.$r9864_6_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_6_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_06_el_archivo_luminoso_de_tu_voz.webp$r9864_6_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_7_mn$Memoria Familiar Abuelo Porque eres Divertido$r9864_7_mn$,
  scene_visual = $r9864_7_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría pura, fantasía y el alma juguetona que nunca dejó de sonreír.

Sujetos Principales
Ligeramente descentrado, el abuelo {NOMBRE_DESTINATARIO} monta un dragón amistoso de colores mágicos, riendo a carcajadas, el cabello volando por el viento. su nieta ya adulta {NOMBRE_DEDICANTE} vuela a su lado montando un unicornio brillante, también riendo con pura felicidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_7_ma$,
  background_details = $r9864_7_mb$Un mundo de fantasía brillante y colorido, valles verdes, arcoíris cruzando el cielo, castillos de cristal a lo lejos.$r9864_7_mb$,
  magic_effects = $r9864_7_mc$Polvo de hadas cae desde las criaturas fantásticas y burbujas flotan en el aire. La magia debe sentirse juguetona y completamente integrada dentro de una fotografía realista.$r9864_7_mc$,
  lighting_color = $r9864_7_md$Luz de día soleado y radiante, con rosas, celestes, dorados y verdes esmeralda vibrantes.$r9864_7_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_7_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_07_la_silla_donde_vuelve_tu_risa.webp$r9864_7_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_8_mn$Memoria Familiar Abuelo Porque cumples mis Deseos$r9864_8_mn$,
  scene_visual = $r9864_8_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura mágica, gratitud y el consuelo de saber que sigue cuidando cada deseo del corazón.

Sujetos Principales
Ligeramente descentrada, su nieta ya adulta {NOMBRE_DEDICANTE} sostiene una antigua lámpara mágica de bronce de la cual emerge una nube de humo brillante azul y dorado. De esa nube emerge el abuelo {NOMBRE_DESTINATARIO} como un cálido genio protector, sonriendo con los brazos extendidos, atuendo de sedas elegantes. Ambos se miran con profunda conexión.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_8_ma$,
  background_details = $r9864_8_mb$Un cielo nocturno estrellado sobre una terraza de palacio árabe iluminada por la luna, atmósfera mística y cálida.$r9864_8_mb$,
  magic_effects = $r9864_8_mc$El humo de la lámpara guarda estrellas sutiles y destellos dorados en su interior. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$r9864_8_mc$,
  lighting_color = $r9864_8_md$Atmósfera nocturna mística con azules noche, púrpuras, dorados brillantes y humo azul cian translúcido.$r9864_8_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_8_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_08_el_puente_de_nuestras_conversaciones.webp$r9864_8_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_9_mn$Memoria Familiar Abuelo Porque eres Valiente$r9864_9_mn$,
  scene_visual = $r9864_9_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza, protección y el valor incondicional que hacía sentir a salvo del mundo entero.

Sujetos Principales
Ligeramente descentrado, el abuelo {NOMBRE_DESTINATARIO} aparece como un imponente guerrero medieval, con armadura de plata brillante (sin casco, rostro visible), sosteniendo una espada de luz en posición de descanso noble y un gran escudo protector que envuelve suavemente a su nieta ya adulta {NOMBRE_DEDICANTE}, quien está a su lado admirando su valor con total confianza y seguridad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_9_ma$,
  background_details = $r9864_9_mb$Un paisaje montañoso dramático al atardecer, nubes doradas y anaranjadas, luz cálida y poderosa emanando del escudo de {NOMBRE_DESTINATARIO}.$r9864_9_mb$,
  magic_effects = $r9864_9_mc$Destellos dorados brillan suavemente alrededor del escudo, como un campo de energía protector y sereno. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9864_9_mc$,
  lighting_color = $r9864_9_md$Grises metálicos, dorado y naranja de atardecer, y luz dorada/blanca pura de protección.$r9864_9_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_9_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_09_la_ventana_donde_te_recuerdo.webp$r9864_9_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_10_mn$Memoria Familiar Abuelo Porque eres un Soñador$r9864_10_mn$,
  scene_visual = $r9864_10_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz, esperanza y la serenidad de un alma que siempre creyó en un mundo mejor.

Sujetos Principales
Ligeramente descentrado, el abuelo {NOMBRE_DESTINATARIO}, vestido con ropa ligera y clara de lino, está de pie en un campo infinito de flores primaverales, sosteniendo una paloma blanca a punto de emprender el vuelo. Con la otra mano abraza por los hombros a su nieta ya adulta {NOMBRE_DEDICANTE}, ambos mirando un espectacular arcoíris doble en el cielo.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_10_ma$,
  background_details = $r9864_10_mb$Un campo verde vibrante cubierto de flores silvestres, cielo azul radiante recién despejado tras la lluvia, cruzado por un arcoíris brillante.$r9864_10_mb$,
  magic_effects = $r9864_10_mc$Un ligero resplandor suave bordea la paloma blanca y hay un brillo sutil de rocío en las flores. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$r9864_10_mc$,
  lighting_color = $r9864_10_md$Iluminación suave, natural y angelical, con blancos puros, celestes, verdes frescos y los tonos pastel del arcoíris.$r9864_10_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_10_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_10_el_mapa_de_tu_legado.webp$r9864_10_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_11_mn$Memoria Familiar Abuelo Porque me haces sentir Seguro$r9864_11_mn$,
  scene_visual = $r9864_11_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite protección absoluta, fuerza y la certeza de estar siempre a salvo bajo su cuidado.

Sujetos Principales
Ligeramente descentrado, el abuelo {NOMBRE_DESTINATARIO} aparece como un poderoso dios del trueno (armadura nórdica elegante, capa roja ondeante), sosteniendo un martillo místico que emite relámpagos controlados. su nieta ya adulta {NOMBRE_DEDICANTE} está bajo su brazo protector, sintiéndose totalmente segura y mirando al frente con confianza.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_11_ma$,
  background_details = $r9864_11_mb$Un acantilado mitológico con cielo tormentoso de fondo, pero donde está {NOMBRE_DESTINATARIO} hay luz pura, relámpagos azules y blancos en la distancia.$r9864_11_mb$,
  magic_effects = $r9864_11_mc$Relámpagos finos de luz azul rodean el martillo y los ojos de {NOMBRE_DESTINATARIO} reflejan una luz suave. La magia debe sentirse poderosa y completamente integrada dentro de una fotografía realista.$r9864_11_mc$,
  lighting_color = $r9864_11_md$Atmósfera poderosa y protectora, con gris tormenta, azul eléctrico, plata metálica y rojo intenso.$r9864_11_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_11_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_11_la_mesa_que_guarda_tu_nombre.webp$r9864_11_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_12_mn$Memoria Familiar Abuelo Porque eres Generoso$r9864_12_mn$,
  scene_visual = $r9864_12_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite calidez festiva y la generosidad infinita de quien nunca dejó de dar amor.

Sujetos Principales
Ligeramente descentrado, el abuelo {NOMBRE_DESTINATARIO} aparece como un elegante y abrigado Papá Noel (traje rojo de terciopelo, ribetes blancos mullidos), sosteniendo un saco antiguo del que salen luces mágicas y cajas de regalos envueltas. su nieta ya adulta {NOMBRE_DEDICANTE} lo abraza fuertemente en un entorno nevado, recibiendo un regalo con una cara de ilusión absoluta.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_12_ma$,
  background_details = $r9864_12_mb$Un paisaje nevado de invierno al atardecer, la puerta de una cabaña cálidamente iluminada, copos de nieve cayendo suavemente.$r9864_12_mb$,
  magic_effects = $r9864_12_mc$El interior del saco brilla con una luz dorada y mágica y los copos de nieve brillan sutilmente. La magia debe sentirse festiva y completamente integrada dentro de una fotografía realista.$r9864_12_mc$,
  lighting_color = $r9864_12_md$Luces cálidas doradas en contraste con la nieve azul/blanca, con rojo terciopelo, blanco nieve y oro cálido.$r9864_12_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_12_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_12_el_refugio_de_tus_consejos.webp$r9864_12_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_13_mn$Memoria Familiar Abuelo Porque eres Atrevido$r9864_13_mn$,
  scene_visual = $r9864_13_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad divertida y el estilo inolvidable con el que enfrentaba la vida.

Sujetos Principales
Ligeramente descentrado, el abuelo {NOMBRE_DESTINATARIO} aparece como un elegante agente secreto (traje negro de sastre, gafas oscuras clásicas), sosteniendo un elegante lanzador de burbujas en forma de bolígrafo del que brotan burbujas iridiscentes, en una pose de espía sofisticada y muy divertida. su nieta ya adulta {NOMBRE_DEDICANTE} está detrás de él copiando la pose, vestida como mini-agente, ambos con sonrisas cómplices.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_13_ma$,
  background_details = $r9864_13_mb$Un callejón de ciudad iluminado por faroles antiguos, negro elegante y grises cinematográficos.$r9864_13_mb$,
  magic_effects = $r9864_13_mc$Las burbujas de jabón reflejan un arcoíris intenso y mágico. La magia debe sentirse juguetona y completamente integrada dentro de una fotografía realista.$r9864_13_mc$,
  lighting_color = $r9864_13_md$Luz cinematográfica con negro elegante, grises y el reflejo multicolor de las burbujas flotando.$r9864_13_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_13_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_13_la_constelacion_de_tus_gestos.webp$r9864_13_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_14_mn$Memoria Familiar Abuelo Porque eres un Rebelde$r9864_14_mn$,
  scene_visual = $r9864_14_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite picardía, generosidad y la leyenda entrañable de un héroe del bosque.

Sujetos Principales
Ligeramente descentrado, el abuelo {NOMBRE_DESTINATARIO} aparece como un héroe del bosque estilo Robin Hood (capucha verde, chaleco de cuero rústico), sosteniendo un arco de madera con una flecha de luz brillante, sonrisa pícara y valiente. A su lado, su nieta ya adulta {NOMBRE_DEDICANTE} lo ayuda felizmente a repartir monedas de oro que caen de un saco. En el tronco de un árbol gigante hay un cartel antiguo que dice "SE BUSCA" con el rostro de {NOMBRE_DESTINATARIO} dibujado.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_14_ma$,
  background_details = $r9864_14_mb$Un denso bosque de robles gigantes, rayos de sol crepuscular filtrándose entre las hojas.$r9864_14_mb$,
  magic_effects = $r9864_14_mc$Las monedas de oro brillan intensamente con polvo de hadas y la punta de la flecha es luz pura. La magia debe sentirse pícara y completamente integrada dentro de una fotografía realista.$r9864_14_mc$,
  lighting_color = $r9864_14_md$Verdes profundos, marrones rústicos, dorado brillante y luz de atardecer.$r9864_14_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_14_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_14_la_carta_que_sigo_escribiendo.webp$r9864_14_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_15_mn$Memoria Familiar Abuelo Porque eres Alegre$r9864_15_mn$,
  scene_visual = $r9864_15_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría desbordante y la magia de convertir hasta la lluvia en una fiesta.

Sujetos Principales
Ligeramente descentrado, el abuelo {NOMBRE_DESTINATARIO}, con un elegante atuendo vintage, sostiene un paraguas brillante suspendido en pleno paso de baile mientras salpica en un charco grande. su nieta ya adulta {NOMBRE_DEDICANTE} baila alegremente a su lado con botas de lluvia coloridas, ambos con expresiones de pura felicidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_15_ma$,
  background_details = $r9864_15_mb$Una calle de ciudad al atardecer, lloviendo suavemente, faroles iluminando la lluvia con reflejos perfectos en los charcos.$r9864_15_mb$,
  magic_effects = $r9864_15_mc$Las gotas de lluvia iluminadas parecen polvo de estrellas y las salpicaduras brillan con luz propia dorada. La magia debe sentirse festiva y completamente integrada dentro de una fotografía realista.$r9864_15_mc$,
  lighting_color = $r9864_15_md$Azul petróleo para el atardecer, amarillos vibrantes y reflejos plateados del agua.$r9864_15_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_15_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_15_la_fotografia_que_respira_contigo.webp$r9864_15_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_16_mn$Memoria Familiar Abuelo Porque eres mi Guardián de Historias$r9864_16_mn$,
  scene_visual = $r9864_16_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite nostalgia mágica y la calidez de quien guardaba cada recuerdo familiar como un tesoro.

Sujetos Principales
Ligeramente descentrado, el abuelo {NOMBRE_DESTINATARIO}, con ropa elegante y atemporal, está en un estudio de luz tenue extrayendo hilos de luz dorada desde un grueso libro antiguo abierto. su nieta ya adulta {NOMBRE_DEDICANTE} está maravillada mientras esos hilos flotan y forman pequeñas proyecciones de momentos felices familiares.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_16_ma$,
  background_details = $r9864_16_mb$Un despacho acogedor, estanterías repletas de libros, chimenea encendida, atmósfera nostálgica.$r9864_16_mb$,
  magic_effects = $r9864_16_mc$Los hilos de luz dorada flotan en espiral y sutiles siluetas doradas de la familia se forman en el aire. La magia debe sentirse nostálgica y completamente integrada dentro de una fotografía realista.$r9864_16_mc$,
  lighting_color = $r9864_16_md$Marrones cálidos, fuego ámbar y la luz dorada y pura de los recuerdos.$r9864_16_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_16_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_16_el_camino_que_dejaste_abierto.webp$r9864_16_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_17_mn$Memoria Familiar Abuelo Porque eres mi Raíz y mi Fuerza$r9864_17_mn$,
  scene_visual = $r9864_17_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite arraigo, fortaleza y la certeza de que su esencia sigue dando vida y sostén a la familia.

Sujetos Principales
Ligeramente descentrado, el abuelo {NOMBRE_DESTINATARIO} está de pie frente a un árbol milenario gigante que emite una luz dorada y cálida (su aura y la luz del árbol se fusionan), entregando tiernamente a su nieta ya adulta {NOMBRE_DEDICANTE} una pequeña flor brillante. {NOMBRE_DEDICANTE} la recibe con ambas manos, con reverencia y amor.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_17_ma$,
  background_details = $r9864_17_mb$El interior de un bosque místico nocturno, raíces gigantes cubiertas de musgo esmeralda, ambiente de reverencia y conexión ancestral.$r9864_17_mb$,
  magic_effects = $r9864_17_mc$Miles de luciérnagas flotan alrededor del árbol y de {NOMBRE_DESTINATARIO}, y la flor en sus manos emite un destello de luz pura. La magia debe sentirse ancestral y completamente integrada dentro de una fotografía realista.$r9864_17_mc$,
  lighting_color = $r9864_17_md$Verde jade profundo, azul medianoche y dorado incandescente.$r9864_17_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_17_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_17_la_luz_que_no_se_apaga.webp$r9864_17_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_18_mn$Memoria Familiar Abuelo Porque eres mi Estrella Guía$r9864_18_mn$,
  scene_visual = $r9864_18_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo celestial y la certeza de que su luz sigue guiando cada paso desde el cielo.

Sujetos Principales
su nieta ya adulta {NOMBRE_DEDICANTE} está de pie en lo alto de una colina cubierta de hierba en la oscuridad de la noche, mirando con asombro un cielo deslumbrante. En el firmamento, las estrellas y nebulosas se organizan sutil y majestuosamente para formar el rostro gigante, protector y sonriente del abuelo {NOMBRE_DESTINATARIO}.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_18_ma$,
  background_details = $r9864_18_mb$Noche estrellada épica, vía láctea visible, colina verde oscura contrastando con el brillo del cosmos.$r9864_18_mb$,
  magic_effects = $r9864_18_mc$La formación del rostro es etérea, hecha enteramente de cúmulos de estrellas y polvo de nebulosa. La magia debe sentirse celestial y completamente integrada dentro de una fotografía realista.$r9864_18_mc$,
  lighting_color = $r9864_18_md$Negro espacial, violetas profundos, azules cósmicos y plata brillante de las estrellas.$r9864_18_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_18_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_18_el_abrazo_que_aprendi_de_ti.webp$r9864_18_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_19_mn$Memoria Familiar Abuelo Porque eres mi Viajero del Tiempo$r9864_19_mn$,
  scene_visual = $r9864_19_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite nostalgia entrañable y la sensación de que el tiempo junto a él nunca alcanza.

Sujetos Principales
Ligeramente descentrado, el abuelo {NOMBRE_DESTINATARIO}, vestido como un elegante viajero del tiempo (gabardina clásica, chaleco, reloj de bolsillo), está en el andén de una estación antigua frente a un tren de luz dorada y vapor, entregando un reloj de bolsillo brillante a su nieta ya adulta {NOMBRE_DEDICANTE}, mientras decenas de relojes antiguos flotan congelados en el aire alrededor de ellos.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_19_ma$,
  background_details = $r9864_19_mb$Una estación de tren de hierro forjado estilo victoriano, niebla y vapor mágico llenando el andén.$r9864_19_mb$,
  magic_effects = $r9864_19_mc$Relojes de bolsillo y engranajes flotan sin gravedad, y el tren está hecho de luz pura. La magia debe sentirse nostálgica y completamente integrada dentro de una fotografía realista.$r9864_19_mc$,
  lighting_color = $r9864_19_md$Bronce, cobre, grises misteriosos y el destello cálido y dorado de la maquinaria temporal.$r9864_19_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_19_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_19_el_lugar_donde_vuelvo_a_encontrarte.webp$r9864_19_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9864_20_mn$Memoria Familiar Abuelo Porque eres mi Ángel Guardián$r9864_20_mn$,
  scene_visual = $r9864_20_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz absoluta, consuelo y el amor eterno que trasciende la partida física.

Sujetos Principales
Ligeramente descentrado, el abuelo {NOMBRE_DESTINATARIO} aparece de forma etérea y translúcida, vestido con ropas blancas y simples, con una sutil aura brillante y alas hechas puramente de luz difusa, abrazando tiernamente y con infinita paz a su nieta ya adulta {NOMBRE_DEDICANTE}. {NOMBRE_DEDICANTE} cierra los ojos con una expresión de total consuelo, amor y tranquilidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9864_20_ma$,
  background_details = $r9864_20_mb$Un cielo de nubes esponjosas en tonos durazno, lavanda y rosa pastel suave, efecto atardecer divino.$r9864_20_mb$,
  magic_effects = $r9864_20_mc$Un aura de luz dorada muy suave envuelve a ambos, con partículas de luz celestial cayendo como polvo brillante. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$r9864_20_mc$,
  lighting_color = $r9864_20_md$Luz reconfortante, suave y envolvente, con durazno, lavanda y rosa pastel.
$r9864_20_md$,
  updated_at = now()
WHERE template_preview_key = $r9864_20_mk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_20_siempre_en_mi_corazon.webp$r9864_20_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_1_fn$Memoria Familiar Abuela Porque eres mi Superheroína$r9865_1_fn$,
  scene_visual = $r9865_1_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra a la abuela como la superheroína protectora que siempre fue, un homenaje lleno de fuerza y ternura.

Sujetos Principales
Ligeramente descentrada, la abuela {NOMBRE_DESTINATARIO} vuela con un traje de superheroína original en tonos dorados y azul profundo con detalles plateados, capa larga ondeando, símbolo de corazón brillante en el pecho, sobre una ciudad iluminada al atardecer. A su lado, su nieto ya adulto {NOMBRE_DEDICANTE} vuela sostenido de su mano, mirándola con admiración y una sonrisa de total seguridad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_1_fa$,
  background_details = $r9865_1_fb$Una ciudad moderna vista desde el cielo al atardecer, nubes esponjosas en tonos naranjas, morados y dorados, rayos de sol atravesando las nubes.$r9865_1_fb$,
  magic_effects = $r9865_1_fc$Una estela de luz suave se despliega detrás de la capa de {NOMBRE_DESTINATARIO}, con pequeñas partículas doradas flotando en el aire. La magia debe sentirse heroica y completamente integrada dentro de una fotografía realista.$r9865_1_fc$,
  lighting_color = $r9865_1_fd$Iluminación cinematográfica cálida y heroica de atardecer, con dorados intensos, naranjas y morados suaves.$r9865_1_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_1_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_01_el_faro_que_aun_me_guia.webp$r9865_1_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_2_fn$Memoria Familiar Abuela Porque eres mi Guía$r9865_2_fn$,
  scene_visual = $r9865_2_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sabiduría, protección y el consuelo de sentir el camino siempre iluminado por su recuerdo.

Sujetos Principales
Ligeramente descentrada, la abuela {NOMBRE_DESTINATARIO} camina como una sabia guía, envuelta en un chal elegante y texturizado, sosteniendo un bastón de madera antigua que emite luz brillante en la punta, iluminando el sendero. su nieta ya adulta {NOMBRE_DEDICANTE} camina un paso atrás, sintiéndose protegida y mirando el camino iluminado con asombro y paz.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_2_fa$,
  background_details = $r9865_2_fb$Un sendero dentro de un bosque místico al atardecer, árboles antiguos gigantes, raíces pronunciadas y musgo suave.$r9865_2_fb$,
  magic_effects = $r9865_2_fc$El cristal del bastón brilla iluminando las hojas cercanas y luciérnagas doradas flotan suavemente alrededor del sendero. La magia debe sentirse sabia y completamente integrada dentro de una fotografía realista.$r9865_2_fc$,
  lighting_color = $r9865_2_fd$Iluminación cálida de atardecer en el bosque, con azules profundos, verdes esmeralda y el contraste dorado que emana del bastón.$r9865_2_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_2_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_02_la_ruta_de_tus_pasos_buenos.webp$r9865_2_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_3_fn$Memoria Familiar Abuela Porque eres una Hechicera$r9865_3_fn$,
  scene_visual = $r9865_3_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro, sabiduría y la magia entrañable de quien convertía lo cotidiano en algo extraordinario.

Sujetos Principales
Ligeramente descentrada, la abuela {NOMBRE_DESTINATARIO} aparece como una elegante hechicera, con una túnica de detalles dorados y aterciopelados, de pie frente a un atril antiguo con un gran libro de hechizos abierto, sosteniendo una varita elegante. su nieto ya adulto {NOMBRE_DEDICANTE} está a su lado, asomándose al libro con ojos llenos de asombro.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_3_fa$,
  background_details = $r9865_3_fb$Un estudio mágico o biblioteca antigua, estanterías de madera oscura llenas de libros, frascos de cristal con pociones de colores, pergaminos arrugados.$r9865_3_fb$,
  magic_effects = $r9865_3_fc$Símbolos dorados y fórmulas flotan sutilmente sobre el libro abierto, con un brillo suave en las botellas de cristal del fondo. La magia debe sentirse intelectual y completamente integrada dentro de una fotografía realista.$r9865_3_fc$,
  lighting_color = $r9865_3_fd$Luz cálida de velas y el brillo mágico que sale del libro central, con marrones oscuros, púrpuras y dorados intensos.$r9865_3_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_3_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_03_el_jardin_de_tus_fechas_queridas.webp$r9865_3_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_4_fn$Memoria Familiar Abuela Porque eres una Líder$r9865_4_fn$,
  scene_visual = $r9865_4_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad, justicia y el orgullo de haber sido guiados por su fuerza y su voz de mando.

Sujetos Principales
Ligeramente descentrada, la abuela {NOMBRE_DESTINATARIO} aparece como una imponente emperatriz egipcia, con corona dorada Nemes, túnica blanca y collares lujosos de oro y lapislázuli, sentada en un trono dorado ornamentado sosteniendo un cetro. su nieta ya adulta {NOMBRE_DEDICANTE} está de pie a su lado, con vestimenta egipcia elegante a juego, mirándola con orgullo y respeto.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_4_fa$,
  background_details = $r9865_4_fb$Un palacio monumental abierto, enormes pirámides bajo un cielo cálido de desierto despejado, sol brillante iluminando el oro del trono.$r9865_4_fb$,
  magic_effects = $r9865_4_fc$Sutiles destellos de sol rebotan en el oro de las joyas y el trono, con polvo fino brillando en la luz cálida. La magia debe sentirse majestuosa y completamente integrada dentro de una fotografía realista.$r9865_4_fc$,
  lighting_color = $r9865_4_fd$Luz de desierto vibrante con dorados intensos, tonos arena, blanco brillante y acentos de azul cobalto.$r9865_4_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_4_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_04_el_manto_de_tus_historias.webp$r9865_4_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_5_fn$Memoria Familiar Abuela Porque eres Encantadora$r9865_5_fn$,
  scene_visual = $r9865_5_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite elegancia, calidez y el encanto sereno que curaba cualquier pena con solo una sonrisa.

Sujetos Principales
Ligeramente descentrada, la abuela {NOMBRE_DESTINATARIO} luce como una elegante dama de alta alcurnia, con un vestido de gala estilo victoriano de detalles en hilo dorado, de pie a mitad de una imponente escalera de mármol de palacio, extendiendo la mano gentilmente hacia su nieto ya adulto {NOMBRE_DEDICANTE}, quien viste ropa formal y le devuelve la sonrisa subiendo a su lado.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_5_fa$,
  background_details = $r9865_5_fb$El interior de un palacio majestuoso, candelabros de cristal gigantes, columnas de mármol blanco, escaleras curvas con pasamanos dorados.$r9865_5_fb$,
  magic_effects = $r9865_5_fc$Destellos de luz sutiles se reflejan en los candelabros y los detalles del vestido. La magia debe sentirse elegante y completamente integrada dentro de una fotografía realista.$r9865_5_fc$,
  lighting_color = $r9865_5_fd$Luz cálida, festiva y lujosa, con blanco perla, dorado y rojo burdeos sutil.$r9865_5_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_5_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_05_la_lampara_de_tu_cuidado.webp$r9865_5_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_6_fn$Memoria Familiar Abuela Porque eres Aventurera$r9865_6_fn$,
  scene_visual = $r9865_6_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite emoción, curiosidad y el espíritu aventurero que convertía cualquier lugar en un descubrimiento.

Sujetos Principales
Ligeramente descentrada, la abuela {NOMBRE_DESTINATARIO} aparece vestida como una elegante exploradora (estilo safari, sombrero de ala ancha), sosteniendo un mapa antiguo, frente a la entrada de un templo cubierto de enredaderas, descubriendo un tesoro dorado que brilla en la penumbra. su nieta ya adulta {NOMBRE_DEDICANTE}, vestida también de exploradora, sonríe a su lado con espíritu de aventura.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_6_fa$,
  background_details = $r9865_6_fb$Una selva densa y misteriosa, ruinas de piedra antigua tallada, luz penetrando entre el follaje de árboles gigantes.$r9865_6_fb$,
  magic_effects = $r9865_6_fc$Un haz de luz ilumina el tesoro y el rostro de {NOMBRE_DESTINATARIO}, con polvo flotante iluminado. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$r9865_6_fc$,
  lighting_color = $r9865_6_fd$Luz cálida filtrada entre el follaje, con verdes profundos, marrones tierra y el brillo dorado del tesoro.$r9865_6_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_6_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_06_el_archivo_luminoso_de_tu_voz.webp$r9865_6_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_7_fn$Memoria Familiar Abuela Porque eres Divertida$r9865_7_fn$,
  scene_visual = $r9865_7_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría pura, fantasía y el alma juguetona que nunca dejó de sonreír.

Sujetos Principales
Ligeramente descentrada, la abuela {NOMBRE_DESTINATARIO} monta un dragón amistoso de colores mágicos, riendo a carcajadas. su nieto ya adulto {NOMBRE_DEDICANTE} vuela a su lado montando un unicornio brillante, también riendo con pura felicidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_7_fa$,
  background_details = $r9865_7_fb$Un mundo de fantasía brillante y colorido, valles verdes, arcoíris cruzando el cielo, castillos de cristal a lo lejos.$r9865_7_fb$,
  magic_effects = $r9865_7_fc$Polvo de hadas cae desde las criaturas fantásticas y burbujas flotan en el aire. La magia debe sentirse juguetona y completamente integrada dentro de una fotografía realista.$r9865_7_fc$,
  lighting_color = $r9865_7_fd$Luz de día soleado y radiante, con rosas, celestes, dorados y verdes esmeralda vibrantes.$r9865_7_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_7_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_07_la_silla_donde_vuelve_tu_risa.webp$r9865_7_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_8_fn$Memoria Familiar Abuela Porque cumples mis Deseos$r9865_8_fn$,
  scene_visual = $r9865_8_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura mágica, gratitud y el consuelo de saber que sigue cuidando cada deseo del corazón.

Sujetos Principales
Ligeramente descentrada, su nieta ya adulta {NOMBRE_DEDICANTE} sostiene una antigua lámpara mágica de bronce de la cual emerge una nube de humo brillante azul y dorado. De esa nube emerge la abuela {NOMBRE_DESTINATARIO} como una cálida hada madrina, sonriendo con los brazos extendidos. Ambas se miran con profunda conexión.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_8_fa$,
  background_details = $r9865_8_fb$Un cielo nocturno estrellado sobre una terraza de palacio árabe iluminada por la luna, atmósfera mística y cálida.$r9865_8_fb$,
  magic_effects = $r9865_8_fc$El humo de la lámpara guarda estrellas sutiles y destellos dorados en su interior. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$r9865_8_fc$,
  lighting_color = $r9865_8_fd$Atmósfera nocturna mística con azules noche, púrpuras, dorados brillantes y humo azul cian translúcido.$r9865_8_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_8_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_08_el_puente_de_nuestras_conversaciones.webp$r9865_8_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_9_fn$Memoria Familiar Abuela Porque eres Valiente$r9865_9_fn$,
  scene_visual = $r9865_9_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza, protección y el valor incondicional que hacía sentir a salvo del mundo entero.

Sujetos Principales
Ligeramente descentrada, la abuela {NOMBRE_DESTINATARIO} aparece como una imponente guerrera medieval, con armadura de plata brillante (sin casco, rostro visible), sosteniendo una espada de luz y un gran escudo que protege a su nieto ya adulto {NOMBRE_DEDICANTE}, quien está a su lado admirando su valor mientras un dragón escupe fuego que el escudo bloquea creando una barrera de energía brillante.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_9_fa$,
  background_details = $r9865_9_fb$Un paisaje montañoso dramático, nubes oscuras de tormenta, pero con luz cálida y poderosa emanando del escudo de {NOMBRE_DESTINATARIO}.$r9865_9_fb$,
  magic_effects = $r9865_9_fc$Chispas de fuego rebotan en un campo de fuerza sutil que genera el escudo. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9865_9_fc$,
  lighting_color = $r9865_9_fd$Grises metálicos, fuego naranja/rojo y luz dorada/blanca pura de protección.$r9865_9_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_9_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_09_la_ventana_donde_te_recuerdo.webp$r9865_9_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_10_fn$Memoria Familiar Abuela Porque eres una Soñadora$r9865_10_fn$,
  scene_visual = $r9865_10_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz, esperanza y la serenidad de un alma que siempre creyó en un mundo mejor.

Sujetos Principales
Ligeramente descentrada, la abuela {NOMBRE_DESTINATARIO}, vestida con ropa ligera y clara de lino, está de pie en un campo infinito de flores primaverales, sosteniendo una paloma blanca a punto de emprender el vuelo. Con la otra mano abraza por los hombros a su nieta ya adulta {NOMBRE_DEDICANTE}, ambas mirando un espectacular arcoíris doble en el cielo.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_10_fa$,
  background_details = $r9865_10_fb$Un campo verde vibrante cubierto de flores silvestres, cielo azul radiante recién despejado tras la lluvia, cruzado por un arcoíris brillante.$r9865_10_fb$,
  magic_effects = $r9865_10_fc$Un ligero resplandor suave bordea la paloma blanca y hay un brillo sutil de rocío en las flores. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$r9865_10_fc$,
  lighting_color = $r9865_10_fd$Iluminación suave, natural y angelical, con blancos puros, celestes, verdes frescos y los tonos pastel del arcoíris.$r9865_10_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_10_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_10_el_mapa_de_tu_legado.webp$r9865_10_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_11_fn$Memoria Familiar Abuela Porque me haces sentir Seguro$r9865_11_fn$,
  scene_visual = $r9865_11_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite protección absoluta, fuerza y la certeza de estar siempre a salvo bajo su cuidado.

Sujetos Principales
Ligeramente descentrada, la abuela {NOMBRE_DESTINATARIO} aparece como una diosa protectora (armadura elegante, capa ondeante), sosteniendo un escudo luminoso que genera relámpagos controlados. su nieto ya adulto {NOMBRE_DEDICANTE} está bajo su brazo protector, sintiéndose totalmente seguro y mirando al frente con confianza.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_11_fa$,
  background_details = $r9865_11_fb$Un acantilado mitológico con cielo tormentoso de fondo, pero donde está {NOMBRE_DESTINATARIO} hay luz pura, relámpagos azules y blancos en la distancia.$r9865_11_fb$,
  magic_effects = $r9865_11_fc$Relámpagos finos de luz azul rodean el escudo y los ojos de {NOMBRE_DESTINATARIO} reflejan una luz suave. La magia debe sentirse poderosa y completamente integrada dentro de una fotografía realista.$r9865_11_fc$,
  lighting_color = $r9865_11_fd$Atmósfera poderosa y protectora, con gris tormenta, azul eléctrico, plata metálica y rojo intenso.$r9865_11_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_11_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_11_la_mesa_que_guarda_tu_nombre.webp$r9865_11_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_12_fn$Memoria Familiar Abuela Porque eres Generosa$r9865_12_fn$,
  scene_visual = $r9865_12_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite calidez festiva y la generosidad infinita de quien nunca dejó de dar amor.

Sujetos Principales
Ligeramente descentrada, la abuela {NOMBRE_DESTINATARIO} aparece como una elegante y abrigada Mamá Noel (traje rojo de terciopelo, ribetes blancos mullidos), sosteniendo un saco antiguo del que salen luces mágicas y cajas de regalos envueltas. su nieta ya adulta {NOMBRE_DEDICANTE} la abraza fuertemente en un entorno nevado, recibiendo un regalo con una cara de ilusión absoluta.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_12_fa$,
  background_details = $r9865_12_fb$Un paisaje nevado de invierno al atardecer, la puerta de una cabaña cálidamente iluminada, copos de nieve cayendo suavemente.$r9865_12_fb$,
  magic_effects = $r9865_12_fc$El interior del saco brilla con una luz dorada y mágica y los copos de nieve brillan sutilmente. La magia debe sentirse festiva y completamente integrada dentro de una fotografía realista.$r9865_12_fc$,
  lighting_color = $r9865_12_fd$Luces cálidas doradas en contraste con la nieve azul/blanca, con rojo terciopelo, blanco nieve y oro cálido.$r9865_12_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_12_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_12_el_refugio_de_tus_consejos.webp$r9865_12_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_13_fn$Memoria Familiar Abuela Porque eres Atrevida$r9865_13_fn$,
  scene_visual = $r9865_13_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad divertida y el estilo inolvidable con el que enfrentaba la vida.

Sujetos Principales
Ligeramente descentrada, la abuela {NOMBRE_DESTINATARIO} aparece como una elegante agente secreta (traje sastre negro, gafas oscuras clásicas), sosteniendo una pistola dentes, en una pose de acción encubierta muy divertida. su nieto ya adulto {NOMBRE_DEDICANTE} está detrás de ella copiando la pose, vestido como mini-agente secreto, ambos con sonrisas cómplices.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_13_fa$,
  background_details = $r9865_13_fb$Un callejón de ciudad iluminado por faroles antiguos, negro elegante y grises cinematográficos.$r9865_13_fb$,
  magic_effects = $r9865_13_fc$Las burbujas de jabón reflejan un arcoíris intenso y mágico. La magia debe sentirse juguetona y completamente integrada dentro de una fotografía realista.$r9865_13_fc$,
  lighting_color = $r9865_13_fd$Luz cinematográfica con negro elegante, grises y el reflejo multicolor de las burbujas flotando.$r9865_13_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_13_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_13_la_constelacion_de_tus_gestos.webp$r9865_13_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_14_fn$Memoria Familiar Abuela Porque eres una Rebelde$r9865_14_fn$,
  scene_visual = $r9865_14_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite picardía, generosidad y la leyenda entrañable de una heroína del bosque.

Sujetos Principales
Ligeramente descentrada, la abuela {NOMBRE_DESTINATARIO} aparece como una heroína del bosque estilo Robin Hood (capucha verde, chaleco de cuero desgastado), sosteniendo un arco de madera con una flecha de luz brillante, sonrisa pícara. A su lado, su nieta ya adulta {NOMBRE_DEDICANTE} la ayuda felizmente a repartir monedas de oro que caen de un saco. En el tronco de un árbol gigante hay un cartel antiguo que dice "SE BUSCA" con el rostro de {NOMBRE_DESTINATARIO} dibujado.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_14_fa$,
  background_details = $r9865_14_fb$Un denso bosque de robles gigantes, rayos de sol crepuscular filtrándose entre las hojas.$r9865_14_fb$,
  magic_effects = $r9865_14_fc$Las monedas de oro brillan intensamente con polvo de hadas y la punta de la flecha es luz pura. La magia debe sentirse pícara y completamente integrada dentro de una fotografía realista.$r9865_14_fc$,
  lighting_color = $r9865_14_fd$Verdes profundos, marrones rústicos, dorado brillante y luz de atardecer.$r9865_14_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_14_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_14_la_carta_que_sigo_escribiendo.webp$r9865_14_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_15_fn$Memoria Familiar Abuela Porque eres Alegre$r9865_15_fn$,
  scene_visual = $r9865_15_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría desbordante y la magia de convertir hasta la lluvia en una fiesta.

Sujetos Principales
Ligeramente descentrada, la abuela {NOMBRE_DESTINATARIO}, con un elegante abrigo vintage, sostiene un paraguas negro suspendida en pleno paso de baile mientras salpica en un charco grande. su nieto ya adulto {NOMBRE_DEDICANTE} baila alegremente a su lado con botas de lluvia amarillas, ambos con expresiones de pura felicidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_15_fa$,
  background_details = $r9865_15_fb$Una calle de ciudad al atardecer, lloviendo suavemente, faroles iluminando la lluvia con reflejos perfectos en los charcos.$r9865_15_fb$,
  magic_effects = $r9865_15_fc$Las gotas de lluvia iluminadas parecen polvo de estrellas y las salpicaduras brillan con luz propia dorada. La magia debe sentirse festiva y completamente integrada dentro de una fotografía realista.$r9865_15_fc$,
  lighting_color = $r9865_15_fd$Azul petróleo para el atardecer, amarillos vibrantes y reflejos plateados del agua.$r9865_15_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_15_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_15_la_fotografia_que_respira_contigo.webp$r9865_15_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_16_fn$Memoria Familiar Abuela Porque eres mi Guardiana de Historias$r9865_16_fn$,
  scene_visual = $r9865_16_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite nostalgia mágica y la calidez de quien guardaba cada recuerdo familiar como un tesoro.

Sujetos Principales
Ligeramente descentrada, la abuela {NOMBRE_DESTINATARIO}, con un elegante abrigo cálido, está en un estudio de luz tenue extrayendo hilos de luz dorada desde un grueso libro antiguo abierto. su nieta ya adulta {NOMBRE_DEDICANTE} está maravillada mientras esos hilos flotan y forman pequeñas proyecciones de momentos felices familiares.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_16_fa$,
  background_details = $r9865_16_fb$Un despacho acogedor, estanterías repletas de libros, chimenea encendida, atmósfera nostálgica.$r9865_16_fb$,
  magic_effects = $r9865_16_fc$Los hilos de luz dorada flotan en espiral y sutiles siluetas doradas de la familia se forman en el aire. La magia debe sentirse nostálgica y completamente integrada dentro de una fotografía realista.$r9865_16_fc$,
  lighting_color = $r9865_16_fd$Marrones cálidos, fuego ámbar y la luz dorada y pura de los recuerdos.$r9865_16_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_16_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_16_el_camino_que_dejaste_abierto.webp$r9865_16_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_17_fn$Memoria Familiar Abuela Porque eres mi Raíz y mi Fuerza$r9865_17_fn$,
  scene_visual = $r9865_17_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite arraigo, fortaleza y la certeza de que su esencia sigue dando vida y sostén a la familia.

Sujetos Principales
Ligeramente descentrada, la abuela {NOMBRE_DESTINATARIO} está de pie frente a un árbol milenario gigante que emite una luz dorada y cálida (su aura y la luz del árbol se fusionan), entregando tiernamente a su nieto ya adulto {NOMBRE_DEDICANTE} una pequeña flor brillante. {NOMBRE_DEDICANTE} la recibe con ambas manos, con reverencia y amor.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_17_fa$,
  background_details = $r9865_17_fb$El interior de un bosque místico nocturno, raíces gigantes cubiertas de musgo esmeralda, ambiente de reverencia y conexión ancestral.$r9865_17_fb$,
  magic_effects = $r9865_17_fc$Miles de luciérnagas flotan alrededor del árbol y de {NOMBRE_DESTINATARIO}, y la flor en sus manos emite un destello de luz pura. La magia debe sentirse ancestral y completamente integrada dentro de una fotografía realista.$r9865_17_fc$,
  lighting_color = $r9865_17_fd$Verde jade profundo, azul medianoche y dorado incandescente.$r9865_17_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_17_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_17_la_luz_que_no_se_apaga.webp$r9865_17_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_18_fn$Memoria Familiar Abuela Porque eres mi Estrella Guía$r9865_18_fn$,
  scene_visual = $r9865_18_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo celestial y la certeza de que su luz sigue guiando cada paso desde el cielo.

Sujetos Principales
su nieta ya adulta {NOMBRE_DEDICANTE} está de pie en lo alto de una colina cubierta de hierba en la oscuridad de la noche, mirando con asombro un cielo deslumbrante. En el firmamento, las estrellas y nebulosas se organizan sutil y majestuosamente para formar el rostro gigante, protector y sonriente de la abuela {NOMBRE_DESTINATARIO}.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_18_fa$,
  background_details = $r9865_18_fb$Noche estrellada épica, vía láctea visible, colina verde oscura contrastando con el brillo del cosmos.$r9865_18_fb$,
  magic_effects = $r9865_18_fc$La formación del rostro es etérea, hecha enteramente de cúmulos de estrellas y polvo de nebulosa. La magia debe sentirse celestial y completamente integrada dentro de una fotografía realista.$r9865_18_fc$,
  lighting_color = $r9865_18_fd$Negro espacial, violetas profundos, azules cósmicos y plata brillante de las estrellas.$r9865_18_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_18_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_18_el_abrazo_que_aprendi_de_ti.webp$r9865_18_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_19_fn$Memoria Familiar Abuela Porque eres mi Viajera del Tiempo$r9865_19_fn$,
  scene_visual = $r9865_19_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite nostalgia entrañable y la sensación de que el tiempo junto a ella nunca alcanza.

Sujetos Principales
Ligeramente descentrada, la abuela {NOMBRE_DESTINATARIO}, vestida como una elegante viajera del tiempo (gabardina clásica, chaleco, reloj de bolsillo), está en el andén de una estación antigua frente a un tren de luz dorada y vapor, entregando un reloj de bolsillo brillante a su nieto ya adulto {NOMBRE_DEDICANTE}, mientras decenas de relojes antiguos flotan congelados en el aire alrededor de ellos.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_19_fa$,
  background_details = $r9865_19_fb$Una estación de tren de hierro forjado estilo victoriano, niebla y vapor mágico llenando el andén.$r9865_19_fb$,
  magic_effects = $r9865_19_fc$Relojes de bolsillo y engranajes flotan sin gravedad, y el tren está hecho de luz pura. La magia debe sentirse nostálgica y completamente integrada dentro de una fotografía realista.$r9865_19_fc$,
  lighting_color = $r9865_19_fd$Bronce, cobre, grises misteriosos y el destello cálido y dorado de la maquinaria temporal.$r9865_19_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_19_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_19_el_lugar_donde_vuelvo_a_encontrarte.webp$r9865_19_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9865_20_fn$Memoria Familiar Abuela Porque eres mi Ángel Guardián$r9865_20_fn$,
  scene_visual = $r9865_20_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz absoluta, consuelo y el amor eterno que trasciende la partida física.

Sujetos Principales
Ligeramente descentrada, la abuela {NOMBRE_DESTINATARIO} aparece de forma etérea y translúcida, vestida con ropas blancas y simples, con una sutil aura brillante y alas hechas puramente de luz difusa, abrazando tiernamente y con infinita paz a su nieta ya adulta {NOMBRE_DEDICANTE}. {NOMBRE_DEDICANTE} cierra los ojos con una expresión de total consuelo, amor y tranquilidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9865_20_fa$,
  background_details = $r9865_20_fb$Un cielo de nubes esponjosas en tonos durazno, lavanda y rosa pastel suave, efecto atardecer divino.$r9865_20_fb$,
  magic_effects = $r9865_20_fc$Un aura de luz dorada muy suave envuelve a ambas, con partículas de luz celestial cayendo como polvo brillante. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$r9865_20_fc$,
  lighting_color = $r9865_20_fd$Luz reconfortante, suave y envolvente, con durazno, lavanda y rosa pastel.$r9865_20_fd$,
  updated_at = now()
WHERE template_preview_key = $r9865_20_fk$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_20_siempre_en_mi_corazon.webp$r9865_20_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_1_mn$Memoria Familiar Padre Porque eres mi Superhéroe$r9866_1_mn$,
  scene_visual = $r9866_1_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra al padre como el superhéroe protector que siempre fue, un homenaje lleno de fuerza y ternura.

Sujetos Principales
Ligeramente descentrado, el padre {NOMBRE_DESTINATARIO} vuela con un traje de superhéroe original en tonos dorados y azul profundo con detalles plateados, capa larga ondeando, símbolo de corazón brillante en el pecho, sobre una ciudad iluminada al atardecer. A su lado, su hija ya adulta {NOMBRE_DEDICANTE} vuela sostenida de su mano, mirándolo con admiración y una sonrisa de total seguridad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_1_ma$,
  background_details = $r9866_1_mb$Una ciudad moderna vista desde el cielo al atardecer, nubes esponjosas en tonos naranjas, morados y dorados, rayos de sol atravesando las nubes.$r9866_1_mb$,
  magic_effects = $r9866_1_mc$Una estela de luz suave se despliega detrás de la capa de {NOMBRE_DESTINATARIO}, con pequeñas partículas doradas flotando en el aire. La magia debe sentirse heroica y completamente integrada dentro de una fotografía realista.$r9866_1_mc$,
  lighting_color = $r9866_1_md$Iluminación cinematográfica cálida y heroica de atardecer, con dorados intensos, naranjas y morados suaves.$r9866_1_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_1_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_01_el_faro_que_aun_me_guia.webp$r9866_1_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_2_mn$Memoria Familiar Padre Porque eres mi Guía$r9866_2_mn$,
  scene_visual = $r9866_2_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sabiduría, protección y el consuelo de sentir el camino siempre iluminado por su recuerdo.

Sujetos Principales
Ligeramente descentrado, el padre {NOMBRE_DESTINATARIO} camina como un sabio guía, con un abrigo elegante y atemporal, sosteniendo un farolillo antiguo o un báculo delicado que emite luz brillante, iluminando el sendero. su hijo ya adulto {NOMBRE_DEDICANTE} camina un paso atrás, sintiéndose protegido y mirando el camino iluminado con asombro y paz.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_2_ma$,
  background_details = $r9866_2_mb$Un sendero dentro de un bosque místico al atardecer, árboles antiguos gigantes, raíces pronunciadas y flores luminosas.$r9866_2_mb$,
  magic_effects = $r9866_2_mc$La luz del farolillo brilla iluminando las hojas cercanas y luciérnagas doradas flotan suavemente alrededor del sendero. La magia debe sentirse sabia y completamente integrada dentro de una fotografía realista.$r9866_2_mc$,
  lighting_color = $r9866_2_md$Iluminación cálida de atardecer en el bosque, con azules profundos, violetas suaves y el contraste dorado que emana del farolillo.$r9866_2_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_2_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_02_la_ruta_de_tus_pasos_buenos.webp$r9866_2_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_3_mn$Memoria Familiar Padre Porque eres un Hechicero$r9866_3_mn$,
  scene_visual = $r9866_3_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro, sabiduría y la magia entrañable de quien convertía lo cotidiano en algo extraordinario.

Sujetos Principales
Ligeramente descentrado, el padre {NOMBRE_DESTINATARIO} aparece como un elegante hechicero, con una túnica sofisticada de detalles en plata o dorado, de pie frente a un atril antiguo con un gran libro de hechizos abierto, sosteniendo una varita delicada. su hija ya adulta {NOMBRE_DEDICANTE} está a su lado, asomándose al libro con ojos llenos de asombro.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_3_ma$,
  background_details = $r9866_3_mb$Un estudio mágico o biblioteca antigua, estanterías de madera oscura llenas de libros, frascos de cristal con pociones de colores, pergaminos y flores secas.$r9866_3_mb$,
  magic_effects = $r9866_3_mc$Símbolos dorados y mariposas de luz flotan sutilmente sobre el libro abierto, con un brillo suave en las botellas de cristal del fondo. La magia debe sentirse intelectual y completamente integrada dentro de una fotografía realista.$r9866_3_mc$,
  lighting_color = $r9866_3_md$Luz cálida de velas y el brillo mágico que sale del libro central, con marrones oscuros, púrpuras y dorados intensos.$r9866_3_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_3_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_03_el_jardin_de_tus_fechas_queridas.webp$r9866_3_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_4_mn$Memoria Familiar Padre Porque eres un Rey Líder$r9866_4_mn$,
  scene_visual = $r9866_4_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad, justicia y el orgullo de haber sido guiados por su fuerza y su voz de mando.

Sujetos Principales
Ligeramente descentrado, el padre {NOMBRE_DESTINATARIO} aparece como un imponente rey egipcio, con tocado dorado Nemes, túnica blanca de lino y collares lujosos de oro y turquesa, sentado en un trono dorado ornamentado sosteniendo un cetro. su hijo ya adulto {NOMBRE_DEDICANTE} está de pie a su lado, con vestimenta egipcia elegante a juego, mirándolo con orgullo y respeto.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_4_ma$,
  background_details = $r9866_4_mb$Un palacio monumental abierto, enormes pirámides bajo un cielo cálido de desierto despejado, sol brillante iluminando el oro del trono.$r9866_4_mb$,
  magic_effects = $r9866_4_mc$Sutiles destellos de sol rebotan en el oro de las joyas y el trono, con polvo fino brillando en la luz cálida. La magia debe sentirse majestuosa y completamente integrada dentro de una fotografía realista.$r9866_4_mc$,
  lighting_color = $r9866_4_md$Luz de desierto vibrante con dorados intensos, tonos arena, blanco brillante y acentos de turquesa/azul cobalto.$r9866_4_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_4_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_04_el_manto_de_tus_historias.webp$r9866_4_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_5_mn$Memoria Familiar Padre Porque eres Encantador$r9866_5_mn$,
  scene_visual = $r9866_5_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite elegancia, calidez y el encanto sereno que curaba cualquier pena con solo una sonrisa.

Sujetos Principales
Ligeramente descentrado, el padre {NOMBRE_DESTINATARIO} luce como un elegante príncipe o noble, con un traje de gala deslumbrante y fluido, de pie a mitad de una imponente escalera de mármol de palacio, extendiendo la mano gentilmente hacia su hija ya adulta {NOMBRE_DEDICANTE}, quien viste ropa formal de gala y le devuelve la sonrisa subiendo a su lado.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_5_ma$,
  background_details = $r9866_5_mb$El interior de un palacio majestuoso, candelabros de cristal gigantes, columnas de mármol blanco, escaleras curvas con pasamanos dorados.$r9866_5_mb$,
  magic_effects = $r9866_5_mc$Destellos de luz sutiles se reflejan en los candelabros y los detalles del traje. La magia debe sentirse elegante y completamente integrada dentro de una fotografía realista.$r9866_5_mc$,
  lighting_color = $r9866_5_md$Luz cálida, festiva y de ensueño, con blanco perla, dorado, plata y tonos cristalinos.$r9866_5_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_5_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_05_la_lampara_de_tu_cuidado.webp$r9866_5_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_6_mn$Memoria Familiar Padre Porque eres Aventurero$r9866_6_mn$,
  scene_visual = $r9866_6_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite emoción, curiosidad y el espíritu aventurero que convertía cualquier lugar en un descubrimiento.

Sujetos Principales
Ligeramente descentrado, el padre {NOMBRE_DESTINATARIO} aparece vestido como un clásico explorador aventurero (sombrero fedora marrón, chaqueta de cuero desgastada, camisa caqui), sosteniendo un mapa antiguo, frente a la entrada de un templo cubierto de enredaderas, descubriendo un tesoro dorado que brilla en la penumbra. su hijo ya adulto {NOMBRE_DEDICANTE}, vestido también de explorador, sonríe a su lado con espíritu de aventura.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_6_ma$,
  background_details = $r9866_6_mb$Una selva densa y misteriosa, ruinas de piedra antigua tallada, luz penetrando entre el follaje de árboles gigantes.$r9866_6_mb$,
  magic_effects = $r9866_6_mc$Un haz de luz ilumina el tesoro y el rostro de {NOMBRE_DESTINATARIO}, con polvo flotante iluminado. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$r9866_6_mc$,
  lighting_color = $r9866_6_md$Luz cálida filtrada entre el follaje, con verdes profundos, marrones tierra y el brillo dorado del tesoro.$r9866_6_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_6_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_06_el_archivo_luminoso_de_tu_voz.webp$r9866_6_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_7_mn$Memoria Familiar Padre Porque eres Divertido$r9866_7_mn$,
  scene_visual = $r9866_7_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría pura, fantasía y el alma juguetona que nunca dejó de sonreír.

Sujetos Principales
Ligeramente descentrado, el padre {NOMBRE_DESTINATARIO} monta un dragón amistoso de colores mágicos, riendo a carcajadas, el cabello volando por el viento. su hija ya adulta {NOMBRE_DEDICANTE} vuela a su lado montando un unicornio brillante, también riendo con pura felicidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_7_ma$,
  background_details = $r9866_7_mb$Un mundo de fantasía brillante y colorido, valles verdes, arcoíris cruzando el cielo, castillos de cristal a lo lejos.$r9866_7_mb$,
  magic_effects = $r9866_7_mc$Polvo de hadas cae desde las criaturas fantásticas y burbujas flotan en el aire. La magia debe sentirse juguetona y completamente integrada dentro de una fotografía realista.$r9866_7_mc$,
  lighting_color = $r9866_7_md$Luz de día soleado y radiante, con rosas, celestes, dorados y verdes esmeralda vibrantes.$r9866_7_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_7_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_07_la_silla_donde_vuelve_tu_risa.webp$r9866_7_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_8_mn$Memoria Familiar Padre Porque cumples mis Deseos$r9866_8_mn$,
  scene_visual = $r9866_8_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura mágica, gratitud y el consuelo de saber que sigue cuidando cada deseo del corazón.

Sujetos Principales
Ligeramente descentrado, su hijo ya adulto {NOMBRE_DEDICANTE} sostiene una antigua lámpara mágica de bronce de la cual emerge una nube de humo brillante azul y dorado. De esa nube emerge el padre {NOMBRE_DESTINATARIO} como un cálido genio protector, sonriendo con los brazos extendidos, atuendo de sedas elegantes. Ambos se miran con profunda conexión.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_8_ma$,
  background_details = $r9866_8_mb$Un cielo nocturno estrellado sobre una terraza de palacio árabe iluminada por la luna, atmósfera mística y cálida.$r9866_8_mb$,
  magic_effects = $r9866_8_mc$El humo de la lámpara guarda estrellas sutiles y destellos dorados en su interior. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$r9866_8_mc$,
  lighting_color = $r9866_8_md$Atmósfera nocturna mística con azules noche, púrpuras, dorados brillantes y humo azul cian translúcido.$r9866_8_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_8_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_08_el_puente_de_nuestras_conversaciones.webp$r9866_8_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_9_mn$Memoria Familiar Padre Porque eres Valiente$r9866_9_mn$,
  scene_visual = $r9866_9_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza, protección y el valor incondicional que hacía sentir a salvo del mundo entero.

Sujetos Principales
Ligeramente descentrado, el padre {NOMBRE_DESTINATARIO} aparece como un imponente guerrero medieval, con armadura de plata brillante (sin casco, rostro visible), sosteniendo una espada de luz y un gran escudo que protege a su hija ya adulta {NOMBRE_DEDICANTE}, quien está a su lado admirando su valor mientras un dragón escupe fuego que el escudo bloquea creando una barrera de energía brillante.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_9_ma$,
  background_details = $r9866_9_mb$Un paisaje montañoso dramático, nubes oscuras de tormenta, pero con luz cálida y poderosa emanando del escudo de {NOMBRE_DESTINATARIO}.$r9866_9_mb$,
  magic_effects = $r9866_9_mc$Chispas de fuego rebotan en un campo de fuerza sutil que genera el escudo. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9866_9_mc$,
  lighting_color = $r9866_9_md$Grises metálicos, fuego naranja/rojo y luz dorada/blanca pura de protección.$r9866_9_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_9_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_09_la_ventana_donde_te_recuerdo.webp$r9866_9_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_10_mn$Memoria Familiar Padre Porque eres un Soñador$r9866_10_mn$,
  scene_visual = $r9866_10_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz, esperanza y la serenidad de un alma que siempre creyó en un mundo mejor.

Sujetos Principales
Ligeramente descentrado, el padre {NOMBRE_DESTINATARIO}, vestido con ropa ligera y clara, está de pie en un campo infinito de flores primaverales, sosteniendo una paloma blanca a punto de emprender el vuelo. Con el otro brazo abraza por los hombros a su hijo ya adulto {NOMBRE_DEDICANTE}, ambos mirando un espectacular arcoíris doble en el cielo.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_10_ma$,
  background_details = $r9866_10_mb$Un campo verde vibrante cubierto de flores silvestres, cielo azul radiante recién despejado tras la lluvia, cruzado por un arcoíris brillante.$r9866_10_mb$,
  magic_effects = $r9866_10_mc$Un ligero resplandor suave bordea la paloma blanca y hay un brillo sutil de rocío en las flores. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$r9866_10_mc$,
  lighting_color = $r9866_10_md$Iluminación suave, natural y angelical, con blancos puros, celestes, verdes frescos y los tonos pastel del arcoíris.$r9866_10_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_10_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_10_el_mapa_de_tu_legado.webp$r9866_10_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_11_mn$Memoria Familiar Padre Porque me haces sentir a Salvo$r9866_11_mn$,
  scene_visual = $r9866_11_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite protección absoluta, fuerza y la certeza de estar siempre a salvo bajo su cuidado.

Sujetos Principales
Ligeramente descentrado, el padre {NOMBRE_DESTINATARIO} aparece como un poderoso dios del trueno (armadura nórdica elegante, capa roja ondeante), sosteniendo un martillo místico que emite relámpagos controlados. su hija ya adulta {NOMBRE_DEDICANTE} está bajo su brazo protector, sintiéndose totalmente a salvo y mirando al frente con confianza.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_11_ma$,
  background_details = $r9866_11_mb$Un acantilado mitológico con cielo tormentoso de fondo, pero donde está {NOMBRE_DESTINATARIO} hay luz pura, relámpagos azules y blancos en la distancia.$r9866_11_mb$,
  magic_effects = $r9866_11_mc$Relámpagos finos de luz azul rodean el martillo y los ojos de {NOMBRE_DESTINATARIO} reflejan una luz suave. La magia debe sentirse poderosa y completamente integrada dentro de una fotografía realista.$r9866_11_mc$,
  lighting_color = $r9866_11_md$Atmósfera poderosa y protectora, con gris tormenta, azul eléctrico, plata metálica y rojo intenso.$r9866_11_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_11_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_11_la_mesa_que_guarda_tu_nombre.webp$r9866_11_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_12_mn$Memoria Familiar Padre Porque eres Generoso$r9866_12_mn$,
  scene_visual = $r9866_12_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite calidez festiva y la generosidad infinita de quien nunca dejó de dar amor.

Sujetos Principales
Ligeramente descentrado, el padre {NOMBRE_DESTINATARIO} aparece como un elegante y abrigado Papá Noel (traje rojo de terciopelo, ribetes blancos mullidos), sosteniendo un saco antiguo del que salen luces mágicas y cajas de regalos envueltas. su hijo ya adulto {NOMBRE_DEDICANTE} lo abraza fuertemente en un entorno nevado, recibiendo un regalo con una cara de ilusión absoluta.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_12_ma$,
  background_details = $r9866_12_mb$Un paisaje nevado de invierno al atardecer, la puerta de una cabaña cálidamente iluminada, copos de nieve cayendo suavemente.$r9866_12_mb$,
  magic_effects = $r9866_12_mc$El interior del saco brilla con una luz dorada y mágica y los copos de nieve brillan sutilmente. La magia debe sentirse festiva y completamente integrada dentro de una fotografía realista.$r9866_12_mc$,
  lighting_color = $r9866_12_md$Luces cálidas doradas en contraste con la nieve azul/blanca, con rojo terciopelo, blanco nieve y oro cálido.$r9866_12_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_12_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_12_el_refugio_de_tus_consejos.webp$r9866_12_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_13_mn$Memoria Familiar Padre Porque eres Atrevido$r9866_13_mn$,
  scene_visual = $r9866_13_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad divertida y el estilo inolvidable con el que enfrentaba la vida.

Sujetos Principales
Ligeramente descentrado, el padre {NOMBRE_DESTINATARIO} aparece como un elegante agente secreto (traje sastre negro, gafas oscuras clásicas), sosteniendo un elegante lanzador de burbujas en forma de bolígrafo del que brotan burbujas iridiscentes, en una pose de espía sofisticada y muy divertida. su hija ya adulta {NOMBRE_DEDICANTE} está detrás de él copiando la pose, vestida como mini-agente, ambos con sonrisas cómplices.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_13_ma$,
  background_details = $r9866_13_mb$Un callejón de ciudad iluminado por faroles antiguos, negro elegante y grises cinematográficos.$r9866_13_mb$,
  magic_effects = $r9866_13_mc$Las burbujas de jabón reflejan un arcoíris intenso y mágico. La magia debe sentirse juguetona y completamente integrada dentro de una fotografía realista.$r9866_13_mc$,
  lighting_color = $r9866_13_md$Luz cinematográfica con negro elegante, grises y el reflejo multicolor de las burbujas flotando.$r9866_13_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_13_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_13_la_constelacion_de_tus_gestos.webp$r9866_13_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_14_mn$Memoria Familiar Padre Porque eres un Rebelde$r9866_14_mn$,
  scene_visual = $r9866_14_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite picardía, generosidad y la leyenda entrañable de un héroe del bosque.

Sujetos Principales
Ligeramente descentrado, el padre {NOMBRE_DESTINATARIO} aparece como un héroe del bosque estilo Robin Hood (capucha verde, chaleco de cuero rústico), sosteniendo un arco de madera con una flecha de luz brillante, sonrisa pícara y valiente. A su lado, su hijo ya adulto {NOMBRE_DEDICANTE} lo ayuda felizmente a repartir monedas de oro que caen de un saco. En el tronco de un árbol gigante hay un cartel antiguo que dice "SE BUSCA" con el rostro de {NOMBRE_DESTINATARIO} dibujado.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_14_ma$,
  background_details = $r9866_14_mb$Un denso bosque legendario, rayos de sol crepuscular filtrándose entre las hojas de robles gigantes.$r9866_14_mb$,
  magic_effects = $r9866_14_mc$Las monedas de oro brillan intensamente con polvo de hadas y la punta de la flecha es luz pura. La magia debe sentirse pícara y completamente integrada dentro de una fotografía realista.$r9866_14_mc$,
  lighting_color = $r9866_14_md$Verdes profundos, marrones rústicos, dorado brillante y luz de atardecer.$r9866_14_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_14_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_14_la_carta_que_sigo_escribiendo.webp$r9866_14_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_15_mn$Memoria Familiar Padre Porque eres Alegre$r9866_15_mn$,
  scene_visual = $r9866_15_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría desbordante y la magia de convertir hasta la lluvia en una fiesta.

Sujetos Principales
Ligeramente descentrado, el padre {NOMBRE_DESTINATARIO}, con un elegante atuendo vintage, sostiene un paraguas brillante suspendido en pleno paso de baile mientras salpica en un charco grande. su hija ya adulta {NOMBRE_DEDICANTE} baila alegremente a su lado con botas de lluvia coloridas, ambos con expresiones de pura felicidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_15_ma$,
  background_details = $r9866_15_mb$Una calle de ciudad empedrada al atardecer, lloviendo suavemente, faroles iluminando la lluvia con reflejos perfectos en los charcos.$r9866_15_mb$,
  magic_effects = $r9866_15_mc$Las gotas de lluvia iluminadas parecen polvo de estrellas y las salpicaduras brillan con luz propia dorada. La magia debe sentirse festiva y completamente integrada dentro de una fotografía realista.$r9866_15_mc$,
  lighting_color = $r9866_15_md$Azul petróleo para el atardecer, amarillos/rojos vibrantes y reflejos plateados del agua.$r9866_15_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_15_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_15_la_fotografia_que_respira_contigo.webp$r9866_15_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_16_mn$Memoria Familiar Padre Porque eres mi Guardián de Historias$r9866_16_mn$,
  scene_visual = $r9866_16_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite nostalgia mágica y la calidez de quien guardaba cada recuerdo familiar como un tesoro.

Sujetos Principales
Ligeramente descentrado, el padre {NOMBRE_DESTINATARIO}, con ropa elegante y atemporal, está en un estudio de luz tenue extrayendo hilos de luz dorada desde un grueso libro antiguo abierto. su hijo ya adulto {NOMBRE_DEDICANTE} está maravillado mientras esos hilos flotan y forman pequeñas proyecciones de momentos felices familiares.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_16_ma$,
  background_details = $r9866_16_mb$Un despacho acogedor, estanterías repletas de libros, chimenea encendida, atmósfera nostálgica.$r9866_16_mb$,
  magic_effects = $r9866_16_mc$Los hilos de luz dorada flotan en espiral y sutiles siluetas doradas de la familia se forman en el aire. La magia debe sentirse nostálgica y completamente integrada dentro de una fotografía realista.$r9866_16_mc$,
  lighting_color = $r9866_16_md$Marrones cálidos, fuego ámbar y la luz dorada y pura de los recuerdos.$r9866_16_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_16_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_16_el_camino_que_dejaste_abierto.webp$r9866_16_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_17_mn$Memoria Familiar Padre Porque eres mi Raíz y mi Fuerza$r9866_17_mn$,
  scene_visual = $r9866_17_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite arraigo, fortaleza y la certeza de que su esencia sigue dando vida y sostén a la familia.

Sujetos Principales
Ligeramente descentrado, el padre {NOMBRE_DESTINATARIO} está de pie frente a un árbol milenario gigante que emite una luz dorada y cálida (su aura y la luz del árbol se fusionan), entregando tiernamente a su hija ya adulta {NOMBRE_DEDICANTE} una pequeña flor brillante. {NOMBRE_DEDICANTE} la recibe con ambas manos, con reverencia y amor.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_17_ma$,
  background_details = $r9866_17_mb$El interior de un bosque místico nocturno, raíces gigantes cubiertas de musgo esmeralda, ambiente de reverencia y conexión ancestral.$r9866_17_mb$,
  magic_effects = $r9866_17_mc$Miles de luciérnagas flotan alrededor del árbol y de {NOMBRE_DESTINATARIO}, y la flor en sus manos emite un destello de luz pura. La magia debe sentirse ancestral y completamente integrada dentro de una fotografía realista.$r9866_17_mc$,
  lighting_color = $r9866_17_md$Verde jade profundo, azul medianoche y dorado incandescente.$r9866_17_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_17_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_17_la_luz_que_no_se_apaga.webp$r9866_17_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_18_mn$Memoria Familiar Padre Porque eres mi Estrella Guía$r9866_18_mn$,
  scene_visual = $r9866_18_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo celestial y la certeza de que su luz sigue guiando cada paso desde el cielo.

Sujetos Principales
su hijo ya adulto {NOMBRE_DEDICANTE} está de pie en lo alto de una colina cubierta de hierba en la oscuridad de la noche, mirando con asombro un cielo deslumbrante. En el firmamento, las estrellas y nebulosas se organizan sutil y majestuosamente para formar el rostro gigante, protector y sonriente del padre {NOMBRE_DESTINATARIO}.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_18_ma$,
  background_details = $r9866_18_mb$Noche estrellada épica, vía láctea visible, colina verde oscura contrastando con el brillo del cosmos.$r9866_18_mb$,
  magic_effects = $r9866_18_mc$La formación del rostro es etérea, hecha enteramente de cúmulos de estrellas y polvo de nebulosa. La magia debe sentirse celestial y completamente integrada dentro de una fotografía realista.$r9866_18_mc$,
  lighting_color = $r9866_18_md$Negro espacial, violetas profundos, azules cósmicos y plata brillante de las estrellas.$r9866_18_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_18_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_18_el_abrazo_que_aprendi_de_ti.webp$r9866_18_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_19_mn$Memoria Familiar Padre Porque eres mi Viajero del Tiempo$r9866_19_mn$,
  scene_visual = $r9866_19_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite nostalgia entrañable y la sensación de que el tiempo junto a él nunca alcanza.

Sujetos Principales
Ligeramente descentrado, el padre {NOMBRE_DESTINATARIO}, vestido como un elegante viajero del tiempo (abrigo victoriano, chaleco, reloj de bolsillo), está en el andén de una estación antigua frente a un tren de luz dorada y vapor, entregando un reloj de bolsillo brillante a su hija ya adulta {NOMBRE_DEDICANTE}, mientras decenas de relojes antiguos flotan congelados en el aire alrededor de ellos.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_19_ma$,
  background_details = $r9866_19_mb$Una estación de tren de hierro forjado estilo victoriano, niebla y vapor mágico llenando el andén.$r9866_19_mb$,
  magic_effects = $r9866_19_mc$Relojes de bolsillo y engranajes flotan sin gravedad, y el tren está hecho de luz pura. La magia debe sentirse nostálgica y completamente integrada dentro de una fotografía realista.$r9866_19_mc$,
  lighting_color = $r9866_19_md$Bronce, cobre, grises misteriosos y el destello cálido y dorado de la maquinaria temporal.$r9866_19_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_19_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_19_el_lugar_donde_vuelvo_a_encontrarte.webp$r9866_19_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9866_20_mn$Memoria Familiar Padre Porque eres mi Ángel Guardián$r9866_20_mn$,
  scene_visual = $r9866_20_ma$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz absoluta, consuelo y el amor eterno que trasciende la partida física.

Sujetos Principales
Ligeramente descentrado, el padre {NOMBRE_DESTINATARIO} aparece de forma etérea y translúcida, vestido con ropas blancas y simples, con una sutil aura brillante y alas hechas puramente de luz difusa, abrazando tiernamente y con infinita paz a su hijo ya adulto {NOMBRE_DEDICANTE}. {NOMBRE_DEDICANTE} cierra los ojos con una expresión de total consuelo, amor y tranquilidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9866_20_ma$,
  background_details = $r9866_20_mb$Un cielo de nubes esponjosas en tonos durazno, lavanda y rosa pastel suave, efecto atardecer divino.$r9866_20_mb$,
  magic_effects = $r9866_20_mc$Un aura de luz dorada muy suave envuelve a ambos, con partículas de luz celestial cayendo como polvo brillante. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$r9866_20_mc$,
  lighting_color = $r9866_20_md$Luz reconfortante, suave y envolvente, con durazno, lavanda y rosa pastel.
$r9866_20_md$,
  updated_at = now()
WHERE template_preview_key = $r9866_20_mk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_20_siempre_en_mi_corazon.webp$r9866_20_mk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_1_fn$Memoria Familiar Madre Porque eres mi Superheroína$r9867_1_fn$,
  scene_visual = $r9867_1_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena celebra a la madre como la superheroína protectora que siempre fue, un homenaje lleno de fuerza y ternura.

Sujetos Principales
Ligeramente descentrada, la madre {NOMBRE_DESTINATARIO} vuela con un traje de superheroína original en tonos dorados y azul profundo con detalles plateados, capa larga ondeando, símbolo de corazón brillante en el pecho, sobre una ciudad iluminada al atardecer. A su lado, su hijo ya adulto {NOMBRE_DEDICANTE} vuela sostenido de su mano, mirándola con admiración y una sonrisa de total seguridad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_1_fa$,
  background_details = $r9867_1_fb$Una ciudad moderna vista desde el cielo al atardecer, nubes esponjosas en tonos naranjas, morados y dorados, rayos de sol atravesando las nubes.$r9867_1_fb$,
  magic_effects = $r9867_1_fc$Una estela de luz suave se despliega detrás de la capa de {NOMBRE_DESTINATARIO}, con pequeñas partículas doradas flotando en el aire. La magia debe sentirse heroica y completamente integrada dentro de una fotografía realista.$r9867_1_fc$,
  lighting_color = $r9867_1_fd$Iluminación cinematográfica cálida y heroica de atardecer, con dorados intensos, naranjas y morados suaves.$r9867_1_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_1_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_01_el_faro_que_aun_me_guia.webp$r9867_1_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_2_fn$Memoria Familiar Madre Porque eres mi Guía$r9867_2_fn$,
  scene_visual = $r9867_2_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite sabiduría, protección y el consuelo de sentir el camino siempre iluminado por su recuerdo.

Sujetos Principales
Ligeramente descentrada, la madre {NOMBRE_DESTINATARIO} camina como una guía mística, con un vestido largo y etéreo en tonos claros o perla, sosteniendo un farolillo antiguo o un báculo delicado que emite luz brillante, iluminando el sendero. su hijo ya adulto {NOMBRE_DEDICANTE} camina un paso atrás, sintiéndose protegido y mirando el camino iluminado con asombro y paz.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_2_fa$,
  background_details = $r9867_2_fb$Un sendero dentro de un bosque místico al atardecer, árboles antiguos gigantes, raíces pronunciadas y flores luminosas.$r9867_2_fb$,
  magic_effects = $r9867_2_fc$La luz del farolillo brilla iluminando las hojas cercanas y luciérnagas doradas flotan suavemente alrededor del sendero. La magia debe sentirse sabia y completamente integrada dentro de una fotografía realista.$r9867_2_fc$,
  lighting_color = $r9867_2_fd$Iluminación cálida de atardecer en el bosque, con azules profundos, violetas suaves y el contraste dorado que emana del farolillo.$r9867_2_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_2_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_02_la_ruta_de_tus_pasos_buenos.webp$r9867_2_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_3_fn$Memoria Familiar Madre Porque eres una Hechicera$r9867_3_fn$,
  scene_visual = $r9867_3_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro, sabiduría y la magia entrañable de quien convertía lo cotidiano en algo extraordinario.

Sujetos Principales
Ligeramente descentrada, la madre {NOMBRE_DESTINATARIO} aparece como una elegante hechicera, con una túnica sofisticada de detalles en plata o dorado, de pie frente a un atril antiguo con un gran libro de hechizos abierto, sosteniendo una varita delicada. su hijo ya adulto {NOMBRE_DEDICANTE} está a su lado, asomándose al libro con ojos llenos de asombro.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_3_fa$,
  background_details = $r9867_3_fb$Un estudio mágico o biblioteca antigua, estanterías de madera oscura llenas de libros, frascos de cristal con pociones de colores, pergaminos y flores secas.$r9867_3_fb$,
  magic_effects = $r9867_3_fc$Símbolos dorados y mariposas de luz flotan sutilmente sobre el libro abierto, con un brillo suave en las botellas de cristal del fondo. La magia debe sentirse intelectual y completamente integrada dentro de una fotografía realista.$r9867_3_fc$,
  lighting_color = $r9867_3_fd$Luz cálida de velas y el brillo mágico que sale del libro central, con marrones oscuros, púrpuras y dorados intensos.$r9867_3_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_3_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_03_el_jardin_de_tus_fechas_queridas.webp$r9867_3_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_4_fn$Memoria Familiar Madre Porque eres una Reina Líder$r9867_4_fn$,
  scene_visual = $r9867_4_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite majestuosidad, justicia y el orgullo de haber sido guiados por su fuerza y su voz de mando.

Sujetos Principales
Ligeramente descentrada, la madre {NOMBRE_DESTINATARIO} aparece como una imponente reina egipcia, con tocado dorado Nemes, vestido blanco de lino y collares lujosos de oro y turquesa, sentada en un trono dorado ornamentado sosteniendo un cetro. su hijo ya adulto {NOMBRE_DEDICANTE} está de pie a su lado, con vestimenta egipcia elegante a juego, mirándola con orgullo y respeto.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_4_fa$,
  background_details = $r9867_4_fb$Un palacio monumental abierto, enormes pirámides bajo un cielo cálido de desierto despejado, sol brillante iluminando el oro del trono.$r9867_4_fb$,
  magic_effects = $r9867_4_fc$Sutiles destellos de sol rebotan en el oro de las joyas y el trono, con polvo fino brillando en la luz cálida. La magia debe sentirse majestuosa y completamente integrada dentro de una fotografía realista.$r9867_4_fc$,
  lighting_color = $r9867_4_fd$Luz de desierto vibrante con dorados intensos, tonos arena, blanco brillante y acentos de turquesa/azul cobalto.$r9867_4_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_4_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_04_el_manto_de_tus_historias.webp$r9867_4_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_5_fn$Memoria Familiar Madre Porque eres Encantadora$r9867_5_fn$,
  scene_visual = $r9867_5_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite elegancia, calidez y el encanto sereno que curaba cualquier pena con solo una sonrisa.

Sujetos Principales
Ligeramente descentrada, la madre {NOMBRE_DESTINATARIO} luce como una elegante princesa o reina de cuento, con un vestido de gala deslumbrante y fluido, con una pequeña tiara, de pie a mitad de una imponente escalera de mármol de palacio, extendiendo la mano gentilmente hacia su hijo ya adulto {NOMBRE_DEDICANTE}, quien viste ropa formal de gala y le devuelve la sonrisa subiendo a su lado.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_5_fa$,
  background_details = $r9867_5_fb$El interior de un palacio majestuoso, candelabros de cristal gigantes, columnas de mármol blanco, escaleras curvas con pasamanos dorados.$r9867_5_fb$,
  magic_effects = $r9867_5_fc$Destellos de luz sutiles se reflejan en los candelabros y los detalles del vestido. La magia debe sentirse elegante y completamente integrada dentro de una fotografía realista.$r9867_5_fc$,
  lighting_color = $r9867_5_fd$Luz cálida, festiva y de ensueño, con blanco perla, dorado, plata y tonos cristalinos.$r9867_5_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_5_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_05_la_lampara_de_tu_cuidado.webp$r9867_5_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_6_fn$Memoria Familiar Madre Porque eres Aventurera$r9867_6_fn$,
  scene_visual = $r9867_6_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite emoción, curiosidad y el espíritu aventurero que convertía cualquier lugar en un descubrimiento.

Sujetos Principales
Ligeramente descentrada, la madre {NOMBRE_DESTINATARIO} aparece vestida como una clásica exploradora aventurera (sombrero fedora marrón, chaqueta de cuero desgastada, camisa caqui), sosteniendo un mapa antiguo, frente a la entrada de un templo cubierto de enredaderas, descubriendo un tesoro dorado que brilla en la penumbra. su hijo ya adulto {NOMBRE_DEDICANTE}, vestido también de explorador, sonríe a su lado con espíritu de aventura.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_6_fa$,
  background_details = $r9867_6_fb$Una selva densa y misteriosa, ruinas de piedra antigua tallada, luz penetrando entre el follaje de árboles gigantes.$r9867_6_fb$,
  magic_effects = $r9867_6_fc$Un haz de luz ilumina el tesoro y el rostro de {NOMBRE_DESTINATARIO}, con polvo flotante iluminado. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$r9867_6_fc$,
  lighting_color = $r9867_6_fd$Luz cálida filtrada entre el follaje, con verdes profundos, marrones tierra y el brillo dorado del tesoro.$r9867_6_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_6_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_06_el_archivo_luminoso_de_tu_voz.webp$r9867_6_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_7_fn$Memoria Familiar Madre Porque eres Divertida$r9867_7_fn$,
  scene_visual = $r9867_7_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría pura, fantasía y el alma juguetona que nunca dejó de sonreír.

Sujetos Principales
Ligeramente descentrada, la madre {NOMBRE_DESTINATARIO} monta un dragón amistoso de colores mágicos, riendo a carcajadas, el cabello volando por el viento. su hijo ya adulto {NOMBRE_DEDICANTE} vuela a su lado montando un unicornio brillante, también riendo con pura felicidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_7_fa$,
  background_details = $r9867_7_fb$Un mundo de fantasía brillante y colorido, valles verdes, arcoíris cruzando el cielo, castillos de cristal a lo lejos.$r9867_7_fb$,
  magic_effects = $r9867_7_fc$Polvo de hadas cae desde las criaturas fantásticas y burbujas flotan en el aire. La magia debe sentirse juguetona y completamente integrada dentro de una fotografía realista.$r9867_7_fc$,
  lighting_color = $r9867_7_fd$Luz de día soleado y radiante, con rosas, celestes, dorados y verdes esmeralda vibrantes.$r9867_7_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_7_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_07_la_silla_donde_vuelve_tu_risa.webp$r9867_7_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_8_fn$Memoria Familiar Madre Porque cumples mis Deseos$r9867_8_fn$,
  scene_visual = $r9867_8_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura mágica, gratitud y el consuelo de saber que sigue cuidando cada deseo del corazón.

Sujetos Principales
Ligeramente descentrado, su hijo ya adulto {NOMBRE_DEDICANTE} sostiene una antigua lámpara mágica de bronce de la cual emerge una nube de humo brillante azul y dorado. De esa nube emerge la madre {NOMBRE_DESTINATARIO} como una cálida genio protectora, sonriendo con los brazos extendidos, atuendo de sedas elegantes. Ambos se miran con profunda conexión.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_8_fa$,
  background_details = $r9867_8_fb$Un cielo nocturno estrellado sobre una terraza de palacio árabe iluminada por la luna, atmósfera mística y cálida.$r9867_8_fb$,
  magic_effects = $r9867_8_fc$El humo de la lámpara guarda estrellas sutiles y destellos dorados en su interior. La magia debe sentirse cálida y completamente integrada dentro de una fotografía realista.$r9867_8_fc$,
  lighting_color = $r9867_8_fd$Atmósfera nocturna mística con azules noche, púrpuras, dorados brillantes y humo azul cian translúcido.$r9867_8_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_8_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_08_el_puente_de_nuestras_conversaciones.webp$r9867_8_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_9_fn$Memoria Familiar Madre Porque eres Valiente$r9867_9_fn$,
  scene_visual = $r9867_9_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza, protección y el valor incondicional que hacía sentir a salvo del mundo entero.

Sujetos Principales
Ligeramente descentrada, la madre {NOMBRE_DESTINATARIO} aparece como una imponente reina guerrera, con armadura de plata brillante y elegante (sin casco, rostro visible), capa al viento, sosteniendo una espada de luz y un gran escudo que protege a su hijo ya adulto {NOMBRE_DEDICANTE}, quien está a su lado admirando su valor mientras un dragón escupe fuego que el escudo bloquea creando una barrera de energía brillante.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_9_fa$,
  background_details = $r9867_9_fb$Un paisaje montañoso dramático, nubes oscuras de tormenta, pero con luz cálida y poderosa emanando del escudo de {NOMBRE_DESTINATARIO}.$r9867_9_fb$,
  magic_effects = $r9867_9_fc$Chispas de fuego rebotan en un campo de fuerza sutil que genera el escudo. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$r9867_9_fc$,
  lighting_color = $r9867_9_fd$Grises metálicos, fuego naranja/rojo y luz dorada/blanca pura de protección.$r9867_9_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_9_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_09_la_ventana_donde_te_recuerdo.webp$r9867_9_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_10_fn$Memoria Familiar Madre Porque eres una Soñadora$r9867_10_fn$,
  scene_visual = $r9867_10_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz, esperanza y la serenidad de un alma que siempre creyó en un mundo mejor.

Sujetos Principales
Ligeramente descentrada, la madre {NOMBRE_DESTINATARIO}, vestida con un vestido ligero y claro (blanco o tonos pastel suaves), está de pie en un campo infinito de flores primaverales, sosteniendo una paloma blanca a punto de emprender el vuelo. Con el otro brazo abraza amorosamente a su hijo ya adulto {NOMBRE_DEDICANTE}, ambos mirando un espectacular arcoíris doble en el cielo.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_10_fa$,
  background_details = $r9867_10_fb$Un campo verde vibrante cubierto de flores silvestres, cielo azul radiante recién despejado tras la lluvia, cruzado por un arcoíris brillante.$r9867_10_fb$,
  magic_effects = $r9867_10_fc$Un ligero resplandor suave bordea la paloma blanca y hay un brillo sutil de rocío en las flores. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$r9867_10_fc$,
  lighting_color = $r9867_10_fd$Iluminación suave, natural y angelical, con blancos puros, celestes, verdes frescos y los tonos pastel del arcoíris.$r9867_10_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_10_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_10_el_mapa_de_tu_legado.webp$r9867_10_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_11_fn$Memoria Familiar Madre Porque me haces sentir a Salvo$r9867_11_fn$,
  scene_visual = $r9867_11_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite protección absoluta, fuerza y la certeza de estar siempre a salvo bajo su cuidado.

Sujetos Principales
Ligeramente descentrada, la madre {NOMBRE_DESTINATARIO} aparece como una poderosa diosa valquiria (armadura nórdica elegante, capa roja ondeante), sosteniendo un martillo místico que emite relámpagos controlados. su hijo ya adulto {NOMBRE_DEDICANTE} está bajo su brazo protector, sintiéndose totalmente a salvo y mirando al frente con confianza.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_11_fa$,
  background_details = $r9867_11_fb$Un acantilado mitológico con cielo tormentoso de fondo, pero donde está {NOMBRE_DESTINATARIO} hay luz pura, relámpagos azules y blancos en la distancia.$r9867_11_fb$,
  magic_effects = $r9867_11_fc$Relámpagos finos de luz azul rodean el martillo y los ojos de {NOMBRE_DESTINATARIO} reflejan una luz suave. La magia debe sentirse poderosa y completamente integrada dentro de una fotografía realista.$r9867_11_fc$,
  lighting_color = $r9867_11_fd$Atmósfera poderosa y protectora, con gris tormenta, azul eléctrico, plata metálica y rojo intenso.$r9867_11_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_11_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_11_la_mesa_que_guarda_tu_nombre.webp$r9867_11_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_12_fn$Memoria Familiar Madre Porque eres Generosa$r9867_12_fn$,
  scene_visual = $r9867_12_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite calidez festiva y la generosidad infinita de quien nunca dejó de dar amor.

Sujetos Principales
Ligeramente descentrada, la madre {NOMBRE_DESTINATARIO} aparece como una elegante Señora Claus o Hada de Invierno (abrigo rojo de terciopelo, ribetes blancos mullidos), sosteniendo un saco antiguo del que salen luces mágicas y cajas de regalos envueltas. su hijo ya adulto {NOMBRE_DEDICANTE} la abraza fuertemente en un entorno nevado, recibiendo un regalo con una cara de ilusión absoluta.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_12_fa$,
  background_details = $r9867_12_fb$Un paisaje nevado de invierno al atardecer, la puerta de una cabaña cálidamente iluminada, copos de nieve cayendo suavemente.$r9867_12_fb$,
  magic_effects = $r9867_12_fc$El interior del saco brilla con una luz dorada y mágica y los copos de nieve brillan sutilmente. La magia debe sentirse festiva y completamente integrada dentro de una fotografía realista.$r9867_12_fc$,
  lighting_color = $r9867_12_fd$Luces cálidas doradas en contraste con la nieve azul/blanca, con rojo terciopelo, blanco nieve y oro cálido.$r9867_12_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_12_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_12_el_refugio_de_tus_consejos.webp$r9867_12_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_13_fn$Memoria Familiar Madre Porque eres Atrevida$r9867_13_fn$,
  scene_visual = $r9867_13_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad divertida y el estilo inolvidable con el que enfrentaba la vida.

Sujetos Principales
Ligeramente descentrada, la madre {NOMBRE_DESTINATARIO} aparece como una elegante agente secreta (traje sastre negro, gafas oscuras clásicas y sofisticadas), sosteniendo una pistola dentes en lugar de balas, en una pose de acción encubierta muy divertida. su hijo ya adulto {NOMBRE_DEDICANTE} está detrás de ella copiando la pose, vestido como mini-agente, ambos con sonrisas cómplices.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_13_fa$,
  background_details = $r9867_13_fb$Un callejón de ciudad iluminado por faroles antiguos, negro elegante y grises cinematográficos.$r9867_13_fb$,
  magic_effects = $r9867_13_fc$Las burbujas de jabón reflejan un arcoíris intenso y mágico. La magia debe sentirse juguetona y completamente integrada dentro de una fotografía realista.$r9867_13_fc$,
  lighting_color = $r9867_13_fd$Luz cinematográfica con negro elegante, grises y el reflejo multicolor de las burbujas flotando.$r9867_13_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_13_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_13_la_constelacion_de_tus_gestos.webp$r9867_13_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_14_fn$Memoria Familiar Madre Porque eres una Rebelde$r9867_14_fn$,
  scene_visual = $r9867_14_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite picardía, generosidad y la leyenda entrañable de una heroína del bosque.

Sujetos Principales
Ligeramente descentrada, la madre {NOMBRE_DESTINATARIO} aparece como una heroína del bosque estilo Robin Hood (capucha verde cazador, corsé o chaleco de cuero rústico), sosteniendo un arco de madera con una flecha de luz brillante, sonrisa pícara y valiente. A su lado, su hijo ya adulto {NOMBRE_DEDICANTE} la ayuda felizmente a repartir monedas de oro que caen de un saco. En el tronco de un árbol gigante hay un cartel antiguo que dice "SE BUSCA" con el rostro de {NOMBRE_DESTINATARIO} dibujado.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_14_fa$,
  background_details = $r9867_14_fb$Un denso bosque legendario, rayos de sol crepuscular filtrándose entre las hojas de robles gigantes.$r9867_14_fb$,
  magic_effects = $r9867_14_fc$Las monedas de oro brillan intensamente con polvo de hadas y la punta de la flecha es luz pura. La magia debe sentirse pícara y completamente integrada dentro de una fotografía realista.$r9867_14_fc$,
  lighting_color = $r9867_14_fd$Verdes profundos, marrones rústicos, dorado brillante y luz de atardecer.$r9867_14_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_14_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_14_la_carta_que_sigo_escribiendo.webp$r9867_14_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_15_fn$Memoria Familiar Madre Porque eres Alegre$r9867_15_fn$,
  scene_visual = $r9867_15_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría desbordante y la magia de convertir hasta la lluvia en una fiesta.

Sujetos Principales
Ligeramente descentrada, la madre {NOMBRE_DESTINATARIO}, con un atuendo clásico vintage (abrigo ligero o vestido con vuelo), sostiene un paraguas rojo o amarillo brillante suspendido en pleno paso de baile mientras salpica en un charco grande. su hijo ya adulto {NOMBRE_DEDICANTE} baila alegremente a su lado con botas de lluvia coloridas, ambos con expresiones de pura felicidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_15_fa$,
  background_details = $r9867_15_fb$Una calle de ciudad empedrada al atardecer, lloviendo suavemente, faroles iluminando la lluvia con reflejos perfectos en los charcos.$r9867_15_fb$,
  magic_effects = $r9867_15_fc$Las gotas de lluvia iluminadas parecen polvo de estrellas y las salpicaduras brillan con luz propia dorada. La magia debe sentirse festiva y completamente integrada dentro de una fotografía realista.$r9867_15_fc$,
  lighting_color = $r9867_15_fd$Azul petróleo para el atardecer, amarillos/rojos vibrantes y reflejos plateados del agua.$r9867_15_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_15_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_15_la_fotografia_que_respira_contigo.webp$r9867_15_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_16_fn$Memoria Familiar Madre Porque eres mi Guardiana de Historias$r9867_16_fn$,
  scene_visual = $r9867_16_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite nostalgia mágica y la calidez de quien guardaba cada recuerdo familiar como un tesoro.

Sujetos Principales
Ligeramente descentrada, la madre {NOMBRE_DESTINATARIO}, con ropa elegante y atemporal, está en un estudio de luz tenue extrayendo hilos de luz dorada desde un grueso libro antiguo abierto. su hijo ya adulto {NOMBRE_DEDICANTE} está maravillado mientras esos hilos flotan y forman pequeñas proyecciones de momentos felices familiares.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_16_fa$,
  background_details = $r9867_16_fb$Un despacho acogedor, estanterías repletas de libros, chimenea encendida, atmósfera nostálgica.$r9867_16_fb$,
  magic_effects = $r9867_16_fc$Los hilos de luz dorada flotan en espiral y sutiles siluetas doradas de la familia se forman en el aire. La magia debe sentirse nostálgica y completamente integrada dentro de una fotografía realista.$r9867_16_fc$,
  lighting_color = $r9867_16_fd$Marrones cálidos, fuego ámbar y la luz dorada y pura de los recuerdos.$r9867_16_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_16_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_16_el_camino_que_dejaste_abierto.webp$r9867_16_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_17_fn$Memoria Familiar Madre Porque eres mi Raíz y mi Fuerza$r9867_17_fn$,
  scene_visual = $r9867_17_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite arraigo, fortaleza y la certeza de que su esencia sigue dando vida y sostén a la familia.

Sujetos Principales
Ligeramente descentrada, la madre {NOMBRE_DESTINATARIO} está de pie frente a un árbol milenario gigante que emite una luz dorada y cálida (su aura y la luz del árbol se fusionan, como si ella fuera la esencia del bosque), entregando tiernamente a su hijo ya adulto {NOMBRE_DEDICANTE} una pequeña flor brillante. {NOMBRE_DEDICANTE} la recibe con ambas manos, con reverencia.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_17_fa$,
  background_details = $r9867_17_fb$El interior de un bosque místico nocturno, raíces gigantes cubiertas de musgo esmeralda, ambiente de reverencia y conexión ancestral.$r9867_17_fb$,
  magic_effects = $r9867_17_fc$Miles de luciérnagas flotan alrededor del árbol y de {NOMBRE_DESTINATARIO}, y la flor en sus manos emite un destello de luz pura. La magia debe sentirse ancestral y completamente integrada dentro de una fotografía realista.$r9867_17_fc$,
  lighting_color = $r9867_17_fd$Verde jade profundo, azul medianoche y dorado incandescente.$r9867_17_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_17_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_17_la_luz_que_no_se_apaga.webp$r9867_17_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_18_fn$Memoria Familiar Madre Porque eres mi Estrella Guía$r9867_18_fn$,
  scene_visual = $r9867_18_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite consuelo celestial y la certeza de que su luz sigue guiando cada paso desde el cielo.

Sujetos Principales
su hijo ya adulto {NOMBRE_DEDICANTE} está de pie en lo alto de una colina cubierta de hierba en la oscuridad de la noche, mirando con asombro un cielo deslumbrante. En el firmamento, las estrellas y nebulosas se organizan sutil y majestuosamente para formar el rostro gigante, protector, hermoso y sonriente de la madre {NOMBRE_DESTINATARIO} velando por su hijo ya adulto.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_18_fa$,
  background_details = $r9867_18_fb$Noche estrellada épica, vía láctea visible, colina verde oscura contrastando con el brillo del cosmos.$r9867_18_fb$,
  magic_effects = $r9867_18_fc$La formación del rostro es etérea, hecha enteramente de cúmulos de estrellas y polvo de nebulosa. La magia debe sentirse celestial y completamente integrada dentro de una fotografía realista.$r9867_18_fc$,
  lighting_color = $r9867_18_fd$Negro espacial, violetas profundos, azules cósmicos y plata brillante de las estrellas.$r9867_18_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_18_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_18_el_abrazo_que_aprendi_de_ti.webp$r9867_18_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_19_fn$Memoria Familiar Madre Porque eres mi Viajera del Tiempo$r9867_19_fn$,
  scene_visual = $r9867_19_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite nostalgia entrañable y la sensación de que el tiempo junto a ella nunca alcanza.

Sujetos Principales
Ligeramente descentrada, la madre {NOMBRE_DESTINATARIO}, vestida como una elegante viajera del tiempo (abrigo victoriano femenino, detalles en encaje y bronce, reloj colgante), está en el andén de una estación antigua frente a un tren de luz dorada y vapor, entregando un reloj de bolsillo brillante a su hijo ya adulto {NOMBRE_DEDICANTE}, mientras decenas de relojes antiguos flotan congelados en el aire alrededor de ellos.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_19_fa$,
  background_details = $r9867_19_fb$Una estación de tren de hierro forjado estilo victoriano, niebla y vapor mágico llenando el andén.$r9867_19_fb$,
  magic_effects = $r9867_19_fc$Relojes de bolsillo y engranajes flotan sin gravedad, y el tren está hecho de luz pura. La magia debe sentirse nostálgica y completamente integrada dentro de una fotografía realista.$r9867_19_fc$,
  lighting_color = $r9867_19_fd$Bronce, cobre, grises misteriosos y el destello cálido y dorado de la maquinaria temporal.$r9867_19_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_19_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_19_el_lugar_donde_vuelvo_a_encontrarte.webp$r9867_19_fk$ AND is_active;

UPDATE personalized_templates SET
  name = $r9867_20_fn$Memoria Familiar Madre Porque eres mi Ángel Guardián$r9867_20_fn$,
  scene_visual = $r9867_20_fa$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz absoluta, consuelo y el amor eterno que trasciende la partida física.

Sujetos Principales
Ligeramente descentrada, la madre {NOMBRE_DESTINATARIO} aparece de forma etérea y translúcida, vestida con ropas blancas y simples, con una sutil aura brillante y alas hechas puramente de luz difusa, abrazando tiernamente y con infinita paz maternal a su hijo ya adulto {NOMBRE_DEDICANTE}. {NOMBRE_DEDICANTE} cierra los ojos con una expresión de total consuelo, amor y tranquilidad.

Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los objetos, el escenario y los efectos mágicos del original: son el tema.$r9867_20_fa$,
  background_details = $r9867_20_fb$Un cielo de nubes esponjosas en tonos durazno, lavanda y rosa pastel suave, efecto atardecer divino.$r9867_20_fb$,
  magic_effects = $r9867_20_fc$Un aura de luz dorada muy suave envuelve a ambos, con partículas de luz celestial cayendo como polvo brillante. La magia debe sentirse sanadora y completamente integrada dentro de una fotografía realista.$r9867_20_fc$,
  lighting_color = $r9867_20_fd$Luz reconfortante, suave y envolvente, con durazno, lavanda y rosa pastel.$r9867_20_fd$,
  updated_at = now()
WHERE template_preview_key = $r9867_20_fk$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_20_siempre_en_mi_corazon.webp$r9867_20_fk$ AND is_active;
