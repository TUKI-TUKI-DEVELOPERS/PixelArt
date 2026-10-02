
BEGIN;
WITH cat AS (SELECT id FROM personalized_categories WHERE name = $q$Libros de Familia$q$),
ins_model AS (
  INSERT INTO personalized_models (category_id, name, slug, is_active)
  SELECT id, $q$Te Amo, Abuelo Adulto$q$, $q$te-amo-abuelo-adulto$q$, true FROM cat
  ON CONFLICT (category_id, name) DO UPDATE SET slug = EXCLUDED.slug, is_active = true, updated_at = now()
  RETURNING id
), model_row AS (
  SELECT id FROM ins_model UNION ALL SELECT id FROM personalized_models WHERE name=$q$Te Amo, Abuelo Adulto$q$ AND slug=$q$te-amo-abuelo-adulto$q$ LIMIT 1
), ins_catalog AS (
  INSERT INTO catalog_books (name, product_type, description, currency, is_active)
  SELECT $q$Te Amo, Abuelo Adulto$q$, 'CUSTOM_BOOK', $q$Versión adulta de Te Amo, Abuelo Adulto para el catálogo PixelArt.$q$, 'PEN', true
  WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name=$q$Te Amo, Abuelo Adulto$q$)
  RETURNING id
), catalog_row AS (
  SELECT id FROM ins_catalog UNION ALL SELECT id FROM catalog_books WHERE name=$q$Te Amo, Abuelo Adulto$q$ LIMIT 1
)
INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT id, 'TAPA_DELGADA', 13000 FROM catalog_row
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE SET base_price_cents=EXCLUDED.base_price_cents, updated_at=now();

WITH catalog_row AS (SELECT id FROM catalog_books WHERE name=$q$Te Amo, Abuelo Adulto$q$ LIMIT 1)
INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT id, 'TAPA_GRUESA', 15000 FROM catalog_row
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE SET base_price_cents=EXCLUDED.base_price_cents, updated_at=now();

