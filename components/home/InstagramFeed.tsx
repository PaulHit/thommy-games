"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface InstagramPost {
  _key: string;
  images: SanityImageSource[];
  url?: string;
}

interface InstagramFeedProps {
  username?: string;
  profileUrl?: string;
  posts: InstagramPost[];
}

function CarouselPost({ post }: { post: InstagramPost }) {
  const [index, setIndex] = useState(0);
  const hasMultiple = post.images.length > 1;

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i === 0 ? post.images.length - 1 : i - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i === post.images.length - 1 ? 0 : i + 1));
  };

  return (
    <Link
      href={post.url || "#"}
      target={post.url ? "_blank" : undefined}
      rel={post.url ? "noopener noreferrer" : undefined}
      className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer block"
    >
      <Image
        src={urlFor(post.images[index]).width(400).height(400).fit("crop").url()}
        alt="Postare Instagram"
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 50vw, 25vw"
      />

      {/* Carousel indicators */}
      {hasMultiple && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Imaginea anterioară"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Imaginea următoare"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full z-10">
            {index + 1}/{post.images.length}
          </div>
        </>
      )}
    </Link>
  );
}

export default function InstagramFeed({ username, profileUrl, posts }: InstagramFeedProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-20 bg-cream">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.2em] uppercase text-gold mb-3">
            Instagram
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-gold-dark">
            {username ? `@${username}` : "Urmărește-ne"}
          </h2>
          {profileUrl && (
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-gold hover:text-gold-dark font-medium text-sm transition-colors"
            >
              Vezi profilul complet →
            </a>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {posts.slice(0, 4).map((post) => (
            <CarouselPost key={post._key} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
