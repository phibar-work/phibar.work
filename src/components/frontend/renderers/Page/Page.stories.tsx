import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FooterContent } from '@/components/frontend/layout/Footer/FooterContent'
import { HeaderClient } from '@/components/frontend/layout/Header/HeaderClient'
import { HeaderThemeProvider } from '@/components/frontend/providers/HeaderTheme'
import { RenderPage } from './index'
import { mockBannerPage, mockFooter, mockHeader, mockHomePage, mockPlainPage } from './page.mocks'

/**
 * Full pages as the site renders them: the same Header, page body and Footer
 * as `app/(frontend)/layout.tsx`, with mock CMS data instead of Payload.
 * ThemeProvider is left out on purpose: it would override the Storybook theme toolbar.
 */
const meta = {
  title: 'Frontend/Pages/Page',
  component: RenderPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <HeaderThemeProvider>
        <div className="min-h-screen flex flex-col bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
          <HeaderClient data={mockHeader} />
          <main>
            <Story />
          </main>
          <FooterContent data={mockFooter} />
        </div>
      </HeaderThemeProvider>
    ),
  ],
} satisfies Meta<typeof RenderPage>

export default meta
type Story = StoryObj<typeof meta>

export const Home: Story = {
  args: { page: mockHomePage },
}

export const HomeDark: Story = {
  args: { page: mockHomePage },
  globals: { theme: 'dark' },
}

export const BannerPage: Story = {
  args: { page: mockBannerPage },
}

export const PlainPage: Story = {
  args: { page: mockPlainPage },
}

export const EmptyPage: Story = {
  args: { page: { title: 'Empty', hero: { type: 'none' }, sections: [] } },
}
