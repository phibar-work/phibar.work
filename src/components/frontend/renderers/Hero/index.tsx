import type { Page } from '@/payload-types'
import { BannerHero } from './BannerHero'
import { NoneHero } from './NoneHero'

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
