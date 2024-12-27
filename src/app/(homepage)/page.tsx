'use client'

import Image from 'next/image'
import Link from 'next/link'
import { HiCursorClick } from 'react-icons/hi'
import { Geist_Mono } from 'next/font/google'

const geistMono = Geist_Mono({
  subsets: ['latin'],
})

import { VisualAtomDesign } from '@/components/visual-atom-design'
import { members, newsItems } from '@/data/topPageData'
import { PaperOceanDesign } from '@/components/paper-ocean-design'

// shadcn/ui components
import { Separator } from '@radix-ui/react-separator'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function TopPage() {
  return (
    <div className="w-full bg-gradient-to-br from-background from-20% via-background-gradation-1 via-50% to-background-gradation-2 to-90%">
      <div className="bg-animated simple-grid flex w-full flex-1 flex-col items-center gap-8">
      {/* About Us */}
      <div className="flex max-w-[1000px] items-center gap-8 px-20 pb-10 pt-16">
        <div className="flex flex-col items-start gap-3 text-foreground">
          <h1 className="mb-2 text-xxxl font-semibold leading-8 tracking-wider">
            Unleash our LIMITless potential
          </h1>
          <p className="mb-5 w-11/12 text-wrap text-m">
            At LIMIT Lab., we embrace the power of collaboration to transcend
            limits in AI and computer vision research. By connecting globally
            and reimagining boundaries, we transform challenges into
            opportunities, unlocking limitless innovation with profound societal
            and industrial impact. Together, we redefine the very concept of
            limits.
          </p>
          <h2 className="text-m font-semibold">Check out the past events</h2>
          <div className="flex gap-4">
            <Button
              className="rounded-2xl bg-button-background text-button-foreground hover:animate-scale-up-center hover:bg-accent hover:text-accent-foreground"
              size="lg"
              asChild
            >
              <Link href="https://lsfsl.net/limit23/" target="_blank">
                <span className="text-sm font-semibold tracking-wider">
                  LIMIT @ICCV2023
                </span>
                <HiCursorClick className="size-5" />
              </Link>
            </Button>
            <Button
              className="rounded-2xl bg-button-background text-button-foreground hover:animate-scale-up-center hover:bg-accent hover:text-accent-foreground"
              size="lg"
              asChild
            >
              <Link
                href="https://hirokatsukataoka16.github.io/CVPR-2024-LIMIT/"
                target="_blank"
              >
                <span className="text-sm font-semibold tracking-wider">
                  LIMIT @CVPR2024
                </span>
                <HiCursorClick className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
        <VisualAtomDesign/>
      </div>

      <Separator
        orientation="horizontal"
        className="h-0.5 w-full bg-muted-foreground"
      />

      {/* Recent News */}
      <div className="flex w-full max-w-[1000px] gap-14 px-20 py-16">
        <Image
          src="https://via.placeholder.com/256"
          alt="stylish image"
          width={256}
          height={256}
        />
        <PaperOceanDesign/>
        <div className="flex w-full flex-col items-start gap-3">
          <h1 className="mb-2 text-xxxl font-semibold leading-8 tracking-wider text-foreground shadow-background drop-shadow-md">
            Recent News
          </h1>
          <div className="space-y-2">
            {newsItems.map((item, index) => (
              <div key={index} className="text-m">
                <strong className={`${geistMono.className}`}>
                  {item.date}:
                </strong>{' '}
                {item.description}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator
        orientation="horizontal"
        className="h-0.5 w-full bg-muted-foreground"
      />

      {/* Member Information */}
      <div className="flex w-full max-w-[1000px] flex-col items-center gap-3 px-20 py-16">
        <h1 className="mb-2 text-xxxl font-semibold leading-8 tracking-wider text-foreground shadow-background drop-shadow-md">
          Our Members
        </h1>
        <div className="flex w-full flex-col items-center">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {members.map((member, idx) => (
              <Card key={idx} className="pb-1 pt-5 shadow backdrop-blur-sm">
                <CardContent>
                  <div className="flex justify-center">
                    <Avatar className="size-16">
                      <AvatarImage src={member.photoUrl} alt={member.name} />
                      <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-1 pt-3 text-center">
                    <div className="font-semibold">{member.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {member.affiliation}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
