# Libros adultos — proceso completo para terminar los que faltan

Runbook para preparar y generar las plantillas de los **libros adultos** de PixelArt.
Está escrito para que otra persona (o otro agente) lo ejecute sin contexto previo.

Cada libro adulto es la **versión adulta de un libro infantil que ya existe**. No es un
libro nuevo. Esa frase es la regla de la que se derivan casi todas las demás.

---

## 1. Qué estaba mal y por qué

Los 12 libros adultos se generaron con una fórmula en vez de adaptarse de su libro
infantil. Tres síntomas, una sola causa:

1. **Nombres inventados.** Cero de las plantillas adultas coincidían con su infantil.
   "Mi Superheroína Sin Capa" se convirtió en "La calma que me enseñó a respirar".
2. **Un solo poema por libro.** Siete libros tenían literalmente **1** poema repetido en
   sus 20 o 40 plantillas. Otros tres tenían un esqueleto con el título enchufado en una
   ranura. Un cliente recibía la misma estrofa en todas las páginas.
3. **Una sola escena por libro.** `count(DISTINCT left(scene_visual,120))` daba 1 en
   siete libros y 2 en otros tres.

Además el apodo quedaba **al inicio en 281 de 320 poemas** (y al final en exactamente 1),
mientras que los infantiles lo reparten natural.

### La trampa más cara

Arreglar la imagen del catálogo **no arregla el producto**. `scene_visual` en la base de
datos es lo que genera las fotos reales del cliente. Papá Mi Héroe mostraba el titán
cósmico en el catálogo mientras su escena en BD decía *"una calle antigua de barrio al
atardecer"*. **Todo arreglo tiene que tocar las dos cosas.**

---

## 2. Las cinco reglas

Aplican a todos los libros, sin excepción.

1. **Tema fiel.** Misma escena, mismo disfraz, mismos objetos, mismo escenario y misma
   puesta en escena que la plantilla infantil. Lo único que cambia es la edad.
   El disfraz y el elemento mítico **son** el tema: si el infantil muestra al papá como
   titán gigante, el adulto también. Nunca "hacerlo realista" ni "simbólico".
2. **Zona de título reservada.** El tercio superior de la página izquierda queda como
   espacio negativo. Sin caras, sin cabezas, sin detalle de alto contraste.
3. **Escala.** Todos los protagonistas son adultos de estatura comparable. Nadie es
   gigante ni diminuto, nadie va en brazos, nadie se arrodilla a la altura del otro.
4. **Mágico, no realista serio.** `magic_effects` viene del infantil y se conserva. Si
   el fondo tenía partículas, auras o energía, siguen ahí.
5. **Apodo rotando.** `{APODO_DESTINATARIO}` no puede abrir siempre el poema. Reparto:
   `inicio 1,4,7,10,13,16,19 · medio 2,5,8,11,14,17,20 · final 3,6,9,12,15,18`.

---

## 3. Estado actual

| Modelo | Libro adulto | Infantil | Plantillas | Poemas | Estado |
|---|---|---|---|---|---|
| 9775 | Papá, Mi Héroe Adulto | 8 | 40 | 40 | **Listo**, imágenes generadas |
| 9861 | Mamá, Mi Heroína Adulto | 9 | 40 | 28 | **Listo**, imágenes generadas |
| 9863 | Te Amo, Abuela Adulto | 11 | 40 | 27 | **Listo**, faltan imágenes |
| 9857 | Aventura Entre Patas Adulto | 5 | 20 | 20 | Revisar: 12 esqueletos, parcial |
| 9862 | Te Amo, Abuelo Adulto | 10 | 40 | 20 | **Pendiente** (1 esqueleto) |
| 9859 | El Mejor Equipo Adulto | 12 | 20 | 1 | **Pendiente** |
| 9860 | Mi Familia Adulto | 13 | 20 | 1 | **Pendiente** |
| 9866 | Mi Ángel Guardián Padre Adulto | 1063 | 20 | 1 | **Pendiente** |
| 9867 | Mi Ángel Guardián Madre Adulto | 1063 | 20 | 1 | **Pendiente** |
| 9868 | Siempre Serás Parte de Mí Adulto | 1164 | 40 | 1 | **Pendiente** |
| 9864 | Siempre en mi Corazón Abuelo Adulto | 1112 | 20 | 1 | **Pendiente** |
| 9865 | Siempre en mi Corazón Abuela Adulto | 1112 | 20 | 1 | **Pendiente** |

Las escenas, nombres, fondos, efectos e iluminación de **los 12** ya se reconstruyeron
desde su infantil (paso 0, ya hecho). Lo que falta en los pendientes son **los poemas**.

---

## 4. Herramientas que ya existen

Todo corre con el venv del pipeline: **`PromptsPixelArtPlantillas/.venv/bin/python`**.
El `python3` del sistema no tiene `openai` y falla.

| Archivo | Qué hace |
|---|---|
| `scripts/rebuild_adult_books_from_infant.py` | Reconstruye nombre/escena/fondo/efectos/luz de **todos** los libros adultos desde su infantil. Genera `content/rebuild-adult-books-from-infant.sql` (340 UPDATE). Ya ejecutado. |
| `scripts/build_adult_poems_sql.py --book <id>` | Convierte `adult-books/<carpeta>/poems.py` en el backfill SQL del libro. Tiene un `REGISTRY` al que hay que agregar cada libro nuevo. |
| `scripts/run_adult_book_images.py --book <id>` | Genera las imágenes de catálogo. Tiene un `BOOKS` al que hay que agregar cada libro nuevo. Soporta `--dry-run` y `--only pos:DIRECCION`. |
| `scripts/recompose_papa_adult_v11.py` | Recompone tipografía sobre los raws guardados, **sin costo**. Úsalo para cualquier corrección de título o poema. |

