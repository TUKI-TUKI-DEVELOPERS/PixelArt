"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ── Datos de todos los temas ── */

type TemaInfo = {
  slug: string;
  name: string;
  description: string;
  reviews: number;
};

const ALL_THEMES: TemaInfo[] = [
  { slug: "portada-francesa-flores", name: "Portada Francesa de Flores", description: "Un photobook creado para que tus recuerdos en Francia encuentren su espacio, diseño editorial, elegancia atemporal y el protagonismo absoluto de tus propias fotografías.", reviews: 120 },
  { slug: "portada-chichen-itza", name: "Portada Chichén Itzá", description: "Un photobook pensado para preservar tus recuerdos en México con elegancia y equilibrio, el diseño enmarca. Las fotografías hablan y la historia siempre es tuya.", reviews: 220 },
  { slug: "portada-nueva-york", name: "Portada Ciudad Nueva York", description: "Un photobook pensado para guardar lo que la ciudad despertó en ti. Cada imagen ocupa su lugar con claridad y carácter, en un diseño sobrio.", reviews: 210 },
  { slug: "portada-coliseo-romano", name: "Portada Coliseo Romano", description: "Un photobook que reúne tus recuerdos en Roma con equilibrio y sobriedad. Clásico en espíritu, contemporáneo en diseño.", reviews: 420 },
  { slug: "portada-pais-vientos", name: "Portada País de los Vientos", description: "Un álbum pensado para conservar tus momentos en Holanda con claridad y frescura. Ligero, limpio y visualmente armónico.", reviews: 320 },
  { slug: "portada-thailandia", name: "Portada Thailandia", description: "Un photobook creado para preservar tu experiencia en Thailandia con profundidad y atmósfera. Sutil y refinado.", reviews: 120 },
  { slug: "portada-rio-janeiro", name: "Portada Rio de Janeiro", description: "Un photobook que reúne tus recuerdos en Rio de Janeiro con energía y equilibrio. Vibrante pero sofisticado.", reviews: 120 },
  { slug: "portada-iquitos", name: "Portada de Visita a Iquitos", description: "Un photobook pensado para preservar tus momentos en Iquitos con calma y profundidad. Natural y envolvente.", reviews: 120 },
  { slug: "portada-machu-picchu", name: "Portada Machu Picchu", description: "Un photobook que conserva tus recuerdos en Machu Picchu con sobriedad y carácter. Diseñado para resaltar la fuerza visual.", reviews: 120 },
  { slug: "portada-punta-cana", name: "Portada Punta Cana", description: "Un álbum creado para enmarcar tus días en Punta Cana con ligereza y claridad. Su estética luminosa permite que cada fotografía fluya.", reviews: 120 },
  { slug: "portada-jamaica", name: "Portada Jamaica", description: "Un photobook pensado para conservar tus recuerdos en Jamaica con profundidad y ritmo. Equilibrado y refinado.", reviews: 120 },
  { slug: "portada-miami", name: "Portada Miami", description: "Un álbum diseñado para capturar la luz y el carácter de tu viaje en Miami. Moderno y luminoso.", reviews: 120 },
];

/* ── Ejemplos de precio por hoja ── */
// Delgada: S/90 + S/3 × (hojas - 15)
// Gruesa:  S/120 + S/4 × (hojas - 15)
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

/* ── Calidad ── */
const QUALITY_BLOCKS = [
  { title: "Impreso para durar toda la vida.", subtitle: "Sostén tus recuerdos con orgullo. Hay viajes que merecen quedarse contigo para siempre." },
  { title: "Los libros son un recuerdo eterno", subtitle: "Un destino puede inspirar. Tus recuerdos lo convierten en algo eterno." },
  { title: "Detalle en cada parte", subtitle: "Cada página guarda algo que el tiempo no debería borrar." },
];

