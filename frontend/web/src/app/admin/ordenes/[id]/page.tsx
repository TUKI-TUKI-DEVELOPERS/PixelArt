"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type OrderDetail = {
  id: number; channel: string; status: string; customerFullName: string; customerEmail: string; customerPhone: string;
  totalAmountCents: number; baseAmountCents: number; rushFeeCents: number; currency: string; estimatedDeliveryDate: string | null;
  demoRequestId: number | null;
  photobookProjectId: number | null;
  statusEvents: { id: number; oldStatus: string | null; newStatus: string; note: string | null; createdAt: string }[];
  paymentProof: { id: number; status: string; paymentMethod: string; amountCents: number; voucherUrl: string } | null;
  templateSelections: { templateId: number; templateName: string | null; slotIndex: number }[];
};

type PrintAsset = {
  id: number; assetType: string; templateId: number | null; templateName: string | null;
  slotIndex: number | null; previewUrl: string; originalFilename: string | null;
};

const STATUS_MAP: Record<string, { bg: string; text: string; label: string; accent: string }> = {
  AWAITING_PAYMENT_PROOF: { bg: "#fef3c7", text: "#92400e", label: "Esperando Pago",   accent: "#f59e0b" },
  UNDER_PAYMENT_REVIEW:   { bg: "#dbeafe", text: "#1e40af", label: "Revisando Pago",   accent: "#3b82f6" },
  PAYMENT_VERIFIED:       { bg: "#d1fae5", text: "#065f46", label: "Pago Verificado",  accent: "#22c55e" },
  IN_PRODUCTION:          { bg: "#ede9fe", text: "#5b21b6", label: "En Producción",    accent: "#8b5cf6" },
  SHIPPED:                { bg: "#e0e7ff", text: "#3730a3", label: "Enviado",           accent: "#6366f1" },
  DELIVERED:              { bg: "#d1fae5", text: "#065f46", label: "Entregado",         accent: "#10b981" },
  CANCELLED:              { bg: "#fee2e2", text: "#991b1b", label: "Cancelada",         accent: "#ef4444" },
  REJECTED:               { bg: "#fee2e2", text: "#991b1b", label: "Rechazada",         accent: "#ef4444" },
};

const STATUS_ORDER = [
  "AWAITING_PAYMENT_PROOF",
  "UNDER_PAYMENT_REVIEW",
  "PAYMENT_VERIFIED",
  "IN_PRODUCTION",
  "SHIPPED",
  "DELIVERED",
];

const NEXT_STATUS: Record<string, string> = {
  PAYMENT_VERIFIED: "IN_PRODUCTION",
  IN_PRODUCTION:    "SHIPPED",
  SHIPPED:          "DELIVERED",
};

