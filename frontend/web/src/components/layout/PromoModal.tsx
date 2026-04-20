"use client";

import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function PromoModal() {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem("promo_modal_closed")) return;

    fetch(`${API}/api/site-config/promo_modal`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.value?.enabled && data.value.title) {
          setTitle(data.value.title);
          setDescription(data.value.description ?? "");
          setVisible(true);
        }
      })
      .catch(() => {});
  }, []);

  if (!visible) return null;

  function close() {
    setVisible(false);
    sessionStorage.setItem("promo_modal_closed", "1");
  }

  return (
    <div
      onClick={close}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: "20px", padding: "40px",
          maxWidth: "480px", width: "100%", textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          position: "relative",
        }}
      >
        <button
          onClick={close}
          style={{
            position: "absolute", top: "16px", right: "16px",
            width: "32px", height: "32px", borderRadius: "50%",
            border: "none", background: "#f3f4f6", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px", color: "#6b7280",
          }}
        >
          x
        </button>

        <div style={{ fontSize: "40px", marginBottom: "16px" }}>🎉</div>
        <h2 style={{ margin: "0 0 12px", fontSize: "28px", fontWeight: 800, color: "#111" }}>{title}</h2>
        <p style={{ margin: "0 0 24px", fontSize: "16px", color: "#6b7280", lineHeight: 1.6 }}>{description}</p>
        <button
          onClick={close}
          style={{
            padding: "12px 32px", borderRadius: "12px", border: "none",
            background: "#111", color: "#fff", fontSize: "15px", fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
          }}
        >
          Explorar ahora
        </button>
      </div>
    </div>
  );
}
