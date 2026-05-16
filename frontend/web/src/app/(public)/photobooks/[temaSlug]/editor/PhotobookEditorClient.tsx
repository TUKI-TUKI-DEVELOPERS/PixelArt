"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { usePhotoUpload, UploadedPhoto } from "@/hooks/usePhotoUpload";
import { useWindowSize } from "@/hooks/useWindowSize";
import PhotobookPreview from "@/components/PhotobookPreview";
import PhotobookSpreadEditor from "@/components/PhotobookSpreadEditor";
import interact from "interactjs";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
const ACCENT = "#804187";
const LOW_RES_THRESHOLD = 1000;
const MIN_HOJAS = 15;
const MIN_CARAS = MIN_HOJAS * 2; // 30 caras mínimo
const RUSH_FEE_CENTS = 2500; // S/ 25
const MIN_NORMAL_DAYS = 4;
const MIN_RUSH_DAYS = 2;

function getMinDate(rush: boolean): string {
  const d = new Date();
  d.setDate(d.getDate() + (rush ? MIN_RUSH_DAYS : MIN_NORMAL_DAYS));
  return d.toISOString().split("T")[0];
}
function getMaxDate(rush: boolean): string | undefined {
  if (!rush) return undefined;
  const d = new Date();
  d.setDate(d.getDate() + MIN_NORMAL_DAYS - 1);
  return d.toISOString().split("T")[0];
}

type CoverType = "TAPA_DELGADA" | "TAPA_GRUESA";

const BASE_CENTS: Record<CoverType, number> = {
  TAPA_DELGADA: 9000,   // S/ 90 por 15 hojas
  TAPA_GRUESA:  12000,  // S/ 120 por 15 hojas
};
const EXTRA_PER_HOJA_CENTS: Record<CoverType, number> = {
  TAPA_DELGADA: 300,    // S/ 3 por hoja adicional
  TAPA_GRUESA:  400,    // S/ 4 por hoja adicional
};

function getPriceCents(coverType: CoverType, hojas: number): number | null {
  if (hojas < MIN_HOJAS) return null;
  return BASE_CENTS[coverType] + (hojas - MIN_HOJAS) * EXTRA_PER_HOJA_CENTS[coverType];
}

function fmtPrice(cents: number): string {
  return `S/ ${(cents / 100).toFixed(0)}`;
}

const LAYOUTS: { key: string; label: string; slots: number }[] = [
  { key: "FULL_1", label: "1 foto", slots: 1 },
  { key: "GRID_2", label: "2 fotos", slots: 2 },
  { key: "GRID_3", label: "3 fotos", slots: 3 },
  { key: "GRID_4", label: "4 fotos", slots: 4 },
];

type PageData = {
  pageNumber: number;
  layoutKey: string;
  slots: (UploadedPhoto | null)[];
  slotPositions?: Record<number, { x: number; y: number }>;
};

type Product = { id: number; name: string; pricePerPageCents: number; minPages: number; currency: string; allowsCustomDimensions: boolean };

type Props = {
  temaSlug: string;
  temaNombre: string;
  themeId: number | null;
  products: Product[];
  coverUrl: string | null;
  backCoverUrl: string | null;
};

const STEPS = [
  { number: 1, label: "Subir Fotos" },
  { number: 2, label: "Editor" },
  { number: 3, label: "Preview" },
  { number: 4, label: "Datos" },
  { number: 5, label: "Confirmar" },
];

/* ── localStorage helpers ── */
function saveDraft(key: string, data: object) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch { /* quota */ }
}
function loadDraft(key: string) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
function clearDraft(key: string) {
  try { localStorage.removeItem(key); } catch { /* */ }
}

