import { IsObject } from 'class-validator';

/** Body of PUT /api/admin/site-config/:key — the value is stored as JSON. */
export class UpsertSiteConfigDto {
  @IsObject()
  value: Record<string, unknown>;
}
