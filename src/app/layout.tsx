import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import dynamic from "next/dynamic";
import { SpeedInsights } from "@vercel/speed-insights/next";

const ClientOverlays = dynamic(() => import("@/components/providers/ClientOverlays"), {
  loading: () => null,
});

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: "swap" });

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

// Viewport must be exported separately in Next.js 15 App Router
// maximum-scale must NOT be 1 — that blocks user accessibility zoom
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050608",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://brandhivestudio.com.lk"),
  alternates: {
    canonical: "https://brandhivestudio.com.lk",
  },
  title: {
    default: "BrandHive Studio | Premium Branding & Web Design Agency",
    template: "%s | BrandHive Studio"
  },
  description: "A premium creative design and development agency. We engineer custom brand identities, luxury packaging design, and high-performance React web applications.",
  keywords: ["branding", "web design", "web development", "UI/UX design", "logo design", "creative agency", "performance web development"],
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "BrandHive Studio | Premium Branding & Web Design Agency",
    description: "A premium creative design and development agency. We engineer custom brand identities, luxury packaging design, and high-performance web products.",
    url: "https://brandhivestudio.com.lk",
    siteName: "BrandHive Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://brandhivestudio.com.lk/og-image.png",
        width: 1200,
        height: 630,
        alt: "BrandHive Studio — Premium Branding & Web Design Agency",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrandHive Studio | Premium Branding & Web Design Agency",
    description: "A premium creative design and development agency. We engineer custom brand identities, luxury packaging design, and high-performance web products.",
    images: ["https://brandhivestudio.com.lk/og-image.png"],
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
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "BrandHive Studio",
    "image": "https://brandhivestudio.com.lk/favicon/brandhive-logo-master.png",
    "@id": "https://brandhivestudio.com.lk/#website",
    "url": "https://brandhivestudio.com.lk",
    "telephone": "+94706410093",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Colombo",
      "addressRegion": "Western Province",
      "addressCountry": "LK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.9271,
      "longitude": 79.8612
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://wa.me/94706410093",
      "https://brandhivestudio.com.lk"
    ]
  };

  return (
    <html lang="en" className={cn("font-sans dark", inter.variable)} style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <head>
        {/* Preload LCP hero image at highest browser priority */}
        <link
          rel="preload"
          as="image"
          href="/_next/image?url=%2Fimages%2Fhero%2Fdevices%2Fhero-laptop-website-presentation.webp&w=828&q=75"
          type="image/webp"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-[#F5F7FA] bg-[#050608] selection:bg-[#16C7FF]/20 selection:text-[#16C7FF]`}
        suppressHydrationWarning
      >
        <LoadingScreen />
        <Header />
        <ClientOverlays>
          <main id="main-content">
            {children}
          </main>
        </ClientOverlays>
        <Footer />
        <SpeedInsights />
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-S2Z1B36031"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-S2Z1B36031');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
