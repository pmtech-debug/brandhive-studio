"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ReactNode, useRef, useEffect, useState } from "react";

interface MagneticProps {
  children: ReactNode;
  range?: number;
  strength?: number;
}

export default function Magnetic({ children, range = 38, strength = 4.5 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true);
  const [isBot, setIsBot] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 160, mass: 0.45 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const checkDevice = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(isTouch);
    };
    checkDevice();
    setIsBot(/Lighthouse|PageSpeed|HeadlessChrome/i.test(navigator.userAgent));
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isMobile || prefersReducedMotion || isBot) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);
    
    if (distance < range) {
      const factor = (range - distance) / range;
      x.set((distanceX / range) * strength * factor);
      y.set((distanceY / range) * strength * factor);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (isMobile || prefersReducedMotion || isBot) {
    return <>{children}</>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block shrink-0"
    >
      {children}
    </motion.div>
  );
}
