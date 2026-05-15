"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type ActivePromo = {
  id: number;
  label: string;
  targetType: string;
  discountType: string;
  discountValue: number;
  validUntil: string;
};

function formatDiscount(promo: ActivePromo): string {
  return promo.discountType === "percent"
    ? `${promo.discountValue}% OFF`
    : `S/ ${(promo.discountValue / 100).toFixed(2)} OFF`;
}

function formatDeadline(iso: string): string {
  return new Date(iso).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function useCountdown(validUntil: string) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function calc() {
      const diff = new Date(validUntil).getTime() - Date.now();
      if (diff <= 0) return setTimeLeft("Expirada");
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const d = Math.floor(h / 24);
      if (d > 0) return setTimeLeft(`${d}d ${h % 24}h`);
      setTimeLeft(`${h}h ${m}m`);
    }
    calc();
    const id = setInterval(calc, 30_000);
    return () => clearInterval(id);
  }, [validUntil]);

  return timeLeft;
}

function PromoContent({ promo, onClose }: { promo: ActivePromo; onClose: () => void }) {
  const timeLeft = useCountdown(promo.validUntil);
  const discount = formatDiscount(promo);

  const ctaHref = promo.targetType === "all" ? "/libros-personalizados" : "/libros-personalizados";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(32px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "24px",
          maxWidth: "460px",
          width: "100%",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          position: "relative",
          animation: "slideUp 0.3s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Franja superior degradada */}
        <div style={{
          background: "linear-gradient(135deg, #e74c6f 0%, #c0392b 50%, #922b21 100%)",
          padding: "36px 32px 28px",
          textAlign: "center",
          position: "relative",
        }}>
          {/* Círculos decorativos */}
          <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.35)",
            borderRadius: "20px", padding: "5px 14px",
            marginBottom: "16px",
            fontSize: "11px", fontWeight: 700, color: "#fff",
            letterSpacing: "1px", textTransform: "uppercase",
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            </svg>
            Oferta especial
          </div>

          {/* Título de la promo */}
          <h2 style={{ margin: "0 0 12px", fontSize: "22px", fontWeight: 800, color: "#fff", lineHeight: 1.25 }}>
            {promo.label}
          </h2>

          {/* Número del descuento — protagonista */}
          <div style={{ fontSize: "64px", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-2px" }}>
            {discount}
          </div>
        </div>

        {/* Cuerpo */}
        <div style={{ padding: "28px 32px 32px", textAlign: "center" }}>

          {/* Descripción según targetType */}
          <p style={{ margin: "0 0 20px", fontSize: "15px", color: "#4b5563", lineHeight: 1.6 }}>
            {promo.targetType === "all"
              ? "Aplicado automáticamente en todos nuestros libros personalizados y photobooks."
              : "Aplicado en los libros seleccionados de nuestra colección."}
          </p>

          {/* Countdown */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#fef3c7", border: "1px solid #fbbf24",
            borderRadius: "10px", padding: "8px 16px",
            marginBottom: "24px",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#92400e" }}>
              Termina: {formatDeadline(promo.validUntil)}
              {timeLeft && timeLeft !== "Expirada" && ` (${timeLeft} restantes)`}
            </span>
          </div>

          {/* CTA principal */}
          <Link
            href={ctaHref}
            onClick={onClose}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              width: "100%", padding: "14px 24px",
              borderRadius: "14px", border: "none",
              background: "linear-gradient(135deg, #e74c6f 0%, #c0392b 100%)",
              color: "#fff", fontSize: "15px", fontWeight: 800,
              textDecoration: "none", letterSpacing: "0.02em",
              boxShadow: "0 6px 20px rgba(231,76,111,0.4)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(231,76,111,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(231,76,111,0.4)";
            }}
          >
            Aprovechar descuento
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          {/* Dismiss */}
          <button
            onClick={onClose}
            style={{
              display: "block", width: "100%", marginTop: "12px",
              padding: "10px", background: "none", border: "none",
              color: "#9ca3af", fontSize: "13px", cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            No, gracias
          </button>
        </div>

        {/* Botón cerrar esquina */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "14px", right: "14px",
            width: "30px", height: "30px", borderRadius: "50%",
            border: "none", background: "rgba(255,255,255,0.2)",
            color: "#fff", fontSize: "14px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "inherit",
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function PromoModal() {
  const [promo, setPromo] = useState<ActivePromo | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/promotions/active`)
      .then((r) => r.ok ? r.json() : [])
      .then((promos: ActivePromo[]) => {
        if (!promos.length) return;
        const best = promos[0];
        // Una vez por promo (se resetea cuando cambia la promo)
        const key = `promo_modal_${best.id}`;
        if (sessionStorage.getItem(key)) return;
        setPromo(best);
        setVisible(true);
      })
      .catch(() => {});
  }, []);

  function close() {
    if (promo) sessionStorage.setItem(`promo_modal_${promo.id}`, "1");
    setVisible(false);
  }

  if (!visible || !promo) return null;
  return <PromoContent promo={promo} onClose={close} />;
}
