import ColkitPromovideo from "@/components/landing/coldkit_promovideo";
import FeatureSlide from "@/components/landing/feature-slide";
import HeroDesktop from "@/components/landing/hero_desktop";
import HeroMobile from "@/components/landing/hero_mobile";
import InfluencerVideos from "@/components/landing/influencer-videos";
import ProductScroller from "@/components/landing/product-scroller";
import TransactionShowcase from "@/components/landing/transaction-showcase";
import Testimonials from "@/components/landing/testimonials";
import AlfredP2P from "@/components/landing/alfred-p2p";
import { getProducts } from "@/actions/products";
import { partners, featureSlides } from "@/config/landing.config";
import { CommunitySection } from "@/components/landing/community-section";

export default async function Home() {
  const result = await getProducts();
  const products = result.success
    ? (result.data as any).products.edges.map(({ node }: any) => node)
    : [];

  return (
    <div className="flex flex-col gap-20 w-full">
      <HeroDesktop />
      <HeroMobile />
      <InfluencerVideos />
      <ColkitPromovideo />
      <TransactionShowcase />
      <FeatureSlide slides={featureSlides} />
      <ProductScroller products={products} />
      <Testimonials />
      <AlfredP2P partners={partners} />
      <CommunitySection />
    </div>
  );
}
