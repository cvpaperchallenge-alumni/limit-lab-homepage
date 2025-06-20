import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { Geist } from 'next/font/google'
import Script from 'next/script'

import './globals.css'

export const metadata = {
  title: 'LIMIT.Lab',
  description:
    'LIMIT.Lab builds multimodal AI foundation models that achieve real impact with limited compute and data.',
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
