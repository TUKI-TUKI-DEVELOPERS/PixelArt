import { NextRequest, NextResponse } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

function apiUrl() {
  return process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://api:3001";
}

async function getToken(request: NextRequest) {
  return request.cookies.get("pa_admin_token")?.value;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const token = await getToken(request);
  if (!token) return NextResponse.json({ message: "No autenticado" }, { status: 401 });
  const { id } = await params;
  if (!/^\d+$/.test(id)) return NextResponse.json({ message: "Solicitud inválida" }, { status: 400 });

  const response = await fetch(`${apiUrl()}/api/admin/photobook/custom-requests/${id}/references`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });
  return NextResponse.json(await response.json().catch(() => ({})), { status: response.status });
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const token = await getToken(request);
  if (!token) return NextResponse.json({ message: "No autenticado" }, { status: 401 });
  const { id } = await params;
  if (!/^\d+$/.test(id)) return NextResponse.json({ message: "Solicitud inválida" }, { status: 400 });

  const response = await fetch(`${apiUrl()}/api/admin/photobook/custom-requests/${id}/references`, {
    method: "POST",
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
    body: await request.formData(),
  });
  return NextResponse.json(await response.json().catch(() => ({})), { status: response.status });
}
