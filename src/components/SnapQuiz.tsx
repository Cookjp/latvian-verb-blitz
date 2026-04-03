import { useState, useCallback, useEffect, useRef } from 'react'
import type { Verb, Settings } from '../types'
import { PERSON_LABELS } from '../types'
import { generateSnapPair, type SnapPair } from '../hooks/useQuiz'
import { QuizShell } from './QuizShell'

interface Props {
  verbs: Verb[]
  settings: Settings
  onBack: () => void
  recordAttempt: (verbId: string, correct: boolean) => void
}

export function SnapQuiz({ verbs, settings, onBack, recordAttempt }: Props) {
  const [pair, setPair] = useState<SnapPair>(() => generateSnapPair(verbs, settings))
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState(0)
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout>>()

  const next = useCallback(() => {
    setPair(generateSnapPair(verbs, settings))
    setFeedback(null)
  }, [verbs, settings])

  useEffect(() => {
    if (!feedback) {
      autoAdvanceRef.current = setTimeout(() => {
        if (!pair.isMatch) {
          recordAttempt(pair.verb.id, true)
          setTotal(t => t + 1)
          setScore(s => s + 1)
          setStreak(s => {
            const ns = s + 1
            setBestStreak(b => Math.max(b, ns))
            return ns
          })
          next()
        }
      }, 3000)
    }
    return () => clearTimeout(autoAdvanceRef.current)
  }, [pair, feedback, next, recordAttempt])

  const handleSnap = () => {
    if (feedback) return
    clearTimeout(autoAdvanceRef.current)
    setTotal(t => t + 1)
    if (pair.isMatch) {
      setFeedback('correct')
      setScore(s => s + 1)
      setStreak(s => {
        const ns = s + 1
        setBestStreak(b => Math.max(b, ns))
        return ns
      })
      recordAttempt(pair.verb.id, true)
    } else {
      setFeedback('wrong')
      setStreak(0)
      recordAttempt(pair.verb.id, false)
    }
    setTimeout(next, 1000)
  }

  const handlePass = () => {
    if (feedback) return
    clearTimeout(autoAdvanceRef.current)
    setTotal(t => t + 1)
    if (!pair.isMatch) {
      setFeedback('correct')
      setScore(s => s + 1)
      setStreak(s => {
        const ns = s + 1
        setBestStreak(b => Math.max(b, ns))
        return ns
      })
      recordAttempt(pair.verb.id, true)
    } else {
      setFeedback('wrong')
      setStreak(0)
      recordAttempt(pair.verb.id, false)
    }
    setTimeout(next, 1000)
  }

  const bgClass = feedback === 'correct'
    ? 'bg-emerald-900/20'
    : feedback === 'wrong'
    ? 'bg-red-900/20'
    : ''

  return (
    <QuizShell title="Snap!" onBack={onBack} score={score} total={total}>
      <div className={`flex-1 flex flex-col items-center justify-center px-6 py-8 transition-colors ${bgClass}`}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-slate-400">Streak:</span>
          <span className="text-lg font-bold text-amber-400">{streak}</span>
          {bestStreak >= 10 && (
            <span className="text-xs text-slate-500">(best: {bestStreak})</span>
          )}
        </div>

        {streak >= 10 && (
          <div className="mb-4 px-4 py-2 bg-amber-900/30 border border-amber-600 rounded-lg">
            <span className="text-amber-300 font-bold">10 in a row!</span>
          </div>
        )}

        <div className="w-full max-w-sm space-y-4 mb-8">
          <div className="bg-slate-800 rounded-xl p-5 text-center">
            <p className="text-xs text-slate-500 mb-1">Latvian</p>
            <p className="text-xl font-bold text-white">{pair.latvian}</p>
            <p className="text-xs text-slate-500 mt-1">
              {pair.person} ({PERSON_LABELS[pair.person]}) — {pair.tense}
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl p-5 text-center">
            <p className="text-xs text-slate-500 mb-1">English</p>
            <p className="text-xl font-bold text-white">{pair.english}</p>
          </div>
        </div>

        <div className="flex gap-4 w-full max-w-sm">
          <button
            onClick={handlePass}
            disabled={feedback !== null}
            className="flex-1 p-4 rounded-xl border-2 border-slate-600 bg-slate-800 text-white font-bold text-lg hover:border-slate-400 active:bg-slate-700 transition-all disabled:opacity-50"
          >
            No match
          </button>
          <button
            onClick={handleSnap}
            disabled={feedback !== null}
            className="flex-1 p-4 rounded-xl border-2 border-amber-600 bg-amber-900/30 text-amber-300 font-bold text-lg hover:border-amber-400 active:bg-amber-900/50 transition-all disabled:opacity-50"
          >
            Snap!
          </button>
        </div>
      </div>
    </QuizShell>
  )
}
