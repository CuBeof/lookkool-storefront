import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[transform,box-shadow,background-color] duration-150 ease-bounce disabled:pointer-events-none disabled:opacity-60 disabled:shadow-none disabled:translate-y-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        // button-primary: coral pill with coral sticker shadow (the CTA)
        default:
          "bg-primary text-primary-foreground shadow-sticker hover:bg-coral-hover hover:-translate-y-0.5 hover:shadow-sticker-hover active:translate-y-0.5 active:shadow-sticker-press",
        // button-secondary: charcoal pill ("Buy now")
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_4px_0_#1a1313] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1a1313] active:translate-y-0.5 active:shadow-[0_2px_0_#1a1313]",
        // button-tertiary: quiet outline pill ("Add to wishlist")
        outline:
          "border border-border bg-card text-foreground hover:bg-accent active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]",
        ghost: "hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
        link: "text-coral-text underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-5 has-[>svg]:px-4",
        sm: "h-10 px-4 has-[>svg]:px-3",
        lg: "h-12 px-7 text-[15px] has-[>svg]:px-6",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
