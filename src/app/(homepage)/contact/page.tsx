'use client'

import { SiSlack } from 'react-icons/si'
import Link from 'next/link'
import { RiGlobalLine } from 'react-icons/ri'

export default function ContactPage() {
  return (
    <div className="container mx-auto w-full max-w-4xl space-y-12 px-6 py-12 md:px-8">
      {/* Page header */}
      <header className="fade-in-up flex flex-col items-start gap-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Contact Us
        </h1>
        <div className="section-accent" />
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Have questions about our research or interested in collaboration?
          We&apos;d love to hear from you. Join our community via the channels
          below.
        </p>
      </header>

      {/* Slack panel */}
      <section className="glass-strong relative overflow-hidden rounded-3xl p-8 shadow-lg sm:p-10 md:p-12">
        {/* No tinted backdrop here on purpose — see the hero on the Top page. */}
        <div className="relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-brand-blue-a4 sm:size-20">
            <SiSlack className="size-8 text-brand-blue-11 sm:size-10" />
          </div>

          <div className="flex-1 space-y-3">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              LIMIT.Community Slack WG
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Connect with LIMIT.Community members, share ideas, ask questions,
              and stay up to date on research and events. Join our Slack working
              group from the link below.
            </p>
            <div className="pt-2">
              <Link
                href="https://join.slack.com/t/limit-community/shared_invite/zt-1oov3gv0h-kaLICu0jm_wzm0_H6D46Lw"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-xl border border-button-project bg-button-project px-4 py-2.5 text-button-project-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-button-project-hovered hover:text-button-project-foreground-hovered hover:shadow-md"
              >
                <RiGlobalLine className="size-4 sm:size-5" />
                <span className="text-sm font-semibold sm:text-base">
                  Join Slack WG
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
