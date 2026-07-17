"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "dot" | "pixel" | "node";
}

export default function CinematicBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate particles only on the client side to avoid hydration mismatches
  useEffect(() => {
    const types: ("dot" | "pixel" | "node")[] = ["dot", "pixel", "node"];
    const generated: Particle[] = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 3 + 1.5, // px
      duration: Math.random() * 20 + 20, // seconds
      delay: Math.random() * -30, // negative delay so they start pre-animated
      type: types[i % 3],
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 w-full h-full bg-[#050608] overflow-hidden pointer-events-none select-none">
      {/* 1. Faint Blueprint Grid */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.35]" />

      {/* 2. Floating Atmospheric Glowing Lights (Mesh Gradient Effect) */}
      <motion.div
        animate={{
          x: [0, 15, -8, 0],
          y: [0, -10, 8, 0],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[5%] w-[45vw] h-[45vw] min-w-[350px] rounded-full bg-[#16C7FF]/4.5 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -12, 15, 0],
          y: [0, 15, -10, 0],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-15%] right-[10%] w-[50vw] h-[50vw] min-w-[400px] rounded-full bg-[#0A1128]/45 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, 10, -8, 0],
          y: [0, 8, 5, 0],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] left-[35%] w-[35vw] h-[35vw] min-w-[300px] rounded-full bg-[#001F3F]/35 blur-[130px]"
      />

      {/* 3. Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "105vh", x: `${p.x}vw`, opacity: 0 }}
            animate={{
              y: "-5vh",
              opacity: [0, 0.4, 0.4, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              borderRadius: p.type === "pixel" ? "0%" : "50%",
              backgroundColor: p.type === "node" ? "transparent" : "#16C7FF",
              border: p.type === "node" ? "1px solid rgba(22, 199, 255, 0.8)" : "none",
              filter: "blur(0.2px)",
              boxShadow: p.type === "node" ? "none" : "0 0 8px rgba(22, 199, 255, 0.6)",
            }}
          />
        ))}
      </div>

      {/* Subtle grid line light sweep */}
      <motion.div
        animate={{
          y: ["-20%", "120%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 8,
        }}
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#16C7FF]/8 to-transparent pointer-events-none blur-[1px]"
      />

      {/* 4. Vignette Shadow Overlay (Depth Layer) */}
      <div className="absolute inset-0 cinematic-vignette" />
    </div>
  );
}
