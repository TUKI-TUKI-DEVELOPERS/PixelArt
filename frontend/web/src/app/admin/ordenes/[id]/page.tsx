"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type OrderDetail = {
  id: number; channel: string; status: string; customerFullName: string; customerEmail: string; customerPhone: string;
  totalAmountCents: number; baseAmountCents: number; rushFeeCents: number; currency: string; estimatedDeliveryDate: string | null;
  photobookProjectId: number | null;
  statusEvents: { id: number; oldStatus: string | null; newStatus: string; note: string | null; createdAt: string }[];
  paymentProof: { id: number; status: string; paymentMethod: string; amountCents: number; voucherUrl: string } | null;
};

const STATUS_MAP: Record<string, { bg: string; text: string; label: string }> = {
  AWAITING_PAYMENT_PROOF: { bg: "#fef3c7", text: "#92400e", label: "Esperando Pago" },
  UNDER_PAYMENT_REVIEW: { bg: "#dbeafe", text: "#1e40af", label: "Revisando Pago" },
  PAYMENT_VERIFIED: { bg: "#d1fae5", text: "#065f46", label: "Pago Verificado" },
  IN_PRODUCTION: { bg: "#ede9fe", text: "#5b21b6", label: "En Producción" },
  SHIPPED: { bg: "#e0e7ff", text: "#3730a3", label: "Enviado" },
  DELIVERED: { bg: "#d1fae5", text: "#065f46", label: "Entregado" },
};

const NEXT_STATUS: Record<string, string> = {
  PAYMENT_VERIFIED: "IN_PRODUCTION",
  IN_PRODUCTION: "SHIPPED",
  SHIPPED: "DELIVERED",
};

async function forceDownload(url: string, filename: string) {
  const res = await fetch(url); const blob = await res.blob(); const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = blobUrl; a.download = filename; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(blobUrl);
}

