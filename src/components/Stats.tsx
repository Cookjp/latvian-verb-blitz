import type { Verb, ProgressData } from '../types'

interface Props {
  verbs: Verb[]
  progress: ProgressData
  onBack: () => void
}

export function Stats({ verbs, progress, onBack }: Props) {
  const verbsWithStats = verbs
    .map(v => {
      const stats = progress.stats[v.id]
      if (!stats || stats.attempts === 0) return null
      return {
        verb: v,
        stats,
        errorRate: 1 - stats.correct / stats.attempts,
      }
    })
    .filter((v): v is NonNullable<typeof v> => v !== null)
    .sort((a, b) => b.errorRate - a.errorRate)

  const totalAttempts = verbsWithStats.reduce((sum, v) => sum + v.stats.attempts, 0)
  const totalCorrect = verbsWithStats.reduce((sum, v) => sum + v.stats.correct, 0)
  const overallRate = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <header className="px-4 py-3 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-slate-400 hover:text-white p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-bold text-white">Progress</h2>
        </div>
      </header>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{totalAttempts}</div>
            <div className="text-xs text-slate-400">Attempts</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{totalCorrect}</div>
            <div className="text-xs text-slate-400">Correct</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">{overallRate}%</div>
            <div className="text-xs text-slate-400">Accuracy</div>
          </div>
        </div>

        {verbsWithStats.length === 0 ? (
          <p className="text-center text-slate-500 py-12">
            No quiz data yet. Play some games!
          </p>
        ) : (
          <>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Trickiest verbs
            </h3>
            <div className="space-y-2">
              {verbsWithStats.map(({ verb, stats, errorRate }) => (
                <div
                  key={verb.id}
                  className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg"
                >
                  <div className="flex-1">
                    <span className="text-white font-medium">{verb.infinitive}</span>
                    <span className="text-slate-400 text-sm ml-2">{verb.meaning}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      <span className="text-emerald-400">{stats.correct}</span>
                      <span className="text-slate-500">/{stats.attempts}</span>
                    </div>
                    <div className={`text-xs ${errorRate > 0.5 ? 'text-red-400' : errorRate > 0.2 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {Math.round(errorRate * 100)}% errors
                    </div>
                  </div>
                  <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        errorRate > 0.5 ? 'bg-red-500' : errorRate > 0.2 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${(1 - errorRate) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
