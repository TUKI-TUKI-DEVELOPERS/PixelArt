/**
 * Construye la URL pública de un asset en MinIO directamente,
 * sin hacer fetch al backend. La URL es determinística:
 * {MINIO_BASE}/{BUCKET}/{storageKey}
 */
const MINIO_PUBLIC_BASE =
  process.env.NEXT_PUBLIC_MINIO_URL ?? 'http://localhost:9000';
const BUCKET =
  process.env.NEXT_PUBLIC_MINIO_BUCKET ?? 'pixelart-assets';

export function getAssetUrl(storageKey: string): string {
  return `${MINIO_PUBLIC_BASE}/${BUCKET}/${storageKey}`;
}
