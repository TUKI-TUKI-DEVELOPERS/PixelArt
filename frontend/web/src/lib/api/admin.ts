// TODO: API wrapper admin endpoints
// frontend/web/src/lib/api/admin.ts
import { apiFetch } from './client';

export async function adminLogin(email: string, password: string) {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message ?? 'Login failed');
  }

  return res.json();
}
