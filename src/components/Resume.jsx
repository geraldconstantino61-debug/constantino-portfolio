import { useState } from 'react'
import SectionHeading from './SectionHeading.jsx'
import { resume, profile, about } from '../data.js'
import { buildCvPdf } from '../utils/makePdf.js'

const tabs = [
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
]

export default function Resume() {
  const [tab, setTab] = useState('education')

  // Builds a real PDF CV in the browser and downloads it
  const downloadCV = () => {
    const blob = buildCvPdf({
      name: profile.name,
      role: profile.role,
      contact: `${profile.email}  |  ${profile.location}`,
      sections: [
        { heading: 'About', text: about.background },
        {
          heading: 'Education',
          items: resume.education.map((e) => ({ title: e.title, meta: `${e.place}  |  ${e.period}`, body: e.note })),
        },
        {
          heading: 'Experience',
          items: resume.experience.map((e) => ({ title: e.title, meta: `${e.place}  |  ${e.period}`, body: e.note })),
        },
        { heading: 'Skills', text: resume.skills.join(', ') },
      ],
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${profile.name.replace(/[^\w]+/g, '_')}_CV.pdf`
    a.click()
    URL.revokeObjectURL(url)
  }

  const Item = ({ item }) => (
    <li className="relative border-l-2 border-black pb-8 pl-6 last:pb-0">
      <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-black bg-white" />
      <p className="font-mono text-xs text-neutral-500">{item.period}</p>
      <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
      <p className="font-medium text-neutral-700">{item.place}</p>
      <p className="mt-1 text-sm text-neutral-600">{item.note}</p>
    </li>
  )

  return (
    <section id="resume" className="border-t-2 border-black bg-neutral-100 px-5 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading number="03" title="Resume / CV" subtitle="My education, experience and skills." />
          <button
            onClick={downloadCV}
            className="mb-10 rounded-full border-2 border-black bg-black px-6 py-3 font-medium text-white transition hover:bg-white hover:text-black md:mb-14"
          >
            ↓ Download CV
          </button>
        </div>

        <div className="flex gap-2 border-b-2 border-black" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`-mb-[2px] border-2 border-black px-5 py-2.5 text-sm font-medium transition ${
                tab === t.id ? 'bg-black text-white' : 'border-b-transparent bg-neutral-100 hover:bg-neutral-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="fade-up mt-8 border-2 border-black bg-white p-6 md:p-8" key={tab}>
          {tab === 'education' && <ul>{resume.education.map((e) => <Item key={e.title} item={e} />)}</ul>}
          {tab === 'experience' && <ul>{resume.experience.map((e) => <Item key={e.title} item={e} />)}</ul>}
          {tab === 'skills' && (
            <ul className="flex flex-wrap gap-3">
              {resume.skills.map((s) => (
                <li key={s} className="border-2 border-black px-4 py-2 font-medium transition hover:bg-black hover:text-white">{s}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
