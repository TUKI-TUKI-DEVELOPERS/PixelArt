import { describe, expect, it } from 'vitest';
import { hasStorageControlQuery, resolvePublicAssetKey } from './public-asset-policy';

describe('resolvePublicAssetKey', () => {
  it.each([
    ['/assets/Home/Home-hero/hero.png', 'Home/Home-hero/hero.png'],
    ['/assets/IA_Books/Backgrounds/Background_IA_Books_Pet_Book_Page.png', 'IA_Books/Backgrounds/Background_IA_Books_Pet_Book_Page.png'],
    ['/assets/Photobooks/Portadas/boda.png', 'Photobooks/Portadas/boda.png'],
    ['/assets/QRPago/QR_Pago_Pixelart.png', 'QRPago/QR_Pago_Pixelart.png'],
    ['/assets/logo/Navbar/logo.svg', 'logo/Navbar/logo.svg'],
    ['/assets/themes/bodas/cover.png', 'themes/bodas/cover.png'],
    ['/assets/uploads/customers/3f2a.jpg', 'uploads/customers/3f2a.jpg'],
    ['/assets/uploads/photobooks/thumb_9c1d.webp', 'uploads/photobooks/thumb_9c1d.webp'],
    ['/assets/uploads/proposals/12_40.jpg', 'uploads/proposals/12_40.jpg'],
    ['/assets/generated/proposals/12_40.jpg', 'generated/proposals/12_40.jpg'],
    ['/assets/photobooks/custom-requests/7/designs/front_cover-2b9e.png', 'photobooks/custom-requests/7/designs/front_cover-2b9e.png'],
    ['/assets/IA_Books/Mam%C3%A1%20mi%20hero%C3%ADna/1.png', 'IA_Books/Mamá mi heroína/1.png'],
  ])('allows %s', (pathname, key) => {
    expect(resolvePublicAssetKey(pathname)).toBe(key);
  });

  it.each([
    '/assets/uploads/vouchers/31.jpg',
    '/assets/uploads/vouchers/31-0f9c.png',
    '/assets/generated/originals/12_40.png',
    '/assets/custom-books/print-assets/31/cover.png',
    '/assets/custom-books/renders/31/generation-ab/covers.pdf',
    '/assets/photobook-renders/79.pdf',
    '/assets/unknown/thing.png',
    '/assets/root-level.png',
    '/assets/',
    '/assets',
    '/assets/Home',
    '/assets/Home/',
    '/assets/uploads/customers-evil/x.png',
    '/assets/home/lowercase.png',
    // traversal, encoded slashes and malformed encodings
    '/assets/uploads/customers/../vouchers/31.jpg',
    '/assets/uploads/customers/%2e%2e/vouchers/31.jpg',
    '/assets/uploads/customers%2F..%2Fvouchers%2F31.jpg',
    '/assets/Home%2F..%2Fuploads%2Fvouchers%2F31.jpg',
    '/assets/uploads/customers/..%5Cvouchers%5C31.jpg',
    '/assets/uploads//customers/x.png',
    '/assets/uploads/customers/%E0%A4%A.png',
    '/assets/uploads/customers/x%00.png',
    '/other/Home/x.png',
  ])('denies %s', (pathname) => {
    expect(resolvePublicAssetKey(pathname)).toBeNull();
  });
});

describe('hasStorageControlQuery', () => {
  it('allows plain and cache-busting requests', () => {
    expect(hasStorageControlQuery(new URLSearchParams(''))).toBe(false);
    expect(hasStorageControlQuery(new URLSearchParams('v=1712345'))).toBe(false);
  });

  it.each(['response-content-type=text/html', 'Response-Content-Disposition=inline', 'X-Amz-Signature=abc', 'x-amz-credential=a'])(
    'flags S3 request overrides like %s',
    (query) => {
      expect(hasStorageControlQuery(new URLSearchParams(query))).toBe(true);
    },
  );
});