export default function OrdenDetallePage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);
  const [feedbackLink, setFeedbackLink] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  const PDF_ELIGIBLE_STATUSES = ["PAYMENT_VERIFIED", "IN_PRODUCTION", "SHIPPED", "DELIVERED"];

  function load() {
    fetch(`${API}/api/admin/orders/${id}`).then((r) => r.json()).then((order: OrderDetail) => {
      setData(order);
      if (order.channel === "PHOTOBOOK" && order.photobookProjectId && PDF_ELIGIBLE_STATUSES.includes(order.status)) {
        loadPdf(order.photobookProjectId);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }

  function loadPdf(projectId: number) {
    setPdfLoading(true);
    fetch(`${API}/api/admin/photobook/projects/${projectId}/render`)
      .then((r) => { if (r.ok) return r.json(); throw new Error("not ready"); })
      .then((r: { pdfUrl: string }) => setPdfUrl(r.pdfUrl))
      .catch(() => setPdfUrl(null))
      .finally(() => setPdfLoading(false));
  }

  useEffect(() => { load(); }, [id]);

  async function reviewPayment(action: "APPROVE" | "REJECT") {
    setActing(true);
    try {
      const res = await fetch(`${API}/api/admin/orders/${id}/review-payment`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, rejectionReason: action === "REJECT" ? "Voucher no válido" : undefined }),
      });
      if (!res.ok) throw new Error("Error");
      load();
    } catch { alert("Error al revisar pago"); }
    finally { setActing(false); }
  }

  async function advanceStatus() {
    if (!data) return;
    const next = NEXT_STATUS[data.status];
    if (!next) return;
    setActing(true);
    try {
      const res = await fetch(`${API}/api/admin/orders/${id}/advance-status`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newStatus: next }),
      });
      if (!res.ok) throw new Error("Error");
      load();
    } catch { alert("Error al avanzar estado"); }
    finally { setActing(false); }
  }

  if (loading) return <div style={{ padding: "32px", color: "#999" }}>Cargando...</div>;
  if (!data) return <div style={{ padding: "32px", color: "#999" }}>Orden no encontrada.</div>;

  const st = STATUS_MAP[data.status] ?? { bg: "#f3f4f6", text: "#374151", label: data.status };
  const nextSt = NEXT_STATUS[data.status];

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "13px", color: "#6b7280" }}>Orden #{data.id}</div>
        <h1 style={{ margin: "0 0 8px 0", fontSize: "28px", fontWeight: 800 }}>{data.customerFullName}</h1>
        <span style={{ padding: "4px 12px", borderRadius: "6px", background: st.bg, color: st.text, fontSize: "13px", fontWeight: 600 }}>{st.label}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", marginBottom: "32px" }}>
        {/* Info */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
          <h2 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 700 }}>Detalle</h2>
          {[
            { l: "Email", v: data.customerEmail },
            { l: "Teléfono", v: data.customerPhone },
            { l: "Canal", v: data.channel },
            { l: "Base", v: `S/ ${(data.baseAmountCents / 100).toFixed(2)}` },
            { l: "Rush", v: `S/ ${(data.rushFeeCents / 100).toFixed(2)}` },
            { l: "Total", v: `S/ ${(data.totalAmountCents / 100).toFixed(2)}` },
            { l: "Entrega", v: data.estimatedDeliveryDate ?? "—" },
          ].map((r) => (
            <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: "13px" }}>
              <span style={{ color: "#6b7280" }}>{r.l}</span>
              <span style={{ color: "#111", fontWeight: r.l === "Total" ? 700 : 400 }}>{r.v}</span>
            </div>
          ))}
        </div>

        {/* Payment proof */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
          <h2 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 700 }}>Voucher de Pago</h2>
          {data.paymentProof ? (
            <>
              <div style={{ position: "relative", marginBottom: "12px" }}>
                <img src={data.paymentProof.voucherUrl} alt="Voucher" style={{ width: "100%", borderRadius: "8px", background: "#f3f4f6" }} />
                <button onClick={() => forceDownload(data.paymentProof!.voucherUrl, `voucher_orden_${data.id}.jpg`)} style={{ position: "absolute", top: "8px", right: "8px", padding: "6px 10px", borderRadius: "6px", border: "none", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>Descargar</button>
              </div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "12px" }}>
                Método: <strong>{data.paymentProof.paymentMethod}</strong> — Monto: <strong>S/ {(data.paymentProof.amountCents / 100).toFixed(2)}</strong>
                <br />Estado: <strong>{data.paymentProof.status}</strong>
              </div>
              {data.paymentProof.status === "PENDING" && (
                <div style={{ display: "flex", gap: "8px" }}>
                  <button disabled={acting} onClick={() => reviewPayment("APPROVE")} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: "#22c55e", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Aprobar</button>
                  <button disabled={acting} onClick={() => reviewPayment("REJECT")} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ef4444", background: "#fff", color: "#ef4444", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Rechazar</button>
                </div>
              )}
            </>
          ) : (
            <div style={{ padding: "32px", textAlign: "center", color: "#999", fontSize: "14px" }}>Sin voucher aún</div>
          )}
        </div>

        {/* Timeline */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
          <h2 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 700 }}>Timeline</h2>
          {data.statusEvents.length === 0 ? (
            <div style={{ padding: "16px", textAlign: "center", color: "#999", fontSize: "13px" }}>Sin eventos aún</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {data.statusEvents.map((ev, i) => (
                <div key={ev.id} style={{ display: "flex", gap: "12px", paddingBottom: "14px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
                    {i < data.statusEvents.length - 1 && <div style={{ width: "2px", flex: 1, background: "#d1fae5", minHeight: "16px" }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>{(STATUS_MAP[ev.newStatus] ?? { label: ev.newStatus }).label}</div>
                    {ev.note && <div style={{ fontSize: "12px", color: "#6b7280" }}>{ev.note}</div>}
                    <div style={{ fontSize: "11px", color: "#9ca3af" }}>{new Date(ev.createdAt).toLocaleString("es-PE")}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {nextSt && (
            <button disabled={acting} onClick={advanceStatus} style={{ marginTop: "12px", width: "100%", padding: "10px", borderRadius: "8px", border: "none", background: "#3b82f6", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Avanzar a {(STATUS_MAP[nextSt] ?? { label: nextSt }).label}
            </button>
          )}
        </div>
      {/* PDF para imprenta — solo órdenes PHOTOBOOK con pago verificado */}
      {data.channel === "PHOTOBOOK" && PDF_ELIGIBLE_STATUSES.includes(data.status) && (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
          <h2 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 700 }}>PDF para Imprenta</h2>
          {pdfLoading ? (
            <div style={{ padding: "16px", textAlign: "center", color: "#999", fontSize: "13px" }}>Verificando PDF...</div>
          ) : pdfUrl ? (
            <div style={{ padding: "14px", borderRadius: "10px", background: "#eff6ff", border: "1px solid #bfdbfe" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#1e40af", marginBottom: "10px" }}>PDF generado y listo para imprenta</div>
              <button
                onClick={() => forceDownload(pdfUrl, `photobook_proyecto_${data.photobookProjectId}.pdf`)}
                style={{ padding: "10px 20px", borderRadius: "8px", border: "none", background: "#3b82f6", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
              >
                Descargar PDF
              </button>
            </div>
          ) : (
            <div style={{ padding: "16px", textAlign: "center", color: "#999", fontSize: "13px" }}>
              Generando PDF en segundo plano... Refrescá la página en unos segundos.
            </div>
          )}
        </div>
      )}

      {/* Feedback link — only when DELIVERED */}
      {data.status === "DELIVERED" && (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
          <h2 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 700 }}>Feedback del Cliente</h2>
          {feedbackLink ? (
            <div style={{ padding: "14px", borderRadius: "10px", background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#065f46", marginBottom: "6px" }}>Link generado</div>
              <code style={{ fontSize: "12px", background: "#e5e7eb", padding: "2px 6px", borderRadius: "4px" }}>{feedbackLink}</code>
              <button onClick={() => navigator.clipboard.writeText(feedbackLink)} style={{ marginLeft: "8px", padding: "4px 10px", borderRadius: "6px", border: "1px solid #22c55e", background: "#fff", color: "#065f46", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Copiar</button>
            </div>
          ) : (
            <button
              disabled={acting}
              onClick={async () => {
                setActing(true);
                try {
                  const res = await fetch(`${API}/api/admin/feedback/generate/${id}`, { method: "POST" });
                  if (!res.ok) throw new Error("Error");
                  const result = await res.json();
                  setFeedbackLink(result.url);
                } catch { alert("Error al generar link"); }
                finally { setActing(false); }
              }}
              style={{ padding: "12px 24px", borderRadius: "10px", border: "none", background: "#8b5cf6", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
            >
              Generar Link de Feedback
            </button>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
