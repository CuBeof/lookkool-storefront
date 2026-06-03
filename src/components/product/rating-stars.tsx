import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  reviews,
  className,
  showCount = true,
}: {
  rating: number;
  reviews?: number;
  className?: string;
  showCount?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "size-3.5",
              i < Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted"
            )}
          />
        ))}
      </div>
      {showCount && (
        <span className="text-muted-foreground text-xs">
          {rating.toFixed(1)}
          {typeof reviews === "number" && ` (${reviews})`}
        </span>
      )}
    </div>
  );
}
