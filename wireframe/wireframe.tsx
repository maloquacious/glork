import { useState } from "react";

// GLORK: Snowflake Method wireframe
// - Tailwind classes only (no external CSS)
// - Single-file previewable component
// - Replace placeholders with real data & API calls later
// Steps per Randy Ingermanson's Snowflake Method
const SNOWFLAKE_STEPS = [
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
];

const demoProjects = [
  { id: "p1", name: "Red Harbor", updated: "2025-09-18" },
  { id: "p2", name: "Clockwork Orchard", updated: "2025-09-20" },
  { id: "p3", name: "Glass Saints", updated: "2025-09-24" },
];

const demoNotes: Record<string, string> = {
  overview:
    "Start here. Capture your elevator pitch, genre, target audience, and comps.",
  outline:
    "Hierarchical outline. Drag to reorder. Promote/demote to change depth.",
  characters:
    "Cast list with goals, conflicts, stakes. Track POV and appearance counts.",
  scenes:
    "Beat-by-beat planner. Each scene has purpose, conflict, outcome, and hooks.",
};

function TopBar({
  title,
  onNew,
  onImport,
  onExport,
}: {
  title: string;
  onNew: () => void;
  onImport: () => void;
  onExport: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-white/60 backdrop-blur sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-black/90 text-white grid place-items-center font-bold">G</div>
        <div>
          <div className="text-sm uppercase tracking-widest text-gray-500">glork</div>
          <div className="text-lg font-semibold">{title}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 rounded-xl border hover:bg-gray-50" onClick={onNew}>New</button>
        <button className="px-3 py-1.5 rounded-xl border hover:bg-gray-50" onClick={onImport}>Import</button>
        <button className="px-3 py-1.5 rounded-xl border hover:bg-gray-50" onClick={onExport}>Export</button>
        <div className="ml-2 text-xs text-gray-500">Saved • SQLite</div>
      </div>
    </div>
  );
}

