import type { Metadata, Viewport } from 'next'
import { draftMode } from 'next/headers'
import Script from 'next/script'

import type React from 'react'
import { AdminBar } from '@/components/frontend/layout/AdminBar'
import { Frame } from '@/components/frontend/layout/Frame'
import { Providers } from '@/components/frontend/providers'
import { InitTheme } from '@/components/frontend/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <meta
          name="theme-color"
          content="#f4f4f5"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#27272a"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body className="text-zinc-950 dark:text-zinc-50" style={{ background: 'var(--frame-bg)' }}>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Frame>
            <main>{children}</main>
          </Frame>
        </Providers>
        <Script id="deployment-info" strategy="beforeInteractive">
          {`console.log('%c[Deployment Info]', 'color: #00ff00; font-weight: bold', {
  version: '1.12.0',
  rybbitSiteId: '${process.env.NEXT_PUBLIC_RYBBIT_SITE_ID || 'NOT_SET'}',
  rybbitHost: '${process.env.NEXT_PUBLIC_RYBBIT_HOST || 'NOT_SET'}',
  timestamp: new Date().toISOString()
});`}
        </Script>
        <Script
          src={`${process.env.NEXT_PUBLIC_RYBBIT_HOST || 'https://rybbit.phibar.work'}/api/script.js`}
          data-site-id={process.env.NEXT_PUBLIC_RYBBIT_SITE_ID}
          defer
        />
      </body>
    </html>
  )
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
