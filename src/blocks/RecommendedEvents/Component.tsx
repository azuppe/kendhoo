import React from 'react'
import { Heart } from 'lucide-react'

import { Media } from '@/components/Media'

type RecommendedEvent = {
  image: any
  badge?: string | null
  ageRange?: string | null
  title: string
  durationLabel?: string | null
  route?: string | null
  price: number
  originalPrice?: number | null
  currency?: string | null
  departsOn?: string | null
  tags?: { label: string }[] | null
  buttonLabel?: string | null
  link?: string | null
}

export type RecommendedEventsBlockProps = {
  title?: string | null
  events: RecommendedEvent[]
}

export const RecommendedEventsBlock: React.FC<RecommendedEventsBlockProps> = ({
  title,
  events,
}) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4  ">
        {title && (
          <h2 className="  text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-start">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((event, i) => {
            const CardTag = event.link ? 'a' : 'div'
            return (
              <CardTag
                key={i}
                {...(event.link ? { href: event.link } : {})}
                className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="relative h-48">
                  {event.image && typeof event.image === 'object' && (
                    <Media fill resource={event.image} imgClassName="object-cover" />
                  )}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    {event.badge && (
                      <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-gray-900 text-white">
                        {event.badge}
                      </span>
                    )}
                    {event.ageRange && (
                      <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/90 text-gray-700">
                        {event.ageRange}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="font-bold text-gray-900">{event.title}</h3>

                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    {event.durationLabel && <span>{event.durationLabel}</span>}
                    {event.route && <span>{event.route}</span>}
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-gray-900">
                      {event.currency} ${event.price?.toLocaleString()}
                    </span>
                    {event.originalPrice != null && (
                      <span className="text-sm text-gray-400 line-through">
                        ${event.originalPrice?.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {event.departsOn && (
                    <p className="text-xs font-medium text-gray-700">{event.departsOn}</p>
                  )}

                  {Array.isArray(event.tags) && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {event.tags.map((tag, ti) => (
                        <span
                          key={ti}
                          className="px-2 py-0.5 text-[11px] rounded-full bg-gray-100 text-gray-600"
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-auto pt-3">
                    <button
                      type="button"
                      className="flex-1 rounded-full bg-gray-900 hover:bg-black text-white font-medium px-7 py-3 transition-colors"
                    >
                      {event.buttonLabel || 'Book Adventure'}
                    </button>
                    <button
                      type="button"
                      aria-label="Save"
                      className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardTag>
            )
          })}
        </div>
      </div>
    </section>
  )
}
