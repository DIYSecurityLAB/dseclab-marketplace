"use client";

import Footer from "@/components/footer";
import { HeroSection } from "@/components/lp_jade/hero-section";
import { PartnersMarquee } from "@/components/lp_jade/partners-marquee";
import { FeatureCardsSection } from "@/components/lp_jade/feature-cards-section";
import { TestimonialsSection } from "@/components/lp_jade/testimonials-section";
import { CtaBanner } from "@/components/lp_jade/cta-banner";
import { FaqSection } from "@/components/lp_jade/faq-section";

export default function JadePage() {
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
