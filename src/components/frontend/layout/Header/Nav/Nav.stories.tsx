import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import type { Header } from '@/payload-types'
import { HeaderNav } from './index'

const mockHeaderData: Header = {
  id: '1',
  navItems: [
    {
      link: {
        type: 'custom',
        url: '/',
        label: 'Home',
      },
    },
    {
      link: {
        type: 'custom',
        url: '/about',
        label: 'About',
      },
    },
    {
      link: {
        type: 'custom',
        url: '/contact',
        label: 'Contact',
      },
    },
  ],
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
}

const meta = {
  title: 'Frontend/Layout/HeaderNav',
  component: HeaderNav,
  tags: ['autodocs'],
} satisfies Meta<typeof HeaderNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: mockHeaderData,
  },
}

export const SingleItem: Story = {
  args: {
    data: {
      ...mockHeaderData,
      navItems: [
        {
          link: {
            type: 'custom',
            url: '/',
            label: 'Home',
          },
        },
      ],
    },
  },
}

export const ManyItems: Story = {
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

export const Empty: Story = {
  args: {
    data: {
      ...mockHeaderData,
      navItems: [],
    },
  },
}
