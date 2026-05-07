"use client";

import { useState, useCallback } from "react";

interface ImageSliderProps {
  images: string[];
  alt?: string;
}

export default function ImageSlider({ images, alt = "" }: ImageSliderProps) {
  const [permanent, setPermanent] = useState(0);
  const [hovering, setHovering] = useState(false);

  const total = images.length;
  const displayIndex = hovering ? (permanent + 1) % total : permanent;

  const goTo = useCallback(
    (index: number) => {
      setPermanent(index);
    },
    []
  );

  const handleClick = useCallback(() => {
    setPermanent((prev) => (prev + 1) % total);
  }, [total]);

  if (!images || total === 0) return null;

  if (total === 1) {
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
    <div
      className="relative w-full h-full cursor-pointer"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={handleClick}
    >
      <img
        key={displayIndex}
        src={images[displayIndex]}
        alt={`${alt} — ${displayIndex + 1}`}
        className="w-full h-full object-contain animate-fade-in"
        loading="lazy"
      />

      {/* Dot indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              goTo(i);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === displayIndex
                ? "bg-gold scale-110 opacity-100"
                : "bg-white/40 hover:bg-white/70 opacity-70"
            }`}
            aria-label={`Imaginea ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
