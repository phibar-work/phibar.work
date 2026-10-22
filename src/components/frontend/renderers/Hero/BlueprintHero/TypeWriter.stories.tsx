import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TypeWriter } from './TypeWriter'
import './blueprint-hero.css'

const sampleCode = `resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}`

const meta = {
  title: 'Frontend/Renderers/Hero/BlueprintHero/TypeWriter',
  component: TypeWriter,
  tags: ['autodocs'],
  args: { text: sampleCode },
} satisfies Meta<typeof TypeWriter>

export default meta
type Story = StoryObj<typeof meta>

/** Types the text character by character with a blinking cursor. */
export const Typing: Story = {
  args: { active: true },
}

export const Slow: Story = {
  args: { active: true, speed: 120 },
}

/** Paused: typing stops and the cursor is hidden. */
export const Paused: Story = {
  args: { active: true, paused: true },
}

export const FadingOut: Story = {
  args: { active: true, fading: true },
}

/** Inactive renders an empty block. */
export const Inactive: Story = {
  args: { active: false },
}
