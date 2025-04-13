import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:text-white",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-b-4 hover:bg-primary/90 active:bg-primary/70 hover:border-b-2 active:border-b border-b-secondary-foreground/30 dark:border-b-primary-foreground/30",
        destructive: "bg-destructive text-destructive-foreground border-b-4 hover:bg-destructive/90 active:bg-destructive/70 hover:border-b-2 active:border-b border-b-secondary-foreground/30 dark:border-b-destructive-foreground/30",
        outline: "border-2 border-input bg-background hover:bg-accent/90 hover:text-accent-foreground hover:ring-2 hover:ring-accent/40",
        secondary: "bg-secondary text-secondary-foreground border-b-4 hover:bg-secondary/90 active:bg-secondary/70 hover:border-b-2 active:border-b border-b-secondary-foreground/10",
        ghost: "hover:bg-accent/30 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-9 rounded-md px-4 text-sm",
        lg: "h-14 rounded-md px-10 text-lg",
        icon: "h-10 w-10",
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
  asChild?: boolean
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
