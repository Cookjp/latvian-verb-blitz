import { useState, useCallback, useEffect, useRef } from 'react'
import type { Verb, Settings } from '../types'
import { PERSON_LABELS } from '../types'
import { generateGapFill, useTimer, type GapFillQuestion } from '../hooks/useQuiz'
import { QuizShell } from './QuizShell'

interface Props {
  verbs: Verb[]
  settings: Settings
  onBack: () => void
  recordAttempt: (verbId: string, correct: boolean) => void
}

export function GapFill({ verbs, settings, onBack, recordAttempt }: Props) {
  const [question, setQuestion] = useState<GapFillQuestion>(() =>
    generateGapFill(verbs, settings)
  )
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const nextQuestion = useCallback(() => {
    setQuestion(generateGapFill(verbs, settings))
    setInput('')
    setSubmitted(false)
  }, [verbs, settings])

  const handleTimeout = useCallback(() => {
    if (submitted) return
    setSubmitted(true)
    recordAttempt(question.verb.id, false)
    setTotal(t => t + 1)
    setTimeout(nextQuestion, 2000)
  }, [submitted, question, recordAttempt, nextQuestion])

  const { timeLeft, reset } = useTimer(settings.timerSeconds, handleTimeout)

  useEffect(() => {
    reset()
    inputRef.current?.focus()
  }, [question, reset])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (submitted || !input.trim()) return
    setSubmitted(true)
    const correct = input.trim().toLowerCase() === question.answer.toLowerCase()
    recordAttempt(question.verb.id, correct)
    setTotal(t => t + 1)
    if (correct) setScore(s => s + 1)
    setTimeout(nextQuestion, correct ? 1000 : 2000)
  }

  const isCorrect = submitted && input.trim().toLowerCase() === question.answer.toLowerCase()
  const isWrong = submitted && !isCorrect

  return (
    <QuizShell
      title="Gap Fill"
      onBack={onBack}
      score={score}
      total={total}
      timeLeft={timeLeft}
      timerMax={settings.timerSeconds}
    >
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <p className="text-slate-400 text-sm mb-1">{question.verb.meaning}</p>
        <div className="flex items-center gap-2 mb-6">
          <span className="px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-300">
            {question.tense}
          </span>
          <span className="px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-300">
            {question.person} ({PERSON_LABELS[question.person]})
          </span>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 w-full max-w-sm mb-6">
          <p className="text-center text-lg text-white">
            <span className="text-slate-400">{question.person}</span>{' '}
            <span className="border-b-2 border-dashed border-emerald-500 px-2 py-1 min-w-[80px] inline-block">
              {submitted ? (
                <span className={isCorrect ? 'text-emerald-400' : 'text-red-400'}>
                  {input || '—'}
                </span>
              ) : (
                '?'
              )}
            </span>
          </p>
        </div>

        {isWrong && (
          <p className="text-red-400 text-sm mb-4">
            Correct answer: <span className="font-bold text-white">{question.answer}</span>
          </p>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={submitted}
            placeholder="Type the verb form..."
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className={`w-full px-4 py-3 rounded-xl border-2 text-center text-lg font-medium transition-all focus:outline-none ${
              submitted
                ? isCorrect
                  ? 'bg-emerald-900/30 border-emerald-500 text-emerald-300'
                  : 'bg-red-900/30 border-red-500 text-red-300'
                : 'bg-slate-800 border-slate-600 text-white focus:border-emerald-500'
            }`}
          />
          {!submitted && (
            <button
              type="submit"
              className="w-full mt-3 p-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 active:bg-emerald-700 transition-colors"
            >
              Check
            </button>
          )}
        </form>

        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {['ā', 'č', 'ē', 'ģ', 'ī', 'ķ', 'ļ', 'ņ', 'š', 'ū', 'ž'].map(char => (
            <button
              key={char}
              type="button"
              onClick={() => {
                if (!submitted) {
                  setInput(prev => prev + char)
                  inputRef.current?.focus()
                }
              }}
              disabled={submitted}
              className="w-10 h-10 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-600 active:bg-slate-500 transition-colors disabled:opacity-30"
            >
              {char}
            </button>
          ))}
        </div>
      </div>
    </QuizShell>
  )
}
