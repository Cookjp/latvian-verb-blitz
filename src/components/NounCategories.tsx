import type { WordCategory } from '../types'

interface Props {
  categories: WordCategory[]
  onSelect: (categoryId: string) => void
}

export function NounCategories({ categories, onSelect }: Props) {
  const totalWords = categories.reduce((sum, c) => sum + c.words.length, 0)

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 pb-20">
      <header className="pt-12 pb-6 px-6 text-center">
        <h1 className="text-2xl font-bold text-white">Lietvārdi</h1>
        <p className="text-slate-400 mt-1">Nouns — {totalWords} words across {categories.length} topics</p>
      </header>

      <div className="flex-1 px-4">
        <div className="grid gap-3 max-w-sm mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className="flex items-center gap-4 p-4 bg-slate-800 hover:bg-slate-750 active:bg-slate-700 rounded-xl text-left transition-colors"
            >
              <span className="text-2xl w-10 text-center">{cat.icon}</span>
              <div className="flex-1">
                <div className="text-white font-medium">{cat.nameEn}</div>
                <div className="text-slate-400 text-sm">{cat.name} — {cat.words.length} words</div>
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
