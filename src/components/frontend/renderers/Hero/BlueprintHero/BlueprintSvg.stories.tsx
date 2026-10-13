import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BlueprintSvg } from './BlueprintSvg'
import './blueprint-hero.css'

const meta = {
  title: 'Frontend/Renderers/Hero/BlueprintHero/BlueprintSvg',
  component: BlueprintSvg,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="text-brand">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BlueprintSvg>

export default meta
type Story = StoryObj<typeof meta>

/** Lines animate in while the architecture is being drawn. */
export const Drawing: Story = {
  args: { phase: 'architecture' },
}

/** Static diagram once the animation has settled. */
export const Settled: Story = {
  args: { phase: 'settled' },
}

export const SettledDark: Story = {
  args: { phase: 'settled' },
  globals: { theme: 'dark' },
}
