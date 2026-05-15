import { notFound } from "next/navigation";
import LibroDetalleClient from "./LibroDetalleClient";

/* ── Catálogo de libros válidos por categoría ── */
const LIBROS_VALIDOS: Record<string, Record<string, string>> = {
  "libros-de-amor": {
    "10-razones-por-las-que-te-amo": "10 o 15 Razones Por Las Que Te Amo",
    "mi-amor": "Mi Amor",
    "1025-dias-enamorandome-de-ti": "1025 Días Enamorándome De Ti",
  },
  "libros-de-mascotas": {
    "nuestro-angel-de-4-patas": "Nuestro Ángel de 4 Patas",
    "aventura-entre-patas": "Aventura Entre Patas",
    "mi-amigo-miauravilloso": "Mi Amigo Miauravilloso",
    "mi-mejor-amigo-del-mundo": "Mi Mejor Amigo del Mundo",
  },
  "libros-de-familia": {
    "papa-mi-heroe": "Papá, Mi Héroe",
    "te-amo-abuelo": "Te Amo, Abuelo",
    "el-mejor-equipo": "El Mejor Equipo",
    "la-familia": "La Familia",
    "te-amo-abuela": "Te Amo, Abuela",
    "mama-mi-heroina": "Mamá, Mi Heroína",
  },
  "libros-de-memorias-familiares": {
    "recuerdos-familiares": "Recuerdos Familiares",
    "gracias-por-tu-amor": "Gracias por tu amor",
    "mi-angel-guardian": "Mi Ángel Guardián",
    "siempre-en-mi-corazon": "Siempre en mi Corazón",
    "siempre-seras-parte-de-mi": "Siempre Serás Parte de Mi Corazón",
  },
};

/* ── Mapa slug → storage_key del background en MinIO ── */
const BACKGROUND_KEYS: Record<string, string> = {
  "mi-amor": "IA_Books/Backgrounds/Backgrounds_Libros_Amor_Mi_Amor.png",
  "1025-dias-enamorandome-de-ti": "IA_Books/Backgrounds/Backgrounds_Libros_Amor_X_Dias_Enamorandome_de_ti.png",
  "10-razones-por-las-que-te-amo": "IA_Books/Backgrounds/Backgrounds_Libros_Amor_X_Razones_Por_Las_Que_Te_Amo.png",
  "papa-mi-heroe": "IA_Books/Backgrounds/Backgrounds_Libros_Familia_Papa_mi_heroe.png",
  "la-familia": "IA_Books/Backgrounds/Backgrounds_Libros_Familia_La_Familia.png",
  "el-mejor-equipo": "IA_Books/Backgrounds/Backgrounds_Libros_Familia_El_mejor_equipo.png",
  "te-amo-abuelo": "IA_Books/Backgrounds/Backgrounds_Libros_Familia_Te_amo_abuelo.png",
  "te-amo-abuela": "IA_Books/Backgrounds/Backgrounds_Libros_Familia_Te_amo_abuela.png",
  "mama-mi-heroina": "IA_Books/Backgrounds/Backgrounds_Libros_Familia_Mama_mi_heroina.png",
  "aventura-entre-patas": "IA_Books/Backgrounds/Backgrounds_Libros_Mascotas_Aventuras_Entre_Patas.png",
  "mi-mejor-amigo-del-mundo": "IA_Books/Backgrounds/Backgrounds_Libros_Mascotas_Mi_Mejor_Amigo_del_mundo.png",
  "mi-amigo-miauravilloso": "IA_Books/Backgrounds/Backgrounds_Libros_Mascotas_Mi_amigo_miauravilloso.png",
  "nuestro-angel-de-4-patas": "IA_Books/Backgrounds/Backgrounds_Libros_Mascotas_Nuestro_Angel_de_4_patas.png",
  "gracias-por-tu-amor": "IA_Books/Backgrounds/Backgrounds_Libros_Memoria_Familiar_Gracias_por_tu_amor.png",
  "mi-angel-guardian": "IA_Books/Backgrounds/Backgrounds_Libros_Memoria_Familiar_Mi_angel_guardian.png",
  "siempre-en-mi-corazon": "IA_Books/Backgrounds/Backgrounds_Libros_Memoria_Familiar_Siempre_en_mi_corazon.png",
  "siempre-seras-parte-de-mi": "IA_Books/Backgrounds/Backgrounds_Libros_Memoria_Familiar_Siempre_seras_parte_de_mi_corazon.png",
};

