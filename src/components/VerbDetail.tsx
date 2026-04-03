import type { Verb } from '../types'
import { PERSONS, PERSON_LABELS, TENSES } from '../types'

interface Props {
  verb: Verb
  isLearned: boolean
  toggleLearned: () => void
  onBack: () => void
}

export function VerbDetail({ verb, isLearned, toggleLearned, onBack }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <header className="px-4 py-3 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-slate-400 hover:text-white p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h2 className="text-xl font-bold text-white">{verb.infinitive}</h2>
            <p className="text-slate-400 text-sm">{verb.meaning}</p>
          </div>
          <button
            onClick={toggleLearned}
            className={`ml-auto px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              isLearned
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {isLearned ? '✓ Learned' : 'Mark learned'}
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="text-sm text-slate-400">
          Conjugation group: <span className="text-white">{verb.conjugation}</span>
        </div>

        {TENSES.map(tense => (
          <div key={tense}>
            <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              {tense}
            </h3>
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              {PERSONS.map((person, i) => (
                <div
                  key={person}
                  className={`flex items-center px-4 py-2.5 ${
                    i > 0 ? 'border-t border-slate-700' : ''
                  }`}
                >
                  <span className="text-slate-400 text-sm w-24 shrink-0">
                    {person}
                  </span>
                  <span className="text-white font-medium flex-1">
                    {verb.tenses[tense][person]}
                  </span>
                  <span className="text-slate-500 text-xs">
                    {PERSON_LABELS[person]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
