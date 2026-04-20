import { notFound } from "next/navigation";
import PhotobookDetalleClient from "./PhotobookDetalleClient";

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

type Props = {
  params: Promise<{ temaSlug: string }>;
};

export default async function PhotobookDetallePage({ params }: Props) {
  const { temaSlug } = await params;

  const temaNombre = TEMAS_VALIDOS[temaSlug];
  if (!temaNombre) notFound();

  return <PhotobookDetalleClient temaSlug={temaSlug} temaNombre={temaNombre} />;
}
