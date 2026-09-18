export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import LibroDetalleClient from "./LibroDetalleClient";
import { getAssetUrl } from "@/lib/assetUrl";


const ADULT_BASE_SLUGS: Record<string, string> = {
  "mama-mi-heroina-adulto": "mama-mi-heroina",
  "te-amo-abuelo-adulto": "te-amo-abuelo",
  "te-amo-abuela-adulto": "te-amo-abuela",
  "el-mejor-equipo-adulto": "el-mejor-equipo",
  "la-familia-adulto": "la-familia",
  "aventura-entre-patas-adulto": "aventura-entre-patas",
  "siempre-en-mi-corazon-abuelo-adulto": "siempre-en-mi-corazon",
  "siempre-en-mi-corazon-abuela-adulto": "siempre-en-mi-corazon",
  "mi-angel-guardian-padre-adulto": "mi-angel-guardian",
  "mi-angel-guardian-madre-adulto": "mi-angel-guardian",
  "siempre-seras-parte-de-mi-adulto": "siempre-seras-parte-de-mi",
};

/* ── Mapa slug → storage_key del background en MinIO ── */
const BACKGROUND_KEYS: Record<string, string> = {
  "mi-amor": "IA_Books/Backgrounds/Backgrounds_Libros_Amor_Mi_Amor.png",
  "1025-dias-enamorandome-de-ti": "IA_Books/Backgrounds/Backgrounds_Libros_Amor_X_Dias_Enamorandome_de_ti.png",
  "10-razones-por-las-que-te-amo": "IA_Books/Backgrounds/Backgrounds_Libros_Amor_X_Razones_Por_Las_Que_Te_Amo.png",
  "papa-mi-heroe": "IA_Books/Backgrounds/Backgrounds_Libros_Familia_Papa_mi_heroe.png",
  "papa-mi-heroe-adulto": "IA_Books/Backgrounds/Backgrounds_Libros_Familia_Papa_mi_heroe_Adulto.png",
  "la-familia": "IA_Books/Backgrounds/Backgrounds_Libros_Familia_La_Familia.png",
  "el-mejor-equipo": "IA_Books/Backgrounds/Backgrounds_Libros_Familia_El_mejor_equipo.png",
  "te-amo-abuelo": "IA_Books/Backgrounds/Backgrounds_Libros_Familia_Te_amo_abuelo.png",
  "te-amo-abuela": "IA_Books/Backgrounds/Backgrounds_Libros_Familia_Te_amo_abuela.png",
  "mama-mi-heroina": "IA_Books/Backgrounds/Backgrounds_Libros_Familia_Mama_mi_heroina.png",
  "aventura-entre-patas": "IA_Books/Backgrounds/Backgrounds_Libros_Mascotas_Aventuras_Entre_Patas.png",
  "aventura-entre-patas-adulto": "IA_Books/Backgrounds/Backgrounds_Libros_Mascotas_Aventuras_Entre_Patas_Adulto.webp",
  "mi-mejor-amigo-del-mundo": "IA_Books/Backgrounds/Backgrounds_Libros_Mascotas_Mi_Mejor_Amigo_del_mundo.png",
  "mi-amigo-miauravilloso": "IA_Books/Backgrounds/Backgrounds_Libros_Mascotas_Mi_amigo_miauravilloso.png",
  "nuestro-angel-de-4-patas": "IA_Books/Backgrounds/Backgrounds_Libros_Mascotas_Nuestro_Angel_de_4_patas.png",
  "mi-angel-guardian": "IA_Books/Backgrounds/Backgrounds_Libros_Memoria_Familiar_Mi_angel_guardian.png",
  "siempre-en-mi-corazon": "IA_Books/Backgrounds/Backgrounds_Libros_Memoria_Familiar_Siempre_en_mi_corazon.png",
  "siempre-seras-parte-de-mi": "IA_Books/Backgrounds/Backgrounds_Libros_Memoria_Familiar_Siempre_seras_parte_de_mi_corazon.png",
  "mama-mi-heroina-adulto": "IA_Books/Backgrounds/Backgrounds_Libros_Familia_Mama_mi_heroina_Adulto.webp",
  "te-amo-abuelo-adulto": "IA_Books/Backgrounds/Backgrounds_Libros_Familia_Te_amo_abuelo_Adulto.webp",
  "te-amo-abuela-adulto": "IA_Books/Backgrounds/Backgrounds_Libros_Familia_Te_amo_abuela_Adulto.webp",
  "el-mejor-equipo-adulto": "IA_Books/Backgrounds/Backgrounds_Libros_Familia_El_mejor_equipo_Adulto.webp",
  "la-familia-adulto": "IA_Books/Backgrounds/Backgrounds_Libros_Familia_La_Familia_Adulto.webp",
  "siempre-en-mi-corazon-abuelo-adulto": "IA_Books/Backgrounds/Backgrounds_Libros_Memoria_Familiar_Siempre_en_mi_corazon_abuelo_Adulto.webp",
  "siempre-en-mi-corazon-abuela-adulto": "IA_Books/Backgrounds/Backgrounds_Libros_Memoria_Familiar_Siempre_en_mi_corazon_abuela_Adulto.webp",
  "mi-angel-guardian-padre-adulto": "IA_Books/Backgrounds/Backgrounds_Libros_Memoria_Familiar_Mi_angel_guardian_padre_Adulto.webp",
  "mi-angel-guardian-madre-adulto": "IA_Books/Backgrounds/Backgrounds_Libros_Memoria_Familiar_Mi_angel_guardian_madre_Adulto.webp",
  "siempre-seras-parte-de-mi-adulto": "IA_Books/Backgrounds/Backgrounds_Libros_Memoria_Familiar_Siempre_seras_parte_de_mi_Adulto.webp",
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
  "aventura-entre-patas-adulto": [
    "IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Libros_Mascotas_AventuraEntrePatas_Adulto_Central.webp",
    "IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Libros_Mascotas_AventuraEntrePatas_Adulto_Central_2.webp",
    "IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Libros_Mascotas_AventuraEntrePatas_Adulto_Central_3.webp",
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
  "papa-mi-heroe-adulto": [
    "IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Libros_Familia_Papamiheroe_Adulto_Central.png",
    "IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Libros_Familia_Papamiheroe_Adulto_Central_2.png",
    "IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Libros_Familia_Papamiheroe_Adulto_Central_3.png",
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
  "mama-mi-heroina-adulto": [
    "IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Libros_Familia_MamamiHeroina_Adulto_Central.webp",
    "IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Libros_Familia_MamamiHeroina_Adulto_Central_2.webp",
    "IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Libros_Familia_MamamiHeroina_Adulto_Central_3.webp",
  ],
  "te-amo-abuelo-adulto": [
    "IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Libros_Familia_TeAmoAbuelo_Adulto_Central.webp",
    "IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Libros_Familia_TeAmoAbuelo_Adulto_Central_2.webp",
    "IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Libros_Familia_TeAmoAbuelo_Adulto_Central_3.webp",
  ],
  "te-amo-abuela-adulto": [
    "IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Libros_Familia_TeAmoAbuela_Adulto_Central.webp",
    "IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Libros_Familia_TeAmoAbuela_Adulto_Central_2.webp",
    "IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Libros_Familia_TeAmoAbuela_Adulto_Central_3.webp",
  ],
  "el-mejor-equipo-adulto": [
    "IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Libros_Familia_ElMejorEquipo_Adulto_Central.webp",
    "IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Libros_Familia_ElMejorEquipo_Adulto_Central_2.webp",
    "IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Libros_Familia_ElMejorEquipo_Adulto_Central_3.webp",
  ],
  "la-familia-adulto": [
    "IA_Books/Family_Books_Page/Libros/La_familia_adulto/Libros_Familia_MiFamilia_Adulto_Central.webp",
    "IA_Books/Family_Books_Page/Libros/La_familia_adulto/Libros_Familia_MiFamilia_Adulto_Central_2.webp",
    "IA_Books/Family_Books_Page/Libros/La_familia_adulto/Libros_Familia_MiFamilia_Adulto_Central_3.webp",
  ],
  "siempre-en-mi-corazon-abuelo-adulto": [
    "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Libros_Memoria_Familiar_SiempreEnMiCorazonAbuelo_Adulto_Central.webp",
    "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Libros_Memoria_Familiar_SiempreEnMiCorazonAbuelo_Adulto_Central_2.webp",
    "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Libros_Memoria_Familiar_SiempreEnMiCorazonAbuelo_Adulto_Central_3.webp",
  ],
  "siempre-en-mi-corazon-abuela-adulto": [
    "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Libros_Memoria_Familiar_SiempreEnMiCorazonAbuela_Adulto_Central.webp",
    "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Libros_Memoria_Familiar_SiempreEnMiCorazonAbuela_Adulto_Central_2.webp",
    "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Libros_Memoria_Familiar_SiempreEnMiCorazonAbuela_Adulto_Central_3.webp",
  ],
  "mi-angel-guardian-padre-adulto": [
    "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Libros_Memoria_Familiar_MiAngelGuardianPadre_Adulto_Central.webp",
    "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Libros_Memoria_Familiar_MiAngelGuardianPadre_Adulto_Central_2.webp",
    "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Libros_Memoria_Familiar_MiAngelGuardianPadre_Adulto_Central_3.webp",
  ],
  "mi-angel-guardian-madre-adulto": [
    "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Libros_Memoria_Familiar_MiAngelGuardianMadre_Adulto_Central.webp",
    "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Libros_Memoria_Familiar_MiAngelGuardianMadre_Adulto_Central_2.webp",
    "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Libros_Memoria_Familiar_MiAngelGuardianMadre_Adulto_Central_3.webp",
  ],
  "siempre-seras-parte-de-mi-adulto": [
    "IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Libros_Memoria_Familiar_SiempreSerasParteDeMi_Adulto_Central.webp",
    "IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Libros_Memoria_Familiar_SiempreSerasParteDeMi_Adulto_Central_2.webp",
    "IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Libros_Memoria_Familiar_SiempreSerasParteDeMi_Adulto_Central_3.webp",
  ],
};

const API_BASE = process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://api:3001";
const RETIRED_BOOK_SLUGS = new Set(["gracias-por-tu-amor"]);

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

  if (RETIRED_BOOK_SLUGS.has(libroSlug)) notFound();

  const resolved = await resolveBookBySlug(categoriaId, libroSlug);
  if (!resolved) notFound();
  const { libroNombre, dbIds } = resolved;

  // Fetch in parallel: background + carousel images + datos dependientes de DB
  const assetSlug = ADULT_BASE_SLUGS[libroSlug] ?? libroSlug;
  const bgKey = BACKGROUND_KEYS[libroSlug] ?? BACKGROUND_KEYS[assetSlug];
  const carouselKeys = CAROUSEL_KEYS[libroSlug] ?? CAROUSEL_KEYS[assetSlug] ?? [];

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
