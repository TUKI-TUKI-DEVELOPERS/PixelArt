import { NextRequest, NextResponse } from "next/server";

type RouteContext = { params: Promise<{ id: string; assetId: string }> };

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const token = request.cookies.get("pa_admin_token")?.value;
  if (!token) return NextResponse.json({ message: "No autenticado" }, { status: 401 });

  const { id, assetId } = await params;
  if (!/^\d+$/.test(id) || !/^\d+$/.test(assetId)) {
    return NextResponse.json({ message: "Referencia inválida" }, { status: 400 });
  }
  const body = await request.json().catch(() => ({}));
  if (typeof body.isActive !== "boolean") {
    return NextResponse.json({ message: "isActive debe ser booleano" }, { status: 400 });
  }

  const apiUrl = process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://api:3001";
  const response = await fetch(`${apiUrl}/api/admin/photobook/custom-requests/${id}/references/${assetId}/active`, {
    method: "PATCH",
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ isActive: body.isActive }),
  });
  return NextResponse.json(await response.json().catch(() => ({})), { status: response.status });
}
