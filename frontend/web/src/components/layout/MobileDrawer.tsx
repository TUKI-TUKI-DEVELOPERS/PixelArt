'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import PixelArtLogo from './PixelArtLogo';
import NavIcon from './NavIcon';
import { BASE_COLORS, hexToRgba } from '@/lib/colors';

interface NavLink {
  label: string;
  href: string;
  color: string;
  icon: string;
  hasDropdown?: boolean;
}

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  dropdownItems?: { label: string; href: string; color: string }[];
}

/**
 * Drawer lateral para navegación mobile
 * 
 * Slide-in desde la izquierda con backdrop blur.
 * Incluye logo, links de navegación, y opciones de usuario/carrito.
 */
export default function MobileDrawer({
  open,
  onClose,
  links,
  dropdownItems = [],
}: MobileDrawerProps) {
  // BUG 1 FIX: derivar el link activo de la URL real
  const pathname = usePathname();
  const activeLink = links.find((l) => l.href === pathname)?.label ?? '';
  
  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    
    if (open) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando drawer está abierto
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const drawerVariants = {
    closed: {
      x: '-100%',
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
    },
  };

  const backdropVariants = {
    closed: {
      opacity: 0,
    },
    open: {
      opacity: 1,
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 999,
            }}
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: '300px',
              maxWidth: '85vw',
              backgroundColor: BASE_COLORS.paperCreamSolid,
              boxShadow: '4px 0 24px rgba(0, 0, 0, 0.15)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            {/* Header con Logo y Cerrar */}
            <div
              style={{
                padding: '20px',
                borderBottom: `1px solid ${BASE_COLORS.inkSepiaLight}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Link
                href="/"
                onClick={(e) => {
                  if (pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                  onClose();
                }}
              >
                <PixelArtLogo width={160} />
              </Link>
              
              <button
                onClick={onClose}
                aria-label="Cerrar menú"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  color: BASE_COLORS.inkSepia,
                  fontSize: '24px',
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            {/* Navigation Links */}
            <nav
              style={{
                flex: 1,
                padding: '24px 0',
              }}
            >
              {links.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px 24px',
                      fontSize: '16px',
                      fontWeight: activeLink === link.label ? 600 : 400,
                      color: activeLink === link.label ? link.color : BASE_COLORS.inkSepia,
                      textDecoration: 'none',
                      borderLeft: `4px solid ${activeLink === link.label ? link.color : 'transparent'}`,
                      backgroundColor: activeLink === link.label ? hexToRgba(link.color, 0.1) : 'transparent',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <NavIcon icon={link.icon} color={activeLink === link.label ? link.color : BASE_COLORS.inkSepia} />
                    {link.label}
                  </Link>
                  
                  {/* Dropdown items si es Libros Personalizados */}
                  {link.hasDropdown && dropdownItems.length > 0 && (
                    <div style={{ paddingLeft: '16px' }}>
                      {dropdownItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={onClose}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 24px',
                            fontSize: '14px',
                            fontWeight: 400,
                            color: BASE_COLORS.inkSepia,
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <span
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: item.color,
                              flexShrink: 0,
                            }}
                          />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Footer con iconos */}
            <div
              style={{
                padding: '20px',
                borderTop: `1px solid ${BASE_COLORS.inkSepiaLight}`,
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
              }}
            >
              <button
                aria-label="Mi cuenta"
                style={{
                  background: 'transparent',
                  border: `1px solid ${BASE_COLORS.inkSepiaLight}`,
                  borderRadius: '8px',
                  padding: '12px 24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: BASE_COLORS.inkSepia,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M3 21C3 17.134 7.02944 14 12 14C16.9706 14 21 17.134 21 21"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                Cuenta
              </button>

              <button
                aria-label="Carrito"
                style={{
                  background: 'transparent',
                  border: `1px solid ${BASE_COLORS.inkSepiaLight}`,
                  borderRadius: '8px',
                  padding: '12px 24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: BASE_COLORS.inkSepia,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M3 6H21" stroke="currentColor" strokeWidth="1.8" />
                  <path
                    d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Carrito
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// BUG 7: NavIcon movido a ./NavIcon.tsx (componente compartido)
