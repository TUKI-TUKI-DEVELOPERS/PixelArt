"use client";

import { useState, useEffect, useCallback } from "react";
import {
  deletePromotion,
  listPromotions,
  savePromotion,
  type AdminPromotion,
} from "@/lib/api/promotions";
import {
  buildPersonalizedEligibility,
  buildPhotobookEligibility,
  describeEligibility,
  splitEligibility,
  splitPhotobookEligibility,
  type PersonalizedCategory,
  type PhotobookSelection,
  type PhotobookTheme,
} from "@/lib/promotions/eligibility";

const API = "";

type CatalogBook = { id: number; name: string };

type PromoForm = {
  code: string;
  percent: string;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  categoryIds: number[];
  modelIds: number[];
  photobook: PhotobookSelection;
};

const EMPTY_FORM: PromoForm = {
  code: "",
  percent: "",
  validFrom: "",
  validUntil: "",
  isActive: true,
  categoryIds: [],
  modelIds: [],
  photobook: { templateAll: false, themeIds: [], custom: false },
};

function toLocalDatetime(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function formatDiscount(p: AdminPromotion) {
  return p.discountType === "percent"
    ? `${p.discountValue}%`
    : `S/ ${(p.discountValue / 100).toFixed(2)}`;
}

function promoStatus(p: AdminPromotion): { label: string; bg: string; text: string } {
  const now = new Date();
  const from = new Date(p.validFrom);
  const until = new Date(p.validUntil);
  if (!p.isActive) return { label: "Inactiva", bg: "#f3f4f6", text: "#6b7280" };
  if (now < from)  return { label: "Próxima",  bg: "#dbeafe", text: "#1e40af" };
  if (now >= until) return { label: "Expirada", bg: "#fee2e2", text: "#991b1b" };
  return { label: "Activa", bg: "#d1fae5", text: "#065f46" };
}

/** Legacy automatic promotions (no code) still use the old catalog-book targeting. */
function legacyTargetLabel(p: AdminPromotion, catalogBooks: CatalogBook[]) {
  if (p.targetType === "all") return "Todos los libros";
  if (p.targetType === "models") {
    if (!p.targetIds?.length) return "Libros específicos (sin selección)";
    return p.targetIds.map((id) => catalogBooks.find((b) => b.id === id)?.name ?? `#${id}`).join(", ");
  }
  const book = catalogBooks.find((b) => b.id === p.targetId);
  return book ? `Libro: ${book.name}` : `Libro #${p.targetId}`;
}

function targetLabel(p: AdminPromotion, catalogBooks: CatalogBook[], categories: PersonalizedCategory[], themes: PhotobookTheme[]) {
  return p.code ? describeEligibility(p.eligibility, categories, themes) : legacyTargetLabel(p, catalogBooks);
}

export default function PromocionesPage() {
  const [promos, setPromos]             = useState<AdminPromotion[]>([]);
  const [catalogBooks, setCatalogBooks] = useState<CatalogBook[]>([]);
  const [categories, setCategories]     = useState<PersonalizedCategory[]>([]);
  const [themes, setThemes]             = useState<PhotobookTheme[]>([]);
  const [loading, setLoading]           = useState(true);
  const [loadError, setLoadError]       = useState<string | null>(null);
  const [showModal, setShowModal]       = useState(false);
  const [editing, setEditing]           = useState<AdminPromotion | null>(null);
  const [form, setForm]                 = useState<PromoForm>({ ...EMPTY_FORM });
  const [saving, setSaving]             = useState(false);
  const [error, setError]               = useState<string | null>(null);
  const [deleting, setDeleting]         = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminPromotion | null>(null);

  // Banner
  const [bannerText, setBannerText]       = useState("");
  const [bannerColor, setBannerColor]     = useState("#1a1a2e");
  const [bannerEnabled, setBannerEnabled] = useState(true);
  const [bannerSaving, setBannerSaving]   = useState(false);
  const [bannerLoaded, setBannerLoaded]   = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    const [promosRes, booksRes, categoriesRes, themesRes] = await Promise.all([
      listPromotions().catch((err: Error) => { setLoadError(err.message); return [] as AdminPromotion[]; }),
      fetch(`${API}/api/catalog/books`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/api/personalized/categories`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/api/photobook/themes`).then((r) => r.json()).catch(() => []),
    ]);
    type RawTheme = { id: number | string; name: string };
    setThemes(((themesRes?.data ?? themesRes ?? []) as RawTheme[]).map((t) => ({ id: Number(t.id), name: t.name })));
    setPromos(promosRes);
    const books: CatalogBook[] = (booksRes?.data ?? booksRes ?? []).map((b: { id: number | string; name: string }) => ({
      id: Number(b.id),
      name: b.name,
    }));
    setCatalogBooks(books);
    type RawCategory = { id: number | string; name: string; models?: { id: number | string; name: string }[] };
    setCategories(((categoriesRes?.data ?? categoriesRes ?? []) as RawCategory[]).map((c) => ({
      id: Number(c.id),
      name: c.name,
      models: (c.models ?? []).map((m) => ({ id: Number(m.id), name: m.name })),
    })));
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    fetch(`${API}/api/site-config/promo_banner`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.value) {
          setBannerText(data.value.text ?? "");
          setBannerColor(data.value.color ?? "#1a1a2e");
          setBannerEnabled(data.value.enabled ?? true);
        }
        setBannerLoaded(true);
      })
      .catch(() => setBannerLoaded(true));
  }, []);

  async function saveBanner(overrides?: { enabled?: boolean }) {
    setBannerSaving(true);
    await fetch(`/admin-api/site-config/promo_banner`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: { text: bannerText, color: bannerColor, enabled: bannerEnabled, ...overrides } }),
    });
    setBannerSaving(false);
  }

  async function toggleBanner() {
    const next = !bannerEnabled;
    setBannerEnabled(next);
    await saveBanner({ enabled: next });
  }

  function openCreate() {
    setEditing(null);
    setForm({ ...EMPTY_FORM });
    setError(null);
    setShowModal(true);
  }

  function openEdit(p: AdminPromotion) {
    setEditing(p);
    const split = splitEligibility(p.eligibility ?? []);
    setForm({
      code:        p.code ?? "",
      percent:     p.discountType === "percent" ? String(p.discountValue) : "",
      validFrom:   toLocalDatetime(p.validFrom),
      validUntil:  toLocalDatetime(p.validUntil),
      isActive:    p.isActive,
      categoryIds: split.categoryIds,
      modelIds:    split.modelIds,
      photobook:   splitPhotobookEligibility(p.eligibility ?? []),
    });
    setError(null);
    setShowModal(true);
  }

  function toggleCategory(categoryId: number) {
    setForm((f) => {
      const selected = f.categoryIds.includes(categoryId);
      const categoryModelIds = categories.find((c) => c.id === categoryId)?.models.map((m) => m.id) ?? [];
      return {
        ...f,
        categoryIds: selected ? f.categoryIds.filter((id) => id !== categoryId) : [...f.categoryIds, categoryId],
        // The whole category already covers its books.
        modelIds: selected ? f.modelIds : f.modelIds.filter((id) => !categoryModelIds.includes(id)),
      };
    });
  }

  function togglePhotobook(change: Partial<PhotobookSelection> | { themeId: number }) {
    setForm((f) => {
      if ("themeId" in change) {
        const { themeIds } = f.photobook;
        const next = themeIds.includes(change.themeId) ? themeIds.filter((id) => id !== change.themeId) : [...themeIds, change.themeId];
        return { ...f, photobook: { ...f.photobook, themeIds: next } };
      }
      return { ...f, photobook: { ...f.photobook, ...change } };
    });
  }

  function toggleModel(modelId: number) {
    setForm((f) => ({
      ...f,
      modelIds: f.modelIds.includes(modelId) ? f.modelIds.filter((id) => id !== modelId) : [...f.modelIds, modelId],
    }));
  }

  async function handleSave() {
    const code = form.code.trim();
    const percent = Number(form.percent);
    const eligibility = [
      ...buildPersonalizedEligibility(form.categoryIds, form.modelIds),
      ...buildPhotobookEligibility(form.photobook),
    ];
    if (!code)                                     return setError("El código es obligatorio");
    if (/\s/.test(code))                           return setError("El código no puede tener espacios");
    if (!Number.isInteger(percent) || percent < 1 || percent > 100) return setError("El descuento debe ser un porcentaje entero entre 1 y 100");
    if (!form.validFrom)                           return setError("La fecha de inicio es obligatoria");
    if (!form.validUntil)                          return setError("La fecha de fin es obligatoria");
    if (!eligibility.length)                       return setError("Selecciona al menos un libro o photobook");

    setSaving(true);
    setError(null);
    try {
      await savePromotion(editing?.id ?? null, {
        code,
        percent,
        validFrom:  new Date(form.validFrom).toISOString(),
        validUntil: new Date(form.validUntil).toISOString(),
        isActive:   form.isActive,
        eligibility,
      });
      setShowModal(false);
      load();
    } catch (err) {
      // e.g. 409 "Se cruza en fechas y productos con la promoción NAVIDAD15"
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(deleteTarget.id);
    setDeleteTarget(null);
    await deletePromotion(deleteTarget.id).catch((err: Error) => setLoadError(err.message));
    setDeleting(null);
    load();
  }

  const activeCount   = promos.filter((p) => promoStatus(p).label === "Activa").length;
  const upcomingCount = promos.filter((p) => promoStatus(p).label === "Próxima").length;
  const expiredCount  = promos.filter((p) => promoStatus(p).label === "Expirada").length;

  return (
    <div style={{ padding: "32px" }}>
      <style>{`@keyframes sk-pulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <h1 style={{ margin: "0 0 4px", fontSize: "28px", fontWeight: 800, color: "#111" }}>Promociones</h1>
          <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
            Códigos de descuento para libros personalizados y photobooks, con rango de fechas
          </p>
        </div>
        <button
          onClick={openCreate}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 20px", borderRadius: "10px", border: "none",
            background: "#111", color: "#fff", fontSize: "14px",
            fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Nueva Promoción
        </button>
      </div>

      {loadError && (
        <div role="alert" style={{ padding: "12px 16px", borderRadius: "8px", background: "#fee2e2", color: "#991b1b", fontSize: "13px", fontWeight: 600, marginBottom: "20px" }}>
          {loadError}
        </div>
      )}

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "28px" }}>
        <div style={{ background: "#d1fae5", borderRadius: "12px", padding: "20px 24px" }}>
          <div style={{ fontSize: "32px", fontWeight: 800, color: "#065f46" }}>{activeCount}</div>
          <div style={{ fontSize: "13px", color: "#065f46", marginTop: "2px" }}>Activas ahora</div>
        </div>
        <div style={{ background: "#dbeafe", borderRadius: "12px", padding: "20px 24px" }}>
          <div style={{ fontSize: "32px", fontWeight: 800, color: "#1e40af" }}>{upcomingCount}</div>
          <div style={{ fontSize: "13px", color: "#1e40af", marginTop: "2px" }}>Próximas</div>
        </div>
        <div style={{ background: "#f3f4f6", borderRadius: "12px", padding: "20px 24px" }}>
          <div style={{ fontSize: "32px", fontWeight: 800, color: "#374151" }}>{expiredCount}</div>
          <div style={{ fontSize: "13px", color: "#374151", marginTop: "2px" }}>Expiradas / Inactivas</div>
        </div>
      </div>

      {/* Tabla */}
      {loading ? (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["Código", "Aplica a", "Descuento", "Vigencia", "Estado", ""].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  {[160, 140, 70, 160, 70, 60].map((w, j) => (
                    <td key={j} style={{ padding: "14px 16px" }}>
                      <div style={{ height: 13, width: w, borderRadius: 4, background: "#f0f0f0", animation: "sk-pulse 1.4s ease-in-out infinite", animationDelay: `${i * 0.06}s` }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : promos.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "64px", textAlign: "center" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🏷️</div>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>Sin promociones</div>
          <div style={{ fontSize: "14px", color: "#9ca3af" }}>Crea el primer código de promoción</div>
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["Código", "Aplica a", "Descuento", "Vigencia", "Estado", ""].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {promos.map((p) => {
                const st = promoStatus(p);
                return (
                  <tr key={p.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "14px 16px" }}>
                      {p.code ? (
                        <code style={{ fontSize: "14px", fontWeight: 700, color: "#111", background: "#f3f4f6", padding: "3px 8px", borderRadius: "6px" }}>{p.code}</code>
                      ) : (
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: 600, color: "#111" }}>{p.label}</div>
                          <div style={{ fontSize: "11px", color: "#9ca3af" }}>Sin código · ya no descuenta</div>
                        </div>
                      )}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: "13px", color: "#6b7280" }}>{targetLabel(p, catalogBooks, categories, themes)}</div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", padding: "4px 10px", borderRadius: "20px", background: "#ede9fe", color: "#5b21b6", fontSize: "13px", fontWeight: 700 }}>
                        {formatDiscount(p)}
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: "12px", color: "#374151" }}>
                        {new Date(p.validFrom).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })}
                      </div>
                      <div style={{ fontSize: "11px", color: "#9ca3af" }}>
                        → {new Date(p.validUntil).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })}
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ display: "inline-flex", padding: "4px 10px", borderRadius: "20px", background: st.bg, color: st.text, fontSize: "12px", fontWeight: 700 }}>
                        {st.label}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => openEdit(p)}
                          style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          disabled={deleting === p.id}
                          style={{ padding: "6px 14px", borderRadius: "8px", border: "none", background: "#fee2e2", color: "#991b1b", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", opacity: deleting === p.id ? 0.5 : 1 }}
                        >
                          {deleting === p.id ? "..." : "Eliminar"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Banner del sitio */}
      {bannerLoaded && (
        <div style={{ marginTop: "32px" }}>
          <h2 style={{ margin: "0 0 16px", fontSize: "18px", fontWeight: 700, color: "#111" }}>Banner del sitio</h2>
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={labelStyle}>Texto del banner</label>
                <button
                  onClick={toggleBanner}
                  disabled={bannerSaving}
                  style={{ padding: "4px 12px", borderRadius: "6px", border: "none", background: bannerEnabled ? "#22c55e" : "#e5e7eb", color: bannerEnabled ? "#fff" : "#6b7280", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", opacity: bannerSaving ? 0.6 : 1 }}
                >
                  {bannerEnabled ? "Activo" : "Inactivo"}
                </button>
              </div>
              <input
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                placeholder="Ej: ¡Envío gratis en pedidos mayores a S/ 100!"
                style={inputStyle}
              />
              <div>
                <label style={labelStyle}>Color de fondo</label>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <input type="color" value={bannerColor} onChange={(e) => setBannerColor(e.target.value)} style={{ width: "40px", height: "40px", border: "none", borderRadius: "8px", cursor: "pointer", padding: 0 }} />
                  <input value={bannerColor} onChange={(e) => setBannerColor(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
                </div>
              </div>
              <button
                onClick={() => saveBanner()}
                disabled={bannerSaving}
                style={{ padding: "10px", borderRadius: "8px", border: "none", background: "#111", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", opacity: bannerSaving ? 0.6 : 1 }}
              >
                {bannerSaving ? "Guardando..." : "Guardar banner"}
              </button>
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>Vista previa</div>
              <div style={{ padding: "12px 16px", borderRadius: "8px", background: bannerColor, color: "#fff", fontSize: "13px", fontWeight: 600, textAlign: "center", opacity: bannerEnabled ? 1 : 0.4 }}>
                {bannerText || "(sin texto)"}
              </div>
              {!bannerEnabled && (
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#9ca3af" }}>El banner está desactivado y no se mostrará en el sitio.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal eliminar */}
      {deleteTarget && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setDeleteTarget(null); }}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1100, padding: "20px",
          }}
        >
          <div style={{
            background: "#fff", borderRadius: "16px", width: "100%",
            maxWidth: "420px", boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
            overflow: "hidden",
          }}>
            {/* Franja roja superior */}
            <div style={{ background: "#fee2e2", padding: "20px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#fca5a5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#991b1b" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "16px", fontWeight: 800, color: "#991b1b" }}>Eliminar promoción</div>
                <div style={{ fontSize: "13px", color: "#b91c1c", marginTop: "2px" }}>Esta acción no se puede deshacer</div>
              </div>
            </div>

            {/* Cuerpo */}
            <div style={{ padding: "20px 24px" }}>
              <p style={{ margin: "0 0 6px", fontSize: "14px", color: "#374151" }}>
                Estás por eliminar la promoción:
              </p>
              <p style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: 700, color: "#111" }}>
                "{deleteTarget.code ?? deleteTarget.label}"
              </p>
              <div style={{ padding: "10px 14px", borderRadius: "8px", background: "#f9fafb", border: "1px solid #e5e7eb", fontSize: "13px", color: "#6b7280" }}>
                {targetLabel(deleteTarget, catalogBooks, categories, themes)} · {formatDiscount(deleteTarget)} · <span style={{ ...{ display: "inline-flex", padding: "2px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, background: promoStatus(deleteTarget).bg, color: promoStatus(deleteTarget).text } }}>{promoStatus(deleteTarget).label}</span>
              </div>
            </div>

            {/* Acciones */}
            <div style={{ display: "flex", gap: "10px", padding: "0 24px 24px" }}>
              <button
                onClick={() => setDeleteTarget(null)}
                style={{ flex: 1, padding: "11px", borderRadius: "10px", border: "1px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                style={{ flex: 1, padding: "11px", borderRadius: "10px", border: "none", background: "#dc2626", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal crear/editar */}
      {showModal && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000, padding: "20px",
          }}
        >
          <div style={{
            background: "#fff", borderRadius: "16px", width: "100%",
            maxWidth: "520px", maxHeight: "90vh", overflowY: "auto",
            boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
          }}>
            {/* Modal header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 24px 0" }}>
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 800, color: "#111" }}>
                {editing ? "Editar Promoción" : "Nueva Promoción"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: "20px", lineHeight: 1 }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Código */}
              <div>
                <label htmlFor="promo-code" style={labelStyle}>Código</label>
                <input
                  id="promo-code"
                  value={form.code}
                  onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                  placeholder="Ej: NAVIDAD15"
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  style={{ ...inputStyle, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                />
                <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                  El cliente debe escribirlo exactamente igual: distingue mayúsculas y minúsculas, sin espacios.
                </div>
              </div>

              {/* Descuento */}
              <div>
                <label htmlFor="promo-percent" style={labelStyle}>Descuento (%)</label>
                <input
                  id="promo-percent"
                  type="number"
                  value={form.percent}
                  onChange={(e) => setForm((f) => ({ ...f, percent: e.target.value }))}
                  placeholder="Ej: 15"
                  min={1}
                  max={100}
                  step={1}
                  style={inputStyle}
                />
                <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                  Se aplica al precio del producto (libro y paquete premium, o photobook); nunca al envío express ni al adicional por tapas personalizadas.
                </div>
              </div>

              {/* Aplica a */}
              <div>
                <div style={labelStyle}>
                  Aplica a ({form.categoryIds.length} categorías · {form.modelIds.length} libros)
                </div>
                <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", maxHeight: "260px", overflowY: "auto", padding: "4px 0" }}>
                  {categories.length === 0 && (
                    <div style={{ padding: "10px 12px", fontSize: "13px", color: "#9ca3af" }}>No se pudieron cargar las categorías</div>
                  )}
                  {categories.map((c) => {
                    const wholeCategory = form.categoryIds.includes(c.id);
                    return (
                      <div key={c.id} style={{ borderBottom: "1px solid #f3f4f6", padding: "4px 0" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", cursor: "pointer", background: wholeCategory ? "#f5f3ff" : "transparent" }}>
                          <input
                            type="checkbox"
                            checked={wholeCategory}
                            onChange={() => toggleCategory(c.id)}
                            style={{ width: "16px", height: "16px", accentColor: "#7c3aed", cursor: "pointer" }}
                          />
                          <span style={{ fontSize: "14px", fontWeight: 700, color: wholeCategory ? "#5b21b6" : "#111" }}>{c.name}</span>
                          <span style={{ fontSize: "12px", color: "#9ca3af" }}>toda la categoría</span>
                        </label>
                        {!wholeCategory && c.models.map((m) => {
                          const checked = form.modelIds.includes(m.id);
                          return (
                            <label key={m.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px 12px 6px 38px", cursor: "pointer", background: checked ? "#f5f3ff" : "transparent" }}>
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleModel(m.id)}
                                style={{ width: "15px", height: "15px", accentColor: "#7c3aed", cursor: "pointer" }}
                              />
                              <span style={{ fontSize: "13px", color: checked ? "#5b21b6" : "#374151", fontWeight: checked ? 600 : 400 }}>{m.name}</span>
                            </label>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Photobooks */}
              <div>
                <div style={labelStyle}>
                  Photobooks ({form.photobook.templateAll ? "todos los de plantilla" : `${form.photobook.themeIds.length} temas`}{form.photobook.custom ? " · a medida" : ""})
                </div>
                <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", maxHeight: "220px", overflowY: "auto", padding: "4px 0" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", cursor: "pointer", background: form.photobook.templateAll ? "#f5f3ff" : "transparent" }}>
                    <input
                      type="checkbox"
                      checked={form.photobook.templateAll}
                      onChange={() => togglePhotobook({ templateAll: !form.photobook.templateAll, themeIds: [] })}
                      style={{ width: "16px", height: "16px", accentColor: "#7c3aed", cursor: "pointer" }}
                    />
                    <span style={{ fontSize: "14px", fontWeight: 700, color: form.photobook.templateAll ? "#5b21b6" : "#111" }}>Todos los photobooks de plantilla</span>
                  </label>
                  {!form.photobook.templateAll && themes.map((t) => {
                    const checked = form.photobook.themeIds.includes(t.id);
                    return (
                      <label key={t.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px 12px 6px 38px", cursor: "pointer", background: checked ? "#f5f3ff" : "transparent" }}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => togglePhotobook({ themeId: t.id })}
                          style={{ width: "15px", height: "15px", accentColor: "#7c3aed", cursor: "pointer" }}
                        />
                        <span style={{ fontSize: "13px", color: checked ? "#5b21b6" : "#374151", fontWeight: checked ? 600 : 400 }}>{t.name}</span>
                      </label>
                    );
                  })}
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", cursor: "pointer", borderTop: "1px solid #f3f4f6", background: form.photobook.custom ? "#f5f3ff" : "transparent" }}>
                    <input
                      type="checkbox"
                      checked={form.photobook.custom}
                      onChange={() => togglePhotobook({ custom: !form.photobook.custom })}
                      style={{ width: "16px", height: "16px", accentColor: "#7c3aed", cursor: "pointer" }}
                    />
                    <span style={{ fontSize: "14px", fontWeight: 700, color: form.photobook.custom ? "#5b21b6" : "#111" }}>Photobook a medida</span>
                  </label>
                </div>
              </div>

              {/* Fechas */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Válida desde</label>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <input
                      id="input-valid-from"
                      type="datetime-local"
                      value={form.validFrom}
                      onChange={(e) => setForm((f) => ({ ...f, validFrom: e.target.value }))}
                      style={{ ...inputStyle, flex: 1, width: "auto", minWidth: 0 }}
                    />
                    <button
                      type="button"
                      onClick={() => (document.getElementById("input-valid-from") as HTMLInputElement)?.blur()}
                      style={{ padding: "0 12px", height: "40px", borderRadius: "8px", border: "1px solid #d1d5db", background: form.validFrom ? "#111" : "#f3f4f6", color: form.validFrom ? "#fff" : "#9ca3af", fontSize: "13px", fontWeight: 700, cursor: "pointer", flexShrink: 0, fontFamily: "inherit" }}
                    >
                      OK
                    </button>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Válida hasta</label>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <input
                      id="input-valid-until"
                      type="datetime-local"
                      value={form.validUntil}
                      onChange={(e) => setForm((f) => ({ ...f, validUntil: e.target.value }))}
                      style={{ ...inputStyle, flex: 1, width: "auto", minWidth: 0 }}
                    />
                    <button
                      type="button"
                      onClick={() => (document.getElementById("input-valid-until") as HTMLInputElement)?.blur()}
                      style={{ padding: "0 12px", height: "40px", borderRadius: "8px", border: "1px solid #d1d5db", background: form.validUntil ? "#111" : "#f3f4f6", color: form.validUntil ? "#fff" : "#9ca3af", fontSize: "13px", fontWeight: 700, cursor: "pointer", flexShrink: 0, fontFamily: "inherit" }}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>

              {/* Activa */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                  onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                  style={{
                    padding: "6px 16px", borderRadius: "8px", border: "none",
                    background: form.isActive ? "#22c55e" : "#e5e7eb",
                    color: form.isActive ? "#fff" : "#6b7280",
                    fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  {form.isActive ? "Activa" : "Inactiva"}
                </button>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>
                  {form.isActive ? "El código funcionará dentro del rango de fechas" : "El código no funcionará aunque esté en fechas"}
                </span>
              </div>

              {error && (
                <div role="alert" style={{ padding: "12px 16px", borderRadius: "8px", background: "#fee2e2", color: "#991b1b", fontSize: "13px", fontWeight: 600 }}>
                  {error}
                </div>
              )}

              {/* Acciones */}
              <div style={{ display: "flex", gap: "10px", paddingTop: "4px" }}>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1, padding: "11px", borderRadius: "10px", border: "1px solid #e5e7eb",
                    background: "#fff", color: "#374151", fontSize: "14px",
                    fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    flex: 2, padding: "11px", borderRadius: "10px", border: "none",
                    background: "#111",
                    color: "#fff", fontSize: "14px",
                    fontWeight: 700, cursor: saving ? "not-allowed" : "pointer",
                    fontFamily: "inherit",
                    opacity: saving ? 0.6 : 1,
                  }}
                >
                  {saving ? "Guardando..." : editing ? "Guardar cambios" : "Crear Promoción"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "13px", fontWeight: 600,
  color: "#374151", marginBottom: "6px",
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 12px", borderRadius: "8px",
  border: "1px solid #e5e7eb", fontSize: "14px",
  fontFamily: "inherit", boxSizing: "border-box",
  background: "#fff", color: "#111",
};
