import { profile } from '../data.js'

export default function Home() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="px-5 pb-20 pt-32 md:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.2fr_1fr]">
        <div className="fade-up">
          <p className="font-mono text-sm uppercase tracking-widest text-neutral-500">
            Welcome to my portfolio
          </p>
          <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="underline decoration-4 underline-offset-8">{profile.name}</span>.
          </h1>
          <p className="mt-6 text-xl font-medium">{profile.role}</p>
          <p className="mt-3 max-w-xl text-neutral-600">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => go('projects')}
              className="rounded-full border-2 border-black bg-black px-6 py-3 font-medium text-white transition hover:bg-white hover:text-black"
            >
              View my work
            </button>
            <button
              onClick={() => go('contact')}
              className="rounded-full border-2 border-black px-6 py-3 font-medium transition hover:bg-black hover:text-white"
            >
              Contact me
            </button>
          </div>
        </div>

        <div className="fade-up mx-auto w-full max-w-sm" style={{ animationDelay: '.15s' }}>
          <div className="relative">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-black" />
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              className="relative aspect-square w-full rounded-3xl border-2 border-black object-cover grayscale contrast-110"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl overflow-hidden border-y-2 border-black py-3 font-mono text-sm">
        <p className="whitespace-nowrap text-center">
          ReactJS &nbsp;/&nbsp; Tailwind CSS &nbsp;/&nbsp; JavaScript &nbsp;/&nbsp; Vercel
        </p>
      </div>
    </section>
  )
}
