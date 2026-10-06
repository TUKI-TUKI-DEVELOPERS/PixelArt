-- Fix: la cláusula de cierre de "Todos los protagonistas son adultos..."
-- (pegada en los 12 libros adultos por el rebuild adulto-desde-infantil)
-- le asignaba un RANGO DE EDAD NUMÉRICO fijo a cada rol ("el hijo o la hija
-- tiene entre 30 y 35 años y el padre o la madre entre 60 y 70").
--
-- Eso contradice la regla de identidad real: el bloque compartido
-- identidad_humano ya dice que "la edad aparente de cada personaje es la
-- edad real de su foto de referencia... sin importar lo que sugiera el
-- contexto de la escena". Con un número fijo en el texto, una abuela real
-- de 50 años puede terminar generada luciendo 70 solo porque el rol dice
-- "60 a 70" — dos instrucciones contradictorias en el mismo prompt.
--
-- El propósito real de la cláusula (que nadie quede con proporciones de
-- cuerpo de niño al convertir una escena infantil a adulta) no necesita
-- un número: alcanza con decir que todos son adultos de estatura
-- comparable. Se saca el rango numérico en los 12 libros y se deja que la
-- edad real de la foto sea la única fuente de verdad.
--
-- regexp_replace con 'g' reemplaza SOLO la primera oración (hasta el primer
-- punto) — el resto del párrafo ("El vínculo es familiar...", "Conserva
-- intactos...") queda intacto. La frase nueva no tiene puntos internos, así
-- que re-ejecutar este archivo no la vuelve a cortar a la mitad (idempotente).
UPDATE personalized_templates
SET scene_visual = regexp_replace(
  scene_visual,
  'Todos los protagonistas son[^.]*\.',
  'Todos los protagonistas son adultos de estatura normal y '
  || 'comparable entre sí, con la edad real que muestra su propia '
  || 'foto de referencia.'
),
updated_at = now()
WHERE is_active
  AND scene_visual ~ 'Todos los protagonistas son[^.]*\.';
