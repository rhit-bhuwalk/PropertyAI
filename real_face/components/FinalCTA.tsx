import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function FinalCTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get Started in 5 Minutes</h2>
          <p className="mx-auto max-w-[700px] text-zinc-200 md:text-xl">No credit card required for trial</p>
          <form className="w-full max-w-sm space-y-4">
            <Input type="email" placeholder="Enter your email" className="bg-white text-black" />
            <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200">
              Sign Up Now
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

