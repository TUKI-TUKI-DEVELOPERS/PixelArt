"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type ProjectDetail = {
  id: number; customerFullName: string | null; customerEmail: string; customerPhone: string | null;
  deliveryAddress: string | null; deliveryDistrict: string | null; coverTitle: string | null;
  customerDni: string | null; customWidthCm: number | null; customHeightCm: number | null;
  photobookThemeId: number; photobookProductId: number; pageCount: number; calculatedTotalCents: number;
  pricePerPageCents: number; status: string; orderId: number | null; hasPaymentProof: boolean;
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
  const [assetUrls, setAssetUrls] = useState<Record<number, string>>({});
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setLightbox(null); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    fetch(`${API}/api/admin/photobook/projects/${id}`)
      .then((r) => r.json())
      .then((detail: ProjectDetail) => {
        setData(detail);
        // Resolver URLs de todos los assets en paralelo
        Promise.all(
          detail.assetIds.map((assetId) =>
            fetch(`${API}/api/assets/${assetId}/url`)
              .then((r) => r.json())
              .then((d) => ({ assetId, url: d.url as string }))
              .catch(() => ({ assetId, url: "" }))
          )
        ).then((results) => {
          const map: Record<number, string> = {};
          results.forEach(({ assetId, url }) => { if (url) map[assetId] = url; });
          setAssetUrls(map);
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
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

  const STATUS_MAP_PB: Record<string, { bg: string; text: string; label: string }> = {
    DRAFT:              { bg: "#f3f4f6", text: "#6b7280", label: "Borrador"     },
    CONFIRMED:          { bg: "#dbeafe", text: "#1e40af", label: "Confirmado"   },
    CONVERTED_TO_ORDER: { bg: "#d1fae5", text: "#065f46", label: "Orden Creada" },
  };
  const st = STATUS_MAP_PB[data.status] ?? { bg: "#f3f4f6", text: "#374151", label: data.status };

  return (
    <div style={{ padding: "32px", maxWidth: "1100px" }}>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", cursor: "zoom-out" }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{ position: "absolute", top: "20px", right: "20px", width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <img
            src={lightbox}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "100%", maxHeight: "90vh", borderRadius: "10px", objectFit: "contain", boxShadow: "0 25px 60px rgba(0,0,0,0.5)", cursor: "default" }}
          />
        </div>
      )}

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 500 }}>Proyecto #{data.id}</span>
            <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: "6px", background: st.bg, color: st.text, fontSize: "11px", fontWeight: 700 }}>{st.label}</span>
            {data.orderId && (
              <Link href={`/admin/ordenes/${data.orderId}`}
                style={{ fontSize: "12px", fontWeight: 600, color: "#8b5cf6", textDecoration: "none", background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: "6px", padding: "2px 10px" }}>
                Orden #{data.orderId} →
              </Link>
            )}
          </div>
          <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 800, color: "#111" }}>{data.customerFullName ?? data.customerEmail}</h1>
        </div>
        {/* Resumen de precio */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "12px 20px", textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: "22px", fontWeight: 800, color: "#111" }}>S/ {(data.calculatedTotalCents / 100).toFixed(2)}</div>
          <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{data.pageCount} pág · S/ {(data.pricePerPageCents / 100).toFixed(2)} c/u</div>
        </div>
      </div>

      {/* ── Info strip ── */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "24px", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>Datos del cliente</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
          {[
            { label: "Email",          value: data.customerEmail },
            { label: "Teléfono",       value: data.customerPhone ?? "—" },
            { label: "DNI",            value: data.customerDni ?? "—" },
            { label: "Dirección",      value: [data.deliveryAddress, data.deliveryDistrict].filter(Boolean).join(", ") || "—" },
            { label: "Dimensiones",    value: data.customWidthCm && data.customHeightCm ? `${data.customWidthCm} × ${data.customHeightCm} cm` : "Estándar" },
          ].map((field, i, arr) => (
            <div key={field.label} style={{ padding: "14px 20px", borderRight: i < arr.length - 1 ? "1px solid #f3f4f6" : "none" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "5px" }}>{field.label}</div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={field.value}>{field.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Título de portada ── */}
      {data.coverTitle && (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "16px 20px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "3px" }}>Título de portada</div>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>{data.coverTitle}</div>
          </div>
        </div>
      )}

      {/* ── Páginas con fotos ── */}
      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "20px 24px", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>Contenido del photobook</span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280", background: "#f3f4f6", borderRadius: "999px", padding: "1px 8px" }}>{data.pages.length} páginas</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {data.pages.map((p) => {
            // Construir lista de URLs en orden de slotIndex
            const sorted = [...p.slots].sort((a, b) => a.slotIndex - b.slotIndex);
            const urls = sorted.map((s) => assetUrls[s.assetId] ?? null);
            const layout = p.layoutKey;

            function Slot({ url }: { url: string | null }) {
              return url
                ? <img src={url} alt="" onClick={(e) => { e.stopPropagation(); setLightbox(url); }} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", cursor: "zoom-in" }} />
                : <div style={{ width: "100%", height: "100%", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  </div>;
            }

            return (
              <div key={p.id} style={{ borderRadius: "10px", border: "1px solid #e5e7eb", overflow: "hidden", background: "#f9fafb" }}>
                {/* Miniatura de la página */}
                <div style={{ aspectRatio: "3/4", background: "#f3f4f6", overflow: "hidden" }}>
                  {layout === "FULL_1" ? (
                    <div style={{ width: "100%", height: "100%", padding: "6px" }}>
                      <div style={{ width: "100%", height: "100%", borderRadius: "4px", overflow: "hidden" }}><Slot url={urls[0] ?? null} /></div>
                    </div>
                  ) : layout === "GRID_2" ? (
                    <div style={{ width: "100%", height: "100%", padding: "6px", display: "flex", flexDirection: "column", gap: "4px" }}>
                      {[0, 1].map((i) => <div key={i} style={{ flex: 1, borderRadius: "3px", overflow: "hidden" }}><Slot url={urls[i] ?? null} /></div>)}
                    </div>
                  ) : layout === "GRID_3" ? (
                    <div style={{ width: "100%", height: "100%", padding: "6px", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "4px" }}>
                      <div style={{ gridColumn: "1 / -1", borderRadius: "3px", overflow: "hidden" }}><Slot url={urls[0] ?? null} /></div>
                      {[1, 2].map((i) => <div key={i} style={{ borderRadius: "3px", overflow: "hidden" }}><Slot url={urls[i] ?? null} /></div>)}
                    </div>
                  ) : (
                    <div style={{ width: "100%", height: "100%", padding: "6px", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "4px" }}>
                      {[0, 1, 2, 3].map((i) => <div key={i} style={{ borderRadius: "3px", overflow: "hidden" }}><Slot url={urls[i] ?? null} /></div>)}
                    </div>
                  )}
                </div>
                {/* Footer de la página */}
                <div style={{ padding: "8px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#374151" }}>Pág. {p.pageNumber}</span>
                  <span style={{ fontSize: "11px", color: "#9ca3af" }}>{p.slots.length} foto{p.slots.length !== 1 ? "s" : ""}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CTA: Crear orden ── */}
      {data.status === "CONFIRMED" && !paymentLink && (
        <div style={{ borderRadius: "14px", background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", border: "1px solid #bfdbfe", padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
          <div>
            <div style={{ fontSize: "15px", fontWeight: 800, color: "#1e40af", marginBottom: "4px" }}>Listo para procesar</div>
            <div style={{ fontSize: "13px", color: "#6b7280", maxWidth: "480px" }}>
              El cliente confirmó su diseño. Crea la orden y genera el link de pago para que pueda abonar.
            </div>
          </div>
          <button
            disabled={creating}
            onClick={createOrder}
            style={{ flexShrink: 0, padding: "14px 28px", borderRadius: "10px", border: "none", background: creating ? "#93c5fd" : "#2563eb", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: creating ? "wait" : "pointer", fontFamily: "inherit", whiteSpace: "nowrap", boxShadow: "0 4px 14px rgba(37,99,235,0.3)" }}
          >
            {creating ? "Creando..." : "Crear orden + link de pago"}
          </button>
        </div>
      )}

      {/* ── Pago completado ── */}
      {data.hasPaymentProof && (
        <div style={{ borderRadius: "14px", background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", border: "1px solid #bbf7d0", padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "14px", fontWeight: 800, color: "#15803d" }}>Pago recibido — link inhabilitado</div>
            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "3px" }}>El cliente subió su comprobante. El link de pago fue revocado automáticamente.</div>
          </div>
          {data.orderId && (
            <a href={`/admin/ordenes/${data.orderId}`}
              style={{ flexShrink: 0, padding: "8px 16px", borderRadius: "8px", border: "1px solid #22c55e", background: "#fff", color: "#065f46", fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>
              Ver orden →
            </a>
          )}
        </div>
      )}

      {/* ── Link generado (sin pago aún) ── */}
      {!data.hasPaymentProof && (paymentLink || data.status === "CONVERTED_TO_ORDER") && (
        <div style={{ borderRadius: "14px", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#065f46", marginBottom: "4px" }}>Orden creada — esperando pago</div>
            {paymentLink && (
              <code style={{ fontSize: "12px", background: "#dcfce7", color: "#065f46", padding: "2px 8px", borderRadius: "5px", wordBreak: "break-all" }}>{paymentLink}</code>
            )}
          </div>
          {paymentLink && (
            <button onClick={() => navigator.clipboard.writeText(paymentLink)}
              style={{ flexShrink: 0, padding: "8px 16px", borderRadius: "8px", border: "1px solid #22c55e", background: "#fff", color: "#065f46", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Copiar link
            </button>
          )}
        </div>
      )}
    </div>
  );
}
