import { useState } from 'react'
import SectionHeading from './SectionHeading.jsx'
import { profile, socials } from '../data.js'

const empty = { name: '', email: '', message: '' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please enter your name.'
  else if (v.name.trim().length < 2) e.name = 'Name must be at least 2 characters.'
  if (!v.email.trim()) e.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email address.'
  if (!v.message.trim()) e.message = 'Please write a message.'
  else if (v.message.trim().length < 10) e.message = 'Message must be at least 10 characters.'
  return e
}

export default function Contact() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [sent, setSent] = useState(false)

  const change = (ev) => {
    const next = { ...values, [ev.target.name]: ev.target.value }
    setValues(next)
    setSent(false)
    if (touched[ev.target.name]) setErrors(validate(next))
  }
  const blur = (ev) => {
    setTouched({ ...touched, [ev.target.name]: true })
    setErrors(validate(values))
  }
  const submit = (ev) => {
    ev.preventDefault()
    const found = validate(values)
    setErrors(found)
    setTouched({ name: true, email: true, message: true })
    if (Object.keys(found).length === 0) {
      setSent(true)
      setValues(empty)
      setTouched({})
      setErrors({})
    }
  }

  const field = (name) =>
    `w-full border-2 bg-white px-4 py-3 outline-none transition focus:shadow-[4px_4px_0_0_#000] ${
      touched[name] && errors[name] ? 'border-black bg-neutral-100' : 'border-black'
    }`
  const Err = ({ name }) =>
    touched[name] && errors[name] ? (
      <p role="alert" className="mt-1.5 font-mono text-xs font-medium">✕ {errors[name]}</p>
    ) : null

  return (
    <section id="contact" className="bg-black px-5 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 md:mb-14">
          <p className="font-mono text-sm text-neutral-400">/ 04</p>
          <h2 className="mt-1 text-4xl font-bold tracking-tight md:text-5xl">Contact</h2>
          <p className="mt-3 max-w-xl text-neutral-300">Have a question or want to work together? Send me a message.</p>
          <div className="mt-5 h-1 w-16 bg-white" />
        </div>

        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">Email</p>
            <a href={`mailto:${profile.email}`} className="mt-1 block text-xl font-medium underline underline-offset-4 hover:no-underline">
              {profile.email}
            </a>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-neutral-400">Location</p>
            <p className="mt-1 text-xl font-medium">{profile.location}</p>

            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-neutral-400">Social links</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="inline-block rounded-full border border-white px-4 py-2 text-sm transition hover:bg-white hover:text-black">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={submit} noValidate className="space-y-5 text-black">
            <div>
              <label htmlFor="name" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-white">Name</label>
              <input id="name" name="name" value={values.name} onChange={change} onBlur={blur} placeholder="Juan Dela Cruz" className={field('name')} />
              <div className="text-white"><Err name="name" /></div>
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-white">Email</label>
              <input id="email" name="email" type="email" value={values.email} onChange={change} onBlur={blur} placeholder="you@example.com" className={field('email')} />
              <div className="text-white"><Err name="email" /></div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-white">Message</label>
              <textarea id="message" name="message" rows="5" value={values.message} onChange={change} onBlur={blur} placeholder="Write your message here…" className={field('message')} />
              <div className="text-white"><Err name="message" /></div>
            </div>

            <button type="submit" className="w-full rounded-full border-2 border-white bg-white px-6 py-3 font-bold text-black transition hover:bg-black hover:text-white sm:w-auto">
              Send message →
            </button>

            {sent && (
              <p role="status" className="fade-up border-2 border-white p-4 font-medium text-white">
                ✓ Thank you! Your message was sent successfully.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
