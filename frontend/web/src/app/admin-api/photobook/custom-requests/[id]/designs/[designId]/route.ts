import { NextRequest, NextResponse } from 'next/server';

type RouteContext = { params: Promise<{ id: string; designId: string }> };

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const token = request.cookies.get('pa_admin_token')?.value;
  if (!token) return NextResponse.json({ message: 'No autenticado' }, { status: 401 });

  const { id, designId } = await params;
  if (!/^\d+$/.test(id) || !/^\d+$/.test(designId)) {
    return NextResponse.json({ message: 'Propuesta inválida' }, { status: 400 });
  }

  const apiUrl = process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://api:3001';
  const response = await fetch(`${apiUrl}/api/admin/photobook/custom-requests/${id}/designs/${designId}`, {
    method: 'DELETE',
    cache: 'no-store',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}
