"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PhotobookEditorClient from "../[temaSlug]/editor/PhotobookEditorClient";
import CustomPhotobookSheetSetup from "./CustomPhotobookSheetSetup";

type Product = { id: number; name: string; pricePerPageCents: number; minPages: number; currency: string; allowsCustomDimensions: boolean };
type Session = { customerName: string; title: string; frontCoverUrl: string; backCoverUrl: string | null };
type FormatDialogMode = "initial" | "change" | null;
type DraftState = Record<string, unknown>;

export default function CustomPhotobookFullEditorClient() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [formatDialogMode, setFormatDialogMode] = useState<FormatDialogMode>(null);
  const [formatResolved, setFormatResolved] = useState(false);
  const [formatDraft, setFormatDraft] = useState<DraftState | null>(null);
  const [formatUpdate, setFormatUpdate] = useState<DraftState | null>(null);
  const [needsFormatCorrection, setNeedsFormatCorrection] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/photobook/custom-editor/session").then((response) => response.ok ? response.json() : null),
      fetch("/api/photobook/products").then((response) => response.ok ? response.json() : []),
      fetch("/api/photobook/custom-editor/draft").then((response) => response.ok ? response.json() : { state: {} }),
    ]).then(([editorSession, editorProducts, draft]) => {
      if (!editorSession) {
        router.replace("/photobooks/acceso");
        return;
      }
      setSession(editorSession as Session);
      setProducts(editorProducts as Product[]);
      const state = (draft as { state?: DraftState & { formatConfigured?: boolean; pages?: unknown[]; coverType?: string } }).state;
      const sheets = Array.isArray(state?.pages) ? state.pages.length / 2 : 0;
      const allowedSheets = state?.coverType === "TAPA_DELGADA"
        ? [15, 20, 25, 35]
        : state?.coverType === "TAPA_GRUESA"
          ? [15, 20, 25, 35, 50]
          : [];
      if (state?.formatConfigured !== true) setFormatDialogMode("initial");
      else if (!Number.isInteger(sheets) || !allowedSheets.includes(sheets)) {
        setFormatDraft(state);
        setNeedsFormatCorrection(true);
        setFormatDialogMode("change");
      }
      setFormatResolved(true);
    }).catch(() => router.replace("/photobooks/acceso"));
  }, [router]);

  if (!session || !products || !formatResolved) {
    return <main style={{ minHeight: "60vh", display: "grid", placeItems: "center", color: "#63737d", fontSize: "14px" }}>Preparando tu photobook...</main>;
  }

  function handleFormatConfigured(nextDraft: DraftState) {
    if (formatDialogMode === "change") setFormatUpdate(nextDraft);
    setNeedsFormatCorrection(false);
    setFormatDraft(null);
    setFormatDialogMode(null);
  }

  if (formatDialogMode === "initial") {
    return <CustomPhotobookSheetSetup products={products} mode="initial" onConfigured={handleFormatConfigured} />;
  }

  return (
    <>
      <PhotobookEditorClient
        temaSlug="a-medida"
        temaNombre={session.title}
        themeId={null}
        products={products}
        coverUrl={session.frontCoverUrl}
        backCoverUrl={session.backCoverUrl}
        customEditor
        isFormatChangeOpen={formatDialogMode === "change"}
        formatUpdate={formatUpdate ?? undefined}
        onChangeFormat={(currentDraft) => {
          const pages = Array.isArray(currentDraft.pages) ? currentDraft.pages : [];
          const sheets = pages.length / 2;
          const allowed = currentDraft.coverType === "TAPA_DELGADA"
                ? [15, 20, 25, 35]
                : currentDraft.coverType === "TAPA_GRUESA"
                  ? [15, 20, 25, 35, 50]
                  : [];
          setNeedsFormatCorrection(currentDraft.formatConfigured !== true || !Number.isInteger(sheets) || !allowed.includes(sheets));
          setFormatDraft(currentDraft);
          setFormatDialogMode("change");
        }}
      />
      {formatDialogMode && <CustomPhotobookSheetSetup products={products} mode={formatDialogMode} initialDraft={formatDialogMode === "change" ? formatDraft ?? undefined : undefined} correctionNotice={needsFormatCorrection} onConfigured={handleFormatConfigured} onCancel={() => { setFormatDraft(null); setFormatDialogMode(null); }} />}
    </>
  );
}
