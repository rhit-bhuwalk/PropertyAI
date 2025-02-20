"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, MapPin, DollarSign, School, Volume2, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

const Section = ({ title, icon, children }: SectionProps) => {
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

const DataTable = ({ data }: { data: Record<string, any> }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {Object.entries(data).map(([key, value]) => {
      if (value === null || value === undefined || value === "") return null
      if (typeof value === "object" && Object.keys(value).length === 0) return null

      return (
        <div key={key} className="flex justify-between p-2 border-b">
          <span className="font-medium capitalize text-gray-700">{key.replace(/([A-Z])/g, " $1").trim()}</span>
          <span className="text-gray-600">{typeof value === "object" ? JSON.stringify(value) : String(value)}</span>
        </div>
      )
    })}
  </div>
)

const NoiseLevel = ({ level }: { level: number }) => {
  const colors = {
    0: "bg-green-100 text-green-800",
    1: "bg-yellow-100 text-yellow-800",
    2: "bg-orange-100 text-orange-800",
    3: "bg-red-100 text-red-800",
  }

  return <Badge className={colors[level as keyof typeof colors]}>Level {level}</Badge>
}

export default function PropertyReport({ data }: { data: any }) {
    console.log("data");
  if (!data) return null

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.address?.oneLine}</h1>
          <p className="text-gray-500">Property ID: {data.identifier?.attomId}</p>
        </div>

        <Section title="Property Overview" icon={<Home className="h-5 w-5" />}>
          <div className="grid gap-6">
            <DataTable data={data.summary || {}} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{data.lot?.lotsize1} acres</div>
                  <p className="text-sm text-gray-500">Lot Size</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{data.summary?.yearbuilt}</div>
                  <p className="text-sm text-gray-500">Year Built</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {data.assessment?.tax?.taxAmt?.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </div>
                  <p className="text-sm text-gray-500">Annual Tax</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Section>

        <Section title="Location & Address" icon={<MapPin className="h-5 w-5" />}>
          <DataTable data={data.address || {}} />
          {data.location && (
            <div className="mt-4">
              <div className="font-medium mb-2 text-gray-900">Coordinates</div>
              <p>Latitude: {data.location.latitude}</p>
              <p>Longitude: {data.location.longitude}</p>
            </div>
          )}
        </Section>

        <Section title="Transportation & Noise" icon={<Volume2 className="h-5 w-5" />}>
          {data.transportationNoise && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.transportationNoise.road_noise && (
                  <div>
                    <h4 className="font-medium mb-2 text-gray-900">Road Noise</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <NoiseLevel level={data.transportationNoise.road_noise.level} />
                      <span>{data.transportationNoise.road_noise.level_description}</span>
                    </div>
                  </div>
                )}
                {data.transportationNoise.emg_vehicle_noise && (
                  <div>
                    <h4 className="font-medium mb-2 text-gray-900">Emergency Vehicle Noise</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <NoiseLevel level={data.transportationNoise.emg_vehicle_noise.level} />
                      <span>{data.transportationNoise.emg_vehicle_noise.level_description}</span>
                    </div>
                  </div>
                )}
                {data.transportationNoise.aviation_noise && (
                  <div>
                    <h4 className="font-medium mb-2 text-gray-900">Aviation Noise</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <NoiseLevel level={data.transportationNoise.aviation_noise.level} />
                      <span>{data.transportationNoise.aviation_noise.level_description}</span>
                    </div>
                  </div>
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
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">
                      {data.avm.amount.value.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </div>
                    <p className="text-sm text-gray-500">Estimated Value</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">
                      {data.avm.amount.low.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </div>
                    <p className="text-sm text-gray-500">Low Estimate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">
                      {data.avm.amount.high.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </div>
                    <p className="text-sm text-gray-500">High Estimate</p>
                  </CardContent>
                </Card>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Last updated: {new Date(data.avm.eventDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </Section>
      </div>
    </div>
  )
}

