'use client'

import { useState } from 'react'
import Image from 'next/image'
import { RxFile, RxGithubLogo } from 'react-icons/rx'
import { RiGlobalLine } from 'react-icons/ri'
import Link from 'next/link'
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
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from '@radix-ui/react-separator'

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
  const filteredPublications = samplePublications.filter((pub) => {
    const confMatch =
      conferenceFilter === 'all' || pub.conference === conferenceFilter
    const yearMatch = yearFilter === 'all' || String(pub.year) === yearFilter
    const fieldMatch = fieldFilter === 'all' || pub.field === fieldFilter
    return confMatch && yearMatch && fieldMatch
  })

  return (
    <div className="flex w-4/5 flex-col items-center flex-1 gap-8">
      <h1 className='text-3xl font-semibold leading-8 tracking-wider mt-16'>Publications</h1>
      <div className='flex w-full max-w-[1000px] flex-col items-center gap-7 rounded-3xl border border-block-border px-10 pt-10 pb-16'>
        {/* Filters */}
        <div className="flex gap-4 self-end">
          {/* Conference Filter */}
          <div className='flex gap-2 flex-col items-start'>
            <div className='text-s font-semibold'>Conference</div>
            <Select
              value={conferenceFilter}
              onValueChange={(val) => setConferenceFilter(val)}
            >
              <SelectTrigger className="w-[100px]">
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
          <div className='flex gap-2 flex-col items-start'>
            <div className='text-s font-semibold'>Year</div>
            <Select
              value={yearFilter}
              onValueChange={(val) => setYearFilter(val)}
            >
              <SelectTrigger className="w-[100px]">
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
          <div className='flex gap-2 flex-col items-start'>
            <div className='text-s font-semibold'>Field</div>
            <Select
              value={fieldFilter}
              onValueChange={(val) => setFieldFilter(val)}
            >
              <SelectTrigger className="w-[180px]">
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
        <div className="flex flex-col items-center gap-4 w-full">
          {filteredPublications.map((pub) => (
            <Card key={pub.id} className="p-4 w-full h-56 place-content-center">
              <CardContent className="flex items-center gap-4 p-0 h-full">
                <div className="min-w-80">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={pub.imageUrl}
                      alt={pub.title}
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>
                <div className="flex-1 min-w-[320px] h-full flex flex-col items-start justify-between py-2">
                  <div className='w-fit h-6 flex gap-3 self-end'>
                    <div className='relative w-20 h-full'>
                      <Image
                        src={tagIconBlack}
                        alt="conference icon"
                        className="w-auto h-6 absolute inset-y-0 right-0"
                      />
                      <span className='text-sm font-medium absolute top-[2px] left-[30px]'>{pub.conference}</span>
                    </div>
                    <div className='relative w-20 h-full'>
                      <Image
                        src={tagIconBlack}
                        alt="year icon"
                        className="w-auto h-6 absolute inset-y-0 right-0"
                      />
                      <span className='text-sm font-medium absolute top-[2px] left-[30px]'>{pub.year}</span>
                    </div>
                  </div>
                  <div className='flex flex-col w-full gap-1'>
                    <div className='flex flex-col w-full gap-1'>
                      <h2 className="text-lg w-full font-semibold leading-6">{pub.title}</h2>
                      <Separator orientation='horizontal' className='h-px w-full bg-underline'/>
                    </div>
                    <div className=" w-full text-xs text-sub">
                      Authors: {pub.authors}
                    </div>
                  </div>
                  <div className='flex w-full gap-4'>
                    <Link
                      href={pub.projectPageUrl}
                      target="_blank"
                      className='flex items-center gap-2 py-2 px-3 h-auto bg-button-project text-button-project-foreground border border-button-project rounded-md hover:bg-button-project-hovered hover:text-button-project-foreground-hovered'
                    >
                      <RiGlobalLine className='size-5'/>
                      <span className='text-sm font-medium'>Project Page</span>
                    </Link>
                    <Link
                      href={pub.pdfFileUrl}
                      target="_blank"
                      className='flex items-center gap-2 py-2 px-3 h-auto bg-button-pdf text-button-pdf-foreground border border-button-pdf rounded-md hover:bg-button-pdf-hovered hover:text-button-pdf-foreground-hovered'
                    >
                      <RxFile className='size-5'/>
                      <span className='text-sm font-medium'>PDF</span>
                    </Link>
                    <Link
                      href={pub.githubUrl}
                      target="_blank"
                      className='flex items-center gap-2 py-2 px-3 h-auto bg-button-github text-button-github-foreground border border-button-github rounded-md hover:bg-button-github-hovered hover:text-button-github-foreground-hovered'
                    >
                      <RxGithubLogo className='size-5'/>
                      <span className='text-sm font-medium'>GitHub</span>
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
