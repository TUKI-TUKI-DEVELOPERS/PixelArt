import { NextRequest, NextResponse } from 'next/server';
import { resolvePublicAssetKey } from '@/lib/assets/public-asset-policy';

/**
 * /assets/<key> — the only anonymous path to the storage bucket. Serves
 * allowlisted public prefixes only (deny by default, see public-asset-policy);
 * private objects reach admins through /admin-api/storage/*. Every response is
 * CSP-sandboxed + nosniff so an HTML/SVG object can never run script on our
 * origin. middleware.ts applies the same allowlist before routing.
 */
const FORWARDED_REQUEST_HEADERS = ['range', 'if-none-match', 'if-modified-since'];
const FORWARDED_RESPONSE_HEADERS = [
  'content-type',
  'content-length',
  'content-range',
  'accept-ranges',
  'etag',
  'last-modified',
  'cache-control',
];
const PASSTHROUGH_STATUSES = new Set([200, 206, 304]);

function storageBaseUrl(): string {
  // MINIO_INTERNAL_URL: Docker-internal MinIO (http://minio:9000); MinIO is never public in prod.
  const base = process.env.MINIO_INTERNAL_URL ?? process.env.NEXT_PUBLIC_MINIO_URL ?? 'http://minio:9000';
  const bucket = process.env.NEXT_PUBLIC_MINIO_BUCKET ?? 'pixelart-assets';
  return `${base.replace(/\/+$/, '')}/${bucket}`;
}

function notFound(): NextResponse {
  return new NextResponse('Not Found', {
    status: 404,
    headers: { 'Cache-Control': 'no-store', 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' },
  });
}

async function serveAsset(request: NextRequest): Promise<Response> {
  const key = resolvePublicAssetKey(request.nextUrl.pathname);
  if (!key) return notFound();

  const objectUrl = `${storageBaseUrl()}/${key.split('/').map((segment) => encodeURIComponent(segment)).join('/')}`;
  const headers: Record<string, string> = {};
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers[name] = value;
  }

  let upstream: Response;
  try {
    upstream = await fetch(objectUrl, { method: request.method === 'HEAD' ? 'HEAD' : 'GET', headers, cache: 'no-store' });
  } catch {
    return new NextResponse('Bad Gateway', { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }
  if (!PASSTHROUGH_STATUSES.has(upstream.status)) {
    await upstream.body?.cancel();
    return upstream.status === 403 || upstream.status === 404 || upstream.status === 416
      ? notFound()
      : new NextResponse('Bad Gateway', { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }

  const responseHeaders = new Headers({ 'Content-Security-Policy': 'sandbox', 'X-Content-Type-Options': 'nosniff' });
  for (const name of FORWARDED_RESPONSE_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  const body = request.method === 'HEAD' || upstream.status === 304 ? null : upstream.body;
  return new Response(body, { status: upstream.status, headers: responseHeaders });
}

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(request: NextRequest, _context: RouteContext): Promise<Response> {
  return serveAsset(request);
}

export async function HEAD(request: NextRequest, _context: RouteContext): Promise<Response> {
  return serveAsset(request);
}
