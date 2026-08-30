import type { ReactNode } from 'react'

import { pageMetadata } from '@/lib/site'

// `page.tsx` is a client component and cannot export metadata itself, so this
// server layout supplies it for the /events-reports segment.
export const metadata = pageMetadata({
  title: 'Events & Reports',
  description:
    'Workshops hosted by LIMIT.Lab at CVPR, ICCV and ECCV, plus our conference reports summarising trends across the computer vision community.',
  path: '/events-reports/',
})

export default function EventsReportsLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