Todos los SQL se cablean a `backend/api/src/database/seed.ts` para que lleguen a
producción solos.

---

## 5. Paso 0 — Verificar el punto de partida (obligatorio, no asumir nada)

Antes de tocar un solo libro hay que comprobar cuatro cosas. Si alguna falla, **parar** y
resolverla; no seguir adelante.

### 0.1 — El entorno responde

```bash
cd ~/Desktop/Pixelart/PromptsPixelArtPlantillas
docker ps --format '{{.Names}}' | grep pixelart_postgres
./.venv/bin/python -c "import openai, PIL; print('entorno ok')"
```

Esperado: imprime `pixelart_postgres` y después `entorno ok`.

- Si no aparece `pixelart_postgres`: la base no está levantada. Correr
  `npm run infra:up` desde la raíz del repo y reintentar.
- Si el import falla: se está usando el python equivocado. Usar siempre
  `./.venv/bin/python`, nunca `python3` ni `python`.

### 0.2 — La reconstrucción de escenas ya corrió

Las escenas, nombres, fondos, efectos e iluminación de los 12 libros adultos ya se
reconstruyeron desde su libro infantil. **Confirmarlo**, no asumirlo:

```sql
SELECT m.name AS libro,
       count(*) AS plantillas,
       count(DISTINCT left(t.scene_visual,120)) AS escenas_distintas
FROM personalized_templates t JOIN personalized_models m ON m.id = t.model_id
WHERE t.is_active AND m.name ILIKE '%adulto%'
GROUP BY m.name ORDER BY 3;
```

**Esperado:** `escenas_distintas` entre 20 y 21 en todos los libros.

- Si algún libro da **1 o 2**, la reconstrucción no se aplicó en esa base. Correr:
  ```bash
  ./.venv/bin/python scripts/rebuild_adult_books_from_infant.py
  docker exec -i pixelart_postgres psql -U pixelart -d pixelart -P pager=off -q \
    < ../backend/api/src/database/content/rebuild-adult-books-from-infant.sql
  ```
  y volver a comprobar.
- **No correr ese script "por si acaso".** Es idempotente, pero si alguien agregó una
  sustitución nueva a `AGE_SUBS` sin verificarla, se propaga a los 340 registros.

### 0.3 — Los nombres coinciden con el infantil

```sql
WITH pares(adulto,infantil) AS (VALUES (9775,8),(9861,9),(9862,10),(9863,11),(9859,12),
  (9860,13),(9857,5),(9868,1164),(9864,1112),(9865,1112),(9866,1063),(9867,1063))
SELECT ma.name AS libro, count(*) AS plantillas,
       count(*) FILTER (WHERE EXISTS (
         SELECT 1 FROM personalized_templates ti
         WHERE ti.model_id = p.infantil AND ti.is_active
           AND regexp_replace(ti.name,' De .*','') = regexp_replace(ta.name,' De .*','')
       )) AS coinciden
FROM pares p
JOIN personalized_models ma ON ma.id = p.adulto
JOIN personalized_templates ta ON ta.model_id = p.adulto AND ta.is_active
GROUP BY ma.name ORDER BY 1;
```

**Esperado:** `coinciden` igual a `plantillas` en todos. Si no, repetir 0.2.

### 0.4 — No hay plantillas duplicadas ni sobrantes

```sql
SELECT m.name AS libro, coalesce(t.gender_direction,'(sin)') AS dir, count(*)
FROM personalized_templates t JOIN personalized_models m ON m.id = t.model_id
WHERE t.is_active AND m.name ILIKE '%adulto%'
GROUP BY 1,2 ORDER BY 3 DESC;
```

**Esperado:** 20 por dirección. Si algún libro da 30, hay una serie abandonada activa; ver
`content/deactivate-papa-mi-heroe-duplicate-templates.sql` como referencia del arreglo
(desactivar, nunca borrar, y matchear por criterios estables).

---

## 6. Paso 1 — Recoger los datos del libro

Todos los valores que hacen falta después salen de la base. **No inventarlos ni
deducirlos del nombre del libro.**

### 1.1 — Direcciones y numeración de claves

```sql
SELECT gender_direction,
       count(*),
       min(regexp_replace(template_preview_key,'^.*Libros/','')) AS primera,
       max(regexp_replace(template_preview_key,'^.*Libros/','')) AS ultima
FROM personalized_templates
WHERE model_id = <ADULTO> AND is_active
GROUP BY 1 ORDER BY 3;
```

Ejemplo real de Te Amo, Abuela Adulto (9863):

```
HE_TO_SHE  | 20 | Te_amo_abuela_adulto/Plantillas/Plantilla_01_..._de_hijo_a_abuela.webp  | ..._Plantilla_20_...
SHE_TO_SHE | 20 | Te_amo_abuela_adulto/Plantillas/Plantilla_21_..._de_hija_a_abuela.webp  | ..._Plantilla_40_...
```

De aquí salen tres cosas:

- **`key_prefix`**: todo lo anterior al nombre del archivo, con el prefijo completo.
  En el ejemplo: `IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/`
- **`block`** de cada dirección: la que arranca en `Plantilla_01` lleva `block: 0`; la que
  arranca en `Plantilla_21` lleva `block: 20`. **Comprobarlo, no suponerlo**: no todos los
  libros usan el mismo orden de direcciones.
