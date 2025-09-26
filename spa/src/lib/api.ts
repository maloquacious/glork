/**
 * Minimal service layer for Go backend (net/http) + SQLite.
 * Configure API_BASE via environment or window.__API_BASE__.
 * Routes (expected backend):
 *  - GET    /api/projects
 *  - POST   /api/projects
 *  - GET    /api/projects/:id
 *  - PATCH  /api/projects/:id
 *  - GET    /api/projects/:id/scenes
 *  - POST   /api/projects/:id/scenes
 *  - etc.
 */
const API_BASE = (window as any).__API_BASE__ || import.meta.env.VITE_API_BASE || ''

export type Project = {
  id: string
  name: string
  updated_at: string
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem('jwt') || ''
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    credentials: 'include'
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API ${res.status}: ${text}`)
  }
  return res.json() as Promise<T>
}

export const ProjectsAPI = {
  list: () => api<Project[]>('/api/projects'),
  get: (id: string) => api<Project>(`/api/projects/${id}`),
  create: (name: string) => api<Project>('/api/projects', { method: 'POST', body: JSON.stringify({ name }) }),
}
