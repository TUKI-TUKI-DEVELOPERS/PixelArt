"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Download, ImagePlus, LoaderCircle, LockKeyhole, RefreshCw, Send, Sparkles, Trash2, X, ZoomIn } from "lucide-react";
import { ConfirmModal } from "@/components/ui/Modal";
import styles from "./CustomPhotobookAiProposalPanel.module.css";

type Surface = "FRONT_COVER" | "BACK_COVER";

type Design = {
  id: number;
  surface: Surface;
  sourceDesignId: number | null;
  isSelected: boolean;
  provider: string;
  createdAt: string;
  asset: { id: number; url: string; width?: number | null; height?: number | null };
};

type ReferenceAsset = {
  assetId: number;
  isActive: boolean;
  originalFilename: string | null;
  surface: Surface | null;
  slotIndex: number | null;
  url: string;
  createdAt: string;
};

type ManualArtworkFeedback = {
  status: "checking" | "success" | "error";
  message: string;
};

type WorkflowStep = "references" | "front" | "back" | "review";

type Props = {
  requestId: number;
  coverMode: string;
};

const MIN_ACTIVE_REFERENCES = 1;
const MAX_REFERENCES = 5;
const FIXED_REFERENCE_SLOTS_PER_SURFACE = 2;
const MIN_MANUAL_ARTWORK_PX = 2500;
const WORKFLOW_STEPS: { key: WorkflowStep; label: string; detail: string }[] = [
  { key: "references", label: "Referencias", detail: "Fotos para orientar el diseño" },
  { key: "front", label: "Tapa frontal", detail: "Sube o genera la tapa" },
  { key: "back", label: "Contratapa", detail: "Sube o genera la contratapa" },
  { key: "review", label: "Revisión y envío", detail: "Confirma y envía al cliente" }
];

