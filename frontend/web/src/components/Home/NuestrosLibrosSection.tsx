'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import NuestrosLibrosCard from './NuestrosLibrosCard';
import NuestrosLibrosListRow from './NuestrosLibrosListRow';
import NavIcon from '@/components/layout/NavIcon';
import { tokens } from '@/lib/design-tokens';
import { PIXELART_COLORS, hexToRgba } from '@/lib/colors';
import { useWindowSize } from '@/hooks/useWindowSize';

export type BookCategory = 'love' | 'pets' | 'family' | 'memories' | 'photobooks';

export type ParaQuienKey = 'pareja' | 'mama' | 'papa' | 'hijos' | 'abuelos';

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
  /* A quién está dedicado el libro — taxonomía real, no se infiere del texto */
  paraQuien?: ParaQuienKey[];
};

type Props = {
  books: Book[];
};

type FilterKey = 'all' | BookCategory;

/* Punto de color por categoría — mismo acento funcional que la barrita de cada card */
const FILTER_DOTS: Partial<Record<FilterKey, string>> = {
  love:       '#B72020',
  pets:       '#f5a623',
  family:     '#88C343',
  memories:   '#8b6bb1',
  photobooks: '#2d8fd5',
};

const FILTER_ICONS: Partial<Record<FilterKey, string>> = {
  love:       'heart',
  pets:       'paw',
  family:     'family',
  memories:   'book',
  photobooks: 'camera',
};

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all',        label: 'Todos' },
  { key: 'love',       label: 'Amor' },
  { key: 'pets',       label: 'Mascotas' },
  { key: 'family',     label: 'Familia' },
  { key: 'memories',   label: 'Memorias' },
  { key: 'photobooks', label: 'Photobooks' },
];

const PARA_QUIEN_FILTERS: { key: ParaQuienKey; label: string; icon: string; color: string }[] = [
  { key: 'pareja',  label: 'Pareja',  icon: 'heart',     color: PIXELART_COLORS.R_PINK },
  { key: 'mama',    label: 'Mamá',    icon: 'sparkles',  color: PIXELART_COLORS.L_PURPLE },
  { key: 'papa',    label: 'Papá',    icon: 'moustache', color: PIXELART_COLORS.A_BLUE },
  { key: 'hijos',   label: 'Hijos',   icon: 'baby',      color: PIXELART_COLORS.X_YELLOW },
  { key: 'abuelos', label: 'Abuelos', icon: 'infinity',  color: PIXELART_COLORS.T_TURQUOISE },
];

type SortKey = 'popular' | 'price-asc' | 'price-desc';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'popular',    label: 'Más populares' },
  { key: 'price-asc',  label: 'Precio: menor a mayor' },
  { key: 'price-desc', label: 'Precio: mayor a menor' },
];

const INITIAL_COUNT = 6;
const PAGE_SIZE     = 3;

