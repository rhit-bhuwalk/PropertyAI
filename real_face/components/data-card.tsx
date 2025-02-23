"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface DataCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  details?: Record<string, any>
}

export function DataCard({ title, value, subtitle, icon, details }: DataCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        {icon && <div className="text-gray-500 mb-2">{icon}</div>}
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">{value}</div>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        {details && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-sm text-primary mt-2 hover:underline"
            >
              {isExpanded ? "Hide" : "Show"} details
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {isExpanded && (
              <div className="mt-4 pt-4 border-t space-y-2">
                {Object.entries(details).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-500">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

