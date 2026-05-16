"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { getCheckoutInfo, submitCheckout, type CheckoutInfo } from "@/lib/api/checkout";
import { getAssetUrl } from "@/lib/assetUrl";
import ProposalBook from "@/components/ProposalBook";
import TemplateBook from "@/components/TemplateBook";
import { useWindowSize } from "@/hooks/useWindowSize";

const STANDARD_ADDITIONAL = 7;   // 10 plantillas total − 3 del demo
const PREMIUM_ADDITIONAL = 12;   // 15 plantillas total − 3 del demo
const EXTRA_PRICE_CENTS = 4000;  // S/ 40.00 — siempre, independiente de la tapa

function formatPrice(cents: number) {
  return `S/ ${(cents / 100).toFixed(2)}`;
}

function Spinner() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#faf9f7" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "40px", height: "40px", border: "3px solid #e5e7eb", borderTopColor: "#111", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <div style={{ fontSize: "15px", color: "#6b7280" }}>Cargando tu pedido...</div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px", textAlign: "center", background: "#faf9f7" }}>
      <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", fontSize: "28px" }}>
        😔
      </div>
      <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>Link no válido</h1>
      <p style={{ fontSize: "16px", color: "#6b7280", maxWidth: "400px" }}>{message}</p>
    </div>
  );
}

function PendingScreen() {
  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
      <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 8px 32px rgba(245,158,11,0.2)" }}>
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>
      <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#92400e", marginBottom: "12px" }}>Comprobante enviado</h1>
      <p style={{ fontSize: "16px", color: "#6b7280", lineHeight: 1.7, marginBottom: "0" }}>
        Recibimos tu comprobante de pago. Nuestro equipo lo está revisando
        y te contactaremos pronto para confirmar tu pedido.
      </p>
    </div>
  );
}

function ApprovedScreen({ totalCents, currency }: { totalCents: number; currency: string }) {
  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
      <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 8px 32px rgba(5,150,105,0.2)" }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#065f46", marginBottom: "12px" }}>¡Pago aprobado!</h1>
      <p style={{ fontSize: "16px", color: "#6b7280", lineHeight: 1.7, marginBottom: "20px" }}>
        Tu pago fue verificado. Ya estamos trabajando en tu libro personalizado.
        Te avisaremos cuando esté listo para envío.
      </p>
      {totalCents > 0 && (
        <div style={{ fontSize: "28px", fontWeight: 900, color: "#111" }}>
          {formatPrice(totalCents)} {currency}
        </div>
      )}
    </div>
  );
}


