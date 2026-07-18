import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { TripHeaderBlock } from '@/blocks/TripHeader/Component'
import { TripOverviewBlock } from '@/blocks/TripOverview/Component'
import { WhatsIncludedBlock } from '@/blocks/WhatsIncluded/Component'
import { EventTimelineBlock } from '@/blocks/EventTimeline/Component'
import { RecommendedToursBlock } from '@/blocks/RecommendedTours/Component'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { TypedLocale } from 'payload'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const events = await payload.find({
    collection: 'events',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return events.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
    locale?: TypedLocale
  }>
}

export default async function EventPage({ params: paramsPromise }: Args) {
  const { slug = '', locale = 'en' } = await paramsPromise
  const url = '/events/' + slug
  const event = await queryEvent({ slug, locale })

  if (!event) return <PayloadRedirects url={url} />

  return (
    <article className="pb-16">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />

      <TripHeaderBlock
        images={event.images || []}
        breadcrumbs={event.breadcrumbs}
        title={event.title}
        rating={event.rating}
        reviewCount={event.reviewCount}
        meta={event.tripMeta}
        priceCard={event.priceCard}
      />

      <TripOverviewBlock title={event.overviewTitle} description={event.overviewDescription} />

      {event.includedItems && event.includedItems.length > 0 && (
        <WhatsIncludedBlock title={event.includedTitle} items={event.includedItems} />
      )}

      {event.itineraryItems && event.itineraryItems.length > 0 && (
        <EventTimelineBlock title={event.itineraryTitle} items={event.itineraryItems} />
      )}

      {event.recommendedTours && event.recommendedTours.length > 0 && (
        <RecommendedToursBlock title={event.recommendedTitle} tours={event.recommendedTours as any} />
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale = 'en' } = await paramsPromise
  const event = await queryEvent({ slug, locale })

  return generateMeta({ doc: event })
}

const queryEvent = cache(async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'events',
    draft,
    limit: 1,
    overrideAccess: draft,
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
