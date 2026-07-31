'use client';

import { tokens } from '@/lib/design-tokens';
import { LucideIcon } from 'lucide-react';

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  color = tokens.colors.customBooks.primary,
}: FeatureCardProps) {
  return (
    <article
      style={{
        display: 'flex',
        gap: tokens.spacing.component.sm,
        alignItems: 'flex-start',
        padding: '20px 18px',
        background: '#fff',
        border: `1px solid ${color}22`,
        borderRadius: tokens.borderRadius.xl,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: `${color}18`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={32} color={color} strokeWidth={1.75} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h3
          style={{
            margin: `0 0 ${tokens.spacing.micro.xs} 0`,
            fontFamily: tokens.fonts.display,
            fontSize: '18px',
            fontWeight: 700,
            lineHeight: 1.3,
            color: tokens.colors.neutral.text.primary,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: 0,
            fontSize: '12px',
            lineHeight: 1.6,
            color: tokens.colors.neutral.text.secondary,
          }}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
