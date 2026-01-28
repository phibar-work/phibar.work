import { describe, expect, it } from 'vitest'
import deepMerge, { isObject } from './deepMerge'

describe('isObject', () => {
  it('returns true for plain objects', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
  })

  it('returns false for arrays', () => {
    expect(isObject([])).toBe(false)
    expect(isObject([1, 2])).toBe(false)
  })

  it('returns false for non-object primitives', () => {
    expect(isObject(undefined)).toBe(false)
    expect(isObject(42)).toBe(false)
    expect(isObject('string')).toBe(false)
    expect(isObject(true)).toBe(false)
  })

  it('returns true for null (typeof null === "object")', () => {
    // Note: isObject does not guard against null
    expect(isObject(null)).toBe(true)
  })
})

describe('deepMerge', () => {
  it('merges flat objects', () => {
    expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 })
  })

  it('overrides values from source', () => {
    expect(deepMerge({ a: 1 }, { a: 2 })).toEqual({ a: 2 })
  })

  it('merges nested objects recursively', () => {
    const target = { a: { x: 1, y: 2 } }
    const source = { a: { y: 3, z: 4 } }
    expect(deepMerge(target, source)).toEqual({ a: { x: 1, y: 3, z: 4 } })
  })

  it('adds nested objects that only exist in source', () => {
    const target = { a: 1 }
    const source = { b: { nested: true } }
    expect(deepMerge(target, source)).toEqual({ a: 1, b: { nested: true } })
  })

  it('does not mutate the target', () => {
    const target = { a: { x: 1 } }
    const source = { a: { y: 2 } }
    const result = deepMerge(target, source)
    expect(result).not.toBe(target)
    expect(target).toEqual({ a: { x: 1 } })
  })
})
