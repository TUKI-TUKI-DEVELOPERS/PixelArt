# Sincronización MinIO — Local → VPS

## Contexto importante

El MinIO de la VPS usa `expose` en lugar de `ports` en el docker-compose de producción.
Esto significa que el puerto 9000 de MinIO **no está expuesto en `localhost` del host**,
solo es accesible dentro de la red Docker interna.

El túnel SSH debe apuntar directamente a la **IP del contenedor MinIO**, no a `localhost:9000`.

---

## IP del contenedor MinIO en la VPS

```
172.18.0.2
```

Para verificarla (por si cambia):
```bash
docker inspect pixelart_minio --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
```

---

## Credenciales MinIO

| Alias | URL | Usuario | Contraseña |
|---|---|---|---|
| `local` | `http://localhost:9000` | `pixelart_access` | `pixelart_secret_key` |
| `vps` | `http://localhost:9002` | `pixelart_access` | `pixelart_secret_key` |

---

## Setup inicial (solo la primera vez o si se pierde la config)

```bash
mc alias set local http://localhost:9000 pixelart_access pixelart_secret_key
mc alias set vps http://localhost:9002 pixelart_access pixelart_secret_key
```

---

## Flujo completo para sincronizar local → VPS

### 1. Abrir el túnel SSH
```bash
ssh -f -N -L 9002:172.18.0.2:9000 root@161.132.53.223
```
Te pide la contraseña del servidor, la ponés y te devuelve el prompt automáticamente.

### 2. Verificar que ambos conectan
```bash
mc ls local/pixelart-assets
mc ls vps/pixelart-assets
```
Los dos deben listar las carpetas (`Home/`, `IA_Books/`, etc.).

### 3. Sincronizar
```bash
mc mirror --overwrite local/pixelart-assets vps/pixelart-assets
```
Copia todo lo que tenés en local hacia la VPS, reemplazando los archivos que difieren.
**Sin `--remove`** — no borra archivos que estén en VPS pero no en local.

### 4. Cerrar el túnel
```bash
pkill -f "9002:172.18.0.2:9000"
```

---

## Comandos útiles

| Situación | Comando |
|---|---|
| Ver diferencias antes de sincronizar | `mc diff local/pixelart-assets vps/pixelart-assets` |
| Subir 1 archivo puntual | `mc cp local/pixelart-assets/ruta/archivo.png vps/pixelart-assets/ruta/archivo.png` |
| Listar contenido en VPS | `mc ls vps/pixelart-assets/IA_Books/` |
| Ver IP del contenedor MinIO | `docker inspect pixelart_minio --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'` |

---

## Errores comunes

### `Unable to list folder. Requested path not found`
El alias `vps` no está configurado. Corrés `mc alias set vps ...` de nuevo.

### `connection reset by peer`
El túnel apunta a `localhost:9000` del host en lugar de la IP del contenedor.
Usá siempre `172.18.0.2:9000` en el túnel, no `localhost:9000`.

### `Permission denied` al abrir el túnel
Contraseña incorrecta del servidor. Intentá de nuevo.

### El comando `mc alias set vps` se cuelga sin responder
El túnel SSH no está activo. Cerrá y abrilo de nuevo con:
```bash
ssh -f -N -L 9002:172.18.0.2:9000 root@161.132.53.223
```
