export default function Outline() {
  return (
    <div className="p-4">
      <section className="rounded-2xl border p-4 bg-white shadow-sm">
        <div className="text-sm font-semibold mb-2">Outline (hierarchical)</div>
        <ul className="space-y-2">
          {["Act I","Act II","Act III"].map(act => (
            <li key={act} className="border rounded-xl p-3">
              <div className="font-medium">{act}</div>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                <li>• Opening image / MC in ordinary world</li>
                <li>• Inciting incident disrupts status quo</li>
                <li>• First plot point / no turning back</li>
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
