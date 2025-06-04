'use client'

import Link from 'next/link'
import { HiCursorClick } from 'react-icons/hi'
import { PiXLogo } from 'react-icons/pi'
import { RxGithubLogo, RxLinkedinLogo } from 'react-icons/rx'
import { RiGlobalLine } from 'react-icons/ri'
import { SiGooglescholar } from 'react-icons/si'
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
            Limited Resources, Unlimited Impact with Multimodal AI Models
          </h1>
          <p className="mb-5 w-full text-wrap text-sm sm:text-base">
            AI foundation models are increasingly dominating various academic
            and industrial fields, yet the R&D of related technologies is
            controlled by limited institutions capable of managing extensive
            computational and data resources. To counter this dominance, there
            is a critical need for technologies that can develop practical AI
            foundation models using the standard computational and data
            resources. It is said that the scaling laws no longer provide the
            reliable roadmap for developing AI foundational models. Our
            community (LIMIT.Community) and the international lab (LIMIT.Lab)
            therefore aim to put in place exactly those technologies that permit
            the construction of {'{'}Vision, Vision-Language, Multimodal{'}'}
            AI foundational models even when compute and data are limited.
            Drawing on our members’ prior successes in (i) generative
            pre-training methods that can be applied horizontally across any
            modality with image, video, 3D, & audio, and (ii) high-quality AI
            models from extremely scarce data (including a single image), we
            have been committed to AI multimodal foundational models under very
            limited resources. As of 2025, LIMIT.Lab is composed primarily of
            international research teams from Japan, UK, and Germany. Through
            collaborative research projects and the workshop organization, we
            actively foster global exchange in the field of AI and related
            areas.
          </p>
          <h2 className="text-sm font-semibold sm:text-base">
            Check out upcoming events
          </h2>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Button
              className="h-auto rounded-2xl bg-button-background py-2 text-button-foreground hover:animate-scale-up-sm hover:bg-accent hover:text-accent-foreground sm:h-10 sm:py-0"
              size="sm"
              asChild
            >
              <Link
                href="https://iccv2025-limit-workshop.limitlab.xyz/"
                target="_blank"
              >
                <span className="text-xs font-semibold tracking-wider sm:text-sm">
                  ICCV 2025 LIMIT Workshop
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
                href="https://iccv2025-found-workshop.limitlab.xyz/"
                target="_blank"
              >
                <span className="text-xs font-semibold tracking-wider sm:text-sm">
                  ICCV 2025 FOUND Workshop
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
                      {member.homePageUrl && (
                        <Link href={member.homePageUrl} target="_blank">
                          <RiGlobalLine className="size-4 hover:animate-scale-up-md hover:text-icon-accent hover:animate-duration-200 sm:size-5" />
                        </Link>
                      )}
                      {member.googleScholarUrl && (
                        <Link href={member.googleScholarUrl} target="_blank">
                          <SiGooglescholar className="size-4 hover:animate-scale-up-md hover:text-icon-accent hover:animate-duration-200 sm:size-5" />
                        </Link>
                      )}
                      {member.githubUrl && (
                        <Link href={member.githubUrl} target="_blank">
                          <RxGithubLogo className="size-4 hover:animate-scale-up-md hover:text-icon-accent hover:animate-duration-200 sm:size-5" />
                        </Link>
                      )}
                      {member.XUrl && (
                        <Link href={member.XUrl} target="_blank">
                          <PiXLogo className="size-4 hover:animate-scale-up-md hover:text-icon-accent hover:animate-duration-200 sm:size-5" />
                        </Link>
                      )}
                      {member.linkedinUrl && (
                        <Link href={member.linkedinUrl} target="_blank">
                          <RxLinkedinLogo className="size-4 hover:animate-scale-up-md hover:text-icon-accent hover:animate-duration-200 sm:size-5" />
                        </Link>
                      )}
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
