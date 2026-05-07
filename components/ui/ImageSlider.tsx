"use client";

import { useState, useCallback } from "react";

interface ImageSliderProps {
  images: string[];
  alt?: string;
}

export default function ImageSlider({ images, alt = "" }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(Math.max(0, Math.min(index, images.length - 1)));
    },
    [images.length]
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={alt}
        className="w-full h-full object-contain"
        loading="lazy"
      />
    );
  }

  return (
    <div className="relative w-full h-full group">
      {/* Current image */}
      <img
        src={images[current]}
        alt={`${alt} — ${current + 1}`}
        className="w-full h-full object-contain"
        loading="lazy"
      />

      {/* Prev/Next arrows */}
      <button
        onClick={prev}
        disabled={current === 0}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-text rounded-full w-8 h-8 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 z-10"
        aria-label="Imaginea anterioară"
      >
        ‹
      </button>
      <button
        onClick={next}
        disabled={current === images.length - 1}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-text rounded-full w-8 h-8 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 z-10"
        aria-label="Imaginea următoare"
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-gold scale-110" : "bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Imaginea ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
