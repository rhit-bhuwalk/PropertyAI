"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/lib/theme-provider"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-auto px-4 gap-2 text-sm font-medium"
    >
      {theme === "light" ? (
        <>
          <Moon className="h-4 w-4" />
        </>
      ) : (
        <>
          <Sun className="h-4 w-4" />
        </>
      )}
    </Button>
  )
}

