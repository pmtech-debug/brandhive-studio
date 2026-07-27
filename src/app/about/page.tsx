import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | BrandHive Studio",
  description: "Learn more about BrandHive Studio, a premium branding, design, and web development agency. We combine visual artistry with strategic engineering to scale modern brands.",
  keywords: [
    "BrandHive Studio",
    "Brand Hive Studio",
    "BrandHive",
    "Brand Hive",
    "About BrandHive Studio",
    "branding agency Sri Lanka"
  ],
  alternates: { canonical: "https://brandhivestudio.com.lk/about" },
  openGraph: {
    title: "About Us | BrandHive Studio",
    description: "Learn more about BrandHive Studio, a premium branding, design, and web development agency.",
    type: "website",
    url: "https://brandhivestudio.com.lk/about",
    images: [{ url: "https://brandhivestudio.com.lk/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | BrandHive Studio",
    description: "Learn more about BrandHive Studio, a premium branding, design, and web development agency.",
    images: ["https://brandhivestudio.com.lk/og-image.png"],
  }
};

export default function Page() {
  return <AboutClient />;
}
