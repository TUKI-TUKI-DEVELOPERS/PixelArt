# Encargo para Pi — auditar la generación real de libros adultos

Las **portadas de catálogo** de los 12 libros adultos ya están hechas, revisadas y
subidas a MinIO local. Eso NO es lo que tienes que revisar.

Lo que tienes que auditar es el **flujo real**: lo que ocurre cuando un cliente sube
sus fotos, elige sus plantillas y el sistema le genera su libro. Ese camino es otro
código, otro tamaño de imagen y otro armado de prompt que el de las portadas, y
todavía no se ha probado con los libros adultos nuevos.

**Entregable:** un informe con hallazgos concretos, cada uno con la evidencia que lo
respalda (archivo y línea, consulta SQL con su resultado, o salida de un test). No
hace falta que arregles nada: la decisión de qué se corrige es del dueño del
proyecto. Si algo te parece defecto grave, dilo y explica por qué.

---

## 1 · Dónde vive el flujo real

| Pieza | Archivo |
|---|---|
| Orquesta la generación de la propuesta al cliente | `backend/api/src/demo/application/use-cases/generate-demo-proposal.use-case.ts` |
| Arma el prompt y rellena los placeholders de nombres | `backend/api/src/personalized/domain/services/build-generation-prompt.ts` |
| Arma el prompt de la tapa | `backend/api/src/personalized/domain/services/build-cover-prompt.ts` |
| Llama a gpt-image-2 (`images.edit`) y reintenta ante moderación | `backend/api/src/personalized/infrastructure/ai/openai-image-generation.adapter.ts` |
| Decide qué foto subida corresponde a qué rol | `backend/api/src/demo/domain/services/resolve-reference-photos.ts` |
| Cuántas fotos pide el wizard y con qué roles | `frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/[libroSlug]/WizardSection.tsx` |

Tests que ya existen y conviene leer antes de escribir otros:
`build-generation-prompt.spec.ts`, `build-cover-prompt.spec.ts`,
`resolve-reference-photos.spec.ts`.

Los libros adultos son los **modelos 9857 a 9868** en `personalized_templates`.
La base de datos es la fuente de verdad del contenido: `scene_visual`,
`poem_template`, `gender_direction`, `character_roles`, `template_preview_key`.

Para consultar: `docker exec pixelart_postgres psql -U pixelart -d pixelart`.

---

## 2 · Qué revisar

### 2.1 Apodo

Las 300 plantillas adultas llevan `{APODO_DESTINATARIO}` en su poema, sin excepción.
Verifícalo y luego responde qué pasa en los casos límite:

- Si el cliente **no escribe apodo**, ¿qué se imprime? Mira
  `build-generation-prompt.ts` alrededor de la línea 162: hay un *fallback* a
  `nombreDestinatario`. Confirma que nunca queda vacío ni imprime la llave literal.
- Alrededor de las líneas 181-183 hay una lógica que antepone `Para {APODO},` cuando
  el poema no menciona el apodo. En los libros adultos **todos** lo mencionan, así
  que esa rama no debería dispararse nunca. Confirma que no se dispara: si lo hace,
  el poema queda con un encabezado duplicado.
- Un apodo largo o con acentos, ¿rompe el ancho del verso? Ver 2.3.

### 2.2 Género

- Cada modelo tiene sus direcciones (`gender_direction`: `M`, `F`, `HE_TO_SHE`,
  `SHE_TO_SHE`, `HE_TO_HE`, `SHE_TO_HE`, o vacío). Comprueba que la dirección que
  elige el cliente selecciona el conjunto correcto de plantillas y no mezcla.
- Regla de contenido: las palabras que describen al **destinatario** (abuelo,
  abuela, papá, mamá) van siempre en su género. Solo cambian las que describen a
  **quien dedica**. En `siempre-seras-parte-de-mi-adult` los poemas se comparten
  entre las dos direcciones a propósito, porque hablan en segunda persona y no
  tienen palabra de género: verifica que sigue siendo cierto en la BD.
- **Antecedente real:** en `te-amo-abuelo-adult` se encontraron dos poemas que
  describían al hablante en masculino (`de adulto cansado`, `soy pequeño`) y se
  imprimían igual en la dirección de nieta. Ya está corregido; busca si queda algún
  caso equivalente en los otros once libros.

### 2.3 Dimensiones

Aquí está el punto que más me preocupa y el que menos verificado está:

- Las portadas de catálogo se generaron a **1600×944**.
- El flujo real genera a **2896×1024** (`SPREAD_SIZE` en
  `build-generation-prompt.ts:11`), que es una proporción mucho más ancha.

