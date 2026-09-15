"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { PIXELART_COLORS, BASE_COLORS, hexToRgba } from "@/lib/colors";
import { getAssetUrl } from "@/lib/assetUrl";
import NavIcon from "./NavIcon";

export const CATEGORIAS = [
  {
    label: "Amor",
    subtitle: "Historias que enamoran",
    href: "/libros-personalizados/libros-de-amor",
    icon: "heart",
    color: PIXELART_COLORS.R_PINK,
  },
  {
    label: "Mascotas",
    subtitle: "Nuestros mejores amigos",
    href: "/libros-personalizados/libros-de-mascotas",
    icon: "paw",
    color: PIXELART_COLORS.I_ORANGE,
  },
  {
    label: "Familia",
    subtitle: "Momentos que nos unen",
    href: "/libros-personalizados/libros-de-familia",
    icon: "family",
    color: PIXELART_COLORS.E_GREEN,
  },
  {
    label: "Memorias",
    subtitle: "Recuerdos que perduran",
    href: "/libros-personalizados/libros-de-memorias-familiares",
    icon: "book",
    color: '#8b6bb1',
  },
];

/* ── Libros curados a mano por audiencia — no existe un tag "para quién" en
   la base de datos (cada libro pertenece a una sola categoría), así que esta
   lista es la fuente de verdad de qué miniaturas mostrar en la columna 3
   cuando se hace hover sobre cada ítem. Actualizar a mano si se agrega un
   libro nuevo que calce con alguna de estas audiencias. ── */
const PAREJA_BOOKS = [
  {
    label: "10 Razones por las que Te Amo",
    subtitle: "Para celebrar lo que más amás de esa persona",
    tag: "PAREJA",
    href: "/libros-personalizados/libros-de-amor/10-razones-por-las-que-te-amo",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_10RazonesPorLasQueTeAmo_Miniatura.png",
    color: PIXELART_COLORS.R_PINK,
  },
  {
    label: "Mi Amor",
    subtitle: "Un clásico para tu persona favorita",
    tag: "PAREJA",
    href: "/libros-personalizados/libros-de-amor/mi-amor",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_Miamor_Miniatura.png",
    color: PIXELART_COLORS.R_PINK,
  },
  {
    label: "1025 días enamorándome de ti",
    subtitle: "Para celebrar nuestro amor",
    tag: "PAREJA",
    href: "/libros-personalizados/libros-de-amor/1025-dias-enamorandome-de-ti",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_xDiasEnamorandomeDeTi_Miniatura.png",
    color: PIXELART_COLORS.P_RED,
  },
];

const MAMA_BOOKS = [
  {
    label: "Mamá, mi heroína",
    subtitle: "Para la mejor mamá",
    tag: "MAMÁ",
    href: "/libros-personalizados/libros-de-familia/mama-mi-heroina",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MamamiHeroina_Miniatura.png",
    color: PIXELART_COLORS.L_PURPLE,
  },
  {
    label: "Mi Ángel Guardián",
    subtitle: "Para honrar su memoria",
    tag: "MAMÁ",
    href: "/libros-personalizados/libros-de-memorias-familiares/mi-angel-guardian",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardian_Miniatura.png",
    color: PIXELART_COLORS.L_PURPLE,
  },
];

const PAPA_BOOKS = [
  {
    label: "Papá, mi héroe",
    subtitle: "Para el mejor papá",
    tag: "PAPÁ",
    href: "/libros-personalizados/libros-de-familia/papa-mi-heroe",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_PapaMiHeroe_Miniatura.png",
    color: PIXELART_COLORS.A_BLUE,
  },
  {
    label: "Mi Ángel Guardián",
    subtitle: "Para honrar su memoria",
    tag: "PAPÁ",
    href: "/libros-personalizados/libros-de-memorias-familiares/mi-angel-guardian",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardian_Miniatura.png",
    color: PIXELART_COLORS.A_BLUE,
  },
];

const HIJOS_BOOKS = [
  {
    label: "Mi Familia",
    subtitle: "Un retrato de toda la familia",
    tag: "HIJOS",
    href: "/libros-personalizados/libros-de-familia/la-familia",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MiFamilia_Miniatura.png",
    color: PIXELART_COLORS.X_YELLOW,
  },
  {
    label: "El Mejor Equipo",
    subtitle: "Para hermanos que son cómplices",
    tag: "HIJOS",
    href: "/libros-personalizados/libros-de-familia/el-mejor-equipo",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_ElMejorEquipo_Miniatura.png",
    color: PIXELART_COLORS.X_YELLOW,
  },
];

