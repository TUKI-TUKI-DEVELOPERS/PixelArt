"use client";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  danger = false,
  busy = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;
  return (
    <div
      onClick={onCancel}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#fff", borderRadius: "14px", padding: "24px 28px", maxWidth: "420px", width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>{title}</div>
        <div style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.5", marginBottom: "20px" }}>{message}</div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button
            disabled={busy}
            onClick={onCancel}
            style={{ padding: "9px 16px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: "13px", fontWeight: 600, cursor: busy ? "wait" : "pointer", fontFamily: "inherit" }}>
            {cancelLabel}
          </button>
          <button
            disabled={busy}
            onClick={onConfirm}
            style={{ padding: "9px 16px", borderRadius: "8px", border: "none", background: danger ? "#ef4444" : "#111", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: busy ? "wait" : "pointer", fontFamily: "inherit" }}>
            {busy ? "…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
