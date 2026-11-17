"use client";

import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import PixelArtLogo from "./PixelArtLogo";
import HamburgerIcon from "./HamburgerIcon";
import MobileDrawer from "./MobileDrawer";
import NavIcon from "./NavIcon";
import LibrosPersonalizadosMegaMenu from "./LibrosPersonalizadosMegaMenu";
import PromoCodeBanner, { type ManualBanner } from "./PromoCodeBanner";
import type { PublicPromoCode } from "@/lib/promotions/public-codes";
import { PIXELART_COLORS, BASE_COLORS, COLORS_ARRAY, hexToRgba } from "@/lib/colors";
import { tokens } from "@/lib/design-tokens";
import { whatsAppUrl } from "@/lib/whatsapp";

const PRINT_WITH_US_LABEL = "¿Deseas imprimir con nosotros?";
const PRINT_WITH_US_HREF = "/photobooks/a-medida";

const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
    color: PIXELART_COLORS.P_RED,
    icon: "home",
    glowHue: "357deg",
  },
  {
    label: "Libros Personalizados",
    href: "/libros-personalizados",
    hasDropdown: true,
    color: PIXELART_COLORS.I_ORANGE,
    icon: "book",
    glowHue: "22deg",
  },
  {
    label: "PhotoBooks",
    href: "/photobooks",
    color: PIXELART_COLORS.L_PURPLE,
    icon: "camera",
    glowHue: "295deg",
  },
];

// SSR-safe: usa useLayoutEffect en el cliente para evitar el flash de hidratación,
// y useEffect en el servidor donde no existe window.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function NavbarClient({ bannerConfig = null, promoCodes = [] }: { bannerConfig?: ManualBanner; promoCodes?: PublicPromoCode[] }) {
  // BUG 1 FIX: derivar el link activo de la URL real en vez de estado manual
  const pathname = usePathname();
  const activeLink = NAV_LINKS.find((l) =>
    l.href === "/" ? pathname === "/" : pathname.startsWith(l.href)
  )?.label ?? "Home";

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // BUG 5 FIX: useIsomorphicLayoutEffect para sincronizar isMobile antes del primer paint
  useIsomorphicLayoutEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // BUG 4 FIX: limpiar el timeout al desmontar el componente
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Click outside para cerrar dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Stable so MobileDrawer's scroll-lock effect does not re-run (and unlock) on every render.
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  function handleMouseEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 200);
  }

  return (
    <header style={{ width: "100%", position: "sticky", top: 0, zIndex: 1000 }}>
      <style>{NAVBAR_STYLES}</style>
      {/* Barra Multicolor Superior - Audaz con Gradiente Animado */}
      <div
        className="pixelart-gradient-bar"
        style={{
          width: "100%",
          height: isMobile ? "8px" : "12px",
          background: `linear-gradient(90deg, ${COLORS_ARRAY.join(", ")})`,
          backgroundSize: "200% 100%",
          animation: "gradientMove 20s ease infinite",
        }}
      />

      {/* Banner de Promoción Dinámico */}
      <PromoCodeBanner codes={promoCodes} fallback={bannerConfig} />

      {/* Main Navbar */}
      <div
        style={{
          width: "100%",
          background: BASE_COLORS.paperCream,
          backdropFilter: "blur(12px) saturate(1.2)",
          borderBottom: `1px solid rgba(0, 0, 0, 0.08)`,
          boxShadow: "0 1px 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div
          ref={dropdownRef}
          className="navbar-row"
          style={{
            width: "100%",
            maxWidth: "1600px",
            margin: "0 auto",
            // Desktop padding/gap live in NAVBAR_STYLES so they can tighten at mid widths.
            padding: isMobile ? "16px" : undefined,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: isMobile ? "16px" : undefined,
            position: "relative",
          }}
        >
          {/* Hamburger Icon - Solo Mobile */}
          {isMobile && (
            <HamburgerIcon
              open={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            />
          )}

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Link
              href="/"
              style={{ display: "block" }}
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <PixelArtLogo width={isMobile ? 160 : 220} />
            </Link>
          </div>

          {/* Navigation Links - Solo Desktop */}
          {!isMobile && (
            <nav
              className="navbar-links"
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                justifyContent: "center",
              }}
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeLink === link.label;

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.label}
                      style={{ position: "relative" }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        href={link.href}
                        className={`nav-shimmer-btn navbar-link${isActive ? " active" : ""}`}
                        style={{
                          "--glow-hue": link.glowHue,
                          background: "transparent",
                          border: "none",
                          borderLeft: `3px solid ${link.color}`,
                          paddingTop: "8px",
                          paddingBottom: "8px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "16px",
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? link.color : BASE_COLORS.inkSepia,
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          fontFamily: "inherit",
                          borderRadius: "4px",
                          textDecoration: "none",
                        } as React.CSSProperties}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = hexToRgba(link.color, 0.1);
                            e.currentTarget.style.color = link.color;
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          if (!isActive) {
                            e.currentTarget.style.color = BASE_COLORS.inkSepia;
                          }
                        }}
                      >
                        <div className="shimmer" />
                        <span className="navbar-link-icon"><NavIcon icon={link.icon} color={isActive ? link.color : BASE_COLORS.inkSepia} /></span>
                        {link.label}
                        <ChevronIcon open={dropdownOpen} color={isActive ? link.color : BASE_COLORS.inkSepia} />
                      </Link>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`nav-shimmer-btn navbar-link${isActive ? " active" : ""}`}
                    style={{
                      "--glow-hue": link.glowHue,
                      background: "transparent",
                      border: "none",
                      borderLeft: `3px solid ${link.color}`,
                      paddingTop: "8px",
                      paddingBottom: "8px",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? link.color : BASE_COLORS.inkSepia,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      fontFamily: "inherit",
                      textDecoration: "none",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = hexToRgba(link.color, 0.1);
                        e.currentTarget.style.color = link.color;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      if (!isActive) {
                        e.currentTarget.style.color = BASE_COLORS.inkSepia;
                      }
                    }}
                  >
                    <div className="shimmer" />
                    <span className="navbar-link-icon"><NavIcon icon={link.icon} color={isActive ? link.color : BASE_COLORS.inkSepia} /></span>
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Mega Menu de Libros Personalizados */}
          {!isMobile && (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: `translateX(-50%) translateY(${dropdownOpen ? "8px" : "0px"})`,
                maxWidth: "calc(100vw - 48px)",
                background: BASE_COLORS.paperCreamSolid,
                borderRadius: "16px",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)",
                opacity: dropdownOpen ? 1 : 0,
                pointerEvents: dropdownOpen ? "auto" : "none",
                transition: "opacity 0.2s ease, transform 0.2s ease",
                border: `1px solid rgba(0, 0, 0, 0.06)`,
                maxHeight: "calc(100vh - 116px)",
                overflowX: "hidden",
                overflowY: "auto",
                overscrollBehavior: "contain",
                zIndex: 10,
              }}
            >
              <LibrosPersonalizadosMegaMenu onClose={() => setDropdownOpen(false)} />
            </div>
          )}

          {/* WhatsApp + print-with-us CTA - Solo Desktop */}
          {!isMobile && (
            <NavActions />
          )}

        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        links={NAV_LINKS}
        printWithUs={{ label: PRINT_WITH_US_LABEL, href: PRINT_WITH_US_HREF }}
      />
    </header>
  );
}

