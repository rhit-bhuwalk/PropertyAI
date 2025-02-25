"use client"

import { Building2, Layout, Box, Ruler, Power, Car, TreePine } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function DevelopmentInfo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100/50">
      <div className="container mx-auto p-8 max-w-7xl">
        <div className="space-y-16">
          <Accordion type="multiple" className="space-y-6">
            {/* Zoning & Use Parameters */}
            <AccordionItem value="zoning">
              <AccordionTrigger className="hover:no-underline accordion-trigger">
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6" style={{ color: "#E86C24" }} />
                  <h2 className="text-2xl font-semibold text-left">Zoning & Use Parameters</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <Card className="bg-white shadow-md">
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Permitted Use Matrix</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>By-right entitlements: 5-15 primary uses without discretionary approval</li>
                          <li>Conditional use thresholds: Special permits for high-impact uses</li>
                          <li>300-500&apos; buffers required from residential zones</li>
                        </ul>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Overlay District Implications</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>78% of major metros impose supplemental standards for historic areas</li>
                          <li>Tree canopy retention ≥25% coverage mandated in 63% of southeastern codes</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Setback & Lot Coverage */}
            <AccordionItem value="setback">
              <AccordionTrigger className="hover:no-underline accordion-trigger">
                <div className="flex items-center gap-3">
                  <Layout className="h-6 w-6" style={{ color: "#E86C24" }} />
                  <h2 className="text-2xl font-semibold text-left">Setback & Lot Coverage Standards</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <Card className="bg-white shadow-md">
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Primary Setback Ratios</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>Front setbacks: 0&apos; in urban cores to 50&apos;+ in suburban zones</li>
                          <li>Side/Rear buffers: 5-10&apos; for residential, increasing with building height</li>
                          <li>30&apos; separations between tall buildings in specific zones</li>
                        </ul>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Buildable Area Calculations</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>Lot coverage: 60-85% in urban zones</li>
                          <li>15-25% permeable surface requirements</li>
                          <li>FAR restrictions on floorplates above 85'</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Facade & Exterior */}
            <AccordionItem value="facade">
              <AccordionTrigger className="hover:no-underline accordion-trigger">
                <div className="flex items-center gap-3">
                  <Box className="h-6 w-6" style={{ color: "#E86C24" }} />
                  <h2 className="text-2xl font-semibold text-left">Façade & Exterior Requirements</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <Card className="bg-white shadow-md">
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Design Mandates</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>60% ground-floor glazing for street-facing commercial</li>
                          <li>30% upper-floor fenestration requirements</li>
                          <li>75% of codes restrict vinyl siding in core districts</li>
                        </ul>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Maintenance Compliance</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>5-10 year façade examination cycles</li>
                          <li>42&quot; minimum parapet heights in wind-prone regions</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Height & Massing */}
            <AccordionItem value="height">
              <AccordionTrigger className="hover:no-underline accordion-trigger">
                <div className="flex items-center gap-3">
                  <Ruler className="h-6 w-6" style={{ color: "#E86C24" }} />
                  <h2 className="text-2xl font-semibold text-left">Height & Massing Controls</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <Card className="bg-white shadow-md">
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Vertical Limitations</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>35-85&apos; typical in mixed-use zones</li>
                          <li>15-25% height bonuses for affordable housing</li>
                          <li>Tower separation requirements vary by city</li>
                        </ul>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Massing Configuration</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>15&apos; setbacks above 85&apos; common in West Coast cities</li>
                          <li>Floorplate restrictions vary from 12,000 SF to 25,000 SF</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Utility & Infrastructure */}
            <AccordionItem value="utility">
              <AccordionTrigger className="hover:no-underline accordion-trigger">
                <div className="flex items-center gap-3">
                  <Power className="h-6 w-6" style={{ color: "#E86C24" }} />
                  <h2 className="text-2xl font-semibold text-left">Utility & Infrastructure Compliance</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <Card className="bg-white shadow-md">
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Subsurface Coordination</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>ASCE 38-22 standards for utility conflict mapping</li>
                          <li>Pre-construction agreements required with utility providers</li>
                        </ul>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Service Capacity Verification</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>Demand fees averaging $8,500/ERU</li>
                          <li>400A-1,200A+ electrical service requirements</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Parking & Mobility */}
            <AccordionItem value="parking">
              <AccordionTrigger className="hover:no-underline accordion-trigger">
                <div className="flex items-center gap-3">
                  <Car className="h-6 w-6" style={{ color: "#E86C24" }} />
                  <h2 className="text-2xl font-semibold text-left">Parking & Mobility</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <Card className="bg-white shadow-md">
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Parking Requirements</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>0.5-2 spaces/residential unit</li>
                          <li>2.5-4 spaces/1,000 SF commercial</li>
                          <li>35% reductions available near transit</li>
                        </ul>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Alternative Transportation</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>Class 1 bike lanes required in 68% of TOD overlays</li>
                          <li>20% EV-ready parking spaces by 2027 (CA)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Environmental & Geotechnical */}
            <AccordionItem value="environmental">
              <AccordionTrigger className="hover:no-underline accordion-trigger">
                <div className="flex items-center gap-3">
                  <TreePine className="h-6 w-6" style={{ color: "#E86C24" }} />
                  <h2 className="text-2xl font-semibold text-left">Environmental & Geotechnical</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <Card className="bg-white shadow-md">
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Contamination Protocols</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>Mandatory Phase I ESA for commercial redevelopments</li>
                          <li>Vapor intrusion mitigation in 90% of former industrial sites</li>
                        </ul>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Stormwater Management</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>95th percentile storm retention requirements</li>
                          <li>15-25% landscaped area minimums</li>
                          <li>Native species mandates</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

