/**
 * Which storage objects browsers may fetch anonymously.
 *
 * The bucket is only reachable through the web app: `/assets/*` (public, gated
 * by frontend/web/src/lib/assets/public-asset-policy.ts, which MUST mirror the
 * list below) and `/admin-api/storage/*` (ADMIN/OPERATOR via the admin BFF).
 * Anything not listed here is admin-only — deny by default.
 *
 * Public prefixes:
 * - Home/, IA_Books/, Photobooks/, QRPago/, logo/, themes/: site and catalog
 *   content (covers, template previews, theme art) rendered by public pages.
 * - uploads/customers/, uploads/photobooks/: customer photos. Keys are SHA-256
 *   content hashes (unguessable) and the public wizards/editor display them.
 * - uploads/proposals/, generated/proposals/: watermarked proposal previews
 *   shown on /demo/[token], checkout and the proposals email.
 * - photobooks/custom-requests/: cover designs shown to the customer on the
 *   cover-approval and editor token pages. Keys end in a random UUID.
 *
 * Admin-only (known): uploads/vouchers/ (payment proofs),
 * generated/originals/ (unwatermarked AI images), custom-books/ (print assets
 * and print PDFs), photobook-renders/ (print PDFs).
 */
export const PUBLIC_STORAGE_PREFIXES: readonly string[] = [
  'Home/',
  'IA_Books/',
  'Photobooks/',
  'QRPago/',
  'logo/',
  'themes/',
  'uploads/customers/',
  'uploads/photobooks/',
  'uploads/proposals/',
  'generated/proposals/',
  'photobooks/custom-requests/',
];

export const PUBLIC_STORAGE_URL_PREFIX = '/assets/';
export const ADMIN_STORAGE_URL_PREFIX = '/admin-api/storage/';

const MAX_STORAGE_KEY_LENGTH = 1024;
// eslint-disable-next-line no-control-regex
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/;

/** Relative object key without traversal, empty segments or control characters. */
export function isSafeStorageKey(key: string): boolean {
  if (typeof key !== 'string' || key.length === 0 || key.length > MAX_STORAGE_KEY_LENGTH) return false;
  if (key.includes('\\') || CONTROL_CHARACTERS.test(key)) return false;
  return key.split('/').every((segment) => segment !== '' && segment !== '.' && segment !== '..');
}

export function isPublicStorageKey(key: string): boolean {
  return isSafeStorageKey(key) && PUBLIC_STORAGE_PREFIXES.some((prefix) => key.startsWith(prefix));
}

/**
 * Browser-facing, same-origin URL for a storage key: `/assets/...` for public
 * keys, `/admin-api/storage/...` (authenticated) for everything else.
 * Keys are normalized to NFD (macOS-uploaded files) and encoded per segment.
 */
export function buildStorageObjectUrl(key: string): string {
  const encodedKey = key
    .normalize('NFD')
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  return `${isPublicStorageKey(key) ? PUBLIC_STORAGE_URL_PREFIX : ADMIN_STORAGE_URL_PREFIX}${encodedKey}`;
}
