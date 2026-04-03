import { useState, useCallback } from 'react'
import type { WordEntry, Settings } from '../types'
import { QuizShell } from './QuizShell'

interface Props {
  words: WordEntry[]
  settings: Settings
  onBack: () => void
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface Question {
  prompt: string
  correctAnswer: string
  options: string[]
  direction: 'lv-to-en' | 'en-to-lv'
}

function generateQuestion(words: WordEntry[]): Question {
  const word = words[Math.floor(Math.random() * words.length)]
  const direction: 'lv-to-en' | 'en-to-lv' = Math.random() > 0.5 ? 'lv-to-en' : 'en-to-lv'
  const prompt = direction === 'lv-to-en' ? word.lv : word.en
  const correctAnswer = direction === 'lv-to-en' ? word.en : word.lv

  const distractors = shuffle(words.filter(w => w !== word))
    .slice(0, 3)
    .map(w => direction === 'lv-to-en' ? w.en : w.lv)

  return {
    prompt,
    correctAnswer,
    options: shuffle([correctAnswer, ...distractors]),
    direction,
  }
}

export function VocabQuiz({ words, settings, onBack }: Props) {
  const [question, setQuestion] = useState<Question>(() => generateQuestion(words))
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)

  const next = useCallback(() => {
    setQuestion(generateQuestion(words))
    setSelected(null)
  }, [words])

  const handleSelect = (option: string) => {
    if (selected) return
    setSelected(option)
    setTotal(t => t + 1)
    if (option === question.correctAnswer) {
      setScore(s => s + 1)
    }
    setTimeout(next, 1200)
  }

  const dirLabel = question.direction === 'lv-to-en' ? 'What does this mean?' : 'How do you say this in Latvian?'

  return (
    <QuizShell title="Vocab Quiz" onBack={onBack} score={score} total={total}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <p className="text-slate-400 text-sm mb-2">{dirLabel}</p>
        <p className="text-2xl font-bold text-white mb-8">{question.prompt}</p>

        <div className="w-full max-w-sm space-y-3">
          {question.options.map((option) => {
            const isCorrect = option === question.correctAnswer
            const isSelected = option === selected
            let cls = 'bg-slate-800 border-slate-600 text-white hover:border-slate-400'
            if (selected) {
              if (isCorrect) cls = 'bg-emerald-900/30 border-emerald-500 text-emerald-300'
              else if (isSelected) cls = 'bg-red-900/30 border-red-500 text-red-300'
              else cls = 'bg-slate-800 border-slate-700 text-slate-500'
            }
            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                disabled={selected !== null}
                className={`w-full p-4 rounded-xl border-2 font-medium text-left transition-all ${cls}`}
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
