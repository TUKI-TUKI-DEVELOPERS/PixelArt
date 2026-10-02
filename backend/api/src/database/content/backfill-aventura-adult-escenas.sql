-- Normaliza el lenguaje infantil heredado en las escenas del libro adulto.
-- Se empareja por template_preview_key (nunca por id) y se mantiene intacto
-- todo el contenido fuera de las referencias infantiles.
WITH target_keys(template_preview_key) AS (
  VALUES
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_01_el_explorador_de_senderos_secretos.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_02_el_capitan_de_las_tardes_de_playa.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_03_el_detective_de_huellas_felices.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_04_el_guardian_del_campamento.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_05_la_ruta_que_elegimos_juntos.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_06_tres_huellas_en_la_ciudad.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_07_el_mapa_de_los_domingos.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_08_el_copiloto_de_las_montanas.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_09_el_cafe_donde_siempre_volvemos.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_10_la_patrulla_de_las_luces.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_11_el_buscador_de_tesoros_simples.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_12_la_carrera_contra_el_viento.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_13_el_picnic_de_las_grandes_historias.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_14_el_faro_de_los_dias_largos.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_15_el_guardian_de_la_biblioteca.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_16_la_brujula_de_los_dias_nuevos.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_17_el_taller_de_trucos_imposibles.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_18_la_noche_de_cine_bajo_estrellas.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_19_el_jardin_de_las_huellas_brillantes.webp'),
    ('IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_20_aventuras_que_siempre_vuelven.webp')
)
UPDATE personalized_templates AS template
SET
  scene_visual = replace(
    replace(
      replace(template.scene_visual, 'los niños', 'los dueños adultos'),
      'fantasía infantil', 'fantasía compartida'
    ),
    'los más pequeños', 'sus dueños adultos'
  ),
  updated_at = now()
FROM target_keys
WHERE template.model_id = 9857
  AND template.is_active
  AND template.template_preview_key = target_keys.template_preview_key
  AND (
    template.scene_visual LIKE '%los niños%'
    OR template.scene_visual LIKE '%fantasía infantil%'
    OR template.scene_visual LIKE '%los más pequeños%'
  );
