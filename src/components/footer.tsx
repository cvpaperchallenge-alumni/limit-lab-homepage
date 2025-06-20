'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { PiXLogo } from 'react-icons/pi'
import { RxGithubLogo, RxCross1 } from 'react-icons/rx'
import { RiGlobalLine } from 'react-icons/ri'
import { SiGitconnected } from 'react-icons/si'
import Link from 'next/link'
import blackAlumniLogo from '../../public/alumni-logo-with-wide-black.png'
import whiteAlumniLogo from '../../public/alumni-logo-with-wide-white.png'
import blackCCLogo from '../../public/cvpaper-logo-black.png'
import whiteCCLogo from '../../public/cvpaper-logo-white.png'
import whiteLimitLabLogoWide from '../../public/limitlab-logo-white-wide.png'
import blackLimitLabLogoWide from '../../public/limitlab-logo-black-wide.png'

// shadcn/ui components
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
    <div className="flex min-h-44 w-full justify-center bg-secondary p-4 py-6 text-secondary-foreground sm:p-6">
      <div className="flex w-full max-w-[1500px] flex-col items-center justify-between gap-6 sm:gap-4 md:flex-row">
        {/* Placeholder logo */}
        <div className="flex flex-col items-center gap-1 md:ml-4 md:items-center lg:ml-10">
          <div className="flex items-center space-x-2">
            <Image
              alt="limit.lab logo"
              className="h-20 w-auto sm:h-20"
              priority={true}
              src={isDarkMode ? whiteLimitLabLogoWide : blackLimitLabLogoWide}
            />
          </div>
          <div className="text-xs text-sub">
            © 2025 LIMIT.Lab. All rights reserved.
          </div>
        </div>

        {/* Mobile view for supported by text */}
        <div className="flex flex-col items-center gap-2 md:hidden">
          <div className="text-xs">Supported by</div>
          <div className="flex flex-col items-center gap-px">
            <Link
              href="https://github.com/cvpaperchallenge-alumni"
              target="_blank"
              className="flex gap-2 text-xs text-accent-foreground"
            >
              cvpaper.challenge alumni community
            </Link>
            <RxCross1 className="size-2" />
            <Link
              href="https://xpaperchallenge.org/cv/"
              target="_blank"
              className="flex gap-2 text-xs text-accent-foreground"
            >
              cvpaper.challenge
            </Link>
          </div>
        </div>

        {/* Desktop view with logos */}
        <div className="hidden md:mr-4 md:flex md:flex-col md:items-start md:gap-0 lg:mr-10">
          <div className="pl-2 text-xs">Supported by </div>
          <div
            className="flex items-center gap-4"
            onMouseEnter={() => setHasHoveredAlumni(true)}
          >
            <div className="group flex flex-col items-center gap-2">
              <Image
                alt="alumni logo"
                className="h-12 w-auto sm:h-16"
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
                  <RiGlobalLine className="size-4 hover:text-icon-accent sm:size-5" />
                </Link>
              </div>
            </div>
            <SiGitconnected className="size-4 -translate-y-2 sm:size-5 sm:-translate-y-3" />
            <div
              className="group flex flex-col items-center gap-2"
              onMouseEnter={() => setHasHoveredCC(true)}
            >
              <Image
                alt="cvpaper challenge logo"
                className="h-12 w-auto sm:h-16"
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
                  <RxGithubLogo className="size-4 hover:text-icon-accent sm:size-5" />
                </Link>
                <Separator
                  orientation="vertical"
                  className="h-4 bg-muted-foreground sm:h-5"
                />
                <Link href="https://x.com/CVpaperChalleng" target="_blank">
                  <PiXLogo className="size-4 hover:text-icon-accent sm:size-5" />
                </Link>
                <Separator
                  orientation="vertical"
                  className="h-4 bg-muted-foreground sm:h-5"
                />
                <Link href="https://xpaperchallenge.org/cv/" target="_blank">
                  <RiGlobalLine className="size-4 hover:text-icon-accent sm:size-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
