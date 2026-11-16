import { NextResponse } from 'next/server';
import { ADMIN_TOKEN_COOKIE, getApiBaseUrl } from '@/lib/server/admin-proxy';
import { adminSessionMaxAgeSeconds } from '@/lib/auth/admin-session-cookie';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const headers = new Headers({ 'Content-Type': 'application/json' });
  // Lets the API rate limit login attempts per client instead of per Next server.
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) headers.set('x-forwarded-for', forwardedFor);

  const r = await fetch(`${getApiBaseUrl()}/api/auth/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
  });

  if (r.status === 429) {
    return NextResponse.json({ message: 'Demasiados intentos. Espera un minuto e inténtalo de nuevo.' }, { status: 429 });
  }
  if (!r.ok) {
    return NextResponse.json({ message: 'Correo o contraseña incorrectos' }, { status: 401 });
  }

  const { accessToken } = await r.json();

  const res = NextResponse.json({ ok: true });

  res.cookies.set({
    name: ADMIN_TOKEN_COOKIE,
    value: accessToken,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: adminSessionMaxAgeSeconds(accessToken),
  });

  return res;
}
