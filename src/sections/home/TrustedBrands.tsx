"use client";

import Image from "next/image";
import uzeeTechLogo from "../../../public/images/portfolio/UZEE TECH/01 Logo/logo-icon.png";
import qdxExpressLogo from "../../../public/images/portfolio/QDX Express/01 Logo Design/Primary Logo.png";
import leoVillasLogo from "../../../public/images/portfolio/Leo Villas/01 Logo Design/Leo_Villas_Official_Logo.png";
import seyaBeautyStudioLogo from "../../../public/images/portfolio/Seya Beauty Studio/01 Logo Design/Seya_Beauty_Studio_Logo_Light.png";
import ruhunuSpiceFoodLogo from "../../../public/images/portfolio/Ruhunu Spice & Food/01 Logo Design/Ruhunu_Spice_Food_Logo.png";
import mobicareLogo from "../../../public/images/portfolio/Mobicare/01 Logo Design/MOBICARE_Brand_Icon.png";
import { motion, Variants, useReducedMotion } from "framer-motion";
import Container from "@/components/layout/Container";

const brands = [
  {
    name: "UZEE TECH",
    logo: uzeeTechLogo,
  },
  {
    name: "QDX Express",
    logo: qdxExpressLogo,
  },
  {
    name: "Leo Villas",
    logo: leoVillasLogo,
  },
  {
    name: "Seya Beauty Studio",
    logo: seyaBeautyStudioLogo,
  },
  {
    name: "Ruhunu Spice & Food",
    logo: ruhunuSpiceFoodLogo,
  },
  {
    name: "Mobicare",
    logo: mobicareLogo,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

export default function TrustedBrands() {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 0.7,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  return (
    <div className="relative py-14 bg-transparent overflow-hidden">
      {/* Top Divider with subtle glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[6px] bg-[#16C7FF]/10 blur-[4px] rounded-full pointer-events-none" />

      {/* Bottom Divider with subtle glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-[6px] bg-[#16C7FF]/10 blur-[4px] rounded-full pointer-events-none" />

      <Container>
        <div className="flex flex-col items-center gap-8 max-w-[1200px] mx-auto">
          {/* Section Heading */}
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-white/40 uppercase text-center block">
            Trusted by ambitious brands worldwide
          </span>
          
          {/* Grid items container */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 w-full"
            data-cursor-hover
          >
            {brands.map((brand) => (
              <motion.div
                key={brand.name}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  opacity: 1
                }}
                className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-[#16C7FF]/35 hover:shadow-[0_0_20px_rgba(22,199,255,0.15),0_8px_24px_rgba(0, 0, 0, 0.1)] backdrop-blur-[2px] py-4 px-6 flex items-center justify-center cursor-pointer transition-all duration-300 ease-out shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative size-[38px] transition-all duration-300 ease-out group-hover:brightness-110">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} Logo`}
                      fill
                      className="object-contain"
                      sizes="38px"
                      loading="lazy"
                      placeholder="blur"
                    />
                  </div>
                  <span className="text-sm font-extrabold text-white/50 tracking-wider uppercase leading-none transition-colors duration-300 group-hover:text-white/90">
                    {brand.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Metrics Supporting Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/35 mt-2 tracking-wide font-medium">
            <span>50+ Projects</span>
            <span className="text-[#16C7FF]/40 font-bold">•</span>
            <span>25+ Clients</span>
            <span className="text-[#16C7FF]/40 font-bold">•</span>
            <span>Serving Sri Lanka &amp; Worldwide</span>
          </div>

        </div>
      </Container>
    </div>
  );
}
