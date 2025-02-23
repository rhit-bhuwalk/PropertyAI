"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Home,
  MapPin,
  DollarSign,
  School,
  Volume2,
  ChevronDown,
  ChevronUp,
  User,
  Receipt,
  Calculator,
  Train,
  Plane,
  Truck,
  Bell,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { transformData } from "@/utils/transformData"
import { DataCard } from "@/components/data-card"
import { Header } from "@/components/header"
import { Section } from "@/components/Section"
import { RecursiveDataTable } from "@/components/RecursiveDataTable"
import { NoiseLevel, NoiseSourceList } from "@/components/NoiseComponents"

//
// Utility Functions
//
const isNonEmptyObject = (value: any): boolean =>
  value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length > 0

const formatValue = (value: any, key: string): string => {
  if (value === null || value === undefined) return ""
  if (key.toLowerCase().includes("date") && !isNaN(Date.parse(value))) {
    return new Date(value).toLocaleDateString()
  }
  if (typeof value === "number") {
    if (key.toLowerCase().includes("amount") || key.toLowerCase().includes("value")) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value)
    }
    if (key.toLowerCase().includes("distance")) {
      return `${value.toFixed(2)} miles`
    }
    return value.toLocaleString()
  }
  if (typeof value === "boolean") return value ? "Yes" : "No"
  return String(value)
}

const formatKey = (key: string): string =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim()



interface NoiseSourceListProps {
  sources: any[]
}

//
// Main PropertyReport Component
//
interface PropertyReportProps {
  data: any
}

