'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { RxMoon, RxSun, RxHamburgerMenu } from 'react-icons/rx'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import blackVAMark from '../../public/visual_atoms_1_black.png'
import whiteVAMark from '../../public/visual_atoms_1_white.png'

// shadcn/ui components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Spinner } from '@/components/ui/spinner'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState('top')
  const [hasHoveredTop, setHasHoveredTop] = useState(false)
  const [hasHoveredPublications, setHasHoveredPublications] = useState(false)
  const [hasHoveredContact, setHasHoveredContact] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (theme) {
      setIsDarkMode(theme === 'dark')
      setIsLoading(false)
    }
  }, [theme])

  useEffect(() => {
    if (pathname === '/') setPage('top')
    else if (pathname.startsWith('/publications')) setPage('publication')
    else if (pathname.startsWith('/contact')) setPage('contact')
  }, [pathname])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setHasHoveredTop(false)
        setHasHoveredPublications(false)
        setHasHoveredContact(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex h-24 w-full justify-center bg-secondary p-6 text-secondary-foreground">
      <div className="flex w-full max-w-[1500px] justify-between">
        {/* Logo + Title */}
        <div className="flex justify-between gap-7 md:min-w-[550px]">
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage src="https://via.placeholder.com/32" alt="Logo" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <span className="text-xl font-bold">LIMIT Lab</span>
            <Separator
              orientation="vertical"
              className="ml-5 hidden bg-muted-foreground md:block"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden items-center justify-between space-x-5 md:flex">
            <Button
              variant="link"
              asChild
              className="group pl-0.5 font-semibold group-hover:animate-pulsate-fwd group-hover:no-underline"
            >
              <Link
                href="/"
                onMouseEnter={() => setHasHoveredTop(true)}
                onMouseLeave={() => {}}
              >
                <Image
                  alt="VA mark"
                  src={isDarkMode ? whiteVAMark : blackVAMark}
                  width={32}
                  height={32}
                  className={
                    `group-hover:animate-rotate-in-center ` +
                    (hasHoveredTop ? 'animate-rotate-out-center' : 'invisible')
                  }
                />
                <span
                  className={
                    page === 'top'
                      ? 'text-accent-foreground'
                      : 'text-sub group-hover:text-secondary-foreground'
                  }
                >
                  Top
                </span>
              </Link>
            </Button>
            <Button
              variant="link"
              asChild
              className="group pl-0.5 font-semibold group-hover:animate-pulsate-fwd group-hover:no-underline"
            >
              <Link
                href="/publications"
                onMouseEnter={() => setHasHoveredPublications(true)}
                onMouseLeave={() => {}}
              >
                <Image
                  alt="VA mark"
                  src={isDarkMode ? whiteVAMark : blackVAMark}
                  width={32}
                  height={32}
                  className={
                    `group-hover:animate-rotate-in-center ` +
                    (hasHoveredPublications
                      ? 'animate-rotate-out-center'
                      : 'invisible')
                  }
                />
                <span
                  className={
                    page === 'publication'
                      ? 'text-accent-foreground'
                      : 'text-sub group-hover:text-secondary-foreground'
                  }
                >
                  Publications
                </span>
              </Link>
            </Button>
            <Button
              variant="link"
              asChild
              className="group pl-0.5 font-semibold group-hover:animate-pulsate-fwd group-hover:no-underline"
            >
              <Link
                href="/contact"
                onMouseEnter={() => setHasHoveredContact(true)}
                onMouseLeave={() => {}}
              >
                <Image
                  alt="VA mark"
                  src={isDarkMode ? whiteVAMark : blackVAMark}
                  width={32}
                  height={32}
                  className={
                    `group-hover:animate-rotate-in-center ` +
                    (hasHoveredContact
                      ? 'animate-rotate-out-center'
                      : 'invisible')
                  }
                />
                <span
                  className={
                    page === 'contact'
                      ? 'text-accent-foreground'
                      : 'text-sub group-hover:text-secondary-foreground'
                  }
                >
                  Contact
                </span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Theme Switcher */}
        <div className="flex items-center space-x-6">
          {isLoading ? (
            <div className="flex w-24 flex-row justify-center">
              <Spinner size="small" />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <RxSun className="size-4 text-sun-icon" />
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
              <RxMoon className="size-4 text-moon-icon" />
            </div>
          )}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <RxHamburgerMenu className="size-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Pages</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={page}>
                  <DropdownMenuRadioItem
                    value="top"
                    isDarkMode={isDarkMode}
                    onClick={() => router.push('/')}
                  >
                    Top
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="publication"
                    isDarkMode={isDarkMode}
                    onClick={() => router.push('/publications')}
                  >
                    Publications
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="contact"
                    isDarkMode={isDarkMode}
                    onClick={() => router.push('/contact')}
                  >
                    Contact
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}
