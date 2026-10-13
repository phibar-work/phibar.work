import type React from 'react'
import type { Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { RenderHero } from '../Hero'
import { RenderSections } from '../Sections'

/**
 * Presentational page body: hero followed by sections.
 * `children` render first, for route-level helpers (redirects, live preview, header theme).
 */
export function RenderPage({
  page,
  children,
}: {
  page: Pick<Page, 'title' | 'hero' | 'sections'>
  children?: React.ReactNode
}) {
  const isFullBleedHero = page.hero?.type === 'blueprint'

  return (
    <div className={cn('flex-1', !isFullBleedHero && 'py-16')}>
      {children}
      <RenderHero hero={page.hero} title={page.title} />
      <RenderSections sections={page.sections} />
    </div>
  )
}
