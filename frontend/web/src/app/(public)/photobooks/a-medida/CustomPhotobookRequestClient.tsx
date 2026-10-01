"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { UploadedPhoto, usePhotoUpload } from "@/hooks/usePhotoUpload";
import { tokens } from "@/lib/design-tokens";

const API = "";
const REQUIRED_REFERENCE_SLOTS = 4;

type CoverMode = "PIXELART_DESIGNED" | "CUSTOMER_ARTWORK" | "PHOTO_BASED";
type ReferenceSurface = "FRONT_COVER" | "BACK_COVER";
type ReferenceSlotKey = "front-1" | "front-2" | "back-1" | "back-2";
type Step = 1 | 2 | 3 | 4;

type ReferenceSlot = {
  key: ReferenceSlotKey;
  surface: ReferenceSurface;
  slotIndex: 1 | 2;
  title: string;
  detail: string;
};

type SlotPhotos = Record<ReferenceSlotKey, UploadedPhoto | null>;

const REFERENCE_SLOTS: ReferenceSlot[] = [
  { key: "front-1", surface: "FRONT_COVER", slotIndex: 1, title: "Tapa · foto 1", detail: "La primera imagen que debe guiar la tapa frontal." },
  { key: "front-2", surface: "FRONT_COVER", slotIndex: 2, title: "Tapa · foto 2", detail: "Una segunda referencia para la tapa frontal." },
  { key: "back-1", surface: "BACK_COVER", slotIndex: 1, title: "Contratapa · foto 1", detail: "La primera imagen que debe guiar la contratapa." },
  { key: "back-2", surface: "BACK_COVER", slotIndex: 2, title: "Contratapa · foto 2", detail: "Una segunda referencia para la contratapa." },
];

const EMPTY_SLOT_PHOTOS: SlotPhotos = {
  "front-1": null,
  "front-2": null,
  "back-1": null,
  "back-2": null,
};

type FormState = {
  occasion: string;
  requestedTheme: string;
  coverTitle: string;
  coverMode: CoverMode;
  brief: string;
  customerFullName: string;
  customerEmail: string;
  customerPhone: string;
};

const initialForm: FormState = {
  occasion: "",
  requestedTheme: "",
  coverTitle: "",
  coverMode: "PIXELART_DESIGNED",
  brief: "",
  customerFullName: "",
  customerEmail: "",
  customerPhone: "",
};

const STEPS: Array<{ number: Step; label: string; detail: string }> = [
  { number: 1, label: "Tu historia", detail: "Idea y ocasión" },
  { number: 2, label: "La cubierta", detail: "Cómo la creamos" },
  { number: 3, label: "Referencias", detail: "Inspiración visual" },
  { number: 4, label: "Contacto", detail: "Siguiente paso" },
];

const COVER_MODES: Array<{ value: CoverMode; title: string; detail: string }> = [
  {
    value: "PIXELART_DESIGNED",
    title: "Quiero que PixelArt lo diseñe",
    detail: "Comparte tu idea y referencias. Diseñaremos tapa, lomo y contratapa para tu photobook.",
  },
  {
    value: "CUSTOMER_ARTWORK",
    title: "Ya tengo un diseño propio",
    detail: "Puedes mostrarnos una vista previa. Revisaremos contigo las especificaciones de imprenta.",
  },
  {
    value: "PHOTO_BASED",
    title: "Quiero una tapa con mis fotos",
    detail: "Usaremos tus fotografías y una dirección visual que definamos juntos.",
  },
];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value: string) {
  const normalized = value.replace(/[()\s.-]/g, "");
  return /^\+?[1-9]\d{7,14}$/.test(normalized);
}

function FieldLabel({ children, optional = false }: { children: string; optional?: boolean }) {
  return (
    <label className="custom-photobook-field-label">
      {children}
      {optional && <span>Opcional</span>}
    </label>
  );
}

function ReferenceSlotCard({
  slot,
  photo,
  uploading,
  onUpload,
  onRemove,
}: {
  slot: ReferenceSlot;
  photo: UploadedPhoto | null;
  uploading: boolean;
  onUpload: (slot: ReferenceSlot, files: FileList | null) => Promise<void>;
  onRemove: (slot: ReferenceSlot) => void;
}) {
  const inputId = `custom-photobook-reference-${slot.key}`;
  return (
    <article className={`custom-photobook-reference-slot ${photo ? "is-filled" : ""}`}>
      <div className="custom-photobook-reference-slot-copy">
        <strong>{slot.title}</strong>
        <span>{slot.detail}</span>
      </div>
      {photo ? (
        <div className="custom-photobook-reference-slot-preview">
          <img alt={slot.title} src={photo.preview} />
          <div>
            <label className="custom-photobook-slot-replace" htmlFor={inputId}>Reemplazar<input accept="image/*" disabled={uploading} id={inputId} onChange={(event) => void onUpload(slot, event.target.files)} type="file" /></label>
            <button aria-label={`Quitar ${slot.title}`} onClick={() => onRemove(slot)} type="button">Quitar</button>
          </div>
        </div>
      ) : (
        <label className="custom-photobook-slot-upload" htmlFor={inputId}>
          <input accept="image/*" disabled={uploading} id={inputId} onChange={(event) => void onUpload(slot, event.target.files)} type="file" />
          <span>{uploading ? "Subiendo…" : "Elegir foto"}</span>
          <small>JPG, PNG, HEIC o WEBP</small>
        </label>
      )}
    </article>
  );
}

