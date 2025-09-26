import { Link, useParams, useLocation } from 'react-router-dom'

export default function TopBar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { id } = useParams()
  const location = useLocation()

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-white/60 backdrop-blur sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="w-8 h-8 rounded-xl border grid place-items-center">≡</button>
        <Link to="/projects">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-black/90 text-white grid place-items-center font-bold">G</div>
            <div>
              <div className="text-xs uppercase tracking-widest text-gray-500">glork</div>
              <div className="text-lg font-semibold">{id ? `Project ${id}` : 'Projects'}</div>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Link className="px-3 py-1.5 rounded-xl border hover:bg-gray-50" to={id ? `/projects/${id}/overview` : '/projects'}>Overview</Link>
        <Link className="px-3 py-1.5 rounded-xl border hover:bg-gray-50" to={id ? `/projects/${id}/outline` : '/projects'}>Outline</Link>
        <Link className="px-3 py-1.5 rounded-xl border hover:bg-gray-50" to={id ? `/projects/${id}/characters` : '/projects'}>Characters</Link>
        <Link className="px-3 py-1.5 rounded-xl border hover:bg-gray-50" to={id ? `/projects/${id}/scenes` : '/projects'}>Scenes</Link>
        <Link className="px-3 py-1.5 rounded-xl border hover:bg-gray-50" to={id ? `/projects/${id}/snowflake` : '/projects'}>Snowflake</Link>
        <div className="ml-2 text-xs text-gray-500 hidden md:block">{location.pathname}</div>
      </div>
    </div>
  )
}
