'use client';

import { useState, useMemo } from 'react';
import SearchInput from './SearchInput';
import CategoryTabs from './CategoryTabs';
import BookCard from './BookCard';
import { tokens } from '@/lib/design-tokens';
import ParticleCanvas from './ParticleCanvas';

export type BookCategory = 'love' | 'pets' | 'family' | 'photobooks';

export type Book = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge?: string;
  href?: string;
  category: BookCategory;
  price?: string;
  pages?: number;
};

type CategoryItem = {
  label: string;
  value: string;
};

type Props = {
  books: Book[];
  categories: CategoryItem[];
};

export default function NuestrosLibrosSection({ books, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: books.length };
    for (const book of books) {
      result[book.category] = (result[book.category] ?? 0) + 1;
    }
    return result;
  }, [books]);

  const filtered = useMemo(() => {
    return books.filter((book) => {
      const matchesCategory = activeCategory === 'all' || book.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.subtitle.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [books, activeCategory, searchQuery]);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        padding: `${tokens.spacing.section.xl} clamp(${tokens.spacing.component.md}, 5vw, ${tokens.spacing.section.md})`,
        background: 'linear-gradient(to bottom, #040429 0%, #0E2A55 40%, #1D6196 70%, #257EB7 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Fondo animado de partículas */}
      <ParticleCanvas />

      {/* Contenedor centrado — z-index 1 para estar sobre el canvas */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>

        {/* ── Header centrado ── */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: tokens.spacing.section.sm,
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              margin: `0 0 ${tokens.spacing.micro.sm} 0`,
              fontSize: tokens.typography.caption.size,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            Catálogo completo
          </p>

          {/* Título */}
          <h2
            style={{
              margin: `0 0 ${tokens.spacing.component.md} 0`,
              fontSize: `clamp(32px, 5vw, ${tokens.typography.display.size})`,
              fontWeight: tokens.typography.display.weight,
              letterSpacing: tokens.typography.display.letterSpacing,
              color: '#ffffff',
              lineHeight: 1.1,
            }}
          >
            Nuestros Libros
          </h2>

          {/* Search centrado */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SearchInput placeholder="Busca tu libro ideal..." onSearch={setSearchQuery} />
          </div>
        </div>

        {/* ── Category Tabs centrados ── */}
        <div
          style={{
            marginBottom: tokens.spacing.section.xs,
          }}
        >
          <CategoryTabs
            categories={categories}
            activeValue={activeCategory}
            onChange={setActiveCategory}
            counts={counts}
            centered
          />
        </div>

        {/* ── Grid de tarjetas ── */}
        {filtered.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
              gap: tokens.spacing.component.md,
            }}
          >
            {filtered.map((book) => (
              <BookCard key={book.title} {...book} />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: `${tokens.spacing.section.lg} 0`,
              color: tokens.colors.neutral.text.muted,
              fontSize: tokens.typography.bodyLarge.size,
            }}
          >
            No encontramos libros para tu búsqueda.
          </div>
        )}
      </div>
    </section>
  );
}