/* ── Mapa slug → nombres en BD (para lookup dinámico de IDs) ── */
const LIBRO_NAMES: Record<string, { modelName: string; catalogBookName: string }> = {
  "10-razones-por-las-que-te-amo": { modelName: "10 Razones por las que Te Amo", catalogBookName: "10 Razones por las que Te Amo" },
  "mi-amor": { modelName: "Mi Amor", catalogBookName: "Mi Amor" },
  "1025-dias-enamorandome-de-ti": { modelName: "1025 Días enamorándome de ti", catalogBookName: "1025 Días enamorándome de ti" },
  "nuestro-angel-de-4-patas": { modelName: "Nuestro Angel de 4 patas", catalogBookName: "Nuestro Angel de 4 patas" },
  "aventura-entre-patas": { modelName: "Aventura entre patas", catalogBookName: "Aventura entre patas" },
  "mi-amigo-miauravilloso": { modelName: "Mi amigo Miauravilloso", catalogBookName: "Mi amigo Miauravilloso" },
  "mi-mejor-amigo-del-mundo": { modelName: "Mi mejor amigo del mundo", catalogBookName: "Mi mejor amigo del mundo" },
  "papa-mi-heroe": { modelName: "Papá, Mi Héroe", catalogBookName: "Papá, Mi Héroe" },
  "mama-mi-heroina": { modelName: "Mamá, Mi Heroína", catalogBookName: "Mamá, Mi Heroína" },
  "te-amo-abuelo": { modelName: "Te amo, abuelo", catalogBookName: "Te amo, abuelo" },
  "te-amo-abuela": { modelName: "Te amo, abuela", catalogBookName: "Te amo, abuela" },
  "el-mejor-equipo": { modelName: "El Mejor Equipo", catalogBookName: "El Mejor Equipo" },
  "la-familia": { modelName: "Mi Familia", catalogBookName: "Mi Familia" },
  "recuerdos-familiares": { modelName: "Recuerdos Familiares", catalogBookName: "Mi Familia" },
  "gracias-por-tu-amor": { modelName: "Gracias por tu amor", catalogBookName: "Gracias por tu amor" },
  "mi-angel-guardian": { modelName: "Mi angel guardian", catalogBookName: "Mi angel guardian" },
  "siempre-en-mi-corazon": { modelName: "Siempre en mi corazon", catalogBookName: "Siempre en mi corazon" },
  "siempre-seras-parte-de-mi": { modelName: "Siempre seras parte de mi", catalogBookName: "Siempre seras parte de mi" },
};

