import type { Footer as FooterData } from '@/payload-types'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { FooterContent } from './FooterContent'

export async function Footer() {
  const footerData: FooterData = await getCachedGlobal('footer', 1)()

  return <FooterContent data={footerData} />
}
