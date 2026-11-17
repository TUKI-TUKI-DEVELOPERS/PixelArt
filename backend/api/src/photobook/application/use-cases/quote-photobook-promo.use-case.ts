import { BadRequestException, Injectable } from '@nestjs/common';
import { AppliedOrderPromotion } from '../../../orders/domain/ports/order-repository.port';
import { EvaluatePromoCodeUseCase, ProductKey } from '../../../promotions/application/use-cases/evaluate-promo-code.use-case';
import { isPromoRejected } from '../../../promotions/domain/services/promo-code-evaluator';
import { promoRejectionException } from '../../../promotions/application/promo-rejection';
import {
  calculatePhotobookProductCents,
  calculatePhotobookRushFeeCents,
  isValidPhotobookCoverType,
} from '../../domain/services/photobook-pricing.service';

export type TemplatePhotobookPromoInput = {
  code: string;
  themeId: number;
  coverType: string;
  /** Number of caras (pages), as sent by the editor. */
  pageCount: number;
  wantsRush: boolean;
};

export type CustomPhotobookPromoInput = {
  code: string;
  coverType: string;
  pageCount: number;
  wantsRush: boolean;
  customCoverSurchargeCents: number;
};

export type PhotobookPromoQuote = {
  code: string;
  percent: number;
  discountCents: number;
  totalCents: number;
  /** Snapshot to store on the order. */
  promotion: AppliedOrderPromotion;
};

const PHOTOBOOK_REJECTION_COPY = { not_applicable: 'Este código no aplica a este photobook' };

/**
 * Prices a photobook with a promotion code. The price is always recomputed
 * here: the percentage applies to the product price only (cover type + sheets),
 * never to the rush fee or the custom-cover surcharge.
 */
@Injectable()
export class QuotePhotobookPromoUseCase {
  constructor(private readonly evaluatePromoCode: EvaluatePromoCodeUseCase) {}

  quoteTemplate(input: TemplatePhotobookPromoInput): Promise<PhotobookPromoQuote> {
    return this.quote(input.code, { kind: 'TEMPLATE_PHOTOBOOK', themeId: input.themeId }, input, 0);
  }

  quoteCustom(input: CustomPhotobookPromoInput): Promise<PhotobookPromoQuote> {
    return this.quote(input.code, { kind: 'CUSTOM_PHOTOBOOK' }, input, input.customCoverSurchargeCents);
  }

  private async quote(
    code: string,
    product: ProductKey,
    format: { coverType: string; pageCount: number; wantsRush: boolean },
    surchargeCents: number,
  ): Promise<PhotobookPromoQuote> {
    if (!isValidPhotobookCoverType(format.coverType)) throw new BadRequestException('Tipo de tapa inválido');
    const productCents = calculatePhotobookProductCents(format.coverType, format.pageCount);
    const nonDiscountableCents = calculatePhotobookRushFeeCents(format.wantsRush) + surchargeCents;

    const evaluation = await this.evaluatePromoCode.execute({
      code,
      product,
      discountableBaseCents: productCents,
      applied: null,
    });
    if (isPromoRejected(evaluation)) throw promoRejectionException(evaluation.reason, PHOTOBOOK_REJECTION_COPY);

    return {
      code: evaluation.code,
      percent: evaluation.percent,
      discountCents: evaluation.discountCents,
      totalCents: productCents + nonDiscountableCents - evaluation.discountCents,
      promotion: {
        promotionId: evaluation.promotionId,
        code: evaluation.code,
        percent: evaluation.percent,
        discountCents: evaluation.discountCents,
      },
    };
  }
}
