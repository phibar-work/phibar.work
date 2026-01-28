import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import RichText from './index'

const mockContent = {
  root: {
    type: 'root' as const,
    children: [
      {
        type: 'paragraph' as const,
        children: [
          { type: 'text' as const, text: 'This is a paragraph with ' },
          { type: 'text' as const, text: 'bold text', format: 1 },
          { type: 'text' as const, text: ' and ' },
          { type: 'text' as const, text: 'italic text', format: 2 },
          { type: 'text' as const, text: '.' },
        ],
      },
      {
        type: 'paragraph' as const,
        children: [{ type: 'text' as const, text: 'Another paragraph of content here.' }],
      },
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
}

const meta = {
  title: 'Frontend/Fields/RichText',
  component: RichText,
  tags: ['autodocs'],
} satisfies Meta<typeof RichText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: mockContent,
  },
}

export const WithoutProse: Story = {
  args: {
    data: mockContent,
    enableProse: false,
  },
}

export const WithoutGutter: Story = {
  args: {
    data: mockContent,
    enableGutter: false,
  },
}

export const WithCustomClass: Story = {
  args: {
    data: mockContent,
    className: 'text-lg',
  },
}
