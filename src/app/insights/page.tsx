import type { Metadata } from "next";
import InsightsClient from "./InsightsClient";

export const metadata: Metadata = {
  title: "Insights & Perspectives | BrandHive Studio",
  description: "Read the latest design guides, branding strategies, and technical insights from BrandHive Studio's specialists. Learn how to optimize UX and scale your brand.",
  alternates: { canonical: "https://brandhivestudio.com.lk/insights" },
  openGraph: {
    title: "Insights & Perspectives | BrandHive Studio",
    description: "Read the latest design guides, branding strategies, and technical insights from BrandHive Studio.",
    type: "website",
    url: "https://brandhivestudio.com.lk/insights",
    images: [{ url: "https://brandhivestudio.com.lk/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Perspectives | BrandHive Studio",
    description: "Read the latest design guides, branding strategies, and technical insights from BrandHive Studio.",
    images: ["https://brandhivestudio.com.lk/og-image.png"],
  }
};

export default function Page() {
  return <InsightsClient />;
}
