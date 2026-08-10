"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const API = "";

/** Resuelve la URL pública de un asset desde su ID */
async function resolveAssetUrl(assetId: number): Promise<string | null> {
  try {
    const res = await fetch(`${API}/api/assets/${assetId}/url`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.url ?? null;
  } catch {
    return null;
  }
}

type CharacterMember = { name: string; assetIds?: number[] };
type CharacterMeta =
  | { mode: "familia-grupo"; papa: CharacterMember; mama: CharacterMember; hijos: CharacterMember[] }
  | { mode: "hermanos"; hermanos: ({ gender: "M" | "F" } & CharacterMember)[] }
  | { mode: "mascotas-aventura"; pet: CharacterMember & { nickname?: string | null; gender?: string }; owners: ({ gender?: string } & CharacterMember)[] }
  | { mode: "memorial-hermanos"; totalSiblings: number; recipient: CharacterMember & { nickname?: string | null; gender?: string }; livingSiblings: CharacterMember[] }
  | { mode: string; recipient: CharacterMember & { nickname?: string | null }; dedicator?: CharacterMember }
  | null;

type OrderDetail = {
  id: number; channel: string; status: string; customerFullName: string; customerEmail: string; customerPhone: string;
  totalAmountCents: number; baseAmountCents: number; rushFeeCents: number; currency: string; estimatedDeliveryDate: string | null;
  demoRequestId: number | null;
  photobookProjectId: number | null;
  statusEvents: { id: number; oldStatus: string | null; newStatus: string; note: string | null; createdAt: string }[];
  paymentProof: { id: number; status: string; paymentMethod: string; amountCents: number; voucherUrl: string } | null;
  templateSelections: { templateId: number; templateName: string | null; slotIndex: number; hasPromptContent: boolean }[];
  characterMeta: CharacterMeta;
  demoAssetIds: number[];
  dedicationText: string | null;
  demoDedicationText: string | null;
  gradientColorStart: string;
  gradientColorEnd: string;
};

type PrintAsset = {
  id: number; assetType: string; templateId: number | null; templateName: string | null;
  slotIndex: number | null; pagePart: string; previewUrl: string; originalFilename: string | null;
  status: string; uploadedAt: string;
};

const STATUS_MAP: Record<string, { bg: string; text: string; label: string; accent: string }> = {
  AWAITING_PAYMENT_PROOF: { bg: "#fef3c7", text: "#92400e", label: "Esperando Pago",   accent: "#f59e0b" },
  UNDER_PAYMENT_REVIEW:   { bg: "#dbeafe", text: "#1e40af", label: "Revisando Pago",   accent: "#3b82f6" },
  PAYMENT_VERIFIED:       { bg: "#d1fae5", text: "#065f46", label: "Pago Verificado",  accent: "#22c55e" },
  IN_PRODUCTION:          { bg: "#ede9fe", text: "#5b21b6", label: "En Producción",    accent: "#8b5cf6" },
  SHIPPED:                { bg: "#e0e7ff", text: "#3730a3", label: "Enviado",           accent: "#6366f1" },
  DELIVERED:              { bg: "#d1fae5", text: "#065f46", label: "Entregado",         accent: "#10b981" },
  CANCELLED:              { bg: "#fee2e2", text: "#991b1b", label: "Cancelada",         accent: "#ef4444" },
  REJECTED:               { bg: "#fee2e2", text: "#991b1b", label: "Rechazada",         accent: "#ef4444" },
};

const STATUS_ORDER = [
  "AWAITING_PAYMENT_PROOF",
  "UNDER_PAYMENT_REVIEW",
  "PAYMENT_VERIFIED",
  "IN_PRODUCTION",
  "SHIPPED",
  "DELIVERED",
];

const NEXT_STATUS: Record<string, string> = {
  PAYMENT_VERIFIED: "IN_PRODUCTION",
  IN_PRODUCTION:    "SHIPPED",
  SHIPPED:          "DELIVERED",
};

async function forceDownload(url: string, filename: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(blobUrl);
}

export default function OrdenDetallePage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);
  const [feedbackLink, setFeedbackLink] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfRegenerating, setPdfRegenerating] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const [printAssets, setPrintAssets] = useState<PrintAsset[]>([]);
  const [cbPdfUrl, setCbPdfUrl] = useState<string | null>(null);
  const [cbPdfGenerating, setCbPdfGenerating] = useState(false);
  const [cbPdfSuccess, setCbPdfSuccess] = useState(false);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [deletingSlot, setDeletingSlot] = useState<string | null>(null);
  const [confirmingSlot, setConfirmingSlot] = useState<string | null>(null);
  const [cbPdfGeneratedAt, setCbPdfGeneratedAt] = useState<string | null>(null);
  const [assetUrls, setAssetUrls] = useState<Record<number, string>>({});
  const [selectedPhoto, setSelectedPhoto] = useState<Record<number, Record<string, number>>>({});
  const [generatingSet, setGeneratingSet] = useState<Set<number>>(new Set());
  const [verifyingSet, setVerifyingSet] = useState<Set<number>>(new Set());
  const [generateError, setGenerateError] = useState<Record<number, string>>({});
  // Tapa/contratapa: una sola por orden (a diferencia de las plantillas, no
  // hace falta un Set/Record keyed por id).
  const [coverGenerating, setCoverGenerating] = useState(false);
  const [coverGenerateError, setCoverGenerateError] = useState("");
  const [coverVerifying, setCoverVerifying] = useState(false);
  const [backCoverGenerating, setBackCoverGenerating] = useState(false);
  const [backCoverGenerateError, setBackCoverGenerateError] = useState("");
  const [backCoverVerifying, setBackCoverVerifying] = useState(false);
  // Add-on: sin IA (maquetación local con Puppeteer), no necesita el
  // mecanismo de "verificando" de Portada/Contraportada — no depende de una
  // API externa lenta.
  const [addonGenerating, setAddonGenerating] = useState(false);
  const [addonGenerateError, setAddonGenerateError] = useState("");
  const [addonPickerOpen, setAddonPickerOpen] = useState(false);
  const [addonCandidates, setAddonCandidates] = useState<{ id: number; name: string; thumbnailUrl: string | null }[]>([]);
  const [addonCandidatesLoading, setAddonCandidatesLoading] = useState(false);
  const [selectedCrossSellIds, setSelectedCrossSellIds] = useState<number[]>([]);
  // Reemplazo: se guarda el assetId de la foto que se está pisando. Agregado
  // (sin foto vieja que pisar): se guarda el roleKey como string.
  const [uploadingAssetId, setUploadingAssetId] = useState<number | string | null>(null);
  const [uploadPhotoError, setUploadPhotoError] = useState<Record<number, string>>({});
  const [confirmingAll, setConfirmingAll] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [dedicationDraft, setDedicationDraft] = useState("");
  // Mismo límite y misma razón que el wizard del cliente — medido con
  // Chromium real contra .dedication-card (custom-book-pdf.service.ts): por
  // caracteres, no por palabras (una palabra larga rompe igual que muchas
  // cortas), corta entre 400-440, 380 deja margen.
  const MAX_DEDICATION_CHARS = 380;
  const [gradientStartDraft, setGradientStartDraft] = useState("#DF1F74");
  const [gradientEndDraft, setGradientEndDraft] = useState("#804187");
  const [savingDesign, setSavingDesign] = useState(false);
  const [designSaved, setDesignSaved] = useState(false);
  const generatingRef = useRef<Set<number>>(new Set());
  const designInitialized = useRef(false);

  const PDF_ELIGIBLE_STATUSES = ["PAYMENT_VERIFIED", "IN_PRODUCTION", "SHIPPED", "DELIVERED"];

  function load() {
    fetch(`${API}/api/admin/orders/${id}`)
      .then((r) => r.json())
      .then((order: OrderDetail) => {
        setData(order);
        // Precargar el editor de diseño solo la primera vez — así no se pisan
        // ediciones del admin en curso cada vez que load() se vuelve a llamar.
        if (!designInitialized.current) {
          setDedicationDraft(order.dedicationText ?? order.demoDedicationText ?? "");
          setGradientStartDraft(order.gradientColorStart);
          setGradientEndDraft(order.gradientColorEnd);
          designInitialized.current = true;
        }
        if (order.channel === "PHOTOBOOK" && order.photobookProjectId && PDF_ELIGIBLE_STATUSES.includes(order.status)) {
          loadPdf(order.photobookProjectId);
        }
        if (order.channel === "CUSTOM_BOOK" && PDF_ELIGIBLE_STATUSES.includes(order.status)) {
          // Las plantillas que ya tenían un original limpio de la demo se cargan
          // solas (sin gastar una llamada nueva a OpenAI) antes de leer los
          // archivos de imprenta, para que ya aparezcan como pendientes de revisar.
          fetch(`${API}/api/admin/orders/${order.id}/print-assets/backfill-from-demo`, { method: "POST" })
            .catch(() => {})
            .finally(() => loadPrintAssets(order.id));
          loadCbRender(order.id);
        }
        // Resolver URLs de las fotos del cliente en paralelo — para el selector
        // de fotos del botón "Generar con IA".
        Promise.all(
          (order.demoAssetIds ?? []).map(async (assetId) => {
            const url = await resolveAssetUrl(assetId);
            return { assetId, url };
          })
        ).then((results) => {
          const urlMap: Record<number, string> = {};
          for (const { assetId, url } of results) {
            if (url) urlMap[assetId] = url;
          }
          setAssetUrls(urlMap);
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  /** La generación con IA tarda ~1-2 min (llamada a OpenAI). Si el fetch se
   * corta antes de tiempo (proxy/red), el servidor puede haber terminado
   * igual — antes de mostrar error, chequeamos si ya apareció el resultado. */
  async function waitForTemplateResult(orderId: number, templateId: number, startedAt: number): Promise<boolean> {
    for (let attempt = 0; attempt < 30; attempt++) {
      await new Promise((r) => setTimeout(r, 4000));
      try {
        const res = await fetch(`${API}/api/admin/orders/${orderId}/print-assets`);
        if (!res.ok) continue;
        const list: PrintAsset[] = await res.json();
        const done = list.some(
          (a) => a.templateId === templateId && a.assetType === "TEMPLATE" && new Date(a.uploadedAt).getTime() >= startedAt,
        );
        if (done) return true;
      } catch { /* seguir intentando */ }
    }
    return false;
  }

  /** Mismo mecanismo que waitForTemplateResult, para COVER/BACK_COVER —
   * estos no tienen templateId (template_id es NULL), así que matchea por
   * assetType nomás. */
  async function waitForCoverResult(orderId: number, assetType: "COVER" | "BACK_COVER", startedAt: number): Promise<boolean> {
    for (let attempt = 0; attempt < 30; attempt++) {
      await new Promise((r) => setTimeout(r, 4000));
      try {
        const res = await fetch(`${API}/api/admin/orders/${orderId}/print-assets`);
        if (!res.ok) continue;
        const list: PrintAsset[] = await res.json();
        const done = list.some(
          (a) => a.assetType === assetType && a.templateId === null && new Date(a.uploadedAt).getTime() >= startedAt,
        );
        if (done) return true;
      } catch { /* seguir intentando */ }
    }
    return false;
  }

  /** Sube una foto nueva (ej. el cliente mandó una de mala calidad y el admin
   * le pidió otra). Con oldAssetId: REEMPLAZA esa foto puntual del rol, las
   * demás quedan intactas. Sin oldAssetId: AGREGA una opción nueva al rol
   * (para cuando quedó con menos fotos de las que debería). Afecta a todas
   * las plantillas de la orden que usen ese rol, no solo la que se esté
   * generando en el momento. */
  async function handleReplaceCharacterPhoto(templateId: number, roleKey: string, oldAssetId: number | undefined, file: File) {
    if (!data) return;
    setUploadingAssetId(oldAssetId ?? roleKey);
    setUploadPhotoError((prev) => ({ ...prev, [templateId]: "" }));
    try {
      const formData = new FormData();
      formData.append("file", file);
      // /api/assets/upload del backend exige JWT vía header Authorization —
      // el token vive en una cookie httpOnly (inaccesible para fetch desde
      // acá a propósito), así que pasa por este proxy server-side de Next.js
      // que sí puede leerla.
      const uploadRes = await fetch(`/api/admin/upload-asset?folder=uploads/customers`, {
        method: "POST",
        body: formData,
      });
      if (!uploadRes.ok) throw new Error("No se pudo subir la foto");
      const uploaded = await uploadRes.json();

      const linkRes = await fetch(`${API}/api/admin/orders/${data.id}/character-photos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleKey, oldAssetId, newAssetId: uploaded.id }),
      });
      if (!linkRes.ok) throw new Error("No se pudo asociar la foto a esta orden");

      load();
    } catch (err) {
      setUploadPhotoError((prev) => ({ ...prev, [templateId]: err instanceof Error ? err.message : "Error al subir la foto" }));
    } finally {
      setUploadingAssetId(null);
    }
  }

  async function handleGenerateTemplate(templateId: number) {
    if (!data) return;
    if (generatingRef.current.has(templateId)) return;
    generatingRef.current.add(templateId);

    setGeneratingSet((prev) => new Set(prev).add(templateId));
    setGenerateError((prev) => ({ ...prev, [templateId]: "" }));
    const startedAt = Date.now();
    try {
      const res = await fetch(
        `${API}/api/admin/orders/${data.id}/print-assets/generate?templateId=${templateId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ selectedAssetIds: selectedPhoto[templateId] ?? {} }),
        },
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message ?? "Error al generar");
      }
      loadPrintAssets(data.id);
    } catch (err) {
      // Se cortó la conexión, pero el servidor puede haber terminado igual —
      // lo dejamos claro en el botón mientras confirmamos, en vez de quedar
      // en un "Generando…" indistinguible de la espera normal.
      setVerifyingSet((prev) => new Set(prev).add(templateId));
      const finishedAnyway = await waitForTemplateResult(data.id, templateId, startedAt);
      setVerifyingSet((prev) => { const next = new Set(prev); next.delete(templateId); return next; });
      if (finishedAnyway) {
        loadPrintAssets(data.id);
      } else {
        setGenerateError((prev) => ({ ...prev, [templateId]: err instanceof Error ? err.message : "Error" }));
      }
    } finally {
      generatingRef.current.delete(templateId);
      setGeneratingSet((prev) => { const next = new Set(prev); next.delete(templateId); return next; });
    }
  }

  /** Sin selector de fotos propio — usa la primera foto de cada rol (mismo
   * default que el backend aplica si no se manda selectedAssetIds). Si el
   * admin necesita elegir otra foto, el upload manual sigue disponible como
   * fallback en la fila de abajo. */
  async function handleGenerateCover() {
    if (!data) return;
    setCoverGenerating(true);
    setCoverGenerateError("");
    const startedAt = Date.now();
    try {
      const res = await fetch(`${API}/api/admin/orders/${data.id}/print-assets/generate-cover`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedAssetIds: selectedPhoto[COVER_PHOTO_KEY] ?? {} }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message ?? "Error al generar la tapa");
      }
      loadPrintAssets(data.id);
    } catch (err) {
      // Se cortó la conexión, pero el servidor puede haber terminado igual
      // (images.edit con referencias tarda bastante) — mismo mecanismo que
      // handleGenerateTemplate, evita un error falso.
      setCoverVerifying(true);
      const finishedAnyway = await waitForCoverResult(data.id, "COVER", startedAt);
      setCoverVerifying(false);
      if (finishedAnyway) {
        loadPrintAssets(data.id);
      } else {
        setCoverGenerateError(err instanceof Error ? err.message : "Error al generar la tapa");
      }
    } finally {
      setCoverGenerating(false);
    }
  }

  async function handleGenerateBackCover() {
    if (!data) return;
    setBackCoverGenerating(true);
    setBackCoverGenerateError("");
    const startedAt = Date.now();
    try {
      const res = await fetch(`${API}/api/admin/orders/${data.id}/print-assets/generate-back-cover`, { method: "POST" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message ?? "Error al generar la contratapa");
      }
      loadPrintAssets(data.id);
    } catch (err) {
      setBackCoverVerifying(true);
      const finishedAnyway = await waitForCoverResult(data.id, "BACK_COVER", startedAt);
      setBackCoverVerifying(false);
      if (finishedAnyway) {
        loadPrintAssets(data.id);
      } else {
        setBackCoverGenerateError(err instanceof Error ? err.message : "Error al generar la contratapa");
      }
    } finally {
      setBackCoverGenerating(false);
    }
  }

  async function handleGenerateAddon() {
    if (!data) return;
    setAddonGenerating(true);
    setAddonGenerateError("");
    try {
      const res = await fetch(`${API}/api/admin/orders/${data.id}/print-assets/generate-addon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedModelIds: selectedCrossSellIds }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message ?? "Error al generar el add-on");
      }
      loadPrintAssets(data.id);
    } catch (err) {
      setAddonGenerateError(err instanceof Error ? err.message : "Error al generar el add-on");
    } finally {
      setAddonGenerating(false);
    }
  }

  async function toggleAddonPicker() {
    if (!data) return;
    const opening = !addonPickerOpen;
    setAddonPickerOpen(opening);
    if (opening && addonCandidates.length === 0) {
      setAddonCandidatesLoading(true);
      try {
        const res = await fetch(`${API}/api/admin/orders/${data.id}/cross-sell-candidates`);
        if (res.ok) setAddonCandidates(await res.json());
      } finally {
        setAddonCandidatesLoading(false);
      }
    }
  }

  function toggleCrossSellId(id: number) {
    setSelectedCrossSellIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev; // máximo 3 — la página solo tiene lugar para eso
      return [...prev, id];
    });
  }

  async function handleConfirmAll() {
    if (!data) return;
    setConfirmingAll(true);
    try {
      const res = await fetch(`${API}/api/admin/orders/${data.id}/print-assets/confirm`, { method: "POST" });
      if (!res.ok) throw new Error();
      loadPrintAssets(data.id);
    } catch {
      alert("Error al confirmar las imágenes");
    } finally {
      setConfirmingAll(false);
    }
  }

  async function handleSaveDesign() {
    if (!data) return;
    setSavingDesign(true);
    try {
      const res = await fetch(`${API}/api/admin/orders/${data.id}/print-design`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dedicationText: dedicationDraft,
          gradientColorStart: gradientStartDraft,
          gradientColorEnd: gradientEndDraft,
        }),
      });
      if (!res.ok) throw new Error();
      setDesignSaved(true);
      setTimeout(() => setDesignSaved(false), 3000);
      load();
    } catch {
      alert("Error al guardar el diseño del libro");
    } finally {
      setSavingDesign(false);
    }
  }

  function loadPdf(projectId: number) {
    setPdfLoading(true);
    fetch(`${API}/api/admin/photobook/projects/${projectId}/render`)
      .then((r) => { if (r.ok) return r.json(); throw new Error("not ready"); })
      .then((r: { pdfUrl: string }) => setPdfUrl(r.pdfUrl))
      .catch(() => setPdfUrl(null))
      .finally(() => setPdfLoading(false));
  }

  function loadPrintAssets(orderId: number) {
    fetch(`${API}/api/admin/orders/${orderId}/print-assets`)
      .then((r) => r.json())
      .then((list: PrintAsset[]) => setPrintAssets(Array.isArray(list) ? list : []))
      .catch(() => {});
  }

  function loadCbRender(orderId: number) {
    fetch(`${API}/api/admin/orders/${orderId}/render`)
      .then((r) => { if (r.ok) return r.json(); throw new Error(); })
      .then((r: { pdfUrl: string; generatedAt: string }) => {
        setCbPdfUrl(r.pdfUrl + `?v=${Date.now()}`);
        setCbPdfGeneratedAt(r.generatedAt);
      })
      .catch(() => { setCbPdfUrl(null); setCbPdfGeneratedAt(null); });
  }

  useEffect(() => { load(); }, [id]);

  async function reviewPayment(action: "APPROVE" | "REJECT") {
    setActing(true);
    try {
      const res = await fetch(`${API}/api/admin/orders/${id}/review-payment`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, rejectionReason: action === "REJECT" ? "Voucher no válido" : undefined }),
      });
      if (!res.ok) throw new Error();
      // Auto-generar link de feedback al aprobar el pago
      if (action === "APPROVE") {
        try {
          const fbRes = await fetch(`${API}/api/admin/feedback/generate/${id}`, { method: "POST" });
          if (fbRes.ok) {
            const fbResult = await fbRes.json();
            setFeedbackLink(fbResult.url);
          }
        } catch { /* silencioso — no bloquear el flujo principal */ }
      }
      load();
    } catch { alert("Error al revisar pago"); }
    finally { setActing(false); }
  }

  async function advanceStatus() {
    if (!data) return;
    const next = NEXT_STATUS[data.status];
    if (!next) return;
    setActing(true);
    try {
      const res = await fetch(`${API}/api/admin/orders/${id}/advance-status`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newStatus: next }),
      });
      if (!res.ok) throw new Error();
      load();
    } catch { alert("Error al avanzar estado"); }
    finally { setActing(false); }
  }

  if (loading) return <div style={{ padding: "32px", color: "#999" }}>Cargando...</div>;
  if (!data) return <div style={{ padding: "32px", color: "#999" }}>Orden no encontrada.</div>;

  const st = STATUS_MAP[data.status] ?? { bg: "#f3f4f6", text: "#374151", label: data.status, accent: "#6b7280" };
  const nextSt = NEXT_STATUS[data.status];
  const nextStInfo = nextSt ? STATUS_MAP[nextSt] : null;
  const currentStepIndex = STATUS_ORDER.indexOf(data.status);

  // Cover no tiene templateId propio (1 por pedido, no por plantilla) — usa
  // esta key ficticia para reusar selectedPhoto/uploadPhotoError (Record
  // keyed by number) sin necesitar estado nuevo. El backend nunca ve este
  // número, es solo la clave local del bucket de selección de fotos.
  const COVER_PHOTO_KEY = -1;

  // Grupos de fotos con roleKey (calza con characterMeta[roleKey] del backend)
  // — mismo patrón que solicitudes/[id], para elegir qué foto mandar a generar.
  const photoGroups: { label: string; roleKey: string; ids: number[] }[] = (() => {
    const meta = data.characterMeta;
    if (!meta) return [];
    if ("papa" in meta) {
      return [
        { label: `Papá — ${meta.papa.name || ""}`, roleKey: "papa", ids: meta.papa.assetIds ?? [] },
        { label: `Mamá — ${meta.mama.name || ""}`, roleKey: "mama", ids: meta.mama.assetIds ?? [] },
        ...meta.hijos.map((h, i) => ({ label: `Hijo ${i + 1} — ${h.name || ""}`, roleKey: `hijos[${i}]`, ids: h.assetIds ?? [] })),
      ];
    }
    if ("hermanos" in meta) {
      return meta.hermanos.map((h, i) => ({
        label: `${h.gender === "F" ? "Hermana" : "Hermano"} ${i + 1} — ${h.name || ""}`,
        roleKey: `hermanos[${i}]`,
        ids: h.assetIds ?? [],
      }));
    }
    if ("pet" in meta) {
      return [
        { label: `Mascota — ${meta.pet.name || ""}`, roleKey: "pet", ids: meta.pet.assetIds ?? [] },
        ...meta.owners.map((o, i) => ({ label: `Dueño ${i + 1} — ${o.name || ""}`, roleKey: `owners[${i}]`, ids: o.assetIds ?? [] })),
      ];
    }
    if ("recipient" in meta && meta.mode === "memorial-hermanos") {
      return [
        { label: `Fallecido/a — ${meta.recipient.name || ""}`, roleKey: "recipient", ids: meta.recipient.assetIds ?? [] },
        ...meta.livingSiblings.map((s, i) => ({ label: `Hermano ${i + 1} — ${s.name || ""}`, roleKey: `livingSiblings[${i}]`, ids: s.assetIds ?? [] })),
      ];
    }
    if ("recipient" in meta) {
      return [
        { label: meta.recipient.nickname ? `"${meta.recipient.nickname}"` : meta.recipient.name || "Protagonista", roleKey: "recipient", ids: meta.recipient.assetIds ?? [] },
        ...(meta.dedicator ? [{ label: meta.dedicator.name || "Quien dedica", roleKey: "dedicator", ids: meta.dedicator.assetIds ?? [] }] : []),
      ];
    }
    return [];
  })();

  return (
    <div style={{ padding: "32px" }}>

      {/* ── 1. Header ── */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 500 }}>Orden #{data.id}</span>
          {data.demoRequestId && (
            <Link href={`/admin/libros-personalizados/solicitudes/${data.demoRequestId}`}
              style={{ fontSize: "12px", fontWeight: 600, color: "#3b82f6", textDecoration: "none", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "6px", padding: "2px 10px" }}>
              ← Solicitud #{data.demoRequestId}
            </Link>
          )}
          {data.photobookProjectId && (
            <Link href={`/admin/photobooks/proyectos/${data.photobookProjectId}`}
              style={{ fontSize: "12px", fontWeight: 600, color: "#7c3aed", textDecoration: "none", background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: "6px", padding: "2px 10px" }}>
              ← Proyecto #{data.photobookProjectId}
            </Link>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
          <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 800, color: "#111" }}>{data.customerFullName}</h1>
          <span style={{ padding: "4px 14px", borderRadius: "8px", background: st.bg, color: st.text, fontSize: "13px", fontWeight: 700 }}>{st.label}</span>
          <span style={{ fontSize: "12px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", background: data.channel === "CUSTOM_BOOK" ? "#fef3c7" : "#ede9fe", color: data.channel === "CUSTOM_BOOK" ? "#92400e" : "#5b21b6" }}>
            {data.channel === "CUSTOM_BOOK" ? "Libro personalizado" : "Photobook"}
          </span>
        </div>
      </div>

      {/* ── 2. Progreso ── */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "20px", overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
          {/* Stepper */}
          <div style={{ overflowX: "auto", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "flex-start", minWidth: "max-content" }}>
              {STATUS_ORDER.map((s, i) => {
                const info = STATUS_MAP[s];
                const isDone    = i < currentStepIndex;
                const isCurrent = i === currentStepIndex;
                const isLast    = i === STATUS_ORDER.length - 1;
                return (
                  <div key={s} style={{ display: "flex", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "88px" }}>
                      <div style={{
                        width: "24px", height: "24px", borderRadius: "50%", flexShrink: 0,
                        background: isCurrent ? info.accent : isDone ? "#dcfce7" : "#f3f4f6",
                        border: isCurrent ? `3px solid ${info.accent}` : isDone ? "3px solid #22c55e" : "3px solid #e5e7eb",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: isCurrent ? `0 0 0 4px ${info.accent}22` : "none",
                      }}>
                        {isDone && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                        {isCurrent && <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#fff" }} />}
                      </div>
                      <div style={{ marginTop: "6px", textAlign: "center", fontSize: "10px", fontWeight: isCurrent ? 700 : 500, color: isCurrent ? info.text : isDone ? "#6b7280" : "#9ca3af", lineHeight: 1.3, padding: "0 2px" }}>
                        {info.label}
                      </div>
                      {(() => {
                        const ev = data.statusEvents.find((e) => e.newStatus === s);
                        return ev ? (
                          <div style={{ marginTop: "3px", fontSize: "9px", color: "#9ca3af", textAlign: "center" }}>
                            {new Date(ev.createdAt).toLocaleDateString("es-PE", { day: "2-digit", month: "short" })}
                          </div>
                        ) : null;
                      })()}
                    </div>
                    {!isLast && (
                      <div style={{ width: "28px", height: "2px", marginTop: "11px", background: isDone ? "#22c55e" : "#e5e7eb", flexShrink: 0 }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Botón avanzar — integrado */}
          {nextStInfo && (
            <button
              disabled={acting}
              onClick={advanceStatus}
              style={{ flexShrink: 0, padding: "10px 22px", borderRadius: "10px", border: "none", background: acting ? "#e5e7eb" : nextStInfo.accent, color: "#fff", fontSize: "13px", fontWeight: 700, cursor: acting ? "not-allowed" : "pointer", fontFamily: "inherit", whiteSpace: "nowrap", boxShadow: acting ? "none" : `0 4px 12px ${nextStInfo.accent}44` }}>
              {acting ? "..." : `→ ${nextStInfo.label}`}
            </button>
          )}
        </div>
        {/* Nota del último evento */}
        {data.statusEvents.length > 0 && data.statusEvents[0].note && (
          <div style={{ padding: "10px 24px", borderTop: "1px solid #f3f4f6", fontSize: "12px", color: "#6b7280" }}>
            <span style={{ fontWeight: 600, color: "#374151" }}>Última nota: </span>{data.statusEvents[0].note}
          </div>
        )}
      </div>

      {/* ── 3. Info strip ── */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "24px", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { label: "Email",    value: data.customerEmail },
            { label: "Teléfono", value: data.customerPhone || "—" },
            { label: "Total",    value: `S/ ${(data.totalAmountCents / 100).toFixed(2)}`, accent: true },
            { label: "Entrega",  value: data.estimatedDeliveryDate ?? "—" },
          ].map((f, i, arr) => (
            <div key={f.label} style={{ padding: "14px 20px", borderRight: i < arr.length - 1 ? "1px solid #f3f4f6" : "none" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "5px" }}>{f.label}</div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: f.accent ? "#111" : "#374151" }}>{f.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. Voucher de pago ── */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "24px", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>Voucher de pago</span>
        </div>
        {data.paymentProof ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
            {/* Imagen */}
            <div style={{ padding: "20px", borderRight: "1px solid #f3f4f6", position: "relative" }}>
              <img
                src={data.paymentProof.voucherUrl}
                alt="Voucher"
                style={{ width: "100%", borderRadius: "10px", background: "#f3f4f6", display: "block", maxHeight: "360px", objectFit: "contain" }}
              />
              <button
                onClick={() => forceDownload(data.paymentProof!.voucherUrl, `voucher_orden_${data.id}.jpg`)}
                style={{ position: "absolute", top: "28px", right: "28px", padding: "6px 12px", borderRadius: "6px", border: "none", background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                Descargar
              </button>
            </div>
            {/* Datos + acciones */}
            <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "Método",  value: data.paymentProof.paymentMethod },
                  { label: "Monto",   value: `S/ ${(data.paymentProof.amountCents / 100).toFixed(2)}` },
                  { label: "Estado",  value: data.paymentProof.status === "PENDING" ? "Pendiente de revisión" : data.paymentProof.status === "APPROVED" ? "Aprobado" : "Rechazado" },
                ].map((r) => (
                  <div key={r.label}>
                    <div style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "3px" }}>{r.label}</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#111" }}>{r.value}</div>
                  </div>
                ))}
              </div>
              {data.paymentProof.status === "PENDING" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "8px", borderTop: "1px solid #f3f4f6" }}>
                  <button disabled={acting} onClick={() => reviewPayment("APPROVE")}
                    style={{ padding: "12px", borderRadius: "10px", border: "none", background: acting ? "#d1fae5" : "#16a34a", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: acting ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: acting ? 0.7 : 1 }}>
                    {acting ? "Procesando..." : "✓ Aprobar pago"}
                  </button>
                  <button disabled={acting} onClick={() => reviewPayment("REJECT")}
                    style={{ padding: "12px", borderRadius: "10px", border: "1px solid #fca5a5", background: "#fff", color: "#ef4444", fontSize: "14px", fontWeight: 700, cursor: acting ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: acting ? 0.7 : 1 }}>
                    Rechazar
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ padding: "40px", textAlign: "center", color: "#9ca3af", fontSize: "14px" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" style={{ display: "block", margin: "0 auto 10px" }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            Sin voucher aún — esperando al cliente
          </div>
        )}
      </div>

      {/* ── 6. PDF para imprenta ── */}
      {data.channel === "PHOTOBOOK" && PDF_ELIGIBLE_STATUSES.includes(data.status) && (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "24px", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>PDF para imprenta</span>
          </div>
          <div style={{ padding: "20px 24px" }}>
            {pdfSuccess && (
              <div style={{ marginBottom: "12px", padding: "10px 14px", borderRadius: "8px", background: "#f0fdf4", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#15803d" }}>PDF generado con éxito</span>
              </div>
            )}
            {pdfLoading ? (
              <div style={{ fontSize: "13px", color: "#9ca3af" }}>Verificando PDF...</div>
            ) : pdfUrl ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#111", marginBottom: "3px" }}>PDF generado y listo</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Proyecto #{data.photobookProjectId}</div>
                </div>
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <button
                    disabled={pdfRegenerating}
                    onClick={async () => {
                      setPdfRegenerating(true);
                      try {
                        await fetch(`${API}/api/admin/photobook/projects/${data.photobookProjectId}/render`, { method: "POST" });
                        // Esperar 8s y luego recargar la URL del PDF
                        await new Promise((r) => setTimeout(r, 8000));
                        const res = await fetch(`${API}/api/admin/photobook/projects/${data.photobookProjectId}/render`);
                        if (res.ok) {
                          const r = await res.json();
                          setPdfUrl(r.pdfUrl);
                          setPdfSuccess(true);
                          setTimeout(() => setPdfSuccess(false), 4000);
                        }
                      } catch { /* silencioso */ }
                      finally { setPdfRegenerating(false); }
                    }}
                    style={{ padding: "12px 20px", borderRadius: "10px", border: "1px solid #e5e7eb", background: "#fff", color: pdfRegenerating ? "#9ca3af" : "#374151", fontSize: "13px", fontWeight: 600, cursor: pdfRegenerating ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
                    {pdfRegenerating ? "Generando..." : "Regenerar PDF"}
                  </button>
                  <button
                    onClick={() => forceDownload(pdfUrl, `photobook_proyecto_${data.photobookProjectId}.pdf`)}
                    style={{ padding: "12px 24px", borderRadius: "10px", border: "none", background: "#2563eb", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 12px rgba(37,99,235,0.25)" }}>
                    Descargar PDF
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: "13px", color: "#9ca3af" }}>
                Generando PDF en segundo plano... Recarga la página en unos segundos.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 6b. Diseño del libro (degradado + dedicatoria, automáticos) ── */}
      {data.channel === "CUSTOM_BOOK" && PDF_ELIGIBLE_STATUSES.includes(data.status) && (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "24px", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>Diseño del libro</span>
            <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>
              Página de degradado + dedicatoria se generan solas — nada de esto se sube a mano. El texto sale del cliente pero podés editarlo antes de mandarlo al PDF.
            </div>
          </div>
          <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Dedicatoria</span>
                {!data.dedicationText && data.demoDedicationText && (
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#6b7280", background: "#f3f4f6", borderRadius: "4px", padding: "1px 6px" }}>
                    Original del cliente
                  </span>
                )}
              </div>
              <textarea
                value={dedicationDraft}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_DEDICATION_CHARS) setDedicationDraft(e.target.value);
                }}
                maxLength={MAX_DEDICATION_CHARS}
                rows={4}
                placeholder="El cliente todavía no dejó una dedicatoria — podés escribir una acá."
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontFamily: "inherit", fontSize: "13px", color: "#111", resize: "vertical" }}
              />
              <div style={{ marginTop: "4px", fontSize: "11px", color: dedicationDraft.length >= MAX_DEDICATION_CHARS ? "#dc2626" : "#9ca3af", textAlign: "right" }}>
                {dedicationDraft.length} / {MAX_DEDICATION_CHARS} caracteres
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Degradado</span>
                <input type="color" value={gradientStartDraft} onChange={(e) => setGradientStartDraft(e.target.value)}
                  style={{ width: "36px", height: "36px", border: "none", borderRadius: "8px", cursor: "pointer", padding: 0 }} />
                <span style={{ fontSize: "11px", color: "#9ca3af" }}>→</span>
                <input type="color" value={gradientEndDraft} onChange={(e) => setGradientEndDraft(e.target.value)}
                  style={{ width: "36px", height: "36px", border: "none", borderRadius: "8px", cursor: "pointer", padding: 0 }} />
              </div>
              <div style={{ flex: 1, minWidth: "120px", height: "36px", borderRadius: "8px", background: `linear-gradient(135deg, ${gradientStartDraft}, ${gradientEndDraft})` }} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                disabled={savingDesign}
                onClick={handleSaveDesign}
                style={{ padding: "10px 20px", borderRadius: "9px", border: "none", background: savingDesign ? "#c4b5fd" : "#7c3aed", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: savingDesign ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
                {savingDesign ? "Guardando..." : "Guardar diseño"}
              </button>
              {designSaved && (
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#059669" }}>✓ Guardado — se usa en el próximo &quot;Generar PDF&quot;</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── 7. Archivos para imprenta (solo CUSTOM_BOOK) ── */}
      {data.channel === "CUSTOM_BOOK" && PDF_ELIGIBLE_STATUSES.includes(data.status) && (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "24px", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>Archivos para imprenta</span>
              {(() => {
                const total = 2 + (data.templateSelections?.length ?? 0) * 2;
                const uploaded = printAssets.filter((a) => a.status === "CONFIRMED" && a.assetType !== "ADDON").length;
                const allDone = uploaded >= total;
                return (
                  <span style={{ fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px", background: allDone ? "#d1fae5" : "#fef3c7", color: allDone ? "#065f46" : "#92400e" }}>
                    {uploaded} / {total} archivos
                  </span>
                );
              })()}
            </div>
            <span style={{ fontSize: "11px", color: "#9ca3af" }}>20.5 × 29 cm</span>
          </div>

          {/* Generar con IA — Tapa, Contraportada y Add-on. Sección separada
              de "Páginas interiores" (más abajo) porque son partes distintas
              del libro: 1 por pedido (no por plantilla), y la Tapa es la
              única que usa fotos de referencia reales — la Contraportada es
              fondo+texto sin personas, y el Add-on no tiene generación con
              IA (es automático con QR o upload manual). */}
          {(() => {
            const coverPending = printAssets.find((a) => a.assetType === "COVER" && a.status === "PENDING_REVIEW");
            const coverConfirmed = printAssets.find((a) => a.assetType === "COVER" && a.status === "CONFIRMED");
            const coverPreview = coverPending ?? coverConfirmed;
            const backCoverPending = printAssets.find((a) => a.assetType === "BACK_COVER" && a.status === "PENDING_REVIEW");
            const backCoverConfirmed = printAssets.find((a) => a.assetType === "BACK_COVER" && a.status === "CONFIRMED");
            const backCoverPreview = backCoverPending ?? backCoverConfirmed;
            const addonAsset = printAssets.find((a) => a.assetType === "ADDON");

            const StatusBadge = ({ pending, confirmed }: { pending: boolean; confirmed: boolean }) =>
              pending ? (
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#92400e", background: "#fef3c7", padding: "2px 8px", borderRadius: "999px" }}>Pendiente de revisión</span>
              ) : confirmed ? (
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#059669", background: "#d1fae5", padding: "2px 8px", borderRadius: "999px" }}>Confirmado</span>
              ) : null;

            return (
              <div style={{ padding: "16px 24px", borderBottom: "1px solid #f3f4f6", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.4px" }}>
                  Generar con IA — Tapa y Contraportada
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: "12px" }}>
                  {/* ── Portada ── */}
                  <div style={{ border: "1px solid #e5e7eb", borderRadius: "10px", padding: "12px 14px", background: "#fafafa" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>Portada</span>
                      <StatusBadge pending={!!coverPending} confirmed={!!coverConfirmed} />
                    </div>
                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      {coverPreview && (
                        <img
                          src={coverPreview.previewUrl}
                          alt="Portada"
                          onClick={() => setZoomedImage(coverPreview.previewUrl)}
                          style={{ width: "130px", height: "92px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e5e7eb", display: "block", cursor: "zoom-in", flexShrink: 0 }}
                        />
                      )}
                      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                        {photoGroups.length > 0 && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                            {photoGroups.map((g) => {
                              const chosen = selectedPhoto[COVER_PHOTO_KEY]?.[g.roleKey] ?? g.ids[0];
                              return (
                                <div key={g.roleKey}>
                                  <div style={{ fontSize: "9px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", marginBottom: "3px" }}>{g.label}</div>
                                  <div style={{ display: "flex", gap: "4px" }}>
                                    {g.ids.map((assetId) => {
                                      const url = assetUrls[assetId];
                                      const isChosen = assetId === chosen;
                                      const isReplacing = uploadingAssetId === assetId;
                                      return (
                                        <div key={assetId} style={{ position: "relative", width: "38px", height: "38px", flexShrink: 0 }}>
                                          <button type="button"
                                            onClick={() => setSelectedPhoto((prev) => ({ ...prev, [COVER_PHOTO_KEY]: { ...prev[COVER_PHOTO_KEY], [g.roleKey]: assetId } }))}
                                            style={{ padding: 0, border: isChosen ? "2px solid #7c3aed" : "2px solid transparent", borderRadius: "6px", cursor: "pointer", background: "none", width: "38px", height: "38px", overflow: "hidden", display: "block" }}
                                            title={`Usar esta foto para ${g.label}`}>
                                            {url ? <img src={url} alt={g.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : <div style={{ width: "100%", height: "100%", background: "#e5e7eb" }} />}
                                          </button>
                                          <label
                                            style={{ position: "absolute", bottom: "-4px", right: "-4px", width: "16px", height: "16px", borderRadius: "50%", background: "#111", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", cursor: isReplacing ? "wait" : "pointer", border: "1.5px solid #fff" }}
                                            title="Reemplazar esta foto puntual por una nueva">
                                            {isReplacing ? "…" : "↻"}
                                            <input type="file" accept="image/*" style={{ display: "none" }} disabled={isReplacing}
                                              onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) handleReplaceCharacterPhoto(COVER_PHOTO_KEY, g.roleKey, assetId, file);
                                                e.target.value = "";
                                              }} />
                                          </label>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {uploadPhotoError[COVER_PHOTO_KEY] && (
                          <div style={{ fontSize: "11px", color: "#dc2626" }}>{uploadPhotoError[COVER_PHOTO_KEY]}</div>
                        )}
                        <div>
                          <button
                            disabled={coverGenerating}
                            onClick={handleGenerateCover}
                            style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: coverVerifying ? "#f59e0b" : coverGenerating ? "#c4b5fd" : "#7c3aed", color: "#fff", fontSize: "12px", fontWeight: 700, cursor: coverGenerating ? "wait" : "pointer", fontFamily: "inherit" }}>
                            {coverVerifying
                              ? "Se cortó la conexión — verificando…"
                              : coverGenerating
                              ? "Generando… (puede tardar 1-2 min)"
                              : coverPreview
                              ? "Regenerar con IA"
                              : "Generar con IA"}
                          </button>
                          {coverGenerateError && (
                            <div style={{ marginTop: "6px", fontSize: "11px", color: "#dc2626" }}>{coverGenerateError}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── Contraportada — sin selector de fotos, no usa referencias reales ── */}
                  <div style={{ border: "1px solid #e5e7eb", borderRadius: "10px", padding: "12px 14px", background: "#fafafa" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>Contraportada</span>
                      <StatusBadge pending={!!backCoverPending} confirmed={!!backCoverConfirmed} />
                    </div>
                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      {backCoverPreview && (
                        <img
                          src={backCoverPreview.previewUrl}
                          alt="Contraportada"
                          onClick={() => setZoomedImage(backCoverPreview.previewUrl)}
                          style={{ width: "130px", height: "92px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e5e7eb", display: "block", cursor: "zoom-in", flexShrink: 0 }}
                        />
                      )}
                      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                        <div style={{ fontSize: "11px", color: "#9ca3af" }}>Fondo + texto — no lleva fotos reales, no hay nada que elegir acá.</div>
                        <div>
                          <button
                            disabled={backCoverGenerating}
                            onClick={handleGenerateBackCover}
                            style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: backCoverVerifying ? "#f59e0b" : backCoverGenerating ? "#c4b5fd" : "#7c3aed", color: "#fff", fontSize: "12px", fontWeight: 700, cursor: backCoverGenerating ? "wait" : "pointer", fontFamily: "inherit" }}>
                            {backCoverVerifying
                              ? "Se cortó la conexión — verificando…"
                              : backCoverGenerating
                              ? "Generando… (puede tardar 1-2 min)"
                              : backCoverPreview
                              ? "Regenerar con IA"
                              : "Generar con IA"}
                          </button>
                          {backCoverGenerateError && (
                            <div style={{ marginTop: "6px", fontSize: "11px", color: "#dc2626" }}>{backCoverGenerateError}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Add-on — página de venta cruzada, SIN IA (maquetación
                    local con datos del catálogo). El botón la materializa
                    como imagen para revisar antes de confirmar; si preferís
                    subir algo manual, ese upload sigue abajo y tiene
                    prioridad sobre esto. ── */}
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.4px", marginTop: "4px" }}>
                  Add-on — Página de venta cruzada
                </div>
                <div style={{ border: "1px solid #e5e7eb", borderRadius: "10px", padding: "12px 14px", background: "#fafafa", maxWidth: "420px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>Add-on</span>
                    {addonAsset && <StatusBadge pending={addonAsset.status === "PENDING_REVIEW"} confirmed={addonAsset.status === "CONFIRMED"} />}
                  </div>
                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    {addonAsset && (
                      <img
                        src={addonAsset.previewUrl}
                        alt="Add-on"
                        onClick={() => setZoomedImage(addonAsset.previewUrl)}
                        style={{ width: "130px", height: "92px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e5e7eb", display: "block", cursor: "zoom-in", flexShrink: 0 }}
                      />
                    )}
                    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div style={{ fontSize: "11px", color: "#9ca3af" }}>
                        {addonAsset?.originalFilename
                          ? "Archivo subido manualmente — tiene prioridad, generar acá lo reemplaza."
                          : "Sin IA: arma la página con miniaturas y links de otros libros del catálogo."}
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={toggleAddonPicker}
                          style={{ background: "none", border: "none", padding: 0, fontSize: "11px", fontWeight: 600, color: "#7c3aed", cursor: "pointer", textDecoration: "underline" }}>
                          {addonPickerOpen
                            ? "Ocultar selección"
                            : selectedCrossSellIds.length > 0
                            ? `Elegir libros (${selectedCrossSellIds.length}/3 elegidos)`
                            : "Elegir libros (opcional — si no, va al azar)"}
                        </button>
                      </div>
                      {addonPickerOpen && (
                        <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px", maxHeight: "220px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "4px" }}>
                          {addonCandidatesLoading ? (
                            <span style={{ fontSize: "11px", color: "#9ca3af" }}>Cargando libros…</span>
                          ) : (
                            addonCandidates.map((c) => {
                              const checked = selectedCrossSellIds.includes(c.id);
                              const disabled = !checked && selectedCrossSellIds.length >= 3;
                              return (
                                <label key={c.id} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "3px 4px", borderRadius: "6px", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, background: checked ? "#f5f3ff" : "transparent" }}>
                                  <input type="checkbox" checked={checked} disabled={disabled} onChange={() => toggleCrossSellId(c.id)} />
                                  {c.thumbnailUrl && (
                                    <img src={c.thumbnailUrl} alt="" style={{ width: "24px", height: "24px", objectFit: "cover", borderRadius: "4px", flexShrink: 0 }} />
                                  )}
                                  <span style={{ fontSize: "11px", color: "#374151" }}>{c.name}</span>
                                </label>
                              );
                            })
                          )}
                        </div>
                      )}
                      <div>
                        <button
                          disabled={addonGenerating}
                          onClick={handleGenerateAddon}
                          style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: addonGenerating ? "#c4b5fd" : "#7c3aed", color: "#fff", fontSize: "12px", fontWeight: 700, cursor: addonGenerating ? "wait" : "pointer", fontFamily: "inherit" }}>
                          {addonGenerating ? "Generando…" : addonAsset ? "Regenerar" : "Generar"}
                        </button>
                        {addonGenerateError && (
                          <div style={{ marginTop: "6px", fontSize: "11px", color: "#dc2626" }}>{addonGenerateError}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Generar con IA — solo para plantillas con contenido de prompt cargado.
              El upload manual de abajo sigue siendo el fallback/corrección. */}
          {data.templateSelections.some((t) => t.hasPromptContent) && (
            <div style={{ padding: "16px 24px", borderBottom: "1px solid #f3f4f6", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.4px" }}>
                Generar con IA — Páginas interiores
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: "12px" }}>
              {data.templateSelections.filter((t) => t.hasPromptContent).map((t) => {
                const isGenerating = generatingSet.has(t.templateId);
                const isVerifying = verifyingSet.has(t.templateId);
                const pendingPages = printAssets.filter((a) => a.templateId === t.templateId && a.assetType === "TEMPLATE" && a.status === "PENDING_REVIEW");
                const confirmedPages = printAssets.filter((a) => a.templateId === t.templateId && a.assetType === "TEMPLATE" && a.status === "CONFIRMED");
                const isPending = pendingPages.length > 0;
                const isConfirmed = !isPending && confirmedPages.length > 0;
                const previewPages = isPending ? pendingPages : confirmedPages;
                return (
                  <div key={t.templateId} style={{ border: "1px solid #e5e7eb", borderRadius: "10px", padding: "12px 14px", background: "#fafafa" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: photoGroups.length > 0 || previewPages.length > 0 ? "8px" : "0" }}>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>{t.templateName ?? `Plantilla #${t.templateId}`}</span>
                      {isPending && (
                        <span style={{ fontSize: "10px", fontWeight: 700, color: "#92400e", background: "#fef3c7", padding: "2px 8px", borderRadius: "999px" }}>
                          Pendiente de revisión
                        </span>
                      )}
                      {isConfirmed && (
                        <span style={{ fontSize: "10px", fontWeight: 700, color: "#059669", background: "#d1fae5", padding: "2px 8px", borderRadius: "999px" }}>
                          Confirmado
                        </span>
                      )}
                    </div>

                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      {previewPages.length > 0 && (
                        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                          {previewPages
                            .slice()
                            .sort((a, b) => a.pagePart.localeCompare(b.pagePart))
                            .map((p) => (
                              <div key={p.id} style={{ position: "relative" }}>
                                <img
                                  src={p.previewUrl}
                                  alt={`Cara ${p.pagePart}`}
                                  onClick={() => setZoomedImage(p.previewUrl)}
                                  style={{ width: "130px", height: "173px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e5e7eb", display: "block", cursor: "zoom-in" }}
                                />
                                <span style={{ position: "absolute", bottom: "6px", right: "6px", fontSize: "11px", fontWeight: 700, color: "#fff", background: "rgba(0,0,0,0.6)", borderRadius: "4px", padding: "2px 7px" }}>
                                  Cara {p.pagePart}
                                </span>
                              </div>
                            ))}
                        </div>
                      )}

                      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                        {photoGroups.length > 0 && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                            {photoGroups.map((g) => {
                              const chosen = selectedPhoto[t.templateId]?.[g.roleKey] ?? g.ids[0];
                              return (
                                <div key={g.roleKey}>
                                  <div style={{ fontSize: "9px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", marginBottom: "3px" }}>{g.label}</div>
                                  <div style={{ display: "flex", gap: "4px" }}>
                                    {g.ids.map((assetId) => {
                                      const url = assetUrls[assetId];
                                      const isChosen = assetId === chosen;
                                      const isReplacing = uploadingAssetId === assetId;
                                      return (
                                        <div key={assetId} style={{ position: "relative", width: "38px", height: "38px", flexShrink: 0 }}>
                                          <button type="button"
                                            onClick={() => setSelectedPhoto((prev) => ({ ...prev, [t.templateId]: { ...prev[t.templateId], [g.roleKey]: assetId } }))}
                                            style={{ padding: 0, border: isChosen ? "2px solid #7c3aed" : "2px solid transparent", borderRadius: "6px", cursor: "pointer", background: "none", width: "38px", height: "38px", overflow: "hidden", display: "block" }}
                                            title={`Usar esta foto para ${g.label}`}>
                                            {url ? <img src={url} alt={g.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : <div style={{ width: "100%", height: "100%", background: "#e5e7eb" }} />}
                                          </button>
                                          <label
                                            style={{ position: "absolute", bottom: "-4px", right: "-4px", width: "16px", height: "16px", borderRadius: "50%", background: "#111", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", cursor: isReplacing ? "wait" : "pointer", border: "1.5px solid #fff" }}
                                            title="Reemplazar esta foto puntual por una nueva (ej. si el cliente mandó una de mala calidad)">
                                            {isReplacing ? "…" : "↻"}
                                            <input type="file" accept="image/*" style={{ display: "none" }} disabled={isReplacing}
                                              onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) handleReplaceCharacterPhoto(t.templateId, g.roleKey, assetId, file);
                                                e.target.value = "";
                                              }} />
                                          </label>
                                        </div>
                                      );
                                    })}
                                    <label
                                      style={{ width: "38px", height: "38px", borderRadius: "6px", border: "2px dashed #d1d5db", display: "flex", alignItems: "center", justifyContent: "center", cursor: uploadingAssetId === g.roleKey ? "wait" : "pointer", fontSize: "16px", fontWeight: 700, color: "#9ca3af", flexShrink: 0 }}
                                      title="Agregar una foto nueva como opción extra para este rol">
                                      {uploadingAssetId === g.roleKey ? "…" : "+"}
                                      <input type="file" accept="image/*" style={{ display: "none" }} disabled={uploadingAssetId === g.roleKey}
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) handleReplaceCharacterPhoto(t.templateId, g.roleKey, undefined, file);
                                          e.target.value = "";
                                        }} />
                                    </label>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {uploadPhotoError[t.templateId] && (
                          <div style={{ fontSize: "11px", color: "#dc2626" }}>{uploadPhotoError[t.templateId]}</div>
                        )}

                        <div>
                          <button
                            disabled={isGenerating}
                            onClick={() => handleGenerateTemplate(t.templateId)}
                            style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: isVerifying ? "#f59e0b" : isGenerating ? "#c4b5fd" : "#7c3aed", color: "#fff", fontSize: "12px", fontWeight: 700, cursor: isGenerating ? "wait" : "pointer", fontFamily: "inherit" }}>
                            {isVerifying
                              ? "Se cortó la conexión — verificando si terminó igual…"
                              : isGenerating
                              ? "Generando… (puede tardar 1-2 min, no cierres la página)"
                              : previewPages.length > 0
                              ? "Regenerar con IA"
                              : "Generar con IA"}
                          </button>
                          {isVerifying && (
                            <div style={{ marginTop: "6px", fontSize: "11px", color: "#92400e" }}>
                              El servidor puede haber terminado igual — no vuelvas a apretar el botón, esto se resuelve solo en un momento.
                            </div>
                          )}
                          {generateError[t.templateId] && (
                            <div style={{ marginTop: "6px", fontSize: "11px", color: "#dc2626" }}>{generateError[t.templateId]}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>

              {printAssets.some((a) => a.status === "PENDING_REVIEW") && (
                <button
                  disabled={confirmingAll}
                  onClick={handleConfirmAll}
                  style={{ marginTop: "4px", padding: "12px 16px", borderRadius: "10px", border: "none", background: confirmingAll ? "#a7f3d0" : "#059669", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: confirmingAll ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
                  {confirmingAll
                    ? "Confirmando…"
                    : `✓ Confirmar y cargar al PDF (${printAssets.filter((a) => a.status === "PENDING_REVIEW").length} imágenes)`}
                </button>
              )}
            </div>
          )}

          <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {/* Slots: Portada → [degradado + dedicatoria, automáticos] → Plantillas (A+B) → [degradado, automático] → Add-on (opcional) → Contraportada.
                Las filas "auto" son solo informativas (ver "Diseño del libro" para editarlas) — no tienen upload/delete. */}
            {[
              { key: "COVER",               label: "Portada",                       assetType: "COVER",               templateId: null, slotIndex: null, pagePart: "ONLY", optional: false, auto: false },
              { key: "AUTO_GRADIENT_PRE",   label: "Página de degradado",           assetType: "AUTO_GRADIENT",       templateId: null, slotIndex: null, pagePart: "ONLY", optional: true,  auto: true },
              { key: "AUTO_DEDICATION",     label: "Dedicatoria",                   assetType: "AUTO_DEDICATION",     templateId: null, slotIndex: null, pagePart: "ONLY", optional: true,  auto: true },
              ...(data.templateSelections ?? []).flatMap((t) => [
                { key: `TEMPLATE_${t.templateId}_A`, label: `${t.templateName ?? `Plantilla #${t.templateId}`} — Cara A`, assetType: "TEMPLATE", templateId: t.templateId, slotIndex: t.slotIndex, pagePart: "A", optional: false, auto: false },
                { key: `TEMPLATE_${t.templateId}_B`, label: `${t.templateName ?? `Plantilla #${t.templateId}`} — Cara B`, assetType: "TEMPLATE", templateId: t.templateId, slotIndex: t.slotIndex, pagePart: "B", optional: false, auto: false },
              ]),
              { key: "AUTO_GRADIENT_POST",  label: "Página de degradado",           assetType: "AUTO_GRADIENT",       templateId: null, slotIndex: null, pagePart: "ONLY", optional: true,  auto: true },
              { key: "ADDON",              label: "Add-on",                         assetType: "ADDON",               templateId: null, slotIndex: null, pagePart: "ONLY", optional: true,  auto: false },
              { key: "BACK_COVER",         label: "Contraportada",                 assetType: "BACK_COVER",           templateId: null, slotIndex: null, pagePart: "ONLY", optional: false, auto: false },
            ].map((slot) => {
              if (slot.auto) {
                const isGradient = slot.assetType === "AUTO_GRADIENT";
                const gradientSwatch = `linear-gradient(135deg, ${gradientStartDraft}, ${gradientEndDraft})`;
                return (
                  <div key={slot.key} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "8px", background: "#f5f3ff", border: "1px solid #ddd6fe" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "6px", overflow: "hidden", flexShrink: 0, background: gradientSwatch }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>{slot.label}</div>
                      <div style={{ fontSize: "11px", color: "#6b7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {isGradient
                          ? "Se genera sola con los colores elegidos abajo"
                          : dedicationDraft
                          ? `"${dedicationDraft.length > 70 ? dedicationDraft.slice(0, 70) + "…" : dedicationDraft}"`
                          : "Sin texto todavía — completalo en “Diseño del libro”"}
                      </div>
                    </div>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "#7c3aed", background: "#ede9fe", borderRadius: "999px", padding: "3px 10px", flexShrink: 0 }}>
                      Automático
                    </span>
                  </div>
                );
              }

              const assetType = slot.assetType;
              const matchesSlot = (a: PrintAsset) =>
                a.assetType === assetType &&
                (assetType !== "TEMPLATE" || (a.templateId === slot.templateId && a.pagePart === slot.pagePart));
              const uploaded = printAssets.find((a) => matchesSlot(a) && a.status === "CONFIRMED");
              const pendingReview = printAssets.find((a) => matchesSlot(a) && a.status === "PENDING_REVIEW");
              const isUploading = uploadingSlot === slot.key;
              const isDeleting = deletingSlot === slot.key;
              const isConfirming = confirmingSlot === slot.key;
              const busy = isUploading || isDeleting;

              const previewAsset = uploaded ?? pendingReview;
              return (
                <div key={slot.key} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "8px", background: uploaded ? "#f0fdf4" : pendingReview ? "#fffbeb" : "#f9fafb", border: `1px solid ${uploaded ? "#bbf7d0" : pendingReview ? "#fde68a" : "#e5e7eb"}` }}>
                  {/* Preview o placeholder — se muestra tanto en PENDING_REVIEW como en
                      CONFIRMED (antes solo mostraba confirmado, dejando al admin sin forma
                      de ver la tapa/contratapa recién generada por IA antes de confirmarla). */}
                  <div style={{ width: "44px", height: "44px", borderRadius: "6px", overflow: "hidden", flexShrink: 0, background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {previewAsset
                      ? <img src={previewAsset.previewUrl} alt="" onClick={() => setZoomedImage(previewAsset.previewUrl)} style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "zoom-in" }} />
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    }
                  </div>

                  {/* Nombre + dimensiones */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{slot.label}</div>
                      {slot.optional && <span style={{ fontSize: "10px", fontWeight: 700, color: "#6b7280", background: "#f3f4f6", borderRadius: "4px", padding: "1px 6px", flexShrink: 0 }}>Opcional</span>}
                    </div>
                    {uploaded
                      ? <div style={{ fontSize: "11px", color: "#6b7280" }}>{uploaded.originalFilename ?? "Archivo subido"}</div>
                      : pendingReview
                      ? <div style={{ fontSize: "11px", color: "#92400e" }}>Generada con IA, esperando confirmación arriba ⬆ (click en la miniatura para verla grande)</div>
                      : <div style={{ fontSize: "11px", color: "#9ca3af" }}>{slot.optional ? "Auto-blanco si no se sube" : "Sin archivo"} · <span style={{ color: "#d97706" }}>3425 × 2421 px · 29 × 20.5 cm</span></div>
                    }
                  </div>

                  {/* Badge ok */}
                  {uploaded && !busy && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                  )}

                  {/* Botón eliminar / confirmación inline */}
                  {uploaded && (
                    isConfirming ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                        <span style={{ fontSize: "11px", fontWeight: 600, color: "#ef4444" }}>¿Quitar?</span>
                        <button
                          disabled={isDeleting}
                          onClick={async () => {
                            setDeletingSlot(slot.key);
                            setConfirmingSlot(null);
                            try {
                              const res = await fetch(`${API}/api/admin/orders/${data.id}/print-assets/${uploaded.id}`, { method: "DELETE" });
                              if (!res.ok) throw new Error();
                              loadPrintAssets(data.id);
                            } catch { alert("Error al eliminar el archivo"); }
                            finally { setDeletingSlot(null); }
                          }}
                          style={{ padding: "4px 10px", borderRadius: "6px", border: "none", background: "#ef4444", color: "#fff", fontSize: "11px", fontWeight: 700, cursor: isDeleting ? "not-allowed" : "pointer", fontFamily: "inherit" }}
                        >
                          {isDeleting ? "..." : "Sí"}
                        </button>
                        <button
                          onClick={() => setConfirmingSlot(null)}
                          style={{ padding: "4px 10px", borderRadius: "6px", border: "1px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        disabled={busy}
                        onClick={() => setConfirmingSlot(slot.key)}
                        style={{ flexShrink: 0, width: "30px", height: "30px", borderRadius: "7px", border: "1px solid #fecaca", background: isDeleting ? "#fef2f2" : "#fff", color: "#ef4444", cursor: busy ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
                        title="Quitar archivo"
                      >
                        {isDeleting
                          ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                          : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                        }
                      </button>
                    )
                  )}

                  {/* Generar con IA para Portada/Contraportada vive en la sección de
                      arriba ("Tapa y Contraportada"), con selector de fotos — acá
                      solo queda upload manual / eliminar, mismo trato que Plantillas. */}

                  {/* Upload button */}
                  <label style={{ flexShrink: 0, cursor: busy ? "not-allowed" : "pointer" }}>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      style={{ display: "none" }}
                      disabled={busy}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploadingSlot(slot.key);
                        try {
                          const fd = new FormData();
                          fd.append("file", file);
                          fd.append("assetType", assetType);
                          fd.append("pagePart", slot.pagePart);
                          if (slot.templateId !== null) fd.append("templateId", String(slot.templateId));
                          if (slot.slotIndex !== null) fd.append("slotIndex", String(slot.slotIndex));
                          const res = await fetch(`${API}/api/admin/orders/${data.id}/print-assets`, { method: "POST", body: fd });
                          if (!res.ok) throw new Error();
                          loadPrintAssets(data.id);
                        } catch { alert("Error al subir el archivo"); }
                        finally { setUploadingSlot(null); e.target.value = ""; }
                      }}
                    />
                    <span style={{ padding: "6px 14px", borderRadius: "7px", border: "1px solid #e5e7eb", background: busy ? "#f3f4f6" : "#fff", color: busy ? "#9ca3af" : "#374151", fontSize: "12px", fontWeight: 600, display: "inline-block" }}>
                      {isUploading ? "Subiendo..." : uploaded ? "Reemplazar" : "Subir"}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>

          {/* PDF generado */}
          <div style={{ padding: "0 24px 20px" }}>
            {cbPdfSuccess && (
              <div style={{ marginBottom: "12px", padding: "10px 14px", borderRadius: "8px", background: "#f0fdf4", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#15803d" }}>PDF generado con éxito</span>
              </div>
            )}
            {cbPdfUrl ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#111", marginBottom: "2px" }}>PDF generado y listo</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    {cbPdfGeneratedAt
                      ? `Generado el ${new Date(cbPdfGeneratedAt).toLocaleString("es-PE", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}`
                      : "20.5 × 29 cm"}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    disabled={cbPdfGenerating}
                    onClick={async () => {
                      setCbPdfGenerating(true);
                      try {
                        const startedAt = Date.now();
                        await fetch(`${API}/api/admin/orders/${data.id}/render`, { method: "POST" });
                        let found = false;
                        for (let attempt = 0; attempt < 25; attempt++) {
                          await new Promise((r) => setTimeout(r, 2000));
                          const res = await fetch(`${API}/api/admin/orders/${data.id}/render`);
                          if (!res.ok) continue;
                          const r = await res.json();
                          if (new Date(r.generatedAt).getTime() > startedAt) {
                            setCbPdfUrl(r.pdfUrl + `?v=${Date.now()}`);
                            setCbPdfGeneratedAt(r.generatedAt);
                            setCbPdfSuccess(true);
                            setTimeout(() => setCbPdfSuccess(false), 4000);
                            found = true;
                            break;
                          }
                        }
                        if (!found) alert("El PDF está tardando demasiado. Recargá la página en un momento.");
                      } catch { alert("Error al generar el PDF"); }
                      finally { setCbPdfGenerating(false); }
                    }}
                    style={{ padding: "10px 18px", borderRadius: "9px", border: "1px solid #e5e7eb", background: "#fff", color: cbPdfGenerating ? "#9ca3af" : "#374151", fontSize: "13px", fontWeight: 600, cursor: cbPdfGenerating ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
                    {cbPdfGenerating ? "Generando..." : "Regenerar PDF"}
                  </button>
                  <button
                    onClick={() => forceDownload(cbPdfUrl, `libro_orden_${data.id}.pdf`)}
                    style={{ padding: "10px 22px", borderRadius: "9px", border: "none", background: "#2563eb", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 12px rgba(37,99,235,0.25)" }}>
                    Descargar PDF
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>
                  {printAssets.filter((a) => a.status === "CONFIRMED" && a.assetType !== "ADDON").length < 2 + (data.templateSelections?.length ?? 0) * 2
                    ? "Sube todos los archivos para habilitar la generación del PDF."
                    : "Todos los archivos están listos. Podés generar el PDF."}
                </div>
                <button
                  disabled={cbPdfGenerating || printAssets.filter((a) => a.status === "CONFIRMED" && a.assetType !== "ADDON").length < 2 + (data.templateSelections?.length ?? 0) * 2}
                  onClick={async () => {
                    setCbPdfGenerating(true);
                    try {
                      const startedAt = Date.now();
                      await fetch(`${API}/api/admin/orders/${data.id}/render`, { method: "POST" });
                      let found = false;
                      for (let attempt = 0; attempt < 25; attempt++) {
                        await new Promise((r) => setTimeout(r, 2000));
                        const res = await fetch(`${API}/api/admin/orders/${data.id}/render`);
                        if (!res.ok) continue;
                        const r = await res.json();
                        if (new Date(r.generatedAt).getTime() > startedAt) {
                          setCbPdfUrl(r.pdfUrl + `?v=${Date.now()}`);
                          setCbPdfGeneratedAt(r.generatedAt);
                          setCbPdfSuccess(true);
                          setTimeout(() => setCbPdfSuccess(false), 4000);
                          found = true;
                          break;
                        }
                      }
                      if (!found) alert("El PDF está tardando demasiado. Recargá la página en un momento.");
                    } catch { alert("Error al generar el PDF"); }
                    finally { setCbPdfGenerating(false); }
                  }}
                  style={{ flexShrink: 0, padding: "12px 24px", borderRadius: "10px", border: "none", background: cbPdfGenerating || printAssets.filter((a) => a.status === "CONFIRMED" && a.assetType !== "ADDON").length < 2 + (data.templateSelections?.length ?? 0) * 2 ? "#e5e7eb" : "#2563eb", color: cbPdfGenerating || printAssets.filter((a) => a.status === "CONFIRMED" && a.assetType !== "ADDON").length < 2 + (data.templateSelections?.length ?? 0) * 2 ? "#9ca3af" : "#fff", fontSize: "13px", fontWeight: 700, cursor: cbPdfGenerating || printAssets.filter((a) => a.status === "CONFIRMED" && a.assetType !== "ADDON").length < 2 + (data.templateSelections?.length ?? 0) * 2 ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
                  {cbPdfGenerating ? "Generando..." : "Generar PDF"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 8. Feedback ── */}
      {["PAYMENT_VERIFIED", "IN_PRODUCTION", "SHIPPED", "DELIVERED"].includes(data.status) && (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>Feedback del cliente</span>
            {feedbackLink && (
              <span style={{ fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px", background: "#d1fae5", color: "#065f46" }}>
                Listo para enviar
              </span>
            )}
          </div>
          <div style={{ padding: "20px 24px" }}>
            {feedbackLink ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>
                  Compartí este link con el cliente cuando hayas entregado su pedido.
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <code style={{ flex: 1, fontSize: "12px", background: "#f3f4f6", color: "#374151", padding: "8px 12px", borderRadius: "8px", wordBreak: "break-all" }}>{feedbackLink}</code>
                  <button onClick={() => navigator.clipboard.writeText(feedbackLink)}
                    style={{ flexShrink: 0, padding: "8px 16px", borderRadius: "8px", border: "1px solid #8b5cf6", background: "#fff", color: "#7c3aed", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                    Copiar
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>Genera el link para que el cliente deje su reseña al recibir su pedido.</div>
                <button
                  disabled={acting}
                  onClick={async () => {
                    setActing(true);
                    try {
                      const res = await fetch(`${API}/api/admin/feedback/generate/${id}`, { method: "POST" });
                      if (!res.ok) throw new Error();
                      const result = await res.json();
                      setFeedbackLink(result.url);
                    } catch { alert("Error al generar link"); }
                    finally { setActing(false); }
                  }}
                  style={{ flexShrink: 0, padding: "12px 24px", borderRadius: "10px", border: "none", background: "#8b5cf6", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 12px rgba(139,92,246,0.25)" }}>
                  Generar link
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Lightbox: ver imagen completa ── */}
      {zoomedImage && (
        <div onClick={() => setZoomedImage(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", cursor: "zoom-out", padding: "40px" }}>
          <img src={zoomedImage} alt="Vista completa" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "8px", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }} />
          <button onClick={() => setZoomedImage(null)}
            style={{ position: "absolute", top: "20px", right: "20px", width: "40px", height: "40px", borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.15)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}
