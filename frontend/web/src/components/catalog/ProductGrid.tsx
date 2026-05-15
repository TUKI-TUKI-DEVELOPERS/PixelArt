"use client";

import { motion } from "framer-motion";
import BookCard from "@/components/Home/BookCard";
import type { BookCategory } from "@/components/Home/NuestrosLibrosSection";
import { useWindowSize } from "@/hooks/useWindowSize";

type Variant = {
  id: string;
  coverType: string;
  basePriceCents: number;
};

type Book = {
  id: string;
  name: string;
  productType: string;
  description: string | null;
  coverImageUrl: string | null;
  variants: Variant[];
  categoryBadge?: string;
  tagline?: string;
  reviewCount?: number;
  href?: string;
};

type ActivePromo = {
  targetType: string;
  targetId: number | null;
  targetIds: number[];
  discountType: string;
  discountValue: number;
};

function applyBestPromo(priceCents: number, promos: ActivePromo[], catalogBookId?: number): number | undefined {
  const applicable = promos.filter((p) =>
    p.targetType === 'all' ||
    (p.targetType === 'model'  && catalogBookId !== undefined && p.targetId === catalogBookId) ||
    (p.targetType === 'models' && catalogBookId !== undefined && p.targetIds?.includes(catalogBookId))
  );
  if (!applicable.length) return undefined;
  let best = priceCents;
  for (const p of applicable) {
    const result = p.discountType === 'percent'
      ? Math.round(priceCents * (1 - p.discountValue / 100))
      : Math.max(0, priceCents - p.discountValue);
    if (result < best) best = result;
  }
  return best < priceCents ? best : undefined;
}

type Props = {
  books: Book[];
  promos?: ActivePromo[];
};

const BADGE_TO_CATEGORY: Record<string, BookCategory> = {
  "LIBRO DE AMOR":       "love",
  "LIBRO DE MASCOTAS":   "pets",
  "LIBRO DE FAMILIA":    "family",
  "MEMORIAS FAMILIARES": "memories",
};

function formatPrice(cents: number): string {
  return `S/ ${(cents / 100).toFixed(2)}`;
}

export default function ProductGrid({ books, promos = [] }: Props) {
  const { isMobile, isTablet } = useWindowSize();

  if (books.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px",
          fontSize: "22px",
          color: "#999",
        }}
      >
        No se encontraron libros para este filtro.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
        columnGap: isMobile ? "0" : isTablet ? "20px" : "32px",
        rowGap: isMobile ? "24px" : "40px",
        paddingTop: "90px",
        maxWidth: "1120px",
        marginInline: "auto",
        alignItems: "start",
      }}
    >
      {books.map((book, index) => {
        const category = book.categoryBadge
          ? BADGE_TO_CATEGORY[book.categoryBadge]
          : undefined;
        const cheapest = book.variants.length
          ? book.variants.reduce((a, b) =>
              a.basePriceCents < b.basePriceCents ? a : b
            )
          : null;
        const priceCents = cheapest?.basePriceCents;
        const price      = priceCents !== undefined ? formatPrice(priceCents) : undefined;
        const promoPrice = priceCents !== undefined ? applyBestPromo(priceCents, promos, Number(book.id)) : undefined;

        return (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: index * 0.08,
            }}
            style={{ height: "100%" }}
          >
            <BookCard
              title={book.name}
              subtitle={book.tagline ?? ""}
              description={book.description ?? ""}
              image={book.coverImageUrl ?? ""}
              href={book.href ?? "#"}
              category={category}
              price={price}
              priceCents={priceCents}
              promoPrice={promoPrice}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
