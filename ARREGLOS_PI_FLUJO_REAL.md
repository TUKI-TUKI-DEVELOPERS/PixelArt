# Encargo para Pi — arreglos del flujo real adulto

Tu auditoría está bien hecha. Antes de tocar nada, lee esto entero: **uno de tus
hallazgos es falso y no hay que arreglarlo**, y hay otro que descubriste sin querer
y sí hay que arreglar.

Haz los arreglos **de uno en uno**, en el orden de abajo, verificando cada uno antes
de pasar al siguiente. No agrupes. No aproveches para mejorar cosas de alrededor.

---

## 0 · Lo que NO hay que arreglar

### Los 520 px: era un error de medición tuyo

Corriste `verificar_adult_poems.py` **sin el argumento `--name`**, así que el script
sustituyó el apodo por su marcador por defecto, el literal `<NOMBRE_EJEMPLO>`, que
tiene 15 caracteres. Por eso mediste 671 px en Mamá.

Compruébalo tú mismo:

```bash
cd PromptsPixelArtPlantillas
./.venv/bin/python verificar_adult_poems.py mama-mi-heroina-adult                    # 40 desbordes
./.venv/bin/python verificar_adult_poems.py mama-mi-heroina-adult --name "Carmen"    # 0 desbordes
```

**No acortes ningún poema.** Los 11 bancos están bien con nombres reales.

---

## 1 · Límite de largo del apodo (es lo que tu hallazgo falso destapó)

El verso no lo rompe el poema: lo rompe el apodo que escriba el cliente. Medido
sobre 5 libros:

| Apodo | Caracteres | Versos desbordados |
|---|---|---|
| `Leo`, `Carmen`, `Rosita`, `abuelita` | 3–8 | 0 |
| `mi abuelita` | 11 | 16 |
| `mi abuelita querida` | 19 | 42 |

El umbral está entre 8 y 11. Hoy el campo no tiene límite ninguno.

**Archivo:** `frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/[libroSlug]/WizardSection.tsx`

**1.1** — `FormField` (línea ~2891) no acepta `maxLength`. Añádelo, igual que ya
acepta `min` y `max`:

- en la firma de props: `maxLength?: number;`
- en la desestructuración de la línea 2892, junto a `min, max, error`
- en el `<input>` de dentro, junto a `min={min} max={max}`: `maxLength={maxLength}`

**1.2** — En el campo del apodo (línea ~2815, el `FormField` con label
`"Apodo / cómo le llamas (opcional)"`), pasa `maxLength={10}`.

**1.3** — En el input del apodo de equipo (línea ~2001, es un `<input>` crudo con
`onChange={(e) => setTeamNickname(e.target.value)}`), añade `maxLength={10}`.

**Verificación obligatoria antes de dar esto por bueno.** Confirma que 10 es seguro
en los 11 libros, no solo en 5:

```bash
cd PromptsPixelArtPlantillas
for b in adult-books/*-adult; do
  ./.venv/bin/python verificar_adult_poems.py "$(basename "$b")" --name "0123456789"
done
```

Todos tienen que dar `versos que se desbordan: 0`. Si alguno desborda, baja el
límite a 9 y vuelve a correrlo. **Reporta el número final que quedó.**

---

## 2 · `needsDualIdentity` no reconoce el libro adulto

Confirmado: el modelo 9857 se llama `Aventura Entre Patas Adulto` y el Set solo
tiene el nombre infantil, así que los dueños pierden el parecido facial.

**Archivo:** `backend/api/src/personalized/domain/services/build-generation-prompt.ts`
**Línea 76.** Cambia exactamente esto:

```ts
const DUAL_IDENTITY_MODELS = new Set(['Nuestro Angel de 4 patas', 'Aventura entre patas']);
```

por esto:

```ts
const DUAL_IDENTITY_MODELS = new Set([
  'Nuestro Angel de 4 patas',
  'Aventura entre patas',
  'Aventura Entre Patas Adulto',
]);
```

El comentario de las líneas 74-75 dice que los dueños son niños. En el libro adulto
no lo son: añade una frase al comentario aclarando que la versión adulta tiene de 1
a 3 dueños adultos. No reescribas el comentario entero.

**Verificación:** añade un caso al `.spec.ts` que ya existe
(`build-generation-prompt.spec.ts`) comprobando que
`needsDualIdentity('Aventura Entre Patas Adulto')` devuelve `true`. Luego:

```bash
cd backend/api && npm run test
```

No crees un archivo de test nuevo.

---

## 3 · Las 20 escenas de 9857 son infantiles

Confirmado: las 20 de 20 escenas de `Aventura Entre Patas Adulto` dicen "los niños".
La plantilla 1 dice *"compartida entre los niños y su mejor amigo peludo… los niños,
con expr…"*. El flujo real va a producir niños.

