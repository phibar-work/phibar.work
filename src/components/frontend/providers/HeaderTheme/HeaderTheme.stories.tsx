import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { HeaderThemeProvider, useHeaderTheme } from './index'

const ThemeDisplay = () => {
  const { headerTheme } = useHeaderTheme()
  return (
    <div className="p-4">
      <p>Current header theme: {headerTheme ?? 'undefined'}</p>
    </div>
  )
}

const meta = {
  title: 'Frontend/Providers/HeaderTheme',
  component: HeaderThemeProvider,
  tags: ['autodocs'],
} satisfies Meta<typeof HeaderThemeProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <ThemeDisplay />,
  },
}
