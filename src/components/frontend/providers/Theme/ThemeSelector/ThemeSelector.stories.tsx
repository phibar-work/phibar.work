import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, within } from 'storybook/test'
import { ThemeProvider } from '..'
import { ThemeSelector } from './index'

const meta = {
  title: 'Frontend/Providers/ThemeSelector',
  component: ThemeSelector,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SelectAutoTheme: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox')
    await userEvent.click(trigger)
    const option = await within(document.body).findByRole('option', { name: 'Auto' })
    await userEvent.click(option)
    await expect(trigger).toHaveTextContent('Auto')
  },
}

export const SelectDarkTheme: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox')
    await userEvent.click(trigger)
    const option = await within(document.body).findByRole('option', { name: 'Dark' })
    await userEvent.click(option)
    await expect(trigger).toHaveTextContent('Dark')
  },
}
