import Image from "next/image";
import Link from "next/link";
import { HOME_ASSET_KEYS } from "@/lib/homeAssetKeys";
import { getAssetUrl } from "@/lib/assetUrl";
import FooterBackground from "@/components/backgrounds/FooterBackground";

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.7)",
        textDecoration: "none",
        transition: "all 0.2s ease",
      }}
    >
      {children}
    </a>
  );
}

function TrustBadge({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "13px",
        fontWeight: 500,
        color: "rgba(255,255,255,0.6)",
      }}
    >
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.5)",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      {children}
    </div>
  );
}

const LABEL_STYLE = {
  fontSize: "11px",
  fontWeight: 700 as const,
  color: "rgba(255,255,255,0.35)",
  textTransform: "uppercase" as const,
  letterSpacing: "1.5px",
  marginBottom: "12px",
};

const LINK_STYLE = {
  color: "rgba(255,255,255,0.55)",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 400 as const,
  lineHeight: 1.8,
  transition: "color 0.2s ease",
};

export default function Footer() {
  const logoUrl = getAssetUrl(HOME_ASSET_KEYS.logo);

  return (
    <footer
      style={{
        position: "relative",
        width: "100%",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <style>{`
        /* ── Mobile ── */
        @media (max-width: 767px) {
          .footer-wrap { padding: 36px 20px 16px !important; }

          .footer-trust {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 16px 12px !important;
            justify-items: start;
          }

          /* Grid: 2 columnas */
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 28px 20px !important;
          }

          /* Brand: fila completa, centrada */
          .footer-brand {
            grid-column: 1 / -1;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .footer-brand p { max-width: 100% !important; }
          .footer-brand > div { align-items: center; }
          .footer-brand a { justify-content: center !important; }

          /* Links y company: columna cada uno (ya en 2 cols) */
          .footer-col-links, .footer-col-company { font-size: 13px; }

          /* Social: fila completa, centrada */
          .footer-col-social {
            grid-column: 1 / -1;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .footer-col-social > div { justify-content: center; }

          /* Bottom bar */
          .footer-bottom {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 6px !important;
          }
        }

        /* ── Tablet ── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .footer-wrap { padding: 40px 32px 16px !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
      `}</style>
      <FooterBackground />

      <div
        className="footer-wrap"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "48px 48px 20px",
        }}
      >
        {/* ── Main grid: 4 columns ── */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr 1fr 1.2fr",
            gap: "40px",
            alignItems: "start",
            paddingBottom: "32px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Col 1: Brand + Contact */}
          <div className="footer-brand">
            <Image
              src={logoUrl}
              alt="PixelArt"
              width={150}
              height={42}
              style={{
                width: "150px",
                height: "auto",
                display: "block",
                marginBottom: "14px",
              }}
              loading="lazy"
            />
            <p
              style={{
                margin: "0 0 20px 0",
                fontSize: "13px",
                lineHeight: 1.55,
                color: "rgba(255,255,255,0.4)",
                fontWeight: 400,
                maxWidth: "220px",
              }}
            >
              Libros personalizados e impresos con la mejor calidad en Perú.
            </p>

            {/* WhatsApp + Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a
                href="https://wa.me/51941452953"
                aria-label="WhatsApp"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#25D366",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                  transition: "opacity 0.2s ease",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                +51 941 452 953
              </a>
              <a
                href="mailto:luccano19@gmail.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 400,
                  transition: "opacity 0.2s ease",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 6L2 7" />
                </svg>
                luccano19@gmail.com
              </a>
            </div>
          </div>

          {/* Col 2: Navegación + Categorías */}
          <div className="footer-col-links">
            <div style={LABEL_STYLE}>Productos</div>
            <nav style={{ display: "flex", flexDirection: "column" }}>
              <Link href="/libros-personalizados" style={LINK_STYLE}>Libros Personalizados</Link>
              <Link href="/photobooks" style={LINK_STYLE}>Photobooks</Link>
            </nav>
            <div style={{ ...LABEL_STYLE, marginTop: "20px" }}>Categorías</div>
            <nav style={{ display: "flex", flexDirection: "column" }}>
              <Link href="/libros-personalizados/libros-de-amor" style={LINK_STYLE}>Libros de Amor</Link>
              <Link href="/libros-personalizados/libros-de-mascotas" style={LINK_STYLE}>Libros de Mascotas</Link>
              <Link href="/libros-personalizados/libros-de-familia" style={LINK_STYLE}>Libros de Familia</Link>
              <Link href="/libros-personalizados/libros-de-memorias-familiares" style={LINK_STYLE}>Memorias Familiares</Link>
            </nav>
          </div>

          {/* Col 3: Empresa + Legal */}
          <div className="footer-col-company">
            <div style={LABEL_STYLE}>Empresa</div>
            <nav style={{ display: "flex", flexDirection: "column" }}>
              <Link href="/" style={LINK_STYLE}>Home</Link>
              <Link href="/nuestros-libros" style={LINK_STYLE}>Nuestros Libros</Link>
            </nav>
            <div style={{ ...LABEL_STYLE, marginTop: "20px" }}>Legal</div>
            <nav style={{ display: "flex", flexDirection: "column" }}>
              <a href="#" style={LINK_STYLE}>Términos y Condiciones</a>
              <a href="#" style={LINK_STYLE}>Política de Privacidad</a>
            </nav>
          </div>

          {/* Col 4: Social + Payment */}
          <div className="footer-col-social">
            <div style={LABEL_STYLE}>Síguenos</div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
              <SocialIcon href="#" label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="TikTok">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.24 8.24 0 005.58 2.17V11.9a4.83 4.83 0 01-3.77-1.44V6.69h3.77z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </SocialIcon>
            </div>

            <div style={LABEL_STYLE}>Medios de pago</div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["Yape"].map((method) => (
                <div
                  key={method}
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "4px",
                    padding: "4px 10px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.3px",
                  }}
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Trust badges row ── */}
        <div
          className="footer-trust"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            padding: "20px 0",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            flexWrap: "wrap",
          }}
        >
          <TrustBadge
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" rx="2" />
                <path d="M16 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2" />
                <path d="M6 16v2" />
                <path d="M10 16v2" />
              </svg>
            }
          >
            Envío a todo el Perú
          </TrustBadge>
          <TrustBadge
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            }
          >
            Pago 100% seguro
          </TrustBadge>
          <TrustBadge
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            }
          >
            Satisfacción garantizada
          </TrustBadge>
          <TrustBadge
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            }
          >
            Entrega veloz
          </TrustBadge>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="footer-bottom"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "16px",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.25)",
            }}
          >
            &copy; 2026 PixelArt. Todos los derechos reservados.
          </span>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.25)",
            }}
          >
            Hecho con amor en Per&uacute;
          </span>
        </div>
      </div>
    </footer>
  );
}
