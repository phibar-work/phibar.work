import Link from 'next/link'

import { CMSLink } from '@/components/frontend/fields/Link'
import { Logo } from '@/components/frontend/fields/Logo/Logo'
import { LazyThemeSelector } from '@/components/frontend/providers/Theme/ThemeSelector/LazyThemeSelector'
import type { Footer as FooterData } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Footer() {
  const footerData: FooterData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-100 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/" prefetch={false}>
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <LazyThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }) => {
              return (
                <CMSLink
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                  key={link.label}
                  {...link}
                />
              )
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
