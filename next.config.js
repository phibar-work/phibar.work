import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
  async rewrites() {
    const rybbitHost = process.env.NEXT_PUBLIC_RYBBIT_HOST || 'https://rybbit.phibar.work'
    return {
      beforeFiles: [
        {
          source: '/api/script.js',
          destination: `${rybbitHost}/api/script.js`,
        },
        {
          source: '/api/track',
          destination: `${rybbitHost}/api/track`,
        },
        {
          source: '/api/site/:path*',
          destination: `${rybbitHost}/api/site/:path*`,
        },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