const ABUELOS_BOOKS = [
  {
    label: "Te amo, abuelo",
    subtitle: "Para el mejor abuelo",
    tag: "ABUELOS",
    href: "/libros-personalizados/libros-de-familia/te-amo-abuelo",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Miniatura.png",
    color: PIXELART_COLORS.T_TURQUOISE,
  },
  {
    label: "Te amo, abuela",
    subtitle: "Para la mejor abuela",
    tag: "ABUELOS",
    href: "/libros-personalizados/libros-de-familia/te-amo-abuela",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuela_Miniatura.png",
    color: PIXELART_COLORS.T_TURQUOISE,
  },
  {
    label: "Siempre en mi corazón",
    subtitle: "Para honrar su memoria",
    tag: "ABUELOS",
    href: "/libros-personalizados/libros-de-memorias-familiares/siempre-en-mi-corazon",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazon_Miniatura.png",
    color: PIXELART_COLORS.T_TURQUOISE,
  },
];

const MASCOTAS_BOOKS = [
  {
    label: "Mi mejor amigo del mundo",
    subtitle: "Para tu compañero de cuatro patas",
    tag: "MASCOTAS",
    href: "/libros-personalizados/libros-de-mascotas/mi-mejor-amigo-del-mundo",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_ElMejorAmigoDelMundo_Miniatura.png",
    color: PIXELART_COLORS.E_GREEN,
  },
  {
    label: "Mi Amigo Miauravilloso",
    subtitle: "Para tu gato favorito",
    tag: "MASCOTAS",
    href: "/libros-personalizados/libros-de-mascotas/mi-amigo-miauravilloso",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_MiAmigoMiauravilloso_Miniatura.png",
    color: PIXELART_COLORS.E_GREEN,
  },
];

export const PARA_QUIEN = [
  {
    label: "Pareja",
    subtitle: "Para mi persona favorita",
    href: "/libros-personalizados/libros-de-amor",
    icon: "heart",
    color: PIXELART_COLORS.R_PINK,
    books: PAREJA_BOOKS,
  },
  {
    label: "Mamá",
    subtitle: "Para la mujer que me inspira",
    href: "/libros-personalizados/libros-de-familia/mama-mi-heroina",
    icon: "sparkles",
    color: PIXELART_COLORS.L_PURPLE,
    books: MAMA_BOOKS,
  },
  {
    label: "Papá",
    subtitle: "Para mi héroe de todos los días",
    href: "/libros-personalizados/libros-de-familia/papa-mi-heroe",
    icon: "moustache",
    color: PIXELART_COLORS.A_BLUE,
    books: PAPA_BOOKS,
  },
  {
    label: "Hijos",
    subtitle: "Para mis pequeños grandes amores",
    href: "/libros-personalizados/libros-de-familia",
    icon: "baby",
    color: PIXELART_COLORS.X_YELLOW,
    books: HIJOS_BOOKS,
  },
  {
    label: "Abuelos",
    subtitle: "Para quienes siempre están",
    href: "/libros-personalizados/libros-de-memorias-familiares",
    icon: "infinity",
    color: PIXELART_COLORS.T_TURQUOISE,
    books: ABUELOS_BOOKS,
  },
  {
    label: "Mascotas",
    subtitle: "Para compañeros de cuatro patas",
    href: "/libros-personalizados/libros-de-mascotas",
    icon: "paw",
    color: PIXELART_COLORS.E_GREEN,
    books: MASCOTAS_BOOKS,
  },
];

export const DESTACADOS = [
  {
    label: "Mamá, mi heroína",
    subtitle: "Para la mejor mamá",
    tag: "MAMÁ",
    href: "/libros-personalizados/libros-de-familia/mama-mi-heroina",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MamamiHeroina_Miniatura.png",
    color: PIXELART_COLORS.R_PINK,
  },
  {
    label: "Papá, mi héroe",
    subtitle: "Para el mejor papá",
    tag: "PAPÁ",
    href: "/libros-personalizados/libros-de-familia/papa-mi-heroe",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_PapaMiHeroe_Miniatura.png",
    color: PIXELART_COLORS.A_BLUE,
  },
  {
    label: "1025 días enamorándome de ti",
    subtitle: "Para celebrar nuestro amor",
    tag: "PAREJA",
    href: "/libros-personalizados/libros-de-amor/1025-dias-enamorandome-de-ti",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_xDiasEnamorandomeDeTi_Miniatura.png",
    color: PIXELART_COLORS.P_RED,
  },
  {
    label: "Nuestro ángel de 4 patas",
    subtitle: "Para quienes llenan de amor nuestros días",
    tag: "MASCOTAS",
    href: "/libros-personalizados/libros-de-mascotas/nuestro-angel-de-4-patas",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_NuestroAngelde4Patas_Miniatura.png",
    color: PIXELART_COLORS.I_ORANGE,
  },
];

