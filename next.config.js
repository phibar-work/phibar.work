import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },
  output: 'standalone',
  experimental: {
    inlineCss: true,
  },
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https:",
              "frame-ancestors 'self'",
            ].join('; '),
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  async rewrites() {
    const rybbitHost = process.env.NEXT_PUBLIC_RYBBIT_HOST || 'https://rybbit.phibar.work'
    return {
      beforeFiles: [
        // Rybbit analytics - forward all matching paths
        {
          source: '/api/:path(script|replay).js',
          destination: `${rybbitHost}/api/:path.js`,
        },
        {
          source: '/api/track',
          destination: `${rybbitHost}/api/track`,
        },
        {
          source: '/api/site/:path*',
          destination: `${rybbitHost}/api/site/:path*`,
        },
        {
          source: '/api/session-replay/:path*',
          destination: `${rybbitHost}/api/session-replay/:path*`,
        },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
