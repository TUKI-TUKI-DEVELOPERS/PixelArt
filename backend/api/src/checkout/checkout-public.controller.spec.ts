import { ValidationPipe } from '@nestjs/common';
import { GUARDS_METADATA } from '@nestjs/common/constants';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CheckoutPublicController } from './checkout-public.controller';
import { PromoPreviewDto } from './dto/promo-preview.dto';

function makeController() {
  const checkoutService = {
    getInfo: jest.fn(),
    submit: jest.fn(async () => ({ success: true })),
    previewPromo: jest.fn(async () => ({ code: 'NAVIDAD15' })),
  };
  return { controller: new CheckoutPublicController(checkoutService as any), checkoutService };
}

const file = { buffer: Buffer.from('x'), originalname: 'v.jpg', mimetype: 'image/jpeg' } as Express.Multer.File;

describe('CheckoutPublicController', () => {
  it('submit forwards the optional promoCode', async () => {
    const { controller, checkoutService } = makeController();
    await controller.submit('tok', 'PREMIUM', '1,2', file, 'NAVIDAD15');
    expect(checkoutService.submit).toHaveBeenCalledWith(
      expect.objectContaining({ token: 'tok', packageType: 'PREMIUM', additionalTemplateIds: [1, 2], promoCode: 'NAVIDAD15' }),
    );
  });

  it('submit sends promoCode null when absent', async () => {
    const { controller, checkoutService } = makeController();
    await controller.submit('tok', 'STANDARD', '1', file, undefined);
    expect(checkoutService.submit).toHaveBeenCalledWith(expect.objectContaining({ promoCode: null }));
  });

  it('promo-preview maps the body and is rate limited', async () => {
    const { controller, checkoutService } = makeController();
    await controller.previewPromo('tok', Object.assign(new PromoPreviewDto(), { code: 'NAVIDAD15', package: 'PREMIUM' }));
    expect(checkoutService.previewPromo).toHaveBeenCalledWith({ token: 'tok', code: 'NAVIDAD15', packageType: 'PREMIUM' });
    const handler = CheckoutPublicController.prototype.previewPromo;
    expect(Reflect.getMetadata('THROTTLER:LIMITdefault', handler)).toBe(10);
    expect(Reflect.getMetadata('THROTTLER:TTLdefault', handler)).toBe(60_000);
    // The global APP_GUARD ThrottlerGuard enforces it; a route-level guard would double count.
    expect((Reflect.getMetadata(GUARDS_METADATA, handler) ?? []) as unknown[]).not.toContain(ThrottlerGuard);
  });
});

describe('PromoPreviewDto', () => {
  const pipe = new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true });
  const validate = (value: unknown) => pipe.transform(value, { type: 'body', metatype: PromoPreviewDto });

  it('accepts code + package', async () => {
    await expect(validate({ code: 'NAVIDAD15', package: 'STANDARD' })).resolves.toBeInstanceOf(PromoPreviewDto);
  });

  it('rejects an unknown package or a missing code', async () => {
    await expect(validate({ code: 'NAVIDAD15', package: 'GOLD' })).rejects.toThrow();
    await expect(validate({ package: 'STANDARD' })).rejects.toThrow();
  });
});
