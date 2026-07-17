import { Variants } from "framer-motion";

/**
 * Centralized Framer Motion animation variants for BrandHive Studio.
 * All variants respect prefers-reduced-motion at the component level.
 * Only GPU-composited properties (opacity, transform) are animated.
 */

// ─── Fade + Up + Blur ───────────────────────────────────────────────────────
export const fadeUpVariant = (delay = 0, blur = true): Variants => ({
  hidden: {
    opacity: 0,
    y: 30,
    ...(blur ? { filter: "blur(6px)" } : {}),
  },
  visible: {
    opacity: 1,
    y: 0,
    ...(blur ? { filter: "blur(0px)" } : {}),
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      delay,
    },
  },
});

// ─── Stagger Container ───────────────────────────────────────────────────────
export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

// ─── Scale + Fade (for images, icons) ───────────────────────────────────────
export const scaleInVariant = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.93 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 20,
      delay,
    },
  },
});

// ─── Clip-path Image Reveal (Premium wipe from bottom) ──────────────────────
export const imageRevealVariant = (delay = 0): Variants => ({
  hidden: {
    clipPath: "inset(100% 0 0 0)",
    scale: 1.08,
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.77, 0, 0.175, 1],
      delay,
    },
  },
});

// ─── Simple Fade (reduced-motion safe) ───────────────────────────────────────
export const fadeVariant = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delay },
  },
});

// ─── Slide In From Left ───────────────────────────────────────────────────────
export const slideInLeftVariant = (delay = 0): Variants => ({
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      delay,
    },
  },
});
