import { describe, expect, it } from 'vitest'
import { mergeOpenGraph } from './mergeOpenGraph'

describe('mergeOpenGraph', () => {
  it('returns defaults when called with no args', () => {
    const result = mergeOpenGraph()
    expect(result).toHaveProperty('type', 'website')
    expect(result).toHaveProperty('siteName', 'Payload Website Template')
    expect(result).toHaveProperty('title', 'Payload Website Template')
  })

  it('overrides title and description', () => {
    const result = mergeOpenGraph({
      title: 'Custom Title',
      description: 'Custom description',
    })
    expect(result).toHaveProperty('title', 'Custom Title')
    expect(result).toHaveProperty('description', 'Custom description')
  })

  it('uses custom images when provided', () => {
    const images = [{ url: 'https://example.com/og.png' }]
    const result = mergeOpenGraph({ images })
    expect(result?.images).toEqual(images)
  })

  it('falls back to default images when none provided', () => {
    const result = mergeOpenGraph({ title: 'No Images' })
    expect(result?.images).toBeDefined()
    expect(Array.isArray(result?.images)).toBe(true)
  })
})
