import { useState, useCallback, useEffect } from 'react'
import type { ProgressData, VerbStats, Settings, Tense } from '../types'

const PROGRESS_KEY = 'verb-blitz-progress'
const SETTINGS_KEY = 'verb-blitz-settings'

const defaultProgress: ProgressData = {
  learned: [],
  stats: {},
}

const defaultSettings: Settings = {
  tenses: ['present', 'past', 'future'],
  timerSeconds: 15,
  learnedOnly: false,
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(() =>
    load(PROGRESS_KEY, defaultProgress)
  )

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
  }, [progress])

  const toggleLearned = useCallback((verbId: string) => {
    setProgress(prev => {
      const learned = prev.learned.includes(verbId)
        ? prev.learned.filter(id => id !== verbId)
        : [...prev.learned, verbId]
      return { ...prev, learned }
    })
  }, [])

  const recordAttempt = useCallback((verbId: string, correct: boolean) => {
    setProgress(prev => {
      const existing = prev.stats[verbId] ?? { attempts: 0, correct: 0, streak: 0 }
      const stats: VerbStats = {
        attempts: existing.attempts + 1,
        correct: existing.correct + (correct ? 1 : 0),
        streak: correct ? existing.streak + 1 : 0,
      }
      return { ...prev, stats: { ...prev.stats, [verbId]: stats } }
    })
  }, [])

  const getStats = useCallback(
    (verbId: string): VerbStats =>
      progress.stats[verbId] ?? { attempts: 0, correct: 0, streak: 0 },
    [progress.stats]
  )

  const isLearned = useCallback(
    (verbId: string) => progress.learned.includes(verbId),
    [progress.learned]
  )

  return { progress, toggleLearned, recordAttempt, getStats, isLearned }
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() =>
    load(SETTINGS_KEY, defaultSettings)
  )

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  }, [settings])

  const toggleTense = useCallback((tense: Tense) => {
    setSettings(prev => {
      const tenses = prev.tenses.includes(tense)
        ? prev.tenses.filter(t => t !== tense)
        : [...prev.tenses, tense]
      if (tenses.length === 0) return prev
      return { ...prev, tenses }
    })
  }, [])

  const setTimer = useCallback((seconds: number) => {
    setSettings(prev => ({ ...prev, timerSeconds: seconds }))
  }, [])

  const setLearnedOnly = useCallback((learnedOnly: boolean) => {
    setSettings(prev => ({ ...prev, learnedOnly }))
  }, [])

  return { settings, toggleTense, setTimer, setLearnedOnly }
}
