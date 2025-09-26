# Glork

Here’s a practical blueprint for an **open-source, browser-based Snowflake Pro clone** with a lightweight Go + SQLite backend and a React (Vite) SPA frontend. This is tailored to your usual stack and constraints (no Node on server, no SSR, Nginx in front, JWT auth, SQLite via `modernc.org/sqlite`).

## High-level goals

* Guide writers through the **10 Snowflake steps** with guardrails, examples, and progress tracking.
* Keep everything **project-centric** (multiple novels, each with versions).
* Provide **scene cards**, **characters/places** databases, and **exports** (Markdown/OPML/CSV/Fountain; Scrivener-friendly OPML/RTF).
* Be fast, offline-capable, and easy to self-host.

## Architecture

* **Frontend:** React + Vite + Tailwind (SPA). Optional PWA for offline editing; background sync when online.
* **Backend:** Go 1.22+, `net/http`, `chi` or stdlib mux; JSON REST API.
* **Storage:** SQLite (file per instance). Use `modernc.org/sqlite`. Migrations via `golang-migrate` or a tiny in-app migration runner.
* **Auth:** Magic-link or local email+pass → short-lived JWT access + refresh token (HTTP-only cookie). Single-user mode toggle for “solo desktop server.”
* **Deploy:** Nginx serves static SPA, proxies `/api/*` to Go. One binary, no SSR.

## Core data model (SQLite)

```sql
-- projects
CREATE TABLE projects (
  id            TEXT PRIMARY KEY,        -- uuid
  owner_id      TEXT NOT NULL,
  title         TEXT NOT NULL,
  logline       TEXT DEFAULT '',         -- Snowflake step 1
  created_at    DATETIME NOT NULL,
  updated_at    DATETIME NOT NULL,
  is_archived   INTEGER NOT NULL DEFAULT 0
);

-- snowflake steps (generic container for steps 1..10)
CREATE TABLE steps (
  id            TEXT PRIMARY KEY,
  project_id    TEXT NOT NULL,
  step_no       INTEGER NOT NULL,        -- 1..10
  content_md    TEXT NOT NULL,           -- markdown (with front-matter for metadata)
  word_count    INTEGER NOT NULL DEFAULT 0,
  updated_at    DATETIME NOT NULL,
  UNIQUE(project_id, step_no),
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- characters / places (simple “story bible”)
CREATE TABLE characters (
  id            TEXT PRIMARY KEY,
  project_id    TEXT NOT NULL,
  name          TEXT NOT NULL,
  role          TEXT DEFAULT '',
  summary_md    TEXT NOT NULL,           -- includes motivation/goal/conflict/epiphany
  tags          TEXT DEFAULT '',         -- comma-separated
  updated_at    DATETIME NOT NULL,
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE places (
  id            TEXT PRIMARY KEY,
  project_id    TEXT NOT NULL,
  name          TEXT NOT NULL,
  summary_md    TEXT NOT NULL,
  tags          TEXT DEFAULT '',
  updated_at    DATETIME NOT NULL,
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- scenes & plotlines
CREATE TABLE plotlines (
  id            TEXT PRIMARY KEY,
  project_id    TEXT NOT NULL,
  name          TEXT NOT NULL,
  color         TEXT DEFAULT '#888888',
  sort_index    INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE scenes (
  id            TEXT PRIMARY KEY,
  project_id    TEXT NOT NULL,
  title         TEXT NOT NULL,
  summary_md    TEXT NOT NULL,           -- goal/conflict/outcome
  pov_character TEXT DEFAULT NULL,       -- ref to characters.id (nullable)
  status        TEXT NOT NULL DEFAULT 'planned', -- planned/drafting/done
  word_target   INTEGER DEFAULT 0,
  sort_index    INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- scene ↔ plotline (many-to-many)
CREATE TABLE scene_plotlines (
  scene_id      TEXT NOT NULL,
  plotline_id   TEXT NOT NULL,
  PRIMARY KEY(scene_id, plotline_id),
  FOREIGN KEY(scene_id) REFERENCES scenes(id) ON DELETE CASCADE,
  FOREIGN KEY(plotline_id) REFERENCES plotlines(id) ON DELETE CASCADE
);

-- attachments (optional: images, references)
CREATE TABLE attachments (
  id            TEXT PRIMARY KEY,
  project_id    TEXT NOT NULL,
  owner_kind    TEXT NOT NULL,       -- 'character'|'place'|'scene'|'step'
  owner_id      TEXT NOT NULL,
  filename      TEXT NOT NULL,
  media_type    TEXT NOT NULL,
  size_bytes    INTEGER NOT NULL,
  created_at    DATETIME NOT NULL
);
```

