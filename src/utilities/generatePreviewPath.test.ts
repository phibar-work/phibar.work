import { describe, expect, it } from 'vitest'
import { generatePreviewPath } from './generatePreviewPath'

describe('generatePreviewPath', () => {
  it('generates a preview path for a page slug', () => {
    const result = generatePreviewPath({
      collection: 'pages',
      slug: 'about',
    } as Parameters<typeof generatePreviewPath>[0])

    expect(result).toContain('/next/preview?')
    expect(result).toContain('slug=about')
    expect(result).toContain('collection=pages')
    expect(result).toContain('path=%2Fabout')
  })

  it('encodes special characters in slug', () => {
    const result = generatePreviewPath({
      collection: 'pages',
      slug: 'hello world',
    } as Parameters<typeof generatePreviewPath>[0])

    expect(result).toContain('slug=hello%2520world')
  })

  it('handles empty slug for homepage', () => {
    const result = generatePreviewPath({
      collection: 'pages',
      slug: '',
    } as Parameters<typeof generatePreviewPath>[0])

    expect(result).toContain('/next/preview?')
    expect(result).toContain('path=%2F')
  })
})
