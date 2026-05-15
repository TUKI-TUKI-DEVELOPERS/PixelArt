import { Controller, Get } from '@nestjs/common';
import { PromotionService } from './promotion.service';

@Controller('promotions')
export class PromotionController {
  constructor(private readonly service: PromotionService) {}

  @Get('active')
  getActive() {
    return this.service.findActive();
  }
}
