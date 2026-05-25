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

const SYSTEM_PROMPT = `You are a landing page copywriter and HTML developer.
You will receive a complete HTML template with <!-- SLOT: ... --> placeholder comments.
Replace each SLOT comment with the appropriate content based on the user's product description.

RULES:
1. Replace EVERY <!-- SLOT: name --> comment with real content. Remove the comment itself.
2. Keep ALL existing HTML structure, CSS, classes — only fill content slots.
3. Write compelling, benefit-driven copy. Use the product description to inform content.
4. Output the COMPLETE modified HTML file. Do not truncate. Do not use markdown fences.
5. Do NOT add any JavaScript, <script> tags, or event handlers.
6. Make content realistic — use real-sounding company names, believable testimonials, specific feature descriptions.
7. Match the tone: Swiss=professional/direct, DarkLuxury=premium/exclusive, NeoBrutalism=bold/playful, Glassmorphism=modern/tech, Editorial=thoughtful/authoritative.

Output ONLY the complete HTML. No explanation.`

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
