"use client";

import { useEffect, useMemo, useState } from "react";
import PhotobookFormatSelector, { PhotobookCoverType, THICK_COVER_EXAMPLES, THIN_COVER_EXAMPLES } from "@/components/photobook/PhotobookFormatSelector";

type Product = { id: number };
type EditorPage = { pageNumber: number; layoutKey: string; slots: unknown[] };
type DraftState = Record<string, unknown> & { pages?: EditorPage[]; coverType?: PhotobookCoverType };

type Props = {
  products: Product[];
  mode: "initial" | "change";
  initialDraft?: DraftState;
  onConfigured: (state: DraftState) => void;
  onCancel?: () => void;
};

function getPrice(cover: PhotobookCoverType, sheets: number) {
  const options = cover === "TAPA_DELGADA" ? THIN_COVER_EXAMPLES : THICK_COVER_EXAMPLES;
  return options.find((option) => option.sheets === sheets)?.price ?? "";
}

function blankPages(count: number): EditorPage[] {
  return Array.from({ length: count }, (_, index) => ({ pageNumber: index + 1, layoutKey: "FULL_1", slots: [null] }));
}

function supportedSheets(pageCount: number) {
  const sheets = Math.ceil(pageCount / 2);
  const options = THIN_COVER_EXAMPLES.map((option) => option.sheets);
  return options.includes(sheets) ? sheets : 25;
}

