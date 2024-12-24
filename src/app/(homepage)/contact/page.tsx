'use client'

import { useState } from 'react'

// shadcn/ui components
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  // Placeholder function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Sending message:', { name, email, message })
    alert('Your message has been submitted (placeholder).')
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <h1>Contact Us</h1>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="mb-1">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="mb-1">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message" className="mb-1">
              Message
            </Label>
            <Textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit">Send</Button>
        </form>
      </CardContent>
    </Card>
  )
}
