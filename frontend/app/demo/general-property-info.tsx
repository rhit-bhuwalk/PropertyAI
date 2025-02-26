"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { ReportSection } from "@/components/RenderReport"
import { transformSourceToReport } from "@/utils/utils"
import { ExpandedProfileSchema, type PropertyExpandedProfile } from "@/app/schemas/endpoints/s_prop-expanded-profile"
import type { GeneralPropertyInfo } from "@/app/schemas/views/s_general-property-info"

export function GeneralPropertyInfo() {
  const [reportData, setReportData] = useState<GeneralPropertyInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const mode = process.env.NEXT_PUBLIC_MODE
        const endpoint = mode === "test" ? "/api/mock-attom" : "/api/attom"
        const params = mode === "test" ? {} : { address: "1500 Market Street, Philadelphia" }

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: "property/expandedprofile", params }),
        })

        if (!response.ok) {
          throw new Error("Failed to fetch property data")
        }

        const data = await response.json()
        const validatedData: PropertyExpandedProfile = ExpandedProfileSchema.parse(data)
        const normalizedReport = transformSourceToReport(validatedData)
        setReportData(normalizedReport)
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unexpected error occurred")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto max-w-7xl py-6">
      <div className="grid gap-6">
        {reportData ? (
          <ReportSection section={reportData} />
        ) : (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Data</AlertTitle>
            <AlertDescription>No property report data available.</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}

