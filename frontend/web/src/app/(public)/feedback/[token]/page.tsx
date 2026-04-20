"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type FeedbackInfo = { orderId: number; customerName: string; channel: string };

export default function FeedbackPage() {
  const params = useParams();
  const token = params.token as string;
  const [info, setInfo] = useState<FeedbackInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [ratingX2, setRatingX2] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ stars: number; redirectToGoogle: boolean; googleReviewUrl: string | null } | null>(null);

  useEffect(() => {
    fetch(`${API}/api/feedback/${token}`)
      .then(async (res) => {
        if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error((err as { message?: string }).message ?? "Link inválido"); }
        return res.json();
      })
      .then(setInfo)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleSubmit() {
    if (ratingX2 === 0) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/api/feedback/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ratingX2, comment: comment || undefined }),
      });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error((err as { message?: string }).message ?? "Error"); }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>Cargando...</div>;
  if (error) return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px", textAlign: "center" }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>😔</div>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Link no válido</h1>
      <p style={{ fontSize: "16px", color: "#6b7280" }}>{error}</p>
    </div>
  );
  if (!info) return null;

  // Result screen
  if (result) {
    return (
      <div style={{ maxWidth: "500px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "56px", marginBottom: "16px" }}>{result.redirectToGoogle ? "🌟" : "💜"}</div>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#111", marginBottom: "12px" }}>
          {result.redirectToGoogle ? "¡Muchas gracias!" : "Gracias por tu feedback"}
        </h1>
        <p style={{ fontSize: "16px", color: "#6b7280", lineHeight: 1.6, marginBottom: "24px" }}>
          {result.redirectToGoogle
            ? "Tu valoración significa mucho para nosotros. ¿Podrías dejarnos una reseña en Google? Nos ayuda a que más personas conozcan PixelArt."
            : "Tu opinión es muy importante para nosotros. Trabajaremos para mejorar tu experiencia."}
        </p>
        {result.redirectToGoogle && result.googleReviewUrl && (
          <a
            href={result.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", padding: "14px 32px", borderRadius: "12px", background: "#4285f4", color: "#fff", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
          >
            Dejar reseña en Google
          </a>
        )}
      </div>
    );
  }

  // Rating screen
  const stars = ratingX2 / 2;

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
          Califica tu experiencia
        </div>
        <h1 style={{ margin: "0 0 8px 0", fontSize: "28px", fontWeight: 800, color: "#111" }}>
          {info.customerName}
        </h1>
      </div>

      {/* Star selector */}
      <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "8px" }}>
        {Array.from({ length: 10 }).map((_, i) => {
          const halfIndex = i + 1;
          const isLeft = i % 2 === 0;
          const starIndex = Math.floor(i / 2);
          const filled = halfIndex <= ratingX2;

          return (
            <div
              key={i}
              onClick={() => setRatingX2(halfIndex)}
              style={{
                width: "24px",
                height: "48px",
                cursor: "pointer",
                overflow: "hidden",
                display: "flex",
                alignItems: isLeft ? "center" : "center",
                justifyContent: isLeft ? "flex-end" : "flex-start",
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill={filled ? "#f5a623" : "#e5e7eb"}
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  flexShrink: 0,
                  marginLeft: isLeft ? "0" : "-24px",
                  marginRight: isLeft ? "-24px" : "0",
                }}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", fontSize: "20px", fontWeight: 700, color: "#111", marginBottom: "24px" }}>
        {stars > 0 ? `${stars} de 5 estrellas` : "Toca para calificar"}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Cuéntanos tu experiencia (opcional)"
        style={{ width: "100%", minHeight: "100px", padding: "14px", borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "15px", fontFamily: "inherit", resize: "vertical", marginBottom: "24px" }}
      />

      <button
        disabled={ratingX2 === 0 || submitting}
        onClick={handleSubmit}
        style={{
          width: "100%", padding: "16px", borderRadius: "12px", border: "none",
          background: ratingX2 === 0 ? "#e5e7eb" : "#8b5cf6",
          color: ratingX2 === 0 ? "#999" : "#fff",
          fontSize: "17px", fontWeight: 700, cursor: ratingX2 === 0 ? "not-allowed" : "pointer", fontFamily: "inherit",
        }}
      >
        {submitting ? "Enviando..." : "Enviar calificación"}
      </button>
    </div>
  );
}
