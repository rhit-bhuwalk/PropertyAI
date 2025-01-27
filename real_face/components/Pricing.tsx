import { Button } from "@/components/ui/button"

export default function Pricing() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Simple, Transparent Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Starter", "Pro", "Enterprise"].map((plan, i) => (
            <div key={i} className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">{plan}</h3>
              <p className="text-4xl font-bold mb-4">
                {i === 2 ? "Custom" : `$${(i + 1) * 99}`}
                <span className="text-sm font-normal">{i !== 2 && "/month"}</span>
              </p>
              <ul className="mb-8 space-y-2">
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
              </ul>
              <Button className="w-full">{i === 0 ? "Start Free Trial" : "Contact Sales"}</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

