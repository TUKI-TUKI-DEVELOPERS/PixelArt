import { NextRequest, NextResponse } from "next/server";

type RouteContext = { params: Promise<{ id: string; assetId: string }> };

export async function POST(request: NextRequest, { params }: RouteContext) {
  const token = request.cookies.get("pa_admin_token")?.value;
  if (!token) return NextResponse.json({ message: "No autenticado" }, { status: 401 });

  const { id, assetId } = await params;
  if (!/^\d+$/.test(id) || !/^\d+$/.test(assetId)) {
    return NextResponse.json({ message: "Referencia inválida" }, { status: 400 });
  }

  const body = await request.json().catch(() => ({}));
  if (body?.surface !== "FRONT_COVER" && body?.surface !== "BACK_COVER") {
    return NextResponse.json({ message: "Selecciona tapa frontal o contratapa para el diseño propio" }, { status: 400 });
  }

  const apiUrl = process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://api:3001";
  const response = await fetch(`${apiUrl}/api/admin/photobook/custom-requests/${id}/references/${assetId}/use-as-cover`, {
    method: "POST",
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ surface: body.surface }),
  });
  return NextResponse.json(await response.json().catch(() => ({})), { status: response.status });
}
