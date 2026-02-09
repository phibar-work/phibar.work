'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type React from 'react'
import { useEffect, useState } from 'react'
import { Logo } from '@/components/frontend/fields/Logo/Logo'
import { useHeaderTheme } from '@/components/frontend/providers/HeaderTheme'
import type { Header } from '@/payload-types'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  // biome-ignore lint/correctness/useExhaustiveDependencies: Reset theme on route change only
  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only sync when headerTheme changes
  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme])

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="container py-4 flex justify-between items-center">
        <Link href="/" prefetch={false}>
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
