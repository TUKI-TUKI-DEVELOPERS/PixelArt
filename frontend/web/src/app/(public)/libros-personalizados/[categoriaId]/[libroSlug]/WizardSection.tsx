"use client";

import React, { useState, useEffect } from "react";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import { CheckCircle2 } from "lucide-react";
import TemplateBook from "@/components/TemplateBook";
import { useWindowSize } from "@/hooks/useWindowSize";
import WizardBackground from "@/components/backgrounds/WizardBackground";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type ActivePromo = { label: string; targetType: string; targetId: number | null; discountType: string; discountValue: number };

function applyBestPromo(priceCents: number, promos: ActivePromo[], catalogBookId?: number): number | undefined {
  const applicable = promos.filter((p) =>
    p.targetType === "all" ||
    (p.targetType === "model" && catalogBookId !== undefined && p.targetId === catalogBookId)
  );
  if (!applicable.length) return undefined;
  let best = priceCents;
  for (const p of applicable) {
    const result = p.discountType === "percent"
      ? Math.round(priceCents * (1 - p.discountValue / 100))
      : Math.max(0, priceCents - p.discountValue);
    if (result < best) best = result;
  }
  return best < priceCents ? best : undefined;
}

const NEW_STEPS = [
  { number: 1, title: "Sube tus Fotos" },
  { number: 2, title: "Elige Plantillas" },
  { number: 3, title: "Tus Datos" },
  { number: 4, title: "Resumen" },
  { number: 5, title: "Enviar" },
];

type VariantProp = { id: number; coverType: string; basePriceCents: number };
type TemplateProp = { id: number; name: string | null; previewUrl: string };
type DbIdsProp = { catalogBookId: number; personalizedModelId: number; personalizedCategoryId: number } | null;

type Props = {
  accent: string;
  dbIds: DbIdsProp;
  variants: VariantProp[];
  templates: TemplateProp[];
  libroNombre: string;
};

function formatPrice(cents: number) {
  return `S/ ${(cents / 100).toFixed(2)}`;
}

