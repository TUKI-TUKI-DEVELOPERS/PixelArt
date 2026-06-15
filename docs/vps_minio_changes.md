# Migración VPS — PLANTILLA_2 renombrada (X Razones)

## Contexto

Se renombró el archivo de PLANTILLA_2 del libro "10 Razones por las que Te Amo" en MinIO local.

- **Nombre anterior:** `PLANTILLA_2_Besarte_es_Como_Comer_Algodón_de_Azucar.png`
- **Nombre nuevo:** `PLANTILLA_2_Cepillarnos_los_dientes_juntos_es_como_una_comedia_romantica.png`

La DB local ya fue actualizada. La VPS requiere 2 pasos: sincronizar MinIO y actualizar la BD.

---

## Paso 1 — Copiar el archivo nuevo a MinIO de la VPS

Subir el archivo renombrado al bucket `pixelart-assets` en la VPS usando el mismo proceso de sincronización de MinIO que ya se usa habitualmente.

Ruta destino en MinIO:
```
pixelart-assets/IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_2_Cepillarnos_los_dientes_juntos_es_como_una_comedia_romantica.png
```

Verificar que el archivo viejo ya no exista (o eliminarlo):
```
pixelart-assets/IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_2_Besarte_es_Como_Comer_Algodón_de_Azucar.png
```

---

## Paso 2 — Actualizar la BD en la VPS

Entrar a psql en la VPS:
```bash
docker exec -it pixelart_postgres psql -U pixelart -d pixelart
```

Verificar el estado actual (debe mostrar el key viejo):
```sql
SELECT id, name, template_preview_key
FROM personalized_templates
WHERE model_id = 1
  AND template_preview_key LIKE '%X_Razones%'
  AND template_preview_key LIKE '%PLANTILLA\_2\_%' ESCAPE '\';
```

Ejecutar el UPDATE con WHERE exacto (sin wildcards en el número):
```sql
UPDATE personalized_templates
SET
  template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_2_Cepillarnos_los_dientes_juntos_es_como_una_comedia_romantica.png',
  name = 'Cepillarnos los dientes juntos es como una comedia romantica'
WHERE model_id = 1
  AND template_preview_key LIKE '%X_Razones%'
  AND template_preview_key LIKE '%PLANTILLA\_2\_%' ESCAPE '\';
```

> El `ESCAPE '\'` hace que `\_` se trate como guión bajo literal, no como wildcard.
> Esto evita que PLANTILLA_20 sea afectada (error que ocurrió en local).

Verificar que actualizó exactamente 1 fila y que el conteo sigue en 20:
```sql
SELECT COUNT(*) FROM personalized_templates WHERE model_id = 1;
-- Debe dar 20

SELECT id, name, template_preview_key
FROM personalized_templates
WHERE model_id = 1
  AND template_preview_key LIKE '%PLANTILLA%2%Cepillar%';
-- Debe mostrar 1 fila con el key nuevo
```

Salir:
```sql
\q
```

---

## Paso 3 — Verificar en el navegador

Abrir el libro "10 Razones por las que Te Amo" en la VPS y confirmar que:
- La plantilla 2 muestra la imagen correcta
- El nombre aparece como "Cepillarnos los dientes juntos es como una comedia romantica"
- El orden va del 1 al 20 correctamente

---

## Notas

- NO correr `npm run seed` en la VPS para este cambio — el seed usa `ON CONFLICT DO NOTHING` y no actualizaría el key viejo.
- En local se eliminaron 2 filas duplicadas (ids 1397 y 1738) y se re-insertó PLANTILLA_20 que había quedado huérfana. La VPS NO debería tener ese problema si nunca se corrió el seed con versiones intermedias del archivo.

---

---

# Migración VPS — Personajes del libro en demo_request

## Contexto

Se agregaron 5 columnas nuevas a la tabla `demo_request` para guardar los nombres de los personajes del libro y el modo familiar. Esto permite que el panel admin muestre correctamente los datos de cada personaje.

**Columnas nuevas:**
- `recipient_name TEXT` — nombre del protagonista (modos amor, mascotas, memorial, familia)
- `recipient_nickname TEXT` — apodo del protagonista
- `dedicator_name TEXT` — nombre de quien dedica
- `gender_direction VARCHAR(20)` — dirección de género (HE_TO_SHE, SHE_TO_HE, etc.)
- `character_meta JSONB` — JSON con datos de cada integrante (modos familia-grupo y hermanos)

---

## SQL de migración en la VPS

Entrar a psql:
```bash
docker exec -it pixelart_postgres psql -U pixelart -d pixelart
```

Ejecutar:
```sql
ALTER TABLE demo_request
  ADD COLUMN IF NOT EXISTS recipient_name     TEXT,
  ADD COLUMN IF NOT EXISTS recipient_nickname TEXT,
  ADD COLUMN IF NOT EXISTS dedicator_name     TEXT,
  ADD COLUMN IF NOT EXISTS gender_direction   VARCHAR(20),
  ADD COLUMN IF NOT EXISTS character_meta     JSONB;
```

Verificar:
```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'demo_request'
  AND column_name IN ('recipient_name','recipient_nickname','dedicator_name','gender_direction','character_meta');
-- Debe mostrar 5 filas
```

Salir:
```sql
\q
```

---

## Notas

- No requiere cambios en MinIO.
- Las solicitudes existentes tendrán estas columnas en NULL — eso es correcto.
- A partir del deploy, las nuevas solicitudes guardan los datos automáticamente.
