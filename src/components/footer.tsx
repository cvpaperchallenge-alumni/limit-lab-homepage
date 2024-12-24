'use client'

// shadcn/ui components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <div className="flex w-full flex-col items-center justify-between space-y-2 bg-muted p-6 text-muted-foreground md:flex-row md:space-y-0">
      {/* Placeholder logo */}
      <div className="flex items-center space-x-2">
        <Avatar className="size-6">
          <AvatarImage src="https://via.placeholder.com/24" alt="Logo" />
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <span>Awesome Lab</span>
      </div>

      <div className="text-xs md:text-s">
        © 2024 Awesome Lab. All rights reserved.
      </div>

      <div className="text-xs md:text-s">
        Developed by{' '}
        <Button variant="link" asChild>
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            xxx
          </a>
        </Button>
      </div>
    </div>
  )
}
