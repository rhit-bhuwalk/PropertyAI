"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PropertyConfirmationModal } from "@/components/PropertyConfirmationModal"
import { v4 as uuidv4 } from "uuid"

interface OGData {
  ogTitle?: string
  ogImage?: { url: string }[]
  ogDescription?: string
  ogUrl?: string
  ogSiteName?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: { url: string }[]
}

export default function GetStarted() {
  const [url, setUrl] = useState("")
  const [ogData, setOgData] = useState<OGData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Generate and store UUID if it doesn't exist
    const existingUserId = localStorage.getItem("userId")
    if (!existingUserId) {
      const userId = uuidv4()
      localStorage.setItem("userId", userId)
    }
  }, [])

  const fetchOGData = async (url: string) => {
    setIsLoading(true)
    setError(null)
    setOgData(null)

    try {
      console.log("Fetching OG data for:", url)
      const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`)
      const data = await response.json()

      if (response.ok && data.ogTitle && data.ogImage) {
        console.log("OG data received:", data)
        setOgData(data)
        setIsModalOpen(true)
      } else {
        handleContinue()
      }
    } catch (error) {
      console.error("Error fetching OG data:", error)
      handleContinue()
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (url.includes("zillow.com/homedetails")) {
      console.log("Processing:", url)
      fetchOGData(url)
    }
  }

  const handleContinue = () => {
    setIsModalOpen(false)
    localStorage.setItem("propertyUrl", url)
    router.push("/upload-codebook")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="px-4 py-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          <span className="font-medium">PropertyAI</span>
        </Link>
      </header>

      <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-2xl font-bold text-center">Enter your Zillow Property link to begin</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.zillow.com/homedetails/214-W-Chester-Dr-Ellettsville-IN-47429/85596655_zpid"
              className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />

            <Button
              type="submit"
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium"
              disabled={!url.includes("zillow.com/homedetails") || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Analyze Property"
              )}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="mt-8 bg-white/5 rounded-lg p-8 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4" />
              <p className="text-sm text-zinc-400">Fetching property details...</p>
            </div>
          )}

          <PropertyConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onContinue={handleContinue}
            ogData={ogData}
          />
        </div>
      </main>
    </div>
  )
}

