'use client'

import React, { useState } from 'react'
import { CheckCircle2, ChevronDown, ChevronUp, Clock3, Gauge, Heart, Hotel, Users } from 'lucide-react'

import { Media } from '@/components/Media'
import type { Event } from '@/payload-types'

export type EventDetailProps = {
  event: Event
}

const metaIcons = {
  duration: Clock3,
  groupSize: Users,
  pacing: Gauge,
  accommodation: Hotel,
}

export const EventDetail: React.FC<EventDetailProps> = ({ event }) => {
  const [openDay, setOpenDay] = useState<number | null>(0)

  const {
    images,
    breadcrumbs,
    title,
    tripMeta,
    overviewTitle,
    overviewDescription,
    includedTitle,
    includedItems,
    itineraryTitle,
    itineraryItems,
    recommendedTitle,
    recommendedTours,
  } = event

  const [img1, img2, img3, img4] = images || []

  return (
    <article className="pt-32 pb-16">
      {/* Header */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {images && images.length > 0 && (
            <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[380px] rounded-3xl overflow-hidden mb-8">
              {img1 && typeof img1 === 'object' && (
                <div className="relative col-span-1 row-span-2">
                  <Media resource={img1} fill imgClassName="object-cover" />
                </div>
              )}
              {img2 && typeof img2 === 'object' && (
                <div className="relative col-span-2 row-span-2">
                  <Media resource={img2} fill imgClassName="object-cover" />
                </div>
              )}
              {img3 && typeof img3 === 'object' && (
                <div className="relative col-span-1 row-span-1">
                  <Media resource={img3} fill imgClassName="object-cover" />
                </div>
              )}
              {img4 && typeof img4 === 'object' && (
                <div className="relative col-span-1 row-span-1">
                  <Media resource={img4} fill imgClassName="object-cover" />
                </div>
              )}
            </div>
          )}

          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
              {breadcrumbs.map((crumb, i) => (
                <React.Fragment key={crumb.id || i}>
                  {i > 0 && <span>/</span>}
                  {crumb.url ? (
                    <a href={crumb.url} className="hover:text-gray-800 dark:hover:text-gray-200">
                      {crumb.label}
                    </a>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            {title}
          </h1>

          {tripMeta && tripMeta.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-gray-100 dark:border-gray-800">
              {tripMeta.map((item, i) => {
                const Icon = metaIcons[item.icon || 'duration']
                return (
                  <div key={item.id || i} className="flex items-start gap-2">
                    <Icon className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                        {item.label}
                      </p>
                      {item.sublabel && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                          {item.sublabel}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Trip Overview */}
      {overviewDescription && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            {overviewTitle && (
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-start">
                {overviewTitle}
              </h2>
            )}
            <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
              {overviewDescription
                .split(/\n+/)
                .filter(Boolean)
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* What's Included */}
      {includedItems && includedItems.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            {includedTitle && (
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-start">
                {includedTitle}
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6">
              {includedItems.map((item, i) => (
                <div key={item.id || i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Itinerary */}
      {itineraryItems && itineraryItems.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            {itineraryTitle && (
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-start">
                {itineraryTitle}
              </h2>
            )}

            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-800" />

              {itineraryItems.map((item, i) => {
                const isOpen = openDay === i
                const isLast = i === itineraryItems.length - 1

                return (
                  <div
                    key={item.id || i}
                    className={isLast ? '' : 'border-b border-gray-100 dark:border-gray-800 mb-6 pb-6'}
                  >
                    <div className="relative flex items-start gap-4">
                      <span className="relative z-10 mt-1.5 shrink-0 w-3.5 h-3.5 rounded-full border-2 border-gray-900 dark:border-gray-100 bg-white dark:bg-gray-950" />

                      <button
                        type="button"
                        onClick={() => setOpenDay(isOpen ? null : i)}
                        className="flex-1 flex items-start justify-between gap-4 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="inline-block px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400">
                          {item.dayLabel}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 shrink-0 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 shrink-0 text-gray-500" />
                        )}
                      </button>
                    </div>

                    <div className="ml-[26px] mt-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {item.title}
                      </h3>

                      {isOpen && (
                        <>
                          {item.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-2">
                              {item.description}
                            </p>
                          )}

                          {item.images && item.images.length > 0 && (
                            <div className="grid grid-cols-3 gap-3 mt-4">
                              {item.images.map((image, imgIdx) => (
                                <div
                                  key={imgIdx}
                                  className="relative aspect-[4/3] rounded-2xl overflow-hidden"
                                >
                                  {image && typeof image === 'object' && (
                                    <Media resource={image} fill imgClassName="object-cover" />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Recommended For You */}
      {recommendedTours && recommendedTours.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto ">
            {recommendedTitle && (
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-start">
                {recommendedTitle}
              </h2>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedTours.map((tour, i) => {
                const CardTag = tour.link ? 'a' : 'div'
                return (
                  <CardTag
                    key={tour.id || i}
                    {...(tour.link ? { href: tour.link } : {})}
                    className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                  >
                    <div className="relative h-48">
                      {tour.image && typeof tour.image === 'object' && (
                        <Media fill resource={tour.image} imgClassName="object-cover" />
                      )}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        {tour.badge && (
                          <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-red-500 text-white">
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
                      <h3 className="font-bold text-gray-900 dark:text-gray-100">{tour.title}</h3>

                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {tour.durationLabel && <span>{tour.durationLabel}</span>}
                        {tour.route && <span>{tour.route}</span>}
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-extrabold text-gray-900 dark:text-gray-100">
                          {tour.currency} ${tour.price?.toLocaleString()}
                        </span>
                        {tour.originalPrice != null && (
                          <span className="text-sm text-gray-400 line-through">
                            ${tour.originalPrice?.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {tour.departsOn && (
                        <p className="text-xs font-medium text-pink-600">{tour.departsOn}</p>
                      )}

                      {Array.isArray(tour.tags) && tour.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {tour.tags.map((tag, ti) => (
                            <span
                              key={tag.id || ti}
                              className="px-2 py-0.5 text-[11px] rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
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
                          className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-800 text-gray-400 hover:text-red-500 transition-colors"
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
      )}
    </article>
  )
}
