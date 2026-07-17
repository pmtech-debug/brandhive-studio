"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function HeroDivider() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-12 pointer-events-none select-none">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, scaleX: 1 } : { scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        style={{ originX: 0.5 }}
        className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#16C7FF]/20 to-transparent shadow-[0_0_8px_rgba(22,199,255,0.15)]"
      />
    </div>
  );
}
