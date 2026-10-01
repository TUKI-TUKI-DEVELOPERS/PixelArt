"use client";

export type PhotobookCoverType = "TAPA_DELGADA" | "TAPA_GRUESA";

export const THIN_COVER_EXAMPLES = [
  { sheets: 15, price: "S/ 90", highlight: false },
  { sheets: 20, price: "S/ 105", highlight: false },
  { sheets: 25, price: "S/ 120", highlight: true },
  { sheets: 35, price: "S/ 150", highlight: false },
  { sheets: 50, price: "S/ 195", highlight: false },
];

export const THICK_COVER_EXAMPLES = [
  { sheets: 15, price: "S/ 120", highlight: false },
  { sheets: 20, price: "S/ 140", highlight: false },
  { sheets: 25, price: "S/ 160", highlight: true },
  { sheets: 35, price: "S/ 200", highlight: false },
  { sheets: 50, price: "S/ 240", highlight: false },
];

type Props = {
  selectedCover: PhotobookCoverType;
  thinSheets: number;
  thickSheets: number;
  compact?: boolean;
  onSelectCover: (cover: PhotobookCoverType) => void;
  onSelectSheets: (cover: PhotobookCoverType, sheets: number) => void;
};

const ACCENT = "#804187";

function Check({ visible }: { visible: boolean }) {
  return <span aria-hidden="true" style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, background: visible ? ACCENT : "transparent", border: `2px solid ${visible ? ACCENT : "#ddd"}`, display: "grid", placeItems: "center" }}>{visible && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}</span>;
}

function CoverCard({ cover, title, description, color, examples, selectedCover, selectedSheets, compact, onSelectCover, onSelectSheets }: {
  cover: PhotobookCoverType; title: string; description: string; color: string; examples: typeof THIN_COVER_EXAMPLES; selectedCover: PhotobookCoverType; selectedSheets: number; compact: boolean; onSelectCover: (cover: PhotobookCoverType) => void; onSelectSheets: (cover: PhotobookCoverType, sheets: number) => void;
}) {
  const selected = selectedCover === cover;
  return (
    <section onClick={() => onSelectCover(cover)} style={{ cursor: "pointer", background: "#fff", border: `2px solid ${selected ? color : "#e8e8e8"}`, borderLeft: `5px solid ${selected ? color : "#e8e8e8"}`, borderRadius: "16px", padding: compact ? "16px" : "20px 20px 20px 18px", position: "relative", userSelect: "none", boxShadow: selected ? `0 4px 20px ${color}25` : "0 2px 8px rgba(0,0,0,.04)", transition: "border-color .2s ease, box-shadow .2s ease" }}>
      {cover === "TAPA_GRUESA" && !selected && <span style={{ position: "absolute", top: "-10px", right: "20px", background: `linear-gradient(135deg, ${ACCENT}, #c471ed)`, color: "#fff", fontSize: "9px", fontWeight: 700, padding: "3px 12px", borderRadius: "99px", letterSpacing: ".5px", textTransform: "uppercase" }}>Recomendada</span>}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: compact ? "12px" : "16px" }}>
        <div>
          <div style={{ fontSize: "11px", fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "3px" }}>{title}</div>
          <div style={{ fontSize: compact ? "14px" : "16px", fontWeight: 600, color: "#111" }}>{description}</div>
        </div>
        <Check visible={selected} />
      </div>
      <div role="radiogroup" aria-label={`Hojas para ${title.toLowerCase()}`} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {examples.map((example) => {
          const rowSelected = selected && selectedSheets === example.sheets;
          return <button key={example.sheets} type="button" role="radio" aria-checked={rowSelected} aria-label={`${example.sheets} hojas, ${example.sheets * 2} páginas, ${example.price}`} onClick={(event) => { event.stopPropagation(); onSelectCover(cover); onSelectSheets(cover, example.sheets); }} style={{ width: "100%", padding: compact ? "8px 11px" : "10px 14px", borderRadius: "10px", cursor: "pointer", background: rowSelected ? `${color}16` : example.highlight ? `${color}0d` : "#fafafa", border: rowSelected ? `1.5px solid ${color}` : example.highlight ? `1.5px solid ${color}40` : "1.5px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", position: "relative", fontFamily: "inherit", textAlign: "left" }}>
            {example.highlight && <span style={{ position: "absolute", top: "-8px", left: "12px", background: color, color: "#fff", fontSize: "8px", fontWeight: 700, padding: "1px 8px", borderRadius: "99px" }}>MÁS ELEGIDO</span>}
            <span style={{ fontSize: "13px", fontWeight: 500, color: rowSelected ? "#111" : "#555" }}>{example.sheets} hojas · {example.sheets * 2} caras</span>
            <span style={{ fontSize: compact ? "15px" : "18px", fontWeight: 700, color: rowSelected ? color : "#111", whiteSpace: "nowrap" }}>{example.price}</span>
          </button>;
        })}
      </div>
    </section>
  );
}

export default function PhotobookFormatSelector({ selectedCover, thinSheets, thickSheets, compact = false, onSelectCover, onSelectSheets }: Props) {
  return <div style={{ display: "flex", flexDirection: "column", gap: compact ? "12px" : "16px" }}>
    <CoverCard cover="TAPA_DELGADA" title="TAPA DELGADA" description="Cartulina estándar · Ligero y económico" color="#6b9fff" examples={THIN_COVER_EXAMPLES} selectedCover={selectedCover} selectedSheets={thinSheets} compact={compact} onSelectCover={onSelectCover} onSelectSheets={onSelectSheets} />
    <CoverCard cover="TAPA_GRUESA" title="TAPA GRUESA" description="Tapa dura resistente · Durabilidad premium" color={ACCENT} examples={THICK_COVER_EXAMPLES} selectedCover={selectedCover} selectedSheets={thickSheets} compact={compact} onSelectCover={onSelectCover} onSelectSheets={onSelectSheets} />
  </div>;
}
