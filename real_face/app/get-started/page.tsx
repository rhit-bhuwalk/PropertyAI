"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"

// Declare Google Maps types
declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: typeof google.maps.places.Autocomplete
        }
        event: {
          clearInstanceListeners(instance: any): void
        }
      }
    }
  }
}

// Helper to load Google Maps script
const loadGoogleMapsScript = (callback: () => void) => {
  const existingScript = document.getElementById('google-maps-script')
  if (existingScript) {
    if (window.google?.maps) {
      callback()
    } else {
      existingScript.addEventListener('load', callback)
    }
    return
  }

  const script = document.createElement("script")
  script.id = 'google-maps-script'
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`
  script.async = true
  script.defer = true
  script.onload = callback
  document.body.appendChild(script)
}

export default function GetStarted() {
  const [address, setAddress] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const autocompleteInput = useRef<HTMLInputElement>(null)
  const autocompleteInstance = useRef<google.maps.places.Autocomplete | null>(null)

  useEffect(() => {
    // Generate and store a UUID if it doesn't exist
    const existingUserId = localStorage.getItem("userId")
    if (!existingUserId) {
      const userId = uuidv4()
      localStorage.setItem("userId", userId)
    }

    // Initialize Google Places Autocomplete
    const initializeAutocomplete = () => {
      if (autocompleteInput.current && window.google?.maps?.places) {
        autocompleteInstance.current = new window.google.maps.places.Autocomplete(
          autocompleteInput.current,
          {
            types: ["address"],
            componentRestrictions: { country: "us" }
          }
        )
        
        autocompleteInstance.current.addListener("place_changed", () => {
          const place = autocompleteInstance.current?.getPlace()
          if (place?.formatted_address) {
            setAddress(place.formatted_address)
          }
        })
      }
    }
    loadGoogleMapsScript(initializeAutocomplete)
    return () => {
      if (autocompleteInstance.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteInstance.current)
        autocompleteInstance.current = null
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!address) {
      setError("Please select a valid address from the suggestions.")
      return
    }
    localStorage.setItem("propertyAddress", address)
    router.push("/report")
    //router.push("/upload-codebook")
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
          <h1 className="text-2xl font-bold text-center">Enter your property address to begin</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              ref={autocompleteInput}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your property address"
              className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />

            <Button
              type="submit"
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium"
              disabled={!address}
            >
              Analyze Property
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}