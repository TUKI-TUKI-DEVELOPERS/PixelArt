"use client";

import ProductCard from "./ProductCard";

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

type Props = {
  books: Book[];
};

export default function ProductGrid({ books }: Props) {
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
        gridTemplateColumns: "repeat(3, 1fr)",
        columnGap: "32px",
        rowGap: "40px",
        alignItems: "start",
      }}
    >
      {books.map((book) => (
        <ProductCard
          key={book.id}
          name={book.name}
          description={book.description}
          coverImageUrl={book.coverImageUrl}
          variants={book.variants}
          categoryBadge={book.categoryBadge}
          tagline={book.tagline}
          reviewCount={book.reviewCount}
          href={book.href}
        />
      ))}
    </div>
  );
}
