import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || ''
const TEMPLATES_DIR = join(import.meta.dirname, '..', '..', 'templates')

const STYLES: Record<string, string> = {
  swiss: 'swiss.html',
  'dark-luxury': 'dark-luxury.html',
  'neo-brutalism': 'neo-brutalism.html',
  glassmorphism: 'glassmorphism.html',
  editorial: 'editorial.html',
}

const SYSTEM_PROMPT = `You are a landing page copywriter. You fill content into HTML templates.

RULES — follow exactly:
1. Find EVERY <!-- SLOT: name --> comment. Replace it with real copy. Delete the comment.
2. Do NOT modify ANYTHING outside SLOT comments — no CSS changes, no tag changes, no attribute changes. Copy the template verbatim except for SLOT replacements.
3. Write benefit-driven copy specific to the product description. No lorem ipsum. No placeholder text.
4. Use real-sounding company names and credible testimonials with full names and roles.
5. Output the COMPLETE HTML. No markdown fences. No truncation. No explanation text.
6. No <script> tags, no JavaScript, no event handlers, no external resources (except Google Fonts already in template).
7. Tone per style: Swiss=concise/professional, DarkLuxury=premium/exclusive, NeoBrutalism=bold/playful, Glassmorphism=modern/sleek, Editorial=thoughtful/authoritative.

OUTPUT: Only the full HTML file. Nothing else.`

export function getAvailableStyles(): string[] {
  return Object.keys(STYLES)
}

export async function generateHtml(
  description: string,
  style: string,
  onToken?: (token: string) => void,
): Promise<string> {
  const templateFile = STYLES[style]
  if (!templateFile) throw new Error(`Unknown style: ${style}`)

  const templatePath = join(TEMPLATES_DIR, templateFile)
  const template = await readFile(templatePath, 'utf-8')

  const userPrompt = `PRODUCT DESCRIPTION: ${description}

TEMPLATE:
${template}`

  if (!DEEPSEEK_API_KEY) {
    throw new Error('DEEPSEEK_API_KEY not configured')
  }

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 8000,
      temperature: 0.7,
      stream: !!onToken,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`DeepSeek API error ${response.status}: ${err.slice(0, 200)}`)
  }

  if (!onToken) {
    const data = await response.json() as { choices: [{ message: { content: string } }] }
    return data.choices[0].message.content
  }

  // Streaming mode
  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  let fullContent = ''

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
        const token = parsed.choices?.[0]?.delta?.content
        if (token) {
          fullContent += token
          onToken(token)
        }
      } catch {
        // skip parse errors
      }
    }
  }

  return fullContent
}
