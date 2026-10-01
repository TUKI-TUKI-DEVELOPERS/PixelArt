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
  asset: { id: number; url: string };
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

type Props = {
  requestId: number;
  coverMode: string;
};

const MIN_ACTIVE_REFERENCES = 1;
const MAX_REFERENCES = 5;
const FIXED_REFERENCE_SLOTS_PER_SURFACE = 2;

export function CustomPhotobookAiProposalPanel({ requestId, coverMode }: Props) {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [references, setReferences] = useState<ReferenceAsset[]>([]);
  const [creativeDirection, setCreativeDirection] = useState("");
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [previewAssetId, setPreviewAssetId] = useState<number | null>(null);
  const [previewDesign, setPreviewDesign] = useState<Design | null>(null);
  const [pendingDeletion, setPendingDeletion] = useState<Design | null>(null);
  const addPhotoInputRef = useRef<HTMLInputElement>(null);
  const previewDialogRef = useRef<HTMLDialogElement>(null);
  const proposalPreviewDialogRef = useRef<HTMLDialogElement>(null);
  const replacePhotoInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const isCustomerArtwork = coverMode === "CUSTOMER_ARTWORK";
  const activeReferences = useMemo(() => references.filter((reference) => reference.isActive), [references]);
  const hasFixedReferenceSlots = references.some((reference) => Boolean(reference.surface));
  const frontReferences = useMemo(() => references.filter((reference) => reference.surface === "FRONT_COVER"), [references]);
  const backReferences = useMemo(() => references.filter((reference) => reference.surface === "BACK_COVER"), [references]);
  const activeFrontReferences = useMemo(() => frontReferences.filter((reference) => reference.isActive), [frontReferences]);
  const activeBackReferences = useMemo(() => backReferences.filter((reference) => reference.isActive), [backReferences]);
  const frontDesigns = useMemo(() => designs.filter((design) => design.surface === "FRONT_COVER"), [designs]);
  const backDesigns = useMemo(() => designs.filter((design) => design.surface === "BACK_COVER"), [designs]);
  const selectedFront = frontDesigns.find((design) => design.isSelected) ?? null;
  const selectedBack = backDesigns.find((design) => design.isSelected) ?? null;
  const hasValidReferenceSet = hasFixedReferenceSlots
    ? activeFrontReferences.length >= MIN_ACTIVE_REFERENCES && activeFrontReferences.length <= FIXED_REFERENCE_SLOTS_PER_SURFACE
    : activeReferences.length >= MIN_ACTIVE_REFERENCES && activeReferences.length <= MAX_REFERENCES;
  const hasValidBackReferenceSet = hasFixedReferenceSlots
    ? activeBackReferences.length >= MIN_ACTIVE_REFERENCES && activeBackReferences.length <= FIXED_REFERENCE_SLOTS_PER_SURFACE
    : activeReferences.length >= MIN_ACTIVE_REFERENCES && activeReferences.length <= MAX_REFERENCES;
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
    begin(surface);
    try {
      const response = await fetch(`/admin-api/photobook/custom-requests/${requestId}/designs/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surface, creativeDirection: surface === "FRONT_COVER" ? creativeDirection.trim() : undefined }),
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
      setDesigns((current) => current.filter((item) => item.surface !== design.surface));
      setNotice("La propuesta se borró. Puedes generar una nueva desde las fotos seleccionadas.");
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

  const frontStatus = !hasValidReferenceSet
    ? `Faltan ${referencesStillNeeded} referencia${referencesStillNeeded === 1 ? "" : "s"} seleccionada${referencesStillNeeded === 1 ? "" : "s"}.`
    : !creativeDirection.trim()
      ? "Describe la dirección creativa para continuar."
      : "Todo listo para generar la tapa frontal.";

  return (
    <section aria-labelledby="ai-proposal-title" className={styles.workspace}>
      <header className={styles.workspaceHeader}>
        <div>
          <p className={styles.kicker}>{isCustomerArtwork ? "Adaptación de arte propio" : "Construcción asistida"}</p>
          <h2 id="ai-proposal-title">Construye la cubierta con referencias claras.</h2>
          <p>Elige las fotos que la IA debe considerar, define la dirección y revisa cada propuesta antes de enviarla al cliente.</p>
        </div>
        <span className={styles.providerBadge}>OpenAI</span>
      </header>

      <section aria-labelledby="references-stage-title" className={styles.stage}>
        <div className={styles.stageHeader}>
          <div>
            <p className={styles.step}>Paso 1 · Referencias</p>
            <h3 id="references-stage-title">Elige una o dos fotos para cada cubierta.</h3>
            <p>{hasFixedReferenceSlots ? "El cliente entregó dos fotos para tapa y dos para contratapa. Cada grupo solo alimenta su propia generación." : "Esta solicitud usa el flujo anterior de referencias libres."}</p>
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
      </section>

      <section aria-labelledby="front-stage-title" className={`${styles.stage} ${!hasValidReferenceSet ? styles.stageLocked : ""}`}>
        <div className={styles.stageHeader}>
          <div>
            <p className={styles.step}>Paso 2 · Tapa frontal</p>
            <h3 id="front-stage-title">Define la dirección y genera propuestas.</h3>
            <p>{frontStatus}</p>
          </div>
          <button className={styles.primaryAction} disabled={working !== null || loading || !canGenerateFront || Boolean(selectedFront)} onClick={() => void generate("FRONT_COVER")} type="button">
            {working === "FRONT_COVER" ? <LoaderCircle aria-hidden="true" className={styles.spinningIcon} size={16} /> : <Sparkles aria-hidden="true" size={16} />}
            {working === "FRONT_COVER" ? "Generando…" : selectedFront ? "Tapa frontal seleccionada" : frontDesigns.length ? "Regenerar desde la última" : "Generar tapa frontal"}
          </button>
        </div>
        <label className={styles.directionField}>
          <span>{frontDesigns.length ? "Cambios para la siguiente iteración" : "Dirección creativa"} <em>obligatoria</em></span>
          <textarea
            aria-describedby="ai-direction-help"
            disabled={!hasValidReferenceSet || working !== null || Boolean(selectedFront)}
            onChange={(event) => setCreativeDirection(event.target.value)}
            placeholder="Ej.: fotografía principal a la izquierda, luz azul de madrugada, composición limpia y tipografía discreta."
            rows={3}
            value={creativeDirection}
          />
        </label>
        <p className={styles.fieldHelp} id="ai-direction-help">{selectedFront ? "La tapa frontal ya está seleccionada para generar la contratapa y enviar la aprobación. No se puede regenerar sin reiniciar esa selección." : frontDesigns.length ? "La siguiente propuesta parte de la última tapa generada. Describe solo los ajustes; conservará sus sujetos y composición salvo que indiques cambiarlos." : "Indica qué fotos deben tener protagonismo, cómo combinarlas y el tono de la cubierta. Los originales no se modifican."}</p>
        {frontDesigns.length > 0 && <div className={styles.proposalGrid}>{frontDesigns.map((design) => <ProposalCard design={design} key={design.id} label="tapa frontal" onDelete={requestDeleteCover} onPreview={setPreviewDesign} onSelect={selectCover} requestId={requestId} selectedLabel="Tapa seleccionada" working={working} />)}</div>}
      </section>

      <section aria-labelledby="back-stage-title" className={`${styles.stage} ${!selectedFront || !hasValidBackReferenceSet ? styles.stageLocked : ""}`}>
        <div className={styles.stageHeader}>
          <div>
            <p className={styles.step}>Paso 3 · Contratapa</p>
            <h3 id="back-stage-title">Genera continuidad desde la tapa seleccionada.</h3>
            <p>{!selectedFront ? "Selecciona una propuesta de tapa frontal para habilitar este paso." : !hasValidBackReferenceSet ? "Selecciona al menos una de las dos fotos asignadas a la contratapa." : "La IA usará las fotos seleccionadas para contratapa y conservará la paleta de la tapa frontal elegida."}</p>
          </div>
          <button className={styles.primaryAction} disabled={working !== null || loading || !selectedFront || !hasValidBackReferenceSet} onClick={() => void generate("BACK_COVER")} type="button">
            {working === "BACK_COVER" ? <LoaderCircle aria-hidden="true" className={styles.spinningIcon} size={16} /> : <Sparkles aria-hidden="true" size={16} />}
            {working === "BACK_COVER" ? "Generando…" : backDesigns.length ? "Nueva contratapa" : "Generar contratapa"}
          </button>
        </div>
        {backDesigns.length > 0 && <div className={styles.proposalGrid}>{backDesigns.map((design) => <ProposalCard design={design} key={design.id} label="contratapa" onDelete={requestDeleteCover} onPreview={setPreviewDesign} onSelect={selectCover} requestId={requestId} selectedLabel="Contratapa seleccionada" working={working} />)}</div>}
      </section>

      <section aria-labelledby="approval-stage-title" className={`${styles.stage} ${!canSendApproval ? styles.stageLocked : ""}`}>
        <div className={styles.stageHeader}>
          <div>
            <p className={styles.step}>Paso 4 · Aprobación</p>
            <h3 id="approval-stage-title">Envía el par visual al cliente.</h3>
            <p>{canSendApproval ? "El cliente recibirá un enlace privado válido por siete días para revisar tapa y contratapa." : "Selecciona una tapa y una contratapa vinculadas para habilitar el envío."}</p>
          </div>
          <button className={styles.primaryAction} disabled={working !== null || !canSendApproval} onClick={() => void sendApproval()} type="button">
            {working === "SEND_APPROVAL" ? <LoaderCircle aria-hidden="true" className={styles.spinningIcon} size={16} /> : <Send aria-hidden="true" size={16} />}
            {working === "SEND_APPROVAL" ? "Enviando…" : "Enviar aprobación"}
          </button>
        </div>
      </section>

      <section aria-labelledby="spine-stage-title" className={styles.productionNote}>
        <LockKeyhole aria-hidden="true" size={17} />
        <div>
          <h3 id="spine-stage-title">El lomo se compone para imprenta al finalizar.</h3>
          <p>PixelArt calcula el ancho real según las páginas y el tipo de tapa; la IA no dibuja el lomo.</p>
        </div>
      </section>

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
        message={pendingDeletion ? `Se borrará esta ${pendingDeletion.surface === "FRONT_COVER" ? "tapa frontal" : "contratapa"}. La siguiente generación empezará desde las fotos seleccionadas.` : ""}
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
                <p>Propuesta generada · {previewDesign.surface === "FRONT_COVER" ? "tapa frontal" : "contratapa"}</p>
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

      <p aria-live="polite" className={`${styles.statusLine} ${error ? styles.statusError : notice ? styles.statusSuccess : ""}`}>{error ?? notice ?? "Selecciona las referencias y describe la dirección antes de generar."}</p>
    </section>
  );
}

function ProposalCard({ design, label, onDelete, onPreview, onSelect, requestId, selectedLabel, working }: { design: Design; label: string; onDelete: (design: Design) => void; onPreview: (design: Design) => void; onSelect: (design: Design) => Promise<void>; requestId: number; selectedLabel: string; working: string | null }) {
  const isWorking = working === "SELECT";
  const isDeleting = working === `DELETE-${design.id}`;
  return (
    <article className={`${styles.proposalCard} ${design.isSelected ? styles.proposalCardSelected : ""}`}>
      <div className={styles.proposalImageWrap}>
        <img alt={`Propuesta de ${label} ${design.id}`} src={design.asset.url} />
        <button aria-label={`Ampliar propuesta de ${label} ${design.id}`} className={styles.previewTrigger} onClick={() => onPreview(design)} type="button">
          <ZoomIn aria-hidden="true" size={17} />
          Ver completa
        </button>
      </div>
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
        {design.isSelected ? selectedLabel : isWorking ? "Seleccionando…" : `Usar esta ${label}`}
      </button>
    </article>
  );
}
