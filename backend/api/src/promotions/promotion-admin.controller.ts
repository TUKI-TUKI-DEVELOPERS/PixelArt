import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AdminThrottleExempt } from '../common/decorators/throttle.decorators';
import { PromotionService } from './promotion.service';
import { SavePromotionDto } from './dto/save-promotion.dto';
import { SavePromotionInput } from './application/use-cases/save-promotion.use-case';

@Controller('admin/promotions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'OPERATOR')
@AdminThrottleExempt()
export class PromotionAdminController {
  constructor(private readonly service: PromotionService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() body: SavePromotionDto) {
    return this.service.save(toInput(null, body));
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: SavePromotionDto) {
    return this.service.save(toInput(id, body));
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}

function toInput(id: number | null, body: SavePromotionDto): SavePromotionInput {
  return {
    id,
    code: body.code,
    percent: body.percent,
    validFrom: new Date(body.validFrom),
    validUntil: new Date(body.validUntil),
    isActive: body.isActive ?? true,
    eligibility: body.eligibility.map((t) => ({ kind: t.kind, refId: t.refId ?? null })),
  };
}
