'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { tokens } from '@/lib/design-tokens';
import { hexToRgba } from '@/lib/colors';
import NavIcon from '@/components/layout/NavIcon';
import type { Book, BookCategory } from './NuestrosLibrosSection';

export const CATEGORY_META: Record<BookCategory, { label: string; color: string; icon: string }> = {
  love:       { label: 'Amor',     color: '#B72020',                      icon: 'heart' },
  pets:       { label: 'Mascotas', color: '#f5a623',                      icon: 'paw' },
  family:     { label: 'Familia',  color: '#88C343',                      icon: 'family' },
  memories:   { label: 'Memorias', color: '#8b6bb1',                      icon: 'book' },
  photobooks: { label: 'Photobooks', color: tokens.colors.photobooks.primary, icon: 'camera' },
};

export function formatCents(cents: number) {
  return `S/ ${(cents / 100).toFixed(2)}`;
}

/* Mismo trazado que NavIcon (viewBox 0 0 24 24) — usado para el patrón tileado detrás de la card */
const CATEGORY_PATTERN_SHAPE: Record<BookCategory, string> = {
  love: '<path d="M20.84 4.61C19.85 3.62 18.5 3.06 17.09 3.06C15.68 3.06 14.33 3.62 13.34 4.61L12 5.95L10.66 4.61C8.6 2.55 5.19 2.55 3.13 4.61C1.07 6.67 1.07 10.08 3.13 12.14L12 21L20.84 12.14C22.9 10.08 22.9 6.67 20.84 4.61Z"/>',
  pets: '<circle cx="7" cy="10" r="2"/><circle cx="12" cy="7" r="2"/><circle cx="17" cy="10" r="2"/><path d="M12 22c-2.5 0-5-1.5-5-4 0-2 1.5-3.5 3-3.5.7 0 1.2.4 2 .4s1.3-.4 2-.4c1.5 0 3 1.5 3 3.5 0 2.5-2.5 4-5 4z"/>',
  family: '<circle cx="8" cy="7" r="3"/><circle cx="17" cy="8" r="2.5"/><path d="M2 21v-1c0-3 2.5-5.5 6-5.5s6 2.5 6 5.5v1"/><path d="M14.5 21v-1c0-2-1-4-3.5-5"/><path d="M22 21v-1c0-2.5-1.8-4.5-4.5-4.5"/>',
  memories: '<path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"/><path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z"/>',
  photobooks: '<path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"/><path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"/>',
};

