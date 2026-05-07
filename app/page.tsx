import { getAllPackages } from "@/lib/queries";
import Hero from "@/components/home/Hero";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import WhatWeInclude from "@/components/home/WhatWeInclude";
import Testimonials from "@/components/home/TestimonialsCarousel";
import CTA from "@/components/home/CTASection";

export const revalidate = 3600;

export default async function Home() {
  const packages = await getAllPackages();

  return (
    <main>
      <Hero />
      <FeaturedPackages packages={packages} />
      <WhatWeInclude />
      <Testimonials />
      <CTA />
    </main>
  );
}
