"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { tokens } from "@/lib/design-tokens";

const API = "";

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

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="promo-modal-backdrop" onClick={onClose}>
      <style>{`
        @keyframes promo-modal-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes promo-modal-enter {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .promo-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(17, 17, 17, 0.68);
          animation: promo-modal-fade-in 180ms ease-out both;
        }

        .promo-modal-card {
          width: min(100%, 480px);
          overflow: hidden;
          background: ${tokens.colors.neutral.surface.base};
          border: 1px solid ${tokens.colors.neutral.surface.border};
          border-radius: ${tokens.borderRadius.lg};
          box-shadow: ${tokens.shadows.sm};
          animation: promo-modal-enter 240ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .promo-modal-close,
        .promo-modal-dismiss,
        .promo-modal-cta {
          font-family: ${tokens.fonts.body};
        }

        .promo-modal-close {
          transition: background-color 150ms ease, color 150ms ease;
        }

        .promo-modal-close:hover {
          background: ${tokens.colors.neutral.surface.hover};
          color: ${tokens.colors.neutral.text.primary};
        }

        .promo-modal-cta {
          transition: transform 150ms ease, background-color 150ms ease, box-shadow 150ms ease;
        }

        .promo-modal-cta:hover {
          transform: translateY(-2px);
          background: ${tokens.colors.customBooks.accent};
          box-shadow: 0 6px 8px rgba(17, 17, 17, 0.18);
        }

        .promo-modal-cta:focus-visible,
        .promo-modal-close:focus-visible,
        .promo-modal-dismiss:focus-visible {
          outline: 3px solid ${tokens.colors.customBooks.hover};
          outline-offset: 3px;
        }

        .promo-modal-dismiss:hover {
          color: ${tokens.colors.neutral.text.primary};
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        @media (max-width: 480px) {
          .promo-modal-backdrop { padding: 12px; align-items: flex-end; }
          .promo-modal-card { border-radius: ${tokens.borderRadius.md}; }
          .promo-modal-header { padding: 28px 24px 22px !important; }
          .promo-modal-body { padding: 24px !important; }
          .promo-modal-discount { font-size: 52px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .promo-modal-backdrop,
          .promo-modal-card { animation: none; }
          .promo-modal-cta { transition: none; }
        }
      `}</style>

      <section
        aria-modal="true"
        aria-labelledby="promo-modal-title"
        className="promo-modal-card"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div style={{ height: "4px", background: tokens.colors.customBooks.primary }} />

        <header className="promo-modal-header" style={{ padding: "32px 32px 26px", position: "relative" }}>
          <button
            aria-label="Cerrar promoción"
            className="promo-modal-close"
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "32px",
              height: "32px",
              display: "grid",
              placeItems: "center",
              border: "none",
              borderRadius: "50%",
              background: "transparent",
              color: tokens.colors.neutral.text.tertiary,
              cursor: "pointer",
              fontSize: "20px",
              lineHeight: 1,
            }}
            type="button"
          >
            ×
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
            <span style={{ width: "28px", height: "2px", background: tokens.colors.customBooks.primary }} />
            <span style={{ color: tokens.colors.neutral.text.tertiary, fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Promoción
            </span>
          </div>

          <h2
            id="promo-modal-title"
            style={{
              maxWidth: "13ch",
              margin: 0,
              color: tokens.colors.neutral.text.primary,
              fontFamily: tokens.fonts.display,
              fontSize: "clamp(30px, 7vw, 40px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              textWrap: "balance",
            }}
          >
            {promo.label}
          </h2>
        </header>

        <div className="promo-modal-body" style={{ padding: "0 32px 32px" }}>
          <div style={{ padding: "22px 0 24px", borderTop: `1px solid ${tokens.colors.neutral.surface.divider}`, borderBottom: `1px solid ${tokens.colors.neutral.surface.divider}` }}>
            <span style={{ display: "block", marginBottom: "6px", color: tokens.colors.neutral.text.tertiary, fontSize: "13px", fontWeight: 600 }}>
              Descuento
            </span>
            <div
              aria-label={`Descuento de ${discount}`}
              className="promo-modal-discount"
              style={{
                color: tokens.colors.customBooks.primary,
                fontFamily: tokens.fonts.body,
                fontSize: "64px",
                fontWeight: 800,
                letterSpacing: "-0.045em",
                lineHeight: 0.95,
              }}
            >
              {discount}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "18px 0 24px", color: tokens.colors.neutral.text.secondary }}>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto", marginTop: "1px", color: tokens.colors.customBooks.primary }}>
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.5 }}>
              Válida hasta <strong style={{ color: tokens.colors.neutral.text.primary, fontWeight: 700 }}>{formatDeadline(promo.validUntil)}</strong>
              {timeLeft && timeLeft !== "Expirada" && <><span aria-hidden="true"> · </span>Quedan {timeLeft}</>}
            </p>
          </div>

          <Link
            className="promo-modal-cta"
            href="/libros-personalizados"
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "100%",
              minHeight: "52px",
              borderRadius: tokens.borderRadius.full,
              background: tokens.colors.customBooks.primary,
              color: "#fff",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.01em",
              textDecoration: "none",
              boxShadow: "0 4px 8px rgba(17, 17, 17, 0.14)",
            }}
          >
            Ver la promoción
            <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>

          <button
            className="promo-modal-dismiss"
            onClick={onClose}
            style={{
              display: "block",
              width: "100%",
              marginTop: "14px",
              padding: "8px",
              border: "none",
              background: "transparent",
              color: tokens.colors.neutral.text.tertiary,
              cursor: "pointer",
              fontSize: "13px",
            }}
            type="button"
          >
            Ahora no
          </button>
        </div>
      </section>
    </div>
  );
}

export default function PromoModal() {
  const [promo, setPromo] = useState<ActivePromo | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/promotions/active`)
      .then((response) => response.ok ? response.json() : [])
      .then((promos: ActivePromo[]) => {
        if (!promos.length) return;
        const best = promos[0];
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
