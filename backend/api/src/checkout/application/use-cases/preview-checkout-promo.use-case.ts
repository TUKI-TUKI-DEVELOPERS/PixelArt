import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PublicLinksService } from '../../../public-links/public-links.service';
import { OrdersService } from '../../../orders/orders.service';
import { EvaluatePromoCodeUseCase } from '../../../promotions/application/use-cases/evaluate-promo-code.use-case';
import {
  CheckoutPackage,
  checkoutTotalCents,
  discountableBaseCents,
  extraTemplatesAmountFor,
} from '../../domain/checkout-pricing';
import { isPromoRejected } from '../../../promotions/domain/services/promo-code-evaluator';
import { appliedPromotionOf, promoRejectionException } from '../checkout-promotion';

export type PreviewCheckoutPromoInput = {
  token: string;
  code: string;
  packageType: CheckoutPackage;
};

export type PreviewCheckoutPromoResult = {
  code: string;
  percent: number;
  discountCents: number;
  totalCents: number;
};

/** Validates a promotion code for the order behind a checkout link, without writing anything. */
@Injectable()
export class PreviewCheckoutPromoUseCase {
  constructor(
    private readonly publicLinksService: PublicLinksService,
    private readonly ordersService: OrdersService,
    private readonly evaluatePromoCode: EvaluatePromoCodeUseCase,
  ) {}

  async execute(input: PreviewCheckoutPromoInput): Promise<PreviewCheckoutPromoResult> {
    const link = await this.publicLinksService.validate(input.token);
    if (link.linkType !== 'CHECKOUT' || !link.orderId) {
      throw new BadRequestException('Link de checkout inválido');
    }
    const order = await this.ordersService.findById(link.orderId);
    if (!order) throw new NotFoundException('Orden no encontrada');
    if (!order.personalizedModelId) throw promoRejectionException('not_applicable');

    const extraTemplatesAmountCents = extraTemplatesAmountFor(input.packageType);
    const evaluation = await this.evaluatePromoCode.execute({
      code: input.code,
      product: { kind: 'PERSONALIZED_BOOK', modelId: order.personalizedModelId },
      discountableBaseCents: discountableBaseCents({ baseAmountCents: order.baseAmountCents, extraTemplatesAmountCents }),
      applied: appliedPromotionOf(order),
    });
    if (isPromoRejected(evaluation)) throw promoRejectionException(evaluation.reason);

    return {
      code: evaluation.code,
      percent: evaluation.percent,
      discountCents: evaluation.discountCents,
      totalCents: checkoutTotalCents({
        baseAmountCents: order.baseAmountCents,
        rushFeeCents: order.rushFeeCents,
        extraTemplatesAmountCents,
        discountCents: evaluation.discountCents,
      }),
    };
  }
}
