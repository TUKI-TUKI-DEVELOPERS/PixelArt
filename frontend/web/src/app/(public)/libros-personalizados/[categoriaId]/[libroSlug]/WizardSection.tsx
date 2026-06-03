"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import { CheckCircle2 } from "lucide-react";
import TemplateBook from "@/components/TemplateBook";
import { useWindowSize } from "@/hooks/useWindowSize";
import WizardBackground from "@/components/backgrounds/WizardBackground";

const API_BASE = "";

// ── Types ─────────────────────────────────────────────────────────────────────

type ActivePromo = { label: string; targetType: string; targetId: number | null; discountType: string; discountValue: number };
type VariantProp = { id: number; coverType: string; basePriceCents: number };
type TemplateProp = { id: number; name: string | null; previewUrl: string };
type DbIdsProp = { catalogBookId: number; personalizedModelId: number; personalizedCategoryId: number } | null;
type GenderDirection = "HE_TO_SHE" | "SHE_TO_HE" | "";

type Props = {
  accent: string;
  dbIds: DbIdsProp;
  variants: VariantProp[];
  templates: TemplateProp[];
  libroNombre: string;
  categoriaSlug: string;
};

// ── Dedication placeholder texts ───────────────────────────────────────────────
// TODO: reemplazar con textos reales por libro cuando estén listos.
const DEDICATION_TEXTS: Record<string, { HE_TO_SHE: string; SHE_TO_HE: string }> = {
  default: {
    HE_TO_SHE:
      "Para {recipientNickname}, que llenas mi vida de amor y alegría en cada momento. " +
      "Este libro es una pequeña muestra de todo lo que siento por ti. " +
      "Con todo mi corazón, {dedicatorName}.",
    SHE_TO_HE:
      "Para {recipientNickname}, mi razón de sonreír cada día. " +
      "Que estas páginas te recuerden cuánto te quiero. " +
      "Con todo mi amor, {dedicatorName}.",
  },
};

// ── Wizard steps ──────────────────────────────────────────────────────────────

