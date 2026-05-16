'use client';

import Image from 'next/image';
import { tokens } from '@/lib/design-tokens';
import FeatureCard from './FeatureCard';
import { Award, Shield, CheckCircle2, Truck } from 'lucide-react';
import { useWindowSize } from '@/hooks/useWindowSize';

type WhyChooseSectionProps = {
  logoUrl: string;
  whyChooseUsImageUrl: string;
};

export default function WhyChooseSection({ logoUrl, whyChooseUsImageUrl }: WhyChooseSectionProps) {
  const { isMobile } = useWindowSize();
  const features = [
    {
      icon: Award,
      title: "Calidad Premium",
      description:
        "Impresión profesional en papel de alta gramaje con acabados de lujo. Cada libro pasa por control de calidad riguroso antes del envío.",
      color: tokens.colors.customBooks.primary,
    },
    {
      icon: Shield,
      title: "100% Garantizado",
      description:
        "Si no quedas satisfecho con tu producto, lo reimprimimos sin costo adicional. Tu felicidad es nuestra prioridad número uno.",
      color: tokens.colors.photobooks.primary,
    },
    {
      icon: CheckCircle2,
      title: "Diseño Profesional",
      description:
        "Plantillas diseñadas por expertos que hacen que tu historia cobre vida. Personalización completa con asistencia de inteligencia artificial.",
      color: tokens.colors.customBooks.primary,
    },
    {
      icon: Truck,
      title: "Entrega Rápida",
      description:
        "Envío a todo Perú en 5-7 días hábiles. Seguimiento en tiempo real de tu pedido desde nuestra planta de impresión hasta tu puerta.",
      color: tokens.colors.photobooks.primary,
    },
  ];

  return (
    <section
      style={{
        width: "100%",
        padding: `${tokens.spacing.section.xl} ${tokens.spacing.component.md}`,
        background: tokens.colors.neutral.surface.base,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr",
          gap: isMobile ? "0" : "80px",
          alignItems: "center",
        }}
      >
        {/* Imagen izquierda — oculta en mobile */}
        {!isMobile && (
          <div>
            <Image
              src={whyChooseUsImageUrl}
              alt="Familia feliz viendo su Photobook personalizado"
              width={700}
              height={500}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: tokens.borderRadius["2xl"],
                boxShadow: tokens.shadows.xl,
              }}
            />
          </div>
        )}

        {/* Contenido */}
        <div style={{ textAlign: isMobile ? "center" : "left" }}>
          <h2
            style={{
              margin: `0 0 ${tokens.spacing.component.xs} 0`,
              fontSize: tokens.typography.h1.size,
              fontWeight: 900,
              color: tokens.colors.neutral.text.primary,
              lineHeight: 1,
            }}
          >
            POR QUÉ ELEGIR
          </h2>

          <Image
            src={logoUrl}
            alt="PixelArt"
            width={280}
            height={60}
            style={{
              width: "280px",
              height: "auto",
              display: "block",
              marginBottom: tokens.spacing.component.md,
              ...(isMobile && { margin: `0 auto ${tokens.spacing.component.md}` }),
            }}
          />

          <div
            style={{
              width: "80%",
              height: "4px",
              background: tokens.colors.neutral.text.primary,
              marginBottom: tokens.spacing.section.sm,
              ...(isMobile && { margin: `0 auto ${tokens.spacing.section.sm}` }),
            }}
          />

          {/* Feature Cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: tokens.spacing.section.xs,
            }}
          >
            {features.map((feat, i) => (
              <FeatureCard
                key={i}
                icon={feat.icon}
                title={feat.title}
                description={feat.description}
                color={feat.color}
                alignment="left"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
