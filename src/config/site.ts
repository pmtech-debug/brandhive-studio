export const siteConfig = {
  name: "BrandHive Studio",
  tagline: "Premium Branding & Web Design Agency",
  description: "We design premium brands, websites, and digital experiences that help businesses grow with confidence.",
  url: "https://brandhivestudio.com", // Placeholder URL
  metadata: {
    defaultTitle: "BrandHive Studio | Premium Branding & Web Design Agency",
    titleTemplate: "%s | BrandHive Studio",
    defaultDescription: "We design premium brands, websites, and digital experiences that help businesses grow with confidence.",
  },
  links: {
    twitter: "https://twitter.com/brandhivestudio",
    github: "https://github.com/brandhivestudio",
    linkedin: "https://linkedin.com/company/brandhivestudio",
  },
} as const;

export type SiteConfig = typeof siteConfig;
export default siteConfig;
