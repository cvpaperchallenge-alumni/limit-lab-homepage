'use client'

import { useState } from 'react'
import Image from 'next/image'
import { RxFile, RxGithubLogo, RxCalendar } from 'react-icons/rx'
import { RiGlobalLine } from 'react-icons/ri'
import Link from 'next/link'
import { Separator } from '@radix-ui/react-separator'

import { sampleEventsReports } from '@/data/eventsReportsPageData'

// shadcn/ui components
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export default function EventsReportsPage() {
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [yearFilter, setYearFilter] = useState<string>('all')
  const [conferenceFilter, setConferenceFilter] = useState<string>('all')

  // Extract unique options
  const types = Array.from(
    new Set(sampleEventsReports.map((item) => item.type))
  )
  const years = Array.from(
    new Set(sampleEventsReports.map((item) => item.year))
  )
  const conferences = Array.from(
    new Set(sampleEventsReports.map((item) => item.conference).filter(Boolean))
  )

  // Filter the events and reports
  const filteredItems = sampleEventsReports
    .filter((item) => {
      const typeMatch = typeFilter === 'all' || item.type === typeFilter
      const yearMatch = yearFilter === 'all' || String(item.year) === yearFilter
      const conferenceMatch =
        conferenceFilter === 'all' || item.conference === conferenceFilter
      return typeMatch && yearMatch && conferenceMatch
    })
    .sort((a, b) => b.id - a.id) // Sort by ID in descending order to add new items at the top

  return (
    <div className="flex w-11/12 flex-1 flex-col items-center gap-6 py-8 sm:w-4/5 sm:gap-8">
      {/* Page Title */}
      <div className="w-full max-w-[1000px] text-center">
        <h1 className="mb-2 text-2xl font-semibold leading-7 tracking-wider text-foreground shadow-background drop-shadow-md sm:text-3xl md:text-4xl md:leading-10">
          Events &amp; Reports
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-sub sm:text-base">
          Explore our workshops, events, and published reports. Use the filters
          below to find activities by type, year, or conference.
        </p>
      </div>
      <div className="flex w-full max-w-[1000px] flex-col items-center gap-5 rounded-3xl border border-block-border px-4 pb-8 pt-6 sm:gap-7 sm:px-8 sm:pb-12 sm:pt-8 md:px-10 md:pb-16 md:pt-10">
        {/* Filters */}
        <div className="flex w-full flex-wrap gap-3 self-end sm:flex-nowrap sm:gap-4 sm:self-end">
          {/* Type Filter */}
          <div className="flex w-full flex-col items-start gap-1 sm:w-auto sm:gap-2">
            <div className="text-sm font-semibold sm:text-base">Type</div>
            <Select
              value={typeFilter}
              onValueChange={(val) => setTypeFilter(val)}
            >
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
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

          {/* Conference Filter */}
          <div className="flex w-full flex-col items-start gap-1 sm:w-auto sm:gap-2">
            <div className="text-sm font-semibold sm:text-base">Conference</div>
            <Select
              value={conferenceFilter}
              onValueChange={(val) => setConferenceFilter(val)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Conference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {conferences.map((conference) => (
                  <SelectItem key={conference} value={conference}>
                    {conference}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events & Reports List */}
        <div className="flex w-full flex-col items-center gap-4">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="w-full place-content-center p-3 sm:p-4"
            >
              <CardContent className="flex h-full flex-col items-center gap-4 p-0 md:flex-row md:items-start">
                {/* Item Image */}
                <div className="w-full overflow-hidden rounded-md md:w-1/3 md:min-w-60 lg:min-w-80">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="rounded-md object-cover"
                      priority={item.id === 1}
                    />
                  </AspectRatio>
                </div>

                {/* Item Details */}
                <div className="flex w-full flex-1 flex-col items-start justify-between gap-3 py-1 md:h-full md:py-2">
                  {/* Tags */}
                  <div className="flex w-fit gap-2 self-end">
                    <Badge
                      variant="type"
                      className="text-xs font-medium sm:text-sm"
                    >
                      {item.type}
                    </Badge>
                    {item.conference && (
                      <Badge
                        variant="conference"
                        className="text-xs font-medium sm:text-sm"
                      >
                        {item.conference}
                      </Badge>
                    )}
                    <Badge
                      variant="year"
                      className="text-xs font-medium sm:text-sm"
                    >
                      {item.year}
                    </Badge>
                  </div>

                  {/* Title and Date */}
                  <div className="flex w-full flex-col gap-1">
                    <div className="flex w-full flex-col gap-1">
                      <h2 className="w-full text-base font-semibold leading-5 sm:text-lg sm:leading-6">
                        {item.title}
                      </h2>
                      <Separator
                        orientation="horizontal"
                        className="h-px w-full bg-underline"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-foreground opacity-70">
                      <RxCalendar className="size-3.5" />
                      <span>{item.date}</span>
                    </div>
                    <div className="mt-1 w-full text-sm text-foreground opacity-75">
                      {item.description}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex w-full flex-wrap gap-2 sm:flex-nowrap sm:gap-4">
                    {item.websiteUrl && (
                      <Link
                        href={item.websiteUrl}
                        target="_blank"
                        className="flex h-auto items-center gap-1 rounded-md border border-button-project bg-button-project px-2 py-1.5 text-button-project-foreground hover:bg-button-project-hovered hover:text-button-project-foreground-hovered sm:gap-2 sm:px-3 sm:py-2"
                      >
                        <RiGlobalLine className="size-4 sm:size-5" />
                        <span className="text-xs font-medium sm:text-sm">
                          Website
                        </span>
                      </Link>
                    )}
                    {item.pdfFileUrl && (
                      <Link
                        href={item.pdfFileUrl}
                        target="_blank"
                        className="flex h-auto items-center gap-1 rounded-md border border-button-pdf bg-button-pdf px-2 py-1.5 text-button-pdf-foreground hover:bg-button-pdf-hovered hover:text-button-pdf-foreground-hovered sm:gap-2 sm:px-3 sm:py-2"
                      >
                        <RxFile className="size-4 sm:size-5" />
                        <span className="text-xs font-medium sm:text-sm">
                          PDF
                        </span>
                      </Link>
                    )}
                    {item.githubUrl && (
                      <Link
                        href={item.githubUrl}
                        target="_blank"
                        className="flex h-auto items-center gap-1 rounded-md border border-button-github bg-button-github px-2 py-1.5 text-button-github-foreground hover:bg-button-github-hovered hover:text-button-github-foreground-hovered sm:gap-2 sm:px-3 sm:py-2"
                      >
                        <RxGithubLogo className="size-4 sm:size-5" />
                        <span className="text-xs font-medium sm:text-sm">
                          GitHub
                        </span>
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
  )
}