function CoverProof() {
  return (
    <figure className="custom-photobook-proof" aria-label="Una cubierta completa con contratapa, lomo y tapa frontal">
      <div className="custom-photobook-proof-label">
        <span>Tu cubierta completa</span>
        <span>Contratapa · Lomo · Tapa</span>
      </div>
      <div className="custom-photobook-proof-stage">
        <div className="custom-photobook-proof-wrap" aria-hidden="true">
          <div className="custom-photobook-proof-panel custom-photobook-proof-back">
            <span>Contratapa</span>
            <strong>Una historia que merece quedarse.</strong>
            <i />
          </div>
          <div className="custom-photobook-proof-spine"><span>Tu historia</span></div>
          <div className="custom-photobook-proof-panel custom-photobook-proof-front">
            <span>Tapa</span>
            <strong>Tu<br />título</strong>
            <em>Photobook a medida</em>
          </div>
        </div>
      </div>
      <figcaption>Diseñamos las tres partes como una sola pieza.</figcaption>
    </figure>
  );
}

export default function CustomPhotobookRequestClient() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [activeStep, setActiveStep] = useState<Step>(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [slotPhotos, setSlotPhotos] = useState<SlotPhotos>(EMPTY_SLOT_PHOTOS);
  const {
    uploading,
    progress,
    error: uploadError,
    uploadFiles,
  } = usePhotoUpload("uploads/photobooks");
  const uploadedSlots = REFERENCE_SLOTS.filter((slot) => slotPhotos[slot.key] !== null);
  const hasAllReferenceSlots = uploadedSlots.length === REQUIRED_REFERENCE_SLOTS;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function validateStep(step: Step) {
    if (step === 1 && (!form.occasion || !form.requestedTheme.trim() || !form.brief.trim())) {
      setSubmitError("Cuéntanos la ocasión, el tema y la idea principal de tu photobook.");
      return false;
    }

    if (step === 3 && !hasAllReferenceSlots) {
      setSubmitError("Adjunta las cuatro fotos: dos para tapa y dos para contratapa.");
      return false;
    }

    if (step === 4 && (!form.customerFullName.trim() || !form.customerEmail.trim() || !form.customerPhone.trim())) {
      setSubmitError("Completa tu nombre, correo y teléfono para que podamos contactarte.");
      return false;
    }

    if (step === 4 && !isValidEmail(form.customerEmail)) {
      setSubmitError("Ingresa un correo electrónico válido para continuar.");
      return false;
    }

    if (step === 4 && !isValidPhone(form.customerPhone)) {
      setSubmitError("Ingresa un teléfono válido de 8 a 15 dígitos para continuar.");
      return false;
    }

    return true;
  }

  function goToNextStep() {
    setSubmitError(null);
    if (!validateStep(activeStep) || activeStep === 4) return;
    setActiveStep((activeStep + 1) as Step);
  }

  function goToPreviousStep() {
    setSubmitError(null);
    if (activeStep === 1) return;
    setActiveStep((activeStep - 1) as Step);
  }

  async function handleSlotPhoto(slot: ReferenceSlot, files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setSubmitError(null);
    const [uploaded] = await uploadFiles([file]);
    if (!uploaded) return;
    setSlotPhotos((current) => {
      const previous = current[slot.key];
      if (previous) URL.revokeObjectURL(previous.preview);
      return { ...current, [slot.key]: uploaded };
    });
  }

  function removeSlotPhoto(slot: ReferenceSlot) {
    setSlotPhotos((current) => {
      const previous = current[slot.key];
      if (previous) URL.revokeObjectURL(previous.preview);
      return { ...current, [slot.key]: null };
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    if (activeStep < 4) {
      goToNextStep();
      return;
    }

    if (!validateStep(3) || !validateStep(4)) return;

    setSubmitting(true);
    try {
      const response = await fetch(`${API}/api/photobook/custom-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          referenceSlots: REFERENCE_SLOTS.map((slot) => ({
            assetId: slotPhotos[slot.key]!.id,
            surface: slot.surface,
            slotIndex: slot.slotIndex,
          })),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message ?? "No pudimos enviar tu solicitud. Inténtalo nuevamente.");
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "No pudimos enviar tu solicitud. Inténtalo nuevamente.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="custom-photobook-page">
        <style>{pageStyles}</style>
        <section className="custom-photobook-success" aria-live="polite">
          <div className="custom-photobook-mark" aria-hidden="true">✓</div>
          <p className="custom-photobook-kicker">Solicitud recibida</p>
          <h1>Tu idea ya está en manos de nuestro equipo.</h1>
          <p>
            Revisaremos la tapa, contratapa y referencias de tu photobook a medida. Te contactaremos para definir el siguiente paso antes de que subas las fotos interiores.
          </p>
          <Link className="custom-photobook-primary-action" href="/photobooks">
            Ver photobooks
          </Link>
        </section>
      </main>
    );
  }

  const activeStepContent = STEPS.find((step) => step.number === activeStep)!;
  const hasInvalidEmail = Boolean(form.customerEmail.trim()) && !isValidEmail(form.customerEmail);
  const hasInvalidPhone = Boolean(form.customerPhone.trim()) && !isValidPhone(form.customerPhone);
  const isActiveStepComplete = activeStep === 1
    ? Boolean(form.occasion && form.requestedTheme.trim() && form.brief.trim())
    : activeStep === 3
      ? hasAllReferenceSlots
      : activeStep === 4
        ? Boolean(form.customerFullName.trim() && isValidEmail(form.customerEmail) && isValidPhone(form.customerPhone))
        : true;

  return (
    <main className="custom-photobook-page">
      <style>{pageStyles}</style>

      <header className="custom-photobook-intro">
        <Link className="custom-photobook-back" href="/photobooks">← Volver a photobooks</Link>
        <div className="custom-photobook-intro-copy">
          <p className="custom-photobook-kicker">Photobook a medida</p>
          <h1>Construyamos la cubierta de tu historia.</h1>
          <p className="custom-photobook-lead">
            Un proceso breve para entender tu idea antes de diseñar tapa, lomo y contratapa.
          </p>
        </div>
      </header>

      <form className="custom-photobook-workspace" onSubmit={submit} noValidate>
        <ol className="custom-photobook-top-stepper" aria-label="Pasos de la solicitud">
          {STEPS.map((step) => {
            const isActive = step.number === activeStep;
            const isComplete = step.number < activeStep;
            return (
              <li className={isActive ? "is-active" : isComplete ? "is-complete" : ""} key={step.number}>
                <button
                  aria-current={isActive ? "step" : undefined}
                  disabled={step.number > activeStep}
                  onClick={() => {
                    if (step.number < activeStep) {
                      setSubmitError(null);
                      setActiveStep(step.number);
                    }
                  }}
                  type="button"
                >
                  <span>{isComplete ? "✓" : step.number}</span>
                  <strong>{step.label}</strong>
                </button>
              </li>
            );
          })}
        </ol>

        <aside className="custom-photobook-brief-rail" aria-label="Progreso de la solicitud">
          <CoverProof />
          <div className="custom-photobook-brief-rail-copy">
            <p>Tu briefing creativo</p>
            <span>Avanzaremos paso a paso. Puedes volver a un paso anterior cuando lo necesites.</span>
          </div>
          <ol className="custom-photobook-steps">
            {STEPS.map((step) => {
              const isActive = step.number === activeStep;
              const isComplete = step.number < activeStep;
              return (
                <li className={isActive ? "is-active" : isComplete ? "is-complete" : ""} key={step.number}>
                  <button
                    aria-current={isActive ? "step" : undefined}
                    disabled={step.number > activeStep}
                    onClick={() => {
                      if (step.number < activeStep) {
                        setSubmitError(null);
                        setActiveStep(step.number);
                      }
                    }}
                    type="button"
                  >
                    <span className="custom-photobook-step-number">{isComplete ? "✓" : String(step.number).padStart(2, "0")}</span>
                    <span><strong>{step.label}</strong><small>{step.detail}</small></span>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        <section className="custom-photobook-step-panel" aria-labelledby={`custom-photobook-step-${activeStep}`}>
          <div className="custom-photobook-step-panel-head">
            <p>Paso {String(activeStep).padStart(2, "0")} de 04</p>
            <span>{activeStepContent.label}</span>
          </div>

          {activeStep === 1 && (
            <div className="custom-photobook-step-content">
              <div className="custom-photobook-section-heading">
                <h2 id="custom-photobook-step-1">La historia que quieres guardar</h2>
                <p>Con esto entendemos el concepto visual antes de diseñar la cubierta.</p>
              </div>
              <div className="custom-photobook-two-columns">
                <div>
                  <FieldLabel>¿Para qué ocasión es?</FieldLabel>
                  <select value={form.occasion} onChange={(event) => update("occasion", event.target.value)} required>
                    <option value="">Selecciona una opción</option>
                    <option value="Viaje">Viaje</option>
                    <option value="Quinceañera">Quinceañera</option>
                    <option value="Cumpleaños">Cumpleaños</option>
                    <option value="Boda">Boda</option>
                    <option value="Familiar">Historia familiar</option>
                    <option value="Otro">Otra ocasión</option>
                  </select>
                </div>
                <div>
                  <FieldLabel>Tema, ciudad o idea principal</FieldLabel>
                  <input value={form.requestedTheme} onChange={(event) => update("requestedTheme", event.target.value)} placeholder="Ej.: Japón, mis 15 años, nuestro aniversario" required />
                </div>
              </div>
              <div>
                <FieldLabel optional>Título que imaginas para la tapa</FieldLabel>
                <input value={form.coverTitle} onChange={(event) => update("coverTitle", event.target.value)} placeholder="Ej.: Japón, otoño de 2026" maxLength={160} />
              </div>
              <div>
                <FieldLabel>Cuéntanos cómo imaginas tu photobook</FieldLabel>
                <textarea value={form.brief} onChange={(event) => update("brief", event.target.value)} placeholder="Describe el estilo, colores, lugares, personas o cualquier detalle importante para tapa y contratapa." rows={6} required maxLength={2000} />
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="custom-photobook-step-content">
              <div className="custom-photobook-section-heading">
                <h2 id="custom-photobook-step-2">Cómo trabajaremos la cubierta</h2>
                <p>La propuesta final siempre contempla tapa frontal, lomo y contratapa.</p>
              </div>
              <div className="custom-photobook-cover-modes">
                {COVER_MODES.map((mode) => (
                  <label className={`custom-photobook-cover-mode ${form.coverMode === mode.value ? "is-selected" : ""}`} key={mode.value}>
                    <input checked={form.coverMode === mode.value} name="coverMode" onChange={() => update("coverMode", mode.value)} type="radio" value={mode.value} />
                    <span className="custom-photobook-radio" aria-hidden="true" />
                    <span><strong>{mode.title}</strong><small>{mode.detail}</small></span>
                  </label>
                ))}
              </div>
              <div className="custom-photobook-panel-note">
                <span aria-hidden="true">✦</span>
                No eliges una tapa genérica: revisaremos la propuesta contigo antes de pasar al editor de fotos interiores.
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="custom-photobook-step-content">
              <div className="custom-photobook-section-heading">
                <h2 id="custom-photobook-step-3">Cuatro fotos, dos decisiones claras</h2>
                <p>Elige dos fotos para la tapa y dos para la contratapa. Cada grupo se usará únicamente en su propia propuesta.</p>
              </div>
              <section aria-labelledby="custom-photobook-front-references" className="custom-photobook-reference-group">
                <div className="custom-photobook-reference-group-head">
                  <h3 id="custom-photobook-front-references">Para la tapa frontal</h3>
                  <p>Estas dos fotos quedarán disponibles solo para diseñar la tapa.</p>
                </div>
                <div className="custom-photobook-slot-grid">
                  {REFERENCE_SLOTS.filter((slot) => slot.surface === "FRONT_COVER").map((slot) => (
                    <ReferenceSlotCard key={slot.key} photo={slotPhotos[slot.key]} slot={slot} uploading={uploading} onRemove={removeSlotPhoto} onUpload={handleSlotPhoto} />
                  ))}
                </div>
              </section>
              <section aria-labelledby="custom-photobook-back-references" className="custom-photobook-reference-group">
                <div className="custom-photobook-reference-group-head">
                  <h3 id="custom-photobook-back-references">Para la contratapa</h3>
                  <p>Estas dos fotos quedarán disponibles solo para diseñar la contratapa.</p>
                </div>
                <div className="custom-photobook-slot-grid">
                  {REFERENCE_SLOTS.filter((slot) => slot.surface === "BACK_COVER").map((slot) => (
                    <ReferenceSlotCard key={slot.key} photo={slotPhotos[slot.key]} slot={slot} uploading={uploading} onRemove={removeSlotPhoto} onUpload={handleSlotPhoto} />
                  ))}
                </div>
              </section>
              {uploadError && <p className="custom-photobook-error">{uploadError}</p>}
              <p className="custom-photobook-optional-copy">{uploadedSlots.length} de {REQUIRED_REFERENCE_SLOTS} posiciones completas. Podrás elegir una o ambas fotos de cada grupo al generar su tapa.</p>
              {uploading && <p className="custom-photobook-upload-progress" aria-live="polite">Subiendo foto… {progress}%</p>}
            </div>
          )}

{activeStep === 4 && (
            <div className="custom-photobook-step-content">
              <div className="custom-photobook-section-heading">
                <h2 id="custom-photobook-step-4">¿Cómo te contactamos?</h2>
                <p>Usaremos estos datos solo para revisar tu solicitud y definir el siguiente paso contigo.</p>
              </div>
              <div className="custom-photobook-two-columns">
                <div><FieldLabel>Nombre completo</FieldLabel><input value={form.customerFullName} onChange={(event) => update("customerFullName", event.target.value)} autoComplete="name" required /></div>
                <div>
                  <FieldLabel>Teléfono</FieldLabel>
                  <input aria-describedby={hasInvalidPhone ? "custom-photobook-phone-error" : undefined} aria-invalid={hasInvalidPhone || undefined} autoComplete="tel" inputMode="tel" maxLength={40} onChange={(event) => update("customerPhone", event.target.value)} pattern="[+0-9][0-9 ()-]*" placeholder="+51 999 999 999" required type="tel" value={form.customerPhone} />
                  {hasInvalidPhone && <p className="custom-photobook-field-error" id="custom-photobook-phone-error">Usa entre 8 y 15 dígitos. Puedes incluir +, espacios, guiones o paréntesis.</p>}
                </div>
              </div>
              <div>
                <FieldLabel>Correo electrónico</FieldLabel>
                <input aria-describedby={hasInvalidEmail ? "custom-photobook-email-error" : undefined} aria-invalid={hasInvalidEmail || undefined} autoComplete="email" inputMode="email" maxLength={254} onChange={(event) => update("customerEmail", event.target.value)} required type="email" value={form.customerEmail} />
                {hasInvalidEmail && <p className="custom-photobook-field-error" id="custom-photobook-email-error">Ingresa un correo válido, por ejemplo: nombre@correo.com.</p>}
              </div>
              <div className="custom-photobook-panel-note">
                <span aria-hidden="true">✓</span>
                No realizas ningún pago ahora. Primero revisaremos contigo la propuesta de cubierta.
              </div>
            </div>
          )}

          {submitError && <p className="custom-photobook-error" role="alert">{submitError}</p>}

          <footer className="custom-photobook-step-actions">
            <button className="custom-photobook-secondary-action" disabled={activeStep === 1 || submitting} onClick={goToPreviousStep} type="button">
              ← Anterior
            </button>
            {activeStep < 4 ? (
              <button className="custom-photobook-primary-action" disabled={uploading || !isActiveStepComplete} onClick={goToNextStep} type="button">
                Continuar <span aria-hidden="true">→</span>
              </button>
            ) : (
              <button className="custom-photobook-primary-action" disabled={submitting || uploading || !isActiveStepComplete} type="submit">
                {submitting ? "Enviando solicitud…" : "Enviar mi idea"} <span aria-hidden="true">→</span>
              </button>
            )}
          </footer>
        </section>
      </form>
    </main>
  );
}

const pageStyles = `
  .custom-photobook-page { min-height: 100vh; background: #f6f9fb; color: #111; font-family: ${tokens.fonts.body}; }
  .custom-photobook-intro, .custom-photobook-workspace, .custom-photobook-success { width: min(100% - 40px, 1040px); margin: 0 auto; }
  .custom-photobook-intro { padding: clamp(36px, 6vw, 72px) 0 clamp(28px, 4vw, 46px); }
  .custom-photobook-back { color: #555; font-size: 14px; font-weight: 600; text-decoration: none; }
  .custom-photobook-back:hover { color: #111; text-decoration: underline; text-underline-offset: 4px; }
  .custom-photobook-intro-copy { max-width: 650px; margin-top: clamp(36px, 5vw, 58px); }
  .custom-photobook-kicker { display: flex; align-items: center; gap: 10px; margin: 0 0 16px; color: #2d8fd5; font-size: 12px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
  .custom-photobook-kicker::before { content: ""; width: 28px; height: 2px; background: currentColor; }
  .custom-photobook-intro h1, .custom-photobook-success h1 { max-width: 12ch; margin: 0; font-family: ${tokens.fonts.display}; font-size: clamp(42px, 5.2vw, 64px); font-weight: 400; letter-spacing: -.03em; line-height: .98; text-wrap: balance; }
  .custom-photobook-lead { max-width: 55ch; margin: 22px 0 0; color: #43515c; font-size: 17px; line-height: 1.65; text-wrap: pretty; }
  .custom-photobook-workspace { display: grid; grid-template-columns: minmax(250px, 310px) minmax(0, 1fr); column-gap: clamp(20px, 3vw, 36px); row-gap: 18px; align-items: start; padding-bottom: clamp(52px, 8vw, 96px); }
  .custom-photobook-top-stepper { display: grid; grid-column: 1 / -1; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; margin: 0; padding: 0; list-style: none; }
  .custom-photobook-top-stepper li { position: relative; }
  .custom-photobook-top-stepper li:not(:last-child)::after { position: absolute; z-index: 0; top: 22px; right: -8px; width: 8px; height: 1px; background: #d3e0e7; content: ""; }
  .custom-photobook-top-stepper button { position: relative; z-index: 1; display: grid; grid-template-columns: 30px minmax(0, 1fr); align-items: center; gap: 9px; width: 100%; min-height: 48px; padding: 8px 11px; border: 1px solid #d7e2e9; border-radius: 10px; background: #fff; color: #63727c; cursor: default; font-family: inherit; text-align: left; }
  .custom-photobook-top-stepper button:disabled { opacity: 1; }
  .custom-photobook-top-stepper button > span { display: grid; place-items: center; width: 26px; height: 26px; border: 1px solid #b8cad4; border-radius: 50%; color: #667985; font-size: 10px; font-weight: 800; }
  .custom-photobook-top-stepper strong { color: inherit; font-size: 12px; line-height: 1.2; }
  .custom-photobook-top-stepper li.is-active button { border-color: #2d8fd5; background: #eaf6fd; color: #176fae; }
  .custom-photobook-top-stepper li.is-active button > span { border-color: #2d8fd5; background: #2d8fd5; color: #fff; }
  .custom-photobook-top-stepper li.is-complete button { cursor: pointer; color: #315669; }
  .custom-photobook-top-stepper li.is-complete button:hover { border-color: #8cc9ec; background: #f6fbfe; }
  .custom-photobook-top-stepper li.is-complete button > span { border-color: #79c9f4; background: #79c9f4; color: #102233; }
  .custom-photobook-brief-rail { position: sticky; top: 88px; overflow: hidden; border-radius: 16px; background: #102233; color: #fff; }
  .custom-photobook-proof { margin: 0; padding: 18px 18px 0; }
  .custom-photobook-proof-label { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 12px; color: #d9edf9; font-size: 10px; font-weight: 800; letter-spacing: .06em; line-height: 1.35; text-transform: uppercase; }
  .custom-photobook-proof-label span:last-child { color: #79c9f4; text-align: right; }
  .custom-photobook-proof-stage { display: grid; place-items: center; min-height: 205px; padding: 16px; background: #0b1a28; }
  .custom-photobook-proof-wrap { display: grid; grid-template-columns: minmax(74px, 1fr) 30px minmax(98px, 1.2fr); width: min(100%, 245px); min-height: 154px; transform: perspective(700px) rotateY(-10deg) rotateX(2deg) rotateZ(-1deg); box-shadow: 12px 14px 0 rgba(0,0,0,.18), 20px 22px 32px rgba(0,0,0,.28); }
  .custom-photobook-proof-panel { position: relative; display: flex; flex-direction: column; overflow: hidden; min-height: 154px; padding: 13px; }
  .custom-photobook-proof-panel > span { font-size: 8px; font-weight: 800; letter-spacing: .07em; text-transform: uppercase; }
  .custom-photobook-proof-back { justify-content: space-between; background: #eef4f6; color: #123041; }
  .custom-photobook-proof-back::before { position: absolute; right: -26px; bottom: -36px; width: 105px; height: 105px; border: 18px solid #99d6f8; border-radius: 50%; content: ""; }
  .custom-photobook-proof-back strong { position: relative; z-index: 1; max-width: 7ch; font-family: ${tokens.fonts.display}; font-size: 18px; font-weight: 400; line-height: .98; }
  .custom-photobook-proof-back i { position: relative; z-index: 1; display: block; width: 28px; height: 3px; background: #2d8fd5; }
  .custom-photobook-proof-spine { display: grid; place-items: center; background: #e55a45; color: #fff; }
  .custom-photobook-proof-spine span { font-size: 8px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; writing-mode: vertical-rl; transform: rotate(180deg); }
  .custom-photobook-proof-front { justify-content: space-between; background: #2d8fd5; color: #fff; }
  .custom-photobook-proof-front::before { position: absolute; top: 13px; right: 13px; width: 13px; height: 13px; border: 2px solid #f6d65d; border-radius: 50%; content: ""; }
  .custom-photobook-proof-front strong { position: relative; z-index: 1; font-family: ${tokens.fonts.display}; font-size: 29px; font-weight: 400; letter-spacing: -.04em; line-height: .86; }
  .custom-photobook-proof-front em { position: relative; z-index: 1; font-size: 8px; font-style: normal; font-weight: 700; letter-spacing: .03em; }
  .custom-photobook-proof figcaption { margin-top: 11px; color: #a8c2d2; font-size: 12px; line-height: 1.45; }
  .custom-photobook-brief-rail-copy { padding: 22px 20px 18px; border-bottom: 1px solid rgba(255,255,255,.12); }
  .custom-photobook-brief-rail-copy p { margin: 0 0 7px; color: #79c9f4; font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
  .custom-photobook-brief-rail-copy span { color: #d7e4ec; font-size: 13px; line-height: 1.5; }
  .custom-photobook-steps { margin: 0; padding: 8px; list-style: none; }
  .custom-photobook-steps li button { display: grid; grid-template-columns: 34px minmax(0, 1fr); gap: 11px; width: 100%; padding: 12px; border: 1px solid transparent; border-radius: 10px; background: transparent; color: #dce8ef; cursor: default; font-family: inherit; text-align: left; }
  .custom-photobook-steps li.is-active button { border-color: rgba(121,201,244,.42); background: rgba(121,201,244,.12); color: #fff; }
  .custom-photobook-steps li.is-complete button { cursor: pointer; }
  .custom-photobook-steps li.is-complete button:hover { background: rgba(255,255,255,.07); }
  .custom-photobook-steps li button:disabled { opacity: .52; }
  .custom-photobook-step-number { display: grid; place-items: center; width: 28px; height: 28px; border: 1px solid rgba(255,255,255,.34); border-radius: 50%; color: #cfe5f3; font-size: 10px; font-weight: 800; }
  .custom-photobook-steps li.is-active .custom-photobook-step-number { border-color: #79c9f4; background: #79c9f4; color: #102233; }
  .custom-photobook-steps li.is-complete .custom-photobook-step-number { border-color: #79c9f4; background: #79c9f4; color: #102233; }
  .custom-photobook-steps strong { display: block; font-size: 13px; line-height: 1.25; }
  .custom-photobook-steps small { display: block; margin-top: 3px; color: #a8c2d2; font-size: 11px; line-height: 1.3; }
  .custom-photobook-step-panel { min-height: 610px; overflow: hidden; border: 1px solid #dfe7ed; border-radius: 16px; background: #fff; box-shadow: 0 8px 18px rgba(22,48,66,.07); }
  .custom-photobook-step-panel-head { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 18px clamp(22px, 4vw, 38px); border-bottom: 1px solid #e6edf1; background: #fbfdfe; }
  .custom-photobook-step-panel-head p { margin: 0; color: #2d8fd5; font-size: 11px; font-weight: 800; letter-spacing: .09em; text-transform: uppercase; }
  .custom-photobook-step-panel-head span { color: #566772; font-size: 13px; font-weight: 700; }
  .custom-photobook-step-content { display: grid; gap: 22px; padding: clamp(28px, 5vw, 46px) clamp(22px, 5vw, 50px) 30px; animation: customPhotobookStepIn 220ms cubic-bezier(.22, 1, .36, 1); }
  @keyframes customPhotobookStepIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
  .custom-photobook-section-heading h2 { margin: 0; font-family: ${tokens.fonts.display}; font-size: clamp(29px, 4vw, 39px); font-weight: 400; letter-spacing: -.025em; line-height: 1.06; text-wrap: balance; }
  .custom-photobook-section-heading p { max-width: 55ch; margin: 10px 0 0; color: #64727c; font-size: 14px; line-height: 1.55; }
  .custom-photobook-two-columns { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
  .custom-photobook-field-label { display: block; margin-bottom: 8px; color: #17242d; font-size: 13px; font-weight: 800; }
  .custom-photobook-field-label span { margin-left: 6px; color: #77858e; font-weight: 500; }
  .custom-photobook-field-error { margin: 7px 0 0; color: #bc3e2d; font-size: 12px; line-height: 1.35; }
  .custom-photobook-step-panel input[aria-invalid="true"] { border-color: #d75845; box-shadow: 0 0 0 3px rgba(215,88,69,.12); }
  .custom-photobook-step-panel input:not([type="radio"]), .custom-photobook-step-panel select, .custom-photobook-step-panel textarea { width: 100%; border: 1px solid #cbd8e0; border-radius: 9px; background: #fff; color: #111; font: inherit; font-size: 15px; line-height: 1.4; outline: none; transition: border-color 150ms ease, box-shadow 150ms ease; }
  .custom-photobook-step-panel input:not([type="radio"]), .custom-photobook-step-panel select { min-height: 50px; padding: 12px 14px; }
  .custom-photobook-step-panel textarea { padding: 14px; resize: vertical; }
  .custom-photobook-step-panel input:not([type="radio"]):focus, .custom-photobook-step-panel select:focus, .custom-photobook-step-panel textarea:focus { border-color: #2d8fd5; box-shadow: 0 0 0 3px rgba(45,143,213,.15); }
  .custom-photobook-cover-modes { display: grid; gap: 10px; }
  .custom-photobook-cover-mode { display: grid; grid-template-columns: 22px minmax(0, 1fr); gap: 13px; align-items: start; padding: 18px; border: 1px solid #d7e2e9; border-radius: 12px; cursor: pointer; transition: border-color 150ms ease, background-color 150ms ease, transform 150ms ease; }
  .custom-photobook-cover-mode:hover { border-color: #88c4ee; transform: translateY(-1px); }
  .custom-photobook-cover-mode.is-selected { border-color: #2d8fd5; background: rgba(45,143,213,.06); }
  .custom-photobook-cover-mode input { position: absolute; opacity: 0; pointer-events: none; }
  .custom-photobook-radio { width: 18px; height: 18px; margin-top: 2px; border: 1px solid #9fb1bc; border-radius: 50%; }
  .custom-photobook-cover-mode.is-selected .custom-photobook-radio { border: 5px solid #2d8fd5; }
  .custom-photobook-cover-mode strong { display: block; color: #17242d; font-size: 15px; }
  .custom-photobook-cover-mode small { display: block; max-width: 55ch; margin-top: 5px; color: #66757f; font-size: 13px; line-height: 1.45; }
  .custom-photobook-panel-note { display: flex; gap: 10px; align-items: flex-start; padding: 14px 16px; border: 1px solid rgba(45,143,213,.22); border-radius: 10px; background: rgba(45,143,213,.055); color: #315669; font-size: 13px; line-height: 1.5; }
  .custom-photobook-panel-note span { color: #176fae; font-weight: 800; }
  .custom-photobook-reference-group { display: grid; gap: 14px; padding: 18px; border: 1px solid #d7e5ec; border-radius: 12px; background: #fbfdfe; }
  .custom-photobook-reference-group-head h3 { margin: 0; color: #17242d; font-size: 16px; }
  .custom-photobook-reference-group-head p { margin: 4px 0 0; color: #64727c; font-size: 13px; line-height: 1.45; }
  .custom-photobook-slot-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .custom-photobook-reference-slot { display: grid; gap: 12px; min-height: 210px; padding: 14px; border: 1px dashed #78bceb; border-radius: 10px; background: #f6fbfe; }
  .custom-photobook-reference-slot.is-filled { border-style: solid; border-color: #8cc9ec; background: #fff; }
  .custom-photobook-reference-slot-copy strong { display: block; color: #176fae; font-size: 13px; }
  .custom-photobook-reference-slot-copy span { display: block; margin-top: 4px; color: #64727c; font-size: 12px; line-height: 1.4; }
  .custom-photobook-slot-upload { display: grid; min-height: 112px; place-content: center; justify-items: center; gap: 6px; border: 1px dashed #a6cfe8; border-radius: 8px; background: #fff; color: #176fae; cursor: pointer; text-align: center; }
  .custom-photobook-slot-upload input, .custom-photobook-slot-replace input { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
  .custom-photobook-slot-upload span { font-size: 14px; font-weight: 800; }
  .custom-photobook-slot-upload small { color: #64727c; font-size: 11px; }
  .custom-photobook-reference-slot-preview { display: grid; grid-template-columns: 1fr auto; gap: 10px; min-height: 112px; }
  .custom-photobook-reference-slot-preview img { width: 100%; height: 112px; border-radius: 7px; object-fit: cover; }
  .custom-photobook-reference-slot-preview > div { display: grid; align-content: center; gap: 8px; }
  .custom-photobook-slot-replace, .custom-photobook-reference-slot-preview button { display: inline-flex; align-items: center; justify-content: center; min-height: 32px; padding: 0 8px; border: 1px solid #b8cad4; border-radius: 6px; background: #fff; color: #1d4a63; cursor: pointer; font: inherit; font-size: 11px; font-weight: 800; text-align: center; }
  .custom-photobook-reference-slot-preview button { color: #a1261b; }
  .custom-photobook-upload-progress { margin: 0; color: #176fae; font-size: 12px; font-weight: 700; }
  .custom-photobook-upload { position: relative; display: grid; place-items: center; min-height: 210px; border: 1px dashed #78bceb; border-radius: 12px; background: #f6fbfe; text-align: center; }
  .custom-photobook-upload input { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
  .custom-photobook-upload label { display: grid; justify-items: center; gap: 8px; color: #176fae; pointer-events: none; }
  .custom-photobook-upload label span { font-size: 16px; font-weight: 800; }
  .custom-photobook-upload label small { color: #64727c; font-size: 12px; }
  .custom-photobook-reference-list { display: flex; flex-wrap: wrap; gap: 12px; }
  .custom-photobook-reference { position: relative; width: 112px; height: 112px; overflow: hidden; border: 1px solid #d7e2e9; border-radius: 9px; background: #f6f6f6; }
  .custom-photobook-reference img { width: 100%; height: 100%; object-fit: cover; }
  .custom-photobook-reference button { position: absolute; top: 6px; right: 6px; display: grid; place-items: center; width: 28px; height: 28px; border: none; border-radius: 50%; background: #111; color: #fff; cursor: pointer; font-size: 18px; line-height: 1; }
  .custom-photobook-optional-copy { margin: 0; color: #71808a; font-size: 13px; line-height: 1.55; }
  .custom-photobook-error { margin: 0 clamp(22px, 5vw, 50px) 14px; color: #b42318; font-size: 14px; font-weight: 700; }
  .custom-photobook-step-actions { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 20px clamp(22px, 5vw, 50px) clamp(24px, 4vw, 34px); border-top: 1px solid #e6edf1; }
  .custom-photobook-primary-action, .custom-photobook-secondary-action { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 50px; padding: 0 22px; border-radius: 999px; cursor: pointer; font-family: ${tokens.fonts.body}; font-size: 14px; font-weight: 800; text-decoration: none; transition: transform 160ms ease, background-color 160ms ease, border-color 160ms ease; }
  .custom-photobook-primary-action { border: 1px solid #2d8fd5; background: #2d8fd5; color: #fff; }
  .custom-photobook-primary-action:hover:not(:disabled) { transform: translateY(-2px); background: #197ab9; }
  .custom-photobook-secondary-action { border: 1px solid #cbd8e0; background: #fff; color: #485862; }
  .custom-photobook-secondary-action:hover:not(:disabled) { border-color: #8dbde0; color: #176fae; }
  .custom-photobook-primary-action:focus-visible, .custom-photobook-secondary-action:focus-visible { outline: 3px solid #80c5ee; outline-offset: 3px; }
  .custom-photobook-primary-action:disabled, .custom-photobook-secondary-action:disabled { cursor: not-allowed; opacity: .48; }
  .custom-photobook-success { max-width: 700px; padding: clamp(72px, 14vw, 160px) 0; }
  .custom-photobook-success > p:not(.custom-photobook-kicker) { max-width: 55ch; margin: 26px 0 32px; color: #43515c; font-size: 17px; line-height: 1.65; }
  .custom-photobook-mark { display: grid; place-items: center; width: 48px; height: 48px; margin-bottom: 30px; border-radius: 50%; background: #2d8fd5; color: #fff; font-size: 24px; font-weight: 700; }
  @media (max-width: 820px) {
    .custom-photobook-workspace { grid-template-columns: 1fr; }
    .custom-photobook-brief-rail { position: static; display: grid; grid-template-columns: minmax(220px, 290px) minmax(0, 1fr); }
    .custom-photobook-proof { grid-row: span 2; }
    .custom-photobook-brief-rail-copy { border-bottom: 1px solid rgba(255,255,255,.12); }
    .custom-photobook-steps { display: grid; grid-template-columns: 1fr 1fr; padding: 10px; }
  }
  @media (max-width: 560px) {
    .custom-photobook-intro, .custom-photobook-workspace, .custom-photobook-success { width: min(100% - 32px, 1040px); }
    .custom-photobook-intro { padding-top: 32px; }
    .custom-photobook-intro-copy { margin-top: 32px; }
    .custom-photobook-intro h1 { max-width: 11ch; font-size: clamp(39px, 13vw, 54px); }
    .custom-photobook-lead { font-size: 16px; }
    .custom-photobook-top-stepper { gap: 5px; }
    .custom-photobook-top-stepper li:not(:last-child)::after { top: 20px; right: -5px; width: 5px; }
    .custom-photobook-top-stepper button { display: grid; place-items: center; min-height: 42px; padding: 6px; }
    .custom-photobook-top-stepper button > span { width: 24px; height: 24px; }
    .custom-photobook-top-stepper strong { display: none; }
    .custom-photobook-brief-rail { display: block; }
    .custom-photobook-proof { padding: 16px 16px 0; }
    .custom-photobook-proof-stage { min-height: 190px; }
    .custom-photobook-proof-wrap { width: min(100%, 235px); min-height: 148px; }
    .custom-photobook-proof-panel { min-height: 148px; }
    .custom-photobook-brief-rail-copy { padding: 18px 16px 14px; }
    .custom-photobook-steps { grid-template-columns: 1fr 1fr; padding: 8px; }
    .custom-photobook-steps li button { grid-template-columns: 28px minmax(0, 1fr); gap: 8px; padding: 9px; }
    .custom-photobook-step-number { width: 24px; height: 24px; font-size: 9px; }
    .custom-photobook-steps small { display: none; }
    .custom-photobook-step-panel { min-height: auto; }
    .custom-photobook-step-panel-head { padding: 16px 20px; }
    .custom-photobook-step-panel-head span { font-size: 12px; }
    .custom-photobook-step-content { gap: 20px; padding: 28px 20px 24px; }
    .custom-photobook-section-heading h2 { font-size: 31px; }
    .custom-photobook-two-columns { grid-template-columns: 1fr; gap: 18px; }
    .custom-photobook-cover-mode { padding: 15px; }
    .custom-photobook-slot-grid { grid-template-columns: 1fr; }
    .custom-photobook-step-actions { padding: 18px 20px 22px; }
    .custom-photobook-primary-action, .custom-photobook-secondary-action { min-height: 48px; padding: 0 16px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .custom-photobook-step-content, .custom-photobook-cover-mode, .custom-photobook-primary-action, .custom-photobook-secondary-action, .custom-photobook-step-panel input, .custom-photobook-step-panel select, .custom-photobook-step-panel textarea { animation: none; transition: none; }
  }
`;
