import { apiFetch } from './client';

export type PhotobookThemeApi = {
  id: number;
  name: string;
  coverPreviewUrl: string;
  coverTemplateUrl: string;
  backCoverUrl: string | null;
  isActive: boolean;
};

export const photobookApi = {
  listThemes: () =>
    apiFetch<PhotobookThemeApi[]>('/api/photobook/themes'),
};
