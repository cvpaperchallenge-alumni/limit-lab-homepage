'use client'

import { useState } from 'react'
import Image from 'next/image'
import { RxFile, RxGithubLogo, RxCalendar } from 'react-icons/rx'
import { RiGlobalLine } from 'react-icons/ri'
import Link from 'next/link'

import { sampleEventsReports } from '@/data/eventsReportsPageData'

// shadcn/ui components
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
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="container mx-auto w-full max-w-6xl space-y-12 px-6 py-12 md:px-8">
      {/* Page header */}
      <header className="fade-in-up flex flex-col items-start gap-3">
        <h1 className="gradient-text text-4xl font-extrabold tracking-tight md:text-5xl">
          Events &amp; Reports
        </h1>
        <div className="section-accent" />
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Explore our workshops, events, and published reports. Use the filters
          below to find activities by type, year, or conference.
        </p>
      </header>

      {/* Filters */}
      <div className="glass flex flex-wrap items-end justify-end gap-3 rounded-2xl p-4 shadow-sm sm:gap-4 sm:p-5">
        <div className="flex w-full flex-col items-start gap-1.5 sm:w-auto">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Type
          </label>
          <Select
            value={typeFilter}
            onValueChange={(val) => setTypeFilter(val)}
          >
            <SelectTrigger className="w-full sm:w-[140px]">
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

        <div className="flex w-full flex-col items-start gap-1.5 sm:w-auto">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Year
          </label>
          <Select
            value={yearFilter}
            onValueChange={(val) => setYearFilter(val)}
          >
            <SelectTrigger className="w-full sm:w-[120px]">
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

        <div className="flex w-full flex-col items-start gap-1.5 sm:w-auto">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Conference
          </label>
          <Select
            value={conferenceFilter}
            onValueChange={(val) => setConferenceFilter(val)}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
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

      {/* Events & Reports list */}
      <div className="space-y-5">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="glass card-hover overflow-hidden rounded-2xl p-4 shadow-sm sm:p-5"
          >
            <div className="flex h-full flex-col items-stretch gap-5 md:flex-row md:items-start">
              {/* Image */}
              <div className="w-full overflow-hidden rounded-xl md:w-1/3 md:min-w-60 lg:min-w-72">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="rounded-xl object-cover object-center"
                    priority={item.id === 1}
                  />
                </AspectRatio>
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col justify-between gap-3 py-1">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="type" className="text-xs font-medium">
                      {item.type}
                    </Badge>
                    {item.conference && (
                      <Badge
                        variant="conference"
                        className="text-xs font-medium"
                      >
                        {item.conference}
                      </Badge>
                    )}
                    <Badge variant="year" className="text-xs font-medium">
                      {item.year}
                    </Badge>
                  </div>

                  <h2 className="text-base font-semibold leading-snug tracking-tight sm:text-lg md:text-xl">
                    {item.title}
                  </h2>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <RxCalendar className="size-3.5" />
                    <span>{item.date}</span>
                  </div>

                  <p className="text-foreground/80 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2 pt-2 sm:gap-3">
                  {item.websiteUrl && (
                    <Link
                      href={item.websiteUrl}
                      target="_blank"
                      className="flex items-center gap-1.5 rounded-lg border border-button-project bg-button-project px-3 py-1.5 text-button-project-foreground transition-colors hover:bg-button-project-hovered hover:text-button-project-foreground-hovered sm:gap-2"
                    >
                      <RiGlobalLine className="size-4" />
                      <span className="text-xs font-medium sm:text-sm">
                        Website
                      </span>
                    </Link>
                  )}
                  {item.pdfFileUrl && (
                    <Link
                      href={item.pdfFileUrl}
                      target="_blank"
                      className="flex items-center gap-1.5 rounded-lg border border-button-pdf bg-button-pdf px-3 py-1.5 text-button-pdf-foreground transition-colors hover:bg-button-pdf-hovered hover:text-button-pdf-foreground-hovered sm:gap-2"
                    >
                      <RxFile className="size-4" />
                      <span className="text-xs font-medium sm:text-sm">
                        PDF
                      </span>
                    </Link>
                  )}
                  {item.githubUrl && (
                    <Link
                      href={item.githubUrl}
                      target="_blank"
                      className="flex items-center gap-1.5 rounded-lg border border-button-github bg-button-github px-3 py-1.5 text-button-github-foreground transition-colors hover:bg-button-github-hovered hover:text-button-github-foreground-hovered sm:gap-2"
                    >
                      <RxGithubLogo className="size-4" />
                      <span className="text-xs font-medium sm:text-sm">
                        GitHub
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
