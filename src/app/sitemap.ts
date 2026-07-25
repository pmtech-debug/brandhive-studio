import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://brandhivestudio.com.lk";

  // Static routes
  const routes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/process",
    "/insights",
    "/contact",
  ];

  // Dynamic portfolio slugs
  const portfolioSlugs = [
    "uzee-tech",
    "qdx-express",
    "ruhunu-spice-food",
    "mobicare",
    "seya-beauty-studio",
    "leo-villas",
    "vista-travels-and-tours",
    "bethel-ceylon-tours",
    "hardware-store",
    "hotel-management-system",
    "hr-automation-system",
    "thanking-notes-app",
    "caravan-fresh-cafeteria",
    "payment-management-system",
    "mathi-quiz-game",
    "blossom-task",
  ];

  const staticUrls = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const dynamicUrls = portfolioSlugs.map((slug) => ({
    url: `${baseUrl}/portfolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticUrls, ...dynamicUrls];
}
