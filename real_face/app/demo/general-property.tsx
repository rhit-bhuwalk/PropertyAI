"use client"

import { MapPin, Building2, FileText, Zap, TreePine, TrendingUp, Shield } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function PropertyReport() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100/50">
      <div className="container mx-auto p-8 max-w-7xl">
        <div className="space-y-16">
          {/* Header */}

          <Accordion type="multiple" className="space-y-6">
            <AccordionItem value="identification">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-500" />
                  <h2 className="text-2xl font-semibold text-left">Property Identification & Legal Framework</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <section className="space-y-6">
                  <Card className="shadow-md">
                    <CardContent className="pt-8">
                      <div className="grid gap-8">
                        <div>
                          <h3 className="font-semibold mb-3 text-lg">Geospatial Information</h3>
                          <p className="text-muted-foreground">
                            Coordinates: 39.952583, -75.165222
                            <br />
                            GIS Parcel Boundaries: 2.11 acres within Philadelphia County
                          </p>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="font-semibold mb-3 text-lg">Legal Description</h3>
                          <p className="text-muted-foreground">
                            1928 subdivision plan recorded in Deed Book 342, Page 45
                            <br />
                            Western boundary along 135° azimuth
                          </p>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="font-semibold mb-3 text-lg">Regulatory Status</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-medium">Zoning Classification</p>
                              <p className="text-muted-foreground">C-4 (Commercial Mixed-Use)</p>
                              <p className="text-muted-foreground">FAR 5:1 with 85' height limit</p>
                            </div>
                            <div>
                              <p className="font-medium">Overlay Districts</p>
                              <p className="text-muted-foreground">Central Delaware Overlay</p>
                              <p className="text-muted-foreground">30% public waterfront access required</p>
                            </div>
                          </div>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="font-semibold mb-3 text-lg">Tax Status</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-medium">Property Classification</p>
                              <p className="text-muted-foreground">Class 4 - Commercial Property</p>
                              <p className="text-muted-foreground">Tax ID: 08-123456-00</p>
                            </div>
                            <div>
                              <p className="font-medium">Tax Exemptions & Abatements</p>
                              <p className="text-muted-foreground">10-year KOIZ tax abatement (expires 2028)</p>
                              <p className="text-muted-foreground">80% real estate tax reduction</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="physical">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-emerald-500" />
                  <h2 className="text-2xl font-semibold text-left">Physical Site Characteristics</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <section className="space-y-6">
                  <div className="grid gap-6">
                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>Lot Configuration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-medium mb-2">Dimensional Analysis</h3>
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <dt className="text-muted-foreground">Frontage</dt>
                                <dd>307' (Market Street)</dd>
                              </div>
                              <div>
                                <dt className="text-muted-foreground">Depth</dt>
                                <dd>264'</dd>
                              </div>
                              <div>
                                <dt className="text-muted-foreground">Gross Area</dt>
                                <dd>91,912 SF</dd>
                              </div>
                              <div>
                                <dt className="text-muted-foreground">Net Buildable</dt>
                                <dd>78,450 SF</dd>
                              </div>
                            </dl>
                          </div>
                          <Separator />
                          <div>
                            <h3 className="font-medium mb-2">Topographical Profile</h3>
                            <p className="text-muted-foreground">2.8% grade slope NW to SE</p>
                            <p className="text-muted-foreground">8.3' elevation differential</p>
                            <p className="text-muted-foreground">Class C clay soil (3,500 psf bearing capacity)</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>Easements & Encumbrances</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-medium mb-2">Recorded Easements</h3>
                            <ul className="space-y-2 text-muted-foreground">
                              <li>20' utility easement along eastern boundary</li>
                              <li>Public right-of-way (15' from curb line)</li>
                              <li>Shared driveway agreement with adjacent parcel</li>
                            </ul>
                          </div>
                          <Separator />
                          <div>
                            <h3 className="font-medium mb-2">Deed Restrictions</h3>
                            <ul className="space-y-2 text-muted-foreground">
                              <li>Height restriction covenant (max 120')</li>
                              <li>Use restriction: No heavy industrial</li>
                              <li>Setback requirements from historic façade</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>Structural Inventory</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-medium mb-2">Existing Improvements</h3>
                            <ul className="space-y-2 text-muted-foreground">
                              <li>42,500 SF 8-story masonry office building (1927)</li>
                              <li>1,200 SF surface parking lot (24 spaces)</li>
                              <li>500 SF utility substation</li>
                            </ul>
                          </div>
                          <Separator />
                          <div>
                            <h3 className="font-medium mb-2">Building Metrics</h3>
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <dt className="text-muted-foreground">Floor Plates</dt>
                                <dd>5,312 SF typical (floors 2-7)</dd>
                              </div>
                              <div>
                                <dt className="text-muted-foreground">Clear Heights</dt>
                                <dd>14' ground floor, 11' upper floors</dd>
                              </div>
                              <div>
                                <dt className="text-muted-foreground">Elevators</dt>
                                <dd>2 Otis Gen2® units (2018)</dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="zoning">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-orange-500" />
                  <h2 className="text-2xl font-semibold text-left">Zoning & Entitlements</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <section className="space-y-6">
                  <div className="grid gap-6">
                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>Current Zoning Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-medium mb-2">Development Standards</h3>
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <dt className="text-muted-foreground">Base FAR</dt>
                                <dd>5:1 (459,560 SF potential)</dd>
                              </div>
                              <div>
                                <dt className="text-muted-foreground">Height Limit</dt>
                                <dd>85' base / 120' with bonuses</dd>
                              </div>
                              <div>
                                <dt className="text-muted-foreground">Setbacks</dt>
                                <dd>0' front, 10' side/rear</dd>
                              </div>
                              <div>
                                <dt className="text-muted-foreground">Parking Ratio</dt>
                                <dd>1:1000 SF minimum</dd>
                              </div>
                            </dl>
                          </div>
                          <Separator />
                          <div>
                            <h3 className="font-medium mb-2">Available Bonuses</h3>
                            <ul className="space-y-2 text-muted-foreground">
                              <li>20% FAR bonus for public plaza</li>
                              <li>35' height bonus for LEED Gold</li>
                              <li>Parking reduction (transit overlay)</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>Entitlement Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-medium mb-2">Current Approvals</h3>
                            <ul className="space-y-2 text-muted-foreground">
                              <li>Master Plan approval (2023)</li>
                              <li>Environmental clearance</li>
                              <li>Historic preservation review complete</li>
                            </ul>
                          </div>
                          <Separator />
                          <div>
                            <h3 className="font-medium mb-2">Required Permits</h3>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="font-semibold">Permit Type</TableHead>
                                  <TableHead className="font-semibold">Status</TableHead>
                                  <TableHead className="font-semibold">Timeline</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>Building Permit</TableCell>
                                  <TableCell>
                                    <Badge variant="secondary">Pending</Badge>
                                  </TableCell>
                                  <TableCell>4-6 months</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Demolition Permit</TableCell>
                                  <TableCell>
                                    <Badge variant="green">Approved</Badge>
                                  </TableCell>
                                  <TableCell>Valid through 2025</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Site Plan Review</TableCell>
                                  <TableCell>
                                    <Badge>In Review</Badge>
                                  </TableCell>
                                  <TableCell>2-3 months</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="construction">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-semibold text-left">Construction & Systems Profile</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <section className="space-y-6">
                  <div className="grid gap-6">
                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>Structural Components</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium mb-2">Foundation</h3>
                            <p className="text-muted-foreground">Original 1927 concrete spread footings (18" depth)</p>
                            <p className="text-muted-foreground">2018 seismic retrofits ($620K)</p>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Framing</h3>
                            <p className="text-muted-foreground">Steel wide-flange columns (W14×132)</p>
                            <p className="text-muted-foreground">8" concrete decking</p>
                            <p className="text-muted-foreground">125 psf live load capacity</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>Mechanical Systems</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-medium mb-2">HVAC</h3>
                            <p className="text-muted-foreground">2019 Trane® rooftop units (2× 60-ton)</p>
                            <p className="text-muted-foreground">8-year remaining useful life</p>
                          </div>
                          <Separator />
                          <div>
                            <h3 className="font-medium mb-2">Plumbing & Electrical</h3>
                            <ul className="space-y-2 text-muted-foreground">
                              <li>Cast iron waste lines (70% remaining wall thickness)</li>
                              <li>Lead service lateral requiring $85K replacement</li>
                              <li>1,200A 3-phase service (30% capacity margin)</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="environmental">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <TreePine className="h-6 w-6 text-green-500" />
                  <h2 className="text-2xl font-semibold text-left">Environmental & Geotechnical</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <section className="space-y-6">
                  <div className="grid gap-6">
                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>Environmental Assessment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-medium mb-2">Phase I ESA Findings (2024)</h3>
                            <Badge variant="destructive" className="mb-2">
                              REC Identified
                            </Badge>
                            <p className="text-muted-foreground">Former dry cleaner (1947-1962)</p>
                            <p className="text-muted-foreground">Phase II testing required</p>
                          </div>
                          <Separator />
                          <div>
                            <h3 className="font-medium mb-2">Soil Contamination</h3>
                            <p className="text-muted-foreground">TCE levels: 1.8 ppm (EPA RSL 0.6 ppm)</p>
                            <p className="text-muted-foreground">Monitoring well MW-3</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>Flood Risk Assessment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium mb-2">FEMA Designation</h3>
                            <Badge variant="secondary" className="mb-2">
                              Zone AE
                            </Badge>
                            <p className="text-muted-foreground">1% annual flood chance</p>
                            <p className="text-muted-foreground">BFE 12.3 NAVD88</p>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Mitigation Requirements</h3>
                            <p className="text-muted-foreground">3' freeboard above BFE for new construction</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="economics">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-indigo-500" />
                  <h2 className="text-2xl font-semibold text-left">Development Economics</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <section className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>Current Use Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <dl className="space-y-4">
                          <div>
                            <dt className="font-medium">Office Rents</dt>
                            <dd className="text-muted-foreground">$42/SF</dd>
                          </div>
                          <div>
                            <dt className="font-medium">NOI</dt>
                            <dd className="text-muted-foreground">$1.78M</dd>
                          </div>
                          <div>
                            <dt className="font-medium">Cap Rate</dt>
                            <dd className="text-muted-foreground">6.25%</dd>
                          </div>
                          <div>
                            <dt className="font-medium">Value</dt>
                            <dd className="text-muted-foreground">$28.5M</dd>
                          </div>
                        </dl>
                      </CardContent>
                    </Card>

                    <Card className="shadow-md md:col-span-2">
                      <CardHeader>
                        <CardTitle>Tax History & Projections</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="font-semibold">Tax Year</TableHead>
                                <TableHead className="font-semibold">Assessed Value</TableHead>
                                <TableHead className="font-semibold">Tax Rate</TableHead>
                                <TableHead className="font-semibold">Total Tax</TableHead>
                                <TableHead className="font-semibold">Abated Amount</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>2024</TableCell>
                                <TableCell>$4,200,000</TableCell>
                                <TableCell>1.3998%</TableCell>
                                <TableCell>$58,791</TableCell>
                                <TableCell>$235,165</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>2023</TableCell>
                                <TableCell>$4,100,000</TableCell>
                                <TableCell>1.3998%</TableCell>
                                <TableCell>$57,391</TableCell>
                                <TableCell>$229,565</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>2022</TableCell>
                                <TableCell>$3,950,000</TableCell>
                                <TableCell>1.3998%</TableCell>
                                <TableCell>$55,291</TableCell>
                                <TableCell>$221,165</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>2021</TableCell>
                                <TableCell>$3,800,000</TableCell>
                                <TableCell>1.3998%</TableCell>
                                <TableCell>$53,191</TableCell>
                                <TableCell>$212,765</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                          <div>
                            <h3 className="font-medium mb-2">Tax Notes</h3>
                            <ul className="space-y-2 text-muted-foreground">
                              <li>Property tax increases capped at 2.5% annually</li>
                              <li>KOIZ abatement reduces taxes by 80% through 2028</li>
                              <li>Special assessment district: $0.15/$100 value</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>Reuse Potential</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <dl className="space-y-4">
                          <div>
                            <dt className="font-medium">Proposed Use</dt>
                            <dd className="text-muted-foreground">320-unit multifamily</dd>
                          </div>
                          <div>
                            <dt className="font-medium">Market Rents</dt>
                            <dd className="text-muted-foreground">$68/SF</dd>
                          </div>
                          <div>
                            <dt className="font-medium">Projected NOI</dt>
                            <dd className="text-muted-foreground">$14.2M</dd>
                          </div>
                          <div>
                            <dt className="font-medium">Exit Value</dt>
                            <dd className="text-muted-foreground">$284M at 5% cap</dd>
                          </div>
                        </dl>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="insurance">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-purple-500" />
                  <h2 className="text-2xl font-semibold text-left">Insurance & Risk Assessment</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <section className="space-y-6">
                  <div className="grid gap-6">
                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>Insurance Profile</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-medium mb-2">Current Coverage</h3>
                            <p className="text-muted-foreground">$18M replacement cost policy</p>
                            <p className="text-muted-foreground">80% coinsurance</p>
                            <p className="text-muted-foreground">$500K deductible</p>
                          </div>
                          <Separator />
                          <div>
                            <h3 className="font-medium mb-2">Loss History</h3>
                            <ul className="space-y-2 text-muted-foreground">
                              <li>2021: $127K water damage (APD# 334-556677)</li>
                              <li>2019: $42K façade repair (APD# 298-112233)</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>Risk Assessment Matrix</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="font-semibold">Risk Factor</TableHead>
                              <TableHead className="font-semibold">Severity</TableHead>
                              <TableHead className="font-semibold">Likelihood</TableHead>
                              <TableHead className="font-semibold">Mitigation Cost</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Soil Contamination</TableCell>
                              <TableCell>
                                <Badge variant="destructive">High</Badge>
                              </TableCell>
                              <TableCell>Certain</TableCell>
                              <TableCell>$850K</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Structural Upgrades</TableCell>
                              <TableCell>
                                <Badge variant="secondary">Medium</Badge>
                              </TableCell>
                              <TableCell>Probable</TableCell>
                              <TableCell>$1.2M</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Construction Inflation</TableCell>
                              <TableCell>
                                <Badge variant="destructive">High</Badge>
                              </TableCell>
                              <TableCell>Likely</TableCell>
                              <TableCell>15% Contingency</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

