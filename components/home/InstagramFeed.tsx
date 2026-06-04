"use client";

import { useState, useCallback } from "react";
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

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIndex((i) => (i === 0 ? post.images.length - 1 : i - 1));
    },
    [post.images.length]
  );

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIndex((i) => (i === post.images.length - 1 ? 0 : i + 1));
    },
    [post.images.length]
  );

  return (
    <Link
      href={post.url || "#"}
      target={post.url ? "_blank" : undefined}
      rel={post.url ? "noopener noreferrer" : undefined}
      className="relative aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer block shadow-md"
    >
      {/* Carousel track with animation */}
      <div
        className="flex h-full transition-transform duration-400 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {post.images.map((img, i) => (
          <div key={i} className="w-full h-full flex-shrink-0 relative">
            <Image
              src={urlFor(img).width(900).height(1125).fit("crop").url()}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>

      {/* Hover zoom on current image */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
      </div>

      {/* Nav arrows */}
      {hasMultiple && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow"
            aria-label="Înapoi"
          >
            <svg className="w-4 h-4 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow"
            aria-label="Înainte"
          >
            <svg className="w-4 h-4 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Page indicator dots */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {post.images.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </Link>
  );
}

export default function InstagramFeed({ username, profileUrl, posts }: InstagramFeedProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.2em] uppercase text-gold mb-3 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Instagram
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-gold-dark">
            {username && profileUrl ? (
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                @{username}
              </a>
            ) : username ? (
              `@${username}`
            ) : (
              "Urmărește-ne"
            )}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {posts.slice(0, 6).map((post) => (
            <CarouselPost key={post._key} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
