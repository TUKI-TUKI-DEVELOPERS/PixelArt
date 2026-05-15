import ModernBackground from "@/components/backgrounds/ModernBackground";
import NuestrosLibrosClient from "@/components/NuestrosLibros/NuestrosLibrosClient";

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
  const res = await fetch("http://api:3001/api/catalog/books", {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  return res.json();
}

async function fetchCategories(): Promise<Category[]> {
  const res = await fetch("http://api:3001/api/personalized/categories", {
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
      <ModernBackground
        variant="custom-books"
        style={{
          width: "100%",
          padding: "0",
          minHeight: "100vh",
        }}
      >
        <NuestrosLibrosClient books={books} categories={categories} />
      </ModernBackground>
    </main>
  );
}
