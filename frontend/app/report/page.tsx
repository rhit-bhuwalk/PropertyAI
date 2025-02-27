"use client"

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { GeneralPropertyTab } from "@/app/report/general-property-info-tab";
// import MarketResearchTab from "@/app/report/market-research";
import { DevelopmentInfoTab } from "@/app/report/development-info";
// import EntitlementsInfoTab from "@/app/report/entitlements-info";
import { PrintDialog } from "@/components/print-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import "@/styles/report.css";
import Image from "next/image";
import { NavBar } from "@/components/nav-bar";
import { PropertyReportHandler } from "@/lib/report-handler";
import type { GeneralPropertyInfo } from "@/schemas/views/general-property-info-schema";
import { ExpandedProfileSchema } from "@/schemas/endpoints/attom-expanded-profile";
import { PropertyExpandedProfile } from "@/schemas/endpoints/attom-expanded-profile";
import { mapAttomProfileToGeneralPropertyInfo } from "@/schemas/mappings/attom-expanded-profile-mapping";

export default function PropertyAnalysisDashboard() {
  const [reportHandler, setReportHandler] = useState<PropertyReportHandler | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const mode = process.env.NEXT_PUBLIC_MODE;
        const endpoint = mode === "test" ? "/api/mock-attom" : "/api/attom";
        const params = mode === "test" ? {} : { address: "1500 Market Street, Philadelphia" };

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: "property/expandedprofile", params }),
        })
        if (!response.ok) {
          throw new Error("Failed to fetch property data");
        }
        const data = await response.json();
        const validatedEndpoint: PropertyExpandedProfile = ExpandedProfileSchema.parse(data)
        const mappedData: GeneralPropertyInfo = mapAttomProfileToGeneralPropertyInfo(validatedEndpoint);
        const validatedData: GeneralPropertyInfo = PropertyReportHandler.validateGeneralInfo(mappedData);
        const handler = new PropertyReportHandler();
        handler.setGeneralInfo(validatedData);
        handler.setDevelopmentInfo({});
        setReportHandler(handler);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <main className="property-demo min-h-screen pt-16">
        <NavBar />
        <div className="container mx-auto py-12 px-4 md:px-8">
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="property-demo min-h-screen pt-16">
        <NavBar />
        <div className="container mx-auto py-12 px-4 md:px-8">
          <p>Error: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="property-demo min-h-screen pt-16">
      <NavBar />
      <div className="container mx-auto py-12 px-4 md:px-8 space-y-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold tracking-tight">Property Assessment Report</h1>
            <PrintDialog reportHandler={reportHandler} />
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
                      fill
                      style={{ objectFit: "cover" }}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nbZliwuRjp9a7cwyA8vUFEErMJfxOt.png"
                      alt="Interior view showing home office and living room spaces"
                      fill
                      style={{ objectFit: "cover" }}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZU9GzXZxEpWtz4PKmrPWa5s1uuBZRC.png"
                      alt="Map view of the property location"
                      fill
                      style={{ objectFit: "cover" }}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CarouselItem>
                {/*
                  Duplicate images to test scrollability
                */}
                <CarouselItem>
                  <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uZ7J3h8v7RkCQvbW4zOpGQWPKISqu1.png"
                      alt="Exterior view of the property showing modern two-story residential building"
                      fill
                      style={{ objectFit: "cover" }}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nbZliwuRjp9a7cwyA8vUFEErMJfxOt.png"
                      alt="Interior view showing home office and living room spaces"
                      fill
                      style={{ objectFit: "cover" }}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZU9GzXZxEpWtz4PKmrPWa5s1uuBZRC.png"
                      alt="Map view of the property location"
                      fill
                      style={{ objectFit: "cover" }}
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
            <TabsTrigger value="property">Property Report</TabsTrigger>
            {/* <TabsTrigger value="market">Market Research</TabsTrigger> */}
            <TabsTrigger value="development">Development Info</TabsTrigger>
            {/* <TabsTrigger value="entitlements">Entitlements</TabsTrigger> */}
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

          {/* <TabsContent value="market" className="m-0" data-section="market">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Market Research Analysis</h2>
              <p className="text-muted-foreground">
                In-depth analysis of demographic trends, economic indicators, and market performance metrics.
              </p>
            </div>
            <MarketResearchTab reportHandler={reportHandler} />
          </TabsContent> */}

          <TabsContent value="development" className="m-0" data-section="development">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Development Information</h2>
              <p className="text-muted-foreground">
                Detailed overview of zoning parameters, building requirements, and development standards.
              </p>
            </div>
            <DevelopmentInfoTab reportHandler={reportHandler} />
          </TabsContent>

          {/* <TabsContent value="entitlements" className="m-0" data-section="entitlements">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Entitlements Information</h2>
              <p className="text-muted-foreground">
                Overview of planning review, zoning variance, rezoning, and permit processes.
              </p>
            </div>
            <EntitlementsInfoTab reportHandler={reportHandler} />
          </TabsContent> */}

        </Tabs>
      </div>
    </main>
  );
}