import * as React from "react"

import cn from "clsx"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "twe-flex twe-min-h-[60px] twe-w-full twe-rounded-md twe-border twe-border-input twe-bg-transparent twe-px-3 twe-py-2 twe-text-base twe-shadow-sm placeholder:twe-text-muted-foreground focus-visible:twe-outline-none focus-visible:twe-ring-1 focus-visible:twe-ring-ring disabled:twe-cursor-not-allowed disabled:twe-opacity-50 md:twe-text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
