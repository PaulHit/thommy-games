import { sanityClient } from "@/lib/sanity";
import Hero from "@/components/home/Hero";
import PhotoMosaic from "@/components/home/PhotoMosaic";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import WhatWeInclude from "@/components/home/WhatWeInclude";
import VideoShowcase from "@/components/home/VideoShowcase";
import Testimonials from "@/components/home/TestimonialsCarousel";
import InstagramFeed from "@/components/home/InstagramFeed";
import CTA from "@/components/home/CTASection";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const revalidate = 86400;

interface PackageData {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  totalGames: number;
  level1Count: number;
  level2Count: number;
  includesAssistant: boolean;
  recommended?: boolean;
}

interface BenefitData {
  title: string;
  description: string;
  image?: SanityImageSource;
}

interface HomeVideo {
  label: string;
  videoUrl?: string;
}

interface TestimonialData {
  _id: string;
  name: string;
  role?: string;
  quote: string;
}

interface HomePageData {
  packages: PackageData[];
  gamesWithPhotos: { photos: SanityImageSource[] }[];
  benefits: BenefitData[];
  videos: HomeVideo[];
  testimonials: TestimonialData[];
  instagramUsername: string | null;
  instagramUrl: string | null;
  instagramPosts: { _key: string; images: SanityImageSource[]; url?: string }[] | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
  ctaTitle: string | null;
  ctaSubtitle: string | null;
  ctaButtonText: string | null;
  ctaSecondaryButtonText: string | null;
}

export default async function Home() {
  const data = await sanityClient.fetch<HomePageData>(
    `{
      "packages": *[_type == "package"] | order(order asc, _createdAt asc),
      "gamesWithPhotos": *[_type == "game" && defined(photos) && count(photos) > 0]{ photos[0] },
      "benefits": *[_type == "homeBenefit"] | order(order asc) { title, description, image },
      "videos": *[_type == "homeVideo"] | order(order asc) { label, "videoUrl": videoFile.asset->url },
      "testimonials": *[_type == "testimonial"] | order(_createdAt asc) { _id, name, role, quote },
      "instagramUsername": *[_type == "siteSettings"][0].instagramUsername,
      "instagramUrl": *[_type == "siteSettings"][0].instagramUrl,
      "instagramPosts": *[_type == "siteSettings"][0].instagramPosts[] { _key, images, url },
      "heroTitle": *[_type == "siteSettings"][0].heroSection.heroTitle,
      "heroSubtitle": *[_type == "siteSettings"][0].heroSection.heroSubtitle,
      "ctaTitle": *[_type == "siteSettings"][0].ctaSection.ctaTitle,
      "ctaSubtitle": *[_type == "siteSettings"][0].ctaSection.ctaSubtitle,
      "ctaButtonText": *[_type == "siteSettings"][0].ctaSection.ctaButtonText,
      "ctaSecondaryButtonText": *[_type == "siteSettings"][0].ctaSection.ctaSecondaryButtonText
    }`
  );

  const photoGrid = data.gamesWithPhotos
    .filter((g) => g.photos?.[0])
    .map((g) => g.photos[0]);

  return (
    <main>
      <Hero heroTitle={data.heroTitle ?? undefined} heroSubtitle={data.heroSubtitle ?? undefined} />
      {(data.instagramPosts && data.instagramPosts.length > 0) && (
        <InstagramFeed
          username={data.instagramUsername ?? undefined}
          profileUrl={data.instagramUrl ?? undefined}
          posts={data.instagramPosts}
        />
      )}
      {(data.videos[0] || data.videos[1]) && (
        <VideoShowcase videos={data.videos.slice(0, 2)} />
      )}
      <WhatWeInclude benefits={data.benefits} />
      <PhotoMosaic photos={photoGrid} />
      {(data.videos[2] || data.videos[3]) && (
        <VideoShowcase videos={data.videos.slice(2, 4)} />
      )}
      <Testimonials testimonials={data.testimonials} />
      <FeaturedPackages packages={data.packages} />
      <CTA
        ctaTitle={data.ctaTitle ?? undefined}
        ctaSubtitle={data.ctaSubtitle ?? undefined}
        ctaButtonText={data.ctaButtonText ?? undefined}
        ctaSecondaryButtonText={data.ctaSecondaryButtonText ?? undefined}
      />
    </main>
  );
}
