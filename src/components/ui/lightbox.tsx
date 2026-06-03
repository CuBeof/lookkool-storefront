"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { cn } from "@/lib/utils";

export interface LightboxItem {
  type: "image" | "video";
  url: string;
}

export function Lightbox({
  open,
  onOpenChange,
  items,
  index,
  onIndexChange,
  alt = "Image",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: LightboxItem[];
  index: number;
  onIndexChange: (i: number) => void;
  alt?: string;
}) {
  const count = items.length;
  const go = React.useCallback(
    (dir: number) => onIndexChange((index + dir + count) % count),
    [index, count, onIndexChange]
  );

  React.useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const current = items[index];

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/85 backdrop-blur-sm duration-300"
        />
        <DialogPrimitive.Content
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed inset-0 z-50 flex flex-col items-center justify-center p-4 duration-300 outline-none sm:p-8"
          onClick={() => onOpenChange(false)}
        >
          <DialogPrimitive.Title className="sr-only">{alt}</DialogPrimitive.Title>

          {/* close */}
          <button
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25"
          >
            <X className="size-5" />
          </button>

          {/* counter */}
          {count > 1 && (
            <div className="absolute top-5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
              {index + 1} / {count}
            </div>
          )}

          {/* media (stop propagation so clicking it doesn't close) */}
          <div
            className="relative flex max-h-full max-w-5xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {current?.type === "video" ? (
              <video
                key={current.url}
                src={current.url}
                controls
                autoPlay
                className="animate-in fade-in zoom-in-95 max-h-[85vh] max-w-full rounded-2xl duration-300"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={current?.url}
                src={current?.url}
                alt={alt}
                className="animate-in fade-in zoom-in-95 max-h-[85vh] max-w-full rounded-2xl object-contain duration-300"
              />
            )}
          </div>

          {/* nav */}
          {count > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Previous"
                className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 sm:left-6"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Next"
                className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 sm:right-6"
              >
                <ChevronRight className="size-6" />
              </button>

              {/* thumbnails */}
              <div
                className="absolute bottom-4 left-1/2 flex max-w-[90vw] -translate-x-1/2 gap-2 overflow-x-auto rounded-2xl bg-white/10 p-2 backdrop-blur"
                onClick={(e) => e.stopPropagation()}
              >
                {items.map((it, i) => (
                  <button
                    key={i}
                    onClick={() => onIndexChange(i)}
                    aria-label={`Go to item ${i + 1}`}
                    className={cn(
                      "relative size-12 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                      i === index ? "border-white" : "border-transparent opacity-60"
                    )}
                  >
                    {it.type === "video" ? (
                      <video src={it.url} className="size-full object-cover" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={it.url}
                        alt=""
                        className="size-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