CREATE TEMP TABLE tmp_adult_templates (
  template_preview_key TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  gender_direction VARCHAR(20),
  scene_visual TEXT NOT NULL,
  background_details TEXT NOT NULL,
  magic_effects TEXT NOT NULL,
  lighting_color TEXT NOT NULL,
  poem_template TEXT NOT NULL,
  character_roles JSONB NOT NULL
) ON COMMIT DROP;
INSERT INTO tmp_adult_templates VALUES
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_01_la_calma_que_me_enseno_a_respirar_de_nieto_a_abuelo.webp$q$, $q$La calma que me enseñó a respirar De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la calma que me enseñó a respirar, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_02_el_mapa_de_tus_consejos_de_nieto_a_abuelo.webp$q$, $q$El mapa de tus consejos De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el mapa de tus consejos, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_03_la_mesa_donde_siempre_vuelvo_de_nieto_a_abuelo.webp$q$, $q$La mesa donde siempre vuelvo De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la mesa donde siempre vuelvo, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_04_tus_manos_hicieron_hogar_de_nieto_a_abuelo.webp$q$, $q$Tus manos hicieron hogar De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En tus manos hicieron hogar, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_05_la_fuerza_que_no_hacia_ruido_de_nieto_a_abuelo.webp$q$, $q$La fuerza que no hacía ruido De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la fuerza que no hacía ruido, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_06_el_abrigo_de_los_dias_dificiles_de_nieto_a_abuelo.webp$q$, $q$El abrigo de los días difíciles De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el abrigo de los días difíciles, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_07_la_luz_de_las_pequenas_costumbres_de_nieto_a_abuelo.webp$q$, $q$La luz de las pequeñas costumbres De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la luz de las pequeñas costumbres, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_08_el_puente_hacia_mi_propio_camino_de_nieto_a_abuelo.webp$q$, $q$El puente hacia mi propio camino De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el puente hacia mi propio camino, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_09_la_paciencia_que_me_dio_raices_de_nieto_a_abuelo.webp$q$, $q$La paciencia que me dio raíces De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la paciencia que me dio raíces, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_10_la_voz_que_todavia_me_ordena_el_mundo_de_nieto_a_abuelo.webp$q$, $q$La voz que todavía me ordena el mundo De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la voz que todavía me ordena el mundo, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_11_el_refugio_de_las_conversaciones_pendientes_de_nieto_a_abuelo.webp$q$, $q$El refugio de las conversaciones pendientes De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el refugio de las conversaciones pendientes, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_12_la_brujula_de_mis_decisiones_de_nieto_a_abuelo.webp$q$, $q$La brújula de mis decisiones De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la brújula de mis decisiones, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_13_el_jardin_de_lo_que_sembraste_en_mi_de_nieto_a_abuelo.webp$q$, $q$El jardín de lo que sembraste en mí De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el jardín de lo que sembraste en mí, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_14_la_casa_que_llevo_por_dentro_de_nieto_a_abuelo.webp$q$, $q$La casa que llevo por dentro De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la casa que llevo por dentro, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_15_el_oficio_silencioso_de_cuidar_de_nieto_a_abuelo.webp$q$, $q$El oficio silencioso de cuidar De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el oficio silencioso de cuidar, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_16_la_risa_que_me_devuelve_al_origen_de_nieto_a_abuelo.webp$q$, $q$La risa que me devuelve al origen De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la risa que me devuelve al origen, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_17_el_legado_de_mirar_con_ternura_de_nieto_a_abuelo.webp$q$, $q$El legado de mirar con ternura De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el legado de mirar con ternura, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_18_la_ventana_donde_aprendi_a_esperar_de_nieto_a_abuelo.webp$q$, $q$La ventana donde aprendí a esperar De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la ventana donde aprendí a esperar, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_19_la_promesa_de_volver_a_casa_de_nieto_a_abuelo.webp$q$, $q$La promesa de volver a casa De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la promesa de volver a casa, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_20_siempre_sere_parte_de_tu_historia_de_nieto_a_abuelo.webp$q$, $q$Siempre seré parte de tu historia De Nieto a Abuelo$q$, $q$HE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En siempre seré parte de tu historia, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_21_la_calma_que_me_enseno_a_respirar_de_nieta_a_abuelo.webp$q$, $q$La calma que me enseñó a respirar De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la calma que me enseñó a respirar, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_22_el_mapa_de_tus_consejos_de_nieta_a_abuelo.webp$q$, $q$El mapa de tus consejos De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el mapa de tus consejos, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_23_la_mesa_donde_siempre_vuelvo_de_nieta_a_abuelo.webp$q$, $q$La mesa donde siempre vuelvo De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la mesa donde siempre vuelvo, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_24_tus_manos_hicieron_hogar_de_nieta_a_abuelo.webp$q$, $q$Tus manos hicieron hogar De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En tus manos hicieron hogar, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_25_la_fuerza_que_no_hacia_ruido_de_nieta_a_abuelo.webp$q$, $q$La fuerza que no hacía ruido De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la fuerza que no hacía ruido, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_26_el_abrigo_de_los_dias_dificiles_de_nieta_a_abuelo.webp$q$, $q$El abrigo de los días difíciles De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el abrigo de los días difíciles, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_27_la_luz_de_las_pequenas_costumbres_de_nieta_a_abuelo.webp$q$, $q$La luz de las pequeñas costumbres De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la luz de las pequeñas costumbres, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_28_el_puente_hacia_mi_propio_camino_de_nieta_a_abuelo.webp$q$, $q$El puente hacia mi propio camino De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el puente hacia mi propio camino, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_29_la_paciencia_que_me_dio_raices_de_nieta_a_abuelo.webp$q$, $q$La paciencia que me dio raíces De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la paciencia que me dio raíces, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_30_la_voz_que_todavia_me_ordena_el_mundo_de_nieta_a_abuelo.webp$q$, $q$La voz que todavía me ordena el mundo De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la voz que todavía me ordena el mundo, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_31_el_refugio_de_las_conversaciones_pendientes_de_nieta_a_abuelo.webp$q$, $q$El refugio de las conversaciones pendientes De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el refugio de las conversaciones pendientes, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_32_la_brujula_de_mis_decisiones_de_nieta_a_abuelo.webp$q$, $q$La brújula de mis decisiones De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la brújula de mis decisiones, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_33_el_jardin_de_lo_que_sembraste_en_mi_de_nieta_a_abuelo.webp$q$, $q$El jardín de lo que sembraste en mí De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el jardín de lo que sembraste en mí, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_34_la_casa_que_llevo_por_dentro_de_nieta_a_abuelo.webp$q$, $q$La casa que llevo por dentro De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la casa que llevo por dentro, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_35_el_oficio_silencioso_de_cuidar_de_nieta_a_abuelo.webp$q$, $q$El oficio silencioso de cuidar De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el oficio silencioso de cuidar, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_36_la_risa_que_me_devuelve_al_origen_de_nieta_a_abuelo.webp$q$, $q$La risa que me devuelve al origen De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la risa que me devuelve al origen, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_37_el_legado_de_mirar_con_ternura_de_nieta_a_abuelo.webp$q$, $q$El legado de mirar con ternura De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el legado de mirar con ternura, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_38_la_ventana_donde_aprendi_a_esperar_de_nieta_a_abuelo.webp$q$, $q$La ventana donde aprendí a esperar De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la ventana donde aprendí a esperar, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_39_la_promesa_de_volver_a_casa_de_nieta_a_abuelo.webp$q$, $q$La promesa de volver a casa De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la promesa de volver a casa, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_40_siempre_sere_parte_de_tu_historia_de_nieta_a_abuelo.webp$q$, $q$Siempre seré parte de tu historia De Nieta a Abuelo$q$, $q$SHE_TO_HE$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En siempre seré parte de tu historia, vuelvo a comprender,
que tu amor me enseñó a permanecer.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$);

WITH model_row AS (SELECT id FROM personalized_models WHERE name=$q$Te Amo, Abuelo Adulto$q$ AND slug=$q$te-amo-abuelo-adulto$q$ LIMIT 1)
INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles, is_active)
SELECT model_row.id, t.name, t.template_preview_key, t.gender_direction, t.scene_visual, t.background_details, t.magic_effects, t.lighting_color, t.poem_template, t.character_roles, true
FROM tmp_adult_templates t CROSS JOIN model_row
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates p WHERE p.model_id=model_row.id AND p.template_preview_key=t.template_preview_key);

UPDATE personalized_templates p
SET name=t.name, gender_direction=t.gender_direction, scene_visual=t.scene_visual, background_details=t.background_details, magic_effects=t.magic_effects, lighting_color=t.lighting_color, poem_template=t.poem_template, character_roles=t.character_roles, is_active=true, updated_at=now()
FROM tmp_adult_templates t, personalized_models m
WHERE m.slug=$q$te-amo-abuelo-adulto$q$
  AND m.id=p.model_id
  AND p.template_preview_key=t.template_preview_key;
COMMIT;
