import { Injectable } from '@nestjs/common';
import { ProductRef } from '../../domain/eligibility-target';
import { PromotionRepositoryPort } from '../../domain/ports/promotion-repository.port';
import { PromotionCatalogPort } from '../../domain/ports/promotion-catalog.port';
import {
  AppliedPromotionSnapshot,
  evaluatePromoCode,
  PromoEvaluation,
} from '../../domain/services/promo-code-evaluator';
import { normalizePromoCode } from '../../domain/value-objects/promo-code';

/** What the caller knows about the product; categories are resolved here. */
export type ProductKey =
  | { kind: 'PERSONALIZED_BOOK'; modelId: number }
  | { kind: 'TEMPLATE_PHOTOBOOK'; themeId: number }
  | { kind: 'CUSTOM_PHOTOBOOK' };

export type EvaluatePromoCodeCommand = {
  code: string;
  product: ProductKey;
  /** Product price only: base + premium package. */
  discountableBaseCents: number;
  applied: AppliedPromotionSnapshot | null;
  now?: Date;
};

@Injectable()
export class EvaluatePromoCodeUseCase {
  constructor(
    private readonly repo: PromotionRepositoryPort,
    private readonly catalog: PromotionCatalogPort,
  ) {}

  async execute(command: EvaluatePromoCodeCommand): Promise<PromoEvaluation> {
    const code = normalizePromoCode(command.code);
    if (!code && !command.applied) return { ok: false, reason: 'not_found' };

    const product = await this.resolveProduct(command.product);
    if (!product) return { ok: false, reason: 'not_applicable' };

    const promotion = command.applied ? null : await this.repo.findByCode(code);
    return evaluatePromoCode({
      code,
      promotion,
      now: command.now ?? new Date(),
      product,
      discountableBaseCents: command.discountableBaseCents,
      applied: command.applied,
    });
  }

  private async resolveProduct(key: ProductKey): Promise<ProductRef | null> {
    if (key.kind !== 'PERSONALIZED_BOOK') return key;
    const categories = await this.catalog.findModelCategories([key.modelId]);
    const categoryId = categories.get(key.modelId);
    return categoryId === undefined ? null : { kind: 'PERSONALIZED_BOOK', modelId: key.modelId, categoryId };
  }
}
