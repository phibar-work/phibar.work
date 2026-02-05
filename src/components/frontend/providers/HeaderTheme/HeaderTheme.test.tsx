import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { runSnapshotTests } from '@/utilities/storybook-snapshots'
import * as stories from './HeaderTheme.stories'
import { HeaderThemeProvider, useHeaderTheme } from './index'

runSnapshotTests(stories)

describe('HeaderThemeProvider initial theme detection', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('detects dark theme from document classList', () => {
    document.documentElement.classList.add('dark')

    const { result } = renderHook(() => useHeaderTheme(), {
      wrapper: HeaderThemeProvider,
    })

    expect(result.current.headerTheme).toBe('dark')
  })

  it('detects light theme from document classList', () => {
    const { result } = renderHook(() => useHeaderTheme(), {
      wrapper: HeaderThemeProvider,
    })

    expect(result.current.headerTheme).toBe('light')
  })
})
