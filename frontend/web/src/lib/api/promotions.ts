// Admin promotions — always through the same-origin BFF (/admin-api), which
// adds the admin JWT from the httpOnly cookie.
export type EligibilityKind =
  | 'PERSONALIZED_CATEGORY'
  | 'PERSONALIZED_BOOK'
  | 'TEMPLATE_PHOTOBOOKS_ALL'
  | 'PHOTOBOOK_THEME'
  | 'CUSTOM_PHOTOBOOK';

export type EligibilityTarget = { kind: EligibilityKind; refId: number | null };

export type AdminPromotion = {
  id: number;
  label: string;
  code: string | null;
  targetType: 'model' | 'models' | 'category' | 'all' | null;
  targetId: number | null;
  targetIds: number[];
  eligibility: EligibilityTarget[];
  discountType: 'percent' | 'fixed_cents';
  discountValue: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  createdAt: string;
};

export type PromotionPayload = {
  code: string;
  percent: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  eligibility: EligibilityTarget[];
};

const BASE = '/admin-api/promotions';

async function errorMessage(res: Response, fallback: string): Promise<string> {
  const body = await res.json().catch(() => ({}));
  const message = (body as { message?: unknown }).message;
  if (Array.isArray(message)) return message.join(' · ');
  return typeof message === 'string' && message ? message : fallback;
}

export async function listPromotions(): Promise<AdminPromotion[]> {
  const res = await fetch(BASE, { cache: 'no-store' });
  if (!res.ok) throw new Error(await errorMessage(res, 'No se pudieron cargar las promociones'));
  return res.json();
}

export async function savePromotion(id: number | null, payload: PromotionPayload): Promise<AdminPromotion> {
  const res = await fetch(id === null ? BASE : `${BASE}/${id}`, {
    method: id === null ? 'POST' : 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await errorMessage(res, 'Error al guardar'));
  return res.json();
}

export async function deletePromotion(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(await errorMessage(res, 'Error al eliminar'));
}
