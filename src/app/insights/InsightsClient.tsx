"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroDivider from "@/components/ui/HeroDivider";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/cards/Card";

const categories = ["All", "Branding", "Web Design", "Logo Design", "Marketing", "Business Growth"];

const articles = [
  {
    title: "The Core Elements of a Timeless Logo Design",
    description: "Discover the rules of visual balance, semantic meaning, and layout proportions that make corporate logomarks memorable.",
    image: "/images/insights/insights-logo-design.png",
    category: "Logo Design",
    date: "July 08, 2026",
    readTime: "5 min read",
  },
  {
    title: "Strategic Branding: How to Stand Out in Crowded Markets",
    description: "Learn how to build customer trust and distinct positioning by aligning design assets with business goals.",
    image: "/images/insights/insights-branding.png",
    category: "Branding",
    date: "July 01, 2026",
    readTime: "7 min read",
  },
  {
    title: "Scaling Customer Acquisition via Strategic Meta Ads",
    description: "Maximize your campaign conversions by deploying optimized visual assets, audiences, and performance indicators.",
    image: "/images/insights/insights-marketing.png",
    category: "Marketing",
    date: "June 25, 2026",
    readTime: "6 min read",
  },
  {
    title: "Curating Social Media Grids for High-End Engagement",
    description: "A comprehensive guide on styling typography grids and pastels color palettes to attract high-paying leads.",
    image: "/images/insights/insights-social-media.png",
    category: "Social Media",
    date: "June 18, 2026",
    readTime: "4 min read",
  },
  {
    title: "Positioning Your Tech Startup for Sustainable Growth",
    description: "How early stage SaaS and service agencies combine modern architectures and robust branding to scale.",
    image: "/images/insights/insights-business-growth.png",
    category: "Business Growth",
    date: "June 10, 2026",
    readTime: "8 min read",
  },
];

