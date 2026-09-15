'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PIXELART_COLORS, BASE_COLORS, hexToRgba } from '@/lib/colors';
import { getAssetUrl } from '@/lib/assetUrl';
import NavIcon from './NavIcon';
import { CATEGORIAS, RECIPIENT_NAV, type RecipientNavItem } from './LibrosPersonalizadosMegaMenu';

type MobileBook = RecipientNavItem['illustrated'][number];
type MobileUpcoming = RecipientNavItem['upcoming'][number];

export default function MobileLibrosAccordion({ onClose }: { onClose: () => void }) {
  const [openRecipientIdx, setOpenRecipientIdx] = useState(0);

  return (
    <div style={{ paddingLeft: '16px' }}>
      <div style={{ padding: '10px 24px 8px 8px' }}>
        <div style={{ fontSize: '13px', fontWeight: 800, color: BASE_COLORS.inkSepia }}>
          Elige a quién quieres sorprender
        </div>
        <div style={{ marginTop: '3px', fontSize: '12px', color: hexToRgba(BASE_COLORS.inkSepia, 0.64), lineHeight: 1.45 }}>
Después eliges la versión disponible para ese tipo de regalo.
        </div>
      </div>

      {RECIPIENT_NAV.map((recipient, idx) => {
        const isOpen = openRecipientIdx === idx;
        return (
          <div key={recipient.label} style={{ borderTop: `1px solid ${BASE_COLORS.inkSepiaLight}` }}>
            <button
              type="button"
              onClick={() => setOpenRecipientIdx(isOpen ? -1 : idx)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                padding: '12px 24px 12px 8px',
                background: isOpen ? hexToRgba(recipient.color, 0.06) : 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <span
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '9px',
                    background: hexToRgba(recipient.color, 0.12),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <NavIcon icon={recipient.icon} color={recipient.color} />
                </span>
                <span style={{ textAlign: 'left', minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: recipient.color }}>{recipient.label}</span>
                  <span style={{ display: 'block', fontSize: '12px', color: hexToRgba(BASE_COLORS.inkSepia, 0.62), lineHeight: 1.25 }}>{recipient.subtitle}</span>
                </span>
              </span>
              <ChevronIcon open={isOpen} color={recipient.color} />
            </button>

            {isOpen && <RecipientMobilePanel recipient={recipient} onClose={onClose} />}
          </div>
        );
      })}

      <div style={{ borderTop: `1px solid ${BASE_COLORS.inkSepiaLight}`, padding: '14px 24px 16px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 700, color: PIXELART_COLORS.T_TURQUOISE }}>
          <NavIcon icon="book" color={PIXELART_COLORS.T_TURQUOISE} />
          Explorar por tema
        </div>
        <CategoryMobileList onClose={onClose} />
      </div>
    </div>
  );
}

function RecipientMobilePanel({ recipient, onClose }: { recipient: RecipientNavItem; onClose: () => void }) {
  return (
    <div style={{ padding: '0 24px 14px 8px' }}>
      <p style={{ margin: '0 0 12px', fontSize: '12px', color: hexToRgba(BASE_COLORS.inkSepia, 0.68), lineHeight: 1.45 }}>
        {recipient.note}
      </p>

      <MobileBookSection
        title={recipient.illustratedVersionLabel ?? "Versión Infantil"}
        audienceLabel={recipient.illustratedAudienceLabel ?? "Lectura familiar"}
        color={recipient.color}
        icon="book"
        books={recipient.illustrated}
        onClose={onClose}
      />

      {recipient.emotive.length > 0 && (
        <MobileBookSection
title="Versión Adultos"
          audienceLabel="Tono maduro y emotivo"
          color={PIXELART_COLORS.A_BLUE}
          icon="sparkles"
          books={recipient.emotive}
          onClose={onClose}
        />
      )}

      {recipient.upcoming.length > 0 && (
        <UpcomingMobileSection items={recipient.upcoming} />
      )}
    </div>
  );
}

function MobileBookSection({
  title,
  audienceLabel,
  color,
  icon,
  books,
  onClose,
}: {
  title: string;
  audienceLabel: string;
  color: string;
  icon: string;
  books: MobileBook[];
  onClose: () => void;
}) {
  return (
    <section style={{ marginTop: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 800, color }}>
          <NavIcon icon={icon} color={color} />
          {title}
        </div>
        <span style={{ padding: '3px 8px', borderRadius: '999px', background: hexToRgba(color, 0.1), color, fontSize: '10px', fontWeight: 800, whiteSpace: 'nowrap' }}>
          {audienceLabel}
        </span>
      </div>
      <div style={{ display: 'grid', gap: '9px' }}>
        {books.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px',
              borderRadius: '12px',
              border: `1px solid ${hexToRgba(item.color, 0.16)}`,
              background: hexToRgba(item.color, 0.045),
              textDecoration: 'none',
            }}
          >
            <img
              src={getAssetUrl(item.coverKey)}
              alt={item.label}
              style={{ width: '54px', height: '68px', objectFit: 'cover', borderRadius: '7px', flexShrink: 0 }}
            />
            <span style={{ minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: BASE_COLORS.inkSepia, lineHeight: 1.3 }}>{item.label}</span>
              <span style={{ display: 'block', fontSize: '12px', color: hexToRgba(BASE_COLORS.inkSepia, 0.64), marginTop: '3px', lineHeight: 1.35 }}>{item.subtitle}</span>
              <span style={{ display: 'inline-block', marginTop: '7px', padding: '2px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 800, color: item.color, background: hexToRgba(item.color, 0.12) }}>{item.tag}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function UpcomingMobileSection({ items }: { items: MobileUpcoming[] }) {
  return (
    <section style={{ marginTop: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '12px', fontWeight: 800, color: PIXELART_COLORS.I_ORANGE }}>
        <NavIcon icon="sparkles" color={PIXELART_COLORS.I_ORANGE} />
        En preparación
      </div>
      <div style={{ display: 'grid', gap: '8px' }}>
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 10px',
              borderRadius: '11px',
              background: 'rgba(0,0,0,0.025)',
              border: '1px dashed rgba(0,0,0,0.10)',
            }}
          >
            <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: hexToRgba(item.color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <NavIcon icon={item.icon} color={item.color} />
            </span>
            <span>
              <span style={{ display: 'block', fontSize: '13px', fontWeight: 650, color: BASE_COLORS.inkSepia }}>{item.label}</span>
              <span style={{ display: 'block', fontSize: '11px', color: hexToRgba(BASE_COLORS.inkSepia, 0.58), marginTop: '2px' }}>{item.subtitle}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategoryMobileList({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ display: 'grid', gap: '6px', marginTop: '10px' }}>
      {CATEGORIAS.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onClose}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '9px 0',
            textDecoration: 'none',
          }}
        >
          <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: hexToRgba(item.color, 0.12), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <NavIcon icon={item.icon} color={item.color} />
          </span>
          <span>
            <span style={{ display: 'block', fontSize: '14px', fontWeight: 650, color: BASE_COLORS.inkSepia }}>{item.label}</span>
            <span style={{ display: 'block', fontSize: '12px', color: hexToRgba(BASE_COLORS.inkSepia, 0.62), marginTop: '2px' }}>{item.subtitle}</span>
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
