// Se cachea la primera vez que se lee — si se llama dos veces seguidas (ej.
// un click que burbujea del botón de cerrar al overlay debajo) y se leyera
// el content actual cada vez, la segunda llamada agarraría el valor ya
// modificado por la primera como si fuera el "original" y lo dejaría pegado.
let cachedOriginal: string | null = null;

/** Fuerza el viewport a escala 1 y lo libera enseguida — sin esto, si el
 * usuario hizo pinch-zoom nativo (con los dedos) dentro de un lightbox, ese
 * zoom queda pegado en toda la página después de cerrarlo, porque el
 * navegador no resetea el viewport solo. Llamar al cerrar cualquier modal
 * que muestre una imagen a pantalla completa en mobile. */
export function resetMobileZoom(): void {
  const meta = document.querySelector('meta[name="viewport"]');
  if (!meta) return;
  if (cachedOriginal === null) {
    cachedOriginal = meta.getAttribute('content') ?? 'width=device-width, initial-scale=1';
  }
  meta.setAttribute('content', `${cachedOriginal}, maximum-scale=1, user-scalable=no`);
  requestAnimationFrame(() => {
    meta.setAttribute('content', cachedOriginal as string);
  });
}
