import type { MetadataRoute } from 'next'

import { SITE_ROUTES, SITE_URL } from '@/lib/site'

// `output: 'export'` emits this as a static /sitemap.xml at build time.
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_ROUTES.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }))
}