async function forceDownload(url: string, filename: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(blobUrl);
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
  const [pdfRegenerating, setPdfRegenerating] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const [printAssets, setPrintAssets] = useState<PrintAsset[]>([]);
  const [cbPdfUrl, setCbPdfUrl] = useState<string | null>(null);
  const [cbPdfGenerating, setCbPdfGenerating] = useState(false);
  const [cbPdfSuccess, setCbPdfSuccess] = useState(false);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);

  const PDF_ELIGIBLE_STATUSES = ["PAYMENT_VERIFIED", "IN_PRODUCTION", "SHIPPED", "DELIVERED"];

  function load() {
    fetch(`${API}/api/admin/orders/${id}`)
      .then((r) => r.json())
      .then((order: OrderDetail) => {
        setData(order);
        if (order.channel === "PHOTOBOOK" && order.photobookProjectId && PDF_ELIGIBLE_STATUSES.includes(order.status)) {
          loadPdf(order.photobookProjectId);
        }
        if (order.channel === "CUSTOM_BOOK" && PDF_ELIGIBLE_STATUSES.includes(order.status)) {
          loadPrintAssets(order.id);
          loadCbRender(order.id);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  function loadPdf(projectId: number) {
    setPdfLoading(true);
    fetch(`${API}/api/admin/photobook/projects/${projectId}/render`)
      .then((r) => { if (r.ok) return r.json(); throw new Error("not ready"); })
      .then((r: { pdfUrl: string }) => setPdfUrl(r.pdfUrl))
      .catch(() => setPdfUrl(null))
      .finally(() => setPdfLoading(false));
  }

  function loadPrintAssets(orderId: number) {
    fetch(`${API}/api/admin/orders/${orderId}/print-assets`)
      .then((r) => r.json())
      .then((list: PrintAsset[]) => setPrintAssets(Array.isArray(list) ? list : []))
      .catch(() => {});
  }

  function loadCbRender(orderId: number) {
    fetch(`${API}/api/admin/orders/${orderId}/render`)
      .then((r) => { if (r.ok) return r.json(); throw new Error(); })
      .then((r: { pdfUrl: string }) => setCbPdfUrl(r.pdfUrl))
      .catch(() => setCbPdfUrl(null));
  }

  useEffect(() => { load(); }, [id]);

  async function reviewPayment(action: "APPROVE" | "REJECT") {
    setActing(true);
    try {
      const res = await fetch(`${API}/api/admin/orders/${id}/review-payment`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, rejectionReason: action === "REJECT" ? "Voucher no válido" : undefined }),
      });
      if (!res.ok) throw new Error();
      // Auto-generar link de feedback al aprobar el pago
      if (action === "APPROVE") {
        try {
          const fbRes = await fetch(`${API}/api/admin/feedback/generate/${id}`, { method: "POST" });
          if (fbRes.ok) {
            const fbResult = await fbRes.json();
            setFeedbackLink(fbResult.url);
          }
        } catch { /* silencioso — no bloquear el flujo principal */ }
      }
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
      if (!res.ok) throw new Error();
      load();
    } catch { alert("Error al avanzar estado"); }
    finally { setActing(false); }
  }

  if (loading) return <div style={{ padding: "32px", color: "#999" }}>Cargando...</div>;
  if (!data) return <div style={{ padding: "32px", color: "#999" }}>Orden no encontrada.</div>;

  const st = STATUS_MAP[data.status] ?? { bg: "#f3f4f6", text: "#374151", label: data.status, accent: "#6b7280" };
  const nextSt = NEXT_STATUS[data.status];
  const nextStInfo = nextSt ? STATUS_MAP[nextSt] : null;
  const currentStepIndex = STATUS_ORDER.indexOf(data.status);

  return (
    <div style={{ padding: "32px" }}>

      {/* ── 1. Header ── */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 500 }}>Orden #{data.id}</span>
          {data.demoRequestId && (
            <Link href={`/admin/libros-personalizados/solicitudes/${data.demoRequestId}`}
              style={{ fontSize: "12px", fontWeight: 600, color: "#3b82f6", textDecoration: "none", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "6px", padding: "2px 10px" }}>
              ← Solicitud #{data.demoRequestId}
            </Link>
          )}
          {data.photobookProjectId && (
            <Link href={`/admin/photobooks/proyectos/${data.photobookProjectId}`}
              style={{ fontSize: "12px", fontWeight: 600, color: "#7c3aed", textDecoration: "none", background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: "6px", padding: "2px 10px" }}>
              ← Proyecto #{data.photobookProjectId}
            </Link>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
          <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 800, color: "#111" }}>{data.customerFullName}</h1>
          <span style={{ padding: "4px 14px", borderRadius: "8px", background: st.bg, color: st.text, fontSize: "13px", fontWeight: 700 }}>{st.label}</span>
          <span style={{ fontSize: "12px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", background: data.channel === "CUSTOM_BOOK" ? "#fef3c7" : "#ede9fe", color: data.channel === "CUSTOM_BOOK" ? "#92400e" : "#5b21b6" }}>
            {data.channel === "CUSTOM_BOOK" ? "Libro personalizado" : "Photobook"}
          </span>
        </div>
      </div>

      {/* ── 2. Progreso ── */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "20px", overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
          {/* Stepper */}
          <div style={{ overflowX: "auto", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "flex-start", minWidth: "max-content" }}>
              {STATUS_ORDER.map((s, i) => {
                const info = STATUS_MAP[s];
                const isDone    = i < currentStepIndex;
                const isCurrent = i === currentStepIndex;
                const isLast    = i === STATUS_ORDER.length - 1;
                return (
                  <div key={s} style={{ display: "flex", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "88px" }}>
                      <div style={{
                        width: "24px", height: "24px", borderRadius: "50%", flexShrink: 0,
                        background: isCurrent ? info.accent : isDone ? "#dcfce7" : "#f3f4f6",
                        border: isCurrent ? `3px solid ${info.accent}` : isDone ? "3px solid #22c55e" : "3px solid #e5e7eb",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: isCurrent ? `0 0 0 4px ${info.accent}22` : "none",
                      }}>
                        {isDone && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                        {isCurrent && <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#fff" }} />}
                      </div>
                      <div style={{ marginTop: "6px", textAlign: "center", fontSize: "10px", fontWeight: isCurrent ? 700 : 500, color: isCurrent ? info.text : isDone ? "#6b7280" : "#9ca3af", lineHeight: 1.3, padding: "0 2px" }}>
                        {info.label}
                      </div>
                      {(() => {
                        const ev = data.statusEvents.find((e) => e.newStatus === s);
                        return ev ? (
                          <div style={{ marginTop: "3px", fontSize: "9px", color: "#9ca3af", textAlign: "center" }}>
                            {new Date(ev.createdAt).toLocaleDateString("es-PE", { day: "2-digit", month: "short" })}
                          </div>
                        ) : null;
                      })()}
                    </div>
                    {!isLast && (
                      <div style={{ width: "28px", height: "2px", marginTop: "11px", background: isDone ? "#22c55e" : "#e5e7eb", flexShrink: 0 }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Botón avanzar — integrado */}
          {nextStInfo && (
            <button
              disabled={acting}
              onClick={advanceStatus}
              style={{ flexShrink: 0, padding: "10px 22px", borderRadius: "10px", border: "none", background: acting ? "#e5e7eb" : nextStInfo.accent, color: "#fff", fontSize: "13px", fontWeight: 700, cursor: acting ? "not-allowed" : "pointer", fontFamily: "inherit", whiteSpace: "nowrap", boxShadow: acting ? "none" : `0 4px 12px ${nextStInfo.accent}44` }}>
              {acting ? "..." : `→ ${nextStInfo.label}`}
            </button>
          )}
        </div>
        {/* Nota del último evento */}
        {data.statusEvents.length > 0 && data.statusEvents[0].note && (
          <div style={{ padding: "10px 24px", borderTop: "1px solid #f3f4f6", fontSize: "12px", color: "#6b7280" }}>
            <span style={{ fontWeight: 600, color: "#374151" }}>Última nota: </span>{data.statusEvents[0].note}
          </div>
        )}
      </div>

      {/* ── 3. Info strip ── */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "24px", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { label: "Email",    value: data.customerEmail },
            { label: "Teléfono", value: data.customerPhone || "—" },
            { label: "Total",    value: `S/ ${(data.totalAmountCents / 100).toFixed(2)}`, accent: true },
            { label: "Entrega",  value: data.estimatedDeliveryDate ?? "—" },
          ].map((f, i, arr) => (
            <div key={f.label} style={{ padding: "14px 20px", borderRight: i < arr.length - 1 ? "1px solid #f3f4f6" : "none" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "5px" }}>{f.label}</div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: f.accent ? "#111" : "#374151" }}>{f.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. Voucher de pago ── */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "24px", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>Voucher de pago</span>
        </div>
        {data.paymentProof ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
            {/* Imagen */}
            <div style={{ padding: "20px", borderRight: "1px solid #f3f4f6", position: "relative" }}>
              <img
                src={data.paymentProof.voucherUrl}
                alt="Voucher"
                style={{ width: "100%", borderRadius: "10px", background: "#f3f4f6", display: "block", maxHeight: "360px", objectFit: "contain" }}
              />
              <button
                onClick={() => forceDownload(data.paymentProof!.voucherUrl, `voucher_orden_${data.id}.jpg`)}
                style={{ position: "absolute", top: "28px", right: "28px", padding: "6px 12px", borderRadius: "6px", border: "none", background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                Descargar
              </button>
            </div>
            {/* Datos + acciones */}
            <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "Método",  value: data.paymentProof.paymentMethod },
                  { label: "Monto",   value: `S/ ${(data.paymentProof.amountCents / 100).toFixed(2)}` },
                  { label: "Estado",  value: data.paymentProof.status === "PENDING" ? "Pendiente de revisión" : data.paymentProof.status === "APPROVED" ? "Aprobado" : "Rechazado" },
                ].map((r) => (
                  <div key={r.label}>
                    <div style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "3px" }}>{r.label}</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#111" }}>{r.value}</div>
                  </div>
                ))}
              </div>
              {data.paymentProof.status === "PENDING" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "8px", borderTop: "1px solid #f3f4f6" }}>
                  <button disabled={acting} onClick={() => reviewPayment("APPROVE")}
                    style={{ padding: "12px", borderRadius: "10px", border: "none", background: acting ? "#d1fae5" : "#16a34a", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: acting ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: acting ? 0.7 : 1 }}>
                    {acting ? "Procesando..." : "✓ Aprobar pago"}
                  </button>
                  <button disabled={acting} onClick={() => reviewPayment("REJECT")}
                    style={{ padding: "12px", borderRadius: "10px", border: "1px solid #fca5a5", background: "#fff", color: "#ef4444", fontSize: "14px", fontWeight: 700, cursor: acting ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: acting ? 0.7 : 1 }}>
                    Rechazar
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ padding: "40px", textAlign: "center", color: "#9ca3af", fontSize: "14px" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" style={{ display: "block", margin: "0 auto 10px" }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            Sin voucher aún — esperando al cliente
          </div>
        )}
      </div>

      {/* ── 6. PDF para imprenta ── */}
      {data.channel === "PHOTOBOOK" && PDF_ELIGIBLE_STATUSES.includes(data.status) && (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "24px", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>PDF para imprenta</span>
          </div>
          <div style={{ padding: "20px 24px" }}>
            {pdfSuccess && (
              <div style={{ marginBottom: "12px", padding: "10px 14px", borderRadius: "8px", background: "#f0fdf4", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#15803d" }}>PDF generado con éxito</span>
              </div>
            )}
            {pdfLoading ? (
              <div style={{ fontSize: "13px", color: "#9ca3af" }}>Verificando PDF...</div>
            ) : pdfUrl ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#111", marginBottom: "3px" }}>PDF generado y listo</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Proyecto #{data.photobookProjectId}</div>
                </div>
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <button
                    disabled={pdfRegenerating}
                    onClick={async () => {
                      setPdfRegenerating(true);
                      try {
                        await fetch(`${API}/api/admin/photobook/projects/${data.photobookProjectId}/render`, { method: "POST" });
                        // Esperar 8s y luego recargar la URL del PDF
                        await new Promise((r) => setTimeout(r, 8000));
                        const res = await fetch(`${API}/api/admin/photobook/projects/${data.photobookProjectId}/render`);
                        if (res.ok) {
                          const r = await res.json();
                          setPdfUrl(r.pdfUrl);
                          setPdfSuccess(true);
                          setTimeout(() => setPdfSuccess(false), 4000);
                        }
                      } catch { /* silencioso */ }
                      finally { setPdfRegenerating(false); }
                    }}
                    style={{ padding: "12px 20px", borderRadius: "10px", border: "1px solid #e5e7eb", background: "#fff", color: pdfRegenerating ? "#9ca3af" : "#374151", fontSize: "13px", fontWeight: 600, cursor: pdfRegenerating ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
                    {pdfRegenerating ? "Generando..." : "Regenerar PDF"}
                  </button>
                  <button
                    onClick={() => forceDownload(pdfUrl, `photobook_proyecto_${data.photobookProjectId}.pdf`)}
                    style={{ padding: "12px 24px", borderRadius: "10px", border: "none", background: "#2563eb", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 12px rgba(37,99,235,0.25)" }}>
                    Descargar PDF
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: "13px", color: "#9ca3af" }}>
                Generando PDF en segundo plano... Recarga la página en unos segundos.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 7. Archivos para imprenta (solo CUSTOM_BOOK) ── */}
      {data.channel === "CUSTOM_BOOK" && PDF_ELIGIBLE_STATUSES.includes(data.status) && (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "24px", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>Archivos para imprenta</span>
              {(() => {
                const total = 2 + (data.templateSelections?.length ?? 0);
                const uploaded = printAssets.length;
                const allDone = uploaded >= total;
                return (
                  <span style={{ fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px", background: allDone ? "#d1fae5" : "#fef3c7", color: allDone ? "#065f46" : "#92400e" }}>
                    {uploaded} / {total} archivos
                  </span>
                );
              })()}
            </div>
            <span style={{ fontSize: "11px", color: "#9ca3af" }}>20.5 × 29 cm</span>
          </div>

          <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {/* Slots: Portada + Plantillas + Contraportada */}
            {[
              { key: "COVER",      label: "Portada",        templateId: null, slotIndex: null },
              ...(data.templateSelections ?? []).map((t) => ({
                key: `TEMPLATE_${t.templateId}`,
                label: t.templateName ?? `Plantilla #${t.templateId}`,
                templateId: t.templateId,
                slotIndex: t.slotIndex,
              })),
              { key: "BACK_COVER", label: "Contraportada",  templateId: null, slotIndex: null },
            ].map((slot) => {
              const assetType = slot.templateId !== null ? "TEMPLATE" : slot.key as string;
              const uploaded = printAssets.find((a) =>
                a.assetType === assetType &&
                (assetType !== "TEMPLATE" || a.templateId === slot.templateId)
              );
              const isUploading = uploadingSlot === slot.key;

              return (
                <div key={slot.key} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "8px", background: uploaded ? "#f0fdf4" : "#f9fafb", border: `1px solid ${uploaded ? "#bbf7d0" : "#e5e7eb"}` }}>
                  {/* Preview o placeholder */}
                  <div style={{ width: "44px", height: "44px", borderRadius: "6px", overflow: "hidden", flexShrink: 0, background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {uploaded
                      ? <img src={uploaded.previewUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    }
                  </div>

                  {/* Nombre */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{slot.label}</div>
                    {uploaded
                      ? <div style={{ fontSize: "11px", color: "#6b7280" }}>{uploaded.originalFilename ?? "Archivo subido"}</div>
                      : <div style={{ fontSize: "11px", color: "#9ca3af" }}>Sin archivo</div>
                    }
                  </div>

                  {/* Badge estado */}
                  {uploaded && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                  )}

                  {/* Upload button */}
                  <label style={{ flexShrink: 0, cursor: isUploading ? "not-allowed" : "pointer" }}>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      style={{ display: "none" }}
                      disabled={isUploading}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploadingSlot(slot.key);
                        try {
                          const fd = new FormData();
                          fd.append("file", file);
                          fd.append("assetType", assetType);
                          if (slot.templateId !== null) fd.append("templateId", String(slot.templateId));
                          if (slot.slotIndex !== null) fd.append("slotIndex", String(slot.slotIndex));
                          const res = await fetch(`${API}/api/admin/orders/${data.id}/print-assets`, { method: "POST", body: fd });
                          if (!res.ok) throw new Error();
                          loadPrintAssets(data.id);
                        } catch { alert("Error al subir el archivo"); }
                        finally { setUploadingSlot(null); e.target.value = ""; }
                      }}
                    />
                    <span style={{ padding: "6px 14px", borderRadius: "7px", border: "1px solid #e5e7eb", background: isUploading ? "#f3f4f6" : "#fff", color: isUploading ? "#9ca3af" : "#374151", fontSize: "12px", fontWeight: 600, display: "inline-block" }}>
                      {isUploading ? "Subiendo..." : uploaded ? "Reemplazar" : "Subir"}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>

          {/* PDF generado */}
          <div style={{ padding: "0 24px 20px" }}>
            {cbPdfSuccess && (
              <div style={{ marginBottom: "12px", padding: "10px 14px", borderRadius: "8px", background: "#f0fdf4", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#15803d" }}>PDF generado con éxito</span>
              </div>
            )}
            {cbPdfUrl ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#111", marginBottom: "2px" }}>PDF generado y listo</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>20.5 × 29 cm</div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    disabled={cbPdfGenerating}
                    onClick={async () => {
                      setCbPdfGenerating(true);
                      try {
                        await fetch(`${API}/api/admin/orders/${data.id}/render`, { method: "POST" });
                        await new Promise((r) => setTimeout(r, 8000));
                        const res = await fetch(`${API}/api/admin/orders/${data.id}/render`);
                        if (res.ok) { const r = await res.json(); setCbPdfUrl(r.pdfUrl); setCbPdfSuccess(true); setTimeout(() => setCbPdfSuccess(false), 4000); }
                      } catch { /* silencioso */ }
                      finally { setCbPdfGenerating(false); }
                    }}
                    style={{ padding: "10px 18px", borderRadius: "9px", border: "1px solid #e5e7eb", background: "#fff", color: cbPdfGenerating ? "#9ca3af" : "#374151", fontSize: "13px", fontWeight: 600, cursor: cbPdfGenerating ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
                    {cbPdfGenerating ? "Generando..." : "Regenerar PDF"}
                  </button>
                  <button
                    onClick={() => forceDownload(cbPdfUrl, `libro_orden_${data.id}.pdf`)}
                    style={{ padding: "10px 22px", borderRadius: "9px", border: "none", background: "#2563eb", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 12px rgba(37,99,235,0.25)" }}>
                    Descargar PDF
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>
                  {printAssets.length < 2 + (data.templateSelections?.length ?? 0)
                    ? "Sube todos los archivos para habilitar la generación del PDF."
                    : "Todos los archivos están listos. Podés generar el PDF."}
                </div>
                <button
                  disabled={cbPdfGenerating || printAssets.length < 2 + (data.templateSelections?.length ?? 0)}
                  onClick={async () => {
                    setCbPdfGenerating(true);
                    try {
                      await fetch(`${API}/api/admin/orders/${data.id}/render`, { method: "POST" });
                      await new Promise((r) => setTimeout(r, 10000));
                      const res = await fetch(`${API}/api/admin/orders/${data.id}/render`);
                      if (res.ok) { const r = await res.json(); setCbPdfUrl(r.pdfUrl); setCbPdfSuccess(true); setTimeout(() => setCbPdfSuccess(false), 4000); }
                    } catch { /* silencioso */ }
                    finally { setCbPdfGenerating(false); }
                  }}
                  style={{ flexShrink: 0, padding: "12px 24px", borderRadius: "10px", border: "none", background: cbPdfGenerating || printAssets.length < 2 + (data.templateSelections?.length ?? 0) ? "#e5e7eb" : "#2563eb", color: cbPdfGenerating || printAssets.length < 2 + (data.templateSelections?.length ?? 0) ? "#9ca3af" : "#fff", fontSize: "13px", fontWeight: 700, cursor: cbPdfGenerating || printAssets.length < 2 + (data.templateSelections?.length ?? 0) ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
                  {cbPdfGenerating ? "Generando..." : "Generar PDF"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 8. Feedback ── */}
      {["PAYMENT_VERIFIED", "IN_PRODUCTION", "SHIPPED", "DELIVERED"].includes(data.status) && (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>Feedback del cliente</span>
            {feedbackLink && (
              <span style={{ fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px", background: "#d1fae5", color: "#065f46" }}>
                Listo para enviar
              </span>
            )}
          </div>
          <div style={{ padding: "20px 24px" }}>
            {feedbackLink ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>
                  Compartí este link con el cliente cuando hayas entregado su pedido.
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <code style={{ flex: 1, fontSize: "12px", background: "#f3f4f6", color: "#374151", padding: "8px 12px", borderRadius: "8px", wordBreak: "break-all" }}>{feedbackLink}</code>
                  <button onClick={() => navigator.clipboard.writeText(feedbackLink)}
                    style={{ flexShrink: 0, padding: "8px 16px", borderRadius: "8px", border: "1px solid #8b5cf6", background: "#fff", color: "#7c3aed", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                    Copiar
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>Genera el link para que el cliente deje su reseña al recibir su pedido.</div>
                <button
                  disabled={acting}
                  onClick={async () => {
                    setActing(true);
                    try {
                      const res = await fetch(`${API}/api/admin/feedback/generate/${id}`, { method: "POST" });
                      if (!res.ok) throw new Error();
                      const result = await res.json();
                      setFeedbackLink(result.url);
                    } catch { alert("Error al generar link"); }
                    finally { setActing(false); }
                  }}
                  style={{ flexShrink: 0, padding: "12px 24px", borderRadius: "10px", border: "none", background: "#8b5cf6", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 12px rgba(139,92,246,0.25)" }}>
                  Generar link
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
