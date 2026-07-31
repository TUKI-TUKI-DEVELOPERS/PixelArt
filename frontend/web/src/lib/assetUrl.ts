/**
 * Construye la URL pública de un asset en MinIO, sin hacer fetch al backend.
 * Devuelve una ruta relativa del mismo origen ("/assets/{storageKey}"),
 * proxeada server-side hacia MinIO por el rewrite en next.config.ts.
 *
 * Por qué relativa y no absoluta a MinIO: next/image optimiza server-side
 * (el browser nunca pide la URL cruda), y el proceso Next dentro de Docker
 * no puede resolver "localhost:9000" (eso apunta al propio contenedor, no a
 * MinIO). Una ruta same-origin evita ese problema en cualquier entorno,
 * server o cliente, sin necesitar lógica distinta para cada uno.
 */
export function getAssetUrl(storageKey: string): string {
  return `/assets/${storageKey}`;
}

/**
 * Convierte una URL absoluta de MinIO (la que devuelve el backend, ej.
 * `coverImageUrl` de /api/personalized/categories) a la ruta relativa
 * "/assets/{storageKey}", para que también pase por el rewrite de
 * optimización de imágenes. Si la URL no matchea el patrón de MinIO
 * conocido, se devuelve sin cambios.
 */
export function toRelativeAssetUrl(url: string): string {
  const base = process.env.NEXT_PUBLIC_MINIO_URL ?? 'http://localhost:9000';
  const bucket = process.env.NEXT_PUBLIC_MINIO_BUCKET ?? 'pixelart-assets';
  const prefix = `${base}/${bucket}/`;
  return url.startsWith(prefix) ? `/assets/${url.slice(prefix.length)}` : url;
}
