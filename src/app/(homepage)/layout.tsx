'use client'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function SharedUILayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background from-20% via-background-gradation-1 via-50% to-background-gradation-2 to-90%">
      <div className='flex flex-col items-center bg-animated simple-grid w-full min-h-screen overflow-x-hidden'>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  )
}
