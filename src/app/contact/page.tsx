import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | BrandHive Studio",
  description: "Get in touch with BrandHive Studio. Let's build something incredible together. Reach out for creative branding, UI/UX design, and fast next-gen web development solutions.",
  openGraph: {
    title: "Contact Us | BrandHive Studio",
    description: "Get in touch with BrandHive Studio. Let's build something incredible together.",
    type: "website",
    url: "https://brandhivestudio.com/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | BrandHive Studio",
    description: "Get in touch with BrandHive Studio. Let's build something incredible together.",
  }
};

export default function Page() {
  return <ContactClient />;
}
