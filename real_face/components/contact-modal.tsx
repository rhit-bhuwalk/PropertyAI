"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-gradient-to-r from-blue-200 to-pink-200 text-black hover:opacity-90">
          Request Demo →
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-white">
        <DialogHeader>
          <DialogTitle>Request a Demo</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Fill out the form below and we'll get back to you shortly.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" className="bg-zinc-800 border-zinc-700" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" className="bg-zinc-800 border-zinc-700" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" className="bg-zinc-800 border-zinc-700" />
          </div>
        </div>
        <Button type="submit" className="w-full bg-white text-black hover:bg-white/90">
          Send Message
        </Button>
      </DialogContent>
    </Dialog>
  )
}

