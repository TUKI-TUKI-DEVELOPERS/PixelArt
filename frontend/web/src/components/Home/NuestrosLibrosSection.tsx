'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, PawPrint, Users, Camera, LayoutGrid, BookHeart } from 'lucide-react';
import BookCard from './BookCard';
import { tokens } from '@/lib/design-tokens';
import { useWindowSize } from '@/hooks/useWindowSize';

export type BookCategory = 'love' | 'pets' | 'family' | 'memories' | 'photobooks';

export type Book = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge?: string;
  href?: string;
  category: BookCategory;
  price?: string;
  priceCents?: number;
  promoPrice?: number;
  pages?: number;
};

type Props = {
  books: Book[];
};

type FilterKey = 'all' | BookCategory;

const FILTER_ICONS: Record<FilterKey, React.ReactNode> = {
  all:        <LayoutGrid size={14} strokeWidth={2.5} />,
  love:       <Heart size={14} strokeWidth={2.5} />,
  pets:       <PawPrint size={14} strokeWidth={2.5} />,
  family:     <Users size={14} strokeWidth={2.5} />,
  memories:   <BookHeart size={14} strokeWidth={2.5} />,
  photobooks: <Camera size={14} strokeWidth={2.5} />,
};

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all',        label: 'Todos' },
  { key: 'love',       label: 'Amor' },
  { key: 'pets',       label: 'Mascotas' },
  { key: 'family',     label: 'Familia' },
  { key: 'memories',   label: 'Memorias' },
  { key: 'photobooks', label: 'Photobooks' },
];

const FILTER_COLORS: Record<FilterKey, string> = {
  all:        '#2d8fd5',
  love:       '#B72020',
  pets:       '#f5a623',
  family:     '#88C343',
  memories:   '#8b6bb1',
  photobooks: '#2d8fd5',
};

const FILTER_GRADIENTS: Record<FilterKey, string> = {
  all:        'linear-gradient(90deg, #6bb3e0 0%, #4f97cf 35%, #2d8fd5 65%, #2B86BF 100%)',
  love:       'linear-gradient(135deg, #B72020 0%, #d92d34 50%, #e85858 100%)',
  pets:       'linear-gradient(135deg, #f5a623 0%, #f7b84b 50%, #f9c96b 100%)',
  family:     'linear-gradient(135deg, #88C343 0%, #9ed44f 50%, #b2e06a 100%)',
  memories:   'linear-gradient(135deg, #8b6bb1 0%, #a07cc5 50%, #b89dd8 100%)',
  photobooks: 'linear-gradient(135deg, #2d8fd5 0%, #4f97cf 50%, #6bb3e0 100%)',
};

const FILTER_SHADOWS: Record<FilterKey, string> = {
  all:        '0 4px 16px rgba(45, 143, 213, 0.30)',
  love:       '0 4px 16px rgba(183, 32, 32, 0.30)',
  pets:       '0 4px 16px rgba(245, 166, 35, 0.30)',
  family:     '0 4px 16px rgba(136, 195, 67, 0.30)',
  memories:   '0 4px 16px rgba(139, 107, 177, 0.30)',
  photobooks: '0 4px 16px rgba(45, 143, 213, 0.30)',
};

const INITIAL_COUNT = 6;
const PAGE_SIZE     = 3;

