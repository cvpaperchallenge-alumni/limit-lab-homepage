'use client'

import { PiSlackLogoLight } from 'react-icons/pi'
import Link from 'next/link'
import { RiGlobalLine } from 'react-icons/ri'

// shadcn/ui components
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

export default function ContactPage() {
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [subject, setSubject] = useState('')
  // const [message, setMessage] = useState('')
  // const [isSubmitting, setIsSubmitting] = useState(false)
  // const [submitStatus, setSubmitStatus] = useState<
  //   'idle' | 'success' | 'error'
  // >('idle')

  // Form submission handler
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsSubmitting(true)
  //   setSubmitStatus('idle')

  //   try {
  //     // Simulate API call with timeout
  //     await new Promise((resolve) => setTimeout(resolve, 1500))
  //     console.log('Sending message:', { name, email, subject, message })

  //     // Reset form
  //     setName('')
  //     setEmail('')
  //     setSubject('')
  //     setMessage('')
  //     setSubmitStatus('success')
  //   } catch (error) {
  //     console.error('Error sending message:', error)
  //     setSubmitStatus('error')
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }

  return (
    <div className="flex w-11/12 flex-1 flex-col items-center gap-8 py-8 sm:w-4/5 sm:gap-12 md:gap-16">
      {/* Page Title */}
      <div className="w-full max-w-[1000px] text-center">
        <h1 className="mb-2 text-2xl font-semibold leading-7 tracking-wider text-foreground shadow-background drop-shadow-md sm:text-3xl md:text-4xl md:leading-10">
          Contact Us
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-sub sm:text-base">
          Have questions about our research or interested in collaboration?
          We&apos;d love to hear from you. Reach out using the form below or
          through our contact information.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex w-full max-w-[1000px] flex-col gap-8 lg:flex-row">
        {/* Contact Information */}
        <div className="w-full animate-fade-in-top">
          <Card className="bg-card/70 h-full overflow-hidden border-block-border backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold sm:text-2xl">
                How to connect our community
              </CardTitle>
              <CardDescription className="text-sm font-semibold text-sub">
                Connect with LIMIT.Community members through various channels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <PiSlackLogoLight className="mt-1 size-5 shrink-0 text-accent-foreground" />
                  <div>
                    <h3 className="font-medium">LIMIT.Community Slack WG</h3>
                    <div className="flex w-full flex-wrap gap-2 sm:flex-nowrap sm:gap-4">
                      <p className="text-sm text-sub">
                        Join our LIMIT.Community Slack WG from the link below.
                      </p>
                      <br />
                    </div>
                    <div className="flex w-full flex-wrap gap-2 sm:flex-nowrap sm:gap-4">
                      <Link
                        href="https://join.slack.com/t/limit-community/shared_invite/zt-1oov3gv0h-kaLICu0jm_wzm0_H6D46Lw"
                        target="_blank"
                        className="flex h-auto items-center gap-1 rounded-md border border-button-project bg-button-project px-2 py-1.5 text-button-project-foreground hover:bg-button-project-hovered hover:text-button-project-foreground-hovered sm:gap-2 sm:px-3 sm:py-2"
                      >
                        <RiGlobalLine className="size-4 sm:size-5" />
                        <span className="text-xs font-medium sm:text-sm">
                          Join Slack WG
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* <div className="flex items-start gap-3">
                  <HiOutlineMail className="mt-1 size-5 shrink-0 text-accent-foreground" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-sub">
                      contact@limitlab.example.com
                    </p>
                  </div>
                </div> */}

                {/* <div className="flex items-start gap-3">
                  <HiOutlinePhone className="mt-1 size-5 shrink-0 text-accent-foreground" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm text-sub">+81 (0)3-1234-5678</p>
                  </div>
                </div> */}

                {/* <div className="flex items-start gap-3">
                  <HiOutlineAcademicCap className="mt-1 size-5 shrink-0 text-accent-foreground" />
                  <div>
                    <h3 className="font-medium">Academic Inquiries</h3>
                    <p className="text-sm text-sub">
                      For research collaborations and academic inquiries:
                      <br />
                      research@limitlab.example.com
                    </p>
                  </div>
                </div> */}
              </div>

              {/* <Separator className="h-[2px]" /> */}

              {/* Social Links */}
              {/* <div>
                <h3 className="mb-3 font-medium">Follow Us</h3>
                <div className="flex gap-4">
                  <Link
                    href="https://github.com/limitlab"
                    target="_blank"
                    className="flex items-center gap-2 rounded-md border border-input bg-button-background px-3 py-2 text-sm text-button-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <RxGithubLogo className="size-4" />
                    <span>GitHub</span>
                  </Link>
                  <Link
                    href="https://twitter.com/limitlab"
                    target="_blank"
                    className="flex items-center gap-2 rounded-md border border-input bg-button-background px-3 py-2 text-sm text-button-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <PiXLogo className="size-4" />
                    <span>X</span>
                  </Link>
                </div>
              </div> */}
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
      </div>

      {/* Map Section */}
      {/* <div className="w-full max-w-[1000px] overflow-hidden rounded-xl border border-block-border">
        <div className="aspect-video w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.827853707428!2d139.76454987617074!3d35.68124152999252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bfbd89f700b%3A0x277c49ba34ed38!2sTokyo%20Station!5e0!3m2!1sen!2sjp!4v1715530217062!5m2!1sen!2sjp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="LIMIT Lab Location"
            className="bg-muted"
          ></iframe>
        </div>
      </div> */}
    </div>
  )
}
