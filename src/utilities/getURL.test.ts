import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('getServerSideURL', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('returns NEXT_PUBLIC_SERVER_URL when set', async () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://example.com'
    const { getServerSideURL } = await import('./getURL')
    expect(getServerSideURL()).toBe('https://example.com')
  })

  it('returns Vercel production URL when NEXT_PUBLIC_SERVER_URL not set', async () => {
    delete process.env.NEXT_PUBLIC_SERVER_URL
    process.env.VERCEL_PROJECT_PRODUCTION_URL = 'myapp.vercel.app'
    const { getServerSideURL } = await import('./getURL')
    expect(getServerSideURL()).toBe('https://myapp.vercel.app')
  })

  it('returns localhost when no env vars set', async () => {
    delete process.env.NEXT_PUBLIC_SERVER_URL
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL
    const { getServerSideURL } = await import('./getURL')
    expect(getServerSideURL()).toBe('http://localhost:3000')
  })
})

describe('getClientSideURL', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('returns Vercel URL when canUseDOM is false and VERCEL_PROJECT_PRODUCTION_URL is set', async () => {
    process.env.VERCEL_PROJECT_PRODUCTION_URL = 'myapp.vercel.app'

    vi.doMock('./canUseDOM', () => ({ default: false }))
    const { getClientSideURL } = await import('./getURL')
    expect(getClientSideURL()).toBe('https://myapp.vercel.app')
  })

  it('returns NEXT_PUBLIC_SERVER_URL when canUseDOM is false and no Vercel URL', async () => {
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://example.com'

    vi.doMock('./canUseDOM', () => ({ default: false }))
    const { getClientSideURL } = await import('./getURL')
    expect(getClientSideURL()).toBe('https://example.com')
  })

  it('returns empty string when canUseDOM is false and no env vars', async () => {
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL
    delete process.env.NEXT_PUBLIC_SERVER_URL

    vi.doMock('./canUseDOM', () => ({ default: false }))
    const { getClientSideURL } = await import('./getURL')
    expect(getClientSideURL()).toBe('')
  })

  it('returns window location URL when canUseDOM is true', async () => {
    vi.doMock('./canUseDOM', () => ({ default: true }))
    const { getClientSideURL } = await import('./getURL')
    const result = getClientSideURL()
    expect(result).toContain(window.location.protocol)
    expect(result).toContain(window.location.hostname)
  })
})
