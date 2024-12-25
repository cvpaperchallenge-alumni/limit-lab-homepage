'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { RxMoon, RxSun, RxHamburgerMenu  } from 'react-icons/rx'
import Link from 'next/link'

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

  useEffect(() => {
    if (theme) {
      setIsDarkMode(theme === 'dark')
      setIsLoading(false)
    }
  }, [theme])

  return (
    <div className="w-full bg-secondary p-6 text-secondary-foreground">
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
            {/* <Avatar>
              <AvatarImage src='../../public/visual_atoms_1_black.png' />
              <AvatarFallback>VA</AvatarFallback>
            </Avatar> */}
            <div className='flex group'>
              <Image
                alt="VA mark"
                src={isDarkMode ? whiteVAMark : blackVAMark}
                width={32}
                height={32}
                className='animate-rotate-out-center group-hover:animate-rotate-in-center'
              />
              <Button variant="link" asChild className="group-hover:animate-pulsate-fwd pl-0.5">
            <Link href="/">Top</Link>
          </Button>
            </div>
            <div className='flex group'>
              <Image
                alt="VA mark"
                src={isDarkMode ? whiteVAMark : blackVAMark}
                width={32}
                height={32}
                className='animate-rotate-out-center group-hover:animate-rotate-in-center'
              />
              <Button variant="link" asChild className="hover:animate-pulsate-fwd pl-0.5">
            <Link href="/publications">Publications</Link>
          </Button>
            </div>
            <div className='flex group'>
            <Image
                alt="VA mark"
                src={isDarkMode ? whiteVAMark : blackVAMark}
                width={32}
                height={32}
                className='animate-rotate-out-center group-hover:animate-rotate-in-center'
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
              <DropdownMenuRadioGroup value={page} onValueChange={setPage}>
                <DropdownMenuRadioItem
                  value="top"
                  isDarkMode={isDarkMode}
                >
                  Top
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="publication"
                  isDarkMode={isDarkMode}
                >
                  Publications
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="contact"
                  isDarkMode={isDarkMode}
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
