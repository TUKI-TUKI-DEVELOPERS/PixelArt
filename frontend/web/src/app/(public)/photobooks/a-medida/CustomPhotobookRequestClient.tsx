"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { UploadedPhoto, usePhotoUpload } from "@/hooks/usePhotoUpload";
import { tokens } from "@/lib/design-tokens";
import PhotobookFormatSelector, {
  THICK_COVER_EXAMPLES,
  THIN_COVER_EXAMPLES,
} from "@/components/photobook/PhotobookFormatSelector";
import type { PhotobookCoverType } from "@/components/photobook/PhotobookFormatSelector";

const API = "";
type SelectedCoverType = PhotobookCoverType | "";
type Surface = "FRONT_COVER" | "BACK_COVER";
type Step = 1 | 2 | 3;

type CoverImageFieldProps = {
  surface: Surface;
  title: string;
  description: string;
  photo: UploadedPhoto | null;
  uploading: boolean;
  onUpload: (files: FileList | null) => void;
  onRemove: () => void;
};

const CUSTOM_PHOTOBOOK_UPLOAD_MAX_DIMENSION = 5000;

const STEPS: Array<{ number: Step; title: string; detail: string }> = [
  { number: 1, title: "Cubierta", detail: "Imágenes y título" },
  { number: 2, title: "Formato", detail: "Tapa y hojas" },
  { number: 3, title: "Contacto", detail: "Tus datos" },
];

function getCustomSheetOptions(coverType: SelectedCoverType) {
  if (coverType === "TAPA_GRUESA") return THICK_COVER_EXAMPLES;
  if (coverType === "TAPA_DELGADA") return THIN_COVER_EXAMPLES.filter((option) => option.sheets !== 50);
  return [];
}

function isValidEmail(value: string) {
  const email = value.trim();
  return email.length <= 254 && /^[^\s@.]+(?:\.[^\s@.]+)*@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i.test(email);
}

function isValidPhone(value: string) {
  const phone = value.replace(/[()\s.-]/g, "");
  return /^(?:\+?51)?9\d{8}$/.test(phone) || /^\+[1-9]\d{7,14}$/.test(phone);
}

function CoverImageField({ surface, title, description, photo, uploading, onUpload, onRemove }: CoverImageFieldProps) {
  const inputId = `custom-photobook-${surface.toLowerCase()}`;
  return (
    <section className={`custom-cover-upload ${photo ? "has-image" : ""}`} aria-labelledby={`${inputId}-title`}>
      <div className="custom-cover-upload-heading">
        <span className="custom-cover-upload-index" aria-hidden="true">{surface === "FRONT_COVER" ? "A" : "B"}</span>
        <div>
          <h3 id={`${inputId}-title`}>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      {photo ? (
        <div className="custom-cover-preview">
          <img src={photo.preview} alt={`Vista previa: ${title.toLowerCase()}`} />
          <div className="custom-cover-preview-footer">
            <span title={photo.originalFilename}>{photo.originalFilename}</span>
            <div className="custom-cover-preview-actions">
              <label className="custom-cover-action" htmlFor={inputId}>
                Reemplazar
                <input id={inputId} type="file" accept="image/jpeg,image/png,image/webp,image/heic" disabled={uploading} onChange={(event) => onUpload(event.target.files)} />
              </label>
              <button type="button" className="custom-cover-action is-remove" onClick={onRemove}>Quitar</button>
            </div>
          </div>
        </div>
      ) : (
        <label className="custom-cover-dropzone" htmlFor={inputId}>
          <input id={inputId} type="file" accept="image/jpeg,image/png,image/webp,image/heic" disabled={uploading} onChange={(event) => onUpload(event.target.files)} />
          <span className="custom-cover-upload-icon" aria-hidden="true">↑</span>
          <strong>{uploading ? "Subiendo imagen…" : "Seleccionar imagen"}</strong>
          <small>JPG, PNG, WEBP o HEIC</small>
        </label>
      )}
    </section>
  );
}

export default function CustomPhotobookRequestClient() {
  const successSectionRef = useRef<HTMLElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const formatDialogRef = useRef<HTMLDivElement>(null);
  const formatDialogHeadingRef = useRef<HTMLHeadingElement>(null);
  const formatTriggerRef = useRef<HTMLButtonElement>(null);
  const [activeStep, setActiveStep] = useState<Step>(1);
  const [frontCover, setFrontCover] = useState<UploadedPhoto | null>(null);
  const [backCover, setBackCover] = useState<UploadedPhoto | null>(null);
  const [coverTitle, setCoverTitle] = useState("");
  const [titleValidationAttempted, setTitleValidationAttempted] = useState(false);
  const [selectedCoverType, setSelectedCoverType] = useState<SelectedCoverType>("");
  const [selectedSheetCount, setSelectedSheetCount] = useState<number | "">("");
  const [draftCoverType, setDraftCoverType] = useState<PhotobookCoverType>("TAPA_DELGADA");
  const [draftSheetCount, setDraftSheetCount] = useState(0);
  const [formatDialogOpen, setFormatDialogOpen] = useState(false);
  const [formatDialogError, setFormatDialogError] = useState<string | null>(null);
  const [customerFullName, setCustomerFullName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [contactValidationAttempted, setContactValidationAttempted] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { uploading, progress, error: uploadError, uploadFiles } = usePhotoUpload("uploads/photobooks", {
    maxDimension: CUSTOM_PHOTOBOOK_UPLOAD_MAX_DIMENSION,
  });

  const selectedSheetOption = getCustomSheetOptions(selectedCoverType).find((option) => option.sheets === selectedSheetCount);
  const draftSheetOption = getCustomSheetOptions(draftCoverType).find((option) => option.sheets === draftSheetCount);
  const titleInvalid = titleValidationAttempted && !coverTitle.trim();
  const nameInvalid = contactValidationAttempted && !customerFullName.trim();
  const emailInvalid = (customerEmail.length > 0 || contactValidationAttempted) && !isValidEmail(customerEmail);
  const phoneInvalid = (customerPhone.length > 0 || contactValidationAttempted) && !isValidPhone(customerPhone);

  useEffect(() => {
    if (!submitted) return;
    const section = successSectionRef.current;
    const heading = successHeadingRef.current;
    if (!section || !heading) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    section.scrollIntoView?.({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    heading.focus({ preventScroll: true });
  }, [submitted]);

  useEffect(() => {
    if (!formatDialogOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    formatDialogHeadingRef.current?.focus();

    function handleDialogKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setFormatDialogOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = formatDialogRef.current;
      const focusable = dialog?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) {
        event.preventDefault();
        formatDialogRef.current?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === formatDialogHeadingRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleDialogKeyDown);
    return () => {
      document.removeEventListener("keydown", handleDialogKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [formatDialogOpen]);

  async function handleUpload(surface: Surface, files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setStepError(null);
    const [uploaded] = await uploadFiles([file]);
    if (!uploaded) return;
    const setter = surface === "FRONT_COVER" ? setFrontCover : setBackCover;
    setter((previous) => {
      if (previous) URL.revokeObjectURL(previous.preview);
      return uploaded;
    });
  }

  function removeImage(surface: Surface) {
    const setter = surface === "FRONT_COVER" ? setFrontCover : setBackCover;
    setter((previous) => {
      if (previous) URL.revokeObjectURL(previous.preview);
      return null;
    });
  }

  function openFormatDialog() {
    const initialCover = selectedCoverType || "TAPA_DELGADA";
    setDraftCoverType(initialCover);
    setDraftSheetCount(selectedCoverType && selectedSheetCount !== "" ? selectedSheetCount : 0);
    setFormatDialogError(null);
    setStepError(null);
    setFormatDialogOpen(true);
  }

  function handleSelectDraftCover(cover: PhotobookCoverType) {
    setDraftCoverType(cover);
    setDraftSheetCount((current) => getCustomSheetOptions(cover).some((option) => option.sheets === current) ? current : 0);
  }

  function handleSelectDraftSheets(cover: PhotobookCoverType, sheets: number) {
    setDraftCoverType(cover);
    setDraftSheetCount(sheets);
    setFormatDialogError(null);
  }

  function confirmFormat() {
    if (!draftSheetOption) {
      setFormatDialogError("Selecciona una cantidad de hojas para continuar.");
      return;
    }
    setSelectedCoverType(draftCoverType);
    setSelectedSheetCount(draftSheetCount);
    setFormatDialogError(null);
    setFormatDialogOpen(false);
  }

  function goToPreviousStep() {
    if (activeStep === 1) return;
    setActiveStep((activeStep - 1) as Step);
    setStepError(null);
  }

  function goToNextStep() {
    setStepError(null);
    if (activeStep === 1) {
      if (!frontCover || !backCover) {
        setStepError("Adjunta una imagen para la tapa y otra para la contratapa.");
        return;
      }
      if (frontCover.id === backCover.id) {
        setStepError("La tapa y la contratapa necesitan imágenes distintas.");
        return;
      }
      if (!coverTitle.trim()) {
        setTitleValidationAttempted(true);
        setStepError("Escribe el título que quieres para la tapa principal.");
        return;
      }
      setActiveStep(2);
      return;
    }
    if (activeStep === 2) {
      if (!selectedCoverType || selectedSheetCount === "") {
        openFormatDialog();
        return;
      }
      setActiveStep(3);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStepError(null);
    setContactValidationAttempted(true);
    if (!customerFullName.trim() || !isValidEmail(customerEmail) || !isValidPhone(customerPhone)) {
      setStepError("Revisa los datos de contacto marcados antes de enviar.");
      return;
    }
    if (!frontCover || !backCover || !selectedCoverType || selectedSheetCount === "") {
      setStepError("Falta completar la cubierta o el formato. Vuelve al paso correspondiente.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API}/api/photobook/custom-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          occasion: "Tapa personalizada",
          requestedTheme: "Diseño proporcionado por el cliente",
          coverTitle: coverTitle.trim(),
          coverMode: "CUSTOMER_ARTWORK",
          coverType: selectedCoverType,
          sheetCount: selectedSheetCount,
          brief: "El cliente proporciona la tapa frontal y la contratapa. Conservar el contenido visual; adaptar únicamente lo necesario para preparar la impresión.",
          referenceSlots: [
            { assetId: frontCover.id, surface: "FRONT_COVER", slotIndex: 1 },
            { assetId: backCover.id, surface: "BACK_COVER", slotIndex: 1 },
          ],
          customerFullName: customerFullName.trim(),
          customerEmail: customerEmail.trim(),
          customerPhone: customerPhone.trim(),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message ?? "No pudimos enviar tu solicitud. Inténtalo nuevamente.");
      setSubmitted(true);
    } catch (error) {
      setStepError(error instanceof Error ? error.message : "No pudimos enviar tu solicitud. Inténtalo nuevamente.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="custom-photobook-page">
        <style>{pageStyles}</style>
        <section ref={successSectionRef} className="custom-request-card custom-request-success" aria-live="polite">
          <span className="custom-request-eyebrow">SOLICITUD RECIBIDA</span>
          <div className="custom-request-success-mark" aria-hidden="true">✓</div>
          <h1 ref={successHeadingRef} tabIndex={-1}>Ya tenemos tu diseño.</h1>
          <p>Revisaremos la tapa, la contratapa y el formato. Nuestro equipo te contactará para coordinar el precio de la personalización y los siguientes pasos.</p>
          <Link className="custom-request-submit" href="/photobooks">Volver a photobooks</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="custom-photobook-page">
      <style>{pageStyles}</style>
      <header className="custom-request-header">
        <Link className="custom-request-back" href="/photobooks">← Volver a photobooks</Link>
        <div className="custom-request-heading">
          <span className="custom-request-eyebrow">PHOTOBOOK A MEDIDA · TAPA PERSONALIZADA</span>
          <h1>Tu diseño, listo para convertirse en photobook.</h1>
          <p>Comparte la cubierta, elige el formato de impresión y déjanos tus datos.</p>
        </div>
      </header>

      <div className="custom-request-workspace">
        <div className="custom-stepper-meta" aria-live="polite">
          <span>Paso {activeStep} de 3</span>
          <span>{STEPS[activeStep - 1].detail}</span>
        </div>
        <ol className="custom-request-stepper" aria-label="Pasos de tu solicitud">
          {STEPS.map((step) => {
            const isComplete = step.number < activeStep;
            const isCurrent = step.number === activeStep;
            return (
              <li key={step.number} className={`${isComplete ? "is-complete" : ""} ${isCurrent ? "is-current" : ""}`}>
                <button
                  type="button"
                  aria-current={isCurrent ? "step" : undefined}
                  aria-label={`Paso ${step.number}: ${step.title}${isComplete ? ", completado" : isCurrent ? ", actual" : ", pendiente"}`}
                  disabled={step.number > activeStep}
                  onClick={() => {
                    if (isComplete) {
                      setActiveStep(step.number);
                      setStepError(null);
                    }
                  }}
                >
                  <span className="custom-step-number" aria-hidden="true">{isComplete ? "✓" : step.number}</span>
                  <span className="custom-step-copy"><strong>{step.title}</strong><small>{step.detail}</small></span>
                </button>
              </li>
            );
          })}
        </ol>

        <form className="custom-request-card" onSubmit={submit} noValidate>
          {activeStep === 1 && (
            <section className="custom-request-step-panel" aria-labelledby="custom-step-cover-title">
              <div className="custom-step-heading">
                <p className="custom-step-kicker">Paso 1 · Cubierta</p>
                <h2 id="custom-step-cover-title">Comparte las dos caras</h2>
                <p>Sube la imagen de la tapa y la contratapa. PixelArt preparará el lomo.</p>
              </div>
              <div className="custom-cover-grid">
                <CoverImageField surface="FRONT_COVER" title="Tapa principal" description="La imagen frontal del photobook." photo={frontCover} uploading={uploading} onUpload={(files) => void handleUpload("FRONT_COVER", files)} onRemove={() => removeImage("FRONT_COVER")} />
                <CoverImageField surface="BACK_COVER" title="Contratapa" description="La imagen posterior del photobook." photo={backCover} uploading={uploading} onUpload={(files) => void handleUpload("BACK_COVER", files)} onRemove={() => removeImage("BACK_COVER")} />
              </div>
              {uploading && <p className="custom-request-upload-status" aria-live="polite">Subiendo imagen… {progress}%</p>}
              {uploadError && <p className="custom-request-error" role="alert">{uploadError}</p>}
              <label className="custom-request-field custom-title-field">
                <span>Título para la tapa <b aria-hidden="true">*</b></span>
                <input value={coverTitle} onChange={(event) => setCoverTitle(event.target.value)} maxLength={160} required aria-invalid={titleInvalid || undefined} aria-describedby="custom-cover-title-help" placeholder="Ej.: Nuestra historia" />
                <small id="custom-cover-title-help">Puedes añadir una indicación breve, como el color de letra que prefieres.</small>
              </label>
            </section>
          )}

          {activeStep === 2 && (
            <section className="custom-request-step-panel" aria-labelledby="custom-step-format-title">
              <div className="custom-step-heading">
                <p className="custom-step-kicker">Paso 2 · Formato</p>
                <h2 id="custom-step-format-title">Elige el formato de impresión</h2>
                <p>El precio base depende del tipo de tapa y la cantidad de hojas.</p>
              </div>
              {selectedSheetOption && selectedCoverType ? (
                <div className="custom-format-summary" aria-live="polite">
                  <div>
                    <span className="custom-format-summary-label">Formato elegido</span>
                    <strong>{selectedCoverType === "TAPA_GRUESA" ? "Tapa gruesa" : "Tapa delgada"} · {selectedSheetCount} hojas · {Number(selectedSheetCount) * 2} páginas</strong>
                  </div>
                  <div className="custom-format-summary-price">
                    <span>Precio base</span>
                    <strong>{selectedSheetOption.price}</strong>
                  </div>
                  <button ref={formatTriggerRef} type="button" className="custom-format-change" onClick={openFormatDialog}>Cambiar</button>
                  <p className="custom-cover-cost-notice" role="note">
                    <AlertTriangle aria-hidden="true" size={18} />
                    <span><strong>Importante: las tapas personalizadas tienen un costo aparte.</strong> El recargo por personalizar ambas tapas se acuerda por separado y no está incluido en este precio.</span>
                  </p>
                </div>
              ) : (
                <div className="custom-format-empty">
                  <p>Aún no eliges un formato.</p>
                  <span>Selecciona el tipo de tapa y las hojas para ver el precio base.</span>
                  <button ref={formatTriggerRef} type="button" className="custom-format-open" onClick={openFormatDialog}>Elegir formato</button>
                </div>
              )}
            </section>
          )}

          {activeStep === 3 && (
            <section className="custom-request-step-panel" aria-labelledby="custom-step-contact-title">
              <div className="custom-step-heading">
                <p className="custom-step-kicker">Paso 3 · Contacto</p>
                <h2 id="custom-step-contact-title">¿Cómo te encontramos?</h2>
                <p>Te escribiremos para revisar el diseño y coordinar el recargo por las tapas.</p>
              </div>
              <dl className="custom-request-review" aria-label="Resumen de tu photobook">
                <div><dt>Cubierta</dt><dd>2 imágenes · {coverTitle.trim()}</dd></div>
                <div><dt>Formato</dt><dd>{selectedCoverType === "TAPA_GRUESA" ? "Tapa gruesa" : "Tapa delgada"} · {selectedSheetCount} hojas · {selectedSheetOption?.price}</dd></div>
                <div><dt>Personalización</dt><dd>Recargo por ambas tapas a coordinar</dd></div>
              </dl>
              <div className="custom-request-contact-grid">
                <label className="custom-request-field">
                  <span>Nombre completo <b aria-hidden="true">*</b></span>
                  <input autoComplete="name" value={customerFullName} onChange={(event) => setCustomerFullName(event.target.value)} maxLength={120} required aria-invalid={nameInvalid || undefined} />
                  {nameInvalid && <small className="custom-request-inline-error" role="alert">Escribe tu nombre completo.</small>}
                </label>
                <label className="custom-request-field">
                  <span>Teléfono / WhatsApp <b aria-hidden="true">*</b></span>
                  <input autoComplete="tel" type="tel" inputMode="tel" value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} maxLength={40} placeholder="+51 999 999 999" required aria-invalid={phoneInvalid || undefined} aria-describedby={phoneInvalid ? "custom-phone-error" : "custom-phone-hint"} />
                  <small id="custom-phone-hint">Celular peruano de 9 dígitos o número internacional con prefijo +.</small>
                  {phoneInvalid && <small id="custom-phone-error" className="custom-request-inline-error" role="alert">Ingresa un celular peruano de 9 dígitos o un número internacional válido con prefijo +.</small>}
                </label>
                <label className="custom-request-field custom-request-email">
                  <span>Correo electrónico <b aria-hidden="true">*</b></span>
                  <input autoComplete="email" type="email" inputMode="email" value={customerEmail} onChange={(event) => setCustomerEmail(event.target.value)} maxLength={254} required aria-invalid={emailInvalid || undefined} aria-describedby={emailInvalid ? "custom-email-error" : undefined} placeholder="nombre@correo.com" />
                  {emailInvalid && <small id="custom-email-error" className="custom-request-inline-error" role="alert">Escribe un correo válido, por ejemplo nombre@dominio.com.</small>}
                </label>
              </div>
            </section>
          )}

          {stepError && <p className="custom-request-error" role="alert">{stepError}</p>}
          <footer className="custom-request-footer">
            {activeStep > 1 ? <button type="button" className="custom-request-back-action" onClick={goToPreviousStep} disabled={submitting}>Volver</button> : <span />}
            <p>{activeStep === 3 ? "Al enviar, autorizas a PixelArt a revisar tus imágenes para preparar la propuesta de impresión." : "Tus datos y archivos se conservarán al cambiar de paso."}</p>
            {activeStep < 3 ? (
              <button type="button" className="custom-request-submit" onClick={goToNextStep} disabled={submitting || uploading}>Continuar <span aria-hidden="true">→</span></button>
            ) : (
              <button className="custom-request-submit" type="submit" disabled={submitting || uploading}>
                {submitting ? "Enviando solicitud…" : "Enviar mi diseño"}<span aria-hidden="true">→</span>
              </button>
            )}
          </footer>
        </form>
      </div>

      {formatDialogOpen && (
        <div className="custom-format-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setFormatDialogOpen(false); }}>
          <div ref={formatDialogRef} className="custom-format-dialog" role="dialog" aria-modal="true" aria-labelledby="custom-format-dialog-title" aria-describedby="custom-format-dialog-description" tabIndex={-1}>
            <div className="custom-format-dialog-header">
              <div>
                <p className="custom-step-kicker">Formato de impresión</p>
                <h2 id="custom-format-dialog-title" ref={formatDialogHeadingRef} tabIndex={-1}>Elige la tapa y las hojas</h2>
                <p id="custom-format-dialog-description">Elige el formato base. La personalización de ambas tapas se cotiza aparte.</p>
              </div>
              <button type="button" className="custom-format-dialog-close" onClick={() => setFormatDialogOpen(false)} aria-label="Cerrar selector de formato">×</button>
            </div>
            <PhotobookFormatSelector
              compact
              showPrice
              customOnly
              selectedCover={draftCoverType}
              thinSheets={draftCoverType === "TAPA_DELGADA" ? draftSheetCount : 0}
              thickSheets={draftCoverType === "TAPA_GRUESA" ? draftSheetCount : 0}
              onSelectCover={handleSelectDraftCover}
              onSelectSheets={handleSelectDraftSheets}
            />
            <div className="custom-format-dialog-summary" aria-live="polite">
              <span>{draftSheetOption ? `${draftSheetOption.sheets} hojas · ${draftSheetOption.sheets * 2} páginas` : "Selecciona una cantidad de hojas"}</span>
              <strong>{draftSheetOption?.price ?? "Precio base pendiente"}</strong>
            </div>
            {formatDialogError && <p className="custom-request-error" role="alert">{formatDialogError}</p>}
            <p className="custom-format-dialog-note">Este precio es solo del photobook. El recargo por personalizar tapa y contratapa se acuerda por separado.</p>
            <div className="custom-format-dialog-actions">
              <button type="button" className="custom-request-back-action" onClick={() => setFormatDialogOpen(false)}>Cancelar</button>
              <button type="button" className="custom-request-submit" onClick={confirmFormat} disabled={!draftSheetOption}>Usar este formato <span aria-hidden="true">→</span></button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

const pageStyles = `
  .custom-photobook-page { min-height: 100vh; padding: 0 20px 64px; background: #f4f7f8; color: #13242e; font-family: ${tokens.fonts.body}; }
  .custom-request-header, .custom-request-workspace { width: min(100%, 900px); margin: 0 auto; }
  .custom-request-header { padding: 28px 0 18px; }
  .custom-request-back { color: #40545e; text-decoration: none; font-size: 14px; }
  .custom-request-back:hover { color: #176fae; }
  .custom-request-heading { padding: 28px 0 24px; max-width: 740px; }
  .custom-photobook-page .custom-request-eyebrow { display: block; color: #176fae; font-size: 11px; font-weight: 750; letter-spacing: .12em; }
  .custom-request-heading h1 { margin: 10px 0; max-width: 700px; font-family: Georgia, serif; font-size: clamp(32px, 5vw, 52px); font-weight: 500; letter-spacing: -.035em; line-height: 1.08; text-wrap: balance; }
  .custom-request-heading > p { max-width: 620px; margin: 0; color: #52656d; font-size: 15px; line-height: 1.65; }
  .custom-stepper-meta { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 10px; color: #40545e; font-size: 12px; font-weight: 650; }
  .custom-request-stepper { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 0 0 14px; padding: 0; list-style: none; }
  .custom-request-stepper li { position: relative; min-width: 0; }
  .custom-request-stepper li:not(:last-child)::after { position: absolute; top: 17px; left: 48px; right: 12px; height: 1px; background: #d5e0e3; content: ""; }
  .custom-request-stepper li.is-complete:not(:last-child)::after { background: #176fae; }
  .custom-request-stepper button { position: relative; z-index: 1; display: flex; width: 100%; min-height: 42px; align-items: center; gap: 10px; padding: 4px 8px 4px 0; border: 0; background: transparent; color: #52656d; cursor: default; font: inherit; text-align: left; }
  .custom-request-stepper li.is-complete button { cursor: pointer; }
  .custom-request-stepper button:focus-visible, .custom-request-back-action:focus-visible, .custom-request-submit:focus-visible, .custom-format-open:focus-visible, .custom-format-change:focus-visible, .custom-format-dialog-close:focus-visible { outline: 3px solid #176fae; outline-offset: 3px; }
  .custom-step-number { display: grid; width: 34px; height: 34px; flex: 0 0 34px; place-items: center; border: 1px solid #b9c9ce; border-radius: 50%; background: #f4f7f8; color: #40545e; font-size: 12px; font-weight: 700; }
  .custom-request-stepper li.is-current .custom-step-number, .custom-request-stepper li.is-complete .custom-step-number { border-color: #176fae; background: #176fae; color: #fff; }
  .custom-step-copy { display: grid; gap: 2px; min-width: 0; }
  .custom-step-copy strong { color: #2c424c; font-size: 12px; font-weight: 700; }
  .custom-request-stepper li.is-current .custom-step-copy strong { color: #125e94; }
  .custom-step-copy small { color: #52656d; font-size: 10px; }
  .custom-request-card { padding: clamp(20px, 4vw, 34px); border: 1px solid #dbe4e7; border-radius: 12px; background: #fff; }
  .custom-request-step-panel { min-height: 385px; animation: customStepIn 180ms ease-out; }
  .custom-step-heading { margin-bottom: 22px; }
  .custom-step-kicker { margin: 0 0 7px; color: #176fae; font-size: 12px; font-weight: 700; }
  .custom-step-heading h2, .custom-format-dialog-header h2 { margin: 0 0 7px; color: #19313b; font-size: clamp(21px, 3vw, 27px); font-weight: 650; letter-spacing: -.02em; text-wrap: balance; }
  .custom-step-heading > p:last-child, .custom-format-dialog-header > div > p:last-child { margin: 0; color: #40545e; font-size: 13px; line-height: 1.55; }
  .custom-cover-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
  .custom-cover-upload { min-width: 0; padding: 14px; border: 1px solid #dbe4e7; border-radius: 10px; background: #fafcfc; }
  .custom-cover-upload-heading { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; }
  .custom-cover-upload-index { display: grid; width: 27px; height: 27px; flex: 0 0 27px; place-items: center; border: 1px solid #c4d6dd; border-radius: 50%; color: #176fae; font-size: 11px; font-weight: 750; }
  .custom-cover-upload-heading h3 { margin: 2px 0 4px; color: #223942; font-size: 14px; font-weight: 700; }
  .custom-cover-upload-heading p { margin: 0; color: #40545e; font-size: 12px; line-height: 1.45; }
  .custom-cover-dropzone { display: flex; min-height: 150px; align-items: center; justify-content: center; flex-direction: column; gap: 6px; border: 1px dashed #9fb6bd; border-radius: 8px; background: #f3f7f8; color: #40545e; cursor: pointer; text-align: center; }
  .custom-cover-dropzone:hover { border-color: #176fae; background: #edf5f8; }
  .custom-cover-dropzone input, .custom-cover-preview-actions input { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; }
  .custom-cover-dropzone:focus-within, .custom-cover-action:focus-within { outline: 2px solid #176fae; outline-offset: 2px; }
  .custom-cover-upload-icon { display: grid; width: 30px; height: 30px; place-items: center; border: 1px solid #b9cbd0; border-radius: 50%; color: #176fae; font-size: 19px; }
  .custom-cover-dropzone strong { font-size: 13px; font-weight: 650; }
  .custom-cover-dropzone small { color: #52656d; font-size: 11px; }
  .custom-cover-preview { overflow: hidden; border-radius: 7px; background: #e9efef; }
  .custom-cover-preview img { display: block; width: 100%; aspect-ratio: 1.55; object-fit: contain; background: #e9efef; }
  .custom-cover-preview-footer { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 10px; background: #fff; }
  .custom-cover-preview-footer > span { overflow: hidden; color: #40545e; font-size: 11px; text-overflow: ellipsis; white-space: nowrap; }
  .custom-cover-preview-actions { display: flex; flex: 0 0 auto; gap: 10px; }
  .custom-cover-action { position: relative; border: 0; background: transparent; color: #125e94; cursor: pointer; font: inherit; font-size: 11px; text-decoration: underline; text-underline-offset: 2px; }
  .custom-cover-action.is-remove { color: #8c4141; text-decoration: none; }
  .custom-request-upload-status { margin: 11px 0 0; color: #125e94; font-size: 12px; }
  .custom-request-field { display: flex; min-width: 0; flex-direction: column; gap: 7px; }
  .custom-request-field > span { color: #2f4650; font-size: 13px; font-weight: 650; }
  .custom-request-field b { color: #a53737; }
  .custom-title-field { max-width: 600px; margin-top: 20px; }
  .custom-request-field input { width: 100%; min-height: 44px; box-sizing: border-box; padding: 10px 12px; border: 1px solid #b9cbd0; border-radius: 7px; background: #fff; color: #19313b; font: inherit; font-size: 14px; }
  .custom-request-field input::placeholder { color: #52656d; opacity: 1; }
  .custom-request-field input:focus { outline: 2px solid rgba(45, 143, 213, .28); border-color: #176fae; }
  .custom-request-field input[aria-invalid="true"] { border-color: #a53737; }
  .custom-request-field > small { color: #52656d; font-size: 11px; line-height: 1.5; }
  .custom-request-field > .custom-request-inline-error { color: #8c3030; font-size: 12px; }
  .custom-format-empty { display: flex; min-height: 260px; align-items: center; justify-content: center; flex-direction: column; gap: 10px; border: 1px solid #dbe4e7; border-radius: 10px; background: #fafcfc; text-align: center; }
  .custom-format-empty p { margin: 0; color: #2c424c; font-size: 16px; font-weight: 700; }
  .custom-format-empty > span { color: #40545e; font-size: 13px; }
  .custom-format-open, .custom-format-change { min-height: 40px; padding: 0 15px; border: 1px solid #176fae; border-radius: 7px; background: #fff; color: #125e94; cursor: pointer; font: inherit; font-size: 13px; font-weight: 700; }
  .custom-format-open:hover, .custom-format-change:hover { background: #edf5f8; }
  .custom-format-summary { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; align-items: center; gap: 16px; padding: 18px; border: 1px solid #cbdde2; border-radius: 10px; background: #f4f8f9; }
  .custom-format-summary > div, .custom-format-summary-price { display: grid; gap: 4px; }
  .custom-format-summary-label, .custom-format-summary-price > span { color: #40545e; font-size: 11px; }
  .custom-format-summary > div > strong { color: #223942; font-size: 15px; }
  .custom-format-summary-price > strong { color: #125e94; font-size: 19px; }
  .custom-cover-cost-notice { grid-column: 1 / -1; display: flex; gap: 10px; align-items: flex-start; margin: 4px 0 0; padding: 12px 14px; border: 1px solid #f2c94c; border-left: 4px solid #e0a100; border-radius: 8px; background: #fff6db; color: #6b4500; font-size: 14px; line-height: 1.5; min-width: 0; }
  .custom-cover-cost-notice svg { flex: none; margin-top: 2px; color: #c27c00; }
  .custom-cover-cost-notice span { min-width: 0; }
  .custom-cover-cost-notice strong { display: block; margin-bottom: 2px; color: #5a3a00; font-weight: 800; }
  .custom-request-review { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin: 0 0 22px; padding: 14px 0; border-top: 1px solid #dbe4e7; border-bottom: 1px solid #dbe4e7; }
  .custom-request-review div { min-width: 0; }
  .custom-request-review dt { margin-bottom: 5px; color: #52656d; font-size: 11px; }
  .custom-request-review dd { margin: 0; overflow-wrap: anywhere; color: #2c424c; font-size: 12px; font-weight: 650; line-height: 1.45; }
  .custom-request-contact-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
  .custom-request-email { grid-column: 1 / -1; max-width: calc(50% - 8px); }
  .custom-request-error { margin: 18px 0 0; padding: 10px 12px; border: 1px solid #e3c3c3; border-radius: 7px; background: #fff7f7; color: #812f2f; font-size: 13px; line-height: 1.45; }
  .custom-request-footer { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 16px; margin-top: 25px; padding-top: 18px; border-top: 1px solid #dbe4e7; }
  .custom-request-footer > p { max-width: 460px; justify-self: center; margin: 0; color: #52656d; font-size: 11px; line-height: 1.5; text-align: center; }
  .custom-request-back-action { min-height: 42px; padding: 0 15px; border: 1px solid #9fb6bd; border-radius: 7px; background: #fff; color: #2f4650; cursor: pointer; font: inherit; font-size: 13px; font-weight: 650; }
  .custom-request-back-action:hover:not(:disabled) { background: #f3f7f8; }
  .custom-request-submit { display: inline-flex; min-height: 42px; align-items: center; justify-content: center; gap: 16px; padding: 0 17px; border: 0; border-radius: 7px; background: #176fae; color: #fff; cursor: pointer; font: inherit; font-size: 13px; font-weight: 700; text-decoration: none; transition: background .16s ease, transform .16s ease; }
  .custom-request-submit:hover:not(:disabled) { transform: translateY(-1px); background: #125e94; }
  .custom-request-submit:disabled { cursor: wait; opacity: .6; }
  .custom-request-success { width: min(100%, 900px); margin: 8vh auto 0; padding: clamp(28px, 5vw, 48px); border: 1px solid #dbe4e7; border-radius: 12px; background: #fff; text-align: center; }
  .custom-request-success-mark { display: grid; width: 48px; height: 48px; place-items: center; margin: 22px auto 12px; border-radius: 50%; background: #176fae; color: #fff; font-size: 23px; }
  .custom-request-success h1 { margin: 0 0 10px; font-family: Georgia, serif; font-size: clamp(28px, 4vw, 40px); font-weight: 500; letter-spacing: -.025em; }
  .custom-request-success > p { max-width: 540px; margin: 0 auto 22px; color: #40545e; font-size: 14px; line-height: 1.65; }
  .custom-format-dialog-backdrop { position: fixed; inset: 0; z-index: 3000; display: grid; place-items: center; overflow-y: auto; padding: 18px; background: rgba(15, 31, 39, .62); }
  .custom-format-dialog { width: min(820px, 100%); max-height: min(92dvh, 820px); overflow-y: auto; padding: clamp(18px, 3vw, 28px); border: 1px solid #dbe4e7; border-radius: 12px; background: #fff; color: #19313b; }
  .custom-format-dialog:focus { outline: none; }
  .custom-format-dialog-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; margin-bottom: 18px; }
  .custom-format-dialog-header h2 { margin-bottom: 6px; }
  .custom-format-dialog-close { display: grid; width: 36px; height: 36px; flex: 0 0 36px; place-items: center; border: 1px solid #b9cbd0; border-radius: 50%; background: #fff; color: #2f4650; cursor: pointer; font-size: 21px; line-height: 1; }
  .custom-format-dialog-summary { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 16px; padding: 12px 14px; border: 1px solid #cbdde2; border-radius: 8px; background: #f4f8f9; color: #2f4650; font-size: 13px; }
  .custom-format-dialog-summary strong { color: #125e94; font-size: 17px; white-space: nowrap; }
  .custom-format-dialog-note { margin: 10px 0 0; color: #40545e; font-size: 12px; line-height: 1.5; }
  .custom-format-dialog-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; padding-top: 16px; border-top: 1px solid #dbe4e7; }
  @keyframes customStepIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
  @media (max-width: 680px) {
    .custom-photobook-page { padding: 0 14px 42px; }
    .custom-request-heading { padding: 24px 0 19px; }
    .custom-request-stepper { margin-bottom: 10px; }
    .custom-request-stepper li:not(:last-child)::after { left: 36px; right: 5px; }
    .custom-request-stepper button { gap: 7px; padding-right: 4px; }
    .custom-step-number { width: 28px; height: 28px; flex-basis: 28px; font-size: 11px; }
    .custom-request-stepper li:not(:last-child)::after { top: 14px; }
    .custom-step-copy strong { font-size: 11px; }
    .custom-step-copy small { display: none; }
    .custom-request-card { padding: 18px 16px; }
    .custom-request-step-panel { min-height: auto; }
    .custom-cover-grid, .custom-request-contact-grid { grid-template-columns: 1fr; }
    .custom-cover-dropzone { min-height: 130px; }
    .custom-request-email { grid-column: auto; max-width: none; }
    .custom-format-summary { grid-template-columns: minmax(0, 1fr) auto; gap: 12px; padding: 14px; }
    .custom-format-summary > div:first-child { grid-column: 1 / -1; }
    .custom-cover-cost-notice { grid-column: 1 / -1; }
    .custom-request-review { grid-template-columns: 1fr; gap: 10px; }
    .custom-request-footer { grid-template-columns: auto 1fr; gap: 10px; }
    .custom-request-footer > p { grid-column: 1 / -1; grid-row: 1; text-align: left; }
    .custom-request-footer > span { display: none; }
    .custom-request-footer .custom-request-submit { justify-self: end; }
    .custom-format-dialog-backdrop { place-items: start center; padding: 10px; }
    .custom-format-dialog { max-height: 96dvh; padding: 17px 14px; }
    .custom-format-dialog-actions { display: grid; grid-template-columns: 1fr 1.4fr; }
    .custom-format-dialog-actions > button { min-width: 0; padding-inline: 10px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .custom-request-step-panel, .custom-request-submit { animation: none; transition: none; }
  }
`;
