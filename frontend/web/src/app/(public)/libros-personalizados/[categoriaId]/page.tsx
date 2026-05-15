import { notFound } from "next/navigation";
import CategoriaClient from "./CategoriaClient";
import { CATEGORIA_AMOR_ASSET_KEYS } from "@/lib/categoriaAssetKeys";

const CATEGORIAS_VALIDAS = [
  "libros-de-amor",
  "libros-de-mascotas",
  "libros-de-familia",
  "libros-de-memorias-familiares",
];

const CATEGORIA_NOMBRES: Record<string, string> = {
  "libros-de-amor": "Libros de Amor",
  "libros-de-mascotas": "Libros de Mascotas",
  "libros-de-familia": "Libros de Familia",
  "libros-de-memorias-familiares": "Libros de Memorias Familiares",
};

const API_BASE = "http://api:3001";

function getAssetUrlDirect(storageKey: string): string {
  const base = process.env.NEXT_PUBLIC_MINIO_URL ?? 'http://localhost:9000';
  const bucket = process.env.NEXT_PUBLIC_MINIO_BUCKET ?? 'pixelart-assets';
  return `${base}/${bucket}/${storageKey}`;
}

type Props = {
  params: Promise<{ categoriaId: string }>;
};

export default async function CategoriaPage({ params }: Props) {
  const { categoriaId } = await params;

  if (!CATEGORIAS_VALIDAS.includes(categoriaId)) {
    notFound();
  }

  const categoriaNombre = CATEGORIA_NOMBRES[categoriaId];

  // Fetch catalog books + personalized categories en paralelo
  const [catalogIds, modelCovers] = await Promise.all([
    fetch(`${API_BASE}/api/catalog/books`, { next: { revalidate: 300 } })
      .then((r) => r.ok ? r.json() : [])
      .then((data) => {
        const list: { id: number | string; name: string }[] = Array.isArray(data) ? data : data.data ?? [];
        return Object.fromEntries(list.map((b) => [b.name, Number(b.id)]));
      })
      .catch(() => ({} as Record<string, number>)),

    // Extrae coverImageUrl de cada modelo: Record<modelName, url>
    fetch(`${API_BASE}/api/personalized/categories`, { next: { revalidate: 300 } })
      .then((r) => r.ok ? r.json() : [])
      .then((cats: { models: { name: string; coverImageUrl: string | null }[] }[]) => {
        const result: Record<string, string> = {};
        for (const cat of cats) {
          for (const m of cat.models ?? []) {
            if (m.coverImageUrl) result[m.name] = m.coverImageUrl;
          }
        }
        return result;
      })
      .catch(() => ({} as Record<string, string>)),
  ]);

  // Fetch assets para libros-de-amor
  let assetUrls: Record<string, string> = {};
  if (categoriaId === "libros-de-amor") {
    const K = CATEGORIA_AMOR_ASSET_KEYS;
    const keys = Object.entries(K);
    keys.forEach(([name, storageKey]) => {
      assetUrls[name] = getAssetUrlDirect(storageKey);
    });
  } else if (categoriaId === "libros-de-familia") {
    assetUrls.heroBackground = getAssetUrlDirect('IA_Books/Backgrounds/Background_IA_Books_Family_Book_Page.png');
  } else if (categoriaId === "libros-de-mascotas") {
    assetUrls.heroBackground = getAssetUrlDirect('IA_Books/Backgrounds/Background_IA_Books_Pet_Book_Page.png');
  } else if (categoriaId === "libros-de-memorias-familiares") {
    assetUrls.heroBackground = getAssetUrlDirect('IA_Books/Backgrounds/Background_IA_Books_Memories_Book_Page.png');
  }

  return (
    <CategoriaClient
      categoriaSlug={categoriaId}
      categoriaNombre={categoriaNombre}
      assetUrls={assetUrls}
      catalogIds={catalogIds}
      modelCovers={modelCovers}
    />
  );
}
