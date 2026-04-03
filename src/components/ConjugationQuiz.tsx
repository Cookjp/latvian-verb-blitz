import { useState, useCallback, useEffect } from 'react'
import type { Verb, Settings } from '../types'
import { PERSON_LABELS } from '../types'
import { generateConjugationQuestion, useTimer } from '../hooks/useQuiz'
import { QuizShell } from './QuizShell'

interface Props {
  verbs: Verb[]
  settings: Settings
  onBack: () => void
  recordAttempt: (verbId: string, correct: boolean) => void
}

export function ConjugationQuiz({ verbs, settings, onBack, recordAttempt }: Props) {
  const [question, setQuestion] = useState(() =>
    generateConjugationQuestion(verbs, settings)
  )
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)

  const nextQuestion = useCallback(() => {
    setQuestion(generateConjugationQuestion(verbs, settings))
    setSelected(null)
  }, [verbs, settings])

  const handleTimeout = useCallback(() => {
    if (selected) return
    setSelected('__timeout__')
    recordAttempt(question.verb.id, false)
    setTotal(t => t + 1)
    setTimeout(nextQuestion, 1500)
  }, [selected, question, recordAttempt, nextQuestion])

  const { timeLeft, reset } = useTimer(settings.timerSeconds, handleTimeout)

  useEffect(() => {
    reset()
  }, [question, reset])

  const handleSelect = (option: string) => {
    if (selected) return
    setSelected(option)
    const correct = option === question.correctAnswer
    recordAttempt(question.verb.id, correct)
    setTotal(t => t + 1)
    if (correct) setScore(s => s + 1)
    setTimeout(nextQuestion, correct ? 800 : 1500)
  }

  return (
    <QuizShell
      title="Conjugation Quiz"
      onBack={onBack}
      score={score}
      total={total}
      timeLeft={timeLeft}
      timerMax={settings.timerSeconds}
    >
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <p className="text-slate-400 text-sm mb-1">{question.verb.meaning}</p>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-300">
            {question.tense}
          </span>
          <span className="px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-300">
            {question.person} ({PERSON_LABELS[question.person]})
          </span>
        </div>
        <p className="text-2xl font-bold text-white mb-8">
          {PERSON_LABELS[question.person]} — {question.verb.meaning} ({question.tense})
        </p>

        <div className="w-full max-w-sm space-y-3">
          {question.options.map(option => {
            let cls = 'bg-slate-800 border-slate-600 text-white hover:border-slate-400'
            if (selected) {
              if (option === question.correctAnswer) {
                cls = 'bg-emerald-900/50 border-emerald-500 text-emerald-300'
              } else if (option === selected) {
                cls = 'bg-red-900/50 border-red-500 text-red-300'
              } else {
                cls = 'bg-slate-800/50 border-slate-700 text-slate-500'
              }
            }
            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                disabled={selected !== null}
                className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${cls}`}
              >
                {option}
              </button>
            )
          })}
        </div>
      </div>
    </QuizShell>
  )
}