- **Los nombres de dirección exactos** (`HE_TO_SHE`, `SHE_TO_SHE`, `HE_TO_HE`,
  `SHE_TO_HE`, `F`, `M`, o `NULL`). Varían por libro.

Aviso: los nombres de archivo de las claves todavía dicen los títulos inventados viejos
(`la_calma_que_me_enseno_a_respirar`). **Es cosmético, no se toca.** La clave es solo un
identificador; lo que se muestra es `name` en la BD.

### 1.2 — Los 20 temas infantiles con escena y poema

```sql
SELECT (regexp_replace(template_preview_key,'^.*PLANTILLA_(\d+)_.*$','\1'))||'. '
       ||regexp_replace(name,' De .*','')
       ||E'\nESCENA: '||left(regexp_replace(scene_visual,E'\n+',' ','g'),250)
       ||E'\nPOEMA:\n'||poem_template
FROM personalized_templates
WHERE model_id = <INFANTIL> AND is_active AND gender_direction = '<UNA DIRECCION>'
ORDER BY (regexp_replace(template_preview_key,'^.*PLANTILLA_(\d+)_.*$','\1'))::int;
```

Si el libro infantil tiene `gender_direction` NULL, quitar esa condición del WHERE.

**Leer los 20 enteros antes de escribir nada.** El poema infantil es la referencia de
**forma**, no de contenido. Ejemplo real (Mamá Mi Heroína, plantilla 1):

```
No necesitas capa para volar,
ni superpoderes para brillar,
con tu amor me haces invencible,
eres la heroína más increíble.

Salvas mi día con tu sonrisa,
me proteges con tu amor sin prisa,
eres más fuerte que cualquier villano,
mi superheroína, tomo tu mano.

Cuando el mundo se pone difícil,
tú me haces sentir invencible,
gracias por ser mi protectora,
mi {APODO_DESTINATARIO}, mi superheroína a toda hora.
```

Lo que se copia de ahí: tres estrofas de cuatro versos, rima AABB, imágenes del tema
(capa, superpoderes, villano), apodo integrado al verso. Lo que **no** se copia: los
versos, ni la voz de niño.

### 1.3 — Elegir los nombres de ejemplo

Hacen falta tres: el destinatario y un dedicante por dirección. Reglas:

- **Cortos.** El nombre se imprime en el poema y cuenta para el límite de 520px. "Rosa"
  (4 caracteres) es mejor que "Doña Rosario" (12).
- **Peruanos y neutros.** Los ya usados: Leo (papá), Carmen (mamá), Rosa (abuela),
  Mateo (hijo/nieto), María (hija/nieta). Reutilizarlos mantiene consistencia.
- El del **destinatario** es el que reemplaza `{APODO_DESTINATARIO}` en la imagen.

### 1.4 — Describir al destinatario para el prompt

Una frase en inglés, con esta forma exacta:

```
<Nombre>, a fictional Peruvian-Latin <parentesco> of <edad> with <pelo>,
a warm noble expression and an unmistakably adult face
```

Ejemplos ya usados:

- Papá: `Leo, a fictional Peruvian-Latin father of 58 with silver hair, a warm noble expression and an unmistakably adult face`
- Mamá: `Carmen, a fictional Peruvian-Latin mother of 58 with dark hair streaked with silver, a warm noble expression and an unmistakably adult face`
- Abuela: `Rosa, a fictional Peruvian-Latin grandmother of 75 with white hair worn up, a warm noble expression and an unmistakably adult face`

Edades: padres/madres 58, abuelos/abuelas 75. Los dedicantes adultos van en 32 (hombre)
y 30 (mujer). **No cambiar esas edades**: están calibradas para que la diferencia lea
como generacional y no como pareja.

---

## 7. Proceso por libro (pasos 2 a 8)

### Paso 2 — Escribir los poemas

Crear `PromptsPixelArtPlantillas/adult-books/<slug>-adult/poems.py` con esta forma:

```python
NICK = "{APODO_DESTINATARIO}"
POEMS: dict[int, dict[str, str]] = {}

POEMS[1] = {
"nieta": f"""...""",   # las claves dependen del libro: hija/hijo, nieta/nieto, etc.
"nieto": f"""...""",
}
# ... hasta POEMS[20]

EXPECTED = {
    **{p: "inicio" for p in (1, 4, 7, 10, 13, 16, 19)},
    **{p: "medio"  for p in (2, 5, 8, 11, 14, 17, 20)},
    **{p: "final"  for p in (3, 6, 9, 12, 15, 18)},
}
```

Requisitos de cada poema:

- **Tres estrofas de cuatro versos.** Sin excepciones.
- **Rima AABB** por estrofa. La **asonancia castellana vale** (`menos`/`tiempo` rima,
  `voz`/`nombró` rima). No se cuentan como error.
- **Imágenes del propio tema.** Si el tema es la corona, el poema habla de la corona. Si
  es el timón, del timón. Nunca genérico.
- **Voz adulta.** Alguien de treinta y tantos mirando atrás: "crecí y entendí", "hoy que
  llevo mi casa", "ahora que pago mis cuentas". No un niño en el momento.
- **Originales.** No son traducciones ni adaptaciones del poema infantil.
- **Versos cortos.** Apuntar a **menos de 45 caracteres**. Ver trampa #2.
- El apodo en la posición que marca `EXPECTED`.

### Paso 3 — Verificar los poemas ANTES de generar nada

Este paso no es opcional. Corrige en texto lo que después costaría dinero.

