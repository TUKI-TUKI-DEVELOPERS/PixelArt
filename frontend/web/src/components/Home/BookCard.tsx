'use client';

import type React from 'react';
import Image from 'next/image';
import { Heart, PawPrint, Users, Camera, Sparkles, ImageIcon, Truck } from 'lucide-react';
import { tokens } from '@/lib/design-tokens';
import type { BookCategory } from './NuestrosLibrosSection';

const CATEGORY_COLORS: Record<BookCategory, string> = {
  love:       tokens.colors.customBooks.primary,
  pets:       '#f5a623',
  family:     tokens.colors.photobooks.accent,
  photobooks: tokens.colors.photobooks.primary,
};

const CATEGORY_GRADIENTS: Record<BookCategory, string> = {
  love:       tokens.colors.customBooks.gradient,
  pets:       'linear-gradient(135deg, #f5a623 0%, #f7b84b 50%, #f9c96b 100%)',
  family:     tokens.colors.photobooks.gradient,
  photobooks: tokens.colors.photobooks.gradient,
};

const CATEGORY_ICONS: Record<BookCategory, React.ReactNode> = {
  love:       <Heart size={11} strokeWidth={2.5} />,
  pets:       <PawPrint size={11} strokeWidth={2.5} />,
  family:     <Users size={11} strokeWidth={2.5} />,
  photobooks: <Camera size={11} strokeWidth={2.5} />,
};

const CATEGORY_LABELS: Record<BookCategory, string> = {
  love: 'Amor', pets: 'Mascotas', family: 'Familia', photobooks: 'Photobook',
};

const chipStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '2px 8px',
  borderRadius: '99px',
  background: tokens.colors.neutral.surface.subtle,
  border: `1px solid ${tokens.colors.neutral.surface.border}`,
  fontSize: '10px',
  fontWeight: 600,
  color: tokens.colors.neutral.text.secondary,
};

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#f5a623" stroke="#f5a623" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

type BookCardProps = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge?: string;
  href?: string;
  category?: BookCategory;
  price?: string;
  pages?: number;
};

export default function BookCard({
  title, subtitle, description, image,
  badge, href = '#', category, price, pages,
}: BookCardProps) {
  const categoryColor    = category ? CATEGORY_COLORS[category]    : tokens.colors.photobooks.accent;
  const categoryGradient = category ? CATEGORY_GRADIENTS[category] : tokens.colors.photobooks.gradient;

  return (
    <article
      style={{
        background: '#fff',
        borderRadius: tokens.borderRadius['2xl'],
        border: `1px solid ${tokens.colors.neutral.surface.border}`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: `transform ${tokens.transitions.base}, box-shadow ${tokens.transitions.base}, border-color ${tokens.transitions.base}`,
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        e.currentTarget.style.borderColor = categoryColor;
        const img = e.currentTarget.querySelector<HTMLElement>('[data-book-image]');
        if (img) img.style.transform = 'scale(1.07)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = tokens.colors.neutral.surface.border;
        const img = e.currentTarget.querySelector<HTMLElement>('[data-book-image]');
        if (img) img.style.transform = 'scale(1)';
      }}
    >
      {/* ── ZONA SUPERIOR — fondo tintado con el color de categoría ── */}
      <div
        style={{
          position: 'relative',
          background: `linear-gradient(160deg, ${categoryColor}20 0%, ${categoryColor}0a 100%)`,
          padding: '20px 16px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Línea accent superior */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '4px', background: categoryGradient,
        }} />

        {/* Badge — esquina superior derecha */}
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          {badge ? (
            <span style={{
              display: 'inline-block',
              padding: '3px 10px',
              background: categoryGradient,
              color: '#fff',
              fontSize: '10px',
              fontWeight: 800,
              borderRadius: tokens.borderRadius.full,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              boxShadow: tokens.shadows.sm,
            }}>
              {badge}
            </span>
          ) : category ? (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              padding: '3px 9px',
              background: `${categoryColor}22`,
              color: categoryColor,
              fontSize: '10px',
              fontWeight: 700,
              borderRadius: tokens.borderRadius.full,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              border: `1px solid ${categoryColor}40`,
            }}>
              {CATEGORY_ICONS[category]}
              {CATEGORY_LABELS[category]}
            </span>
          ) : null}
        </div>

        {/* Imagen del libro */}
        <div style={{
          height: '170px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <div
            data-book-image=""
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              transition: `transform ${tokens.transitions.slow}`,
            }}
          >
            <Image
              src={image}
              alt={title}
              width={260}
              height={170}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                height: 'auto',
                width: 'auto',
                objectFit: 'contain',
                mixBlendMode: 'multiply',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── ZONA INFERIOR — blanca, toda la información ── */}
      <div style={{
        background: '#fff',
        padding: '14px 16px 16px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
      }}>

        {/* Estrellas */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', marginBottom: '2px' }}>
          {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} />)}
        </div>
        <div style={{ fontSize: '11px', color: tokens.colors.neutral.text.muted, marginBottom: '10px' }}>
          +100 Reseñas
        </div>

        {/* Título */}
        <h3 style={{
          margin: '0 0 5px 0',
          fontSize: '16px',
          lineHeight: 1.25,
          color: tokens.colors.neutral.text.primary,
          fontWeight: 700,
        }}>
          {title}
        </h3>

        {/* Subtítulo */}
        <div style={{
          margin: '0 auto 8px',
          fontSize: '12px',
          lineHeight: 1.4,
          color: categoryColor,
          fontWeight: 600,
        }}>
          {subtitle}
        </div>

        {/* Descripción — 2 líneas máximo */}
        <p style={{
          margin: '0 auto 10px',
          fontSize: '11px',
          lineHeight: 1.5,
          color: tokens.colors.neutral.text.secondary,
          fontWeight: 400,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          flex: 1,
        }}>
          {description}
        </p>

        {/* Precio + entrega */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '8px',
          flexWrap: 'wrap',
        }}>
          {price && (
            <span style={{ fontSize: '14px', fontWeight: 800, color: tokens.colors.neutral.text.primary }}>
              Desde {price}
            </span>
          )}
          <span style={{ fontSize: '11px', color: tokens.colors.neutral.text.muted }}>·</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: tokens.colors.neutral.text.muted }}>
            <Truck size={11} strokeWidth={2} /> 3–5 días
          </span>
        </div>

        {/* Chips */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
          marginBottom: '12px',
          flexWrap: 'wrap',
        }}>
          <span style={chipStyle}>
            {category === 'photobooks'
              ? <><ImageIcon size={10} strokeWidth={2} /> Tus fotos</>
              : <><Sparkles size={10} strokeWidth={2} /> Con IA</>}
          </span>
          {pages && <span style={chipStyle}>{pages} páginas</span>}
        </div>

        {/* CTA */}
        <a
          href={href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40px',
            padding: '0 20px',
            borderRadius: tokens.borderRadius.full,
            border: 'none',
            background: categoryGradient,
            color: '#fff',
            fontSize: '13px',
            fontWeight: 800,
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: `all ${tokens.transitions.fast}`,
            boxShadow: tokens.shadows.md,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.04)';
            e.currentTarget.style.boxShadow = tokens.shadows.lg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = tokens.shadows.md;
          }}
        >
          Crear Aquí
        </a>
      </div>
    </article>
  );
}
