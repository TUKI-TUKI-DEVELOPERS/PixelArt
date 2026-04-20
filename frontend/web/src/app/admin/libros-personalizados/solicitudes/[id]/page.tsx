"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

/** Resuelve la URL pública de un asset desde su ID */
async function resolveAssetUrl(assetId: number): Promise<string | null> {
  try {
    const res = await fetch(`${API}/api/assets/${assetId}/url`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.url ?? null;
  } catch {
    return null;
  }
}

/** Fuerza descarga de una URL cross-origin */
async function forceDownload(url: string, filename: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
}

type DemoDetail = {
  id: number;
  customerFullName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddressLine1: string;
  shippingAddressLine2: string | null;
  shippingCity: string | null;
  shippingRegion: string | null;
  deliveryDate: string;
  wantsCustomDedication: boolean;
  dedicationText: string | null;
  status: string;
  catalogBookVariantId: number;
  templateSelections: { id: number; templateId: number; templateName: string | null; templatePreviewUrl: string | null }[];
  assetIds: number[];
  proposals: { id: number; templateId: number; outputStorageKey: string; outputUrl: string; protectionMode: string }[];
  checkoutLink: { token: string; url: string; expiresAt: string; orderId: number } | null;
};

export default function SolicitudDetallePage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<DemoDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<number | null>(null);
  const [deletingProposal, setDeletingProposal] = useState<number | null>(null);
  const [assetUrls, setAssetUrls] = useState<Record<number, string>>({});
  const [sendingCheckout, setSendingCheckout] = useState(false);
  const [checkoutLink, setCheckoutLink] = useState<{ url: string; orderId: number } | null>(null);
  const fileRefs = useRef<Record<number, HTMLInputElement | null>>({});

  function loadDetail() {
    fetch(`${API}/api/admin/demo/requests/${id}`)
      .then((r) => r.json())
      .then((detail: DemoDetail) => {
        setData(detail);
        // Si el backend ya devuelve el checkout link (status=PROPOSALS_SENT), restaurarlo
        if (detail.checkoutLink) {
          setCheckoutLink({ url: detail.checkoutLink.url, orderId: detail.checkoutLink.orderId });
        }
        // Resolver URLs de fotos del cliente
        detail.assetIds.forEach((assetId) => {
          resolveAssetUrl(assetId).then((url) => {
            if (url) setAssetUrls((prev) => ({ ...prev, [assetId]: url }));
          });
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => { loadDetail(); }, [id]);

  async function handleUploadProposal(templateId: number, file: File) {
    setUploading(templateId);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(
        `${API}/api/admin/demo/requests/${id}/proposals?templateId=${templateId}&protectionMode=WATERMARK`,
        { method: "POST", body: formData },
      );
      if (!res.ok) throw new Error("Error al subir propuesta");
      loadDetail();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error");
    } finally {
      setUploading(null);
    }
  }

  async function handleDeleteProposal(proposalId: number) {
    if (!confirm("¿Eliminar esta propuesta? Se borrará del servidor.")) return;
    setDeletingProposal(proposalId);
    try {
      const res = await fetch(`${API}/api/admin/demo/requests/${id}/proposals/${proposalId}`, { method: "DELETE" });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error((err as { message?: string }).message ?? "Error"); }
      loadDetail();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error al eliminar");
    } finally {
      setDeletingProposal(null);
    }
  }

  if (loading) return <div style={{ padding: "32px", color: "#999" }}>Cargando...</div>;
  if (!data) return <div style={{ padding: "32px", color: "#999" }}>Solicitud no encontrada.</div>;

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>Solicitud #{data.id}</div>
        <h1 style={{ margin: "0 0 4px 0", fontSize: "28px", fontWeight: 800, color: "#111" }}>{data.customerFullName}</h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>{data.customerEmail} — {data.customerPhone}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
        {/* Datos del cliente */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
          <h2 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 700 }}>Datos del Cliente</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { l: "Dirección", v: data.shippingAddressLine1 },
              { l: "Ciudad", v: data.shippingCity ?? "—" },
              { l: "Región", v: data.shippingRegion ?? "—" },
              { l: "Fecha entrega", v: data.deliveryDate },
              { l: "Dedicatoria", v: data.wantsCustomDedication ? (data.dedicationText ?? "Sí") : "No" },
              { l: "Variante tapa ID", v: String(data.catalogBookVariantId) },
              { l: "Estado", v: data.status },
            ].map((r) => (
              <div key={r.l} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#6b7280", fontWeight: 500 }}>{r.l}</span>
                <span style={{ color: "#111", fontWeight: 400, textAlign: "right", maxWidth: "60%" }}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plantillas seleccionadas */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
          <h2 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 700 }}>Plantillas Seleccionadas ({data.templateSelections.length})</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {data.templateSelections.map((ts) => {
              const hasProposal = data.proposals.some((p) => p.templateId === ts.templateId);
              return (
                <div key={ts.id} style={{ borderRadius: "10px", background: hasProposal ? "#f0fdf4" : "#f9fafb", border: `1px solid ${hasProposal ? "#bbf7d0" : "#e5e7eb"}`, overflow: "hidden" }}>
                  {ts.templatePreviewUrl && (
                    <img
                      src={ts.templatePreviewUrl}
                      alt={ts.templateName ?? `Plantilla #${ts.templateId}`}
                      style={{ width: "100%", aspectRatio: "2 / 1", objectFit: "cover", display: "block", borderBottom: "1px solid #e5e7eb" }}
                    />
                  )}
                  <div style={{ padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>{ts.templateName ?? `Plantilla #${ts.templateId}`}</span>
                    {hasProposal ? (
                      <span style={{ fontSize: "11px", fontWeight: 600, color: "#22c55e" }}>Propuesta subida</span>
                    ) : (
                      <span style={{ fontSize: "11px", fontWeight: 600, color: "#f59e0b" }}>Pendiente</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fotos del cliente */}
      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", marginBottom: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ margin: 0, fontSize: "16px", fontWeight: 700 }}>Fotos del Cliente ({data.assetIds.length})</h2>
          {data.assetIds.length > 0 && (
            <button
              onClick={() => {
                data.assetIds.forEach((assetId) => {
                  const url = assetUrls[assetId];
                  if (url) forceDownload(url, `foto_cliente_${assetId}.jpg`);
                });
              }}
              style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "6px" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Descargar todas
            </button>
          )}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px" }}>
          {data.assetIds.map((assetId) => {
            const url = assetUrls[assetId];
            return url ? (
              <div key={assetId} style={{ position: "relative" }}>
                <img
                  src={url}
                  alt={`Foto ${assetId}`}
                  style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: "8px", background: "#f3f4f6", display: "block" }}
                />
                <button
                  onClick={() => forceDownload(url, `foto_cliente_${assetId}.jpg`)}
                  style={{ position: "absolute", bottom: "6px", right: "6px", width: "28px", height: "28px", borderRadius: "6px", background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", padding: 0 }}
                  title="Descargar"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg"><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                </button>
              </div>
            ) : (
              <div key={assetId} style={{ width: "100%", aspectRatio: "1", borderRadius: "8px", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc", fontSize: "11px" }}>
                Cargando...
              </div>
            );
          })}
          {data.assetIds.length === 0 && (
            <div style={{ gridColumn: "span 6", textAlign: "center", padding: "24px", color: "#999", fontSize: "14px" }}>Sin fotos</div>
          )}
        </div>
      </div>

      {/* Generar propuestas */}
      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
        <h2 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: 700 }}>Generar Propuestas</h2>
        <p style={{ margin: "0 0 20px 0", fontSize: "14px", color: "#6b7280" }}>
          Subí las propuestas para cada plantilla. Se aplicará marca de agua automáticamente.
        </p>

        {/* Upload slots */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {data.templateSelections.map((ts) => {
            const proposal = data.proposals.find((p) => p.templateId === ts.templateId);
            const isUploading = uploading === ts.templateId;
            const isDeleting = proposal ? deletingProposal === proposal.id : false;
            return (
              <div key={ts.id}>
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => { fileRefs.current[ts.templateId] = el; }}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUploadProposal(ts.templateId, file);
                  }}
                />
                {proposal ? (
                  <div style={{ border: "2px solid #22c55e", borderRadius: "12px", overflow: "hidden", background: "#f0fdf4", position: "relative" }}>
                    <img src={proposal.outputUrl} alt={ts.templateName ?? "Propuesta"} style={{ width: "100%", aspectRatio: "2 / 1", objectFit: "cover", display: "block" }} />
                    {/* Botón eliminar */}
                    {data.status === "RECEIVED" && (
                      <button
                        disabled={isDeleting}
                        onClick={() => handleDeleteProposal(proposal.id)}
                        title="Eliminar propuesta"
                        style={{
                          position: "absolute", top: "8px", right: "8px",
                          width: "28px", height: "28px", borderRadius: "50%",
                          border: "none", background: "rgba(239,68,68,0.85)",
                          color: "#fff", cursor: isDeleting ? "wait" : "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        }}
                      >
                        {isDeleting ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                        ) : (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" /></svg>
                        )}
                      </button>
                    )}
                    <div style={{ padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#065f46" }}>{ts.templateName ?? `Plantilla #${ts.templateId}`}</div>
                      <div style={{ fontSize: "11px", color: "#22c55e", background: "#dcfce7", padding: "2px 8px", borderRadius: "99px" }}>Marca de agua</div>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => !isUploading && fileRefs.current[ts.templateId]?.click()}
                    style={{ border: "2px dashed #d1d5db", borderRadius: "12px", overflow: "hidden", cursor: isUploading ? "wait" : "pointer" }}
                  >
                    {ts.templatePreviewUrl && (
                      <img src={ts.templatePreviewUrl} alt={ts.templateName ?? ""} style={{ width: "100%", aspectRatio: "2 / 1", objectFit: "cover", display: "block", opacity: 0.6 }} />
                    )}
                    <div style={{ padding: "12px", textAlign: "center" }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#6b7280", marginBottom: "2px" }}>{ts.templateName ?? `Plantilla #${ts.templateId}`}</div>
                      <div style={{ fontSize: "11px", color: "#9ca3af" }}>{isUploading ? "Subiendo..." : "Subir propuesta"}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Botón link unificado */}
        {data.proposals.length > 0 && data.status === "RECEIVED" && (
          <div style={{ marginTop: "24px", background: "#f5f3ff", borderRadius: "12px", border: "1px solid #c4b5fd", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#5b21b6", marginBottom: "4px" }}>
                  ✨ Enviar link al cliente
                </div>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>
                  El cliente recibe un link donde ve las propuestas, elige plantillas adicionales y sube el comprobante de pago.
                </div>
              </div>
              <button
                disabled={sendingCheckout}
                onClick={async () => {
                  setSendingCheckout(true);
                  try {
                    const res = await fetch(`${API}/api/admin/demo/requests/${id}/send-checkout`, { method: "POST" });
                    if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error((err as { message?: string }).message ?? "Error"); }
                    const result = await res.json();
                    setCheckoutLink({ url: result.checkoutLink.url, orderId: result.orderId });
                    loadDetail();
                  } catch (err) {
                    alert(err instanceof Error ? err.message : "Error al enviar");
                  } finally {
                    setSendingCheckout(false);
                  }
                }}
                style={{ flexShrink: 0, padding: "12px 20px", borderRadius: "10px", border: "none", background: sendingCheckout ? "#ccc" : "#8b5cf6", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: sendingCheckout ? "wait" : "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}
              >
                {sendingCheckout ? "Generando..." : "Enviar link unificado"}
              </button>
            </div>
          </div>
        )}

        {/* Checkout link generado */}
        {(checkoutLink || data.status === "PROPOSALS_SENT") && (
          <div style={{ marginTop: "16px", padding: "16px", borderRadius: "10px", background: "#f5f3ff", border: "1px solid #c4b5fd" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#5b21b6", marginBottom: "6px" }}>
              ✅ Link enviado al cliente{checkoutLink ? ` — Orden #${checkoutLink.orderId}` : ""}
            </div>
            {checkoutLink ? (
              <>
                <div style={{ fontSize: "13px", color: "#374151", marginBottom: "6px", wordBreak: "break-all" }}>
                  <code style={{ background: "#ede9fe", padding: "2px 6px", borderRadius: "4px", fontSize: "12px" }}>{checkoutLink.url}</code>
                </div>
                {data.checkoutLink?.expiresAt && (
                  <div style={{ fontSize: "12px", color: "#7c3aed", marginBottom: "8px" }}>
                    Vence el {new Date(data.checkoutLink.expiresAt).toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                )}
                <button
                  onClick={() => { navigator.clipboard.writeText(checkoutLink.url); }}
                  style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #8b5cf6", background: "#fff", color: "#5b21b6", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                >
                  Copiar link
                </button>
              </>
            ) : (
              <div style={{ fontSize: "12px", color: "#9ca3af" }}>Recargá la página para ver el link.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
