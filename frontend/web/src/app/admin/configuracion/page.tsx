"use client";

import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function ConfiguracionPage() {
  const [bannerText, setBannerText] = useState("");
  const [bannerColor, setBannerColor] = useState("#1a1a2e");
  const [bannerEnabled, setBannerEnabled] = useState(true);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalEnabled, setModalEnabled] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Load config
  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/site-config/promo_banner`).then((r) => r.ok ? r.json() : null),
      fetch(`${API}/api/site-config/promo_modal`).then((r) => r.ok ? r.json() : null),
    ]).then(([banner, modal]) => {
      if (banner?.value) {
        setBannerText((banner.value as { text?: string }).text ?? "");
        setBannerColor((banner.value as { color?: string }).color ?? "#1a1a2e");
        setBannerEnabled((banner.value as { enabled?: boolean }).enabled ?? true);
      }
      if (modal?.value) {
        setModalTitle((modal.value as { title?: string }).title ?? "");
        setModalDescription((modal.value as { description?: string }).description ?? "");
        setModalEnabled((modal.value as { enabled?: boolean }).enabled ?? false);
      }
      setLoaded(true);
    });
  }, []);

  async function saveBanner() {
    setSaving("banner");
    await fetch(`${API}/api/admin/site-config/promo_banner`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: { text: bannerText, color: bannerColor, enabled: bannerEnabled } }),
    });
    setSaving(null);
  }

  async function saveModal() {
    setSaving("modal");
    await fetch(`${API}/api/admin/site-config/promo_modal`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: { title: modalTitle, description: modalDescription, enabled: modalEnabled } }),
    });
    setSaving(null);
  }

  if (!loaded) return <div style={{ padding: "32px", color: "#999" }}>Cargando...</div>;

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "0 0 4px", fontSize: "28px", fontWeight: 800, color: "#111" }}>Configuración</h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>Banner de promoción y modal de marketing</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Banner */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>Banner Superior</h2>
            <button onClick={() => setBannerEnabled(!bannerEnabled)} style={{ padding: "6px 14px", borderRadius: "6px", border: "none", background: bannerEnabled ? "#22c55e" : "#e5e7eb", color: bannerEnabled ? "#fff" : "#6b7280", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              {bannerEnabled ? "Activo" : "Inactivo"}
            </button>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Texto</label>
            <input value={bannerText} onChange={(e) => setBannerText(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit" }} />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Color de fondo</label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input type="color" value={bannerColor} onChange={(e) => setBannerColor(e.target.value)} style={{ width: "40px", height: "40px", border: "none", borderRadius: "8px", cursor: "pointer" }} />
              <input value={bannerColor} onChange={(e) => setBannerColor(e.target.value)} style={{ flex: 1, padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit" }} />
            </div>
          </div>

          <div style={{ fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Vista previa</div>
          <div style={{ padding: "12px", borderRadius: "8px", background: bannerColor, color: "#fff", fontSize: "13px", fontWeight: 600, textAlign: "center" }}>
            {bannerText || "(sin texto)"}
          </div>

          <button onClick={saveBanner} disabled={saving === "banner"} style={{ marginTop: "16px", width: "100%", padding: "10px", borderRadius: "8px", border: "none", background: "#111", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            {saving === "banner" ? "Guardando..." : "Guardar Banner"}
          </button>
        </div>

        {/* Modal */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>Modal de Promoción</h2>
            <button onClick={() => setModalEnabled(!modalEnabled)} style={{ padding: "6px 14px", borderRadius: "6px", border: "none", background: modalEnabled ? "#22c55e" : "#e5e7eb", color: modalEnabled ? "#fff" : "#6b7280", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              {modalEnabled ? "Activo" : "Inactivo"}
            </button>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Título</label>
            <input value={modalTitle} onChange={(e) => setModalTitle(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit" }} />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Descripción</label>
            <textarea value={modalDescription} onChange={(e) => setModalDescription(e.target.value)} style={{ width: "100%", minHeight: "80px", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit", resize: "vertical" }} />
          </div>

          <div style={{ fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Vista previa</div>
          <div style={{ padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb", background: "#fafafa", textAlign: "center" }}>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#111", marginBottom: "8px" }}>{modalTitle || "(sin título)"}</div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>{modalDescription || "(sin descripción)"}</div>
          </div>

          <button onClick={saveModal} disabled={saving === "modal"} style={{ marginTop: "16px", width: "100%", padding: "10px", borderRadius: "8px", border: "none", background: "#111", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            {saving === "modal" ? "Guardando..." : "Guardar Modal"}
          </button>
        </div>
      </div>
    </div>
  );
}
