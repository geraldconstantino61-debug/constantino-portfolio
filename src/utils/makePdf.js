// Tiny dependency-free PDF writer (text only, Helvetica) for the "Download CV" button.
const PAGE_W = 595.28, PAGE_H = 841.89, MARGIN = 54

const clean = (s) =>
  String(s)
    .replace(/[–—]/g, '-').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[·•]/g, '|').replace(/…/g, '...')
    .replace(/[^\x20-\x7E]/g, '')
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')

// Measure text width with a canvas (Arial/Helvetica are metric-compatible); fallback = rough average
let ctx
const measure = (text, size, bold) => {
  try {
    ctx = ctx || document.createElement('canvas').getContext('2d')
    ctx.font = `${bold ? 'bold ' : ''}${size}px Helvetica, Arial, sans-serif`
    return ctx.measureText(text).width * 1.02
  } catch {
    return text.length * size * (bold ? 0.58 : 0.54)
  }
}

function wrap(text, size, bold, maxW) {
  const lines = []
  let line = ''
  for (const word of clean(text).split(/\s+/).filter(Boolean)) {
    const test = line ? `${line} ${word}` : word
    if (measure(test, size, bold) <= maxW) line = test
    else { if (line) lines.push(line); line = word }
  }
  if (line) lines.push(line)
  return lines
}

export function buildCvPdf({ name, role, contact, sections }) {
  const pages = [[]]
  let y = PAGE_H - MARGIN
  const textW = PAGE_W - MARGIN * 2

  const ensure = (h) => {
    if (y - h < MARGIN) { pages.push([]); y = PAGE_H - MARGIN }
  }
  const put = (text, { size = 10.5, bold = false, gap = 4, color = 0, indent = 0 } = {}) => {
    for (const ln of wrap(text, size, bold, textW - indent)) {
      ensure(size + gap)
      y -= size
      pages.at(-1).push(`BT /${bold ? 'F2' : 'F1'} ${size} Tf ${color} g ${MARGIN + indent} ${y.toFixed(2)} Td (${esc(ln)}) Tj ET`)
      y -= gap
    }
  }
  const rule = (w = 1) => {
    ensure(10)
    y -= 4
    pages.at(-1).push(`0 G ${w} w ${MARGIN} ${y.toFixed(2)} m ${PAGE_W - MARGIN} ${y.toFixed(2)} l S`)
    y -= 8
  }

  put(name.toUpperCase(), { size: 24, bold: true, gap: 6 })
  put(role, { size: 12, gap: 4 })
  put(contact, { size: 10, gap: 4, color: 0.35 })
  rule(2)

  for (const s of sections) {
    y -= 8
    ensure(60)
    put(s.heading.toUpperCase(), { size: 12, bold: true, gap: 4 })
    rule(0.5)
    if (s.text) put(s.text, { gap: 4 })
    for (const it of s.items || []) {
      ensure(48)
      put(it.title, { bold: true, gap: 2 })
      put(it.meta, { size: 10, gap: 2, color: 0.35 })
      if (it.body) put(it.body, { size: 10, gap: 6 })
      else y -= 4
    }
  }

  // ---- assemble PDF objects ----
  const objs = []
  const add = (s) => objs.push(s) && objs.length
  add('<< /Type /Catalog /Pages 2 0 R >>')
  add('') // pages placeholder (2)
  add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>') // 3 = F1
  add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>') // 4 = F2
  const kids = []
  for (const ops of pages) {
    const stream = ops.join('\n')
    const c = add(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`)
    const p = add(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${c} 0 R >>`)
    kids.push(`${p} 0 R`)
  }
  objs[1] = `<< /Type /Pages /Kids [${kids.join(' ')}] /Count ${kids.length} >>`

  let out = '%PDF-1.4\n'
  const offsets = []
  objs.forEach((o, i) => { offsets.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n` })
  const xref = out.length
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`
  offsets.forEach((o) => { out += `${String(o).padStart(10, '0')} 00000 n \n` })
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`
  return new Blob([out], { type: 'application/pdf' })
}
