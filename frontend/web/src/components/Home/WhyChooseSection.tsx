'use client';

import Image from 'next/image';
import Link from 'next/link';
import { tokens } from '@/lib/design-tokens';
import FeatureCard from './FeatureCard';
import { Award, ShieldCheck, PencilRuler, Truck, Users, Heart, Package, BookOpen, ChevronRight, Feather, Quote } from 'lucide-react';
import { useWindowSize } from '@/hooks/useWindowSize';

const ACCENT_COLOR = '#eb6164';

type WhyChooseSectionProps = {
  whyChooseUsImageUrl: string;
};

export default function WhyChooseSection({ whyChooseUsImageUrl }: WhyChooseSectionProps) {
  const { isMobile } = useWindowSize();

  const features = [
    {
      icon: Award,
      title: 'Calidad Premium',
      description:
        'Impresión profesional en papel de alto gramaje con acabados elegantes y revisión cuidadosa en cada pedido.',
    },
    {
      icon: ShieldCheck,
      title: '100% Garantizado',
      description:
        'Si algo no sale como esperabas, lo solucionamos o reimprimimos sin complicaciones.',
    },
    {
      icon: PencilRuler,
      title: 'Diseño Profesional',
      description:
        'Plantillas creadas con criterio visual y personalización pensada para emocionar.',
    },
    {
      icon: Truck,
      title: 'Entrega Rápida',
      description:
        'Envíos a todo el Perú con seguimiento y atención cercana durante el proceso.',
    },
  ];

  const trustBar = [
    { icon: Award, title: 'Materiales premium', subtitle: 'Papel de alto gramaje y acabados de lujo' },
    { icon: Heart, title: 'Atención personalizada', subtitle: 'Te acompañamos en cada paso' },
    { icon: Package, title: 'Envíos seguros', subtitle: 'A todo el Perú con seguimiento' },
  ];

  return (
    <section
      style={{
        width: '100%',
        padding: `${tokens.spacing.section.lg} ${tokens.spacing.component.md}`,
        background: '#fcf8f6',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '40px' : '80px',
            alignItems: 'center',
          }}
        >
          {/* Imagen izquierda con badges flotantes — oculta en mobile */}
          {!isMobile && (
            <div style={{ position: 'relative' }}>
              <Image
                src={whyChooseUsImageUrl}
                alt="Familia feliz viendo su Photobook personalizado"
                width={699}
                height={614}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: tokens.borderRadius.lg,
                  boxShadow: tokens.shadows.lg,
                }}
              />

              {/* Badge — historias creadas */}
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  left: '-20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 20px',
                  background: '#fff',
                  borderRadius: tokens.borderRadius.lg,
                  boxShadow: tokens.shadows.lg,
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: `${ACCENT_COLOR}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Users size={20} color={ACCENT_COLOR} strokeWidth={2.2} />
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: ACCENT_COLOR, lineHeight: 1.1 }}>+500</div>
                  <div style={{ fontSize: '13px', color: tokens.colors.neutral.text.secondary, whiteSpace: 'nowrap' }}>
                    historias creadas
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contenido */}
          <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
            {/* Kicker */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              <span style={{ width: '28px', height: '2px', background: ACCENT_COLOR }} />
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: ACCENT_COLOR,
                  lineHeight: 1.1,
                }}
              >
                Nuestra promesa
              </span>
            </div>

            <h2
              style={{
                margin: `0 0 ${tokens.spacing.component.md} 0`,
                fontFamily: tokens.fonts.display,
                fontSize: 'clamp(32px, 3.5vw, 46px)',
                fontWeight: 700,
                color: tokens.colors.neutral.text.primary,
                lineHeight: 1.12,
                letterSpacing: '-0.01em',
              }}
            >
              Por qué elegir <em style={{ fontStyle: 'italic', fontWeight: 400 }}>PixelArt</em>
            </h2>

            <p
              style={{
                margin: `0 0 ${tokens.spacing.section.xs} 0`,
                fontSize: tokens.typography.bodyLarge.size,
                lineHeight: 1.6,
                color: tokens.colors.neutral.text.secondary,
                maxWidth: '480px',
                marginInline: isMobile ? 'auto' : '0',
              }}
            >
              Combinamos calidad premium, diseño profesional y atención cercana para que cada libro sea tan especial
              como tu historia.
            </p>

            {/* Feature Cards — grid 2x2 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: `${tokens.spacing.component.lg} ${tokens.spacing.component.md}`,
                marginBottom: tokens.spacing.section.xs,
                textAlign: 'left',
              }}
            >
              {features.map((feat, i) => (
                <FeatureCard
                  key={i}
                  icon={feat.icon}
                  title={feat.title}
                  description={feat.description}
                  color={ACCENT_COLOR}
                />
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                display: 'flex',
                justifyContent: isMobile ? 'center' : 'flex-start',
                gap: '14px',
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/libros-personalizados"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '0 30px',
                  height: '52px',
                  borderRadius: '9999px',
                  background: ACCENT_COLOR,
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                }}
              >
                <BookOpen size={18} />
                Crear mi libro
                <ChevronRight size={18} />
              </Link>
              <Link
                href="/photobooks"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '0 30px',
                  height: '52px',
                  borderRadius: '9999px',
                  border: `1.5px solid ${tokens.colors.neutral.surface.border}`,
                  background: 'transparent',
                  color: tokens.colors.neutral.text.primary,
                  fontSize: '15px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                }}
              >
                Ver más detalles
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Barra de confianza inferior */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '24px',
            marginTop: tokens.spacing.section.sm,
            padding: '28px 32px',
            background: '#fff',
            borderRadius: tokens.borderRadius.xl,
            border: `1px solid ${tokens.colors.neutral.surface.border}`,
          }}
        >
          {trustBar.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  flexShrink: 0,
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: `${ACCENT_COLOR}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={20} color={ACCENT_COLOR} strokeWidth={2.2} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: tokens.colors.neutral.text.primary }}>
                  {title}
                </div>
                <div style={{ fontSize: '13px', color: tokens.colors.neutral.text.secondary }}>{subtitle}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bloque destacado — poema de ejemplo */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            marginTop: '24px',
            padding: isMobile ? '44px 28px' : '64px 80px',
            borderRadius: tokens.borderRadius.xl,
            background: '#fff',
            border: `1px solid ${tokens.colors.neutral.surface.border}`,
            textAlign: 'center',
          }}
        >
          <Quote
            size={isMobile ? 52 : 72}
            color={ACCENT_COLOR}
            strokeWidth={1.5}
            style={{ position: 'absolute', top: isMobile ? '16px' : '28px', left: isMobile ? '20px' : '40px', opacity: 0.14 }}
          />

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '28px',
            }}
          >
            <span style={{ width: '28px', height: '2px', background: ACCENT_COLOR }} />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT_COLOR }}>
              <Feather size={14} strokeWidth={2.2} />
              Incluido en cada libro
            </span>
            <span style={{ width: '28px', height: '2px', background: ACCENT_COLOR }} />
          </div>

          <p
            style={{
              margin: '0 auto',
              maxWidth: '620px',
              fontFamily: tokens.fonts.display,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: isMobile ? '21px' : 'clamp(24px, 2.2vw, 29px)',
              lineHeight: 1.65,
              color: tokens.colors.neutral.text.primary,
            }}
          >
            &ldquo;Cada momento que vivimos juntos
            <br />
            quedó guardado en esta página.
            <br />
            Este libro nació para recordarte
            <br />
            cuánto iluminas mi vida.&rdquo;
          </p>

          <p
            style={{
              margin: '28px 0 0 0',
              fontSize: '14px',
              color: tokens.colors.neutral.text.secondary,
            }}
          >
            Un poema para ese alguien especial — cada escena incluye un poema que cuenta una historia.
          </p>
        </div>
      </div>
    </section>
  );
}
