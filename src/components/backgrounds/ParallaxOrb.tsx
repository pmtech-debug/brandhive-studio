"use client";

import { useEffect, useRef, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

interface ParallaxOrbProps {
  children: ReactNode;
  /** Depth factor: 0.02 = very subtle, 0.08 = more movement */
  depth?: number;
  className?: string;
}

/**
 * ParallaxOrb — wraps decorative background blur orbs with subtle
 * cursor-driven parallax movement. NEVER use this on content elements.
 *
 * - Falls back to static rendering on touch devices or prefers-reduced-motion.
 * - Uses GPU-composited transforms only (translate X/Y).
 * - Spring smoothed via Framer Motion useSpring.
 */
export default function ParallaxOrb({
  children,
  depth = 0.04,
  className,
}: ParallaxOrbProps) {
  const prefersReducedMotion = useReducedMotion();
  const isTouchRef = useRef(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { damping: 35, stiffness: 60, mass: 0.8 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  useEffect(() => {
    isTouchRef.current = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchRef.current || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cx = e.clientX - window.innerWidth / 2;
      const cy = e.clientY - window.innerHeight / 2;
      rawX.set(cx * depth);
      rawY.set(cy * depth);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [depth, rawX, rawY, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}
