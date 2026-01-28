/**
 * Storybook Snapshot Test Utility
 *
 * Usage in a component test file:
 *
 * ```ts
 * import { runSnapshotTests } from '@/test/storybook-snapshots'
 * import * as stories from './button.stories'
 *
 * runSnapshotTests(stories)
 * ```
 */
import type { Meta, StoryFn } from '@storybook/react'
import { composeStories } from '@storybook/react'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

type StoryModule = { default: Meta } & Record<string, StoryFn | Meta>

/**
 * Runs snapshot tests for all stories in a module.
 * @param storyModule - The imported story module (import * as stories from './x.stories')
 * @param name - Optional custom name for the describe block (defaults to component displayName or 'Component')
 */
export function runSnapshotTests(storyModule: StoryModule, name?: string) {
  const meta = storyModule.default
  const componentName = name ?? meta.title?.split('/').pop() ?? 'Component'

  describe(`${componentName} snapshots`, () => {
    const stories = composeStories(storyModule as Parameters<typeof composeStories>[0])

    for (const [storyName, Story] of Object.entries(stories)) {
      it(`${storyName} matches snapshot`, () => {
        const { container } = render(<Story />)
        expect(container.firstChild).toMatchSnapshot()
      })
    }
  })
}
