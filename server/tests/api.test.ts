import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/index'

describe('API routes', () => {
  describe('GET /api/styles', () => {
    it('returns list of 5 styles', async () => {
      const res = await request(app).get('/api/styles')
      expect(res.status).toBe(200)
      expect(res.body.styles).toHaveLength(5)
      expect(res.body.styles).toContain('swiss')
      expect(res.body.styles).toContain('dark-luxury')
      expect(res.body.styles).toContain('neo-brutalism')
      expect(res.body.styles).toContain('glassmorphism')
      expect(res.body.styles).toContain('editorial')
    })
  })

  describe('POST /api/generate', () => {
    it('rejects missing description', async () => {
      const res = await request(app)
        .post('/api/generate')
        .send({ style: 'swiss' })
      expect(res.status).toBe(400)
      expect(res.body.error).toContain('description')
    })

    it('rejects invalid style', async () => {
      const res = await request(app)
        .post('/api/generate')
        .send({ description: 'Test product', style: 'invalid-style' })
      expect(res.status).toBe(400)
      expect(res.body.error).toContain('style')
    })
  })

  describe('POST /api/refine/:id', () => {
    it('returns 404 for unknown page', async () => {
      const res = await request(app)
        .post('/api/refine/nonexistent')
        .send({ feedback: 'Make it better' })
      expect(res.status).toBe(404)
    })
  })

  describe('POST /api/deploy/:id', () => {
    it('returns 404 for unknown page', async () => {
      const res = await request(app)
        .post('/api/deploy/nonexistent')
      expect(res.status).toBe(404)
    })
  })
})
