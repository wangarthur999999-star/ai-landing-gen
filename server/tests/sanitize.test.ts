import { describe, it, expect } from 'vitest'
import { validateHtml, stripDangerousContent, injectMetaComment } from '../src/services/sanitize'

describe('sanitize', () => {
  describe('validateHtml', () => {
    it('passes valid HTML', () => {
      const html = '<!DOCTYPE html><html><head></head><body><p>Hello</p></body></html>'
      const result = validateHtml(html)
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('rejects HTML without doctype', () => {
      const html = '<html><head></head><body></body></html>'
      const result = validateHtml(html)
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Missing DOCTYPE')
    })

    it('rejects HTML without body', () => {
      const html = '<!DOCTYPE html><html><head></head></html>'
      const result = validateHtml(html)
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Missing <body> tag')
    })
  })

  describe('stripDangerousContent', () => {
    it('removes script tags', () => {
      const html = '<!DOCTYPE html><html><head></head><body><script>alert("xss")</script><p>Safe</p></body></html>'
      const result = stripDangerousContent(html)
      expect(result).not.toContain('<script>')
      expect(result).toContain('Safe')
    })

    it('removes onclick attributes', () => {
      const html = '<!DOCTYPE html><html><head></head><body><button onclick="evil()">Click</button></body></html>'
      const result = stripDangerousContent(html)
      expect(result).not.toContain('onclick')
      expect(result).toContain('Click')
    })

    it('removes javascript: URLs from href', () => {
      const html = '<!DOCTYPE html><html><head></head><body><a href="javascript:alert(1)">Link</a></body></html>'
      const result = stripDangerousContent(html)
      expect(result).not.toContain('javascript:')
    })
  })

  describe('injectMetaComment', () => {
    it('injects meta comment after doctype', () => {
      const html = '<!DOCTYPE html>\n<html><head></head><body></body></html>'
      const result = injectMetaComment(html, { id: 'test' })
      expect(result).toContain('<!-- META ')
      expect(result).toContain('"id":"test"')
    })
  })
})
