"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { getCheckoutInfo, submitCheckout, type CheckoutInfo } from "@/lib/api/checkout";
import ProposalBook from "@/components/ProposalBook";
import TemplateBook from "@/components/TemplateBook";
import { useWindowSize } from "@/hooks/useWindowSize";

const STANDARD_ADDITIONAL = 12;
const PREMIUM_ADDITIONAL = 17;
const EXTRA_PRICE_CENTS = 5000;

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

function SuccessScreen({ totalCents, currency }: { totalCents: number; currency: string }) {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
      <div style={{ fontSize: "56px", marginBottom: "16px" }}>✅</div>
      <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#065f46", marginBottom: "12px" }}>¡Pedido confirmado!</h1>
      <p style={{ fontSize: "16px", color: "#6b7280", lineHeight: 1.6, marginBottom: "16px" }}>
        Tu comprobante de pago fue recibido correctamente. Nuestro equipo lo revisará y te contactaremos
        por correo electrónico con la confirmación.
      </p>
      <div style={{ fontSize: "32px", fontWeight: 900, color: "#111" }}>
        {formatPrice(totalCents)} {currency}
      </div>
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
        if (info.hasPaymentProof) setSubmitted(true);
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
  const extraAmount = pkg === "PREMIUM" ? EXTRA_PRICE_CENTS : 0;
  const totalDisplay = baseAmount + extraAmount;

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
  if (submitted) return <SuccessScreen totalCents={submittedTotal || totalDisplay} currency={data.currency} />;

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px", fontFamily: "inherit" }}>

      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
          Completá tu pedido
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
          {!isMobile && " Hojealas usando las flechas o arrastrando las esquinas."}
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
          Elegí tus plantillas
        </h2>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px" }}>
          Para completar tu libro necesitás seleccionar plantillas adicionales del catálogo.
        </p>

        {/* Package selector */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
          {/* STANDARD */}
          <div
            onClick={() => { setPkg("STANDARD"); setSelectedTemplates(new Set()); }}
            style={{
              borderRadius: "16px",
              border: pkg === "STANDARD" ? "2px solid #8b5cf6" : "2px solid #e5e7eb",
              padding: "20px",
              cursor: "pointer",
              background: pkg === "STANDARD" ? "#f5f3ff" : "#fff",
              transition: "all 0.15s",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "4px" }}>Estándar</div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "12px" }}>15 plantillas en total</div>
            <div style={{ fontSize: "22px", fontWeight: 900, color: "#111" }}>
              {formatPrice(data.baseAmountCents)}
            </div>
            <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>
              Seleccioná {STANDARD_ADDITIONAL} plantillas más
            </div>
          </div>

          {/* PREMIUM */}
          <div
            onClick={() => { setPkg("PREMIUM"); setSelectedTemplates(new Set()); }}
            style={{
              borderRadius: "16px",
              border: pkg === "PREMIUM" ? "2px solid #8b5cf6" : "2px solid #e5e7eb",
              padding: "20px",
              cursor: "pointer",
              background: pkg === "PREMIUM" ? "#f5f3ff" : "#fff",
              transition: "all 0.15s",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: "-1px", right: "16px", background: "#8b5cf6", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "0 0 8px 8px" }}>
              PREMIUM
            </div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "4px" }}>Premium</div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "12px" }}>20 plantillas en total</div>
            <div style={{ fontSize: "22px", fontWeight: 900, color: "#111" }}>
              {formatPrice(data.baseAmountCents + EXTRA_PRICE_CENTS)}
            </div>
            <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>
              Seleccioná {PREMIUM_ADDITIONAL} plantillas más
            </div>
          </div>
        </div>

        {/* Template counter */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div style={{ fontSize: "14px", color: "#374151", fontWeight: 600 }}>
            {selectedTemplates.size === requiredAdditional ? "¡Listo! Ya elegiste todas" : "Hojéa y elegí tus plantillas"}
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
          Realizá el pago y subí la captura del comprobante.
        </p>

        {/* Amount breakdown */}
        <div style={{ background: "#f9fafb", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "20px", marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: pkg === "PREMIUM" ? "8px" : "0", fontSize: "15px", color: "#374151" }}>
            <span>Libro personalizado</span>
            <span style={{ fontWeight: 600 }}>{formatPrice(data.baseAmountCents)}</span>
          </div>
          {pkg === "PREMIUM" && (
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "15px", color: "#374151" }}>
              <span>5 plantillas adicionales</span>
              <span style={{ fontWeight: 600 }}>+{formatPrice(EXTRA_PRICE_CENTS)}</span>
            </div>
          )}
          {pkg === "PREMIUM" && (
            <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "12px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "17px", fontWeight: 700, color: "#111" }}>Total</span>
              <span style={{ fontSize: "22px", fontWeight: 900, color: "#111" }}>{formatPrice(totalDisplay)}</span>
            </div>
          )}
          {pkg !== "PREMIUM" && (
            <div style={{ textAlign: "right", fontSize: "22px", fontWeight: 900, color: "#111", marginTop: "4px" }}>
              {formatPrice(totalDisplay)}
            </div>
          )}
        </div>

        {/* QR placeholder */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "24px", textAlign: "center", marginBottom: "20px" }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 700, color: "#111" }}>Pagá con Yape</h3>
          <div style={{ width: "180px", height: "180px", margin: "0 auto 12px", borderRadius: "12px", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontSize: "13px", border: "2px dashed #d1d5db" }}>
            QR Yape (próximamente)
          </div>
          <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
            Pagá {formatPrice(totalDisplay)} y subí la captura abajo
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
        <div
          onClick={() => fileRef.current?.click()}
          style={{
            border: paymentFile ? "2px solid #059669" : "2px dashed #d1d5db",
            borderRadius: "16px",
            padding: "24px",
            textAlign: "center",
            cursor: "pointer",
            background: paymentFile ? "#f0fdf4" : "#fafafa",
            transition: "all 0.15s",
          }}
        >
          {paymentFile ? (
            <>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>✅</div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#059669" }}>{paymentFile.name}</div>
              <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>Hacé click para cambiar</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>📎</div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#374151" }}>Subir comprobante</div>
              <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>JPG, PNG — hasta 10 MB</div>
            </>
          )}
        </div>
      </section>

      {/* ── Submit ── */}
      <div style={{ position: "sticky", bottom: "24px" }}>
        {!canSubmit && (
          <div style={{ textAlign: "center", fontSize: "13px", color: "#9ca3af", marginBottom: "8px" }}>
            {selectedTemplates.size < requiredAdditional
              ? `Seleccioná ${requiredAdditional - selectedTemplates.size} plantilla${requiredAdditional - selectedTemplates.size === 1 ? "" : "s"} más`
              : !paymentFile
              ? "Subí el comprobante de pago para continuar"
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
