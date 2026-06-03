"use client";

import * as React from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";

import type { Review, ReviewMedia } from "@/lib/types";
import { useReviews } from "@/lib/reviews-context";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StarInput } from "@/components/product/star-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MAX_MEDIA = 5;
const MAX_FILE_MB = 8;

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ReviewDialog({
  productId,
  productHandle,
  productTitle,
  orderId,
  trigger,
}: {
  productId: string;
  productHandle: string;
  productTitle: string;
  orderId?: string;
  trigger: React.ReactNode;
}) {
  const { addReview } = useReviews();
  const { user } = useAuth();

  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [author, setAuthor] = React.useState(user?.name ?? "");
  const [media, setMedia] = React.useState<ReviewMedia[]>([]);
  const [busy, setBusy] = React.useState(false);

  async function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;

    const room = MAX_MEDIA - media.length;
    if (room <= 0) {
      toast.error(`You can attach up to ${MAX_MEDIA} files.`);
      return;
    }

    setBusy(true);
    const next: ReviewMedia[] = [];
    for (const file of files.slice(0, room)) {
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        toast.error(`${file.name} is over ${MAX_FILE_MB}MB and was skipped.`);
        continue;
      }
      const type = file.type.startsWith("video") ? "video" : "image";
      try {
        next.push({ type, url: await readAsDataUrl(file) });
      } catch {
        toast.error(`Couldn't read ${file.name}.`);
      }
    }
    setMedia((m) => [...m, ...next]);
    setBusy(false);
  }

  function removeMedia(i: number) {
    setMedia((m) => m.filter((_, idx) => idx !== i));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please pick a star rating 🌟");
      return;
    }
    const review: Review = {
      id: `rev-${Date.now()}`,
      productId,
      productHandle,
      orderId,
      author: author.trim() || "Anonymous",
      rating,
      title: title.trim(),
      body: body.trim(),
      media,
      createdAt: new Date().toISOString(),
      verified: Boolean(orderId),
    };
    const persisted = addReview(review);
    setOpen(false);
    toast.success(
      persisted
        ? "Thanks for your review! 💕"
        : "Review added — media was too large to save permanently."
    );
    // reset
    setRating(0);
    setTitle("");
    setBody("");
    setMedia([]);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review {productTitle}</DialogTitle>
          <DialogDescription>
            Share your thoughts and add photos or a video to help other shoppers.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Your rating</Label>
            <StarInput value={rating} onChange={setRating} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="rev-author">Display name</Label>
            <Input
              id="rev-author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Mia R."
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="rev-title">Headline</Label>
            <Input
              id="rev-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sum it up in a few words"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="rev-body">Your review</Label>
            <textarea
              id="rev-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder="What did you love? How's the quality?"
              className="border-input focus-visible:border-ring focus-visible:ring-ring/40 w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-[3px]"
            />
          </div>

          {/* media */}
          <div className="space-y-2">
            <Label>Photos / video (optional)</Label>
            <div className="flex flex-wrap gap-2">
              {media.map((m, i) => (
                <div
                  key={i}
                  className="bg-muted relative size-20 overflow-hidden rounded-xl border"
                >
                  {m.type === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={m.url}
                      alt={`Attachment ${i + 1}`}
                      className="size-full object-cover"
                    />
                  ) : (
                    <video src={m.url} className="size-full object-cover" />
                  )}
                  <button
                    type="button"
                    onClick={() => removeMedia(i)}
                    className="bg-background/90 absolute top-1 right-1 grid size-5 place-items-center rounded-full"
                    aria-label="Remove attachment"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ))}
              {media.length < MAX_MEDIA && (
                <label className="text-muted-foreground hover:border-primary/50 hover:text-foreground grid size-20 cursor-pointer place-items-center rounded-xl border-2 border-dashed transition-colors">
                  {busy ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <ImagePlus className="size-5" />
                  )}
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                    onChange={onFiles}
                  />
                </label>
              )}
            </div>
            <p className="text-muted-foreground text-xs">
              Up to {MAX_MEDIA} files, {MAX_FILE_MB}MB each.
            </p>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={busy}>
              Post review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
