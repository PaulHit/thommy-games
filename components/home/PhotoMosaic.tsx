"use client";

import { useEffect, useRef, useState } from "react";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface PhotoMosaicProps {
  photos: SanityImageSource[];
}

export default function PhotoMosaic({ photos }: PhotoMosaicProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setColumns(w < 640 ? 1 : w < 1024 ? 2 : 3);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!photos || photos.length === 0) return null;

  return (
    <section className="py-16 bg-cream-light">
      <div className="px-2 sm:px-4" ref={containerRef}>
        <div
          className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3"
          style={{ columnCount: columns, columnGap: "0.75rem" }}
        >
          {photos.map((photo, i) => {
            const heightClass = i % 5 === 0 ? "h-80" : i % 3 === 0 ? "h-64" : "h-48";
            const src = urlFor(photo).width(800).quality(85).url();
            return (
              <div
                key={i}
                className={`break-inside-avoid relative ${heightClass} overflow-hidden rounded-xl mb-3`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
