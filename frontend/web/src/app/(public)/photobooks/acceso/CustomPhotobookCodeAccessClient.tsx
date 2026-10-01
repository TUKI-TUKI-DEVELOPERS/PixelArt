"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function normalizeCode(value: string) {
  const compact = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
  return compact.replace(/(.{4})(?=.)/g, "$1-");
}

export default function CustomPhotobookCodeAccessClient() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/photobook/custom-editor/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error((result as { message?: string }).message ?? "No pudimos validar el código");
      }
      router.replace("/photobooks/mi-photobook");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "No pudimos validar el código");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{ minHeight: "calc(100vh - 96px)", display: "grid", placeItems: "center", padding: "48px 20px", background: "#f5f8fa" }}>
      <section style={{ width: "min(460px, 100%)", padding: "32px", borderRadius: "18px", background: "#fff", border: "1px solid #e4eaee", boxShadow: "0 18px 50px rgba(23,36,45,.08)" }}>
        <p style={{ margin: "0 0 10px", color: "#2d8fd5", fontSize: "12px", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}>Photobook a medida</p>
        <h1 style={{ margin: "0 0 12px", color: "#17242d", fontSize: "28px", lineHeight: 1.15 }}>Ingresa a tu photobook</h1>
        <p style={{ margin: "0 0 24px", color: "#63737d", lineHeight: 1.55, fontSize: "14px" }}>Escribe el código de 12 caracteres que enviamos a tu correo. Tus cubiertas aprobadas ya estarán protegidas.</p>
        <form onSubmit={submit}>
          <label htmlFor="custom-photobook-code" style={{ display: "block", marginBottom: "8px", color: "#34454f", fontSize: "13px", fontWeight: 700 }}>Código de acceso</label>
          <input id="custom-photobook-code" value={code} onChange={(event) => setCode(normalizeCode(event.target.value))} placeholder="ABCD-EFGH-JKLM" autoComplete="one-time-code" autoCapitalize="characters" spellCheck={false} required style={{ boxSizing: "border-box", width: "100%", padding: "14px 16px", borderRadius: "10px", border: "1px solid #b9c7cf", color: "#17242d", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "18px", fontWeight: 700, letterSpacing: ".08em", outlineColor: "#2d8fd5" }} />
          {error && <p role="alert" style={{ margin: "12px 0 0", color: "#b42318", fontSize: "13px" }}>{error}</p>}
          <button type="submit" disabled={submitting || code.replaceAll("-", "").length !== 12} style={{ width: "100%", marginTop: "20px", padding: "14px", border: 0, borderRadius: "10px", background: submitting ? "#9babb4" : "#17242d", color: "#fff", cursor: submitting ? "wait" : "pointer", fontSize: "15px", fontWeight: 800 }}>
            {submitting ? "Validando..." : "Continuar a mi photobook"}
          </button>
        </form>
      </section>
    </main>
  );
}
