import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Our Work & Case Studies | BrandHive Studio",
  description: "Explore the BrandHive Studio design and development portfolio. Read our featured case studies detailing custom corporate identities, luxury packaging design, and modern web engineering.",
  openGraph: {
    title: "Our Work & Case Studies | BrandHive Studio",
    description: "Explore the BrandHive Studio design and development portfolio.",
    type: "website",
    url: "https://brandhivestudio.com/portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work & Case Studies | BrandHive Studio",
    description: "Explore the BrandHive Studio design and development portfolio.",
  }
};

export default function Page() {
  return <PortfolioClient />;
}
