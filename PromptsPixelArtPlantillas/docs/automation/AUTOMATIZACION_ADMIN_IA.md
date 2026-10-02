# Automatización de generación IA en el admin — estado y continuación

## Objetivo

Reemplazar el paso manual del admin (ChatGPT Plus: sube fotos del cliente + prompt, genera 3 plantillas, las baja y sube al sistema) por generación automática server-side, dentro del admin real — mismo patrón que el pipeline standalone de esta carpeta (manifest + generate.py + `images.edit`), pero con fotos y datos reales de clientes en vez de personajes inventados.

Es la última parte grande del proyecto antes de configurar email + deploy.

## Qué ya funciona (verificado, no asumido)

- **Piloto de identidad validado con fotos reales** (no solo teoría): probado con pareja real (Amor) y madre+hijo real (Familia), iterando hasta resolver: rostro "pegado" por mismatch de iluminación, lomo/pliegue pintado (no debe ir, solo en catálogo demo), cabeza mal integrada anatómicamente, filtro de belleza de la foto de referencia trasladándose a la escena, profundidad de campo inconsistente entre rostros, embellecimiento asimétrico por género (el modelo suaviza más las caras femeninas sin que se le pida), edad forzada por el contexto de la escena en vez de la foto real, vestuario/accesorios de la foto de referencia colándose en la escena (excepto lentes recetados, que sí se conservan).
- **Conclusión clave**: un prompt de identidad CORTO (confiar en el modelo) rindió igual o mejor que uno largo con una regla por cada falla — EXCEPTO 2 reglas que sí hacen falta siempre (edad viene de la foto real, no del contexto; vestuario lo define la escena, no la foto). El resto de las fallas eran síntoma de mala calidad de foto de referencia (selfie con gran angular, foto de cuerpo entero muy lejos, filtro de belleza), no del prompt.
- **Bloque de identidad final** (ver `_plantilla-maestra.md` v6, sección "🪪 Bloque de identidad"): una versión para personas, una para mascotas (pelaje/color de ojos, no rasgos faciales humanos).
- **Schema de BD ya migrado** (aplicado a Postgres real, sin down -v, sin tocar MinIO):
  - `personalized_templates` tiene columnas nuevas: `scene_visual`, `background_details`, `magic_effects`, `lighting_color`, `poem_template`, `character_roles` (JSONB).
  - Tabla nueva `prompt_shared_blocks` (block_key, content) con 6 filas: `imagen_base`, `identidad_humano`, `identidad_mascota`, `composicion_reglas`, `diseno_editorial_wrapper`, `detalles_tecnicos` — texto compartido por TODAS las plantillas, vive una sola vez, no se duplica por fila.
  - Reflejado también en `schemaPixelart.sql` (para instalaciones nuevas).
- **Backfill de contenido — Amor 100% completo y verificado**: 120/120 plantillas (10 Razones, 1025 Días enamorándome de ti, Mi Amor — ambas direcciones) con las columnas nuevas llenas, verificado en la BD real (no solo en el script) que no quedó lenguaje de lomo/pliegue.

## Arquitectura decidida

- **Regla de oro**: por cada plantilla SOLO cambia el contenido específico (escena, vestuario de la escena, fondo, efectos, iluminación, título, poema). El resto (`imagen_base`, bloque de identidad, `composicion_reglas`, `detalles_tecnicos`, wrapper de diseño editorial) es fijo, vive en `prompt_shared_blocks`, se reutiliza siempre igual.
- **Poemas con placeholders**: `{NOMBRE_DESTINATARIO}` / `{APODO_DESTINATARIO}` en vez del nombre de ejemplo del catálogo (María/Mari, Diego/Dieguito, etc.) — se rellenan en tiempo real con los datos del `DemoRequest`.
- **character_roles (JSONB)**: describe qué roles/cantidad de fotos espera la plantilla, con las MISMAS keys que ya usa `characterMeta` en el wizard real (`recipient`, `dedicator`, `papa`, `mama`, `hijos`, `hermanos`, `pet`, `owners`) — no se inventó vocabulario nuevo, se reusa el que ya existe en `WizardSection.tsx`.
- **Anclaje por id numérico, nunca por nombre de carpeta ni string fuzzy**: los nombres reales en `seed.ts` casi nunca calzan con los nombres de las carpetas de esta carpeta de prompts (acentos, mayúsculas, singular/plural, palabras distintas incluso). Siempre resolver el `model_id`/`template_id` real contra la BD antes de escribir nada.

