import type { Metadata } from 'next'

/**
 * Single source of truth for site-level identity used by metadata,
 * `sitemap.ts` and `robots.ts`.
 */
export const SITE_NAME = 'LIMIT.Lab'

export const SITE_URL = 'https://limitlab.xyz'

export const SITE_DESCRIPTION =
  'LIMIT.Lab builds multimodal AI foundation models that achieve real impact with limited compute and data.'

/**
 * Every route in the site. `next.config.ts` sets `trailingSlash: true`, so the
 * canonical form of each URL carries a trailing slash.
 */
export const SITE_ROUTES = [
  '/',
  '/publications/',
  '/events-reports/',
  '/contact/',
] as const

/** Shared social preview card. Referenced by the root layout and every page. */
export const OG_IMAGE = {
  url: '/og-1200x630.jpg',
  width: 1200,
  height: 630,
  alt: 'LIMIT.Lab — Limited Resources, Unlimited Impact with Multimodal AI Models',
} as const

/**
 * Builds metadata for a sub-page. Keeps the document title, the canonical URL
 * and the OpenGraph / Twitter variants in sync from a single definition.
 *
 * Next.js merges metadata per top-level key, not deeply: a page that sets
 * `openGraph` or `twitter` REPLACES the root layout's object instead of
 * extending it. So every field that must survive — the image, the card type,
 * `type`, `siteName`, `locale` — has to be restated here rather than inherited.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: (typeof SITE_ROUTES)[number]
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      title,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
    },
  }
}
