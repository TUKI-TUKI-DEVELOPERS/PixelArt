# Photobook a medida — checklist de avance

> **Cómo usar este archivo:** es la única fuente de verdad del avance. Antes de
> trabajar, lee "Dónde estamos". Al terminar una sub-tarea, marca su casilla y
> actualiza esa línea. Si una sesión se corta a la mitad, lo único que hay que
> leer para retomar es este archivo.
>
> El flujo narrativo completo está en `photobook-a-medida-flujo-y-pendientes.md`.
> **Ojo:** ese documento tiene 3 afirmaciones desactualizadas (ver "Correcciones
> pendientes al doc" al final).

**Dónde estamos:** pasos 1–11 terminados y verificados. Siguiente tarea: `12.2`.

**Los tiempos son minutos de escritura de Claude, no tuyos.** Suman ~3 h 15 min.
No son el calendario de la feature: la revisión y la prueba manual son tuyas y
siguen siendo el cuello de botella, sobre todo en el paso 12 (hoy no hay tests de
render que avisen si el refactor rompió el editor por tema — eso es lo que compra
la sub-tarea 10.2).

---

## Mapa general

| # | Paso | Estado |
|---|---|:---:|
| 1 | Cliente llena el formulario y sube 4 fotos fijas (2 tapa, 2 contratapa) | ✅ |
| 2 | Se crea la solicitud (`PENDING_REVIEW`) + correo al admin | ✅ |
| 3 | Admin ve la lista y abre el detalle | ✅ |
| 4 | Admin reemplaza y activa 1–2 fotos por superficie (tapa / contratapa) | ✅ |
| 5 | Admin escribe la dirección creativa | ✅ |
| 6 | IA genera tapas; admin elige una | ✅ |
| 7 | IA genera contratapa heredada; admin elige una | ✅ |
| 8 | Admin envía enlace de aprobación (7 días) | ✅ |
| 9 | Cliente aprueba la cubierta (`EDITOR_READY`) | ✅ |
| 10 | Se crea el proyecto y se emite el enlace del editor | ✅ |
| 11 | Página privada ligera del editor | ✅ |
| 12 | El cliente arma el interior | ⬜ |
| 13 | El cliente finaliza | ⬜ |
| 14 | Lomo + wrap + PDF interior | ⬜ |
| 15 | Admin descarga los PDFs desde la solicitud | ⬜ |

---

## Paso 10 — Acceso al editor

- [x] **10.1 — `photobook_theme_id` nullable** · ~8 min · **BLOQUEADOR, va primero**
  Sin esto no se puede crear el proyecto de un libro sin tema, y sin proyecto no
  existe ningún paso posterior.
  `schemaPixelart.sql` · `backend/api/src/database/seed.ts` · ORM entity de `photobook_projects`

- [x] **10.2 — Tests de caracterización del editor por tema** · ~25 min · **va antes de 12.1**
  Hoy el único test del editor cubre `getPriceCents`. Cero cobertura de render,
  pasos, estado o autoguardado. Sin esta red, el refactor de 12.1 es a ciegas.
  Cubrir: renderiza los 6 pasos · avanzar/retroceder · dispara autoguardado · payload de submit.
  `(public)/photobooks/[temaSlug]/editor/PhotobookEditorClient.test.tsx`

- [x] **10.3 — Retirar enlaces `PHOTOBOOK_EDITOR`**
  El enum histórico queda solo para filas revocadas existentes. Ya no hay rutas,
  emisión de enlaces, plantilla ni tipo TypeScript que lo pueda crear.

- [x] **10.4 — Crear y enlazar el `photobook_project`**
  Usa `custom_photobook_requests.linked_photobook_project_id`.

- [x] **10.5 — Código canjeable y sesión opaca**
  El admin envía un código de 12 caracteres almacenado como hash SHA-256; el
  canje crea una cookie HTTP-only de siete días. Reenviar revoca códigos y
  sesiones previas. `photobook.service.ts` · `photobook-public.controller.ts`

- [x] **10.6 — Evento y plantilla de correo del código**
  `PHOTOBOOK_EDITOR_CODE_SENT` · `photobook-editor-code.html`

---

## Paso 11 — Portal privado por código

- [x] **11.1 — Entrada sin token secreto en URL**
  `/photobooks/acceso` recibe el código y `/photobooks/mi-photobook` exige la
  sesión de editor.

- [x] **11.2 — Cubiertas aprobadas bloqueadas**
  La sesión entrega tapa y contratapa seleccionadas; el editor sólo permite
  editar el interior.

---

## Paso 12 — Editor completo reutilizado

- [x] **12.1 — Modo custom en `PhotobookEditorClient`**
  Reutiliza el editor de catálogo completo, incluida carga, distribución,
  edición, preview, datos y revisión. No existe un segundo editor reducido.

- [x] **12.2 — Borrador persistente por sesión**
  `GET/PUT custom-editor/draft` conserva el estado en el proyecto enlazado.

- [x] **12.3 — Finalización de producción**
  El último paso congela interior y cubiertas aprobadas, cambia la solicitud a
  `READY_FOR_PRODUCTION` y dispara el PDF. El checkout de catálogo no se duplica
  porque el photobook a medida no crea una orden de catálogo independiente.

---

## Paso 13 — Validación manual pendiente

- [ ] **13.1 — Recorrer el flujo completo con un código real**
  Enviar código, canjearlo, restaurar borrador, finalizar, descargar interior y
  wrap desde administración. No cerrar esta tarea sólo con pruebas automatizadas.

---

## Paso 14 — Lomo, wrap y PDF

> El 80% ya existe: `calculateSpineWidthMm`, `computeWrapLayout`, el escalado con
> sharp, la fuente embebida y el render con Puppeteer. Solo falta la variante de
> composición.

- [ ] **14.1 — `buildWrapHtml` con dos imágenes** · ~20 min
  El flujo por tema pinta UNA panorámica con `background-size:cover`. A medida
  tiene DOS cuadradas de 22×22: posicionarlas en `frontCoverLeftCm` y
  `backCoverLeftCm`, y rellenar la franja del lomo.
  `photobook/infrastructure/pdf/photobook-pdf.service.ts`

- [ ] **14.2 — Disparar la generación al finalizar** · ~7 min

- [ ] **14.3 — Verificar que el PDF interior sale sin código nuevo** · ~4 min
  `generateAndStore` ya trata `theme` como nullable en todas partes.

---

## Paso 15 — Descarga admin

- [ ] **15.1 — Botones de descarga en la solicitud a medida** · ~5 min
  El endpoint `GET admin/photobook/projects/:id/render` ya devuelve interior y
  wrap; falta exponerlo en esta página (hoy solo está en órdenes).
  `admin/photobooks/a-medida/[id]/page.tsx` · proxy en `admin-api/`

---

## Definición de terminado

Cada sub-tarea cierra con: `npm run build` y los tests verdes en el workspace
tocado. Al terminar el paso 14, prueba manual completa según la sección 11 de
`photobook-a-medida-flujo-y-pendientes.md`.

## Decisión asumida

Tipo de tapa y número de hojas los elige **el cliente dentro del editor** (igual
que en el flujo por tema), porque el lomo de 14.1 depende de eso. Si cambia,
afecta 12.3 y ahorra ~1 h.

## Correcciones pendientes al doc narrativo

`photobook-a-medida-flujo-y-pendientes.md` afirma tres cosas que ya no son ciertas:

1. Lista "confirmar fórmula de lomo" y "definir plantilla de wrap" como pendientes.
   Ambas existen y tienen tests desde hace tiempo.
2. Lista "crear o vincular un `photobook_project`" como decisión abierta. La
   columna `linked_photobook_project_id` ya está en el schema y en el seed.
3. Presenta los endpoints admin sin guard como deuda menor. Eran una fuga de
   datos personales alcanzable desde internet. Los de `custom-requests` ya están
   cerrados; el resto del API admin del proyecto sigue abierto.
