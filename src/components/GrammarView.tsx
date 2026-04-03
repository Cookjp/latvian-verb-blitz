import { useState } from 'react'
import { grammarSections, type GrammarSection, type GrammarBlock } from '../data/grammar'

function BlockRenderer({ block }: { block: GrammarBlock }) {
  switch (block.type) {
    case 'text':
      return <p className="text-slate-300 text-sm leading-relaxed">{block.text}</p>
    case 'heading':
      return <h3 className="text-white font-semibold mt-4 mb-1">{block.text}</h3>
    case 'example':
      return (
        <div className="bg-slate-800 rounded-lg px-4 py-3 my-2 border-l-2 border-amber-500">
          <p className="text-white font-medium">{block.lv}</p>
          <p className="text-slate-400 text-sm">{block.en}</p>
        </div>
      )
    case 'table':
      return (
        <div className="overflow-x-auto my-2 -mx-1">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} className="text-left text-amber-400 font-medium px-2 py-1.5 border-b border-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-slate-800/50' : ''}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="text-slate-300 px-2 py-1.5">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

function SectionCard({ section }: { section: GrammarSection }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div>
          <div className="text-white font-medium">{section.title}</div>
          <div className="text-slate-400 text-sm">{section.titleLv}</div>
        </div>
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-2">
          {section.content.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </div>
      )}
    </div>
  )
}

export function GrammarView() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 pb-20">
      <header className="pt-12 pb-6 px-6 text-center">
        <h1 className="text-2xl font-bold text-white">Gramatika</h1>
        <p className="text-slate-400 mt-1">Grammar — cases, declensions & patterns</p>
      </header>

      <div className="flex-1 px-4">
        <div className="grid gap-3 max-w-sm mx-auto">
          {grammarSections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </div>
      </div>
    </div>
  )
}