/* ── Mapa slug → storage_keys de imágenes centrales del carousel ── */
const CAROUSEL_KEYS: Record<string, string[]> = {
  "mi-amor": [
    "IA_Books/Love_Books_Page/Libros/Mi_Amor/Libros_Amor_Mi_Amor_Central.png",
    "IA_Books/Love_Books_Page/Libros/Mi_Amor/Libros_Amor_MiAmor_Central_2.png",
    "IA_Books/Love_Books_Page/Libros/Mi_Amor/Libros_Amor_MiAmor_Central_3.png",
  ],
  "1025-dias-enamorandome-de-ti": [
    "IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Libros_Amor_XDiasEnamorandomedeti_Libro_Central.png",
    "IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Libros_Amor_XDiasEnamorandomedeti_Libro_Central_2.png",
    "IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Libros_Amor_XDiasEnamorandomedeti_Libro_Central_3.png",
  ],
  "10-razones-por-las-que-te-amo": [
    "IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Libros_Amor_XRazonesporlasqueteamo_Libro_Central.png",
    "IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Libros_Amor_XRazonesporlasqueteamo_Libro_Central_2.png",
    "IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Libros_Amor_XRazonesporlasqueteamo_Libro_Central_3.png",
  ],
  // Mascotas
  "aventura-entre-patas": [
    "IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas/Libros_Mascotas_Aventurasentrepatas_Central.png",
    "IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas/Libros_Mascotas_Aventurasentrepatas_Central_2.png",
    "IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas/Libros_Mascotas_Aventurasentrepatas_Central_3.png",
  ],
  "mi-amigo-miauravilloso": [
    "IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Libros_Mascotas_Miamigomiauravilloso_Central.png",
    "IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Libros_Mascotas_Miamigomiauravilloso_Central_2.png",
    "IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Libros_Mascotas_Miamigomiauravilloso_Central_3.png",
  ],
  "mi-mejor-amigo-del-mundo": [
    "IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Libros_Mascotas_MiMejorAmigo_Central.png",
    "IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Libros_Mascotas_MiMejorAmigo_Central_2.png",
    "IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Libros_Mascotas_MiMejorAmigo_Central_3.png",
  ],
  "nuestro-angel-de-4-patas": [
    "IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Libros_Mascotas_Miangelde4patas_Central.png",
    "IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Libros_Mascotas_Miangelde4patas_Central_2.png",
    "IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Libros_Mascotas_Miangelde4patas_Central_3.png",
  ],
  // Familia
  "el-mejor-equipo": [
    "IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Libros_Familia_Elmejorequipo_Central.png",
    "IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Libros_Familia_Elmejorequipo_Central_2.png",
    "IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Libros_Familia_Elmejorequipo_Central_3.png",
  ],
  "la-familia": [
    "IA_Books/Family_Books_Page/Libros/La_familia/Libros_Familia_Lafamilia_Central.png",
    "IA_Books/Family_Books_Page/Libros/La_familia/Libros_Familia_Lafamilia_Central_2.png",
    "IA_Books/Family_Books_Page/Libros/La_familia/Libros_Familia_Lafamilia_Central_3.png",
  ],
  "mama-mi-heroina": [
    "IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Libros_Familia_Mamamiheroina_Central.png",
    "IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Libros_Familia_Mamamiheroina_Central_2.png",
    "IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Libros_Familia_Mamamiheroina_Central_3.png",
  ],
  "papa-mi-heroe": [
    "IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Libros_Familia_Papamiheroe_Central.png",
    "IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Libros_Familia_Papamiheroe_Central_2.png",
    "IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Libros_Familia_Papamiheroe_Central_3.png",
  ],
  "te-amo-abuela": [
    "IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Libros_Familia_Teamoabuela_Central.png",
    "IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Libros_Familia_Teamoabuela_Central_2.png",
    "IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Libros_Familia_Teamoabuela_Central_3.png",
  ],
  "te-amo-abuelo": [
    "IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Libros_Familia_Teamoabuelo_Central.png",
    "IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Libros_Familia_Teamoabuelo_Central_2.png",
    "IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Libros_Familia_Teamoabuelo_Central_3.png",
  ],
  "gracias-por-tu-amor": [
    "IA_Books/Memorial_Books_Page/Libros/Gracias_por_tu_amor/Libros_Memoria_Familiar_Siempre_en_mi_corazon_Central.png",
    "IA_Books/Memorial_Books_Page/Libros/Gracias_por_tu_amor/Libros_Memoria_Familiar_Siempre_en_mi_corazon_Central_2.png",
    "IA_Books/Memorial_Books_Page/Libros/Gracias_por_tu_amor/Libros_Memoria_Familiar_Siempre_en_mi_corazon_Central_3.png",
  ],
  "mi-angel-guardian": [
    "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian/Libros_Memoria_Familiar_Mi_angel_guardian_Central.png",
    "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian/Libros_Memoria_Familiar_Mi_angel_guardian_Central_2.png",
    "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian/Libros_Memoria_Familiar_Mi_angel_guardian_Central_3.png",
  ],
  "siempre-en-mi-corazon": [
    "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon/Libros_Memoria_Familiar_Siempre_en_mi_corazon_Central.png",
    "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon/Libros_Memoria_Familiar_Siempre_en_mi_corazon_Central_2.png",
    "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon/Libros_Memoria_Familiar_Siempre_en_mi_corazon_Central_3.png",
  ],
  "siempre-seras-parte-de-mi": [
    "IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Libros_Memoria_Familiar_Siempre_seras_parte_de_mi_corazon_Central.png",
    "IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Libros_Memoria_Familiar_Siempre_seras_parte_de_mi_corazon_Central_2.png",
    "IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Libros_Memoria_Familiar_Siempre_seras_parte_de_mi_corazon_Central_3.png",
  ],
};

const API_BASE = "http://api:3001";

