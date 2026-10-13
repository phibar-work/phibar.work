import type { Footer, Header, Page } from '@/payload-types'

type Section = NonNullable<Page['sections']>[number]
type RichTextContent = NonNullable<Section['content']>

const textNode = (text: string) => ({
  type: 'text',
  version: 1,
  text,
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
})

const blockNode = (type: string, text: string, extra: Record<string, unknown> = {}) => ({
  type,
  version: 1,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  children: [textNode(text)],
  ...extra,
})

/** Builds Lexical rich text; lines starting with `## ` become h3 headings. */
export function richText(...lines: string[]): RichTextContent {
  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children: lines.map((line) =>
        line.startsWith('## ')
          ? blockNode('heading', line.slice(3), { tag: 'h3' })
          : blockNode('paragraph', line, { textFormat: 0, textStyle: '' }),
      ),
    },
  }
}

export const mockHeader: Header = {
  id: 'header',
  navItems: [
    { link: { type: 'custom', url: '/', label: 'Home' } },
    { link: { type: 'custom', url: '/services', label: 'Services' } },
    { link: { type: 'custom', url: '/about', label: 'About' } },
    { link: { type: 'custom', url: '/contact', label: 'Contact' } },
  ],
}

export const mockFooter: Footer = {
  id: 'footer',
  navItems: [
    { link: { type: 'custom', url: '/imprint', label: 'Imprint' } },
    { link: { type: 'custom', url: '/privacy', label: 'Privacy' } },
  ],
}

export const mockSections: Section[] = [
  {
    id: 'services',
    sectionId: 'services',
    headline: 'What I do',
    htmlElement: 'section',
    content: richText(
      'Architecture, cloud infrastructure and hands-on delivery for teams that need to move fast.',
      '## Architecture',
      'From whiteboard sketches to a system design your team can build on.',
      '## Delivery',
      'Infrastructure as code, CI/CD and production-ready frontends.',
    ),
  },
  {
    id: 'about',
    sectionId: 'about',
    headline: 'About',
    htmlElement: 'article',
    content: richText('Independent software architect based in Germany.'),
  },
]

export const mockHomePage: Pick<Page, 'title' | 'hero' | 'sections'> = {
  title: 'Home',
  hero: {
    type: 'blueprint',
    headline: 'Software architect, married to AI.',
    subline: 'From whiteboard to production — we plan it, I build it, no overhead of ten people.',
  },
  sections: mockSections,
}

export const mockBannerPage: Pick<Page, 'title' | 'hero' | 'sections'> = {
  title: 'Services',
  hero: { type: 'banner', tagline: 'Architecture and delivery, end to end' },
  sections: mockSections,
}

export const mockPlainPage: Pick<Page, 'title' | 'hero' | 'sections'> = {
  title: 'Imprint',
  hero: { type: 'none' },
  sections: [
    {
      id: 'imprint',
      sectionId: 'imprint',
      headline: 'Imprint',
      htmlElement: 'section',
      content: richText('Philipp Bartels IT Beratung', 'Contact: hello@example.com'),
    },
  ],
}
