import { Link, useParams } from 'react-router-dom'

const projects = [
  { id: 'p1', name: 'Red Harbor', updated: '2025-09-18' },
  { id: 'p2', name: 'Clockwork Orchard', updated: '2025-09-20' },
  { id: 'p3', name: 'Glass Saints', updated: '2025-09-24' }
]

const steps = [
  "One-sentence summary",
  "One-paragraph synopsis",
  "Character summaries",
  "Expand synopsis to one page",
  "Character sheets",
  "Expand to four-page synopsis",
  "Scene list / spreadsheet",
  "Character charts / arcs",
  "Scene details",
  "Final manuscript planning",
]

export default function Sidebar() {
  const { id } = useParams()
  return (
    <aside className="w-72 border-r h-full overflow-y-auto bg-white/50 backdrop-blur">
      <div className="px-4 py-3 border-b sticky top-0 bg-white/80 backdrop-blur z-10">
        <div className="text-sm font-semibold tracking-wide">Projects</div>
        <div className="text-xs text-gray-500">Your stories & drafts</div>
      </div>
      <ul className="p-2">
        {projects.map((p) => (
          <li key={p.id}>
            <Link to={`/projects/${p.id}/overview`}>
              <div className={`px-3 py-2 rounded-xl hover:bg-gray-100 ${id === p.id ? 'bg-gray-100' : ''}`}>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-gray-500">Updated {p.updated}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="px-4 py-3 border-t text-xs text-gray-500">
        Snowflake checklist
      </div>
      <div className="px-4 pb-4">
        <ol className="space-y-1 mt-2">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-2 text-sm">
              <span className="w-6 h-6 rounded-lg border grid place-items-center text-xs">{i + 1}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  )
}