export const ADULT_AVAILABLE_BOOKS = [
  {
    label: "Papá, mi héroe",
    subtitle: "Un regalo emotivo para agradecerle a papá",
    tag: "PAPÁ",
    href: "/libros-personalizados/libros-de-familia/papa-mi-heroe-adulto",
    coverKey: "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura.png",
    icon: "moustache",
    color: PIXELART_COLORS.A_BLUE,
  },
];

export const ADULT_UPCOMING_BOOKS = [
  {
    label: "Mamá, Mi Heroína — Edición Emotiva",
    subtitle: "En preparación",
    icon: "sparkles",
    color: PIXELART_COLORS.L_PURPLE,
  },
  {
    label: "Te amo, abuelo — Edición Emotiva",
    subtitle: "En preparación",
    icon: "infinity",
    color: PIXELART_COLORS.T_TURQUOISE,
  },
  {
    label: "Te amo, abuela — Edición Emotiva",
    subtitle: "En preparación",
    icon: "heart",
    color: PIXELART_COLORS.R_PINK,
  },
  {
    label: "El Mejor Equipo — Edición Emotiva",
    subtitle: "En preparación",
    icon: "family",
    color: PIXELART_COLORS.E_GREEN,
  },
];

type BookLink = {
  label: string;
  subtitle: string;
  tag: string;
  href: string;
  coverKey: string;
  color: string;
};

type UpcomingLink = {
  label: string;
  subtitle: string;
  icon: string;
  color: string;
};

export type RecipientNavItem = {
  label: string;
  subtitle: string;
  href: string;
  icon: string;
  color: string;
  note: string;
  illustratedVersionLabel?: string;
  illustratedVersionDescription?: string;
  illustratedVersionDetail?: string;
  illustratedAudienceLabel?: string;
  illustratedGlyph?: VersionGlyphName;
  illustrated: BookLink[];
  emotive: BookLink[];
  upcoming: UpcomingLink[];
  spotlight: BookLink;
};

export const RECIPIENT_NAV: RecipientNavItem[] = [
  {
    label: "Papá",
    subtitle: "Héroes, recuerdos y gratitud",
    href: "/libros-personalizados/libros-de-familia/papa-mi-heroe",
    icon: "moustache",
    color: PIXELART_COLORS.A_BLUE,
    note: "Para celebrar a papá con cuentos ilustrados o una edición más editorial y emotiva.",
    illustrated: PAPA_BOOKS,
    emotive: ADULT_AVAILABLE_BOOKS,
    upcoming: [],
    spotlight: ADULT_AVAILABLE_BOOKS[0],
  },
  {
    label: "Mamá",
    subtitle: "Amor, cuidado y memoria",
    href: "/libros-personalizados/libros-de-familia/mama-mi-heroina",
    icon: "sparkles",
    color: PIXELART_COLORS.L_PURPLE,
    note: "Historias luminosas para mamá, con nuevas ediciones emotivas en preparación.",
    illustrated: MAMA_BOOKS,
    emotive: [],
    upcoming: [ADULT_UPCOMING_BOOKS[0]],
    spotlight: MAMA_BOOKS[0],
  },
  {
    label: "Pareja",
    subtitle: "Amor, fechas y complicidad",
    href: "/libros-personalizados/libros-de-amor",
    icon: "heart",
    color: PIXELART_COLORS.R_PINK,
    note: "Regalos románticos para contar lo que sienten sin perder ternura ni humor.",
    illustratedVersionLabel: "Versión Pareja",
    illustratedVersionDescription: "Romántica y personalizada",
    illustratedVersionDetail: "Historias románticas para celebrar su relación, aniversario o fecha especial.",
    illustratedAudienceLabel: "Romántica",
    illustratedGlyph: "love",
    illustrated: PAREJA_BOOKS,
    emotive: [],
    upcoming: [],
    spotlight: PAREJA_BOOKS[0],
  },
  {
    label: "Hijos",
    subtitle: "Familia, hermanos y aventuras",
    href: "/libros-personalizados/libros-de-familia",
    icon: "baby",
    color: PIXELART_COLORS.X_YELLOW,
    note: "Libros familiares para jugar, agradecer y guardar recuerdos de infancia.",
    illustrated: HIJOS_BOOKS,
    emotive: [],
    upcoming: [ADULT_UPCOMING_BOOKS[3]],
    spotlight: HIJOS_BOOKS[0],
  },
  {
    label: "Abuelos",
    subtitle: "Raíces, ternura y legado",
    href: "/libros-personalizados/libros-de-familia/te-amo-abuelo",
    icon: "infinity",
    color: PIXELART_COLORS.T_TURQUOISE,
    note: "Para honrar a quienes sostienen la historia familiar con calma y cariño.",
    illustrated: ABUELOS_BOOKS,
    emotive: [],
    upcoming: [ADULT_UPCOMING_BOOKS[1], ADULT_UPCOMING_BOOKS[2]],
    spotlight: ABUELOS_BOOKS[0],
  },
  {
    label: "Mascotas",
    subtitle: "Perros, gatos y compañeros",
    href: "/libros-personalizados/libros-de-mascotas",
    icon: "paw",
    color: PIXELART_COLORS.E_GREEN,
    note: "Historias para mascotas que ya son parte de la familia.",
    illustratedVersionLabel: "Versión Mascotas",
    illustratedVersionDescription: "Para perros, gatos y compañeros",
    illustratedVersionDetail: "Aventuras ilustradas para celebrar a tu mascota como parte de la familia.",
    illustratedAudienceLabel: "Mascotas",
    illustratedGlyph: "pet",
    illustrated: MASCOTAS_BOOKS,
    emotive: [],
    upcoming: [],
    spotlight: MASCOTAS_BOOKS[0],
  },
];

