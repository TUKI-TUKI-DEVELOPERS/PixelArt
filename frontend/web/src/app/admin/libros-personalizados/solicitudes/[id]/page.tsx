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

/** Fuerza descarga de una URL cross-origin */
async function forceDownload(url: string, filename: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
}

type CharacterMember = { name: string; assetIds?: number[] };
type CharacterMeta =
  | { mode: "familia-grupo"; papa: CharacterMember; mama: CharacterMember; hijos: CharacterMember[] }
  | { mode: "hermanos"; hermanos: ({ gender: "M" | "F" } & CharacterMember)[] }
  | { mode: "mascotas-aventura"; pet: CharacterMember & { nickname?: string | null; gender?: string }; owners: ({ gender?: string } & CharacterMember)[] }
  | { mode: "memorial-hermanos"; totalSiblings: number; recipient: CharacterMember & { nickname?: string | null; gender?: string }; livingSiblings: CharacterMember[] }
  | { mode: string; recipient: CharacterMember & { nickname?: string | null }; dedicator?: CharacterMember }
  | null;

type DemoDetail = {
  id: number;
  customerFullName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddressLine1: string;
  shippingAddressLine2: string | null;
  shippingCity: string | null;
  shippingRegion: string | null;
  deliveryDate: string | null;
  wantsRush: boolean;
  packagePreference: string;
  coverType: string | null;
  wantsCustomDedication: boolean;
  dedicationText: string | null;
  recipientName: string | null;
  recipientNickname: string | null;
  dedicatorName: string | null;
  genderDirection: string | null;
  characterMeta: CharacterMeta;
  messageOptional: string | null;
  status: string;
  catalogBookVariantId: number;
  templateSelections: { id: number; templateId: number; templateName: string | null; templatePreviewUrl: string | null }[];
  assetIds: number[];
  proposals: { id: number; templateId: number; outputStorageKey: string; outputUrl: string; protectionMode: string }[];
  checkoutLink: { token: string; url: string; expiresAt: string; orderId: number } | null;
  hasPaymentProof: boolean;
};

