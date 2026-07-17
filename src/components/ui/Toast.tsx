"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast() {
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  useEffect(() => {
    const handleShowToast = (e: Event) => {
      const customEvent = e as CustomEvent;
      setToast({ 
        message: customEvent.detail.message, 
        type: customEvent.detail.type || "success" 
      });
      
      const timer = setTimeout(() => setToast(null), 2800);
      return () => clearTimeout(timer);
    };

    window.addEventListener("show-toast", handleShowToast);
    return () => window.removeEventListener("show-toast", handleShowToast);
  }, []);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="fixed bottom-6 right-6 z-[999999] px-6 py-3.5 rounded-2xl border border-white/10 bg-[#11161C]/85 backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(22,199,255,0.06)] flex items-center gap-3 pointer-events-auto select-none"
        >
          <div className="size-5 rounded-full bg-[#16C7FF]/10 flex items-center justify-center text-[#16C7FF]">
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-xs font-bold tracking-wide text-white">
            {toast.message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
