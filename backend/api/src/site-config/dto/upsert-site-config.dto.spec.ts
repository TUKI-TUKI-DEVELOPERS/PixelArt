import { ValidationPipe } from '@nestjs/common';
import { UpsertSiteConfigDto } from './upsert-site-config.dto';
import { SiteConfigAdminController } from '../site-config.controller';

const pipe = new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true });
const validate = (body: unknown) => pipe.transform(body, { type: 'body', metatype: UpsertSiteConfigDto });

describe('UpsertSiteConfigDto', () => {
  it('accepts the promo banner payload sent by the admin promotions page', async () => {
    const value = { text: '20% en libros', color: '#1a1a2e', enabled: true };
    await expect(validate({ value })).resolves.toMatchObject({ value });
  });

  it.each([
    ['a missing value', {}],
    ['a string value', { value: 'banner' }],
    ['an array value', { value: [1, 2] }],
    ['extra top-level fields', { value: {}, key: 'other' }],
  ])('rejects %s', async (_label, body) => {
    await expect(validate(body)).rejects.toMatchObject({ status: 400 });
  });

  it('is the declared body type of the admin PUT route', () => {
    const [, bodyType] = Reflect.getMetadata('design:paramtypes', SiteConfigAdminController.prototype, 'upsert');
    expect(bodyType).toBe(UpsertSiteConfigDto);
  });
});
