import type { WordCategory } from '../types'

interface Props {
  categories: WordCategory[]
  onSelect: (categoryId: string) => void
  onQuiz: () => void
}

function getCategoryCount(cat: WordCategory): number {
  return cat.words.length + (cat.phrases?.length || 0)
}

function getCategoryLabel(cat: WordCategory): string {
  const wordCount = cat.words.length
  const phraseCount = cat.phrases?.length || 0
  if (phraseCount === 0) return `${cat.name} — ${wordCount} words`
  return `${cat.name} — ${wordCount} words, ${phraseCount} phrases`
}

export function VocabCategories({ categories, onSelect, onQuiz }: Props) {
  const totalItems = categories.reduce((sum, c) => sum + getCategoryCount(c), 0)

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 pb-20">
      <header className="pt-12 pb-6 px-6 text-center">
        <h1 className="text-2xl font-bold text-white">Vārdi</h1>
        <p className="text-slate-400 mt-1">Vocabulary — {totalItems} items across {categories.length} topics</p>
      </header>

      <div className="flex-1 px-4">
        <div className="grid gap-3 max-w-sm mx-auto">
          <button
            onClick={onQuiz}
            className="flex items-center gap-4 p-4 bg-amber-900/30 border border-amber-600/50 hover:border-amber-500 active:bg-amber-900/50 rounded-xl text-left transition-colors"
          >
            <span className="text-2xl w-10 text-center">🎯</span>
            <div className="flex-1">
              <div className="text-amber-300 font-medium">Vocab Quiz</div>
              <div className="text-amber-400/60 text-sm">Test yourself on all words</div>
            </div>
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className="flex items-center gap-4 p-4 bg-slate-800 hover:bg-slate-750 active:bg-slate-700 rounded-xl text-left transition-colors"
            >
              <span className="text-2xl w-10 text-center">{cat.icon}</span>
              <div className="flex-1">
                <div className="text-white font-medium">{cat.nameEn}</div>
                <div className="text-slate-400 text-sm">{getCategoryLabel(cat)}</div>
              </div>
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
