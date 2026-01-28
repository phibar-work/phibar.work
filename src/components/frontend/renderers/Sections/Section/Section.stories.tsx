import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Section } from './index'

const meta = {
  title: 'Frontend/Renderers/Sections/Section',
  component: Section,
  tags: ['autodocs'],
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

export const BasicSection: Story = {
  args: {
    section: {
      sectionId: 'intro',
      headline: 'Introduction',
      htmlElement: 'section',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'This is some sample content.' }],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  },
}

export const ArticleElement: Story = {
  args: {
    section: {
      sectionId: 'article-section',
      headline: 'Article Content',
      htmlElement: 'article',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'This section uses an article element.' }],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  },
}

export const WithoutContent: Story = {
  args: {
    section: {
      sectionId: 'empty-section',
      headline: 'Section Without Content',
      htmlElement: 'section',
    },
  },
}
