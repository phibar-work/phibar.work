import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Media } from './index'

const mockVideoResource = {
  id: '2',
  url: '/media/sample-video.mp4',
  alt: 'Sample video',
  width: 1920,
  height: 1080,
  mimeType: 'video/mp4',
  filename: 'sample-video.mp4',
  filesize: 1000000,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
}

const meta = {
  title: 'Frontend/Fields/Media',
  component: Media,
  tags: ['autodocs'],
  argTypes: {
    htmlElement: {
      control: 'select',
      options: ['div', 'figure', 'span', null],
    },
  },
} satisfies Meta<typeof Media>

export default meta
type Story = StoryObj<typeof meta>

export const Video: Story = {
  args: {
    resource: mockVideoResource,
  },
}

export const VideoWithClassName: Story = {
  args: {
    resource: mockVideoResource,
    className: 'rounded-lg overflow-hidden',
    videoClassName: 'w-full',
  },
}

export const VideoInFigure: Story = {
  args: {
    resource: mockVideoResource,
    htmlElement: 'figure',
    className: 'max-w-2xl',
  },
}

export const WithFragmentWrapper: Story = {
  args: {
    resource: mockVideoResource,
    htmlElement: null,
    className: 'should-not-apply',
  },
}
