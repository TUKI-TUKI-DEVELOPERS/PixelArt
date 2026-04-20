"use client";

import { useState } from "react";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import { CheckCircle2 } from "lucide-react";
import TemplateBook from "@/components/TemplateBook";
import { useWindowSize } from "@/hooks/useWindowSize";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

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
  const { photos, uploading, progress, uploadFiles, removePhoto } = usePhotoUpload("uploads/customers");

  // Step 2: template selection
  const [selectedTemplates, setSelectedTemplates] = useState<number[]>([]);

  // Step 3: form data
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
    <section id="wizard-section" style={{ maxWidth: "900px", margin: "0 auto", padding: isMobile ? "40px 16px" : "72px 48px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ margin: "0 0 8px 0", fontSize: isMobile ? "24px" : "32px", fontWeight: 800, color: accent }}>CREA TU LIBRO</h2>
        <div style={{ width: "60px", height: "3px", background: accent, margin: "0 auto", borderRadius: "2px" }} />
      </div>

      {/* Step indicators */}
      {!submitted && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: isMobile ? "4px" : "6px", marginBottom: "40px", flexWrap: "wrap" }}>
          {NEW_STEPS.map((step, idx) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            return (
              <div key={step.number} style={{ display: "flex", alignItems: "center", gap: isMobile ? "4px" : "6px" }}>
                <button
                  onClick={() => step.number <= currentStep && setCurrentStep(step.number)}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: isMobile ? "6px" : "8px 14px",
                    borderRadius: isMobile ? "50%" : "10px",
                    border: isActive ? `2px solid ${accent}` : "1px solid #e5e7eb",
                    background: isActive ? `${accent}10` : isCompleted ? "#f0fdf4" : "#fff",
                    cursor: step.number <= currentStep ? "pointer" : "default", fontFamily: "inherit",
                    minWidth: isMobile ? "36px" : undefined,
                    minHeight: isMobile ? "36px" : undefined,
                    justifyContent: "center",
                  }}
                >
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: isActive ? accent : isCompleted ? "#22c55e" : "#d0d0d0", color: "#fff", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {isCompleted ? "✓" : step.number}
                  </span>
                  {!isMobile && <span style={{ fontSize: "11px", fontWeight: 600, color: isActive ? accent : "#999", textTransform: "uppercase" }}>{step.title}</span>}
                </button>
                {isMobile && idx < NEW_STEPS.length - 1 && (
                  <div style={{ width: "16px", height: "2px", background: "#e5e7eb", flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Content */}
      <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #eee", padding: isMobile ? "20px 16px" : "40px", minHeight: "350px" }}>

        {/* Step 0: Start */}
        {currentStep === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>📖</div>
            <p style={{ fontSize: "18px", fontWeight: 600, color: "#444", marginBottom: "20px" }}>Personaliza tu libro en 5 simples pasos</p>
            <button onClick={() => setCurrentStep(1)} style={{ padding: "14px 36px", borderRadius: "12px", border: "none", background: accent, color: "#fff", fontSize: "16px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Comenzar
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
              <h3 style={{ margin: "0 0 8px 0", fontSize: "22px", fontWeight: 700 }}>1. Sube tus fotos</h3>
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
                <div style={{ fontSize: "12px", color: "#999" }}>{atLimit ? "Eliminá una foto para agregar otra" : "Arrastra o haz clic"}</div>
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
            <h3 style={{ margin: "0 0 8px 0", fontSize: "22px", fontWeight: 700 }}>2. Elige 3 escenarios</h3>
            <p style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#666" }}>
              Hojea el libro y haz clic en las páginas para seleccionar hasta 3 escenarios.
            </p>
            <div style={{ fontSize: "13px", color: selectedTemplates.length === 3 ? "#22c55e" : "#888", fontWeight: selectedTemplates.length === 3 ? 600 : 400, marginBottom: "24px", display: "flex", alignItems: "center", gap: "6px" }}>
              {selectedTemplates.length === 3 && <CheckCircle2 size={16} />}
              {selectedTemplates.length}/3 seleccionadas {selectedTemplates.length === 3 && "— Listo"}
            </div>

            {/* Selected templates preview */}
            {selectedTemplates.length > 0 && (
              <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                {selectedTemplates.map((id, i) => {
                  const tpl = templates.find((t) => t.id === id);
                  return tpl ? (
                    <div key={id} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 12px 6px 6px", borderRadius: "10px", background: `${accent}10`, border: `1px solid ${accent}30` }}>
                      <img src={tpl.previewUrl} alt="" style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }} />
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: 600, color: accent }}>{i + 1}. {tpl.name}</div>
                      </div>
                      <button onClick={() => toggleTemplate(id)} style={{ marginLeft: "4px", width: "20px", height: "20px", borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.1)", color: "#666", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}>x</button>
                    </div>
                  ) : null;
                })}
              </div>
            )}

            {isMobile ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                {templates.map((tpl, idx) => {
                  const isSelected = selectedTemplates.includes(tpl.id);
                  const selIdx = selectedTemplates.indexOf(tpl.id);
                  const isDisabled = !isSelected && selectedTemplates.length >= 3;
                  return (
                    <div
                      key={tpl.id}
                      onClick={() => !isDisabled && toggleTemplate(tpl.id)}
                      style={{
                        position: "relative", borderRadius: "12px", overflow: "hidden",
                        aspectRatio: "3/2",
                        border: isSelected ? `2px solid ${accent}` : "2px solid transparent",
                        opacity: isDisabled ? 0.4 : 1,
                        cursor: isDisabled ? "not-allowed" : "pointer",
                        boxShadow: isSelected ? `0 0 0 2px ${accent}40` : "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    >
                      <img src={tpl.previewUrl} alt={tpl.name ?? `Escenario ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      {isSelected && (
                        <div style={{ position: "absolute", top: "6px", right: "6px", width: "24px", height: "24px", borderRadius: "50%", background: accent, color: "#fff", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff" }}>
                          {selIdx + 1}
                        </div>
                      )}
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 8px 6px", background: "linear-gradient(transparent, rgba(0,0,0,0.55))" }}>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{tpl.name ?? `Escenario ${idx + 1}`}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <TemplateBook
                templates={templates}
                selectedIds={selectedTemplates}
                maxSelections={3}
                accent={accent}
                onToggle={toggleTemplate}
              />
            )}

            <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
              <button onClick={() => setCurrentStep(1)} style={{ padding: "12px 28px", borderRadius: "10px", border: `1px solid ${accent}`, background: "#fff", color: accent, fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Anterior</button>
              <button disabled={selectedTemplates.length === 0} onClick={() => setCurrentStep(3)} style={{ padding: "12px 28px", borderRadius: "10px", border: "none", background: selectedTemplates.length > 0 ? accent : "#e0e0e0", color: selectedTemplates.length > 0 ? "#fff" : "#999", fontSize: "15px", fontWeight: 700, cursor: selectedTemplates.length > 0 ? "pointer" : "not-allowed", fontFamily: "inherit" }}>Siguiente</button>
            </div>
          </div>
        )}

        {/* Step 3: Form */}
        {currentStep === 3 && (
          <div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "22px", fontWeight: 700 }}>3. Tus datos</h3>
            <p style={{ margin: "0 0 20px 0", fontSize: "14px", color: "#666" }}>Completa tus datos para la entrega y personalización del libro.</p>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <FormField label="Nombre completo *" value={form.customerFullName} onChange={(v) => updateForm("customerFullName", v)} isMobile={isMobile} />
              <FormField label="Email *" value={form.customerEmail} onChange={(v) => updateForm("customerEmail", v)} type="email" isMobile={isMobile} />
              <FormField label="Teléfono *" value={form.customerPhone} onChange={(v) => updateForm("customerPhone", v)} type="tel" isMobile={isMobile} />
              <FormField label="Fecha de entrega deseada *" value={form.deliveryDate} onChange={(v) => updateForm("deliveryDate", v)} type="date" isMobile={isMobile} />
              <FormField label="Dirección *" value={form.shippingAddressLine1} onChange={(v) => updateForm("shippingAddressLine1", v)} fullWidth isMobile={isMobile} />
              <FormField label="Dirección línea 2" value={form.shippingAddressLine2} onChange={(v) => updateForm("shippingAddressLine2", v)} isMobile={isMobile} />
              <FormField label="Ciudad" value={form.shippingCity} onChange={(v) => updateForm("shippingCity", v)} isMobile={isMobile} />
              <FormField label="Región" value={form.shippingRegion} onChange={(v) => updateForm("shippingRegion", v)} isMobile={isMobile} />
              <FormField label="Referencia" value={form.shippingReference} onChange={(v) => updateForm("shippingReference", v)} fullWidth isMobile={isMobile} />
            </div>

            {/* Tipo de tapa */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#333", marginBottom: "8px" }}>Tipo de tapa *</div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {variants.map((v) => (
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
                    <div style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>{formatPrice(v.basePriceCents)}</div>
                  </button>
                ))}
              </div>
            </div>

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
            <h3 style={{ margin: "0 0 20px 0", fontSize: "22px", fontWeight: 700 }}>4. Resumen de tu solicitud</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
              <SummaryRow label="Libro" value={libroNombre} />
              <SummaryRow label="Fotos subidas" value={`${photos.length} fotos`} />
              <SummaryRow label="Plantillas" value={selectedTemplates.map((id) => templates.find((p) => p.id === id)?.name ?? `#${id}`).join(", ")} />
              <SummaryRow label="Tapa" value={selectedVariant ? `${selectedVariant.coverType.replace("TAPA_", "Tapa ")} — ${formatPrice(selectedVariant.basePriceCents)}` : "—"} />
              <SummaryRow label="Cliente" value={form.customerFullName} />
              <SummaryRow label="Email" value={form.customerEmail} />
              <SummaryRow label="Teléfono" value={form.customerPhone} />
              <SummaryRow label="Dirección" value={`${form.shippingAddressLine1}${form.shippingCity ? `, ${form.shippingCity}` : ""}`} />
              <SummaryRow label="Entrega" value={form.deliveryDate} />
              <SummaryRow label="Dedicatoria" value={form.wantsCustomDedication ? (form.dedicationText || "Sí") : "No"} />
            </div>

            <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
              <button onClick={() => setCurrentStep(3)} style={{ padding: "12px 28px", borderRadius: "10px", border: `1px solid ${accent}`, background: "#fff", color: accent, fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Anterior</button>
              <button onClick={() => setCurrentStep(5)} style={{ padding: "12px 28px", borderRadius: "10px", border: "none", background: accent, color: "#fff", fontSize: "15px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Confirmar y Enviar</button>
            </div>
          </div>
        )}

        {/* Step 5: Submit */}
        {currentStep === 5 && !submitted && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>📬</div>
            <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>¿Listo para enviar tu solicitud?</h3>
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
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>✅</div>
            <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#065f46", marginBottom: "12px" }}>¡Solicitud enviada!</h3>
            <p style={{ fontSize: "16px", color: "#666", maxWidth: "500px", margin: "0 auto" }}>
              Tu solicitud de demo fue enviada correctamente. Nuestro equipo preparará las propuestas y las recibirás en <strong>{form.customerEmail}</strong>.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Helper components ── */

function FormField({ label, value, onChange, type = "text", fullWidth, isMobile }: { label: string; value: string; onChange: (v: string) => void; type?: string; fullWidth?: boolean; isMobile?: boolean }) {
  return (
    <div style={{ gridColumn: fullWidth && !isMobile ? "span 2" : undefined }}>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>{label}</label>
      <input
        type={type}
        value={value}
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
