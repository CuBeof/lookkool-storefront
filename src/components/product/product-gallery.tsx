"use client";

import * as React from "react";
import Image from "next/image";
import { Expand } from "lucide-react";

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
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => safe[active] && setLightboxOpen(true)}
        aria-label="Open image full screen"
        className="group bg-muted relative aspect-square cursor-zoom-in overflow-hidden rounded-3xl border"
      >
        {safe[active] && (
          <Image
            src={safe[active]}
            alt={`${title} – view ${active + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}
        <span className="bg-background/80 absolute right-3 bottom-3 grid size-9 place-items-center rounded-full opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          <Expand className="size-4" />
        </span>
      </button>

      {safe.length > 1 && (
        <div className="flex gap-3">
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
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
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