## Pendiente — en orden recomendado

### 1. Backend: puerto + adapter de generación de imágenes IA (tarea #6)
No existe ninguna integración con OpenAI/gpt-image en `backend/api/src` (verificado, cero matches). Crear:
- `backend/api/src/personalized/domain/ports/image-generation.port.ts` (puerto abstracto)
- Implementación OpenAI en infraestructura, análoga a `covers_generate.py` (usa `images.edit` con múltiples imágenes de referencia — mismo patrón ya probado en el piloto).
- Necesita `OPENAI_API_KEY` en la config del backend real (hoy solo existe en `PromptsPixelArtPlantillas/.env`, gitignored, para el pipeline standalone).

### 2. Backend: use-case generar DemoProposal con IA (tarea #7)
Junta: bloque compartido correspondiente (humano/mascota) + `scene_visual`/`poem_template` de la plantilla (con placeholders rellenados desde el `DemoRequest` real) + fotos reales resueltas desde `characterMeta` vía MinIO (assets ya existen, `FileStoragePort` ya existe) → llama al puerto de generación → guarda como `DemoProposal` reusando el pipeline de watermark/protección que ya existe en `upload-demo-proposal.use-case.ts`.

Probar primero contra el libro "10 Razones por las que Te Amo" (único con datos 100% listos).

### 3. Admin UI: botón "Generar con IA" (tarea #8)
En `frontend/web/.../admin/libros-personalizados/solicitudes/[id]/page.tsx`, junto al widget de upload manual existente. Loading state (~10-20s por imagen), manejo de error/retry.

### 4. Backfill del resto de categorías (tarea #9, resto)
Familia (6 libros), Mascotas (4 libros), Memorias Familiares (4 libros, "Recuerdos Familiares" descartado por no tener contenido). Reusar el patrón de `scripts/backfill_amor_templates.py`, pero:
- **`character_roles` ya NO es fijo** `dedicator`/`recipient` — Familia/Mascotas tienen roles variables (`hijos[]`, `hermanos[]`, `pet`+`owners[]`).
- **4 libros de elenco variable necesitan reescribir la escena a roles relativos** antes de migrar (no nombres fijos con acciones fijas): El Mejor Equipo, Mi Familia, Aventura entre patas, y las plantillas de Mi Amor donde aparecen "ambos" (esto último ya resuelto para Mi Amor en el backfill de Amor).
- Decisión del usuario ya tomada: esperar a probar el flujo completo con Amor antes de encarar esto, para no tener que rehacer 3 categorías si aparece un ajuste de diseño.

## Gotchas importantes (para no repetir errores ya cometidos)

1. **Nunca asumir que la primera fila que aparece es la correcta** — hay filas legacy inactivas (`is_active=false`) sin `gender_direction`, duplicadas de antes de que existiera esa columna. Siempre filtrar `is_active = true`.
2. **"Mi Amor" tiene un bug de producción ya existente** (no introducido acá): el `template_preview_key` (imagen de catálogo) de la dirección `HE_TO_SHE` apunta al set masculino en vez del femenino. El texto ya se cargó correcto en el backfill; la imagen de catálogo sigue mal — pendiente generar 20 imágenes nuevas, tarea aparte.
3. **2 libros de Memorias Familiares están incompletos**: "Gracias por tu amor" solo tiene versión Tía (no Tío), "Siempre seras parte de mi" solo tiene versión Hermano (no Hermana) — pero el wizard puede llegar a pedir la versión faltante. Decisión de producto pendiente, no es un bug de código.
4. **El wizard tiene sus propios bugs ya existentes**, encontrados de paso (no arreglados en esta sesión, solo documentados): "La Familia" vs "Mi Familia" (frontend usa un nombre, backend seed usa otro), "El Mejor Amigo del Mundo" soporta 6 especies en el `.md` pero el wizard no pregunta especie (decisión tomada: ese libro queda solo para perros, simplifica el prompt de identidad).
5. **El prompt de identidad no debe hardcodear edad ni vestuario** — siempre debe derivar de la foto real / de la escena respectivamente, nunca de lo que diga el contenido de catálogo (que fue escrito para un elenco de ejemplo con edades y vestuario fijos).

