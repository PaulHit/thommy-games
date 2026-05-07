"use client";

import { useState, useEffect } from "react";

interface ImageSliderProps {
  images: string[];
  alt?: string;
  interactive?: boolean;
}

export default function ImageSlider({ images, alt = "", interactive = true }: ImageSliderProps) {
  const [clicked, setClicked] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover)").matches);
  }, []);

  const photos = images.slice(0, 2);
  const hasSecond = photos.length > 1;

  if (photos.length === 0) return null;

  const handleClick = () => {
    if (hasSecond && isTouch) setClicked((prev) => !prev);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative w-full h-full group block p-0 border-0 bg-transparent ${interactive ? "cursor-pointer" : "cursor-default"}`}
      aria-label={hasSecond ? "Comută imaginea" : undefined}
    >
      {/* Photo 1 — always visible, fades out on hover (desktop) or click (mobile) */}
      <img
        src={photos[0]}
        alt={alt}
        className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-1000 ease ${
          hasSecond && clicked ? "opacity-0" : "opacity-100 pointer-events-none"
        } ${hasSecond ? "group-hover:opacity-0" : ""}`}
        loading="lazy"
      />

      {/* Photo 2 — fades in on hover (desktop) or click (mobile) */}
      {hasSecond && (
        <img
          src={photos[1]}
          alt={alt}
          className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-1000 ease pointer-events-none ${
            clicked ? "opacity-100" : "opacity-0"
          } group-hover:opacity-100`}
          loading="lazy"
        />
      )}
    </button>
  );
}
