export default function SectionHeading({ number, title, subtitle }) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="font-mono text-sm text-neutral-500">/ {number}</p>
      <h2 className="mt-1 text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-xl text-neutral-600">{subtitle}</p>}
      <div className="mt-5 h-1 w-16 bg-black" />
    </div>
  )
}
