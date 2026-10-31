import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import React from 'react'
import { ArrowRight, MapPin } from 'lucide-react'

import { Media } from '@/components/Media'
import PageClient from './page.client'

export const revalidate = 600

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function ThingsToDoPage({ params }: Args) {
  const { locale = 'en' } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs: activities } = await payload.find({
    collection: 'activities',
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

      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-medium text-foreground mb-3 text-start">
          Things To Do
        </h1>
        <p className="text-muted-foreground mb-12 max-w-xl">
          Local activities and experiences, guided by trusted providers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => {
            const islandName =
              typeof activity.island === 'object' && activity.island ? activity.island.name : undefined
            const location = activity.locationLabel || islandName

            return (
              <a
                key={activity.id}
                href={`/${locale}/things-to-do/${activity.slug}`}
                className="group rounded-none overflow-hidden bg-background border border-border  transition-shadow"
              >
                <div className="relative h-48">
                  {activity.heroImage && typeof activity.heroImage === 'object' && (
                    <Media resource={activity.heroImage} fill imgClassName="object-cover" />
                  )}
                  {activity.categoryTag && (
                    <span className="absolute top-3 start-3 px-2.5 py-1 text-[11px] font-medium rounded-none bg-white/90 text-foreground">
                      {activity.categoryTag}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-foreground">{activity.title}</h3>
                  {location && (
                    <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {location}
                    </p>
                  )}
                  {activity.priceRange && (
                    <p className="text-sm font-medium text-foreground mt-2">{activity.priceRange}</p>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 mt-3 group-hover:gap-2 transition-all">
                    View activity <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Things To Do',
  }
}
