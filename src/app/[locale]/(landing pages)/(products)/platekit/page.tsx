"use client";

import Footer from "@/components/footer";
import { HeroSection } from "@/components/lp_platekit/hero-section";
import { PartnersMarquee } from "@/components/lp_platekit/partners-marquee";
import { FeatureCardsSection } from "@/components/lp_platekit/feature-cards-section";
import { TestimonialsSection } from "@/components/lp_platekit/testimonials-section";
import { CtaBanner } from "@/components/lp_platekit/cta-banner";
import { FaqSection } from "@/components/lp_platekit/faq-section";
import { CrossSell } from "@/components/lp_platekit/cross-sell";

export default function ColdkitPage() {
  return (
    <div className="flex flex-col bg-black">
      <HeroSection />
      <PartnersMarquee />
      <FeatureCardsSection />
      <TestimonialsSection />
      <CtaBanner />
      <CrossSell />
      <FaqSection />
    </div>
  );
}
