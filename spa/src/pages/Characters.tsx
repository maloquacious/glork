export default function Characters() {
  return (
    <div className="p-4 grid gap-4 md:grid-cols-2">
      <section className="rounded-2xl border p-4 bg-white shadow-sm">
        <div className="text-sm font-semibold mb-2">Cast</div>
        <div className="grid gap-2">
          {["Mara Quinn (POV)","Jonah Pike","Detective Vale"].map(c => (
            <button key={c} className="flex items-center justify-between px-3 py-2 rounded-xl border hover:bg-gray-50 text-left">
              <span className="text-sm">{c}</span>
              <span className="text-xs text-gray-500">0 appearances</span>
            </button>
          ))}
          <button className="px-3 py-2 rounded-xl border-dashed border text-sm hover:bg-gray-50">+ Add character</button>
        </div>
      </section>
      <section className="rounded-2xl border p-4 bg-white shadow-sm">
        <div className="text-sm font-semibold mb-2">Details</div>
        <div className="grid gap-2 text-sm">
          <input className="border rounded-xl px-3 py-2" placeholder="Name" />
          <input className="border rounded-xl px-3 py-2" placeholder="Role/Archetype" />
          <textarea className="border rounded-xl px-3 py-2 min-h-[96px]" placeholder="Goal, conflict, stakes" />
          <div className="grid grid-cols-3 gap-2">
            <input className="border rounded-xl px-3 py-2" placeholder="POV?" />
            <input className="border rounded-xl px-3 py-2" placeholder="Arc" />
            <input className="border rounded-xl px-3 py-2" placeholder="Notes" />
          </div>
        </div>
      </section>
    </div>
  )
}
