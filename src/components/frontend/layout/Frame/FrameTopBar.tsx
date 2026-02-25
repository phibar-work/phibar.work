'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Logo } from '@/components/frontend/fields/Logo/Logo'
import { useActiveSection } from '@/components/frontend/providers/ActiveSection'
import { FrameMenu } from './FrameMenu'

export function FrameTopBar() {
  const { activeSectionId, sections } = useActiveSection()
  const [menuOpen, setMenuOpen] = useState(false)

  const activeTitle = sections.find((s) => s.id === activeSectionId)?.title ?? null

  return (
    <header className="frame-nav">
      <div className="flex items-center gap-4 px-4 py-3">
          <Link href="/" prefetch={false} className="shrink-0">
            <Logo loading="eager" priority="high" />
          </Link>

          {activeTitle && (
            <output
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 truncate mx-4 hidden sm:block"
              aria-live="polite"
            >
              {activeTitle}
            </output>
          )}

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <MenuIcon open={menuOpen} />
            </button>

            <FrameMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
          </div>
      </div>
    </header>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className="text-zinc-700 dark:text-zinc-300"
      aria-hidden="true"
    >
      <path
        d={open ? 'M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5' : 'M3 5.5H15M3 9H15M3 12.5H15'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
