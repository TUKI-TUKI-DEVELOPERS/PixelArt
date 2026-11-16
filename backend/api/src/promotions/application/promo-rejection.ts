import { ConflictException, HttpException, UnprocessableEntityException } from '@nestjs/common';
import { PromoRejectionReason } from '../domain/services/promo-code-evaluator';

/** Customer-facing copy (neutral Spanish). Inactive codes look like unknown ones. */
export const PROMO_REJECTION_MESSAGES: Record<PromoRejectionReason, string> = {
  not_found: 'Código no válido',
  inactive: 'Código no válido',
  not_started: 'Este código aún no está vigente',
  expired: 'Este código ha vencido',
  not_applicable: 'Este código no aplica a este libro',
  already_applied: 'Este pedido ya tiene otro código de promoción aplicado',
};

/** Copy override per product, e.g. "no aplica a este photobook". */
export type PromoRejectionMessageOverrides = Partial<Record<PromoRejectionReason, string>>;

export function promoRejectionException(
  reason: PromoRejectionReason,
  overrides: PromoRejectionMessageOverrides = {},
): HttpException {
  const message = overrides[reason] ?? PROMO_REJECTION_MESSAGES[reason];
  if (reason === 'already_applied') {
    return new ConflictException({ statusCode: 409, error: 'Conflict', message, reason });
  }
  return new UnprocessableEntityException({ statusCode: 422, error: 'Unprocessable Entity', message, reason });
}
