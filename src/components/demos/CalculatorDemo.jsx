import { useEffect, useRef, useState } from 'react'

const compute = (a, b, op) => {
  if (op === '+') return a + b
  if (op === '−') return a - b
  if (op === '×') return a * b
  if (op === '÷') return b === 0 ? null : a / b
  return b
}
const fmt = (n) => String(Math.round(n * 1e10) / 1e10)

export default function CalculatorDemo() {
  const [display, setDisplay] = useState('0')
  const [prev, setPrev] = useState(null)
  const [op, setOp] = useState(null)
  const [fresh, setFresh] = useState(true) // next digit starts a new number
  const [expr, setExpr] = useState('')

  const digit = (d) => {
    if (display === 'Error') { setDisplay(d); setFresh(false); return }
    if (fresh) { setDisplay(d); setFresh(false) }
    else if (display.replace('-', '').replace('.', '').length < 12) setDisplay(display === '0' ? d : display + d)
  }
  const dot = () => {
    if (fresh || display === 'Error') { setDisplay('0.'); setFresh(false) }
    else if (!display.includes('.')) setDisplay(display + '.')
  }
  const operator = (o) => {
    if (display === 'Error') return
    const cur = parseFloat(display)
    if (op && !fresh) {
      const r = compute(prev, cur, op)
      if (r === null) return fail()
      setPrev(r); setDisplay(fmt(r)); setExpr(`${fmt(r)} ${o}`)
    } else { setPrev(cur); setExpr(`${display} ${o}`) }
    setOp(o); setFresh(true)
  }
  const equals = () => {
    if (!op || display === 'Error') return
    const cur = parseFloat(display)
    const r = compute(prev, cur, op)
    if (r === null) return fail()
    setExpr(`${expr} ${display} =`)
    setDisplay(fmt(r)); setPrev(null); setOp(null); setFresh(true)
  }
  const fail = () => { setDisplay('Error'); setPrev(null); setOp(null); setFresh(true); setExpr('Cannot divide by 0') }
  const clear = () => { setDisplay('0'); setPrev(null); setOp(null); setFresh(true); setExpr('') }
  const del = () => {
    if (fresh || display === 'Error') return
    const n = display.slice(0, -1)
    setDisplay(n === '' || n === '-' ? '0' : n)
  }
  const sign = () => display !== '0' && display !== 'Error' && setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display)
  const percent = () => display !== 'Error' && setDisplay(fmt(parseFloat(display) / 100))

  // Keyboard support (always call latest handlers)
  const handlers = useRef()
  handlers.current = { digit, dot, operator, equals, clear, del }
  useEffect(() => {
    const onKey = (e) => {
      const h = handlers.current
      if (/^[0-9]$/.test(e.key)) h.digit(e.key)
      else if (e.key === '.') h.dot()
      else if (e.key === '+') h.operator('+')
      else if (e.key === '-') h.operator('−')
      else if (e.key === '*') h.operator('×')
      else if (e.key === '/') { e.preventDefault(); h.operator('÷') }
      else if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); h.equals() }
      else if (e.key === 'Backspace') h.del()
      else if (e.key === 'Escape') return
      else if (e.key.toLowerCase() === 'c') h.clear()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const Btn = ({ label, onClick, kind = 'num', wide }) => (
    <button
      onClick={onClick}
      className={`${wide ? 'col-span-2' : ''} h-14 border-2 border-black text-lg font-bold transition active:scale-95 ${
        kind === 'op' ? 'bg-black text-white hover:bg-neutral-700' : kind === 'fn' ? 'bg-neutral-200 hover:bg-neutral-300' : 'bg-white hover:bg-neutral-100'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div>
      <div className="border-2 border-black bg-black p-4 text-right text-white">
        <p className="h-5 truncate font-mono text-xs text-neutral-400">{expr}</p>
        <p data-testid="calc-display" className="truncate text-4xl font-bold tabular-nums">{display}</p>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        <Btn label="C" kind="fn" onClick={clear} />
        <Btn label="±" kind="fn" onClick={sign} />
        <Btn label="%" kind="fn" onClick={percent} />
        <Btn label="÷" kind="op" onClick={() => operator('÷')} />
        {[7, 8, 9].map((n) => <Btn key={n} label={n} onClick={() => digit(String(n))} />)}
        <Btn label="×" kind="op" onClick={() => operator('×')} />
        {[4, 5, 6].map((n) => <Btn key={n} label={n} onClick={() => digit(String(n))} />)}
        <Btn label="−" kind="op" onClick={() => operator('−')} />
        {[1, 2, 3].map((n) => <Btn key={n} label={n} onClick={() => digit(String(n))} />)}
        <Btn label="+" kind="op" onClick={() => operator('+')} />
        <Btn label="0" onClick={() => digit('0')} />
        <Btn label="." onClick={dot} />
        <Btn label="⌫" kind="fn" onClick={del} />
        <Btn label="=" kind="op" onClick={equals} />
      </div>
    </div>
  )
}
