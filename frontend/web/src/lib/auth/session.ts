// TODO: Gestión sesión JWT (cookie httpOnly)
// frontend/web/src/lib/auth/session.ts

// frontend/web/src/lib/auth/session.ts
import 'server-only';
import { cookies } from 'next/headers';

const TOKEN_KEY = 'pa_admin_token';

export async function setToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_KEY, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
}

export async function clearToken() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_KEY);
}

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_KEY)?.value ?? null;
}