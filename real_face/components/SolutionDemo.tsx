export default function SolutionDemo() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          See It In Action
        </h2>
        <div className="flex justify-center">
          <video className="w-full max-w-3xl rounded-lg shadow-lg" autoPlay loop muted playsInline>
            <source src="/placeholder-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  )
}

