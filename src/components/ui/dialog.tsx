import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import * as React from "react"

import { usePortalContainer } from "@/libs/contexts/portal-context"
import cn from "clsx"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "twe-fixed twe-inset-0 twe-z-[999999] twe-bg-black/80 twe- data-[state=open]:twe-animate-in data-[state=closed]:twe-animate-out data-[state=closed]:twe-fade-out-0 data-[state=open]:twe-fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
    const portalContainer = usePortalContainer();
    console.log("portalContainer ",portalContainer)
  return (
    <DialogPortal container={portalContainer}>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        style={{
          transform: "translate(-50%,-50%)"
        }}
        className={cn(
          "twe-fixed twe-left-[50%] twe-z-[9999999] twe-bg-white twe-top-[50%] twe-grid twe-w-full twe-max-w-lg twe-gap-4 twe-border twe-bg-background twe-p-6 twe-shadow-lg twe-duration-200 data-[state=open]:twe-animate-in data-[state=closed]:twe-animate-out data-[state=closed]:twe-fade-out-0 data-[state=open]:twe-fade-in-0 data-[state=closed]:twe-zoom-out-95 data-[state=open]:twe-zoom-in-95 data-[state=closed]:twe-slide-out-to-left-1/2 data-[state=closed]:twe-slide-out-to-top-[48%] data-[state=open]:twe-slide-in-from-left-1/2 data-[state=open]:twe-slide-in-from-top-[48%] sm:twe-rounded-lg",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="twe-absolute twe-right-4 twe-top-4 twe-rounded-sm twe-opacity-70 twe-ring-offset-background twe-transition-opacity hover:twe-opacity-100 focus:twe-outline-none focus:twe-ring-2 focus:twe-ring-ring focus:twe-ring-offset-2 disabled:twe-pointer-events-none data-[state=open]:twe-bg-accent data-[state=open]:twe-text-muted-foreground">
          <X className="twe-h-4 twe-w-4" />
          <span className="twe-sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "twe-flex twe-flex-col twe-space-y-1.5 twe-text-center sm:twe-text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
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
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "twe-text-lg twe-font-semibold twe-leading-none twe-tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("twe-text-sm twe-text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog, DialogClose,
  DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger
}

