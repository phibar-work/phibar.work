'use client'

import { useEffect } from 'react'
import { useActiveSection } from '@/components/frontend/providers/ActiveSection'

export function useSectionObserver() {
  const { sections, setActiveSectionId } = useActiveSection()

  useEffect(() => {
    if (sections.length === 0) return

    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActiveSectionId(visible[0].target.id)
        }
      },
      {
        root: null, // viewport — document scrolls, not an inner container
        rootMargin: '-80px 0px -60% 0px', // -80px top accounts for fixed nav
        threshold: 0,
      },
    )

    for (const el of elements) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [sections, setActiveSectionId])
}
