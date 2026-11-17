import { formatPrice } from '@/lib/utils/price';

/** Promotion snapshot fields the admin orders API returns. */
export type OrderPromotionFields = {
  discountAmountCents?: number;
  promotionCode?: string | null;
  promotionPercent?: number | null;
};

/** "Descuento (CODE, N%) −S/ X", or null when the order has no promotion. */
export function orderDiscountLabel(order: OrderPromotionFields): string | null {
  if (!order.promotionCode || !order.discountAmountCents) return null;
  const percent = order.promotionPercent != null ? `, ${order.promotionPercent}%` : '';
  return `Descuento (${order.promotionCode}${percent}) −${formatPrice(order.discountAmountCents)}`;
}