```python
# verificar.py — correr con PromptsPixelArtPlantillas/.venv/bin/python
import sys, re, importlib.util
sys.path.insert(0, 'adult-books/<slug>-adult')
import poems
from PIL import ImageDraw, Image
spec = importlib.util.spec_from_file_location("v3","scripts/generate_papa_hijo_adult_first_10_peru_v3.py")
v3 = importlib.util.module_from_spec(spec); spec.loader.exec_module(v3)
draw = ImageDraw.Draw(Image.new("RGB",(1600,944))); f = v3.font(21, b"Medium"); LIMITE = 520

def ubic(p):
    i = p.find("{APODO")
    return "inicio" if i <= len(p)/3 else ("medio" if i <= 2*len(p)/3 else "final")

errores, anchos = [], []
for pos in sorted(poems.POEMS):
    for quien, texto in poems.POEMS[pos].items():
        est = [e for e in texto.split("\n\n") if e.strip()]
        if len(est) != 3 or {len(e.strip().split("\n")) for e in est} != {4}:
            errores.append(("estructura", pos, quien))
        if ubic(texto) != poems.EXPECTED[pos]:
            errores.append(("apodo", pos, quien, ubic(texto)))
        for l in texto.split("\n"):
            if l.strip():
                w = draw.textbbox((0,0), l.replace("{APODO_DESTINATARIO}", "<NOMBRE_EJEMPLO>"), font=f)[2]
                if w > LIMITE: anchos.append((w, pos, quien, l))
print("errores:", errores or "ninguno")
print("versos que se desbordan:", len(anchos))
for a in sorted(anchos, reverse=True)[:15]: print("  ", a)
```

