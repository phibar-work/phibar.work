import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { VideoMedia } from './index'

const mockResource = {
  id: '1',
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
  title: 'Frontend/Fields/Media/VideoMedia',
  component: VideoMedia,
  tags: ['autodocs'],
} satisfies Meta<typeof VideoMedia>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    resource: mockResource,
  },
}

export const WithClassName: Story = {
  args: {
    resource: mockResource,
    videoClassName: 'rounded-lg w-full max-w-2xl',
  },
}

export const NoResource: Story = {
  args: {
    resource: undefined,
  },
}