function getAssetUrlDirect(storageKey: string): string {
  const base = process.env.NEXT_PUBLIC_MINIO_URL ?? 'http://localhost:9000';
  const bucket = process.env.NEXT_PUBLIC_MINIO_BUCKET ?? 'pixelart-assets';
  return `${base}/${bucket}/${storageKey}`;
}

type DbIds = { catalogBookId: number; personalizedModelId: number; personalizedCategoryId: number };

async function resolveDbIds(slug: string): Promise<DbIds | null> {
  const names = LIBRO_NAMES[slug];
  if (!names) return null;

  const [catRes, booksRes] = await Promise.all([
    fetch(`${API_BASE}/api/personalized/categories`, { next: { revalidate: 300 } }),
    fetch(`${API_BASE}/api/catalog/books`, { next: { revalidate: 300 } }),
  ]);

  if (!catRes.ok || !booksRes.ok) return null;

  const categories: { id: string; name: string; models: { id: string; name: string }[] }[] = await catRes.json();
  const books: { id: string; name: string; variants: { id: string; coverType: string; basePriceCents: number }[] }[] = await booksRes.json();

  let personalizedModelId: number | null = null;
  let personalizedCategoryId: number | null = null;

  for (const cat of categories) {
    const model = cat.models.find((m) => m.name === names.modelName);
    if (model) {
      personalizedModelId = Number(model.id);
      personalizedCategoryId = Number(cat.id);
      break;
    }
  }

  const catalogBook = books.find((b) => b.name === names.catalogBookName);
  const catalogBookId = catalogBook ? Number(catalogBook.id) : null;

  if (!personalizedModelId || !personalizedCategoryId || !catalogBookId) return null;

  return { catalogBookId, personalizedModelId, personalizedCategoryId };
}

async function fetchVariants(catalogBookId: number): Promise<{ id: number; coverType: string; basePriceCents: number }[]> {
  const res = await fetch(`${API_BASE}/api/catalog/books`, { next: { revalidate: 300 } });
  if (!res.ok) return [];
  const books = await res.json();
  const book = books.find((b: { id: string }) => Number(b.id) === catalogBookId);
  return (book?.variants ?? [])
    .filter((v: { coverType: string }) => v.coverType !== 'TAPA_PREMIUM')
    .map((v: { id: string; coverType: string; basePriceCents: number }) => ({
      id: Number(v.id),
      coverType: v.coverType,
      basePriceCents: v.basePriceCents,
    }));
}

async function fetchTemplates(modelId: number): Promise<{ id: number; name: string | null; previewUrl: string }[]> {
  const res = await fetch(`${API_BASE}/api/personalized/models/${modelId}/templates`, { next: { revalidate: 300 } });
  if (!res.ok) return [];
  const templates = await res.json();
  return templates.map((t: { id: string; name: string | null; previewUrl: string }) => ({
    id: Number(t.id),
    name: t.name,
    previewUrl: t.previewUrl,
  }));
}

type Props = {
  params: Promise<{ categoriaId: string; libroSlug: string }>;
};

export default async function LibroDetallePage({ params }: Props) {
  const { categoriaId, libroSlug } = await params;

  const categoriaLibros = LIBROS_VALIDOS[categoriaId];
  if (!categoriaLibros) notFound();

  const libroNombre = categoriaLibros[libroSlug];
  if (!libroNombre) notFound();

  // Fetch in parallel: background + carousel images + DB IDs (dynamic)
  const bgKey = BACKGROUND_KEYS[libroSlug];
  const carouselKeys = CAROUSEL_KEYS[libroSlug] ?? [];

  const backgroundUrl = bgKey ? getAssetUrlDirect(bgKey) : null;
  const carouselImageUrls = carouselKeys.map((key) => getAssetUrlDirect(key));

  const dbIds = await resolveDbIds(libroSlug);

  const [variants, templates] = await Promise.all([
    dbIds ? fetchVariants(dbIds.catalogBookId) : Promise.resolve([]),
    dbIds ? fetchTemplates(dbIds.personalizedModelId) : Promise.resolve([]),
  ]);

  return (
    <LibroDetalleClient
      categoriaSlug={categoriaId}
      libroSlug={libroSlug}
      libroNombre={libroNombre}
      backgroundUrl={backgroundUrl}
      carouselImageUrls={carouselImageUrls}
      dbIds={dbIds ?? null}
      variants={variants}
      templates={templates}
    />
  );
}
