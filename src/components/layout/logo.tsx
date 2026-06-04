import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-1.5 font-display text-2xl font-bold tracking-tight",
        className
      )}
      aria-label="lookkool home"
    >
      <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-12">
        <Sparkles className="size-4" />
      </span>
      <span>
        look<span className="text-primary">kool</span>
      </span>
    </Link>
  );
}
