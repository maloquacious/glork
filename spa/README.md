# Glork SPA (React + Vite + Tailwind)

Browser-based Snowflake Method planner for writers. This is a scaffold intended to talk to a Go backend (SQLite).

## Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Lightweight service layer in `src/lib/api.ts`

## Commands
```sh
# install deps
npm i

# dev server
npm run dev

# production build
npm run build
```

## Configuration
Set the API base URL at runtime (optional):
```html
<script>
  window.__API_BASE__ = ""; // e.g. "https://glork.example.com"
</script>
```
Or via Vite env: `VITE_API_BASE=/`

## Nginx (static + proxy)
Serve SPA and proxy backend routes:
```
server {
  listen 80;
  server_name glork.example.com;

  root /var/www/glork-spa/dist;
  index index.html;

  location /api/ {
    proxy_pass http://127.0.0.1:8181; # Go backend
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location / {
    try_files $uri /index.html;
  }
}
```

## Notes
- All UI text/controls are placeholders. Wireframe is ready for your data.
- JWT (if any) should be stored in `localStorage` (see `src/lib/api.ts`). Replace with cookies if preferred.
