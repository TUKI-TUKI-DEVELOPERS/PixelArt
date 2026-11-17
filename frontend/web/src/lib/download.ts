/**
 * Admin downloads that never save an error as if it were the file.
 *
 * A plain `fetch(url).blob()` saves whatever the server answers: a failed
 * CMYK conversion, an expired session or a gateway timeout would end up on
 * disk as "libro_orden_X_interior-cmyk.pdf". These helpers only save a
 * successful response (and, for PDFs, only a body that starts with "%PDF-");
 * otherwise they throw with a message the admin can read.
 */

async function serverMessage(response: Response, blob: Blob): Promise<string> {
  const text = await blob.text().catch(() => '');
  try {
    const parsed = JSON.parse(text) as { message?: string | string[] };
    const message = Array.isArray(parsed.message) ? parsed.message.join(', ') : parsed.message;
    if (message) return message;
  } catch {
    // Not JSON (e.g. an nginx HTML error page): fall back to the status.
  }
  return `error ${response.status}${response.statusText ? ` ${response.statusText}` : ''}`;
}

function saveBlob(blob: Blob, filename: string) {
  const blobUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = blobUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(blobUrl);
}

async function fetchOk(url: string): Promise<Blob> {
  const response = await fetch(url);
  const blob = await response.blob();
  if (!response.ok) {
    throw new Error(`No se pudo descargar el archivo (${await serverMessage(response, blob)}). No se guardó nada.`);
  }
  return blob;
}

export async function downloadFile(url: string, filename: string): Promise<void> {
  saveBlob(await fetchOk(url), filename);
}

export async function downloadPdf(url: string, filename: string): Promise<void> {
  const blob = await fetchOk(url);
  if ((await blob.slice(0, 5).text()) !== '%PDF-') {
    throw new Error('El servidor no devolvió un PDF válido. No se guardó nada.');
  }
  saveBlob(blob, filename);
}
