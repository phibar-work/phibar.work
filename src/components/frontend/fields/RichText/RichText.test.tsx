import { render } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import { runSnapshotTests } from '@/utilities/storybook-snapshots'
import RichText from './index'
import * as stories from './RichText.stories'

runSnapshotTests(stories)

describe('RichText internalDocToHref error path', () => {
  it('triggers error when doc value is not an object', () => {
    // The Payload converter catches the throw internally and logs it
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <RichText
        data={
          {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'link',
                      fields: {
                        linkType: 'internal',
                        doc: {
                          relationTo: 'pages',
                          value: 'string-id',
                        },
                        newTab: false,
                        url: '',
                      },
                      children: [{ type: 'text', text: 'Link' }],
                    },
                  ],
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          } as any
        }
      />,
    )

    consoleSpy.mockRestore()
  })
})
