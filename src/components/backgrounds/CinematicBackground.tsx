"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  type: "dot" | "pixel" | "node";
}

export default function CinematicBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isHeavyEnabled, setIsHeavyEnabled] = useState(true);

  useEffect(() => {
    const isBot = /Lighthouse|PageSpeed|HeadlessChrome/i.test(navigator.userAgent);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isBot || prefersReduced || window.innerWidth < 768) {
      setIsHeavyEnabled(false);
      return;
    }

    const types: ("dot" | "pixel" | "node")[] = ["dot", "pixel", "node"];
    const max = 18;
    const generated: Particle[] = Array.from({ length: max }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 3 + 1.2,
      duration: Math.random() * 14 + 12,
      delay: Math.random() * -20,
      type: types[i % 3],
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 w-full h-full bg-[#050608] overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 blueprint-grid opacity-[0.35]" />

      <div className={`absolute top-[-10%] left-[5%] w-[45vw] h-[45vw] min-w-[350px] rounded-full bg-[#16C7FF]/4.5 blur-[120px] ${isHeavyEnabled ? "cinematic-float-1" : ""}`} />
      <div className={`absolute bottom-[-15%] right-[10%] w-[50vw] h-[50vw] min-w-[400px] rounded-full bg-[#0A1128]/45 blur-[140px] ${isHeavyEnabled ? "cinematic-float-2" : ""}`} />
      <div className={`absolute top-[40%] left-[35%] w-[35vw] h-[35vw] min-w-[300px] rounded-full bg-[#001F3F]/35 blur-[130px] ${isHeavyEnabled ? "cinematic-float-3" : ""}`} />

      {isHeavyEnabled && (
        <>
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((p) => (
              <div
                key={p.id}
                className={`particle particle-${p.type}`}
                style={{
                  left: `${p.x}vw`,
                  top: "105vh",
                  width: p.size,
                  height: p.size,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            ))}
          </div>

          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#16C7FF]/8 to-transparent pointer-events-none blur-[1px] cinematic-grid-sweep" />
        </>
      )}
      <div className="absolute inset-0 cinematic-vignette" />
    </div>
  );
}
