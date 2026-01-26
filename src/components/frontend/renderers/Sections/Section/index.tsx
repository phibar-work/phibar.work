import type { Page } from '@/payload-types'
import RichText from '@/components/frontend/fields/RichText'

type SectionData = NonNullable<Page['sections']>[number]

export function Section({ section }: { section: SectionData }) {
  const Tag = section.htmlElement === 'article' ? 'article' : 'section'

  return (
    <Tag id={section.sectionId}>
      <h2>{section.headline}</h2>
      {section.content && <RichText data={section.content} />}
    </Tag>
  )
}
