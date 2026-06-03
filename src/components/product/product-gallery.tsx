"use client";

import * as React from "react";
import Image from "next/image";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";

export function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const safe = images.length ? images : [""];
  const items: LightboxItem[] = safe.map((url) => ({ type: "image", url }));

  return (
    <div className="-mx-4 sm:mx-0">
      {/* main image — full-bleed on mobile, rounded card on desktop */}
      <div className="bg-muted relative aspect-square overflow-hidden sm:rounded-3xl sm:border">
        {/* sliding track */}
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {safe.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => src && setLightboxOpen(true)}
              aria-label="Open image full screen"
              className="relative h-full w-full shrink-0 cursor-zoom-in"
            >
              {src && (
                <Image
                  src={src}
                  alt={`${title} – view ${i + 1}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>

        {/* zoom button */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="Zoom image"
          className="bg-background/85 hover:bg-background absolute top-3 right-3 grid size-10 place-items-center rounded-full shadow-sm backdrop-blur transition-colors"
        >
          <Search className="size-4" />
        </button>

        {/* thumbnails overlaid inside the image (mobile only) */}
        {safe.length > 1 && (
          <div className="bg-background/90 absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-2xl p-1.5 shadow-md backdrop-blur sm:hidden">
            {safe.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "bg-muted relative size-12 shrink-0 overflow-hidden rounded-xl border-2 transition-colors",
                  i === active ? "border-primary" : "border-transparent"
                )}
              >
                <Image src={src} alt="" fill sizes="48px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* thumbnails below the image (desktop only) */}
      {safe.length > 1 && (
        <div className="mt-3 hidden gap-3 px-0 sm:flex">
          {safe.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "bg-muted relative size-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-colors",
                i === active ? "border-primary" : "border-transparent"
              )}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <Lightbox
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        items={items}
        index={active}
        onIndexChange={setActive}
        alt={title}
      />
    </div>
  );
}
