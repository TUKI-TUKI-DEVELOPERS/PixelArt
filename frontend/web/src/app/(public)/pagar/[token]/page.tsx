"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type PaymentInfo = {
  orderId: number;
  customerName: string;
  totalAmountCents: number;
  currency: string;
  expiresAt: string;
};

export default function PagarPage() {
  const params = useParams();
  const token = params.token as string;
  const [info, setInfo] = useState<PaymentInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`${API}/api/payment/${token}`)
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as { message?: string }).message ?? "Link inválido");
        }
        return res.json();
      })
      .then(setInfo)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleUploadVoucher(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API}/api/payment/${token}/voucher`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message ?? "Error al subir voucher");
      }
      setSubmitted(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error");
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>
        Cargando información de pago...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>😔</div>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>Link no válido</h1>
        <p style={{ fontSize: "16px", color: "#6b7280" }}>{error}</p>
      </div>
    );
  }

  if (!info) return null;

  if (submitted) {
    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "56px", marginBottom: "16px" }}>✅</div>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#065f46", marginBottom: "12px" }}>Voucher enviado</h1>
        <p style={{ fontSize: "16px", color: "#6b7280", lineHeight: 1.6 }}>
          Tu comprobante de pago fue recibido correctamente. Nuestro equipo lo revisará y te contactaremos
          por correo electrónico con la confirmación y fecha de entrega.
        </p>
      </div>
    );
  }

  const totalFormatted = `S/ ${(info.totalAmountCents / 100).toFixed(2)}`;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "48px 24px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
          Pago de tu libro
        </div>
        <h1 style={{ margin: "0 0 8px 0", fontSize: "32px", fontWeight: 800, color: "#111" }}>
          {info.customerName}
        </h1>
        <div style={{ fontSize: "13px", color: "#9ca3af" }}>
          Link válido hasta {new Date(info.expiresAt).toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>

      {/* Amount */}
      <div style={{ background: "#f9fafb", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "24px", textAlign: "center", marginBottom: "32px" }}>
        <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Total a pagar</div>
        <div style={{ fontSize: "40px", fontWeight: 900, color: "#111" }}>{totalFormatted}</div>
        <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px" }}>Orden #{info.orderId}</div>
      </div>

      {/* QR Yape */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "24px", textAlign: "center", marginBottom: "32px" }}>
        <h2 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: 700, color: "#111" }}>Escanea con Yape</h2>
        <div
          style={{
            width: "200px",
            height: "200px",
            margin: "0 auto 16px",
            borderRadius: "12px",
            background: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9ca3af",
            fontSize: "14px",
            border: "2px dashed #d1d5db",
          }}
        >
          QR Yape (próximamente)
        </div>
        <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
          Escanea el código QR con la app de Yape y realiza el pago por <strong>{totalFormatted}</strong>
        </p>
      </div>

      {/* Upload voucher */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "24px", textAlign: "center" }}>
        <h2 style={{ margin: "0 0 12px 0", fontSize: "18px", fontWeight: 700, color: "#111" }}>Sube tu comprobante</h2>
        <p style={{ margin: "0 0 20px 0", fontSize: "14px", color: "#6b7280" }}>
          Después de pagar, sube la captura de pantalla del pago realizado.
        </p>

        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUploadVoucher(file);
          }}
        />

        <button
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          style={{
            padding: "14px 32px",
            borderRadius: "12px",
            border: "none",
            background: uploading ? "#ccc" : "#8b5cf6",
            color: "#fff",
            fontSize: "16px",
            fontWeight: 700,
            cursor: uploading ? "wait" : "pointer",
            fontFamily: "inherit",
          }}
        >
          {uploading ? "Subiendo..." : "Subir captura de pago"}
        </button>
      </div>
    </div>
  );
}
