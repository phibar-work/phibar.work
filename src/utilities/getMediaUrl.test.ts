import { describe, expect, it, vi } from 'vitest'
import { getMediaUrl } from './getMediaUrl'

vi.mock('@/utilities/getURL', () => ({
  getClientSideURL: () => 'http://localhost:3000',
}))

describe('getMediaUrl', () => {
  it('returns empty string for null', () => {
    expect(getMediaUrl(null)).toBe('')
  })

  it('returns empty string for undefined', () => {
    expect(getMediaUrl(undefined)).toBe('')
  })

  it('returns absolute URL as-is', () => {
    expect(getMediaUrl('https://example.com/image.png')).toBe('https://example.com/image.png')
  })

  it('preserves http URLs', () => {
    expect(getMediaUrl('http://example.com/image.png')).toBe('http://example.com/image.png')
  })

  it('prepends base URL to relative paths', () => {
    expect(getMediaUrl('/media/image.png')).toBe('http://localhost:3000/media/image.png')
  })

  it('appends cache tag to absolute URL', () => {
    expect(getMediaUrl('https://example.com/img.png', 'v1')).toBe('https://example.com/img.png?v1')
  })

  it('appends cache tag to relative URL', () => {
    expect(getMediaUrl('/media/img.png', 'v2')).toBe('http://localhost:3000/media/img.png?v2')
  })

  it('ignores empty cache tag', () => {
    expect(getMediaUrl('/media/img.png', '')).toBe('http://localhost:3000/media/img.png')
  })

  it('ignores null cache tag', () => {
    expect(getMediaUrl('/media/img.png', null)).toBe('http://localhost:3000/media/img.png')
  })

  it('encodes special characters in cache tag', () => {
    expect(getMediaUrl('/media/img.png', 'a b')).toBe('http://localhost:3000/media/img.png?a%20b')
  })
})
