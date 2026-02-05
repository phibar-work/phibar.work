import { describe, expect, it } from 'vitest'
import { themeIsValid } from './types'

describe('themeIsValid', () => {
  it('returns true for dark', () => {
    expect(themeIsValid('dark')).toBe(true)
  })

  it('returns true for light', () => {
    expect(themeIsValid('light')).toBe(true)
  })

  it('returns false for invalid string', () => {
    expect(themeIsValid('invalid')).toBe(false)
  })

  it('returns false for null', () => {
    expect(themeIsValid(null)).toBe(false)
  })

  it('returns false for empty string', () => {
    expect(themeIsValid('')).toBe(false)
  })
})