function Sidebar({
  projects,
  selectedId,
  onSelect,
}: {
  projects: { id: string; name: string; updated: string }[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className="w-72 border-r h-full overflow-y-auto bg-white/50 backdrop-blur">
      <div className="px-4 py-3 border-b sticky top-0 bg-white/80 backdrop-blur z-10">
        <div className="text-sm font-semibold tracking-wide">Projects</div>
        <div className="text-xs text-gray-500">Your stories & drafts</div>
      </div>
      <ul className="p-2">
        {projects.map((p) => (
          <li key={p.id}>
            <button
              onClick={() => onSelect(p.id)}
              className={`w-full text-left px-3 py-2 rounded-xl hover:bg-gray-100 ${
                selectedId === p.id ? "bg-gray-100" : ""
              }`}
            >
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-gray-500">Updated {p.updated}</div>
            </button>
          </li>
        ))}
      </ul>
      <div className="px-4 py-3 border-t text-xs text-gray-500">
        Tip: Use the Snowflake steps below as a checklist.
      </div>
      <div className="px-4 pb-4">
        <ol className="space-y-1 mt-2">
          {SNOWFLAKE_STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-2 text-sm">
              <span className="w-6 h-6 rounded-lg border grid place-items-center text-xs">{i + 1}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}

function RightPanel() {
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
            {["Mystery", "Thriller", "Fantasy", "Sci-Fi"].map((g) => (
              <button key={g} className="px-2 py-1 rounded-lg border text-xs hover:bg-gray-50">
                {g}
              </button>
            ))}
          </div>
        </section>
        <section className="space-y-1">
          <div className="text-xs uppercase tracking-wide text-gray-500">Target length</div>
          <div className="flex gap-2">
            {["Short", "Novella", "Novel"].map((g) => (
              <button key={g} className="px-2 py-1 rounded-lg border text-xs hover:bg-gray-50">
                {g}
              </button>
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
            {["POV:A", "POV:B", "Draft", "Needs arc"].map((tag) => (
              <span key={tag} className="px-2 py-1 rounded-lg bg-gray-100 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}

function TabBar({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div className="flex gap-1 border-b px-4 bg-white/60 backdrop-blur sticky top-12 z-10">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-4 py-2 text-sm rounded-t-xl border-x border-t -mb-px ${
            active === t ? "bg-white" : "bg-gray-50 text-gray-600"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="grid place-items-center h-full text-center p-12">
      <div className="max-w-md space-y-3">
        <div className="text-2xl font-semibold">{title}</div>
        <p className="text-gray-600">{hint}</p>
        <div className="text-xs text-gray-400">This is a wireframe placeholder.</div>
      </div>
    </div>
  );
}

function PanelCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border p-4 bg-white shadow-sm">
      <div className="text-sm font-semibold mb-2">{title}</div>
      {children}
    </section>
  );
}

export default function GlorkWireframe() {
  const [projects, setProjects] = useState(demoProjects);
  const [selectedId, setSelectedId] = useState<string | null>(projects[0]?.id ?? null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [showNewModal, setShowNewModal] = useState(false);

  const selected = projects.find((p) => p.id === selectedId) ?? null;

  const tabs = ["Overview", "Outline", "Characters", "Scenes", "Snowflake"];

  const createProject = (name: string) => {
    const id = `p${projects.length + 1}`;
    setProjects([{ id, name, updated: new Date().toISOString().slice(0, 10) }, ...projects]);
    setSelectedId(id);
  };

  return (
    <div className="h-screen w-full grid grid-rows-[auto_1fr] bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <TopBar
        title={selected ? selected.name : "No project selected"}
        onNew={() => setShowNewModal(true)}
        onImport={() => alert("Import placeholder")}
        onExport={() => alert("Export placeholder")}
      />

      <div className="grid grid-cols-[18rem_1fr_20rem] h-[calc(100vh-56px)]">
        <Sidebar projects={projects} selectedId={selectedId} onSelect={setSelectedId} />

        {/* Main content */}
        <main className="overflow-y-auto">
          <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />

          {/* Tab content */}
          <div className="p-4 grid gap-4 auto-rows-min">
            {activeTab === "Overview" && (
              <div className="grid gap-4 md:grid-cols-2">
                <PanelCard title="Project Brief">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {demoNotes.overview}
                  </p>
                  <div className="mt-3 grid gap-2">
                    <input className="border rounded-xl px-3 py-2 text-sm" placeholder="One-sentence summary" />
                    <textarea className="border rounded-xl px-3 py-2 text-sm min-h-[96px]" placeholder="One-paragraph synopsis" />
                  </div>
                </PanelCard>
                <PanelCard title="Comps & Audience">
                  <div className="grid gap-2">
                    <input className="border rounded-xl px-3 py-2 text-sm" placeholder="Comparable titles" />
                    <input className="border rounded-xl px-3 py-2 text-sm" placeholder="Target audience" />
                    <div className="text-xs text-gray-500">Use tags like YA, Adult, Cozy Mystery, etc.</div>
                  </div>
                </PanelCard>
                <PanelCard title="Progress by Snowflake step">
                  <ol className="grid gap-2">
                    {SNOWFLAKE_STEPS.map((s, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4" />
                        <div className="text-sm">{i + 1}. {s}</div>
                      </li>
                    ))}
                  </ol>
                </PanelCard>
                <PanelCard title="Recent activity">
                  <ul className="text-sm space-y-2">
                    <li>Edited scene 12 outcome</li>
                    <li>Updated Character: Mara (goal/conflict)</li>
                    <li>Generated outline from Snowflake step 4</li>
                  </ul>
                </PanelCard>
              </div>
            )}

            {activeTab === "Outline" && (
              <div className="grid gap-4">
                <PanelCard title="Outline (hierarchical)">
                  <div className="text-sm text-gray-700 mb-3">{demoNotes.outline}</div>
                  <ul className="space-y-2">
                    {["Act I", "Act II", "Act III"].map((act) => (
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
                </PanelCard>
              </div>
            )}

            {activeTab === "Characters" && (
              <div className="grid gap-4 md:grid-cols-2">
                <PanelCard title="Cast">
                  <div className="grid gap-2">
                    {["Mara Quinn (POV)", "Jonah Pike", "Detective Vale"].map((c) => (
                      <button key={c} className="flex items-center justify-between px-3 py-2 rounded-xl border hover:bg-gray-50 text-left">
                        <span className="text-sm">{c}</span>
                        <span className="text-xs text-gray-500">0 appearances</span>
                      </button>
                    ))}
                    <button className="px-3 py-2 rounded-xl border-dashed border text-sm hover:bg-gray-50">+ Add character</button>
                  </div>
                </PanelCard>
                <PanelCard title="Details">
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
                </PanelCard>
              </div>
            )}

            {activeTab === "Scenes" && (
              <div className="grid gap-4">
                <PanelCard title="Planner">
                  <div className="text-sm text-gray-700 mb-3">{demoNotes.scenes}</div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left border-b">
                          {["#", "POV", "When", "Where", "Purpose", "Conflict", "Outcome"].map((h) => (
                            <th key={h} className="py-2 pr-4">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 8 }).map((_, i) => (
                          <tr key={i} className="border-b last:border-0">
                            <td className="py-2 pr-4">{i + 1}</td>
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
                </PanelCard>
              </div>
            )}

            {activeTab === "Snowflake" && (
              <div className="grid gap-4 md:grid-cols-2">
                {SNOWFLAKE_STEPS.map((s, i) => (
                  <PanelCard key={s} title={`${i + 1}. ${s}`}>
                    <textarea className="border rounded-xl px-3 py-2 text-sm min-h-[120px] w-full" placeholder="Write here..." />
                    <div className="mt-2 flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-xs text-gray-600">Mark step complete</span>
                    </div>
                  </PanelCard>
                ))}
              </div>
            )}
          </div>

          {/* Empty state if nothing */}
          {!selected && (
            <EmptyState title="No project selected" hint="Create or select a project from the sidebar." />
          )}
        </main>

        <RightPanel />
      </div>

      {/* New Project Modal */}
      {showNewModal && (
        <Modal onClose={() => setShowNewModal(false)}>
          <NewProjectForm
            onCancel={() => setShowNewModal(false)}
            onCreate={(name) => {
              createProject(name);
              setShowNewModal(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border w-full max-w-lg p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

function NewProjectForm({ onCreate, onCancel }: { onCreate: (name: string) => void; onCancel: () => void }) {
  const [name, setName] = useState("");
  return (
    <div className="space-y-3">
      <div className="text-lg font-semibold">Create new project</div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded-xl px-3 py-2 w-full"
        placeholder="Project name"
      />
      <div className="flex justify-end gap-2">
        <button className="px-3 py-1.5 rounded-xl border" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="px-3 py-1.5 rounded-xl border bg-gray-900 text-white"
          onClick={() => name.trim() && onCreate(name.trim())}
        >
          Create
        </button>
      </div>
    </div>
  );
}

