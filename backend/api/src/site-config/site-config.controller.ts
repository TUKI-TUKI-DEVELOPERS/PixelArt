import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { SiteConfigService } from './site-config.service';
import { UpsertSiteConfigDto } from './dto/upsert-site-config.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AdminThrottleExempt } from '../common/decorators/throttle.decorators';

/** Public read used by the navbar promo banner — intentionally unauthenticated. */
@Controller('site-config')
export class SiteConfigPublicController {
  constructor(private readonly service: SiteConfigService) {}

  @Get(':key')
  async get(@Param('key') key: string) {
    const result = await this.service.get(key);
    return result ?? { key, value: null };
  }
}

@Controller('admin/site-config')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'OPERATOR')
@AdminThrottleExempt()
export class SiteConfigAdminController {
  constructor(private readonly service: SiteConfigService) {}

  @Get(':key')
  async get(@Param('key') key: string) {
    const result = await this.service.get(key);
    return result ?? { key, value: null };
  }

  @Put(':key')
  upsert(@Param('key') key: string, @Body() body: UpsertSiteConfigDto) {
    return this.service.upsert(key, body.value);
  }
}
