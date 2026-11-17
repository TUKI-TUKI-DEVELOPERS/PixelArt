import { buildStorageObjectUrl, isPublicStorageKey, isSafeStorageKey } from './storage-access.policy';

describe('storage access policy', () => {
  describe('isPublicStorageKey', () => {
    it.each([
      'Home/Home-hero/hero.png',
      'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/1.png',
      'Photobooks/Portadas/boda.png',
      'QRPago/QR_Pago_Pixelart.png',
      'logo/Navbar/logo.svg',
      'themes/bodas/cover.png',
      'uploads/customers/3f2a.jpg',
      'uploads/customers/thumb_3f2a.webp',
      'uploads/photobooks/9c1d.png',
      'uploads/proposals/12_40.jpg',
      'generated/proposals/12_40.jpg',
      'photobooks/custom-requests/7/designs/front_cover-2b9e.png',
    ])('treats %s as public', (key) => {
      expect(isPublicStorageKey(key)).toBe(true);
    });

    it.each([
      'uploads/vouchers/31.jpg',
      'uploads/vouchers/31-0f9c.jpg',
      'generated/originals/12_40.png',
      'custom-books/print-assets/31/cover.png',
      'custom-books/print-assets/31/cover.png.clean-source',
      'custom-books/renders/31/generation-ab/covers.pdf',
      'photobook-renders/79.pdf',
      'photobook-renders/79/generation-2/interior.pdf',
      'unknown/thing.png',
      'root-level.png',
      'Home',
      'uploads/customers-evil/x.png',
      'uploads/proposalsX/12_40.jpg',
      'home/lowercase-is-a-different-prefix.png',
      'uploads/customers/../vouchers/31.jpg',
    ])('denies public access to %s', (key) => {
      expect(isPublicStorageKey(key)).toBe(false);
    });
  });

  describe('isSafeStorageKey', () => {
    it('accepts a normal nested key', () => {
      expect(isSafeStorageKey('uploads/vouchers/31-0f9c.jpg')).toBe(true);
    });

    it.each([
      '',
      '/uploads/vouchers/31.jpg',
      'uploads//vouchers/31.jpg',
      'uploads/vouchers/',
      'uploads/../secret.png',
      './uploads/vouchers/31.jpg',
      'uploads\\vouchers\\31.jpg',
      'uploads/vouchers/31.jpg\u0000.png',
      `uploads/${'a'.repeat(1100)}.png`,
    ])('rejects %j', (key) => {
      expect(isSafeStorageKey(key)).toBe(false);
    });
  });

  describe('buildStorageObjectUrl', () => {
    it('serves public keys through the same-origin /assets path', () => {
      expect(buildStorageObjectUrl('uploads/proposals/12_40.jpg')).toBe('/assets/uploads/proposals/12_40.jpg');
    });

    it('serves admin-only keys through the authenticated admin BFF', () => {
      expect(buildStorageObjectUrl('uploads/vouchers/31.jpg')).toBe('/admin-api/storage/uploads/vouchers/31.jpg');
      expect(buildStorageObjectUrl('photobook-renders/79.pdf')).toBe('/admin-api/storage/photobook-renders/79.pdf');
    });

    it('denies by default: unknown prefixes go through the admin BFF', () => {
      expect(buildStorageObjectUrl('unknown/thing.png')).toBe('/admin-api/storage/unknown/thing.png');
    });

    it('encodes every segment and normalizes to NFD like the files stored from macOS', () => {
      expect(buildStorageObjectUrl('IA_Books/Mamá mi heroína/1.png')).toBe(
        `/assets/IA_Books/${encodeURIComponent('Mamá mi heroína'.normalize('NFD'))}/1.png`,
      );
    });
  });
});
