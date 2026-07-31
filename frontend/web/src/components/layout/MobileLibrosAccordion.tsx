'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PIXELART_COLORS, BASE_COLORS, hexToRgba } from '@/lib/colors';
import { getAssetUrl } from '@/lib/assetUrl';
import NavIcon from './NavIcon';
import { CATEGORIAS, PARA_QUIEN, DESTACADOS } from './LibrosPersonalizadosMegaMenu';

const SECTIONS = [
  { key: 'categoria', label: 'Por categoría', icon: 'heart', color: PIXELART_COLORS.R_PINK },
  { key: 'quien', label: 'Para quién', icon: 'family', color: PIXELART_COLORS.I_ORANGE },
  { key: 'destacados', label: 'Destacados', icon: 'sparkles', color: PIXELART_COLORS.L_PURPLE },
] as const;

type SectionKey = (typeof SECTIONS)[number]['key'];

export default function MobileLibrosAccordion({ onClose }: { onClose: () => void }) {
  const [openSection, setOpenSection] = useState<SectionKey | null>('categoria');

  return (
    <div style={{ paddingLeft: '16px' }}>
      {SECTIONS.map((section) => {
        const isOpen = openSection === section.key;
        return (
          <div key={section.key} style={{ borderTop: `1px solid ${BASE_COLORS.inkSepiaLight}` }}>
            <button
              onClick={() => setOpenSection(isOpen ? null : section.key)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                padding: '12px 24px 12px 8px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 600, color: section.color }}>
                <NavIcon icon={section.icon} color={section.color} />
                {section.label}
              </span>
              <ChevronIcon open={isOpen} color={section.color} />
            </button>

            {isOpen && (
              <div style={{ paddingBottom: '12px' }}>
                {section.key === 'categoria' && (
                  <SimpleList items={CATEGORIAS} onClose={onClose} />
                )}
                {section.key === 'quien' && (
                  <SimpleList items={PARA_QUIEN} onClose={onClose} />
                )}
                {section.key === 'destacados' && (
                  <DestacadosCarousel onClose={onClose} />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SimpleList({
  items,
  onClose,
}: {
  items: { label: string; subtitle: string; href: string; icon: string; color: string }[];
  onClose: () => void;
}) {
  return (
    <div>
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onClose}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 24px 10px 8px',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: hexToRgba(item.color, 0.12),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <NavIcon icon={item.icon} color={item.color} />
          </span>
          <span>
            <div style={{ fontSize: '14px', fontWeight: 500, color: BASE_COLORS.inkSepia }}>{item.label}</div>
            <div style={{ fontSize: '12px', color: hexToRgba(BASE_COLORS.inkSepia, 0.65) }}>{item.subtitle}</div>
          </span>
        </Link>
      ))}
    </div>
  );
}

function DestacadosCarousel({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        padding: '4px 24px 4px 8px',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {DESTACADOS.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onClose}
          style={{
            display: 'block',
            flexShrink: 0,
            width: '120px',
            textDecoration: 'none',
          }}
        >
          <img
            src={getAssetUrl(item.coverKey)}
            alt={item.label}
            style={{
              width: '120px',
              height: '150px',
              objectFit: 'cover',
              borderRadius: '10px',
              border: `1px solid rgba(0, 0, 0, 0.06)`,
            }}
          />
          <div style={{ fontSize: '13px', fontWeight: 600, color: BASE_COLORS.inkSepia, marginTop: '6px', lineHeight: 1.3 }}>
            {item.label}
          </div>
          <span
            style={{
              display: 'inline-block',
              marginTop: '4px',
              padding: '2px 8px',
              borderRadius: '999px',
              fontSize: '10px',
              fontWeight: 700,
              background: hexToRgba(item.color, 0.12),
              color: item.color,
            }}
          >
            {item.tag}
          </span>
        </Link>
      ))}
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
      style={{ transition: 'transform 0.2s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
    >
      <path d="M6 9L12 15L18 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
