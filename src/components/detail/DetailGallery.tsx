"use client";

import { useState } from "react";
import { CloudinaryImage } from "@/components/CloudinaryImage";

type DetailGalleryProps = {
  images: string[];
  alt: string;
  ocidPrefix: string;
};

export function DetailGallery({ images, alt, ocidPrefix }: DetailGalleryProps) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  if (images.length === 0) return null;

  return (
    <section
      id="section-gallery"
      data-ocid={`${ocidPrefix}.gallery`}
      className="scroll-mt-36"
    >
      <h2 className="font-serif italic text-2xl md:text-[28px] text-[#1A1A1A] mb-5">
        Photo Gallery
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-3">
        {images.slice(0, 12).map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setLightbox(src)}
            data-ocid={`${ocidPrefix}.gallery.item.${i + 1}`}
            className="no-retro relative aspect-[4/3] overflow-hidden bg-muted group"
          >
            <CloudinaryImage
              src={src}
              alt={`${alt} — photo ${i + 1}`}
              width={480}
              height={360}
              sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              transform={{
                width: 480,
                height: 360,
                crop: "fill",
                gravity: "auto",
                quality: "auto:good",
              }}
            />
          </button>
        ))}
      </div>

      {lightbox ? (
        <button
          type="button"
          className="no-retro fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          data-ocid={`${ocidPrefix}.lightbox`}
          aria-label="Close gallery"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt={alt}
            className="max-w-full max-h-full object-contain"
          />
        </button>
      ) : null}
    </section>
  );
}
