import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { runSnapshotTests } from '@/utilities/storybook-snapshots'
import * as stories from './ImageMedia.stories'

runSnapshotTests(stories)

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    return <picture data-testid="next-image" {...props} />
  },
}))

describe('ImageMedia resource path', () => {
  it('renders with a Payload resource object', async () => {
    const { ImageMedia } = await import('./index')

    const { container } = render(
      <ImageMedia
        resource={
          {
            id: 1,
            filename: 'hero.jpg',
            mimeType: 'image/jpeg',
            url: '/media/hero.jpg',
            alt: 'Hero image from resource',
            width: 1200,
            height: 600,
            updatedAt: '2024-01-01T00:00:00.000Z',
          } as any
        }
      />,
    )

    const img = container.querySelector('[data-testid="next-image"]')
    expect(img).toBeTruthy()
    expect(img?.getAttribute('alt')).toBe('Hero image from resource')
    expect(img?.getAttribute('src')).toContain('/media/hero.jpg')
  })
})
