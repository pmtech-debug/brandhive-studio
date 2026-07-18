"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 200, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const rafRef = useRef<number | null>(null);
  const latestMouse = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    checkDevice();
    window.addEventListener("resize", checkDevice);

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isClickable =
        target.closest("a,button,input,select,textarea,[role=button],[data-cursor-hover]") !== null;
      setIsHovered(isClickable);
      setShowIcon(isClickable);
    };

    const handlePointerOut = () => {
      setIsHovered(false);
      setShowIcon(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      latestMouse.current.x = e.clientX;
      latestMouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          cursorX.set(latestMouse.current.x);
          cursorY.set(latestMouse.current.y);
          rafRef.current = null;
        });
      }
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener("pointerover", handlePointerOver, true);
    window.addEventListener("pointerout", handlePointerOut, true);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("pointerover", handlePointerOver, true);
      window.removeEventListener("pointerout", handlePointerOut, true);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isMobile || prefersReducedMotion) return null;

  const ringScale = isVisible ? (isHovered ? 2.25 : 1) : 0.8;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <motion.div
        className="absolute top-0 left-0 w-6 h-6 rounded-full border border-[#16C7FF]/40 bg-[#16C7FF]/5 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 backdrop-blur-[1px] shadow-[0_0_15px_rgba(22,199,255,0.15)]"
        style={{ x: cursorXSpring, y: cursorYSpring, willChange: "transform" }}
        animate={{ opacity: isVisible ? 1 : 0, scale: ringScale }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        {showIcon && (
          <motion.span initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} className="grid place-items-center">
            <ChevronRight className="size-3 text-[#16C7FF]" aria-hidden="true" />
          </motion.span>
        )}
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 w-[350px] h-[350px] rounded-full bg-[#16C7FF]/[0.015] blur-[80px] pointer-events-none mix-blend-screen -translate-x-1/2 -translate-y-1/2 -z-10"
        style={{ x: cursorXSpring, y: cursorYSpring, willChange: "transform" }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 24 }}
      />

      <motion.div
        className="absolute top-0 left-0 size-1.5 rounded-full bg-[#16C7FF] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(22,199,255,0.8)]"
        style={{ x: cursorX, y: cursorY, willChange: "transform" }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isHovered ? 0.4 : 1 }}
        transition={{ duration: 0.12 }}
      />
    </div>
  );
}
