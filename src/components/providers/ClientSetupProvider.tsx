"use client";

import { useEffect, ReactNode } from "react";
import Toast from "@/components/ui/Toast";

interface ClientSetupProviderProps {
  children: ReactNode;
}

export default function ClientSetupProvider({ children }: ClientSetupProviderProps) {
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      while (target && target !== document.body) {
        if (target.tagName === "A") {
          const href = target.getAttribute("href") || "";
          if (href.startsWith("mailto:")) {
            e.preventDefault();
            const email = href.replace("mailto:", "");
            navigator.clipboard.writeText(email).then(() => {
              window.dispatchEvent(new CustomEvent("show-toast", {
                detail: { message: "Email copied to clipboard!" }
              }));
            });
            break;
          }
        }
        target = target.parentElement;
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  return (
    <>
      {children}
      <Toast />
    </>
  );
}