export default function SolicitudDetallePage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<DemoDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<number | null>(null);
  const [generatingSet, setGeneratingSet] = useState<Set<number>>(new Set());
  const [generateError, setGenerateError] = useState<Record<number, string>>({});
  const [selectedPhoto, setSelectedPhoto] = useState<Record<number, Record<string, number>>>({});
  const [deletingProposal, setDeletingProposal] = useState<number | null>(null);
  const [assetUrls, setAssetUrls] = useState<Record<number, string>>({});
  const [sendingCheckout, setSendingCheckout] = useState(false);
  const [reissuingCheckout, setReissuingCheckout] = useState(false);
  const [checkoutLink, setCheckoutLink] = useState<{ url: string; orderId: number; expiresAt?: Date } | null>(null);
  const fileRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const generatingRef = useRef<Set<number>>(new Set());
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [replacingPhoto, setReplacingPhoto] = useState<number | null>(null);
  const photoReplaceRefs = useRef<Record<number, HTMLInputElement | null>>({});

  function loadDetail() {
    fetch(`${API}/api/admin/demo/requests/${id}`)
      .then((r) => r.json())
      .then((detail: DemoDetail) => {
        setData(detail);
        // Si el backend ya devuelve el checkout link (status=PROPOSALS_SENT), restaurarlo
        if (detail.checkoutLink) {
          setCheckoutLink({ url: detail.checkoutLink.url, orderId: detail.checkoutLink.orderId });
        }
        // Resolver URLs de fotos en paralelo — todos los fetches a la vez
        Promise.all(
          detail.assetIds.map(async (assetId) => {
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

  useEffect(() => { loadDetail(); }, [id]);

  async function handleUploadProposal(templateId: number, file: File) {
    setUploading(templateId);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(
        `${API}/api/admin/demo/requests/${id}/proposals?templateId=${templateId}&protectionMode=WATERMARK`,
        { method: "POST", body: formData },
      );
      if (!res.ok) throw new Error("Error al subir propuesta");
      loadDetail();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error");
    } finally {
      setUploading(null);
    }
  }

  async function handleReplacePhoto(oldAssetId: number, file: File) {
    setReplacingPhoto(oldAssetId);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(
        `${API}/api/admin/demo/requests/${id}/replace-photo?oldAssetId=${oldAssetId}`,
        { method: "POST", body: formData },
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Error al reemplazar la foto" }));
        throw new Error(err.message);
      }
      loadDetail();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error");
    } finally {
      setReplacingPhoto(null);
    }
  }

  async function handleGenerateProposal(templateId: number) {
    // Guarda SÍNCRONA (no depende de que React re-renderice el disabled del
    // botón) — evita que un doble click dispare dos pedidos y choque contra
    // la restricción de "una propuesta por plantilla" de la base.
    if (generatingRef.current.has(templateId)) return;
    generatingRef.current.add(templateId);

    setGeneratingSet((prev) => new Set(prev).add(templateId));
    setGenerateError((prev) => ({ ...prev, [templateId]: "" }));
    try {
      const res = await fetch(
        `${API}/api/admin/demo/requests/${id}/proposals/generate?templateId=${templateId}&protectionMode=WATERMARK`,
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
      loadDetail();
    } catch (err) {
      setGenerateError((prev) => ({ ...prev, [templateId]: err instanceof Error ? err.message : "Error" }));
    } finally {
      generatingRef.current.delete(templateId);
      setGeneratingSet((prev) => { const next = new Set(prev); next.delete(templateId); return next; });
    }
  }

  async function handleDeleteProposal(proposalId: number) {
    if (!confirm("¿Eliminar esta propuesta? Se borrará del servidor.")) return;
    setDeletingProposal(proposalId);
    try {
      const res = await fetch(`${API}/api/admin/demo/requests/${id}/proposals/${proposalId}`, { method: "DELETE" });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error((err as { message?: string }).message ?? "Error"); }
      loadDetail();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error al eliminar");
    } finally {
      setDeletingProposal(null);
    }
  }

  if (loading) return <div style={{ padding: "32px", color: "#999" }}>Cargando...</div>;
  if (!data) return <div style={{ padding: "32px", color: "#999" }}>Solicitud no encontrada.</div>;

  const STATUS_MAP_DEMO: Record<string, { bg: string; text: string; label: string }> = {
    RECEIVED:       { bg: "#dbeafe", text: "#1e40af", label: "Recibida"            },
    PROPOSALS_SENT: { bg: "#d1fae5", text: "#065f46", label: "Propuestas Enviadas" },
    CANCELLED:      { bg: "#fee2e2", text: "#991b1b", label: "Cancelada"           },
  };
  const st = STATUS_MAP_DEMO[data.status] ?? { bg: "#f3f4f6", text: "#374151", label: data.status };
  const resolvedCheckout = checkoutLink ?? data.checkoutLink;
  const uploadedCount = data.proposals.length;
  const totalCount = data.templateSelections.length;

  // Grupos de fotos con roleKey (calza con characterMeta[roleKey] del backend)
  // — usado para dejarle elegir al admin qué foto mandar a generar.
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
    <div style={{ padding: "32px", maxWidth: "1100px" }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 500 }}>Solicitud #{data.id}</span>
            <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: "6px", background: st.bg, color: st.text, fontSize: "11px", fontWeight: 700 }}>{st.label}</span>
            {resolvedCheckout && (
              <Link href={`/admin/ordenes/${resolvedCheckout.orderId}`}
                style={{ fontSize: "12px", fontWeight: 600, color: "#8b5cf6", textDecoration: "none", background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: "6px", padding: "2px 10px" }}>
                Orden #{resolvedCheckout.orderId} →
              </Link>
            )}
          </div>
          <h1 style={{ margin: "0 0 4px 0", fontSize: "26px", fontWeight: 800, color: "#111" }}>{data.customerFullName}</h1>
        </div>
        {/* Progreso propuestas */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "12px 20px", textAlign: "center", flexShrink: 0 }}>
          <div style={{ fontSize: "22px", fontWeight: 800, color: uploadedCount === totalCount ? "#22c55e" : "#111" }}>
            {uploadedCount}<span style={{ fontSize: "14px", fontWeight: 500, color: "#9ca3af" }}>/{totalCount}</span>
          </div>
          <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 500, marginTop: "2px" }}>propuestas</div>
        </div>
      </div>

      {/* ── Info del cliente ── */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "24px", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>Datos del cliente</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", padding: "0", borderBottom: "1px solid #f3f4f6" }}>
          {[
            { label: "Email",     value: data.customerEmail },
            { label: "Teléfono",  value: data.customerPhone },
            { label: "Dirección", value: [data.shippingAddressLine1, data.shippingCity, data.shippingRegion].filter(Boolean).join(", ") },
          ].map((field, i, arr) => (
            <div key={field.label} style={{ padding: "14px 20px", borderRight: i < arr.length - 1 ? "1px solid #f3f4f6" : "none" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "5px" }}>{field.label}</div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={field.value}>
                {field.value}
              </div>
            </div>
          ))}
        </div>
        {(data.wantsCustomDedication || data.messageOptional) && (
          <div style={{ display: "grid", gridTemplateColumns: data.wantsCustomDedication && data.messageOptional ? "1fr 1fr" : "1fr", gap: "0" }}>
            {data.wantsCustomDedication && (
              <div style={{ padding: "14px 20px", borderRight: data.messageOptional ? "1px solid #f3f4f6" : "none" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "5px" }}>Dedicatoria</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#059669", lineHeight: 1.5, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                  {data.dedicationText ?? "Sí"}
                </div>
              </div>
            )}
            {data.messageOptional && (
              <div style={{ padding: "14px 20px" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "5px" }}>Mensaje adicional</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#111", lineHeight: 1.5, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                  {data.messageOptional}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Detalles del pedido ── */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "24px", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>Detalles del pedido</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            {
              label: "Tipo de tapa",
              value: data.coverType ? data.coverType.replace("TAPA_", "Tapa ") : "—",
              accent: false,
            },
            {
              label: "Plantillas",
              value: data.packagePreference === "PREMIUM" ? "15 plantillas" : "10 plantillas",
              accent: false,
            },
            {
              label: "Tipo de entrega",
              value: data.wantsRush ? "Express" : "Normal",
              accent: data.wantsRush,
            },
          ].map((field, i, arr) => (
            <div key={field.label} style={{ padding: "14px 20px", borderRight: i < arr.length - 1 ? "1px solid #f3f4f6" : "none" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "5px" }}>{field.label}</div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: field.accent ? "#d97706" : "#111" }}>{field.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Personajes del libro ── */}
      {data.characterMeta && (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "24px", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>Personajes del libro</span>
          </div>
          <div style={{ padding: "16px 20px" }}>
            {/* Modo familia-grupo */}
            {data.characterMeta.mode === "familia-grupo" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
                {[
                  { label: "Papá", name: data.characterMeta.papa.name },
                  { label: "Mamá", name: data.characterMeta.mama.name },
                  ...data.characterMeta.hijos.map((h, i) => ({ label: `Hijo ${i + 1}`, name: h.name })),
                ].map((m) => (
                  <div key={m.label} style={{ background: "#f9fafb", borderRadius: "10px", padding: "12px 14px", border: "1px solid #f0f0f0" }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>{m.label}</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#111" }}>{m.name || "—"}</div>
                  </div>
                ))}
              </div>
            )}
            {/* Modo hermanos */}
            {data.characterMeta.mode === "hermanos" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
                {data.characterMeta.hermanos.map((h, i) => (
                  <div key={i} style={{ background: "#f9fafb", borderRadius: "10px", padding: "12px 14px", border: "1px solid #f0f0f0" }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
                      {h.gender === "F" ? `Hermana ${i + 1}` : `Hermano ${i + 1}`}
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#111" }}>{h.name || "—"}</div>
                  </div>
                ))}
              </div>
            )}
            {/* Modo mascotas-aventura */}
            {data.characterMeta.mode === "mascotas-aventura" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
                {([
                  { label: "Mascota", name: data.characterMeta.pet.name, extra: data.characterMeta.pet.nickname },
                  ...data.characterMeta.owners.map((o, i) => ({ label: `Dueño ${i + 1}`, name: o.name, extra: null as string | null | undefined })),
                ]).map((m) => (
                  <div key={m.label} style={{ background: "#f9fafb", borderRadius: "10px", padding: "12px 14px", border: "1px solid #f0f0f0" }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>{m.label}</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#111" }}>{m.name || "—"}</div>
                    {m.extra && <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>"{m.extra}"</div>}
                  </div>
                ))}
              </div>
            )}
            {/* Modo memorial-hermanos */}
            {data.characterMeta.mode === "memorial-hermanos" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
                {([
                  { label: "Fallecido/a", name: data.characterMeta.recipient.name, extra: data.characterMeta.recipient.nickname },
                  ...data.characterMeta.livingSiblings.map((s, i) => ({ label: `Hermano ${i + 1}`, name: s.name, extra: null as string | null | undefined })),
                ]).map((m) => (
                  <div key={m.label} style={{ background: "#f9fafb", borderRadius: "10px", padding: "12px 14px", border: "1px solid #f0f0f0" }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>{m.label}</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#111" }}>{m.name || "—"}</div>
                    {m.extra && <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>"{m.extra}"</div>}
                  </div>
                ))}
              </div>
            )}
            {/* Modos simples: amor / mascotas / familia / memorial básico */}
            {"recipient" in data.characterMeta && data.characterMeta.mode !== "memorial-hermanos" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" }}>
                <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "12px 14px", border: "1px solid #f0f0f0" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Protagonista</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#111" }}>{data.characterMeta.recipient.name || "—"}</div>
                  {data.characterMeta.recipient.nickname && <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>"{data.characterMeta.recipient.nickname}"</div>}
                </div>
                {"dedicator" in data.characterMeta && data.characterMeta.dedicator && (
                  <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "12px 14px", border: "1px solid #f0f0f0" }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Quién dedica</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#111" }}>{data.characterMeta.dedicator.name || "—"}</div>
                  </div>
                )}
                {data.genderDirection && (
                  <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "12px 14px", border: "1px solid #f0f0f0" }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Dirección</div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>
                      {data.genderDirection === "HE_TO_SHE" ? "Él → Ella"
                        : data.genderDirection === "SHE_TO_HE" ? "Ella → Él"
                        : data.genderDirection === "HE_TO_HE" ? "Él → Él"
                        : data.genderDirection === "SHE_TO_SHE" ? "Ella → Ella"
                        : data.genderDirection}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Fotos del cliente ── */}
      {(() => {
        const PhotoStrip = ({ ids, label }: { ids: number[]; label: string }) => (
          <div style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#374151" }}>{label}</span>
              <span style={{ fontSize: "11px", color: "#9ca3af", background: "#f3f4f6", borderRadius: "99px", padding: "1px 7px", fontWeight: 600 }}>{ids.length} foto{ids.length !== 1 ? "s" : ""}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${ids.length}, 120px)`, gap: "8px" }}>
              {ids.map((assetId) => {
                const url = assetUrls[assetId];
                return url ? (
                  <div key={assetId} style={{ position: "relative" }}>
                    <img src={url} alt={label} style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: "8px", display: "block" }} />
                    <button onClick={() => forceDownload(url, `${label.toLowerCase().replace(/\s+/g, "_")}_${assetId}.jpg`)}
                      style={{ position: "absolute", bottom: "4px", right: "4px", width: "24px", height: "24px", borderRadius: "5px", background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", padding: 0 }}
                      title="Descargar">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    </button>
                  </div>
                ) : (
                  <div key={assetId} style={{ aspectRatio: "1", borderRadius: "8px", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc", fontSize: "10px" }}>…</div>
                );
              })}
            </div>
          </div>
        );

        // Construir grupos desde characterMeta
        const meta = data.characterMeta;
        let groups: { label: string; ids: number[] }[] = [];

        if (meta && "papa" in meta) {
          // familia-grupo
          groups = [
            { label: `Papá — ${meta.papa.name || ""}`, ids: meta.papa.assetIds ?? [] },
            { label: `Mamá — ${meta.mama.name || ""}`, ids: meta.mama.assetIds ?? [] },
            ...meta.hijos.map((h, i) => ({ label: `Hijo ${i + 1} — ${h.name || ""}`, ids: h.assetIds ?? [] })),
          ];
        } else if (meta && "hermanos" in meta) {
          groups = meta.hermanos.map((h, i) => ({
            label: `${h.gender === "F" ? "Hermana" : "Hermano"} ${i + 1} — ${h.name || ""}`,
            ids: h.assetIds ?? [],
          }));
        } else if (meta && "pet" in meta) {
          groups = [
            { label: `Mascota — ${meta.pet.name || ""}`, ids: meta.pet.assetIds ?? [] },
            ...meta.owners.map((o, i) => ({ label: `Dueño ${i + 1} — ${o.name || ""}`, ids: o.assetIds ?? [] })),
          ];
        } else if (meta && "recipient" in meta && meta.mode === "memorial-hermanos") {
          groups = [
            { label: `Fallecido/a — ${meta.recipient.name || ""}`, ids: meta.recipient.assetIds ?? [] },
            ...meta.livingSiblings.map((s, i) => ({ label: `Hermano ${i + 1} — ${s.name || ""}`, ids: s.assetIds ?? [] })),
          ];
        } else if (meta && "recipient" in meta) {
          groups = [
            { label: meta.recipient.nickname ? `"${meta.recipient.nickname}"` : meta.recipient.name || "Protagonista", ids: meta.recipient.assetIds ?? [] },
            ...(meta.dedicator ? [{ label: meta.dedicator.name || "Quien dedica", ids: meta.dedicator.assetIds ?? [] }] : []),
          ];
        }

        // Fallback por posición: meta existe pero sin assetIds (registros viejos)
        const hasGrouped = groups.length > 0 && groups.some((g) => g.ids.length > 0);
        if (!hasGrouped && meta) {
          if ("papa" in meta) {
            // familia-grupo: 2 fotos por integrante en orden
            const members = [
              { label: `Papá — ${meta.papa.name || ""}`, count: 2 },
              { label: `Mamá — ${meta.mama.name || ""}`, count: 2 },
              ...meta.hijos.map((h, i) => ({ label: `Hijo ${i + 1} — ${h.name || ""}`, count: 2 })),
            ];
            let offset = 0;
            groups = members.map((m) => {
              const ids = data.assetIds.slice(offset, offset + m.count);
              offset += m.count;
              return { label: m.label, ids };
            }).filter((g) => g.ids.length > 0);
          } else if ("hermanos" in meta) {
            // hermanos: 2 fotos por hermano en orden
            let offset = 0;
            groups = meta.hermanos.map((h, i) => {
              const ids = data.assetIds.slice(offset, offset + 2);
              offset += 2;
              return { label: `${h.gender === "F" ? "Hermana" : "Hermano"} ${i + 1} — ${h.name || ""}`, ids };
            }).filter((g) => g.ids.length > 0);
          } else if ("recipient" in meta) {
            // simple: todas las fotos bajo el nombre del protagonista
            const recipLabel = meta.recipient.nickname ? `"${meta.recipient.nickname}"` : meta.recipient.name || "Protagonista";
            groups = [{ label: recipLabel, ids: data.assetIds }];
          }
        }

        const showGrouped = groups.length > 0 && groups.some((g) => g.ids.length > 0);

        return (
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "20px 24px", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>Fotos del cliente</span>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280", background: "#f3f4f6", borderRadius: "999px", padding: "1px 8px" }}>{data.assetIds.length}</span>
              </div>
              {data.assetIds.length > 0 && (
                <button onClick={() => data.assetIds.forEach((id) => { const url = assetUrls[id]; if (url) forceDownload(url, `foto_${id}.jpg`); })}
                  style={{ padding: "5px 12px", borderRadius: "7px", border: "1px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "5px" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Descargar todas
                </button>
              )}
            </div>

            {data.assetIds.length === 0 ? (
              <div style={{ padding: "20px", textAlign: "center", color: "#9ca3af", fontSize: "13px" }}>Sin fotos</div>
            ) : showGrouped ? (
              // Fotos agrupadas por personaje — grid horizontal para todos los modos
              (() => {
                const cols = meta && "papa" in meta ? 4 : groups.length;
                return (
                  <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "10px" }}>
                    {groups.map((g) => {
                      const sepIdx = g.label.indexOf(" — ");
                      const role = sepIdx !== -1 ? g.label.slice(0, sepIdx) : g.label;
                      const name = sepIdx !== -1 ? g.label.slice(sepIdx + 3) : null;
                      return (
                        <div key={g.label} style={{ background: "#f9fafb", borderRadius: "10px", padding: "10px", border: "1px solid #f0f0f0" }}>
                          <div style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px" }}>{role}</div>
                          {name && <div style={{ fontSize: "12px", fontWeight: 700, color: "#111", marginTop: "2px", marginBottom: "8px" }}>{name}</div>}
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "5px", marginTop: name ? 0 : "8px" }}>
                            {g.ids.map((assetId) => {
                              const url = assetUrls[assetId];
                              const isReplacing = replacingPhoto === assetId;
                              return (
                                <div key={assetId} style={{ position: "relative" }}>
                                  <input type="file" accept="image/*" style={{ display: "none" }}
                                    ref={(el) => { photoReplaceRefs.current[assetId] = el; }}
                                    onChange={(e) => { const file = e.target.files?.[0]; if (file) handleReplacePhoto(assetId, file); e.target.value = ""; }} />
                                  {url ? (
                                    <img src={url} alt={role} onClick={() => setZoomedImage(url)} style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: "6px", display: "block", cursor: "zoom-in", opacity: isReplacing ? 0.4 : 1 }} />
                                  ) : (
                                    <div style={{ width: "100%", aspectRatio: "1", borderRadius: "6px", background: "#e5e7eb" }} />
                                  )}
                                  {url && (
                                    <button onClick={() => forceDownload(url, `${role.toLowerCase()}_${assetId}.jpg`)} disabled={isReplacing}
                                      style={{ position: "absolute", bottom: "3px", right: "22px", width: "20px", height: "20px", borderRadius: "4px", background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", padding: 0 }}
                                      title="Descargar">
                                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                    </button>
                                  )}
                                  <button onClick={() => photoReplaceRefs.current[assetId]?.click()} disabled={isReplacing}
                                    style={{ position: "absolute", bottom: "3px", right: "3px", width: "20px", height: "20px", borderRadius: "4px", background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: isReplacing ? "wait" : "pointer", padding: 0 }}
                                    title="Reemplazar foto">
                                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()
            ) : (
              // Fallback: grilla plana (registros sin characterMeta)
              <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "8px" }}>
                {data.assetIds.map((assetId) => {
                  const url = assetUrls[assetId];
                  const isReplacing = replacingPhoto === assetId;
                  return (
                    <div key={assetId} style={{ position: "relative" }}>
                      <input type="file" accept="image/*" style={{ display: "none" }}
                        ref={(el) => { photoReplaceRefs.current[assetId] = el; }}
                        onChange={(e) => { const file = e.target.files?.[0]; if (file) handleReplacePhoto(assetId, file); e.target.value = ""; }} />
                      {url ? (
                        <img src={url} alt={`Foto ${assetId}`} onClick={() => setZoomedImage(url)} style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: "7px", display: "block", cursor: "zoom-in", opacity: isReplacing ? 0.4 : 1 }} />
                      ) : (
                        <div style={{ width: "100%", aspectRatio: "1", borderRadius: "7px", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc", fontSize: "10px" }}>…</div>
                      )}
                      {url && (
                        <button onClick={() => forceDownload(url, `foto_${assetId}.jpg`)} disabled={isReplacing}
                          style={{ position: "absolute", bottom: "4px", right: "26px", width: "24px", height: "24px", borderRadius: "5px", background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", padding: 0 }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        </button>
                      )}
                      <button onClick={() => photoReplaceRefs.current[assetId]?.click()} disabled={isReplacing}
                        style={{ position: "absolute", bottom: "4px", right: "4px", width: "24px", height: "24px", borderRadius: "5px", background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: isReplacing ? "wait" : "pointer", padding: 0 }}
                        title="Reemplazar foto">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}

      {/* ── Propuestas por plantilla (unificado) ── */}
      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "20px 24px", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>Propuestas por plantilla</span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: uploadedCount === totalCount ? "#22c55e" : "#f59e0b", background: uploadedCount === totalCount ? "#f0fdf4" : "#fffbeb", borderRadius: "999px", padding: "1px 8px" }}>
            {uploadedCount}/{totalCount} subidas
          </span>
        </div>
        <p style={{ margin: "0 0 18px 0", fontSize: "13px", color: "#9ca3af" }}>
          Subí el diseño terminado para cada plantilla. Se aplicará marca de agua antes de mostrárselo al cliente.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {data.templateSelections.map((ts) => {
            const proposal = data.proposals.find((p) => p.templateId === ts.templateId);
            const isUploading = uploading === ts.templateId;
            const isGenerating = generatingSet.has(ts.templateId);
            const isDeleting = proposal ? deletingProposal === proposal.id : false;
            return (
              <div key={ts.id}>
                <input type="file" accept="image/*"
                  ref={(el) => { fileRefs.current[ts.templateId] = el; }}
                  style={{ display: "none" }}
                  onChange={(e) => { const file = e.target.files?.[0]; if (file) handleUploadProposal(ts.templateId, file); }}
                />
                {proposal ? (
                  <div style={{ border: "2px solid #22c55e", borderRadius: "12px", overflow: "hidden", background: "#f0fdf4", position: "relative" }}>
                    <img src={proposal.outputUrl} alt={ts.templateName ?? "Propuesta"} onClick={() => setZoomedImage(proposal.outputUrl)} style={{ width: "100%", aspectRatio: "2 / 1", objectFit: "cover", display: "block", cursor: "zoom-in" }} />
                    {data.status === "RECEIVED" && (
                      <button disabled={isDeleting} onClick={() => handleDeleteProposal(proposal.id)} title="Eliminar propuesta"
                        style={{ position: "absolute", top: "8px", right: "8px", width: "28px", height: "28px", borderRadius: "50%", border: "none", background: "rgba(239,68,68,0.85)", color: "#fff", cursor: isDeleting ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}>
                        {isDeleting
                          ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                          : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                        }
                      </button>
                    )}
                    <div style={{ padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#065f46" }}>{ts.templateName ?? `Plantilla #${ts.templateId}`}</span>
                      <span style={{ fontSize: "11px", color: "#22c55e", background: "#dcfce7", padding: "2px 8px", borderRadius: "99px", fontWeight: 600 }}>Marca de agua</span>
                    </div>
                    {data.status === "RECEIVED" && (
                      <div style={{ padding: "0 12px 10px" }}>
                        <button
                          disabled={isGenerating}
                          onClick={() => handleGenerateProposal(ts.templateId)}
                          title="Vuelve a generar con IA, pisando esta propuesta — no hace falta borrarla antes"
                          style={{ width: "100%", padding: "7px", borderRadius: "8px", border: "none", background: isGenerating ? "#c4b5fd" : "#7c3aed", color: "#fff", fontSize: "11px", fontWeight: 700, cursor: isGenerating ? "wait" : "pointer", fontFamily: "inherit" }}>
                          {isGenerating ? "Regenerando… (puede tardar 20s)" : "Regenerar con IA"}
                        </button>
                        {generateError[ts.templateId] && (
                          <div style={{ marginTop: "6px", fontSize: "11px", color: "#dc2626" }}>{generateError[ts.templateId]}</div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ border: "2px dashed #d1d5db", borderRadius: "12px", overflow: "hidden" }}>
                    <div onClick={() => !isUploading && fileRefs.current[ts.templateId]?.click()} style={{ cursor: isUploading ? "wait" : "pointer" }}>
                      {ts.templatePreviewUrl && (
                        <img src={ts.templatePreviewUrl} alt={ts.templateName ?? ""} style={{ width: "100%", aspectRatio: "2 / 1", objectFit: "cover", display: "block", opacity: 0.5 }} />
                      )}
                      <div style={{ padding: "12px 12px 8px", textAlign: "center" }}>
                        <div style={{ fontSize: "13px", fontWeight: 600, color: "#6b7280", marginBottom: "2px" }}>{ts.templateName ?? `Plantilla #${ts.templateId}`}</div>
                        <div style={{ fontSize: "11px", color: "#9ca3af" }}>{isUploading ? "Subiendo..." : "Clic para subir propuesta a mano"}</div>
                      </div>
                    </div>

                    {photoGroups.length > 0 && (
                      <div style={{ borderTop: "1px solid #e5e7eb", padding: "10px 12px", background: "#fafafa" }}>
                        {photoGroups.map((g) => {
                          const chosen = selectedPhoto[ts.templateId]?.[g.roleKey] ?? g.ids[0];
                          return (
                            <div key={g.roleKey} style={{ marginBottom: "6px" }}>
                              <div style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", marginBottom: "4px" }}>{g.label}</div>
                              <div style={{ display: "flex", gap: "5px" }}>
                                {g.ids.map((assetId) => {
                                  const url = assetUrls[assetId];
                                  const isChosen = assetId === chosen;
                                  return (
                                    <button key={assetId} type="button"
                                      onClick={() => setSelectedPhoto((prev) => ({ ...prev, [ts.templateId]: { ...prev[ts.templateId], [g.roleKey]: assetId } }))}
                                      style={{ padding: 0, border: isChosen ? "2px solid #7c3aed" : "2px solid transparent", borderRadius: "6px", cursor: "pointer", background: "none", width: "36px", height: "36px", overflow: "hidden", flexShrink: 0 }}
                                      title={`Usar esta foto para ${g.label}`}>
                                      {url ? <img src={url} alt={g.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : <div style={{ width: "100%", height: "100%", background: "#e5e7eb" }} />}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                        <button
                          disabled={isGenerating}
                          onClick={() => handleGenerateProposal(ts.templateId)}
                          style={{ width: "100%", marginTop: "6px", padding: "8px", borderRadius: "8px", border: "none", background: isGenerating ? "#c4b5fd" : "#7c3aed", color: "#fff", fontSize: "12px", fontWeight: 700, cursor: isGenerating ? "wait" : "pointer", fontFamily: "inherit" }}>
                          {isGenerating ? "Generando… (puede tardar 20s)" : "Generar con IA"}
                        </button>
                        {generateError[ts.templateId] && (
                          <div style={{ marginTop: "6px", fontSize: "11px", color: "#dc2626" }}>{generateError[ts.templateId]}</div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CTA: Enviar link al cliente ── */}
      {data.status !== "CANCELLED" && (
        <>
          {data.proposals.length > 0 && data.status === "RECEIVED" && (
            <div style={{ borderRadius: "14px", background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)", border: "1px solid #c4b5fd", padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 800, color: "#5b21b6", marginBottom: "4px" }}>Listo para enviar al cliente</div>
                <div style={{ fontSize: "13px", color: "#6b7280", maxWidth: "480px" }}>
                  El cliente recibirá un link para ver las propuestas, elegir plantillas adicionales y subir su comprobante de pago — todo en un mismo lugar.
                </div>
              </div>
              <button
                disabled={sendingCheckout}
                onClick={async () => {
                  setSendingCheckout(true);
                  try {
                    const res = await fetch(`${API}/api/admin/demo/requests/${id}/send-checkout`, { method: "POST" });
                    if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error((err as { message?: string }).message ?? "Error"); }
                    const result = await res.json();
                    setCheckoutLink({ url: result.checkoutLink.url, orderId: result.orderId });
                    loadDetail();
                  } catch (err) {
                    alert(err instanceof Error ? err.message : "Error al enviar");
                  } finally {
                    setSendingCheckout(false);
                  }
                }}
                style={{ flexShrink: 0, padding: "14px 28px", borderRadius: "10px", border: "none", background: sendingCheckout ? "#c4b5fd" : "#7c3aed", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: sendingCheckout ? "wait" : "pointer", fontFamily: "inherit", whiteSpace: "nowrap", boxShadow: "0 4px 14px rgba(124,58,237,0.3)" }}
              >
                {sendingCheckout ? "Generando..." : "Enviar link unificado"}
              </button>
            </div>
          )}

          {(checkoutLink || data.status === "PROPOSALS_SENT") && (() => {
            const activeLink = checkoutLink ?? (data.checkoutLink ? { url: data.checkoutLink.url, orderId: data.checkoutLink.orderId, expiresAt: new Date(data.checkoutLink.expiresAt) } : null);
            const expiresAt = checkoutLink?.expiresAt ?? (data.checkoutLink ? new Date(data.checkoutLink.expiresAt) : null);
            const isExpired = expiresAt ? new Date() > expiresAt : false;
            const isExpiringSoon = expiresAt && !isExpired ? (expiresAt.getTime() - Date.now()) < 2 * 24 * 60 * 60 * 1000 : false;
            const paid = data.hasPaymentProof;

            // Estado 1: pago recibido — proceso completado
            if (paid) return (
              <div style={{ borderRadius: "14px", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: "#065f46", marginBottom: "3px" }}>
                    Proceso completado — pago recibido
                  </div>
                  <div style={{ fontSize: "13px", color: "#6b7280" }}>
                    El cliente subió el comprobante. La orden pasó a revisión de pago.
                    {activeLink && <> &nbsp;·&nbsp; <span style={{ fontWeight: 600 }}>Orden #{activeLink.orderId}</span></>}
                  </div>
                </div>
                {activeLink && (
                  <a href={`/admin/ordenes/${activeLink.orderId}`} style={{ flexShrink: 0, padding: "8px 16px", borderRadius: "8px", border: "1px solid #22c55e", background: "#fff", color: "#065f46", fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>
                    Ver orden →
                  </a>
                )}
              </div>
            );

            // Estado 2: link expirado sin pago
            if (isExpired) return (
              <div style={{ borderRadius: "14px", background: "#fff7ed", border: "1px solid #fed7aa", padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#f97316", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: "#9a3412", marginBottom: "3px" }}>
                    Link expirado — sin pago
                    {expiresAt && <span style={{ fontWeight: 500, color: "#f97316", marginLeft: "8px", fontSize: "12px" }}>· Venció el {expiresAt.toLocaleDateString("es-PE", { day: "numeric", month: "long" })}</span>}
                  </div>
                  <div style={{ fontSize: "13px", color: "#9a3412" }}>El cliente ya no puede acceder. Renová el link para que pueda completar el pago.</div>
                </div>
                <button
                  disabled={reissuingCheckout}
                  onClick={async () => {
                    setReissuingCheckout(true);
                    try {
                      const res = await fetch(`${API}/api/admin/demo/requests/${id}/reissue-checkout`, { method: "POST" });
                      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error((err as { message?: string }).message ?? "Error"); }
                      const result = await res.json();
                      setCheckoutLink({ url: result.checkoutLink.url, orderId: result.orderId, expiresAt: new Date(result.checkoutLink.expiresAt) });
                      loadDetail();
                    } catch (err) { alert(err instanceof Error ? err.message : "Error al renovar"); }
                    finally { setReissuingCheckout(false); }
                  }}
                  style={{ flexShrink: 0, padding: "10px 20px", borderRadius: "8px", border: "none", background: reissuingCheckout ? "#fed7aa" : "#f97316", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: reissuingCheckout ? "wait" : "pointer", fontFamily: "inherit" }}>
                  {reissuingCheckout ? "Renovando..." : "Renovar link"}
                </button>
              </div>
            );

            // Estado 3: link activo, esperando pago
            return (
              <div style={{ borderRadius: "14px", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#065f46", marginBottom: "4px" }}>
                    Link enviado — esperando pago{activeLink ? ` · Orden #${activeLink.orderId}` : ""}
                    {expiresAt && (
                      <span style={{ fontWeight: 500, color: isExpiringSoon ? "#f59e0b" : "#6b7280", marginLeft: "8px", fontSize: "12px" }}>
                        · Vence {expiresAt.toLocaleDateString("es-PE", { day: "numeric", month: "long" })}
                      </span>
                    )}
                  </div>
                  {activeLink && (
                    <code style={{ fontSize: "12px", background: "#dcfce7", color: "#065f46", padding: "2px 8px", borderRadius: "5px", wordBreak: "break-all" }}>{activeLink.url}</code>
                  )}
                </div>
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  {activeLink && (
                    <button onClick={() => navigator.clipboard.writeText(activeLink.url)}
                      style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #22c55e", background: "#fff", color: "#065f46", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                      Copiar link
                    </button>
                  )}
                  <button
                    disabled={reissuingCheckout}
                    onClick={async () => {
                      setReissuingCheckout(true);
                      try {
                        const res = await fetch(`${API}/api/admin/demo/requests/${id}/reissue-checkout`, { method: "POST" });
                        if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error((err as { message?: string }).message ?? "Error"); }
                        const result = await res.json();
                        setCheckoutLink({ url: result.checkoutLink.url, orderId: result.orderId, expiresAt: new Date(result.checkoutLink.expiresAt) });
                        loadDetail();
                      } catch (err) { alert(err instanceof Error ? err.message : "Error al renovar"); }
                      finally { setReissuingCheckout(false); }
                    }}
                    style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #d1d5db", background: "#fff", color: "#374151", fontSize: "12px", fontWeight: 700, cursor: reissuingCheckout ? "wait" : "pointer", fontFamily: "inherit" }}>
                    {reissuingCheckout ? "Renovando..." : "Renovar link"}
                  </button>
                </div>
              </div>
            );
          })()}
        </>
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
