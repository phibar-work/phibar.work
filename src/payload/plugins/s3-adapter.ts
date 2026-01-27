import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import type { Adapter, GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/types'

export interface S3AdapterConfig {
  bucket: string
  config: {
    credentials: {
      accessKeyId: string
      secretAccessKey: string
    }
    region: string
    endpoint?: string
    forcePathStyle?: boolean
  }
  acl?: 'private' | 'public-read'
}

export const s3Adapter = ({ bucket, config, acl = 'public-read' }: S3AdapterConfig): Adapter => {
  const s3Client = new S3Client({
    credentials: config.credentials,
    region: config.region,
    endpoint: config.endpoint,
    forcePathStyle: config.forcePathStyle,
  })

  return ({ prefix }): GeneratedAdapter => {
    const getKey = (filename: string) => {
      return prefix ? `${prefix}/${filename}` : filename
    }

    return {
      name: 's3',
      handleUpload: async ({ file }) => {
        const key = getKey(file.filename)

        await s3Client.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimeType,
            ACL: acl,
          }),
        )
      },
      handleDelete: async ({ filename }) => {
        const key = getKey(filename)

        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: bucket,
            Key: key,
          }),
        )
      },
      generateURL: ({ filename }) => {
        const key = getKey(filename)
        // For MinIO/S3, generate the public URL
        const endpoint = config.endpoint || `https://s3.${config.region}.amazonaws.com`
        return `${endpoint}/${bucket}/${key}`
      },
      staticHandler: async (_req, { params }) => {
        const key = getKey(params.filename)

        try {
          const response = await s3Client.send(
            new GetObjectCommand({
              Bucket: bucket,
              Key: key,
            }),
          )

          const body = await response.Body?.transformToByteArray()

          if (!body) {
            return new Response('Not Found', { status: 404 })
          }

          return new Response(Buffer.from(body), {
            status: 200,
            headers: {
              'Content-Type': response.ContentType || 'application/octet-stream',
              'Content-Length': String(response.ContentLength || body.length),
              'Cache-Control': 'public, max-age=31536000',
            },
          })
        } catch (_error) {
          return new Response('Not Found', { status: 404 })
        }
      },
    }
  }
}