type VersionKey = "children" | "grownChildren" | "comingSoon";
type VersionGlyphName = "kids" | "grown" | "soon" | "love" | "pet";

type VersionOption = {
  key: VersionKey;
  label: string;
  description: string;
  detail: string;
  color: string;
  glyph: VersionGlyphName;
  books?: BookLink[];
  upcoming?: UpcomingLink[];
};

function getVersionOptions(recipient: RecipientNavItem): VersionOption[] {
  const options: VersionOption[] = [
    {
      key: "children",
      label: recipient.illustratedVersionLabel ?? "Versión Infantil",
      description: recipient.illustratedVersionDescription ?? "Aventura ilustrada para leer en familia",
      detail: recipient.illustratedVersionDetail ?? "Personajes personalizados, tono mágico y escenas pensadas para niños y lectura compartida.",
      color: recipient.color,
      glyph: recipient.illustratedGlyph ?? "kids",
      books: recipient.illustrated,
    },
  ];

  if (recipient.emotive.length > 0) {
    options.push({
      key: "grownChildren",
      label: "Versión Adultos",
      description: "Agradecimiento más realista para papá",
      detail: "Un libro sobrio y emocional para decir gracias desde la mirada de un hijo o hija adulta.",
      color: PIXELART_COLORS.A_BLUE,
      glyph: "grown",
      books: recipient.emotive,
    });
  }

  if (recipient.upcoming.length > 0) {
    options.push({
      key: "comingSoon",
      label: "Próximamente",
      description: "Nuevas versiones para este destinatario",
      detail: "Estamos preparando más formatos para este tipo de regalo.",
      color: PIXELART_COLORS.I_ORANGE,
      glyph: "soon",
      upcoming: recipient.upcoming,
    });
  }

  return options;
}


