"use client"

import { useState } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface SectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

export const Section: React.FC<SectionProps> = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <Card className="mb-6">
      <CardHeader
        className="cursor-pointer flex flex-row items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 text-gray-900">
          {icon}
          <CardTitle className="text-gray-900">{title}</CardTitle>
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </CardHeader>
      {isOpen && <CardContent>{children}</CardContent>}
    </Card>
  )
} 