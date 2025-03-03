"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PropertyReportHandler } from "@/lib/report-handler"
import { mockPropertyData, DEMO_PROPERTIES } from "@/app/demo-kush-cursor/mock-data"
import { GeneralPropertyTab } from "@/app/report/general-property-info-tab"
import { DevelopmentInfoTab } from "@/app/report/development-info"

// Define the property type
interface DemoProperty {
  address: string;
  lat: number;
  lng: number;
}

export default function DemoPage() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
  const [reportHandler, setReportHandler] = useState<PropertyReportHandler | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const mapRef = useRef<google.maps.Map | null>(null)

  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMapsScript = () => {
      const existingScript = document.getElementById("google-maps-script")
      if (existingScript) {
        if (window.google?.maps) {
          initializeMap()
        } else {
          existingScript.addEventListener("load", initializeMap)
        }
        return
      }
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
      const script = document.createElement("script")
      script.id = "google-maps-script"
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initializeMap
      document.body.appendChild(script)
    }

    const initializeMap = () => {
      if (window.google?.maps) {
        // Initialize map centered on Philadelphia
        mapRef.current = new window.google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            center: { lat: 39.9526, lng: -75.1652 }, // Philadelphia coordinates
            zoom: 13,
            backgroundColor: "#ffffff",
          }
        )

        // Add markers for all demo properties
        DEMO_PROPERTIES.forEach((property: DemoProperty) => {
          const marker = new window.google.maps.Marker({
            position: { lat: property.lat, lng: property.lng },
            map: mapRef.current,
            title: property.address,
          })

          // Add click event to markers
          marker.addListener("click", () => {
            setSelectedProperty(property.address)
            
            // Center map on selected property
            if (mapRef.current) {
              mapRef.current.setCenter({ lat: property.lat, lng: property.lng })
              mapRef.current.setZoom(15)
            }
          })
        })
      }
    }

    loadGoogleMapsScript()
  }, [])

  const handlePropertySelect = (address: string) => {
    setSelectedProperty(address)
    
    // Find property coordinates and center map
    const property = DEMO_PROPERTIES.find((p: DemoProperty) => p.address === address)
    if (property && mapRef.current) {
      mapRef.current.setCenter({ lat: property.lat, lng: property.lng })
      mapRef.current.setZoom(15)
    }
  }

  const handleAnalyze = () => {
    if (!selectedProperty) return

    setIsLoading(true)
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Create new report handler with mock data for the selected property
      const propertyData = mockPropertyData[selectedProperty]
      const handler = new PropertyReportHandler(selectedProperty)
      
      // Set the property data to the handler
      if (propertyData) {
        handler.setGeneralInfo(propertyData)
      }
      
      setReportHandler(handler)
      setIsLoading(false)
      setShowReport(true)
      
      // Store property address in localStorage for consistency with the real app
      localStorage.setItem("propertyAddress", selectedProperty)
    }, 1500) // 1.5 seconds delay to simulate loading
  }

  const handleBackToSelection = () => {
    setShowReport(false)
    setReportHandler(null)
  }

  if (showReport && reportHandler) {
    return (
      <main className="property-demo min-h-screen pt-16">
        <header className="px-4 py-6 fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="w-8 h-8 bg-orange-500/10 rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-orange-500 rounded-sm" />
              </div>
              <span className="font-medium">PropertyAI</span>
            </Link>
            <Button
              variant="outline"
              onClick={handleBackToSelection}
              className="text-sm"
            >
              Back to Property Selection
            </Button>
          </div>
        </header>

        <div className="container mx-auto py-12 px-4 md:px-8 space-y-12">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold tracking-tight">Property Assessment Report</h1>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <p className="text-lg">{selectedProperty}</p>
            </div>

            {/* Image Carousel */}
            <div className="relative">
              <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uZ7J3h8v7RkCQvbW4zOpGQWPKISqu1.png"
                  alt="Exterior view of the property"
                  fill
                  style={{ objectFit: "cover" }}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardDescription>Parcel ID</CardDescription>
                  <CardTitle className="text-xl">#888-123456</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardDescription>Total Area</CardDescription>
                  <CardTitle className="text-xl">2.11 acres</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardDescription>Assessed Value (2024)</CardDescription>
                  <CardTitle className="text-xl">$4.2M</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="property" className="space-y-8">
            <TabsList className="tabs-list">
              <TabsTrigger value="property">General Property Information</TabsTrigger>
              <TabsTrigger value="development">Development Info</TabsTrigger>
            </TabsList>

            <TabsContent value="property" className="m-0" data-section="property">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Detailed Property Analysis</h2>
                <p className="text-muted-foreground">
                  Comprehensive assessment of physical characteristics, zoning requirements, and development potential.
                </p>
              </div>
              <GeneralPropertyTab reportHandler={reportHandler} />
            </TabsContent>

            <TabsContent value="development" className="m-0" data-section="development">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Development Information</h2>
                <p className="text-muted-foreground">
                  Detailed overview of zoning parameters, building requirements, and development standards.
                </p>
              </div>
              <DevelopmentInfoTab reportHandler={reportHandler} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      <header className="px-4 py-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 bg-orange-500/10 rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-orange-500 rounded-sm" />
          </div>
          <span className="font-medium">PropertyAI</span>
        </Link>
      </header>

      <main className="container mx-auto px-4 flex flex-col items-center justify-center py-12">
        <div className="w-full max-w-md space-y-8 mb-12">
          <h1 className="text-2xl font-bold text-center">
            Select a property address to begin
          </h1>
          
          <div className="space-y-4">
            {DEMO_PROPERTIES.map((property: DemoProperty) => (
              <Button
                key={property.address}
                variant={selectedProperty === property.address ? "default" : "outline"}
                className={`w-full justify-start h-auto py-3 px-4 ${
                  selectedProperty === property.address 
                    ? "bg-orange-500 hover:bg-orange-600 text-white" 
                    : "bg-white hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => handlePropertySelect(property.address)}
              >
                <MapPin className="h-4 w-4 mr-2" />
                {property.address}
              </Button>
            ))}
          </div>
          
          <Button
            onClick={handleAnalyze}
            className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium mt-8"
            disabled={!selectedProperty || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Property...
              </>
            ) : (
              "Analyze Property"
            )}
          </Button>
        </div>
        
        {/* Map container with rounded corners */}
        <div
          id="map"
          className="rounded-xl overflow-hidden shadow-md mt-8"
          style={{
            height: "600px", 
            width: "100%",
            maxWidth: "800px",
            backgroundColor: "#ffffff",
          }}
        ></div>
      </main>
    </div>
  )
} 