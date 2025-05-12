'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { RxFile, RxGithubLogo } from 'react-icons/rx'
import { RiGlobalLine } from 'react-icons/ri'
import Link from 'next/link'
import { Separator } from '@radix-ui/react-separator'
import tagIconBlack from '../../../../public/tag-icon-black.png'
import tagIconWhite from '../../../../public/tag-icon-white.png'

import { samplePublications } from '@/data/publicationPageData'

// shadcn/ui components
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export default function PublicationsPage() {
  const [conferenceFilter, setConferenceFilter] = useState<string>('all')
  const [yearFilter, setYearFilter] = useState<string>('all')
  const [fieldFilter, setFieldFilter] = useState<string>('all')
  const { theme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Extract unique options
  const conferences = Array.from(
    new Set(samplePublications.map((p) => p.conference))
  )
  const years = Array.from(new Set(samplePublications.map((p) => p.year)))
  const fields = Array.from(new Set(samplePublications.map((p) => p.field)))

  useEffect(() => {
    if (theme) {
      setIsDarkMode(theme === 'dark')
    }
  }, [theme])

  // Filter the publications
  const filteredPublications = samplePublications
    .filter((pub) => {
      const confMatch =
        conferenceFilter === 'all' || pub.conference === conferenceFilter
      const yearMatch = yearFilter === 'all' || String(pub.year) === yearFilter
      const fieldMatch = fieldFilter === 'all' || pub.field === fieldFilter
      return confMatch && yearMatch && fieldMatch
    })
    .sort((a, b) => b.id - a.id) // Sort by ID in descending order to add new publications at the top

  return (
    <div className="flex w-11/12 flex-1 flex-col items-center gap-6 sm:w-4/5 sm:gap-8">
      <h1 className="mt-8 text-2xl font-semibold leading-7 tracking-wider sm:mt-12 md:mt-16 md:text-3xl md:leading-8">
        Publications
      </h1>
      <div className="flex w-full max-w-[1000px] flex-col items-center gap-5 rounded-3xl border border-block-border px-4 pb-8 pt-6 sm:gap-7 sm:px-8 sm:pb-12 sm:pt-8 md:px-10 md:pb-16 md:pt-10">
        {/* Filters */}
        <div className="flex w-full flex-wrap gap-3 self-end sm:flex-nowrap sm:gap-4 sm:self-end">
          {/* Conference Filter */}
          <div className="flex w-full flex-col items-start gap-1 sm:w-auto sm:gap-2">
            <div className="text-sm font-semibold sm:text-base">Conference</div>
            <Select
              value={conferenceFilter}
              onValueChange={(val) => setConferenceFilter(val)}
            >
              <SelectTrigger className="w-full sm:w-[100px]">
                <SelectValue placeholder="Conference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {conferences.map((conf) => (
                  <SelectItem key={conf} value={conf}>
                    {conf}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Filter */}
          <div className="flex w-full flex-col items-start gap-1 sm:w-auto sm:gap-2">
            <div className="text-sm font-semibold sm:text-base">Year</div>
            <Select
              value={yearFilter}
              onValueChange={(val) => setYearFilter(val)}
            >
              <SelectTrigger className="w-full sm:w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {years.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Field Filter */}
          <div className="flex w-full flex-col items-start gap-1 sm:w-auto sm:gap-2">
            <div className="text-sm font-semibold sm:text-base">Field</div>
            <Select
              value={fieldFilter}
              onValueChange={(val) => setFieldFilter(val)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {fields.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Publication List */}
        <div className="flex w-full flex-col items-center gap-4">
          {filteredPublications.map((pub) => (
            <Card key={pub.id} className="w-full place-content-center p-3 sm:p-4">
              <CardContent className="flex h-full flex-col items-center gap-4 p-0 md:flex-row md:items-start">
                {/* Publication Image */}
                <div className="w-full md:w-1/3 md:min-w-60 lg:min-w-80">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={pub.imageUrl}
                      alt={pub.title}
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>

                {/* Publication Details */}
                <div className="flex w-full flex-1 flex-col items-start justify-between gap-3 py-1 md:h-full md:py-2">
                  {/* Tags */}
                  <div className="flex h-6 w-fit gap-3 self-end">
                    <div className="relative h-full w-20">
                      <Image
                        src={isDarkMode ? tagIconBlack : tagIconWhite}
                        alt="conference icon"
                        className="absolute inset-y-0 right-0 h-5 w-auto sm:h-6"
                      />
                      <span className="absolute left-[30px] top-[2px] text-xs font-medium sm:text-sm">
                        {pub.conference}
                      </span>
                    </div>
                    <div className="relative h-full w-20">
                      <Image
                        src={isDarkMode ? tagIconBlack : tagIconWhite}
                        alt="year icon"
                        className="absolute inset-y-0 right-0 h-5 w-auto sm:h-6"
                      />
                      <span className="absolute left-[30px] top-[2px] text-xs font-medium sm:text-sm">
                        {pub.year}
                      </span>
                    </div>
                  </div>

                  {/* Title and Authors */}
                  <div className="flex w-full flex-col gap-1">
                    <div className="flex w-full flex-col gap-1">
                      <h2 className="w-full text-base font-semibold leading-5 sm:text-lg sm:leading-6">
                        {pub.title}
                      </h2>
                      <Separator
                        orientation="horizontal"
                        className="h-px w-full bg-underline"
                      />
                    </div>
                    <div className="w-full text-xs text-sub">
                      Authors: {pub.authors}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex w-full flex-wrap gap-2 sm:flex-nowrap sm:gap-4">
                    <Link
                      href={pub.projectPageUrl}
                      target="_blank"
                      className="flex h-auto items-center gap-1 rounded-md border border-button-project bg-button-project px-2 py-1.5 text-button-project-foreground hover:bg-button-project-hovered hover:text-button-project-foreground-hovered sm:gap-2 sm:px-3 sm:py-2"
                    >
                      <RiGlobalLine className="size-4 sm:size-5" />
                      <span className="text-xs font-medium sm:text-sm">Project Page</span>
                    </Link>
                    <Link
                      href={pub.pdfFileUrl}
                      target="_blank"
                      className="flex h-auto items-center gap-1 rounded-md border border-button-pdf bg-button-pdf px-2 py-1.5 text-button-pdf-foreground hover:bg-button-pdf-hovered hover:text-button-pdf-foreground-hovered sm:gap-2 sm:px-3 sm:py-2"
                    >
                      <RxFile className="size-4 sm:size-5" />
                      <span className="text-xs font-medium sm:text-sm">PDF</span>
                    </Link>
                    <Link
                      href={pub.githubUrl}
                      target="_blank"
                      className="flex h-auto items-center gap-1 rounded-md border border-button-github bg-button-github px-2 py-1.5 text-button-github-foreground hover:bg-button-github-hovered hover:text-button-github-foreground-hovered sm:gap-2 sm:px-3 sm:py-2"
                    >
                      <RxGithubLogo className="size-4 sm:size-5" />
                      <span className="text-xs font-medium sm:text-sm">GitHub</span>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
