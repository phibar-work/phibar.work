import type { Meta, StoryObj } from '@storybook/nextjs-vite'
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
