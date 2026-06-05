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
  const pills = [{ handle: "", name: "All" }, ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {pills.map((c) => {
        const href =
          c.handle === "" ? basePath : `${basePath}?category=${c.handle}`;
        const isActive = (active ?? "") === c.handle;
        return (
          <Link
            key={c.handle || "all"}
            href={href}
            className={cn(
              "inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "border-foreground bg-foreground text-background"
                : "border-border hover:bg-accent"
            )}
          >
            {c.name}
          </Link>
        );
      })}
    </div>
  );
}
