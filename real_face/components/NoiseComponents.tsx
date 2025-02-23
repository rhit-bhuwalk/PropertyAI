"use client"

import { Badge } from "@/components/ui/badge"

interface NoiseLevelProps {
  level: number
  description: string
}

export const NoiseLevel: React.FC<NoiseLevelProps> = ({ level, description }) => {
  const levelColors: Record<number, string> = {
    0: "bg-green-100 text-green-800",
    1: "bg-yellow-100 text-yellow-800",
    2: "bg-orange-100 text-orange-800",
    3: "bg-red-100 text-red-800",
  }
  return (
    <div className="flex items-center gap-2">
      <Badge className={levelColors[level] || "bg-gray-100 text-gray-800"}>Level {level}</Badge>
      <span className="text-sm text-gray-600">{description}</span>
    </div>
  )
}

interface NoiseSourceListProps {
  sources: any[]
}

export const NoiseSourceList: React.FC<NoiseSourceListProps> = ({ sources }) => (
  <div className="mt-2 space-y-1">
    {sources.map(
      (source, index) =>
        source.source_description && (
          <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-gray-400" />
            <span>{source.source_description}</span>
            {source.source_dist_km && <span className="text-gray-400">({source.source_dist_km.toFixed(1)} km)</span>}
          </div>
        ),
    )}
  </div>
) 