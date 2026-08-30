'use client'

import { useState } from 'react'
import Image from 'next/image'
import { RxFile, RxGithubLogo } from 'react-icons/rx'
import { RiGlobalLine } from 'react-icons/ri'
import Link from 'next/link'

import { samplePublications } from '@/data/publicationPageData'

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

export default function PublicationsPage() {
  const [conferenceFilter, setConferenceFilter] = useState<string>('all')
  const [yearFilter, setYearFilter] = useState<string>('all')
  const [fieldFilter, setFieldFilter] = useState<string>('all')

  // Extract unique options
  const conferences = Array.from(
    new Set(samplePublications.map((p) => p.conference))
  )
  const years = Array.from(new Set(samplePublications.map((p) => p.year)))
  const fields = Array.from(new Set(samplePublications.map((p) => p.field)))

  // Filter the publications
  const filteredPublications = samplePublications
    .filter((pub) => {
      const confMatch =
        conferenceFilter === 'all' || pub.conference === conferenceFilter
      const yearMatch = yearFilter === 'all' || String(pub.year) === yearFilter
      const fieldMatch = fieldFilter === 'all' || pub.field === fieldFilter
      return confMatch && yearMatch && fieldMatch
    })
    .sort((a, b) => b.id - a.id)

  return (
    <div className="container mx-auto w-full max-w-6xl space-y-12 px-6 py-12 md:px-8">
      {/* Page header */}
      <header className="fade-in-up flex flex-col items-start gap-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Publications
        </h1>
        <div className="section-accent" />
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Explore our latest research publications, showcasing advancements in
          various fields. Use the filters below to find publications by
          conference, year, or field of study.
        </p>
      </header>

      {/* Filters */}
      <div className="glass flex flex-wrap items-end justify-end gap-3 rounded-2xl p-4 shadow-sm sm:gap-4 sm:p-5">
        <div className="flex w-full flex-col items-start gap-1.5 sm:w-auto">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Conference
          </label>
          <Select
            value={conferenceFilter}
            onValueChange={(val) => setConferenceFilter(val)}
          >
            <SelectTrigger className="w-full sm:w-[140px]">
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
            Field
          </label>
          <Select
            value={fieldFilter}
            onValueChange={(val) => setFieldFilter(val)}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
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

      {/* Publication list */}
      <div className="space-y-5">
        {filteredPublications.map((pub) => (
          <article
            key={pub.id}
            className="border-border/40 bg-background/40 hover:bg-background/60 group relative flex flex-col items-stretch gap-5 overflow-hidden rounded-2xl border p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue-a6 hover:shadow-[0_18px_40px_-12px_var(--blue-a6)] sm:p-5 md:flex-row md:items-start"
          >
            {/* Top radial accent — subtle baseline, brightens on hover */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/3 opacity-30 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(ellipse at top, var(--blue-a4) 0%, transparent 70%)',
              }}
            />

            {/* Image */}
            <div className="ring-border/40 w-full overflow-hidden rounded-xl ring-1 transition-all duration-300 group-hover:ring-brand-blue-a6 md:w-1/3 md:min-w-60 lg:min-w-72">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={pub.imageUrl}
                  alt={pub.title}
                  fill
                  className="rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={pub.id === 1}
                />
              </AspectRatio>
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col justify-between gap-3 py-1">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="conference" className="text-xs font-medium">
                    {pub.conference}
                  </Badge>
                  <Badge variant="year" className="text-xs font-medium">
                    {pub.year}
                  </Badge>
                  <Badge variant="type" className="text-xs font-medium">
                    {pub.field}
                  </Badge>
                </div>

                <h2 className="text-base font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-brand-blue-11 sm:text-lg md:text-xl">
                  {pub.title}
                </h2>

                <div className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {pub.authors}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 pt-2 sm:gap-3">
                {pub.projectPageUrl && (
                  <Link
                    href={pub.projectPageUrl}
                    target="_blank"
                    className="flex items-center gap-1.5 rounded-lg border border-button-project bg-button-project px-3 py-1.5 text-button-project-foreground transition-all hover:-translate-y-0.5 hover:bg-button-project-hovered hover:text-button-project-foreground-hovered hover:shadow-md sm:gap-2"
                  >
                    <RiGlobalLine className="size-4" />
                    <span className="text-xs font-medium sm:text-sm">
                      Project
                    </span>
                  </Link>
                )}
                {pub.pdfFileUrl && (
                  <Link
                    href={pub.pdfFileUrl}
                    target="_blank"
                    className="flex items-center gap-1.5 rounded-lg border border-button-pdf bg-button-pdf px-3 py-1.5 text-button-pdf-foreground transition-all hover:-translate-y-0.5 hover:bg-button-pdf-hovered hover:text-button-pdf-foreground-hovered hover:shadow-md sm:gap-2"
                  >
                    <RxFile className="size-4" />
                    <span className="text-xs font-medium sm:text-sm">PDF</span>
                  </Link>
                )}
                {pub.githubUrl && (
                  <Link
                    href={pub.githubUrl}
                    target="_blank"
                    className="flex items-center gap-1.5 rounded-lg border border-button-github bg-button-github px-3 py-1.5 text-button-github-foreground transition-all hover:-translate-y-0.5 hover:bg-button-github-hovered hover:text-button-github-foreground-hovered hover:shadow-md sm:gap-2"
                  >
                    <RxGithubLogo className="size-4" />
                    <span className="text-xs font-medium sm:text-sm">
                      GitHub
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
