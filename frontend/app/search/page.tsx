'use client'

/// <reference types="@types/google.maps" />

declare global {
  interface Window {
    google: typeof google;
  }
}


import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import { NavBar } from "@/components/nav-bar";

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
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
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
      if (autocompleteInstance.current && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(autocompleteInstance.current)
        autocompleteInstance.current = null
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Get the place details directly from the autocomplete instance
    const place = autocompleteInstance.current?.getPlace()
    
    // If no place is selected or if it's just a partial text input
    if (!place || !place.formatted_address) {
      setError("Please select a valid address from the suggestions.")
      return
    }
    
    // Use the formatted address from the selected place
    localStorage.setItem("propertyAddress", place.formatted_address)
    router.push("/report")
  }

  return (
    <div className="property-demo min-h-screen pt-16">
      <NavBar />
      <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-2xl font-bold text-center">Enter your property address to begin</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              ref={autocompleteInput}
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
              placeholder="Enter your property address"
              className="h-12 bg-white/5 border-white/10 text-black placeholder:text-gray-500"
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