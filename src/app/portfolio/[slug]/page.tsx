import fs from "fs";
import path from "path";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectClient from "./ProjectClient";

const projectsData = [
  {
    slug: "uzee-tech",
    title: "UZEE TECH",
    folder: "UZEE TECH",
    category: "Branding & Web Development",
    shortDescription: "Premium digital identity and custom website development for a next-gen technology provider.",
    description: "BrandHive Studio created a cohesive and modern corporate brand system for UZEE TECH. We designed their brand identity mark, corporate stationery, promotional material, social media kits, and engineered a custom, high-speed corporate web platform to align with their forward-looking technology services.",
    cover: "/images/portfolio/covers/portfolio-uzee-tech-cover.png",
    logo: "/images/portfolio/UZEE%20TECH/01%20Logo/logo-icon.png",
    client: "Umar Farook",
    role: "Founder",
    year: "2026",
    deliverables: ["Brand Strategy", "Logo Design", "Stationery Design", "Social Media Kit", "Web Development"],
  },
  {
    slug: "qdx-express",
    title: "QDX Express",
    folder: "QDX Express",
    category: "Brand Identity & Logistics Design",
    shortDescription: "A complete branding system and visual strategy for a modern logistics company.",
    description: "For QDX Express, we crafted a high-energy brand identity reflecting speed, reliability, and precision. We created marketing assets, brand guidelines, vehicle wrap design layouts, and digital strategy packages to elevate their logistical operations.",
    cover: "/images/portfolio/covers/portfolio-qdx-express-cover.png",
    logo: "/images/portfolio/QDX%20Express/01%20Logo%20Design/Primary%20Logo.png",
    client: "QDX Logistics Ltd",
    role: "Corporate Client",
    year: "2025",
    deliverables: ["Brand Identity", "Vehicle Design", "Digital Strategy"],
  },
  {
    slug: "ruhunu-spice-food",
    title: "Ruhunu Spice & Food",
    folder: "Ruhunu Spice & Food",
    category: "Packaging & Brand Identity",
    shortDescription: "Authentic packaging designs and traditional brand identity for a premium spice manufacturer.",
    description: "We designed heritage-inspired packaging and a warm corporate identity for Ruhunu Spice & Food. We crafted label designs, traditional spice packets, business cards, menu cards, and corporate presentation packages highlighting premium natural quality.",
    cover: "/images/portfolio/covers/portfolio-ruhunu-spice-cover.png",
    logo: "/images/portfolio/Ruhunu%20Spice%20%26%20Food/01%20Logo%20Design/Ruhunu_Spice_Food_Logo.png",
    client: "Ruhunu Spice Exports",
    role: "Director of Brand",
    year: "2026",
    deliverables: ["Label Design", "Packaging Layouts", "Logo Identity", "Stationery Design"],
  },
  {
    slug: "mobicare",
    title: "Mobicare",
    folder: "Mobicare",
    category: "Branding & UI/UX Design",
    shortDescription: "Mobile repair service branding, social media assets, and UI/UX design concepts.",
    description: "We established a high-trust digital footprint for Mobicare. Our package included brand identity guidelines, marketing material, social media grids, and a modern website user interface concept that streamlines device repair booking.",
    cover: "/images/portfolio/covers/portfolio-mobicare-cover.png",
    logo: "/images/portfolio/Mobicare/01%20Logo%20Design/MOBICARE_Brand_Icon.png",
    client: "Mobicare Sri Lanka",
    role: "Operations Manager",
    year: "2025",
    deliverables: ["Logo Design", "Social Media Layouts", "UI/UX Design", "Website Concept"],
  },
  {
    slug: "seya-beauty-studio",
    title: "Seya Beauty Studio",
    folder: "Seya Beauty Studio",
    category: "Luxury Branding & UI/UX",
    shortDescription: "A high-end salon branding system, social media identity, and booking experience design.",
    description: "Seya Beauty Studio requested an elegant, clean, and premium identity system. We styled their typography palette, curated a clean pastel color theme, designed marketing assets, and configured a booking user experience layout that fits high-end luxury styling.",
    cover: "/images/portfolio/covers/portfolio-seya-beauty-cover.png",
    logo: "/images/portfolio/Seya%20Beauty%20Studio/01%20Logo%20Design/Seya_Beauty_Studio_Logo_Light.png",
    client: "Tharindi Jayasuriya",
    role: "Founder",
    year: "2026",
    deliverables: ["Brand Identity", "Luxury Logo", "Stationery Design", "Booking UI Concept"],
  },
  {
    slug: "leo-villas",
    title: "Leo Villas",
    folder: "Leo Villas",
    category: "Real Estate Branding & Identity",
    shortDescription: "Premium branding, print stationery, and property presentation materials for luxury villas.",
    description: "For Leo Villas, we developed a premium hospitality brand system. This covers real estate portfolio layouts, letterheads, business cards, estate brochures, and high-fidelity social presentation blocks created to attract high-end property investors.",
    cover: "/images/portfolio/covers/portfolio-leo-villas-cover.png",
    logo: "/images/portfolio/Leo%20Villas/01%20Logo%20Design/Leo_Villas_Official_Logo.png",
    client: "Ajay Kumar",
    role: "Owner",
    year: "2026",
    deliverables: ["Real Estate Branding", "Print Stationery", "Brochure Layouts", "Social Kits"],
  },
];

