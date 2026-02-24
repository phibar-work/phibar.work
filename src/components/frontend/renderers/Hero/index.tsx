import type { Page } from '@/payload-types'
import { BannerHero } from './BannerHero'
import { BlueprintHero } from './BlueprintHero'
import { NoneHero } from './NoneHero'

const heroRenderers = {
  none: NoneHero,
  banner: BannerHero,
  blueprint: BlueprintHero,
}

export function RenderHero({ hero, title }: { hero: Page['hero']; title: string }) {
  const type = hero?.type ?? 'none'
  const HeroComponent = heroRenderers[type]

  if (!HeroComponent) return null

  return <HeroComponent hero={hero} title={title} />
}
