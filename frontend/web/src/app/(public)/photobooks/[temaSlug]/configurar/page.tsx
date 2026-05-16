import { notFound } from "next/navigation";
import { photobookApi } from "@/lib/api/photobook";
import PhotobookConfigurarClient from "./PhotobookConfigurarClient";

const TEMAS_VALIDOS: Record<string, string> = {
  "portada-francesa-flores": "Portada Francesa de Flores",
  "portada-chichen-itza":    "Portada Chichén Itzá",
  "portada-nueva-york":      "Portada Ciudad Nueva York",
  "portada-coliseo-romano":  "Portada Coliseo Romano",
  "portada-pais-vientos":    "Portada País de los Vientos",
  "portada-thailandia":      "Portada Thailandia",
  "portada-rio-janeiro":     "Portada Rio de Janeiro",
  "portada-iquitos":         "Portada de Visita a Iquitos",
  "portada-machu-picchu":    "Portada Machu Picchu",
  "portada-punta-cana":      "Portada Punta Cana",
  "portada-jamaica":         "Portada Jamaica",
  "portada-miami":           "Portada Miami",
};

const SLUG_TO_DB_NAME: Record<string, string> = {
  "portada-francesa-flores": "Francia",
  "portada-chichen-itza":    "México",
  "portada-nueva-york":      "Nueva York",
  "portada-coliseo-romano":  "Roma",
  "portada-pais-vientos":    "Holanda",
  "portada-thailandia":      "Thailandia",
  "portada-rio-janeiro":     "Río de Janeiro",
  "portada-iquitos":         "Iquitos",
  "portada-machu-picchu":    "Machu Picchu",
  "portada-punta-cana":      "Punta Cana",
  "portada-jamaica":         "Jamaica",
  "portada-miami":           "Bodas",
};

type Props = {
  params: Promise<{ temaSlug: string }>;
};

export default async function PhotobookConfigurarPage({ params }: Props) {
  const { temaSlug } = await params;
  const temaNombre = TEMAS_VALIDOS[temaSlug];
  if (!temaNombre) notFound();

  let coverPreviewUrl: string | null = null;
  try {
    const themes = await photobookApi.listThemes();
    const dbName = SLUG_TO_DB_NAME[temaSlug];
    const match  = themes.find((t) => t.name === dbName);
    coverPreviewUrl = match?.coverPreviewUrl ?? null;
  } catch { /* API no disponible */ }

  return (
    <PhotobookConfigurarClient
      temaSlug={temaSlug}
      temaNombre={temaNombre}
      coverPreviewUrl={coverPreviewUrl}
    />
  );
}
