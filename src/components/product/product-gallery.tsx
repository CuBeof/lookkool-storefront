"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = React.useState(0);
  const safe = images.length ? images : [""];

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-muted relative aspect-square overflow-hidden rounded-3xl border">
        {safe[active] && (
          <Image
            src={safe[active]}
            alt={`${title} – view ${active + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        )}
      </div>
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
    </div>
  );
}
