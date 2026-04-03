# Latvian Verb Blitz

A progressive web app for mastering Latvian verb conjugations through interactive quizzes and a built-in reference guide. Installable on your phone — works offline.

## Features

**Reference**
- Browse 80+ Latvian verbs with full conjugation tables (present, past, future)
- Search by Latvian infinitive or English meaning
- Mark verbs as learned to track your progress

**Quiz Modes**
- **Infinitive Quiz** — match Latvian verbs to their English meanings and vice versa
- **Conjugation Quiz** — given a person, tense, and meaning, pick the correct conjugated form
- **Snap!** — fast-paced matching game where you spot whether a Latvian form matches an English meaning. Try for 10 in a row
- **Gap Fill** — spell out the correct conjugated form with an on-screen Latvian diacritics keyboard (ā, č, ē, ģ, ī, ķ, ļ, ņ, š, ū, ž)

**Progress Tracking**
- Per-verb accuracy stats across all quiz modes
- "Trickiest verbs" view sorted by error rate
- Overall accuracy dashboard

**Settings**
- Choose which tenses to drill (present, past, future)
- Adjustable timer (5–60 seconds per question)
- Quiz with all verbs or only ones you've marked as learned

## Install on Your Phone

1. Open the deployed URL in your phone's browser
2. **iOS**: Tap Share → "Add to Home Screen"
3. **Android**: Tap the three-dot menu → "Add to Home Screen"

The app works fully offline after first load.

## Development

```bash
npm install
npx vite dev
```

## Build & Deploy

```bash
npx vite build
npx vite preview   # local preview of production build
```

Deploy the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages).

## Tech Stack

React, TypeScript, Vite, Tailwind CSS, vite-plugin-pwa

## Verb Data

The app ships with 80+ common Latvian verbs covering all three conjugation groups plus irregulars. Verb data lives in `src/data/verbs.json` — add or correct entries there.
