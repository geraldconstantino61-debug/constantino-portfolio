import { profile } from '../data.js'

export default function Footer() {
  return (
    <footer className="border-t-2 border-black bg-white px-5 py-6 text-center font-mono text-xs text-neutral-600">
      © {new Date().getFullYear()} {profile.name} · Built with ReactJS &amp; Tailwind CSS · DCIT 26 Midterm Laboratory
    </footer>
  )
}
