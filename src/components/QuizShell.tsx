import { type ReactNode } from 'react'

interface Props {
  title: string
  onBack: () => void
  score: number
  total: number
  timeLeft?: number
  timerMax?: number
  children: ReactNode
}

export function QuizShell({ title, onBack, score, total, timeLeft, timerMax, children }: Props) {
  const timerPct = timeLeft != null && timerMax ? (timeLeft / timerMax) * 100 : null

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <header className="px-4 py-3 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-slate-400 hover:text-white p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <div className="ml-auto text-sm">
            <span className="text-emerald-400 font-bold">{score}</span>
            <span className="text-slate-500"> / {total}</span>
          </div>
        </div>
        {timerPct != null && (
          <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 linear ${
                timerPct > 30 ? 'bg-emerald-500' : timerPct > 10 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${timerPct}%` }}
            />
          </div>
        )}
      </header>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  )
}