export default function NuestrosLibrosSection({ books }: Props) {
  const { isMobile, isTablet } = useWindowSize();
  const [active,      setActive]      = useState<FilterKey>('all');
  const [paraQuien,   setParaQuien]   = useState<ParaQuienKey | null>(null);
  const [sort,        setSort]        = useState<SortKey>('popular');
  const [search,      setSearch]      = useState('');
  const [visible,     setVisible]     = useState(INITIAL_COUNT);
  const [filtrosOpen, setFiltrosOpen] = useState(false);
  const [viewMode,    setViewMode]    = useState<'grid' | 'list'>('grid');
  const filtrosRef = useRef<HTMLDivElement>(null);
  /* índice desde donde empieza la animación de entrada (Ver más / filtro) */
  const prevVisibleRef  = useRef(0);
  /* índice desde donde empieza la animación de salida (Ver menos) */
  const removingFromRef = useRef(Infinity);
  /* ref al grid para calcular scroll target */
  const gridRef         = useRef<HTMLDivElement>(null);
  /* intención de scroll tras el próximo cambio de visible */
  const scrollIntentRef = useRef<'more' | 'less' | null>(null);

  const filtered = useMemo(() => {
    let result = active === 'all' ? books : books.filter(b => b.category === active);

    if (paraQuien) {
      result = result.filter(b => b.paraQuien?.includes(paraQuien));
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(b => b.title.toLowerCase().includes(q));
    }

    if (sort === 'price-asc' || sort === 'price-desc') {
      result = [...result].sort((a, b) => {
        const pa = a.promoPrice ?? a.priceCents ?? 0;
        const pb = b.promoPrice ?? b.priceCents ?? 0;
        return sort === 'price-asc' ? pa - pb : pb - pa;
      });
    }

    return result;
  }, [books, active, paraQuien, search, sort]);

  const displayed = filtered.slice(0, visible);
  const hasMore   = visible < filtered.length;

  const activeFilterCount =
    (active !== 'all' ? 1 : 0) +
    (paraQuien ? 1 : 0) +
    (search.trim() ? 1 : 0);

  /* Cierra el panel de filtros al clickear afuera */
  useEffect(() => {
    if (!filtrosOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (filtrosRef.current && !filtrosRef.current.contains(e.target as Node)) {
        setFiltrosOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filtrosOpen]);

  /* Cantidad de libros por categoría — para el contador de cada pill */
  const counts: Record<FilterKey, number> = {
    all:        books.length,
    love:       books.filter(b => b.category === 'love').length,
    pets:       books.filter(b => b.category === 'pets').length,
    family:     books.filter(b => b.category === 'family').length,
    memories:   books.filter(b => b.category === 'memories').length,
    photobooks: books.filter(b => b.category === 'photobooks').length,
  };

  function handleFilterChange(key: FilterKey) {
    prevVisibleRef.current  = 0;
    removingFromRef.current = Infinity;
    setActive(key);
    setVisible(INITIAL_COUNT);
  }

  function handleParaQuienChange(key: ParaQuienKey) {
    prevVisibleRef.current  = 0;
    removingFromRef.current = Infinity;
    setParaQuien(prev => (prev === key ? null : key));
    setVisible(INITIAL_COUNT);
  }

  function handleSearchChange(value: string) {
    prevVisibleRef.current  = 0;
    removingFromRef.current = Infinity;
    setSearch(value);
    setVisible(INITIAL_COUNT);
  }

  function handleViewModeChange(mode: 'grid' | 'list') {
    prevVisibleRef.current  = 0;
    removingFromRef.current = Infinity;
    setViewMode(mode);
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
        background: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Contenedor centrado */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>

        {/* ── Header: título/subtítulo + card promo ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile || isTablet ? 'column' : 'row',
            alignItems: isMobile || isTablet ? 'stretch' : 'flex-start',
            justifyContent: 'space-between',
            gap: tokens.spacing.component.md,
            marginBottom: tokens.spacing.component.lg,
          }}
        >
          <div>
            {/* Título — itálica serif, rima con la palabra editorial del hero */}
            <h2
              style={{
                margin: `0 0 ${tokens.spacing.component.xs} 0`,
                fontFamily: tokens.fonts.display,
                fontStyle: 'italic',
                fontSize: isMobile ? '38px' : isTablet ? '52px' : '64px',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                lineHeight: 1.12,
                color: tokens.colors.neutral.text.primary,
              }}
            >
              Nuestros libros
            </h2>

            {/* Subtítulo */}
            <p
              style={{
                margin: 0,
                fontSize: tokens.typography.bodyLarge.size,
                fontWeight: 400,
                color: tokens.colors.neutral.text.secondary,
                maxWidth: '480px',
                lineHeight: 1.5,
              }}
            >
              Libros personalizados hechos con amor y calidad premium.
            </p>
          </div>

          {/* Card promo — "Personalizados para cada historia" */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              flexShrink: 0,
              width: isMobile || isTablet ? '100%' : '320px',
              padding: '18px 20px',
              borderRadius: tokens.borderRadius.xl,
              border: `1px solid ${tokens.colors.neutral.surface.border}`,
              background: hexToRgba(PIXELART_COLORS.P_RED, 0.04),
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: hexToRgba(PIXELART_COLORS.P_RED, 0.12),
                flexShrink: 0,
              }}
            >
              <NavIcon icon="heart" color={PIXELART_COLORS.P_RED} />
            </span>
            <div>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: tokens.colors.neutral.text.primary, lineHeight: 1.3 }}>
                Personalizados para cada historia
              </p>
              <p style={{ margin: '4px 0 10px', fontSize: '12.5px', color: tokens.colors.neutral.text.secondary, lineHeight: 1.4 }}>
                Transformamos tus recuerdos en un libro único e inolvidable.
              </p>
              <Link
                href="/libros-personalizados"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: tokens.borderRadius.full,
                  background: PIXELART_COLORS.P_RED,
                  color: '#fff',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Crear mi libro
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Controles: orden + filtros (categoría, para quién y búsqueda viven en el panel) ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {/* Ordenar por */}
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: tokens.colors.neutral.text.secondary,
            }}
          >
            Ordenar por:
            <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                style={{
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  border: 'none',
                  background: 'transparent',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: tokens.colors.neutral.text.primary,
                  cursor: 'pointer',
                  outline: 'none',
                  fontFamily: 'inherit',
                  paddingRight: '16px',
                }}
              >
                {SORT_OPTIONS.map(({ key, label }) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <span aria-hidden="true" style={{ position: 'absolute', right: 0, pointerEvents: 'none', fontSize: '10px', color: tokens.colors.neutral.text.secondary }}>
                ▾
              </span>
            </span>
          </label>

          {/* Filtros — botón + panel desplegable */}
          <div ref={filtrosRef} style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setFiltrosOpen((v) => !v)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                borderRadius: tokens.borderRadius.full,
                border: `1.5px solid ${filtrosOpen || activeFilterCount > 0 ? tokens.colors.neutral.text.primary : tokens.colors.neutral.surface.border}`,
                background: '#fff',
                color: tokens.colors.neutral.text.primary,
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                outline: 'none',
                transition: `all ${tokens.transitions.base}`,
              }}
            >
              <NavIcon icon="sliders" color={tokens.colors.neutral.text.primary} />
              Filtros
              {activeFilterCount > 0 && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: tokens.colors.neutral.text.primary,
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '0 4px',
                  }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {filtrosOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    right: isMobile || isTablet ? 'auto' : 0,
                    left: isMobile || isTablet ? '50%' : 'auto',
                    x: isMobile || isTablet ? '-50%' : 0,
                    width: 'min(92vw, 400px)',
                    maxHeight: isMobile || isTablet ? 'calc(100vh - 140px)' : undefined,
                    overflowY: isMobile || isTablet ? 'auto' : undefined,
                    background: '#fff',
                    borderRadius: tokens.borderRadius.xl,
                    border: `1px solid ${tokens.colors.neutral.surface.border}`,
                    boxShadow: '0 24px 64px rgba(0, 0, 0, 0.16)',
                    padding: '20px',
                    zIndex: 20,
                  }}
                >
                  {/* Buscador */}
                  <div style={{ position: 'relative', marginBottom: '18px' }}>
                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="7" stroke={tokens.colors.neutral.text.muted} strokeWidth="2" />
                        <path d="M21 21L16.65 16.65" stroke={tokens.colors.neutral.text.muted} strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      placeholder="Buscar libros..."
                      style={{
                        width: '100%',
                        height: '40px',
                        padding: '0 14px 0 38px',
                        borderRadius: tokens.borderRadius.full,
                        border: `1.5px solid ${tokens.colors.neutral.surface.border}`,
                        fontSize: '13px',
                        color: tokens.colors.neutral.text.primary,
                        outline: 'none',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  {/* Categoría */}
                  <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: tokens.colors.neutral.text.muted }}>
                    Categoría
                  </p>
                  <div role="group" aria-label="Filtrar por categoría" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
                    {FILTERS.map(({ key, label }) => {
                      const isActive = active === key;
                      const dot = FILTER_DOTS[key];
                      const icon = FILTER_ICONS[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleFilterChange(key)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',
                            padding: '7px 14px',
                            borderRadius: tokens.borderRadius.full,
                            border: isActive ? `1.5px solid ${tokens.colors.neutral.text.primary}` : `1.5px solid ${tokens.colors.neutral.surface.border}`,
                            background: isActive ? tokens.colors.neutral.text.primary : '#fff',
                            color: isActive ? '#fff' : tokens.colors.neutral.text.secondary,
                            fontSize: '12.5px',
                            fontWeight: 700,
                            letterSpacing: '0.02em',
                            cursor: 'pointer',
                            transition: `all ${tokens.transitions.base}`,
                            outline: 'none',
                          }}
                        >
                          {icon ? (
                            <NavIcon icon={icon} color={isActive ? '#fff' : (dot ?? tokens.colors.neutral.text.secondary)} />
                          ) : dot && (
                            <span
                              aria-hidden="true"
                              style={{ width: '7px', height: '7px', borderRadius: '50%', background: dot, flexShrink: 0 }}
                            />
                          )}
                          {label}
                          <span style={{ fontWeight: 500, fontSize: '12px', color: isActive ? 'rgba(255,255,255,0.65)' : tokens.colors.neutral.text.muted }}>
                            {counts[key]}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Para quién */}
                  <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: tokens.colors.neutral.text.muted }}>
                    Para quién es el libro
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {PARA_QUIEN_FILTERS.map(({ key, label, icon, color }) => {
                      const isActive = paraQuien === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleParaQuienChange(key)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 14px',
                            borderRadius: tokens.borderRadius.full,
                            border: isActive ? `1.5px solid ${color}` : `1.5px solid ${tokens.colors.neutral.surface.border}`,
                            background: isActive ? hexToRgba(color, 0.1) : '#fff',
                            color: isActive ? color : tokens.colors.neutral.text.secondary,
                            fontSize: '12.5px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: `all ${tokens.transitions.base}`,
                            outline: 'none',
                          }}
                        >
                          <NavIcon icon={icon} color={isActive ? color : tokens.colors.neutral.text.muted} />
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Vista grid / lista */}
          <div
            role="group"
            aria-label="Tipo de vista"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px',
              padding: '3px',
              borderRadius: tokens.borderRadius.lg,
              border: `1.5px solid ${tokens.colors.neutral.surface.border}`,
              background: '#fff',
            }}
          >
            <button
              type="button"
              onClick={() => handleViewModeChange('grid')}
              aria-pressed={viewMode === 'grid'}
              title="Vista en cuadrícula"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: tokens.borderRadius.md,
                border: 'none',
                cursor: 'pointer',
                background: viewMode === 'grid' ? tokens.colors.neutral.text.primary : 'transparent',
                transition: `background ${tokens.transitions.base}`,
              }}
            >
              <NavIcon icon="grid" color={viewMode === 'grid' ? '#fff' : tokens.colors.neutral.text.primary} />
            </button>
            <button
              type="button"
              onClick={() => handleViewModeChange('list')}
              aria-pressed={viewMode === 'list'}
              title="Vista en lista"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: tokens.borderRadius.md,
                border: 'none',
                cursor: 'pointer',
                background: viewMode === 'list' ? tokens.colors.neutral.text.primary : 'transparent',
                transition: `background ${tokens.transitions.base}`,
              }}
            >
              <NavIcon icon="list" color={viewMode === 'list' ? '#fff' : tokens.colors.neutral.text.primary} />
            </button>
          </div>
        </div>

        {/* Línea de resultados */}
        <p
          aria-live="polite"
          style={{
            margin: `${tokens.spacing.component.xs} 0 0`,
            fontSize: tokens.typography.caption.size,
            fontWeight: 500,
            color: tokens.colors.neutral.text.muted,
            letterSpacing: '0.02em',
            textAlign: 'right',
          }}
        >
          Mostrando {Math.min(visible, filtered.length)} de {filtered.length} libros
        </p>

        {/* ── Grid de tarjetas — 3 columnas centradas ── */}
        <div
          ref={gridRef}
          style={
            viewMode === 'grid'
              ? {
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, minmax(0, 1fr))',
                  gap: isMobile ? tokens.spacing.component.lg : tokens.spacing.section.xs,
                  paddingTop: tokens.spacing.component.lg,
                  maxWidth: isMobile ? '460px' : isTablet ? '760px' : '1120px',
                  marginInline: 'auto',
                }
              : {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  paddingTop: tokens.spacing.component.lg,
                  maxWidth: '860px',
                  marginInline: 'auto',
                }
          }
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
                  key={`${viewMode}-${book.title}`}
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
                  style={{ height: viewMode === 'grid' ? '100%' : 'auto' }}
                >
                  {viewMode === 'grid'
                    ? <NuestrosLibrosCard {...book} promoPrice={book.promoPrice} />
                    : <NuestrosLibrosListRow {...book} promoPrice={book.promoPrice} />}
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
                Ver más ({filtered.length - visible})
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
