"use client";

import { AnimatePresence } from "framer-motion";
import FloatingElement from "./FloatingElement";
import * as AIBooksIcons from "./icons/ai-books/Hearts";
import * as BookIcons from "./icons/ai-books/BookElements";
import * as StarIcons from "./icons/ai-books/Stars";
import * as PawIcons from "./icons/ai-books/PetPaws";
import * as FlowerIcons from "./icons/ai-books/Flowers";
import * as PhotoStarIcons from "./icons/photobooks/Stars";
import * as SparkleIcons from "./icons/photobooks/Sparkles";
import * as GemIcons from "./icons/photobooks/Gems";
import * as MoonIcons from "./icons/photobooks/Moons";
import * as ButterflyIcons from "./icons/photobooks/Butterflies";
import * as CometIcons from "./icons/photobooks/Comets";
import { useMemo, useState, useEffect } from "react";

interface FloatingElementsLayerProps {
  variant: "ai-books" | "photobooks";
  elementCount?: number;
  animationKey?: string;
  interactive?: boolean;
}

type IconPool = {
  icon: React.ReactElement;
  weight: number;
};

export default function FloatingElementsLayer({
  variant,
  elementCount = 10,
  animationKey = "default",
  interactive = true,
}: FloatingElementsLayerProps) {
  // Icon pools with weights
  const iconPools: Record<string, IconPool[]> = {
    "ai-books": [
      { icon: <AIBooksIcons.HeartSolid />, weight: 5 }, // Aumentado de 2 a 5
      { icon: <AIBooksIcons.HeartOutline />, weight: 4 }, // Aumentado de 1.5 a 4
      { icon: <AIBooksIcons.HeartGlow />, weight: 3 }, // Aumentado de 1 a 3
      { icon: <BookIcons.PageTurning />, weight: 1 }, // Reducido de 2 a 1
      { icon: <BookIcons.OpenBook />, weight: 0.8 }, // Reducido de 1.5 a 0.8
      { icon: <StarIcons.StarBright />, weight: 1 }, // Reducido de 1.5 a 1
      { icon: <StarIcons.StarCluster />, weight: 0.5 }, // Reducido de 1 a 0.5
      { icon: <PawIcons.DogPaw />, weight: 1 }, // Reducido de 1.5 a 1
      { icon: <PawIcons.CatPaw />, weight: 1 }, // Reducido de 1.5 a 1
      { icon: <FlowerIcons.Rose />, weight: 1.5 }, // Aumentado de 1 a 1.5
      { icon: <FlowerIcons.SimpleFlower />, weight: 1.5 }, // Reducido de 2 a 1.5
    ],
    photobooks: [
      // ESTRELLAS (Protagonistas - 40% probabilidad)
      { icon: <PhotoStarIcons.StarFour />, weight: 5 },
      { icon: <PhotoStarIcons.StarSix />, weight: 4 },
      { icon: <PhotoStarIcons.StarGlow />, weight: 3 },

      // DESTELLOS (Secundarios - 28% probabilidad)
      { icon: <SparkleIcons.SparkleCross />, weight: 4 },
      { icon: <SparkleIcons.SparkleBurst />, weight: 3 },
      { icon: <SparkleIcons.SparkleTrail />, weight: 1.5 },

      // GEMAS (Acento - 20% probabilidad)
      { icon: <GemIcons.DiamondGem />, weight: 3 },
      { icon: <GemIcons.CrystalGem />, weight: 2 },
      { icon: <GemIcons.GemFaceted />, weight: 1.5 },

      // LUNAS (Complemento - 8% probabilidad)
      { icon: <MoonIcons.MoonCrescent />, weight: 1.5 },
      { icon: <MoonIcons.MoonThin />, weight: 1 },
      { icon: <MoonIcons.MoonGlow />, weight: 1 },

      // MARIPOSAS (Detalle suave - 10% probabilidad)
      { icon: <ButterflyIcons.ButterflyBlue />, weight: 2 },
      { icon: <ButterflyIcons.ButterflyOutline />, weight: 1.5 },

      // COMETAS (Dinamismo - 10% probabilidad)
      { icon: <CometIcons.ShootingStar />, weight: 2 },
      { icon: <CometIcons.CometDiagonal />, weight: 1.5 },
      { icon: <CometIcons.MiniComet />, weight: 1 },
    ],
  };

  // Safe zones (avoiding center content area)
  const safeZones = [
    { x: "5%", y: "10%" },
    { x: "15%", y: "5%" },
    { x: "75%", y: "8%" },
    { x: "8%", y: "45%" },
    { x: "82%", y: "50%" },
    { x: "10%", y: "75%" },
    { x: "25%", y: "80%" },
    { x: "72%", y: "78%" },
    { x: "65%", y: "18%" },
    { x: "5%", y: "60%" },
    { x: "85%", y: "32%" },
    { x: "38%", y: "12%" },
    // Zonas adicionales para más elementos
    { x: "12%", y: "28%" },
    { x: "20%", y: "65%" },
    { x: "78%", y: "62%" },
    { x: "88%", y: "15%" },
    { x: "30%", y: "8%" },
    { x: "68%", y: "88%" },
    // Zonas adicionales para 16 elementos Photobooks
    { x: "32%", y: "90%" },
    { x: "60%", y: "5%" },
    { x: "90%", y: "68%" },
    { x: "4%", y: "35%" },
  ];

  // Deterministic pseudo-random number generator (seeded)
  function seededRandom(seed: number) {
    let s = seed;
    return () => {
      s = (s * 16807 + 0) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  // Weighted random selection helper using provided rng
  const weightedRandom = <T extends { weight?: number }>(
    items: T[],
    rng: () => number
  ): T => {
    const totalWeight = items.reduce((sum, item) => sum + (item.weight || 1), 0);
    let random = rng() * totalWeight;

    for (const item of items) {
      const weight = item.weight || 1;
      if (random < weight) {
        return item;
      }
      random -= weight;
    }

    return items[0];
  };

  // Only render after mount to avoid hydration mismatch from random values
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Generate elements with balanced distribution (deterministic seed)
  const elements = useMemo(() => {
    if (!mounted) return [];

    // Create seed from animationKey string
    let seed = 1;
    for (let i = 0; i < animationKey.length; i++) {
      seed = (seed * 31 + animationKey.charCodeAt(i)) % 2147483647;
    }
    const rng = seededRandom(seed);

    const pool = iconPools[variant];

    const generatedElements = [];

    for (let i = 0; i < elementCount; i++) {
      // Select icon with weighted random
      const randomIcon = weightedRandom(pool, rng);

      // Position from safe zone with random offset
      const zone = safeZones[i % safeZones.length];
      const offsetX = rng() * 10 - 5; // -5% to +5%
      const offsetY = rng() * 10 - 5;

      const position = {
        x: `calc(${zone.x} + ${offsetX}%)`,
        y: `calc(${zone.y} + ${offsetY}%)`,
      };

      // Random size (weighted)
      const aiBooksSizeWeights = [
        { size: "small" as const, weight: 3 },
        { size: "medium" as const, weight: 4 },
        { size: "large" as const, weight: 3 },
      ];
      const photobooksSizeWeights = [
        { size: "small" as const, weight: 2.5 },
        { size: "medium" as const, weight: 4 },
        { size: "large" as const, weight: 3.5 },
      ];
      const size = weightedRandom(
        variant === "ai-books" ? aiBooksSizeWeights : photobooksSizeWeights,
        rng
      ).size;

      // Random animation parameters
      const duration = 10 + rng() * 5;
      const delay = rng() * 5;
      const opacity = variant === "ai-books"
        ? 0.25 + rng() * 0.15
        : 0.30 + rng() * 0.20;
      const zIndex = Math.floor(rng() * 10);

      generatedElements.push({
        id: `${animationKey}-element-${i}`,
        icon: randomIcon.icon,
        position,
        size,
        duration,
        delay,
        opacity,
        zIndex,
      });
    }

    return generatedElements;
  }, [variant, elementCount, animationKey, mounted]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <AnimatePresence mode="sync">
        {elements.map((element) => (
          <FloatingElement
            key={element.id}
            animationKey={element.id}
            icon={element.icon}
            position={element.position}
            size={element.size}
            duration={element.duration}
            delay={element.delay}
            opacity={element.opacity}
            zIndex={element.zIndex}
            interactive={interactive}
          />
        ))}
      </AnimatePresence>

      {/* Responsive adjustments */}
      <style jsx>{`
        @media (max-width: 768px) {
          /* Reduce interactive elements count visually */
          div {
            --element-count: 6;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          /* Disable animations for accessibility */
          div * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
