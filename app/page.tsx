import { Hero } from "@/components/sections/Hero";
import { OfferGrid } from "@/components/sections/OfferGrid";
import { WhyUs } from "@/components/sections/WhyUs";
import { GalleryStrip } from "@/components/sections/GalleryStrip";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqTeaser } from "@/components/sections/FaqTeaser";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <OfferGrid />
      <WhyUs />
      <GalleryStrip />
      <PricingTeaser />
      <Testimonials />
      <FaqTeaser />
      <CtaBanner />
    </>
  );
}
