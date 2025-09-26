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

export default function Snowflake() {
  return (
    <div className="p-4 grid gap-4 md:grid-cols-2">
      {steps.map((s,i)=>(
        <section key={s} className="rounded-2xl border p-4 bg-white shadow-sm">
          <div className="text-sm font-semibold mb-2">{i+1}. {s}</div>
          <textarea className="border rounded-xl px-3 py-2 text-sm min-h-[120px] w-full" placeholder="Write here..." />
          <div className="mt-2 flex items-center gap-2">
            <input type="checkbox" />
            <span className="text-xs text-gray-600">Mark step complete</span>
          </div>
        </section>
      ))}
    </div>
  )
}
