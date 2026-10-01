"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CustomPhotobookAiProposalPanel } from "./CustomPhotobookAiProposalPanel";
import styles from "./CustomPhotobookRequestDetailPage.module.css";

type CustomRequest = {
  id: number;
  status: string;
  occasion: string;
  requestedTheme: string;
  coverTitle: string | null;
  coverMode: string;
  brief: string;
  customerFullName: string;
  customerEmail: string;
  customerPhone: string;
  linkedPhotobookProjectId: number | null;
  openCoverAdjustment?: {
    surface: "FRONT_COVER" | "BACK_COVER" | "BOTH";
    message: string;
    createdAt: string;
  } | null;
  createdAt: string;
};

type ProjectRender = {
  pdfUrl: string;
  coverWrapUrl: string | null;
  generatedAt: string;
};

const COVER_MODE: Record<string, string> = {
  PIXELART_DESIGNED: "PixelArt diseña tapa y contratapa",
  CUSTOMER_ARTWORK: "El cliente tiene un diseño propio",
  PHOTO_BASED: "La cubierta se construirá a partir de fotos",
};

const ADJUSTMENT_SURFACE_LABEL: Record<"FRONT_COVER" | "BACK_COVER" | "BOTH", string> = {
  FRONT_COVER: "tapa frontal",
  BACK_COVER: "contratapa",
  BOTH: "tapa y contratapa",
};

