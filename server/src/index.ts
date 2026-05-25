import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
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

await rebuildIndex()

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

export default app
