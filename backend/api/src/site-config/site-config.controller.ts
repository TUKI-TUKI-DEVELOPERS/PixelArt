import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { SiteConfigService } from './site-config.service';

@Controller('site-config')
export class SiteConfigPublicController {
  constructor(private readonly service: SiteConfigService) {}

  @Get(':key')
  get(@Param('key') key: string) {
    return this.service.get(key);
  }
}

@Controller('admin/site-config')
export class SiteConfigAdminController {
  constructor(private readonly service: SiteConfigService) {}

  @Get(':key')
  get(@Param('key') key: string) {
    return this.service.get(key);
  }

  @Put(':key')
  upsert(@Param('key') key: string, @Body() body: { value: Record<string, unknown> }) {
    return this.service.upsert(key, body.value);
  }
}
