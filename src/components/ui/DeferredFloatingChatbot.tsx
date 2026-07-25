"use client";


import dynamic from "next/dynamic";

const FloatingChatbot = dynamic(() => import("@/components/ui/FloatingChatbot"), { ssr: false });

export default function DeferredFloatingChatbot() {
  return <FloatingChatbot />;
}
