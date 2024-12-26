"use client";

import Image from 'next/image'
// shadcn/ui components
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// optional if you'd like a scroll for news, etc.
// ^ If you have a typography wrapper, else you can keep using <p>, or create your own wrapper

export default function TopPage() {
  // Sample data for recent news
  const newsItems = [
    { date: '2024-10-01', description: 'Launched our new AI project.' },
    { date: '2024-08-15', description: 'Presented at ABC Conference.' },
    { date: '2024-05-20', description: 'Welcomed new members to the lab.' },
  ]

  // Sample data for members
  const members = [
    {
      name: 'Alice Johnson',
      affiliation: 'Ph.D. Student',
      photoUrl: 'https://via.placeholder.com/150',
    },
    {
      name: 'Bob Smith',
      affiliation: 'Postdoc Researcher',
      photoUrl: 'https://via.placeholder.com/150',
    },
    {
      name: 'Charlie Davis',
      affiliation: 'Principal Investigator',
      photoUrl: 'https://via.placeholder.com/150',
    },
    {
      name: 'Diana Martin',
      affiliation: 'Research Assistant',
      photoUrl: 'https://via.placeholder.com/150',
    },
  ]

  return (
    <div className="flex-1 w-full justify-items-center space-y-8 bg-gradient-to-br from-background from-20% via-background-gradation-1 via-50% to-background-gradation-2 to-90%">
    {/* <div className="flex-1 space-y-8 bg-background"> */}
      {/* Lab Description */}
      <div className='flex items-center max-w-[1000px] px-10 pb-10 pt-16 '>
        <div className="flex flex-col items-start">
            {/* If you have a custom TypographyH1 component, use it; otherwise a <div> or <p> might be unavoidable */}
          <h1 className='mb-2 text-xl font-semibold tracking-wider leading-8 text-foreground shadow-background drop-shadow-md'>
            Unleash our LIMITless potential
          </h1>
          <p className="mb-5 w-11/12 text-m text-wrap text-card-foreground">
          At LIMIT Lab., we embrace the power of collaboration to transcend limits in AI and computer vision research. By connecting globally and reimagining boundaries, we transform challenges into opportunities, unlocking limitless innovation with profound societal and industrial impact. Together, we redefine the very concept of limits.
          </p>
        </div>
        {/* <Image
          src="https://via.placeholder.com/256"
          alt="stylish image"
          width={256}
          height={256}
        /> */}
        <div className="relative w-full h-[500px] overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-blue-500 rounded-full
                      -translate-x-1/2 -translate-y-1/2">
          </div>
          <div className="particle-1"></div>
          <div className="particle-1"></div>
          <div className="particle-1"></div>
          <div className="particle-2"></div>
          <div className="particle-2"></div>
          <div className="particle-2"></div>
          <div className="particle-3"></div>
          <div className="particle-3"></div>
          <div className="particle-3"></div>
          <div className="particle-4"></div>
          <div className="particle-4"></div>
          <div className="particle-4"></div>
        </div>
      </div>

      {/* Recent News */}
      <Card>
        <CardHeader>
          <h2>Recent News</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {newsItems.map((item, index) => (
              <div key={index} className="text-s">
                <strong>{item.date}:</strong> {item.description}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Member Information */}
      <Card>
        <CardHeader>
          <h2>Our Members</h2>
        </CardHeader>
        <CardContent>
          {/* Grid-like layout using Tailwind, but still inside a shadcn/ui <CardContent> */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {members.map((member, idx) => (
              <Card key={idx} className="p-4">
                <CardContent>
                  <div className="mb-3 flex justify-center">
                    <Avatar className="size-24">
                      <AvatarImage src={member.photoUrl} alt={member.name} />
                      <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-1 text-center">
                    <div className="font-semibold">{member.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {member.affiliation}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
