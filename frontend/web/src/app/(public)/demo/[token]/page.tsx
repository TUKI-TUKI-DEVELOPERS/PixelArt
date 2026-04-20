"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type Proposal = {
  templateId: number;
  templateName: string | null;
  templatePreviewUrl: string | null;
  imageUrl: string;
  protectionMode: string;
};

type DemoView = {
  customerName: string;
  bookName: string;
  proposals: Proposal[];
  expiresAt: string;
};

export default function DemoViewPage() {
  const params = useParams();
  const token = params.token as string;
  const [data, setData] = useState<DemoView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API}/api/demo/view/${token}`)
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as { message?: string }).message ?? "Link inválido");
        }
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#faf9f7" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #e5e7eb", borderTopColor: "#111", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          <div style={{ fontSize: "15px", color: "#6b7280" }}>Cargando tus propuestas...</div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px", textAlign: "center", background: "#faf9f7" }}>
        <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
        </div>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111", margin: "0 0 8px 0" }}>Link no disponible</h1>
        <p style={{ fontSize: "15px", color: "#6b7280", margin: 0, maxWidth: "400px" }}>{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const selectedProposal = selected !== null ? data.proposals.find((p) => p.templateId === selected) : null;

  return (
    <div style={{ minHeight: "100vh", background: "#faf9f7" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "20px", background: "#f0fdf4", border: "1px solid #bbf7d0", fontSize: "12px", fontWeight: 600, color: "#16a34a", marginBottom: "16px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
            Propuestas listas
          </div>
          <h1 style={{ margin: "0 0 6px 0", fontSize: "28px", fontWeight: 800, color: "#111" }}>
            {data.customerName}
          </h1>
          <p style={{ margin: "0 0 12px 0", fontSize: "17px", color: "#6b7280", fontWeight: 500 }}>
            {data.bookName}
          </p>
          <p style={{ margin: 0, fontSize: "13px", color: "#9ca3af" }}>
            Link disponible hasta el {new Date(data.expiresAt).toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 60px" }}>
        {/* Proposals grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: data.proposals.length === 1 ? "minmax(0, 500px)" : data.proposals.length === 2 ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
          gap: "24px",
          justifyContent: "center",
          marginBottom: "40px",
        }}>
          {data.proposals.map((p, i) => {
            const isSelected = selected === p.templateId;
            return (
              <div
                key={p.templateId}
                onClick={() => setSelected(isSelected ? null : p.templateId)}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  border: isSelected ? "2px solid #111" : "1px solid #e5e7eb",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: isSelected ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isSelected
                    ? "0 20px 40px -10px rgba(0,0,0,0.15)"
                    : "0 4px 12px rgba(0,0,0,0.04)",
                }}
              >
                {/* Proposal image (admin-generated) */}
                <div style={{ position: "relative", background: "#f3f4f6" }}>
                  <img
                    src={p.imageUrl}
                    alt={p.templateName ?? `Propuesta ${i + 1}`}
                    style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }}
                  />
                  {/* Proposal number badge */}
                  <div style={{
                    position: "absolute", top: "12px", left: "12px",
                    padding: "4px 12px", borderRadius: "20px",
                    background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
                    color: "#fff", fontSize: "12px", fontWeight: 600,
                  }}>
                    Propuesta {i + 1}
                  </div>
                </div>

                {/* Template reference + info */}
                <div style={{ padding: "16px" }}>
                  {/* Template name */}
                  <h3 style={{ margin: "0 0 12px 0", fontSize: "15px", fontWeight: 700, color: "#111", lineHeight: 1.3 }}>
                    {p.templateName ?? `Escenario ${i + 1}`}
                  </h3>

                  {/* Original template preview (reference) */}
                  {p.templatePreviewUrl && (
                    <div style={{ marginBottom: "12px" }}>
                      <div style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                        Escenario de referencia
                      </div>
                      <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #e5e7eb" }}>
                        <img
                          src={p.templatePreviewUrl}
                          alt={`Referencia: ${p.templateName}`}
                          style={{ width: "100%", aspectRatio: "2/1", objectFit: "cover", display: "block" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Selection indicator */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                    padding: "8px 0", borderRadius: "8px",
                    background: isSelected ? "#111" : "#f9fafb",
                    color: isSelected ? "#fff" : "#6b7280",
                    fontSize: "13px", fontWeight: 600,
                    transition: "all 0.2s ease",
                  }}>
                    {isSelected ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                        Seleccionada
                      </>
                    ) : (
                      "Toca para ver detalle"
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expanded view when selected */}
        {selectedProposal && (
          <div style={{
            background: "#fff", borderRadius: "20px", border: "1px solid #e5e7eb",
            padding: "32px", marginBottom: "32px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#111" }}>
                {selectedProposal.templateName ?? "Propuesta seleccionada"}
              </h2>
              <button
                onClick={() => setSelected(null)}
                style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: selectedProposal.templatePreviewUrl ? "1fr 1fr" : "1fr", gap: "20px" }}>
              {/* Full proposal image */}
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>
                  Tu propuesta personalizada
                </div>
                <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e5e7eb" }}>
                  <img
                    src={selectedProposal.imageUrl}
                    alt={selectedProposal.templateName ?? "Propuesta"}
                    style={{ width: "100%", display: "block" }}
                  />
                </div>
              </div>

              {/* Original template reference */}
              {selectedProposal.templatePreviewUrl && (
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>
                    Escenario original
                  </div>
                  <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e5e7eb" }}>
                    <img
                      src={selectedProposal.templatePreviewUrl}
                      alt={`Referencia: ${selectedProposal.templateName}`}
                      style={{ width: "100%", display: "block" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer info */}
        <div style={{ textAlign: "center", padding: "28px 24px", background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "20px", marginBottom: "12px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" style={{ display: "inline" }}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
          </div>
          <p style={{ margin: "0 0 8px 0", fontSize: "15px", fontWeight: 600, color: "#374151" }}>
            Estas son vistas previas protegidas de tu libro
          </p>
          <p style={{ margin: 0, fontSize: "14px", color: "#6b7280", lineHeight: 1.6, maxWidth: "500px", marginLeft: "auto", marginRight: "auto" }}>
            Si te gustan las propuestas, recibirás un enlace de pago por correo electrónico para confirmar tu pedido y recibir el libro en alta calidad.
          </p>
        </div>
      </div>
    </div>
  );
}
