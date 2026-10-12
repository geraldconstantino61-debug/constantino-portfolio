import { about } from '../data.js'

export default function About() {
  return (
    <section id="about" className="bg-black px-5 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 md:mb-14">
          <p className="font-mono text-sm text-neutral-400">/ 01</p>
          <h2 className="mt-1 text-4xl font-bold tracking-tight md:text-5xl">About Me</h2>
          <div className="mt-5 h-1 w-16 bg-white" />
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="font-mono text-sm uppercase tracking-widest text-neutral-400">Personal background</h3>
            <p className="mt-4 text-lg leading-relaxed text-neutral-200">{about.background}</p>

            <dl className="mt-8 grid grid-cols-2 gap-4">
              {about.facts.map((f) => (
                <div key={f.label} className="border border-neutral-700 p-4">
                  <dt className="font-mono text-xs uppercase text-neutral-400">{f.label}</dt>
                  <dd className="mt-1 font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="font-mono text-sm uppercase tracking-widest text-neutral-400">Skills</h3>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {about.skills.map((s) => (
                <li key={s} className="border border-neutral-700 px-4 py-3 font-medium transition hover:bg-white hover:text-black">
                  {s}
                </li>
              ))}
            </ul>

            <h3 className="mt-10 font-mono text-sm uppercase tracking-widest text-neutral-400">Interests</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {about.interests.map((i) => (
                <li key={i} className="rounded-full border border-white px-4 py-1.5 text-sm transition hover:bg-white hover:text-black">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
