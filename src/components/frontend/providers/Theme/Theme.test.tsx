import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ThemeProvider, useTheme } from './index'

describe('ThemeProvider', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('sets theme to auto mode when setTheme(null) is called', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    act(() => {
      result.current.setTheme('dark')
    })
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    act(() => {
      result.current.setTheme(null)
    })
    expect(window.localStorage.getItem('payload-theme')).toBeNull()
  })

  it('reads valid theme from localStorage on mount', () => {
    window.localStorage.setItem('payload-theme', 'dark')

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    expect(result.current.theme).toBe('dark')
  })

  it('falls back to implicit preference when localStorage has invalid value', () => {
    window.localStorage.setItem('payload-theme', 'invalid-theme')

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    // Should fall through to implicit/default preference, not 'invalid-theme'
    expect(result.current.theme).not.toBe('invalid-theme')
  })

  it('listens to system preference changes in auto mode', () => {
    const listeners: ((e: MediaQueryListEvent) => void)[] = []

    const mockMatchMedia = vi.fn(() => ({
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addEventListener: vi.fn((_event: string, handler: (e: MediaQueryListEvent) => void) => {
        listeners.push(handler)
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    window.matchMedia = mockMatchMedia as any

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    // Set to auto mode
    act(() => {
      result.current.setTheme(null)
    })

    // Simulate system preference change to dark
    act(() => {
      for (const listener of listeners) {
        listener({ matches: true } as MediaQueryListEvent)
      }
    })

    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('handles system preference change to light in auto mode', () => {
    const listeners: ((e: MediaQueryListEvent) => void)[] = []

    window.matchMedia = vi.fn(() => ({
      matches: true,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addEventListener: vi.fn((_event: string, handler: (e: MediaQueryListEvent) => void) => {
        listeners.push(handler)
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as any

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    act(() => {
      result.current.setTheme(null)
    })

    // Simulate system preference change to light
    act(() => {
      for (const listener of listeners) {
        listener({ matches: false } as MediaQueryListEvent)
      }
    })

    expect(result.current.theme).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('falls back to default when implicit preference returns null', () => {
    window.localStorage.setItem('payload-theme', 'invalid')

    // Mock matchMedia to return non-boolean matches (null implicit preference)
    window.matchMedia = vi.fn(() => ({
      matches: undefined as any,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as any

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    // Should use default theme ('light') since implicit preference is null
    expect(result.current.theme).toBe('light')
  })
})