const PropertyReport: React.FC<PropertyReportProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState("general")

  const tabs = [
    { id: "general", label: "General Property Information", color: "bg-red-500" },
    { id: "zoning", label: "Zoning Information", color: "bg-blue-500" },
    { id: "entitlement", label: "Entitlement Information", color: "bg-green-500" },
    { id: "market", label: "Market Analysis", color: "bg-purple-500" },
  ]

  if (!data) return null

  // Transform specific sections of data using your mapping configurations
  const transformedSummary = transformData(data.summary || {})
  const transformedLot = transformData(data.lot || {})
  const transformedAddress = transformData(data.address || {})
  const transformedSale = transformData(data.sale || {})
  const transformedAssessment = transformData(data.assessment || {})
  const transformedOwner = transformData(data.owner || {})

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <Header
          address={data.address?.oneLine}
          propertyId={data.identifier?.attomId}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="space-y-8">
          {activeTab === "general" && (
            <div className="space-y-8">
              <Section title="Property Overview" icon={<Home className="h-5 w-5" />}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DataCard
                      title="Lot Size"
                      value={`${transformedLot["Lot Size (Acres)"]} acres`}
                      icon={<MapPin className="h-5 w-5" />}
                      details={{
                        "Square Feet": data.lot?.lotsize1,
                        Depth: `${data.lot?.depth} ft`,
                        Frontage: `${data.lot?.frontage} ft`,
                      }}
                    />
                    <DataCard
                      title="Year Built"
                      value={data.summary?.yearbuilt}
                      subtitle="Original Construction"
                      icon={<Home className="h-5 w-5" />}
                    />
                    <DataCard
                      title="Annual Tax"
                      value={data.assessment?.tax?.taxAmt?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                      subtitle={`Tax Year: ${data.assessment?.tax?.taxYear}`}
                      icon={<DollarSign className="h-5 w-5" />}
                    />
                  </div>

                  <div className="bg-white rounded-lg border p-6">
                    <h3 className="text-lg font-semibold mb-4">Property Details</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      {Object.entries(transformedSummary).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <div className="text-sm font-medium text-gray-500">{key}</div>
                          <div className="text-gray-900">{String(value)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Section>

              <Section title="Location & Address" icon={<MapPin className="h-5 w-5" />}>
                <RecursiveDataTable data={transformedAddress} />
                {data.location && (
                  <div className="mt-4">
                    <div className="font-medium mb-2 text-gray-900">Coordinates</div>
                    <p>Latitude: {data.location.latitude}</p>
                    <p>Longitude: {data.location.longitude}</p>
                  </div>
                )}
              </Section>

              <Section title="Owner Information" icon={<User className="h-5 w-5" />}>
                <div className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">Current Owner</h3>
                      <p>{data.owner?.owner1?.fullname}</p>
                      <p className="text-sm text-gray-500">{data.owner?.mailingaddressoneline}</p>
                    </CardContent>
                  </Card>
                  <RecursiveDataTable data={transformedOwner} />
                </div>
              </Section>

              <Section title="Assessment & Value" icon={<Calculator className="h-5 w-5" />}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">
                          {data.assessment?.market?.mktTtlValue?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </div>
                        <p className="text-sm text-gray-500">Market Value</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">
                          {data.assessment?.assessed?.assdTtlValue?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </div>
                        <p className="text-sm text-gray-500">Assessed Value</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">
                          {data.assessment?.tax?.taxAmt?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </div>
                        <p className="text-sm text-gray-500">Tax Amount ({data.assessment?.tax?.taxYear})</p>
                      </CardContent>
                    </Card>
                  </div>
                  <RecursiveDataTable data={transformedAssessment} />
                </div>
              </Section>

              <Section title="Transportation & Noise" icon={<Volume2 className="h-5 w-5" />}>
                {data.transportationNoise && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {data.transportationNoise.road_noise && (
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-4">
                              <Truck className="h-5 w-5 text-gray-500" />
                              <h4 className="font-medium text-gray-900">Road Noise</h4>
                            </div>
                            <NoiseLevel
                              level={data.transportationNoise.road_noise.level}
                              description={data.transportationNoise.road_noise.level_description}
                            />
                            <NoiseSourceList sources={data.transportationNoise.road_noise.noise_sources} />
                          </CardContent>
                        </Card>
                      )}
                      {data.transportationNoise.rail_noise && (
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-4">
                              <Train className="h-5 w-5 text-gray-500" />
                              <h4 className="font-medium text-gray-900">Rail Noise</h4>
                            </div>
                            <NoiseLevel
                              level={data.transportationNoise.rail_noise.level}
                              description={data.transportationNoise.rail_noise.level_description}
                            />
                            <NoiseSourceList sources={data.transportationNoise.rail_noise.noise_sources} />
                          </CardContent>
                        </Card>
                      )}
                      {data.transportationNoise.aviation_noise && (
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-4">
                              <Plane className="h-5 w-5 text-gray-500" />
                              <h4 className="font-medium text-gray-900">Aviation Noise</h4>
                            </div>
                            <NoiseLevel
                              level={data.transportationNoise.aviation_noise.level}
                              description={data.transportationNoise.aviation_noise.level_description}
                            />
                          </CardContent>
                        </Card>
                      )}
                      {data.transportationNoise.emg_vehicle_noise && (
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-4">
                              <Bell className="h-5 w-5 text-gray-500" />
                              <h4 className="font-medium text-gray-900">Emergency Vehicle Noise</h4>
                            </div>
                            <NoiseLevel
                              level={data.transportationNoise.emg_vehicle_noise.level}
                              description={data.transportationNoise.emg_vehicle_noise.level_description}
                            />
                            <NoiseSourceList sources={data.transportationNoise.emg_vehicle_noise.noise_sources} />
                          </CardContent>
                        </Card>
                      )}
                    </div>
                    {data.transportationNoise.overall_summary && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700">{data.transportationNoise.overall_summary}</p>
                      </div>
                    )}
                  </div>
                )}
              </Section>

              <Section title="Schools" icon={<School className="h-5 w-5" />}>
                {data.school && (
                  <div className="grid gap-4">
                    {data.school.map((school: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <h4 className="font-medium text-lg mb-2 text-gray-900">{school.InstitutionName}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Grade Range</p>
                              <p>
                                {school.gradelevel1lotext} - {school.gradelevel1hitext}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">School Rating</p>
                              <p>{school.schoolRating || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Distance</p>
                              <p>{school.distance.toFixed(2)} miles</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </Section>

              <Section title="Market Value" icon={<DollarSign className="h-5 w-5" />}>
                {data.avm && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold">
                            {data.avm.amount.value.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </div>
                          <p className="text-sm text-gray-500">Estimated Value</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold">
                            {data.avm.amount.low.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </div>
                          <p className="text-sm text-gray-500">Low Estimate</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold">
                            {data.avm.amount.high.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </div>
                          <p className="text-sm text-gray-500">High Estimate</p>
                        </CardContent>
                      </Card>
                    </div>
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold mb-4">Value Change</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Last Month's Value</p>
                            <p className="font-medium">
                              {data.avm.AVMChange.avmlastmonthvalue.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Change</p>
                            <p className="font-medium">
                              {data.avm.AVMChange.avmpercentchange}% (
                              {data.avm.AVMChange.avmamountchange.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                              )
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Last updated: {new Date(data.avm.eventDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </Section>

              <Section title="Sale Information" icon={<Receipt className="h-5 w-5" />}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DataCard
                      title="Sale Amount"
                      value={data.sale?.amount?.saleAmt?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                      subtitle={`Sale Date: ${new Date(data.sale?.saleTransDate).toLocaleDateString()}`}
                      icon={<DollarSign className="h-5 w-5" />}
                      details={{
                        "Sale Type": data.sale?.type,
                        "Document Type": data.sale?.document?.doctype,
                        "Recording Date": new Date(data.sale?.document?.recordingdate).toLocaleDateString(),
                      }}
                    />
                    <DataCard
                      title="Previous Sale"
                      value={data.sale?.priorSale?.amount?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                      subtitle={`Prior Sale Date: ${new Date(data.sale?.priorSale?.date).toLocaleDateString()}`}
                      icon={<Receipt className="h-5 w-5" />}
                    />
                  </div>
                </div>
              </Section>
            </div>
          )}

          {activeTab === "zoning" && (
            <div className="p-8 text-center text-gray-500">
              <p>Zoning information will be displayed here</p>
            </div>
          )}

          {activeTab === "entitlement" && (
            <div className="p-8 text-center text-gray-500">
              <p>Entitlement information will be displayed here</p>
            </div>
          )}

          {activeTab === "market" && (
            <div className="p-8 text-center text-gray-500">
              <p>Market analysis will be displayed here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyReport

