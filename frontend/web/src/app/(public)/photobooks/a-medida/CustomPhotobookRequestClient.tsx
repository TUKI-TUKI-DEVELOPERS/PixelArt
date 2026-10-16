"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { UploadedPhoto, usePhotoUpload } from "@/hooks/usePhotoUpload";
import { tokens } from "@/lib/design-tokens";

const API = "";

type Surface = "FRONT_COVER" | "BACK_COVER";
type Props = { surface: Surface; title: string; description: string; photo: UploadedPhoto | null; uploading: boolean; onUpload: (files: FileList | null) => void; onRemove: () => void };

function CoverImageField({ surface, title, description, photo, uploading, onUpload, onRemove }: Props) {
  const inputId = `custom-photobook-${surface.toLowerCase()}`;
  return (
    <section className={`custom-cover-upload ${photo ? "has-image" : ""}`} aria-labelledby={`${inputId}-title`}>
      <div className="custom-cover-upload-heading">
        <span className="custom-cover-upload-index">{surface === "FRONT_COVER" ? "01" : "02"}</span>
        <div><h2 id={`${inputId}-title`}>{title}</h2><p>{description}</p></div>
      </div>
      {photo ? (
        <div className="custom-cover-preview">
          <img src={photo.preview} alt={`Vista previa: ${title.toLowerCase()}`} />
          <div className="custom-cover-preview-footer">
            <span title={photo.originalFilename}>{photo.originalFilename}</span>
            <button type="button" onClick={onRemove}>Quitar imagen</button>
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

function isValidEmail(value: string) {
  const email = value.trim();
  return email.length <= 254 && /^[^\s@.]+(?:\.[^\s@.]+)*@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i.test(email);
}

function isValidPhone(value: string) {
  const phone = value.replace(/[()\s.-]/g, "");
  return /^(?:\+?51)?9\d{8}$/.test(phone) || /^\+[1-9]\d{7,14}$/.test(phone);
}

export default function CustomPhotobookRequestClient() {
  const successSectionRef = useRef<HTMLElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const [frontCover, setFrontCover] = useState<UploadedPhoto | null>(null);
  const [backCover, setBackCover] = useState<UploadedPhoto | null>(null);
  const [coverTitle, setCoverTitle] = useState("");
  const [customerFullName, setCustomerFullName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [contactValidationAttempted, setContactValidationAttempted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { uploading, progress, error: uploadError, uploadFiles } = usePhotoUpload("uploads/photobooks");

  useEffect(() => {
    if (!submitted) return;
    const section = successSectionRef.current;
    const heading = successHeadingRef.current;
    if (!section || !heading) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    section.scrollIntoView?.({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    heading.focus({ preventScroll: true });
  }, [submitted]);

  async function handleUpload(surface: Surface, files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setSubmitError(null);
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

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    if (!frontCover || !backCover) { setSubmitError("Adjunta una imagen para la tapa y otra para la contratapa."); return; }
    if (frontCover.id === backCover.id) { setSubmitError("La tapa y la contratapa necesitan imágenes distintas."); return; }
    if (!coverTitle.trim()) { setSubmitError("Escribe el título que quieres para la tapa principal."); return; }
    if (!customerFullName.trim() || !isValidEmail(customerEmail) || !isValidPhone(customerPhone)) {
      setContactValidationAttempted(true);
      setSubmitError("Corrige los campos de contacto marcados antes de enviar."); return;
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
      setSubmitError(error instanceof Error ? error.message : "No pudimos enviar tu solicitud. Inténtalo nuevamente.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) return (
    <main className="custom-photobook-page"><style>{pageStyles}</style>
      <section ref={successSectionRef} className="custom-request-card custom-request-success" aria-live="polite">
        <span className="custom-request-eyebrow">SOLICITUD RECIBIDA</span>
        <div className="custom-request-success-mark" aria-hidden="true">✓</div>
        <h1 ref={successHeadingRef} tabIndex={-1}>Ya tenemos tu diseño.</h1>
        <p>Revisaremos la tapa, la contratapa y el título. Nuestro equipo te contactará para coordinar el precio y los siguientes pasos.</p>
        <Link className="custom-request-submit" href="/photobooks">Volver a photobooks</Link>
      </section>
    </main>
  );

  const titleInvalid = coverTitle.length > 0 && !coverTitle.trim();
  const emailInvalid = (customerEmail.length > 0 || contactValidationAttempted) && !isValidEmail(customerEmail);
  const phoneInvalid = (customerPhone.length > 0 || contactValidationAttempted) && !isValidPhone(customerPhone);

  return (
    <main className="custom-photobook-page">
      <style>{pageStyles}</style>
      <header className="custom-request-header">
        <Link className="custom-request-back" href="/photobooks">← Volver a photobooks</Link>
        <div className="custom-request-heading">
          <span className="custom-request-eyebrow">PHOTOBOOK A MEDIDA · TAPA PERSONALIZADA</span>
          <h1>Tu diseño, listo para convertirse en photobook.</h1>
          <p>Envíanos la tapa, la contratapa y el título. Coordinaremos el precio contigo por WhatsApp antes de continuar.</p>
        </div>
        <div className="custom-request-note"><span aria-hidden="true">i</span><p>Conservaremos tus archivos originales. El formato de impresión y el número de hojas se definen después.</p></div>
      </header>

      <form className="custom-request-card" onSubmit={submit} noValidate>
        <div className="custom-request-section-head">
          <div><span className="custom-request-eyebrow">01 / TUS ARCHIVOS</span><h2>Comparte las dos caras de la cubierta</h2></div>
          <p>Sube una imagen para cada lado. No necesitas preparar el lomo.</p>
        </div>
        <div className="custom-cover-grid">
          <CoverImageField surface="FRONT_COVER" title="Tapa principal" description="La imagen frontal de tu photobook." photo={frontCover} uploading={uploading} onUpload={(files) => void handleUpload("FRONT_COVER", files)} onRemove={() => removeImage("FRONT_COVER")} />
          <CoverImageField surface="BACK_COVER" title="Contratapa" description="La imagen posterior de tu photobook." photo={backCover} uploading={uploading} onUpload={(files) => void handleUpload("BACK_COVER", files)} onRemove={() => removeImage("BACK_COVER")} />
        </div>
        {uploading && <p className="custom-request-upload-status" aria-live="polite">Subiendo imagen… {progress}%</p>}
        {uploadError && <p className="custom-request-error" role="alert">{uploadError}</p>}

        <div className="custom-request-divider" />
        <div className="custom-request-section-head">
          <div><span className="custom-request-eyebrow">02 / TÍTULO DE PORTADA</span><h2>¿Qué título imaginas?</h2></div>
        </div>
        <label className="custom-request-field">
          <span>Título que imaginas para la tapa <b aria-hidden="true">*</b></span>
          <input value={coverTitle} onChange={(event) => setCoverTitle(event.target.value)} maxLength={160} required aria-invalid={titleInvalid || undefined} placeholder="Ej.: Nuestra historia" />
          <small>Este título aparecerá en la tapa principal. Puedes añadir también el color de letra que prefieres, por ejemplo: “Nuestra historia, en dorado”.</small>
        </label>

        <div className="custom-request-divider" />
        <div className="custom-request-section-head">
          <div><span className="custom-request-eyebrow">03 / CONTACTO</span><h2>¿Cómo te encontramos?</h2></div>
          <p>Te escribiremos para revisar el diseño y acordar el precio.</p>
        </div>
        <div className="custom-request-contact-grid">
          <label className="custom-request-field"><span>Nombre completo <b aria-hidden="true">*</b></span><input autoComplete="name" value={customerFullName} onChange={(event) => setCustomerFullName(event.target.value)} maxLength={120} required /></label>
          <label className="custom-request-field"><span>Teléfono / WhatsApp <b aria-hidden="true">*</b></span><input autoComplete="tel" type="tel" inputMode="tel" value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} maxLength={40} placeholder="+51 999 999 999" required aria-invalid={phoneInvalid || undefined} aria-describedby={phoneInvalid ? "custom-phone-error" : "custom-phone-hint"} /><small id="custom-phone-hint">Celular peruano de 9 dígitos o número internacional con prefijo +.</small>{phoneInvalid && <small id="custom-phone-error" className="custom-request-inline-error" role="alert">Ingresa un celular peruano de 9 dígitos o un número internacional válido con prefijo +.</small>}</label>
          <label className="custom-request-field custom-request-email"><span>Correo electrónico <b aria-hidden="true">*</b></span><input autoComplete="email" type="email" inputMode="email" value={customerEmail} onChange={(event) => setCustomerEmail(event.target.value)} maxLength={254} required aria-invalid={emailInvalid || undefined} aria-describedby={emailInvalid ? "custom-email-error" : undefined} placeholder="nombre@correo.com" />{emailInvalid && <small id="custom-email-error" className="custom-request-inline-error" role="alert">Escribe un correo válido, por ejemplo nombre@dominio.com.</small>}</label>
        </div>

        {submitError && <p className="custom-request-error" role="alert">{submitError}</p>}
        <footer className="custom-request-footer">
          <p>Al enviar, autorizas a PixelArt a revisar tus imágenes para preparar la propuesta de impresión.</p>
          <button className="custom-request-submit" type="submit" disabled={submitting || uploading}>
            {submitting ? "Enviando solicitud…" : "Enviar mi diseño"}<span aria-hidden="true">→</span>
          </button>
        </footer>
      </form>
    </main>
  );
}

const pageStyles = `
  .custom-photobook-page { min-height: 100vh; padding: 0 20px 80px; background: #f4f7f8; color: #13242e; font-family: ${tokens.fonts.body}; }
  .custom-request-header, .custom-request-card { width: min(100%, 1000px); margin: 0 auto; }
  .custom-request-header { padding: 32px 0 28px; }
  .custom-request-back { color: #50616a; text-decoration: none; font-size: 14px; }
  .custom-request-back:hover { color: #176fae; }
  .custom-request-heading { padding: clamp(30px, 5vw, 54px) 0 24px; max-width: 760px; }
  .custom-request-eyebrow { display: block; color: #176fae; font-size: 11px; font-weight: 750; letter-spacing: .14em; }
  .custom-request-heading h1 { margin: 12px 0; max-width: 720px; font-family: Georgia, serif; font-size: clamp(34px, 5vw, 56px); font-weight: 500; letter-spacing: -.04em; line-height: 1.05; }
  .custom-request-heading > p { max-width: 640px; margin: 0; color: #5f7079; font-size: 16px; line-height: 1.7; }
  .custom-request-note { display: flex; align-items: flex-start; gap: 12px; max-width: 650px; padding: 14px 16px; border: 1px solid #dbe6e7; border-radius: 10px; background: #edf3f3; }
  .custom-request-note > span { display: grid; place-items: center; width: 20px; height: 20px; border: 1px solid #80c5ee; border-radius: 50%; color: #176fae; font-size: 12px; font-weight: 700; flex: 0 0 auto; }
  .custom-request-note p { margin: 0; color: #52656a; font-size: 13px; line-height: 1.55; }
  .custom-request-card { padding: clamp(22px, 4vw, 42px); border: 1px solid #e1e8e9; border-radius: 14px; background: #fff; box-shadow: 0 14px 40px rgba(24, 53, 61, .05); }
  .custom-request-section-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 22px; }
  .custom-request-section-head h2 { margin: 8px 0 0; color: #19313b; font-size: clamp(20px, 3vw, 25px); font-weight: 650; letter-spacing: -.025em; }
  .custom-request-section-head > p { max-width: 340px; margin: 0; color: #75858b; font-size: 13px; line-height: 1.55; }
  .custom-cover-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
  .custom-cover-upload { min-width: 0; padding: 17px; border: 1px solid #e2e9ea; border-radius: 11px; background: #fbfcfc; }
  .custom-cover-upload-heading { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 15px; }
  .custom-cover-upload-index { padding-top: 2px; color: #176fae; font-family: Georgia, serif; font-size: 18px; }
  .custom-cover-upload-heading h2 { margin: 0 0 4px; color: #223942; font-size: 15px; font-weight: 650; }
  .custom-cover-upload-heading p { margin: 0; color: #75858b; font-size: 12px; line-height: 1.5; }
  .custom-cover-dropzone { display: flex; min-height: 190px; align-items: center; justify-content: center; flex-direction: column; gap: 7px; border: 1px dashed #b6c8ca; border-radius: 8px; background: #f5f8f8; color: #52666c; cursor: pointer; text-align: center; }
  .custom-cover-dropzone:hover { border-color: #2d8fd5; background: #f6fbfe; }
  .custom-cover-dropzone input { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }
  .custom-cover-dropzone:focus-within { outline: 2px solid #2d8fd5; outline-offset: 2px; }
  .custom-cover-upload-icon { display: grid; place-items: center; width: 34px; height: 34px; margin-bottom: 4px; border: 1px solid #c8d6d7; border-radius: 50%; color: #176fae; font-size: 22px; }
  .custom-cover-dropzone strong { font-size: 13px; font-weight: 650; }
  .custom-cover-dropzone small { color: #8a989c; font-size: 11px; }
  .custom-cover-preview { overflow: hidden; border-radius: 8px; background: #e9efef; }
  .custom-cover-preview img { display: block; width: 100%; aspect-ratio: 1.55; object-fit: contain; background: #e9efef; }
  .custom-cover-preview-footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 9px 11px; background: #fff; }
  .custom-cover-preview-footer span { overflow: hidden; color: #63737a; font-size: 11px; text-overflow: ellipsis; white-space: nowrap; }
  .custom-cover-preview-footer button { border: 0; background: none; color: #8b5353; cursor: pointer; font: inherit; font-size: 11px; }
  .custom-request-upload-status { margin: 12px 0 0; color: #176fae; font-size: 12px; }
  .custom-request-divider { height: 1px; margin: 32px 0; background: #e7eded; }
  .custom-request-field { display: flex; min-width: 0; flex-direction: column; gap: 8px; }
  .custom-request-field > span { color: #334b53; font-size: 13px; font-weight: 650; }
  .custom-request-field b { color: #b64a4a; }
  .custom-request-field input { width: 100%; min-height: 45px; box-sizing: border-box; padding: 10px 12px; border: 1px solid #d5dfe0; border-radius: 7px; background: #fff; color: #1d323a; font: inherit; font-size: 14px; }
  .custom-request-field input:focus { outline: 2px solid rgba(45, 143, 213, .25); border-color: #2d8fd5; }
  .custom-request-field input[aria-invalid="true"] { border-color: #bd6161; }
  .custom-request-field > small { color: #7e8d91; font-size: 11px; line-height: 1.5; }
  .custom-request-field > .custom-request-inline-error { color: #a03e3e; font-size: 12px; }
  .custom-request-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .custom-request-email { grid-column: 1 / -1; max-width: calc(50% - 9px); }
  .custom-request-error { margin: 18px 0 0; padding: 11px 13px; border: 1px solid #ebcaca; border-radius: 7px; background: #fff7f7; color: #a03e3e; font-size: 13px; }
  .custom-request-footer { display: flex; align-items: center; justify-content: space-between; gap: 22px; margin-top: 30px; padding-top: 22px; border-top: 1px solid #e7eded; }
  .custom-request-footer > p { max-width: 470px; margin: 0; color: #7b898d; font-size: 11px; line-height: 1.55; }
  .custom-request-submit { display: inline-flex; min-height: 45px; align-items: center; justify-content: center; gap: 18px; padding: 0 19px; border: 0; border-radius: 7px; background: #2d8fd5; color: #fff; cursor: pointer; font: inherit; font-size: 13px; font-weight: 650; text-decoration: none; transition: background .18s ease, transform .18s ease; }
  .custom-request-submit:hover:not(:disabled) { transform: translateY(-1px); background: #197ab9; }
  .custom-request-submit:disabled { cursor: wait; opacity: .55; }
  .custom-request-success { margin-top: 8vh; text-align: center; }
  .custom-request-success-mark { display: grid; width: 50px; height: 50px; place-items: center; margin: 24px auto 12px; border-radius: 50%; background: #2d8fd5; color: #fff; font-size: 24px; }
  .custom-request-success h1 { margin: 0 0 10px; font-family: Georgia, serif; font-size: clamp(28px, 4vw, 40px); font-weight: 500; }
  .custom-request-success > p { max-width: 540px; margin: 0 auto 24px; color: #68797e; font-size: 14px; line-height: 1.7; }
  @media (max-width: 700px) { .custom-photobook-page { padding: 0 14px 48px; } .custom-request-heading { padding-top: 34px; } .custom-request-section-head { display: block; } .custom-request-section-head > p { margin-top: 8px; } .custom-cover-grid, .custom-request-contact-grid { grid-template-columns: 1fr; } .custom-request-email { grid-column: auto; max-width: none; } .custom-request-footer { align-items: stretch; flex-direction: column; } .custom-request-submit { width: 100%; box-sizing: border-box; } }
`;