## API sketch (REST, JSON)

```
POST   /api/auth/login-magic           -> {email}  (dev/demo: /api/auth/dev-token)
POST   /api/auth/refresh
POST   /api/auth/logout

GET    /api/projects                   -> list
POST   /api/projects                   -> create
GET    /api/projects/{id}
PATCH  /api/projects/{id}
DELETE /api/projects/{id}

GET    /api/projects/{id}/steps
PUT    /api/projects/{id}/steps/{n}    -> upsert step n (1..10)

GET    /api/projects/{id}/characters
POST   /api/projects/{id}/characters
PATCH  /api/characters/{charId}
DELETE /api/characters/{charId}

GET    /api/projects/{id}/places
POST   /api/projects/{id}/places
PATCH  /api/places/{placeId}
DELETE /api/places/{placeId}

GET    /api/projects/{id}/plotlines
POST   /api/projects/{id}/plotlines
PATCH  /api/plotlines/{plotlineId}
DELETE /api/plotlines/{plotlineId}

GET    /api/projects/{id}/scenes
POST   /api/projects/{id}/scenes
PATCH  /api/scenes/{sceneId}
DELETE /api/scenes/{sceneId}
POST   /api/scenes/{sceneId}/plotlines/{plotlineId}   (attach)
DELETE /api/scenes/{sceneId}/plotlines/{plotlineId}

POST   /api/projects/{id}/export       -> {format: "markdown|opml|csv|fountain|scrivenerish"}
```

## Go types (abridged)

```go
type Project struct {
  ID, OwnerID, Title, Logline string
  CreatedAt, UpdatedAt time.Time
  IsArchived bool
}
type Step struct {
  ID, ProjectID string
  StepNo int
  ContentMD string
  WordCount int
  UpdatedAt time.Time
}
type Character struct {
  ID, ProjectID, Name, Role, SummaryMD, Tags string
  UpdatedAt time.Time
}
type Scene struct {
  ID, ProjectID, Title, SummaryMD, POVCharacter, Status string
  WordTarget, SortIndex int
}
```

## Frontend (key screens)

1. **Dashboard:** projects list, progress rings (completion by step).
2. **Snowflake Wizard:** left nav with Steps 1–10; main editor with Markdown + guidance panel; progress checklist.
3. **Story Bible:** tables/cards for Characters & Places; quick filters/tags; inline editors.
4. **Outline Board:** timeline/grid of Scenes × Plotlines (drag & drop re-order; color lanes; keyboard nav).
5. **Exports:** choose format + options (include characters/places; scene metadata).
6. **Settings:** project metadata, theme, autosave interval, PWA install prompt.

## Built-in Snowflake templates (content hints)

* **Step 1 (One-sentence):** ≤15 words; protagonist + goal + conflict; no names if possible.
* **Step 2 (One-paragraph):** 5 sentences → setup, 3 disasters, ending.
* **Step 3 (Characters summaries):** Motivation, goal, conflict, epiphany, storyline (½ page each).
* **Step 4 (Expand to one page):** magnify Step 2 into 1 page.
* **Step 5 (Character sheets):** background/personality/voice/lie they believe.
* **Step 6 (Four pages plot):** deepen causal chain per act.
* **Step 7 (Character arcs, long form).**
* **Step 8 (Scene list table):** columns: #, title, goal, conflict, outcome, plotline, pov, status.
* **Step 9 (Scene synopses):** multi-paragraph per scene.
* **Step 10 (Draft):** (external; provide export + starter doc).

