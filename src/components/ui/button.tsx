import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import cn from "clsx"

const buttonVariants = cva(
  "twe-inline-flex twe-items-center twe-justify-center twe-gap-2 twe-whitespace-nowrap twe-rounded-md twe-text-sm twe-font-medium twe-transition-colors focus-visible:twe-outline-none focus-visible:twe-ring-1 focus-visible:twe-ring-ring disabled:twe-pointer-events-none disabled:twe-opacity-50 [&_svg]:twe-pointer-events-none [&_svg]:twe-size-4 [&_svg]:twe-shrink-0",
  {
    variants: {
      variant: {
        default:
          "twe-bg-primary twe-text-primary-foreground twe-shadow hover:twe-bg-primary/90",
        destructive:
          "twe-bg-destructive twe-text-destructive-foreground twe-shadow-sm hover:twe-bg-destructive/90",
        outline:
          "twe-border twe-border-input twe-bg-background twe-shadow-sm hover:twe-bg-accent hover:twe-text-accent-foreground",
        secondary:
          "twe-bg-secondary twe-text-secondary-foreground twe-shadow-sm hover:twe-bg-secondary/80",
        ghost: "hover:twe-bg-accent hover:twe-text-accent-foreground",
        link: "twe-text-primary twe-underline-offset-4 hover:twe-underline",
      },
      size: {
        default: "twe-h-9 twe-px-4 twe-py-2",
        sm: "twe-h-8 twe-rounded-md twe-px-3 twe-text-xs",
        lg: "twe-h-10 twe-rounded-md twe-px-8",
        icon: "twe-h-9 twe-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

