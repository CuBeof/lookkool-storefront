"use client";

import * as React from "react";
import Image from "next/image";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";

const SWIPE_RATIO = 0.18; // fraction of width to trigger a slide change
const TAP_SLOP = 8; // px of movement still counted as a tap (opens lightbox)

export function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [drag, setDrag] = React.useState(0); // live drag offset in px
  const [dragging, setDragging] = React.useState(false);

  const viewportRef = React.useRef<HTMLDivElement>(null);
  const startX = React.useRef(0);
  const moved = React.useRef(false);

  const safe = images.length ? images : [""];
  const items: LightboxItem[] = safe.map((url) => ({ type: "image", url }));

  function onPointerDown(e: React.PointerEvent) {
    if (safe.length < 2) return;
    startX.current = e.clientX;
    moved.current = false;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > TAP_SLOP) moved.current = true;
    setDrag(dx);
  }

  function endDrag() {
    if (!dragging) return;
    const w = viewportRef.current?.offsetWidth ?? 1;
    const threshold = w * SWIPE_RATIO;
    setActive((a) => {
      if (drag <= -threshold) return Math.min(a + 1, safe.length - 1);
      if (drag >= threshold) return Math.max(a - 1, 0);
      return a;
    });
    setDragging(false);
    setDrag(0);
  }

  function onSlideClick() {
    // only open the lightbox on a tap, not after a swipe
    if (!moved.current && safe[active]) setLightboxOpen(true);
  }

  return (
    <>
      {/* mobile / tablet: swipeable slider */}
      <div className="-mx-4 sm:mx-0 lg:hidden">
        {/* main image — full-bleed on mobile, rounded card on tablet */}
        <div
          ref={viewportRef}
          className="bg-muted relative aspect-square touch-pan-y overflow-hidden select-none sm:rounded-3xl sm:border"
        >
          {/* sliding track (drag/swipe enabled) */}
          <div
            className={cn(
              "flex h-full cursor-grab active:cursor-grabbing",
              !dragging && "transition-transform duration-500 ease-out"
            )}
            style={{
              transform: `translateX(calc(${-active * 100}% + ${drag}px))`,
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
          >
            {safe.map((src, i) => (
              <div
                key={i}
                onClick={onSlideClick}
                className="relative h-full w-full shrink-0"
              >
                {src && (
                  <Image
                    src={src}
                    alt={`${title} – view ${i + 1}`}
                    fill
                    priority={i === 0}
                    draggable={false}
                    sizes="100vw"
                    className="object-cover"
                  />
                )}
              </div>
            ))}
          </div>

          {/* zoom button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Zoom image"
            className="bg-background/85 hover:bg-background absolute top-3 right-3 z-10 grid size-10 place-items-center rounded-full shadow-sm backdrop-blur transition-colors"
          >
            <Search className="size-4" />
          </button>

          {/* thumbnails overlaid inside the image (mobile only) */}
          {safe.length > 1 && (
            <div className="bg-background/90 absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-2xl p-1.5 shadow-md backdrop-blur sm:hidden">
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
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* thumbnails below the image (tablet only) */}
        {safe.length > 1 && (
          <div className="mt-3 hidden gap-3 sm:flex">
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

      {/* desktop: simple vertical list of all images */}
      <div className="hidden flex-col gap-4 lg:flex">
        {safe.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setActive(i);
              setLightboxOpen(true);
            }}
            aria-label={`Open image ${i + 1} full screen`}
            className="bg-muted relative aspect-square cursor-zoom-in overflow-hidden rounded-3xl border"
          >
            {src && (
              <Image
                src={src}
                alt={`${title} – view ${i + 1}`}
                fill
                priority={i === 0}
                sizes="(max-width: 1280px) 50vw, 600px"
                className="object-cover"
              />
            )}
          </button>
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        items={items}
        index={active}
        onIndexChange={setActive}
        alt={title}
      />
    </>
  );
}
