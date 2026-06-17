'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { PiXLogo } from 'react-icons/pi'
import { RxGithubLogo } from 'react-icons/rx'
import { RiGlobalLine } from 'react-icons/ri'
import Link from 'next/link'
import blackAlumniLogo from '../../public/alumni-logo-with-wide-black.png'
import whiteAlumniLogo from '../../public/alumni-logo-with-wide-white.png'
import blackCCLogo from '../../public/cvpaper-logo-black.png'
import whiteCCLogo from '../../public/cvpaper-logo-white.png'
import whiteLimitLabLogoWide from '../../public/limitlab-logo-white-wide.png'
import blackLimitLabLogoWide from '../../public/limitlab-logo-black-wide.png'

const pageLinks = [
  { label: 'Top', href: '/' },
  { label: 'Publications', href: '/publications' },
  { label: 'Events & Reports', href: '/events-reports' },
  { label: 'Contact', href: '/contact' },
]

const workshopLinks = [
  {
    label: 'ECCV 2026 LIMIT',
    href: 'https://eccv2026-limit-workshop.limitlab.xyz',
  },
  {
    label: 'CVPR 2026 VGI',
    href: 'https://cvpr2026-vgi-workshop.limitlab.xyz',
  },
  {
    label: 'CVPR 2026 BigMAC',
    href: 'https://cvpr2026-bigmac-workshop.limitlab.xyz',
  },
  {
    label: 'ICCV 2025 LIMIT',
    href: 'https://iccv2025-limit-workshop.limitlab.xyz',
  },
  {
    label: 'ICCV 2025 FOUND',
    href: 'https://iccv2025-found-workshop.limitlab.xyz',
  },
]

export function Footer() {
  const { theme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (theme) {
      setIsDarkMode(theme === 'dark')
    }
  }, [theme])

  return (
    <footer className="border-border/50 bg-background/60 mt-24 flex w-full justify-center border-t backdrop-blur-xl">
      <div className="flex w-full max-w-[1500px] flex-col gap-12 px-6 py-12 md:py-16 lg:px-10">
        {/* Top grid: brand + columns */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col items-start gap-4">
            <Image
              alt="LIMIT.Lab logo"
              className="h-16 w-auto"
              priority={false}
              src={isDarkMode ? whiteLimitLabLogoWide : blackLimitLabLogoWide}
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Limited resources, unlimited impact with multimodal AI foundation
              models. An international research collective.
            </p>
          </div>

          {/* Pages */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              Pages
            </h3>
            <div className="flex flex-col gap-2">
              {pageLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Workshops */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              Workshops
            </h3>
            <div className="flex flex-col gap-2">
              {workshopLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Supported by */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              Supported by
            </h3>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Image
                  alt="cvpaper.challenge alumni logo"
                  className="h-10 w-auto"
                  priority={false}
                  src={isDarkMode ? whiteAlumniLogo : blackAlumniLogo}
                />
                <div className="flex items-center gap-3 text-icon-fill">
                  <Link
                    href="https://github.com/cvpaperchallenge-alumni"
                    target="_blank"
                    aria-label="alumni GitHub"
                  >
                    <RxGithubLogo className="size-4 transition-colors hover:text-icon-accent" />
                  </Link>
                  <Link
                    href="https://twitter.com/cvpcalumni"
                    target="_blank"
                    aria-label="alumni X"
                  >
                    <PiXLogo className="size-4 transition-colors hover:text-icon-accent" />
                  </Link>
                  <Link
                    href="https://note.com/gatheluck/n/nc469f2f35426"
                    target="_blank"
                    aria-label="alumni website"
                  >
                    <RiGlobalLine className="size-4 transition-colors hover:text-icon-accent" />
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Image
                  alt="cvpaper.challenge logo"
                  className="h-10 w-auto"
                  priority={false}
                  src={isDarkMode ? whiteCCLogo : blackCCLogo}
                />
                <div className="flex items-center gap-3 text-icon-fill">
                  <Link
                    href="https://github.com/cvpaperchallenge"
                    target="_blank"
                    aria-label="cvpaper.challenge GitHub"
                  >
                    <RxGithubLogo className="size-4 transition-colors hover:text-icon-accent" />
                  </Link>
                  <Link
                    href="https://x.com/CVpaperChalleng"
                    target="_blank"
                    aria-label="cvpaper.challenge X"
                  >
                    <PiXLogo className="size-4 transition-colors hover:text-icon-accent" />
                  </Link>
                  <Link
                    href="https://xpaperchallenge.org/cv/"
                    target="_blank"
                    aria-label="cvpaper.challenge website"
                  >
                    <RiGlobalLine className="size-4 transition-colors hover:text-icon-accent" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-border/40 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground md:flex-row">
          <div>
            © {new Date().getFullYear()} LIMIT.Lab. All rights reserved.
          </div>
          <div>Built by cvpaper.challenge Dev Team</div>
        </div>
      </div>
    </footer>
  )
}
