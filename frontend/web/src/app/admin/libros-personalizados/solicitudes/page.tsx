"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type DemoRequest = {
  id: number;
  customerFullName: string;
  customerEmail: string;
  personalizedModelId: number;
  catalogBookVariantId: number;
  wantsCustomDedication: boolean;
  status: string;
  createdAt: string;
};

const STATUS_MAP: Record<string, { bg: string; text: string; label: string }> = {
  RECEIVED:        { bg: "#dbeafe", text: "#1e40af", label: "Recibida"            },
  PROPOSALS_SENT:  { bg: "#d1fae5", text: "#065f46", label: "Propuestas Enviadas" },
  CANCELLED:       { bg: "#fee2e2", text: "#991b1b", label: "Cancelada"           },
};

type FilterKey = "all" | "pending" | "sent" | "cancelled";

const FILTERS: { key: FilterKey; label: string; statuses?: string[] }[] = [
  { key: "all",       label: "Todas"               },
  { key: "pending",   label: "Sin propuesta",  statuses: ["RECEIVED"]       },
  { key: "sent",      label: "Enviadas",        statuses: ["PROPOSALS_SENT"] },
  { key: "cancelled", label: "Canceladas",      statuses: ["CANCELLED"]      },
];

function timeAgo(iso: string): { text: string; color: string } {
  const ms   = Date.now() - new Date(iso).getTime();
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  if (days === 0) return { text: "Hoy",         color: "#22c55e" };
  if (days === 1) return { text: "Ayer",         color: "#6b7280" };
  if (days <= 3)  return { text: `${days} días`, color: "#f59e0b" };
  return             { text: `${days} días`, color: "#ef4444" };
}

