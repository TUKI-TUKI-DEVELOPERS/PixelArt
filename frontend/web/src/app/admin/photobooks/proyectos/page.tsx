"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type Project = { id: number; customerEmail: string; customerFullName: string | null; photobookThemeId: number; pageCount: number; calculatedTotalCents: number; status: string; createdAt: string };

const STATUS_MAP: Record<string, { bg: string; text: string; label: string }> = {
  DRAFT: { bg: "#f3f4f6", text: "#6b7280", label: "Borrador" },
  CONFIRMED: { bg: "#dbeafe", text: "#1e40af", label: "Confirmado" },
  CONVERTED_TO_ORDER: { bg: "#d1fae5", text: "#065f46", label: "Orden Creada" },
};

export default function ProyectosPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/admin/photobook/projects`).then((r) => r.json()).then(setProjects).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: "0 0 4px", fontSize: "28px", fontWeight: 800, color: "#111" }}>Proyectos Photobook</h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>Proyectos confirmados por clientes</p>
      </div>

      {loading ? (
        <div style={{ padding: "48px", textAlign: "center", color: "#999" }}>Cargando...</div>
      ) : projects.length === 0 ? (
        <div style={{ padding: "48px", textAlign: "center", color: "#999" }}>No hay proyectos aún.</div>
      ) : (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["#", "Cliente", "Páginas", "Total", "Estado", "Fecha", ""].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => {
                const st = STATUS_MAP[p.status] ?? { bg: "#f3f4f6", text: "#374151", label: p.status };
                return (
                  <tr key={p.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 600 }}>{p.id}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>{p.customerFullName ?? "—"}</div>
                      <div style={{ fontSize: "12px", color: "#9ca3af" }}>{p.customerEmail}</div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "13px" }}>{p.pageCount}</td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 600 }}>S/ {(p.calculatedTotalCents / 100).toFixed(2)}</td>
                    <td style={{ padding: "14px 16px" }}><span style={{ padding: "4px 10px", borderRadius: "6px", background: st.bg, color: st.text, fontSize: "11px", fontWeight: 600 }}>{st.label}</span></td>
                    <td style={{ padding: "14px 16px", fontSize: "12px", color: "#9ca3af" }}>{new Date(p.createdAt).toLocaleDateString("es-PE")}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <Link href={`/admin/photobooks/proyectos/${p.id}`} style={{ fontSize: "13px", fontWeight: 600, color: "#3b82f6", textDecoration: "none" }}>Ver</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
