'use client'
import React, { useEffect } from 'react'
import {
  useActiveSection,
  type SectionNavItem,
  type PageCta,
} from '@/components/frontend/providers/ActiveSection'
import { useHeaderTheme } from '@/components/frontend/providers/HeaderTheme'
import { useSectionObserver } from '@/hooks/useSectionObserver'

interface PageClientProps {
  heroType?: string | null
  sections: SectionNavItem[]
  pageTitle: string
  cta?: PageCta | null
}

const PageClient: React.FC<PageClientProps> = ({ heroType, sections, pageTitle, cta }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const { registerPage } = useActiveSection()

  useEffect(() => {
    if (heroType !== 'blueprint') {
      setHeaderTheme('light')
    }
  }, [setHeaderTheme, heroType])

  useEffect(() => {
    registerPage({ sections, pageTitle, cta })
  }, [registerPage, sections, pageTitle, cta])

  useSectionObserver()

  return <React.Fragment />
}

export default PageClient