export default function PhotobookEditorClient({ temaSlug, temaNombre, themeId, products, coverUrl, backCoverUrl }: Props) {
  const draftKey = `photobook_draft_${temaSlug}`;
  const { isMobile: isMobileHook } = useWindowSize();
  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    const check = () => setIsNarrow(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const isMobile = isMobileHook || isNarrow;

  const [step, setStep] = useState(1);
  const [mobilePageIdx, setMobilePageIdx] = useState(0);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const { photos, pendingDuplicates, uploading, progress, uploadFiles, removePhoto, resolveDuplicate, restorePhotos } = usePhotoUpload("uploads/photobooks");

  const [pages, setPages] = useState<PageData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.id ?? 0);

  const [coverType, setCoverType] = useState<CoverType>("TAPA_DELGADA");
  const [wantsRush, setWantsRush] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: "", email: "", phone: "", deliveryAddress: "", deliveryDistrict: "", deliveryCity: "", deliveryRegion: "", deliveryDepartment: "", customerDni: "", desiredDeliveryDate: "" });
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // #2 Filter toggle
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  // #6 Duplicate alert
  const [dupAlert, setDupAlert] = useState<string | null>(null);
  const dupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // #12 Zoom modal
  const [zoomPageIdx, setZoomPageIdx] = useState<number | null>(null);

  // Auto-distribute modal
  const [autoDistributeOpen, setAutoDistributeOpen] = useState(false);

  // Incomplete pages warning (step 2 → 3)
  const [incompleteWarningOpen, setIncompleteWarningOpen] = useState(false);

  // Delete page confirmation modal
  const [deletePageIdx, setDeletePageIdx] = useState<number | null>(null);

  // #13 Draft restored flag
  const [hasDraft, setHasDraft] = useState(false);

  // #3 Drag-over sidebar
  const [sidebarDragOver, setSidebarDragOver] = useState(false);

  const product = products.find((p) => p.id === selectedProduct);
  const minPages = MIN_CARAS; // 30 caras = 15 hojas mínimo
  const totalPages = pages.length;
  const hojas = Math.ceil(totalPages / 2);
  const totalCents = (getPriceCents(coverType, hojas) ?? 0) + (wantsRush ? RUSH_FEE_CENTS : 0);

  // Derive placed photo IDs
  const placedPhotoIds = useMemo(() => {
    const ids = new Set<number>();
    for (const page of pages) {
      for (const slot of page.slots) {
        if (slot) ids.add(slot.id);
      }
    }
    return ids;
  }, [pages]);

  // #2 Filtered photos for sidebar
  const visiblePhotos = useMemo(() => {
    if (!showOnlyAvailable) return photos;
    return photos.filter((p) => !placedPhotoIds.has(p.id));
  }, [photos, placedPhotoIds, showOnlyAvailable]);

  // Refs for latest state
  const photosRef = useRef(photos);
  photosRef.current = photos;
  const pagesRef = useRef(pages);
  pagesRef.current = pages;

  const didInitRef = useRef(false);

  // #13 Load draft on mount + apply initial cover/hojas from detail page
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;

    // If the user just came from the detail page with an explicit selection,
    // that ALWAYS takes priority over any existing draft.
    try {
      const initialCover = localStorage.getItem(`photobook_initial_cover_${temaSlug}`);
      const initialHojasRaw = localStorage.getItem(`photobook_initial_hojas_${temaSlug}`);

      if (initialHojasRaw !== null) {
        const initialHojas = parseInt(initialHojasRaw, 10);
        if (initialCover === "TAPA_DELGADA" || initialCover === "TAPA_GRUESA") {
          setCoverType(initialCover);
        }
        if (initialHojas >= MIN_HOJAS) {
          const caras = initialHojas * 2;
          setPages(Array.from({ length: caras }, (_, i) => ({
            pageNumber: i + 1,
            layoutKey: "FULL_1",
            slots: [null],
          })));
        }
        localStorage.removeItem(`photobook_initial_cover_${temaSlug}`);
        localStorage.removeItem(`photobook_initial_hojas_${temaSlug}`);
        return;
      }
    } catch { /* */ }

    // No incoming selection — check for a saved draft
    // Only show restore banner if the draft has real content (photos or placed pages)
    const draft = loadDraft(draftKey);
    if (draft && (draft.photos?.length > 0 || draft.pages?.some((p: PageData) => p.slots.some(Boolean)))) {
      setHasDraft(true);
    }
  }, [draftKey, temaSlug]);

  function restoreDraft() {
    const draft = loadDraft(draftKey);
    if (!draft) return;
    if (draft.pages) setPages(draft.pages);
    if (draft.photos?.length > 0) restorePhotos(draft.photos);
    if (draft.step) setStep(draft.step);
    if (draft.form) setForm(draft.form);
    if (draft.coverType) setCoverType(draft.coverType);
    if (draft.selectedProduct) setSelectedProduct(draft.selectedProduct);
    if (draft.customWidth) setCustomWidth(draft.customWidth);
    if (draft.customHeight) setCustomHeight(draft.customHeight);
    if (draft.wantsRush !== undefined) setWantsRush(draft.wantsRush);
    setHasDraft(false);
  }

  function discardDraft() {
    clearDraft(draftKey);
    setHasDraft(false);
  }

  // #13 Auto-save draft on changes
  useEffect(() => {
    if (pages.length === 0 && step <= 1) return;
    // Don't save a draft of all-empty pages at step 1 (pre-created but no work done yet)
    const hasAnyPlaced = pages.some((p) => p.slots.some(Boolean));
    if (!hasAnyPlaced && photos.length === 0 && step <= 1) return;
    const timer = setTimeout(() => {
      saveDraft(draftKey, {
        pages: pages.map((p) => ({
          ...p,
          slots: p.slots.map((s) => s ? { id: s.id, contentHash: s.contentHash, preview: s.url || s.preview, url: s.url, thumbnailUrl: s.thumbnailUrl, width: s.width, height: s.height, originalFilename: s.originalFilename, storageKey: s.storageKey } : null),
        })),
        photos: photos.map((p) => ({
          id: p.id,
          storageKey: p.storageKey,
          contentHash: p.contentHash,
          url: p.url,
          thumbnailUrl: p.thumbnailUrl,
          width: p.width,
          height: p.height,
          originalFilename: p.originalFilename,
          preview: p.url, // always CDN URL — blob URLs don't survive page reload
        })),
        step,
        form,
        coverType,
        wantsRush,
        selectedProduct,
        customWidth,
        customHeight,
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [pages, photos, step, form, selectedProduct, customWidth, customHeight, draftKey]);

  // Auto-distribute
  function buildPhotoPool(): UploadedPhoto[] {
    const map = new Map<number, UploadedPhoto>();
    for (const p of photos) map.set(p.id, p);
    for (const page of pages) {
      for (const slot of page.slots) {
        if (slot && !map.has(slot.id)) map.set(slot.id, slot as UploadedPhoto);
      }
    }
    return [...map.values()];
  }

  function openAutoDistribute() {
    if (buildPhotoPool().length === 0) return;
    setAutoDistributeOpen(true);
  }

  function runAutoDistribute(slotsPerPage: number) {
    const allPhotos = buildPhotoPool();
    if (allPhotos.length === 0) return;
    const layout = LAYOUTS.find((l) => l.slots === slotsPerPage)!;
    const newPages: PageData[] = [];
    let photoIdx = 0;
    let pageNum = 1;
    while (photoIdx < allPhotos.length) {
      const slots: (UploadedPhoto | null)[] = [];
      for (let i = 0; i < slotsPerPage; i++) {
        slots.push(allPhotos[photoIdx] ?? null);
        photoIdx++;
      }
      newPages.push({ pageNumber: pageNum, layoutKey: layout.key, slots });
      pageNum++;
    }
    while (newPages.length < minPages) {
      newPages.push({ pageNumber: newPages.length + 1, layoutKey: "FULL_1", slots: [null] });
    }
    setPages(newPages);
    setAutoDistributeOpen(false);
  }

  function addPage() {
    setPages((prev) => [...prev, { pageNumber: prev.length + 1, layoutKey: "FULL_1", slots: [null] }]);
  }

  function changeLayout(pageIdx: number, layoutKey: string) {
    const layout = LAYOUTS.find((l) => l.key === layoutKey)!;
    setPages((prev) => {
      const copy = [...prev];
      const oldSlots = copy[pageIdx].slots;
      const newSlots: (UploadedPhoto | null)[] = [];
      for (let i = 0; i < layout.slots; i++) {
        newSlots.push(oldSlots[i] ?? null);
      }
      copy[pageIdx] = { ...copy[pageIdx], layoutKey, slots: newSlots };
      return copy;
    });
  }

  // #6 Check duplicate and show alert
  function showDupAlertIfNeeded(photo: UploadedPhoto) {
    if (placedPhotoIds.has(photo.id)) {
      if (dupTimerRef.current) clearTimeout(dupTimerRef.current);
      setDupAlert(`"${photo.originalFilename}" ya está en otra página`);
      dupTimerRef.current = setTimeout(() => setDupAlert(null), 3000);
    }
  }

  function assignPhoto(pageIdx: number, slotIdx: number, photo: UploadedPhoto) {
    showDupAlertIfNeeded(photo);
    setPages((prev) => {
      const copy = [...prev];
      copy[pageIdx] = {
        ...copy[pageIdx],
        slots: copy[pageIdx].slots.map((s, i) => i === slotIdx ? photo : s),
      };
      return copy;
    });
  }

  const assignPhotoById = useCallback((pageIdx: number, slotIdx: number, photoId: number) => {
    const photo = photosRef.current.find((p) => p.id === photoId);
    if (photo) assignPhoto(pageIdx, slotIdx, photo);
  }, []);

  // Clamp mobilePageIdx when pages are deleted
  useEffect(() => {
    if (pages.length > 0 && mobilePageIdx >= pages.length) {
      setMobilePageIdx(pages.length - 1);
    }
  }, [pages.length, mobilePageIdx]);

  // Mobile: tap on a slot selects it (or deselects if same)
  function handleMobileSlotTap(pageIdx: number, slotIdx: number) {
    const id = `${pageIdx}-${slotIdx}`;
    setSelectedSlotId((prev) => (prev === id ? null : id));
  }

  // Mobile: tap a photo from the strip
  function handleMobilePhotoTap(photo: UploadedPhoto) {
    if (selectedSlotId) {
      const [pageIdx, slotIdx] = selectedSlotId.split("-").map(Number);
      assignPhoto(pageIdx, slotIdx, photo);
      setSelectedSlotId(null);
      return;
    }
    // No slot selected → assign to first empty slot of current page
    const page = pagesRef.current[mobilePageIdx];
    if (!page) return;
    const emptyIdx = page.slots.findIndex((s) => s === null);
    if (emptyIdx !== -1) {
      assignPhoto(mobilePageIdx, emptyIdx, photo);
    }
  }

  const handleRemoveFromPage = useCallback((pageIdx: number, slotIdx: number) => {
    setPages((prev) => {
      const copy = [...prev];
      copy[pageIdx] = {
        ...copy[pageIdx],
        slots: copy[pageIdx].slots.map((s, i) => i === slotIdx ? null : s),
      };
      return copy;
    });
  }, []);

  const updateSlotPosition = useCallback((pageIdx: number, slotIdx: number, x: number, y: number) => {
    setPages((prev) => {
      const copy = [...prev];
      copy[pageIdx] = {
        ...copy[pageIdx],
        slotPositions: { ...copy[pageIdx].slotPositions, [slotIdx]: { x, y } },
      };
      return copy;
    });
  }, []);

  // Swap two slots within the same page
  const handleSwapSlots = useCallback((pageIdx: number, fromSlot: number, toSlot: number) => {
    if (fromSlot === toSlot) return;
    setPages((prev) => {
      const copy = [...prev];
      const page = { ...copy[pageIdx], slots: [...copy[pageIdx].slots] };
      const temp = page.slots[fromSlot];
      page.slots[fromSlot] = page.slots[toSlot];
      page.slots[toSlot] = temp;
      copy[pageIdx] = page;
      return copy;
    });
  }, []);

  function handleDeletePhoto(uid: number) {
    const photo = photos.find((p) => p.uid === uid);
    if (photo) {
      setPages((prev) =>
        prev.map((page) => ({
          ...page,
          slots: page.slots.map((s) => (s && s.id === photo.id ? null : s)),
        }))
      );
    }
    removePhoto(uid);
  }

  // #7 Delete page
  function handleDeletePage(pageIdx: number) {
    const page = pages[pageIdx];
    const hasPhotos = page?.slots.some(Boolean);
    if (hasPhotos) { setDeletePageIdx(pageIdx); return; }
    setPages((prev) => {
      const copy = prev.filter((_, i) => i !== pageIdx);
      return copy.map((p, i) => ({ ...p, pageNumber: i + 1 }));
    });
  }

  // #8 Duplicate page
  function handleDuplicatePage(pageIdx: number) {
    setPages((prev) => {
      const page = prev[pageIdx];
      const newPage = { ...page, pageNumber: prev.length + 1, slots: [...page.slots] };
      const copy = [...prev];
      copy.splice(pageIdx + 1, 0, newPage);
      return copy.map((p, i) => ({ ...p, pageNumber: i + 1 }));
    });
  }

  // #9 Reorder pages
  function handleReorderPages(fromIdx: number, toIdx: number) {
    if (fromIdx === toIdx) return;
    setPages((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIdx, 1);
      copy.splice(toIdx, 0, moved);
      return copy.map((p, i) => ({ ...p, pageNumber: i + 1 }));
    });
  }

  // interact.js drag
  useEffect(() => {
    if (step !== 2) return;
    const timer = setTimeout(() => {
      interact(".draggable-photo").draggable({
        inertia: true,
        autoScroll: true,
        listeners: {
          start(event) {
            const t = event.target as HTMLElement;
            t.style.zIndex = "9999";
            t.style.opacity = "0.75";
            t.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
          },
          move(event) {
            const t = event.target as HTMLElement;
            const x = (parseFloat(t.getAttribute("data-x") || "0")) + event.dx;
            const y = (parseFloat(t.getAttribute("data-y") || "0")) + event.dy;
            t.style.translate = `${x}px ${y}px`;
            t.setAttribute("data-x", String(x));
            t.setAttribute("data-y", String(y));
          },
          end(event) {
            const t = event.target as HTMLElement;
            t.style.zIndex = "";
            t.style.opacity = "";
            t.style.boxShadow = "";
            t.style.translate = "";
            t.setAttribute("data-x", "0");
            t.setAttribute("data-y", "0");
          },
        },
      });
    }, 150);
    return () => clearTimeout(timer);
  }, [step]);

  async function handleSubmit() {
    if (!themeId || !product) return;
    setSubmitting(true);
    try {
      const body = {
        photobookProductId: product.id,
        photobookThemeId: themeId,
        coverType,
        customerEmail: form.email,
        customerFullName: form.name,
        customerPhone: form.phone,
        deliveryAddress: form.deliveryAddress,
        ...(form.deliveryDistrict ? { deliveryDistrict: form.deliveryDistrict } : {}),
        ...(form.deliveryCity ? { deliveryCity: form.deliveryCity } : {}),
        ...(form.deliveryRegion ? { deliveryRegion: form.deliveryRegion } : {}),
        ...(form.deliveryDepartment ? { deliveryDepartment: form.deliveryDepartment } : {}),
        customerDni: form.customerDni,
        ...(form.desiredDeliveryDate ? { desiredDeliveryDate: form.desiredDeliveryDate } : {}),
        wantsRush,
        rushFeeCents: wantsRush ? RUSH_FEE_CENTS : 0,
        ...(product.allowsCustomDimensions && customWidth && customHeight ? { customWidthCm: parseFloat(customWidth), customHeightCm: parseFloat(customHeight) } : {}),
        pricePerPageCents: product.pricePerPageCents,
        pages: pages.map((p) => ({
          pageNumber: p.pageNumber,
          layoutKey: p.layoutKey,
          slots: p.slots.filter(Boolean).map((s, i) => ({ assetId: s!.id, slotIndex: i })),
        })),
        assetIds: photos.map((p) => p.id),
      };
      const res = await fetch(`${API}/api/photobook/projects`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error((err as { message?: string }).message ?? "Error"); }
      setSubmitted(true);
      clearDraft(draftKey); // #13
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error");
    } finally {
      setSubmitting(false);
    }
  }

  // #3 Sidebar drag-over handlers for OS file drop
  function handleSidebarDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.types.includes("Files")) setSidebarDragOver(true);
  }
  function handleSidebarDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setSidebarDragOver(false);
  }
  function handleSidebarDrop(e: React.DragEvent) {
    e.preventDefault();
    setSidebarDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length) uploadFiles(Array.from(files));
  }

  return (
    <div style={{ minHeight: "100vh", background: step === 3 ? "#f5f0e8" : "#f8f8fa" }}>
      {/* #13 Draft restoration banner */}
      {hasDraft && step === 1 && (
        <div style={{ background: "#fef3c7", borderBottom: "1px solid #fde68a", padding: "10px 48px", display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: "#92400e" }}>Tienes un borrador guardado.</span>
          <button onClick={restoreDraft} style={{ padding: "5px 14px", borderRadius: 6, border: "none", background: ACCENT, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Restaurar</button>
          <button onClick={discardDraft} style={{ padding: "5px 14px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", color: "#666", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Descartar</button>
        </div>
      )}

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: isMobile ? "10px 16px" : "14px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: ACCENT, textTransform: "uppercase", letterSpacing: "1px" }}>PHOTOBOOK</div>
          <div style={{ fontSize: isMobile ? "13px" : "16px", fontWeight: 700, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{temaNombre}</div>
        </div>
        {/* Steps — show icons only on mobile */}
        <div style={{ display: "flex", gap: isMobile ? "6px" : "4px" }}>
          {STEPS.map((s) => (
            <button key={s.number} onClick={() => s.number <= step && setStep(s.number)} style={{ display: "flex", alignItems: "center", gap: "4px", padding: isMobile ? "4px 6px" : "6px 10px", borderRadius: "8px", border: step === s.number ? `2px solid ${ACCENT}` : "1px solid #e5e7eb", background: step === s.number ? `${ACCENT}10` : step > s.number ? "#f0fdf4" : "#fff", cursor: s.number <= step ? "pointer" : "default", fontFamily: "inherit" }}>
              <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: step === s.number ? ACCENT : step > s.number ? "#22c55e" : "#d0d0d0", color: "#fff", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{step > s.number ? "✓" : s.number}</span>
              {!isMobile && <span style={{ fontSize: "11px", fontWeight: 600, color: step === s.number ? ACCENT : "#999" }}>{s.label}</span>}
            </button>
          ))}
        </div>
        <div style={{ fontSize: "12px", color: "#999", flexShrink: 0 }}>Paso {step}/5</div>
      </div>

      <div style={{ maxWidth: step === 2 ? "none" : "1000px", margin: "0 auto", padding: step === 2 ? (isMobile ? "0 0 90px" : "32px 16px 120px") : (isMobile ? "16px 16px 120px" : "32px 48px 120px") }}>
        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 style={{ margin: "0 0 8px", fontSize: isMobile ? "20px" : "24px", fontWeight: 800 }}>Sube tus fotos</h2>
            <p style={{ margin: "0 0 20px", fontSize: "14px", color: "#666" }}>Mínimo {MIN_HOJAS} hojas ({MIN_CARAS} caras). Puedes subir más para tener opciones.</p>

            <div
              onClick={() => { const input = document.createElement("input"); input.type = "file"; input.accept = "image/*"; input.multiple = true; input.onchange = (e) => { const files = (e.target as HTMLInputElement).files; if (files) uploadFiles(Array.from(files)); }; input.click(); }}
              style={{ width: "100%", minHeight: isMobile ? "80px" : "120px", borderRadius: "16px", border: "2px dashed #d0d0d0", background: "#fafafa", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", padding: "20px", cursor: "pointer", marginBottom: "16px" }}
            >
              <div style={{ fontSize: "24px" }}>+</div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#555" }}>{isMobile ? "Subir fotos" : "Agregar Fotos"}</div>
              {!isMobile && <div style={{ fontSize: "12px", color: "#999" }}>o arrastra aquí</div>}
            </div>

            {/* Avisos de fotos duplicadas */}
            {pendingDuplicates.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                {pendingDuplicates.map((d) => (
                  <div key={d.photo.uid} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", borderRadius: "12px", background: "#fffbeb", border: "1px solid #fcd34d" }}>
                    <img src={d.photo.preview} alt="" style={{ width: "40px", height: "40px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#92400e", marginBottom: "2px" }}>
                        Ya subiste esta foto
                      </div>
                      <div style={{ fontSize: "12px", color: "#b45309", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.existingFilename}</div>
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                      <button onClick={() => resolveDuplicate(d.photo.uid, "add")} style={{ padding: "5px 12px", borderRadius: "8px", border: "none", background: ACCENT, color: "#fff", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                        Agregar igual
                      </button>
                      <button onClick={() => resolveDuplicate(d.photo.uid, "skip")} style={{ padding: "5px 10px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", color: "#6b7280", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                        Ignorar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {uploading && (
              <div style={{ marginBottom: "12px" }}>
                <div style={{ fontSize: "13px", color: "#999", marginBottom: 4 }}>Subiendo... {progress}%</div>
                <div style={{ width: "100%", height: 4, borderRadius: 2, background: "#eee", overflow: "hidden" }}>
                  <div style={{ width: `${progress}%`, height: "100%", background: ACCENT, borderRadius: 2, transition: "width 0.3s" }} />
                </div>
              </div>
            )}
            {photos.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(6, 1fr)", gap: "8px", marginBottom: "16px" }}>
                {photos.map((p) => (
                  <div key={p.uid} style={{ position: "relative", aspectRatio: "1", borderRadius: "8px", overflow: "hidden" }}>
                    <img src={p.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <button onClick={() => removePhoto(p.uid)} style={{ position: "absolute", top: "3px", right: "3px", width: isMobile ? "24px" : "20px", height: isMobile ? "24px" : "20px", borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: "11px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                  </div>
                ))}
              </div>
            )}
            <div style={{ fontSize: "14px", color: "#888", marginBottom: "20px" }}>{photos.length} fotos subidas</div>
          </div>
        )}

        {/* Step 2: Editor — Desktop */}
        {step === 2 && !isMobile && (
          <div style={{ display: "flex", gap: 0, alignItems: "flex-start", userSelect: "none", WebkitUserSelect: "none" }}>
            {/* ── Left sidebar ── */}
            <div
              onDragOver={handleSidebarDragOver}
              onDragLeave={handleSidebarDragLeave}
              onDrop={handleSidebarDrop}
              style={{
                width: 280, flexShrink: 0,
                background: "#fff", borderRadius: "14px",
                border: sidebarDragOver ? `2px solid ${ACCENT}` : "1px solid #eee",
                display: "flex", flexDirection: "column",
                marginRight: 16,
                transition: "border-color 0.2s",
              }}
            >
              <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#111", marginBottom: 10 }}>Mis Fotos</div>
                <div
                  onClick={() => { const input = document.createElement("input"); input.type = "file"; input.accept = "image/*"; input.multiple = true; input.onchange = (e) => { const files = (e.target as HTMLInputElement).files; if (files) uploadFiles(Array.from(files)); }; input.click(); }}
                  style={{ width: "100%", padding: "10px 0", borderRadius: 10, border: `2px dashed ${ACCENT}40`, background: sidebarDragOver ? `${ACCENT}15` : `${ACCENT}08`, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", transition: "background 0.15s" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span style={{ fontSize: 12, fontWeight: 600, color: ACCENT }}>{sidebarDragOver ? "Suelta aquí" : "Subir fotos"}</span>
                  <span style={{ fontSize: 10, color: "#999" }}>PC, celular o tablet</span>
                </div>
                {uploading && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>Subiendo... {progress}%</div>
                    <div style={{ width: "100%", height: 4, borderRadius: 2, background: "#eee", overflow: "hidden" }}>
                      <div style={{ width: `${progress}%`, height: "100%", background: ACCENT, borderRadius: 2, transition: "width 0.3s" }} />
                    </div>
                  </div>
                )}
                {pendingDuplicates.length > 0 && (
                  <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                    {pendingDuplicates.map((d) => (
                      <div key={d.photo.uid} style={{ padding: "8px 10px", borderRadius: 10, background: "#fffbeb", border: "1px solid #fcd34d" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                          <img src={d.photo.preview} alt="" style={{ width: 32, height: 32, borderRadius: 5, objectFit: "cover", flexShrink: 0 }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e" }}>Ya subiste esta foto</div>
                            <div style={{ fontSize: 10, color: "#b45309", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.existingFilename}</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 5 }}>
                          <button onClick={() => resolveDuplicate(d.photo.uid, "add")} style={{ flex: 1, padding: "4px 0", borderRadius: 7, border: "none", background: ACCENT, color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                            Agregar igual
                          </button>
                          <button onClick={() => resolveDuplicate(d.photo.uid, "skip")} style={{ flex: 1, padding: "4px 0", borderRadius: 7, border: "1px solid #e5e7eb", background: "#fff", color: "#6b7280", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                            Ignorar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ padding: 12 }}>
                {photos.length > 0 ? (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 }}>Fotos ({visiblePhotos.length})</div>
                      <button onClick={() => setShowOnlyAvailable((v) => !v)} style={{ fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", padding: "2px 8px", borderRadius: 4, border: showOnlyAvailable ? `1px solid ${ACCENT}` : "1px solid #ddd", background: showOnlyAvailable ? `${ACCENT}15` : "#fff", color: showOnlyAvailable ? ACCENT : "#999" }}>
                        {showOnlyAvailable ? "Todas" : "Disponibles"}
                      </button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                      {visiblePhotos.map((p) => {
                        const isPlaced = placedPhotoIds.has(p.id);
                        const isLowRes = (p.width && p.width < LOW_RES_THRESHOLD) || (p.height && p.height < LOW_RES_THRESHOLD);
                        return (
                          <div key={p.uid} className="draggable-photo" data-photo-id={p.id} title={`${p.originalFilename}${p.width && p.height ? ` — ${p.width}×${p.height}` : ""}`} style={{ position: "relative", aspectRatio: "1", borderRadius: 6, overflow: "hidden", cursor: "grab", touchAction: "none", border: isPlaced ? `2px solid ${ACCENT}` : "2px solid transparent", opacity: isPlaced ? 0.7 : 1 }}>
                            <img src={p.preview} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }} />
                            {isPlaced && <div style={{ position: "absolute", top: 3, left: 3, width: 18, height: 18, borderRadius: "50%", background: ACCENT, color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>✓</div>}
                            {isLowRes && !isPlaced && <div style={{ position: "absolute", top: 3, left: 3, width: 18, height: 18, borderRadius: "50%", background: "#f59e0b", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>!</div>}
                            {isLowRes && isPlaced && <div style={{ position: "absolute", bottom: 3, left: 3, width: 18, height: 18, borderRadius: "50%", background: "#f59e0b", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>!</div>}
                            <button onClick={(e) => { e.stopPropagation(); handleDeletePhoto(p.uid); }} style={{ position: "absolute", top: 3, right: 3, width: 18, height: 18, borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>x</button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "24px 8px", color: "#bbb", fontSize: 13 }}>Sube fotos para comenzar</div>
                )}
              </div>
              <div style={{ padding: "12px 16px", borderTop: "1px solid #f0f0f0", display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontSize: 11, color: "#999", textAlign: "center" }}>{placedPhotoIds.size} de {photos.length} colocadas</div>
                {totalPages > 0 && (
                  <div style={{ textAlign: "center", marginBottom: 2 }}>
                    <div style={{ fontSize: 11, color: "#999" }}>{hojas} hoja{hojas !== 1 ? "s" : ""} · {coverType === "TAPA_GRUESA" ? "Tapa Gruesa" : "Tapa Delgada"}</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: totalCents > 0 ? ACCENT : "#f59e0b" }}>
                      {totalCents > 0 ? fmtPrice(totalCents) : `Mín ${MIN_HOJAS} hojas`}
                    </div>
                  </div>
                )}
                <button onClick={openAutoDistribute} style={{ width: "100%", padding: "9px 0", borderRadius: 8, border: "none", background: ACCENT, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Auto-distribuir</button>
                <button onClick={addPage} style={{ width: "100%", padding: "9px 0", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>+ Agregar página</button>
              </div>
            </div>

            {/* ── Right: spread editor ── */}
            <div style={{ flex: 1, minWidth: 0, position: "sticky", top: 16, maxHeight: "calc(100vh - 32px)", overflowY: "auto" }}>
              {dupAlert && (
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 50, padding: "8px 20px", borderRadius: 8, background: "#fef3c7", border: "1px solid #fde68a", fontSize: 12, fontWeight: 600, color: "#92400e", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                  {dupAlert}
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, padding: "0 8px" }}>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#111" }}>Editor de Páginas</h2>
                <span style={{ fontSize: 13, color: "#999" }}>{pages.length} páginas</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", marginBottom: 12, marginLeft: 8, background: `${ACCENT}0d`, border: `1px solid ${ACCENT}30`, borderRadius: 10, fontSize: 12, color: "#555" }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
                <span><strong style={{ color: ACCENT }}>Doble clic</strong> sobre una foto para mover el encuadre dentro del slot. Arrastra para elegir qué parte de la foto quieres mostrar.</span>
              </div>
              {pages.length > 0 ? (
                <PhotobookSpreadEditor pages={pages} accent={ACCENT} layouts={LAYOUTS} onChangeLayout={changeLayout} onAssignPhoto={assignPhotoById} onRemovePhoto={handleRemoveFromPage} onDeletePage={handleDeletePage} onDuplicatePage={handleDuplicatePage} onReorderPages={handleReorderPages} onClickPage={(idx) => setZoomPageIdx(idx)} onSwapSlots={handleSwapSlots} onUpdateSlotPosition={updateSlotPosition} coverUrl={coverUrl} backCoverUrl={backCoverUrl} />
              ) : (
                <div style={{ textAlign: "center", padding: "80px 24px", color: "#999", background: "#fff", borderRadius: 14, border: "1px solid #eee" }}>
                  <div style={{ fontSize: 36, marginBottom: 12, opacity: 0.4 }}>+</div>
                  <div style={{ fontSize: 14 }}>Sube fotos y presiona &quot;Auto-distribuir&quot;</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Editor — Mobile */}
        {step === 2 && isMobile && (
          <div style={{ display: "flex", flexDirection: "column", userSelect: "none", WebkitUserSelect: "none" }}>

            {dupAlert && (
              <div style={{ margin: "10px 16px 0", padding: "10px 14px", borderRadius: 8, background: "#fef3c7", border: "1px solid #fde68a", fontSize: 13, fontWeight: 600, color: "#92400e" }}>
                {dupAlert}
              </div>
            )}

            {/* ── Canvas full-bleed ── */}
            <div style={{ background: "#ede8e0", paddingTop: 12, paddingBottom: 16 }}>
              <div style={{ textAlign: "center", fontSize: 13, fontWeight: 600, color: "#8c7e6e", marginBottom: 10, letterSpacing: 0.3 }}>
                {pages.length > 0 ? `Página ${mobilePageIdx + 1} de ${pages.length}` : "Sin páginas"}
              </div>

              {pages.length > 0 ? (
                <div style={{ width: "100%", padding: "0 48px" }}>
                  <PhotobookSpreadEditor
                    pages={pages} accent={ACCENT} layouts={LAYOUTS}
                    isMobile={true} mobilePageIdx={mobilePageIdx}
                    selectedSlotId={selectedSlotId} onSlotTap={handleMobileSlotTap}
                    onChangeLayout={changeLayout} onAssignPhoto={assignPhotoById}
                    onRemovePhoto={handleRemoveFromPage} onDeletePage={handleDeletePage}
                    onDuplicatePage={handleDuplicatePage} onReorderPages={handleReorderPages}
                    onClickPage={(idx) => setZoomPageIdx(idx)} onSwapSlots={handleSwapSlots}
                    onUpdateSlotPosition={updateSlotPosition}
                    coverUrl={coverUrl} backCoverUrl={backCoverUrl}
                  />
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "32px 24px", color: "#a09080", fontSize: 14 }}>
                  Sube fotos y presioná Auto-distribuir
                </div>
              )}

              {/* Page navigation */}
              {pages.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 14 }}>
                  <button
                    onClick={() => setMobilePageIdx((p) => Math.max(0, p - 1))}
                    disabled={mobilePageIdx === 0}
                    style={{ width: 42, height: 42, borderRadius: "50%", border: "none", background: mobilePageIdx === 0 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.9)", color: mobilePageIdx === 0 ? "#c4b8a8" : "#555", fontSize: 22, cursor: mobilePageIdx === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: mobilePageIdx === 0 ? "none" : "0 2px 8px rgba(0,0,0,0.12)" }}
                  >‹</button>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", maxWidth: "55vw", overflowX: "auto" }}>
                    {pages.map((_, i) => (
                      <button key={i} onClick={() => setMobilePageIdx(i)} style={{ flexShrink: 0, width: i === mobilePageIdx ? 20 : 8, height: 8, borderRadius: 4, background: i === mobilePageIdx ? ACCENT : "rgba(255,255,255,0.6)", border: "none", padding: 0, cursor: "pointer", transition: "width 0.2s, background 0.2s" }} />
                    ))}
                  </div>
                  <button
                    onClick={() => setMobilePageIdx((p) => Math.min(pages.length - 1, p + 1))}
                    disabled={mobilePageIdx >= pages.length - 1}
                    style={{ width: 42, height: 42, borderRadius: "50%", border: "none", background: mobilePageIdx >= pages.length - 1 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.9)", color: mobilePageIdx >= pages.length - 1 ? "#c4b8a8" : "#555", fontSize: 22, cursor: mobilePageIdx >= pages.length - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: mobilePageIdx >= pages.length - 1 ? "none" : "0 2px 8px rgba(0,0,0,0.12)" }}
                  >›</button>
                </div>
              )}
            </div>

            {/* ── Layout toolbar ── */}
            {pages.length > 0 && (
              <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, overflowX: "auto" } as React.CSSProperties}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: 0.5, flexShrink: 0 }}>Layout</span>
                {LAYOUTS.map((l) => {
                  const active = pages[mobilePageIdx]?.layoutKey === l.key;
                  return (
                    <button key={l.key} onClick={() => changeLayout(mobilePageIdx, l.key)} style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 8, border: active ? `2px solid ${ACCENT}` : "1.5px solid #e0dcd6", background: active ? `${ACCENT}15` : "#fafaf9", color: active ? ACCENT : "#6b5e52", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{l.label}</button>
                  );
                })}
                <div style={{ marginLeft: "auto", display: "flex", gap: 6, flexShrink: 0 }}>
                  <button onClick={() => handleDuplicatePage(mobilePageIdx)} title="Duplicar página" style={{ width: 38, height: 38, borderRadius: 8, border: "1.5px solid #e0dcd6", background: "#fafaf9", color: "#6b5e52", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>⧉</button>
                  <button onClick={() => handleDeletePage(mobilePageIdx)} title="Eliminar página" style={{ width: 38, height: 38, borderRadius: 8, border: "1.5px solid #fecaca", background: "#fff5f5", color: "#dc2626", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                </div>
              </div>
            )}

            {/* ── Photo strip panel ── */}
            <div style={{ background: "#fff", padding: "14px 16px 16px" }}>

              {/* Header row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#111" }}>Mis fotos</div>
                  <div style={{ fontSize: 14, color: "#999", marginTop: 2 }}>{placedPhotoIds.size} de {photos.length} colocadas</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {totalPages > 0 && (
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: totalCents > 0 ? ACCENT : "#f59e0b" }}>
                        {totalCents > 0 ? fmtPrice(totalCents) : `Mín ${MIN_HOJAS}h`}
                      </div>
                      <div style={{ fontSize: 11, color: "#999" }}>{hojas} hojas</div>
                    </div>
                  )}
                  <button
                    onClick={() => setShowOnlyAvailable((v) => !v)}
                    style={{ padding: "8px 14px", borderRadius: 10, border: showOnlyAvailable ? `1.5px solid ${ACCENT}` : "1.5px solid #ddd", background: showOnlyAvailable ? `${ACCENT}15` : "#f5f5f5", color: showOnlyAvailable ? ACCENT : "#666", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}
                  >{showOnlyAvailable ? "Todas" : "Libres"}</button>
                </div>
              </div>

              {selectedSlotId && (
                <div style={{ padding: "10px 16px", borderRadius: 10, background: "#e8f4ff", border: "1px solid #93c5fd", fontSize: 14, fontWeight: 600, color: "#1d4ed8", marginBottom: 12 }}>
                  Elige una foto para colocarla ↓
                </div>
              )}

              {/* Photo thumbnails */}
              <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 10, WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
                {visiblePhotos.map((p) => {
                  const isPlaced = placedPhotoIds.has(p.id);
                  const isLowRes = (p.width && p.width < LOW_RES_THRESHOLD) || (p.height && p.height < LOW_RES_THRESHOLD);
                  return (
                    <div key={p.uid} onClick={() => handleMobilePhotoTap(p)} style={{ flexShrink: 0, width: 100, height: 100, borderRadius: 14, overflow: "hidden", position: "relative", cursor: "pointer", border: isPlaced ? `2.5px solid ${ACCENT}` : selectedSlotId ? "2.5px solid #93c5fd" : "2.5px solid transparent", boxShadow: "0 2px 10px rgba(0,0,0,0.12)", opacity: isPlaced ? 0.65 : 1, transition: "opacity 0.2s" }}>
                      <img src={p.preview} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      {isPlaced && (
                        <div style={{ position: "absolute", top: 5, left: 5, width: 22, height: 22, borderRadius: "50%", background: ACCENT, color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>✓</div>
                      )}
                      {isLowRes && (
                        <div style={{ position: "absolute", bottom: 5, right: 5, width: 22, height: 22, borderRadius: "50%", background: "#f59e0b", color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>!</div>
                      )}
                    </div>
                  );
                })}

                {/* Add more photos */}
                <div
                  onClick={() => { const input = document.createElement("input"); input.type = "file"; input.accept = "image/*"; input.multiple = true; input.onchange = (e) => { const files = (e.target as HTMLInputElement).files; if (files) uploadFiles(Array.from(files)); }; input.click(); }}
                  style={{ flexShrink: 0, width: 100, height: 100, borderRadius: 14, border: `2px dashed ${ACCENT}60`, background: `${ACCENT}0a`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: 4 }}
                >
                  <span style={{ fontSize: 30, color: ACCENT, lineHeight: 1 }}>+</span>
                  <span style={{ fontSize: 12, color: ACCENT, fontWeight: 600 }}>Agregar</span>
                </div>
              </div>

              {uploading && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>Subiendo... {progress}%</div>
                  <div style={{ width: "100%", height: 4, borderRadius: 2, background: "#eee", overflow: "hidden" }}>
                    <div style={{ width: `${progress}%`, height: "100%", background: ACCENT, borderRadius: 2, transition: "width 0.3s" }} />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <button onClick={openAutoDistribute} style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "none", background: ACCENT, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Auto-distribuir</button>
                <button onClick={addPage} style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>+ Página</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3-5 unchanged */}
        {step === 3 && (
          <div>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h2 style={{ margin: "0 0 10px", fontSize: isMobile ? "22px" : "28px", fontWeight: 900, color: "#111" }}>
                Tu photobook está listo para revisar
              </h2>
              <p style={{ margin: 0, fontSize: isMobile ? "14px" : "15px", color: "#888", maxWidth: "460px", marginLeft: "auto", marginRight: "auto" }}>
                Hojea cada página antes de continuar. Puedes volver al editor si necesitas ajustar algo.
              </p>
            </div>

            {/* Warning de páginas vacías */}
            {(() => {
              const emptyCount = pages.filter((p) => p.slots.every((s) => s === null)).length;
              if (emptyCount === 0) return null;
              return (
                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: "12px", padding: "14px 18px", borderRadius: "12px", background: "#fffbeb", border: "1px solid #fcd34d", marginBottom: "28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: "20px", flexShrink: 0 }}>⚠️</span>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#92400e" }}>
                        {emptyCount} página{emptyCount !== 1 ? "s" : ""} sin foto
                      </div>
                      <div style={{ fontSize: "13px", color: "#b45309" }}>
                        Puedes continuar, pero quedarán vacías en tu libro impreso.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: "#f59e0b", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flexShrink: 0, alignSelf: isMobile ? "stretch" : "auto", textAlign: "center" }}
                  >
                    Volver al editor
                  </button>
                </div>
              );
            })()}

            {/* Libro a tamaño completo */}
            <div style={{ marginBottom: "28px" }}>
              <PhotobookPreview pages={pages} accent={ACCENT} coverUrl={coverUrl} backCoverUrl={backCoverUrl} />
            </div>

            {/* Tarjeta de resumen pre-checkout */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #eee", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", maxWidth: "480px", margin: "0 auto" }}>
              {/* Precio hero */}
              <div style={{ background: `linear-gradient(135deg, ${ACCENT}0a 0%, ${ACCENT}18 100%)`, padding: isMobile ? "20px 16px" : "24px", borderBottom: "1px solid #f0f0f0", textAlign: "center" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "6px" }}>Total a pagar</div>
                <div style={{ fontSize: isMobile ? "38px" : "48px", fontWeight: 900, color: totalCents > 0 ? ACCENT : "#f59e0b", lineHeight: 1 }}>
                  {totalCents > 0 ? fmtPrice(totalCents) : `Mín ${MIN_HOJAS} hojas`}
                </div>
              </div>
              {/* Detalles */}
              <div style={{ padding: isMobile ? "16px" : "20px 24px", display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  { label: "Hojas", value: `${hojas} hojas · ${totalPages} caras` },
                  { label: "Tipo de tapa", value: coverType === "TAPA_GRUESA" ? "Tapa Gruesa" : "Tapa Delgada" },
                  { label: "Tema", value: temaNombre },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "14px", color: "#888", flexShrink: 0 }}>{label}</span>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "#111", textAlign: "right", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
                  </div>
                ))}
                <div style={{ height: "1px", background: "#f0f0f0" }} />
                <div style={{ fontSize: "12px", color: "#bbb", textAlign: "center" }}>
                  El costo de envío se calcula al confirmar el pedido
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div style={{ marginBottom: "28px" }}>
              <h2 style={{ margin: "0 0 6px", fontSize: isMobile ? "22px" : "26px", fontWeight: 900, color: "#111" }}>Completa tu pedido</h2>
              <p style={{ margin: 0, fontSize: "14px", color: "#888" }}>Tus datos de contacto y preferencias de entrega.</p>
            </div>

            {/* Sección 1: Contacto */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #eee", padding: isMobile ? "18px 16px" : "24px", marginBottom: "16px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>Datos de contacto</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  { label: "Nombre completo", key: "name", type: "text", inputMode: undefined as React.HTMLAttributes<HTMLInputElement>["inputMode"], maxLength: undefined as number | undefined, placeholder: undefined as string | undefined },
                  { label: "Email", key: "email", type: "email", inputMode: "email" as React.HTMLAttributes<HTMLInputElement>["inputMode"], maxLength: undefined, placeholder: undefined },
                  { label: "Teléfono", key: "phone", type: "tel", inputMode: "tel" as React.HTMLAttributes<HTMLInputElement>["inputMode"], maxLength: 12, placeholder: "+51912345678" },
                  { label: "DNI", key: "customerDni", type: "text", inputMode: "numeric" as React.HTMLAttributes<HTMLInputElement>["inputMode"], maxLength: 8, placeholder: "12345678" },
                ].map((f) => (
                  <div key={f.key}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "5px" }}>
                      {f.label} <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type={f.type}
                      inputMode={f.inputMode}
                      placeholder={f.placeholder}
                      value={form[f.key as keyof typeof form] as string}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (f.key === "customerDni") val = val.replace(/\D/g, "").slice(0, 8);
                        if (f.key === "phone") val = val.replace(/[^\d+]/g, "").replace(/(?!^\+)\+/g, "").slice(0, 12);
                        setForm((p) => ({ ...p, [f.key]: val }));
                        setFormErrors((p) => { const n = { ...p }; delete n[f.key]; return n; });
                      }}
                      maxLength={f.maxLength}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: formErrors[f.key] ? "1.5px solid #ef4444" : "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box", outline: "none" }}
                    />
                    {formErrors[f.key] && <div style={{ marginTop: "4px", fontSize: "12px", color: "#ef4444", fontWeight: 500 }}>{formErrors[f.key]}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Sección 2: Entrega */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #eee", padding: isMobile ? "18px 16px" : "24px", marginBottom: "16px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>Entrega</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "5px" }}>
                    Dirección de entrega <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text" value={form.deliveryAddress}
                    onChange={(e) => { setForm((p) => ({ ...p, deliveryAddress: e.target.value })); setFormErrors((p) => { const n = { ...p }; delete n.deliveryAddress; return n; }); }}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: formErrors.deliveryAddress ? "1.5px solid #ef4444" : "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box" }}
                  />
                  {formErrors.deliveryAddress && <div style={{ marginTop: "4px", fontSize: "12px", color: "#ef4444", fontWeight: 500 }}>{formErrors.deliveryAddress}</div>}
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "5px" }}>Distrito</label>
                  <input
                    type="text" value={form.deliveryDistrict}
                    onChange={(e) => setForm((p) => ({ ...p, deliveryDistrict: e.target.value }))}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box" }}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "5px" }}>Ciudad</label>
                    <input
                      type="text" value={form.deliveryCity}
                      onChange={(e) => setForm((p) => ({ ...p, deliveryCity: e.target.value }))}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "5px" }}>Departamento</label>
                    <input
                      type="text" value={form.deliveryDepartment}
                      onChange={(e) => setForm((p) => ({ ...p, deliveryDepartment: e.target.value }))}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box" }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "5px" }}>Región</label>
                  <input
                    type="text" value={form.deliveryRegion}
                    onChange={(e) => setForm((p) => ({ ...p, deliveryRegion: e.target.value }))}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "5px" }}>
                    Fecha de entrega deseada <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="date" value={form.desiredDeliveryDate}
                    min={getMinDate(wantsRush)}
                    max={getMaxDate(wantsRush)}
                    onChange={(e) => { setForm((p) => ({ ...p, desiredDeliveryDate: e.target.value })); setFormErrors((p) => { const n = { ...p }; delete n.desiredDeliveryDate; return n; }); }}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: formErrors.desiredDeliveryDate ? "1.5px solid #ef4444" : "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box" }}
                  />
                  {formErrors.desiredDeliveryDate && <div style={{ marginTop: "4px", fontSize: "12px", color: "#ef4444", fontWeight: 500 }}>{formErrors.desiredDeliveryDate}</div>}
                </div>
                {/* Normal / Express cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => { setWantsRush(false); setForm((p) => ({ ...p, desiredDeliveryDate: "" })); setFormErrors((p) => { const n = { ...p }; delete n.desiredDeliveryDate; return n; }); }}
                    style={{ padding: "16px", borderRadius: "14px", textAlign: "left", cursor: "pointer", border: !wantsRush ? `2px solid ${ACCENT}` : "2px solid #e5e7eb", background: !wantsRush ? `${ACCENT}08` : "#fff", fontFamily: "inherit", transition: "all 0.2s", boxShadow: !wantsRush ? `0 4px 16px ${ACCENT}18` : "none" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={!wantsRush ? ACCENT : "#6b7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="1"/><circle cx="12" cy="20" r="1"/><circle cx="20" cy="20" r="1"/></svg>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: !wantsRush ? ACCENT : "#333" }}>Entrega normal</span>
                      {!wantsRush && <span style={{ marginLeft: "auto", fontSize: "11px", background: ACCENT, color: "#fff", borderRadius: "6px", padding: "2px 7px", fontWeight: 700 }}>Seleccionado</span>}
                    </div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{MIN_NORMAL_DAYS} días hábiles</div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#374151", marginTop: "4px" }}>Sin recargo</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setWantsRush(true); setForm((p) => ({ ...p, desiredDeliveryDate: "" })); setFormErrors((p) => { const n = { ...p }; delete n.desiredDeliveryDate; return n; }); }}
                    style={{ padding: "16px", borderRadius: "14px", textAlign: "left", cursor: "pointer", border: wantsRush ? `2px solid ${ACCENT}` : "2px solid #e5e7eb", background: wantsRush ? `${ACCENT}08` : "#fff", fontFamily: "inherit", transition: "all 0.2s", boxShadow: wantsRush ? `0 4px 16px ${ACCENT}18` : "none" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={wantsRush ? ACCENT : "#6b7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: wantsRush ? ACCENT : "#333" }}>Entrega express</span>
                      {wantsRush && <span style={{ marginLeft: "auto", fontSize: "11px", background: ACCENT, color: "#fff", borderRadius: "6px", padding: "2px 7px", fontWeight: 700 }}>Seleccionado</span>}
                    </div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{MIN_RUSH_DAYS} días hábiles</div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#e74c6f", marginTop: "4px" }}>+S/ 25</div>
                  </button>
                </div>

                {/* Aviso Lima */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", padding: "10px 14px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", fontSize: "12px", color: "#92400e", lineHeight: 1.5 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "1px" }}><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>El envío se realiza desde <strong>Lima</strong>. Para zonas alejadas, los tiempos pueden variar. Nuestro equipo se comunicará contigo para coordinar la entrega.</span>
                </div>
              </div>
            </div>


            {/* Sección 4: Tapa + Precio */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #eee", padding: isMobile ? "18px 16px" : "24px", marginBottom: "16px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>Tipo de tapa</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
                {(["TAPA_DELGADA", "TAPA_GRUESA"] as CoverType[]).map((ct) => {
                  const isActive = coverType === ct;
                  return (
                    <button key={ct} onClick={() => setCoverType(ct)} style={{ padding: "14px", borderRadius: "12px", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", background: isActive ? `${ACCENT}10` : "#f9fafb", outline: isActive ? `2px solid ${ACCENT}` : "2px solid #e5e7eb", transition: "all 0.15s" }}>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: isActive ? ACCENT : "#111" }}>{ct === "TAPA_DELGADA" ? "Tapa Delgada" : "Tapa Gruesa"}</div>
                      <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>{ct === "TAPA_DELGADA" ? "Cartulina estándar" : "Tapa dura resistente"}</div>
                    </button>
                  );
                })}
              </div>
              {/* Precio consolidado */}
              <div style={{ padding: "14px 16px", borderRadius: "12px", background: `${ACCENT}08`, border: `1px solid ${ACCENT}20` }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6b7280", marginBottom: "6px" }}>
                  <span>{hojas} hojas · {coverType === "TAPA_GRUESA" ? "Tapa Gruesa" : "Tapa Delgada"}</span>
                  <span>{fmtPrice(getPriceCents(coverType, hojas) ?? 0)}</span>
                </div>
                {wantsRush && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6b7280", marginBottom: "6px" }}>
                    <span>Express</span>
                    <span>+S/ 25</span>
                  </div>
                )}
                <div style={{ height: "1px", background: `${ACCENT}20`, margin: "8px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#374151" }}>Total</span>
                  <span style={{ fontSize: "22px", fontWeight: 900, color: ACCENT }}>{fmtPrice(totalCents)}</span>
                </div>
              </div>
            </div>

            {product?.allowsCustomDimensions && (
              <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #eee", padding: isMobile ? "18px 16px" : "24px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>
                  Dimensiones personalizadas (cm) <span style={{ color: "#ef4444" }}>*</span>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <input type="number" placeholder="Ancho" value={customWidth} onChange={(e) => setCustomWidth(e.target.value)} min="1" max="100" step="0.5" style={{ flex: 1, padding: "10px 12px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit" }} />
                  <span style={{ fontSize: "16px", color: "#6b7280", flexShrink: 0 }}>×</span>
                  <input type="number" placeholder="Alto" value={customHeight} onChange={(e) => setCustomHeight(e.target.value)} min="1" max="100" step="0.5" style={{ flex: 1, padding: "10px 12px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit" }} />
                </div>
                <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#f59e0b", fontWeight: 500 }}>Las dimensiones personalizadas pueden tener un costo adicional.</p>
              </div>
            )}
          </div>
        )}

        {step === 5 && !submitted && (
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ marginBottom: "28px" }}>
              <h2 style={{ margin: "0 0 6px", fontSize: isMobile ? "22px" : "26px", fontWeight: 900, color: "#111" }}>Confirmar pedido</h2>
              <p style={{ margin: 0, fontSize: "14px", color: "#888" }}>Revisa los detalles antes de confirmar. No podrás editar después.</p>
            </div>

            {/* Resumen del photobook */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #eee", padding: isMobile ? "18px 16px" : "24px", marginBottom: "14px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>Tu photobook</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  {
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
                    label: "Tema", value: temaNombre,
                  },
                  {
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
                    label: "Páginas", value: `${totalPages} páginas (${hojas} hojas)`,
                  },
                  {
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
                    label: "Tapa", value: coverType === "TAPA_GRUESA" ? "Tapa Gruesa (dura resistente)" : "Tapa Delgada (cartulina estándar)",
                  },
                  {
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
                    label: "Fotos colocadas", value: `${placedPhotoIds.size} de ${photos.length}`,
                  },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${ACCENT}10`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{row.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600 }}>{row.label}</div>
                      <div style={{ fontSize: "14px", color: "#111", fontWeight: 600 }}>{row.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Datos de contacto */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #eee", padding: isMobile ? "18px 16px" : "24px", marginBottom: "14px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>Contacto</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, label: "Nombre", value: form.name },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: "Email", value: form.email },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, label: "Teléfono", value: form.phone },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, label: "DNI", value: form.customerDni },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${ACCENT}10`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{row.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600 }}>{row.label}</div>
                      <div style={{ fontSize: "14px", color: "#111", fontWeight: 600 }}>{row.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Entrega */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #eee", padding: isMobile ? "18px 16px" : "24px", marginBottom: "14px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>Entrega</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>, label: "Dirección", value: [form.deliveryAddress, form.deliveryDistrict, form.deliveryCity, form.deliveryDepartment, form.deliveryRegion].filter(Boolean).join(", ") },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={wantsRush ? "#e74c6f" : ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{wantsRush ? <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/> : <><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="1"/><circle cx="12" cy="20" r="1"/><circle cx="20" cy="20" r="1"/></>}</svg>, label: "Tipo de entrega", value: wantsRush ? `Express — ${MIN_RUSH_DAYS} días hábiles (+S/ 25)` : `Normal — ${MIN_NORMAL_DAYS} días hábiles` },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, label: "Fecha deseada", value: form.desiredDeliveryDate || "—" },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${ACCENT}10`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{row.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600 }}>{row.label}</div>
                      <div style={{ fontSize: "14px", color: "#111", fontWeight: 600 }}>{row.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div style={{ background: `${ACCENT}08`, borderRadius: "16px", border: `1.5px solid ${ACCENT}25`, padding: isMobile ? "18px 16px" : "24px", marginBottom: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6b7280" }}>
                  <span>{hojas} hojas · {coverType === "TAPA_GRUESA" ? "Tapa Gruesa" : "Tapa Delgada"}</span>
                  <span>{fmtPrice(getPriceCents(coverType, hojas) ?? 0)}</span>
                </div>
                {wantsRush && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6b7280" }}>
                    <span>Entrega express</span>
                    <span>+S/ 25</span>
                  </div>
                )}
              </div>
              <div style={{ height: "1px", background: `${ACCENT}20`, marginBottom: "12px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#374151" }}>Total a pagar</span>
                <span style={{ fontSize: "28px", fontWeight: 900, color: ACCENT }}>{fmtPrice(totalCents)}</span>
              </div>
              <div style={{ marginTop: "8px", fontSize: "12px", color: "#9ca3af" }}>El costo de envío se calcula al confirmar el pedido.</div>
            </div>

            {/* CTA */}
            <button
              disabled={submitting}
              onClick={handleSubmit}
              style={{ width: "100%", padding: "16px 0", borderRadius: "14px", border: "none", background: submitting ? "#d1d5db" : ACCENT, color: "#fff", fontSize: "16px", fontWeight: 800, cursor: submitting ? "wait" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", transition: "background 0.2s" }}
            >
              {submitting ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                  Creando pedido...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Confirmar pedido
                </>
              )}
            </button>
          </div>
        )}

        {submitted && (
          <div style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center", padding: "60px 20px" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 style={{ fontSize: "26px", fontWeight: 900, color: "#065f46", margin: "0 0 10px" }}>¡Pedido confirmado!</h2>
            <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>Tu photobook fue creado con éxito. Recibirás un link de pago en tu correo para completar la compra.</p>
          </div>
        )}
      </div>

      {/* Nav bar */}
      {!submitted && zoomPageIdx === null && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #eee", zIndex: 100 }}>
          {step === 3 && pages.filter((p) => p.slots.some(Boolean)).length < minPages && (
            <div style={{ background: "#fef3c7", borderBottom: "1px solid #fde68a", padding: "8px 24px", textAlign: "center", fontSize: 13, color: "#92400e", fontWeight: 600 }}>
              {(() => { const f = pages.filter((p) => p.slots.some(Boolean)).length; return `Necesitas ${minPages - f} página${minPages - f !== 1 ? "s" : ""} con fotos más para continuar (tienes ${f} de ${minPages})`; })()}
            </div>
          )}
          <div style={{ padding: isMobile ? "10px 16px" : "14px 48px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={() => step > 1 && setStep(step - 1)} disabled={step === 1} style={{ padding: "10px 24px", borderRadius: "10px", border: step === 1 ? "1px solid #e5e7eb" : `1px solid ${ACCENT}`, background: "#fff", color: step === 1 ? "#ccc" : ACCENT, fontSize: "14px", fontWeight: 600, cursor: step === 1 ? "not-allowed" : "pointer", fontFamily: "inherit" }}>Anterior</button>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "15px", fontWeight: 800, color: "#111" }}>{STEPS[step - 1]?.label}</div>
            <div style={{ fontSize: "12px", color: "#aaa", marginTop: "2px" }}>Paso {step} de {STEPS.length}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
          {step < 5 ? (
            <button onClick={() => {
              if (step === 1 && photos.length === 0) return;
              const filledPages = pages.filter((p) => p.slots.some(Boolean)).length;
              if (step === 2 && filledPages < minPages) { setIncompleteWarningOpen(true); return; }
              if (step === 3 && filledPages < minPages) return;
              if (step === 4) {
                const errors: Record<string, string> = {};
                if (!form.name.trim()) errors.name = "El nombre es requerido";
                if (!form.email.trim()) errors.email = "El email es requerido";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Ingresa un email válido";
                if (!form.phone.trim()) errors.phone = "El teléfono es requerido";
                else if (!/^(\+51)?\d{9}$/.test(form.phone.replace(/\s/g, ""))) errors.phone = "Ingresa un número válido (+51 seguido de 9 dígitos)";
                if (!form.customerDni.trim()) errors.customerDni = "El DNI es requerido";
                else if (!/^\d{1,8}$/.test(form.customerDni) || form.customerDni.length !== 8) errors.customerDni = "El DNI debe tener exactamente 8 dígitos";
                if (!form.deliveryAddress.trim()) errors.deliveryAddress = "La dirección es requerida";
                if (!form.desiredDeliveryDate) errors.desiredDeliveryDate = "La fecha de entrega es requerida";
                if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
                setFormErrors({});
              }
              if (step === 4 && product?.allowsCustomDimensions && (!customWidth || !customHeight)) { alert("Ingresá las dimensiones del photobook personalizado"); return; }
              setStep(step + 1);
              if (step === 1 && pages.length === 0) runAutoDistribute(4);
            }} style={{ padding: "10px 24px", borderRadius: "10px", border: "none", background: step === 3 && pages.filter((p) => p.slots.some(Boolean)).length < minPages ? "#d1d5db" : ACCENT, color: "#fff", fontSize: "14px", fontWeight: 700, cursor: step === 3 && pages.filter((p) => p.slots.some(Boolean)).length < minPages ? "not-allowed" : "pointer", fontFamily: "inherit" }}>Siguiente</button>
          ) : (
            <div />
          )}
          </div>
          </div>
        </div>
      )}

      {/* Delete page confirmation modal */}
      {deletePageIdx !== null && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", width: "min(400px, 100%)", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#111", textAlign: "center", marginBottom: 8 }}>
              ¿Eliminar esta página?
            </div>
            <div style={{ fontSize: 14, color: "#6b7280", textAlign: "center", marginBottom: 24, lineHeight: 1.6 }}>
              Esta página tiene fotos asignadas. Si la eliminás, las fotos vuelven a estar disponibles en el panel.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setDeletePageIdx(null)}
                style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >Cancelar</button>
              <button
                onClick={() => {
                  const idx = deletePageIdx;
                  setDeletePageIdx(null);
                  setPages((prev) => {
                    const copy = prev.filter((_, i) => i !== idx);
                    return copy.map((p, i) => ({ ...p, pageNumber: i + 1 }));
                  });
                }}
                style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "none", background: "#ef4444", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
              >Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* Incomplete pages warning modal (step 2 → 3) */}
      {incompleteWarningOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", width: "min(440px, 100%)", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>
            <div style={{ fontSize: 40, textAlign: "center", marginBottom: 12 }}>📷</div>
            <div style={{ fontSize: 19, fontWeight: 800, color: "#111", textAlign: "center", marginBottom: 8 }}>
              Te faltan páginas
            </div>
            {(() => {
              const f = pages.filter((p) => p.slots.some(Boolean)).length;
              return (
                <div style={{ fontSize: 14, color: "#6b7280", textAlign: "center", marginBottom: 20, lineHeight: 1.6 }}>
                  Tienes <strong style={{ color: "#111" }}>{f} página{f !== 1 ? "s" : ""} con fotos</strong> y el mínimo para realizar la compra es <strong style={{ color: ACCENT }}>{minPages}</strong>.<br />
                  ¿Quieres pasar a la previsualización de todas formas?
                </div>
              );
            })()}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setIncompleteWarningOpen(false)}
                style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >Volver al editor</button>
              <button
                onClick={() => { setIncompleteWarningOpen(false); setStep(3); }}
                style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "none", background: ACCENT, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
              >Ver preview</button>
            </div>
          </div>
        </div>
      )}

      {/* Auto-distribute modal */}
      {autoDistributeOpen && (() => {
        const pool = buildPhotoPool();
        const hasContent = pages.some((p) => p.slots.some(Boolean));
        return (
          <div
            onClick={() => setAutoDistributeOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px" }}
          >
            <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", width: "min(460px, 100%)", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#111", marginBottom: 4 }}>Distribuir fotos</div>
              <div style={{ fontSize: 14, color: "#888", marginBottom: hasContent ? 16 : 24 }}>
                {pool.length} foto{pool.length !== 1 ? "s" : ""} · elige cuántas por página
              </div>

              {hasContent && (
                <div style={{ padding: "10px 14px", borderRadius: 10, background: "#fef3c7", border: "1px solid #fde68a", fontSize: 13, color: "#92400e", marginBottom: 20 }}>
                  Esto va a reemplazar el orden actual de tus páginas.
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {[1, 2, 3, 4].map((n) => {
                  const pagesCount = Math.ceil(pool.length / n);
                  return (
                    <button
                      key={n}
                      onClick={() => runAutoDistribute(n)}
                      style={{ padding: "18px 12px", borderRadius: 14, border: `2px solid ${ACCENT}30`, background: `${ACCENT}08`, cursor: "pointer", fontFamily: "inherit", textAlign: "center", transition: "border-color 0.15s, background 0.15s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ACCENT; (e.currentTarget as HTMLElement).style.background = `${ACCENT}18`; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${ACCENT}30`; (e.currentTarget as HTMLElement).style.background = `${ACCENT}08`; }}
                    >
                      <div style={{ fontSize: 36, fontWeight: 900, color: ACCENT, lineHeight: 1 }}>{n}</div>
                      <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 600, marginTop: 4 }}>foto{n > 1 ? "s" : ""} por página</div>
                      <div style={{ width: 40, height: 1, background: "#e5e7eb", margin: "10px auto" }} />
                      <div style={{ fontSize: 22, fontWeight: 800, color: "#111", lineHeight: 1 }}>{pagesCount}</div>
                      <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>páginas totales</div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setAutoDistributeOpen(false)}
                style={{ width: "100%", padding: "13px 0", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#fff", color: "#6b7280", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >Cancelar</button>
            </div>
          </div>
        );
      })()}

      {/* #12 Zoom modal — at root level so it covers everything */}
      {zoomPageIdx !== null && pages[zoomPageIdx] && (
        <div onClick={() => setZoomPageIdx(null)} style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "zoom-out",
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: "#FFFEF9", borderRadius: 8,
            width: "min(600px, 90vw)", height: "min(780px, 85vh)", padding: 24,
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            position: "relative", cursor: "default",
            display: "grid",
            ...(() => {
              const lk = pages[zoomPageIdx].layoutKey;
              switch (lk) {
                case "FULL_1": return { gridTemplateColumns: "1fr", gridTemplateRows: "1fr" };
                case "GRID_2": return { gridTemplateColumns: "1fr", gridTemplateRows: "1fr 1fr" };
                case "GRID_3": return { gridTemplateColumns: "1fr 1fr", gridTemplateRows: "3fr 2fr" };
                case "GRID_4": default: return { gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" };
              }
            })(),
            gridTemplateAreas: (() => {
              const lk = pages[zoomPageIdx].layoutKey;
              switch (lk) {
                case "FULL_1": return `"a"`;
                case "GRID_2": return `"a" "b"`;
                case "GRID_3": return `"a a" "b c"`;
                case "GRID_4": default: return `"a b" "c d"`;
              }
            })(),
            gap: 10,
          }}>
            {pages[zoomPageIdx].slots.map((s, i) => {
              const areas = ["a", "b", "c", "d"];
              return (
                <div key={i} style={{
                  borderRadius: 6, overflow: "hidden", background: "#f0ede8",
                  gridArea: areas[i],
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {s ? (
                    <img src={s.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  ) : (
                    <span style={{ color: "#ccc", fontSize: 14 }}>Vacío</span>
                  )}
                </div>
              );
            })}
            <button onClick={() => setZoomPageIdx(null)} style={{
              position: "absolute", top: -12, right: -12,
              width: 32, height: 32, borderRadius: "50%",
              border: "none", background: "#fff", color: "#333",
              fontSize: 16, fontWeight: 700, cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
            <div style={{ position: "absolute", bottom: -32, left: "50%", transform: "translateX(-50%)", color: "#fff", fontSize: 13 }}>
              Página {pages[zoomPageIdx].pageNumber}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
