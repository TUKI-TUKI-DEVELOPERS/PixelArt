
BEGIN;
WITH cat AS (SELECT id FROM personalized_categories WHERE name = $q$Libros de Memorias Familiares$q$),
ins_model AS (
  INSERT INTO personalized_models (category_id, name, slug, is_active)
  SELECT id, $q$Siempre Serás Parte de Mí Adulto$q$, $q$siempre-seras-parte-de-mi-adulto$q$, true FROM cat
  ON CONFLICT (category_id, name) DO UPDATE SET slug = EXCLUDED.slug, is_active = true, updated_at = now()
  RETURNING id
), model_row AS (
  SELECT id FROM ins_model UNION ALL SELECT id FROM personalized_models WHERE name=$q$Siempre Serás Parte de Mí Adulto$q$ AND slug=$q$siempre-seras-parte-de-mi-adulto$q$ LIMIT 1
), ins_catalog AS (
  INSERT INTO catalog_books (name, product_type, description, currency, is_active)
  SELECT $q$Siempre Serás Parte de Mí Adulto$q$, 'CUSTOM_BOOK', $q$Versión adulta de Siempre Serás Parte de Mí Adulto para el catálogo PixelArt.$q$, 'PEN', true
  WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name=$q$Siempre Serás Parte de Mí Adulto$q$)
  RETURNING id
), catalog_row AS (
  SELECT id FROM ins_catalog UNION ALL SELECT id FROM catalog_books WHERE name=$q$Siempre Serás Parte de Mí Adulto$q$ LIMIT 1
)
INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT id, 'TAPA_DELGADA', 13000 FROM catalog_row
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE SET base_price_cents=EXCLUDED.base_price_cents, updated_at=now();

