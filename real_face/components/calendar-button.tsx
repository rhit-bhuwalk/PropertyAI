"use client"

import { Button } from "@/components/ui/button"

export function CalendarButton() {
  return (
    <Button
      onClick={() => window.open("https://zcal.co/kushbhuwalka/30min", "_blank")}
      className="bg-white text-black hover:bg-white/90 px-8 py-3 text-base h-12"
    >
      Talk to a Founder
    </Button>
  )
}

