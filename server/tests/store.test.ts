import { describe, it, expect, beforeEach } from 'vitest'
import { savePage, getPageHtml, getPageMeta, listPages, deletePage } from '../src/store'

describe('store', () => {
  const testId = 'lp-1234567890123-abc123'
  const testHtml = '<!DOCTYPE html><html><head></head><body><h1>Test</h1></body></html>'
  const testMeta = {
    id: testId,
    description: 'Test product',
    style: 'swiss',
    createdAt: new Date().toISOString(),
  }

  beforeEach(async () => {
    await deletePage(testId)
  })

  it('saves and retrieves page metadata', () => {
    savePage(testId, testHtml, testMeta)
    const meta = getPageMeta(testId)
    expect(meta).not.toBeNull()
    expect(meta!.style).toBe('swiss')
    expect(meta!.description).toBe('Test product')
  })

  it('returns null for unknown page', () => {
    expect(getPageMeta('nonexistent')).toBeNull()
  })

  it('lists pages sorted by date', () => {
    const idA = 'lp-1234567890123-aaa111'
    const idB = 'lp-1234567890123-bbb222'
    savePage(idA, testHtml, { id: idA, description: 'A', style: 'swiss', createdAt: '2024-01-01' })
    savePage(idB, testHtml, { id: idB, description: 'B', style: 'swiss', createdAt: '2024-02-01' })
    const pages = listPages()
    expect(pages[0].id).toBe(idB)
    deletePage(idA)
    deletePage(idB)
  })

  it('deletes pages', () => {
    savePage(testId, testHtml, testMeta)
    expect(getPageMeta(testId)).not.toBeNull()
    deletePage(testId)
    expect(getPageMeta(testId)).toBeNull()
  })
})
