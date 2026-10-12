import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Resume from './components/Resume.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { navLinks } from './data.js'

export default function App() {
  const [active, setActive] = useState('home')
  const [showTop, setShowTop] = useState(false)

  // Highlight the nav link of the section currently in view + show back-to-top button
  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 500)
      const y = window.scrollY + 140
      let current = navLinks[0].id
      for (const { id } of navLinks) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen font-sans">
      <Navbar active={active} />
      <main>
        <Home />
        <About />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-40 h-11 w-11 rounded-full border-2 border-black bg-white text-lg font-bold transition hover:bg-black hover:text-white"
        >
          ↑
        </button>
      )}
    </div>
  )
}
