"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ZoningResponse {
  content: string
  start_index: number
  end_index: number
  page_span: number[]
  path: string
  score: number
}

interface ZoningDataTableProps {
  zoningData: ZoningResponse[]
  currentSnippetIndex: number
  setCurrentSnippetIndex: (index: number) => void
}

export function ZoningDataTable({ zoningData, currentSnippetIndex, setCurrentSnippetIndex }: ZoningDataTableProps) {
  if (zoningData.length === 0) {
    return null
  }

  return (
    <Card className="mt-6">
      <CardHeader className="bg-orange-50">
        <CardTitle className="text-lg font-semibold text-orange-950">Zoning Snippets</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Property</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Snippet Number</TableCell>
              <TableCell>#{currentSnippetIndex + 1}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Score</TableCell>
              <TableCell>{zoningData[currentSnippetIndex].score.toFixed(3)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Pages</TableCell>
              <TableCell>{zoningData[currentSnippetIndex].page_span.join(" - ")}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="p-4 bg-orange-50">
          <div className="bg-white p-4 rounded-lg overflow-y-auto">
            <p className="text-orange-900 whitespace-pre-wrap">{zoningData[currentSnippetIndex].content}</p>
          </div>
        </div>
        <div className="flex justify-between items-center p-4 bg-orange-50">
          <Button
            onClick={() => setCurrentSnippetIndex(Math.max(0, currentSnippetIndex - 1))}
            disabled={currentSnippetIndex === 0}
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <span className="text-orange-900 font-medium">
            {currentSnippetIndex + 1} of {zoningData.length}
          </span>
          <Button
            onClick={() => setCurrentSnippetIndex(Math.min(zoningData.length - 1, currentSnippetIndex + 1))}
            disabled={currentSnippetIndex === zoningData.length - 1}
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

