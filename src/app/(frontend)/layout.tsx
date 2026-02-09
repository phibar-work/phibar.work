import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Script from 'next/script'

import type React from 'react'
import { AdminBar } from '@/components/frontend/layout/AdminBar'
import { Footer } from '@/components/frontend/layout/Footer'
import { Header } from '@/components/frontend/layout/Header'
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
      </head>
      <body className="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 min-h-screen flex flex-col">
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
        <Script
          src="/api/script.js"
          data-site-id={process.env.NEXT_PUBLIC_RYBBIT_SITE_ID}
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
