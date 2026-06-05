import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-1.5 font-display text-2xl font-semibold tracking-tight text-foreground",
        className
      )}
      aria-label="lookkool home"
    >
      <span className="bg-primary text-primary-foreground ease-bounce grid size-8 place-items-center rounded-xl transition-transform duration-200 group-hover:-rotate-6">
        <Sparkles className="size-4" />
      </span>
      <span>lookkool</span>
    </Link>
  );
}
