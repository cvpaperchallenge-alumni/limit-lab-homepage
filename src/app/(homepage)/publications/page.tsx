'use client'

import { useState } from 'react'

import { samplePublications } from '@/data/publicationPageData'

// shadcn/ui components
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
          <div className="space-y-4">
            {filteredPublications.map((pub) => (
              <Card key={pub.id} className="p-4">
                <CardContent className="flex items-center space-x-4">
                  {/* Simple image or use an <Avatar> if you prefer */}
                  <Avatar className="size-24">
                    <AvatarImage src={pub.imageUrl} alt={pub.title} />
                    <AvatarFallback>?</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h2 className="text-base font-semibold">{pub.title}</h2>
                    <div className="text-sm text-muted-foreground">
                      Authors: {pub.authors}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Conference: {pub.conference}, {pub.year}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Field: {pub.field}
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
