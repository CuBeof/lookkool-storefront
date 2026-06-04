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
  const goTo = React.useCallback(
    (i: number) => onIndexChange(Math.max(0, Math.min(count - 1, i))),
    [count, onIndexChange]
  );
  const go = React.useCallback(
    (dir: number) => goTo(index + dir),
    [index, goTo]
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

  // keep a stable reference to the latest onOpenChange for the effects below
  const closeRef = React.useRef(onOpenChange);
  React.useEffect(() => {
    closeRef.current = onOpenChange;
  });

  // close on browser / mobile back button instead of leaving the page
  React.useEffect(() => {
    if (!open) return;
    let poppedByBack = false;
    window.history.pushState({ lightbox: true }, "");
    const onPop = () => {
      poppedByBack = true;
      closeRef.current(false);
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      // closed by other means (esc/swipe/button) → remove the history entry
      if (!poppedByBack) window.history.back();
    };
  }, [open]);

  // drag: horizontal to slide, vertical to dismiss — same feel as the gallery
  const [dragX, setDragX] = React.useState(0);
  const [dragY, setDragY] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const start = React.useRef({ x: 0, y: 0 });
  const axis = React.useRef<"x" | "y" | null>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);

  function onPointerDown(e: React.PointerEvent) {
    if (current?.type === "video") return; // keep native video controls
    start.current = { x: e.clientX, y: e.clientY };
    axis.current = null;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    if (!axis.current && Math.abs(dx) + Math.abs(dy) > 8) {
      axis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (axis.current === "x") {
      if (count > 1) setDragX(dx);
    } else if (axis.current === "y") {
      setDragY(dy);
    }
  }
  function endDrag() {
    if (!dragging) return;
    if (axis.current === "y") {
      // swipe up or down far enough → close
      if (Math.abs(dragY) > Math.min(140, window.innerHeight * 0.18)) {
        onOpenChange(false);
      }
    } else if (axis.current === "x") {
      const w = viewportRef.current?.offsetWidth ?? window.innerWidth;
      const threshold = Math.min(120, w * 0.15);
      if (dragX <= -threshold) go(1);
      else if (dragX >= threshold) go(-1);
    }
    setDragging(false);
    setDragX(0);
    setDragY(0);
    axis.current = null;
  }

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

          {/* media — sliding track of all items (stop propagation so a tap
              on the image doesn't close the lightbox) */}
          <div
            ref={viewportRef}
            className="relative w-full max-w-5xl overflow-hidden select-none"
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: `translateY(${dragY}px)`,
              opacity: dragY ? Math.max(0.3, 1 - Math.abs(dragY) / 600) : 1,
              transition: dragging
                ? "none"
                : "transform 0.3s ease, opacity 0.3s ease",
            }}
          >
            <div
              className={cn(
                "flex touch-none",
                current?.type === "image" &&
                  "cursor-grab active:cursor-grabbing",
                !dragging && "transition-transform duration-300 ease-out"
              )}
              style={{
                transform: `translateX(calc(${-index * 100}% + ${dragX}px))`,
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              {items.map((it, i) => (
                <div
                  key={i}
                  className="flex h-[85vh] w-full shrink-0 items-center justify-center"
                >
                  {it.type === "video" ? (
                    <video
                      src={it.url}
                      controls
                      className="max-h-full max-w-full rounded-2xl"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={it.url}
                      alt={i === index ? alt : ""}
                      draggable={false}
                      className="max-h-full max-w-full rounded-2xl object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
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
