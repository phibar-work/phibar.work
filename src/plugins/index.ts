import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import type { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import type { Page } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { s3Adapter } from './s3-adapter'

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  cloudStoragePlugin({
    collections: {
      media: {
        adapter: s3Adapter({
          bucket: process.env.S3_BUCKET || 'media',
          config: {
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
            },
            region: process.env.S3_REGION || 'us-east-1',
            endpoint: process.env.S3_ENDPOINT,
            forcePathStyle: true, // Required for MinIO
          },
        }),
        disableLocalStorage: true,
        prefix: 'media',
      },
    },
  }),
]
