import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import * as React from "react"

import { usePortalContainer } from "@/libs/contexts/portal-context"
import cn from "clsx"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "twe-fixed twe-inset-0 twe-z-[9999999] twe-bg-black/80 twe-data-[state=open]:twe-animate-in data-[state=closed]:twe-animate-out data-[state=closed]:twe-fade-out-0 data-[state=open]:twe-fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "twe-fixed twe-z-[99999999] twe-gap-4 twe-bg-background twe-p-6 twe-shadow-lg twe-transition twe-ease-in-out data-[state=closed]:twe-duration-300 data-[state=open]:twe-duration-300 data-[state=open]:twe-animate-in data-[state=closed]:twe-animate-out",
  {
    variants: {
      side: {
        top: "twe-inset-x-0 twe-top-0 twe-border-b data-[state=closed]:twe-slide-out-to-top data-[state=open]:twe-slide-in-from-top",
        bottom:
          "twe-inset-x-0 twe-bottom-0 twe-border-t data-[state=closed]:twe-slide-out-to-bottom data-[state=open]:twe-slide-in-from-bottom",
        left: "twe-inset-y-0 twe-left-0 twe-h-full twe-w-3/4 twe-border-r data-[state=closed]:twe-slide-out-to-left data-[state=open]:twe-slide-in-from-left sm:twe-max-w-sm",
        right:
          "twe-inset-y-0 twe-right-0 twe-h-full twe-w-3/4 twe-border-l twe-border-l-[#333] data-[state=closed]:twe-slide-out-to-right data-[state=open]:twe-slide-in-from-right sm:twe-max-w-sm",
      },
      defaultVariants: {
        side: "right",
      },
    }
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
  VariantProps<typeof sheetVariants> { }

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => {
  const portalContainer = usePortalContainer();
  return (
    <SheetPortal container={portalContainer}>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        <SheetPrimitive.Close className="twe-absolute twe-right-4 twe-top-4 twe-rounded-sm twe-opacity-70 twe-ring-offset-background twe-transition-opacity hover:twe-opacity-100 focus:twe-outline-none focus:twe-ring-2 focus:twe-ring-ring focus:twe-ring-offset-2 disabled:twe-pointer-events-none data-[state=open]:twe-bg-secondary">
          <X className="twe-h-4 twe-w-4" color="#333" />
          <span className="twe-sr-only">Close</span>
        </SheetPrimitive.Close>
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
})
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "twe-flex twe-flex-col twe-space-y-2 twe-text-center sm:twe-text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "twe-flex twe-flex-col-reverse sm:twe-flex-row sm:twe-justify-end sm:twe-space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("twe-text-lg twe-font-semibold twe-text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("twe-text-sm twe-text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet, SheetClose,
  SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger
}

