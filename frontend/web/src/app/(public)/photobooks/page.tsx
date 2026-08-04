import { photobookApi, PhotobookThemeApi } from "@/lib/api/photobook";
import { getAssetUrl } from "@/lib/assetUrl";
import PhotobooksClient from "./PhotobooksClient";

export default async function PhotobooksPage() {
  let apiThemes: PhotobookThemeApi[] = [];
  try {
    apiThemes = await photobookApi.listThemes();
  } catch {
    // Si la API no está disponible, el cliente muestra los temas sin imagen
  }

  // Assets estáticos de esta página — mismo bucket, key fija, sin depender de
  // ningún tema en particular. getAssetUrl() ya arma la ruta relativa correcta
  // (/assets/...) para cualquier ambiente.
  const heroImageUrl = getAssetUrl("Photobooks/Home/Photobooks_Homehero_Background.png");
  const qualityImageUrls = [1, 2, 3].map((n) => getAssetUrl(`Photobooks/Home/Photobook_Section_Calidad_${n}.png`));
  const memoriesImageUrls = [1, 2, 3, 4].map((n) => getAssetUrl(`Photobooks/Home/Photobooks_Section_Memoriesforever_${n}.png`));
  const faqImageUrl = getAssetUrl("Photobooks/Home/Photobooks_Section_FAQ.png");

  return <PhotobooksClient apiThemes={apiThemes} heroImageUrl={heroImageUrl} qualityImageUrls={qualityImageUrls} memoriesImageUrls={memoriesImageUrls} faqImageUrl={faqImageUrl} />;
}
