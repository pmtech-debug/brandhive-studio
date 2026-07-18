"use client";

import { ReactNode } from "react";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Cursor from "@/components/ui/Cursor";
import CinematicBackground from "@/components/backgrounds/CinematicBackground";
import FloatingChatbot from "@/components/ui/FloatingChatbot";
import ClientSetupProvider from "@/components/providers/ClientSetupProvider";
import ScrollProvider from "@/components/providers/ScrollProvider";
import PageTransitionProvider from "@/components/providers/PageTransitionProvider";

interface ClientOverlaysProps {
  children: ReactNode;
}

export default function ClientOverlays({ children }: ClientOverlaysProps) {
  return (
    <ScrollProvider>
      <ClientSetupProvider>
        <ScrollProgress />
        <div className="fixed inset-0 pointer-events-none z-[9999] grain-overlay" />
        <Cursor />
        <CinematicBackground />
        <PageTransitionProvider>{children}</PageTransitionProvider>
        <FloatingChatbot />
      </ClientSetupProvider>
    </ScrollProvider>
  );
}
