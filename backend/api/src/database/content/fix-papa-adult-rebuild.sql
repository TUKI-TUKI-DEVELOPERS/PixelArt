-- Arreglo puntual: rebuild-adult-books-from-infant.sql matcheaba los 40
-- bloques de Papá, Mi Héroe Adulto por una clave que termina en "_V10.webp".
-- Esa convención solo existe en el entorno local; en producción nunca existió,
-- así que el UPDATE nunca tocó ninguna fila y el libro se quedó con nombres y
-- escenas de una serie anterior. Reescrito para matchear por posición real
-- (extraída de template_preview_key) y gender_direction, como el resto de
-- backfills de este proyecto -- nunca por id ni por un sufijo de archivo fijo.

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
