-- "Papá, Mi Héroe" mostraba 30 plantillas por dirección en vez de 20, en las dos
-- versiones. Una corrida del 2026-09-30 reinsertó las posiciones 1-10 del libro
-- infantil (duplicándolas sobre las originales de abril y agosto) y además dejó
-- una serie adulta 1-10 abandonada, con temas inventados que nunca se aprobaron.
--
-- No se borra ninguna fila: se desactivan, para que cualquier demo u orden que ya
-- las referencie siga siendo válida. El matcheo usa criterios estables —nombre del
-- modelo, extensión de la clave y antigüedad relativa— y nunca ids, porque los ids
-- son autogenerados y no coinciden entre entornos.

-- 1. Adulto: la serie aprobada usa claves "..._V10.webp". Cualquier otra extensión
--    es la serie abandonada.
UPDATE personalized_templates SET is_active = false, updated_at = now()
WHERE model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND template_preview_key NOT LIKE '%\_V10.webp'
  AND is_active;

-- 2. Infantil: conserva la fila más antigua de cada (clave, dirección) y desactiva
--    las copias insertadas después.
UPDATE personalized_templates t SET is_active = false, updated_at = now()
WHERE t.model_id = (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe')
  AND t.is_active
  AND EXISTS (
    SELECT 1 FROM personalized_templates o
    WHERE o.model_id = t.model_id
      AND o.template_preview_key = t.template_preview_key
      AND o.gender_direction IS NOT DISTINCT FROM t.gender_direction
      AND o.id < t.id
  );
