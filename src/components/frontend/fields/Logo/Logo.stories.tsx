import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Logo } from './Logo'

const meta = {
  title: 'Frontend/Fields/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'select',
      options: ['lazy', 'eager'],
    },
    priority: {
      control: 'select',
      options: ['auto', 'high', 'low'],
    },
  },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const EagerLoading: Story = {
  args: { loading: 'eager' },
}

export const HighPriority: Story = {
  args: { priority: 'high' },
}

export const WithCustomClass: Story = {
  args: { className: 'opacity-50' },
}