export default function SolicitudesPage() {
  const [requests,    setRequests]    = useState<DemoRequest[]>([]);
  const [modelNames,  setModelNames]  = useState<Record<number, string>>({});
  const [loading,     setLoading]     = useState(true);
  const [filter,      setFilter]      = useState<FilterKey>("all");

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/admin/demo/requests`).then((r) => r.json()).catch(() => []),
      // Cargar nombres de modelos: primero categorías, luego modelos de cada una
      fetch(`${API}/api/personalized/categories`)
        .then((r) => r.json())
        .then(async (cats) => {
          const categories: { id: number | string }[] = Array.isArray(cats) ? cats : cats.data ?? [];
          const results = await Promise.all(
            categories.map((cat) =>
              fetch(`${API}/api/personalized/categories/${cat.id}/models`)
                .then((r) => r.json())
                .catch(() => [])
            )
          );
          const map: Record<number, string> = {};
          results.flat().forEach((m: { id: number | string; name: string }) => {
            map[Number(m.id)] = m.name;
          });
          return map;
        })
        .catch(() => ({})),
    ]).then(([reqs, names]) => {
      setRequests(Array.isArray(reqs) ? reqs : reqs.data ?? []);
      setModelNames(names as Record<number, string>);
    }).finally(() => setLoading(false));
  }, []);

  const filtered = filter === "all"
    ? requests
    : requests.filter((r) => FILTERS.find((f) => f.key === filter)?.statuses?.includes(r.status));

  const counts: Record<FilterKey, number> = {
    all:       requests.length,
    pending:   requests.filter((r) => r.status === "RECEIVED").length,
    sent:      requests.filter((r) => r.status === "PROPOSALS_SENT").length,
    cancelled: requests.filter((r) => r.status === "CANCELLED").length,
  };

  const TH_STYLE: React.CSSProperties = { textAlign: "left", padding: "12px 16px", fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #e5e7eb" };

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: "0 0 4px 0", fontSize: "28px", fontWeight: 800, color: "#111" }}>Solicitudes Demo</h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>Solicitudes de libros personalizados</p>
      </div>

      {/* Filtros */}
      {!loading && (
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
          {FILTERS.map((f) => {
            const isActive = filter === f.key;
            const isUrgent = f.key === "pending" && counts.pending > 0;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  padding: "7px 16px",
                  borderRadius: "8px",
                  border: isActive ? "none" : "1px solid #e5e7eb",
                  background: isActive ? "#111" : "#fff",
                  color: isActive ? "#fff" : "#374151",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {f.label}
                <span style={{
                  background: isActive ? "rgba(255,255,255,0.2)" : isUrgent ? "#ef4444" : "#f3f4f6",
                  color: isActive ? "#fff" : isUrgent ? "#fff" : "#6b7280",
                  fontSize: "11px",
                  fontWeight: 700,
                  borderRadius: "999px",
                  padding: "1px 6px",
                  minWidth: "18px",
                  textAlign: "center",
                }}>
                  {counts[f.key]}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {loading ? (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
          <style>{`@keyframes sk-pulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["#", "Cliente", "Libro", "Dedicatoria", "Estado", "Espera", ""].map((h) => (
                  <th key={h} style={TH_STYLE}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  {[40, 120, 180, 60, 80, 55, 50].map((w, j) => (
                    <td key={j} style={{ padding: "14px 16px" }}>
                      <div style={{ height: 13, width: w, borderRadius: 4, background: "#f0f0f0", animation: "sk-pulse 1.4s ease-in-out infinite", animationDelay: `${i * 0.05}s` }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: "48px", textAlign: "center", color: "#999", background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          No hay solicitudes en esta categoría.
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["#", "Cliente", "Libro", "Dedicatoria", "Estado", "Espera", ""].map((h) => (
                  <th key={h} style={TH_STYLE}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((req) => {
                const st  = STATUS_MAP[req.status] ?? { bg: "#f3f4f6", text: "#374151", label: req.status };
                const age = timeAgo(req.createdAt);
                const bookName = modelNames[req.personalizedModelId] ?? `Modelo #${req.personalizedModelId}`;
                return (
                  <tr key={req.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 600, color: "#111" }}>{req.id}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>{req.customerFullName}</div>
                      <div style={{ fontSize: "12px", color: "#9ca3af" }}>{req.customerEmail}</div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", color: "#374151", maxWidth: "200px" }}>
                      <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{bookName}</div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", color: req.wantsCustomDedication ? "#22c55e" : "#9ca3af", fontWeight: req.wantsCustomDedication ? 600 : 400 }}>
                      {req.wantsCustomDedication ? "Sí" : "No"}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "6px", background: st.bg, color: st.text, fontSize: "11px", fontWeight: 600 }}>{st.label}</span>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "12px", fontWeight: 600, color: age.color }}>{age.text}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <Link href={`/admin/libros-personalizados/solicitudes/${req.id}`} style={{ fontSize: "13px", fontWeight: 600, color: "#3b82f6", textDecoration: "none" }}>Ver detalle</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Leyenda de estados */}
      <div style={{ marginTop: "20px", padding: "20px 24px", background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "14px" }}>
          Guía de estados
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {[
            {
              bg: "#dbeafe", text: "#1e40af", label: "Recibida",
              desc: "El cliente completó el formulario. Todavía no se le envió ninguna propuesta de diseño.",
            },
            {
              bg: "#d1fae5", text: "#065f46", label: "Propuestas Enviadas",
              desc: "Se generó y envió al cliente el link con las propuestas de plantillas para que elija.",
            },
            {
              bg: "#fee2e2", text: "#991b1b", label: "Cancelada",
              desc: "La solicitud fue descartada y no continuará en el flujo de producción.",
            },
          ].map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "flex-start", gap: "10px", flex: "1 1 220px", minWidth: 0 }}>
              <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "6px", background: s.bg, color: s.text, fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0, marginTop: "1px" }}>
                {s.label}
              </span>
              <span style={{ fontSize: "12px", color: "#6b7280", lineHeight: "1.5" }}>{s.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
