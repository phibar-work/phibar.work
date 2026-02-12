'use client'

import dynamic from 'next/dynamic'

const ThemeSelector = dynamic(() => import('./index').then((mod) => mod.ThemeSelector), {
  ssr: false,
})

export function LazyThemeSelector() {
  return <ThemeSelector />
}
