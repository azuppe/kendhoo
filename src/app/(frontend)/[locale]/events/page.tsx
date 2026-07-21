import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import React from 'react'

import { TornImage, TornImageDefs } from '@/components/TornImage'
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

  const { docs: events } = await payload.find({
    collection: 'events',
    locale,
    depth: 1,
    limit: 50,
    sort: '-publishedAt',
    overrideAccess: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return (
    <div className="pt-32 pb-24">
      <PageClient />

      <div className="container mx-auto px-4  ">
        <h1 className="  text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-start">
          Most Popular Places
        </h1>

        <TornImageDefs />

        <div className="flex flex-col gap-16 md:gap-24">
          {events.map((event, i) => {
            const image = event.images?.[0]
            const imageUrl = image && typeof image === 'object' ? image.url : null
            const subtitle = event.breadcrumbs?.find(
              (b): b is { label: string; url?: string | null; id?: string | null } =>
                typeof b === 'object' && !!b?.label,
            )?.label
            const reversed = i % 2 === 1
            const number = String(i + 1).padStart(2, '0')

            return (
              <div
                key={event.id}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                  reversed ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`relative w-full md:w-1/2 flex ${reversed ? 'md:justify-end' : 'md:justify-start'}`}
                >
                  <div className="relative w-full max-w-md aspect-[4/3]">
                    {imageUrl && (
                      <div className="absolute inset-0">
                        <TornImage src={imageUrl} alt={typeof image === 'object' ? image.alt : undefined} />
                      </div>
                    )}
                    <span
                      className={`absolute -bottom-8 md:-bottom-10 select-none text-transparent text-[100px] md:text-[140px] font-bold leading-none pointer-events-none ${
                        reversed ? '-right-2 md:-right-6' : '-left-2 md:-left-6'
                      }`}
                      style={{ WebkitTextStroke: '1.5px rgb(209 213 219)' }}
                      aria-hidden="true"
                    >
                      {number}
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                    {event.title}
                  </h3>
                  {subtitle && (
                    <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
                  )}
                  {event.overviewDescription && (
                    <p className="text-sm text-gray-500 leading-relaxed mt-4 max-w-md">
                      {event.overviewDescription}
                    </p>
                  )}
                  <a
                    href={`/${locale}/events/${event.slug}`}
                    className="inline-block mt-6 px-6 py-2.5 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
                  >
                    Read More
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Events',
  }
}
