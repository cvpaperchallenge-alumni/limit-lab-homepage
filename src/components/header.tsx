'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { RxMoon, RxSun, RxHamburgerMenu } from 'react-icons/rx'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import whiteLimitLabLogoWide from '../../public/limitlab-logo-white-wide.png'
import blackLimitLabLogoWide from '../../public/limitlab-logo-black-wide.png'

// shadcn/ui components
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Spinner } from '@/components/ui/spinner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navItems = [
  { key: 'top', label: 'Top', href: '/' },
  { key: 'publication', label: 'Publications', href: '/publications' },
  { key: 'events-reports', label: 'Events & Reports', href: '/events-reports' },
  { key: 'contact', label: 'Contact', href: '/contact' },
] as const

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState<string>('top')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (resolvedTheme) {
      setIsDarkMode(resolvedTheme === 'dark')
      setIsLoading(false)
    }
  }, [resolvedTheme])

  useEffect(() => {
    if (pathname === '/') setPage('top')
    else if (pathname.startsWith('/publications')) setPage('publication')
    else if (pathname.startsWith('/events-reports')) setPage('events-reports')
    else if (pathname.startsWith('/contact')) setPage('contact')
  }, [pathname])

  return (
    <header className="border-border/50 bg-background/70 fixed top-0 z-50 flex w-full justify-center border-b backdrop-blur-xl">
      <div className="flex h-20 w-full max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center transition-transform hover:scale-[1.02]"
        >
          <Image
            alt="LIMIT.Lab logo"
            className="h-12 w-auto sm:h-14"
            priority={true}
            src={isDarkMode ? whiteLimitLabLogoWide : blackLimitLabLogoWide}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = page === item.key
            return (
              <Link
                key={item.key}
                href={item.href}
                className={
                  'rounded-lg px-4 py-2 text-sm transition-colors ' +
                  (isActive
                    ? 'bg-brand-blue-a4 font-semibold text-brand-blue-11'
                    : 'text-foreground/70 font-medium hover:bg-brand-blue-a3 hover:text-foreground')
                }
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Right cluster: theme toggle + mobile menu */}
        <div className="flex items-center gap-3 sm:gap-4">
          {isLoading ? (
            <div className="flex w-16 justify-center">
              <Spinner size="small" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <RxSun className="size-3.5 text-sun-icon sm:size-4" />
              <Switch
                id="theme-mode"
                checked={isDarkMode}
                onCheckedChange={(checked) => {
                  setTheme(checked ? 'dark' : 'light')
                  setIsDarkMode(checked)
                }}
                style={{
                  backgroundColor: isDarkMode
                    ? 'var(--moon-icon)'
                    : 'var(--sun-icon)',
                }}
              />
              <RxMoon className="size-3.5 text-moon-icon sm:size-4" />
            </div>
          )}
          <div className="md:hidden">
            {isLoading ? (
              <Button variant="ghost" size="icon" disabled aria-label="Menu">
                <RxHamburgerMenu className="size-6" />
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <RxHamburgerMenu className="size-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Pages</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={page}>
                    {navItems.map((item) => (
                      <DropdownMenuRadioItem
                        key={item.key}
                        value={item.key}
                        isDarkMode={isDarkMode}
                        onClick={() => router.push(item.href)}
                      >
                        {item.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
