/**
 * Mapa centralizado de storage_keys para los assets de la página Nuestros Libros.
 * Estos valores corresponden al campo `storage_key` en la tabla `assets` de la BD.
 */

export const NUESTROS_LIBROS_ASSET_KEYS = {
  sectionBackground: 'Home/Section_Our_Books/Section_Our_Books_Background.png',
} as const;

export type NuestrosLibrosAssetKey = keyof typeof NUESTROS_LIBROS_ASSET_KEYS;
