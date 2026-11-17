import { describe, expect, it } from 'vitest';
import { getSafeAdminRedirect } from './safe-admin-redirect';

describe('getSafeAdminRedirect', () => {
  it.each([
    ['/admin', '/admin'],
    ['/admin/ordenes/42', '/admin/ordenes/42'],
    ['/admin/libros-personalizados/solicitudes?estado=NEW#top', '/admin/libros-personalizados/solicitudes?estado=NEW#top'],
    ['/admin?tab=1', '/admin?tab=1'],
  ])('keeps the same-origin admin path %s', (next, expected) => {
    expect(getSafeAdminRedirect(next)).toBe(expected);
  });

  it.each([
    null,
    '',
    'https://evil.example/admin',
    '//evil.example/admin',
    '/\\evil.example',
    '/admin\\..\\evil',
    'javascript:alert(1)',
    '/administrator',
    '/admin-api/orders',
    '/catalogo',
    'admin/ordenes',
    '/admin/\nordenes',
    ' /admin',
  ])('falls back to /admin for %p', (next) => {
    expect(getSafeAdminRedirect(next)).toBe('/admin');
  });
});
