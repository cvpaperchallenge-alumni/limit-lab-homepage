// "use client";

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
    <div className="flex-1 space-y-8">
      {/* Lab Description */}
      <Card>
        <CardHeader>
          {/* If you have a custom TypographyH1 component, use it; otherwise a <div> or <p> might be unavoidable */}
          <h1>Welcome to Awesome Lab</h1>
        </CardHeader>
        <CardContent>
          <p>
            We are a research laboratory focused on cutting-edge technologies in
            artificial intelligence, human-computer interaction, and data
            science. Our mission is to innovate and collaborate on
            forward-thinking projects that shape the future.
          </p>
        </CardContent>
      </Card>

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
