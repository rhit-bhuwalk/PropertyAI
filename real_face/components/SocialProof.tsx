import Image from "next/image"

export default function SocialProof() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Trusted by Industry Leaders
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <Image
              key={i}
              src={`/placeholder.svg?height=80&width=160&text=Logo ${i}`}
              alt={`Company logo ${i}`}
              width={160}
              height={80}
              className="mx-auto"
            />
          ))}
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-xl italic">
            "This tool has revolutionized our property evaluation process. What used to take days now takes minutes."
          </blockquote>
          <p className="mt-4 font-bold">John Doe, Lead Developer at XYZ Corp</p>
        </div>
        <div className="mt-12 text-center">
          <p className="text-3xl font-bold">100,000+ properties evaluated</p>
        </div>
      </div>
    </section>
  )
}

