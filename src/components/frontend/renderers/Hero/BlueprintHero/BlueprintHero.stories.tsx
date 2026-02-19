import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { HeaderThemeProvider } from '@/components/frontend/providers/HeaderTheme'
import { BlueprintHero } from './index'

const meta = {
  title: 'Frontend/Renderers/Hero/BlueprintHero',
  component: BlueprintHero,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <HeaderThemeProvider>
        <Story />
      </HeaderThemeProvider>
    ),
  ],
} satisfies Meta<typeof BlueprintHero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Home',
    hero: {
      type: 'blueprint' as any,
      headline: 'Software architect, married to AI.',
      subline: 'From whiteboard to production \u2014 we plan it, I build it, no overhead of ten people.',
    },
  },
}

export const CustomContent: Story = {
  args: {
    title: 'About',
    hero: {
      type: 'blueprint' as any,
      headline: 'Building the future.',
      subline: 'One line of code at a time.',
    },
  },
}

export const MinimalContent: Story = {
  args: {
    title: 'Minimal',
    hero: {
      type: 'blueprint' as any,
    },
  },
}
