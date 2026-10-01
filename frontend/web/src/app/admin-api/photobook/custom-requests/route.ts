import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('pa_admin_token')?.value;
  if (!token) return NextResponse.json({ message: 'No autenticado' }, { status: 401 });

  const apiUrl = process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://api:3001';
  const response = await fetch(`${apiUrl}/api/admin/photobook/custom-requests`, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}
