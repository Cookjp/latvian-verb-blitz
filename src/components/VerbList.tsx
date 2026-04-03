import { useState } from 'react'
import type { Verb, Screen } from '../types'

interface Props {
  verbs: Verb[]
  isLearned: (id: string) => boolean
  toggleLearned: (id: string) => void
  navigate: (screen: Screen, verbId?: string) => void
  onBack: () => void
}

export function VerbList({ verbs, isLearned, toggleLearned, navigate, onBack }: Props) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'learned' | 'unlearned'>('all')

  const filtered = verbs.filter(v => {
    const matchesSearch =
      v.infinitive.toLowerCase().includes(search.toLowerCase()) ||
      v.meaning.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === 'all' ||
      (filter === 'learned' && isLearned(v.id)) ||
      (filter === 'unlearned' && !isLearned(v.id))
    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className="text-slate-400 hover:text-white p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-bold text-white">Verb List</h2>
          <span className="ml-auto text-sm text-slate-400">{filtered.length} verbs</span>
        </div>
        <input
          type="text"
          placeholder="Search verbs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-3 py-2 bg-slate-800 text-white rounded-lg border border-slate-600 focus:border-emerald-500 focus:outline-none text-sm"
        />
        <div className="flex gap-2 mt-2">
          {(['all', 'learned', 'unlearned'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === f
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {filtered.map(verb => (
          <div
            key={verb.id}
            className="flex items-center border-b border-slate-800 hover:bg-slate-800/50"
          >
            <button
              onClick={() => toggleLearned(verb.id)}
              className="p-4 shrink-0"
            >
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  isLearned(verb.id)
                    ? 'bg-emerald-500 border-emerald-500'
                    : 'border-slate-500'
                }`}
              >
                {isLearned(verb.id) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
            <button
              onClick={() => navigate('verb-detail', verb.id)}
              className="flex-1 py-4 pr-4 text-left"
            >
              <span className="text-white font-medium">{verb.infinitive}</span>
              <span className="text-slate-400 ml-2 text-sm">{verb.meaning}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