export default function CheckoutPage() {
  const params = useParams();
  const token = params.token as string;
  const { isMobile } = useWindowSize();

  const [data, setData] = useState<CheckoutInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [pkg, setPkg] = useState<"STANDARD" | "PREMIUM">("STANDARD");
  const [selectedTemplates, setSelectedTemplates] = useState<Set<number>>(new Set());
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedTotal, setSubmittedTotal] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getCheckoutInfo(token)
      .then((info) => {
        setData(info);
        if (info.packagePreference) setPkg(info.packagePreference);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  function toggleTemplate(id: number) {
    setSelectedTemplates((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const requiredAdditional = pkg === "PREMIUM" ? PREMIUM_ADDITIONAL : STANDARD_ADDITIONAL;
  const canSubmit = selectedTemplates.size === requiredAdditional && paymentFile !== null;

  const baseAmount = data?.baseAmountCents ?? 0;
  const rushAmount = data?.rushFeeCents ?? 0;
  const extraAmount = pkg === "PREMIUM" ? EXTRA_PRICE_CENTS : 0;
  const totalDisplay = baseAmount + rushAmount + extraAmount;

  async function handleSubmit() {
    if (!canSubmit || !paymentFile || !data) return;
    setSubmitting(true);
    try {
      const result = await submitCheckout(token, {
        additionalTemplateIds: Array.from(selectedTemplates),
        packageType: pkg,
        paymentProof: paymentFile,
      });
      setSubmittedTotal(result.totalAmountCents);
      setSubmitted(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error al enviar el pedido");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <Spinner />;
  if (error) return <ErrorScreen message={error} />;
  if (!data) return null;

  // Link revocado — el backend devuelve solo { orderStatus }
  if (!data.customerName) {
    const approved = ['PAYMENT_VERIFIED', 'IN_PRODUCTION', 'SHIPPED', 'DELIVERED'].includes(data.orderStatus);
    if (approved) return <ApprovedScreen totalCents={0} currency="PEN" />;
    return <PendingScreen />;
  }

  // Recién envió el comprobante en esta sesión
  if (submitted) return <PendingScreen />;

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px", fontFamily: "inherit" }}>

      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
          Completa tu pedido
        </div>
        <h1 style={{ margin: "0 0 8px 0", fontSize: "32px", fontWeight: 800, color: "#111" }}>
          {data.customerName}
        </h1>
        <div style={{ fontSize: "13px", color: "#9ca3af" }}>
          {data.bookName} · Link válido hasta {new Date(data.expiresAt).toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>

      {/* ── Sección 1: Tus propuestas ── */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111", marginBottom: "4px" }}>
          Tus propuestas
        </h2>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px" }}>
          Estas son las {data.proposals.length} plantillas que ya seleccionaste y el equipo diseñó para vos.
          {!isMobile && " Explóralas usando las flechas o arrastrando las esquinas."}
        </p>

        {isMobile ? (
          /* Mobile: grid de cards */
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {data.proposals.map((p, i) => (
              <div key={p.templateId} style={{ borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden", background: "#fff" }}>
                <div style={{ position: "relative", background: "#f3f4f6", aspectRatio: "1" }}>
                  <img
                    src={p.imageUrl}
                    alt={p.templateName ?? `Propuesta ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", top: "6px", left: "6px", width: "24px", height: "24px", borderRadius: "50%", background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {i + 1}
                  </div>
                  <div style={{ position: "absolute", top: "6px", right: "6px", background: "rgba(0,0,0,0.5)", borderRadius: "6px", padding: "2px 7px", fontSize: "10px", color: "#fff" }}>
                    {p.protectionMode === "WATERMARK" ? "Marca de agua" : "Baja calidad"}
                  </div>
                </div>
                <div style={{ padding: "8px 10px", fontSize: "12px", fontWeight: 500, color: "#374151" }}>
                  {p.templateName ?? `Propuesta ${i + 1}`}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: efecto de libro igual que en el wizard */
          <ProposalBook proposals={data.proposals} />
        )}
      </section>

      {/* ── Sección 2: Elegí las plantillas restantes ── */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111", marginBottom: "4px" }}>
          Completa tu libro
        </h2>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px" }}>
          Elige los escenarios restantes del catálogo para terminar tu libro personalizado.
        </p>

        {/* Package — tu plan actual */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 18px", borderRadius: "12px",
          background: "#f9fafb", border: "1px solid #e5e7eb",
          marginBottom: data.packagePreference === "STANDARD" ? "12px" : "24px",
        }}>
          <div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "2px" }}>Tu plan actual</div>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>
              {pkg === "PREMIUM" ? "15 plantillas" : "10 plantillas"}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "2px" }}>Total</div>
            <div style={{ fontSize: "18px", fontWeight: 900, color: "#111" }}>{formatPrice(totalDisplay)}</div>
          </div>
        </div>

        {/* Upsell — solo si eligió 10 plantillas */}
        {data.packagePreference === "STANDARD" && (
          <div
            onClick={() => { setPkg(pkg === "PREMIUM" ? "STANDARD" : "PREMIUM"); setSelectedTemplates(new Set()); }}
            style={{
              position: "relative", borderRadius: "16px", padding: "18px 20px",
              cursor: "pointer", transition: "all 0.2s",
              border: pkg === "PREMIUM" ? "2px solid #8b5cf6" : "2px dashed #c4b5fd",
              background: pkg === "PREMIUM" ? "#f5f3ff" : "#fdfcff",
              marginBottom: "24px",
            }}
          >
            <div style={{ position: "absolute", top: "-1px", right: "16px", background: "#8b5cf6", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "0 0 8px 8px", letterSpacing: "0.5px" }}>
              MEJORA TU PLAN
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#7c3aed", marginBottom: "4px" }}>
                  {pkg === "PREMIUM" ? "✓ Ampliado a 15 plantillas" : "¿Te gustaron las propuestas? Amplía a 15"}
                </div>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>
                  {pkg === "PREMIUM"
                    ? "Toca aquí para volver a 10 plantillas"
                    : `5 escenarios adicionales por solo +${formatPrice(EXTRA_PRICE_CENTS)}`}
                </div>
              </div>
              <div style={{
                padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 700,
                background: pkg === "PREMIUM" ? "#ede9fe" : "#8b5cf6",
                color: pkg === "PREMIUM" ? "#7c3aed" : "#fff",
                whiteSpace: "nowrap",
              }}>
                {pkg === "PREMIUM" ? "Quitar mejora" : `Agregar +${formatPrice(EXTRA_PRICE_CENTS)}`}
              </div>
            </div>
          </div>
        )}

        {/* Template counter */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div style={{ fontSize: "14px", color: "#374151", fontWeight: 600 }}>
            {selectedTemplates.size === requiredAdditional ? "¡Listo! Ya elegiste todas" : "Explora y elige tus plantillas"}
          </div>
          <div style={{
            fontSize: "14px",
            fontWeight: 700,
            color: selectedTemplates.size === requiredAdditional ? "#059669" : "#6b7280",
            background: selectedTemplates.size === requiredAdditional ? "#d1fae5" : "#f3f4f6",
            padding: "4px 12px",
            borderRadius: "99px",
          }}>
            {selectedTemplates.size} / {requiredAdditional}
          </div>
        </div>

        {data.availableTemplates.length === 0 ? (
          <div style={{ padding: "24px", textAlign: "center", color: "#9ca3af", fontSize: "14px", background: "#f9fafb", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            No hay más plantillas disponibles para este modelo.
          </div>
        ) : isMobile ? (
          /* Mobile: grid 2 columnas con estado de selección */
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {data.availableTemplates.map((t, idx) => {
              const isSelected = selectedTemplates.has(t.id);
              const selIdx = Array.from(selectedTemplates).indexOf(t.id);
              const isDisabled = !isSelected && selectedTemplates.size >= requiredAdditional;
              return (
                <div
                  key={t.id}
                  onClick={() => !isDisabled && toggleTemplate(t.id)}
                  style={{
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                    aspectRatio: "3/2",
                    border: isSelected ? "2px solid #8b5cf6" : "2px solid transparent",
                    opacity: isDisabled ? 0.4 : 1,
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    boxShadow: isSelected ? "0 0 0 2px #8b5cf640" : "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={t.previewUrl}
                    alt={t.name ?? `Plantilla ${idx + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  {isSelected && (
                    <div style={{ position: "absolute", top: "6px", right: "6px", width: "24px", height: "24px", borderRadius: "50%", background: "#8b5cf6", color: "#fff", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff" }}>
                      {selIdx + 1}
                    </div>
                  )}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 8px 6px", background: "linear-gradient(transparent, rgba(0,0,0,0.55))" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{t.name ?? `Plantilla ${idx + 1}`}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Desktop: efecto de libro con selección */
          <TemplateBook
            templates={data.availableTemplates}
            selectedIds={Array.from(selectedTemplates)}
            maxSelections={requiredAdditional}
            accent="#8b5cf6"
            onToggle={toggleTemplate}
          />
        )}
      </section>

      {/* ── Sección 3: Comprobante de pago ── */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111", marginBottom: "4px" }}>
          Comprobante de pago
        </h2>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px" }}>
          Realiza el pago y sube la captura del comprobante.
        </p>

        {/* Amount breakdown */}
        <div style={{ background: "#f9fafb", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "20px", marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: (pkg === "PREMIUM" || rushAmount > 0) ? "8px" : "0", fontSize: "15px", color: "#374151" }}>
            <span>Libro personalizado</span>
            <span style={{ fontWeight: 600 }}>{formatPrice(data.baseAmountCents)}</span>
          </div>
          {rushAmount > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "15px", color: "#374151" }}>
              <span>⚡ Entrega express</span>
              <span style={{ fontWeight: 600 }}>+{formatPrice(rushAmount)}</span>
            </div>
          )}
          {pkg === "PREMIUM" && (
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "15px", color: "#374151" }}>
              <span>5 escenarios adicionales</span>
              <span style={{ fontWeight: 600 }}>+{formatPrice(EXTRA_PRICE_CENTS)}</span>
            </div>
          )}
          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "12px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "17px", fontWeight: 700, color: "#111" }}>Total</span>
            <span style={{ fontSize: "22px", fontWeight: 900, color: "#111" }}>{formatPrice(totalDisplay)}</span>
          </div>
        </div>

        {/* QR Yape */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "24px", textAlign: "center", marginBottom: "20px" }}>
          <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: 700, color: "#111" }}>Paga con Yape</h3>
          <p style={{ margin: "0 0 14px 0", fontSize: "13px", color: "#9ca3af" }}>Abre Yape, toca el ícono de QR y escanea</p>
          <img
            src={getAssetUrl("QRPago/QR_Pago_Pixelart.png")}
            alt="QR de pago Yape PixelArt"
            style={{
              width: "280px",
              height: "280px",
              objectFit: "contain",
              display: "block",
              margin: "0 auto 14px",
              borderRadius: "12px",
            }}
          />
          <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
            Paga <strong>{formatPrice(totalDisplay)}</strong> y sube la captura abajo
          </p>
        </div>

        {/* File upload */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) setPaymentFile(f); }}
        />
        <style>{`
          @keyframes upload-dash { to { stroke-dashoffset: -20; } }
          @keyframes upload-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
          .upload-zone:hover { border-color: #8b5cf6 !important; background: #faf5ff !important; }
          .upload-zone:hover .upload-icon { color: #8b5cf6; }
          .upload-zone:hover .upload-arrow { animation: upload-float 1s ease-in-out infinite; }
        `}</style>
        <div
          className="upload-zone"
          onClick={() => fileRef.current?.click()}
          style={{
            border: paymentFile ? "2px solid #059669" : "2px dashed #c4b5fd",
            borderRadius: "16px",
            padding: "36px 24px",
            textAlign: "center",
            cursor: "pointer",
            background: paymentFile ? "#f0fdf4" : "#fdfcff",
            transition: "all 0.2s",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {paymentFile ? (
            <>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#059669", marginBottom: "4px" }}>{paymentFile.name}</div>
              <div style={{ fontSize: "12px", color: "#9ca3af" }}>Haz clic para cambiar</div>
            </>
          ) : (
            <>
              {/* Fondo decorativo sutil */}
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
              {/* Ícono con flecha animada */}
              <div className="upload-icon" style={{ width: "64px", height: "64px", borderRadius: "16px", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", transition: "color 0.2s" }}>
                <svg className="upload-arrow" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "color 0.2s" }}>
                  <polyline points="16 16 12 12 8 16"/>
                  <line x1="12" y1="12" x2="12" y2="21"/>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                </svg>
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>Sube tu comprobante de pago</div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>Arrastra la imagen aquí o haz clic para seleccionarla</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#ede9fe", borderRadius: "99px", padding: "5px 14px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#7c3aed" }}>JPG o PNG · hasta 10 MB</span>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Submit ── */}
      <div style={{ position: "sticky", bottom: "24px" }}>
        {!canSubmit && (
          <div style={{ textAlign: "center", fontSize: "13px", color: "#9ca3af", marginBottom: "8px" }}>
            {selectedTemplates.size < requiredAdditional
              ? `Selecciona ${requiredAdditional - selectedTemplates.size} plantilla${requiredAdditional - selectedTemplates.size === 1 ? "" : "s"} más`
              : !paymentFile
              ? "Sube el comprobante de pago para continuar"
              : ""}
          </div>
        )}
        <button
          disabled={!canSubmit || submitting}
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "16px",
            border: "none",
            background: canSubmit && !submitting ? "#8b5cf6" : "#d1d5db",
            color: canSubmit && !submitting ? "#fff" : "#9ca3af",
            fontSize: "18px",
            fontWeight: 800,
            cursor: canSubmit && !submitting ? "pointer" : "not-allowed",
            fontFamily: "inherit",
            transition: "all 0.15s",
            boxShadow: canSubmit && !submitting ? "0 4px 12px rgba(139,92,246,0.3)" : "none",
          }}
        >
          {submitting ? "Enviando pedido..." : `Confirmar pedido · ${formatPrice(totalDisplay)}`}
        </button>
      </div>

    </div>
  );
}
