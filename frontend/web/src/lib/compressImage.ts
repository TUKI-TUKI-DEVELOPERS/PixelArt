/**
 * Comprime una imagen client-side usando Canvas API.
 * - Si el archivo es < 500KB, retorna el original sin cambios.
 * - Resize a max 2048px (lado más largo) y comprime a JPEG 0.85.
 * - Si la compresión falla o el resultado es más grande, retorna el original.
 */
export async function compressImage(
  file: File,
  maxWidth = 2048,
  quality = 0.85,
): Promise<File> {
  // Skip small files
  if (file.size < 500_000) return file;

  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);

      const scale = Math.min(1, maxWidth / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob || blob.size >= file.size) {
            resolve(file);
            return;
          }
          resolve(new File([blob], file.name, { type: 'image/jpeg' }));
        },
        'image/jpeg',
        quality,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      resolve(file);
    };
    img.src = URL.createObjectURL(file);
  });
}