const ORDER_LIST = [
  "Logo Design",
  "Brand Identity",
  "Brand Identity Guidelines",
  "Stationery Design",
  "Website Design",
  "Store Showcase",
  "Social Media Campaigns",
  "Uniforms & Apparel",
  "Packaging & Brand Identity",
  "Menu Design"
];

function mapSectionTitle(dirName: string): string {
  const clean = dirName.replace(/^\d+\s+/, "").trim().toLowerCase();
  
  if (clean === "logo" || clean === "logo design") return "Logo Design";
  if (clean === "branding" || clean === "brand identity") return "Brand Identity";
  if (clean === "brand guidelines") return "Brand Identity Guidelines";
  if (clean === "stationery" || clean === "business card" || clean === "business" || clean === "stationery design") return "Stationery Design";
  if (clean === "website" || clean === "website design") return "Website Design";
  if (clean === "store" || clean === "showcase" || clean === "store showcase") return "Store Showcase";
  if (clean === "social media" || clean === "social media campaigns") return "Social Media Campaigns";
  if (clean === "uniforms & apparel") return "Uniforms & Apparel";
  if (clean === "packaging & brand identity") return "Packaging & Brand Identity";
  if (clean === "menu card" || clean === "menu design") return "Menu Design";
  
  return clean.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getProjectAssets(folderName: string) {
  const assetsDir = path.join(process.cwd(), "public", "images", "portfolio", folderName);

  if (!fs.existsSync(assetsDir)) {
    return [];
  }

  try {
    const subdirs = fs.readdirSync(assetsDir).filter((file) => {
      return fs.statSync(path.join(assetsDir, file)).isDirectory();
    });

    const sections = subdirs.map((dirName) => {
      const dirPath = path.join(assetsDir, dirName);
      
      const getAllFiles = (dir: string): string[] => {
        let results: string[] = [];
        if (!fs.existsSync(dir)) return [];
        const list = fs.readdirSync(dir);
        list.forEach((file) => {
          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);
          if (stat && stat.isDirectory()) {
            results = results.concat(getAllFiles(fullPath));
          } else {
            results.push(fullPath);
          }
        });
        return results;
      };

      const allFiles = getAllFiles(dirPath).filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".png", ".jpg", ".jpeg", ".webp", ".gif"].includes(ext);
      });

      const title = mapSectionTitle(dirName);
      const publicDir = path.join(process.cwd(), "public");
      const images = allFiles.map((file) => {
        const relativePath = path.relative(publicDir, file).replace(/\\/g, "/");
        // URL-encode each path segment so spaces and special chars (& etc.) work in browsers
        const encodedPath = relativePath
          .split("/")
          .map((seg) => encodeURIComponent(seg))
          .join("/");
        return "/" + encodedPath;
      });

      return {
        id: dirName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title,
        images,
      };
    });

    // Sort sections according to ORDER_LIST
    sections.sort((a, b) => {
      const idxA = ORDER_LIST.indexOf(a.title);
      const idxB = ORDER_LIST.indexOf(b.title);
      if (idxA === -1 && idxB === -1) return 0;
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });

    return sections;
  } catch (error) {
    console.error("Error reading project assets:", error);
    return [];
  }
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | BrandHive Studio",
    };
  }

  return {
    title: `${project.title} Case Study | BrandHive Studio`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} - Portfolio | BrandHive Studio`,
      description: project.shortDescription,
      images: [{ url: project.cover, width: 1200, height: 630, alt: `${project.title} Cover` }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - Portfolio | BrandHive Studio`,
      description: project.shortDescription,
      images: [project.cover],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const sections = getProjectAssets(project.folder);

  const currentIndex = projectsData.findIndex((p) => p.slug === slug);
  const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
  const nextIndex = (currentIndex + 1) % projectsData.length;

  const prevProject = projectsData[prevIndex];
  const nextProject = projectsData[nextIndex];

  return (
    <ProjectClient
      project={project}
      sections={sections}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
