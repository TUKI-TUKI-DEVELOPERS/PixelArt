'use client';

import type React from 'react';
import Image from 'next/image';
import { tokens } from '@/lib/design-tokens';
import type { BookCategory } from './NuestrosLibrosSection';

const CATEGORY_COLORS: Record<BookCategory, string> = {
  love:       '#B72020',
  pets:       '#f5a623',
  family:     '#88C343',
  memories:   '#8b6bb1',
  photobooks: tokens.colors.photobooks.primary,
};

const CATEGORY_GRADIENTS: Record<BookCategory, string> = {
  love:       'linear-gradient(135deg, #B72020 0%, #d92d34 50%, #e85858 100%)',
  pets:       'linear-gradient(135deg, #f5a623 0%, #f7b84b 50%, #f9c96b 100%)',
  family:     'linear-gradient(135deg, #88C343 0%, #9ed44f 50%, #b2e06a 100%)',
  memories:   'linear-gradient(135deg, #8b6bb1 0%, #a07cc5 50%, #b89dd8 100%)',
  photobooks: tokens.colors.photobooks.gradient,
};

const CATEGORY_SHADOWS: Record<BookCategory, string> = {
  love:       '0 8px 32px rgba(183, 32, 32, 0.10)',
  pets:       '0 8px 32px rgba(245, 166, 35, 0.10)',
  family:     '0 8px 32px rgba(136, 195, 67, 0.10)',
  memories:   '0 8px 32px rgba(139, 107, 177, 0.10)',
  photobooks: '0 8px 32px rgba(45, 143, 213, 0.10)',
};

const CATEGORY_SHADOWS_HOVER: Record<BookCategory, string> = {
  love:       '0 24px 64px rgba(183, 32, 32, 0.24)',
  pets:       '0 24px 64px rgba(245, 166, 35, 0.24)',
  family:     '0 24px 64px rgba(136, 195, 67, 0.24)',
  memories:   '0 24px 64px rgba(139, 107, 177, 0.24)',
  photobooks: '0 24px 64px rgba(45, 143, 213, 0.24)',
};

type BookCardProps = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge?: string;
  href?: string;
  category?: BookCategory;
  price?: string;
  priceCents?: number;
  promoPrice?: number;
  pages?: number;
  rating?: number;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((pos) => {
        const full = rating >= pos;
        const half = !full && rating >= pos - 0.5;
        return (
          <svg key={pos} width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id={`half-bk-${pos}`}>
                <rect x="0" y="0" width="12" height="24" />
              </clipPath>
            </defs>
            {/* base vacía */}
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#e5e7eb" stroke="none" />
            {/* relleno */}
            {(full || half) && (
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                fill="#f5a623"
                stroke="none"
                clipPath={half ? `url(#half-bk-${pos})` : undefined}
              />
            )}
          </svg>
        );
      })}
    </div>
  );
}

function formatCents(cents: number) {
  return `S/ ${(cents / 100).toFixed(2)}`;
}

