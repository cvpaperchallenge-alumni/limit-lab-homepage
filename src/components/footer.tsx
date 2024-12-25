'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { PiXLogo } from 'react-icons/pi'
import { RxGithubLogo } from 'react-icons/rx'
import { RiGlobalLine } from 'react-icons/ri'
import Link from 'next/link'
import blackAlumniLogo from '../../public/alumni-logo-with-wide-black-trimmed.png'
import whiteAlumniLogo from '../../public/alumni-logo-with-wide-white-trimmed.png'

// shadcn/ui components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  const { theme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (theme) {
      setIsDarkMode(theme === 'dark')
    }
  }, [theme])

  return (
    <div className="flex h-44 w-full justify-center bg-secondary p-6 text-secondary-foreground">
      <div className="flex w-full max-w-[1500px] flex-col items-center justify-between md:flex-row">
        {/* Placeholder logo */}
        <div className="flex flex-col items-center gap-1">
          <div className="mt-1 flex items-center space-x-2 md:ml-10 md:mt-0">
            <Avatar className="size-6">
              <AvatarImage src="https://via.placeholder.com/24" alt="Logo" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <span className="text-xl font-bold">LIMIT Lab</span>
          </div>
          <div className="text-xxs text-sub md:hidden">
            © 2024 LIMIT Lab. All rights reserved.
          </div>
        </div>

        <div className="hidden text-sub md:mt-0 md:block md:text-s">
          © 2024 LIMIT Lab. All rights reserved.
        </div>

        <div className="flex flex-col-reverse items-center gap-2 md:mr-10 md:flex-col md:items-start md:gap-0">
          <div className="flex gap-2 text-xxxs md:pl-2 md:text-xxs">
            Developed by{' '}
            <span className="inline md:hidden">
              cvpaper.challenge alumni community
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 text-sub">
            <Image
              alt="alumni logo"
              className="hidden h-auto w-40 md:block"
              priority={true}
              sizes="100vw"
              src={isDarkMode ? whiteAlumniLogo : blackAlumniLogo}
            />
            <div className="flex items-center gap-2">
              <Link
                href="https://github.com/cvpaperchallenge-alumni"
                target="_blank"
              >
                <RxGithubLogo className="size-5" />
              </Link>
              <Separator
                orientation="vertical"
                className="hidden h-5 bg-muted-foreground md:block"
              />
              <Link href="https://twitter.com/cvpcalumni" target="_blank">
                <PiXLogo className="size-5" />
              </Link>
              <Separator
                orientation="vertical"
                className="hidden h-5 bg-muted-foreground md:block"
              />
              <Link
                href="https://note.com/gatheluck/n/nc469f2f35426"
                target="_blank"
              >
                <RiGlobalLine className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
