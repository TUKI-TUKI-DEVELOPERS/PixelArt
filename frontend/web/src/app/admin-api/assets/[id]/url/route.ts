import { NextRequest, NextResponse } from 'next/server';
import { proxyAdminApiRequest } from '@/lib/server/admin-proxy';

type RouteContext = { params: Promise<{ id: string }> };

/** Admin-only asset URL lookup (Nest GET /api/assets/:id/url requires ADMIN/OPERATOR). */
export async function GET(request: NextRequest, { params }: RouteContext): Promise<Response> {
  const { id } = await params;
  if (!/^\d+$/.test(id)) return NextResponse.json({ message: 'Archivo inválido' }, { status: 400 });
  return proxyAdminApiRequest(request, { prefix: '/api/assets', segments: [id, 'url'] });
}
