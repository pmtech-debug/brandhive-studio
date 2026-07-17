import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | BrandHive Studio",
  description: "Learn more about BrandHive Studio, a premium branding, design, and web development agency. We combine visual artistry with strategic engineering to scale modern brands.",
  openGraph: {
    title: "About Us | BrandHive Studio",
    description: "Learn more about BrandHive Studio, a premium branding, design, and web development agency.",
    type: "website",
    url: "https://brandhivestudio.com/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | BrandHive Studio",
    description: "Learn more about BrandHive Studio, a premium branding, design, and web development agency.",
  }
};

export default function Page() {
  return <AboutClient />;
}
