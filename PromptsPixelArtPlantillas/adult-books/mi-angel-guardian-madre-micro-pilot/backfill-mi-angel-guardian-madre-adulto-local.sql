
BEGIN;
WITH cat AS (SELECT id FROM personalized_categories WHERE name = $q$Libros de Memorias Familiares$q$),
ins_model AS (
  INSERT INTO personalized_models (category_id, name, slug, is_active)
  SELECT id, $q$Mi Ángel Guardián Madre Adulto$q$, $q$mi-angel-guardian-madre-adulto$q$, true FROM cat
  ON CONFLICT (category_id, name) DO UPDATE SET slug = EXCLUDED.slug, is_active = true, updated_at = now()
  RETURNING id
), model_row AS (
  SELECT id FROM ins_model UNION ALL SELECT id FROM personalized_models WHERE name=$q$Mi Ángel Guardián Madre Adulto$q$ AND slug=$q$mi-angel-guardian-madre-adulto$q$ LIMIT 1
), ins_catalog AS (
  INSERT INTO catalog_books (name, product_type, description, currency, is_active)
  SELECT $q$Mi Ángel Guardián Madre Adulto$q$, 'CUSTOM_BOOK', $q$Versión adulta de Mi Ángel Guardián Madre Adulto para el catálogo PixelArt.$q$, 'PEN', true
  WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name=$q$Mi Ángel Guardián Madre Adulto$q$)
  RETURNING id
), catalog_row AS (
  SELECT id FROM ins_catalog UNION ALL SELECT id FROM catalog_books WHERE name=$q$Mi Ángel Guardián Madre Adulto$q$ LIMIT 1
)
INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT id, 'TAPA_DELGADA', 13000 FROM catalog_row
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE SET base_price_cents=EXCLUDED.base_price_cents, updated_at=now();

WITH catalog_row AS (SELECT id FROM catalog_books WHERE name=$q$Mi Ángel Guardián Madre Adulto$q$ LIMIT 1)
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
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_01_el_faro_que_aun_me_guia.webp$q$, $q$El faro que aún me guía$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_02_la_ruta_de_tus_pasos_buenos.webp$q$, $q$La ruta de tus pasos buenos$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_03_el_jardin_de_tus_fechas_queridas.webp$q$, $q$El jardín de tus fechas queridas$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_04_el_manto_de_tus_historias.webp$q$, $q$El manto de tus historias$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_05_la_lampara_de_tu_cuidado.webp$q$, $q$La lámpara de tu cuidado$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_06_el_archivo_luminoso_de_tu_voz.webp$q$, $q$El archivo luminoso de tu voz$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_07_la_silla_donde_vuelve_tu_risa.webp$q$, $q$La silla donde vuelve tu risa$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_08_el_puente_de_nuestras_conversaciones.webp$q$, $q$El puente de nuestras conversaciones$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_09_la_ventana_donde_te_recuerdo.webp$q$, $q$La ventana donde te recuerdo$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_10_el_mapa_de_tu_legado.webp$q$, $q$El mapa de tu legado$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_11_la_mesa_que_guarda_tu_nombre.webp$q$, $q$La mesa que guarda tu nombre$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_12_el_refugio_de_tus_consejos.webp$q$, $q$El refugio de tus consejos$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_13_la_constelacion_de_tus_gestos.webp$q$, $q$La constelación de tus gestos$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_14_la_carta_que_sigo_escribiendo.webp$q$, $q$La carta que sigo escribiendo$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_15_la_fotografia_que_respira_contigo.webp$q$, $q$La fotografía que respira contigo$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_16_el_camino_que_dejaste_abierto.webp$q$, $q$El camino que dejaste abierto$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_17_la_luz_que_no_se_apaga.webp$q$, $q$La luz que no se apaga$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_18_el_abrazo_que_aprendi_de_ti.webp$q$, $q$El abrazo que aprendí de ti$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_19_el_lugar_donde_vuelvo_a_encontrarte.webp$q$, $q$El lugar donde vuelvo a encontrarte$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$),
($q$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_20_siempre_en_mi_corazon.webp$q$, $q$Siempre en mi corazón$q$, $q$F$q$, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.$q$, $q$[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]$q$);

WITH model_row AS (SELECT id FROM personalized_models WHERE name=$q$Mi Ángel Guardián Madre Adulto$q$ AND slug=$q$mi-angel-guardian-madre-adulto$q$ LIMIT 1)
INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles, is_active)
SELECT model_row.id, t.name, t.template_preview_key, t.gender_direction, t.scene_visual, t.background_details, t.magic_effects, t.lighting_color, t.poem_template, t.character_roles, true
FROM tmp_adult_templates t CROSS JOIN model_row
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates p WHERE p.model_id=model_row.id AND p.template_preview_key=t.template_preview_key);

UPDATE personalized_templates p
SET name=t.name, gender_direction=t.gender_direction, scene_visual=t.scene_visual, background_details=t.background_details, magic_effects=t.magic_effects, lighting_color=t.lighting_color, poem_template=t.poem_template, character_roles=t.character_roles, is_active=true, updated_at=now()
FROM tmp_adult_templates t, personalized_models m
WHERE m.slug=$q$mi-angel-guardian-madre-adulto$q$
  AND m.id=p.model_id
  AND p.template_preview_key=t.template_preview_key;
COMMIT;
