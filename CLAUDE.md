# AI Landing Page Generator

AI-powered landing page generator — user inputs product description, selects a style, AI generates complete HTML landing page with copywriting + design. Built with gstack toolchain to demonstrate "1 person + AI toolchain = 10x delivery speed."

## Stack
- **Frontend**: React 19 + Vite + Tailwind CSS v4 + TypeScript
- **Backend**: Express 5 + TypeScript
- **AI**: DeepSeek API (deepseek-chat)
- **Deploy**: Render (stub)

## Architecture
```
Browser (React SPA @ :5173)
  → POST /api/generate { description, style } (SSE stream)
  → GET  /api/styles
  → GET  /api/preview/:id
  → POST /api/refine/:id { feedback }
  → POST /api/deploy/:id
  → Vite proxy /api → localhost:3001
Express Server (@ :3001)
  → server/src/routes/api.ts — route handlers
  → server/src/services/deepseek.ts — AI generation (fills SLOTs in templates)
  → server/src/services/sanitize.ts — cheerio validation + XSS stripping
  → server/src/services/render.ts — Render deploy (stub)
  → server/src/store.ts — in-memory index + disk (server/generated/)
  → server/templates/ — 5 pre-crafted HTML/CSS skeletons
```

## Templates (5 styles)
1. **Swiss** — Asymmetric grid, Inter, red-black-white, SaaS/enterprise
2. **Dark Luxury** — #0a0a0a, amber/gold, Playfair Display, premium agencies
3. **Neo-brutalism** — Hard shadows (6px solid), loud yellow/pink/cyan, creative tools
4. **Glassmorphism** — Frosted glass, mesh gradients, rounded, AI/modern products
5. **Editorial** — Source Serif hero, generous spacing, minimal, content/education

Each template uses `<!-- SLOT: name -->` comments that DeepSeek fills with copy based on the user's product description.

## Key design decisions
- **No database** — Disk storage at `server/generated/`, index rebuilt on startup
- **iframe sandbox=""** — Generated pages have zero JS, empty sandbox blocks all
- **SSE streaming** — Tokens streamed from DeepSeek to frontend during generation
- **3-layer defense**: Structured templates → cheerio validation (retry 2x) → error to client
- **No global state** — useState + useReducer sufficient for single-page tool
- **Pre-crafted CSS** — AI fills content into locked-down design systems, not free-form

## Running
```bash
# Terminal 1 — Server
cd server && npm run dev

# Terminal 2 — Client
cd client && npm run dev
```
Open http://localhost:5173

## Testing
```bash
cd server && npm test    # 16 tests (Vitest + supertest)
cd client && npm test    # 6 tests (Vitest + React Testing Library)
```