// BUG 6: IconButton eliminado (era código muerto — nunca se usaba en el render)
// BUG 7: NavIcon movido a ./NavIcon.tsx (componente compartido con MobileDrawer)

function NavActions() {
  const [waHovered, setWaHovered] = useState(false);

  return (
    <div className="navbar-actions" style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
      {/* WhatsApp */}
      <a
        href={whatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setWaHovered(true)}
        onMouseLeave={() => setWaHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          background: waHovered ? "#25d366" : "transparent",
          transition: "background 0.2s ease",
          color: waHovered ? "#fff" : BASE_COLORS.inkSepia,
        }}
        aria-label="WhatsApp"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896.002-3.176-1.24-6.165-3.48-8.45zM12.045 21.785h-.005c-1.776 0-3.517-.474-5.037-1.37l-.361-.213-3.754.979 1.003-3.645-.235-.374a9.86 9.86 0 0 1-1.521-5.26c.002-5.45 4.453-9.884 9.928-9.884 2.65 0 5.138 1.03 7.009 2.898a9.82 9.82 0 0 1 2.902 6.993c-.003 5.452-4.453 9.886-9.929 9.886zm5.443-7.405c-.3-.149-1.767-.867-2.04-.967-.273-.099-.473-.148-.672.15-.198.296-.769.967-.943 1.166-.173.198-.347.223-.645.074-.3-.148-1.265-.463-2.41-1.48-.89-.79-1.49-1.767-1.665-2.064-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.52-.074-.149-.672-1.612-.921-2.207-.242-.579-.489-.5-.672-.51a12.08 12.08 0 0 0-.57-.01c-.198 0-.52.074-.793.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.148.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/>
        </svg>
      </a>

      <Link href={PRINT_WITH_US_HREF} className="print-with-us-trigger" aria-label={PRINT_WITH_US_LABEL}>
        <span className="print-with-us-label-full" aria-hidden="true">{PRINT_WITH_US_LABEL}</span>
        <span className="print-with-us-label-short" aria-hidden="true">Imprimir con nosotros</span>
      </Link>
    </div>
  );
}

function ChevronIcon({ open, color }: { open: boolean; color: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transition: "transform 0.2s ease",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const INK = tokens.colors.neutral.text.primary;

// Desktop-only layout rules (mobile keeps its inline styles). Below 1340px the
// row tightens and the CTA switches to its short label; below 1120px the nav
// icons hide so nothing wraps or overlaps at 1024px.
const NAVBAR_STYLES = `
  .navbar-row { padding: 18px 48px; gap: 32px; }
  .navbar-links { gap: 40px; }
  .navbar-link { padding-left: 12px; padding-right: 12px; white-space: nowrap; }
  .navbar-link-icon { display: inline-flex; }

  .print-with-us-trigger {
    display: inline-flex;
    align-items: center;
    height: 38px;
    padding: 0 16px;
    border: 1.5px solid ${INK};
    border-radius: 999px;
    background: transparent;
    color: ${INK};
    font-family: ${tokens.fonts.body};
    font-size: 13px;
    font-weight: 700;
    white-space: nowrap;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 160ms ease, color 160ms ease;
  }
  .print-with-us-trigger:hover,
  .print-with-us-trigger:focus-visible { background: ${INK}; color: #fff; }
  .print-with-us-trigger:focus-visible { outline: 2px solid ${INK}; outline-offset: 3px; }
  .print-with-us-label-short { display: none; }

  @media (max-width: 1339px) {
    .navbar-row { padding: 18px 24px; gap: 16px; }
    .navbar-links { gap: 12px; }
    .print-with-us-trigger { padding: 0 14px; }
    .print-with-us-label-full { display: none; }
    .print-with-us-label-short { display: inline; }
  }

  @media (max-width: 1119px) {
    .navbar-links { gap: 8px; }
    .navbar-link { padding-left: 8px; padding-right: 8px; }
    .navbar-link-icon { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .print-with-us-trigger { transition: none; }
  }
`;
