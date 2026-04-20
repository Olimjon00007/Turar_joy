"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images.length) return null;

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/10] bg-gray-900 rounded-[2rem] overflow-hidden group">
      
      {/* Current Image */}
      <Image
        src={images[activeIdx]}
        alt={`Apartment image ${activeIdx + 1}`}
        fill
        className="object-cover transition-opacity duration-300"
      />

      {/* Telegram/Instagram style top progress dashes */}
      {images.length > 1 && (
        <div className="absolute top-0 inset-x-0 p-4 pb-12 bg-gradient-to-b from-black/60 to-transparent z-20 flex gap-1.5 px-3 sm:px-5">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "h-1.5 rounded-full flex-grow transition-all duration-300 cursor-pointer shadow-[0_0_2px_rgba(0,0,0,0.5)]",
                activeIdx === idx ? "bg-white" : "bg-white/40 hover:bg-white/70"
              )}
              onClick={(e) => {
                e.preventDefault();
                setActiveIdx(idx);
              }}
            />
          ))}
        </div>
      )}

      {/* Tap Zones for Navigation (Like Telegram Profile) */}
      {images.length > 1 && (
        <>
          {/* Left tap zone */}
          <div 
            onClick={prevSlide}
            className="absolute top-0 left-0 w-1/2 h-full z-10 cursor-pointer"
            aria-label="Oldingi rasm"
          />
          {/* Right tap zone */}
          <div 
            onClick={nextSlide}
            className="absolute top-0 right-0 w-1/2 h-full z-10 cursor-pointer"
            aria-label="Keyingi rasm"
          />
        </>
      )}

    </div>
  );
}
