import { vi } from 'vitest'
import { runSnapshotTests } from '@/utilities/storybook-snapshots'
import * as stories from './BlueprintHero.stories'

vi.mock('@/components/frontend/providers/HeaderTheme', () => ({
  HeaderThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  useHeaderTheme: () => ({ headerTheme: null, setHeaderTheme: vi.fn() }),
}))

runSnapshotTests(stories)
