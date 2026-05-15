import { photobookApi, PhotobookThemeApi } from "@/lib/api/photobook";
import PhotobooksClient from "./PhotobooksClient";

export default async function PhotobooksPage() {
  let apiThemes: PhotobookThemeApi[] = [];
  try {
    apiThemes = await photobookApi.listThemes();
  } catch {
    // Si la API no está disponible, el cliente muestra los temas sin imagen
  }

  // Extraemos la base de MinIO de cualquier URL de tema para construir assets estáticos
  const storageBase = apiThemes[0]?.coverPreviewUrl?.match(/^https?:\/\/[^/]+\/[^/]+/)?.[0] ?? null;
  const heroImageUrl = storageBase
    ? `${storageBase}/Photobooks/Home/Photobooks_Homehero_Background.png`
    : null;
  const qualityImageUrls = storageBase
    ? [1, 2, 3].map((n) => `${storageBase}/Photobooks/Home/Photobook_Section_Calidad_${n}.png`)
    : [];
  const memoriesImageUrls = storageBase
    ? [1, 2, 3, 4].map((n) => `${storageBase}/Photobooks/Home/Photobooks_Section_Memoriesforever_${n}.png`)
    : [];
  const faqImageUrl = storageBase
    ? `${storageBase}/Photobooks/Home/Photobooks_Section_FAQ.png`
    : null;

  return <PhotobooksClient apiThemes={apiThemes} heroImageUrl={heroImageUrl} qualityImageUrls={qualityImageUrls} memoriesImageUrls={memoriesImageUrls} faqImageUrl={faqImageUrl} />;
}
