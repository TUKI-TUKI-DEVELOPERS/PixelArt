/**
 * Mapa centralizado de storage_keys para los assets de páginas de categoría.
 * Estos valores corresponden al campo `storage_key` en la tabla `assets` de la BD.
 */

export const CATEGORIA_AMOR_ASSET_KEYS = {
  // Background hero principal
  heroBackground: 'IA_Books/Backgrounds/Background_IA_Books_Love_Book_Page.png',

  // Miniaturas de libros (covers para el catálogo)
  miniaturaMiAmor: 'IA_Books/Love_Books_Page/Pagina_Libros_Amor_Mi_Amor_Miniatura.png',
  miniaturaXDias: 'IA_Books/Love_Books_Page/Pagina_Libros_Amor_Blog_1_Amor_X_Dias_Enamorandome_De_Ti_Miniatura.png',
  miniaturaXRazones: 'IA_Books/Love_Books_Page/Pagina_Libros_Amor_Blog_1_Amor_X_Razones_Por_Las_Que_Te_Amo_Miniatura.png',

  // Imágenes centrales de libros
  miAmorCentral1: 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Libros_Amor_MiAmor_Central.png',
  miAmorCentral2: 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Libros_Amor_MiAmor_Central_2.png',
  miAmorCentral3: 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Libros_Amor_MiAmor_Central_3.png',

  xDiasCentral1: 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Libros_Amor_XDiasEnamorandomedeti_Libro_Central.png',
  xDiasCentral2: 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Libros_Amor_XDiasEnamorandomedeti_Libro_Central_2.png',
  xDiasCentral3: 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Libros_Amor_XDiasEnamorandomedeti_Libro_Central_3.png',

  xRazonesCentral1: 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Libros_Amor_XRazonesporlasqueteamo_Libro_Central.png',
  xRazonesCentral2: 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Libros_Amor_XRazonesporlasqueteamo_Libro_Central_2.png',
  xRazonesCentral3: 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Libros_Amor_XRazonesporlasqueteamo_Libro_Central_3.png',

  // Blog
  blog1: 'IA_Books/Love_Books_Page/Pagina_Libros_Amor_Blog_1.png',
  blog2: 'IA_Books/Love_Books_Page/Pagina_Libros_Amor_Blog_2.png',
  blog3: 'IA_Books/Love_Books_Page/Pagina_Libros_Amor_Blog_3.png',

  // Comunidad
  comunidad1: 'IA_Books/Love_Books_Page/Pagina_Libros_Amor_Blog_1_Amor_Comunidad_1.png',
  comunidad2: 'IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_2.png',
  comunidad3: 'IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_3.png',
  comunidad4: 'IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_4.png',
  comunidad5: 'IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_5.png',
  comunidad6: 'IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_6.png',
  comunidad7: 'IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_7.png',
  comunidad8: 'IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_8.png',
} as const;

export type CategoriaAmorAssetKey = keyof typeof CATEGORIA_AMOR_ASSET_KEYS;
