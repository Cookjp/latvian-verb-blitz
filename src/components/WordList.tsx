import { useState, useMemo } from 'react'
import type { WordCategory, WordEntry, VocabFilter } from '../types'

interface Props {
  category: WordCategory
  onBack: () => void
  onQuiz?: (words: WordEntry[]) => void
}

export function WordList({ category, onBack, onQuiz }: Props) {
  const [search, setSearch] = useState('')
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const [filter, setFilter] = useState<VocabFilter>('both')

  const hasPhrases = category.phrases && category.phrases.length > 0
  const wordCount = category.words.length
  const phraseCount = category.phrases?.length ?? 0

  const allItems = useMemo(() => {
    if (!hasPhrases) return category.words
    if (filter === 'words') return category.words
    if (filter === 'phrases') return category.phrases!
    return [...category.words, ...category.phrases!]
  }, [category, filter, hasPhrases])

  const filtered = allItems.filter(
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

  const handleQuiz = () => {
    if (onQuiz && allItems.length >= 4) {
      onQuiz(allItems)
    }
  }

  const getSubtitle = () => {
    if (!hasPhrases) return `${category.name} — ${wordCount} words`
    if (filter === 'words') return `${category.name} — ${wordCount} words`
    if (filter === 'phrases') return `${category.name} — ${phraseCount} phrases`
    return `${category.name} — ${wordCount} words, ${phraseCount} phrases`
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
            <p className="text-slate-400 text-xs">{getSubtitle()}</p>
          </div>
          <button
            onClick={revealAll}
            className="ml-auto text-xs text-amber-400 hover:text-amber-300 font-medium px-2 py-1"
          >
            {revealed.size === filtered.length ? 'Hide all' : 'Show all'}
          </button>
        </div>

        {hasPhrases && (
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => { setFilter('words'); setRevealed(new Set()) }}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                filter === 'words'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Words ({wordCount})
            </button>
            <button
              onClick={() => { setFilter('phrases'); setRevealed(new Set()) }}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                filter === 'phrases'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Phrases ({phraseCount})
            </button>
            <button
              onClick={() => { setFilter('both'); setRevealed(new Set()) }}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                filter === 'both'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Both
            </button>
          </div>
        )}

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
        />

        {onQuiz && allItems.length >= 4 && (
          <button
            onClick={handleQuiz}
            className="w-full mt-3 py-3 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span>🎯</span>
            <span>Quiz {filter === 'words' ? 'Words' : filter === 'phrases' ? 'Phrases' : 'All'}</span>
          </button>
        )}
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