export default function InsightsClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-transparent pt-32 pb-16 relative">
      {/* Volumetric Lights */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] right-[10%] w-[380px] h-[380px] rounded-full bg-[#16C7FF]/4 blur-[110px]" />
        <div className="absolute top-[60%] left-[5%] w-[320px] h-[320px] rounded-full bg-blue-500/3 blur-[95px]" />
      </div>
      
      {/* 1. Hero Section */}
      <Section className="relative overflow-hidden pb-8 lg:pb-12 bg-transparent">
        <Container>
          <div className="flex flex-col gap-6 max-w-4xl">
            <Badge
              variant="secondary"
              className="w-fit px-3.5 py-1.5 text-xs font-semibold rounded-full border border-white/10 bg-[#11161C]/50 text-[#16C7FF] backdrop-blur-md tracking-wider uppercase shadow-[0_0_15px_rgba(22,199,255,0.05)]"
            >
              Our Insights
            </Badge>
            <Heading level="h1" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white border-none pb-0">
              Perspectives on <br />
              <span className="text-[#16C7FF] bg-clip-text bg-gradient-to-r from-[#16C7FF] to-blue-500">Design & Technology.</span>
            </Heading>
            <Text className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-3xl font-normal">
              Discover guides, strategies, and case insights written by our design and development specialists.
            </Text>
          </div>
        </Container>
      </Section>

      <HeroDivider />

      {/* 2. Featured Article Spot */}
      <Section className="py-8 bg-transparent">
        <Container>
          <div className="relative w-full rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-[#11161C]/55 overflow-hidden shadow-2xl hover:border-[#16C7FF]/20 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">
              
              {/* Image Column */}
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-video w-full bg-neutral-900 overflow-hidden">
                <Image
                  src="/images/insights/insights-web-design.png"
                  alt="Featured Article - Apple minimalism in web design"
                  fill
                  className="object-cover opacity-90 transition-opacity duration-300 hover:opacity-100"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>

              {/* Details Column */}
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col gap-5">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#16C7FF]">
                  <span>Featured Post</span>
                  <span className="size-1 rounded-full bg-white/10" />
                  <span>Web Design</span>
                </div>
                <Heading level="h2" className="text-2xl sm:text-3xl font-extrabold text-white border-none pb-0 leading-tight">
                  Why Apple-Inspired Minimalism Dominates Web Design
                </Heading>
                <Text className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
                  An in-depth exploration of visual spacing, typography hierarchies, and grid layouts that drive visitor conversions and customer retention.
                </Text>
                <div className="flex items-center justify-between text-xs font-bold text-white/50 mt-2">
                  <span>July 12, 2026</span>
                  <span>9 min read</span>
                </div>
              </div>

            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Search and Category Filter Row */}
      <Section className="py-12 bg-transparent border-t border-white/5">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            {/* Category chips list */}
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-[#16C7FF] to-[#0096C7] border-none text-[#050608] shadow-[0_0_15px_rgba(22,199,255,0.25)]"
                      : "bg-[#11161C]/50 border-white/10 text-white/60 hover:border-[#16C7FF]/30 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Simple search box */}
            <div className="relative w-full md:max-w-xs shrink-0">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                aria-label="Search articles"
                id="search-articles-input"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-white/10 bg-[#050608]/40 text-[#F5F7FA] placeholder-white/30 text-sm focus:outline-none focus:border-[#16C7FF]/40 focus:ring-2 focus:ring-[#16C7FF]/10 transition-all"
              />
              <svg className="absolute left-3.5 top-3.5 size-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Grid list of posts */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <Text className="text-white/50">No articles found matching your criteria.</Text>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((post, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                  className="h-full"
                >
                  <Card className="flex flex-col h-full overflow-hidden p-0 rounded-[2rem] border border-white/10 bg-[#11161C]/55 backdrop-blur-md shadow-lg hover:border-[#16C7FF]/20 hover:shadow-[0_15px_30px_rgba(22,199,255,0.04)] transition-all duration-300">
                    {/* Cover image */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-900">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover opacity-90 transition-opacity duration-300 hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Metadata Header */}
                    <CardHeader className="p-8 pb-3">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge
                          variant="secondary"
                          className="px-2.5 py-0.5 text-[9px] font-bold rounded-full border border-white/10 bg-[#11161C]/50 text-[#16C7FF]"
                        >
                          {post.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg font-extrabold text-white leading-tight">
                        {post.title}
                      </CardTitle>
                    </CardHeader>

                    {/* Content Body */}
                    <CardContent className="p-8 pt-0 flex-grow flex flex-col justify-between gap-6">
                      <CardDescription className="text-sm text-white/60 leading-relaxed font-normal">
                        {post.description}
                      </CardDescription>
                      
                      <div className="flex items-center justify-between text-[10px] font-bold text-white/40 uppercase tracking-wider pt-4 border-t border-white/5">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* 4. Newsletter Subscription Form */}
      <Section className="py-12 pb-20 bg-transparent border-t border-white/5">
        <Container>
          <div className="relative w-full rounded-[2rem] sm:rounded-[2.5rem] bg-[#11161C]/55 backdrop-blur-md p-8 sm:p-12 md:p-16 overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute inset-0 blueprint-grid opacity-[0.25] pointer-events-none" />
            <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#16C7FF]/15 blur-[90px] pointer-events-none animate-pulse" style={{ animationDuration: "6s" }} />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#16C7FF]/15 blur-[90px] pointer-events-none animate-pulse" style={{ animationDuration: "7s" }} />
            
            <div className="relative flex flex-col items-center text-center gap-6 max-w-2xl mx-auto z-10">
              <Badge
                variant="secondary"
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full border border-white/10 bg-[#11161C]/50 text-[#16C7FF]"
              >
                STAY INFORMED
              </Badge>
              <Heading level="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white border-none pb-0">
                Subscribe to our Newsletter
              </Heading>
              <Text className="text-white/70 text-sm sm:text-base leading-relaxed font-normal">
                Join modern builders. Get premium design resources, layout guidelines, and SEO checklists directly to your inbox.
              </Text>
              
              {/* Form Input */}
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  aria-label="Email address for newsletter"
                  id="newsletter-subscription-email"
                  className="flex-grow px-5 py-3 rounded-full border border-white/10 bg-[#050608]/40 text-[#F5F7FA] placeholder-white/30 text-sm focus:outline-none focus:border-[#16C7FF]/40 focus:ring-2 focus:ring-[#16C7FF]/10 transition-all"
                  required
                />
                <Button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-[#16C7FF] to-[#0096C7] text-[#050608] font-bold px-6 py-3 cursor-pointer shrink-0 transition-all hover:from-[#60D6FF] hover:to-[#16C7FF] shadow-[0_0_15px_rgba(22,199,255,0.2)]"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </Section>

    </main>
  );
}
