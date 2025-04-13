import * as React from "react"

import { cn } from "../../lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border bg-background px-4 text-sm shadow-sm transition-all duration-200 ease-in-out",
          "border-zinc-300 dark:border-neutral-700",
          "hover:border-primary/60 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none",
          "placeholder:text-muted-foreground text-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium"
          , className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
