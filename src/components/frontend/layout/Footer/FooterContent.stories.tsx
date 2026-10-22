import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { mockFooter } from '@/components/frontend/renderers/Page/page.mocks'
import { FooterContent } from './FooterContent'

const meta = {
  title: 'Frontend/Layout/FooterContent',
  component: FooterContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof FooterContent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { data: mockFooter },
}

export const ManyNavItems: Story = {
  args: {
    data: {
      ...mockFooter,
      navItems: [
        { link: { type: 'custom', url: '/imprint', label: 'Imprint' } },
        { link: { type: 'custom', url: '/privacy', label: 'Privacy' } },
        { link: { type: 'custom', url: '/terms', label: 'Terms' } },
        { link: { type: 'custom', url: 'https://github.com', label: 'GitHub', newTab: true } },
      ],
    },
  },
}

export const NoNavItems: Story = {
  args: { data: { ...mockFooter, navItems: [] } },
}

export const NullNavItems: Story = {
  args: { data: { ...mockFooter, navItems: null } },
}
