"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface FloatingElementProps {
  icon: React.ReactNode;
  position: { x: string; y: string };
  size: "small" | "medium" | "large";
  duration: number; // 10-15s
  delay: number; // 0-5s
  opacity: number; // 0.15-0.25
  zIndex: number; // 0-10
  animationKey?: string;
  interactive?: boolean;
}

export default function FloatingElement({
  icon,
  position,
  size,
  duration,
  delay,
  opacity,
  zIndex,
  animationKey = "default",
  interactive = true,
}: FloatingElementProps) {
  const [isPaused, setIsPaused] = useState(false);

  const sizeMap = {
    small: 60,   // Aumentado de 50 a 60
    medium: 95,  // Aumentado de 85 a 95
    large: 140,  // Aumentado de 125 a 140
  };

  const pixelSize = sizeMap[size];

  // Float distance based on size
  const floatDistance = size === "large" ? 40 : size === "medium" ? 30 : 20;
  const rotationRange = size === "large" ? 8 : size === "medium" ? 6 : 4;

  return (
    <motion.div
      key={animationKey}
      initial={{
        opacity: 0,
        y: -50,
        scale: 0.8,
        rotate: 0,
      }}
      animate={{
        opacity: isPaused ? opacity * 0.6 : opacity,
        y: isPaused ? 0 : [0, -floatDistance, 0],
        scale: 1,
        rotate: isPaused ? 0 : [0, rotationRange, -rotationRange, 0],
      }}
      exit={{
        opacity: 0,
        y: 30,
        scale: 0.9,
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        y: {
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        rotate: {
          duration: duration * 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.2,
        },
        scale: { duration: 0.8, delay },
      }}
      onHoverStart={() => interactive && setIsPaused(true)}
      onHoverEnd={() => interactive && setIsPaused(false)}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
        zIndex: zIndex,
        pointerEvents: interactive ? "auto" : "none",
        cursor: interactive ? "pointer" : "default",
        willChange: "transform, opacity",
        transform: "translate3d(0, 0, 0)",
      }}
    >
      {icon}
    </motion.div>
  );
}
