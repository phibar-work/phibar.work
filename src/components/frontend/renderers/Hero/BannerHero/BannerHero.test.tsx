import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { runSnapshotTests } from '@/utilities/storybook-snapshots'
import * as stories from './BannerHero.stories'

runSnapshotTests(stories)

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    return <picture data-testid="next-image" {...props} />
  },
}))

describe('BannerHero with image', () => {
  it('renders Media when hero has an image object', async () => {
    const { BannerHero } = await import('./index')

    const { container } = render(
      <BannerHero
        title="Hero with Background"
        hero={{
          type: 'banner',
          tagline: 'Visual hero with an image',
          image: {
            id: 1,
            filename: 'banner.jpg',
            mimeType: 'image/jpeg',
            url: '/media/banner.jpg',
            alt: 'Banner background',
            width: 1920,
            height: 600,
          } as any,
        }}
      />,
    )

    expect(container.querySelector('[data-testid="next-image"]')).toBeTruthy()
  })
})