export default function CustomPhotobookSheetSetup({ products, mode, initialDraft, onConfigured, onCancel }: Props) {
  const [selectedCover, setSelectedCover] = useState<PhotobookCoverType>("TAPA_DELGADA");
  const [thinSheets, setThinSheets] = useState(25);
  const [thickSheets, setThickSheets] = useState(25);
  const [draft, setDraft] = useState<DraftState | null>(mode === "initial" ? {} : null);
  const [loadingDraft, setLoadingDraft] = useState(mode === "change");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingState, setPendingState] = useState<DraftState | null>(null);
  const sheets = selectedCover === "TAPA_DELGADA" ? thinSheets : thickSheets;

  useEffect(() => {
    if (mode !== "change") return;
    const applyDraft = (state: DraftState) => {
      const existingPages = Array.isArray(state.pages) ? state.pages : [];
      const cover = state.coverType === "TAPA_GRUESA" ? "TAPA_GRUESA" : "TAPA_DELGADA";
      const currentSheets = supportedSheets(existingPages.length);
      setSelectedCover(cover);
      if (cover === "TAPA_DELGADA") setThinSheets(currentSheets);
      else setThickSheets(currentSheets);
      setDraft(state);
    };
    if (initialDraft) {
      applyDraft(initialDraft);
      setLoadingDraft(false);
      return;
    }
    fetch("/api/photobook/custom-editor/draft")
      .then((response) => response.ok ? response.json() : { state: {} })
      .then((result) => applyDraft((result as { state?: DraftState }).state ?? {}))
      .catch(() => setError("No pudimos cargar el formato actual."))
      .finally(() => setLoadingDraft(false));
  }, [initialDraft, mode]);

  const targetPageCount = sheets * 2;
  const changedPages = useMemo(() => {
    const existing = Array.isArray(draft?.pages) ? draft.pages : [];
    if (mode === "initial") return blankPages(targetPageCount);
    const retained = existing.slice(0, targetPageCount);
    while (retained.length < targetPageCount) retained.push({ pageNumber: retained.length + 1, layoutKey: "FULL_1", slots: [null] });
    return retained.map((page, index) => ({ ...page, pageNumber: index + 1 }));
  }, [draft, mode, targetPageCount]);

  function makeNextState(): DraftState {
    if (mode === "initial") {
      return {
        source: "custom_photobook_request",
        editorMode: "CUSTOM_FULL_EDITOR",
        formatConfigured: true,
        selectedProduct: products[0]?.id ?? 0,
        coverType: selectedCover,
        wantsRush: false,
        step: 1,
        pages: changedPages,
        photos: [],
        form: { name: "", email: "", phone: "", deliveryAddress: "", deliveryDistrict: "", deliveryCity: "", deliveryRegion: "", deliveryDepartment: "" },
      };
    }
    return {
      ...(draft ?? {}),
      editorMode: "CUSTOM_FULL_EDITOR",
      formatConfigured: true,
      coverType: selectedCover,
      step: 2,
      pages: changedPages,
    };
  }

  async function save(state: DraftState) {
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/photobook/custom-editor/draft", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error((result as { message?: string }).message ?? "No pudimos guardar tu formato");
      }
      onConfigured(state);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "No pudimos guardar tu formato");
    } finally {
      setSubmitting(false);
      setPendingState(null);
    }
  }

  function continueToEditor() {
    const nextState = makeNextState();
    const existing = Array.isArray(draft?.pages) ? draft.pages : [];
    const removedPagesHavePhotos = targetPageCount < existing.length && existing.slice(targetPageCount).some((page) => page.slots.some(Boolean));
    if (removedPagesHavePhotos) {
      setPendingState(nextState);
      return;
    }
    void save(nextState);
  }

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="custom-photobook-format-title" style={{ position: "fixed", inset: 0, zIndex: 3000, overflowY: "auto", padding: "clamp(16px, 4vw, 40px)", background: "rgba(14, 25, 32, .58)", backdropFilter: "blur(5px)" }}>
      <section style={{ width: "min(760px, 100%)", margin: "auto", padding: "clamp(22px, 4vw, 34px)", borderRadius: "20px", background: "#fff", boxShadow: "0 28px 80px rgba(0,0,0,.30)" }}>
        <p style={{ margin: "0 0 8px", color: "#804187", fontSize: "11px", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}>{mode === "initial" ? "Antes de empezar" : "Cambiar formato"}</p>
        <h1 id="custom-photobook-format-title" style={{ margin: "0 0 10px", color: "#111", fontSize: "clamp(25px, 4vw, 34px)", lineHeight: 1.12, letterSpacing: "-.03em" }}>Elige la tapa y cantidad de hojas</h1>
        <p style={{ margin: "0 0 24px", color: "#666", fontSize: "14px", lineHeight: 1.55 }}>{mode === "initial" ? "Define el formato de tu photobook antes de cargar las fotos." : "Puedes ampliar el photobook en cualquier momento. Si reduces páginas con fotos, te pediremos confirmación antes de quitarlas."}</p>

        {loadingDraft ? <p style={{ color: "#63737d", fontSize: "14px" }}>Cargando el formato actual...</p> : <PhotobookFormatSelector compact selectedCover={selectedCover} thinSheets={thinSheets} thickSheets={thickSheets} onSelectCover={setSelectedCover} onSelectSheets={(cover, nextSheets) => {
          if (cover === "TAPA_DELGADA") setThinSheets(nextSheets);
          else setThickSheets(nextSheets);
        }} />}

        {!loadingDraft && <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginTop: "20px", padding: "13px 16px", borderRadius: "11px", background: "#f6f3f7", color: "#4e4150", fontSize: "13px" }}>
          <span><strong style={{ color: "#201522" }}>{selectedCover === "TAPA_DELGADA" ? "Tapa delgada" : "Tapa gruesa"}</strong> · {sheets} hojas · {targetPageCount} páginas</span>
          <strong style={{ color: "#804187", whiteSpace: "nowrap" }}>{getPrice(selectedCover, sheets)}</strong>
        </div>}

        {pendingState && <div role="alert" style={{ marginTop: "16px", padding: "14px", borderRadius: "11px", background: "#fff7ed", border: "1px solid #fed7aa", color: "#9a3412", fontSize: "13px", lineHeight: 1.5 }}>
          Hay fotos en las páginas que quedarían fuera del nuevo formato. Esas fotos seguirán en tu biblioteca, pero se quitarán de esas páginas.
          <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
            <button type="button" onClick={() => setPendingState(null)} disabled={submitting} style={{ flex: 1, minHeight: "40px", border: "1px solid #fdba74", borderRadius: "9px", background: "#fff", color: "#9a3412", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Volver</button>
            <button type="button" onClick={() => void save(pendingState)} disabled={submitting} style={{ flex: 1, minHeight: "40px", border: 0, borderRadius: "9px", background: "#c2410c", color: "#fff", fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>{submitting ? "Guardando..." : "Confirmar cambio"}</button>
          </div>
        </div>}
        {error && <p role="alert" style={{ margin: "14px 0 0", color: "#b42318", fontSize: "13px" }}>{error}</p>}
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          {mode === "change" && <button type="button" onClick={onCancel} disabled={submitting} style={{ flex: 1, minHeight: "52px", border: "1px solid #d9d0da", borderRadius: "12px", background: "#fff", color: "#4e4150", cursor: "pointer", fontFamily: "inherit", fontSize: "15px", fontWeight: 700 }}>Cancelar</button>}
          <button type="button" onClick={continueToEditor} disabled={loadingDraft || submitting || Boolean(pendingState)} style={{ flex: 2, minHeight: "52px", border: 0, borderRadius: "12px", background: submitting || loadingDraft ? "#bcaabd" : "linear-gradient(135deg, #804187 0%, #b460bd 100%)", color: "#fff", cursor: submitting || loadingDraft ? "wait" : "pointer", fontFamily: "inherit", fontSize: "15px", fontWeight: 800 }}>
            {submitting ? "Guardando formato..." : mode === "initial" ? "Continuar a subir fotos" : "Actualizar formato"}
          </button>
        </div>
      </section>
    </div>
  );
}
