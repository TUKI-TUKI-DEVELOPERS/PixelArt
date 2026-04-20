"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type ProjectDetail = {
  id: number; customerFullName: string | null; customerEmail: string; customerPhone: string | null;
  deliveryAddress: string | null; deliveryDistrict: string | null; coverTitle: string | null;
  customerDni: string | null; customWidthCm: number | null; customHeightCm: number | null;
  photobookThemeId: number; photobookProductId: number; pageCount: number; calculatedTotalCents: number;
  pricePerPageCents: number; status: string;
  pages: { id: number; pageNumber: number; layoutKey: string; slots: { slotIndex: number; assetId: number }[] }[];
  assetIds: number[];
};

export default function ProyectoDetallePage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API}/api/admin/photobook/projects/${id}`).then((r) => r.json()).then(setData).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  async function createOrder() {
    setCreating(true);
    try {
      const res = await fetch(`${API}/api/admin/photobook/projects/${id}/create-order`, { method: "POST" });
      if (!res.ok) throw new Error("Error");
      const result = await res.json();
      setPaymentLink(result.paymentLink.url);
    } catch { alert("Error al crear orden"); }
    finally { setCreating(false); }
  }

  if (loading) return <div style={{ padding: "32px", color: "#999" }}>Cargando...</div>;
  if (!data) return <div style={{ padding: "32px", color: "#999" }}>Proyecto no encontrado.</div>;

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "13px", color: "#6b7280" }}>Proyecto #{data.id}</div>
        <h1 style={{ margin: "0 0 4px", fontSize: "28px", fontWeight: 800 }}>{data.customerFullName ?? data.customerEmail}</h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>{data.pageCount} páginas — S/ {(data.calculatedTotalCents / 100).toFixed(2)} — {data.status}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
          <h2 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 700 }}>Detalle</h2>
          {[
            { l: "Email", v: data.customerEmail },
            { l: "Teléfono", v: data.customerPhone ?? "—" },
            { l: "Dirección", v: data.deliveryAddress ?? "—" },
            { l: "Distrito", v: data.deliveryDistrict ?? "—" },
            { l: "Título portada", v: data.coverTitle ?? "—" },
            { l: "DNI", v: data.customerDni ?? "—" },
            ...(data.customWidthCm && data.customHeightCm ? [{ l: "Dimensiones", v: `${data.customWidthCm} × ${data.customHeightCm} cm` }] : []),
            { l: "Tema ID", v: String(data.photobookThemeId) },
            { l: "Producto ID", v: String(data.photobookProductId) },
            { l: "Precio/página", v: `S/ ${(data.pricePerPageCents / 100).toFixed(2)}` },
            { l: "Páginas", v: String(data.pageCount) },
            { l: "Total", v: `S/ ${(data.calculatedTotalCents / 100).toFixed(2)}` },
          ].map((r) => (
            <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: "13px" }}>
              <span style={{ color: "#6b7280" }}>{r.l}</span>
              <span style={{ color: "#111", fontWeight: r.l === "Total" ? 700 : 400 }}>{r.v}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
          <h2 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 700 }}>Páginas ({data.pages.length})</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            {data.pages.slice(0, 9).map((p) => (
              <div key={p.id} style={{ padding: "8px", borderRadius: "6px", background: "#f9fafb", border: "1px solid #f3f4f6", fontSize: "11px" }}>
                <div style={{ fontWeight: 600 }}>Pág {p.pageNumber}</div>
                <div style={{ color: "#999" }}>{p.layoutKey} — {p.slots.length} fotos</div>
              </div>
            ))}
          </div>
          {data.pages.length > 9 && <div style={{ fontSize: "12px", color: "#999", marginTop: "8px" }}>+{data.pages.length - 9} páginas más</div>}
        </div>
      </div>

      {/* Actions */}
      {data.status === "CONFIRMED" && !paymentLink && (
        <button disabled={creating} onClick={createOrder} style={{ padding: "12px 24px", borderRadius: "10px", border: "none", background: creating ? "#ccc" : "#3b82f6", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: creating ? "wait" : "pointer", fontFamily: "inherit" }}>
          {creating ? "Creando..." : "Crear Orden + Link de Pago"}
        </button>
      )}

      {paymentLink && (
        <div style={{ marginTop: "16px", padding: "16px", borderRadius: "10px", background: "#ede9fe", border: "1px solid #c4b5fd" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#5b21b6", marginBottom: "6px" }}>Orden creada</div>
          <code style={{ fontSize: "12px", background: "#e5e7eb", padding: "2px 6px", borderRadius: "4px" }}>{paymentLink}</code>
          <button onClick={() => navigator.clipboard.writeText(paymentLink)} style={{ marginLeft: "8px", padding: "4px 10px", borderRadius: "6px", border: "1px solid #8b5cf6", background: "#fff", color: "#5b21b6", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Copiar</button>
        </div>
      )}
    </div>
  );
}
