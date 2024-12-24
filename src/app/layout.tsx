'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import { ReactNode, useEffect, useState } from 'react'
import { RxMoon, RxSun } from 'react-icons/rx'
import Link from 'next/link'

import './globals.css'

// shadcn/ui components
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Spinner } from '@/components/ui/spinner'

// Next.js imports (inevitable)

export default function RootLayout({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (theme) {
      setIsDarkMode(theme === 'dark')
      setIsLoading(false)
    }
  }, [theme])
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange enableSystem>
          {/* Entire page container */}
          <Card className="flex min-h-screen flex-col">
            {/* Header */}
            <CardHeader className="bg-secondary text-secondary-foreground">
              <div className="flex w-full items-center justify-between">
                {/* Left: Logo + Title */}
                <div className="flex items-center space-x-2">
                  {/* Using shadcn/ui <Avatar> for the placeholder logo */}
                  <Avatar className="size-8">
                    <AvatarImage
                      src="https://via.placeholder.com/32"
                      alt="Logo"
                    />
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <span className="text-xl font-bold">Awesome Lab</span>
                </div>

                {/* Right: Navigation Links */}
                <div className="flex space-x-4">
                  <Button variant="link" asChild>
                    <Link href="/">Top</Link>
                  </Button>
                  <Button variant="link" asChild>
                    <Link href="/publications">Publications</Link>
                  </Button>
                  <Button variant="link" asChild>
                    <Link href="/contact">Contact</Link>
                  </Button>
                </div>

                {/* Theme Switcher */}
                {isLoading ?
                  <div className="flex w-24 flex-row justify-center">
                    <Spinner size="small" />
                  </div> :
                  <div className="flex items-center space-x-2">
                    <RxSun className="size-3"/>
                    <Switch
                      id="theme-mode"
                      checked={isDarkMode}
                      onCheckedChange={(checked) => {
                        setTheme(checked ? 'dark' : 'light')
                        setIsDarkMode(checked)
                      }}
                    />
                    <RxMoon className="size-3"/>
                  </div>
                }
              </div>
            </CardHeader>

            {/* Main Content */}
            <CardContent className="flex-1">{children}</CardContent>

            <Separator />

            {/* Footer */}
            <CardFooter className="flex flex-col items-center justify-between space-y-2 bg-muted text-muted-foreground md:flex-row md:space-y-0">
              {/* Placeholder logo */}
              <div className="flex items-center space-x-2">
                <Avatar className="size-6">
                  <AvatarImage src="https://via.placeholder.com/24" alt="Logo" />
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <span>Awesome Lab</span>
              </div>

              <div className="text-xs md:text-s">
                © 2024 Awesome Lab. All rights reserved.
              </div>

              <div className="text-xs md:text-s">
                Developed by{' '}
                <Button variant="link" asChild>
                  <a
                    href="https://example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    xxx
                  </a>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </ThemeProvider>
      </body>
    </html>
  )
}
