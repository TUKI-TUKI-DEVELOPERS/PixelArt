import { NextRequest, NextResponse } from 'next/server';

type RouteContext = { params: Promise<{ id: string; part: string }> };

export async function GET(request: NextRequest, { params }: RouteContext) {
  const token = request.cookies.get('pa_admin_token')?.value;
  if (!token) return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  const { id, part } = await params;
  if (!/^\d+$/.test(id) || !['covers', 'interior'].includes(part)) {
    return NextResponse.json({ message: 'Documento inválido' }, { status: 400 });
  }
  const apiUrl = process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://api:3001';
  const upstream = await fetch(`${apiUrl}/api/admin/photobook/projects/${id}/print-cmyk/${part}`, {
    cache: 'no-store', headers: { Authorization: `Bearer ${token}` },
  });
  const headers = new Headers();
  for (const name of ['content-type', 'content-disposition']) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }
  return new Response(upstream.body, { status: upstream.status, headers });
}
