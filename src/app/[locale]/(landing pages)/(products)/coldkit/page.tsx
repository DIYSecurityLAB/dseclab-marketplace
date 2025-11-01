"use client";

import Footer from "@/components/footer";
import { HeroSection } from "@/components/lp_krux/hero-section";
import { PartnersMarquee } from "@/components/lp_krux/partners-marquee";
import { FeatureCardsSection } from "@/components/lp_krux/feature-cards-section";
import { TestimonialsSection } from "@/components/lp_krux/testimonials-section";
import { CtaBanner } from "@/components/lp_krux/cta-banner";
import { FaqSection } from "@/components/lp_krux/faq-section";

export default function ColdkitPage() {
  return (
    <div className="flex flex-col bg-black">
      <HeroSection />
      <PartnersMarquee />
      <FeatureCardsSection />
      <TestimonialsSection />
      <CtaBanner />
      <FaqSection />
    </div>
  );
}
