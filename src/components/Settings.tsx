import type { Settings as SettingsType, Tense } from '../types'
import { TENSES } from '../types'

interface Props {
  settings: SettingsType
  toggleTense: (tense: Tense) => void
  setTimer: (seconds: number) => void
  setLearnedOnly: (value: boolean) => void
  onBack: () => void
}

const timerOptions = [5, 10, 15, 20, 30, 60]

export function Settings({ settings, toggleTense, setTimer, setLearnedOnly, onBack }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <header className="px-4 py-3 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-slate-400 hover:text-white p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-bold text-white">Settings</h2>
        </div>
      </header>

      <div className="flex-1 p-4 space-y-6">
        <section>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Tenses to drill
          </h3>
          <div className="space-y-2">
            {TENSES.map(tense => (
              <button
                key={tense}
                onClick={() => toggleTense(tense)}
                className="flex items-center gap-3 w-full p-3 bg-slate-800 rounded-lg"
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    settings.tenses.includes(tense)
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-slate-500'
                  }`}
                >
                  {settings.tenses.includes(tense) && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-white capitalize">{tense}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Timer (seconds per question)
          </h3>
          <div className="flex flex-wrap gap-2">
            {timerOptions.map(s => (
              <button
                key={s}
                onClick={() => setTimer(s)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  settings.timerSeconds === s
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {s}s
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Verb selection
          </h3>
          <button
            onClick={() => setLearnedOnly(!settings.learnedOnly)}
            className="flex items-center gap-3 w-full p-3 bg-slate-800 rounded-lg"
          >
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                settings.learnedOnly
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border-slate-500'
              }`}
            >
              {settings.learnedOnly && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <div className="text-left">
              <span className="text-white">Learned verbs only</span>
              <p className="text-xs text-slate-400">Only quiz verbs you've marked as learned</p>
            </div>
          </button>
        </section>
      </div>
    </div>
  )
}
