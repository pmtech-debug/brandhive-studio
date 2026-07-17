import type { Metadata } from "next";
import InsightsClient from "./InsightsClient";

export const metadata: Metadata = {
  title: "Insights & Perspectives | BrandHive Studio",
  description: "Read the latest design guides, branding strategies, and technical insights from BrandHive Studio's specialists. Learn how to optimize UX and scale your brand.",
  openGraph: {
    title: "Insights & Perspectives | BrandHive Studio",
    description: "Read the latest design guides, branding strategies, and technical insights from BrandHive Studio.",
    type: "website",
    url: "https://brandhivestudio.com/insights",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Perspectives | BrandHive Studio",
    description: "Read the latest design guides, branding strategies, and technical insights from BrandHive Studio.",
  }
};

export default function Page() {
  return <InsightsClient />;
}
