import { sanityClient } from "@/lib/sanity";
import { getAllPackages } from "@/lib/queries";
import Hero from "@/components/home/Hero";
import PhotoMosaic from "@/components/home/PhotoMosaic";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import WhatWeInclude from "@/components/home/WhatWeInclude";
import Testimonials from "@/components/home/TestimonialsCarousel";
import CTA from "@/components/home/CTASection";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const revalidate = 3600;

export default async function Home() {
  const packages = await getAllPackages();

  const gamesWithPhotos = await sanityClient.fetch<{ photos: SanityImageSource[] }[]>(
    `*[_type == "game" && defined(photos) && count(photos) > 0]{ photos[0] }`
  );
  const photoGrid = gamesWithPhotos
    .filter((g) => g.photos?.[0])
    .map((g) => g.photos[0]);

  return (
    <main>
      <Hero />
      <PhotoMosaic photos={photoGrid} />
      <FeaturedPackages packages={packages} />
      <WhatWeInclude />
      <Testimonials />
      <CTA />
    </main>
  );
}