export default function BookCard({
  title, subtitle, description, image,
  href = '#', category, price, priceCents, promoPrice, rating = 5,
}: BookCardProps) {
  const categoryColor       = category ? CATEGORY_COLORS[category]        : tokens.colors.photobooks.accent;
  const categoryGradient    = category ? CATEGORY_GRADIENTS[category]     : tokens.colors.photobooks.gradient;
  const categoryShadow      = category ? CATEGORY_SHADOWS[category]       : '0 8px 32px rgba(0,0,0,0.08)';
  const categoryShadowHover = category ? CATEGORY_SHADOWS_HOVER[category] : '0 24px 64px rgba(0,0,0,0.18)';

  return (
    /*
     * Wrapper con perspective — necesario para que el rotateX/Y del article
     * tenga profundidad real. No agrega layout, solo contexto 3D.
     */
    <div style={{ perspective: '1200px', height: '100%' }}>
      <article
        style={{
          position:       'relative',
          paddingTop:     '95px',
          cursor:         'pointer',
          height:         '100%',
          transformStyle: 'preserve-3d',
          transition:     'transform 0.35s ease',
          willChange:     'transform',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          /* transición suave al entrar */
          el.style.transition = 'transform 0.3s ease';

          const cardBody = el.querySelector<HTMLElement>('[data-card-body]');
          if (cardBody) {
            cardBody.style.boxShadow   = categoryShadowHover;
            cardBody.style.borderColor = `${categoryColor}50`;
          }

          /* imagen: sube + drop-shadow + mantiene el translateZ del espacio 3D */
          const img = el.querySelector<HTMLElement>('[data-book-image]');
          if (img) {
            img.style.transform = 'translateZ(40px) translateY(-10px) scale(1.06)';
            img.style.filter    = `drop-shadow(0 22px 30px ${categoryColor}70)`;
          }

          /* sheen: reset instantáneo → animar de izquierda a derecha */
          const sheen = el.querySelector<HTMLElement>('[data-sheen]');
          if (sheen) {
            sheen.style.transition = 'none';
            sheen.style.transform  = 'translateX(-200%) skewX(-20deg)';
            sheen.getBoundingClientRect();
            sheen.style.transition = 'transform 0.65s ease';
            sheen.style.transform  = 'translateX(200%) skewX(-20deg)';
          }
        }}
        onMouseMove={(e) => {
          const el   = e.currentTarget;
          const rect = el.getBoundingClientRect();
          const x    = e.clientX - rect.left;
          const y    = e.clientY - rect.top;
          /* normalizado -1 a 1 desde el centro */
          const nx = (x - rect.width  / 2) / (rect.width  / 2);
          const ny = (y - rect.height / 2) / (rect.height / 2);
          /* máx 7° de inclinación */
          const rotY =  nx * 7;
          const rotX = -ny * 7;
          /* seguimiento inmediato al mouse, sin lag */
          el.style.transition = 'transform 0.08s linear';
          el.style.transform  = `translateY(-8px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          /* retorno suave al estado plano */
          el.style.transition = 'transform 0.45s ease';
          el.style.transform  = 'translateY(0) rotateX(0deg) rotateY(0deg)';

          const cardBody = el.querySelector<HTMLElement>('[data-card-body]');
          if (cardBody) {
            cardBody.style.boxShadow   = categoryShadow;
            cardBody.style.borderColor = tokens.colors.neutral.surface.border;
          }

          const img = el.querySelector<HTMLElement>('[data-book-image]');
          if (img) {
            img.style.transform = 'translateZ(20px) translateY(0) scale(1)';
            img.style.filter    = `drop-shadow(0 8px 14px ${categoryColor}35)`;
          }
        }}
      >
        {/* ── IMAGEN FLOTANTE — translateZ la saca del plano del card ── */}
        {image && (
          <div
            data-book-image=""
            style={{
              position:      'absolute',
              top:           0,
              left:          0,
              right:         0,
              height:        '175px',
              display:       'flex',
              alignItems:    'flex-end',
              justifyContent:'center',
              zIndex:        3,
              transform:     'translateZ(20px)',
              filter:        `drop-shadow(0 8px 14px ${categoryColor}35)`,
              transition:    'transform 0.35s ease, filter 0.35s ease',
            }}
          >
            <Image
              src={image}
              alt={title}
              width={260}
              height={175}
              style={{
                maxWidth:  '100%',
                maxHeight: '175px',
                height:    'auto',
                width:     'auto',
                objectFit: 'contain',
              }}
            />
          </div>
        )}

        {/* ── CARD BODY — overflow: hidden para clip del sheen ── */}
        <div
          data-card-body=""
          style={{
            position:      'relative',
            overflow:      'hidden',
            borderRadius:  tokens.borderRadius['2xl'],
            border:        `1px solid ${tokens.colors.neutral.surface.border}`,
            background:    '#fff',
            boxShadow:     categoryShadow,
            display:       'flex',
            flexDirection: 'column',
            height:        '100%',
            transition:    'box-shadow 0.3s ease, border-color 0.3s ease',
          }}
        >
          {/* Sheen diagonal */}
          <div
            data-sheen=""
            style={{
              position:      'absolute',
              top:           0,
              left:          0,
              bottom:        0,
              width:         '55%',
              background:    'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.65) 50%, transparent 100%)',
              transform:     'translateX(-200%) skewX(-20deg)',
              pointerEvents: 'none',
              zIndex:        10,
            }}
          />

          {/* Zona superior tintada */}
          <div
            style={{
              position:   'relative',
              background: `linear-gradient(160deg, ${categoryColor}14 0%, ${categoryColor}07 100%)`,
              padding:    '88px 16px 16px',
            }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '3px', background: categoryGradient,
            }} />
          </div>

          {/* Zona inferior: título + subtítulo + precio + CTA */}
          <div style={{
            background:    '#fff',
            padding:       '20px 20px 24px',
            flex:          1,
            display:       'flex',
            flexDirection: 'column',
            textAlign:     'center',
            gap:           '8px',
          }}>
            <h3 style={{
              margin:     0,
              fontSize:   tokens.typography.body.size,
              lineHeight: 1.3,
              color:      tokens.colors.neutral.text.primary,
              fontWeight: 700,
            }}>
              {title}
            </h3>

            <p style={{
              margin:     0,
              fontSize:   tokens.typography.small.size,
              lineHeight: 1.4,
              color:      categoryColor,
              fontWeight: 600,
            }}>
              {subtitle}
            </p>

            {description && (
              <p style={{
                margin:     0,
                fontSize:   '13px',
                lineHeight: 1.5,
                color:      tokens.colors.neutral.text.secondary,
                fontWeight: 400,
              }}>
                {description}
              </p>
            )}

            {(price || priceCents !== undefined) && (
              <div style={{ margin: '4px 0 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                {promoPrice !== undefined && priceCents !== undefined && (
                  <span style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'line-through' }}>
                    Desde {formatCents(priceCents)}
                  </span>
                )}
                <p style={{
                  margin:     0,
                  fontSize:   tokens.typography.body.size,
                  fontWeight: 800,
                  color:      promoPrice !== undefined ? '#e74c6f' : tokens.colors.neutral.text.primary,
                }}>
                  Desde {promoPrice !== undefined && priceCents !== undefined
                    ? formatCents(promoPrice)
                    : price}
                </p>
              </div>
            )}

            {/* Estrellas */}
            <div style={{ marginTop: '4px' }}>
              <StarRating rating={rating} />
            </div>

            <div style={{ flex: 1 }} />

            <a
              href={href}
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                justifyContent: 'center',
                height:         '40px',
                padding:        '0 24px',
                marginTop:      '8px',
                borderRadius:   tokens.borderRadius.full,
                border:         'none',
                background:     categoryGradient,
                color:          '#fff',
                fontSize:       tokens.typography.small.size,
                fontWeight:     700,
                textDecoration: 'none',
                letterSpacing:  '0.03em',
                transition:     'all 0.2s ease',
                boxShadow:      `0 4px 12px ${categoryColor}30`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = `0 6px 20px ${categoryColor}45`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${categoryColor}30`;
              }}
            >
              Personalizar
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
