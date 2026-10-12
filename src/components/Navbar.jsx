import { useState } from 'react'
import { navLinks, profile } from '../data.js'

export default function Navbar({ active }) {
  const [open, setOpen] = useState(false)

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-black bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <button onClick={() => go('home')} className="text-lg font-bold tracking-tight">
          {profile.name.split(' ')[0]}<span className="text-neutral-400">.</span>
        </button>

        {/* Desktop menu */}
        <ul className="hidden gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active === l.id ? 'bg-black text-white' : 'hover:bg-neutral-200'
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded border-2 border-black md:hidden"
        >
          <span className={`h-0.5 w-5 bg-black transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-5 bg-black transition ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-5 bg-black transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu (conditional rendering) */}
      {open && (
        <ul className="fade-up border-t-2 border-black bg-white px-5 py-3 md:hidden">
          {navLinks.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className={`w-full border-b border-neutral-200 py-3 text-left font-medium ${
                  active === l.id ? 'font-bold underline underline-offset-4' : ''
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
