import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BannerHero } from './index'

const meta = {
  title: 'Frontend/Renderers/Hero/BannerHero',
  component: BannerHero,
  tags: ['autodocs'],
} satisfies Meta<typeof BannerHero>

export default meta
type Story = StoryObj<typeof meta>

export const TitleOnly: Story = {
  args: {
    title: 'Welcome to Our Site',
    hero: {
      type: 'banner',
    },
  },
}

export const WithTagline: Story = {
  args: {
    title: 'Welcome to Our Site',
    hero: {
      type: 'banner',
      tagline: 'Building amazing experiences together',
    },
  },
}

export const ShortTitle: Story = {
  args: {
    title: 'Hello',
    hero: {
      type: 'banner',
      tagline: 'A brief introduction',
    },
  },
}

export const LongContent: Story = {
  args: {
    title: 'This is a Very Long Title That Might Need to Wrap Across Multiple Lines',
    hero: {
      type: 'banner',
      tagline:
        'This is a longer tagline that provides more context about what visitors can expect to find on this page',
    },
  },
}