Las garantías de maquetación que validamos en las portadas —zona de título en el
tercio superior izquierdo, columna del poema con límite de 520 px, nada sobre el
doblez central— se calibraron para 1600×944. **No se trasladan solas a 2896×1024.**
Comprueba:

- Que el prompt real reserve zona de título y zona de poema coherentes con su propio
  tamaño, no con el de las portadas.
- Que el poema entre completo: tres estrofas de cuatro versos, con el apodo del
  cliente sustituido, sin desbordar ni recortarse.
- Que la tapa (`build-cover-prompt.ts`) use su propio cálculo de tamaño y no herede
  uno pensado para otra proporción.

### 2.4 Reparto y cantidad de fotos

- Compara, por libro, cuántas fotos pide `WizardSection.tsx` contra cuántas personas
  describe el `scene_visual` de sus plantillas en la BD.
- **Antecedente real:** en `Mi Familia Adulto` la escena describe papá, mamá e hijos,
  pero la configuración solo definía dos personas; el modelo o perdía al papá o
  clonaba un personaje para rellenar. Se corrigió en las portadas añadiendo un
  tercer integrante al reparto. Verifica si el flujo real tiene el mismo desajuste,
  porque es código distinto.
- Comprueba también `resolve-reference-photos.ts`: que cada foto subida llegue al rol
  que le toca y que no se intercambien cuando el cliente sube las fotos en otro orden.

### 2.5 Adulto, no niño

Los doce libros son adultos. El dedicante tiene treinta y tantos y el destinatario
cincuenta y ocho o setenta y cinco según el libro. Revisa que el prompt real diga
explícitamente que todas las figuras son adultas y que prohíba utilería infantil.
Si el cliente sube la foto de un adulto y el sistema devuelve algo que parece un
niño, el libro no sirve.

### 2.6 Placeholders

Ninguna llave puede llegar a la imagen. Busca en el flujo real todos los tokens que
existen —`{APODO_DESTINATARIO}`, `{NOMBRE_DESTINATARIO}`, `{NOMBRE_DEDICANTE}`,
`{APELLIDO}`— y confirma que cada uno se sustituye o se elimina antes de mandar el
prompt. El script de portadas aborta si queda una llave sin rellenar; comprueba si
el flujo real tiene una guarda equivalente.

### 2.7 Moderación

`openai-image-generation.adapter.ts` reintenta ante un bloqueo de moderación. La
moderación es probabilística: una plantilla inocua puede fallar una vez y pasar a la
siguiente. Verifica cuántos reintentos hace, qué le muestra al cliente si agota los
reintentos, y que un bloqueo puntual no deje la propuesta a medias ni cobre dos veces.

---

## 3 · Cómo verificar

Prioriza, en este orden:

1. **Leer el código** y contrastarlo con la BD. La mayoría de estos puntos se
   resuelven leyendo, sin generar ni una imagen.
2. **Tests.** Donde ya hay `.spec.ts`, añade casos a los existentes en vez de crear
   archivos nuevos. Ejecuta `cd backend/api && npm run test`.
3. **Una prueba de extremo a extremo con imágenes reales, solo si hace falta.** Cada
   imagen cuesta dinero y el saldo de la cuenta es limitado. Si la necesitas, pide
   autorización antes y haz una sola plantilla, no un libro entero.

---

## 4 · Qué NO hacer

- **No regeneres las portadas de catálogo.** Están aprobadas y subidas. Son 300
  imágenes y rehacerlas cuesta dinero.
- **No subas nada a MinIO** ni toques objetos existentes: no tiene versiones y no hay
  deshacer. El respaldo de lo anterior está en
  `PromptsPixelArtPlantillas/output/_RESPALDO-MINIO-20261002/`.
- **No despliegues a producción.** El despliegue lo hace el dueño del proyecto
  después de leer tu informe.
- **No cambies los poemas.** Si encuentras un problema de contenido, repórtalo con la
  plantilla y el verso exactos.

---

## 5 · Formato del informe

Por cada hallazgo:

- **Qué está mal**, en una frase.
- **Evidencia**: archivo y línea, o la consulta SQL con su resultado, o la salida del
  test.
- **Cuándo se rompe**: el caso concreto que lo dispara (un apodo vacío, una
  dirección de género determinada, un libro específico).
- **Gravedad**: bloquea el despliegue, o se puede corregir después.

Si un punto de la sección 2 queda bien, dilo también y con qué lo comprobaste. Un
informe que solo lista problemas no deja saber qué quedó cubierto.