export default function NuestrosLibrosSection({ books }: Props) {
  const { isMobile, isTablet } = useWindowSize();
  const [active,  setActive]  = useState<FilterKey>('all');
  const [visible, setVisible] = useState(INITIAL_COUNT);
  /* índice desde donde empieza la animación de entrada (Ver más / filtro) */
  const prevVisibleRef  = useRef(0);
  /* índice desde donde empieza la animación de salida (Ver menos) */
  const removingFromRef = useRef(Infinity);
  /* ref al grid para calcular scroll target */
  const gridRef         = useRef<HTMLDivElement>(null);
  /* intención de scroll tras el próximo cambio de visible */
  const scrollIntentRef = useRef<'more' | 'less' | null>(null);

  const filtered  = active === 'all' ? books : books.filter(b => b.category === active);
  const displayed = filtered.slice(0, visible);
  const hasMore   = visible < filtered.length;

  function handleFilterChange(key: FilterKey) {
    prevVisibleRef.current  = 0;
    removingFromRef.current = Infinity;
    setActive(key);
    setVisible(INITIAL_COUNT);
  }

  function handleVerMas() {
    prevVisibleRef.current  = visible;
    removingFromRef.current = Infinity;
    scrollIntentRef.current = 'more';
    setVisible(v => v + PAGE_SIZE);
  }

  function handleVerMenos() {
    const next = Math.max(INITIAL_COUNT, visible - PAGE_SIZE);
    prevVisibleRef.current  = 0;
    removingFromRef.current = next;
    scrollIntentRef.current = 'less';
    setVisible(next);
  }

  /* Scroll automático tras cada cambio de visible */
  useEffect(() => {
    const intent = scrollIntentRef.current;
    if (!intent || !gridRef.current) return;
    scrollIntentRef.current = null;

    requestAnimationFrame(() => {
      if (!gridRef.current) return;
      const cards = Array.from(gridRef.current.children) as HTMLElement[];

      if (intent === 'more') {
        /* primera card nueva — scroll justo lo necesario para verla */
        cards[prevVisibleRef.current]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        /* última card RESTANTE al fondo del viewport — siempre sube,
           las cards que salen quedan visibles justo debajo animándose */
        cards[removingFromRef.current - 1]?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    });
  }, [visible]);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        padding: `${tokens.spacing.section.md} clamp(${tokens.spacing.component.md}, 5vw, ${tokens.spacing.section.md}) ${tokens.spacing.section.sm}`,
        background: 'radial-gradient(ellipse 90% 70% at 50% 40%, #FFF5EB 0%, #faf8f5 65%)',
        overflow: 'hidden',
      }}
    >
      {/* Textura sutil — noise grain via SVG inline */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
          pointerEvents: 'none',
        }}
      />

      {/* Contenedor centrado */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>

        {/* ── Header centrado ── */}
        <div style={{ textAlign: 'center', marginBottom: tokens.spacing.component.xs }}>

          {/* Eyebrow */}
          <p
            style={{
              margin: `0 0 ${tokens.spacing.micro.sm} 0`,
              fontSize: tokens.typography.caption.size,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: tokens.colors.neutral.text.muted,
            }}
          >
            Nuestros favoritos
          </p>

          {/* Título */}
          <h2
            style={{
              margin: `0 0 ${tokens.spacing.component.xs} 0`,
              fontSize: isMobile ? '48px' : isTablet ? '72px' : '96px',
              fontWeight: 900,
              letterSpacing: isMobile ? '-1px' : '-2px',
              lineHeight: 1.1,
              color: tokens.colors.neutral.text.primary,
            }}
          >
            <span
              style={{
                background: 'linear-gradient(90deg, #6bb3e0 0%, #4f97cf 35%, #2d8fd5 65%, #2B86BF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Nuestros Libros
            </span>
          </h2>

          {/* Línea decorativa */}
          <div
            aria-hidden="true"
            style={{
              width: '72px',
              height: '3px',
              borderRadius: '9999px',
              background: 'linear-gradient(90deg, #6bb3e0 0%, #4f97cf 35%, #2d8fd5 65%, #2B86BF 100%)',
              margin: `0 auto ${tokens.spacing.component.sm}`,
            }}
          />

          {/* Subtítulo */}
          <p
            style={{
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 'auto',
              marginRight: 'auto',
              fontSize: tokens.typography.bodyLarge.size,
              fontWeight: 700,
              color: tokens.colors.neutral.text.secondary,
              maxWidth: '520px',
              lineHeight: 1.5,
              textAlign: 'center',
            }}
          >
            Libros personalizados que cuentan tu historia. Hechos con amor, impresos con calidad premium.
          </p>

          {/* ── Filter pills ── */}
          <div
            role="group"
            aria-label="Filtrar por categoría"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              marginTop: tokens.spacing.component.md,
            }}
          >
            {FILTERS.map(({ key, label }) => {
              const isActive = active === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleFilterChange(key)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 20px',
                    borderRadius: tokens.borderRadius.full,
                    border: isActive ? 'none' : `1.5px solid ${tokens.colors.neutral.surface.border}`,
                    background: isActive ? FILTER_GRADIENTS[key] : '#fff',
                    color: isActive ? '#fff' : FILTER_COLORS[key],
                    fontSize: tokens.typography.small.size,
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    cursor: 'pointer',
                    boxShadow: isActive ? FILTER_SHADOWS[key] : '0 2px 8px rgba(0,0,0,0.06)',
                    transition: `all ${tokens.transitions.base}`,
                    outline: 'none',
                  }}
                >
                  {FILTER_ICONS[key]}
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Grid de tarjetas — 3 columnas centradas ── */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, minmax(0, 1fr))',
            gap: isMobile ? tokens.spacing.component.lg : tokens.spacing.section.xs,
            paddingTop: '90px',
            maxWidth: isMobile ? '460px' : isTablet ? '760px' : '1120px',
            marginInline: 'auto',
          }}
        >
          <AnimatePresence mode="popLayout">
            {displayed.map((book, index) => {
              const isNew    = index >= prevVisibleRef.current;
              const batchIdx = isNew ? index - prevVisibleRef.current : 0;
              /* stagger de salida inverso: la última card sale primero */
              const exitDelay = index >= removingFromRef.current
                ? (visible - 1 - index) * 0.1
                : 0;
              return (
                <motion.div
                  key={book.title}
                  layout
                  initial={isNew ? { opacity: 0, y: 56, scale: 0.96 } : false}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.96,
                    transition: { duration: 0.35, ease: [0.55, 0, 0.1, 1], delay: exitDelay },
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    delay: batchIdx * 0.13,
                  }}
                  style={{ height: '100%' }}
                >
                  <BookCard {...book} promoPrice={book.promoPrice} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Ver más / Ver menos ── */}
        {(hasMore || visible > INITIAL_COUNT) && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: tokens.spacing.section.xs }}>

            {hasMore && (
              <button
                type="button"
                onClick={handleVerMas}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 32px',
                  borderRadius: tokens.borderRadius.full,
                  border: `2px solid ${tokens.colors.neutral.text.primary}`,
                  background: 'transparent',
                  color: tokens.colors.neutral.text.primary,
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '0.03em',
                  cursor: 'pointer',
                  transition: `all ${tokens.transitions.base}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = tokens.colors.neutral.text.primary;
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = tokens.colors.neutral.text.primary;
                }}
              >
                Ver más
                <span aria-hidden="true">↓</span>
              </button>
            )}

            {visible > INITIAL_COUNT && (
              <button
                type="button"
                onClick={handleVerMenos}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 32px',
                  borderRadius: tokens.borderRadius.full,
                  border: `2px solid ${tokens.colors.neutral.surface.border}`,
                  background: 'transparent',
                  color: tokens.colors.neutral.text.secondary,
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '0.03em',
                  cursor: 'pointer',
                  transition: `all ${tokens.transitions.base}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = tokens.colors.neutral.text.primary;
                  e.currentTarget.style.color = tokens.colors.neutral.text.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = tokens.colors.neutral.surface.border;
                  e.currentTarget.style.color = tokens.colors.neutral.text.secondary;
                }}
              >
                <span aria-hidden="true">↑</span>
                Ver menos
              </button>
            )}

          </div>
        )}
      </div>
    </section>
  );
}
