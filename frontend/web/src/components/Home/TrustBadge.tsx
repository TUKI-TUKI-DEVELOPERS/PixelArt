'use client';

import { tokens } from '@/lib/design-tokens';
import { LucideIcon } from 'lucide-react';

type TrustBadgeProps = {
  icon: LucideIcon;
  text: string;
};

export default function TrustBadge({ icon: Icon, text }: TrustBadgeProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: tokens.spacing.micro.sm,
        padding: `${tokens.spacing.micro.sm} ${tokens.spacing.component.xs}`,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        borderRadius: tokens.borderRadius.full,
        border: `1px solid ${tokens.colors.neutral.surface.border}`,
        fontSize: tokens.typography.small.size,
        fontWeight: 600,
        color: tokens.colors.neutral.text.secondary,
        boxShadow: tokens.shadows.sm,
      }}
    >
      <Icon size={16} color={tokens.colors.customBooks.primary} strokeWidth={2} />
      <span>{text}</span>
    </div>
  );
}
