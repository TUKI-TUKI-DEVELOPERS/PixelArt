import type { NextRequest } from 'next/server';

const TOKEN_KEY = 'pa_admin_token';

export function getTokenFromRequest(req: NextRequest): string | null {
  return req.cookies.get(TOKEN_KEY)?.value ?? null;
}