/* ── FAQ ── */
const FAQ_ITEMS = [
  { question: "¿Cómo funciona los Photobooks PixelArt?", answer: "Subes tus fotos, eliges el destino o diseño que prefieras y nosotros transformamos tus recuerdos en un photobook listo para imprimir. El proceso es simple, guiado y pensado para que el resultado sea elegante y profesional." },
  { question: "¿Tengo que diseñar el álbum yo mismo?", answer: "No necesitas experiencia en diseño. Las plantillas están preparadas para que tus fotografías encajen de forma natural y estética." },
  { question: "¿Puedo elegir la portada?", answer: "Sí. Puedes seleccionar entre diferentes destinos y estilos de portada. Cada colección mantiene una estética limpia y atemporal." },
  { question: "¿Qué calidad tienen los libros?", answer: "Nuestros photobooks son de tapa dura, acabado mate y papel de alta calidad. Están pensados para durar y conservar tus recuerdos por años." },
  { question: "¿Cuántas fotos puedo subir?", answer: "Depende del formato elegido, pero podrás incluir suficientes imágenes para contar tu viaje sin saturar el diseño." },
  { question: "¿Cuánto tarda en llegar mi pedido?", answer: "El tiempo de producción e impresión es corto. Luego se suma el tiempo de envío según tu ubicación. Siempre recibirás una estimación clara antes de confirmar tu compra." },
  { question: "¿Puedo enviar el photobook como regalo?", answer: "Sí. Puedes enviarlo directamente a otra persona. Es una forma elegante de regalar recuerdos." },
  { question: "¿Qué pasa si no me gusta cómo quedó?", answer: "Antes de confirmar tu pedido podrás revisar el diseño. Queremos que estés completamente seguro antes de imprimir." },
  { question: "¿Las fotos pierden calidad al imprimir?", answer: "No. Trabajamos con estándares de impresión de alta resolución para mantener nitidez y fidelidad de color." },
  { question: "¿Mis fotos están seguras?", answer: "Sí. Tus imágenes se utilizan únicamente para crear tu photobook y se manejan con confidencialidad." },
];

const ACCENT = "#804187";
const ACCENT_LIGHT = "#049eff";
const INITIAL_VISIBLE = 6;

/* ══════════════════════════════════════════ */

type Props = {
  temaSlug: string;
  temaNombre: string;
};

type CoverOption = "TAPA_DELGADA" | "TAPA_GRUESA";

