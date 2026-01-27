import type { Page } from '@/payload-types'
import { Section } from './Section'

export function RenderSections({ sections }: { sections: Page['sections'] }) {
  if (!sections || sections.length === 0) return null

  return (
    <>
      {sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}
    </>
  )
}
