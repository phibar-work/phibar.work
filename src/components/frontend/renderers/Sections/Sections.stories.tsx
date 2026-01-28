import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RenderSections } from './index'

const mockSections = [
  {
    id: '1',
    sectionId: 'intro',
    headline: 'Introduction',
    htmlElement: 'section' as const,
    content: {
      root: {
        type: 'root' as const,
        children: [
          {
            type: 'paragraph' as const,
            children: [{ type: 'text' as const, text: 'Welcome to our site.' }],
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    },
  },
  {
    id: '2',
    sectionId: 'features',
    headline: 'Features',
    htmlElement: 'section' as const,
    content: {
      root: {
        type: 'root' as const,
        children: [
          {
            type: 'paragraph' as const,
            children: [{ type: 'text' as const, text: 'Our amazing features.' }],
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    },
  },
]

const meta = {
  title: 'Frontend/Renderers/Sections',
  component: RenderSections,
  tags: ['autodocs'],
} satisfies Meta<typeof RenderSections>

export default meta
type Story = StoryObj<typeof meta>

export const MultipleSections: Story = {
  args: {
    sections: mockSections,
  },
}

export const SingleSection: Story = {
  args: {
    sections: [mockSections[0]],
  },
}

export const EmptySections: Story = {
  args: {
    sections: [],
  },
}

export const NullSections: Story = {
  args: {
    sections: null,
  },
}

export const UndefinedSections: Story = {
  args: {
    sections: undefined,
  },
}
