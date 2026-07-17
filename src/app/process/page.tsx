import type { Metadata } from "next";
import ProcessClient from "./ProcessClient";

export const metadata: Metadata = {
  title: "Our Process | BrandHive Studio",
  description: "Learn more about our systematic branding, design, and development process. From initial discovery to deployment, we engineer visually premium and fast web products.",
  openGraph: {
    title: "Our Process | BrandHive Studio",
    description: "Learn more about our systematic design and development process.",
    type: "website",
    url: "https://brandhivestudio.com/process",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Process | BrandHive Studio",
    description: "Learn more about our systematic design and development process.",
  }
};

export default function Page() {
  return <ProcessClient />;
}
