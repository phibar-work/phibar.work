import { afterEach, describe, expect, it, vi } from 'vitest'
import { getImplicitPreference } from './shared'

describe('getImplicitPreference', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns dark when user prefers dark mode', () => {
    window.matchMedia = vi.fn(() => ({
      matches: true,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    expect(getImplicitPreference()).toBe('dark')
  })

  it('returns light when user prefers light mode', () => {
    window.matchMedia = vi.fn(() => ({
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    expect(getImplicitPreference()).toBe('light')
  })

  it('returns null when matchMedia.matches is not a boolean', () => {
    window.matchMedia = vi.fn(() => ({
      matches: undefined as any,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    expect(getImplicitPreference()).toBeNull()
  })
})
