"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  // Mouse coordinates using MotionValues
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smoother spring — reduce stiffness to eliminate micro-jitter on fast movement
  const springConfig = { damping: 28, stiffness: 200, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch device to disable custom cursor
    const checkDevice = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(isTouch);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Traverse up to find interactive nodes or cursor custom labels
      let target = e.target as HTMLElement | null;
      let hoveredInteractive = false;

      while (target && target !== document.body) {
        const isClickable =
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.tagName === "SELECT" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.getAttribute("role") === "button" ||
          target.hasAttribute("data-cursor-hover");

        if (isClickable) {
          hoveredInteractive = true;
          break;
        }

        target = target.parentElement;
      }

      setIsHovered(hoveredInteractive);
      setShowIcon(hoveredInteractive);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [cursorX, cursorY, isVisible]);

  // Disable completely on mobile touch screens or if user prefers reduced motion
  if (isMobile || prefersReducedMotion) {
    return null;
  }

  // Scale based on state — avoids layout-triggering width/height changes (GPU-composited)
  // Base ring is w-6 h-6 (24px). Scale 2.25 ≈ 54px, scale 3.33 ≈ 80px.
  const ringScale = isVisible ? (isHovered ? 2.25 : 1) : 0.8;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* 1. Outer Glow Ring — scale-driven (GPU-composited, no layout recalc) */}
      <motion.div
        className="absolute top-0 left-0 w-6 h-6 rounded-full border border-[#16C7FF]/40 bg-[#16C7FF]/5 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 backdrop-blur-[1px] shadow-[0_0_15px_rgba(22,199,255,0.15)]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          willChange: "transform",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: ringScale,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        {showIcon && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="grid place-items-center"
          >
            <ChevronRight className="size-3 text-[#16C7FF]" aria-hidden="true" />
          </motion.span>
        )}
      </motion.div>

      {/* 2. Subtle Cyan Radial Spotlight */}
      <motion.div
        className="absolute top-0 left-0 w-[350px] h-[350px] rounded-full bg-[#16C7FF]/[0.015] blur-[80px] pointer-events-none mix-blend-screen -translate-x-1/2 -translate-y-1/2 -z-10"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          willChange: "transform",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 160, damping: 24 }}
      />

      {/* 3. Inner Precise Cursor Dot */}
      <motion.div
        className="absolute top-0 left-0 size-1.5 rounded-full bg-[#16C7FF] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(22,199,255,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          willChange: "transform",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovered ? 0.4 : 1,
        }}
        transition={{ duration: 0.12 }}
      />
    </div>
  );
}
