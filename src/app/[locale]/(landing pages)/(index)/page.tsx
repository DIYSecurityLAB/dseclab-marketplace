import ColkitPromovideo from "@/components/lp_index/coldkit_promovideo";
import FeatureSlide from "@/components/lp_index/feature-slide";
import HeroDesktop from "@/components/lp_index/hero_desktop";
import HeroMobile from "@/components/lp_index/hero_mobile";
import InfluencerVideos from "@/components/lp_index/influencer-videos";
import ProductScroller from "@/components/lp_index/product-scroller";
import TransactionShowcase from "@/components/lp_index/transaction-showcase";
import Testimonials from "@/components/lp_index/testimonials";
import AlfredP2P from "@/components/lp_index/alfred-p2p";
import { getProducts } from "@/actions/products";
import { partners, featureSlides } from "@/config/landing.config";
import { CommunitySection } from "@/components/lp_index/community-section";

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
