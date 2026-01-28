import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CMSLink } from './index'

const meta = {
  title: 'Frontend/Fields/CMSLink',
  component: CMSLink,
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      control: 'select',
      options: ['inline', 'default', 'destructive', 'ghost', 'link', 'outline', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    type: {
      control: 'select',
      options: ['custom', 'reference'],
    },
  },
} satisfies Meta<typeof CMSLink>

export default meta
type Story = StoryObj<typeof meta>

export const InlineLink: Story = {
  args: {
    type: 'custom',
    url: '/about',
    label: 'About Us',
    appearance: 'inline',
  },
}

export const ButtonDefault: Story = {
  args: {
    type: 'custom',
    url: '/contact',
    label: 'Contact',
    appearance: 'default',
  },
}

export const ButtonOutline: Story = {
  args: {
    type: 'custom',
    url: '/services',
    label: 'Our Services',
    appearance: 'outline',
  },
}

export const ButtonSecondary: Story = {
  args: {
    type: 'custom',
    url: '/pricing',
    label: 'View Pricing',
    appearance: 'secondary',
  },
}

export const ButtonGhost: Story = {
  args: {
    type: 'custom',
    url: '/docs',
    label: 'Documentation',
    appearance: 'ghost',
  },
}

export const LinkVariant: Story = {
  args: {
    type: 'custom',
    url: '/help',
    label: 'Get Help',
    appearance: 'link',
  },
}

export const SmallButton: Story = {
  args: {
    type: 'custom',
    url: '/signup',
    label: 'Sign Up',
    appearance: 'default',
    size: 'sm',
  },
}

export const LargeButton: Story = {
  args: {
    type: 'custom',
    url: '/start',
    label: 'Get Started',
    appearance: 'default',
    size: 'lg',
  },
}

export const ExternalLink: Story = {
  args: {
    type: 'custom',
    url: 'https://example.com',
    label: 'External Site',
    appearance: 'outline',
    newTab: true,
  },
}

export const WithChildren: Story = {
  args: {
    type: 'custom',
    url: '/home',
    appearance: 'inline',
    children: 'Custom child content',
  },
}

export const ReferenceLink: Story = {
  args: {
    type: 'reference',
    reference: {
      relationTo: 'pages',
      value: {
        id: 1,
        slug: 'about-us',
        title: 'About Us',
      } as any,
    },
    label: 'About Us',
    appearance: 'inline',
  },
}

export const ReferenceLinkAsButton: Story = {
  args: {
    type: 'reference',
    reference: {
      relationTo: 'pages',
      value: {
        id: 2,
        slug: 'services',
        title: 'Services',
      } as any,
    },
    label: 'Our Services',
    appearance: 'default',
  },
}

export const ReferenceWithStringValue: Story = {
  args: {
    type: 'reference',
    reference: {
      relationTo: 'pages',
      value: 'page-id-123',
    },
    url: '/fallback',
    label: 'Referenced Page',
    appearance: 'inline',
  },
}

export const NoHrefRendersNull: Story = {
  args: {
    type: 'reference',
    reference: null,
    url: null,
    label: 'Broken Link',
    appearance: 'inline',
  },
}