WITH catalog_row AS (SELECT id FROM catalog_books WHERE name=$q$Siempre Serás Parte de Mí Adulto$q$ LIMIT 1)
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
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_01_el_equipo_que_sigue_conmigo_hermano.webp$q$, $q$El equipo que sigue conmigo Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_02_la_ruta_de_nuestras_bromas_hermano.webp$q$, $q$La ruta de nuestras bromas Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_03_el_refugio_de_nuestras_locuras_hermano.webp$q$, $q$El refugio de nuestras locuras Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_04_la_promesa_de_seguir_jugando_hermano.webp$q$, $q$La promesa de seguir jugando Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_05_la_complicidad_que_no_se_rompe_hermano.webp$q$, $q$La complicidad que no se rompe Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_06_el_mapa_de_nuestros_secretos_hermano.webp$q$, $q$El mapa de nuestros secretos Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_07_la_tarde_donde_todavia_te_escucho_hermano.webp$q$, $q$La tarde donde todavía te escucho Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_08_el_puente_de_nuestras_peleas_y_risas_hermano.webp$q$, $q$El puente de nuestras peleas y risas Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_09_la_cancion_que_era_de_los_dos_hermano.webp$q$, $q$La canción que era de los dos Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_10_la_patrulla_de_infancia_eterna_hermano.webp$q$, $q$La patrulla de infancia eterna Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_11_la_mesa_de_nuestras_conspiraciones_hermano.webp$q$, $q$La mesa de nuestras conspiraciones Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_12_el_album_donde_seguimos_juntos_hermano.webp$q$, $q$El álbum donde seguimos juntos Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_13_la_carrera_hasta_el_fin_del_mundo_hermano.webp$q$, $q$La carrera hasta el fin del mundo Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_14_el_codigo_de_hermanos_hermano.webp$q$, $q$El código de hermanos Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_15_la_noche_de_nuestras_historias_hermano.webp$q$, $q$La noche de nuestras historias Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_16_el_jardin_de_los_recuerdos_vivos_hermano.webp$q$, $q$El jardín de los recuerdos vivos Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_17_la_luz_que_dejo_tu_risa_hermano.webp$q$, $q$La luz que dejó tu risa Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_18_la_esquina_donde_empieza_la_memoria_hermano.webp$q$, $q$La esquina donde empieza la memoria Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_19_el_lazo_que_no_aprende_a_irse_hermano.webp$q$, $q$El lazo que no aprende a irse Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_20_siempre_seras_parte_de_mi_hermano.webp$q$, $q$Siempre serás parte de mí Hermano$q$, $q$M$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_21_el_equipo_que_sigue_conmigo_hermana.webp$q$, $q$El equipo que sigue conmigo Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_22_la_ruta_de_nuestras_bromas_hermana.webp$q$, $q$La ruta de nuestras bromas Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_23_el_refugio_de_nuestras_locuras_hermana.webp$q$, $q$El refugio de nuestras locuras Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_24_la_promesa_de_seguir_jugando_hermana.webp$q$, $q$La promesa de seguir jugando Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_25_la_complicidad_que_no_se_rompe_hermana.webp$q$, $q$La complicidad que no se rompe Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_26_el_mapa_de_nuestros_secretos_hermana.webp$q$, $q$El mapa de nuestros secretos Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_27_la_tarde_donde_todavia_te_escucho_hermana.webp$q$, $q$La tarde donde todavía te escucho Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_28_el_puente_de_nuestras_peleas_y_risas_hermana.webp$q$, $q$El puente de nuestras peleas y risas Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_29_la_cancion_que_era_de_los_dos_hermana.webp$q$, $q$La canción que era de los dos Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_30_la_patrulla_de_infancia_eterna_hermana.webp$q$, $q$La patrulla de infancia eterna Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_31_la_mesa_de_nuestras_conspiraciones_hermana.webp$q$, $q$La mesa de nuestras conspiraciones Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_32_el_album_donde_seguimos_juntos_hermana.webp$q$, $q$El álbum donde seguimos juntos Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_33_la_carrera_hasta_el_fin_del_mundo_hermana.webp$q$, $q$La carrera hasta el fin del mundo Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_34_el_codigo_de_hermanos_hermana.webp$q$, $q$El código de hermanos Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_35_la_noche_de_nuestras_historias_hermana.webp$q$, $q$La noche de nuestras historias Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_36_el_jardin_de_los_recuerdos_vivos_hermana.webp$q$, $q$El jardín de los recuerdos vivos Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_37_la_luz_que_dejo_tu_risa_hermana.webp$q$, $q$La luz que dejó tu risa Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_38_la_esquina_donde_empieza_la_memoria_hermana.webp$q$, $q$La esquina donde empieza la memoria Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_39_el_lazo_que_no_aprende_a_irse_hermana.webp$q$, $q$El lazo que no aprende a irse Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_40_siempre_seras_parte_de_mi_hermana.webp$q$, $q$Siempre serás parte de mí Hermana$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q${APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]$q$);

WITH model_row AS (SELECT id FROM personalized_models WHERE name=$q$Siempre Serás Parte de Mí Adulto$q$ AND slug=$q$siempre-seras-parte-de-mi-adulto$q$ LIMIT 1)
INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles, is_active)
SELECT model_row.id, t.name, t.template_preview_key, t.gender_direction, t.scene_visual, t.background_details, t.magic_effects, t.lighting_color, t.poem_template, t.character_roles, true
FROM tmp_adult_templates t CROSS JOIN model_row
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates p WHERE p.model_id=model_row.id AND p.template_preview_key=t.template_preview_key);

UPDATE personalized_templates p
SET name=t.name, gender_direction=t.gender_direction, scene_visual=t.scene_visual, background_details=t.background_details, magic_effects=t.magic_effects, lighting_color=t.lighting_color, poem_template=t.poem_template, character_roles=t.character_roles, is_active=true, updated_at=now()
FROM tmp_adult_templates t, personalized_models m
WHERE m.slug=$q$siempre-seras-parte-de-mi-adulto$q$
  AND m.id=p.model_id
  AND p.template_preview_key=t.template_preview_key;
COMMIT;
