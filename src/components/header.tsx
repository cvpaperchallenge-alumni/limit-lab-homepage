'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { RxMoon, RxSun, RxHamburgerMenu  } from 'react-icons/rx'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

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
} from "@/components/ui/dropdown-menu"

import blackVAMark from '../../public/visual_atoms_1_black.png'
import whiteVAMark from '../../public/visual_atoms_1_white.png'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState("top")
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
    <div className="w-full h-24 bg-secondary p-6 flex items-center text-secondary-foreground">
      <div className="flex w-full justify-between">
        {/* Logo + Title */}
        <div className="flex md:min-w-[600px] justify-between">
          <div className="flex items-center space-x-2">
            {/* Using shadcn/ui <Avatar> for the placeholder logo */}
            <Avatar className="size-8">
              <AvatarImage src="https://via.placeholder.com/32" alt="Logo" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <span className="text-xl font-bold">LIMIT Lab</span>
          </div>

          <Separator orientation="vertical" className='hidden md:block bg-muted-foreground'/>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-5 justify-between">
            <div
              className='flex group'
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
              <Button variant="link" asChild className="group-hover:animate-pulsate-fwd pl-0.5">
                <Link href="/">Top</Link>
              </Button>
            </div>
            <div
              className='flex group'
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
                  (hasHoveredPublications ? 'animate-rotate-out-center' : 'invisible')
                }
              />
              <Button variant="link" asChild className="hover:animate-pulsate-fwd pl-0.5">
                <Link href="/publications">Publications</Link>
              </Button>
            </div>
            <div
              className='flex group'
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
                  (hasHoveredContact ? 'animate-rotate-out-center' : 'invisible')
                }
              />
              <Button variant="link" asChild className="hover:animate-pulsate-fwd pl-0.5">
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
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
                  backgroundColor: isDarkMode ? 'var(--moon-icon)' : 'var(--sun-icon)'
                }}
              />
              <RxMoon className="size-4 text-moon-icon" />
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <RxHamburgerMenu className="size-6 md:hidden" />
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
  )
}
