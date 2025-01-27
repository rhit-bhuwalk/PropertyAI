import Image from "next/image"

export default function ProblemStatement() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          The Traditional Process
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-8">
          <Image
            src="/placeholder.svg?height=300&width=400"
            alt="Traditional Property Research Timeline"
            width={400}
            height={300}
          />
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg">Title Review</h3>
              <p className="text-zinc-600">59 days on average</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg">Environmental Assessment</h3>
              <p className="text-zinc-600">46 days on average</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

