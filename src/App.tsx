import { useState, useMemo } from 'react'
import type { Screen, Tab, WordCategory } from './types'
import verbs from './data/verbs.json'
import nounsData from './data/nouns.json'
import vocabData from './data/vocab.json'
import type { Verb } from './types'
import { useProgress, useSettings } from './hooks/useProgress'
import { BottomNav } from './components/BottomNav'
import { VerbHome } from './components/VerbHome'
import { VerbList } from './components/VerbList'
import { VerbDetail } from './components/VerbDetail'
import { InfinitiveQuiz } from './components/InfinitiveQuiz'
import { ConjugationQuiz } from './components/ConjugationQuiz'
import { SnapQuiz } from './components/SnapQuiz'
import { GapFill } from './components/GapFill'
import { Settings } from './components/Settings'
import { Stats } from './components/Stats'
import { NounCategories } from './components/NounCategories'
import { VocabCategories } from './components/VocabCategories'
import { WordList } from './components/WordList'
import { GrammarView } from './components/GrammarView'
import { VocabQuiz } from './components/VocabQuiz'

const allVerbs = verbs as Verb[]
const nounCategories = nounsData.categories as WordCategory[]
const vocabCategories = vocabData.categories as WordCategory[]
const allVocabWords = [...nounCategories, ...vocabCategories].flatMap(c => c.words)

export default function App() {
  const [tab, setTab] = useState<Tab>('verbs')
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedVerbId, setSelectedVerbId] = useState<string | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const { progress, toggleLearned, recordAttempt, isLearned } = useProgress()
  const { settings, toggleTense, setTimer, setLearnedOnly } = useSettings()

  const navigate = (s: Screen, verbId?: string) => {
    setScreen(s)
    if (verbId) setSelectedVerbId(verbId)
  }

  const goTabHome = () => {
    switch (tab) {
      case 'verbs': setScreen('home'); break
      case 'nouns': setScreen('noun-categories'); break
      case 'vocab': setScreen('vocab-categories'); break
      case 'grammar': setScreen('grammar'); break
    }
  }

  const handleTabChange = (newTab: Tab) => {
    setTab(newTab)
    switch (newTab) {
      case 'verbs': setScreen('home'); break
      case 'nouns': setScreen('noun-categories'); break
      case 'vocab': setScreen('vocab-categories'); break
      case 'grammar': setScreen('grammar'); break
    }
  }

  const quizVerbs = useMemo(() => {
    if (settings.learnedOnly) {
      const learned = allVerbs.filter(v => progress.learned.includes(v.id))
      return learned.length >= 4 ? learned : allVerbs
    }
    return allVerbs
  }, [settings.learnedOnly, progress.learned])

  const selectedVerb = selectedVerbId ? allVerbs.find(v => v.id === selectedVerbId) : null

  const selectedNounCategory = selectedCategoryId
    ? nounCategories.find(c => c.id === selectedCategoryId)
    : null

  const selectedVocabCategory = selectedCategoryId
    ? vocabCategories.find(c => c.id === selectedCategoryId)
    : null

  const showNav = !['verb-detail', 'verbs', 'infinitive-quiz', 'conjugation-quiz', 'snap-quiz', 'gap-fill', 'settings', 'stats', 'noun-list', 'vocab-list', 'vocab-quiz'].includes(screen)

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return (
          <VerbHome
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
            onBack={goTabHome}
          />
        )
      case 'verb-detail':
        if (!selectedVerb) return <VerbHome navigate={navigate} verbCount={allVerbs.length} learnedCount={progress.learned.length} />
        return (
          <VerbDetail
            verb={selectedVerb}
            isLearned={isLearned(selectedVerb.id)}
            toggleLearned={() => toggleLearned(selectedVerb.id)}
            onBack={() => setScreen('verbs')}
          />
        )
      case 'infinitive-quiz':
        return <InfinitiveQuiz verbs={quizVerbs} settings={settings} onBack={goTabHome} recordAttempt={recordAttempt} />
      case 'conjugation-quiz':
        return <ConjugationQuiz verbs={quizVerbs} settings={settings} onBack={goTabHome} recordAttempt={recordAttempt} />
      case 'snap-quiz':
        return <SnapQuiz verbs={quizVerbs} settings={settings} onBack={goTabHome} recordAttempt={recordAttempt} />
      case 'gap-fill':
        return <GapFill verbs={quizVerbs} settings={settings} onBack={goTabHome} recordAttempt={recordAttempt} />
      case 'settings':
        return <Settings settings={settings} toggleTense={toggleTense} setTimer={setTimer} setLearnedOnly={setLearnedOnly} onBack={goTabHome} />
      case 'stats':
        return <Stats verbs={allVerbs} progress={progress} onBack={goTabHome} />

      case 'noun-categories':
        return (
          <NounCategories
            categories={nounCategories}
            onSelect={(id) => { setSelectedCategoryId(id); setScreen('noun-list') }}
          />
        )
      case 'noun-list':
        if (!selectedNounCategory) return <NounCategories categories={nounCategories} onSelect={(id) => { setSelectedCategoryId(id); setScreen('noun-list') }} />
        return <WordList category={selectedNounCategory} onBack={() => setScreen('noun-categories')} />

      case 'vocab-categories':
        return (
          <VocabCategories
            categories={vocabCategories}
            onSelect={(id) => { setSelectedCategoryId(id); setScreen('vocab-list') }}
            onQuiz={() => setScreen('vocab-quiz')}
          />
        )
      case 'vocab-list':
        if (!selectedVocabCategory) return <VocabCategories categories={vocabCategories} onSelect={(id) => { setSelectedCategoryId(id); setScreen('vocab-list') }} onQuiz={() => setScreen('vocab-quiz')} />
        return <WordList category={selectedVocabCategory} onBack={() => setScreen('vocab-categories')} />
      case 'vocab-quiz':
        return <VocabQuiz words={allVocabWords} settings={settings} onBack={() => setScreen('vocab-categories')} />

      case 'grammar':
        return <GrammarView />

      default:
        return <VerbHome navigate={navigate} verbCount={allVerbs.length} learnedCount={progress.learned.length} />
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {renderScreen()}
      {showNav && <BottomNav activeTab={tab} onTabChange={handleTabChange} />}
    </div>
  )
}
