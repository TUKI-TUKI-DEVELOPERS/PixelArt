import { APP_GUARD } from '@nestjs/core';
import { GUARDS_METADATA } from '@nestjs/common/constants';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppModule } from './app.module';
import { AuthController } from './auth/auth.controller';
import { DemoPublicController } from './demo/demo-public.controller';
import { DemoAdminController } from './demo/demo-admin.controller';
import { PhotobookPublicController } from './photobook/photobook-public.controller';
import { PhotobookAdminController } from './photobook/photobook-admin.controller';
import { CheckoutPublicController } from './checkout/checkout-public.controller';
import { PaymentsPublicController } from './payments/payments-public.controller';
import { OrdersAdminController } from './orders/orders.controller';
import { FeedbackAdminController } from './feedback/feedback-admin.controller';
import { PromotionAdminController } from './promotions/promotion-admin.controller';
import { SiteConfigAdminController } from './site-config/site-config.controller';
import { AssetsController } from './assets/assets.controller';

const LIMIT = 'THROTTLER:LIMITdefault';
const TTL = 'THROTTLER:TTLdefault';
const SKIP = 'THROTTLER:SKIPdefault';

type Handler = (...args: never[]) => unknown;

function limitOf(handler: Handler) {
  return { limit: Reflect.getMetadata(LIMIT, handler), ttl: Reflect.getMetadata(TTL, handler) };
}

describe('Rate limiting', () => {
  it('registers ThrottlerGuard globally so every route is rate limited by default', () => {
    const providers = Reflect.getMetadata('providers', AppModule) as unknown[];
    expect(providers).toContainEqual({ provide: APP_GUARD, useClass: ThrottlerGuard });
  });

  it('uses a 120 requests/minute default that tolerates normal catalogue browsing', () => {
    const imports = Reflect.getMetadata('imports', AppModule) as Array<{ module?: unknown; providers?: Array<{ provide?: unknown; useValue?: unknown }> }>;
    const throttlerImport = imports.find((entry) => entry?.module === ThrottlerModule);
    const options = throttlerImport?.providers?.find((provider) => provider.provide === 'THROTTLER:MODULE_OPTIONS')?.useValue;
    expect(options).toEqual([{ ttl: 60_000, limit: 120 }]);
  });

  it('limits admin login attempts to 5 per minute', () => {
    expect(limitOf(AuthController.prototype.login)).toEqual({ limit: 5, ttl: 60_000 });
  });

  it.each([
    ['demo request creation', DemoPublicController.prototype.create, 5],
    ['custom photobook request creation', PhotobookPublicController.prototype.createCustomRequest, 10],
    ['photobook project creation', PhotobookPublicController.prototype.createProject, 10],
    ['photobook draft creation', PhotobookPublicController.prototype.createDraft, 10],
    ['checkout submit', CheckoutPublicController.prototype.submit, 10],
    ['checkout promo-code preview', CheckoutPublicController.prototype.previewPromo, 10],
    ['template photobook promo-code preview', PhotobookPublicController.prototype.previewTemplatePromo, 10],
    ['custom photobook promo-code preview', PhotobookPublicController.prototype.previewCustomEditorPromo, 10],
    ['payment voucher upload', PaymentsPublicController.prototype.uploadVoucher, 10],
  ] as const)('limits %s to %i per minute', (_label, handler, limit) => {
    expect(limitOf(handler)).toEqual({ limit, ttl: 60_000 });
  });

  it.each([
    ['demo proposal generation', DemoAdminController.prototype.generateProposal],
    ['custom photobook cover generation', PhotobookAdminController.prototype.generateCustomCoverProposal],
    ['order print asset generation', OrdersAdminController.prototype.generatePrintAsset],
    ['order cover generation', OrdersAdminController.prototype.generateCover],
    ['order back cover generation', OrdersAdminController.prototype.generateBackCover],
  ] as const)('caps paid AI %s at 20 per minute even inside throttle-exempt admin controllers', (_label, handler) => {
    expect(limitOf(handler)).toEqual({ limit: 20, ttl: 60_000 });
    expect(Reflect.getMetadata(SKIP, handler)).toBe(false);
  });

  it.each([
    OrdersAdminController,
    DemoAdminController,
    FeedbackAdminController,
    PromotionAdminController,
    SiteConfigAdminController,
    PhotobookAdminController,
  ])('exempts authenticated %p from the per-IP default (requests arrive pooled from the Next BFF)', (controller) => {
    expect(Reflect.getMetadata(SKIP, controller)).toBe(true);
  });

  it('exempts the authenticated asset URL lookup, which admin pages call once per photo', () => {
    expect(Reflect.getMetadata(SKIP, AssetsController.prototype.getUrl)).toBe(true);
  });

  it.each([
    ['AssetsController.upload', AssetsController.prototype.upload],
    ['AssetsController.uploadPublic', AssetsController.prototype.uploadPublic],
    ['PhotobookPublicController.redeemCustomEditorCode', PhotobookPublicController.prototype.redeemCustomEditorCode],
    ['CheckoutPublicController.previewPromo', CheckoutPublicController.prototype.previewPromo],
  ] as const)('%s does not add a second ThrottlerGuard that would double count requests', (_label, handler) => {
    const guards = (Reflect.getMetadata(GUARDS_METADATA, handler) ?? []) as unknown[];
    expect(guards).not.toContain(ThrottlerGuard);
  });
});
