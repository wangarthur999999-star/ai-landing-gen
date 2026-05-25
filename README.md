# AI Landing Page Generator

AI-powered landing page generator — describe your product, pick a style, get a complete HTML landing page with copywriting + design in under 30 seconds.

**Live demo**: [serveo tunnel](https://e70f4e7823649fca-186-179-163-60.serveousercontent.com) (click "Continue to Site" on the warning page)

## Styles

| Style | Best for |
|-------|----------|
| **Swiss** | SaaS, enterprise — clean grids, Inter, red accent |
| **Dark Luxury** | Premium agencies — black/gold, Playfair Display |
| **Neo-brutalism** | Creative tools, startups — hard shadows, loud colors |
| **Glassmorphism** | AI products, modern apps — frosted glass, gradients |
| **Editorial** | Content, education — serif hero, minimal |

## How it works

1. Enter a product description
2. Pick a design style
3. AI generates a complete landing page (SSE streaming)
4. Refine with natural language feedback
5. Deploy to Render with one click

## Stack

React 19 · Vite · Tailwind CSS v4 · Express 5 · TypeScript · DeepSeek API

## Quick start

```bash
# Terminal 1 — Server
cd server && npm install && npm run dev

# Terminal 2 — Client
cd client && npm install && npm run dev
```

Open http://localhost:5173

## Deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://dashboard.render.com/select-repo?type=blueprint)

Or connect your repo on [Render Dashboard](https://dashboard.render.com) → Blueprint → select this repo.

Requires `DEEPSEEK_API_KEY` environment variable.

## Project structure

```
server/
  src/
    index.ts          Express 5 server
    routes/api.ts     API routes (generate, refine, preview, deploy)
    services/         DeepSeek AI, sanitization, render deploy
    store.ts          In-memory index + disk storage
  templates/          Pre-crafted HTML/CSS skeletons (5 styles)
  generated/          Output pages
client/
  src/
    components/       React components
    hooks/            Custom hooks
    App.tsx           Main app
```

## Tests

```bash
cd server && npm test   # 16 tests
cd client && npm test   # 6 tests
```
