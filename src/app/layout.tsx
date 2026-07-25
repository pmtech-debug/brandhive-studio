import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import dynamic from "next/dynamic";

const ClientOverlays = dynamic(() => import("@/components/providers/ClientOverlays"), {
  loading: () => null,
});

const inter = Inter({subsets:['latin'],variable:'--font-sans', display: "swap"});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brandhivestudio.com"),
  title: {
    default: "BrandHive Studio | Premium Branding & Web Design Agency",
    template: "%s | BrandHive Studio"
  },
  description: "A premium creative design and development agency. We engineer custom brand identities, luxury packaging design, and high-performance React web applications.",
  keywords: ["branding", "web design", "web development", "UI/UX design", "logo design", "creative agency", "performance web development"],
  openGraph: {
    title: "BrandHive Studio | Premium Branding & Web Design Agency",
    description: "A premium creative design and development agency. We engineer custom brand identities, luxury packaging design, and high-performance web products.",
    url: "https://brandhivestudio.com",
    siteName: "BrandHive Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrandHive Studio | Premium Branding & Web Design Agency",
    description: "A premium creative design and development agency. We engineer custom brand identities, luxury packaging design, and high-performance web products.",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico" }
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { rel: "manifest", url: "/favicon/site.webmanifest" }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans dark", inter.variable)} style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/images/hero/devices/hero-laptop-website-presentation.webp" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-[#F5F7FA] bg-[#050608] selection:bg-[#16C7FF]/20 selection:text-[#16C7FF]`}
        suppressHydrationWarning
      >
        <LoadingScreen />
        <Header />
        <ClientOverlays>
          {children}
        </ClientOverlays>
        <Footer />
      </body>
    </html>
  );
}
