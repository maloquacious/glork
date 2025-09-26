export default function RightPanel() {
  return (
    <aside className="w-80 border-l h-full overflow-y-auto bg-white/40 backdrop-blur">
      <div className="px-4 py-3 border-b sticky top-0 bg-white/80 backdrop-blur z-10">
        <div className="text-sm font-semibold tracking-wide">Properties</div>
        <div className="text-xs text-gray-500">Metadata & status</div>
      </div>
      <div className="p-4 space-y-4">
        <section className="space-y-1">
          <div className="text-xs uppercase tracking-wide text-gray-500">Genre</div>
          <div className="flex gap-2 flex-wrap">
            {["Mystery","Thriller","Fantasy","Sci-Fi"].map((g) => (
              <button key={g} className="px-2 py-1 rounded-lg border text-xs hover:bg-gray-50">{g}</button>
            ))}
          </div>
        </section>
        <section className="space-y-1">
          <div className="text-xs uppercase tracking-wide text-gray-500">Target length</div>
          <div className="flex gap-2">
            {["Short","Novella","Novel"].map((g) => (
              <button key={g} className="px-2 py-1 rounded-lg border text-xs hover:bg-gray-50">{g}</button>
            ))}
          </div>
        </section>
        <section className="space-y-1">
          <div className="text-xs uppercase tracking-wide text-gray-500">Status</div>
          <div className="text-sm">Exploring</div>
        </section>
        <section className="space-y-1">
          <div className="text-xs uppercase tracking-wide text-gray-500">Labels</div>
          <div className="flex gap-2 flex-wrap">
            {["POV:A","POV:B","Draft","Needs arc"].map((tag) => (
              <span key={tag} className="px-2 py-1 rounded-lg bg-gray-100 text-xs">{tag}</span>
            ))}
          </div>
        </section>
      </div>
    </aside>
  )
}
