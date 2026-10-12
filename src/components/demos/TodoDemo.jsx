import { useEffect, useState } from 'react'

const KEY = 'portfolio-todos'
const load = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY))
    if (Array.isArray(raw)) return raw
  } catch { /* ignore */ }
  return [
    { id: 1, text: 'Finish DCIT 26 midterm lab', done: false },
    { id: 2, text: 'Deploy portfolio on Vercel', done: false },
  ]
}

export default function TodoDemo() {
  const [todos, setTodos] = useState(load)
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState('')

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(todos)) } catch { /* ignore */ }
  }, [todos])

  const add = (e) => {
    e.preventDefault()
    if (!text.trim()) return setError('Please type a task first.')
    setTodos([{ id: Date.now(), text: text.trim(), done: false }, ...todos])
    setText('')
    setError('')
  }
  const toggle = (id) => setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  const remove = (id) => setTodos(todos.filter((t) => t.id !== id))

  const shown = todos.filter((t) => (filter === 'all' ? true : filter === 'done' ? t.done : !t.done))
  const left = todos.filter((t) => !t.done).length

  return (
    <div>
      <form onSubmit={add} className="flex gap-2">
        <input
          value={text}
          onChange={(e) => { setText(e.target.value); setError('') }}
          placeholder="Add a new task…"
          aria-label="New task"
          className="min-w-0 flex-1 border-2 border-black px-3 py-2 outline-none focus:shadow-[3px_3px_0_0_#000]"
        />
        <button className="border-2 border-black bg-black px-4 font-medium text-white hover:bg-white hover:text-black">Add</button>
      </form>
      {error && <p role="alert" className="mt-1.5 font-mono text-xs">✕ {error}</p>}

      <div className="mt-4 flex gap-2" role="group" aria-label="Filter tasks">
        {['all', 'active', 'done'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border-2 border-black px-3 py-1 text-xs font-medium capitalize ${filter === f ? 'bg-black text-white' : 'hover:bg-neutral-200'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="mt-4 max-h-64 divide-y divide-neutral-200 overflow-y-auto border-2 border-black">
        {shown.length === 0 && <li className="p-4 text-center text-sm text-neutral-500">Nothing here yet.</li>}
        {shown.map((t) => (
          <li key={t.id} className="flex items-center gap-3 p-3">
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} aria-label={`Mark ${t.text} done`} className="h-4 w-4 accent-black" />
            <span className={`flex-1 break-words ${t.done ? 'text-neutral-400 line-through' : ''}`}>{t.text}</span>
            <button onClick={() => remove(t.id)} aria-label={`Delete ${t.text}`} className="px-2 font-bold hover:bg-black hover:text-white">✕</button>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center justify-between font-mono text-xs text-neutral-600">
        <span>{left} task{left === 1 ? '' : 's'} left</span>
        {todos.some((t) => t.done) && (
          <button onClick={() => setTodos(todos.filter((t) => !t.done))} className="underline underline-offset-2 hover:no-underline">
            Clear completed
          </button>
        )}
      </div>
    </div>
  )
}
