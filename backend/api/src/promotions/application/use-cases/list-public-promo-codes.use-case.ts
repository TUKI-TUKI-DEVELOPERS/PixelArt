import { Injectable } from '@nestjs/common';
import { PromotionRepositoryPort } from '../../domain/ports/promotion-repository.port';
import { describePromotionScope, PromotionAudience, promotionAudience } from '../../domain/services/promotion-scope';

/** A coded promotion as the public site may announce it. Codes are public. */
export type PublicPromoCode = {
  code: string;
  percent: number;
  scope: string | null;
  audience: PromotionAudience;
  validUntil: Date;
};

@Injectable()
export class ListPublicPromoCodesUseCase {
  constructor(private readonly repo: PromotionRepositoryPort) {}

  async execute(now: Date = new Date()): Promise<PublicPromoCode[]> {
    const promotions = await this.repo.findValidCodedPromotions(now);
    return promotions
      .filter((p) => p.code !== null && p.discountType === 'percent')
      .sort((a, b) => a.validUntil.getTime() - b.validUntil.getTime())
      .map((p) => ({
        code: p.code as string,
        percent: p.discountValue,
        scope: describePromotionScope(p.eligibility),
        audience: promotionAudience(p.eligibility),
        validUntil: p.validUntil,
      }));
  }
}
