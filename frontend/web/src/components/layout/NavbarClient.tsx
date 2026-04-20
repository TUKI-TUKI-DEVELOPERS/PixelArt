"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PixelArtLogo from "./PixelArtLogo";
import HamburgerIcon from "./HamburgerIcon";
import MobileDrawer from "./MobileDrawer";
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
  {
    label: "Nuestros Libros",
    href: "/nuestros-libros",
    color: PIXELART_COLORS.E_GREEN,
    icon: "library",
    glowHue: "86deg",
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
    color: PIXELART_COLORS.A_BLUE,
  },
];

type BannerConfig = { text: string; color: string; enabled: boolean } | null;

export default function NavbarClient({ bannerConfig }: { bannerConfig?: BannerConfig }) {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("Home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detectar si es mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
            <Link href="/" style={{ display: "block" }}>
              <PixelArtLogo size={isMobile ? "small" : "default"} />
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
                      <button
                        onClick={() => {
                          setActiveLink(link.label);
                          router.push(link.href);
                        }}
                        className={`nav-shimmer-btn${isActive ? " active" : ""}`}
                        style={{
                          "--glow-hue": link.glowHue,
                          background: isActive ? hexToRgba(link.color, 0.15) : "transparent",
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
                        } as React.CSSProperties}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = hexToRgba(link.color, 0.1);
                            e.currentTarget.style.color = link.color;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = BASE_COLORS.inkSepia;
                          }
                        }}
                      >
                        <div className="shimmer" />
                        <NavIcon icon={link.icon} color={isActive ? link.color : BASE_COLORS.inkSepia} />
                        {link.label}
                        <ChevronIcon open={dropdownOpen} color={isActive ? link.color : BASE_COLORS.inkSepia} />
                      </button>

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
                            <DropdownItem key={item.label} label={item.label} href={item.href} color={item.color} />
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
                    onClick={() => setActiveLink(link.label)}
                    className={`nav-shimmer-btn${isActive ? " active" : ""}`}
                    style={{
                      "--glow-hue": link.glowHue,
                      background: isActive ? hexToRgba(link.color, 0.15) : "transparent",
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
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
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

        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={NAV_LINKS}
        dropdownItems={DROPDOWN_ITEMS}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      />
    </header>
  );
}

function DropdownItem({ label, href, color }: { label: string; href: string; color: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
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

function IconButton({
  ariaLabel,
  children,
  color,
  small = false,
}: {
  ariaLabel: string;
  children: React.ReactNode;
  color: string;
  small?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      aria-label={ariaLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "none",
        background: hovered ? hexToRgba(color, 0.1) : "transparent",
        borderRadius: "10px",
        padding: small ? "8px" : "10px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.15s ease",
        color: hovered ? color : BASE_COLORS.inkSepia,
      }}
    >
      {children}
    </button>
  );
}

function NavIcon({ icon, color }: { icon: string; color: string }) {
  const iconPaths = {
    home: (
      <>
        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 22V12H15V22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    book: (
      <>
        <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    camera: (
      <>
        <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    library: (
      <>
        <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  };

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      {iconPaths[icon as keyof typeof iconPaths]}
    </svg>
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
