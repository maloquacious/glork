export default function Overview() {
  return (
    <div className="p-4 grid gap-4 md:grid-cols-2">
      <section className="rounded-2xl border p-4 bg-white shadow-sm">
        <div className="text-sm font-semibold mb-2">Project Brief</div>
        <div className="grid gap-2">
          <input className="border rounded-xl px-3 py-2 text-sm" placeholder="One-sentence summary" />
          <textarea className="border rounded-xl px-3 py-2 text-sm min-h-[96px]" placeholder="One-paragraph synopsis" />
        </div>
      </section>
      <section className="rounded-2xl border p-4 bg-white shadow-sm">
        <div className="text-sm font-semibold mb-2">Comps & Audience</div>
        <div className="grid gap-2">
          <input className="border rounded-xl px-3 py-2 text-sm" placeholder="Comparable titles" />
          <input className="border rounded-xl px-3 py-2 text-sm" placeholder="Target audience" />
          <div className="text-xs text-gray-500">Use tags like YA, Adult, Cozy Mystery, etc.</div>
        </div>
      </section>
      <section className="rounded-2xl border p-4 bg-white shadow-sm md:col-span-2">
        <div className="text-sm font-semibold mb-2">Progress by Snowflake step</div>
        <ol className="grid gap-2">
          {Array.from({length:10}).map((_,i)=>(
            <li key={i} className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4" />
              <div className="text-sm">{i+1}. Step {i+1}</div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
