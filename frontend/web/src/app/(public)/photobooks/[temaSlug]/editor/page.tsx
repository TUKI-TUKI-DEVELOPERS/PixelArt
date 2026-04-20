import { notFound } from "next/navigation";
import PhotobookEditorClient from "./PhotobookEditorClient";

const API_BASE = "http://api:3001";

const TEMAS_VALIDOS: Record<string, string> = {
  "portada-francesa-flores": "Portada Francesa de Flores",
  "portada-chichen-itza": "Portada Chichén Itzá",
  "portada-nueva-york": "Portada Ciudad Nueva York",
  "portada-coliseo-romano": "Portada Coliseo Romano",
  "portada-pais-vientos": "Portada País de los Vientos",
  "portada-thailandia": "Portada Thailandia",
  "portada-rio-janeiro": "Portada Rio de Janeiro",
  "portada-iquitos": "Portada de Visita a Iquitos",
  "portada-machu-picchu": "Portada Machu Picchu",
  "portada-punta-cana": "Portada Punta Cana",
  "portada-jamaica": "Portada Jamaica",
  "portada-miami": "Portada Miami",
};

// Map frontend slug to DB theme name for lookup
const SLUG_TO_THEME_NAME: Record<string, string> = {
  "portada-francesa-flores": "Francia",
  "portada-chichen-itza": "México",
  "portada-nueva-york": "Nueva York",
  "portada-coliseo-romano": "Roma",
  "portada-pais-vientos": "Holanda",
  "portada-thailandia": "Thailandia",
  "portada-rio-janeiro": "Río de Janeiro",
  "portada-iquitos": "Iquitos",
  "portada-machu-picchu": "Machu Picchu",
  "portada-punta-cana": "Punta Cana",
  "portada-jamaica": "Jamaica",
  "portada-miami": "Bodas",
};

type Props = {
  params: Promise<{ temaSlug: string }>;
};

export default async function PhotobookEditorPage({ params }: Props) {
  const { temaSlug } = await params;

  const temaNombre = TEMAS_VALIDOS[temaSlug];
  if (!temaNombre) notFound();

  // Fetch products and themes
  const [productsRes, themesRes] = await Promise.all([
    fetch(`${API_BASE}/api/photobook/products`, { next: { revalidate: 300 } }).catch(() => null),
    fetch(`${API_BASE}/api/photobook/themes`, { next: { revalidate: 300 } }).catch(() => null),
  ]);

  const products = productsRes?.ok ? await productsRes.json() : [];
  const themes = themesRes?.ok ? await themesRes.json() : [];

  // Find theme ID and cover URLs
  const themeName = SLUG_TO_THEME_NAME[temaSlug];
  const theme = themes.find((t: { name: string }) => t.name === themeName);
  const themeId = theme?.id ?? null;
  const coverUrl: string | null = theme?.coverTemplateUrl ?? null;
  const backCoverUrl: string | null = theme?.backCoverUrl ?? null;

  return (
    <PhotobookEditorClient
      temaSlug={temaSlug}
      temaNombre={temaNombre}
      themeId={themeId}
      products={products}
      coverUrl={coverUrl}
      backCoverUrl={backCoverUrl}
    />
  );
}
