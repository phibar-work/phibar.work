import type { Page } from '@/payload-types'
import { NoneHero } from './NoneHero'
import { BannerHero } from './BannerHero'

const heroRenderers = {
  none: NoneHero,
  banner: BannerHero,
}

export function RenderHero({ hero, title }: { hero: Page['hero']; title: string }) {
  const type = hero?.type ?? 'none'
  const HeroComponent = heroRenderers[type]

  if (!HeroComponent) return null

  return <HeroComponent hero={hero} title={title} />
}
