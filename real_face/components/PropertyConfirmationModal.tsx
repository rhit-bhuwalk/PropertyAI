import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import type { OGData } from "@/types/ogdata"

interface PropertyConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onContinue: () => void
  ogData: OGData | null
}

export function PropertyConfirmationModal({ isOpen, onClose, onContinue, ogData }: PropertyConfirmationModalProps) {
  if (!ogData) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-white">
        <DialogHeader>
          <DialogTitle>Confirm Property</DialogTitle>
          <DialogDescription>Is this the correct property you want to analyze?</DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {ogData.ogImage && ogData.ogImage[0] && (
            <div className="relative w-full h-48">
              <Image
                src={ogData.ogImage[0].url || "/placeholder.svg"}
                alt={ogData.ogTitle || "Property image"}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <h2 className="text-lg font-semibold">{ogData.ogTitle}</h2>
          {ogData.ogDescription && <p className="text-sm text-zinc-400">{ogData.ogDescription}</p>}
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>{ogData.ogSiteName}</span>
            {ogData.ogUrl && (
              <Link href={ogData.ogUrl} target="_blank" className="text-orange-500 hover:text-orange-400">
                View on Zillow
              </Link>
            )}
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="outline" onClick={onClose}>
              Back
            </Button>
            <Button onClick={onContinue} className="bg-orange-500 hover:bg-orange-600 text-white">
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

