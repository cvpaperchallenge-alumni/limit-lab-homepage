'use client'

import Link from 'next/link'
import { HiCursorClick } from 'react-icons/hi'
import { PiXLogo } from 'react-icons/pi'
import { RxGithubLogo, RxLinkedinLogo } from 'react-icons/rx'
import { Geist_Mono } from 'next/font/google'

const geistMono = Geist_Mono({
  subsets: ['latin'],
})

import { VisualAtomDesign } from '@/components/visual-atom-design'
import { members, newsItems } from '@/data/topPageData'
import { PaperOceanDesign } from '@/components/paper-ocean-design'

// shadcn/ui components
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function TopPage() {
  return (
    <div className="flex w-11/12 flex-1 flex-col items-center justify-start gap-12 sm:w-4/5 sm:gap-16 md:gap-20">
      {/* About Us */}
      <div className="relative mt-8 flex max-w-[1000px] animate-slide-in-left flex-col items-center gap-6 px-4 py-8 before:absolute before:inset-y-0 before:-left-full before:z-0 before:block before:w-[200%] before:rounded-r-3xl before:border before:border-block-border sm:mt-12 sm:px-8 sm:py-10 md:mt-16 md:flex-row md:items-center md:gap-8 md:px-12 md:py-14 lg:px-20">
        <div className="relative flex animate-fade-in-top flex-col items-start gap-3 text-foreground animate-delay-700 animate-duration-500">
          <h1 className="mb-2 text-2xl font-semibold leading-7 tracking-wider text-foreground shadow-background drop-shadow-md sm:text-2xl md:text-3xl md:leading-8">
            Unleash our LIMITless potential
          </h1>
          <p className="mb-5 w-full text-wrap text-sm sm:text-base">
            At LIMIT Lab., we embrace the power of collaboration to transcend
            limits in AI and computer vision research. By connecting globally
            and reimagining boundaries, we transform challenges into
            opportunities, unlocking limitless innovation with profound societal
            and industrial impact. Together, we redefine the very concept of
            limits.
          </p>
          <h2 className="text-sm font-semibold sm:text-base">
            Check out the past events
          </h2>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Button
              className="h-auto rounded-2xl bg-button-background py-2 text-button-foreground hover:animate-scale-up-sm hover:bg-accent hover:text-accent-foreground sm:h-10 sm:py-0"
              size="sm"
              asChild
            >
              <Link href="https://lsfsl.net/limit23/" target="_blank">
                <span className="text-xs font-semibold tracking-wider sm:text-sm">
                  LIMIT @ICCV2023
                </span>
                <HiCursorClick className="size-4 sm:size-5" />
              </Link>
            </Button>
            <Button
              className="h-auto rounded-2xl bg-button-background py-2 text-button-foreground hover:animate-scale-up-sm hover:bg-accent hover:text-accent-foreground sm:h-10 sm:py-0"
              size="sm"
              asChild
            >
              <Link
                href="https://hirokatsukataoka16.github.io/CVPR-2024-LIMIT/"
                target="_blank"
              >
                <span className="text-xs font-semibold tracking-wider sm:text-sm">
                  LIMIT @CVPR2024
                </span>
                <HiCursorClick className="size-4 sm:size-5" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center md:justify-start">
          <VisualAtomDesign />
        </div>
      </div>

      {/* Recent News */}
      <div className="relative flex w-full max-w-[1000px] animate-slide-in-right flex-col-reverse items-center gap-6 px-4 py-8 before:absolute before:inset-y-0 before:-right-full before:z-0 before:block before:w-[200%] before:rounded-l-3xl before:border before:border-block-border sm:px-8 sm:py-10 md:flex-row md:items-center md:gap-8 md:px-12 md:py-14 lg:gap-14 lg:px-20">
        <div className="flex size-auto min-w-[320px] justify-center md:justify-start">
          <PaperOceanDesign />
        </div>
        <div className="flex w-full animate-fade-in-top flex-col items-start gap-3 animate-delay-700 animate-duration-500">
          <h1 className="mb-2 text-2xl font-semibold leading-7 tracking-wider text-foreground shadow-background drop-shadow-md sm:text-2xl md:text-3xl md:leading-8">
            Recent News
          </h1>
          <div className="space-y-2">
            {newsItems.map((item, index) => (
              <div key={index} className="text-sm sm:text-base">
                <strong className={`${geistMono.className}`}>
                  {item.date}:
                </strong>{' '}
                {item.description}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Member Information */}
      <div className="mb-8 flex w-full max-w-[1000px] animate-fade-in-top flex-col items-center gap-3 rounded-3xl border border-block-border px-4 py-8 animate-delay-700 animate-duration-500 sm:mb-12 sm:px-8 sm:py-10 md:mb-16 md:px-12 md:py-14 lg:px-20">
        <h1 className="mb-2 text-2xl font-semibold leading-7 tracking-wider text-foreground shadow-background drop-shadow-md sm:text-2xl md:text-3xl md:leading-8">
          Our Members
        </h1>
        <div className="flex w-full flex-col items-center">
          <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
            {members.map((member, idx) => (
              <Card
                key={idx}
                className="pb-1 pt-4 shadow backdrop-blur-xs sm:pt-5"
              >
                <CardContent>
                  <div className="flex justify-center">
                    <Avatar className="size-20 sm:size-24">
                      <AvatarImage src={member.photoUrl} alt={member.name} />
                      <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-1 pt-2 text-center sm:pt-3">
                    <div className="text-sm font-semibold sm:text-base">
                      {member.name}
                    </div>
                    <div className="text-xs text-muted-foreground sm:text-sm">
                      {member.affiliation}
                    </div>
                  </div>
                  <div className="flex justify-center pt-2 sm:pt-3">
                    <div className="flex gap-3 text-icon-fill sm:gap-4">
                      <Link href={member.githubUrl} target="_blank">
                        <RxGithubLogo className="size-4 hover:animate-scale-up-md hover:text-icon-accent hover:animate-duration-200 sm:size-5" />
                      </Link>
                      <Link href={member.XUrl} target="_blank">
                        <PiXLogo className="size-4 hover:animate-scale-up-md hover:text-icon-accent hover:animate-duration-200 sm:size-5" />
                      </Link>
                      <Link href={member.linkedinUrl} target="_blank">
                        <RxLinkedinLogo className="size-4 hover:animate-scale-up-md hover:text-icon-accent hover:animate-duration-200 sm:size-5" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
