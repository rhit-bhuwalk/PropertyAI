"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Clock, Search, Zap, MousePointer } from "lucide-react"
import { AnimatedGradientButton } from "@/components/animated-gradient-button"
import { CalendarButton } from "@/components/calendar-button"
import { useEffect, useRef } from "react"

export default function Home() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
          } else {
            entry.target.classList.remove("active")
          }
        })
      },
      { threshold: 0.5 },
    )

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          <span className="font-medium">PropertyAI</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/docs" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Docs
          </Link>
          <a
            href="mailto:kushbhuwalka@gmail.com"
            className="inline-flex h-10 items-center justify-center rounded-md bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black"
          >
            Contact Us
          </a>
        </nav>
      </header>

      <main className="flex-1 flex flex-col">
        <section
          ref={(el) => {
            sectionRefs.current[0] = el;
            return undefined;
          }}
          className="flex-1 flex flex-col items-center justify-center text-center px-4 min-h-screen pt-20 section"
        >
          <div className="max-w-4xl space-y-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[1.1]">
              <span className="block mb-2">Property Research</span>
              <span className="block animate-gradient-text bg-gradient-to-r from-white via-orange-500 to-white bg-[length:200%_auto] bg-clip-text text-transparent">
                In Minutes Not Hours
              </span>
            </h1>

            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Transform your property research workflow with AI-powered insights
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <CalendarButton />
              <Link href="/get-started">
                <AnimatedGradientButton className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-6 text-lg font-semibold transition-colors duration-300">
                  Get Started
                </AnimatedGradientButton>
              </Link>
            </div>
          </div>
        </section>

        <section
          ref={(el) => {
            sectionRefs.current[1] = el;
            return undefined;
          }}
          className="w-full overflow-hidden py-20 bg-black border-t border-white/5 section"
        >
          <p className="text-center text-sm text-zinc-400 mb-12">Built by Developers from</p>
          <div className="flex">
            <div className="flex animate-scroll">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-32 px-16">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 relative">
                      <Image
                        src="/images/rose.png"
                        alt="Rose-Hulman"
                        fill
                        sizes="(max-width: 96px) 100vw, 96px"
                        className="object-contain opacity-50 hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <span className="text-sm text-zinc-400">Rose-Hulman</span>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 relative">
                      <Image
                        src="/images/thompsonthrift.png"
                        alt="Thompson Thrift"
                        fill
                        sizes="(max-width: 96px) 100vw, 96px"
                        className="object-contain opacity-50 hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <span className="text-sm text-zinc-400">Thompson Thrift</span>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 relative">
                      <Image
                        src="/images/envoy.png"
                        alt="Envoy"
                        fill
                        sizes="(max-width: 96px) 100vw, 96px"
                        className="object-contain opacity-50 hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <span className="text-sm text-zinc-400">Envoy</span>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 relative">
                      <Image
                        src="/images/cornell.png"
                        alt="Cornell University"
                        fill
                        sizes="(max-width: 96px) 100vw, 96px"
                        className="object-contain opacity-50 hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <span className="text-sm text-zinc-400">Cornell</span>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 relative">
                      <Image
                        src="/images/tesla.png"
                        alt="Tesla"
                        fill
                        sizes="(max-width: 96px) 100vw, 96px"
                        className="object-contain opacity-50 hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <span className="text-sm text-zinc-400">Tesla</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          ref={(el) => {
            sectionRefs.current[2] = el;
            return undefined;
          }}
          className="min-h-screen flex flex-col items-center justify-center px-4 py-32 snap-start transition-opacity duration-500 ease-in-out section"
        >
          <div className="max-w-4xl mx-auto w-full space-y-16">
            <h2 className="text-3xl sm:text-4xl font-medium text-center inline-block animate-gradient-text bg-gradient-to-r from-white via-orange-500 to-white bg-[length:200%_auto] bg-clip-text text-transparent">
              No more sifting through messy public data
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10 p-8 space-y-4 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                <Zap className="h-6 w-6 text-orange-500" />
                <h3 className="text-lg font-medium text-white">
                  Get reports of aggregated public information instantly
                </h3>
                <p className="text-sm text-zinc-400">Access comprehensive property data in seconds</p>
              </Card>

              <Card className="bg-white/5 border-white/10 p-8 space-y-4 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                <Search className="h-6 w-6 text-orange-500" />
                <h3 className="text-lg font-medium text-white">Never Miss a data point</h3>
                <p className="text-sm text-zinc-400">Our AI ensures complete coverage of all relevant information</p>
              </Card>

              <Card className="bg-white/5 border-white/10 p-8 space-y-4 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                <Clock className="h-6 w-6 text-orange-500" />
                <h3 className="text-lg font-medium text-white">
                  Save hours that you can spend on assessing more properties
                </h3>
                <p className="text-sm text-zinc-400">Focus on analysis, not data gathering</p>
              </Card>

              <Card className="bg-white/5 border-white/10 p-8 space-y-4 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                <MousePointer className="h-6 w-6 text-orange-500" />
                <h3 className="text-lg font-medium text-white">Interact with your data seamlessly</h3>
                <p className="text-sm text-zinc-400">Intuitive interface for exploring property information</p>
              </Card>
            </div>
          </div>
        </section>

        <section
          ref={(el) => {
            sectionRefs.current[3] = el;
            return undefined;
          }}
          className="min-h-screen flex flex-col items-center justify-center px-4 py-32 bg-black section"
        >
          <div className="max-w-4xl mx-auto w-full text-center space-y-48">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Thousands of Datapoints,
              <br />
              <span className="text-orange-500">Millions of InSites</span>
            </h2>
            <div className="p-px">
              <Link href="/get-started">
                <AnimatedGradientButton className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-6 text-lg font-semibold transition-colors duration-300">
                  Get Started
                </AnimatedGradientButton>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

