"use client"

import { Users, TrendingUp, Building2, Radio, Smile, Scale, ShieldAlert, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function MarketResearch() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100/50">
      <div className="container mx-auto p-8 max-w-7xl">
        <div className="space-y-16">
          <Accordion type="multiple" className="space-y-6">
            {/* Demographics Section */}
            <AccordionItem value="demographics">
              <AccordionTrigger className="hover:no-underline accordion-trigger">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6" style={{ color: "#E86C24" }} />
                  <h2 className="text-2xl font-semibold text-left">Demographic and Population Dynamics</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <div className="grid gap-6">
                  <Card className="bg-white shadow-md">
                    <CardHeader>
                      <CardTitle>Core Population Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">Growth Indicators</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>
                              Annual population growth rate: &gt; 1.5% YoY (Sun Belt metros: +2.1% vs Rural: -0.3%)
                            </li>
                            <li>Age distribution: 28%+ millennials indicating strong rental demand</li>
                            <li>Net migration: Austin-Round Rock MSA gained 53,000 residents (2023)</li>
                            <li>Household formation: Healthy markets maintain ≥1.2x population growth</li>
                          </ul>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="font-medium mb-2">Socioeconomic Composition</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>
                              Educational attainment: 35%+ bachelor&apos;s degree holders (Durham-Chapel Hill: 48%)
                            </li>
                            <li>
                              Household distribution: &gt; 40% single-person households require different housing stock
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Economic Health Section */}
            <AccordionItem value="economic">
              <AccordionTrigger className="hover:no-underline accordion-trigger">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6" style={{ color: "#E86C24" }} />
                  <h2 className="text-2xl font-semibold text-left">Economic Health and Employment</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <div className="grid gap-6">
                  <Card className="bg-white shadow-md">
                    <CardHeader>
                      <CardTitle>Employment Fundamentals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">Key Metrics</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Target unemployment rate: ≤4.5%</li>
                            <li>Employer concentration: No single employer &gt; 15% workforce</li>
                            <li>Houston example: Energy (22%), Healthcare (16%), Tech (12%)</li>
                          </ul>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="font-medium mb-2">Wage and Income Trends</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Price-to-income ratios: Healthy markets &lt; 4.5</li>
                            <li>Income growth: Target 5%+ real wage growth</li>
                            <li>Gig economy: &gt; 12% freelance population drives flexible leasing</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Housing Market Section */}
            <AccordionItem value="housing">
              <AccordionTrigger className="hover:no-underline accordion-trigger">
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6" style={{ color: "#E86C24" }} />
                  <h2 className="text-2xl font-semibold text-left">Housing Market Performance</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <div className="grid gap-6">
                  <Card className="bg-white shadow-md">
                    <CardHeader>
                      <CardTitle>Market Indicators</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">Housing Stock Analysis</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Optimal homeownership rate: 55-65%</li>
                            <li>Days on market: &lt; 30 DOM (seller&apos;s market), &gt; 60 DOM (oversupply)</li>
                            <li>Price-to-rent ratio: &lt; 15 favors rentals, &gt; 20 favors ownership</li>
                          </ul>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="font-medium mb-2">Development Economics</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Construction costs: Lumber ($375/1,000 board feet), Concrete ($125/cy)</li>
                            <li>Absorption rates: Target ≥8%/quarter for multifamily</li>
                            <li>Permits: Austin issued 12,400 multifamily permits (2024)</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Infrastructure Section */}
            <AccordionItem value="infrastructure">
              <AccordionTrigger className="hover:no-underline accordion-trigger">
                <div className="flex items-center gap-3">
                  <Radio className="h-6 w-6" style={{ color: "#E86C24" }} />
                  <h2 className="text-2xl font-semibold text-left">Infrastructure and Technology</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <div className="grid gap-6">
                  <Card className="bg-white shadow-md">
                    <CardHeader>
                      <CardTitle>Infrastructure Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">Traditional Utilities</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Power grid: &gt; 50% assets &lt; 20 years old preferred</li>
                            <li>Water stress: Phoenix score 4.8/5 risk (USGS WaterWatch)</li>
                          </ul>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="font-medium mb-2">Digital Infrastructure</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Fiber coverage: Target &gt; 85% premises (Chattanooga: 98%)</li>
                            <li>5G deployment: Complete coverage yields 9% rent premiums</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Livability Section */}
            <AccordionItem value="livability">
              <AccordionTrigger className="hover:no-underline accordion-trigger">
                <div className="flex items-center gap-3">
                  <Smile className="h-6 w-6" style={{ color: "#E86C24" }} />
                  <h2 className="text-2xl font-semibold text-left">Livability and Quality of Life</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <div className="grid gap-6">
                  <Card className="bg-white shadow-md">
                    <CardHeader>
                      <CardTitle>AARP Livability Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">Key Indicators</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Walk Score®: &gt; 70 requires 15% less parking</li>
                            <li>Healthcare: ≤15-minute EMS response, ≥2.5 physicians/1,000 residents</li>
                            <li>Environmental: Air quality index ≤50, &lt; 5% floodplain occupancy</li>
                          </ul>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="font-medium mb-2">Social Infrastructure</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Schools: GreatSchools ≥8/10 commands 22% price premium</li>
                            <li>Cultural assets: ≥1 museum/theater per 50,000 residents</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Regulatory Section */}
            <AccordionItem value="regulatory">
              <AccordionTrigger className="hover:no-underline accordion-trigger">
                <div className="flex items-center gap-3">
                  <Scale className="h-6 w-6" style={{ color: "#E86C24" }} />
                  <h2 className="text-2xl font-semibold text-left">Regulatory and Development Policy</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <div className="grid gap-6">
                  <Card className="bg-white shadow-md">
                    <CardHeader>
                      <CardTitle>Policy Framework</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">Zoning and Entitlements</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Mixed-use zoning: Live/work units reduce approval time by 40%</li>
                            <li>Permit efficiency: Target ≤90 days approval time</li>
                          </ul>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="font-medium mb-2">Fiscal Policies</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Property tax rates: Target &lt; 1.8% (Denver: 0.6% vs Houston: 2.3%)</li>
                            <li>Opportunity Zones: 10-15% IRR boost potential</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Risk Section */}
            <AccordionItem value="risk">
              <AccordionTrigger className="hover:no-underline accordion-trigger">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="h-6 w-6" style={{ color: "#E86C24" }} />
                  <h2 className="text-2xl font-semibold text-left">Risk Mitigation Factors</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <div className="grid gap-6">
                  <Card className="bg-white shadow-md">
                    <CardHeader>
                      <CardTitle>Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">Market Cyclicality</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>REIT exposure: &gt; 30% institutional ownership reduces price swings by 50%</li>
                            <li>Distressed assets: Target &lt; 2% foreclosure rate (national: 1.3%)</li>
                          </ul>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="font-medium mb-2">Climate Resilience</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>FEMA Risk Index: Miami (94/100) vs Boise (18/100)</li>
                            <li>Flood insurance: Rising NFIP premiums &gt; $3,500/yr deter buyers</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Opportunities Section */}
            <AccordionItem value="opportunities">
              <AccordionTrigger className="hover:no-underline accordion-trigger">
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-6 w-6" style={{ color: "#E86C24" }} />
                  <h2 className="text-2xl font-semibold text-left">Emerging Opportunities</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <div className="grid gap-6">
                  <Card className="bg-white shadow-md">
                    <CardHeader>
                      <CardTitle>Future Growth Indicators</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">Technology Adoption</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Smart home systems: 12% higher NOI through efficiency</li>
                            <li>Virtual tours: 3D Matterport tours lease 50% faster</li>
                          </ul>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="font-medium mb-2">Sustainability</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>EV readiness: ≥5% EV registrations need charging infrastructure</li>
                            <li>Net-zero buildings: NZEB standards secure 2.5pp lower financing</li>
                          </ul>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="font-medium mb-2">Municipality Incentives</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Project grants available for comprehensive plan alignment</li>
                            <li>Quality of life improvement incentives</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

