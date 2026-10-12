-- Fix: el rebuild adulto-desde-infantil pegó la misma cláusula de cierre de
-- edades en los 12 libros adultos: "el hijo o la hija tiene entre 30 y 35
-- años y el padre o la madre entre 60 y 70". Esa cláusula asume un dúo
-- padre/madre + hijo/hija de dos generaciones.
--
-- En los libros de elenco variable de LA MISMA generación (hermanos, dueños
-- adultos) no existe ningún "padre o madre" en el resto de la escena ni en
-- las fotos de referencia reales — la IA termina inventando a esa persona
-- para cumplir la instrucción de texto. Confirmado con el reporte real de un
-- cliente en "El Mejor Equipo Adulto" (2 hermanos seleccionados -> aparece
-- una persona inexistente en el resultado).
--
-- Reemplaza la cláusula por una que describe el elenco real de cada libro.
-- Matchea por nombre de modelo (no por id: los ids de personalized_models
-- difieren entre entornos al ser GENERATED ALWAYS AS IDENTITY). Usa REPLACE,
-- así que es idempotente: si la frase vieja ya no está, no hace nada.

-- El Mejor Equipo Adulto / Siempre Serás Parte de Mí Adulto: hermanos
-- adultos, misma generación, sin padre/madre en escena.
UPDATE personalized_templates pt
SET scene_visual = REPLACE(
  pt.scene_visual,
  'Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70.',
  'Todos los protagonistas son hermanos adultos de estatura normal y edades similares, entre 28 y 45 años, sin diferencia generacional entre ellos.'
),
updated_at = now()
FROM personalized_models pm
WHERE pm.id = pt.model_id
  AND pm.name IN ('El Mejor Equipo Adulto', 'Siempre Serás Parte de Mí Adulto')
  AND pt.is_active;

-- Aventura Entre Patas Adulto: dueños adultos (1 a 3) de la mascota, misma
-- generación entre ellos, sin padre/madre en escena.
UPDATE personalized_templates pt
SET scene_visual = REPLACE(
  pt.scene_visual,
  'Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70.',
  'Todos los protagonistas son adultos de estatura normal y edades similares, entre 28 y 45 años, sin diferencia generacional entre ellos.'
),
updated_at = now()
FROM personalized_models pm
WHERE pm.id = pt.model_id
  AND pm.name = 'Aventura Entre Patas Adulto'
  AND pt.is_active;

-- Mi Familia Adulto: papá Y mamá (dos personas, no una) más 1-3 hijos. La
-- cláusula original solo nombraba un rol por generación.
UPDATE personalized_templates pt
SET scene_visual = REPLACE(
  pt.scene_visual,
  'Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70.',
  'Todos los protagonistas son adultos de estatura normal y comparable: el papá y la mamá tienen entre 55 y 70 años y sus hijos, también adultos, entre 25 y 40.'
),
updated_at = now()
FROM personalized_models pm
WHERE pm.id = pt.model_id
  AND pm.name = 'Mi Familia Adulto'
  AND pt.is_active;