export default function LibrosPersonalizadosMegaMenu({ onClose }: { onClose: () => void }) {
  const [activeRecipientIdx, setActiveRecipientIdx] = useState(0);
  const [selectedVersion, setSelectedVersion] = useState<VersionKey>("children");
  const activeRecipient = RECIPIENT_NAV[activeRecipientIdx];
  const versionOptions = getVersionOptions(activeRecipient);
  const selectedOption = versionOptions.find((option) => option.key === selectedVersion) ?? versionOptions[0];

  return (
    <div style={{ width: "min(1080px, 90vw)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "18px",
          padding: "14px 18px",
          borderBottom: `1px solid rgba(0, 0, 0, 0.06)`,
          background: "linear-gradient(180deg, rgba(255,255,255,0.76), rgba(255,255,255,0.32))",
        }}
      >
        <div>
          <div style={{ fontSize: "14px", fontWeight: 850, color: BASE_COLORS.inkSepia, letterSpacing: "0.005em" }}>
            Libros personalizados
          </div>
          <div style={{ fontSize: "12px", color: hexToRgba(BASE_COLORS.inkSepia, 0.68), marginTop: "3px" }}>
            Primero eliges a quién se lo regalas. Luego eliges la versión del libro.
          </div>
        </div>
        <Link
          href="/libros-personalizados"
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 14px",
            borderRadius: "999px",
            background: hexToRgba(PIXELART_COLORS.P_RED, 0.08),
            color: PIXELART_COLORS.P_RED,
            fontSize: "12px",
            fontWeight: 800,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          <NavIcon icon="gift" color={PIXELART_COLORS.P_RED} />
          Ver catálogo completo
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "250px minmax(440px, 1fr) 300px",
          gap: "0",
        }}
      >
        <div style={{ padding: "15px 14px 14px", borderRight: `1px solid rgba(0, 0, 0, 0.06)` }}>
          <ColumnTitle icon="family" color={PIXELART_COLORS.I_ORANGE} label="Para quién es" />
          <div style={{ display: "grid", gap: "2px" }}>
            {RECIPIENT_NAV.map((item, idx) => (
              <MenuRow
                key={item.label}
                {...item}
                asSelector
                isSelected={activeRecipientIdx === idx}
                onSelect={() => {
                  setActiveRecipientIdx(idx);
                  setSelectedVersion("children");
                }}
              />
            ))}
          </div>

          <div style={{ height: "1px", background: "rgba(0,0,0,0.06)", margin: "10px 0 10px" }} />
          <ColumnTitle icon="book" color={PIXELART_COLORS.T_TURQUOISE} label="Explorar por tema" />
          <CategoryRail onClose={onClose} />
        </div>

        <div style={{ padding: "15px 18px", borderRight: `1px solid rgba(0, 0, 0, 0.06)`, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "14px",
              marginBottom: "12px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "9px", color: activeRecipient.color, fontSize: "13px", fontWeight: 850 }}>
                <NavIcon icon={activeRecipient.icon} color={activeRecipient.color} />
                Para {activeRecipient.label.toLowerCase()}
              </div>
              <p style={{ margin: "7px 0 0", maxWidth: "58ch", fontSize: "13px", lineHeight: 1.48, color: hexToRgba(BASE_COLORS.inkSepia, 0.72) }}>
                {activeRecipient.note}
              </p>
            </div>
            <Link
              href={activeRecipient.href}
              onClick={onClose}
              style={{
                flexShrink: 0,
                padding: "8px 12px",
                borderRadius: "999px",
                border: `1px solid ${hexToRgba(activeRecipient.color, 0.22)}`,
                color: activeRecipient.color,
                fontSize: "12px",
                fontWeight: 800,
                textDecoration: "none",
                background: hexToRgba(activeRecipient.color, 0.055),
              }}
            >
              Ver opciones
            </Link>
          </div>

          <VersionSelector
            options={versionOptions}
            selectedKey={selectedOption.key}
            onSelect={setSelectedVersion}
          />

          <SelectedVersionPanel option={selectedOption} onClose={onClose} />
        </div>

        <RecipientSpotlight recipient={activeRecipient} selectedOption={selectedOption} onClose={onClose} />
      </div>

    </div>
  );
}

