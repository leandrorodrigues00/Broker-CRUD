import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "rounded-lg px-4 py-2 text-sm font-semibold outline-none shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500 active:opacity-80",
  {
    variants: {
      variant: {
        ghost: "rounded-md px-2 hover:bg-zinc-50 shadow-none text-zinc-500",
        primary: "text-white bg-violet-500 hover:bg-violet-600",
        outline:
          "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50",
        danger:
          "bg-rose-500 text-white hover:bg-rose-500/90 border-rose-600 border-b-4 active:border-b-0",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
