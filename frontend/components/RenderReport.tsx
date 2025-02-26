/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { DataPoint } from "@/app/schemas/views/s_general-property-info"

interface ReportSectionProps {
  section: Record<string, any>
  sectionTitle?: string
}

export function ReportSection({ section, sectionTitle }: ReportSectionProps) {
  // If the section is a leaf data point, don't render it here
  if (isDataPoint(section)) {
    return null
  }

  return (
    <Card className="mb-6">
      {sectionTitle && (
        <CardHeader>
          <CardTitle>{sectionTitle}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="grid gap-6">
        {Object.entries(section).map(([key, value]) => {
          if (isDataPoint(value)) {
            return (
              <div key={key} className="space-y-4">
                <h3 className="text-lg font-semibold tracking-tight">{key}</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Field</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">{String(value.alias)}</TableCell>
                      <TableCell>{String(value.value)}</TableCell>
                      <TableCell>{value.source || "-"}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )
          } else if (value && typeof value === "object") {
            return <ReportSection key={key} section={value} sectionTitle={key} />
          }
          return null
        })}
      </CardContent>
    </Card>
  )
}

// Type guard for DataPoint
function isDataPoint(value: any): value is DataPoint {
  return value && typeof value === "object" && "alias" in value && "value" in value && "source" in value
}

