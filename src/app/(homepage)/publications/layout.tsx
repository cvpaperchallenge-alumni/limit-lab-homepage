import type { ReactNode } from 'react'

import { pageMetadata } from '@/lib/site'

// `page.tsx` is a client component and cannot export metadata itself, so this
// server layout supplies it for the /publications segment.
export const metadata = pageMetadata({
  title: 'Publications',
  description:
    'Peer-reviewed papers and preprints from LIMIT.Lab, spanning limited-resource representation learning, synthetic pre-training data, and vision foundation models.',
  path: '/publications/',
})

export default function PublicationsLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
