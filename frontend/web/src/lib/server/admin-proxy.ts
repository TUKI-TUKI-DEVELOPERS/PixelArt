import { NextRequest, NextResponse } from 'next/server';

/**
 * Same-origin BFF for admin pages. The admin JWT lives in an httpOnly cookie
 * the browser cannot read, so admin requests go to /admin-api/* and this
 * server-side helper forwards them to Nest with `Authorization: Bearer`.
 * The Nest JWT strategy only reads the Bearer header, never the cookie.
 */
export const ADMIN_TOKEN_COOKIE = 'pa_admin_token';

const FORWARDED_REQUEST_HEADERS = ['content-type', 'accept', 'x-forwarded-for'];
// Never copy content-encoding/content-length: fetch already decoded the body.
// CSP/nosniff keep private storage objects (/admin-api/storage/*) sandboxed.
const FORWARDED_RESPONSE_HEADERS = [
  'content-type',
  'content-disposition',
  'cache-control',
  'content-security-policy',
  'x-content-type-options',
];

export function getApiBaseUrl(): string {
  return process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://api:3001';
}

function isSafeSegment(segment: unknown): segment is string {
  return (
    typeof segment === 'string' &&
    segment !== '' &&
    segment !== '.' &&
    segment !== '..' &&
    !segment.includes('/') &&
    !segment.includes('\\')
  );
}

export type AdminProxyTarget = {
  /** Fixed upstream prefix, e.g. "/api/admin". Never derived from the request. */
  prefix: string;
  /** Decoded path segments appended after the prefix (validated and re-encoded). */
  segments: readonly unknown[];
};

export async function proxyAdminApiRequest(request: NextRequest, { prefix, segments }: AdminProxyTarget): Promise<Response> {
  const token = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
  if (!token) return NextResponse.json({ message: 'No autenticado' }, { status: 401 });

  if (!Array.isArray(segments) || !segments.every(isSafeSegment)) {
    return NextResponse.json({ message: 'Ruta inválida' }, { status: 400 });
  }

  const hasBody = request.method !== 'GET' && request.method !== 'HEAD';
  // SameSite=Lax already keeps the cookie off cross-site POSTs; this also
  // refuses any state-changing request a modern browser labels cross-site.
  if (hasBody && request.headers.get('sec-fetch-site') === 'cross-site') {
    return NextResponse.json({ message: 'Origen no permitido' }, { status: 403 });
  }

  const path = segments.map((segment) => encodeURIComponent(segment)).join('/');
  const upstreamUrl = new URL(`${prefix}${path ? `/${path}` : ''}${request.nextUrl.search}`, getApiBaseUrl());

  const headers = new Headers({ Authorization: `Bearer ${token}` });
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }

  const init: RequestInit & { duplex?: 'half' } = { method: request.method, headers, cache: 'no-store' };
  if (hasBody && request.body) {
    init.body = request.body;
    init.duplex = 'half';
  }

  let upstream: Response;
  try {
    upstream = await fetch(upstreamUrl, init);
  } catch {
    return NextResponse.json({ message: 'El servicio no está disponible. Intenta de nuevo en unos segundos.' }, { status: 502 });
  }

  const responseHeaders = new Headers();
  for (const name of FORWARDED_RESPONSE_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: responseHeaders });
}
