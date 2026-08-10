import { NextResponse } from 'next/server';
import { getToken } from '@/lib/auth/session';

/** Proxy server-side hacia POST /api/assets/upload (protegido con JWT en el
 * backend). El token vive en una cookie httpOnly — inaccesible para fetch()
 * desde componentes cliente a propósito (protección XSS) — así que el
 * adjunto del header Authorization tiene que pasar por acá, no por el
 * navegador. Mismo patrón que ya usa app/api/admin/login/route.ts. */
export async function POST(req: Request) {
  const token = await getToken();
  if (!token) {
    return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  }

  const apiUrl =
    process.env.API_INTERNAL_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    'http://api:3001';

  const folder = new URL(req.url).searchParams.get('folder');
  const uploadUrl = `${apiUrl}/api/assets/upload${folder ? `?folder=${encodeURIComponent(folder)}` : ''}`;

  const formData = await req.formData();
  const r = await fetch(uploadUrl, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}
