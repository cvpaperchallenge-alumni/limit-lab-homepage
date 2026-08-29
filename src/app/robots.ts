import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/site'

// `output: 'export'` emits this as a static /robots.txt at build time.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: new URL('/sitemap.xml', SITE_URL).toString(),
  }
}
