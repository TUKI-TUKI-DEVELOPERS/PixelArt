import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog-posts";
import { getAssetUrl } from "@/lib/assetUrl";
import BackButton from "./BackButton";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog PIXELART`,
    description: post.teaser.slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const imageUrl = getAssetUrl(post.image);

  return (
    <main
      style={{
        background: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* ── Hero ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxHeight: "520px",
          overflow: "hidden",
        }}
      >
        <img
          src={imageUrl}
          alt={post.title}
          style={{
            width: "100%",
            height: "520px",
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* Overlay degradado */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.60) 100%)",
          }}
        />

        {/* Back link */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
          }}
        >
          <BackButton />
        </div>

        {/* Eyebrow + título sobre la imagen */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: 0,
            right: 0,
            padding: "0 24px",
            maxWidth: "760px",
            margin: "0 auto",
          }}
        >
          <p
            style={{
              margin: "0 0 10px 0",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#e8453c",
            }}
          >
            {post.eyebrow}
          </p>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
              textShadow: "0 2px 16px rgba(0,0,0,0.35)",
            }}
          >
            {post.title}
          </h1>
        </div>
      </div>

      {/* ── Contenido del artículo ── */}
      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "56px 24px 96px",
        }}
      >
        {/* Meta info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
            paddingBottom: "24px",
            borderBottom: "1px solid #f0ebe6",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              color: "#999",
              fontWeight: 400,
            }}
          >
            {post.date}
          </span>
          <span aria-hidden="true" style={{ color: "#ddd" }}>·</span>
          <span
            style={{
              fontSize: "13px",
              color: "#999",
              fontWeight: 400,
            }}
          >
            {post.readTime} de lectura
          </span>
        </div>

        {/* Cuerpo */}
        {post.content.map((paragraph, i) => (
          <p
            key={i}
            style={{
              margin: "0 0 24px 0",
              fontSize: "18px",
              lineHeight: 1.8,
              color: i === 0 ? "#1a1a1a" : "#444",
              fontWeight: i === 0 ? 500 : 400,
            }}
          >
            {paragraph}
          </p>
        ))}

        {/* Separador */}
        <div
          aria-hidden="true"
          style={{
            width: "48px",
            height: "3px",
            borderRadius: "9999px",
            background: "linear-gradient(90deg, #B72020, #e8453c)",
            margin: "48px 0",
          }}
        />

        {/* CTA — libro relacionado */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(183,32,32,0.04) 0%, rgba(232,69,60,0.08) 100%)",
            border: "1px solid rgba(183,32,32,0.12)",
            borderRadius: "20px",
            padding: "32px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0 0 8px 0",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#B72020",
            }}
          >
            El libro de esta historia
          </p>
          <p
            style={{
              margin: "0 0 24px 0",
              fontSize: "22px",
              fontWeight: 800,
              color: "#1a1a1a",
              lineHeight: 1.2,
            }}
          >
            {post.bookTitle}
          </p>
          <p
            style={{
              margin: "0 0 28px 0",
              fontSize: "15px",
              color: "#666",
              lineHeight: 1.6,
            }}
          >
            Creá tu propia historia. Subí tus fotos y recibí un libro único hecho con IA.
          </p>
          <Link
            href={post.bookHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 32px",
              borderRadius: "9999px",
              background: "linear-gradient(135deg, #B72020, #e8453c)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.02em",
              boxShadow: "0 4px 20px rgba(183,32,32,0.30)",
            }}
          >
            Ver libro →
          </Link>
        </div>
      </div>
    </main>
  );
}
