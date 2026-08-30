'use client'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function SharedUILayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background from-20% via-background-gradation-1 via-50% to-background-gradation-2 to-90%">
      <div className="bg-animated simple-grid relative flex min-h-screen w-full flex-col items-center overflow-x-hidden">
        {/* No ambient colour wash here on purpose. The page keeps the faint
            --blue-1/--blue-2 background gradient it has always had; blue is
            carried by the accents (atom, nav, links, hovers, section bars). */}
        <Header />
        <main className="relative flex w-full flex-1 flex-col items-center pt-24 sm:pt-28">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
