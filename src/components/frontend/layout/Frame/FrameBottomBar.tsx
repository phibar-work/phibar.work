'use client'

import Link from 'next/link'
import { useActiveSection, type PageCta } from '@/components/frontend/providers/ActiveSection'
import { LazyThemeSelector } from '@/components/frontend/providers/Theme/ThemeSelector/LazyThemeSelector'

export function FrameBottomBar() {
  const { cta } = useActiveSection()

  const ctaHref = resolveCtaHref(cta?.link)

  return (
    <footer className="frame-cta">
      <div className="flex items-center gap-4 px-4 py-3">
          <LazyThemeSelector />

          {cta?.label && ctaHref && (
            <Link
              href={ctaHref}
              target={cta.link?.newTab ? '_blank' : undefined}
              rel={cta.link?.newTab ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-deep transition-colors"
            >
              {cta.label}
            </Link>
          )}
      </div>
    </footer>
  )
}

function resolveCtaHref(link: PageCta['link'] | undefined): string | null {
  if (!link) return null

  if (link.type === 'custom' && link.url) {
    return link.url
  }

  if (link.type === 'reference' && link.reference?.value) {
    const ref = link.reference.value
    if (typeof ref === 'string') return `/${ref}`
    if (typeof ref === 'object' && 'slug' in ref) return `/${ref.slug}`
  }

  return null
}
