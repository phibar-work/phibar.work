import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Input } from './input'
import { Label } from './label'

const meta = {
  title: 'Design System/Primitives/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// -- Visual states --

export const Default: Story = {}

export const WithPlaceholder: Story = {
  args: { placeholder: 'Enter your email...' },
}

export const Disabled: Story = {
  args: { placeholder: 'Disabled input', disabled: true },
}

export const Email: Story = {
  args: { type: 'email', placeholder: 'name@example.com' },
}

export const Password: Story = {
  args: { type: 'password', placeholder: 'Enter password' },
}

// -- Interaction tests --

export const AcceptsTyping: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')
    await userEvent.type(input, 'Hello world')
    await expect(input).toHaveValue('Hello world')
  },
}

export const DisabledPreventsInput: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')
    await expect(input).toBeDisabled()
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="name@example.com" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText('Email')
    await userEvent.type(input, 'test@example.com')
    await expect(input).toHaveValue('test@example.com')
  },
}
