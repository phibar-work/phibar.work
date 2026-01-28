import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Label } from './label'
import { Textarea } from './textarea'

const meta = {
  title: 'Design System/Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

// -- Visual states --

export const Default: Story = {}

export const WithPlaceholder: Story = {
  args: { placeholder: 'Type your message here...' },
}

export const Disabled: Story = {
  args: { placeholder: 'Disabled textarea', disabled: true },
}

// -- Interaction tests --

export const AcceptsTyping: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole('textbox')
    await userEvent.type(textarea, 'Hello world')
    await expect(textarea).toHaveValue('Hello world')
  },
}

export const DisabledPreventsInput: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole('textbox')
    await expect(textarea).toBeDisabled()
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here..." id="message" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByLabelText('Your message')
    await userEvent.type(textarea, 'Some text')
    await expect(textarea).toHaveValue('Some text')
  },
}