export default function PhotobookDetalleClient({ temaSlug, temaNombre }: Props) {
  const currentTheme = ALL_THEMES.find((t) => t.slug === temaSlug);
  const otherThemes = ALL_THEMES.filter((t) => t.slug !== temaSlug);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const visibleOthers = otherThemes.slice(0, visibleCount);
  const hasMore = visibleCount < otherThemes.length;
  const [selectedCover, setSelectedCover] = useState<CoverOption>("TAPA_DELGADA");
  const [selectedHojasDelgada, setSelectedHojasDelgada] = useState(25);
  const [selectedHojasGruesa, setSelectedHojasGruesa] = useState(25);
  const router = useRouter();

  const selectedHojas = selectedCover === "TAPA_DELGADA" ? selectedHojasDelgada : selectedHojasGruesa;
  function calcPrice(cover: CoverOption, hojas: number): string {
    const base = cover === "TAPA_DELGADA" ? 90 : 120;
    const extra = cover === "TAPA_DELGADA" ? 3 : 4;
    return `S/ ${base + (hojas - 15) * extra}`;
  }

  function scrollToPrecios() {
    document.getElementById("precios")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleStartEditor() {
    try {
      localStorage.setItem(`photobook_initial_cover_${temaSlug}`, selectedCover);
      localStorage.setItem(`photobook_initial_hojas_${temaSlug}`, String(selectedHojas));
    } catch { /* */ }
    router.push(`/photobooks/${temaSlug}/editor`);
  }

  return (
    <div>
      {/* ═══ HERO CON PORTADA SELECCIONADA ═══ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "520px",
          background: "linear-gradient(160deg, #1a0a2e 0%, #2d1b4e 40%, #1a1a2e 100%)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-40px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(128, 65, 135, 0.15)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "80px 48px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
          }}
        >
          {/* Left */}
          <div>
            <div
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: "20px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: ACCENT_LIGHT,
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                marginBottom: "20px",
              }}
            >
              PHOTOBOOK VIAJE
            </div>
            <h1
              style={{
                margin: "0 0 20px 0",
                fontSize: "44px",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.1,
              }}
            >
              {temaNombre}
            </h1>
            {currentTheme && (
              <p
                style={{
                  margin: "0 0 16px 0",
                  fontSize: "17px",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {currentTheme.description}
              </p>
            )}
            {currentTheme && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "32px",
                }}
              >
                <div style={{ display: "flex", gap: "2px" }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>
                  {currentTheme.reviews} Reviews
                </span>
              </div>
            )}
            <button
              onClick={scrollToPrecios}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "16px 36px",
                borderRadius: "14px",
                border: "none",
                background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_LIGHT} 100%)`,
                color: "#fff",
                fontSize: "17px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Ver precios y crear
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
              </svg>
            </button>
          </div>

          {/* Right: portada placeholder */}
          <div
            style={{
              width: "100%",
              aspectRatio: "3/4",
              maxHeight: "460px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.3)",
              fontSize: "16px",
            }}
          >
            Portada seleccionada
          </div>
        </div>
      </section>

      {/* ═══ PRECIOS ═══ */}
      <section id="precios" style={{ background: "linear-gradient(160deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%)", padding: "80px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "20px", padding: "6px 16px", marginBottom: "20px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80" }} />
              <span style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "2px" }}>Paso 1 de 2</span>
            </div>
            <h2 style={{ margin: "0 0 14px 0", fontSize: "38px", fontWeight: 800, color: "#fff", lineHeight: 1.1 }}>
              Elige tu tipo de tapa
            </h2>
            <p style={{ margin: 0, fontSize: "16px", color: "rgba(255,255,255,0.45)", maxWidth: "460px", marginLeft: "auto", marginRight: "auto" }}>
              El precio se define por la tapa y la cantidad de hojas. Después eliges cuántas páginas quieres en el editor.
            </p>
          </div>

          {/* Cards seleccionables */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "36px" }}>

            {/* ── Tapa Delgada ── */}
            <div
              onClick={() => setSelectedCover("TAPA_DELGADA")}
              style={{
                cursor: "pointer",
                background: selectedCover === "TAPA_DELGADA" ? "rgba(107,159,255,0.12)" : "rgba(255,255,255,0.03)",
                border: selectedCover === "TAPA_DELGADA" ? "2px solid #6b9fff" : "2px solid rgba(255,255,255,0.12)",
                borderRadius: "22px",
                padding: "28px 24px",
                position: "relative",
                userSelect: "none",
              }}
            >
              <div style={{ position: "absolute", top: "16px", right: "16px", width: "22px", height: "22px", borderRadius: "50%", background: selectedCover === "TAPA_DELGADA" ? "#6b9fff" : "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {selectedCover === "TAPA_DELGADA" && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
              </div>
              <div style={{ marginBottom: "16px", paddingRight: "32px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#6b9fff", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "5px" }}>TAPA DELGADA</div>
                <div style={{ fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>Cartulina estándar</div>
                <div style={{ fontSize: "11px", color: "#6b9fff", fontWeight: 600 }}>S/ 90 base · +S/ 3 por hoja extra</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {EXAMPLES_DELGADA.map((ex) => {
                  const isRowSelected = selectedCover === "TAPA_DELGADA" && selectedHojasDelgada === ex.hojas;
                  return (
                    <div
                      key={ex.hojas}
                      onClick={(e) => { e.stopPropagation(); setSelectedCover("TAPA_DELGADA"); setSelectedHojasDelgada(ex.hojas); }}
                      style={{ padding: "10px 14px", borderRadius: "10px", cursor: "pointer", background: isRowSelected ? "rgba(107,159,255,0.22)" : ex.highlight ? "rgba(107,159,255,0.08)" : "rgba(255,255,255,0.04)", border: isRowSelected ? "1px solid #6b9fff" : ex.highlight ? "1px solid rgba(107,159,255,0.3)" : "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", position: "relative", transition: "all 0.15s" }}
                    >
                      {ex.highlight && !isRowSelected && <div style={{ position: "absolute", top: "-8px", left: "12px", background: "#6b9fff", color: "#fff", fontSize: "8px", fontWeight: 700, padding: "1px 8px", borderRadius: "99px" }}>MÁS ELEGIDO</div>}
                      {isRowSelected && <div style={{ position: "absolute", top: "-8px", left: "12px", background: "#6b9fff", color: "#fff", fontSize: "8px", fontWeight: 700, padding: "1px 8px", borderRadius: "99px" }}>SELECCIONADO</div>}
                      <span style={{ fontSize: "12px", fontWeight: 600, color: isRowSelected ? "#fff" : "rgba(255,255,255,0.7)" }}>{ex.hojas} hojas · {ex.hojas * 2} caras</span>
                      <span style={{ fontSize: "18px", fontWeight: 900, color: isRowSelected ? "#6b9fff" : ex.highlight ? "#6b9fff" : "#fff", whiteSpace: "nowrap" }}>{ex.price}</span>
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
                background: selectedCover === "TAPA_GRUESA" ? "rgba(167,139,250,0.12)" : "rgba(255,255,255,0.03)",
                border: selectedCover === "TAPA_GRUESA" ? "2px solid #a78bfa" : "2px solid rgba(255,255,255,0.12)",
                borderRadius: "22px",
                padding: "28px 24px",
                position: "relative",
                userSelect: "none",
              }}
            >
              <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                {selectedCover === "TAPA_GRUESA"
                  ? <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#a78bfa", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></div>
                  : <span style={{ fontSize: "9px", fontWeight: 700, color: "#a78bfa", background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.35)", padding: "3px 10px", borderRadius: "10px", textTransform: "uppercase" }}>Recomendada</span>
                }
              </div>
              <div style={{ marginBottom: "16px", paddingRight: "32px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "5px" }}>TAPA GRUESA</div>
                <div style={{ fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>Tapa dura resistente</div>
                <div style={{ fontSize: "11px", color: "#a78bfa", fontWeight: 600 }}>S/ 120 base · +S/ 4 por hoja extra</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {EXAMPLES_GRUESA.map((ex) => {
                  const isRowSelected = selectedCover === "TAPA_GRUESA" && selectedHojasGruesa === ex.hojas;
                  return (
                    <div
                      key={ex.hojas}
                      onClick={(e) => { e.stopPropagation(); setSelectedCover("TAPA_GRUESA"); setSelectedHojasGruesa(ex.hojas); }}
                      style={{ padding: "10px 14px", borderRadius: "10px", cursor: "pointer", background: isRowSelected ? "rgba(167,139,250,0.22)" : ex.highlight ? "rgba(167,139,250,0.08)" : "rgba(255,255,255,0.04)", border: isRowSelected ? "1px solid #a78bfa" : ex.highlight ? "1px solid rgba(167,139,250,0.3)" : "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", position: "relative", transition: "all 0.15s" }}
                    >
                      {ex.highlight && !isRowSelected && <div style={{ position: "absolute", top: "-8px", left: "12px", background: "#a78bfa", color: "#fff", fontSize: "8px", fontWeight: 700, padding: "1px 8px", borderRadius: "99px" }}>MÁS ELEGIDO</div>}
                      {isRowSelected && <div style={{ position: "absolute", top: "-8px", left: "12px", background: "#a78bfa", color: "#fff", fontSize: "8px", fontWeight: 700, padding: "1px 8px", borderRadius: "99px" }}>SELECCIONADO</div>}
                      <span style={{ fontSize: "12px", fontWeight: 600, color: isRowSelected ? "#fff" : "rgba(255,255,255,0.7)" }}>{ex.hojas} hojas · {ex.hojas * 2} caras</span>
                      <span style={{ fontSize: "18px", fontWeight: 900, color: isRowSelected ? "#a78bfa" : ex.highlight ? "#a78bfa" : "#fff", whiteSpace: "nowrap" }}>{ex.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* CTA principal */}
          {(() => {
            const isDelgada = selectedCover === "TAPA_DELGADA";
            return (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                  {isDelgada ? "Tapa Delgada" : "Tapa Gruesa"} · {selectedHojas} hojas · {selectedHojas * 2} caras →{" "}
                  <span style={{ color: "#fff", fontWeight: 700 }}>{calcPrice(selectedCover, selectedHojas)}</span>
                </div>
                <button
                  onClick={handleStartEditor}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "18px 48px",
                    borderRadius: "16px",
                    border: "none",
                    background: isDelgada
                      ? "linear-gradient(135deg, #4a7fff 0%, #6b9fff 100%)"
                      : "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
                    color: "#fff",
                    fontSize: "18px",
                    fontWeight: 800,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    boxShadow: isDelgada ? "0 8px 32px rgba(107,159,255,0.4)" : "0 8px 32px rgba(139,92,246,0.4)",
                    transition: "all 0.2s",
                    letterSpacing: "0.3px",
                  }}
                >
                  Empezar con {isDelgada ? "Tapa Delgada" : "Tapa Gruesa"}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
                  Puedes cambiar la tapa y la cantidad de hojas dentro del editor
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ═══ CATÁLOGO — TAMBIÉN TE PODRÍA INTERESAR ═══ */}
      <section
        id="catalogo-section"
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "72px 48px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "2px" }}>
            RECUERDOS QUE DURARÁN PARA SIEMPRE
          </h2>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "32px", fontWeight: 800, color: "#111", textTransform: "uppercase" }}>
            También te podría interesar
          </h3>
          <div style={{ width: "80px", height: "3px", background: ACCENT, margin: "0 auto", borderRadius: "2px" }} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            columnGap: "32px",
            rowGap: "40px",
            alignItems: "start",
          }}
        >
          {visibleOthers.map((theme) => (
            <Link key={theme.slug} href={`/photobooks/${theme.slug}`} style={{ textDecoration: "none" }}>
              <article
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "24px 20px 28px",
                  background: "#fff",
                  borderRadius: "20px",
                  border: "1px solid #e8e8e8",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "6px 18px",
                    borderRadius: "20px",
                    background: ACCENT,
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "16px",
                  }}
                >
                  PHOTOBOOK VIAJE
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "220px",
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, ${ACCENT}12 0%, ${ACCENT}06 100%)`,
                    marginBottom: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ccc",
                    fontSize: "14px",
                  }}
                >
                  Portada
                </div>
                <div style={{ display: "flex", gap: "2px", marginBottom: "4px" }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <div style={{ fontSize: "13px", color: "#999", marginBottom: "14px" }}>{theme.reviews} Reviews</div>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", fontWeight: 700, color: "#111" }}>{theme.name}</h3>
                <p style={{ margin: "0 0 14px 0", maxWidth: "360px", fontSize: "13px", lineHeight: 1.4, color: "#666" }}>{theme.description}</p>
                <div style={{ marginBottom: "14px", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#aaa", marginBottom: "2px" }}>Desde</div>
                  <div style={{ fontSize: "22px", fontWeight: 900, color: "#111", lineHeight: 1 }}>S/ 90</div>
                  <div style={{ fontSize: "11px", color: "#aaa", marginTop: "3px" }}>15 hojas · Tapa Delgada</div>
                </div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "170px",
                    height: "42px",
                    borderRadius: "14px",
                    background: ACCENT,
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                  }}
                >
                  Crear Aquí
                </span>
              </article>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
            <button
              onClick={() => setVisibleCount((prev) => prev + INITIAL_VISIBLE)}
              style={{
                minWidth: "220px",
                height: "56px",
                borderRadius: "18px",
                border: `2px solid ${ACCENT}`,
                background: "#fff",
                color: ACCENT,
                fontSize: "18px",
                fontWeight: 700,
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontFamily: "inherit",
              }}
            >
              Ver Más
            </button>
          </div>
        )}
      </section>

      {/* ═══ CALIDAD ═══ */}
      <section style={{ background: "#fafafa", padding: "72px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
            {QUALITY_BLOCKS.map((block, i) => (
              <article
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  border: "1px solid #eee",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    background: `linear-gradient(135deg, ${ACCENT}12 0%, ${ACCENT}06 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ccc",
                    fontSize: "14px",
                  }}
                >
                  Imagen calidad
                </div>
                <div style={{ padding: "24px" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#111", margin: "0 0 8px 0" }}>{block.title}</h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.5, color: "#888", margin: 0 }}>{block.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "72px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, color: "#111", margin: "0 0 8px 0" }}>
            PREGUNTAS FRECUENTES
          </h2>
          <div style={{ width: "60px", height: "3px", background: ACCENT, margin: "0 auto", borderRadius: "2px" }} />
        </div>
        <div>
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ── FAQ Accordion ── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid #e8e8e8" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "22px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "left",
          fontFamily: "inherit",
          gap: "16px",
        }}
      >
        <span style={{ fontSize: "17px", fontWeight: 700, color: open ? ACCENT : "#222", transition: "color 0.2s ease", lineHeight: 1.4 }}>
          {question}
        </span>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={open ? ACCENT : "#999"}
          strokeWidth="2"
          strokeLinecap="round"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease, stroke 0.2s ease" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div style={{ maxHeight: open ? "300px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" }}>
        <div style={{ padding: "0 0 22px 0", fontSize: "15px", lineHeight: 1.7, color: "#666" }}>{answer}</div>
      </div>
    </div>
  );
}
