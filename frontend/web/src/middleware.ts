import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest } from './lib/auth/session.middleware';
import { hasStorageControlQuery, resolvePublicAssetKey } from './lib/assets/public-asset-policy';

/**
 * Early deny for /assets/* (served by app/assets/[...path]/route.ts, which
 * re-checks the allowlist and adds CSP sandbox + nosniff). Middleware runs
 * before any rewrite and for next/image's internal fetches, so private keys
 * stay blocked even on a deploy whose next.config.ts still rewrites /assets.
 */
function gatePublicAsset(req: NextRequest): NextResponse {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return new NextResponse(null, { status: 405, headers: { Allow: 'GET, HEAD' } });
  }
  const key = resolvePublicAssetKey(req.nextUrl.pathname);
  if (!key || hasStorageControlQuery(req.nextUrl.searchParams)) {
    return new NextResponse('Not Found', {
      status: 404,
      headers: { 'Cache-Control': 'no-store', 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' },
    });
  }
  return NextResponse.next();
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname === '/assets' || pathname.startsWith('/assets/')) return gatePublicAsset(req);

  // Solo proteger /admin/*
  if (!pathname.startsWith('/admin')) return NextResponse.next();

  // Permitir siempre /admin/login (sin sidebar)
  if (pathname === '/admin/login') {
    const res = NextResponse.next();
    res.headers.set('x-pathname', pathname);
    return res;
  }

  const token = getTokenFromRequest(req);

  // Si no hay token, redirigir a login con ?next=
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    url.searchParams.set('next', pathname + search);
    return NextResponse.redirect(url);
  }

  const res = NextResponse.next();
  res.headers.set('x-pathname', pathname);
  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/assets/:path*'],
};
