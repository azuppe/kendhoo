'use client'

import React, { useState } from 'react'
import { CheckCircle2, ChevronDown, ChevronUp, Clock3, Gauge, Heart, Hotel, Users } from 'lucide-react'

import { Media } from '@/components/Media'
import type { Event } from '@/payload-types'
import { getTitleColorClass } from '@/utilities/getTitleColorClass'

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
    titleColor,
    tripMeta,
    overviewTitle,
    overviewTitleColor,
    overviewDescription,
    includedTitle,
    includedTitleColor,
    includedItems,
    itineraryTitle,
    itineraryTitleColor,
    itineraryItems,
    recommendedTitle,
    recommendedTitleColor,
    recommendedEvents,
  } = event

  const [img1, img2, img3, img4] = images || []

  return (
    <article className="pt-32 pb-16">
      {/* Header */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {images && images.length > 0 && (
            <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[380px] rounded-none overflow-hidden mb-8">
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
            <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              {breadcrumbs.map((crumb, i) => (
                <React.Fragment key={crumb.id || i}>
                  {i > 0 && <span>/</span>}
                  {crumb.url ? (
                    <a href={crumb.url} className="hover:text-foreground">
                      {crumb.label}
                    </a>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          <h1 className={`text-3xl md:text-4xl font-medium mb-3 ${getTitleColorClass(titleColor)}`}>
            {title}
          </h1>

          {tripMeta && tripMeta.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border">
              {tripMeta.map((item, i) => {
                const Icon = metaIcons[item.icon || 'duration']
                return (
                  <div key={item.id || i} className="flex items-start gap-2">
                    <Icon className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground leading-tight">
                        {item.label}
                      </p>
                      {item.sublabel && (
                        <p className="text-xs text-muted-foreground leading-tight">
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
              <h2 className={`text-2xl md:text-3xl font-medium mb-4 text-start ${getTitleColorClass(overviewTitleColor)}`}>
                {overviewTitle}
              </h2>
            )}
            <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
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
              <h2 className={`  text-4xl md:text-5xl font-medium mb-6 text-start ${getTitleColorClass(includedTitleColor)}`}>
                {includedTitle}
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 rounded-none bg-card border border-border p-6">
              {includedItems.map((item, i) => (
                <div key={item.id || i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item.label}</span>
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
              <h2 className={`text-2xl md:text-3xl font-medium mb-6 text-start ${getTitleColorClass(itineraryTitleColor)}`}>
                {itineraryTitle}
              </h2>
            )}

            <div className="relative">
              <div className="absolute start-[7px] top-2 bottom-2 w-px bg-card" />

              {itineraryItems.map((item, i) => {
                const isOpen = openDay === i
                const isLast = i === itineraryItems.length - 1

                return (
                  <div
                    key={item.id || i}
                    className={isLast ? '' : 'border-b border-border mb-6 pb-6'}
                  >
                    <div className="relative flex items-start gap-4">
                      <span className="relative z-10 mt-1.5 shrink-0 w-3.5 h-3.5 rounded-full border-2 border-foreground bg-background" />

                      <button
                        type="button"
                        onClick={() => setOpenDay(isOpen ? null : i)}
                        className="flex-1 flex items-start justify-between gap-4 text-start"
                        aria-expanded={isOpen}
                      >
                        <span className="inline-block px-3 py-1 rounded-none border border-border text-xs font-medium text-muted-foreground">
                          {item.dayLabel}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 shrink-0 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 shrink-0 text-muted-foreground" />
                        )}
                      </button>
                    </div>

                    <div className="ms-[26px] mt-2">
                      <h3 className="text-lg font-medium text-foreground">
                        {item.title}
                      </h3>

                      {isOpen && (
                        <>
                          {item.description && (
                            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                              {item.description}
                            </p>
                          )}

                          {item.images && item.images.length > 0 && (
                            <div className="grid grid-cols-3 gap-3 mt-4">
                              {item.images.map((image, imgIdx) => (
                                <div
                                  key={imgIdx}
                                  className="relative aspect-[4/3] rounded-none overflow-hidden"
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
      {recommendedEvents && recommendedEvents.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto ">
            {recommendedTitle && (
              <h2 className={`  text-4xl md:text-5xl font-medium mb-8 text-start ${getTitleColorClass(recommendedTitleColor)}`}>
                {recommendedTitle}
              </h2>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedEvents.map((recEvent, i) => {
                const CardTag = recEvent.link ? 'a' : 'div'
                return (
                  <CardTag
                    key={recEvent.id || i}
                    {...(recEvent.link ? { href: recEvent.link } : {})}
                    className="rounded-none overflow-hidden bg-background border border-border  transition-shadow flex flex-col"
                  >
                    <div className="relative h-48">
                      {recEvent.image && typeof recEvent.image === 'object' && (
                        <Media fill resource={recEvent.image} imgClassName="object-cover" />
                      )}
                      <div className="absolute top-3 start-3 flex items-center gap-2">
                        {recEvent.badge && (
                          <span className="px-2.5 py-1 text-[11px] font-medium rounded-none bg-foreground text-background">
                            {recEvent.badge}
                          </span>
                        )}
                        {recEvent.ageRange && (
                          <span className="px-2.5 py-1 text-[11px] font-medium rounded-none bg-white/90 text-foreground">
                            {recEvent.ageRange}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-4 flex flex-col gap-2 flex-1">
                      <h3 className="font-medium text-foreground">{recEvent.title}</h3>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {recEvent.durationLabel && <span>{recEvent.durationLabel}</span>}
                        {recEvent.route && <span>{recEvent.route}</span>}
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-medium text-foreground">
                          {recEvent.currency} ${recEvent.price?.toLocaleString()}
                        </span>
                        {recEvent.originalPrice != null && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${recEvent.originalPrice?.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {recEvent.departsOn && (
                        <p className="text-xs font-medium text-foreground">{recEvent.departsOn}</p>
                      )}

                      {Array.isArray(recEvent.tags) && recEvent.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {recEvent.tags.map((tag, ti) => (
                            <span
                              key={tag.id || ti}
                              className="px-2 py-0.5 text-[11px] rounded-none bg-card text-muted-foreground"
                            >
                              {tag.label}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2 mt-auto pt-3">
                        <button
                          type="button"
                          className="flex-1 rounded-none bg-foreground hover:opacity-80 text-background font-medium px-7 py-3 transition-colors"
                        >
                          {recEvent.buttonLabel || 'Book Adventure'}
                        </button>
                        <button
                          type="button"
                          aria-label="Save"
                          className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
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
