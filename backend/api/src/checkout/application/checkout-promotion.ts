import { OrderRecord } from '../../orders/domain/ports/order-repository.port';
import { AppliedPromotionSnapshot } from '../../promotions/domain/services/promo-code-evaluator';

export { PROMO_REJECTION_MESSAGES, promoRejectionException } from '../../promotions/application/promo-rejection';

export function appliedPromotionOf(order: OrderRecord): AppliedPromotionSnapshot | null {
  if (!order.promotionCode || order.promotionPercent === null) return null;
  return { promotionId: order.promotionId, code: order.promotionCode, percent: order.promotionPercent };
}
