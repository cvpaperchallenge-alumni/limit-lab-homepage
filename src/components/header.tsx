'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { RxMoon, RxSun } from 'react-icons/rx'
import Link from 'next/link'

// shadcn/ui components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Spinner } from '@/components/ui/spinner'

export function Header() {
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
    <div className="w-full p-6 bg-secondary text-secondary-foreground">
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
    </div>
  )
}