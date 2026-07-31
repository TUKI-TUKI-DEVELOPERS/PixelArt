'use client';

import Image from 'next/image';
import Link from 'next/link';
import { tokens } from '@/lib/design-tokens';
import NavIcon from '@/components/layout/NavIcon';
import type { Book } from './NuestrosLibrosSection';
import { CATEGORY_META, formatCents } from './NuestrosLibrosCard';

export default function NuestrosLibrosListRow({
  title, description, image, href = '#', category, price, priceCents, promoPrice,
}: Book) {
  const meta = category ? CATEGORY_META[category] : { label: '', color: tokens.colors.neutral.text.primary, icon: 'book' };

  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '18px',
        padding: '12px 18px',
        background: '#fff',
        borderRadius: tokens.borderRadius.xl,
        border: `1px solid ${tokens.colors.neutral.surface.border}`,
        textDecoration: 'none',
        transition: `box-shadow ${tokens.transitions.base}, border-color ${tokens.transitions.base}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
        e.currentTarget.style.borderColor = meta.color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = tokens.colors.neutral.surface.border;
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '64px',
          height: '72px',
          flexShrink: 0,
          borderRadius: tokens.borderRadius.md,
          overflow: 'hidden',
          background: '#f7f7f7',
        }}
      >
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="64px"
            style={{
              objectFit: 'contain',
              transform: category === 'photobooks' ? 'scale(0.65)' : undefined,
            }}
          />
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {category && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '2px 9px',
              borderRadius: tokens.borderRadius.full,
              background: `${meta.color}18`,
              color: meta.color,
              fontSize: '11px',
              fontWeight: 700,
              marginBottom: '4px',
            }}
          >
            <NavIcon icon={meta.icon} color={meta.color} />
            {meta.label}
          </span>
        )}
        <h3
          style={{
            margin: 0,
            fontSize: '15px',
            fontWeight: 700,
            color: tokens.colors.neutral.text.primary,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              margin: '2px 0 0',
              fontSize: '13px',
              color: tokens.colors.neutral.text.secondary,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {description}
          </p>
        )}
      </div>

      {(price || priceCents !== undefined) && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
          {promoPrice !== undefined && priceCents !== undefined && (
            <span style={{ fontSize: '11px', color: '#9ca3af', textDecoration: 'line-through' }}>
              {formatCents(priceCents)}
            </span>
          )}
          <span
            style={{
              fontSize: '16px',
              fontWeight: 800,
              color: promoPrice !== undefined ? '#e74c6f' : tokens.colors.neutral.text.primary,
            }}
          >
            {promoPrice !== undefined && priceCents !== undefined ? formatCents(promoPrice) : price}
          </span>
        </div>
      )}

      <span aria-hidden="true" style={{ flexShrink: 0, color: meta.color, fontSize: '18px' }}>
        →
      </span>
    </Link>
  );
}
