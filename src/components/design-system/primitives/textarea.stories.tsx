import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './label'
import { Textarea } from './textarea'

const meta = {
  title: 'Design System/Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    disabled: true,
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here..." id="message" />
    </div>
  ),
}
