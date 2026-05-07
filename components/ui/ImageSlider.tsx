"use client";

import { useState } from "react";

interface ImageSliderProps {
  images: string[];
  alt?: string;
}

export default function ImageSlider({ images, alt = "" }: ImageSliderProps) {
  const [showSecond, setShowSecond] = useState(false);

  const photos = images.slice(0, 2);
  const hasSecond = photos.length > 1;

  if (photos.length === 0) return null;

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => hasSecond && setShowSecond(true)}
      onMouseLeave={() => setShowSecond(false)}
    >
      <button
        onClick={() => hasSecond && setShowSecond((prev) => !prev)}
        className="w-full h-full cursor-pointer block p-0 border-0 bg-transparent"
        aria-label="Comută imaginea"
      >
        <img
          key={showSecond ? "2" : "1"}
          src={showSecond && hasSecond ? photos[1] : photos[0]}
          alt={alt}
          className="w-full h-full object-contain animate-fade-in"
          loading="lazy"
        />
      </button>

      {hasSecond && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 pointer-events-none">
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              !showSecond ? "bg-gold scale-110 opacity-100" : "bg-white/40 opacity-70"
            }`}
          />
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              showSecond ? "bg-gold scale-110 opacity-100" : "bg-white/40 opacity-70"
            }`}
          />
        </div>
      )}
    </div>
  );
}
