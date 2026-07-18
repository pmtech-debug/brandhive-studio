"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const FloatingChatbot = dynamic(() => import("@/components/ui/FloatingChatbot"), { ssr: false });

export default function DeferredFloatingChatbot() {
  const [open, setOpen] = useState(false);

  if (open) {
    return <FloatingChatbot />;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
      <button
        aria-label="Open chat"
        onClick={() => setOpen(true)}
        className="size-12 rounded-full bg-[#16C7FF] text-[#050608] grid place-items-center shadow-lg"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#050608" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
