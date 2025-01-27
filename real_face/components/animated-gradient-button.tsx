"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AnimatedGradientButton({ children, className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(
        "bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-base h-12 transition-colors duration-300",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

