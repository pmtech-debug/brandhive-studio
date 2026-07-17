import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services | BrandHive Studio",
  description: "Bespoke digital services including brand strategy, luxury logo design, fast web development, and performance marketing designed to scale modern businesses.",
  openGraph: {
    title: "Our Services | BrandHive Studio",
    description: "Bespoke digital services including brand strategy, logo design, and high-performance development.",
    type: "website",
    url: "https://brandhivestudio.com/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | BrandHive Studio",
    description: "Bespoke digital services including brand strategy, logo design, and high-performance development.",
  }
};

export default function Page() {
  return <ServicesClient />;
}