function VersionSelector({
  options,
  selectedKey,
  onSelect,
}: {
  options: VersionOption[];
  selectedKey: VersionKey;
  onSelect: (key: VersionKey) => void;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`, gap: "8px", marginBottom: "12px" }}>
      {options.map((option) => {
        const active = option.key === selectedKey;
        return (
          <button
            key={option.key}
            type="button"
            onClick={() => onSelect(option.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              minHeight: "62px",
              padding: "9px 10px",
              borderRadius: "14px",
              border: `1px solid ${active ? hexToRgba(option.color, 0.5) : "rgba(0,0,0,0.08)"}`,
              background: active ? hexToRgba(option.color, 0.09) : "rgba(255,255,255,0.64)",
              color: BASE_COLORS.inkSepia,
              textAlign: "left",
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: active ? `0 6px 16px ${hexToRgba(option.color, 0.12)}` : "none",
              transition: "background 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease",
            }}
          >
            <VersionGlyph name={option.glyph} color={option.color} size={30} />
            <span style={{ minWidth: 0 }}>
              <span style={{ display: "block", fontSize: "13px", fontWeight: 850, color: active ? option.color : BASE_COLORS.inkSepia, lineHeight: 1.2 }}>{option.label}</span>
              <span style={{ display: "block", marginTop: "4px", fontSize: "11px", color: hexToRgba(BASE_COLORS.inkSepia, 0.62), lineHeight: 1.25 }}>{option.description}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function SelectedVersionPanel({ option, onClose }: { option: VersionOption; onClose: () => void }) {
  if (option.upcoming) {
    return (
      <div>
        <p style={{ margin: "0 0 10px", fontSize: "12px", lineHeight: 1.45, color: hexToRgba(BASE_COLORS.inkSepia, 0.64) }}>
          {option.detail}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {option.upcoming.map((item) => (
            <ComingSoonRow key={item.label} {...item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p style={{ margin: "0 0 10px", fontSize: "12px", lineHeight: 1.45, color: hexToRgba(BASE_COLORS.inkSepia, 0.64) }}>
        {option.detail}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {(option.books ?? []).map((item) => (
          <DestacadoCard key={item.label} {...item} onClose={onClose} />
        ))}
      </div>
    </div>
  );
}

function VersionGlyph({ name, color, size = 34 }: { name: VersionGlyphName; color: string; size?: number }) {
  const common = {
    stroke: color,
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "11px",
        background: `linear-gradient(135deg, ${hexToRgba(color, 0.16)}, ${hexToRgba(color, 0.05)})`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width={Math.round(size * 0.64)} height={Math.round(size * 0.64)} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {name === "kids" && (
          <>
            <path d="M5 6.5C7.4 5.7 9.7 6 12 7.8C14.3 6 16.6 5.7 19 6.5V18.3C16.6 17.5 14.3 17.8 12 19.4C9.7 17.8 7.4 17.5 5 18.3V6.5Z" {...common} />
            <path d="M12 7.8V19.4" {...common} />
            <path d="M8.2 10.2H9.7M8.2 13H9.3" {...common} />
            <path d="M15.1 11.2L16 9.6L16.9 11.2L18.5 12.1L16.9 13L16 14.6L15.1 13L13.5 12.1L15.1 11.2Z" fill={hexToRgba(color, 0.2)} stroke={color} strokeWidth="1.35" strokeLinejoin="round" />
          </>
        )}
        {name === "grown" && (
          <>
            <path d="M6 4.8H17.2C18.2 4.8 19 5.6 19 6.6V19.2H7.2C6.2 19.2 5.4 18.4 5.4 17.4V6.6C5.4 5.6 6.1 4.8 6 4.8Z" {...common} />
            <path d="M8.2 8.5H15.8M8.2 11.6H14.8M8.2 14.7H12.6" {...common} />
            <path d="M16.8 16.5L18.3 18L21 14.8" {...common} />
          </>
        )}
        {name === "love" && (
          <>
            <path d="M12 20.2C9.2 17.8 5.2 14.8 4.3 11.2C3.6 8.4 5.2 6.1 7.8 6.1C9.4 6.1 10.7 7 12 8.5C13.3 7 14.6 6.1 16.2 6.1C18.8 6.1 20.4 8.4 19.7 11.2C18.8 14.8 14.8 17.8 12 20.2Z" {...common} />
            <path d="M8.2 11.4H15.8M10 14.1H14" {...common} />
          </>
        )}
        {name === "pet" && (
          <>
            <circle cx="7.2" cy="9.2" r="1.8" {...common} />
            <circle cx="12" cy="6.8" r="1.8" {...common} />
            <circle cx="16.8" cy="9.2" r="1.8" {...common} />
            <path d="M8.2 16.4C8.2 14.2 9.8 12.6 12 12.6C14.2 12.6 15.8 14.2 15.8 16.4C15.8 18.1 14.4 19.2 12 19.2C9.6 19.2 8.2 18.1 8.2 16.4Z" {...common} />
          </>
        )}
        {name === "soon" && (
          <>
            <circle cx="12" cy="12" r="7.2" {...common} />
            <path d="M12 8.4V12.4L14.8 14" {...common} />
            <path d="M18.7 5.3L20.5 3.5M3.5 20.5L5.3 18.7" {...common} />
          </>
        )}
      </svg>
    </span>
  );
}

function CategoryRail({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "6px" }}>
      {CATEGORIAS.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onClose}
          title={item.subtitle}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "7px 8px",
            borderRadius: "10px",
            textDecoration: "none",
            color: BASE_COLORS.inkSepia,
            background: hexToRgba(item.color, 0.055),
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = hexToRgba(item.color, 0.11))}
          onMouseLeave={(e) => (e.currentTarget.style.background = hexToRgba(item.color, 0.055))}
        >
          <span
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "7px",
              background: "rgba(255,255,255,0.74)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <NavIcon icon={item.icon} color={item.color} />
          </span>
          <span style={{ minWidth: 0, fontSize: "12px", fontWeight: 780, color: BASE_COLORS.inkSepia, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

function BookGroup({
  title,
  audienceLabel,
  description,
  icon,
  color,
  items,
  onClose,
}: {
  title: string;
  audienceLabel: string;
  description: string;
  icon: string;
  color: string;
  items: BookLink[];
  onClose: () => void;
}) {
  return (
    <section>
      <div style={{ marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <ColumnTitle icon={icon} color={color} label={title} />
          <span
            style={{
              padding: "4px 9px",
              borderRadius: "999px",
              background: hexToRgba(color, 0.1),
              color,
              fontSize: "10px",
              fontWeight: 850,
              whiteSpace: "nowrap",
            }}
          >
            {audienceLabel}
          </span>
        </div>
        <p style={{ margin: "-4px 0 0", fontSize: "11px", color: hexToRgba(BASE_COLORS.inkSepia, 0.6), lineHeight: 1.35 }}>
          {description}
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {items.map((item) => (
          <DestacadoCard key={item.label} {...item} onClose={onClose} />
        ))}
      </div>
    </section>
  );
}

function RecipientSpotlight({ recipient, onClose }: { recipient: RecipientNavItem; onClose: () => void }) {
  const item = recipient.spotlight;

  return (
    <aside style={{ padding: "15px", background: `linear-gradient(180deg, ${hexToRgba(recipient.color, 0.055)}, rgba(255,255,255,0))` }}>
      <ColumnTitle icon="star" color={recipient.color} label="Recomendado" />
      <Link
        href={item.href}
        onClick={onClose}
        style={{
          display: "block",
          textDecoration: "none",
          color: BASE_COLORS.inkSepia,
        }}
      >
        <div
          style={{
            position: "relative",
            height: "178px",
            borderRadius: "14px",
            overflow: "hidden",
            background: `radial-gradient(circle at 50% 35%, ${hexToRgba(recipient.color, 0.08)}, rgba(255,255,255,0.92) 58%)`,
            border: `1px solid ${hexToRgba(recipient.color, 0.18)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px",
          }}
        >
          <img
            src={getAssetUrl(item.coverKey)}
            alt={item.label}
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
          <span
            style={{
              position: "absolute",
              left: "12px",
              top: "12px",
              padding: "5px 9px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.92)",
              color: recipient.color,
              fontSize: "10px",
              fontWeight: 850,
              letterSpacing: "0.03em",
            }}
          >
            {item.tag}
          </span>
        </div>
        <div style={{ marginTop: "12px", fontSize: "16px", fontWeight: 850, lineHeight: 1.2 }}>{item.label}</div>
        <p style={{ margin: "6px 0 0", fontSize: "12px", lineHeight: 1.45, color: hexToRgba(BASE_COLORS.inkSepia, 0.66) }}>
          {item.subtitle}
        </p>
      </Link>
      <div
        style={{
          marginTop: "14px",
          padding: "12px",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.68)",
          color: hexToRgba(BASE_COLORS.inkSepia, 0.72),
          fontSize: "12px",
          lineHeight: 1.48,
        }}
      >
