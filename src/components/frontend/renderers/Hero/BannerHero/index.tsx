import { Media } from '@/components/frontend/fields/Media'
import type { Page } from '@/payload-types'

export function BannerHero({ hero, title }: { hero: Page['hero']; title: string }) {
  return (
    <div className="relative">
      {hero?.image && typeof hero.image === 'object' && <Media resource={hero.image} />}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
        {title}
      </h1>
      {hero?.tagline && <p className="text-lg text-zinc-600 dark:text-zinc-400">{hero.tagline}</p>}
    </div>
  )
}
