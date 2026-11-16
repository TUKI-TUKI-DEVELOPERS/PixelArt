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

export type PhotobookPromoPreview = {
  code: string;
  percent: number;
  discountCents: number;
  totalCents: number;
};

async function postPromoPreview(url: string, body: object): Promise<PhotobookPromoPreview> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message = (err as { message?: unknown }).message;
    throw new Error(typeof message === 'string' && message ? message : 'No se pudo validar el código');
  }
  return res.json();
}

/** Template photobook: the server recomputes the price from the format. */
export function previewPhotobookPromo(data: {
  code: string;
  photobookThemeId: number;
  coverType: string;
  pageCount: number;
  wantsRush: boolean;
}): Promise<PhotobookPromoPreview> {
  return postPromoPreview('/api/photobook/promo-preview', data);
}

/** Custom photobook: requires the editor session cookie. */
export function previewCustomPhotobookPromo(data: {
  code: string;
  coverType: string;
  pageCount: number;
  wantsRush: boolean;
  customCoverSurchargeCents: number;
}): Promise<PhotobookPromoPreview> {
  return postPromoPreview('/api/photobook/custom-editor/promo-preview', data);
}
