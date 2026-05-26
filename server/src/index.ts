import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { apiRouter } from './routes/api.js'
import { rebuildIndex } from './store.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api', rateLimit({
  windowMs: 60_000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
}), apiRouter)

// Serve demo pages
const generatedDir = join(import.meta.dirname, '..', 'generated')
app.get('/demo/:name', (req, res) => {
  const name = String(req.params.name).replace(/[^a-z0-9-]/gi, '')
  const demoPath = join(generatedDir, `demo-${name}.html`)
  if (existsSync(demoPath)) {
    res.type('html').send(readFileSync(demoPath, 'utf-8'))
    return
  }
  res.status(404).json({ error: 'Demo not found' })
})

// Serve built frontend in production
const clientDist = join(import.meta.dirname, '..', '..', 'client', 'dist')
if (existsSync(clientDist)) {
  const indexHtml = readFileSync(join(clientDist, 'index.html'), 'utf-8')
  // Serve static assets with SPA fallback
  app.get('/{*splat}', (req, res) => {
    const filePath = join(clientDist, req.path === '/' ? 'index.html' : req.path)
    if (existsSync(filePath)) {
      res.sendFile(filePath)
      return
    }
    res.type('html').send(indexHtml)
  })
  console.log('Serving frontend from', clientDist)
}

await rebuildIndex()

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

export default app
