import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap  text-sm font-regular",
    "rounded-full",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-indigo-300",
    "transition-colors duration-1000 ease-out",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-indigo-500 text-indigo-50 shadow hover:bg-indigo-500/70 dark:bg-indigo-50 dark:text-indigo-500 dark:hover:bg-indigo-50/70",
        destructive:
          "bg-red-500 text-indigo-50 shadow-sm hover:bg-red-500/70 dark:bg-red-500 dark:text-indigo-50 dark:hover:bg-red-500/70",
        outline:
          "border border-indigo-200 bg-white shadow-sm hover:bg-indigo-100 hover:text-indigo-500 dark:border-indigo-700 dark:bg-indigo-950 dark:hover:bg-indigo-700 dark:hover:text-indigo-50",
        secondary:
          "bg-indigo-100 text-indigo-500 shadow-sm hover:bg-indigo-100/70 dark:bg-indigo-700 dark:text-indigo-50 dark:hover:bg-indigo-700/70",
        ghost:
          "text-indigo-500 hover:bg-indigo-100/70 dark:hover:bg-indigo-700/70 dark:text-indigo-50",
        link: "text-indigo-500 underline-offset-4 hover:underline dark:text-indigo-50",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
