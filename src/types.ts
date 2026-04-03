export type Person = 'es' | 'tu' | 'viņš/viņa' | 'mēs' | 'jūs' | 'viņi/viņas'

export const PERSONS: Person[] = ['es', 'tu', 'viņš/viņa', 'mēs', 'jūs', 'viņi/viņas']

export const PERSON_LABELS: Record<Person, string> = {
  'es': 'I',
  'tu': 'you (sg.)',
  'viņš/viņa': 'he/she',
  'mēs': 'we',
  'jūs': 'you (pl.)',
  'viņi/viņas': 'they',
}

export type Tense = 'present' | 'past' | 'future'

export const TENSES: Tense[] = ['present', 'past', 'future']

export type Conjugations = Record<Person, string>

export interface Verb {
  id: string
  infinitive: string
  meaning: string
  conjugation: number
  tenses: Record<Tense, Conjugations>
}

export interface VerbStats {
  attempts: number
  correct: number
  streak: number
}

export type VerbProgress = 'unmarked' | 'learning' | 'mastered'

export interface ProgressData {
  learned: string[]
  stats: Record<string, VerbStats>
}

export interface Settings {
  tenses: Tense[]
  timerSeconds: number
  learnedOnly: boolean
}

export type Tab = 'verbs' | 'nouns' | 'vocab' | 'grammar'

export type Screen =
  | 'home'
  | 'verbs'
  | 'verb-detail'
  | 'infinitive-quiz'
  | 'conjugation-quiz'
  | 'snap-quiz'
  | 'gap-fill'
  | 'settings'
  | 'stats'
  | 'noun-categories'
  | 'noun-list'
  | 'vocab-categories'
  | 'vocab-list'
  | 'grammar'
  | 'grammar-section'
  | 'vocab-quiz'

export interface WordEntry {
  lv: string
  en: string
}

export interface WordCategory {
  id: string
  name: string
  nameEn: string
  icon: string
  words: WordEntry[]
}
