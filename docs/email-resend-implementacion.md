# Sistema de Email — Implementación con Resend

## Arquitectura (patrón outbox)

```
[Evento de negocio] → emailService.queue() → INSERT email_outbox (status=PENDING)
                                                         ↓
                                              [Cron cada 10 segundos]
                                              EmailWorkerService.tick()
                                              → SELECT FOR UPDATE SKIP LOCKED (claim)
                                              → ResendEmailSender.send(html, to, subject)
                                              → UPDATE status = SENT / FAILED
```

Los emails **no se envían en el momento del evento** — se encolan en la DB y un worker los procesa.
Ventaja: si Resend falla, el registro queda en PENDING y se reintenta automáticamente.

---

## Los 6 eventos que generan emails

| Event type | Cuándo | Destinatario |
|---|---|---|
| `UNIFIED_CHECKOUT_SENT` | Admin envía link de checkout al cliente | Cliente |
| `PROPOSALS_SENT_TO_CUSTOMER` | Admin envía propuestas de demo | Cliente |
| `PAYMENT_PROOF_RECEIVED_ADMIN` | Photobook: admin genera link de pago | Cliente |
| `PAYMENT_APPROVED_TO_CUSTOMER` | Admin aprueba el pago | Cliente |
| `PAYMENT_REJECTED_TO_CUSTOMER` | Admin rechaza el pago | Cliente |
| `DELIVERY_FEEDBACK_REQUEST` | Admin genera link de feedback | Cliente |

---

## Estado actual del código

| Componente | Estado | Notas |
|---|---|---|
| `email_outbox` (tabla PostgreSQL) | OK | En schemaPixelart.sql |
| `EmailService.queue()` | OK | Inserta en email_outbox |
| Llamadas a `queue()` en use cases | OK | 6 eventos ya conectados |
| `resend` npm package | FALTA | Hay que instalar |
| `@nestjs/schedule` npm package | FALTA | Para el cron worker |
| `EmailSenderPort` | FALTA | TODO stub vacío |
| `ResendEmailSender` | FALTA | TODO stub vacío |
| `EmailWorkerService` | FALTA | TODO stub vacío |
| `EmailModule` | INCOMPLETO | No registra worker ni sender |
| Templates HTML | FALTA | 4 archivos vacíos |

---

## Plan de implementación

### PASO 1 — Crear cuenta Resend (manual, ~5 min)

1. Ir a resend.com → crear cuenta
2. Dashboard → **API Keys** → Create API Key → copiar el valor

**Para pruebas sin dominio propio:**
- Resend permite enviar desde `onboarding@resend.dev` sin configurar DNS
- Los emails solo llegan al email de la cuenta de Resend (no a cualquier destinatario)
- Sirve para verificar que el código funciona antes de conectar el dominio real

**Para producción con dominio propio:**
1. Dashboard → **Add Domain** → ingresar el dominio del cliente
2. Resend entrega 3 registros DNS que hay que agregar en PuntoPe:
   - 1 registro **TXT** (verificación de dominio)
   - 1 registro **MX** (recepción)
   - 1 registro **CNAME** (DKIM — firma digital de emails)
3. Entrar al panel de PuntoPe → DNS → agregar los 3 registros
4. Resend verifica automáticamente (entre 5 min y 24hs)
5. Una vez verificado: los emails llegan a cualquier destinatario real

---

### PASO 2 — Variables de entorno

Agregar en `.env.docker` en la VPS:

```env
# Para pruebas (sin dominio):
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM=onboarding@resend.dev

# Para producción (con dominio verificado):
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM=noreply@dominiodelcliente.com.pe
NEXT_PUBLIC_URL=https://dominiodelcliente.com.pe
```

> `NEXT_PUBLIC_URL` ya debería estar seteado — es el que usa el backend para armar
> las URLs de checkout/feedback que van dentro de cada email.

---

### PASO 3 — Instalar paquetes

En `backend/api/package.json` agregar:
- `resend` — SDK oficial de Resend
- `@nestjs/schedule` — módulo de NestJS para cron jobs

Comando (lo ejecuta la VPS al buildear):
```bash
npm install resend @nestjs/schedule
```

---

### PASO 4 — Implementar el código

**Archivos a modificar/crear:**

1. `backend/api/src/email/domain/ports/email-sender.port.ts`
   - Definir contrato abstracto `EmailSenderPort.send(to, subject, html)`

2. `backend/api/src/email/infrastructure/resend-email-sender.ts`
   - Implementar con SDK de Resend
   - Leer templates HTML, reemplazar variables `{{variable}}`, enviar

3. `backend/api/src/email/email-worker.service.ts`
   - Cron cada 10 segundos
   - Claim con `UPDATE ... SET claimed_at=now() WHERE status='PENDING' RETURNING *`
   - Enviar vía `ResendEmailSender`
   - Marcar `SENT` o `FAILED` con `last_error` guardado
   - Máximo 3 intentos

4. `backend/api/src/email/email.module.ts`
   - Registrar `ScheduleModule.forRoot()`
   - Registrar `ResendEmailSender` como implementación de `EmailSenderPort`
   - Registrar `EmailWorkerService`

5. Templates HTML (4 archivos en `src/email/templates/`):
   - `proposals-sent.html` — propuestas de demo listas, con link de demo
   - `delivery-feedback.html` — link de checkout unificado (pagar + elegir plantillas)
   - `payment-approved.html` — pago aprobado, con fecha estimada de entrega
   - `payment-rejected.html` — pago rechazado, con motivo

6. `backend/api/src/app.module.ts`
   - Verificar que `EmailModule` está importado

---

### PASO 5 — Verificar que funciona

1. Hacer una acción en el admin (ej: enviar link de checkout a un cliente)
2. Verificar en PostgreSQL:
   ```sql
   SELECT id, event_type, to_email, status, sent_at, last_error
   FROM email_outbox
   ORDER BY created_at DESC
   LIMIT 5;
   ```
3. Si `status = SENT` → el email salió correctamente
4. Si `status = FAILED` → revisar `last_error` para ver el problema

---

## Archivos clave del proyecto

```
backend/api/src/email/
├── domain/
│   ├── interfaces/email-sender.interface.ts     <- TODO (vacío)
│   └── ports/email-sender.port.ts               <- TODO (vacío)
├── infrastructure/
│   └── resend-email-sender.ts                   <- TODO (vacío)
├── templates/
│   ├── proposals-sent.html                      <- TODO (vacío)
│   ├── payment-approved.html                    <- TODO (vacío)
│   ├── payment-rejected.html                    <- TODO (vacío)
│   └── delivery-feedback.html                   <- TODO (vacío)
├── email-worker.service.ts                      <- TODO (vacío)
├── email.service.ts                             <- OK (queue funciona)
└── email.module.ts                              <- INCOMPLETO
```

---

## Preguntas frecuentes

**¿Se puede cambiar la cuenta de Resend después?**
Sí. Solo hay que cambiar `RESEND_API_KEY` en `.env.docker` y reiniciar el contenedor.
El código no depende de ninguna cuenta específica.

**¿Qué pasa si Resend no está disponible momentáneamente?**
El email queda en `status=PENDING` en la DB. El cron lo reintenta cada 10 segundos.
Después de 3 intentos fallidos queda en `FAILED` con el error guardado en `last_error`.

**¿Resend bloquea si el servidor no tiene IP fija o dedicada?**
No. El backend hace un HTTP POST a la API de Resend — no importa la IP del servidor.
La reputación depende del dominio, no del servidor.

**¿Cuánto cuesta?**
Gratis permanente: 3,000 emails/mes. Para un negocio de libros/photobooks es más que suficiente.
