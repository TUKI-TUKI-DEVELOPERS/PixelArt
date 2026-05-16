"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { getAssetUrl } from "@/lib/assetUrl";

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
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingPreview, setPendingPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
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

  function handleFileSelected(file: File) {
    const url = URL.createObjectURL(file);
    setPendingFile(file);
    setPendingPreview(url);
    setUploadError(null);
  }

  function handleCancelPending() {
    if (pendingPreview) URL.revokeObjectURL(pendingPreview);
    setPendingFile(null);
    setPendingPreview(null);
    setUploadError(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleConfirmUpload() {
    if (!pendingFile) return;
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append("file", pendingFile);
      const res = await fetch(`${API}/api/payment/${token}/voucher`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message ?? "Error al subir voucher");
      }
      if (pendingPreview) URL.revokeObjectURL(pendingPreview);
      setSubmitted(true);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Error al enviar el comprobante");
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
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        </div>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>Link no válido</h1>
        <p style={{ fontSize: "16px", color: "#6b7280" }}>{error}</p>
      </div>
    );
  }

  if (!info) return null;

  if (submitted) {
    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
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
        <h2 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: 700, color: "#111" }}>Escanea con Yape</h2>
        <p style={{ margin: "0 0 16px 0", fontSize: "13px", color: "#9ca3af" }}>Abre Yape, toca el ícono de QR y escanea</p>
        <img
          src={getAssetUrl("QRPago/QR_Pago_Pixelart.png")}
          alt="QR de pago Yape PixelArt"
          style={{
            width: "280px",
            height: "280px",
            objectFit: "contain",
            display: "block",
            margin: "0 auto 16px",
            borderRadius: "12px",
          }}
        />
        <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
          Realiza el pago por <strong>{totalFormatted}</strong> y luego sube la captura abajo.
        </p>
      </div>

      {/* Upload voucher */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "24px" }}>
        <h2 style={{ margin: "0 0 8px 0", fontSize: "18px", fontWeight: 700, color: "#111" }}>Sube tu comprobante</h2>
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
            if (file) handleFileSelected(file);
          }}
        />

        {/* Estado: sin archivo seleccionado */}
        {!pendingFile && (
          <button
            onClick={() => fileRef.current?.click()}
            style={{ width: "100%", padding: "14px 0", borderRadius: "12px", border: "2px dashed #d1d5db", background: "#f9fafb", color: "#6b7280", fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Seleccionar captura de pago
          </button>
        )}

        {/* Estado: archivo seleccionado — mostrar preview y pedir confirmación */}
        {pendingFile && (
          <div>
            {/* Preview */}
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e5e7eb", marginBottom: "16px", maxHeight: "280px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
              <img src={pendingPreview!} alt="Comprobante" style={{ maxWidth: "100%", maxHeight: "280px", objectFit: "contain", display: "block" }} />
            </div>

            <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px", textAlign: "center" }}>
              <strong style={{ color: "#111" }}>{pendingFile.name}</strong>
              <span style={{ color: "#9ca3af" }}> · {(pendingFile.size / 1024).toFixed(0)} KB</span>
            </div>

            {uploadError && (
              <div style={{ padding: "10px 14px", borderRadius: "10px", background: "#fef2f2", border: "1px solid #fecaca", fontSize: "13px", color: "#dc2626", fontWeight: 500, marginBottom: "14px", textAlign: "center" }}>
                {uploadError}
              </div>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleCancelPending}
                disabled={uploading}
                style={{ flex: 1, padding: "13px 0", borderRadius: "12px", border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: "14px", fontWeight: 600, cursor: uploading ? "not-allowed" : "pointer", fontFamily: "inherit" }}
              >
                Cambiar imagen
              </button>
              <button
                onClick={handleConfirmUpload}
                disabled={uploading}
                style={{ flex: 2, padding: "13px 0", borderRadius: "12px", border: "none", background: uploading ? "#d1d5db" : "#8b5cf6", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: uploading ? "wait" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                {uploading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Sí, enviar comprobante
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
