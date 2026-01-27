import { describe, expect, it } from 'vitest'
import { toKebabCase } from './toKebabCase'

describe('toKebabCase', () => {
  it('converts camelCase', () => {
    expect(toKebabCase('camelCase')).toBe('camel-case')
  })

  it('converts PascalCase', () => {
    expect(toKebabCase('PascalCase')).toBe('pascal-case')
  })

  it('converts spaces to hyphens', () => {
    expect(toKebabCase('hello world')).toBe('hello-world')
  })

  it('converts multiple spaces', () => {
    expect(toKebabCase('hello   world')).toBe('hello-world')
  })

  it('lowercases the result', () => {
    expect(toKebabCase('HELLO')).toBe('hello')
  })

  it('handles mixed camelCase and spaces', () => {
    expect(toKebabCase('myComponent Name')).toBe('my-component-name')
  })
})
