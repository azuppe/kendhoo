import React from 'react'
import configPromise from '@payload-config'
import Link from 'next/link'
import { getPayload, TypedLocale } from 'payload'
import { ArrowUpRight } from 'lucide-react'

import type { Event } from '@/payload-types'
import { Media } from '@/components/Media'
import { getTitleColorClass } from '@/utilities/getTitleColorClass'

export type EventsListBlockProps = {
  title?: string | null
  titleColor?: ('dark' | 'light') | null
  events?: (number | string | Event)[] | null
  linkLabel?: string | null
  locale: TypedLocale
}

export const EventsListBlock: React.FC<EventsListBlockProps> = async ({
  title,
  titleColor,
  events,
  linkLabel,
  locale,
}) => {
  if (!events || events.length === 0) return null

  const unresolvedIds = events.filter((event): event is number | string => typeof event !== 'object')

  const resolvedEvents =
    unresolvedIds.length > 0
      ? await (
          await getPayload({ config: configPromise })
        ).find({
          collection: 'events',
          where: { id: { in: unresolvedIds } },
          depth: 1,
          locale,
          limit: unresolvedIds.length,
        })
      : null

  const fullEvents = events
    .map((event) =>
      typeof event === 'object'
        ? event
        : resolvedEvents?.docs.find((doc) => doc.id === event),
    )
    .filter((event): event is Event => Boolean(event))

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className={`text-2xl md:text-3xl font-bold mb-6 text-start ${getTitleColorClass(titleColor)}`}>
            {title}
          </h2>
        )}

        <div className="divide-y divide-gray-100">
          {fullEvents.map((event) => {
            const image = event.images?.[0]
            const href = `/${locale}/events/${event.slug}`
            const summary = event.overviewDescription
            const meta = event.tripMeta?.[0]

            return (
              <article key={event.id} className="flex flex-col sm:flex-row gap-4 py-6">
                <Link
                  href={href}
                  className="relative w-full sm:w-40 h-40 sm:h-28 shrink-0 overflow-hidden rounded-2xl bg-gray-100"
                >
                  {image && typeof image === 'object' && (
                    <Media resource={image} fill imgClassName="object-cover" />
                  )}
                </Link>

                <div className="flex-1 flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    <Link href={href}>{event.title}</Link>
                  </h3>

                  {meta?.label && (
                    <p className="text-sm text-gray-500">
                      {meta.label}
                      {meta.sublabel ? ` · ${meta.sublabel}` : ''}
                    </p>
                  )}

                  {summary && <p className="text-sm text-gray-500 line-clamp-2">{summary}</p>}

                  <Link
                    href={href}
                    className="inline-flex items-center gap-1 mt-2 text-sm font-semibold text-gray-900 hover:underline w-fit"
                  >
                    {linkLabel || 'View Event'}
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
