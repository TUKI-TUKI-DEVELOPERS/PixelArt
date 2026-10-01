"use client";

import { useEffect, useState } from "react";
import { tokens } from "@/lib/design-tokens";

type Approval = {
  customerName: string;
  title: string;
  status: string;
  isApproved: boolean;
  frontCoverUrl: string;
  backCoverUrl: string;
  expiresAt: string;
};

type Props = { token: string };

export default function CustomPhotobookCoverApprovalClient({ token }: Props) {
  const [approval, setApproval] = useState<Approval | null>(null);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [approved, setApproved] = useState(false);
  const [requestingAdjustments, setRequestingAdjustments] = useState(false);
  const [submittingAdjustment, setSubmittingAdjustment] = useState(false);
  const [adjustmentScope, setAdjustmentScope] = useState<"FRONT_COVER" | "BACK_COVER" | "BOTH">("BOTH");
  const [adjustmentMessage, setAdjustmentMessage] = useState("");
  const [adjustmentSubmitted, setAdjustmentSubmitted] = useState(false);

  useEffect(() => {
    async function loadApproval() {
      try {
        const response = await fetch(`/api/photobook/custom-requests/cover-approval/${token}`, { cache: "no-store" });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.message ?? "Este enlace ya no está disponible.");
        setApproval(data as Approval);
        setApproved(Boolean(data.isApproved));
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "No pudimos cargar tu cubierta.");
      } finally {
        setLoading(false);
      }
    }

    void loadApproval();
  }, [token]);

  async function requestAdjustments() {
    const message = adjustmentMessage.trim();
    if (message.length < 5) {
      setError("Cuéntanos un poco más sobre el ajuste que necesitas.");
      return;
    }
    setSubmittingAdjustment(true);
    setError(null);
    try {
      const response = await fetch(`/api/photobook/custom-requests/cover-approval/${token}/adjustments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surface: adjustmentScope, message }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message ?? "No pudimos enviar tu solicitud de ajustes.");
      setAdjustmentSubmitted(true);
      setRequestingAdjustments(false);
    } catch (adjustmentError) {
      setError(adjustmentError instanceof Error ? adjustmentError.message : "No pudimos enviar tu solicitud de ajustes.");
    } finally {
      setSubmittingAdjustment(false);
    }
  }

  async function approve() {
    setApproving(true);
    setError(null);
    try {
      const response = await fetch(`/api/photobook/custom-requests/cover-approval/${token}/approve`, { method: "POST" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message ?? "No pudimos registrar tu aprobación.");
      setApproved(true);
      setApproval((current) => current ? { ...current, status: data.status, isApproved: true } : current);
    } catch (approvalError) {
      setError(approvalError instanceof Error ? approvalError.message : "No pudimos registrar tu aprobación.");
    } finally {
      setApproving(false);
    }
  }

  if (loading) return <main style={shellStyle}><p style={mutedStyle}>Cargando tu propuesta de cubierta…</p></main>;
  if (error && !approval) return <main style={shellStyle}><section style={messageCardStyle}><p style={eyebrowStyle}>Enlace privado</p><h1 style={titleStyle}>Este enlace no está disponible.</h1><p style={bodyStyle}>{error}</p><p style={mutedStyle}>Solicita a PixelArt un nuevo enlace de revisión.</p></section></main>;
  if (!approval) return null;

  return (
    <main style={shellStyle}>
      <section style={cardStyle} aria-labelledby="cover-approval-title">
        <header style={headerStyle}>
          <p style={eyebrowStyle}>Photobook a medida · revisión privada</p>
          <h1 id="cover-approval-title" style={titleStyle}>Tu cubierta está lista para ser aprobada.</h1>
          <p style={bodyStyle}>Hola {approval.customerName}. Esta es la dirección visual seleccionada para <strong>{approval.title}</strong>: tapa y contratapa trabajadas como un mismo sistema.</p>
        </header>

        <div style={coverGridStyle}>
          <figure style={figureStyle}>
            <img src={approval.frontCoverUrl} alt={`Tapa frontal de ${approval.title}`} style={coverStyle} />
            <figcaption style={captionStyle}>Tapa frontal</figcaption>
          </figure>
          <figure style={figureStyle}>
            <img src={approval.backCoverUrl} alt={`Contratapa de ${approval.title}`} style={coverStyle} />
            <figcaption style={captionStyle}>Contratapa</figcaption>
          </figure>
        </div>

        {approved ? (
          <section style={successStyle} aria-live="polite">
            <p style={eyebrowStyle}>Cubierta aprobada</p>
            <h2 style={{ ...titleStyle, fontSize: "19px" }}>Gracias, ya registramos tu aprobación.</h2>
            <p style={bodyStyle}>PixelArt preparará el siguiente paso para que completes las páginas interiores de tu photobook.</p>
          </section>
        ) : adjustmentSubmitted ? (
          <section style={adjustmentSuccessStyle} aria-live="polite">
            <p style={eyebrowStyle}>Solicitud enviada</p>
            <h2 style={{ ...titleStyle, fontSize: "19px" }}>Revisaremos tus ajustes antes de continuar.</h2>
            <p style={bodyStyle}>PixelArt recibirá tu comentario, preparará una nueva propuesta y te enviará otro enlace privado para revisarla.</p>
          </section>
        ) : requestingAdjustments ? (
          <form style={adjustmentFormStyle} onSubmit={(event) => { event.preventDefault(); void requestAdjustments(); }}>
            <div>
              <strong style={{ color: "#17242d", fontSize: "14px" }}>¿Qué parte te gustaría ajustar?</strong>
              <p style={mutedStyle}>Tu comentario llega directamente al equipo de PixelArt. Revisaremos la propuesta antes de generar una nueva versión.</p>
            </div>
            <fieldset style={scopeFieldsetStyle}>
              <legend style={visuallyHiddenStyle}>Superficie a ajustar</legend>
              {[
                ["FRONT_COVER", "Tapa frontal"],
                ["BACK_COVER", "Contratapa"],
                ["BOTH", "Tapa y contratapa"],
              ].map(([value, label]) => (
                <label key={value} style={scopeOptionStyle(adjustmentScope === value)}>
                  <input checked={adjustmentScope === value} name="adjustment-scope" onChange={() => setAdjustmentScope(value as "FRONT_COVER" | "BACK_COVER" | "BOTH")} type="radio" value={value} />
                  <span>{label}</span>
                </label>
              ))}
            </fieldset>
            <label style={messageLabelStyle}>
              <span>¿Qué te gustaría cambiar?</span>
              <textarea aria-label="Describe los ajustes que necesitas" maxLength={1200} onChange={(event) => setAdjustmentMessage(event.target.value)} placeholder="Ej.: quisiera una contratapa más limpia y con menos elementos alrededor de la foto." rows={4} style={adjustmentTextareaStyle} value={adjustmentMessage} />
              <small>{adjustmentMessage.length}/1200</small>
            </label>
            <div style={adjustmentActionsStyle}>
              <button disabled={submittingAdjustment} onClick={() => setRequestingAdjustments(false)} style={secondaryButtonStyle(submittingAdjustment)} type="button">Cancelar</button>
              <button disabled={submittingAdjustment || adjustmentMessage.trim().length < 5} style={adjustmentButtonStyle(submittingAdjustment || adjustmentMessage.trim().length < 5)} type="submit">{submittingAdjustment ? "Enviando…" : "Enviar solicitud"}</button>
            </div>
          </form>
        ) : (
          <section style={actionStyle}>
            <div>
              <strong style={{ color: "#17242d", fontSize: "14px" }}>¿La propuesta representa tu historia?</strong>
              <p style={mutedStyle}>Al aprobar, esta dirección visual queda confirmada. Si algo no te convence, puedes pedir ajustes antes de continuar.</p>
            </div>
            <div style={actionButtonsStyle}>
              <button type="button" onClick={() => setRequestingAdjustments(true)} disabled={approving} style={secondaryButtonStyle(approving)}>Solicitar ajustes</button>
              <button type="button" onClick={() => void approve()} disabled={approving} style={approveButtonStyle(approving)}>{approving ? "Registrando…" : "Aprobar mi cubierta"}</button>
            </div>
          </section>
        )}
        {error && <p role="alert" style={errorStyle}>{error}</p>}
        {!approved && !adjustmentSubmitted && <p style={expiryStyle}>Este enlace privado vence el {new Date(approval.expiresAt).toLocaleDateString("es-PE")}.</p>}
      </section>
    </main>
  );
}

const shellStyle = { minHeight: "70vh", display: "grid", placeItems: "center", padding: "72px 20px", background: "linear-gradient(155deg, #f5f9fc 0%, #ffffff 54%, #edf4f8 100%)" } as const;
const cardStyle = { width: "min(920px, 100%)", padding: "clamp(24px, 5vw, 52px)", border: "1px solid #dbe7ed", borderRadius: "16px", background: "rgba(255,255,255,.94)", boxShadow: "0 18px 50px rgba(30, 61, 78, .10)" } as const;
const messageCardStyle = { ...cardStyle, width: "min(550px, 100%)" } as const;
const headerStyle = { maxWidth: "650px" } as const;
const eyebrowStyle = { margin: "0 0 8px", color: tokens.colors.photobooks.primary, fontSize: "11px", fontWeight: 800, letterSpacing: ".09em", textTransform: "uppercase" } as const;
const titleStyle = { margin: 0, color: "#17242d", fontSize: "clamp(28px, 5vw, 42px)", lineHeight: 1.05, letterSpacing: "-.04em" } as const;
const bodyStyle = { margin: "16px 0 0", color: "#52636d", fontSize: "15px", lineHeight: 1.65 } as const;
const mutedStyle = { margin: "8px 0 0", color: "#64727c", fontSize: "13px", lineHeight: 1.5 } as const;
const coverGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "34px" } as const;
const figureStyle = { margin: 0, padding: "10px", border: "1px solid #dce7ed", borderRadius: "10px", background: "#f8fbfc" } as const;
const coverStyle = { display: "block", width: "100%", aspectRatio: "1 / 1", borderRadius: "6px", objectFit: "cover", background: "#e7eff3" } as const;
const captionStyle = { display: "block", marginTop: "9px", color: "#465964", fontSize: "12px", fontWeight: 700 } as const;
const actionStyle = { display: "flex", flexWrap: "wrap" as const, alignItems: "center", justifyContent: "space-between", gap: "20px", marginTop: "32px", padding: "20px", borderRadius: "10px", background: "#f4f9fc" } as const;
const actionButtonsStyle = { display: "flex", flexWrap: "wrap" as const, gap: "10px" } as const;
const adjustmentFormStyle = { display: "grid", gap: "18px", marginTop: "32px", padding: "22px", border: "1px solid #b9d8e9", borderRadius: "10px", background: "#f7fbfd" } as const;
const adjustmentSuccessStyle = { marginTop: "32px", padding: "20px", border: "1px solid #b9d8e9", borderRadius: "10px", background: "#f3faff" } as const;
const scopeFieldsetStyle = { display: "flex", flexWrap: "wrap" as const, gap: "8px", margin: 0, padding: 0, border: 0 } as const;
const scopeOptionStyle = (active: boolean) => ({ display: "inline-flex", alignItems: "center", gap: "7px", minHeight: "38px", padding: "0 11px", border: `1px solid ${active ? "#2d8fd5" : "#b8cbd6"}`, borderRadius: "7px", background: active ? "#eaf6fd" : "#ffffff", color: "#244454", cursor: "pointer", fontSize: "13px", fontWeight: active ? 800 : 600 }) as const;
const messageLabelStyle = { display: "grid", gap: "7px", color: "#244454", fontSize: "13px", fontWeight: 800 } as const;
const adjustmentActionsStyle = { display: "flex", flexWrap: "wrap" as const, justifyContent: "flex-end", gap: "10px" } as const;
const adjustmentTextareaStyle = { width: "100%", minHeight: "108px", boxSizing: "border-box" as const, padding: "11px 12px", border: "1px solid #8fb5ca", borderRadius: "7px", background: "#fff", color: "#1f3644", font: "inherit", fontSize: "14px", lineHeight: 1.5, resize: "vertical" as const } as const;
const visuallyHiddenStyle = { position: "absolute" as const, width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden" as const, clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap" as const, border: 0 } as const;
const successStyle = { marginTop: "32px", padding: "20px", border: "1px solid #b9dfce", borderRadius: "10px", background: "#f0faf5" } as const;
const approveButtonStyle = (disabled: boolean) => ({ flexShrink: 0, minHeight: "44px", padding: "0 18px", border: "none", borderRadius: "8px", background: disabled ? "#8db7d1" : tokens.colors.photobooks.primary, color: "#fff", cursor: disabled ? "not-allowed" : "pointer", fontFamily: "inherit", fontWeight: 800, whiteSpace: "nowrap" }) as const;
const secondaryButtonStyle = (disabled: boolean) => ({ minHeight: "44px", padding: "0 16px", border: "1px solid #6f8c9d", borderRadius: "8px", background: "#ffffff", color: "#244454", cursor: disabled ? "not-allowed" : "pointer", fontFamily: "inherit", fontWeight: 800, opacity: disabled ? 0.6 : 1, whiteSpace: "nowrap" }) as const;
const adjustmentButtonStyle = (disabled: boolean) => ({ minHeight: "44px", padding: "0 18px", border: "none", borderRadius: "8px", background: disabled ? "#8db7d1" : "#176fae", color: "#fff", cursor: disabled ? "not-allowed" : "pointer", fontFamily: "inherit", fontWeight: 800, whiteSpace: "nowrap" }) as const;
const errorStyle = { margin: "14px 0 0", color: "#b9382e", fontSize: "13px" } as const;
const expiryStyle = { margin: "18px 0 0", color: "#70808a", fontSize: "12px" } as const;
