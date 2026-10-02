
BEGIN;
WITH cat AS (SELECT id FROM personalized_categories WHERE name = $q$Libros de Familia$q$),
ins_model AS (
  INSERT INTO personalized_models (category_id, name, slug, is_active)
  SELECT id, $q$El Mejor Equipo Adulto$q$, $q$el-mejor-equipo-adulto$q$, true FROM cat
  ON CONFLICT (category_id, name) DO UPDATE SET slug = EXCLUDED.slug, is_active = true, updated_at = now()
  RETURNING id
), model_row AS (
  SELECT id FROM ins_model UNION ALL SELECT id FROM personalized_models WHERE name=$q$El Mejor Equipo Adulto$q$ AND slug=$q$el-mejor-equipo-adulto$q$ LIMIT 1
), ins_catalog AS (
  INSERT INTO catalog_books (name, product_type, description, currency, is_active)
  SELECT $q$El Mejor Equipo Adulto$q$, 'CUSTOM_BOOK', $q$Versión adulta de El Mejor Equipo Adulto para el catálogo PixelArt.$q$, 'PEN', true
  WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name=$q$El Mejor Equipo Adulto$q$)
  RETURNING id
), catalog_row AS (
  SELECT id FROM ins_catalog UNION ALL SELECT id FROM catalog_books WHERE name=$q$El Mejor Equipo Adulto$q$ LIMIT 1
)
INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT id, 'TAPA_DELGADA', 13000 FROM catalog_row
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE SET base_price_cents=EXCLUDED.base_price_cents, updated_at=now();

WITH catalog_row AS (SELECT id FROM catalog_books WHERE name=$q$El Mejor Equipo Adulto$q$ LIMIT 1)
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
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_01_la_estrategia_de_nuestras_locuras.webp$q$, $q$La estrategia de nuestras locuras$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_02_el_pacto_de_llegar_juntos.webp$q$, $q$El pacto de llegar juntos$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_03_la_banda_sonora_de_nuestras_batallas.webp$q$, $q$La banda sonora de nuestras batallas$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_04_el_idioma_privado_de_las_bromas.webp$q$, $q$El idioma privado de las bromas$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_05_la_ruta_que_inventamos_sin_mapa.webp$q$, $q$La ruta que inventamos sin mapa$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_06_el_archivo_de_nuestras_victorias_pequenas.webp$q$, $q$El archivo de nuestras victorias pequeñas$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_07_la_mesa_de_los_planes_imposibles.webp$q$, $q$La mesa de los planes imposibles$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_08_el_codigo_secreto_de_la_confianza.webp$q$, $q$El código secreto de la confianza$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_09_la_noche_en_que_supimos_cubrirnos.webp$q$, $q$La noche en que supimos cubrirnos$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_10_el_taller_de_las_soluciones_raras.webp$q$, $q$El taller de las soluciones raras$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_11_la_patrulla_de_los_dias_dificiles.webp$q$, $q$La patrulla de los días difíciles$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_12_el_refugio_donde_nadie_actua_solo.webp$q$, $q$El refugio donde nadie actúa solo$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_13_la_brujula_de_los_hermanos.webp$q$, $q$La brújula de los hermanos$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_14_el_puente_despues_de_cada_pelea.webp$q$, $q$El puente después de cada pelea$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_15_la_celebracion_de_seguir_siendo_equipo.webp$q$, $q$La celebración de seguir siendo equipo$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_16_el_mapa_de_nuestras_diferencias.webp$q$, $q$El mapa de nuestras diferencias$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_17_la_carrera_donde_nadie_queda_atras.webp$q$, $q$La carrera donde nadie queda atrás$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_18_el_laboratorio_de_la_complicidad.webp$q$, $q$El laboratorio de la complicidad$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_19_la_promesa_de_estar_cerca.webp$q$, $q$La promesa de estar cerca$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_20_el_mejor_equipo_todavia_en_marcha.webp$q$, $q$El mejor equipo todavía en marcha$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.$q$, $q$[{"key": "hermanos", "count": 3}]$q$);

WITH model_row AS (SELECT id FROM personalized_models WHERE name=$q$El Mejor Equipo Adulto$q$ AND slug=$q$el-mejor-equipo-adulto$q$ LIMIT 1)
INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles, is_active)
SELECT model_row.id, t.name, t.template_preview_key, t.gender_direction, t.scene_visual, t.background_details, t.magic_effects, t.lighting_color, t.poem_template, t.character_roles, true
FROM tmp_adult_templates t CROSS JOIN model_row
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates p WHERE p.model_id=model_row.id AND p.template_preview_key=t.template_preview_key);

UPDATE personalized_templates p
SET name=t.name, gender_direction=t.gender_direction, scene_visual=t.scene_visual, background_details=t.background_details, magic_effects=t.magic_effects, lighting_color=t.lighting_color, poem_template=t.poem_template, character_roles=t.character_roles, is_active=true, updated_at=now()
FROM tmp_adult_templates t, personalized_models m
WHERE m.slug=$q$el-mejor-equipo-adulto$q$
  AND m.id=p.model_id
  AND p.template_preview_key=t.template_preview_key;
COMMIT;
