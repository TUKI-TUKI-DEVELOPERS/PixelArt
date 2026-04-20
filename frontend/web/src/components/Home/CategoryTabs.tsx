'use client';

import { Sparkles, Heart, PawPrint, Users, Camera } from 'lucide-react';
import { tokens } from '@/lib/design-tokens';

type CategoryIcon = React.ReactNode;

const CATEGORY_ICONS: Record<string, CategoryIcon> = {
  all:        <Sparkles size={15} strokeWidth={2} />,
  love:       <Heart size={15} strokeWidth={2} />,
  pets:       <PawPrint size={15} strokeWidth={2} />,
  family:     <Users size={15} strokeWidth={2} />,
  photobooks: <Camera size={15} strokeWidth={2} />,
};

type CategoryTabsProps = {
  categories: Array<{ label: string; value: string }>;
  activeValue: string;
  onChange?: (value: string) => void;
  counts?: Record<string, number>;
  centered?: boolean;
};

export default function CategoryTabs({
  categories,
  activeValue,
  onChange,
  counts,
  centered = false,
}: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Categorías de libros"
      style={{
        display: 'flex',
        justifyContent: centered ? 'center' : 'flex-start',
        flexWrap: 'wrap',
        gap: tokens.spacing.component.xs,
        overflowX: 'auto',
        paddingBottom: tokens.spacing.micro.xs,
        scrollbarWidth: 'thin',
      }}
    >
      {categories.map((category) => {
        const isActive = activeValue === category.value;
        const count = counts?.[category.value];
        const icon = CATEGORY_ICONS[category.value] ?? null;

        return (
          <button
            key={category.value}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${category.value}`}
            onClick={() => onChange?.(category.value)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: `${tokens.spacing.component.xs} ${tokens.spacing.component.md}`,
              borderRadius: tokens.borderRadius.full,
              border: `2px solid ${isActive ? 'transparent' : 'rgba(255,255,255,0.25)'}`,
              background: isActive
                ? tokens.colors.photobooks.gradient
                : 'rgba(255,255,255,0.08)',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.75)',
              fontSize: tokens.typography.body.size,
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: `all ${tokens.transitions.base}`,
              outline: 'none',
              boxShadow: isActive ? tokens.shadows.md : 'none',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.color = '#ffffff';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
              }
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 3px ${tokens.colors.photobooks.light}`;
            }}
            onBlur={(e) => {
              if (!isActive) e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {icon}
            <span>{category.label}</span>
            {count !== undefined && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '20px',
                  height: '20px',
                  padding: '0 4px',
                  borderRadius: tokens.borderRadius.full,
                  background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                  fontSize: '11px',
                  fontWeight: 700,
                }}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
