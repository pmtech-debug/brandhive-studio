import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | BrandHive Studio",
  description: "Get in touch with BrandHive Studio. Let's build something incredible together. Reach out for creative branding, UI/UX design, and fast next-gen web development solutions.",
  keywords: [
    "BrandHive Studio",
    "Brand Hive Studio",
    "BrandHive",
    "Brand Hive",
    "Contact BrandHive Studio",
    "hire creative agency"
  ],
  alternates: { canonical: "https://brandhivestudio.com.lk/contact" },
  openGraph: {
    title: "Contact Us | BrandHive Studio",
    description: "Get in touch with BrandHive Studio. Let's build something incredible together.",
    type: "website",
    url: "https://brandhivestudio.com.lk/contact",
    images: [{ url: "https://brandhivestudio.com.lk/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | BrandHive Studio",
    description: "Get in touch with BrandHive Studio. Let's build something incredible together.",
    images: ["https://brandhivestudio.com.lk/og-image.png"],
  }
};

export default function Page() {
  return <ContactClient />;
}