## Cómo se sabe qué plantillas ya están hechas al generar el libro final

Preguntando esto salió 1 problema técnico real (a arreglar) y se confirmó que el mecanismo de selección SÍ existe (mi primera búsqueda lo pasó por alto — quedó documentado acá para no repetir el error):

1. **El watermark de `upload-demo-proposal.use-case.ts` es DESTRUCTIVO** — solo se guarda la versión protegida (watermark/baja calidad), la imagen limpia original nunca se persiste. Aunque las 3 plantillas del demo ya estén generadas, hoy no hay forma de recuperar una versión limpia para imprimir sin regenerar. Fix decidido: cuando se construya el use-case de generación IA (tarea #7), guardar SIEMPRE 2 storage_keys — original limpio + versión protegida.
2. **La lista completa de plantillas del libro pagado SÍ existe — tabla `order_template_selections`** (resuelto, no era un hueco de producto, era que mi primera búsqueda no llegó a la ruta correcta). El flujo real: el cliente abre `checkout/[token]` (no `demo/[token]` ni `pagar/[token]`, que son vistas distintas), ve sus 3 plantillas del demo, y ahí mismo elige las restantes (7 para STANDARD/10, 12 para PREMIUM/15) con un selector con contador "X / N" (`checkout/[token]/page.tsx`). Al enviar (`submit-checkout.use-case.ts`), se combinan las 3 originales (tabla `demo_template_selections`, por `demo_request_id`) + las adicionales elegidas, y se insertan TODAS en `order_template_selections` (`order_id`, `template_id`). Esa tabla es la fuente de verdad de qué plantillas van en el libro final de cada pedido.

**Con esto, el plan para la tarea #7 queda claro**: al generar el libro final, iterar `order_template_selections` del pedido; para cada `template_id`, si ya existe una `DemoProposal` (o su sucesor) para ese `demo_request_id`+`template_id` con el original limpio guardado (punto 1), reusarla; si no, generarla nueva. Mismo patrón que manifest.json (pending/done/failed), solo que acá vive en la BD relacional del pedido en vez de un JSON global.

## Archivos relevantes

- `PromptsPixelArtPlantillas/_plantilla-maestra.md` (v6) — fuente de verdad del prompt maestro y el bloque de identidad.
- `PromptsPixelArtPlantillas/scripts/pilot_identity_test.py` y `pilot_identity_test_familia.py` — pilotos descartables que validaron el enfoque (no se usan en producción).
- `PromptsPixelArtPlantillas/scripts/backfill_amor_templates.py` — script reutilizable de backfill, patrón a copiar para las demás categorías.
- `PromptsPixelArtPlantillas/.venv` — entorno virtual local con `openai` instalado, para correr los scripts de este directorio.
- `schemaPixelart.sql` — schema actualizado con las columnas/tabla nuevas.
- `backend/api/src/demo/` — `DemoRequest`, `DemoProposal`, `demo-admin.controller.ts` (flujo real del admin, ya existente).
- `backend/api/src/personalized/` — `PersonalizedTemplate` (entidad a extender con las columnas nuevas en el código, ya existen en la BD).
- `frontend/web/src/app/(public)/.../WizardSection.tsx` — fuente de verdad de los `wizardMode`/`characterMeta` reales.
