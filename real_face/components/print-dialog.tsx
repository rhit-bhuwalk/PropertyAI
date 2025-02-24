"use client"

import { useState } from "react"
import { Check, Printer } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface PrintSection {
  id: string
  label: string
  subsections: { id: string; label: string }[]
}

const printSections: PrintSection[] = [
  {
    id: "property",
    label: "Property Report",
    subsections: [
      { id: "property-identification", label: "Property Identification & Legal Framework" },
      { id: "physical-site", label: "Physical Site Characteristics" },
      { id: "zoning-entitlement", label: "Zoning & Entitlement Landscape" },
      { id: "construction-systems", label: "Construction & Systems Profile" },
      { id: "financial-tax", label: "Financial & Tax History" },
      { id: "environmental", label: "Environmental & Geotechnical" },
      { id: "development-economics", label: "Development Economics" },
      { id: "risk-assessment", label: "Risk Assessment Matrix" },
    ],
  },
  {
    id: "market",
    label: "Market Research",
    subsections: [
      { id: "demographics", label: "Demographics and Population Dynamics" },
      { id: "economic", label: "Economic Health and Employment" },
      { id: "housing", label: "Housing Market Performance" },
      { id: "infrastructure", label: "Infrastructure and Technology" },
      { id: "livability", label: "Livability and Quality of Life" },
      { id: "regulatory", label: "Regulatory and Development Policy" },
      { id: "risk", label: "Risk Mitigation Factors" },
      { id: "opportunities", label: "Emerging Opportunities" },
    ],
  },
  {
    id: "development",
    label: "Development Information",
    subsections: [
      { id: "zoning-params", label: "Zoning & Use Parameters" },
      { id: "setback", label: "Setback & Lot Coverage Standards" },
      { id: "facade", label: "Façade & Exterior Requirements" },
      { id: "height", label: "Height & Massing Controls" },
      { id: "utility", label: "Utility & Infrastructure Compliance" },
      { id: "parking", label: "Parking & Mobility" },
      { id: "env-geo", label: "Environmental & Geotechnical" },
    ],
  },
  {
    id: "entitlements",
    label: "Entitlements Information",
    subsections: [
      { id: "planning", label: "Initial Planning Review" },
      { id: "variance", label: "Zoning Variance Process" },
      { id: "rezoning", label: "Rezoning Process" },
      { id: "permits", label: "Permit Process" },
    ],
  },
]

