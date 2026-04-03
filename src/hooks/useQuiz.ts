import { useState, useCallback, useRef, useEffect } from 'react'
import type { Verb, Tense, Person, Settings } from '../types'
import { PERSONS, TENSES } from '../types'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickRandom<T>(arr: T[], count: number, exclude?: T): T[] {
  const filtered = exclude !== undefined ? arr.filter(x => x !== exclude) : arr
  return shuffle(filtered).slice(0, count)
}

export interface QuizQuestion {
  verb: Verb
  tense: Tense
  person: Person
  correctAnswer: string
  options: string[]
}

export function generateInfinitiveQuestion(
  verbs: Verb[],
  _settings: Settings,
  direction: 'lv-to-en' | 'en-to-lv' = 'lv-to-en'
): QuizQuestion {
  const verb = verbs[Math.floor(Math.random() * verbs.length)]
  const distractors = pickRandom(verbs, 3, verb)
  const correctAnswer = direction === 'lv-to-en' ? verb.meaning : verb.infinitive
  const options = shuffle([
    correctAnswer,
    ...distractors.map(d => (direction === 'lv-to-en' ? d.meaning : d.infinitive)),
  ])
  return { verb, tense: 'present', person: 'es', correctAnswer, options }
}

export function generateConjugationQuestion(
  verbs: Verb[],
  settings: Settings
): QuizQuestion {
  const verb = verbs[Math.floor(Math.random() * verbs.length)]
  const tense = settings.tenses[Math.floor(Math.random() * settings.tenses.length)]
  const person = PERSONS[Math.floor(Math.random() * PERSONS.length)]
  const correctAnswer = verb.tenses[tense][person]
  const otherForms = TENSES.flatMap(t =>
    PERSONS.map(p => verb.tenses[t][p])
  ).filter(f => f !== correctAnswer)
  const distractorVerbs = pickRandom(verbs, 2, verb)
  const allDistractors = [
    ...otherForms,
    ...distractorVerbs.flatMap(v =>
      TENSES.flatMap(t => PERSONS.map(p => v.tenses[t][p]))
    ),
  ]
  const uniqueDistractors = [...new Set(allDistractors)].filter(d => d !== correctAnswer)
  const options = shuffle([correctAnswer, ...pickRandom(uniqueDistractors, 3)])
  return { verb, tense, person, correctAnswer, options }
}

export interface SnapPair {
  verb: Verb
  tense: Tense
  person: Person
  latvian: string
  english: string
  isMatch: boolean
}

export function generateSnapPair(verbs: Verb[], settings: Settings): SnapPair {
  const verb = verbs[Math.floor(Math.random() * verbs.length)]
  const tense = settings.tenses[Math.floor(Math.random() * settings.tenses.length)]
  const person = PERSONS[Math.floor(Math.random() * PERSONS.length)]
  const latvian = verb.tenses[tense][person]
  const isMatch = Math.random() > 0.4

  if (isMatch) {
    return { verb, tense, person, latvian, english: verb.meaning, isMatch: true }
  }

  const wrong = pickRandom(verbs, 1, verb)[0]
  return { verb, tense, person, latvian, english: wrong.meaning, isMatch: false }
}

export interface GapFillQuestion {
  verb: Verb
  tense: Tense
  person: Person
  answer: string
}

export function generateGapFill(verbs: Verb[], settings: Settings): GapFillQuestion {
  const verb = verbs[Math.floor(Math.random() * verbs.length)]
  const tense = settings.tenses[Math.floor(Math.random() * settings.tenses.length)]
  const person = PERSONS[Math.floor(Math.random() * PERSONS.length)]
  return { verb, tense, person, answer: verb.tenses[tense][person] }
}

export function useTimer(seconds: number, onTimeout: () => void) {
  const [timeLeft, setTimeLeft] = useState(seconds)
  const callbackRef = useRef(onTimeout)
  callbackRef.current = onTimeout

  useEffect(() => {
    setTimeLeft(seconds)
  }, [seconds])

  useEffect(() => {
    if (timeLeft <= 0) {
      callbackRef.current()
      return
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft])

  const reset = useCallback(() => setTimeLeft(seconds), [seconds])

  return { timeLeft, reset }
}
