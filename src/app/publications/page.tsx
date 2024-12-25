'use client'

import { useState } from 'react'
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

const samplePublications = [
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/100x80',
    title: 'Deep Learning for Image Classification',
    authors: 'Alice J., Bob S.',
    conference: 'ICML',
    year: 2023,
    field: 'Machine Learning',
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/100x80',
    title: 'Next-Gen Virtual Reality Interface',
    authors: 'Charlie D., Diana M.',
    conference: 'CHI',
    year: 2024,
    field: 'HCI',
  },
  {
    id: 3,
    imageUrl: 'https://via.placeholder.com/100x80',
    title: 'Efficient Natural Language Processing',
    authors: 'Bob S., Alice J.',
    conference: 'ACL',
    year: 2022,
    field: 'NLP',
  },
]

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
    <Card>
      <CardHeader>
        <h1>Publications</h1>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          {/* Conference Filter */}
          <Select
            value={conferenceFilter}
            onValueChange={(val) => setConferenceFilter(val)}
          >
            <SelectTrigger className="w-[180px]">
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

          {/* Year Filter */}
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

          {/* Field Filter */}
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
      </CardContent>
    </Card>
  )
}
