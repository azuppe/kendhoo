import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import React from 'react'

import { EventsBrowser, type BrowserEvent } from '@/components/Events/EventsBrowser'
import PageClient from './page.client'

export const revalidate = 600

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function EventsPage({ params }: Args) {
  const { locale = 'en' } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'events',
    locale,
    depth: 1,
    limit: 200,
    sort: 'startDate',
    overrideAccess: false,
    where: { _status: { equals: 'published' } },
  })

  const events: BrowserEvent[] = docs.map((event) => {
    const image = event.images?.[0]
    const img = image && typeof image === 'object' ? image : null
    return {
      id: String(event.id),
      slug: event.slug as string,
      title: event.title,
      startDate: event.startDate ?? null,
      endDate: event.endDate ?? null,
      venue: event.venue ?? null,
      isFree: Boolean(event.isFree),
      description: event.overviewDescription ?? null,
      imageUrl: img?.url ?? null,
      imageAlt: img?.alt ?? event.title,
    }
  })

  return (
    <div className="container mx-auto px-4 pb-24 pt-36 md:px-8">
      <PageClient />
      <p className="eyebrow-brass">What is on</p>
      <h1 className="mt-4 text-6xl leading-none md:text-8xl">Events</h1>
      <p className="mt-6 max-w-xl text-[17px] text-muted-foreground">
        Gatherings, festivals and happenings on Kendhoo, soonest first.
      </p>
      <div className="mt-14">
        <EventsBrowser events={events} locale={locale} />
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Events',
    description: 'Upcoming events and happenings on Kendhoo.',
  }
}
