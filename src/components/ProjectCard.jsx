import { useState } from 'react'
import Modal from './Modal.jsx'
import TodoDemo from './demos/TodoDemo.jsx'
import CalculatorDemo from './demos/CalculatorDemo.jsx'

// Generated black & white pattern used when a project has no image yet
function Placeholder({ seed }) {
  const patterns = [
    'repeating-linear-gradient(45deg,#000 0 8px,#fff 8px 16px)',
    'radial-gradient(circle,#000 2px,transparent 2.5px) 0 0/16px 16px',
    'repeating-linear-gradient(0deg,#000 0 2px,#fff 2px 12px)',
    'repeating-conic-gradient(#000 0 25%,#fff 0 50%) 0 0/32px 32px',
  ]
  return <div className="h-full w-full" style={{ background: patterns[seed % patterns.length] }} />
}

export default function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false) // dynamic show / hide details
  const [demoOpen, setDemoOpen] = useState(false) // live demo modal

  return (
    <article className="group flex flex-col border-2 border-black bg-white transition hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000]">
      <div className="h-44 overflow-hidden border-b-2 border-black bg-white">
        {project.image ? (
          <img src={project.image} alt={project.title} className="h-full w-full object-cover grayscale transition group-hover:scale-105" />
        ) : (
          <Placeholder seed={project.id} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
          <span className="uppercase">{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
        <p className="mt-2 text-neutral-600">{project.summary}</p>

        {expanded && (
          <div className="fade-up mt-4 border-l-4 border-black pl-4">
            <p className="text-sm">{project.details}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className="bg-black px-2 py-1 font-mono text-xs text-white">{t}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-4 pt-5">
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            className="font-medium underline underline-offset-4 hover:no-underline"
          >
            {expanded ? '− View less' : '+ View more'}
          </button>
          {project.demo && (
            <button
              onClick={() => setDemoOpen(true)}
              className="rounded-full border-2 border-black bg-black px-4 py-1.5 text-sm font-medium text-white transition hover:bg-white hover:text-black"
            >
              ▶ Try it live
            </button>
          )}
        </div>
      </div>

      {demoOpen && (
        <Modal title={project.title} onClose={() => setDemoOpen(false)}>
          {project.demo === 'todo' ? <TodoDemo /> : <CalculatorDemo />}
        </Modal>
      )}
    </article>
  )
}