Primero eliges a quién se lo regalas; después eliges la versión que corresponde.
      </div>
    </aside>
  );
}

function AudienceToggle({
  label,
  description,
  active,
  color,
  onClick,
}: {
  label: string;
  description: string;
  active: boolean;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      style={{
        border: "none",
        borderRadius: "999px",
        padding: "8px 14px",
        minWidth: "116px",
        background: active ? "#fff" : "transparent",
        color: active ? BASE_COLORS.inkSepia : hexToRgba(BASE_COLORS.inkSepia, 0.64),
        boxShadow: active ? "0 1px 8px rgba(0,0,0,0.08)" : "none",
        cursor: "pointer",
        fontFamily: "inherit",
        textAlign: "left",
        transition: "background 0.18s ease, box-shadow 0.18s ease, color 0.18s ease",
      }}
    >
      <span style={{ display: "block", fontSize: "13px", fontWeight: 800, color: active ? color : "inherit" }}>{label}</span>
      <span style={{ display: "block", fontSize: "10px", marginTop: "1px" }}>{description}</span>
    </button>
  );
}

function ComingSoonRow({ label, subtitle, icon, color }: { label: string; subtitle: string; icon: string; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        padding: "10px 12px",
        borderRadius: "12px",
        background: "rgba(0,0,0,0.025)",
        border: "1px dashed rgba(0,0,0,0.10)",
      }}
    >
      <span
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "9px",
          background: hexToRgba(color, 0.1),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <NavIcon icon={icon} color={color} />
      </span>
      <span style={{ minWidth: 0 }}>
        <span style={{ display: "block", fontSize: "13px", fontWeight: 700, color: BASE_COLORS.inkSepia, lineHeight: 1.25 }}>{label}</span>
        <span style={{ display: "block", fontSize: "11px", color: hexToRgba(BASE_COLORS.inkSepia, 0.58), marginTop: "2px" }}>{subtitle}</span>
      </span>
    </div>
  );
}

