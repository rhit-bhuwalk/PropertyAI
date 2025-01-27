import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Save Time in Property Evaluation
          </h1>
          <p className="mx-auto max-w-[700px] text-zinc-200 md:text-xl">2-4 hours → 2 minutes</p>
          <Button className="bg-white text-black hover:bg-zinc-200">Sign Up Now</Button>
          <div className="mt-8">
            <p className="text-2xl font-bold">
              <span className="text-4xl text-blue-500" id="hoursSaved">
                0
              </span>{" "}
              Hours Saved
            </p>
            <p className="text-sm text-zinc-400">for development teams</p>
          </div>
        </div>
      </div>
    </section>
  )
}

