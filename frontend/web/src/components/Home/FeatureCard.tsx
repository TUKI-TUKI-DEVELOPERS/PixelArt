'use client';

import { tokens } from '@/lib/design-tokens';
import { LucideIcon } from 'lucide-react';

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
  alignment?: 'left' | 'right';
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  color = tokens.colors.customBooks.primary,
  alignment = 'left',
}: FeatureCardProps) {
  const isLeft = alignment === 'left';

  return (
    <article
      style={{
        display: 'flex',
        gap: tokens.spacing.component.md,
        flexDirection: isLeft ? 'row' : 'row-reverse',
        alignItems: 'flex-start',
        textAlign: isLeft ? 'left' : 'right',
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: '56px',
          height: '56px',
          borderRadius: tokens.borderRadius.md,
          background: `${color}10`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={28} color={color} strokeWidth={1.8} />
      </div>

      <div style={{ flex: 1 }}>
        <h3
          style={{
            margin: `0 0 ${tokens.spacing.micro.sm} 0`,
            fontSize: tokens.typography.h4.size,
            fontWeight: tokens.typography.h4.weight,
            lineHeight: tokens.typography.h4.lineHeight,
            color: tokens.colors.neutral.text.primary,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: 0,
            fontSize: tokens.typography.body.size,
            lineHeight: tokens.typography.body.lineHeight,
            color: tokens.colors.neutral.text.secondary,
          }}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