const WIZARD_STEPS = [
  { number: 1, title: "Tipo" },
  { number: 2, title: "Para quién" },
  { number: 3, title: "De quién" },
  { number: 4, title: "Escenarios" },
  { number: 5, title: "Tapa" },
  { number: 6, title: "Dedicatoria" },
  { number: 7, title: "Tus Datos" },
  { number: 8, title: "Resumen" },
  { number: 9, title: "Enviar" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function applyBestPromo(priceCents: number, promos: ActivePromo[], catalogBookId?: number): number | undefined {
  const applicable = promos.filter(
    (p) =>
      p.targetType === "all" ||
      (p.targetType === "model" && catalogBookId !== undefined && p.targetId === catalogBookId),
  );
  if (!applicable.length) return undefined;
  let best = priceCents;
  for (const p of applicable) {
    const result =
      p.discountType === "percent"
        ? Math.round(priceCents * (1 - p.discountValue / 100))
        : Math.max(0, priceCents - p.discountValue);
    if (result < best) best = result;
  }
  return best < priceCents ? best : undefined;
}

function formatPrice(cents: number) {
  return `S/ ${(cents / 100).toFixed(2)}`;
}

function buildDedicationText(
  categoriaSlug: string,
  genderDirection: GenderDirection,
  recipientName: string,
  recipientNickname: string,
  dedicatorName: string,
  dedicatorNickname: string,
): string {
  const book = DEDICATION_TEXTS[categoriaSlug] ?? DEDICATION_TEXTS.default;
  const template = genderDirection === "SHE_TO_HE" ? book.SHE_TO_HE : book.HE_TO_SHE;
  return template
    .replace(/\{recipientNickname\}/g, recipientNickname || recipientName || "amor")
    .replace(/\{recipientName\}/g, recipientName || "amor")
    .replace(/\{dedicatorNickname\}/g, dedicatorNickname || dedicatorName || "")
    .replace(/\{dedicatorName\}/g, dedicatorName || "");
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function WizardSection({ accent, dbIds, variants, templates, libroNombre, categoriaSlug }: Props) {
  const { isMobile, isSmallMobile } = useWindowSize();
  const [currentStep, setCurrentStep] = useState(0);
  const [promos, setPromos] = useState<ActivePromo[]>([]);

  // Step 1 — gender direction
  const [genderDirection, setGenderDirection] = useState<GenderDirection>("");

  // Step 2 — recipient
  const [recipientName, setRecipientName] = useState("");
  const [recipientNickname, setRecipientNickname] = useState("");
  const recipientUpload = usePhotoUpload("uploads/customers");

  // Step 3 — dedicator
  const [dedicatorName, setDedicatorName] = useState("");
  const [dedicatorNickname, setDedicatorNickname] = useState("");
  const dedicatorUpload = usePhotoUpload("uploads/customers");

  // Step 4 — templates
  const [selectedTemplates, setSelectedTemplates] = useState<number[]>([]);

  // Step 5 — cover & package
  const [selectedVariantId, setSelectedVariantId] = useState<number>(variants[0]?.id ?? 0);
  const [selectedPackage, setSelectedPackage] = useState<"STANDARD" | "PREMIUM">("STANDARD");
  const [wantsRush, setWantsRush] = useState(false);
  const EXTRA_PLANTILLAS_CENTS = 4000;
  const RUSH_FEE_CENTS = 2500;
  const MIN_NORMAL_DAYS = 4;
  const MIN_RUSH_DAYS = 2;

  // Step 6 — dedication
  const [useDefaultDedication, setUseDefaultDedication] = useState(true);
  const [customDedication, setCustomDedication] = useState("");

  // Step 7 — contact & shipping
  const [form, setForm] = useState({
    customerFullName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddressLine1: "",
    shippingAddressLine2: "",
    shippingCity: "",
    shippingRegion: "",
    shippingReference: "",
    messageOptional: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Step animation
  const [animKey, setAnimKey] = useState(0);
  const [animDir, setAnimDir] = useState<"forward" | "backward">("forward");
  const prevStepRef = useRef(currentStep);

  useEffect(() => {
    fetch(`${API_BASE}/api/promotions/active`)
      .then((r) => (r.ok ? r.json() : []))
      .then(setPromos)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [submitted]);

  useEffect(() => {
    if (currentStep !== prevStepRef.current) {
      setAnimDir(currentStep > prevStepRef.current ? "forward" : "backward");
      setAnimKey((k) => k + 1);
      prevStepRef.current = currentStep;
    }
  }, [currentStep]);

  const activeGlobalPromo = promos.find(
    (p) =>
      p.targetType === "all" ||
      (p.targetType === "model" && dbIds !== null && p.targetId === dbIds.catalogBookId),
  );
  const selectedVariant = variants.find((v) => v.id === selectedVariantId);

  function updateForm(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function toggleTemplate(id: number) {
    setSelectedTemplates((prev) => {
      if (prev.includes(id)) return prev.filter((t) => t !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  const dedicationText = buildDedicationText(
    categoriaSlug,
    genderDirection,
    recipientName,
    recipientNickname,
    dedicatorName,
    dedicatorNickname,
  );

  const step7Valid =
    !!form.customerFullName &&
    !!form.customerEmail &&
    !!form.customerPhone &&
    !!form.shippingAddressLine1;

  async function handleSubmit() {
    if (!dbIds) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const finalDedication = useDefaultDedication ? dedicationText : customDedication;
      const allAssetIds = [
        ...recipientUpload.photos.map((p) => p.id),
        ...dedicatorUpload.photos.map((p) => p.id),
      ];
      const res = await fetch(`${API_BASE}/api/demo/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          catalogBookId: dbIds.catalogBookId,
          catalogBookVariantId: selectedVariantId,
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
          wantsRush,
          packagePreference: selectedPackage,
          wantsCustomDedication: !useDefaultDedication,
          dedicationText: finalDedication || null,
          messageOptional: form.messageOptional || null,
          templateIds: selectedTemplates,
          assetIds: allAssetIds,
          recipientName,
          recipientNickname: recipientNickname || null,
          dedicatorName,
          dedicatorNickname: dedicatorNickname || null,
          genderDirection,
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

  const navBtn = (label: string, onClick: () => void, primary = false, disabled = false) => (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        padding: "12px 28px",
        borderRadius: "10px",
        border: primary ? "none" : `1px solid ${accent}`,
        background: primary ? (disabled ? "#e0e0e0" : accent) : "#fff",
        color: primary ? (disabled ? "#999" : "#fff") : accent,
        fontSize: "15px",
        fontWeight: primary ? 700 : 600,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        transition: "all 0.2s ease",
      }}
    >
      {label}
    </button>
  );

  return (
    <section
      id="wizard-section"
      style={{ width: "100%", position: "relative", overflow: "hidden", background: "#ffffff" }}
    >
      <WizardBackground accent={accent} />
      <style>{`
        @keyframes wzSlideIn {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes wzSlideBack {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "860px",
          margin: "0 auto",
          padding: isMobile ? "40px 16px" : "80px 48px",
        }}
      >
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: `${accent}12`,
              border: `1px solid ${accent}30`,
              borderRadius: "20px",
              padding: "5px 14px",
              marginBottom: "16px",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill={accent}>
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            <span style={{ fontSize: "11px", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "1px" }}>
              Proceso guiado
            </span>
          </div>
          <h2
            style={{
              margin: "0 0 12px 0",
              fontSize: isSmallMobile ? "24px" : isMobile ? "28px" : "40px",
              fontWeight: 800,
              color: "#111",
              letterSpacing: "-0.5px",
            }}
          >
            Crea tu libro personalizado
          </h2>
          <p style={{ margin: 0, fontSize: "16px", color: "#666", lineHeight: 1.5 }}>
            Un proceso simple, guiado paso a paso. Nosotros hacemos el resto.
          </p>
        </div>

        {/* ── Step indicators ── */}
        {!submitted && currentStep > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: "40px",
              overflowX: "auto",
              paddingBottom: "4px",
              gap: 0,
            }}
          >
            {WIZARD_STEPS.map((step, idx) => {
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              const circleSize = isMobile ? "26px" : "36px";
              return (
                <div key={step.number} style={{ display: "flex", alignItems: "flex-start", flexShrink: 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                    <button
                      onClick={() => step.number <= currentStep && setCurrentStep(step.number)}
                      style={{
                        width: circleSize,
                        height: circleSize,
                        borderRadius: "50%",
                        border: "none",
                        background: isActive || isCompleted ? accent : "#e5e7eb",
                        cursor: step.number <= currentStep ? "pointer" : "default",
                        fontFamily: "inherit",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: isActive ? `0 0 0 3px ${accent}28` : "none",
                        transition: "all 0.3s ease",
                        flexShrink: 0,
                        padding: 0,
                      }}
                    >
                      <span style={{ fontSize: isMobile ? "10px" : "12px", fontWeight: 700, color: isActive || isCompleted ? "#fff" : "#aaa" }}>
                        {isCompleted ? "✓" : step.number}
                      </span>
                    </button>
                    {!isMobile && (
                      <span style={{ fontSize: "8px", fontWeight: 600, color: isActive ? accent : isCompleted ? accent : "#ccc", textTransform: "uppercase", letterSpacing: "0.3px", whiteSpace: "nowrap" }}>
                        {step.title}
                      </span>
                    )}
                  </div>
                  {idx < WIZARD_STEPS.length - 1 && (
                    <div
                      style={{
                        width: isMobile ? "10px" : "20px",
                        height: "2px",
                        marginTop: isMobile ? "12px" : "17px",
                        flexShrink: 0,
                        background: "#e5e7eb",
                        position: "relative",
                        overflow: "hidden",
                        marginInline: isMobile ? "2px" : "4px",
                      }}
                    >
                      <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: isCompleted ? "100%" : "0%", background: accent, transition: "width 0.4s ease" }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Content area ── */}
        <div
          style={{
            background: "#fff",
            borderRadius: "24px",
            border: "1px solid #ebebeb",
            padding: isMobile ? "24px 16px" : "48px",
            minHeight: "350px",
            boxShadow: "0 4px 32px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <div key={animKey} style={{ animation: `${animDir === "forward" ? "wzSlideIn" : "wzSlideBack"} 0.3s cubic-bezier(0.4,0,0.2,1) both` }}>

          {/* ── Step 0: Intro ── */}
          {currentStep === 0 && (
            <div style={{ textAlign: "center", padding: isMobile ? "16px 0 24px" : "24px 0 40px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
                  gap: "12px",
                  marginBottom: "36px",
                }}
              >
                {(
                  [
                    { label: "Elige el tipo de libro", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
                    { label: "Carga las fotos del personaje", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                    { label: "Elige escenarios y tapa", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
                    { label: "Personaliza la dedicatoria", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
                  ] as { label: string; icon: React.ReactNode }[]
                ).map((s, i) => (
                  <div
                    key={i}
                    style={{ background: "#fafafa", borderRadius: "16px", padding: "20px 12px", border: "1px solid #f0f0f0", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
                  >
                    <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: `${accent}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {s.icon}
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "#555", lineHeight: 1.4, textAlign: "center" }}>{s.label}</span>
                    <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: `${accent}18`, fontSize: "11px", fontWeight: 700, color: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                  </div>
                ))}
              </div>

              {activeGlobalPromo && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: "12px", padding: "10px 20px", marginBottom: "20px", fontSize: "14px", fontWeight: 700, color: "#92400e" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7" stroke="#92400e" strokeWidth="2" strokeLinecap="round"/></svg>
                  {activeGlobalPromo.label} — {activeGlobalPromo.discountType === "percent" ? `${activeGlobalPromo.discountValue}% OFF` : `S/ ${(activeGlobalPromo.discountValue / 100).toFixed(2)} de descuento`} aplicado
                </div>
              )}

              <button
                onClick={() => setCurrentStep(1)}
                style={{ padding: "15px 44px", borderRadius: "14px", border: "none", background: accent, color: "#fff", fontSize: "16px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: `0 6px 24px ${accent}40` }}
              >
                Crear mi libro
              </button>
            </div>
          )}

          {/* ── Step 1: Gender direction ── */}
          {currentStep === 1 && (
            <div>
              <h3 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: 700 }}>¿Este libro es...</h3>
              <p style={{ margin: "0 0 28px 0", fontSize: "14px", color: "#666" }}>
                Elige el tipo de dedicatoria para personalizar el libro.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
                {(
                  [
                    { value: "HE_TO_SHE" as GenderDirection, label: "De él para ella", sub: "Un hombre le regala el libro a una mujer" },
                    { value: "SHE_TO_HE" as GenderDirection, label: "De ella para él", sub: "Una mujer le regala el libro a un hombre" },
                  ]
                ).map((opt) => {
                  const isSelected = genderDirection === opt.value;
                  const iconColor = isSelected ? accent : "#aaa";
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setGenderDirection(opt.value)}
                      style={{
                        padding: "20px 24px",
                        borderRadius: "16px",
                        textAlign: "left",
                        cursor: "pointer",
                        border: isSelected ? `2px solid ${accent}` : "2px solid #e5e7eb",
                        background: isSelected ? `${accent}07` : "#fafafa",
                        fontFamily: "inherit",
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        transition: "all 0.2s ease",
                        boxShadow: isSelected ? `0 4px 20px ${accent}20` : "none",
                      }}
                    >
                      {opt.value === "HE_TO_SHE" ? (
                        <svg width="68" height="44" viewBox="0 0 68 44" fill="none" style={{ flexShrink: 0 }}>
                          {/* Man — left */}
                          <circle cx="10" cy="10" r="7" stroke={iconColor} strokeWidth="1.6"/>
                          <path d="M2 38 C2 26 18 26 18 38" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round"/>
                          {/* Heart — center */}
                          <path d="M39 20C39 17 35.5 15.5 34 18C32.5 15.5 29 17 29 20C29 23 34 27 34 27C34 27 39 23 39 20Z" fill={isSelected ? accent : "#ccc"}/>
                          {/* Arrow right */}
                          <path d="M40 22L48 22M45 19L48 22L45 25" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          {/* Woman — right */}
                          <circle cx="58" cy="10" r="7" stroke={iconColor} strokeWidth="1.6"/>
                          <path d="M50 44L58 22L66 44" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="50" y1="33" x2="66" y2="33" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round"/>
                        </svg>
                      ) : (
                        <svg width="68" height="44" viewBox="0 0 68 44" fill="none" style={{ flexShrink: 0 }}>
                          {/* Woman — left */}
                          <circle cx="10" cy="10" r="7" stroke={iconColor} strokeWidth="1.6"/>
                          <path d="M2 44L10 22L18 44" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="2" y1="33" x2="18" y2="33" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round"/>
                          {/* Heart — center */}
                          <path d="M39 20C39 17 35.5 15.5 34 18C32.5 15.5 29 17 29 20C29 23 34 27 34 27C34 27 39 23 39 20Z" fill={isSelected ? accent : "#ccc"}/>
                          {/* Arrow right */}
                          <path d="M40 22L48 22M45 19L48 22L45 25" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          {/* Man — right */}
                          <circle cx="58" cy="10" r="7" stroke={iconColor} strokeWidth="1.6"/>
                          <path d="M50 38 C50 26 66 26 66 38" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round"/>
                        </svg>
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "16px", fontWeight: 700, color: isSelected ? accent : "#222", marginBottom: "3px" }}>
                          {opt.label}
                        </div>
                        <div style={{ fontSize: "13px", color: "#888" }}>{opt.sub}</div>
                      </div>
                      <div
                        style={{
                          width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                          border: isSelected ? "none" : "2px solid #ddd",
                          background: isSelected ? accent : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {isSelected && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
                {navBtn("Anterior", () => setCurrentStep(0))}
                {navBtn("Siguiente", () => setCurrentStep(2), true, genderDirection === "")}
              </div>
            </div>
          )}

          {/* ── Step 2: Recipient character card ── */}
          {currentStep === 2 && (
            <div>
              <h3 style={{ margin: "0 0 4px 0", fontSize: "22px", fontWeight: 700 }}>
                {genderDirection === "HE_TO_SHE" ? "Datos de ella" : "Datos de él"}
              </h3>
              <p style={{ margin: "0 0 20px 0", fontSize: "14px", color: "#666" }}>
                La persona que recibirá el libro como regalo.
              </p>

              <CharacterCard
                role="recipient"
                name={recipientName}
                nickname={recipientNickname}
                onNameChange={setRecipientName}
                onNicknameChange={setRecipientNickname}
                upload={recipientUpload}
                maxPhotos={2}
                accent={accent}
                isMobile={isMobile}
              />

              {/* AI disclaimer */}
              <div style={{ padding: "14px 16px", borderRadius: "12px", background: "#fffbeb", border: "1px solid #fde68a", marginBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ fontSize: "16px", flexShrink: 0 }}>⚠️</span>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#92400e", marginBottom: "4px" }}>Sobre las ilustraciones con inteligencia artificial</div>
                    <p style={{ margin: 0, fontSize: "12px", color: "#78350f", lineHeight: 1.6 }}>
                      Las imágenes son generadas por IA a partir de las fotos. Los resultados pueden variar en exactitud de rasgos. Para mejores resultados: fotos individuales, bien iluminadas, rostro completo y visible, sin filtros. PixelArt no garantiza una reproducción exacta.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
                {navBtn("Anterior", () => setCurrentStep(1))}
                {navBtn("Siguiente", () => setCurrentStep(3), true, !recipientName.trim() || recipientUpload.photos.length < 1)}
              </div>
            </div>
          )}

          {/* ── Step 3: Dedicator character card ── */}
          {currentStep === 3 && (
            <div>
              <h3 style={{ margin: "0 0 4px 0", fontSize: "22px", fontWeight: 700 }}>
                {genderDirection === "HE_TO_SHE" ? "Datos de él" : "Datos de ella"}
              </h3>
              <p style={{ margin: "0 0 20px 0", fontSize: "14px", color: "#666" }}>
                La persona que hace el regalo — quien dedica el libro.
              </p>

              <CharacterCard
                role="dedicator"
                name={dedicatorName}
                nickname={dedicatorNickname}
                onNameChange={setDedicatorName}
                onNicknameChange={setDedicatorNickname}
                upload={dedicatorUpload}
                maxPhotos={2}
                accent={accent}
                isMobile={isMobile}
              />

              <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
                {navBtn("Anterior", () => setCurrentStep(2))}
                {navBtn("Siguiente", () => setCurrentStep(4), true, !dedicatorName.trim() || dedicatorUpload.photos.length < 1)}
              </div>
            </div>
          )}

          {/* ── Step 4: Templates ── */}
          {currentStep === 4 && (
            <div>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "24px", fontWeight: 700 }}>4. Elegí 3 escenarios</h3>
              <p style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#666" }}>
                Hojea el libro y haz clic en las páginas para seleccionar hasta 3 escenarios.
              </p>
              <div style={{ fontSize: "13px", color: selectedTemplates.length === 3 ? "#22c55e" : "#888", fontWeight: selectedTemplates.length === 3 ? 600 : 400, marginBottom: "24px", display: "flex", alignItems: "center", gap: "6px" }}>
                {selectedTemplates.length === 3 && <CheckCircle2 size={16} />}
                {selectedTemplates.length}/3 seleccionadas{selectedTemplates.length === 3 && " — Listo"}
              </div>
              <TemplateBook templates={templates} selectedIds={selectedTemplates} maxSelections={3} accent={accent} onToggle={toggleTemplate} />
              <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row", justifyContent: "center", marginTop: "28px" }}>
                {navBtn("Anterior", () => setCurrentStep(3))}
                {navBtn("Siguiente", () => setCurrentStep(5), true, selectedTemplates.length < 3)}
              </div>
            </div>
          )}

          {/* ── Step 5: Cover type only ── */}
          {currentStep === 5 && (() => {
            return (
              <div>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: 700 }}>5. Tipo de tapa</h3>
                <p style={{ margin: "0 0 28px 0", fontSize: "14px", color: "#666" }}>
                  Elige cómo quieres que sea la tapa de tu libro.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : `repeat(${variants.length}, 1fr)`, gap: "16px", marginBottom: "32px" }}>
                  {variants.map((v) => {
                    const isSelected = selectedVariantId === v.id;
                    const vPromo = applyBestPromo(v.basePriceCents, promos, dbIds?.catalogBookId);
                    const displayPrice = vPromo ?? v.basePriceCents;
                    const isSoft = v.coverType === "TAPA_DELGADA";
                    return (
                      <button
                        key={v.id} type="button" onClick={() => setSelectedVariantId(v.id)}
                        style={{ borderRadius: "20px", border: isSelected ? `2px solid ${accent}` : "2px solid #e5e7eb", background: isSelected ? `${accent}06` : "#fff", cursor: "pointer", fontFamily: "inherit", overflow: "hidden", transition: "all 0.25s ease", boxShadow: isSelected ? `0 8px 32px ${accent}22` : "0 2px 8px rgba(0,0,0,0.04)", padding: 0, textAlign: "left" }}
                      >
                        {/* Visual area */}
                        <div style={{ width: "100%", height: "200px", background: isSoft ? "linear-gradient(160deg, #f5eeff 0%, #ede0ff 100%)" : `linear-gradient(160deg, ${accent}20 0%, ${accent}0a 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                          {/* Book mockup */}
                          <div style={{ position: "relative", width: isSoft ? "90px" : "100px", height: isSoft ? "120px" : "132px" }}>
                            {/* Spine */}
                            <div style={{ position: "absolute", left: 0, top: 0, width: "12px", height: "100%", background: isSelected ? `${accent}cc` : "#c4a0e8", borderRadius: "3px 0 0 3px", boxShadow: "inset -2px 0 4px rgba(0,0,0,0.12)" }} />
                            {/* Cover */}
                            <div style={{ position: "absolute", left: "12px", top: 0, right: 0, height: "100%", background: isSelected ? accent : "#c4a0e8", borderRadius: "0 6px 6px 0", boxShadow: isSoft ? "3px 3px 12px rgba(0,0,0,0.18)" : "4px 4px 16px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s ease" }}>
                              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                              </svg>
                            </div>
                            {/* Hard cover extra thickness */}
                            {!isSoft && (
                              <div style={{ position: "absolute", left: "6px", top: "4px", width: "6px", height: "calc(100% - 8px)", background: isSelected ? `${accent}88` : "#b090d8", borderRadius: "2px" }} />
                            )}
                          </div>
                          {/* Selected check */}
                          {isSelected && (
                            <div style={{ position: "absolute", top: "14px", right: "14px", width: "30px", height: "30px", borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 2px 10px ${accent}50` }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            </div>
                          )}
                          {/* Label chip */}
                          <div style={{ position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)", background: "rgba(255,255,255,0.9)", borderRadius: "20px", padding: "4px 12px", fontSize: "11px", fontWeight: 700, color: isSelected ? accent : "#555", whiteSpace: "nowrap", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                            {isSoft ? "Tapa Blanda" : "Tapa Dura"}
                          </div>
                        </div>

                        {/* Info */}
                        <div style={{ padding: "18px 20px 20px" }}>
                          <div style={{ fontSize: "15px", fontWeight: 700, color: isSelected ? accent : "#222", marginBottom: "4px" }}>
                            {isSoft ? "Tapa Blanda" : "Tapa Dura"}
                          </div>
                          <div style={{ fontSize: "12px", color: "#888", marginBottom: "14px", lineHeight: 1.5 }}>
                            {isSoft ? "Cartulina estándar · Liviana y compacta" : "Cubierta rígida · Acabado premium y duradero"}
                          </div>
                          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                            {vPromo !== undefined && (
                              <span style={{ fontSize: "12px", color: "#bbb", textDecoration: "line-through" }}>{formatPrice(v.basePriceCents)}</span>
                            )}
                            <span style={{ fontSize: "28px", fontWeight: 900, color: accent, lineHeight: 1 }}>{formatPrice(displayPrice)}</span>
                          </div>
                          <div style={{ fontSize: "11px", color: "#aaa", marginTop: "3px" }}>Precio base del libro</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
                  {navBtn("Anterior", () => setCurrentStep(4))}
                  {navBtn("Siguiente", () => setCurrentStep(6), true)}
                </div>
              </div>
            );
          })()}

          {/* ── Step 6: Dedication ── */}
          {currentStep === 6 && (
            <div>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "24px", fontWeight: 700 }}>6. Dedicatoria</h3>
              <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#666" }}>Esta dedicatoria aparecerá en las primeras páginas de tu libro.</p>

              <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <button type="button" onClick={() => setUseDefaultDedication(true)}
                  style={{ flex: 1, padding: "12px", borderRadius: "12px", border: useDefaultDedication ? `2px solid ${accent}` : "2px solid #e5e7eb", background: useDefaultDedication ? `${accent}08` : "#fff", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: 700, color: useDefaultDedication ? accent : "#555", transition: "all 0.2s ease" }}
                >
                  Usar dedicatoria sugerida
                </button>
                <button type="button" onClick={() => setUseDefaultDedication(false)}
                  style={{ flex: 1, padding: "12px", borderRadius: "12px", border: !useDefaultDedication ? `2px solid ${accent}` : "2px solid #e5e7eb", background: !useDefaultDedication ? `${accent}08` : "#fff", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: 700, color: !useDefaultDedication ? accent : "#555", transition: "all 0.2s ease" }}
                >
                  Escribir la mía
                </button>
              </div>

              {useDefaultDedication ? (
                <div style={{ padding: "28px", borderRadius: "16px", background: `${accent}06`, border: `1px solid ${accent}20` }}>
                  <div style={{ fontSize: "40px", color: accent, lineHeight: 1, marginBottom: "10px", opacity: 0.25 }}>"</div>
                  <p style={{ margin: 0, fontSize: "15px", color: "#333", lineHeight: 1.9, fontStyle: "italic" }}>{dedicationText}</p>
                  <div style={{ fontSize: "40px", color: accent, lineHeight: 1, marginTop: "6px", opacity: 0.25, textAlign: "right" }}>"</div>
                  <div style={{ marginTop: "14px", fontSize: "12px", color: "#888", padding: "8px 12px", borderRadius: "8px", background: "#f9fafb", border: "1px solid #f0f0f0" }}>
                    Los nombres se completaron automáticamente desde los pasos anteriores.
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: "12px", color: "#888", marginBottom: "10px" }}>
                    Puedes usar <strong>{recipientNickname || recipientName}</strong> y <strong>{dedicatorNickname || dedicatorName}</strong> para personalizar tu mensaje.
                  </div>
                  <textarea value={customDedication} onChange={(e) => setCustomDedication(e.target.value)} placeholder="Escribe tu dedicatoria personalizada..." rows={5}
                    style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1.5px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit", resize: "vertical", lineHeight: 1.7, boxSizing: "border-box" }}
                  />
                </div>
              )}

              <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexDirection: isMobile ? "column" : "row" }}>
                {navBtn("Anterior", () => setCurrentStep(5))}
                {navBtn("Siguiente", () => setCurrentStep(7), true, !useDefaultDedication && !customDedication.trim())}
              </div>
            </div>
          )}

          {/* ── Step 7: Package + Delivery + Contact ── */}
          {currentStep === 7 && (() => {
            const baseCents = selectedVariant?.basePriceCents ?? 0;
            const promoBase = applyBestPromo(baseCents, promos, dbIds?.catalogBookId);
            const extraCents = selectedPackage === "PREMIUM" ? EXTRA_PLANTILLAS_CENTS : 0;
            const totalCents = (promoBase ?? baseCents) + extraCents + (wantsRush ? RUSH_FEE_CENTS : 0);
            return (
              <div>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: 700 }}>7. Tus datos</h3>
                <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#666" }}>Elige las opciones de producción y completa tus datos de envío.</p>

                {/* Package */}
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#888", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.6px" }}>Cantidad de plantillas</div>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "10px" }}>
                    {(["STANDARD", "PREMIUM"] as const).map((pkg) => {
                      const isSelected = selectedPackage === pkg;
                      const pkgPrice = (promoBase ?? baseCents) + (pkg === "PREMIUM" ? EXTRA_PLANTILLAS_CENTS : 0);
                      return (
                        <button key={pkg} type="button" onClick={() => setSelectedPackage(pkg)}
                          style={{ padding: "14px 16px", borderRadius: "12px", textAlign: "left", cursor: "pointer", border: isSelected ? `2px solid ${accent}` : "2px solid #e5e7eb", background: isSelected ? `${accent}08` : "#fff", fontFamily: "inherit", transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: "12px" }}
                        >
                          <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: isSelected ? `${accent}18` : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontSize: "18px" }}>{pkg === "STANDARD" ? "📖" : "✨"}</span>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: "13px", fontWeight: 700, color: isSelected ? accent : "#333" }}>{pkg === "STANDARD" ? "10 plantillas" : "15 plantillas"}</div>
                            <div style={{ fontSize: "11px", color: "#888" }}>{pkg === "STANDARD" ? "Paquete base" : "5 escenarios adicionales"}</div>
                          </div>
                          <div style={{ fontSize: "14px", fontWeight: 700, color: accent }}>{formatPrice(pkgPrice)}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery */}
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#888", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.6px" }}>Tipo de entrega</div>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "10px" }}>
                    {[
                      { rush: false, label: "Normal", emoji: "📦", detail: `${MIN_NORMAL_DAYS} días hábiles · Sin recargo` },
                      { rush: true, label: "Express", emoji: "⚡", detail: `${MIN_RUSH_DAYS} días hábiles · +${formatPrice(RUSH_FEE_CENTS)}` },
                    ].map((opt) => {
                      const isSelected = wantsRush === opt.rush;
                      return (
                        <button key={String(opt.rush)} type="button" onClick={() => setWantsRush(opt.rush)}
                          style={{ padding: "14px 16px", borderRadius: "12px", textAlign: "left", cursor: "pointer", border: isSelected ? `2px solid ${accent}` : "2px solid #e5e7eb", background: isSelected ? `${accent}08` : "#fff", fontFamily: "inherit", transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: "12px" }}
                        >
                          <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: isSelected ? `${accent}18` : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontSize: "18px" }}>{opt.emoji}</span>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: "13px", fontWeight: 700, color: isSelected ? accent : "#333" }}>{opt.label}</div>
                            <div style={{ fontSize: "11px", color: "#888" }}>{opt.detail}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "20px", marginBottom: "20px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.6px" }}>Datos de contacto y envío</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                  <FormField label="Nombre completo *" value={form.customerFullName} onChange={(v) => updateForm("customerFullName", v)} isMobile={isMobile} />
                  <FormField label="Email *" value={form.customerEmail} onChange={(v) => updateForm("customerEmail", v)} type="email" isMobile={isMobile} />
                  <FormField label="Teléfono *" value={form.customerPhone} onChange={(v) => updateForm("customerPhone", v)} type="tel" isMobile={isMobile} />
                  <FormField label="Dirección *" value={form.shippingAddressLine1} onChange={(v) => updateForm("shippingAddressLine1", v)} fullWidth isMobile={isMobile} />
                  <FormField label="Dirección línea 2" value={form.shippingAddressLine2} onChange={(v) => updateForm("shippingAddressLine2", v)} isMobile={isMobile} />
                  <FormField label="Ciudad" value={form.shippingCity} onChange={(v) => updateForm("shippingCity", v)} isMobile={isMobile} />
                  <FormField label="Región" value={form.shippingRegion} onChange={(v) => updateForm("shippingRegion", v)} isMobile={isMobile} />
                  <FormField label="Referencia" value={form.shippingReference} onChange={(v) => updateForm("shippingReference", v)} fullWidth isMobile={isMobile} />
                  <FormField label="Mensaje adicional (opcional)" value={form.messageOptional} onChange={(v) => updateForm("messageOptional", v)} fullWidth isMobile={isMobile} />
                </div>

                {/* Total preview */}
                <div style={{ padding: "12px 16px", borderRadius: "12px", background: `${accent}06`, border: `1px solid ${accent}20`, marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "#666" }}>Total estimado</span>
                  <span style={{ fontSize: "20px", fontWeight: 900, color: accent }}>{formatPrice(totalCents)}</span>
                </div>

                <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
                  {navBtn("Anterior", () => setCurrentStep(6))}
                  {navBtn("Siguiente", () => setCurrentStep(8), true, !step7Valid)}
                </div>
              </div>
            );
          })()}

          {/* ── Step 8: Summary ── */}
          {currentStep === 8 && (() => {
            const baseCents = selectedVariant?.basePriceCents ?? 0;
            const promoBase = applyBestPromo(baseCents, promos, dbIds?.catalogBookId);
            const effectiveBase = promoBase ?? baseCents;
            const extraCents = selectedPackage === "PREMIUM" ? EXTRA_PLANTILLAS_CENTS : 0;
            const totalCents = effectiveBase + extraCents + (wantsRush ? RUSH_FEE_CENTS : 0);
            const originalTotal = baseCents + extraCents + (wantsRush ? RUSH_FEE_CENTS : 0);
            return (
              <div>
                <h3 style={{ margin: "0 0 20px 0", fontSize: "24px", fontWeight: 700 }}>8. Resumen de tu solicitud</h3>
                <div style={{ borderRadius: "14px", border: "1px solid #f0f0f0", overflow: "hidden", marginBottom: "24px" }}>
                  <SummaryRow label="Libro" value={libroNombre} />
                  <SummaryRow label="Para" value={`${recipientName}${recipientNickname ? ` (${recipientNickname})` : ""}`} />
                  <SummaryRow label="De" value={`${dedicatorName}${dedicatorNickname ? ` (${dedicatorNickname})` : ""}`} />
                  <SummaryRow label="Fotos" value={`${recipientUpload.photos.length + dedicatorUpload.photos.length} fotos subidas`} />
                  <SummaryRow label="Escenarios" value={selectedTemplates.map((id) => templates.find((t) => t.id === id)?.name ?? `#${id}`).join(", ")} />
                  <SummaryRow label="Tapa" value={selectedVariant?.coverType.replace("TAPA_", "Tapa ") ?? "—"} />
                  <SummaryRow label="Plantillas" value={selectedPackage === "PREMIUM" ? "15 plantillas" : "10 plantillas"} />
                  <SummaryRow label="Entrega" value={wantsRush ? `Express (${MIN_RUSH_DAYS} días hábiles)` : `Normal (${MIN_NORMAL_DAYS} días hábiles)`} />
                  <SummaryRow label="Dedicatoria" value={useDefaultDedication ? "Sugerida" : "Personalizada"} />
                  <SummaryRow label="Cliente" value={form.customerFullName} />
                  <SummaryRow label="Email" value={form.customerEmail} />
                  <SummaryRow label="Teléfono" value={form.customerPhone} />
                  <SummaryRow label="Dirección" value={`${form.shippingAddressLine1}${form.shippingCity ? `, ${form.shippingCity}` : ""}`} />
                </div>
                <div style={{ padding: "20px 24px", borderRadius: "14px", border: `2px solid ${accent}40`, background: `${accent}06`, marginBottom: "24px" }}>
                  <div style={{ fontSize: "13px", color: "#888", marginBottom: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Precio total</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#555" }}>
                      <span>{selectedVariant?.coverType.replace("TAPA_", "Tapa ")} · {selectedPackage === "PREMIUM" ? "15 plantillas" : "10 plantillas"}</span>
                      <span>{formatPrice(effectiveBase + extraCents)}</span>
                    </div>
                    {wantsRush && (
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#555" }}>
                        <span>Entrega express</span><span>+{formatPrice(RUSH_FEE_CENTS)}</span>
                      </div>
                    )}
                  </div>
                  <div style={{ borderTop: `1px solid ${accent}20`, paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "#333" }}>Total estimado</span>
                    <div style={{ textAlign: "right" }}>
                      {promoBase !== undefined && <div style={{ fontSize: "13px", color: "#aaa", textDecoration: "line-through" }}>{formatPrice(originalTotal)}</div>}
                      <div style={{ fontSize: "28px", fontWeight: 900, color: accent }}>{formatPrice(totalCents)}</div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexDirection: isMobile ? "column" : "row" }}>
                  {navBtn("Anterior", () => setCurrentStep(7))}
                  {navBtn("Confirmar y Enviar", () => setCurrentStep(9), true)}
                </div>
              </div>
            );
          })()}

          {/* ── Step 9: Submit ── */}
          {currentStep === 9 && !submitted && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
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
                {navBtn("Volver", () => setCurrentStep(8))}
                <button disabled={submitting} onClick={handleSubmit}
                  style={{ padding: "14px 36px", borderRadius: "10px", border: "none", background: submitting ? "#ccc" : accent, color: "#fff", fontSize: "16px", fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", fontFamily: "inherit" }}
                >
                  {submitting ? "Enviando..." : "Enviar Solicitud"}
                </button>
              </div>
            </div>
          )}

          {/* ── Success ── */}
          {submitted && (
            <div ref={successRef} style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#065f46", marginBottom: "12px" }}>¡Solicitud enviada!</h3>
              <p style={{ fontSize: "16px", color: "#666", maxWidth: "500px", margin: "0 auto" }}>
                Tu solicitud fue enviada correctamente. Nuestro equipo preparará las propuestas y las recibirás en <strong>{form.customerEmail}</strong>.
              </p>
            </div>
          )}
          </div>{/* end animated wrapper */}
        </div>
      </div>
    </section>
  );
}

// ── Character Card ─────────────────────────────────────────────────────────────

function CharacterCard({
  role, name, nickname, onNameChange, onNicknameChange, upload, maxPhotos, accent, isMobile,
}: {
  role: "recipient" | "dedicator";
  name: string;
  nickname: string;
  onNameChange: (v: string) => void;
  onNicknameChange: (v: string) => void;
  upload: ReturnType<typeof usePhotoUpload>;
  maxPhotos: number;
  accent: string;
  isMobile?: boolean;
}) {
  const { photos, uploading, progress, uploadFiles, removePhoto } = upload;
  const primaryPhoto = photos[0];
  const atLimit = photos.length >= maxPhotos;
  const remaining = maxPhotos - photos.length;

  function openPicker(multiple = true) {
    if (atLimit) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = multiple;
    input.style.display = "none";
    document.body.appendChild(input);
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) uploadFiles(Array.from(files).slice(0, remaining));
      document.body.removeChild(input);
    };
    input.click();
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        border: `1px solid ${accent}18`,
        overflow: "hidden",
        boxShadow: `0 8px 40px ${accent}12, 0 2px 8px rgba(0,0,0,0.04)`,
        marginBottom: "20px",
      }}
    >
      {/* ── Card header ── */}
      <div
        style={{
          background: `linear-gradient(160deg, ${accent}18 0%, ${accent}06 100%)`,
          padding: isMobile ? "28px 20px 24px" : "36px 32px 28px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
        }}
      >
        {/* Avatar circle */}
        <div
          onClick={() => openPicker(false)}
          style={{
            width: isMobile ? "88px" : "104px",
            height: isMobile ? "88px" : "104px",
            borderRadius: "50%",
            border: primaryPhoto ? `3px solid ${accent}` : "3px dashed #ccc",
            overflow: "hidden",
            cursor: atLimit && !primaryPhoto ? "default" : "pointer",
            background: "#fff",
            position: "relative",
            boxShadow: primaryPhoto ? `0 4px 20px ${accent}35` : "0 2px 8px rgba(0,0,0,0.06)",
            transition: "all 0.3s ease",
            flexShrink: 0,
          }}
        >
          {primaryPhoto ? (
            <>
              <img src={primaryPhoto.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div
                style={{
                  position: "absolute", inset: 0, background: "rgba(0,0,0,0)", display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(0,0,0,0.35)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(0,0,0,0)"; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0, transition: "opacity 0.2s" }} className="avatar-edit-icon">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                  <circle cx="12" cy="13" r="3"/>
                </svg>
              </div>
            </>
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                <circle cx="12" cy="13" r="3"/>
              </svg>
              <span style={{ fontSize: "9px", color: "#ccc", fontWeight: 700, letterSpacing: "0.5px" }}>FOTO</span>
            </div>
          )}
        </div>

        {/* Live name preview */}
        <div style={{ textAlign: "center", minHeight: "48px" }}>
          <div
            style={{
              fontSize: name ? (isMobile ? "20px" : "24px") : "15px",
              fontWeight: 800,
              color: name ? "#111" : "#bbb",
              transition: "all 0.25s ease",
              lineHeight: 1.2,
              letterSpacing: name ? "-0.3px" : "0",
            }}
          >
            {name || "Nombre del personaje"}
          </div>
          {nickname && (
            <div style={{ fontSize: "13px", color: "#999", marginTop: "4px", fontStyle: "italic" }}>
              &ldquo;{nickname}&rdquo;
            </div>
          )}
        </div>
      </div>

      {/* ── Form section ── */}
      <div style={{ padding: isMobile ? "20px 16px" : "28px 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "22px" }}>
          <FormField
            label="Nombre *"
            value={name}
            onChange={onNameChange}
            isMobile={isMobile}
          />
          <FormField
            label="Apodo / cómo le llamas (opcional)"
            value={nickname}
            onChange={onNicknameChange}
            isMobile={isMobile}
          />
        </div>

        {/* Photos strip */}
        <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "18px" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#333", marginBottom: "4px" }}>
            Fotos (hasta 2) *
          </div>
          <div style={{ fontSize: "12px", color: "#888", marginBottom: "12px" }}>
            La primera foto se usará como avatar. Rostro completo, sin filtros, bien iluminada.
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
            {/* Add button */}
            {!atLimit && (
              <div
                onClick={() => openPicker(true)}
                style={{
                  width: "60px", height: "60px", borderRadius: "12px",
                  border: "2px dashed #d0d0d0", background: "#fafafa",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: "2px", cursor: "pointer", flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
              >
                <span style={{ fontSize: "20px", color: "#bbb", lineHeight: 1 }}>+</span>
                <span style={{ fontSize: "9px", color: "#bbb", fontWeight: 600 }}>FOTO</span>
              </div>
            )}

            {/* Uploaded photos */}
            {photos.map((p, idx) => (
              <div
                key={p.contentHash}
                style={{ position: "relative", width: "60px", height: "60px", borderRadius: "12px", overflow: "hidden", border: idx === 0 ? `2px solid ${accent}` : "1px solid #eee", flexShrink: 0 }}
              >
                <img src={p.preview} alt={p.originalFilename} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button
                  onClick={(e) => { e.stopPropagation(); removePhoto(p.uid); }}
                  style={{ position: "absolute", top: "2px", right: "2px", width: "18px", height: "18px", borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}
                >×</button>
                {idx === 0 && (
                  <div style={{ position: "absolute", bottom: "2px", left: "2px", background: accent, borderRadius: "4px", padding: "1px 5px", fontSize: "8px", color: "#fff", fontWeight: 700 }}>
                    PRINCIPAL
                  </div>
                )}
              </div>
            ))}
          </div>

          {uploading && (
            <div style={{ marginTop: "10px" }}>
              <div style={{ height: "3px", borderRadius: "2px", background: "#eee", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: accent, transition: "width 0.3s ease" }} />
              </div>
              <div style={{ fontSize: "11px", color: "#999", marginTop: "3px" }}>Subiendo... {progress}%</div>
            </div>
          )}

          <div style={{ fontSize: "11px", color: atLimit ? "#22c55e" : "#999", marginTop: "8px", fontWeight: atLimit ? 600 : 400 }}>
            {photos.length}/{maxPhotos} fotos{atLimit ? " — máximo alcanzado" : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helper components ─────────────────────────────────────────────────────────

function FormField({
  label, value, onChange, type = "text", fullWidth, isMobile, min, max,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  fullWidth?: boolean;
  isMobile?: boolean;
  min?: string;
  max?: string;
}) {
  return (
    <div style={{ gridColumn: fullWidth && !isMobile ? "span 2" : undefined }}>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "5px" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box", outline: "none" }}
      />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid #f3f4f6", background: "#fff" }}>
      <span style={{ fontSize: "13px", fontWeight: 500, color: "#6b7280" }}>{label}</span>
      <span style={{ fontSize: "13px", fontWeight: 600, color: "#111", textAlign: "right", maxWidth: "60%" }}>{value}</span>
    </div>
  );
}
