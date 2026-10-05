'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useActiveSection } from '@/components/frontend/providers/ActiveSection'

interface FrameMenuProps {
  open: boolean
  onClose: () => void
}

export function FrameMenu({ open, onClose }: FrameMenuProps) {
  const { sections, pageTitle, activeSectionId } = useActiveSection()
  const menuRef = useRef<HTMLDivElement>(null)

  const handleScrollTo = useCallback(
    (sectionId: string) => {
      const el = document.getElementById(sectionId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
      onClose()
    },
    [onClose],
  )

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    onClose()
  }, [onClose])

  // Close on Escape
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  // Close on click outside
  useEffect(() => {
    if (!open) return

    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    // Delay to avoid immediate close from the trigger click
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClick)
    }, 0)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('click', handleClick)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={menuRef}
      role="menu"
      className="absolute right-0 top-full mt-2 w-64 rounded-[10px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg py-2 z-30"
    >
      {pageTitle && (
        <button
          type="button"
          role="menuitem"
          onClick={handleScrollToTop}
          className="w-full text-left px-4 py-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          {pageTitle}
        </button>
      )}

      {sections.length > 0 && (
        <div className="border-t border-zinc-100 dark:border-zinc-800 mt-1 pt-1">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              role="menuitem"
              onClick={() => handleScrollTo(section.id)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                activeSectionId === section.id
                  ? 'text-brand font-medium bg-zinc-50 dark:bg-zinc-800/50'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
