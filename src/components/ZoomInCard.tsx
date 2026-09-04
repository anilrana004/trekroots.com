"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Varied fly-in origins so cards arrive from different directions */
export const CARD_ENTRANCES = [
  { x: -72, y: 48, scale: 0.78, rotate: -5 },
  { x: 72, y: 36, scale: 0.78, rotate: 5 },
  { x: 0, y: 80, scale: 0.72, rotate: 0 },
  { x: -48, y: -40, scale: 0.8, rotate: -3 },
  { x: 56, y: -28, scale: 0.78, rotate: 4 },
  { x: -36, y: 64, scale: 0.75, rotate: -2 },
  { x: 40, y: 56, scale: 0.76, rotate: 3 },
  { x: 0, y: -56, scale: 0.8, rotate: -1 },
] as const;

type ZoomInCardProps = {
  index?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Zoom / fly-in from varied directions as the card enters the viewport.
 */
export function ZoomInCard({
  index = 0,
  className = "h-full",
  children,
}: ZoomInCardProps) {
  const reduceMotion = useReducedMotion();
  const enter = CARD_ENTRANCES[index % CARD_ENTRANCES.length];

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: enter.x,
              y: enter.y,
              scale: enter.scale,
              rotate: enter.rotate,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
      }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 260,
              damping: 22,
              mass: 0.85,
              delay: Math.min(index % 8, 7) * 0.055,
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
