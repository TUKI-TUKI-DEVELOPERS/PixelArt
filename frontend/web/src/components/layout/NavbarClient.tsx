"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import PixelArtLogo from "./PixelArtLogo";
import HamburgerIcon from "./HamburgerIcon";
import MobileDrawer from "./MobileDrawer";
import NavIcon from "./NavIcon";
import { PIXELART_COLORS, BASE_COLORS, COLORS_ARRAY, hexToRgba } from "@/lib/colors";

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

const DROPDOWN_ITEMS = [
  { 
    label: "Libros de Amor", 
    href: "/libros-personalizados/libros-de-amor",
    color: PIXELART_COLORS.R_PINK,
  },
  { 
    label: "Libros de Mascotas", 
    href: "/libros-personalizados/libros-de-mascotas",
    color: PIXELART_COLORS.I_ORANGE,
  },
  { 
    label: "Libros de Familia", 
    href: "/libros-personalizados/libros-de-familia",
    color: PIXELART_COLORS.E_GREEN,
  },
  {
    label: "Libros de Memorias Familiares",
    href: "/libros-personalizados/libros-de-memorias-familiares",
    color: '#8b6bb1',
  },
];

// SSR-safe: usa useLayoutEffect en el cliente para evitar el flash de hidratación,
// y useEffect en el servidor donde no existe window.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type BannerConfig = { text: string; color: string; enabled: boolean } | null;

export default function NavbarClient({ bannerConfig }: { bannerConfig?: BannerConfig }) {
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

  function handleMouseEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 200);
  }

  return (
    <header style={{ width: "100%", position: "sticky", top: 0, zIndex: 1000 }}>
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
      {bannerConfig?.enabled && bannerConfig.text && (
        <div
          style={{
            width: "100%",
            background: bannerConfig.color || "#1a1a2e",
            padding: isMobile ? "8px 16px" : "10px 48px",
            textAlign: "center",
            fontSize: isMobile ? "12px" : "14px",
            fontWeight: 600,
            color: "#fff",
            letterSpacing: "0.3px",
          }}
        >
          {bannerConfig.text}
        </div>
      )}

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
          style={{
            width: "100%",
            maxWidth: "1600px",
            margin: "0 auto",
            padding: isMobile ? "16px" : "18px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: isMobile ? "16px" : "32px",
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
              style={{
                display: "flex",
                alignItems: "center",
                gap: "40px",
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
                      ref={dropdownRef}
                      style={{ position: "relative" }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        href={link.href}
                        className={`nav-shimmer-btn${isActive ? " active" : ""}`}
                        style={{
                          "--glow-hue": link.glowHue,
                          background: "transparent",
                          border: "none",
                          borderLeft: `3px solid ${link.color}`,
                          paddingLeft: "12px",
                          paddingRight: "12px",
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
                        <NavIcon icon={link.icon} color={isActive ? link.color : BASE_COLORS.inkSepia} />
                        {link.label}
                        <ChevronIcon open={dropdownOpen} color={isActive ? link.color : BASE_COLORS.inkSepia} />
                      </Link>

                      {/* Dropdown Menu */}
                      <div
                        style={{
                          position: "absolute",
                          top: "calc(100% + 16px)",
                          left: "50%",
                          transform: `translateX(-50%) translateY(${dropdownOpen ? "0" : "-8px"})`,
                          minWidth: "280px",
                          background: BASE_COLORS.paperCream,
                          borderRadius: "16px",
                          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)",
                          padding: "8px 0",
                          opacity: dropdownOpen ? 1 : 0,
                          pointerEvents: dropdownOpen ? "auto" : "none",
                          transition: "opacity 0.2s ease, transform 0.2s ease",
                          border: `1px solid rgba(0, 0, 0, 0.06)`,
                        }}
                      >
                        {/* Arrow */}
                        <div
                          style={{
                            position: "absolute",
                            top: "-6px",
                            left: "50%",
                            transform: "translateX(-50%) rotate(45deg)",
                            width: "12px",
                            height: "12px",
                            background: BASE_COLORS.paperCream,
                            borderTop: "1px solid rgba(0, 0, 0, 0.06)",
                            borderLeft: "1px solid rgba(0, 0, 0, 0.06)",
                          }}
                        />
                        <div style={{ padding: "6px 0" }}>
                          {DROPDOWN_ITEMS.map((item) => (
                            <DropdownItem key={item.label} label={item.label} href={item.href} color={item.color} onClose={() => setDropdownOpen(false)} />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`nav-shimmer-btn${isActive ? " active" : ""}`}
                    style={{
                      "--glow-hue": link.glowHue,
                      background: "transparent",
                      border: "none",
                      borderLeft: `3px solid ${link.color}`,
                      paddingLeft: "12px",
                      paddingRight: "12px",
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
                    <NavIcon icon={link.icon} color={isActive ? link.color : BASE_COLORS.inkSepia} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Iconos sociales - Solo Desktop */}
          {!isMobile && <SocialIcons />}

        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={NAV_LINKS}
        dropdownItems={DROPDOWN_ITEMS}
      />
    </header>
  );
}

// BUG 2 FIX: onClose cierra el dropdown al navegar desde un ítem
function DropdownItem({ label, href, color, onClose }: { label: string; href: string; color: string; onClose: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onClick={onClose}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        padding: "12px 20px",
        background: hovered ? hexToRgba(color, 0.1) : "transparent",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: 400,
        color: hovered ? color : BASE_COLORS.inkSepia,
        transition: "background 0.15s ease, color 0.15s ease",
        textAlign: "left",
        fontFamily: "inherit",
        textDecoration: "none",
      }}
    >
      <span
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: color,
          transition: "transform 0.15s ease",
          transform: hovered ? "scale(1.3)" : "scale(1)",
          flexShrink: 0,
        }}
      />
      {label}
    </Link>
  );
}

// BUG 6: IconButton eliminado (era código muerto — nunca se usaba en el render)
// BUG 7: NavIcon movido a ./NavIcon.tsx (componente compartido con MobileDrawer)

function SocialIcons() {
  const [igHovered, setIgHovered] = useState(false);
  const [fbHovered, setFbHovered] = useState(false);
  const [waHovered, setWaHovered] = useState(false);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
      {/* Instagram */}
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIgHovered(true)}
        onMouseLeave={() => setIgHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          background: igHovered
            ? "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)"
            : "transparent",
          transition: "background 0.2s ease",
          color: igHovered ? "#fff" : BASE_COLORS.inkSepia,
        }}
        aria-label="Instagram"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
        </svg>
      </a>

      {/* Facebook */}
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setFbHovered(true)}
        onMouseLeave={() => setFbHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          background: fbHovered ? "#1877f2" : "transparent",
          transition: "background 0.2s ease",
          color: fbHovered ? "#fff" : BASE_COLORS.inkSepia,
        }}
        aria-label="Facebook"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

      {/* WhatsApp */}
      <a
        href="#"
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
