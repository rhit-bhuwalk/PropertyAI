"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function AnimatedGradientButton({ className, children, ...props }: AnimatedGradientButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className,
      )}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#0F172A_50%,#E2E8F0_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg px-4 py-2 backdrop-blur-3xl">
        {children}
      </span>
    </button>
  )
}