/* Fondo tileado sutil con el ícono de la categoría — data URI SVG, se repite cada 64px */
export function categoryPatternBackground(category: BookCategory, color: string) {
  const shape = CATEGORY_PATTERN_SHAPE[category];
  const strokeColor = hexToRgba(color, 0.16);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><g transform='translate(26,26) scale(0.5)' fill='none' stroke='${strokeColor}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>${shape}</g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export default function NuestrosLibrosCard({
  title, description, image, href = '#', category, price, priceCents, promoPrice,
}: Book) {
  const [liked, setLiked] = useState(false);
  const meta = category ? CATEGORY_META[category] : { label: '', color: tokens.colors.neutral.text.primary, icon: 'book' };

  return (
    /*
     * Wrapper con perspective — necesario para que el rotateX/Y del article tenga
     * profundidad real. Misma mecánica que BookCard.tsx (catálogo): TODA la card
     * rota siguiendo el mouse, y la imagen además tiene su propio salto de elevación
     * en Z (20px reposo → 40px hover) para sentirse flotando por encima del resto.
     */
    <div style={{ perspective: '1200px', height: '100%' }}>
      <article
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          background: '#fff',
          borderRadius: tokens.borderRadius['2xl'],
          border: `1px solid ${tokens.colors.neutral.surface.border}`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.35s ease, box-shadow 0.3s ease',
          willChange: 'transform',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
          el.style.boxShadow = '0 20px 48px rgba(0, 0, 0, 0.14)';

          const img = el.querySelector<HTMLElement>('[data-book-image]');
          if (img) {
            img.style.transform = 'translateZ(40px) scale(1.045)';
          }

          const sheen = el.querySelector<HTMLElement>('[data-sheen]');
          if (sheen) {
            sheen.style.transition = 'none';
            sheen.style.transform = 'translateX(-200%) skewX(-20deg)';
            sheen.getBoundingClientRect();
            sheen.style.transition = 'transform 0.65s ease';
            sheen.style.transform = 'translateX(200%) skewX(-20deg)';
          }
        }}
        onMouseMove={(e) => {
          const el = e.currentTarget;
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const nx = (x - rect.width / 2) / (rect.width / 2);
          const ny = (y - rect.height / 2) / (rect.height / 2);
          const rotY = nx * 7;
          const rotX = -ny * 7;
          el.style.transition = 'transform 0.08s linear';
          el.style.transform = `translateY(-8px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.transition = 'transform 0.45s ease, box-shadow 0.3s ease';
          el.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.06)';
          el.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';

          const img = el.querySelector<HTMLElement>('[data-book-image]');
          if (img) {
            img.style.transform = 'translateZ(20px) scale(1)';
          }
        }}
      >
        {/* Sheen diagonal — barrido de brillo al pasar el mouse */}
        <div
          data-sheen=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '55%',
            background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
            transform: 'translateX(-200%) skewX(-20deg)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />

        {/* Imagen — franja de ancho completo. Ratio ~0.9 (casi cuadrado): un libro apaisado
            inclinado en diagonal reduce su ancho efectivo y agranda su alto efectivo, por eso
            el contenedor casi-cuadrado (no 4:3) es el que mejor calza con el mockup inclinado. */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '9 / 10',
            flexShrink: 0,
            background: category ? hexToRgba(meta.color, 0.07) : '#fff',
            backgroundImage: category ? categoryPatternBackground(category, meta.color) : undefined,
            backgroundRepeat: 'repeat',
            backgroundSize: '64px 64px',
            transformStyle: 'preserve-3d',
          }}
        >
        {/* Wrapper separado del <Image> a propósito: este recibe el translateZ/scale del
            hover, el <Image> de adentro recibe el scale fijo de photobooks — si fuera el
            mismo elemento, el hover pisaría el scale(0.65) al escribir su propio transform. */}
        <div
          data-book-image=""
          style={{
            position: 'absolute', top: '14px', left: '14px', right: '14px', bottom: '14px',
            transform: 'translateZ(20px)',
            transition: 'transform 0.35s ease',
          }}
        >
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 360px"
            style={{
              objectFit: 'contain',
              /* Los mockups de Photobooks (ref. Machu Picchu) llenan su lienzo ~100%,
                 sin margen interno. Los covers de libros personalizados cargan ~35%
                 de margen de seguridad a propósito (evita que la inclinación corte
                 una esquina). Con la misma caja y objectFit:contain, el que tiene
                 menos margen se ve más grande — este scale iguala el tamaño visual. */
              transform: category === 'photobooks' ? 'scale(0.65)' : undefined,
            }}
          />
        )}
        </div>
        <button
          type="button"
          aria-label={liked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          onClick={(e) => {
            e.preventDefault();
            setLiked((v) => !v);
          }}
          style={{
            position: 'absolute',
            left: '10px',
            bottom: '10px',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            border: 'none',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? meta.color : 'none'}>
            <path
              d="M20.84 4.61C19.85 3.62 18.5 3.06 17.09 3.06C15.68 3.06 14.33 3.62 13.34 4.61L12 5.95L10.66 4.61C8.6 2.55 5.19 2.55 3.13 4.61C1.07 6.67 1.07 10.08 3.13 12.14L12 21L20.84 12.14C22.9 10.08 22.9 6.67 20.84 4.61Z"
              stroke={meta.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Contenido */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {category && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              alignSelf: 'flex-start',
              padding: '3px 10px',
              borderRadius: tokens.borderRadius.full,
              background: `${meta.color}18`,
              color: meta.color,
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            <NavIcon icon={meta.icon} color={meta.color} />
            {meta.label}
          </span>
        )}

        <h3
          style={{
            margin: 0,
            fontSize: '16px',
            lineHeight: 1.3,
            fontWeight: 700,
            color: tokens.colors.neutral.text.primary,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </h3>

        {description && (
          <p
            style={{
              margin: 0,
              fontSize: '13px',
              lineHeight: 1.45,
              color: tokens.colors.neutral.text.secondary,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </p>
        )}

        <div style={{ flex: 1 }} />

        {(price || priceCents !== undefined) && (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
            {promoPrice !== undefined && priceCents !== undefined && (
              <span style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'line-through' }}>
                {formatCents(priceCents)}
              </span>
            )}
            <span style={{ fontSize: '12px', color: tokens.colors.neutral.text.muted }}>Desde</span>
            <span style={{ fontSize: '17px', fontWeight: 800, color: promoPrice !== undefined ? '#e74c6f' : tokens.colors.neutral.text.primary }}>
              {promoPrice !== undefined && priceCents !== undefined ? formatCents(promoPrice) : price}
            </span>
          </div>
        )}

        <Link
          href={href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginTop: '10px',
            height: '38px',
            borderRadius: tokens.borderRadius.full,
            border: `1.5px solid ${meta.color}`,
            color: meta.color,
            fontSize: '13px',
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = meta.color;
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = meta.color;
          }}
        >
          Ver detalles
          <span aria-hidden="true">→</span>
        </Link>
      </div>
      </article>
    </div>
  );
}
