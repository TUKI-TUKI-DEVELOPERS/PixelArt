"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindowSize";

const ACCENT = "#804187";

const EXAMPLES_DELGADA = [
  { hojas: 15, price: "S/ 90",  highlight: false },
  { hojas: 20, price: "S/ 105", highlight: false },
  { hojas: 25, price: "S/ 120", highlight: true  },
  { hojas: 35, price: "S/ 150", highlight: false },
  { hojas: 50, price: "S/ 195", highlight: false },
];

const EXAMPLES_GRUESA = [
  { hojas: 15, price: "S/ 120", highlight: false },
  { hojas: 20, price: "S/ 140", highlight: false },
  { hojas: 25, price: "S/ 160", highlight: true  },
  { hojas: 35, price: "S/ 200", highlight: false },
  { hojas: 50, price: "S/ 240", highlight: false },
];

type CoverOption = "TAPA_DELGADA" | "TAPA_GRUESA";

type Props = {
  temaSlug:       string;
  temaNombre:     string;
  coverPreviewUrl: string | null;
};

/* ── Componente principal ── */
export default function PhotobookConfigurarClient({ temaSlug, temaNombre, coverPreviewUrl }: Props) {
  const [selectedCover, setSelectedCover]               = useState<CoverOption>("TAPA_DELGADA");
  const [selectedHojasDelgada, setSelectedHojasDelgada] = useState(25);
  const [selectedHojasGruesa, setSelectedHojasGruesa]   = useState(25);
  const router = useRouter();
  const { isMobile, isTablet } = useWindowSize();

  const isCompact     = isMobile || isTablet;
  const selectedHojas = selectedCover === "TAPA_DELGADA" ? selectedHojasDelgada : selectedHojasGruesa;
  const isDelgada     = selectedCover === "TAPA_DELGADA";

  function calcPrice(cover: CoverOption, hojas: number): string {
    const base  = cover === "TAPA_DELGADA" ? 90  : 120;
    const extra = cover === "TAPA_DELGADA" ? 3   : 4;
    return `S/ ${base + (hojas - 15) * extra}`;
  }

  function handleStartEditor() {
    try {
      localStorage.setItem(`photobook_initial_cover_${temaSlug}`, selectedCover);
      localStorage.setItem(`photobook_initial_hojas_${temaSlug}`, String(selectedHojas));
    } catch { /* */ }
    router.push(`/photobooks/${temaSlug}/editor`);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fff", position: "relative", overflow: "hidden" }}>

      {/* ── Abstract geometric background ── */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", maskImage: "radial-gradient(ellipse 55% 65% at center, transparent 20%, black 80%)", WebkitMaskImage: "radial-gradient(ellipse 55% 65% at center, transparent 20%, black 80%)" }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Anillos decorativos */}
        <circle cx="1440" cy="-10" r="130" fill="none" stroke="#804187" strokeOpacity="0.08" strokeWidth="1.5" />
        <circle cx="1440" cy="-10" r="75"  fill="none" stroke="#804187" strokeOpacity="0.06" strokeWidth="1"   />
        <circle cx="90"   cy="760" r="110" fill="none" stroke="#049eff" strokeOpacity="0.08" strokeWidth="1.5" />
        <circle cx="90"   cy="760" r="60"  fill="none" stroke="#049eff" strokeOpacity="0.05" strokeWidth="1"   />

        {/* Triángulos rellenos de baja opacidad */}
        <polygon points="400,420 650,100 750,300"  fill="#804187" fillOpacity="0.05" />
        <polygon points="400,420 60,500  200,780"  fill="#049eff" fillOpacity="0.04" />
        <polygon points="750,300 950,40  1280,30"  fill="#804187" fillOpacity="0.04" />
        <polygon points="1050,480 1200,580 1380,320" fill="#049eff" fillOpacity="0.05" />

        {/* Líneas de conexión */}
        <g stroke="#804187" strokeOpacity="0.15" strokeWidth="1" fill="none">
          <line x1="120"  y1="60"  x2="380"  y2="30"  />
          <line x1="380"  y1="30"  x2="650"  y2="100" />
          <line x1="650"  y1="100" x2="950"  y2="40"  />
          <line x1="950"  y1="40"  x2="1280" y2="30"  />
          <line x1="1280" y1="30"  x2="1380" y2="320" />
          <line x1="1380" y1="320" x2="1200" y2="580" />
          <line x1="1200" y1="580" x2="1320" y2="780" />
          <line x1="1320" y1="780" x2="900"  y2="860" />
          <line x1="900"  y1="860" x2="580"  y2="820" />
          <line x1="580"  y1="820" x2="200"  y2="780" />
          <line x1="200"  y1="780" x2="60"   y2="500" />
          <line x1="60"   y1="500" x2="400"  y2="420" />
          <line x1="400"  y1="420" x2="750"  y2="300" />
          <line x1="750"  y1="300" x2="1050" y2="480" />
          <line x1="1050" y1="480" x2="1200" y2="580" />
          <line x1="400"  y1="420" x2="650"  y2="100" />
          <line x1="750"  y1="300" x2="950"  y2="40"  />
          <line x1="1050" y1="480" x2="1380" y2="320" />
          <line x1="60"   y1="500" x2="400"  y2="420" />
          <line x1="750"  y1="300" x2="400"  y2="420" />
        </g>

        {/* Nodos púrpura */}
        <g fill="#804187" fillOpacity="0.18" stroke="#804187" strokeOpacity="0.45" strokeWidth="1.2">
          <circle cx="120"  cy="60"  r="5" />
          <circle cx="650"  cy="100" r="6" />
          <circle cx="1280" cy="30"  r="5" />
          <circle cx="1200" cy="580" r="6" />
          <circle cx="900"  cy="860" r="5" />
          <circle cx="400"  cy="420" r="9" />
          <circle cx="1050" cy="480" r="5" />
        </g>

        {/* Nodos azules */}
        <g fill="#049eff" fillOpacity="0.15" stroke="#049eff" strokeOpacity="0.40" strokeWidth="1.2">
          <circle cx="380"  cy="30"  r="4" />
          <circle cx="950"  cy="40"  r="4" />
          <circle cx="1380" cy="320" r="4" />
          <circle cx="1320" cy="780" r="4" />
          <circle cx="580"  cy="820" r="4" />
          <circle cx="200"  cy="780" r="6" />
          <circle cx="60"   cy="500" r="4" />
          <circle cx="750"  cy="300" r="6" />
        </g>
      </svg>

      {/* ── Franja superior de acento ── */}
      <div style={{ height: "4px", background: `linear-gradient(90deg, ${ACCENT} 0%, #c471ed 100%)`, position: "relative", zIndex: 1 }} />

      <div style={{
        maxWidth: "1160px",
        margin: "0 auto",
        padding: isCompact ? "40px 24px 64px" : "64px 48px 80px",
        position: "relative",
        zIndex: 1,
      }}>

        {/* ── Layout dos columnas ── */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: isCompact ? "1fr" : "360px 1fr",
          gap:                 isCompact ? "40px" : "64px",
          alignItems:          "start",
        }}>

          {/* ══ COLUMNA IZQUIERDA — portada + contexto ══ */}
          <div>

            {/* Portada */}
            <div style={{
              background:   "#fafafa",
              borderRadius: "20px",
              border:       "1px solid #ebebeb",
              padding:      "32px 24px 24px",
              display:      "flex",
              flexDirection:"column",
              alignItems:   "center",
              gap:          "16px",
              marginBottom: "20px",
            }}>
              {/* Badge */}
              <div style={{
                padding: "5px 14px", borderRadius: "20px",
                background: ACCENT, color: "#fff",
                fontSize: "11px", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.5px",
              }}>
                PHOTOBOOK VIAJE
              </div>

              {/* Imagen */}
              <div style={{
                width: isMobile ? "160px" : isTablet ? "200px" : "240px",
                height: isMobile ? "200px" : isTablet ? "250px" : "300px",
                position: "relative",
                filter: `drop-shadow(0 12px 28px ${ACCENT}35)`,
              }}>
                {coverPreviewUrl ? (
                  <Image
                    src={coverPreviewUrl}
                    alt={temaNombre}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="240px"
                  />
                ) : (
                  <div style={{
                    width: "100%", height: "100%",
                    background: `${ACCENT}12`,
                    borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#ccc", fontSize: "13px",
                  }}>
                    Portada
                  </div>
                )}
              </div>

              {/* Nombre */}
              <h2 style={{
                margin: 0, textAlign: "center",
                fontSize: "16px", fontWeight: 600, color: "#111", lineHeight: 1.3,
              }}>
                {temaNombre}
              </h2>

              {/* Estrellas */}
              <div style={{ display: "flex", gap: "3px" }}>
                {[1,2,3,4,5].map((i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f5a623" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Lo que incluye */}
            <div style={{ padding: "0 4px" }}>
              {[
                "Diseño editorial incluido",
                "Impresión de alta calidad",
                "Envío a calcular al confirmar",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <div style={{
                    width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
                    background: `${ACCENT}12`, border: `1.5px solid ${ACCENT}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span style={{ fontSize: "13px", color: "#555", fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ══ COLUMNA DERECHA — selector ══ */}
          <div style={{ backgroundColor: "rgba(255,255,255,0.45)", borderRadius: "16px", padding: "4px", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
            <h1 style={{
              margin: "0 0 8px 0",
              fontSize: isCompact ? "26px" : "36px",
              fontWeight: 700, color: "#111", lineHeight: 1.2,
            }}>
              Elige tu tipo de tapa
            </h1>
            <p style={{ margin: "0 0 32px 0", fontSize: "15px", color: "#666", lineHeight: 1.6 }}>
              El precio varía según la tapa y la cantidad de hojas. Puedes cambiarlos dentro del editor también.
            </p>

            {/* Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>

              {/* ── Tapa Delgada ── */}
              <div
                onClick={() => setSelectedCover("TAPA_DELGADA")}
                style={{
                  cursor: "pointer",
                  background: "#fff",
                  border: `2px solid ${selectedCover === "TAPA_DELGADA" ? "#6b9fff" : "#e8e8e8"}`,
                  borderLeft: `5px solid ${selectedCover === "TAPA_DELGADA" ? "#6b9fff" : "#e8e8e8"}`,
                  borderRadius: "16px",
                  padding: "20px 20px 20px 18px",
                  position: "relative",
                  userSelect: "none",
                  boxShadow: selectedCover === "TAPA_DELGADA" ? "0 4px 20px rgba(107,159,255,0.15)" : "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                {/* Header de la card */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#6b9fff", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "3px" }}>TAPA DELGADA</div>
                    <div style={{ fontSize: "16px", fontWeight: 600, color: "#111" }}>Cartulina estándar · Ligero y económico</div>
                  </div>
                  <div style={{
                    width: "24px", height: "24px", borderRadius: "50%", flexShrink: 0,
                    background: selectedCover === "TAPA_DELGADA" ? "#6b9fff" : "transparent",
                    border: `2px solid ${selectedCover === "TAPA_DELGADA" ? "#6b9fff" : "#ddd"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}>
                    {selectedCover === "TAPA_DELGADA" && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Filas de hojas */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {EXAMPLES_DELGADA.map((ex) => {
                    const isRowSelected = selectedCover === "TAPA_DELGADA" && selectedHojasDelgada === ex.hojas;
                    return (
                      <div
                        key={ex.hojas}
                        onClick={(e) => { e.stopPropagation(); setSelectedCover("TAPA_DELGADA"); setSelectedHojasDelgada(ex.hojas); }}
                        style={{
                          padding: "10px 14px", borderRadius: "10px", cursor: "pointer",
                          background: isRowSelected ? "rgba(107,159,255,0.10)" : ex.highlight ? "rgba(107,159,255,0.05)" : "#fafafa",
                          border: isRowSelected ? "1.5px solid #6b9fff" : ex.highlight ? "1.5px solid rgba(107,159,255,0.25)" : "1.5px solid #f0f0f0",
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          gap: "8px", position: "relative", transition: "all 0.15s",
                        }}
                      >
                        {ex.highlight && !isRowSelected && (
                          <div style={{ position: "absolute", top: "-8px", left: "12px", background: "#6b9fff", color: "#fff", fontSize: "8px", fontWeight: 700, padding: "1px 8px", borderRadius: "99px" }}>MÁS ELEGIDO</div>
                        )}
                        {isRowSelected && (
                          <div style={{ position: "absolute", top: "-8px", left: "12px", background: "#6b9fff", color: "#fff", fontSize: "8px", fontWeight: 700, padding: "1px 8px", borderRadius: "99px" }}>SELECCIONADO</div>
                        )}
                        <span style={{ fontSize: "13px", fontWeight: 500, color: isRowSelected ? "#111" : "#555" }}>{ex.hojas} hojas · {ex.hojas * 2} caras</span>
                        <span style={{ fontSize: isMobile ? "15px" : "18px", fontWeight: 700, color: isRowSelected ? "#6b9fff" : "#111", whiteSpace: "nowrap" }}>{ex.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── Tapa Gruesa ── */}
              <div
                onClick={() => setSelectedCover("TAPA_GRUESA")}
                style={{
                  cursor: "pointer",
                  background: "#fff",
                  border: `2px solid ${selectedCover === "TAPA_GRUESA" ? ACCENT : "#e8e8e8"}`,
                  borderLeft: `5px solid ${selectedCover === "TAPA_GRUESA" ? ACCENT : "#e8e8e8"}`,
                  borderRadius: "16px",
                  padding: "20px 20px 20px 18px",
                  position: "relative",
                  userSelect: "none",
                  boxShadow: selectedCover === "TAPA_GRUESA" ? `0 4px 20px ${ACCENT}20` : "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                {/* Badge recomendada */}
                {selectedCover !== "TAPA_GRUESA" && (
                  <div style={{
                    position: "absolute", top: "-10px", right: "20px",
                    background: `linear-gradient(135deg, ${ACCENT} 0%, #c471ed 100%)`,
                    color: "#fff", fontSize: "9px", fontWeight: 700,
                    padding: "3px 12px", borderRadius: "99px",
                    letterSpacing: "0.5px", textTransform: "uppercase",
                  }}>
                    Recomendada
                  </div>
                )}

                {/* Header de la card */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "3px" }}>TAPA GRUESA</div>
                    <div style={{ fontSize: "16px", fontWeight: 600, color: "#111" }}>Tapa dura resistente · Durabilidad premium</div>
                  </div>
                  <div style={{
                    width: "24px", height: "24px", borderRadius: "50%", flexShrink: 0,
                    background: selectedCover === "TAPA_GRUESA" ? ACCENT : "transparent",
                    border: `2px solid ${selectedCover === "TAPA_GRUESA" ? ACCENT : "#ddd"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}>
                    {selectedCover === "TAPA_GRUESA" && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Filas de hojas */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {EXAMPLES_GRUESA.map((ex) => {
                    const isRowSelected = selectedCover === "TAPA_GRUESA" && selectedHojasGruesa === ex.hojas;
                    return (
                      <div
                        key={ex.hojas}
                        onClick={(e) => { e.stopPropagation(); setSelectedCover("TAPA_GRUESA"); setSelectedHojasGruesa(ex.hojas); }}
                        style={{
                          padding: "10px 14px", borderRadius: "10px", cursor: "pointer",
                          background: isRowSelected ? `${ACCENT}0f` : ex.highlight ? `${ACCENT}07` : "#fafafa",
                          border: isRowSelected ? `1.5px solid ${ACCENT}` : ex.highlight ? `1.5px solid ${ACCENT}30` : "1.5px solid #f0f0f0",
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          gap: "8px", position: "relative", transition: "all 0.15s",
                        }}
                      >
                        {ex.highlight && !isRowSelected && (
                          <div style={{ position: "absolute", top: "-8px", left: "12px", background: ACCENT, color: "#fff", fontSize: "8px", fontWeight: 700, padding: "1px 8px", borderRadius: "99px" }}>MÁS ELEGIDO</div>
                        )}
                        {isRowSelected && (
                          <div style={{ position: "absolute", top: "-8px", left: "12px", background: ACCENT, color: "#fff", fontSize: "8px", fontWeight: 700, padding: "1px 8px", borderRadius: "99px" }}>SELECCIONADO</div>
                        )}
                        <span style={{ fontSize: "13px", fontWeight: 500, color: isRowSelected ? "#111" : "#555" }}>{ex.hojas} hojas · {ex.hojas * 2} caras</span>
                        <span style={{ fontSize: isMobile ? "15px" : "18px", fontWeight: 700, color: isRowSelected ? ACCENT : "#111", whiteSpace: "nowrap" }}>{ex.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* ── CTA ── */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
              {/* Resumen de selección */}
              <div style={{
                padding: "12px 18px", borderRadius: "12px",
                background: "#fafafa", border: "1px solid #ebebeb",
                fontSize: "13px", color: "#555",
              }}>
                {isDelgada ? "Tapa Delgada" : "Tapa Gruesa"} · {selectedHojas} hojas · {selectedHojas * 2} caras →{" "}
                <strong style={{ color: "#111" }}>{calcPrice(selectedCover, selectedHojas)}</strong>
              </div>

              <button
                onClick={handleStartEditor}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "16px 40px",
                  borderRadius: "14px",
                  border: "none",
                  background: isDelgada
                    ? "linear-gradient(135deg, #4a7fff 0%, #6b9fff 100%)"
                    : `linear-gradient(135deg, ${ACCENT} 0%, #c471ed 100%)`,
                  color: "#fff",
                  fontSize: "17px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  boxShadow: isDelgada
                    ? "0 6px 24px rgba(107,159,255,0.35)"
                    : `0 6px 24px ${ACCENT}35`,
                  transition: "all 0.2s",
                  letterSpacing: "0.2px",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                Empezar con {isDelgada ? "Tapa Delgada" : "Tapa Gruesa"}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <p style={{ margin: 0, fontSize: "12px", color: "#aaa" }}>
                Puedes cambiar la tapa y la cantidad de hojas dentro del editor.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
