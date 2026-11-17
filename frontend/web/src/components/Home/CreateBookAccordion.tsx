"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { tokens } from "@/lib/design-tokens";

const ACCENT = tokens.colors.customBooks.primary;

type Step = {
  id: number;
  title: string;
  description: string;
  details: string[];
};

const steps: Step[] = [
  {
    id: 1,
    title: "Cuéntanos tu historia",
    description: "Sube tus fotos y personaliza cada detalle.",
    details: ["Fotos de los protagonistas", "Escenario y tapa", "Tu dedicatoria o una de las nuestras"],
  },
  {
    id: 2,
    title: "Recibe tu demo gratis",
    description: "Te enviamos 2 a 3 propuestas por correo, sin costo.",
    details: ["Sin compromiso de compra"],
  },
  {
    id: 3,
    title: "Elige tu propuesta favorita",
    description: "Revisa y selecciona la que más te guste.",
    details: ["Decides cuando estés convencido"],
  },
  {
    id: 4,
    title: "Paga y recíbelo en tu casa",
    description: "Pagas con Yape, subes tu comprobante y tu libro llega a tu puerta.",
    details: ["Envío a todo el Perú"],
  },
];

/**
 * "Crea tu libro muy fácil": the four ordering steps as one connected row
 * (a vertical timeline on narrow screens). No cards, icons or "Ver más":
 * every detail is visible and the sequence is carried by the numbered line.
 */
export default function CreateBookAccordion() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="cb-section" aria-labelledby="cb-title">
      <div className="cb-inner">
        <div className="cb-head">
          <h2 id="cb-title" className="cb-title">
            Crea tu libro <em>muy fácil</em>
          </h2>
          <Link href="/libros-personalizados" className="cb-cta">
            Crear mi libro
          </Link>
        </div>

        <ol className="cb-steps">
          {steps.map((step, idx) => (
            <motion.li
              key={step.id}
              className="cb-step"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={`cb-num${idx === 0 ? " cb-num-first" : ""}`} aria-hidden="true">
                {step.id}
              </span>
              <h3 className="cb-step-title">{step.title}</h3>
              <p className="cb-step-text">{step.description}</p>
              <ul className="cb-details">
                {step.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>

        <p className="cb-reassure">Sin registro. Ves tu demo gratis antes de pagar.</p>
      </div>

      <style jsx>{`
        .cb-section {
          width: 100%;
          padding: ${tokens.spacing.section.lg} ${tokens.spacing.component.md};
          background: ${tokens.colors.neutral.surface.subtle};
        }
        .cb-inner {
          max-width: 1180px;
          margin: 0 auto;
        }
        .cb-head {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px 32px;
        }
        .cb-title {
          margin: 0;
          font-family: ${tokens.fonts.display};
          font-size: clamp(32px, 3.8vw, 50px);
          line-height: 1.12;
          font-weight: 700;
          color: ${tokens.colors.neutral.text.primary};
          letter-spacing: -0.01em;
          padding-bottom: 4px;
        }
        .cb-title em {
          font-style: italic;
          color: ${ACCENT};
          white-space: nowrap;
        }
        .cb-section :global(.cb-cta) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 54px;
          padding: 0 34px;
          border-radius: 9999px;
          background: ${ACCENT};
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.01em;
          text-decoration: none;
          white-space: nowrap;
          transition: transform 0.18s ease;
        }
        .cb-section :global(.cb-cta:hover) {
          transform: translateY(-2px);
        }
        .cb-section :global(.cb-cta:active) {
          transform: scale(0.98);
        }
        .cb-section :global(.cb-cta:focus-visible) {
          outline: 3px solid ${ACCENT}66;
          outline-offset: 3px;
        }

        .cb-steps {
          list-style: none;
          margin: 48px 0 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          position: relative;
        }
        /* The line that joins the four numbers. */
        .cb-steps::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 22px;
          height: 2px;
          background: ${tokens.colors.neutral.surface.border};
        }
        .cb-section :global(.cb-step) {
          position: relative;
          padding-right: 28px;
          min-width: 0;
        }
        .cb-num {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          position: relative;
          z-index: 1;
          background: ${tokens.colors.neutral.surface.subtle};
          border: 2px solid ${ACCENT};
          color: ${ACCENT};
          font-family: ${tokens.fonts.display};
          font-size: 22px;
          line-height: 1;
        }
        .cb-num-first {
          background: ${ACCENT};
          color: #fff;
        }
        .cb-step-title {
          margin: 20px 0 8px;
          font-family: ${tokens.fonts.display};
          font-size: 21px;
          line-height: 1.25;
          font-weight: 700;
          color: ${tokens.colors.neutral.text.primary};
        }
        .cb-step-text {
          margin: 0;
          font-size: 15px;
          line-height: 1.55;
          color: ${tokens.colors.neutral.text.secondary};
        }
        .cb-details {
          list-style: none;
          margin: 12px 0 0;
          padding: 0;
          display: grid;
          gap: 6px;
        }
        .cb-details li {
          position: relative;
          padding-left: 14px;
          font-size: 13.5px;
          line-height: 1.45;
          color: ${tokens.colors.neutral.text.tertiary};
        }
        .cb-details li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.62em;
          width: 6px;
          height: 2px;
          background: ${ACCENT};
        }
        .cb-reassure {
          margin: 40px 0 0;
          font-size: 13px;
          font-weight: 500;
          color: ${tokens.colors.neutral.text.muted};
        }

        /* Narrow screens: the row becomes a vertical timeline. */
        @media (max-width: 900px) {
          .cb-steps {
            grid-template-columns: minmax(0, 1fr);
            gap: 28px;
            margin-top: 36px;
          }
          .cb-steps::before {
            left: 22px;
            right: auto;
            top: 0;
            bottom: 0;
            width: 2px;
            height: auto;
          }
          .cb-section :global(.cb-step) {
            display: grid;
            grid-template-columns: 46px minmax(0, 1fr);
            column-gap: 16px;
            padding-right: 0;
          }
          .cb-section :global(.cb-step) > :not(.cb-num) {
            grid-column: 2;
          }
          .cb-step-title {
            margin-top: 8px;
          }
          .cb-section :global(.cb-cta) {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
