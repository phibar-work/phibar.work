'use client'

import type React from 'react'
import { createContext, use, useCallback, useMemo, useState } from 'react'
import type { Page } from '@/payload-types'

export interface SectionNavItem {
  id: string
  title: string
}

export type PageCta = NonNullable<Page['cta']>

export interface ActiveSectionContextType {
  activeSectionId: string | null
  sections: SectionNavItem[]
  pageTitle: string | null
  cta: PageCta | null
  setActiveSectionId: (id: string | null) => void
  registerPage: (data: {
    sections: SectionNavItem[]
    pageTitle: string
    cta?: PageCta | null
  }) => void
}

const initialContext: ActiveSectionContextType = {
  activeSectionId: null,
  sections: [],
  pageTitle: null,
  cta: null,
  setActiveSectionId: () => {},
  registerPage: () => {},
}

const ActiveSectionContext = createContext<ActiveSectionContextType>(initialContext)

export const ActiveSectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
  const [sections, setSections] = useState<SectionNavItem[]>([])
  const [pageTitle, setPageTitle] = useState<string | null>(null)
  const [cta, setCta] = useState<PageCta | null>(null)

  const registerPage = useCallback(
    (data: { sections: SectionNavItem[]; pageTitle: string; cta?: PageCta | null }) => {
      setSections(data.sections)
      setPageTitle(data.pageTitle)
      setCta(data.cta ?? null)
      if (data.sections.length > 0) {
        setActiveSectionId(data.sections[0].id)
      }
    },
    [],
  )

  const value = useMemo(
    () => ({
      activeSectionId,
      sections,
      pageTitle,
      cta,
      setActiveSectionId,
      registerPage,
    }),
    [activeSectionId, sections, pageTitle, cta, registerPage],
  )

  return <ActiveSectionContext value={value}>{children}</ActiveSectionContext>
}

export const useActiveSection = (): ActiveSectionContextType => use(ActiveSectionContext)
