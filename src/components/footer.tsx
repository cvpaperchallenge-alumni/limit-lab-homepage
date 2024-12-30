'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { PiXLogo } from 'react-icons/pi'
import { RxGithubLogo } from 'react-icons/rx'
import { RiGlobalLine } from 'react-icons/ri'
import { SiGitconnected } from 'react-icons/si'
import Link from 'next/link'
import blackAlumniLogo from '../../public/alumni-logo-with-wide-black.png'
import whiteAlumniLogo from '../../public/alumni-logo-with-wide-white.png'
import blackCCLogo from '../../public/cvpaper-logo-black.png'
import whiteCCLogo from '../../public/cvpaper-logo-white.png'

// shadcn/ui components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  const { theme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [hasHoverdAlumni, setHasHoveredAlumni] = useState(false)
  const [hasHoverdCC, setHasHoveredCC] = useState(false)

  useEffect(() => {
    if (theme) {
      setIsDarkMode(theme === 'dark')
    }
  }, [theme])

  return (
    <div className="flex h-44 w-full justify-center bg-secondary p-6 text-secondary-foreground">
      <div className="flex w-full max-w-[1500px] flex-col items-center justify-between md:flex-row">
        {/* Placeholder logo */}
        <div className="flex flex-col items-center gap-1 md:ml-10 md:items-start">
          <div className="mt-1 flex items-center space-x-2 md:mt-0">
            <Avatar className="size-6">
              <AvatarImage src="https://via.placeholder.com/24" alt="Logo" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <span className="text-xl font-bold">LIMIT Lab</span>
          </div>
          <div className="text-xxs text-sub">
            © 2024 LIMIT Lab. All rights reserved.
          </div>
        </div>

        <div className="block md:hidden">
          <div className="flex gap-2 text-xxxs md:pl-2 md:text-xxs">
            Developed by{' '}
            <span className="inline">cvpaper.challenge alumni community</span>
          </div>
        </div>

        <div className="hidden md:mr-10 md:flex md:flex-col md:items-start md:gap-0">
          <div className="pl-2 text-xxs">Supported by </div>
          <div
            className="flex items-center gap-4"
            onMouseEnter={() => setHasHoveredAlumni(true)}
          >
            <div className="group flex flex-col items-center gap-2">
              <Image
                alt="alumni logo"
                className="h-16 w-auto"
                priority={true}
                src={isDarkMode ? whiteAlumniLogo : blackAlumniLogo}
              />
              <div
                className={
                  'flex items-center gap-2 text-icon-fill group-hover:animate-fade-in-top ' +
                  (hasHoverdAlumni ? 'animate-fade-out-top' : 'invisible')
                }
              >
                <Link
                  href="https://github.com/cvpaperchallenge-alumni"
                  target="_blank"
                >
                  <RxGithubLogo className="size-5 hover:text-icon-accent" />
                </Link>
                <Separator
                  orientation="vertical"
                  className="h-5 bg-muted-foreground"
                />
                <Link href="https://twitter.com/cvpcalumni" target="_blank">
                  <PiXLogo className="size-5 hover:text-icon-accent" />
                </Link>
                <Separator
                  orientation="vertical"
                  className="h-5 bg-muted-foreground"
                />
                <Link
                  href="https://note.com/gatheluck/n/nc469f2f35426"
                  target="_blank"
                >
                  <RiGlobalLine className="size-5 hover:text-icon-accent" />
                </Link>
              </div>
            </div>
            <SiGitconnected className="size-5 -translate-y-3" />
            <div
              className="group flex flex-col items-center gap-2"
              onMouseEnter={() => setHasHoveredCC(true)}
            >
              <Image
                alt="cvpaper challenge logo"
                className="h-16 w-auto"
                priority={true}
                src={isDarkMode ? whiteCCLogo : blackCCLogo}
              />
              <div
                className={
                  'flex items-center gap-2 text-icon-fill group-hover:animate-fade-in-top ' +
                  (hasHoverdCC ? 'animate-fade-out-top' : 'invisible')
                }
              >
                <Link
                  href="https://github.com/cvpaperchallenge"
                  target="_blank"
                >
                  <RxGithubLogo className="size-5 hover:text-icon-accent" />
                </Link>
                <Separator
                  orientation="vertical"
                  className="h-5 bg-muted-foreground"
                />
                <Link href="https://x.com/CVpaperChalleng" target="_blank">
                  <PiXLogo className="size-5 hover:text-icon-accent" />
                </Link>
                <Separator
                  orientation="vertical"
                  className="h-5 bg-muted-foreground"
                />
                <Link href="https://xpaperchallenge.org/cv/" target="_blank">
                  <RiGlobalLine className="size-5 hover:text-icon-accent" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
