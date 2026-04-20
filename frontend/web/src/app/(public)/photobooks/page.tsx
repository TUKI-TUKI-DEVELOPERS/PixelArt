import { photobookApi, PhotobookThemeApi } from "@/lib/api/photobook";
import PhotobooksClient from "./PhotobooksClient";

export default async function PhotobooksPage() {
  let apiThemes: PhotobookThemeApi[] = [];
  try {
    apiThemes = await photobookApi.listThemes();
  } catch {
    // Si la API no está disponible, el cliente muestra los temas sin imagen
  }
  return <PhotobooksClient apiThemes={apiThemes} />;
}
