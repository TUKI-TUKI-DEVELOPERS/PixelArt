import { notFound } from "next/navigation";
import LibroDetalleClient from "./LibroDetalleClient";
import { getAssetUrl } from "@/lib/assetUrl";

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
    "IA_Books/Memorial_Books_Page/Libros/Gracias_por_tu_amor/Libros_Memoria_Familiar_Gracias_por_tu_amor_Central.png",
    "IA_Books/Memorial_Books_Page/Libros/Gracias_por_tu_amor/Libros_Memoria_Familiar_Gracias_por_tu_amor_Central_2.png",
    "IA_Books/Memorial_Books_Page/Libros/Gracias_por_tu_amor/Libros_Memoria_Familiar_Gracias_por_tu_amor_Central_3.png",
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

type DbIds = { catalogBookId: number; personalizedModelId: number; personalizedCategoryId: number };

/** Resuelve categoría+libro por slug REAL (personalized_categories.slug /
 * personalized_models.slug), reemplazando los mapas LIBROS_VALIDOS/
 * LIBRO_NAMES que antes vivían hardcodeados acá — cualquier libro nuevo
 * agregado por el admin aparece solo, sin tocar código. Devuelve null si el
 * slug no matchea ninguna categoría/modelo real (equivale al notFound() de
 * antes). catalog_books todavía no tiene su propio slug — se resuelve por
 * nombre exacto contra el modelo YA encontrado por slug real (no un string
 * hardcodeado a mano); si ese bridge puntual falla, degrada con dbIds=null
 * en vez de 404 (mismo comportamiento que ya tenía el código anterior). */
async function resolveBookBySlug(categoriaSlug: string, libroSlug: string): Promise<{ libroNombre: string; dbIds: DbIds | null } | null> {
  const [catRes, booksRes] = await Promise.all([
    fetch(`${API_BASE}/api/personalized/categories`, { next: { revalidate: 300 } }),
    fetch(`${API_BASE}/api/catalog/books`, { next: { revalidate: 300 } }),
  ]);
  if (!catRes.ok || !booksRes.ok) return null;

  const categories: { id: string; slug: string | null; name: string; models: { id: string; slug: string | null; name: string }[] }[] = await catRes.json();
  const books: { id: string; name: string }[] = await booksRes.json();

  const category = categories.find((c) => c.slug === categoriaSlug);
  const model = category?.models.find((m) => m.slug === libroSlug);
  if (!category || !model) return null;

  const catalogBook = books.find((b) => b.name === model.name);
  const dbIds: DbIds | null = catalogBook
    ? { catalogBookId: Number(catalogBook.id), personalizedModelId: Number(model.id), personalizedCategoryId: Number(category.id) }
    : null;

  return { libroNombre: model.name, dbIds };
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

async function fetchTemplates(modelId: number): Promise<{ id: number; name: string | null; previewUrl: string; genderDirection: string | null }[]> {
  const res = await fetch(`${API_BASE}/api/personalized/models/${modelId}/templates`, { next: { revalidate: 300 } });
  if (!res.ok) return [];
  const templates = await res.json();
  return templates
    .map((t: { id: string; name: string | null; previewUrl: string; genderDirection: string | null }) => ({
      id: Number(t.id),
      name: t.name,
      previewUrl: t.previewUrl,
      genderDirection: t.genderDirection,
    }))
    .sort((a: { previewUrl: string }, b: { previewUrl: string }) => {
      const n = (url: string) => {
        const m = url.match(/PLANTILLA_(\d+)_/i);
        return m ? parseInt(m[1], 10) : 0;
      };
      return n(a.previewUrl) - n(b.previewUrl);
    });
}

type Props = {
  params: Promise<{ categoriaId: string; libroSlug: string }>;
};

export default async function LibroDetallePage({ params }: Props) {
  const { categoriaId, libroSlug } = await params;

  const resolved = await resolveBookBySlug(categoriaId, libroSlug);
  if (!resolved) notFound();
  const { libroNombre, dbIds } = resolved;

  // Fetch in parallel: background + carousel images + datos dependientes de DB
  const bgKey = BACKGROUND_KEYS[libroSlug];
  const carouselKeys = CAROUSEL_KEYS[libroSlug] ?? [];

  const backgroundUrl = bgKey ? getAssetUrl(bgKey) : null;
  const carouselImageUrls = carouselKeys.map((key) => getAssetUrl(key));

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
      dbIds={dbIds}
      variants={variants}
      templates={templates}
    />
  );
}