**Debe dar cero en las tres cosas.** Si hay versos largos, se acortan los versos; no se
baja el tamaño de fuente (ver trampa #2).

### 3.bis — Las dos comprobaciones que delatan un poema de fórmula

Las anteriores verifican la **forma**. Estas dos verifican que los poemas sean de verdad
distintos entre sí. Son obligatorias: un lote completo pasó las tres primeras y falló
estas dos (ver trampa #12).

```python
import re
from collections import Counter

def ultima(verso):
    w = re.findall(r"[A-Za-zÁÉÍÓÚÑáéíóúñ]+", verso)
    return w[-1].lower() if w else ""

def vocales(palabra):  # asonancia aproximada: las dos últimas vocales
    v = re.findall(r"[aeiou]", palabra.lower().translate(str.maketrans("áéíóúü","aeiouu")))
    return "".join(v[-2:]) if len(v) >= 2 else "".join(v)

finales, sin_rima, auto_rima, total = Counter(), 0, 0, 0
for pos, por_dir in poems.POEMS.items():
    for quien, t in por_dir.items():
        total += 1
        for v in t.splitlines():
            if v.strip(): finales[ultima(v)] += 1
        for estrofa in [e for e in t.split("\n\n") if e.strip()]:
            vs = [v for v in estrofa.splitlines() if v.strip()]
            if len(vs) == 4:
                for x, y in ((0, 1), (2, 3)):
                    a, b = ultima(vs[x]), ultima(vs[y])
                    if a == b:
                        auto_rima += 1          # la palabra rima consigo misma: no es rima
                    elif vocales(a) != vocales(b):
                        sin_rima += 1

versos = sum(finales.values())
print("estrofas sin rima AABB:", sin_rima, f"de {total*3}")
print("pareados que riman una palabra consigo misma:", auto_rima)
print("palabras finales más repetidas:")
for w, c in finales.most_common(6):
    print(f"   {w:<14} {c:>4}  ({c/versos*100:.1f}% de los versos)")
```

**Criterio de aceptación:**

- `pareados que riman una palabra consigo misma` tiene que ser **0**. Cerrar un pareado
  repitiendo la misma palabra (`vendaval` / `vendaval`, `volver` / `volver`) no es rimar,
  y el chequeo de vocales lo deja pasar porque las vocales coinciden trivialmente. Única
  excepción: una repetición **deliberada** como recurso, donde el eco es el efecto
  buscado y los dos versos tienen la misma construcción (*"Cuando algo no lo entiendo,
  leo. / Cuando algo duele mucho, leo."*). Si hay que explicar por qué es deliberada, no
  lo es.
- `estrofas sin rima AABB` tiene que ser **0**. La asonancia castellana cuenta como rima,
  así que este chequeo ya es permisivo; si marca algo, es que de verdad no rima.
- Ninguna palabra final puede pasar del **2% de los versos**. De referencia: en un lote
  bien escrito la más repetida llega al 1,0%; en uno de fórmula, dos palabras llegaron al
  8,3% **cada una**, apareciendo en el 100% de los poemas.

Si alguna de las dos falla, los poemas están hechos con una plantilla y hay que
reescribirlos. No sirve parchear los versos que marca: el problema es el método.

Revisar además a mano el **género**: las palabras que describen al **destinatario**
(mamá, abuela, abuelo) van en su género siempre, en las dos direcciones. Solo cambian
las que describen a **quien habla**. Un chequeo automático da falsos positivos con
`solo`, `mismo/misma`, `seguro` y `una sola vez`, así que se revisa el diff entre las dos
versiones verso por verso.

### Paso 4 — Cargar los poemas a la BD

Agregar el libro a `REGISTRY` en `scripts/build_adult_poems_sql.py`:

```python
9862: ("te-amo-abuelo-adult", {"HE_TO_HE": "nieto", "SHE_TO_HE": "nieta"}, "te-amo-abuelo"),
```

Luego:

```bash
cd ~/Desktop/Pixelart/PromptsPixelArtPlantillas
./.venv/bin/python scripts/build_adult_poems_sql.py --book 9862
docker exec -i pixelart_postgres psql -U pixelart -d pixelart -P pager=off -q \
  < ../backend/api/src/database/content/backfill-te-amo-abuelo-adult-poems.sql
```

Y cablear el SQL en `backend/api/src/database/seed.ts`, junto a los otros
`backfill-*-adult-poems.sql`, para que llegue a producción.

Verificación:

```sql
SELECT count(*) plantillas, count(DISTINCT poem_template) poemas,
  count(*) FILTER (WHERE position('{APODO' in poem_template) <= length(poem_template)/3) inicio,
  count(*) FILTER (WHERE position('{APODO' in poem_template) > length(poem_template)/3
                     AND position('{APODO' in poem_template) <= 2*length(poem_template)/3) medio,
  count(*) FILTER (WHERE position('{APODO' in poem_template) > 2*length(poem_template)/3) final
FROM personalized_templates WHERE model_id = <ADULTO> AND is_active;
```

Esperado: 20 o 40 plantillas, **muchos** poemas distintos (no 1), y el apodo repartido.

### Paso 5 — Registrar el libro en el generador de imágenes

En `scripts/run_adult_book_images.py`, agregar una entrada a `BOOKS`. Los datos salen de
la BD:

```python
9862: {
    "label": "Te Amo, Abuelo Adulto",
    "infant_model": 10,
    "folder": "Te Amo, Abuelo Adulto",
    "output": "demo-abuelo-adulto-v1",
    "key_prefix": "IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/",
    "recipient": ("Jorge, a fictional Peruvian-Latin grandfather of 75 with white hair, "
                  "a warm noble expression and an unmistakably adult face"),
    "example_names": {"recipient": "Jorge", "nieto": "Mateo", "nieta": "María"},
    "directions": {
        "HE_TO_HE":  {"label": "Nieto adulto → Abuelo",  "slug": "nieto_a_abuelo", "block": 0,
                      "person": "Mateo, his fictional Peruvian-Latin adult grandson of 32, wearing mature contemporary clothing"},
        "SHE_TO_HE": {"label": "Nieta adulta → Abuelo", "slug": "nieta_a_abuelo", "block": 20,
                      "person": "María, his fictional Peruvian-Latin adult granddaughter of 30, wearing mature contemporary clothing"},
    },
},
```

Notas sobre los campos:

- `block`: la segunda dirección continúa la numeración de claves. Las posiciones 1-20 son
  la primera dirección (`block: 0`) y las 21-40 la segunda (`block: 20`). Confirmar con:
  `SELECT gender_direction, min(template_preview_key), max(template_preview_key) FROM personalized_templates WHERE model_id=<ADULTO> AND is_active GROUP BY 1;`
- `example_names`: las claves de los dedicantes se derivan del `slug` cortando en el
  primer `_`. Si el slug es `nieto_a_abuelo`, la clave es `nieto`.
- `recipient`: describe al destinatario. El runner lo inyecta reemplazando la frase de
  Papá en el prompt.

Comprobar sin gastar:

```bash
./.venv/bin/python scripts/run_adult_book_images.py --book 9862 --dry-run
```

Debe listar las 20 o 40 plantillas con su referencia infantil correcta.

### Paso 6 — Prueba de 2 imágenes

**Nunca generar el libro entero de golpe.** Hay que elegir dos, y la elección no es
al azar. Regla concreta:

**La primera** — la de **disfraz más elaborado**. Se identifica leyendo las escenas del
paso 1.2 y buscando la que más vestuario y objetos nombra: armadura, katana, túnica,
corona, alas, varita, timón. Esa prueba si la fantasía sobrevivió al cambio de edad, que
es el fallo número uno.

**La segunda** — la de **mayor riesgo de pose**. En orden de prioridad:
1. Una donde el infantil diga "cargando en brazos", "en su regazo", "arrodillada a la
   altura" o "con los pies sobre los de"
2. Si no hay ninguna, la de abrazo más cercano o contacto más íntimo
3. Si tampoco, la que tenga el título más largo (prueba la zona del título)

Para encontrarlas sin leer las 20 a mano:

```sql
SELECT (regexp_replace(template_preview_key,'^.*PLANTILLA_(\d+)_.*$','\1'))::int AS pos,
       regexp_replace(name,' De .*','') AS tema,
       (scene_visual ~* '(armadura|katana|túnica|corona|alas|varita|timón|disfraz|capa)') AS disfraz,
       (scene_visual ~* '(brazos|regazo|arrodillad|abraz|pies sobre)') AS contacto
FROM personalized_templates
WHERE model_id = <INFANTIL> AND is_active
ORDER BY disfraz DESC, contacto DESC, pos;
```

Las dos primeras filas del resultado son las candidatas.

```bash
./.venv/bin/python scripts/run_adult_book_images.py --book 9862 --only 3:HE_TO_HE,7:SHE_TO_HE
```

Cuesta ~$0.09. Revisar contra la lista del paso 8. Si las dos pasan, el resto pasa.

### Paso 7 — El resto del libro

```bash
./.venv/bin/python scripts/run_adult_book_images.py --book 9862
```

Salta las ya generadas. ~$0.047 por imagen: $0.94 un libro de 20, $1.90 uno de 40.
Tarda 15-35 minutos. El resumen y los fallos quedan en `report.json` dentro de la carpeta
de salida.

### Paso 8 — Revisión visual

Abrir la carpeta y revisar **todas**. Lista de chequeo por imagen:

- [ ] El tema del infantil está presente: disfraz, objetos, escenario, efectos mágicos
- [ ] Los dos protagonistas son adultos de estatura comparable
- [ ] Se lee como padre/madre/abuelo con su hijo o nieto adulto, **nunca como pareja**
- [ ] El título no toca ninguna cara ni cabeza, y su línea decorativa tampoco
- [ ] El poema entra entero, sin cortarse en el borde derecho
- [ ] No aparece `{APODO_DESTINATARIO}` ni ningún otro placeholder
- [ ] Ninguna cabeza cortada por el borde superior
- [ ] El doblez central no parte una cara
- [ ] Sin utilería infantil: peluches, juguetes, cunas, ropa de cama de niños
- [ ] Sin disfraces que se parezcan a marcas registradas

**Cómo juzgar cada punto**, porque "se ve bien" no es un criterio:

- **Tema presente**: abrir la escena infantil del paso 1.2 al lado y comparar objeto por
  objeto. Si el infantil dice "katana en posición de descanso" y la imagen no tiene
  katana, falla. No vale "se parece".
- **Escala**: la diferencia de altura entre los dos no debe superar la de dos adultos
  cualesquiera. Si uno le llega al pecho al otro, falla.
- **Parentesco**: la pregunta es "¿esta foto podría ser de una pareja?". Señales de
  pareja: mejilla contra mejilla, manos en la cintura, dedos entrelazados, miradas
  frente a frente a la misma altura, diferencia de edad menor a 20 años aparentes. Un
  abrazo con la cabeza en el pecho o en el hombro **no** es señal de pareja.
- **Título**: mirar también la **línea decorativa** bajo el título, no solo las letras.
  En Papá cruzaba los ojos del padre en tres plantillas.
- **Poema**: leer el verso más largo de cada estrofa y confirmar que no toca el borde
  derecho de la página.
- **Doblez**: seguir el pliegue de arriba abajo. Si cruza una cara, falla. Si cruza unas
  manos unidas, falla (desaparecen en el lomo al imprimir).
- **Utilería infantil**: mirar el fondo completo, no solo a los protagonistas. Los
  peluches aparecen en sofás, camas y repisas.

### Qué hacer con cada tipo de fallo

| Falla | Arreglo | Costo |
|---|---|---|
| Placeholder impreso, verso cortado, título mal escrito, sombra del texto | Corregir el texto y **recomponer** desde el raw guardado | **$0** |
| Tema ausente, escala mal, pose de pareja, doblez partiendo una cara, utilería infantil | Corregir la escena en el SQL del libro, recargar, borrar esa imagen y **regenerar solo esa** | ~$0.047 |
| Fallo de moderación dos veces seguidas | Anotarla, seguir con el resto, relanzarla sola más tarde con `--only` | — |

Recomposición sin costo:

```bash
./.venv/bin/python scripts/recompose_papa_adult_v11.py --only <pos>:<DIRECCION>
```

Regeneración de una sola imagen:

```bash
rm "output/<Carpeta>/<salida>/webp/plantilla_<NN>_<slug>_<dir>.webp"
./.venv/bin/python scripts/run_adult_book_images.py --book <ID> --only <pos>:<DIRECCION>
```

---

## 8. Ejemplo completo: Te Amo, Abuelo Adulto (9862)

Es el siguiente libro pendiente. Todos los valores de abajo **salieron de las consultas
del paso 1**, no están inventados. Sirve de molde para los demás.

### Datos recogidos

```
modelo adulto     : 9862
modelo infantil   : 10  (Te amo, abuelo)
plantillas        : 40  (20 por dirección)
direcciones       : HE_TO_HE  -> Plantilla_01..20, sufijo de_nieto_a_abuelo
                    SHE_TO_HE -> Plantilla_21..40, sufijo de_nieta_a_abuelo
key_prefix        : IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/
destinatario      : abuelo
nombres de ejemplo: Jorge (abuelo), Mateo (nieto), María (nieta)
```

Nótese que `HE_TO_HE` arranca en `Plantilla_01`, así que lleva `block: 0`, y
`SHE_TO_HE` arranca en `Plantilla_21`, así que lleva `block: 20`. **En otro libro puede
ser al revés.**

### Plantillas elegidas para la prueba

La consulta de candidatas devolvió:

```
1 | Mi Superhéroe de Canas Plateadas | disfraz: sí | contacto: sí
4 | El Ángel Guardián de la Familia  | disfraz: sí | contacto: sí
2 | El Rey de Mi Corazón             | disfraz: sí | contacto: no
```

Se prueban la **1** y la **4**: ambas tienen disfraz y contacto físico, que son los dos
modos de fallo principales.

```bash
./.venv/bin/python scripts/run_adult_book_images.py --book 9862 --only 1:HE_TO_HE,4:SHE_TO_HE
```

### Entrada en `REGISTRY` de `scripts/build_adult_poems_sql.py`

```python
9862: ("te-amo-abuelo-adult", {"HE_TO_HE": "nieto", "SHE_TO_HE": "nieta"}, "te-amo-abuelo"),
```

El diccionario del medio mapea **el nombre de la dirección en la BD** a **la clave que se
usa dentro de `POEMS`**. Si en `poems.py` las claves son `"nieto"` y `"nieta"`, aquí van
esas mismas palabras, exactamente igual escritas.

### Entrada en `BOOKS` de `scripts/run_adult_book_images.py`

```python
9862: {
    "label": "Te Amo, Abuelo Adulto",
    "infant_model": 10,
    "folder": "Te Amo, Abuelo Adulto",
    "output": "demo-abuelo-adulto-v1",
    "key_prefix": "IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/",
    "recipient": ("Jorge, a fictional Peruvian-Latin grandfather of 75 with white hair, "
                  "a warm noble expression and an unmistakably adult face"),
    "example_names": {"recipient": "Jorge", "nieto": "Mateo", "nieta": "María"},
    "directions": {
        "HE_TO_HE": {"label": "Nieto adulto → Abuelo", "slug": "nieto_a_abuelo", "block": 0,
                     "person": ("Mateo, his fictional Peruvian-Latin adult grandson of 32, "
                                "wearing mature contemporary clothing")},
        "SHE_TO_HE": {"label": "Nieta adulta → Abuelo", "slug": "nieta_a_abuelo", "block": 20,
                      "person": ("María, his fictional Peruvian-Latin adult granddaughter of 30, "
                                 "wearing mature contemporary clothing")},
    },
},
```

Tres cosas que se rompen fácil en esta entrada:

- **`slug`** tiene que empezar con la misma palabra que la clave de `example_names`. El
  runner hace `slug.split("_")[0]` para buscar el nombre del dedicante. Si el slug es
  `nieto_a_abuelo`, busca `example_names["nieto"]`. Si no coincide, revienta con
  `KeyError`.
- **`person`** empieza con `his` o `her` según el género del **destinatario**, no del
  dedicante. Para un abuelo es `his`; para una abuela, `her`.
- **`folder`** es el nombre de la carpeta bajo `output/`, con tildes y comas tal como se
  quiera ver. No tiene que coincidir con nada de la BD.

### Línea a agregar en `seed.ts`

Junto a los otros `backfill-*-adult-poems.sql`, antes de la desactivación de duplicados:

```typescript
await client.query(
  readFileSync(join(__dirname, 'content/backfill-te-amo-abuelo-adult-poems.sql'), 'utf8'),
);
console.log('[seed] poemas originales (Te Amo Abuelo — adulto) ✓');
```

---

## 9. Trampas conocidas

Cada una se descubrió rompiendo algo. Están en orden de cuánto cuesta ignorarlas.

### #1 — El tema es el disfraz

**Síntoma:** "Mi Titán" sale como dos señores mirando el mar. "Me Enseñaste Que Soy un
Rey" sale sin corona.
**Causa:** interpretar "versión adulta" como "quitar la fantasía y volverlo realista".
**Qué pasa si se ignora:** las plantillas 1 a 10 de casi todos los libros son de disfraz
(Superhéroe, Caballero, Rey, Ángel, Pirata, Guerrero, Capitán, Vikingo, Arquitecto,
Gladiador). Con ese criterio **la mitad del libro no se puede hacer**.
**Regla:** se conserva el disfraz, el objeto mítico y el escenario. Solo cambia la edad.

### #2 — Los versos tienen que entrar en 520 píxeles

**Síntoma:** el poema se corta en el borde derecho de la página.
**Causa:** la columna del poema va de x=1000 al borde, centrada en x=1260, así que el
ancho útil es **520px** a fuente 21. Los poemas de Papá entraban porque sus versos no
pasan de 35 caracteres; el primer borrador de Mamá llegó a 62.
**Cómo medir:** con PIL contra la fuente real (ver paso 3). **El número de caracteres es
mal indicador**, y el placeholder `{APODO_DESTINATARIO}` son 20 caracteres anchos que
infla todo verso que lo lleve.
**Qué NO hacer:** bajar el tamaño de fuente. Ese libro se vería distinto de Papá y Mamá
en el mismo catálogo. Se acortan los versos, que además le sienta mejor al castellano.

### #3 — El placeholder no puede llegar a la imagen

**Síntoma:** en la página se lee literalmente `{APODO_DESTINATARIO}`.
**Causa:** la BD conserva el placeholder para el producto real, y la imagen de catálogo
se compone de ese mismo texto.
**Estado:** ya resuelto en `run_adult_book_images.py`, que rellena desde `example_names`
y **falla duro** si sobrevive algún `{`. No quitarlo.

### #4 — El tamaño del niño está codificado en más sitios que la pose

**Síntoma:** un papá gigante junto a una persona diminuta.
**Causa real:** la escena infantil de "Cuando Bailamos en la Sala" dice *"con los pies
sobre los de su papá"*. Al copiarlo literal, el modelo tuvo que encoger al adulto.
Lo mismo con "cargando en brazos", "en brazos de su titán", "En sus brazos,", "con
facilidad", "recostada en su regazo".
**Regla:** buscar **cualquier** detalle que implique el tamaño del niño, no solo las
poses de cariño. `rebuild_adult_books_from_infant.py` ya cubre los conocidos en
`AGE_SUBS`; si aparece uno nuevo, se agrega ahí.
**Orden importa:** los patrones de "arrodillarse PARA alcanzar la altura" van **antes**
que los de altura sueltos. Si no, se reemplaza la frase de altura y sobrevive el verbo,
produciendo "arrodillado de pie junto a". Y nunca matchear un "arrodillado" suelto:
"arrodillados junto a un cantero de flores" es una pose adulta perfectamente válida.

### #5 — La utilería también codifica la edad

**Síntoma:** un oso de peluche y un edredón de estrellitas junto a alguien de 30 años.
**Causa doble:** el fondo infantil se copia tal cual y a veces nombra juguetes; y el
modelo los **inventa** aunque no estén escritos (pasó en "El Ritual Más Sagrado", donde
el texto no mencionaba ningún peluche).
**Fix:** `rebuild_adult_books_from_infant.py` limpia los escritos, y `LAYOUT` en
`run_adult_book_images.py` lleva una prohibición explícita para los inventados. Revisar
igual en la revisión visual.

### #6 — El parentesco hay que decirlo

**Síntoma:** las imágenes se leen como pareja romántica en vez de padre e hija.
**Causa:** es la misma regla que las mascotas en `CLAUDE.md`: **un nombre propio no le
comunica el parentesco al modelo**. "Papá Leo" y "María" no dicen que son padre e hija.
El modelo ve dos adultos cerca con afecto y dibuja una pareja.
**Fix:** la cláusula de parentesco va en cada `scene_visual` (ya la pone el
reconstructor). En Mamá no apareció ni una vez el problema; en Papá, antes de la
cláusula, apareció en todas las de hija.
**Lo que NO hace falta:** prohibir el cariño. Un abrazo padre-hijo está bien. Lo que
lee como pareja es la **gramática de pareja**: manos en la cintura y dedos entrelazados.

### #7 — La moderación es probabilística

**Síntoma:** `moderation_blocked`, etapa de salida, categoría "other".
**Realidad:** no es determinista. Una plantilla inocua falla una vez y pasa a la
siguiente. En la prueba de Mamá falló 1 de 2 y las 38 restantes salieron sin un solo
reintento.
**Fix:** `run_adult_book_images.py` reintenta una vez y, si vuelve a fallar, lo anota en
`report.json` y sigue. **No abortar la corrida.** Si una plantilla falla dos veces, se
relanza sola con `--only`.

### #8 — El doblez central

**Síntoma:** la cara de alguien queda partida por el pliegue, o las manos unidas caen en
el lomo y desaparecen al imprimir.
**Estado:** es la regla que peor respeta el modelo, incluso estando escrita. Pasó en
Papá y en Mamá. **Revisarlo siempre a ojo**; no se puede confiar en el prompt.

### #12 — Pasar la verificación de forma no significa que los poemas sean buenos

**Síntoma:** los 220 poemas de un lote dieron cero problemas de estructura, cero de
posición del apodo y cero versos desbordados. Y aun así estaban hechos con una plantilla:
**el 100% contenía un verso terminado en "camino" y otro en "destino"**, y el **88% tenía
la primera estrofa sin rimar**.
**Causa:** los tres chequeos originales miden la forma, no la variedad. Un generador que
rellena un esqueleto los pasa todos.
**Fix:** el paso 3.bis, que mide repetición de palabras finales y rima real por estrofa.
**Y además:** leer 3 o 4 poemas completos de cada libro, de plantillas distintas. Ningún
script detecta que "agradezco tu destino" no significa gran cosa.

### #9 — El `python3` del sistema no sirve

Usar **`PromptsPixelArtPlantillas/.venv/bin/python`** siempre. El del sistema no tiene
`openai` y revienta al importar el módulo de generación.

### #10 — Nunca matchear por id en un backfill

Los ids de `personalized_templates` son autogenerados y **difieren entre entornos**. Un
backfill que matchea por id funciona en local y deja NULL en producción. Matchear siempre
por `template_preview_key`. Esto ya rompió los backfills de Memorias Familiares una vez.

### #11 — `backfill-familia-content.sql` tiene SEIS libros

Ese archivo cubre El_mejor_equipo, La_familia, Mama_mi_heroina, Papa_mi_heroe,
Te_amo_abuela y Te_amo_abuelo, y **todos reusan las mismas etiquetas** de dollar-quote:
`$f12a$` aparece 12 veces. Parsear por número de etiqueta devuelve la escena del último
libro. Hay que atar cada bloque al `template_preview_key` de su propia sentencia.
Síntoma que lo delató: "Mi Samurái" resolviendo a una escena de piratas.

---

## 10. Cosas de contenido que conviene mirar

No son errores técnicos, pero aparecen al adaptar:

- **Títulos que no funcionan para un adulto.** "Cuando Crezca Seré Como Tú" (Te Amo
  Abuela, 19) lo dice alguien que ya creció. Se puede salvar desde el poema, pero el
  título queda.
- **Poses imposibles.** "Durmiendo en Tu Regazo" (Te Amo Abuela, 7) y "Seré Tu Niño Para
  Siempre" (Papá, 20, que además es un díptico de dos momentos y el modelo lo duplicó).
- **Vestuario.** Un traje de superhéroe sin describir sale parecido a una marca; un
  atuendo de amazona sale más revelador en una adulta que en una niña. Para mercado
  familiar peruano conviene mirarlo.
- **Escenas con menores.** OpenAI bloquea generación fotorrealista de niños reales en
  escenas de cama o vulnerables. No aplica a los libros adultos, pero sí si alguien
  mezcla plantillas.

---

## 11. Resumen operativo

Por cada libro pendiente, en orden:

1. Leer los 20 temas infantiles con su escena y su poema
2. Escribir 20 poemas originales × 2 direcciones en `adult-books/<slug>-adult/poems.py`
3. **Verificar**: estructura 3×4, apodo en su posición, cero versos sobre 520px, género
4. Agregar al `REGISTRY`, generar el SQL, cargarlo, cablearlo al seed
5. Agregar a `BOOKS`, correr `--dry-run`
6. Probar 2 imágenes (~$0.09)
7. Generar el resto ($0.94 o $1.90)
8. Revisar todas con la lista del paso 8
9. Corregir: texto con recomposición (gratis), imagen regenerando solo esa

Costo total estimado de los 9 libros pendientes: unas **220 imágenes ≈ $10.30**.
