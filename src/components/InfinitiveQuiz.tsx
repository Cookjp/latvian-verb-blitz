import { useState, useCallback, useEffect } from 'react'
import type { Verb, Settings } from '../types'
import { generateInfinitiveQuestion, useTimer } from '../hooks/useQuiz'
import { QuizShell } from './QuizShell'

interface Props {
  verbs: Verb[]
  settings: Settings
  onBack: () => void
  recordAttempt: (verbId: string, correct: boolean) => void
}

export function InfinitiveQuiz({ verbs, settings, onBack, recordAttempt }: Props) {
  const [question, setQuestion] = useState(() =>
    generateInfinitiveQuestion(verbs, settings)
  )
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [direction, setDirection] = useState<'lv-to-en' | 'en-to-lv'>('lv-to-en')

  const nextQuestion = useCallback(() => {
    const dir = Math.random() > 0.5 ? 'lv-to-en' : 'en-to-lv'
    setDirection(dir)
    setQuestion(generateInfinitiveQuestion(verbs, settings, dir))
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

  const prompt =
    direction === 'lv-to-en'
      ? question.verb.infinitive
      : question.verb.meaning

  const promptLabel =
    direction === 'lv-to-en'
      ? 'What does this mean?'
      : 'Which Latvian verb?'

  return (
    <QuizShell
      title="Infinitive Quiz"
      onBack={onBack}
      score={score}
      total={total}
      timeLeft={timeLeft}
      timerMax={settings.timerSeconds}
    >
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <p className="text-slate-400 text-sm mb-2">{promptLabel}</p>
        <p className="text-3xl font-bold text-white mb-8">{prompt}</p>

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
