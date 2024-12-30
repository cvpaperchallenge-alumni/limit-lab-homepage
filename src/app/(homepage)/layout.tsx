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
      <div className="bg-animated simple-grid flex min-h-screen w-full flex-col items-center overflow-x-hidden">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  )
}
