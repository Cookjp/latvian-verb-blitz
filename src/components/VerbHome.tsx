import type { Screen } from '../types'

interface Props {
  navigate: (screen: Screen) => void
  verbCount: number
  learnedCount: number
}

const menuItems: { screen: Screen; label: string; desc: string; icon: string }[] = [
  { screen: 'verbs', label: 'Verb List', desc: 'Browse & reference', icon: '📖' },
  { screen: 'infinitive-quiz', label: 'Infinitive Quiz', desc: 'Match meanings', icon: '🎯' },
  { screen: 'conjugation-quiz', label: 'Conjugation Quiz', desc: 'Pick the right form', icon: '🧩' },
  { screen: 'snap-quiz', label: 'Snap!', desc: 'Match pairs fast', icon: '⚡' },
  { screen: 'gap-fill', label: 'Gap Fill', desc: 'Spell it out', icon: '✏️' },
  { screen: 'stats', label: 'Progress', desc: 'Your trickiest verbs', icon: '📊' },
  { screen: 'settings', label: 'Settings', desc: 'Tenses & timer', icon: '⚙️' },
]

export function VerbHome({ navigate, verbCount, learnedCount }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 pb-20">
      <header className="pt-12 pb-6 px-6 text-center">
        <h1 className="text-2xl font-bold text-white">Darbības vārdi</h1>
        <p className="text-slate-400 mt-1">
          Verbs — {learnedCount} / {verbCount} learned
        </p>
        <div className="mt-3 mx-auto w-48 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${verbCount ? (learnedCount / verbCount) * 100 : 0}%` }}
          />
        </div>
      </header>

      <div className="flex-1 px-4">
        <div className="grid gap-3 max-w-sm mx-auto">
          {menuItems.map(({ screen, label, desc, icon }) => (
            <button
              key={screen}
              onClick={() => navigate(screen)}
              className="flex items-center gap-4 p-4 bg-slate-800 hover:bg-slate-750 active:bg-slate-700 rounded-xl text-left transition-colors"
            >
              <span className="text-2xl w-10 text-center">{icon}</span>
              <div>
                <div className="text-white font-medium">{label}</div>
                <div className="text-slate-400 text-sm">{desc}</div>
              </div>
              <svg className="ml-auto w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
