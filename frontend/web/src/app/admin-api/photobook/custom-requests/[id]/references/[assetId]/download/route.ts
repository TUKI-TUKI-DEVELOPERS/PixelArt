import { NextRequest, NextResponse } from 'next/server';

type RouteContext = { params: Promise<{ id: string; assetId: string }> };

export async function GET(request: NextRequest, { params }: RouteContext) {
  const token = request.cookies.get('pa_admin_token')?.value;
  if (!token) return NextResponse.json({ message: 'No autenticado' }, { status: 401 });

  const { id, assetId } = await params;
  if (!/^\d+$/.test(id) || !/^\d+$/.test(assetId)) {
    return NextResponse.json({ message: 'Referencia inválida' }, { status: 400 });
  }

  const apiUrl = process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://api:3001';
  const response = await fetch(`${apiUrl}/api/admin/photobook/custom-requests/${id}/references/${assetId}/download`, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  }

  return new NextResponse(await response.arrayBuffer(), {
    status: response.status,
    headers: {
      'Content-Type': response.headers.get('content-type') ?? 'application/octet-stream',
      'Content-Disposition': response.headers.get('content-disposition') ?? `attachment; filename="referencia-${assetId}.jpg"`,
    },
  });
}
