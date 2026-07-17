import dynamic from "next/dynamic";
import Hero from "@/sections/home/Hero";
import TrustedBrands from "@/sections/home/TrustedBrands";

// Code-split heavy below-the-fold sections to boost LCP and TBT
const About = dynamic(() => import("@/sections/home/About"), { ssr: true });
const Services = dynamic(() => import("@/sections/home/Services"), { ssr: true });
const Portfolio = dynamic(() => import("@/sections/home/Portfolio"), { ssr: true });
const Stats = dynamic(() => import("@/sections/home/Stats"), { ssr: true });
const Process = dynamic(() => import("@/sections/home/Process"), { ssr: true });
const Testimonials = dynamic(() => import("@/sections/home/Testimonials"), { ssr: true });
const CTA = dynamic(() => import("@/sections/home/CTA"), { ssr: true });

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBrands />
      <About />
      <Services />
      <Portfolio />
      <Stats />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
