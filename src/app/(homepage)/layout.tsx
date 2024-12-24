'use client'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function SharedUILayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
