import { useState } from 'react'
import SectionHeading from './SectionHeading.jsx'
import ProjectCard from './ProjectCard.jsx'
import { projects } from '../data.js'

const categories = ['All', ...new Set(projects.map((p) => p.category))]

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading number="02" title="Projects" subtitle="A few things I've built for school and for fun." />

        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border-2 border-black px-4 py-1.5 text-sm font-medium transition ${
                filter === c ? 'bg-black text-white' : 'hover:bg-neutral-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
