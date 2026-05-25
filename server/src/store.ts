import { readFile, writeFile, unlink, readdir, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

const GENERATED_DIR = join(import.meta.dirname, '..', 'generated')

async function ensureDir(): Promise<void> {
  try { await mkdir(GENERATED_DIR, { recursive: true }) } catch { /* exists */ }
}

interface Entry {
  id: string
  description: string
  style: string
  createdAt: string
}

const index = new Map<string, Entry>()

export async function rebuildIndex(): Promise<void> {
  index.clear()
  try {
    const files = await readdir(GENERATED_DIR)
    for (const file of files) {
      if (!file.endsWith('.html')) continue
      const id = file.replace('.html', '')
      const html = await readFile(join(GENERATED_DIR, file), 'utf-8')
      const metaMatch = html.match(/<!-- META (\{.*?\}) -->/)
      if (metaMatch) {
        index.set(id, JSON.parse(metaMatch[1]))
      } else {
        index.set(id, { id, description: '', style: '', createdAt: '' })
      }
    }
  } catch {
    // generated/ dir doesn't exist yet — fine
  }
  console.log(`Index rebuilt: ${index.size} pages`)
}

export function savePage(id: string, html: string, meta: Entry): void {
  index.set(id, meta)
  ensureDir().then(() => writeFile(join(GENERATED_DIR, `${id}.html`), html, 'utf-8')).catch(console.error)
}

export function getPage(id: string): { html: string; meta: Entry } | null {
  return index.has(id) ? { html: '', meta: index.get(id)! } : null
}

const SAFE_ID = /^lp-\d{13,15}-[a-z0-9]{6}$/

function isValidId(id: string): boolean {
  return SAFE_ID.test(id)
}

export function getPageMeta(id: string): Entry | null {
  if (!isValidId(id)) return null
  return index.get(id) || null
}

export async function getPageHtml(id: string): Promise<string | null> {
  if (!isValidId(id)) return null
  try {
    return await readFile(join(GENERATED_DIR, `${id}.html`), 'utf-8')
  } catch {
    return null
  }
}

export function listPages(): Entry[] {
  return Array.from(index.values()).sort(
    (a, b) => b.createdAt.localeCompare(a.createdAt)
  )
}

export async function deletePage(id: string): Promise<boolean> {
  index.delete(id)
  try {
    await unlink(join(GENERATED_DIR, `${id}.html`))
    return true
  } catch {
    return false
  }
}