Ship these as JSON+Markdown seed files so users can fork/modify templates.

## Export formats (pragmatic)

* **Markdown bundle (.zip):** `/steps`, `/characters`, `/places`, `/scenes`. Human-friendly.
* **OPML:** outline of parts/chapters/scenes; compatible with Scrivener import (Binder).
* **CSV:** scenes table for spreadsheets.
* **Fountain:** for screenplay-style users or quick linear draft scaffolding.
* **“Scrivener-ish”:** OPML for structure + RTF/MD files; user imports into Scrivener and compiles there.

  * (Direct `.scrivx` generation is possible later; start with OPML + docs.)

## PWA & offline

* Cache the SPA and last-opened project with **IndexedDB** mirror; reconcile on reconnect.
* Conflict policy: “last write wins” per field, with change log per entity for manual resolution.

## Quality-of-life features

* Autosave with undo/redo across sessions.
* Cross-links: `[[Character Name]]` smart-links to cards; backlink pane.
* Global search (title, MD content, tags).
* Word count targets and per-step completion badges.
* Keyboard-first editing (quick create scene, move card up/down).
* Light/no-dark-mode option (since you prefer no dark mode).

## Security & privacy

* HTTPS only, secure cookies for refresh tokens.
* CSRF protection on state-changing endpoints if using cookies.
* Rate-limit login/magic links; optional single-user lock.
* Daily SQLite backups (rolling N copies) to a configured folder.

## Licenses & openness

* **MIT** for code.
* Templates licensed **CC BY** or **CC0** (make it explicit so people can share).

## MVP scope (what to actually build first)

1. Projects + auth (single user ok).
2. Steps 1–10 editor with guidance and progress.
3. Characters/Places minimal CRUD.
4. Scenes + Plotlines board (drag-drop).
5. Export: Markdown + OPML.
6. PWA install + offline cache for the current project.

## Later (nice-to-haves)

* Collaboration (shared projects, roles).
* Revision timelines per entity (snapshot diff).
* Importers (Snowflake Pro JSON, Plottr CSV/OPML).
* “Coaching” hints (style checklists, pacing markers).
* Grammar prompts or LLM hooks (behind a flag).

## Example: minimal endpoints in Go (outline)

```go
// main.go
func main() {
  r := chi.NewRouter()
  r.Use(middleware.Logger, cors.AllowAll().Handler)
  r.Route("/api", func(api chi.Router) {
    api.Post("/auth/dev-token", devToken) // for local use
    api.Route("/projects", func(pr chi.Router) {
      pr.Get("/", listProjects)
      pr.Post("/", createProject)
      pr.Route("/{pid}", func(p chi.Router) {
        p.Get("/", getProject)
        p.Patch("/", patchProject)
        p.Delete("/", deleteProject)
        p.Get("/steps", listSteps)
        p.Put("/steps/{n}", upsertStep)
        p.Mount("/characters", charactersRoutes())
        p.Mount("/places", placesRoutes())
        p.Mount("/scenes", scenesRoutes())
        p.Mount("/plotlines", plotlinesRoutes())
        p.Post("/export", exportProject)
      })
    })
  })
  http.ListenAndServe(":8181", r)
}
```

## Scrivener workflow

* Export OPML (+ Markdown scene synopses). In Scrivener: **File → Import → OPML/Notes**.
* Binder structure is preserved; scene notes land in the Inspector.
* If you later edit plan in the app, export a new bundle and import into a **new** Scrivener project (keeps things clean and reproducible).

