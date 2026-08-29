import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { Geist } from 'next/font/google'
import Script from 'next/script'
import type { Metadata } from 'next'

import './globals.css'
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    // Sub-pages set only their own name; this appends the site name.
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: '/',
    title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
    description: SITE_DESCRIPTION,
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
}

const geistSans = Geist({
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Header for Google Analytics */}
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-FM6X8H0HCR`}
        />
        <Script id="gtag-init">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FM6X8H0HCR');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.className} min-h-screen bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
