import { Link } from 'react-router-dom'

const projects = [
  { id: 'p1', name: 'Red Harbor', updated: '2025-09-18' },
  { id: 'p2', name: 'Clockwork Orchard', updated: '2025-09-20' },
  { id: 'p3', name: 'Glass Saints', updated: '2025-09-24' }
]

export default function Projects() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm uppercase tracking-widest text-gray-500">glork</div>
          <h1 className="text-2xl font-semibold">Your projects</h1>
        </div>
        <button className="px-3 py-1.5 rounded-xl border hover:bg-gray-50">New</button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map(p => (
          <Link key={p.id} to={`/projects/${p.id}/overview`} className="rounded-2xl border p-4 bg-white hover:shadow-sm">
            <div className="text-lg font-semibold">{p.name}</div>
            <div className="text-xs text-gray-500">Updated {p.updated}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
