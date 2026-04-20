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

  // Fetch assets para libros-de-amor
  let assetUrls: Record<string, string> = {};
  if (categoriaId === "libros-de-amor") {
    const K = CATEGORIA_AMOR_ASSET_KEYS;
    const keys = Object.entries(K);
    keys.forEach(([name, storageKey]) => {
      assetUrls[name] = getAssetUrlDirect(storageKey);
    });
  }

  return (
    <CategoriaClient
      categoriaSlug={categoriaId}
      categoriaNombre={categoriaNombre}
      assetUrls={assetUrls}
    />
  );
}
