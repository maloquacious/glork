export default function Scenes() {
  return (
    <div className="p-4">
      <section className="rounded-2xl border p-4 bg-white shadow-sm">
        <div className="text-sm font-semibold mb-2">Planner</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                {["#","POV","When","Where","Purpose","Conflict","Outcome"].map(h => (
                  <th key={h} className="py-2 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({length:8}).map((_,i)=>(
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2 pr-4">{i+1}</td>
                  <td className="py-2 pr-4"><input className="border rounded-lg px-2 py-1 w-24" placeholder="Mara" /></td>
                  <td className="py-2 pr-4"><input className="border rounded-lg px-2 py-1 w-28" placeholder="Night" /></td>
                  <td className="py-2 pr-4"><input className="border rounded-lg px-2 py-1 w-32" placeholder="Old docks" /></td>
                  <td className="py-2 pr-4"><input className="border rounded-lg px-2 py-1 w-56" placeholder="Reveal clue" /></td>
                  <td className="py-2 pr-4"><input className="border rounded-lg px-2 py-1 w-56" placeholder="Thwarted by rival" /></td>
                  <td className="py-2 pr-4"><input className="border rounded-lg px-2 py-1 w-56" placeholder="New lead" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="px-3 py-1.5 rounded-xl border hover:bg-gray-50">+ Row</button>
          <button className="px-3 py-1.5 rounded-xl border hover:bg-gray-50">Import CSV</button>
          <button className="px-3 py-1.5 rounded-xl border hover:bg-gray-50">Export CSV</button>
        </div>
      </section>
    </div>
  )
}
