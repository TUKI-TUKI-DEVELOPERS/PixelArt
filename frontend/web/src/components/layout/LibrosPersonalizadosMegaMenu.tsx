"use client";

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

export const PARA_QUIEN = [
  {
    label: "Pareja",
    subtitle: "Para mi persona favorita",
    href: "/libros-personalizados/libros-de-amor",
    icon: "heart",
    color: PIXELART_COLORS.R_PINK,
  },
  {
    label: "Mamá",
    subtitle: "Para la mujer que me inspira",
    href: "/libros-personalizados/libros-de-familia/mama-mi-heroina",
    icon: "sparkles",
    color: PIXELART_COLORS.L_PURPLE,
  },
  {
    label: "Papá",
    subtitle: "Para mi héroe de todos los días",
    href: "/libros-personalizados/libros-de-familia/papa-mi-heroe",
    icon: "moustache",
    color: PIXELART_COLORS.A_BLUE,
  },
  {
    label: "Hijos",
    subtitle: "Para mis pequeños grandes amores",
    href: "/libros-personalizados/libros-de-familia",
    icon: "baby",
    color: PIXELART_COLORS.X_YELLOW,
  },
  {
    label: "Abuelos",
    subtitle: "Para quienes siempre están",
    href: "/libros-personalizados/libros-de-memorias-familiares",
    icon: "infinity",
    color: PIXELART_COLORS.T_TURQUOISE,
  },
  {
    label: "Amigos",
    subtitle: "Para los que elijo cada día",
    href: "/libros-personalizados/libros-de-familia",
    icon: "star",
    color: PIXELART_COLORS.E_GREEN,
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

export default function LibrosPersonalizadosMegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ width: "min(1100px, 90vw)" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px 280px 1fr",
          gap: "0",
        }}
      >
        {/* Columna 1: Por Categoría */}
        <div style={{ padding: "20px 20px 16px", borderRight: `1px solid rgba(0, 0, 0, 0.06)` }}>
          <ColumnTitle icon="heart" color={PIXELART_COLORS.R_PINK} label="Por categoría" />
          {CATEGORIAS.map((item) => (
            <MenuRow key={item.label} {...item} onClose={onClose} />
          ))}
          <Link
            href="/libros-personalizados"
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "8px",
              padding: "10px 12px",
              borderRadius: "10px",
              background: hexToRgba(PIXELART_COLORS.P_RED, 0.08),
              color: PIXELART_COLORS.P_RED,
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <NavIcon icon="gift" color={PIXELART_COLORS.P_RED} />
            Ver todas las categorías
          </Link>
        </div>

        {/* Columna 2: Para Quién */}
        <div style={{ padding: "20px 20px 16px", borderRight: `1px solid rgba(0, 0, 0, 0.06)` }}>
          <ColumnTitle icon="family" color={PIXELART_COLORS.I_ORANGE} label="Para quién" />
          {PARA_QUIEN.map((item) => (
            <MenuRow key={item.label} {...item} onClose={onClose} />
          ))}
          <Link
            href="/libros-personalizados"
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "8px",
              padding: "10px 12px",
              borderRadius: "10px",
              background: hexToRgba(PIXELART_COLORS.I_ORANGE, 0.08),
              color: PIXELART_COLORS.I_ORANGE,
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <NavIcon icon="heart" color={PIXELART_COLORS.I_ORANGE} />
            Ver todas las opciones
          </Link>
        </div>

        {/* Columna 3: Destacados */}
        <div style={{ padding: "20px" }}>
          <ColumnTitle icon="sparkles" color={PIXELART_COLORS.L_PURPLE} label="Destacados" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            {DESTACADOS.map((item) => (
              <DestacadoCard key={item.label} {...item} onClose={onClose} />
            ))}
          </div>
        </div>
      </div>

      {/* Barra inferior CTA */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "16px 24px",
          borderTop: `1px solid rgba(0, 0, 0, 0.06)`,
          background: hexToRgba(PIXELART_COLORS.R_PINK, 0.04),
          borderRadius: "0 0 16px 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: BASE_COLORS.inkSepia, fontSize: "13px" }}>
          <NavIcon icon="sparkles" color={PIXELART_COLORS.L_PURPLE} />
          Cada libro es 100% personalizado y hecho con amor.
        </div>
        <Link
          href="/libros-personalizados"
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 20px",
            borderRadius: "999px",
            background: PIXELART_COLORS.P_RED,
            color: "#fff",
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Crear mi libro ahora
        </Link>
      </div>
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
}: {
  label: string;
  subtitle: string;
  href: string;
  icon: string;
  color: string;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        padding: "8px 12px",
        borderRadius: "10px",
        textDecoration: "none",
        transition: "background 0.15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = hexToRgba(color, 0.08))}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
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
        <div style={{ fontSize: "14px", fontWeight: 600, color: BASE_COLORS.inkSepia }}>{label}</div>
        <div style={{ fontSize: "12px", color: hexToRgba(BASE_COLORS.inkSepia, 0.65) }}>{subtitle}</div>
      </div>
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
        gap: "10px",
        padding: "10px",
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
          width: "56px",
          height: "72px",
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
            marginTop: "6px",
            padding: "2px 8px",
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
