import React from 'react'
import { Heart } from 'lucide-react'

import { Media } from '@/components/Media'

type RecommendedTour = {
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

export type RecommendedToursBlockProps = {
  title?: string | null
  tours: RecommendedTour[]
}

export const RecommendedToursBlock: React.FC<RecommendedToursBlockProps> = ({ title, tours }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4  ">
        {title && (
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-start">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours?.map((tour, i) => {
            const CardTag = tour.link ? 'a' : 'div'
            return (
              <CardTag
                key={i}
                {...(tour.link ? { href: tour.link } : {})}
                className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="relative h-48">
                  {tour.image && typeof tour.image === 'object' && (
                    <Media fill resource={tour.image} imgClassName="object-cover" />
                  )}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    {tour.badge && (
                      <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-gray-900 text-white">
                        {tour.badge}
                      </span>
                    )}
                    {tour.ageRange && (
                      <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/90 text-gray-700">
                        {tour.ageRange}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="font-bold text-gray-900">{tour.title}</h3>

                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    {tour.durationLabel && <span>{tour.durationLabel}</span>}
                    {tour.route && <span>{tour.route}</span>}
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-gray-900">
                      {tour.currency} ${tour.price?.toLocaleString()}
                    </span>
                    {tour.originalPrice != null && (
                      <span className="text-sm text-gray-400 line-through">
                        ${tour.originalPrice?.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {tour.departsOn && (
                    <p className="text-xs font-medium text-gray-700">{tour.departsOn}</p>
                  )}

                  {Array.isArray(tour.tags) && tour.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {tour.tags.map((tag, ti) => (
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
                      className="flex-1 rounded-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-2.5 transition-colors"
                    >
                      {tour.buttonLabel || 'Book Adventure'}
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