export default function CustomPhotobookRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [request, setRequest] = useState<CustomRequest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sendingEditorCode, setSendingEditorCode] = useState(false);
  const [editorCodeMessage, setEditorCodeMessage] = useState<string | null>(null);
  const [render, setRender] = useState<ProjectRender | null>(null);
  const [renderError, setRenderError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { id } = await params;
      const response = await fetch(`/admin-api/photobook/custom-requests/${id}`);
      if (!response.ok) throw new Error("No pudimos cargar esta solicitud.");
      const data: CustomRequest = await response.json();
      setRequest(data);
    }

    load().catch((loadError) => setError(loadError instanceof Error ? loadError.message : "No pudimos cargar esta solicitud."));
  }, [params]);

  useEffect(() => {
    if (request?.status !== "READY_FOR_PRODUCTION" || !request.linkedPhotobookProjectId) {
      setRender(null);
      setRenderError(null);
      return;
    }

    fetch(`/admin-api/photobook/projects/${request.linkedPhotobookProjectId}/render`)
      .then(async (response) => {
        if (!response.ok) throw new Error("Los archivos finales todavía no están disponibles.");
        return response.json() as Promise<ProjectRender>;
      })
      .then(setRender)
      .catch((loadError) => setRenderError(loadError instanceof Error ? loadError.message : "No pudimos cargar los archivos finales."));
  }, [request?.linkedPhotobookProjectId, request?.status]);

  async function sendEditorCode() {
    if (!request?.linkedPhotobookProjectId) return;
    setSendingEditorCode(true);
    setEditorCodeMessage(null);
    try {
      const response = await fetch(`/admin-api/photobook/custom-requests/${request.id}/editor-code/send`, { method: "POST" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "No pudimos enviar el código de editor.");
      setEditorCodeMessage("El código de acceso fue enviado al cliente.");
    } catch (sendError) {
      setEditorCodeMessage(sendError instanceof Error ? sendError.message : "No pudimos enviar el código de editor.");
    } finally {
      setSendingEditorCode(false);
    }
  }

  if (error) return <div style={{ padding: "32px", color: "#b42318" }}>{error}</div>;
  if (!request) return <div style={{ padding: "32px", color: "#777" }}>Cargando solicitud…</div>;

  return (
    <div style={{ width: "min(100% - 48px, 1050px)", margin: "0 auto", padding: "32px 0 72px" }}>
      <Link href="/admin/photobooks/a-medida" style={{ color: "#176fae", fontSize: "13px", fontWeight: 800, textDecoration: "none" }}>← Solicitudes a medida</Link>

      <header className={styles.header} style={{ padding: "28px 0 32px", borderBottom: "1px solid #e5e7eb" }}>
        <div>
          <p style={{ margin: "0 0 8px", color: request.status === "CHANGES_REQUESTED" ? "#9f1239" : "#2d8fd5", fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>Solicitud #{request.id} · {request.status === "CHANGES_REQUESTED" ? "Ajustes solicitados" : "Por revisar"}</p>
          <h1 style={{ margin: 0, color: "#111", fontSize: "32px", fontWeight: 800, letterSpacing: "-0.03em" }}>{request.requestedTheme}</h1>
          <p style={{ margin: "8px 0 0", color: "#666", fontSize: "14px" }}>{request.occasion}{request.coverTitle ? ` · “${request.coverTitle}”` : ""}</p>
        </div>
        <a href={`https://wa.me/${request.customerPhone.replace(/\D/g, "")}`} rel="noreferrer" style={{ display: "inline-flex", minHeight: "42px", alignItems: "center", padding: "0 16px", borderRadius: "999px", background: "#111", color: "#fff", fontSize: "13px", fontWeight: 800, textDecoration: "none" }} target="_blank">Contactar por WhatsApp</a>
      </header>

      <div className={styles.content}>
        <main>
          <section style={{ paddingBottom: "30px", borderBottom: "1px solid #e5e7eb" }}>
            <p style={{ margin: "0 0 10px", color: "#2d8fd5", fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>Dirección de cubierta</p>
            <h2 style={{ margin: 0, color: "#111", fontSize: "22px", lineHeight: 1.2 }}>{COVER_MODE[request.coverMode] ?? request.coverMode}</h2>
            <p style={{ margin: "18px 0 0", color: "#444", fontSize: "15px", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{request.brief}</p>
          </section>

          {request.openCoverAdjustment && (
            <section aria-label="Ajuste solicitado por el cliente" style={{ marginTop: "24px", padding: "20px", border: "1px solid #b9d8e9", borderRadius: "10px", background: "#f3faff" }}>
              <p style={{ margin: 0, color: "#176fae", fontSize: "11px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>Ajuste solicitado por el cliente</p>
              <h2 style={{ margin: "8px 0 0", color: "#17242d", fontSize: "20px", lineHeight: 1.25 }}>Revisar {ADJUSTMENT_SURFACE_LABEL[request.openCoverAdjustment.surface]}</h2>
              <p style={{ margin: "14px 0 0", color: "#263946", fontSize: "15px", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{request.openCoverAdjustment.message}</p>
              <p style={{ margin: "14px 0 0", color: "#526b7a", fontSize: "13px", lineHeight: 1.5 }}>Genera la nueva propuesta cuando tengas una dirección clara. Al enviar la siguiente aprobación, esta solicitud de ajuste se cerrará automáticamente.</p>
            </section>
          )}

          <CustomPhotobookAiProposalPanel coverMode={request.coverMode} requestId={request.id} />
        </main>

        <aside className={styles.sidebar}>
          <p className={styles.sidebarLabel}>Cliente</p>
          <dl className={styles.clientDetails}>
            <div><dt>Nombre</dt><dd>{request.customerFullName}</dd></div>
            <div><dt>Correo</dt><dd>{request.customerEmail}</dd></div>
            <div><dt>WhatsApp</dt><dd>{request.customerPhone}</dd></div>
            <div><dt>Recibida</dt><dd>{new Date(request.createdAt).toLocaleString("es-PE")}</dd></div>
          </dl>

          {request.linkedPhotobookProjectId && ["EDITOR_READY", "EDITOR_IN_PROGRESS"].includes(request.status) && (
            <section className={styles.actionSection} aria-label="Código del editor">
              <p className={styles.sidebarLabel}>Editor del cliente</p>
              <p className={styles.actionDescription}>El código vence en siete días. Al reenviarlo se revocan códigos y sesiones anteriores.</p>
              <button className={styles.primaryAction} type="button" onClick={sendEditorCode} disabled={sendingEditorCode}>
                {sendingEditorCode ? "Enviando código…" : request.status === "EDITOR_IN_PROGRESS" ? "Reenviar código" : "Enviar código"}
              </button>
              {editorCodeMessage && <p className={styles.actionMessage} role="status">{editorCodeMessage}</p>}
            </section>
          )}

          {request.status === "READY_FOR_PRODUCTION" && (
            <section className={styles.actionSection} aria-label="Archivos de producción">
              <p className={styles.sidebarLabel}>Archivos de producción</p>
              {render && (
                <div className={styles.downloadActions}>
                  <a className={styles.secondaryAction} href={render.pdfUrl} target="_blank" rel="noreferrer">Descargar interior PDF</a>
                  {render.coverWrapUrl ? (
                    <a className={styles.secondaryAction} href={render.coverWrapUrl} target="_blank" rel="noreferrer">Descargar cubierta y lomo PDF</a>
                  ) : (
                    <p className={styles.actionDescription}>El interior está disponible; la cubierta y el lomo aún no se generaron.</p>
                  )}
                </div>
              )}
              {renderError && <p className={styles.actionMessage} role="status">{renderError}</p>}
              {!render && !renderError && <p className={styles.actionDescription}>Preparando los archivos finales…</p>}
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
