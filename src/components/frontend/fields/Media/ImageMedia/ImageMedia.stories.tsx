import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ImageMedia } from './index'

const meta = {
  title: 'Frontend/Fields/Media/ImageMedia',
  component: ImageMedia,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof ImageMedia>

export default meta
type Story = StoryObj<typeof meta>

export const WithSrc: Story = {
  args: {
    src: {
      src: '/placeholder.jpg',
      width: 800,
      height: 600,
    },
    alt: 'Sample image',
  },
}

export const WithCustomAlt: Story = {
  args: {
    src: {
      src: '/placeholder.jpg',
      width: 800,
      height: 600,
    },
    alt: 'Custom alt text for accessibility',
  },
}

export const WithPriority: Story = {
  args: {
    src: {
      src: '/placeholder.jpg',
      width: 800,
      height: 600,
    },
    alt: 'Priority loaded image',
    priority: true,
  },
}

export const WithCustomClasses: Story = {
  args: {
    src: {
      src: '/placeholder.jpg',
      width: 800,
      height: 600,
    },
    alt: 'Styled image',
    pictureClassName: 'rounded-lg overflow-hidden',
    imgClassName: 'object-cover',
  },
}
