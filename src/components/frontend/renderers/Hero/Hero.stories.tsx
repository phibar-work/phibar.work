import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RenderHero } from './index'

const meta = {
  title: 'Frontend/Renderers/Hero',
  component: RenderHero,
  tags: ['autodocs'],
} satisfies Meta<typeof RenderHero>

export default meta
type Story = StoryObj<typeof meta>

export const NoneType: Story = {
  args: {
    title: 'Page Title',
    hero: {
      type: 'none',
    },
  },
}

export const BannerType: Story = {
  args: {
    title: 'Welcome',
    hero: {
      type: 'banner',
      tagline: 'Building the future together',
    },
  },
}

export const DefaultsToNone: Story = {
  args: {
    title: 'Default Hero',
    hero: undefined,
  },
}

export const NullHero: Story = {
  args: {
    title: 'Null Hero',
    hero: null,
  },
}

export const BlueprintType: Story = {
  args: {
    title: 'Home',
    hero: {
      type: 'blueprint' as any,
      headline: 'Software architect, married to AI.',
      subline: 'From whiteboard to production \u2014 we plan it, I build it, no overhead of ten people.',
    },
  },
}

export const UnknownType: Story = {
  args: {
    title: 'Unknown Hero Type',
    hero: {
      type: 'unknown-type' as any,
    },
  },
}
