import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionData, UpdatePromotionData } from './domain/ports/promotion-repository.port';

@Controller('admin/promotions')
export class PromotionAdminController {
  constructor(private readonly service: PromotionService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() body: CreatePromotionData) {
    return this.service.create({
      ...body,
      validFrom:  new Date(body.validFrom),
      validUntil: new Date(body.validUntil),
    });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePromotionData,
  ) {
    return this.service.update(id, {
      ...body,
      ...(body.validFrom  && { validFrom:  new Date(body.validFrom)  }),
      ...(body.validUntil && { validUntil: new Date(body.validUntil) }),
    });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
