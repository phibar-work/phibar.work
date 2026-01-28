import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { NoneHero } from './index'

const meta = {
  title: 'Frontend/Renderers/Hero/NoneHero',
  component: NoneHero,
  tags: ['autodocs'],
} satisfies Meta<typeof NoneHero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Page Title',
  },
}

export const LongTitle: Story = {
  args: {
    title: 'This is a much longer page title that might wrap on smaller screens',
  },
}
