import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { SiteConfigService } from './site-config.service';

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
export class SiteConfigAdminController {
  constructor(private readonly service: SiteConfigService) {}

  @Get(':key')
  async get(@Param('key') key: string) {
    const result = await this.service.get(key);
    return result ?? { key, value: null };
  }

  @Put(':key')
  upsert(@Param('key') key: string, @Body() body: { value: Record<string, unknown> }) {
    return this.service.upsert(key, body.value);
  }
}
