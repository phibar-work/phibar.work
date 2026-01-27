import { describe, expect, it } from 'vitest'
import { formatDateTime } from './formatDateTime'

describe('formatDateTime', () => {
  it('formats a date string as MM/DD/YYYY', () => {
    expect(formatDateTime('2024-01-15T12:00:00Z')).toBe('01/15/2024')
  })

  it('pads single-digit month and day', () => {
    expect(formatDateTime('2024-03-05T00:00:00Z')).toBe('03/05/2024')
  })

  it('handles double-digit month and day', () => {
    expect(formatDateTime('2024-12-25T00:00:00Z')).toBe('12/25/2024')
  })

  it('falls back to current date for empty string', () => {
    const now = new Date()
    const expected = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}/${now.getFullYear()}`
    expect(formatDateTime('')).toBe(expected)
  })
})
