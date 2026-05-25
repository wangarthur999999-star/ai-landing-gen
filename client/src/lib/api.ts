export interface PageEntry {
  id: string
  description: string
  style: string
  createdAt: string
}

export interface DeployResult {
  jobId: string
  status: 'pending' | 'building' | 'live' | 'failed'
  url: string
}

export async function fetchStyles(): Promise<string[]> {
  const res = await fetch('/api/styles')
  if (!res.ok) throw new Error('Failed to fetch styles')
  const data = await res.json() as { styles: string[] }
  return data.styles
}

export async function fetchPages(): Promise<PageEntry[]> {
  const res = await fetch('/api/pages')
  if (!res.ok) throw new Error('Failed to fetch pages')
  const data = await res.json() as { pages: PageEntry[] }
  return data.pages
}

export function generatePage(
  description: string,
  style: string,
  onToken: (token: string) => void,
  onDone: (id: string) => void,
  onError: (err: string) => void,
): AbortController {
  const controller = new AbortController()

  fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description, style }),
    signal: controller.signal,
  })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.json() as { error: string }
        onError(err.error)
        return
      }
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '))

        for (const line of lines) {
          try {
            const data = JSON.parse(line.slice(6))
            if (data.token) onToken(data.token)
            if (data.error) onError(data.error)
            if (data.done) onDone(data.id)
          } catch { /* skip */ }
        }
      }
    })
    .catch(err => {
      if (err.name !== 'AbortError') onError(err.message)
    })

  return controller
}

export function refinePage(
  id: string,
  feedback: string,
  onToken: (token: string) => void,
  onDone: () => void,
  onError: (err: string) => void,
): AbortController {
  const controller = new AbortController()

  fetch(`/api/refine/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ feedback }),
    signal: controller.signal,
  })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.json() as { error: string }
        onError(err.error)
        return
      }
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '))

        for (const line of lines) {
          try {
            const data = JSON.parse(line.slice(6))
            if (data.token) onToken(data.token)
            if (data.error) onError(data.error)
            if (data.done) onDone()
          } catch { /* skip */ }
        }
      }
    })
    .catch(err => {
      if (err.name !== 'AbortError') onError(err.message)
    })

  return controller
}

export async function deployPage(id: string): Promise<DeployResult> {
  const res = await fetch(`/api/deploy/${id}`, { method: 'POST' })
  if (!res.ok) {
    const err = await res.json() as { error: string }
    throw new Error(err.error)
  }
  return res.json() as Promise<DeployResult>
}
