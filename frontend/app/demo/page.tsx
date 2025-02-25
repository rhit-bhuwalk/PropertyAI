"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import PropertyReport from "./property-report"
import MarketResearch from "./market-research"
import DevelopmentInfo from "./development-info"
import EntitlementsInfo from "./entitlements-info"
import { PrintDialog } from "@/components/print-dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import "@/styles/demo.css"
import Image from 'next/image'

export default function PropertyAnalysisDashboard() {
  return (
    <main className="property-demo min-h-screen">
      <div className="container mx-auto py-12 px-4 md:px-8 space-y-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold tracking-tight">Property Assessment Report</h1>
            <PrintDialog />
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <p className="text-lg">1500 Market Street, Philadelphia</p>
          </div>

          {/* Image Carousel */}
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uZ7J3h8v7RkCQvbW4zOpGQWPKISqu1.png"
                      alt="Exterior view of the property showing modern two-story residential building"
                      layout="fill"
                      objectFit="cover"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nbZliwuRjp9a7cwyA8vUFEErMJfxOt.png"
                      alt="Interior view showing home office and living room spaces"
                      layout="fill"
                      objectFit="cover"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZU9GzXZxEpWtz4PKmrPWa5s1uuBZRC.png"
                      alt="Map view of the property location"
                      layout="fill"
                      objectFit="cover"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Parcel ID</CardDescription>
                <CardTitle className="text-xl">#888-123456</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Area</CardDescription>
                <CardTitle className="text-xl">2.11 acres</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Assessed Value (2024)</CardDescription>
                <CardTitle className="text-xl">$4.2M</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="property" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-[800px] tabs-list">
            <TabsTrigger value="property">Property Report</TabsTrigger>
            <TabsTrigger value="market">Market Research</TabsTrigger>
            <TabsTrigger value="development">Development Info</TabsTrigger>
            <TabsTrigger value="entitlements">Entitlements</TabsTrigger>
          </TabsList>

          <TabsContent value="property" className="m-0" data-section="property">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Detailed Property Analysis</h2>
              <p className="text-muted-foreground">
                Comprehensive assessment of physical characteristics, zoning requirements, and development potential.
              </p>
            </div>
            <PropertyReport />
          </TabsContent>

          <TabsContent value="market" className="m-0" data-section="market">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Market Research Analysis</h2>
              <p className="text-muted-foreground">
                In-depth analysis of demographic trends, economic indicators, and market performance metrics.
              </p>
            </div>
            <MarketResearch />
          </TabsContent>

          <TabsContent value="development" className="m-0" data-section="development">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Development Information</h2>
              <p className="text-muted-foreground">
                Detailed overview of zoning parameters, building requirements, and development standards.
              </p>
            </div>
            <DevelopmentInfo />
          </TabsContent>

          <TabsContent value="entitlements" className="m-0" data-section="entitlements">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Entitlements Information</h2>
              <p className="text-muted-foreground">
                Overview of planning review, zoning variance, rezoning, and permit processes.
              </p>
            </div>
            <EntitlementsInfo />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

