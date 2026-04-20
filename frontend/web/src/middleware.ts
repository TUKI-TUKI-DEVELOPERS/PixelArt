// TODO: Middleware Next.js - proteger /admin/* con JWT
import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest } from './lib/auth/session.middleware';

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

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
  matcher: ['/admin/:path*'],
};
