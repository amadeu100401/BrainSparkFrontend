import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

const DialogContentCustom = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay
        className="fixed inset-0 bg-black bg-opacity-40 data-[state=open]:animate-fadeIn z-[1000]"
    />
    <DialogPrimitive.Content
        ref={ref}
        className={cn(
        "fixed top-[50%] left-[50%] max-w-md w-full max-h-[85vh] p-6 rounded-md bg-zinc-800 text-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 focus:outline-none z-[1100]",
        className
        )}
        {...props}
    >
        {children}
    </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
))

DialogContentCustom.displayName = DialogPrimitive.Content.displayName

export { DialogContentCustom }
