import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  const encodedCacheTag = cacheTag && cacheTag !== '' ? encodeURIComponent(cacheTag) : null

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return encodedCacheTag ? `${url}?${encodedCacheTag}` : url
  }

  // Otherwise prepend client-side URL
  const baseUrl = getClientSideURL()
  return encodedCacheTag ? `${baseUrl}${url}?${encodedCacheTag}` : `${baseUrl}${url}`
}
