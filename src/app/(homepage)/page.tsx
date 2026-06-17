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
import { members, newsItems, type NewsTag } from '@/data/topPageData'
import { PaperOceanDesign } from '@/components/paper-ocean-design'

// shadcn/ui components
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Tag color mapping
const getTagColor = (tag: NewsTag): string => {
  const colors: Record<NewsTag, string> = {
    'Workshop/Event':
      'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
    Report:
      'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200',
    'Paper Accepted':
      'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200',
    Announcement:
      'bg-gray-100 text-gray-800 dark:bg-gray-700/60 dark:text-gray-200',
  }
  return colors[tag]
}

export default function TopPage() {
  return (
    <div className="container mx-auto w-full max-w-6xl space-y-24 px-6 py-12 md:px-8">
      {/* Hero */}
      <section className="fade-in-up border-border/50 bg-background/40 relative overflow-hidden rounded-3xl border px-6 py-14 backdrop-blur-md md:px-12 md:py-20 lg:py-24">
        {/* Decorative backdrop */}
        <div
          className="gradient-mesh pointer-events-none absolute inset-0"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-14">
          {/* Atom visual */}
          <div className="flex shrink-0 items-center justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 -z-10 rounded-full blur-2xl"
                style={{
                  background:
                    'radial-gradient(circle, var(--blue-a7) 0%, transparent 70%)',
                }}
              />
              <VisualAtomDesign />
            </div>
          </div>

          {/* Copy */}
          <div className="flex flex-1 flex-col items-start gap-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground md:text-xs">
              International Research Collective
            </span>
            <h1 className="gradient-text text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
              Limited Resources, Unlimited Impact with Multimodal AI Models
            </h1>
            <p className="text-foreground/80 text-sm leading-relaxed sm:text-base">
              AI foundation models are increasingly dominating various academic
              and industrial fields, yet the R&amp;D of related technologies is
              controlled by limited institutions capable of managing extensive
              computational and data resources. To counter this dominance, there
              is a critical need for technologies that can develop practical AI
              foundation models using the standard computational and data
              resources. Our community (LIMIT.Community) and the international
              lab (LIMIT.Lab) therefore aim to put in place exactly those
              technologies that permit the construction of {'{'}Vision,
              Vision-Language, Multimodal{'}'} AI foundational models even when
              compute and data are limited. As of 2025, LIMIT.Lab is composed
              primarily of international research teams from Japan, UK, and
              Germany.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Upcoming Events
              </h2>
              <div className="flex flex-wrap gap-3">
                <Button
                  className="h-auto rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  size="sm"
                  asChild
                >
                  <Link
                    href="https://cvpr2026-vgi-workshop.limitlab.xyz"
                    target="_blank"
                  >
                    <span className="tracking-wide">CVPR 2026 VGI</span>
                    <HiCursorClick className="size-4" />
                  </Link>
                </Button>
                <Button
                  className="h-auto rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  size="sm"
                  asChild
                >
                  <Link
                    href="https://cvpr2026-bigmac-workshop.limitlab.xyz"
                    target="_blank"
                  >
                    <span className="tracking-wide">CVPR 2026 BigMAC</span>
                    <HiCursorClick className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent News */}
      <section id="news" className="space-y-8">
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Recent News
          </h2>
          <div className="section-accent" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:items-start">
          {/* Paper Ocean decorative element */}
          <div className="glass card-hover overflow-hidden rounded-3xl p-3 shadow-sm">
            <div className="flex justify-center">
              <PaperOceanDesign />
            </div>
            <p className="px-2 pb-2 pt-3 text-xs leading-relaxed text-muted-foreground">
              A glimpse into the ocean of papers we navigate — hover to explore.
            </p>
          </div>

          {/* News list */}
          <div className="glass max-h-[520px] space-y-4 overflow-y-auto rounded-3xl p-4 pr-3 shadow-sm sm:p-6">
            {newsItems.map((item, index) => (
              <div
                key={index}
                className="border-border/40 bg-background/40 hover:bg-background/70 rounded-xl border p-4 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`${geistMono.className} text-xs font-semibold text-muted-foreground`}
                  >
                    {item.date}
                  </span>
                  {item.tag && (
                    <span
                      className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${getTagColor(item.tag)}`}
                    >
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="mt-1.5 text-sm leading-relaxed sm:text-base">
                  {item.content.map((part, partIndex) =>
                    typeof part === 'string' ? (
                      <span key={partIndex}>{part}</span>
                    ) : (
                      <Link
                        key={partIndex}
                        href={part.url}
                        target="_blank"
                        className="font-medium text-brand-blue-11 underline decoration-brand-blue-a5 underline-offset-4 transition-colors hover:text-brand-blue-12 hover:decoration-brand-blue-9"
                      >
                        {part.text}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Members */}
      <section id="members" className="space-y-8">
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Our Members
          </h2>
          <div className="section-accent" />
          <p className="text-sm text-muted-foreground sm:text-base">
            An international team of researchers across Japan, UK, Germany, and
            beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
          {members.map((member, idx) => (
            <div
              key={idx}
              className="glass card-hover group flex flex-col items-center gap-3 rounded-2xl p-5 text-center"
            >
              <Avatar className="ring-border/50 size-20 ring-2 transition-all group-hover:ring-brand-blue-a8 sm:size-24">
                <AvatarImage src={member.photoUrl} alt={member.name} />
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
              <div className="space-y-0.5">
                <div className="text-sm font-semibold leading-tight sm:text-base">
                  {member.name}
                </div>
                <div className="text-xs text-muted-foreground sm:text-sm">
                  {member.affiliation}
                </div>
              </div>
              <div className="mt-1 flex gap-3 text-icon-fill">
                {member.homePageUrl && (
                  <Link
                    href={member.homePageUrl}
                    target="_blank"
                    aria-label={`${member.name} homepage`}
                  >
                    <RiGlobalLine className="size-4 transition-all hover:scale-110 hover:text-icon-accent sm:size-5" />
                  </Link>
                )}
                {member.googleScholarUrl && (
                  <Link
                    href={member.googleScholarUrl}
                    target="_blank"
                    aria-label={`${member.name} Google Scholar`}
                  >
                    <SiGooglescholar className="size-4 transition-all hover:scale-110 hover:text-icon-accent sm:size-5" />
                  </Link>
                )}
                {member.githubUrl && (
                  <Link
                    href={member.githubUrl}
                    target="_blank"
                    aria-label={`${member.name} GitHub`}
                  >
                    <RxGithubLogo className="size-4 transition-all hover:scale-110 hover:text-icon-accent sm:size-5" />
                  </Link>
                )}
                {member.XUrl && (
                  <Link
                    href={member.XUrl}
                    target="_blank"
                    aria-label={`${member.name} X`}
                  >
                    <PiXLogo className="size-4 transition-all hover:scale-110 hover:text-icon-accent sm:size-5" />
                  </Link>
                )}
                {member.linkedinUrl && (
                  <Link
                    href={member.linkedinUrl}
                    target="_blank"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <RxLinkedinLogo className="size-4 transition-all hover:scale-110 hover:text-icon-accent sm:size-5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
