import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Providers } from './index'

const meta = {
  title: 'Frontend/Providers',
  component: Providers,
  tags: ['autodocs'],
} satisfies Meta<typeof Providers>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Content inside Providers</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          This content is wrapped with Theme and HeaderTheme providers.
        </p>
      </div>
    ),
  },
}
