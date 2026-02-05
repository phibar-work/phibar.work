import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import type { Header } from '@/payload-types'
import { HeaderThemeProvider } from '../../providers/HeaderTheme'
import { HeaderClient } from './HeaderClient'

const mockHeaderData: Header = {
  id: '1',
  navItems: [
    { link: { type: 'custom', url: '/', label: 'Home' } },
    { link: { type: 'custom', url: '/about', label: 'About' } },
    { link: { type: 'custom', url: '/contact', label: 'Contact' } },
  ],
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
}

const meta = {
  title: 'Frontend/Layout/HeaderClient',
  component: HeaderClient,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <HeaderThemeProvider>
        <Story />
      </HeaderThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HeaderClient>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: mockHeaderData,
  },
}

export const SingleNavItem: Story = {
  args: {
    data: {
      ...mockHeaderData,
      navItems: [{ link: { type: 'custom', url: '/', label: 'Home' } }],
    },
  },
}

export const ManyNavItems: Story = {
  args: {
    data: {
      ...mockHeaderData,
      navItems: [
        { link: { type: 'custom', url: '/', label: 'Home' } },
        { link: { type: 'custom', url: '/about', label: 'About' } },
        { link: { type: 'custom', url: '/services', label: 'Services' } },
        { link: { type: 'custom', url: '/blog', label: 'Blog' } },
        { link: { type: 'custom', url: '/contact', label: 'Contact' } },
      ],
    },
  },
}

export const NoNavItems: Story = {
  args: {
    data: {
      ...mockHeaderData,
      navItems: [],
    },
  },
}
