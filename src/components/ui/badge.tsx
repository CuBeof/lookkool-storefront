import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-sm border px-2.5 py-1 text-[13px] font-medium leading-none w-fit whitespace-nowrap shrink-0 gap-1 [&>svg]:size-3",
  {
    variants: {
      variant: {
        // fixed color = fixed meaning, scannable at a glance (no coral fill)
        bestseller: "border-transparent bg-foreground text-background",
        sale: "border-transparent bg-sale text-on-sale",
        new: "border-transparent bg-mint text-on-mint",
        lowstock: "border-transparent bg-butter text-on-butter",
        gift: "bg-cream text-coral-text border-coral/40",
        secondary: "border-transparent bg-muted text-muted-foreground",
        outline: "text-foreground border-border bg-card",
      },
    },
    defaultVariants: {
      variant: "bestseller",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
