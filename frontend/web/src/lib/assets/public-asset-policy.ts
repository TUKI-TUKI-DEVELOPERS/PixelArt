/**
 * Public allowlist for /assets/* — the ONLY anonymous path to the storage
 * bucket (MinIO is internal in prod). Anything not listed is denied (404).
 * Private objects reach admins through /admin-api/storage/* instead.
 *
 * MUST mirror PUBLIC_STORAGE_PREFIXES in
 * backend/api/src/assets/domain/policies/storage-access.policy.ts, which
 * decides which URL the API hands out for each key.
 *
 * Public:
 * - Home/, IA_Books/, Photobooks/, QRPago/, logo/, themes/: site and catalog
 *   content (covers, template previews, theme art).
 * - uploads/customers/, uploads/photobooks/: customer photos under SHA-256
 *   content-hash keys (unguessable); public wizards/editor display them.
 * - uploads/proposals/, generated/proposals/: watermarked proposal previews
 *   for /demo/[token], checkout and the proposals email.
 * - photobooks/custom-requests/: cover designs (random UUID keys) shown on
 *   the customer's cover-approval and editor token pages.
 * Admin-only (never public): uploads/vouchers/, generated/originals/,
 * custom-books/ (print assets, print PDFs), photobook-renders/.
 */
export const PUBLIC_ASSET_PREFIXES: readonly string[] = [
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

const ASSETS_PATH_PREFIX = '/assets/';
// eslint-disable-next-line no-control-regex
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/;

function decodeSegment(segment: string): string | null {
  let decoded: string;
  try {
    decoded = decodeURIComponent(segment);
  } catch {
    return null;
  }
  if (decoded === '' || decoded === '.' || decoded === '..') return null;
  if (decoded.includes('/') || decoded.includes('\\') || CONTROL_CHARACTERS.test(decoded)) return null;
  return decoded;
}

/** Decoded storage key for an allowlisted /assets/* pathname, or null (deny). */
export function resolvePublicAssetKey(pathname: string): string | null {
  if (!pathname.startsWith(ASSETS_PATH_PREFIX)) return null;
  const segments = pathname.slice(ASSETS_PATH_PREFIX.length).split('/');
  const decoded: string[] = [];
  for (const segment of segments) {
    const value = decodeSegment(segment);
    if (value === null) return null;
    decoded.push(value);
  }
  const key = decoded.join('/');
  return PUBLIC_ASSET_PREFIXES.some((prefix) => key.startsWith(prefix)) ? key : null;
}

/** S3 request overrides (response-content-type, presigned X-Amz-*) are never forwarded. */
export function hasStorageControlQuery(searchParams: URLSearchParams): boolean {
  for (const name of searchParams.keys()) {
    const lower = name.toLowerCase();
    if (lower.startsWith('response-') || lower.startsWith('x-amz-')) return true;
  }
  return false;
}
