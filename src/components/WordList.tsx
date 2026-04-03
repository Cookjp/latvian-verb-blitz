import { useState } from 'react'
import type { WordCategory } from '../types'

interface Props {
  category: WordCategory
  onBack: () => void
}

export function WordList({ category, onBack }: Props) {
  const [search, setSearch] = useState('')
  const [revealed, setRevealed] = useState<Set<number>>(new Set())

  const filtered = category.words.filter(
    w =>
      w.lv.toLowerCase().includes(search.toLowerCase()) ||
      w.en.toLowerCase().includes(search.toLowerCase())
  )

  const toggleReveal = (idx: number) => {
    setRevealed(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const revealAll = () => {
    if (revealed.size === filtered.length) {
      setRevealed(new Set())
    } else {
      setRevealed(new Set(filtered.map((_, i) => i)))
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 pb-20">
      <header className="sticky top-0 bg-slate-900/95 backdrop-blur z-10 px-4 pt-4 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className="text-slate-400 hover:text-white p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-bold text-white">{category.icon} {category.nameEn}</h1>
            <p className="text-slate-400 text-xs">{category.name} — {category.words.length} words</p>
          </div>
          <button
            onClick={revealAll}
            className="ml-auto text-xs text-amber-400 hover:text-amber-300 font-medium px-2 py-1"
          >
            {revealed.size === filtered.length ? 'Hide all' : 'Show all'}
          </button>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
        />
      </header>

      <div className="flex-1 px-4">
        <div className="max-w-sm mx-auto divide-y divide-slate-800">
          {filtered.map((word, idx) => (
            <button
              key={idx}
              onClick={() => toggleReveal(idx)}
              className="w-full flex items-center justify-between py-3 px-1 text-left"
            >
              <span className="text-white font-medium">{word.lv}</span>
              <span className={`text-sm transition-all ${revealed.has(idx) ? 'text-amber-400' : 'text-slate-600'}`}>
                {revealed.has(idx) ? word.en : 'tap to reveal'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
