"use client";

import Image from "next/image";
import Link from "next/link";
import { useWindowSize } from "@/hooks/useWindowSize";

type Variant = {
  id: string;
  coverType: string;
  basePriceCents: number;
};

type Props = {
  name: string;
  description: string | null;
  coverImageUrl: string | null;
  variants: Variant[];
  categoryBadge?: string;
  tagline?: string;
  reviewCount?: number;
  rating?: number;
  href?: string;
};

const BADGE_COLORS: Record<string, string> = {
  "LIBRO DE AMOR": "#e74c6f",
  "LIBRO DE MASCOTAS": "#f5a623",
  "LIBRO DE FAMILIA": "#4f97cf",
};

function formatPrice(cents: number): string {
  return `S/ ${(cents / 100).toFixed(2)}`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((pos) => {
        const full = rating >= pos;
        const half = !full && rating >= pos - 0.5;
        return (
          <svg key={pos} width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id={`half-pc-${pos}`}>
                <rect x="0" y="0" width="12" height="24" />
              </clipPath>
            </defs>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#e5e7eb" stroke="none" />
            {(full || half) && (
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                fill="#f5a623"
                stroke="none"
                clipPath={half ? `url(#half-pc-${pos})` : undefined}
              />
            )}
          </svg>
        );
      })}
    </div>
  );
}

export default function ProductCard({
  name,
  description,
  coverImageUrl,
  variants,
  categoryBadge,
  tagline,
  reviewCount = 0,
  rating = 5,
  href,
}: Props) {
  const { isMobile } = useWindowSize();

  const cheapestVariant = variants.length
    ? variants.reduce((a, b) => (a.basePriceCents < b.basePriceCents ? a : b))
    : null;

  const badgeColor = categoryBadge
    ? BADGE_COLORS[categoryBadge] || "#4f97cf"
    : "#4f97cf";

  return (
    <article
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 20px 28px",
        background: "#fff",
        borderRadius: "20px",
        border: "1px solid #e8e8e8",
      }}
    >
      {/* 1. Badge de categoría */}
      {categoryBadge && (
        <div
          style={{
            display: "inline-block",
            padding: "6px 18px",
            borderRadius: "20px",
            background: badgeColor,
            color: "#fff",
            fontSize: "12px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "16px",
          }}
        >
          {categoryBadge}
        </div>
      )}

      {/* 2. Imagen */}
      <div
        style={{
          width: "100%",
          height: isMobile ? "160px" : "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "18px",
        }}
      >
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={name}
            width={320}
            height={220}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              height: "auto",
              width: "auto",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "160px",
              height: "180px",
              background: "linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999",
              fontSize: "14px",
            }}
          >
            Sin imagen
          </div>
        )}
      </div>

      {/* 3. Estrellas */}
      <div style={{ marginBottom: "4px" }}>
        <StarRating rating={rating} />
      </div>

      {/* 4. Reviews */}
      <div
        style={{
          fontSize: "13px",
          color: "#999",
          marginBottom: "14px",
        }}
      >
        {reviewCount} Reviews
      </div>

      {/* 5. Título */}
      <h3
        style={{
          margin: "0 0 6px 0",
          fontSize: "18px",
          lineHeight: 1.5,
          color: "#111",
          fontWeight: 500,
        }}
      >
        {name}
      </h3>

      {/* 6. Tagline */}
      {tagline && (
        <div
          style={{
            fontSize: "14px",
            color: "#4f97cf",
            fontWeight: 500,
            textTransform: "uppercase",
            marginBottom: "10px",
            lineHeight: 1.3,
            maxWidth: "340px",
          }}
        >
          {tagline}
        </div>
      )}

      {/* 7. Descripción */}
      {description && (
        <p
          style={{
            margin: "0 0 14px 0",
            maxWidth: "360px",
            fontSize: "14px",
            lineHeight: 1.5,
            color: "#666",
            fontWeight: 400,
          }}
        >
          {description}
        </p>
      )}

      {/* 8. Precio */}
      {cheapestVariant && (
        <div
          style={{
            margin: "0 0 18px 0",
            fontSize: "18px",
            fontWeight: 500,
            color: "#111",
          }}
        >
          PRECIO {formatPrice(cheapestVariant.basePriceCents)}
        </div>
      )}

      {/* 9. Botón CREAR AQUI */}
      {href ? (
        <Link
          href={href}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "170px",
            height: "42px",
            borderRadius: "14px",
            border: "2px solid #8e8e8e",
            background: "#fff",
            color: "#111",
            fontSize: "16px",
            fontWeight: 700,
            cursor: "pointer",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Crear Aquí
        </Link>
      ) : (
        <button
          style={{
            minWidth: "170px",
            height: "42px",
            borderRadius: "14px",
            border: "2px solid #8e8e8e",
            background: "#fff",
            color: "#111",
            fontSize: "16px",
            fontWeight: 700,
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          Crear Aquí
        </button>
      )}
    </article>
  );
}
