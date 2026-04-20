"use client";

const CATEGORIES = [
  { id: 1, name: "Infantil", models: 2, templates: 5, active: true },
  { id: 2, name: "Romántico", models: 3, templates: 8, active: true },
  { id: 3, name: "Familiar", models: 6, templates: 12, active: true },
];

const MODELS = [
  { id: 1, name: "Aventura Espacial", category: "Infantil", templates: 2, active: true },
  { id: 2, name: "Princesa del Bosque", category: "Infantil", templates: 3, active: true },
  { id: 3, name: "10 Razones por las que Te Amo", category: "Romántico", templates: 3, active: true },
  { id: 4, name: "Mi Amor", category: "Romántico", templates: 3, active: true },
  { id: 5, name: "1025 Días Enamorándome De Ti", category: "Romántico", templates: 2, active: true },
  { id: 6, name: "Papá, Mi Héroe", category: "Familiar", templates: 2, active: true },
  { id: 7, name: "Mamá, Mi Heroína", category: "Familiar", templates: 2, active: true },
  { id: 8, name: "Te Amo, Abuelo", category: "Familiar", templates: 2, active: true },
];

export default function AdminPersonalizadosPage() {
  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "0 0 4px 0", fontSize: "28px", fontWeight: 800, color: "#111" }}>Libros Personalizados</h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>Gestión de categorías, modelos y plantillas</p>
      </div>

      {/* Categorías */}
      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>Categorías</h2>
          <button style={{ padding: "8px 16px", borderRadius: "8px", border: "1px dashed #d1d5db", background: "#fff", color: "#6b7280", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>+ Agregar</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {CATEGORIES.map((c) => (
            <div key={c.id} style={{ padding: "16px", borderRadius: "10px", border: "1px solid #e5e7eb", background: "#fafafa" }}>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>{c.name}</div>
              <div style={{ fontSize: "13px", color: "#6b7280" }}>{c.models} modelos · {c.templates} plantillas</div>
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <button style={{ fontSize: "12px", color: "#3b82f6", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Editar</button>
                <button style={{ fontSize: "12px", color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Desactivar</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modelos */}
      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>Modelos y Plantillas</h2>
          <button style={{ padding: "8px 16px", borderRadius: "8px", border: "1px dashed #d1d5db", background: "#fff", color: "#6b7280", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>+ Agregar Modelo</button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Modelo", "Categoría", "Plantillas", "Estado", "Acciones"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODELS.map((m) => (
              <tr key={m.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 600, color: "#111" }}>{m.name}</td>
                <td style={{ padding: "12px 16px", fontSize: "13px", color: "#374151" }}>{m.category}</td>
                <td style={{ padding: "12px 16px", fontSize: "13px", color: "#374151" }}>{m.templates}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ padding: "4px 10px", borderRadius: "6px", background: "#d1fae5", color: "#065f46", fontSize: "11px", fontWeight: 600 }}>Activo</span>
                </td>
                <td style={{ padding: "12px 16px", display: "flex", gap: "8px" }}>
                  <button style={{ fontSize: "12px", color: "#3b82f6", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Editar</button>
                  <button style={{ fontSize: "12px", color: "#8b5cf6", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Plantillas</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
