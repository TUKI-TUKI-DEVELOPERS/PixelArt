import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getAssetUrl, toRelativeAssetUrl } from './assetUrl';

describe('getAssetUrl', () => {
  it('prefixes a storage key with /assets/', () => {
    expect(getAssetUrl('uploads/customers/photo.jpg')).toBe('/assets/uploads/customers/photo.jpg');
  });

  it('handles a bare filename', () => {
    expect(getAssetUrl('cover.png')).toBe('/assets/cover.png');
  });

  it('returns just the prefix for an empty key (current behavior, no validation)', () => {
    expect(getAssetUrl('')).toBe('/assets/');
  });
});

describe('toRelativeAssetUrl', () => {
  beforeEach(() => {
    // Force the documented defaults regardless of the shell environment.
    vi.stubEnv('NEXT_PUBLIC_MINIO_URL', undefined);
    vi.stubEnv('NEXT_PUBLIC_MINIO_BUCKET', undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('rewrites a default-MinIO absolute URL to a relative /assets/ path', () => {
    expect(
      toRelativeAssetUrl('http://localhost:9000/pixelart-assets/uploads/covers/a.png'),
    ).toBe('/assets/uploads/covers/a.png');
  });

  it('keeps nested storage keys intact when rewriting', () => {
    expect(
      toRelativeAssetUrl('http://localhost:9000/pixelart-assets/photobooks/12/page-01.jpg'),
    ).toBe('/assets/photobooks/12/page-01.jpg');
  });

  it('returns a non-MinIO absolute URL unchanged', () => {
    expect(toRelativeAssetUrl('https://cdn.example.com/pixelart-assets/x.png')).toBe(
      'https://cdn.example.com/pixelart-assets/x.png',
    );
  });

  it('returns an already-relative URL unchanged', () => {
    expect(toRelativeAssetUrl('/assets/uploads/a.png')).toBe('/assets/uploads/a.png');
  });

  it('does not rewrite when the bucket segment differs from the configured bucket', () => {
    expect(toRelativeAssetUrl('http://localhost:9000/other-bucket/a.png')).toBe(
      'http://localhost:9000/other-bucket/a.png',
    );
  });

  it('uses NEXT_PUBLIC_MINIO_URL and NEXT_PUBLIC_MINIO_BUCKET when set', () => {
    vi.stubEnv('NEXT_PUBLIC_MINIO_URL', 'https://minio.pixelart.pe');
    vi.stubEnv('NEXT_PUBLIC_MINIO_BUCKET', 'prod-assets');
    expect(toRelativeAssetUrl('https://minio.pixelart.pe/prod-assets/uploads/a.png')).toBe(
      '/assets/uploads/a.png',
    );
  });

  it('no longer matches the localhost default once a custom MinIO URL is configured', () => {
    vi.stubEnv('NEXT_PUBLIC_MINIO_URL', 'https://minio.pixelart.pe');
    expect(toRelativeAssetUrl('http://localhost:9000/pixelart-assets/a.png')).toBe(
      'http://localhost:9000/pixelart-assets/a.png',
    );
  });
});
