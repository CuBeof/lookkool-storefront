import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

export function CategoryPills({
  active,
  basePath = "/products",
}: {
  active?: string;
  basePath?: string;
}) {
  const pills = [
    { handle: "", name: "All", emoji: "🛍️" },
    ...categories,
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {pills.map((c) => {
        const href =
          c.handle === ""
            ? basePath
            : `${basePath}?category=${c.handle}`;
        const isActive = (active ?? "") === c.handle;
        return (
          <Link
            key={c.handle || "all"}
            href={href}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors",
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary/50"
            )}
          >
            <span>{c.emoji}</span>
            {c.name}
          </Link>
        );
      })}
    </div>
  );
}
