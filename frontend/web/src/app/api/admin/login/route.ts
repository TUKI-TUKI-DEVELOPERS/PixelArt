import { NextResponse } from 'next/server';

const TOKEN_KEY = 'pa_admin_token';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const apiUrl =
  process.env.API_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://api:3001';

  const r = await fetch(`${apiUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!r.ok) {
    return NextResponse.json({ message: 'Login failed' }, { status: 401 });
  }

  const { accessToken } = await r.json();

  const res = NextResponse.json({ ok: true });

  res.cookies.set({
    name: TOKEN_KEY,
    value: accessToken,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}