function ColumnTitle({ icon, color, label }: { icon: string; color: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "10px",
        fontSize: "12px",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color,
      }}
    >
      <NavIcon icon={icon} color={color} />
      {label}
    </div>
  );
}

function MenuRow({
  label,
  subtitle,
  href,
  icon,
  color,
  onClose,
  /** Modo selector (columna "Para quién"): no navega — hover/click solo
   * eligen la audiencia para que la columna 3 muestre sus libros. La
   * navegación real pasa por las miniaturas de esa columna. */
  asSelector,
  isSelected,
  onSelect,
}: {
  label: string;
  subtitle: string;
  href: string;
  icon: string;
  color: string;
  onClose?: () => void;
  asSelector?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}) {
  const content = (
    <>
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "8px",
          background: hexToRgba(color, 0.12),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <NavIcon icon={icon} color={color} />
      </div>
      <div>
        <div style={{ fontSize: "13px", fontWeight: 700, color: BASE_COLORS.inkSepia }}>{label}</div>
        <div style={{ fontSize: "11px", color: hexToRgba(BASE_COLORS.inkSepia, 0.65), lineHeight: 1.25 }}>{subtitle}</div>
      </div>
    </>
  );

  const rowStyle: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: "9px",
    padding: "6px 9px",
    borderRadius: "10px",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.15s ease",
    background: isSelected ? hexToRgba(color, 0.08) : "transparent",
  };

  if (asSelector) {
    return (
      <div role="button" tabIndex={0} onMouseEnter={onSelect} onClick={onSelect} style={rowStyle}>
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClose}
      style={rowStyle}
      onMouseEnter={(e) => (e.currentTarget.style.background = hexToRgba(color, 0.08))}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {content}
    </Link>
  );
}

function DestacadoCard({
  label,
  subtitle,
  tag,
  href,
  coverKey,
  color,
  onClose,
}: {
  label: string;
  subtitle: string;
  tag: string;
  href: string;
  coverKey: string;
  color: string;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      style={{
        display: "flex",
        gap: "9px",
        padding: "8px",
        borderRadius: "12px",
        textDecoration: "none",
        border: `1px solid rgba(0, 0, 0, 0.06)`,
        transition: "border-color 0.15s ease, background 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = hexToRgba(color, 0.4);
        e.currentTarget.style.background = hexToRgba(color, 0.04);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.06)";
        e.currentTarget.style.background = "transparent";
      }}
    >
      <img
        src={getAssetUrl(coverKey)}
        alt={label}
        style={{
          width: "48px",
          height: "62px",
          objectFit: "cover",
          borderRadius: "6px",
          flexShrink: 0,
        }}
      />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: "13px", fontWeight: 600, color: BASE_COLORS.inkSepia, lineHeight: 1.3 }}>{label}</div>
        <div
          style={{
            fontSize: "11px",
            color: hexToRgba(BASE_COLORS.inkSepia, 0.65),
            lineHeight: 1.3,
            marginTop: "2px",
          }}
        >
          {subtitle}
        </div>
        <span
          style={{
            display: "inline-block",
            marginTop: "5px",
            padding: "2px 7px",
            borderRadius: "999px",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.03em",
            background: hexToRgba(color, 0.12),
            color,
          }}
        >
          {tag}
        </span>
      </div>
    </Link>
  );
}
