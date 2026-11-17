"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils/price";

export type AppliedPromo = { code: string; percent: number };

type Props = {
  /** Validates the code server-side; rejects with a customer-facing message. */
  onPreview: (code: string) => Promise<AppliedPromo>;
  applied: AppliedPromo | null;
  /** The code is already stored on the order: it can no longer be removed. */
  locked?: boolean;
  discountCents: number;
  totalCents: number;
  onChange: (promo: AppliedPromo | null) => void;
};

export default function PromoCodeField({ onPreview, applied, locked = false, discountCents, totalCents, onChange }: Props) {
  const [code, setCode] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmed = code.trim();

  async function apply() {
    if (!trimmed || checking) return;
    setChecking(true);
    setError(null);
    try {
      const result = await onPreview(trimmed);
      onChange({ code: result.code, percent: result.percent });
      setCode("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo validar el código");
    } finally {
      setChecking(false);
    }
  }

  if (applied) {
    return (
      <div style={{ background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: "14px", padding: "14px 16px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "15px", color: "#5b21b6" }}>
          <span>Descuento ({applied.code})</span>
          <span style={{ fontWeight: 700 }}>−{formatPrice(discountCents)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px", fontSize: "15px", color: "#111" }}>
          <span>Nuevo total</span>
          <span style={{ fontWeight: 800 }}>{formatPrice(totalCents)}</span>
        </div>
        {!locked && (
          <button
            type="button"
            onClick={() => onChange(null)}
            style={{ marginTop: "8px", padding: 0, border: "none", background: "none", color: "#6d28d9", fontSize: "13px", fontWeight: 600, textDecoration: "underline", cursor: "pointer", fontFamily: "inherit" }}
          >
            Quitar
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "12px" }}>
      <label htmlFor="promo-code" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
        Código de promoción
      </label>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          id="promo-code"
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(null); }}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); apply(); } }}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="Ingresa tu código"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "promo-code-error" : undefined}
          style={{ flex: 1, minWidth: 0, padding: "12px 14px", borderRadius: "12px", border: `1px solid ${error ? "#fca5a5" : "#e5e7eb"}`, fontSize: "15px", fontFamily: "inherit", background: "#fff", color: "#111" }}
        />
        <button
          type="button"
          onClick={apply}
          disabled={!trimmed || checking}
          style={{ padding: "0 18px", borderRadius: "12px", border: "none", background: trimmed && !checking ? "#111" : "#e5e7eb", color: trimmed && !checking ? "#fff" : "#9ca3af", fontSize: "14px", fontWeight: 700, cursor: trimmed && !checking ? "pointer" : "not-allowed", fontFamily: "inherit" }}
        >
          {checking ? "Validando..." : "Aplicar"}
        </button>
      </div>
      {error && (
        <div id="promo-code-error" role="alert" style={{ marginTop: "6px", fontSize: "13px", color: "#b91c1c" }}>
          {error}
        </div>
      )}
    </div>
  );
}
