import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import { GUARDS_METADATA, PATH_METADATA } from '@nestjs/common/constants';
import { ROLES_KEY } from './common/decorators/roles.decorator';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { OrdersAdminController } from './orders/orders.controller';
import { DemoAdminController } from './demo/demo-admin.controller';
import { FeedbackAdminController } from './feedback/feedback-admin.controller';
import { PromotionAdminController } from './promotions/promotion-admin.controller';
import { SiteConfigAdminController, SiteConfigPublicController } from './site-config/site-config.controller';
import { PhotobookAdminController } from './photobook/photobook-admin.controller';
import { AssetsController } from './assets/assets.controller';
import { AdminStorageController } from './assets/admin-storage.controller';

type ControllerClass = { name: string; prototype: any };

const ADMIN_CONTROLLERS: ControllerClass[] = [
  OrdersAdminController,
  DemoAdminController,
  FeedbackAdminController,
  PromotionAdminController,
  SiteConfigAdminController,
  PhotobookAdminController,
  AdminStorageController,
];

function routeHandlerNames(controller: ControllerClass): string[] {
  return Object.getOwnPropertyNames(controller.prototype).filter((name) => {
    if (name === 'constructor') return false;
    const descriptor = Object.getOwnPropertyDescriptor(controller.prototype, name);
    return typeof descriptor?.value === 'function' && Reflect.hasMetadata(PATH_METADATA, descriptor.value);
  });
}

function listControllerSources(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) return listControllerSources(fullPath);
    return entry.endsWith('.controller.ts') ? [fullPath] : [];
  });
}

describe('Admin route authorization', () => {
  it.each(ADMIN_CONTROLLERS.map((controller) => [controller.name, controller] as const))(
    '%s requires JWT authentication before ADMIN/OPERATOR role authorization at class level',
    (_name, controller) => {
      expect(Reflect.getMetadata(GUARDS_METADATA, controller)).toEqual([JwtAuthGuard, RolesGuard]);
      expect(Reflect.getMetadata(ROLES_KEY, controller)).toEqual(['ADMIN', 'OPERATOR']);
    },
  );

  it.each(ADMIN_CONTROLLERS.map((controller) => [controller.name, controller] as const))(
    '%s never weakens the class-level roles on an individual route',
    (_name, controller) => {
      for (const handlerName of routeHandlerNames(controller)) {
        const handler = controller.prototype[handlerName] as object;
        const handlerRoles = Reflect.getMetadata(ROLES_KEY, handler) as string[] | undefined;
        if (handlerRoles !== undefined) expect(handlerRoles).toEqual(['ADMIN', 'OPERATOR']);
        const handlerGuards = (Reflect.getMetadata(GUARDS_METADATA, handler) ?? []) as unknown[];
        // Class-level guards already run for every route; repeating them would re-run passport.
        expect(handlerGuards).not.toContain(JwtAuthGuard);
      }
    },
  );

  it('covers every controller mounted under the admin/ prefix', () => {
    const adminSources = listControllerSources(__dirname).filter((file) =>
      /@Controller\(\s*['"`]admin\//.test(readFileSync(file, 'utf8')),
    );
    const adminClassNames = adminSources.flatMap((file) =>
      [...readFileSync(file, 'utf8').matchAll(/@Controller\(\s*['"`]admin\/[^)]*\)[\s\S]*?export class (\w+)/g)].map((match) => match[1]),
    );
    expect(adminClassNames.sort()).toEqual(ADMIN_CONTROLLERS.map((controller) => controller.name).sort());
  });

  it('keeps the public site-config read route open for the navbar banner', () => {
    expect(Reflect.getMetadata(GUARDS_METADATA, SiteConfigPublicController)).toBeUndefined();
    expect(Reflect.getMetadata(GUARDS_METADATA, SiteConfigPublicController.prototype.get)).toBeUndefined();
  });

  it.each(['getUrl', 'upload'] as const)('AssetsController.%s requires an authenticated ADMIN/OPERATOR', (method) => {
    const handler = AssetsController.prototype[method];
    expect(Reflect.getMetadata(GUARDS_METADATA, handler)).toEqual([JwtAuthGuard, RolesGuard]);
    expect(Reflect.getMetadata(ROLES_KEY, handler)).toEqual(['ADMIN', 'OPERATOR']);
  });

  it('keeps the public customer upload route free of authentication', () => {
    expect(Reflect.getMetadata(GUARDS_METADATA, AssetsController.prototype.uploadPublic)).toBeUndefined();
  });
});