export function PrintDialog() {
  const [selectedSections, setSelectedSections] = useState<Record<string, boolean>>({})
  const [selectedSubsections, setSelectedSubsections] = useState<Record<string, boolean>>({})

  const handleSectionChange = (sectionId: string, checked: boolean) => {
    setSelectedSections((prev) => ({ ...prev, [sectionId]: checked }))
    const section = printSections.find((s) => s.id === sectionId)
    if (section) {
      const subsectionUpdates = section.subsections.reduce(
        (acc, subsection) => ({
          ...acc,
          [subsection.id]: checked,
        }),
        {},
      )
      setSelectedSubsections((prev) => ({ ...prev, ...subsectionUpdates }))
    }
  }

  const handleSubsectionChange = (sectionId: string, subsectionId: string, checked: boolean) => {
    setSelectedSubsections((prev) => ({ ...prev, [subsectionId]: checked }))

    // Check if all subsections are selected/unselected to update parent section
    const section = printSections.find((s) => s.id === sectionId)
    if (section) {
      const allSubsectionsSelected = section.subsections.every((sub) =>
        subsectionId === sub.id ? checked : selectedSubsections[sub.id],
      )
      setSelectedSections((prev) => ({ ...prev, [sectionId]: allSubsectionsSelected }))
    }
  }

  const handlePrint = () => {
    // Create a hidden iframe for printing
    const printFrame = document.createElement("iframe")
    printFrame.style.position = "fixed"
    printFrame.style.right = "0"
    printFrame.style.bottom = "0"
    printFrame.style.width = "0"
    printFrame.style.height = "0"
    printFrame.style.border = "none"
    document.body.appendChild(printFrame)

    const printDocument = printFrame.contentDocument
    if (!printDocument) return

    // Write initial HTML structure
    printDocument.write(`
<!DOCTYPE html>
<html>
  <head>
    <title>Property Assessment Report</title>
    <style>
      body { 
        font-family: system-ui, sans-serif;
        color: #000;
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }
      h1 { font-size: 24px; margin-bottom: 8px; }
      h2 { font-size: 20px; margin: 24px 0 16px; }
      h3 { font-size: 18px; margin: 16px 0 8px; color: #1a1a1a; }
      p { margin: 8px 0; }
      .section { 
        margin-bottom: 32px;
        break-inside: avoid;
      }
      .subsection { 
        margin: 16px 0;
        break-inside: avoid;
      }
      .card {
        border: 1px solid #e5e7eb;
        padding: 16px;
        margin: 16px 0;
        border-radius: 8px;
        background-color: #fff;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
      }
      th, td {
        border: 1px solid #e5e7eb;
        padding: 8px;
        text-align: left;
      }
      ul { margin: 8px 0; padding-left: 24px; }
      li { margin: 4px 0; }
      .separator {
        border-top: 1px solid #e5e7eb;
        margin: 16px 0;
      }
      @media print {
        .no-print { display: none; }
        .section { page-break-inside: avoid; }
        .card { break-inside: avoid; }
      }
    </style>
  </head>
  <body>
    <div class="print-content">
      <h1>Property Assessment Report</h1>
      <p>1500 Market Street, Philadelphia</p>
    </div>
  </body>
</html>
`)

    const printContent = printDocument.querySelector(".print-content")
    if (!printContent) return

    // Function to process section content
    const processSectionContent = (sectionId: string) => {
      const section = document.querySelector(`[data-section="${sectionId}"]`)
      if (!section) return

      const sectionDiv = printDocument.createElement("div")
      sectionDiv.className = "section"

      // Get section header
      const header = section.querySelector("div > h2")?.parentElement
      if (header) {
        sectionDiv.appendChild(header.cloneNode(true))
      }

      // Get all accordion items in this section
      const accordionItems = Array.from(section.querySelectorAll('[class*="AccordionItem"]'))
      accordionItems.forEach((item) => {
        const itemId = item.getAttribute("data-accordion-item")
        // Only process if this subsection is selected or if we're including the whole section
        if (itemId && (selectedSubsections[itemId] || selectedSections[sectionId])) {
          const content = item.querySelector('[class*="AccordionContent"]')
          const trigger = item.querySelector('[class*="AccordionTrigger"]')

          if (content && trigger) {
            const subsectionDiv = printDocument.createElement("div")
            subsectionDiv.className = "subsection card"

            // Get the title from the trigger
            const titleContainer = trigger.querySelector("div")
            if (titleContainer) {
              const title = titleContainer.querySelector("h2")?.textContent
              if (title) {
                const titleElement = printDocument.createElement("h3")
                titleElement.textContent = title
                subsectionDiv.appendChild(titleElement)
              }
            }

            // Get the actual content
            const contentDiv = content.querySelector('[class*="CardContent"]')
            if (contentDiv) {
              // Clone all the content including nested elements
              const contentClone = contentDiv.cloneNode(true) as HTMLElement

              // Clean up any interactive elements or unnecessary classes
              contentClone.querySelectorAll('button, [class*="hover"]').forEach((el) => {
                el.removeAttribute("class")
              })

              subsectionDiv.appendChild(contentClone)
            }

            sectionDiv.appendChild(subsectionDiv)
          }
        }
      })

      printContent.appendChild(sectionDiv)
    }

    // Process selected sections
    printSections.forEach((section) => {
      if (selectedSections[section.id]) {
        processSectionContent(section.id)
      }
    })

    // Finalize and print
    printDocument.close()

    // Wait for images to load before printing
    printFrame.onload = () => {
      printFrame.contentWindow?.print()
      // Remove the iframe after printing
      setTimeout(() => {
        document.body.removeChild(printFrame)
      }, 1000)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Printer className="h-4 w-4" />
          Print Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Print Report</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {printSections.map((section) => (
              <div key={section.id} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={section.id}
                    checked={selectedSections[section.id]}
                    onCheckedChange={(checked: boolean) => handleSectionChange(section.id, checked)}
                  />
                  <label
                    htmlFor={section.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {section.label}
                  </label>
                </div>
                <div className="ml-6 space-y-1">
                  {section.subsections.map((subsection) => (
                    <div key={subsection.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={subsection.id}
                        checked={selectedSubsections[subsection.id]}
                        onCheckedChange={(checked: boolean) =>
                          handleSubsectionChange(section.id, subsection.id, checked)
                        }
                      />
                      <label
                        htmlFor={subsection.id}
                        className="text-sm leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {subsection.label}
                      </label>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex justify-end">
          <Button onClick={handlePrint} className="gap-2">
            <Check className="h-4 w-4" /> Generate Print Version
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

