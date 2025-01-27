import { Clock, CheckCircle, FileText } from "lucide-react"

export default function ValueProps() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <Clock className="h-12 w-12 mb-4 text-blue-500" />
            <h3 className="text-xl font-bold mb-2">Time Saved</h3>
            <p className="text-zinc-600">Save up to 98% of your research time</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="h-12 w-12 mb-4 text-blue-500" />
            <h3 className="text-xl font-bold mb-2">Data Accuracy</h3>
            <p className="text-zinc-600">99.9% accuracy in property data</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FileText className="h-12 w-12 mb-4 text-blue-500" />
            <h3 className="text-xl font-bold mb-2">Source Documentation</h3>
            <p className="text-zinc-600">Access to 1000+ verified sources</p>
          </div>
        </div>
      </div>
    </section>
  )
}

