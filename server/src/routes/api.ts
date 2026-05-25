import { Router, type Request, type Response } from 'express'
import rateLimit from 'express-rate-limit'
import { generateHtml, getAvailableStyles } from '../services/deepseek.js'
import { validateHtml, stripDangerousContent, injectMetaComment } from '../services/sanitize.js'
import { deployToRender } from '../services/render.js'
import { savePage, getPageHtml, getPageMeta, listPages } from '../store.js'

export const apiRouter = Router()

const generateLimiter = rateLimit({
  windowMs: 60_000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Max 5 generates per minute.' },
})

// GET /api/styles
apiRouter.get('/styles', (_req: Request, res: Response) => {
  res.json({ styles: getAvailableStyles() })
})

// GET /api/pages
apiRouter.get('/pages', (_req: Request, res: Response) => {
  res.json({ pages: listPages() })
})

// GET /api/preview/:id
apiRouter.get('/preview/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id)
  const html = await getPageHtml(id)
  if (!html) {
    res.status(404).json({ error: 'Page not found' })
    return
  }
  res.setHeader('Content-Type', 'text/html')
  res.send(html)
})

// POST /api/generate
apiRouter.post('/generate', generateLimiter, async (req: Request, res: Response) => {
  const { description, style } = req.body as { description?: string; style?: string }

  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    res.status(400).json({ error: 'description is required' })
    return
  }

  const validStyles = getAvailableStyles()
  if (!style || !validStyles.includes(style)) {
    res.status(400).json({ error: `style must be one of: ${validStyles.join(', ')}` })
    return
  }

  const id = `lp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  try {
    // SSE streaming
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders()

    let fullHtml = ''

    const rawHtml = await generateHtml(description, style, (token: string) => {
      fullHtml += token
      res.write(`data: ${JSON.stringify({ token })}\n\n`)
    })

    // Validate
    const validation = validateHtml(rawHtml)
    let attempts = 0
    let html = rawHtml

    while (!validation.valid && attempts < 2) {
      attempts++
      res.write(`data: ${JSON.stringify({ status: 'retrying', attempt: attempts })}\n\n`)

      const retryResult = await generateHtml(description, style)
      const retryValidation = validateHtml(retryResult)
      if (retryValidation.valid) {
        html = retryResult
        break
      }
    }

    if (!validateHtml(html).valid) {
      res.write(`data: ${JSON.stringify({ error: 'Generated HTML failed validation after retries' })}\n\n`)
      res.end()
      return
    }

    // Sanitize
    html = stripDangerousContent(html)
    html = injectMetaComment(html, {
      id,
      description: description.slice(0, 200),
      style,
      createdAt: new Date().toISOString(),
    })

    // Save
    savePage(id, html, {
      id,
      description: description.slice(0, 200),
      style,
      createdAt: new Date().toISOString(),
    })

    res.write(`data: ${JSON.stringify({ done: true, id })}\n\n`)
    res.end()
  } catch (err) {
    console.error('Generate error:', err)
    res.write(`data: ${JSON.stringify({ error: err instanceof Error ? err.message : 'Generation failed' })}\n\n`)
    res.end()
  }
})

// POST /api/refine/:id
apiRouter.post('/refine/:id', generateLimiter, async (req: Request, res: Response) => {
  const id = String(req.params.id)
  const { feedback } = req.body as { feedback?: string }

  const meta = getPageMeta(id)
  if (!meta) {
    res.status(404).json({ error: 'Page not found' })
    return
  }

  if (!feedback || typeof feedback !== 'string' || feedback.trim().length === 0) {
    res.status(400).json({ error: 'feedback is required' })
    return
  }

  try {
    const currentHtml = await getPageHtml(id)
    if (!currentHtml) {
      res.status(404).json({ error: 'Page HTML not found' })
      return
    }

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders()

    const refinePrompt = `You are editing a landing page based on user feedback.
USER FEEDBACK: ${feedback}

CURRENT HTML:
${currentHtml}

Apply the user's feedback to the HTML. Keep all existing structure, only change what's needed.
Do NOT add any <script> tags, JavaScript, event handlers, or external resources.
Output the COMPLETE modified HTML. No markdown fences, no explanation.`

    const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY || ''
    if (!DEEPSEEK_KEY) throw new Error('DEEPSEEK_API_KEY not configured')

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEEPSEEK_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: refinePrompt }],
        max_tokens: 8000,
        temperature: 0.5,
        stream: true,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      throw new Error(`DeepSeek API error ${response.status}: ${errText.slice(0, 200)}`)
    }

    const reader = response.body!.getReader()
    const decoder = new TextDecoder()
    let fullHtml = ''
    const SCRIPT_RE = /<\s*script/gi

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n').filter(l => l.startsWith('data: '))

      for (const line of lines) {
        const data = line.slice(6)
        if (data === '[DONE]') continue
        try {
          const parsed = JSON.parse(data)
          const token: string = parsed.choices?.[0]?.delta?.content
          if (token) {
            // Filter script tags from tokens before streaming
            const safe = token.replace(SCRIPT_RE, '<!--')
            fullHtml += token
            res.write(`data: ${JSON.stringify({ token: safe })}\n\n`)
          }
        } catch { /* skip */ }
      }
    }

    // Validate and retry
    let html = fullHtml
    let attempts = 0
    while (!validateHtml(html).valid && attempts < 2) {
      attempts++
      res.write(`data: ${JSON.stringify({ status: 'retrying', attempt: attempts })}\n\n`)
      const retryResult = await generateHtml(
        `${meta.description}\n\nRefinement request: ${feedback}`,
        meta.style,
      )
      if (validateHtml(retryResult).valid) {
        html = retryResult
        break
      }
    }

    if (!validateHtml(html).valid) {
      res.write(`data: ${JSON.stringify({ error: 'Refined HTML failed validation after retries' })}\n\n`)
      res.end()
      return
    }

    const sanitized = stripDangerousContent(html)
    const finalHtml = injectMetaComment(sanitized, { ...meta, refinedAt: new Date().toISOString() })
    savePage(id, finalHtml, { ...meta, refinedAt: new Date().toISOString() } as any)

    res.write(`data: ${JSON.stringify({ done: true, id })}\n\n`)
    res.end()
  } catch (err) {
    console.error('Refine error:', err)
    res.write(`data: ${JSON.stringify({ error: err instanceof Error ? err.message : 'Refinement failed' })}\n\n`)
    res.end()
  }
})

// POST /api/deploy/:id
apiRouter.post('/deploy/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id)
  const html = await getPageHtml(id)
  if (!html) {
    res.status(404).json({ error: 'Page not found' })
    return
  }

  try {
    const result = await deployToRender(html, id)
    res.status(result.status === 'failed' ? 502 : 202).json(result)
  } catch (err) {
    res.status(502).json({ error: 'Deploy failed' })
  }
})
