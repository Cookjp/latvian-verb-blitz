import { useState, useMemo } from 'react'
import type { Screen, Verb } from './types'
import verbs from './data/verbs.json'
import { useProgress, useSettings } from './hooks/useProgress'
import { Home } from './components/Home'
import { VerbList } from './components/VerbList'
import { VerbDetail } from './components/VerbDetail'
import { InfinitiveQuiz } from './components/InfinitiveQuiz'
import { ConjugationQuiz } from './components/ConjugationQuiz'
import { SnapQuiz } from './components/SnapQuiz'
import { GapFill } from './components/GapFill'
import { Settings } from './components/Settings'
import { Stats } from './components/Stats'

const allVerbs = verbs as Verb[]

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedVerbId, setSelectedVerbId] = useState<string | null>(null)
  const { progress, toggleLearned, recordAttempt, isLearned } = useProgress()
  const { settings, toggleTense, setTimer, setLearnedOnly } = useSettings()

  const navigate = (s: Screen, verbId?: string) => {
    setScreen(s)
    if (verbId) setSelectedVerbId(verbId)
  }

  const goHome = () => setScreen('home')

  const quizVerbs = useMemo(() => {
    if (settings.learnedOnly) {
      const learned = allVerbs.filter(v => progress.learned.includes(v.id))
      return learned.length >= 4 ? learned : allVerbs
    }
    return allVerbs
  }, [settings.learnedOnly, progress.learned])

  const selectedVerb = selectedVerbId
    ? allVerbs.find(v => v.id === selectedVerbId)
    : null

  switch (screen) {
    case 'home':
      return (
        <Home
          navigate={navigate}
          verbCount={allVerbs.length}
          learnedCount={progress.learned.length}
        />
      )
    case 'verbs':
      return (
        <VerbList
          verbs={allVerbs}
          isLearned={isLearned}
          toggleLearned={toggleLearned}
          navigate={navigate}
          onBack={goHome}
        />
      )
    case 'verb-detail':
      if (!selectedVerb) return <Home navigate={navigate} verbCount={allVerbs.length} learnedCount={progress.learned.length} />
      return (
        <VerbDetail
          verb={selectedVerb}
          isLearned={isLearned(selectedVerb.id)}
          toggleLearned={() => toggleLearned(selectedVerb.id)}
          onBack={() => setScreen('verbs')}
        />
      )
    case 'infinitive-quiz':
      return (
        <InfinitiveQuiz
          verbs={quizVerbs}
          settings={settings}
          onBack={goHome}
          recordAttempt={recordAttempt}
        />
      )
    case 'conjugation-quiz':
      return (
        <ConjugationQuiz
          verbs={quizVerbs}
          settings={settings}
          onBack={goHome}
          recordAttempt={recordAttempt}
        />
      )
    case 'snap-quiz':
      return (
        <SnapQuiz
          verbs={quizVerbs}
          settings={settings}
          onBack={goHome}
          recordAttempt={recordAttempt}
        />
      )
    case 'gap-fill':
      return (
        <GapFill
          verbs={quizVerbs}
          settings={settings}
          onBack={goHome}
          recordAttempt={recordAttempt}
        />
      )
    case 'settings':
      return (
        <Settings
          settings={settings}
          toggleTense={toggleTense}
          setTimer={setTimer}
          setLearnedOnly={setLearnedOnly}
          onBack={goHome}
        />
      )
    case 'stats':
      return <Stats verbs={allVerbs} progress={progress} onBack={goHome} />
  }
}
