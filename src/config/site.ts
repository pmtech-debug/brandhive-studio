export const siteConfig = {
  name: "BrandHive Studio",
  alternateNames: [
    "Brand Hive Studio",
    "BrandHiveStudio",
    "BrandHive",
    "Brand Hive"
  ],
  tagline: "Premium Branding & Web Design Agency",
  description: "BrandHive Studio is a premium creative design and web development agency.",
  url: "https://brandhivestudio.com.lk",
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
