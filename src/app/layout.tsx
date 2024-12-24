import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange enableSystem>
            {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
