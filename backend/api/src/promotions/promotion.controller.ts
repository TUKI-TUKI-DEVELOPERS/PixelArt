import { Controller, Get } from '@nestjs/common';
import { ListPublicPromoCodesUseCase, PublicPromoCode } from './application/use-cases/list-public-promo-codes.use-case';

@Controller('promotions')
export class PromotionController {
  constructor(private readonly listPublicPromoCodes: ListPublicPromoCodesUseCase) {}

  /** Public — coded promotions valid right now, for the site banner. */
  @Get('codes')
  getCodes(): Promise<PublicPromoCode[]> {
    return this.listPublicPromoCodes.execute();
  }
}
