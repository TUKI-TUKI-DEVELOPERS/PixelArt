export const dynamic = 'force-dynamic';

import NuestrosLibrosClient from "@/components/NuestrosLibros/NuestrosLibrosClient";

const API_BASE = process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://api:3001";

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
  currency: string;
  coverImageUrl: string | null;
  variants: Variant[];
};

type Category = {
  id: string;
  name: string;
  coverImageUrl: string | null;
  models: { id: string; name: string; templateCount: number }[];
};

async function fetchBooks(): Promise<Book[]> {
  const res = await fetch(`${API_BASE}/api/catalog/books`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  return res.json();
}

async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/api/personalized/categories`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function LibrosPersonalizadosPage() {
  const [books, categories] = await Promise.all([
    fetchBooks(),
    fetchCategories(),
  ]);

  return (
    <main
      style={{
        background: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NuestrosLibrosClient books={books} categories={categories} />
    </main>
  );
}