export default function WizardSection({ accent, dbIds, variants, templates, libroNombre }: Props) {
  const { isMobile } = useWindowSize();
  const [currentStep, setCurrentStep] = useState(0);
  const [promos, setPromos] = useState<ActivePromo[]>([]);
  const { photos, uploading, progress, uploadFiles, removePhoto } = usePhotoUpload("uploads/customers");

  useEffect(() => {
    fetch(`${API_BASE}/api/promotions/active`)
      .then((r) => r.ok ? r.json() : [])
      .then(setPromos)
      .catch(() => {});
  }, []);

  const activeGlobalPromo = promos.find(
    (p) => p.targetType === "all" ||
      (p.targetType === "model" && dbIds !== null && p.targetId === dbIds.catalogBookId)
  );

  // Step 2: template selection
  const [selectedTemplates, setSelectedTemplates] = useState<number[]>([]);

  // Step 3: form data
  const [selectedPackage, setSelectedPackage] = useState<"STANDARD" | "PREMIUM">("STANDARD");
  const EXTRA_PLANTILLAS_CENTS = 4000; // S/ 40.00 — de 10 a 15 plantillas
  const [wantsRush, setWantsRush] = useState(false);

  const RUSH_FEE_CENTS = 2500;
  const MIN_NORMAL_DAYS = 4;
  const MIN_RUSH_DAYS = 2;

  function getMinDate(rush: boolean) {
    const d = new Date();
    d.setDate(d.getDate() + (rush ? MIN_RUSH_DAYS : MIN_NORMAL_DAYS));
    return d.toISOString().split("T")[0];
  }

  function getMaxDate(rush: boolean) {
    if (!rush) return undefined;
    const d = new Date();
    d.setDate(d.getDate() + MIN_NORMAL_DAYS - 1);
    return d.toISOString().split("T")[0];
  }

  const [form, setForm] = useState({
    customerFullName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddressLine1: "",
    shippingAddressLine2: "",
    shippingCity: "",
    shippingRegion: "",
    shippingReference: "",
    deliveryDate: "",
    wantsCustomDedication: false,
    dedicationText: "",
    messageOptional: "",
    selectedVariantId: variants[0]?.id ?? 0,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function updateForm(field: string, value: string | boolean | number) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function toggleTemplate(id: number) {
    setSelectedTemplates((prev) => {
      if (prev.includes(id)) return prev.filter((t) => t !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  async function handleSubmit() {
    if (!dbIds) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(`${API_BASE}/api/demo/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          catalogBookId: dbIds.catalogBookId,
          catalogBookVariantId: form.selectedVariantId,
          personalizedCategoryId: dbIds.personalizedCategoryId,
          personalizedModelId: dbIds.personalizedModelId,
          customerFullName: form.customerFullName,
          customerEmail: form.customerEmail,
          customerPhone: form.customerPhone,
          shippingAddressLine1: form.shippingAddressLine1,
          shippingAddressLine2: form.shippingAddressLine2 || null,
          shippingCity: form.shippingCity || null,
          shippingRegion: form.shippingRegion || null,
          shippingReference: form.shippingReference || null,
          deliveryDate: form.deliveryDate,
          wantsRush,
          packagePreference: selectedPackage,
          wantsCustomDedication: form.wantsCustomDedication,
          dedicationText: form.wantsCustomDedication ? form.dedicationText : null,
          messageOptional: form.messageOptional || null,
          templateIds: selectedTemplates,
          assetIds: photos.map((p) => p.id),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Error al enviar" }));
        throw new Error(err.message);
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Error al enviar");
    } finally {
      setSubmitting(false);
    }
  }

  const selectedVariant = variants.find((v) => v.id === form.selectedVariantId);

  return (
    <section id="wizard-section" style={{
      width: "100%",
      position: "relative",
      overflow: "hidden",
      background: "#ffffff",
    }}>
      <WizardBackground accent={accent} />
    <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: isMobile ? "40px 16px" : "80px 48px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: `${accent}12`,
          border: `1px solid ${accent}30`,
          borderRadius: "20px",
          padding: "5px 14px",
          marginBottom: "16px",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill={accent} xmlns="http://www.w3.org/2000/svg">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
          <span style={{ fontSize: "11px", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "1px" }}>Solo 5 pasos</span>
        </div>
        <h2 style={{ margin: "0 0 12px 0", fontSize: isMobile ? "28px" : "40px", fontWeight: 800, color: "#111", letterSpacing: "-0.5px" }}>
          Crea tu libro personalizado
        </h2>
        <p style={{ margin: 0, fontSize: "16px", color: "#666", lineHeight: 1.5 }}>
          Un proceso simple, guiado paso a paso. Nosotros hacemos el resto.
        </p>
      </div>

      {/* Step indicators */}
      {!submitted && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", marginBottom: "40px" }}>
          {NEW_STEPS.map((step, idx) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            return (
              <div key={step.number} style={{ display: "flex", alignItems: "flex-start" }}>
                {/* Step bubble + label */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <button
                    onClick={() => step.number <= currentStep && setCurrentStep(step.number)}
                    style={{
                      width: isMobile ? "36px" : "44px",
                      height: isMobile ? "36px" : "44px",
                      borderRadius: "50%",
                      border: "none",
                      background: isActive ? accent : isCompleted ? accent : "#e5e7eb",
                      cursor: step.number <= currentStep ? "pointer" : "default",
                      fontFamily: "inherit",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: isActive ? `0 0 0 4px ${accent}28` : "none",
                      transition: "all 0.3s ease",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: "13px", fontWeight: 700, color: isActive || isCompleted ? "#fff" : "#aaa" }}>
                      {isCompleted ? "✓" : step.number}
                    </span>
                  </button>
                  {!isMobile && (
                    <span style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: isActive ? accent : isCompleted ? accent : "#bbb",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      whiteSpace: "nowrap",
                    }}>
                      {step.title}
                    </span>
                  )}
                </div>

                {/* Connector line */}
                {idx < NEW_STEPS.length - 1 && (
                  <div style={{
                    width: isMobile ? "20px" : "40px",
                    height: "2px",
                    marginTop: isMobile ? "17px" : "21px",
                    flexShrink: 0,
                    background: "#e5e7eb",
                    position: "relative",
                    overflow: "hidden",
                    marginInline: isMobile ? "4px" : "6px",
                  }}>
                    <div style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: "100%",
                      width: isCompleted ? "100%" : "0%",
                      background: accent,
                      transition: "width 0.4s ease",
                    }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Content */}
      <div style={{ background: "#fff", borderRadius: "24px", border: "1px solid #ebebeb", padding: isMobile ? "24px 16px" : "48px", minHeight: "350px", boxShadow: "0 4px 32px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)" }}>

        {/* Step 0: Start */}
        {currentStep === 0 && (
          <div style={{ textAlign: "center", padding: isMobile ? "24px 0 32px" : "32px 0 48px" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)",
              gap: "12px",
              marginBottom: "36px",
            }}>
              {([
                {
                  label: "Sube tus fotos",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                  ),
                },
                {
                  label: "Elige escenarios",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" />
                      <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    </svg>
                  ),
                },
                {
                  label: "Completa tus datos",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  ),
                },
                {
                  label: "Revisa el resumen",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                      <rect x="9" y="3" width="6" height="4" rx="1" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  ),
                },
                {
                  label: "Envía tu solicitud",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  ),
                },
              ] as { label: string; icon: React.ReactNode }[]).map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fafafa",
                    borderRadius: "16px",
                    padding: "20px 12px",
                    border: "1px solid #f0f0f0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div style={{
                    width: "48px", height: "48px",
                    borderRadius: "14px",
                    background: `${accent}12`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {s.icon}
                  </div>
                  <span style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#555",
                    lineHeight: 1.4,
                    textAlign: "center",
                  }}>
                    {s.label}
                  </span>
                  <span style={{
                    width: "22px", height: "22px",
                    borderRadius: "50%",
                    background: `${accent}18`,
                    fontSize: "11px",
                    fontWeight: 700,
                    color: accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>
            {activeGlobalPromo && (
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "#fef3c7", border: "1px solid #fbbf24",
                borderRadius: "12px", padding: "10px 20px", marginBottom: "20px",
                fontSize: "14px", fontWeight: 700, color: "#92400e",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {activeGlobalPromo.label} — {activeGlobalPromo.discountType === "percent"
                  ? `${activeGlobalPromo.discountValue}% OFF`
                  : `S/ ${(activeGlobalPromo.discountValue / 100).toFixed(2)} de descuento`} aplicado
              </div>
            )}
            <button
              onClick={() => setCurrentStep(1)}
              style={{
                padding: "15px 44px",
                borderRadius: "14px",
                border: "none",
                background: accent,
                color: "#fff",
                fontSize: "16px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: `0 6px 24px ${accent}40`,
                transition: "transform 0.15s ease",
              }}
            >
              Comenzar ahora
            </button>
          </div>
        )}

        {/* Step 1: Upload photos */}
        {currentStep === 1 && (() => {
          const MAX_PHOTOS = 5;
          const remaining = MAX_PHOTOS - photos.length;
          const atLimit = photos.length >= MAX_PHOTOS;
          return (
            <div>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "24px", fontWeight: 600 }}>1. Sube tus fotos</h3>
              <p style={{ margin: "0 0 20px 0", fontSize: "14px", color: "#666" }}>Sube fotos tuyas y de tu pareja, mascota o familiar. Fotos claras, diferentes ángulos, buena iluminación. Máximo 5 fotos.</p>

              {/* Drop zone */}
              <div
                onClick={() => {
                  if (atLimit) return;
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.multiple = true;
                  input.onchange = (e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files) uploadFiles(Array.from(files).slice(0, remaining));
                  };
                  input.click();
                }}
                style={{ width: "100%", minHeight: "140px", borderRadius: "16px", border: `2px dashed ${atLimit ? "#c0c0c0" : "#d0d0d0"}`, background: atLimit ? "#f0f0f0" : "#fafafa", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", padding: "28px", cursor: atLimit ? "not-allowed" : "pointer", marginBottom: "16px", opacity: atLimit ? 0.6 : 1 }}
              >
                <div style={{ fontSize: "28px" }}>{atLimit ? "✓" : "+"}</div>
                <div style={{ fontSize: "15px", fontWeight: 600, color: "#555" }}>{atLimit ? "Límite alcanzado" : "Agregar Fotos"}</div>
                <div style={{ fontSize: "12px", color: "#999" }}>{atLimit ? "Elimina una foto para agregar otra" : "Arrastra o haz clic"}</div>
              </div>

              {uploading && (
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ height: "4px", borderRadius: "2px", background: "#eee", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${progress}%`, background: accent, transition: "width 0.3s ease" }} />
                  </div>
                  <div style={{ fontSize: "12px", color: "#999", marginTop: "4px" }}>Subiendo... {progress}%</div>
                </div>
              )}

              {photos.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "10px", marginBottom: "16px" }}>
                  {photos.map((p) => (
                    <div key={p.contentHash} style={{ position: "relative", aspectRatio: "1", borderRadius: "10px", overflow: "hidden", border: "1px solid #eee" }}>
                      <img src={p.preview} alt={p.originalFilename} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <button onClick={() => removePhoto(p.contentHash)} style={{ position: "absolute", top: "4px", right: "4px", width: "22px", height: "22px", borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>x</button>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ fontSize: "13px", color: atLimit ? "#22c55e" : "#888", fontWeight: atLimit ? 600 : 400, marginBottom: "20px" }}>
                {photos.length} / {MAX_PHOTOS} fotos{atLimit ? " — máximo alcanzado" : ""}
              </div>

              <button disabled={photos.length === 0} onClick={() => setCurrentStep(2)} style={{ padding: "12px 28px", borderRadius: "10px", border: "none", background: photos.length > 0 ? accent : "#e0e0e0", color: photos.length > 0 ? "#fff" : "#999", fontSize: "15px", fontWeight: 700, cursor: photos.length > 0 ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
                Siguiente
              </button>
            </div>
          );
        })()}

        {/* Step 2: Select templates — Book page-flip */}
        {currentStep === 2 && (
          <div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "24px", fontWeight: 600 }}>2. Elige 3 escenarios</h3>
            <p style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#666" }}>
              Hojea el libro y haz clic en las páginas para seleccionar hasta 3 escenarios.
            </p>
            <div style={{ fontSize: "13px", color: selectedTemplates.length === 3 ? "#22c55e" : "#888", fontWeight: selectedTemplates.length === 3 ? 600 : 400, marginBottom: "24px", display: "flex", alignItems: "center", gap: "6px" }}>
              {selectedTemplates.length === 3 && <CheckCircle2 size={16} />}
              {selectedTemplates.length}/3 seleccionadas {selectedTemplates.length === 3 && "— Listo"}
            </div>


            <TemplateBook
              templates={templates}
              selectedIds={selectedTemplates}
              maxSelections={3}
              accent={accent}
              onToggle={toggleTemplate}
            />

            <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row", justifyContent: "center", marginTop: "28px" }}>
              <button onClick={() => setCurrentStep(1)} style={{ padding: "12px 28px", borderRadius: "10px", border: `1px solid ${accent}`, background: "#fff", color: accent, fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Anterior</button>
              <button disabled={selectedTemplates.length < 3} onClick={() => setCurrentStep(3)} style={{ padding: "12px 28px", borderRadius: "10px", border: "none", background: selectedTemplates.length === 3 ? accent : "#e0e0e0", color: selectedTemplates.length === 3 ? "#fff" : "#999", fontSize: "15px", fontWeight: 700, cursor: selectedTemplates.length === 3 ? "pointer" : "not-allowed", fontFamily: "inherit" }}>Siguiente</button>
            </div>
          </div>
        )}

        {/* Step 3: Form */}
        {currentStep === 3 && (
          <div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "24px", fontWeight: 600 }}>3. Tus datos</h3>
            <p style={{ margin: "0 0 20px 0", fontSize: "14px", color: "#666" }}>Completa tus datos para la entrega y personalización del libro.</p>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <FormField label="Nombre completo *" value={form.customerFullName} onChange={(v) => updateForm("customerFullName", v)} isMobile={isMobile} />
              <FormField label="Email *" value={form.customerEmail} onChange={(v) => updateForm("customerEmail", v)} type="email" isMobile={isMobile} />
              <FormField label="Teléfono *" value={form.customerPhone} onChange={(v) => updateForm("customerPhone", v)} type="tel" isMobile={isMobile} />
              {/* Tipo de entrega */}
              <div style={{ gridColumn: isMobile ? undefined : "span 2" }}>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#333", marginBottom: "10px" }}>Tipo de entrega *</div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "10px" }}>
                  {/* Normal */}
                  <button
                    type="button"
                    onClick={() => { setWantsRush(false); updateForm("deliveryDate", ""); }}
                    style={{
                      padding: "16px", borderRadius: "14px", textAlign: "left", cursor: "pointer",
                      border: !wantsRush ? `2px solid ${accent}` : "2px solid #e5e7eb",
                      background: !wantsRush ? `${accent}08` : "#fff",
                      fontFamily: "inherit", transition: "all 0.2s ease",
                      boxShadow: !wantsRush ? `0 4px 16px ${accent}18` : "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span style={{ fontSize: "18px" }}>📦</span>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: !wantsRush ? accent : "#333" }}>Entrega normal</span>
                      {!wantsRush && <span style={{ marginLeft: "auto", fontSize: "12px", background: accent, color: "#fff", borderRadius: "6px", padding: "2px 8px", fontWeight: 700 }}>Seleccionado</span>}
                    </div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{MIN_NORMAL_DAYS} días hábiles</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#333", marginTop: "4px" }}>Sin recargo adicional</div>
                  </button>

                  {/* Express */}
                  <button
                    type="button"
                    onClick={() => { setWantsRush(true); updateForm("deliveryDate", ""); }}
                    style={{
                      padding: "16px", borderRadius: "14px", textAlign: "left", cursor: "pointer",
                      border: wantsRush ? `2px solid ${accent}` : "2px solid #e5e7eb",
                      background: wantsRush ? `${accent}08` : "#fff",
                      fontFamily: "inherit", transition: "all 0.2s ease",
                      boxShadow: wantsRush ? `0 4px 16px ${accent}18` : "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span style={{ fontSize: "18px" }}>⚡</span>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: wantsRush ? accent : "#333" }}>Entrega express</span>
                      {wantsRush && <span style={{ marginLeft: "auto", fontSize: "12px", background: accent, color: "#fff", borderRadius: "6px", padding: "2px 8px", fontWeight: 700 }}>Seleccionado</span>}
                    </div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{MIN_RUSH_DAYS} días hábiles</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#e74c6f", marginTop: "4px" }}>+S/ {(RUSH_FEE_CENTS / 100).toFixed(2)} recargo</div>
                  </button>
                </div>
                <div style={{
                  display: "flex", alignItems: "flex-start", gap: "8px",
                  marginTop: "10px", padding: "10px 14px",
                  background: "#fffbeb", border: "1px solid #fde68a",
                  borderRadius: "10px", fontSize: "12px", color: "#92400e", lineHeight: 1.5,
                }}>
                  <span style={{ fontSize: "14px", flexShrink: 0 }}>📍</span>
                  <span>
                    El envío se realiza desde <strong>Lima</strong>. Para zonas alejadas, los tiempos pueden variar.
                    Nuestro equipo se comunicará contigo para coordinar la entrega.
                  </span>
                </div>
              </div>

              <FormField
                label="Fecha de entrega deseada *"
                value={form.deliveryDate}
                onChange={(v) => updateForm("deliveryDate", v)}
                type="date"
                isMobile={isMobile}
                min={getMinDate(wantsRush)}
                max={getMaxDate(wantsRush)}
              />
              <FormField label="Dirección *" value={form.shippingAddressLine1} onChange={(v) => updateForm("shippingAddressLine1", v)} fullWidth isMobile={isMobile} />
              <FormField label="Dirección línea 2" value={form.shippingAddressLine2} onChange={(v) => updateForm("shippingAddressLine2", v)} isMobile={isMobile} />
              <FormField label="Ciudad" value={form.shippingCity} onChange={(v) => updateForm("shippingCity", v)} isMobile={isMobile} />
              <FormField label="Región" value={form.shippingRegion} onChange={(v) => updateForm("shippingRegion", v)} isMobile={isMobile} />
              <FormField label="Referencia" value={form.shippingReference} onChange={(v) => updateForm("shippingReference", v)} fullWidth isMobile={isMobile} />
            </div>

            {/* Cantidad de plantillas */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#333", marginBottom: "10px" }}>Cantidad de plantillas *</div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "10px" }}>
                {(["STANDARD", "PREMIUM"] as const).map((pkg) => {
                  const isSelected = selectedPackage === pkg;
                  const baseCents = selectedVariant?.basePriceCents ?? 0;
                  const priceCents = pkg === "PREMIUM" ? baseCents + EXTRA_PLANTILLAS_CENTS : baseCents;
                  const promoBase = applyBestPromo(baseCents, promos, dbIds?.catalogBookId);
                  const displayCents = promoBase !== undefined
                    ? (pkg === "PREMIUM" ? promoBase + EXTRA_PLANTILLAS_CENTS : promoBase)
                    : priceCents;
                  return (
                    <button
                      key={pkg}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      style={{
                        padding: "16px", borderRadius: "14px", textAlign: "left", cursor: "pointer",
                        border: isSelected ? `2px solid ${accent}` : "2px solid #e5e7eb",
                        background: isSelected ? `${accent}08` : "#fff",
                        fontFamily: "inherit", transition: "all 0.2s ease",
                        boxShadow: isSelected ? `0 4px 16px ${accent}18` : "none",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                        {pkg === "STANDARD" ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isSelected ? accent : "#555"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                            <path d="M3 9h18"/>
                            <path d="M9 21V9"/>
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isSelected ? accent : "#555"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                            <path d="M12 6h4M12 10h4M12 14h4"/>
                          </svg>
                        )}
                        <span style={{ fontSize: "14px", fontWeight: 700, color: isSelected ? accent : "#333" }}>
                          {pkg === "STANDARD" ? "10 plantillas" : "15 plantillas"}
                        </span>
                        {isSelected && <span style={{ marginLeft: "auto", fontSize: "12px", background: accent, color: "#fff", borderRadius: "6px", padding: "2px 8px", fontWeight: 700 }}>Seleccionado</span>}
                      </div>
                      <div style={{ fontSize: "12px", color: "#888" }}>
                        {pkg === "STANDARD" ? "Paquete base" : "5 escenarios adicionales"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tipo de tapa */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#333", marginBottom: "8px" }}>Tipo de tapa *</div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {variants.map((v) => {
                  const promoPrice = applyBestPromo(v.basePriceCents, promos, dbIds?.catalogBookId);
                  return (
                    <button
                      key={v.id}
                      onClick={() => updateForm("selectedVariantId", v.id)}
                      style={{
                        padding: "10px 16px", borderRadius: "10px",
                        border: form.selectedVariantId === v.id ? `2px solid ${accent}` : "1px solid #e5e7eb",
                        background: form.selectedVariantId === v.id ? `${accent}10` : "#fff",
                        cursor: "pointer", fontFamily: "inherit", fontSize: "13px",
                      }}
                    >
                      <div style={{ fontWeight: 600, color: form.selectedVariantId === v.id ? accent : "#333" }}>{v.coverType.replace("TAPA_", "Tapa ")}</div>
                      <div style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>
                        {v.coverType === "TAPA_DELGADA" ? "Cartulina estándar" : "Tapa dura resistente"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Precio consolidado */}
            {(() => {
              const baseCents = selectedVariant?.basePriceCents ?? 0;
              const promoBase = applyBestPromo(baseCents, promos, dbIds?.catalogBookId);
              const effectiveBase = promoBase ?? baseCents;
              const extraCents = selectedPackage === "PREMIUM" ? EXTRA_PLANTILLAS_CENTS : 0;
              const totalCents = effectiveBase + extraCents + (wantsRush ? RUSH_FEE_CENTS : 0);
              return (
                <div style={{
                  marginBottom: "20px", padding: "16px 20px",
                  borderRadius: "14px", border: `1.5px solid ${accent}30`,
                  background: `${accent}06`,
                  display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px",
                }}>
                  <div>
                    <div style={{ fontSize: "12px", color: "#888", marginBottom: "2px" }}>Precio estimado</div>
                    <div style={{ fontSize: "13px", color: "#555" }}>
                      {selectedVariant?.coverType.replace("TAPA_", "Tapa ")} · {selectedPackage === "PREMIUM" ? "15 plantillas" : "10 plantillas"}
                      {wantsRush ? " · Express" : ""}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    {promoBase !== undefined && (
                      <div style={{ fontSize: "12px", color: "#aaa", textDecoration: "line-through" }}>
                        {formatPrice(baseCents + extraCents + (wantsRush ? RUSH_FEE_CENTS : 0))}
                      </div>
                    )}
                    <div style={{ fontSize: "26px", fontWeight: 900, color: accent, lineHeight: 1 }}>
                      {formatPrice(totalCents)}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Dedicatoria */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 600, color: "#333", cursor: "pointer" }}>
                <input type="checkbox" checked={form.wantsCustomDedication} onChange={(e) => updateForm("wantsCustomDedication", e.target.checked)} />
                Quiero dedicatoria personalizada
              </label>
              {form.wantsCustomDedication && (
                <textarea
                  value={form.dedicationText}
                  onChange={(e) => updateForm("dedicationText", e.target.value)}
                  placeholder="Escribe tu dedicatoria..."
                  style={{ width: "100%", minHeight: "80px", padding: "12px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit", resize: "vertical", marginTop: "10px" }}
                />
              )}
            </div>

            {/* Mensaje opcional */}
            <FormField label="Mensaje adicional (opcional)" value={form.messageOptional} onChange={(v) => updateForm("messageOptional", v)} fullWidth isMobile={isMobile} />

            <div style={{ display: "flex", gap: "12px", marginTop: "20px", flexDirection: isMobile ? "column" : "row" }}>
              <button onClick={() => setCurrentStep(2)} style={{ padding: "12px 28px", borderRadius: "10px", border: `1px solid ${accent}`, background: "#fff", color: accent, fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Anterior</button>
              <button
                disabled={!form.customerFullName || !form.customerEmail || !form.customerPhone || !form.shippingAddressLine1 || !form.deliveryDate}
                onClick={() => setCurrentStep(4)}
                style={{ padding: "12px 28px", borderRadius: "10px", border: "none", background: form.customerFullName && form.customerEmail ? accent : "#e0e0e0", color: form.customerFullName && form.customerEmail ? "#fff" : "#999", fontSize: "15px", fontWeight: 700, cursor: form.customerFullName ? "pointer" : "not-allowed", fontFamily: "inherit" }}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Summary */}
        {currentStep === 4 && (
          <div>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "24px", fontWeight: 600 }}>4. Resumen de tu solicitud</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
              <SummaryRow label="Libro" value={libroNombre} />
              <SummaryRow label="Fotos subidas" value={`${photos.length} fotos`} />
              <SummaryRow label="Plantillas" value={selectedTemplates.map((id) => templates.find((p) => p.id === id)?.name ?? `#${id}`).join(", ")} />
              <SummaryRow
                label="Cantidad"
                value={selectedPackage === "PREMIUM" ? "15 plantillas" : "10 plantillas"}
              />
              <SummaryRow label="Tapa" value={selectedVariant ? selectedVariant.coverType.replace("TAPA_", "Tapa ") : "—"} />
              <SummaryRow label="Cliente" value={form.customerFullName} />
              <SummaryRow label="Email" value={form.customerEmail} />
              <SummaryRow label="Teléfono" value={form.customerPhone} />
              <SummaryRow label="Dirección" value={`${form.shippingAddressLine1}${form.shippingCity ? `, ${form.shippingCity}` : ""}`} />
              <SummaryRow label="Tipo de entrega" value={wantsRush ? "Express" : "Normal"} />
              <SummaryRow label="Fecha de entrega deseada" value={form.deliveryDate} />
              <SummaryRow label="Dedicatoria" value={form.wantsCustomDedication ? (form.dedicationText || "Sí") : "No"} />
            </div>

            {/* Precio total consolidado */}
            {(() => {
              const baseCents = selectedVariant?.basePriceCents ?? 0;
              const promoBase = applyBestPromo(baseCents, promos, dbIds?.catalogBookId);
              const effectiveBase = promoBase ?? baseCents;
              const extraCents = selectedPackage === "PREMIUM" ? EXTRA_PLANTILLAS_CENTS : 0;
              const totalCents = effectiveBase + extraCents + (wantsRush ? RUSH_FEE_CENTS : 0);
              const originalTotal = baseCents + extraCents + (wantsRush ? RUSH_FEE_CENTS : 0);
              return (
                <div style={{
                  padding: "20px 24px", borderRadius: "14px",
                  border: `2px solid ${accent}40`, background: `${accent}06`,
                  marginBottom: "24px",
                }}>
                  <div style={{ fontSize: "13px", color: "#888", marginBottom: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Precio total</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#555" }}>
                      <span>{selectedVariant?.coverType.replace("TAPA_", "Tapa ")} · {selectedPackage === "PREMIUM" ? "15 plantillas" : "10 plantillas"}</span>
                      <span>{formatPrice(effectiveBase + extraCents)}</span>
                    </div>
                    {wantsRush && (
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#555" }}>
                        <span>Entrega express</span>
                        <span>+{formatPrice(RUSH_FEE_CENTS)}</span>
                      </div>
                    )}
                  </div>
                  <div style={{ borderTop: `1px solid ${accent}20`, paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "#333" }}>Total estimado</span>
                    <div style={{ textAlign: "right" }}>
                      {promoBase !== undefined && (
                        <div style={{ fontSize: "13px", color: "#aaa", textDecoration: "line-through" }}>{formatPrice(originalTotal)}</div>
                      )}
                      <div style={{ fontSize: "28px", fontWeight: 900, color: accent }}>{formatPrice(totalCents)}</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexDirection: isMobile ? "column" : "row" }}>
              <button onClick={() => setCurrentStep(3)} style={{ padding: "12px 28px", borderRadius: "10px", border: `1px solid ${accent}`, background: "#fff", color: accent, fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Anterior</button>
              <button onClick={() => setCurrentStep(5)} style={{ padding: "12px 28px", borderRadius: "10px", border: "none", background: accent, color: "#fff", fontSize: "15px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Confirmar y Enviar</button>
            </div>
          </div>
        )}

        {/* Step 5: Submit */}
        {currentStep === 5 && !submitted && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </div>
            <h3 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "12px" }}>¿Listo para enviar tu solicitud?</h3>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
              Tu solicitud será revisada por nuestro equipo y recibirás las propuestas en tu correo.
            </p>
            {submitError && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "12px", color: "#991b1b", fontSize: "14px", marginBottom: "16px" }}>{submitError}</div>
            )}
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexDirection: isMobile ? "column" : "row" }}>
              <button onClick={() => setCurrentStep(4)} style={{ padding: "12px 28px", borderRadius: "10px", border: `1px solid ${accent}`, background: "#fff", color: accent, fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Volver</button>
              <button disabled={submitting} onClick={handleSubmit} style={{ padding: "14px 36px", borderRadius: "10px", border: "none", background: submitting ? "#ccc" : accent, color: "#fff", fontSize: "16px", fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
                {submitting ? "Enviando..." : "Enviar Solicitud"}
              </button>
            </div>
          </div>
        )}

        {/* Success */}
        {submitted && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>
            <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#065f46", marginBottom: "12px" }}>¡Solicitud enviada!</h3>
            <p style={{ fontSize: "16px", color: "#666", maxWidth: "500px", margin: "0 auto" }}>
              Tu solicitud de demo fue enviada correctamente. Nuestro equipo preparará las propuestas y las recibirás en <strong>{form.customerEmail}</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
    </section>
  );
}

/* ── Helper components ── */

function FormField({ label, value, onChange, type = "text", fullWidth, isMobile, min, max }: { label: string; value: string; onChange: (v: string) => void; type?: string; fullWidth?: boolean; isMobile?: boolean; min?: string; max?: string }) {
  return (
    <div style={{ gridColumn: fullWidth && !isMobile ? "span 2" : undefined }}>
      <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "4px" }}>{label}</label>
      <input
        type={type}
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit" }}
      />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f3f4f6" }}>
      <span style={{ fontSize: "14px", fontWeight: 500, color: "#6b7280" }}>{label}</span>
      <span style={{ fontSize: "14px", fontWeight: 600, color: "#111", textAlign: "right", maxWidth: "60%" }}>{value}</span>
    </div>
  );
}
