import type { ReactNode } from 'react'

import { pageMetadata } from '@/lib/site'

// `page.tsx` is a client component and cannot export metadata itself, so this
// server layout supplies it for the /contact segment.
export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get in touch with LIMIT.Lab or join the LIMIT.Community Slack working group to collaborate with our researchers.',
  path: '/contact/',
})

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children
}
