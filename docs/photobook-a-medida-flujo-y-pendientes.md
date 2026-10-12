# Photobook a medida — flujo actual

El flujo de photobook a medida usa cubiertas aprobadas y el editor completo existente. El acceso del cliente se realiza con un código canjeable; no existen enlaces secretos de editor ni un editor reducido separado.

## Camino principal

1. El cliente envía su solicitud con dos referencias fijas para la tapa y dos para la contratapa.
2. PixelArt genera y selecciona las propuestas. El cliente puede aprobarlas o solicitar ajustes para una superficie o ambas.
3. Al aprobar, se crea o reutiliza el `photobook_project` asociado a la solicitud.
4. Desde administración se envía un código de 12 caracteres al correo del cliente.
5. El cliente entra en `/photobooks/acceso`, canjea el código y define la tapa (delgada o gruesa) y cantidad de hojas antes de abrir el editor en `/photobooks/mi-photobook`.
6. Al finalizar, el interior queda congelado para producción y se generan los archivos finales.

## Acceso seguro

| Elemento | Implementación |
|---|---|
| Código | 12 caracteres, alta entropía, almacenado únicamente como hash SHA-256. |
| Vigencia | Siete días. |
| Canje | Crea una sesión opaca en cookie HTTP-only (`SameSite=Lax`). El código nunca es un token de URL. |
| Reenvío | Revoca los códigos y las sesiones activas anteriores de la solicitud. |
| Límite | El canje está limitado a cinco intentos por minuto; un canje correcto no consume el código. |
| Historial | Los enlaces antiguos `PHOTOBOOK_EDITOR` sólo permanecen como filas revocadas para auditoría; no se pueden emitir ni abrir. |

## Editor a medida

`frontend/web/src/app/(public)/photobooks/[temaSlug]/editor/PhotobookEditorClient.tsx` tiene un modo `customEditor` que reutiliza las capacidades completas de carga, distribución, edición, preview, datos y revisión. Las cubiertas seleccionadas se entregan desde la sesión y no se pueden editar desde el interior.

El último paso no duplica el checkout del catálogo: finaliza el photobook a medida para producción, porque este flujo no crea una orden de catálogo independiente. Dentro del editor, el botón **Formato** vuelve a abrir el selector compartido hasta la vista previa: ampliar agrega páginas vacías, reduce el flujo al paso de edición y reducir pide confirmación si se eliminarían páginas con fotos. En el flujo a medida, cada página del formato elegido debe tener al menos una foto antes de la vista previa o finalización.

## API pública

| Endpoint | Propósito |
|---|---|
| `POST /api/photobook/custom-editor/access` | Canjear el código y crear la cookie de sesión. |
| `GET /api/photobook/custom-editor/session` | Obtener cubiertas aprobadas y contexto del editor. |
| `GET/PUT /api/photobook/custom-editor/draft` | Restaurar o guardar el formato y el borrador del proyecto asociado. |
| `POST /api/photobook/custom-editor/finalize` | Congelar interior y pasar a `READY_FOR_PRODUCTION`. |

## Administración

El botón de la solicitud a medida usa:

`POST /api/admin/photobook/custom-requests/:id/editor-code/send`

Envía el evento `PHOTOBOOK_EDITOR_CODE_SENT` y la plantilla `photobook-editor-code.html`.

## Verificación pendiente

- [ ] Enviar un código real desde administración.
- [ ] Canjearlo en `/photobooks/acceso` y comprobar que no aparece en la URL ni en JavaScript.
- [ ] Confirmar que las cubiertas aprobadas permanecen bloqueadas.
- [ ] Guardar, recargar y restaurar el borrador.
- [ ] Finalizar y descargar interior PDF y wrap desde administración.