**No edites la BD a mano con un UPDATE suelto**: se pierde al re-sembrar. Hay que
hacerlo como los demás contenidos del proyecto, con un archivo SQL cableado al seed.

**3.1** — Primero averigua exactamente qué frases infantiles hay. No supongas:

```sql
SELECT template_preview_key,
       substring(scene_visual from '.{0,40}(niñ|chic|pequeñ|infantil).{0,40}')
FROM personalized_templates
WHERE model_id = 9857 AND is_active
ORDER BY template_preview_key;
```

**3.2** — Crea `backend/api/src/database/content/backfill-aventura-adult-escenas.sql`
con los `UPDATE` necesarios. Reglas que no puedes saltarte:

- **Empareja por `template_preview_key`, nunca por `id`.** Los id son
  autogenerados y cambian entre entornos; un backfill por id deja las plantillas sin
  contenido en producción. Ya pasó antes en este proyecto.
- Filtra siempre por `model_id = 9857` para no tocar el libro infantil.
- Sustituye las referencias infantiles por adultas: "los niños" → "los dueños
  adultos", y lo equivalente para lo que encuentres en 3.1. **Mantén intacto todo lo
  demás de la escena**: fondo, utilería, encuadre, el texto del reparto variable de
  1 a 3 personas, y la mención explícita de que la mascota es un perro.
- No toques `poem_template`, `background_details`, `magic_effects` ni
  `lighting_color`.

**3.3** — Cablea el archivo en `backend/api/src/database/seed.ts`, junto a los otros
`readFileSync(join(__dirname, 'content/backfill-...'))`. Sigue el patrón exacto de
los que ya están.

**3.4** — Carga y verifica. Esta consulta tiene que devolver **0**:

```sql
SELECT count(*) FROM personalized_templates
WHERE model_id = 9857 AND is_active
  AND (scene_visual ILIKE '%los niños%' OR scene_visual ILIKE '%el niño%'
       OR scene_visual ILIKE '%la niña%');
```

Y esta tiene que seguir devolviendo **20**, para probar que no borraste contenido:

```sql
SELECT count(*) FROM personalized_templates
WHERE model_id = 9857 AND is_active AND length(scene_visual) > 200;
```

---

## 4 · Tus otros hallazgos: verifica antes de tocar

Los siguientes no los comprobé yo. Son plausibles y encajan con un patrón: **el
código compara nombres de modelo por texto exacto y ninguno contempla el sufijo
"Adulto"**. Esa es probablemente la causa raíz común.

Para cada uno, antes de cambiar nada, pega en tu informe la evidencia: el archivo y
la línea de la comparación, y el valor real que tiene el modelo en la BD.

1. Filtro de género en 9864–9867 (`WizardSection.tsx:1222`, `usesMemorialGenderTemplates`).
2. Dedicatorias memoriales que caen al fallback romántico (`getDedicationOptions`, :882–884).
3. Flujo de hermanos sobrevivientes en 9868 (`WizardSection.tsx:1322, 1403, 1813, 2182`).
4. Resolvers especializados que el demo no usa.
5. Doble generación sin idempotencia.
6. Originales sin marca de agua potencialmente públicos.

**Arregla solo del 1 al 3**, que son del mismo tipo que los confirmados y tienen
arreglo acotado. Los puntos 4, 5 y 6 **no los toques**: afectan a dinero, a
concurrencia y a permisos de almacenamiento, y los decide el dueño del proyecto.
Repórtalos con tu evidencia y para ahí.

Si al verificar alguno resulta que no es un defecto, dilo y no lo cambies.

---

## 5 · Qué NO hacer, en ningún caso

- **No acortes poemas.** Ver sección 0.
- **No regeneres las portadas de catálogo.** Son 300 imágenes aprobadas y cuestan dinero.
- **No subas nada a MinIO** ni toques objetos existentes: no tiene versiones y no hay
  deshacer.
- **No despliegues a producción.**
- **No generes imágenes** de ningún tipo sin autorización previa. El saldo de la
  cuenta es limitado.
- **No reformatees** archivos ni "de paso" arregles otras cosas. Cada archivo que
  toques tiene que mostrar en el diff solo el cambio pedido.
- **No cambies los nombres de los modelos en la BD** para que coincidan con el
  código. El arreglo va siempre en el código, no en los datos: los nombres son los
  que ve el cliente.

---

## 6 · Qué entregar

Por cada arreglo, en este formato:

- **Qué cambiaste**: archivo y línea.
- **El diff**, tal cual.
- **La verificación que corriste** y su salida literal (el test, la consulta SQL con
  su resultado, el barrido del apodo con su número final).
- **Qué dejaste sin tocar** de lo que estaba cerca, si aplica.

Si algo no te sale o te genera dudas, **para y pregunta**. Es preferible un arreglo
menos a un arreglo mal hecho en código que ya está por desplegarse.