export function CustomPhotobookAiProposalPanel({ requestId, coverMode }: Props) {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [references, setReferences] = useState<ReferenceAsset[]>([]);
  const [creativeDirection, setCreativeDirection] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState<WorkflowStep>("references");
  const [working, setWorking] = useState<string | null>(null);
  const [backCreativeDirection, setBackCreativeDirection] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [manualArtworkFeedback, setManualArtworkFeedback] = useState<Partial<Record<Surface, ManualArtworkFeedback>>>({});
  const [referenceArtworkFeedback, setReferenceArtworkFeedback] = useState<Partial<Record<number, ManualArtworkFeedback>>>({});
  const [previewAssetId, setPreviewAssetId] = useState<number | null>(null);
  const [previewDesign, setPreviewDesign] = useState<Design | null>(null);
  const [pendingDeletion, setPendingDeletion] = useState<Design | null>(null);
  const addPhotoInputRef = useRef<HTMLInputElement>(null);
  const previewDialogRef = useRef<HTMLDialogElement>(null);
  const proposalPreviewDialogRef = useRef<HTMLDialogElement>(null);
  const replacePhotoInputRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const manualArtworkInputRefs = useRef<Record<Surface, HTMLInputElement | null>>({ FRONT_COVER: null, BACK_COVER: null });

  const isCustomerArtwork = coverMode === "CUSTOMER_ARTWORK";
  const activeReferences = useMemo(() => references.filter((reference) => reference.isActive), [references]);
  const hasFixedReferenceSlots = references.some((reference) => Boolean(reference.surface));
  const frontReferences = useMemo(() => references.filter((reference) => reference.surface === "FRONT_COVER"), [references]);
  const backReferences = useMemo(() => references.filter((reference) => reference.surface === "BACK_COVER"), [references]);
  const activeFrontReferences = useMemo(() => frontReferences.filter((reference) => reference.isActive), [frontReferences]);
  const activeBackReferences = useMemo(() => backReferences.filter((reference) => reference.isActive), [backReferences]);
  const frontDesigns = useMemo(() => designs.filter((design) => design.surface === "FRONT_COVER"), [designs]);
  const backDesigns = useMemo(() => designs.filter((design) => design.surface === "BACK_COVER"), [designs]);
  const frontManualDesign = frontDesigns.find((design) => design.provider === "manual") ?? null;
  const backManualDesign = backDesigns.find((design) => design.provider === "manual") ?? null;
  const frontAiDesigns = frontDesigns.filter((design) => design.provider !== "manual");
  const backAiDesigns = backDesigns.filter((design) => design.provider !== "manual");
  const selectedFront = frontDesigns.find((design) => design.isSelected) ?? null;
  const selectedBack = backDesigns.find((design) => design.isSelected) ?? null;
  const hasValidReferenceSet = hasFixedReferenceSlots
    ? activeFrontReferences.length >= MIN_ACTIVE_REFERENCES && activeFrontReferences.length <= FIXED_REFERENCE_SLOTS_PER_SURFACE
    : activeReferences.length >= MIN_ACTIVE_REFERENCES && activeReferences.length <= MAX_REFERENCES;
  const hasValidBackReferenceSet = hasFixedReferenceSlots
    ? activeBackReferences.length >= MIN_ACTIVE_REFERENCES && activeBackReferences.length <= FIXED_REFERENCE_SLOTS_PER_SURFACE
    : activeReferences.length >= MIN_ACTIVE_REFERENCES && activeReferences.length <= MAX_REFERENCES;
  const frontReferenceContext = hasFixedReferenceSlots ? activeFrontReferences : activeReferences;
  const backReferenceContext = hasFixedReferenceSlots ? activeBackReferences : activeReferences;
  const canGenerateFront = hasValidReferenceSet && Boolean(creativeDirection.trim());
  const canSendApproval = Boolean(selectedFront && selectedBack);
  const referencesStillNeeded = Math.max(0, MIN_ACTIVE_REFERENCES - (hasFixedReferenceSlots ? activeFrontReferences.length : activeReferences.length));
  const canActivateAll = references.some((reference) => !reference.isActive) && working === null;
  const previewIndex = references.findIndex((reference) => reference.assetId === previewAssetId);
  const previewReference = previewIndex >= 0 ? references[previewIndex] : null;

  async function refreshWorkspace() {
    const [designResponse, referenceResponse] = await Promise.all([
      fetch(`/admin-api/photobook/custom-requests/${requestId}/designs`),
      fetch(`/admin-api/photobook/custom-requests/${requestId}/references`),
    ]);
    const [designData, referenceData] = await Promise.all([
      designResponse.json().catch(() => ({})),
      referenceResponse.json().catch(() => ({})),
    ]);
    if (!designResponse.ok) throw new Error(designData.message ?? "No pudimos cargar las propuestas generadas.");
    if (!referenceResponse.ok) throw new Error(referenceData.message ?? "No pudimos cargar las fotos de trabajo.");
    setDesigns(Array.isArray(designData) ? designData : []);
    setReferences(Array.isArray(referenceData) ? referenceData : []);
  }

  useEffect(() => {
    void (async () => {
      try {
        await refreshWorkspace();
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "No pudimos cargar el espacio de trabajo.");
      } finally {
        setLoading(false);
      }
    })();
  }, [requestId]);

  useEffect(() => {
    const dialog = previewDialogRef.current;
    if (!dialog) return;

    if (previewReference && !dialog.open) {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    }
    if (!previewReference && dialog.open) {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
    }
  }, [previewReference]);

  useEffect(() => {
    const dialog = proposalPreviewDialogRef.current;
    if (!dialog) return;

    if (previewDesign && !dialog.open) {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    }
    if (!previewDesign && dialog.open) {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
    }
  }, [previewDesign]);

  function begin(work: string) {
    setWorking(work);
    setError(null);
    setNotice(null);
  }

  async function uploadReference(file: File, oldAssetId?: number) {
    begin(oldAssetId ? `REPLACE-${oldAssetId}` : "ADD_REFERENCE");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const url = oldAssetId
        ? `/admin-api/photobook/custom-requests/${requestId}/references/${oldAssetId}/replace`
        : `/admin-api/photobook/custom-requests/${requestId}/references`;
      const response = await fetch(url, { method: "POST", body: formData });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message ?? "No pudimos guardar esta foto.");
      await refreshWorkspace();
      setNotice(oldAssetId ? "Foto reemplazada. Revisa las referencias seleccionadas antes de generar." : "Foto agregada y seleccionada para la IA.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "No pudimos guardar esta foto.");
    } finally {
      setWorking(null);
    }
  }

  async function uploadManualArtwork(event: ChangeEvent<HTMLInputElement>, surface: Surface) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const surfaceLabel = surface === "FRONT_COVER" ? "la tapa frontal" : "la contratapa";
    const surfaceAction = surface === "FRONT_COVER" ? "Usar como tapa frontal" : "Usar como contratapa";
    begin(`UPLOAD_${surface}`);
    setManualArtworkFeedback((current) => ({
      ...current,
      [surface]: { status: "checking", message: "Comprobando formato y dimensiones del archivo…" },
    }));
    try {
      let dimensions: { width: number; height: number } | null = null;
      if (typeof createImageBitmap === "function") {
        const bitmap = await createImageBitmap(file);
        dimensions = { width: bitmap.width, height: bitmap.height };
        bitmap.close();
        if (dimensions.width !== dimensions.height || dimensions.width < MIN_MANUAL_ARTWORK_PX) {
          throw new Error(
            `La imagen para ${surfaceLabel} debe ser cuadrada y medir al menos ${MIN_MANUAL_ARTWORK_PX} × ${MIN_MANUAL_ARTWORK_PX} px. El archivo recibido mide ${dimensions.width} × ${dimensions.height} px.`,
          );
        }
      }

      const formData = new FormData();
      formData.append("surface", surface);
      formData.append("file", file);
      const response = await fetch(`/admin-api/photobook/custom-requests/${requestId}/designs/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message ?? "No pudimos validar el diseño propio.");
      await refreshWorkspace();
      const confirmedDimensions = data.dimensions ?? dimensions;
      const dimensionMessage = confirmedDimensions
        ? `Dimensiones correctas: ${confirmedDimensions.width} × ${confirmedDimensions.height} px.`
        : "Diseño validado.";
      setManualArtworkFeedback((current) => ({
        ...current,
        [surface]: { status: "success", message: `${dimensionMessage} Pulsa «${surfaceAction}» para elegirlo para la aprobación.` },
      }));
    } catch (uploadError) {
      setManualArtworkFeedback((current) => ({
        ...current,
        [surface]: {
          status: "error",
          message: uploadError instanceof Error ? uploadError.message : "No pudimos validar el diseño propio.",
        },
      }));
    } finally {
      setWorking(null);
    }
  }

  async function applyReferenceAsCover(reference: ReferenceAsset, surface: Surface) {
    const surfaceLabel = surface === "FRONT_COVER" ? "tapa frontal" : "contratapa";
    begin(`USE_REFERENCE_${surface}`);
    setReferenceArtworkFeedback((current) => ({
      ...current,
      [reference.assetId]: { status: "checking", message: "Comprobando formato y dimensiones del archivo…" },
    }));
    try {
      const response = await fetch(`/admin-api/photobook/custom-requests/${requestId}/references/${reference.assetId}/use-as-cover`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surface }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message ?? "No pudimos validar la foto del cliente.");
      await refreshWorkspace();
      const dimensions = data.dimensions ?? { width: 0, height: 0 };
      setManualArtworkFeedback((current) => ({
        ...current,
        [surface]: {
          status: "success",
          message: `Foto del cliente validada (${dimensions.width} × ${dimensions.height} px) y elegida como ${surfaceLabel}.`,
        },
      }));
      setActiveStep(surface === "FRONT_COVER" ? "front" : "back");
    } catch (applyError) {
      setReferenceArtworkFeedback((current) => ({
        ...current,
        [reference.assetId]: {
          status: "error",
          message: applyError instanceof Error ? applyError.message : "No pudimos validar la foto del cliente.",
        },
      }));
    } finally {
      setWorking(null);
    }
  }

  async function setReferenceActive(reference: ReferenceAsset, isActive: boolean) {
    begin(`ACTIVE-${reference.assetId}`);
    try {
      const response = await fetch(`/admin-api/photobook/custom-requests/${requestId}/references/${reference.assetId}/active`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message ?? "No pudimos actualizar esta referencia.");
      await refreshWorkspace();
    } catch (activeError) {
      setError(activeError instanceof Error ? activeError.message : "No pudimos actualizar esta referencia.");
    } finally {
      setWorking(null);
    }
  }

  async function activateAllReferences() {
    const inactiveReferences = references.filter((reference) => !reference.isActive);
    if (inactiveReferences.length === 0) return;

    begin("ACTIVATE_ALL");
    try {
      for (const reference of inactiveReferences) {
        const response = await fetch(`/admin-api/photobook/custom-requests/${requestId}/references/${reference.assetId}/active`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: true }),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.message ?? "No pudimos seleccionar todas las referencias.");
      }
      await refreshWorkspace();
      setNotice("Todas las fotos disponibles quedaron seleccionadas para la IA.");
    } catch (activationError) {
      setError(activationError instanceof Error ? activationError.message : "No pudimos seleccionar todas las referencias.");
    } finally {
      setWorking(null);
    }
  }

  async function generate(surface: Surface) {
    if (surface === "FRONT_COVER" && !canGenerateFront) return;
    if (surface === "BACK_COVER" && (!selectedFront || !hasValidBackReferenceSet || selectedBack)) return;
    begin(surface);
    try {
      const direction = surface === "FRONT_COVER" ? creativeDirection : backCreativeDirection;
      const response = await fetch(`/admin-api/photobook/custom-requests/${requestId}/designs/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surface, creativeDirection: direction.trim() || undefined }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message ?? "No pudimos generar la propuesta.");
      setDesigns((current) => [data as Design, ...current]);
      setNotice(surface === "FRONT_COVER" ? "La propuesta de tapa frontal está lista para revisar." : "La propuesta de contratapa está lista para revisar.");
    } catch (generationError) {
      setError(generationError instanceof Error ? generationError.message : "No pudimos generar la propuesta.");
    } finally {
      setWorking(null);
    }
  }

  function requestDeleteCover(design: Design) {
    setPendingDeletion(design);
  }

  async function deleteCover(design: Design) {
    begin(`DELETE-${design.id}`);
    try {
      const response = await fetch(`/admin-api/photobook/custom-requests/${requestId}/designs/${design.id}`, { method: "DELETE" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message ?? "No pudimos borrar la propuesta.");
      setDesigns((current) => current.filter((item) => item.id !== design.id));
      setNotice("El diseño se borró. Puedes subir otro arte final o generar una propuesta nueva.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "No pudimos borrar la propuesta.");
    } finally {
      setWorking(null);
      setPendingDeletion(null);
    }
  }

  async function selectCover(design: Design) {
    begin("SELECT");
    try {
      const response = await fetch(`/admin-api/photobook/custom-requests/${requestId}/designs/${design.id}/select`, { method: "POST" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message ?? "No pudimos seleccionar esta propuesta.");
      setDesigns((current) => current.map((item) => ({
        ...item,
        isSelected: item.surface === design.surface ? item.id === design.id : item.isSelected,
      })));
    } catch (selectionError) {
      setError(selectionError instanceof Error ? selectionError.message : "No pudimos seleccionar esta propuesta.");
    } finally {
      setWorking(null);
    }
  }

  async function sendApproval() {
    begin("SEND_APPROVAL");
    try {
      const response = await fetch(`/admin-api/photobook/custom-requests/${requestId}/cover-approval/send`, { method: "POST" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message ?? "No pudimos enviar la aprobación al cliente.");
      setNotice(`Enlace de aprobación enviado. Vence el ${new Date(data.publicLink.expiresAt).toLocaleDateString("es-PE")}.`);
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "No pudimos enviar la aprobación al cliente.");
    } finally {
      setWorking(null);
    }
  }

  function onFileChange(event: ChangeEvent<HTMLInputElement>, oldAssetId?: number) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) void uploadReference(file, oldAssetId);
  }

  function closePreview() {
    const dialog = previewDialogRef.current;
    if (dialog?.open && typeof dialog.close === "function") {
      dialog.close();
      return;
    }
    setPreviewAssetId(null);
  }

  function movePreview(offset: number) {
    if (references.length < 2 || previewIndex < 0) return;
    const nextIndex = (previewIndex + offset + references.length) % references.length;
    setPreviewAssetId(references[nextIndex].assetId);
  }

  function closeProposalPreview() {
    const dialog = proposalPreviewDialogRef.current;
    if (dialog?.open && typeof dialog.close === "function") {
      dialog.close();
      return;
    }
    setPreviewDesign(null);
  }

  const frontStatus = selectedFront
    ? "La tapa frontal está seleccionada y lista para incluirse en la aprobación."
    : !hasValidReferenceSet
      ? `Faltan ${referencesStillNeeded} foto${referencesStillNeeded === 1 ? "" : "s"} para generar con IA; también puedes subir un diseño propio.`
      : !creativeDirection.trim()
        ? "Añade una dirección creativa para generar con IA, o usa un diseño propio."
        : "Todo listo para generar la tapa frontal.";
  const stepCompletion: Record<WorkflowStep, boolean> = {
    references: activeReferences.length > 0,
    front: Boolean(selectedFront),
    back: Boolean(selectedBack),
    review: canSendApproval,
  };
  const activeStepIndex = WORKFLOW_STEPS.findIndex((step) => step.key === activeStep);
  const activeStepInfo = WORKFLOW_STEPS[activeStepIndex];

  return (
    <section aria-labelledby="ai-proposal-title" className={styles.workspace}>
      <header className={styles.workspaceHeader}>
        <div>
          <p className={styles.kicker}>{isCustomerArtwork ? "Adaptación de arte propio" : "Preparación de cubierta"}</p>
          <h2 id="ai-proposal-title">Prepara la cubierta para aprobación.</h2>
          <p>Completa cada paso. Si ya tienes los diseños finales, puedes saltar las referencias y la generación con IA.</p>
        </div>
        <span className={styles.providerBadge}>IA opcional</span>
      </header>

      <nav aria-label="Pasos para preparar la cubierta" className={styles.stepper}>
        <div aria-live="polite" className={styles.stepperMeta}>
          <span>Paso {activeStepIndex + 1} de {WORKFLOW_STEPS.length}</span>
          <span>{activeStepInfo.detail}</span>
        </div>
        <ol className={styles.stepperList}>
          {WORKFLOW_STEPS.map((step, index) => {
            const isCurrent = activeStep === step.key;
            const isComplete = stepCompletion[step.key];
            return (
              <li className={`${isComplete ? styles.stepComplete : ""} ${isCurrent ? styles.stepCurrent : ""}`} key={step.key}>
                <button
                  aria-current={isCurrent ? "step" : undefined}
                  aria-label={step.label}
                  onClick={() => setActiveStep(step.key)}
                  type="button"
                >
                  <span aria-hidden="true" className={styles.stepNumber}>{isComplete ? "✓" : index + 1}</span>
                  <span className={styles.stepCopy}><strong>{step.label}</strong><small>{step.detail}</small></span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {activeStep === "references" && (
        <section aria-labelledby="references-stage-title" className={`${styles.stage} ${styles.stepPanel}`}>
          <div className={styles.stageHeader}>
            <div>
              <p className={styles.step}>Paso 1 de 4 · Opcional para arte propio</p>
              <h3 id="references-stage-title">Fotos de referencia</h3>
              <p>Selecciona las fotos que la IA debe considerar. Si ya tienes tapa y contratapa diseñadas, puedes continuar sin fotos.</p>
            </div>
            <div className={styles.referenceSummary}>
              <strong>{hasFixedReferenceSlots ? `${activeFrontReferences.length}/2 · ${activeBackReferences.length}/2 activas` : `${activeReferences.length}/${MAX_REFERENCES} activas`}</strong>
              <span>{hasFixedReferenceSlots ? "tapa · contratapa" : "referencias"}</span>
            </div>
          </div>

          <div className={styles.referenceToolbar}>
            <p>{hasFixedReferenceSlots ? `Tapa: ${activeFrontReferences.length}/2 seleccionada${activeFrontReferences.length === 1 ? "" : "s"} · Contratapa: ${activeBackReferences.length}/2 seleccionada${activeBackReferences.length === 1 ? "" : "s"}.` : hasValidReferenceSet ? `${activeReferences.length} foto${activeReferences.length === 1 ? "" : "s"} se enviará${activeReferences.length === 1 ? "" : "n"} a la IA.` : `Selecciona ${referencesStillNeeded} foto${referencesStillNeeded === 1 ? "" : "s"} para habilitar la generación.`}</p>
            {canActivateAll && (
              <button className={styles.textAction} type="button" disabled={working !== null} onClick={() => void activateAllReferences()}>
                {working === "ACTIVATE_ALL" ? <LoaderCircle aria-hidden="true" className={styles.spinningIcon} size={15} /> : <Check aria-hidden="true" size={15} />}
                Usar todas las disponibles
              </button>
            )}
          </div>

          <div className={styles.referenceGrid}>
            {references.map((reference) => {
              const isBusy = working === `REPLACE-${reference.assetId}` || working === `ACTIVE-${reference.assetId}`;
              return (
                <article key={reference.assetId} className={`${styles.referenceCard} ${reference.isActive ? styles.referenceCardActive : ""}`}>
                  <div className={styles.referenceImageWrap}>
                    <img alt={reference.originalFilename ? `Referencia ${reference.originalFilename}` : `Referencia ${reference.assetId}`} src={reference.url} />
                    <button
                      aria-label={`Ampliar ${reference.originalFilename ?? `referencia ${reference.assetId}`}`}
                      className={styles.previewTrigger}
                      onClick={() => setPreviewAssetId(reference.assetId)}
                      type="button"
                    >
                      <ZoomIn aria-hidden="true" size={17} />
                      Ver completa
                    </button>
                    {isBusy && <span className={styles.imageLoading}><LoaderCircle aria-hidden="true" className={styles.spinningIcon} size={18} /></span>}
                  </div>
                  <div className={styles.referenceCardBody}>
                    {reference.surface && <span className={styles.referenceRole}>{reference.surface === "FRONT_COVER" ? `Tapa · foto ${reference.slotIndex}` : `Contratapa · foto ${reference.slotIndex}`}</span>}
                    <a
                      aria-label={`Descargar original ${reference.originalFilename ?? `referencia ${reference.assetId}`}`}
                      className={styles.referenceDownloadAction}
                      download
                      href={`/admin-api/photobook/custom-requests/${requestId}/references/${reference.assetId}/download`}
                    >
                      <Download aria-hidden="true" size={15} />
                      Descargar original
                    </a>
                    <button
                      aria-pressed={reference.isActive}
                      className={`${styles.selectionToggle} ${reference.isActive ? styles.selectionToggleActive : ""}`}
                      disabled={working !== null}
                      onClick={() => void setReferenceActive(reference, !reference.isActive)}
                      type="button"
                    >
                      <span className={styles.selectionIndicator}>{reference.isActive && <Check aria-hidden="true" size={13} />}</span>
                      {reference.isActive ? "Seleccionada para IA" : "Usar para IA"}
                    </button>
                    {(reference.surface === "FRONT_COVER" || reference.surface === null) && (
                      <button className={styles.textAction} disabled={working !== null} onClick={() => void applyReferenceAsCover(reference, "FRONT_COVER")} type="button">
                        Usar como tapa
                      </button>
                    )}
                    {(reference.surface === "BACK_COVER" || reference.surface === null) && (
                      <>
                        <button className={styles.textAction} disabled={working !== null || !selectedFront} onClick={() => void applyReferenceAsCover(reference, "BACK_COVER")} type="button">
                          Usar como contratapa
                        </button>
                        {!selectedFront && <small className={styles.fieldHelp}>Elige primero la tapa frontal</small>}
                      </>
                    )}
                    {referenceArtworkFeedback[reference.assetId] && <ManualArtworkFeedbackNotice feedback={referenceArtworkFeedback[reference.assetId]!} />}
                    <button className={styles.replaceAction} disabled={working !== null} onClick={() => replacePhotoInputRefs.current[reference.assetId]?.click()} type="button">
                      <RefreshCw aria-hidden="true" size={14} />
                      {isBusy ? "Reemplazando…" : "Reemplazar"}
                    </button>
                    <input
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      aria-label={`Reemplazar ${reference.originalFilename ?? `referencia ${reference.assetId}`}`}
                      className={styles.visuallyHidden}
                      disabled={working !== null}
                      onChange={(event) => onFileChange(event, reference.assetId)}
                      ref={(element) => { replacePhotoInputRefs.current[reference.assetId] = element; }}
                      type="file"
                    />
                  </div>
                </article>
              );
            })}
            {!hasFixedReferenceSlots && Array.from({ length: Math.max(0, MAX_REFERENCES - references.length) }).map((_, index) => (
              <button className={styles.addPhotoCard} disabled={working !== null} key={`empty-${index}`} onClick={() => addPhotoInputRef.current?.click()} type="button">
                {working === "ADD_REFERENCE" ? <LoaderCircle aria-hidden="true" className={styles.spinningIcon} size={22} /> : <ImagePlus aria-hidden="true" size={22} />}
                <strong>{working === "ADD_REFERENCE" ? "Subiendo foto…" : "Agregar foto"}</strong>
                <span>JPG, PNG, WEBP o GIF</span>
              </button>
            ))}
          </div>
          <input
            accept="image/jpeg,image/png,image/webp,image/gif"
            aria-label="Agregar foto"
            className={styles.visuallyHidden}
            disabled={working !== null}
            onChange={onFileChange}
            ref={addPhotoInputRef}
            type="file"
          />
          <div className={styles.stepActions}>
            <p>Las referencias son opcionales si usarás diseños propios.</p>
            <button className={styles.primaryAction} onClick={() => setActiveStep("front")} type="button">
              Continuar a tapa frontal
              <ChevronRight aria-hidden="true" size={16} />
            </button>
          </div>
        </section>
      )}

      {activeStep === "front" && (
        <section aria-labelledby="front-stage-title" className={`${styles.stage} ${styles.stepPanel}`}>
          <div className={styles.stageHeader}>
            <div>
              <p className={styles.step}>Paso 2 de 4 · Tapa frontal</p>
              <h3 id="front-stage-title">Prepara la tapa frontal</h3>
              <p>{frontStatus}</p>
            </div>
            <button className={styles.primaryAction} disabled={working !== null || loading || !canGenerateFront || Boolean(selectedFront)} onClick={() => void generate("FRONT_COVER")} type="button">
              {working === "FRONT_COVER" ? <LoaderCircle aria-hidden="true" className={styles.spinningIcon} size={16} /> : <Sparkles aria-hidden="true" size={16} />}
              {working === "FRONT_COVER" ? "Generando…" : selectedFront ? "Tapa frontal seleccionada" : frontAiDesigns.length ? "Regenerar desde la última" : "Generar tapa frontal"}
            </button>
          </div>
          <ReferenceTray label="Fotos que usará la IA para la tapa" references={frontReferenceContext} onManage={() => setActiveStep("references")} onPreview={setPreviewAssetId} />
          <label className={styles.directionField}>
            <span>{frontAiDesigns.length ? "Cambios para la siguiente iteración" : "Dirección creativa para IA"} <em>opcional</em></span>
            <textarea
              aria-describedby="ai-direction-help"
              disabled={!hasValidReferenceSet || working !== null || Boolean(selectedFront)}
              onChange={(event) => setCreativeDirection(event.target.value)}
              placeholder="Ej.: fotografía principal a la izquierda, luz azul de madrugada, composición limpia y tipografía discreta."
              rows={3}
              value={creativeDirection}
            />
          </label>
          <p className={styles.fieldHelp} id="ai-direction-help">{selectedFront ? "La tapa frontal ya está seleccionada para generar la contratapa y enviar la aprobación. No se puede regenerar sin reiniciar esa selección." : frontAiDesigns.length ? "La siguiente propuesta parte de la última tapa generada. Describe solo los ajustes; conservará sus sujetos y composición salvo que indiques cambiarlos." : "Indica qué fotos deben tener protagonismo, cómo combinarlas y el tono de la cubierta. Los originales no se modifican."}</p>
          <div aria-label="Diseño propio para tapa frontal" className={styles.manualArtworkGroup} role="group">
            <div className={styles.manualArtworkOption}>
              <div className={styles.manualArtworkCopy}>
                <strong>Diseño propio · sin IA</strong>
                <span>Sube solo la cara frontal; el sistema compone el lomo para imprenta.</span>
                <small>22 × 22 cm · imagen cuadrada · mínimo 2500 × 2500 px · JPG, PNG o WebP · máximo 30 MB</small>
              </div>
              <div className={styles.manualArtworkAction}>
                <button aria-label="Subir diseño propio para la tapa frontal" className={styles.textAction} disabled={working !== null || loading} onClick={() => manualArtworkInputRefs.current.FRONT_COVER?.click()} type="button">
                  {working === "UPLOAD_FRONT_COVER" ? <LoaderCircle aria-hidden="true" className={styles.spinningIcon} size={15} /> : <ImagePlus aria-hidden="true" size={15} />}
                  {working === "UPLOAD_FRONT_COVER" ? "Validando…" : frontManualDesign ? "Cambiar diseño" : "Subir diseño propio"}
                </button>
                <input
                  accept="image/jpeg,image/png,image/webp"
                  aria-label="Archivo de diseño propio para tapa frontal"
                  className={styles.visuallyHidden}
                  disabled={working !== null || loading}
                  onChange={(event) => void uploadManualArtwork(event, "FRONT_COVER")}
                  ref={(element) => { manualArtworkInputRefs.current.FRONT_COVER = element; }}
                  type="file"
                />
              </div>
            </div>
            {manualArtworkFeedback.FRONT_COVER && <ManualArtworkFeedbackNotice feedback={manualArtworkFeedback.FRONT_COVER} />}
            {frontManualDesign && <ManualArtworkResult design={frontManualDesign} label="tapa frontal" onDelete={requestDeleteCover} onPreview={setPreviewDesign} onSelect={selectCover} requestId={requestId} selectedLabel="Tapa frontal lista para aprobación" working={working} />}
          </div>
          {frontAiDesigns.length > 0 && <div className={styles.proposalGrid}>{frontAiDesigns.map((design) => <ProposalCard design={design} key={design.id} label="tapa frontal" onDelete={requestDeleteCover} onPreview={setPreviewDesign} onSelect={selectCover} requestId={requestId} selectedLabel="Tapa seleccionada" working={working} />)}</div>}
          <div className={styles.stepActions}>
            <button className={styles.textAction} onClick={() => setActiveStep("references")} type="button">
              <ChevronLeft aria-hidden="true" size={16} />
              Volver a referencias
            </button>
            <button className={styles.primaryAction} onClick={() => setActiveStep("back")} type="button">
              Continuar a contratapa
              <ChevronRight aria-hidden="true" size={16} />
            </button>
          </div>
        </section>
      )}

      {activeStep === "back" && (
        <section aria-labelledby="back-stage-title" className={`${styles.stage} ${styles.stepPanel}`}>
          <div className={styles.stageHeader}>
            <div>
              <p className={styles.step}>Paso 3 de 4 · Contratapa</p>
              <h3 id="back-stage-title">Prepara la contratapa</h3>
              <p>{!selectedFront ? "Selecciona una tapa frontal y al menos una referencia para generar con IA. Para subir arte propio, no necesitas ninguna de las dos." : !hasValidBackReferenceSet ? "Selecciona una foto de referencia para habilitar la IA, o carga directamente el arte final." : "Usa las fotos de referencia y la tapa frontal para mantener la continuidad visual."}</p>
            </div>
            <button className={styles.primaryAction} disabled={working !== null || loading || !selectedFront || !hasValidBackReferenceSet || Boolean(selectedBack)} onClick={() => void generate("BACK_COVER")} type="button">
              {working === "BACK_COVER" ? <LoaderCircle aria-hidden="true" className={styles.spinningIcon} size={16} /> : <Sparkles aria-hidden="true" size={16} />}
              {working === "BACK_COVER" ? "Generando…" : selectedBack ? "Contratapa seleccionada" : backAiDesigns.length ? "Generar otra contratapa con IA" : "Generar contratapa con IA"}
            </button>
          </div>
          <ReferenceTray label="Fotos que usará la IA para la contratapa" references={backReferenceContext} onManage={() => setActiveStep("references")} onPreview={setPreviewAssetId} />
          <label className={styles.directionField}>
            <span>Indicaciones para la IA de contratapa <em>opcional</em></span>
            <textarea
              aria-describedby="back-ai-direction-help"
              disabled={working !== null || Boolean(selectedBack)}
              onChange={(event) => setBackCreativeDirection(event.target.value)}
              placeholder="Ej.: prolonga el paisaje de la tapa frontal y deja espacio limpio para una breve dedicatoria."
              rows={3}
              value={backCreativeDirection}
            />
          </label>
          <p className={styles.fieldHelp} id="back-ai-direction-help">{selectedBack ? "La contratapa seleccionada se incluirá en la aprobación." : backAiDesigns.length ? "Describe los cambios para la siguiente propuesta. La indicación se enviará a la IA junto con las fotos seleccionadas." : "Puedes orientar la composición, los colores y el espacio para texto. La IA no compone el lomo."}</p>
          <div aria-label="Diseño propio para contratapa" className={styles.manualArtworkGroup} role="group">
            <div className={styles.manualArtworkOption}>
              <div className={styles.manualArtworkCopy}>
                <strong>Diseño propio · sin IA</strong>
                <span>Sube solo la cara posterior; el sistema compone el lomo para imprenta.</span>
                <small>22 × 22 cm · imagen cuadrada · mínimo 2500 × 2500 px · JPG, PNG o WebP · máximo 30 MB</small>
              </div>
              <div className={styles.manualArtworkAction}>
                <button aria-label="Subir diseño propio para la contratapa" className={styles.textAction} disabled={working !== null || loading} onClick={() => manualArtworkInputRefs.current.BACK_COVER?.click()} type="button">
                  {working === "UPLOAD_BACK_COVER" ? <LoaderCircle aria-hidden="true" className={styles.spinningIcon} size={15} /> : <ImagePlus aria-hidden="true" size={15} />}
                  {working === "UPLOAD_BACK_COVER" ? "Validando…" : backManualDesign ? "Cambiar diseño" : "Subir diseño propio"}
                </button>
                <input
                  accept="image/jpeg,image/png,image/webp"
                  aria-label="Archivo de diseño propio para contratapa"
                  className={styles.visuallyHidden}
                  disabled={working !== null || loading}
                  onChange={(event) => void uploadManualArtwork(event, "BACK_COVER")}
                  ref={(element) => { manualArtworkInputRefs.current.BACK_COVER = element; }}
                  type="file"
                />
              </div>
            </div>
            {manualArtworkFeedback.BACK_COVER && <ManualArtworkFeedbackNotice feedback={manualArtworkFeedback.BACK_COVER} />}
            {backManualDesign && <ManualArtworkResult design={backManualDesign} label="contratapa" onDelete={requestDeleteCover} onPreview={setPreviewDesign} onSelect={selectCover} requestId={requestId} selectedLabel="Contratapa lista para aprobación" working={working} />}
          </div>
          {backAiDesigns.length > 0 && <div className={styles.proposalGrid}>{backAiDesigns.map((design) => <ProposalCard design={design} key={design.id} label="contratapa" onDelete={requestDeleteCover} onPreview={setPreviewDesign} onSelect={selectCover} requestId={requestId} selectedLabel="Contratapa seleccionada" working={working} />)}</div>}
          <div className={styles.stepActions}>
            <button className={styles.textAction} onClick={() => setActiveStep("front")} type="button">
              <ChevronLeft aria-hidden="true" size={16} />
              Volver a tapa frontal
            </button>
            <button className={styles.primaryAction} onClick={() => setActiveStep("review")} type="button">
              Revisar la cubierta
              <ChevronRight aria-hidden="true" size={16} />
            </button>
          </div>
        </section>
      )}

      {activeStep === "review" && (
        <section aria-labelledby="review-stage-title" className={`${styles.stage} ${styles.reviewStage}`}>
          <div className={styles.stageHeader}>
            <div>
              <p className={styles.step}>Paso 4 de 4 · Revisión</p>
              <h3 id="review-stage-title">Revisa el par que recibirá el cliente</h3>
              <p>{canSendApproval ? "Estas son las dos caras que se incluirán en el enlace privado de aprobación." : "Completa la tapa frontal y la contratapa para habilitar el envío."}</p>
            </div>
            <span className={`${styles.reviewStatus} ${canSendApproval ? styles.reviewStatusReady : ""}`}>
              {canSendApproval ? "Listo para revisar" : "Faltan diseños"}
            </span>
          </div>
          <div className={styles.reviewPreviewGrid}>
            <ReviewPreview design={selectedFront} label="tapa frontal" />
            <ReviewPreview design={selectedBack} label="contratapa" />
          </div>
          <section aria-labelledby="spine-stage-title" className={styles.productionNote}>
            <LockKeyhole aria-hidden="true" size={17} />
            <div>
              <h3 id="spine-stage-title">El lomo se compone para imprenta al finalizar.</h3>
              <p>PixelArt calcula el ancho real según las páginas y el tipo de tapa; la IA no dibuja el lomo.</p>
            </div>
          </section>
          <div className={styles.reviewActions}>
            <button className={styles.textAction} onClick={() => setActiveStep("back")} type="button">
              <ChevronLeft aria-hidden="true" size={16} />
              Volver a contratapa
            </button>
            <button className={styles.primaryAction} disabled={working !== null || !canSendApproval} onClick={() => void sendApproval()} type="button">
              {working === "SEND_APPROVAL" ? <LoaderCircle aria-hidden="true" className={styles.spinningIcon} size={16} /> : <Send aria-hidden="true" size={16} />}
              {working === "SEND_APPROVAL" ? "Enviando…" : "Enviar aprobación"}
            </button>
          </div>
        </section>
      )}

      {(error || notice) && <p aria-live="polite" className={`${styles.statusLine} ${error ? styles.statusError : styles.statusSuccess}`} role={error ? "alert" : "status"}>{error ?? notice}</p>}

      <dialog
        aria-labelledby="reference-preview-title"
        className={styles.previewDialog}
        onCancel={(event) => {
          event.preventDefault();
          closePreview();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closePreview();
        }}
        onClose={() => setPreviewAssetId(null)}
        ref={previewDialogRef}
      >
        {previewReference && (
          <div className={styles.previewDialogContent}>
            <header className={styles.previewDialogHeader}>
              <div>
                <p>Referencia {previewIndex + 1} de {references.length}</p>
                <h3 id="reference-preview-title">{previewReference.originalFilename ?? `Referencia ${previewReference.assetId}`}</h3>
              </div>
              <button aria-label="Cerrar vista ampliada" className={styles.previewClose} onClick={closePreview} type="button"><X aria-hidden="true" size={20} /></button>
            </header>
            <div className={styles.previewCanvas}>
              {references.length > 1 && <button aria-label="Ver referencia anterior" className={`${styles.previewNavigation} ${styles.previewPrevious}`} onClick={() => movePreview(-1)} type="button"><ChevronLeft aria-hidden="true" size={22} /></button>}
              <img alt={`Vista ampliada de ${previewReference.originalFilename ?? `referencia ${previewReference.assetId}`}`} src={previewReference.url} />
              {references.length > 1 && <button aria-label="Ver siguiente referencia" className={`${styles.previewNavigation} ${styles.previewNext}`} onClick={() => movePreview(1)} type="button"><ChevronRight aria-hidden="true" size={22} /></button>}
            </div>
            <p className={styles.previewHint}>Usa las flechas para comparar las referencias sin perder la selección actual.</p>
          </div>
        )}
      </dialog>

      <ConfirmModal
        busy={pendingDeletion !== null && working === `DELETE-${pendingDeletion.id}`}
        cancelLabel="Cancelar"
        confirmLabel="Borrar propuesta"
        danger
        message={pendingDeletion ? `Se borrará esta ${pendingDeletion.surface === "FRONT_COVER" ? "tapa frontal" : "contratapa"}. Puedes cargar otro diseño o generar una nueva propuesta con IA.` : ""}
        onCancel={() => setPendingDeletion(null)}
        onConfirm={() => pendingDeletion && void deleteCover(pendingDeletion)}
        open={pendingDeletion !== null}
        title={pendingDeletion ? `¿Borrar esta ${pendingDeletion.surface === "FRONT_COVER" ? "tapa frontal" : "contratapa"}?` : "Borrar propuesta"}
      />

      <dialog
        aria-labelledby="proposal-preview-title"
        className={styles.previewDialog}
        onCancel={(event) => {
          event.preventDefault();
          closeProposalPreview();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeProposalPreview();
        }}
        onClose={() => setPreviewDesign(null)}
        ref={proposalPreviewDialogRef}
      >
        {previewDesign && (
          <div className={styles.previewDialogContent}>
            <header className={styles.previewDialogHeader}>
              <div>
                <p>{previewDesign.provider === "manual" ? "Diseño propio" : "Propuesta generada"} · {previewDesign.surface === "FRONT_COVER" ? "tapa frontal" : "contratapa"}</p>
                <h3 id="proposal-preview-title">Vista completa para revisión</h3>
              </div>
              <button aria-label="Cerrar vista ampliada de la propuesta" className={styles.previewClose} onClick={closeProposalPreview} type="button"><X aria-hidden="true" size={20} /></button>
            </header>
            <div className={styles.previewCanvas}>
              <img alt={`Vista ampliada de propuesta de ${previewDesign.surface === "FRONT_COVER" ? "tapa frontal" : "contratapa"} ${previewDesign.id}`} src={previewDesign.asset.url} />
            </div>
            <p className={styles.previewHint}>Revísala completa antes de seleccionar esta propuesta para la cubierta.</p>
          </div>
        )}
      </dialog>

    </section>
  );
}

function ReferenceTray({ label, references, onManage, onPreview }: { label: string; references: ReferenceAsset[]; onManage: () => void; onPreview: (assetId: number) => void }) {
  return (
    <section aria-label={label} className={styles.referenceTray}>
      <div className={styles.referenceTrayHeader}>
        <div>
          <strong>{label}</strong>
          <span>{references.length ? `${references.length} foto${references.length === 1 ? "" : "s"} activa${references.length === 1 ? "" : "s"}` : "Sin fotos seleccionadas"}</span>
        </div>
        <button className={styles.referenceManageAction} onClick={onManage} type="button">Gestionar fotos</button>
      </div>
      {references.length ? (
        <div className={styles.referenceThumbnails}>
          {references.map((reference) => (
            <button
              aria-label={`Ampliar referencia ${reference.originalFilename ?? reference.assetId}`}
              className={styles.referenceThumbnail}
              key={reference.assetId}
              onClick={() => onPreview(reference.assetId)}
              type="button"
            >
              <img alt={reference.originalFilename ? `Referencia ${reference.originalFilename}` : `Referencia ${reference.assetId}`} src={reference.url} />
            </button>
          ))}
        </div>
      ) : (
        <p className={styles.referenceTrayEmpty}>Ve a Referencias para activar fotos para la IA. Puedes continuar cargando arte propio.</p>
      )}
    </section>
  );
}

function ProposalCard({ design, label, onDelete, onPreview, onSelect, requestId, selectedLabel, working }: { design: Design; label: string; onDelete: (design: Design) => void; onPreview: (design: Design) => void; onSelect: (design: Design) => Promise<void>; requestId: number; selectedLabel: string; working: string | null }) {
  const isWorking = working === "SELECT";
  const isDeleting = working === `DELETE-${design.id}`;
  const sourceLabel = design.provider === "manual"
    ? `Diseño propio${design.asset.width && design.asset.height ? ` · ${design.asset.width} × ${design.asset.height} px` : ""}`
    : "Propuesta generada con IA";
  return (
    <article className={`${styles.proposalCard} ${design.isSelected ? styles.proposalCardSelected : ""}`}>
      <div className={styles.proposalImageWrap}>
        <img alt={`Propuesta de ${label} ${design.id}`} src={design.asset.url} />
        <button aria-label={`Ampliar propuesta de ${label} ${design.id}`} className={styles.previewTrigger} onClick={() => onPreview(design)} type="button">
          <ZoomIn aria-hidden="true" size={17} />
          Ver completa
        </button>
      </div>
      <p className={styles.proposalSource}>{sourceLabel}</p>
      <div className={styles.proposalUtilities}>
        <a className={styles.downloadProposalAction} download href={`/admin-api/photobook/custom-requests/${requestId}/designs/${design.id}/download`}>
          <Download aria-hidden="true" size={15} />
          Descargar
        </a>
        {!design.isSelected && (
          <button className={styles.deleteProposalAction} disabled={working !== null} onClick={() => void onDelete(design)} type="button">
            {isDeleting ? <LoaderCircle aria-hidden="true" className={styles.spinningIcon} size={15} /> : <Trash2 aria-hidden="true" size={15} />}
            {isDeleting ? "Borrando…" : "Borrar"}
          </button>
        )}
      </div>
      <button className={styles.selectProposalAction} disabled={working !== null || design.isSelected} onClick={() => void onSelect(design)} type="button">
        {design.isSelected ? <Check aria-hidden="true" size={15} /> : isWorking ? <LoaderCircle aria-hidden="true" className={styles.spinningIcon} size={15} /> : null}
        {design.isSelected ? selectedLabel : isWorking ? "Seleccionando…" : `Usar como ${label}`}
      </button>
    </article>
  );
}

function ManualArtworkFeedbackNotice({ feedback }: { feedback: ManualArtworkFeedback }) {
  const icon = feedback.status === "checking"
    ? <LoaderCircle aria-hidden="true" className={styles.spinningIcon} size={15} />
    : feedback.status === "success"
      ? <Check aria-hidden="true" size={15} />
      : <X aria-hidden="true" size={15} />;
  const toneClass = feedback.status === "checking"
    ? styles.manualArtworkFeedbackChecking
    : feedback.status === "success"
      ? styles.manualArtworkFeedbackSuccess
      : styles.manualArtworkFeedbackError;

  return (
    <p aria-live="polite" className={`${styles.manualArtworkFeedback} ${toneClass}`} role={feedback.status === "error" ? "alert" : "status"}>
      {icon}
      <span>{feedback.message}</span>
    </p>
  );
}

function ManualArtworkResult({ design, label, onDelete, onPreview, onSelect, requestId, selectedLabel, working }: {
  design: Design;
  label: string;
  onDelete: (design: Design) => void;
  onPreview: (design: Design) => void;
  onSelect: (design: Design) => Promise<void>;
  requestId: number;
  selectedLabel: string;
  working: string | null;
}) {
  const isSelecting = working === "SELECT";
  const isDeleting = working === `DELETE-${design.id}`;
  const dimensions = design.asset.width && design.asset.height
    ? `${design.asset.width} × ${design.asset.height} px`
    : null;

  return (
    <article className={`${styles.manualArtworkResult} ${design.isSelected ? styles.manualArtworkResultSelected : ""}`}>
      <div className={styles.manualArtworkPreviewWrap}>
        <img alt={`Vista previa del diseño propio para ${label}`} src={design.asset.url} />
        <button aria-label={`Ampliar diseño propio para ${label}`} className={styles.previewTrigger} onClick={() => onPreview(design)} type="button">
          <ZoomIn aria-hidden="true" size={16} />
          Ver completa
        </button>
      </div>
      <div className={styles.manualArtworkResultDetails}>
        <div className={styles.manualArtworkResultSummary}>
          <strong>Diseño propio{dimensions ? ` · ${dimensions}` : ""}</strong>
          <span>{design.isSelected ? `La ${label} quedó seleccionada para la aprobación.` : "Confirma este diseño para incluirlo en el enlace de aprobación."}</span>
        </div>
        <div className={styles.manualArtworkResultActions}>
          <a className={styles.downloadProposalAction} download href={`/admin-api/photobook/custom-requests/${requestId}/designs/${design.id}/download`}>
            <Download aria-hidden="true" size={14} />
            Descargar
          </a>
          {!design.isSelected && (
            <button aria-label={`Borrar diseño propio de ${label}`} className={styles.deleteProposalAction} disabled={working !== null} onClick={() => onDelete(design)} type="button">
              {isDeleting ? <LoaderCircle aria-hidden="true" className={styles.spinningIcon} size={14} /> : <Trash2 aria-hidden="true" size={14} />}
              {isDeleting ? "Borrando…" : "Borrar"}
            </button>
          )}
        </div>
        <button className={`${styles.primaryAction} ${styles.manualArtworkSelect} ${design.isSelected ? styles.manualArtworkSelectSelected : ""}`} disabled={working !== null || design.isSelected} onClick={() => void onSelect(design)} type="button">
          {design.isSelected ? <Check aria-hidden="true" size={15} /> : isSelecting ? <LoaderCircle aria-hidden="true" className={styles.spinningIcon} size={15} /> : null}
          {design.isSelected ? selectedLabel : isSelecting ? "Seleccionando…" : `Usar como ${label}`}
        </button>
      </div>
    </article>
  );
}

function ReviewPreview({ design, label }: { design: Design | null; label: string }) {
  const title = label === "tapa frontal" ? "Tapa frontal" : "Contratapa";
  const source = design?.provider === "manual" ? "Diseño propio" : "Propuesta generada con IA";

  return (
    <article className={`${styles.reviewPreview} ${design ? styles.reviewPreviewReady : ""}`}>
      {design ? (
        <div className={styles.reviewPreviewImage}>
          <img alt={`Vista previa de ${label} seleccionada`} src={design.asset.url} />
        </div>
      ) : (
        <div className={styles.reviewPreviewEmpty}>
          <ImagePlus aria-hidden="true" size={22} />
          <span>Sin seleccionar</span>
        </div>
      )}
      <div className={styles.reviewPreviewDetails}>
        <div className={styles.reviewPreviewTitle}>
          <h4>{title}</h4>
          <span className={`${styles.reviewPreviewBadge} ${design ? styles.reviewPreviewBadgeReady : ""}`}>
            {design ? "Lista" : "Pendiente"}
          </span>
        </div>
        <p>{design ? source : `Aún no hay una ${label} seleccionada.`}</p>
      </div>
    </article>
  );
}
