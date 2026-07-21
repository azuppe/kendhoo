import React from 'react'
import {
  BadgeCheck,
  CheckCircle2,
  Clock,
  Droplets,
  MapPin,
  Phone,
  ShieldAlert,
  Shirt,
  Sun,
  Tag as TagIcon,
  Timer,
  BarChart3,
  Calendar,
  Info,
  ArrowRight,
} from 'lucide-react'

import { Media } from '@/components/Media'
import type { Activity } from '@/payload-types'

export type ActivityDetailProps = {
  activity: Activity
  locale: string
}

const beforeYouGoIcons: Record<string, React.ElementType> = {
  sunscreen: Sun,
  clothing: Shirt,
  weather: Sun,
  safety: ShieldAlert,
  age: Info,
  swimming: Droplets,
  time: Clock,
  info: Info,
}

const difficultyLabels: Record<string, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  challenging: 'Challenging',
}

export const ActivityDetail: React.FC<ActivityDetailProps> = ({ activity, locale }) => {
  const {
    title,
    heroImage,
    intro,
    categoryTag,
    island,
    locationLabel,
    duration,
    bestTime,
    priceRange,
    difficulty,
    aboutTitle,
    aboutDescription,
    highlightsTitle,
    highlights,
    providersTitle,
    providers,
    galleryImages,
    beforeYouGoTitle,
    beforeYouGoItems,
    locationTitle,
    locationDescription,
    locationNote,
    mapImage,
    mapLink,
    relatedTitle,
    relatedActivities,
  } = activity

  const islandName = typeof island === 'object' && island ? island.name : undefined
  const resolvedLocation = locationLabel || islandName

  const quickInfo = [
    { icon: MapPin, label: 'Location', value: resolvedLocation },
    { icon: Clock, label: 'Duration', value: duration },
    { icon: Calendar, label: 'Best time', value: bestTime },
    { icon: TagIcon, label: 'Price range', value: priceRange },
    { icon: BarChart3, label: 'Difficulty', value: difficulty ? difficultyLabels[difficulty] : undefined },
  ].filter((item) => item.value)

  const aboutParagraphs = (aboutDescription || '')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <article className="pb-16 md:pb-24">
      {/* Hero */}
      <section className="relative h-[380px] md:h-[460px] w-full overflow-hidden">
        {heroImage && typeof heroImage === 'object' && (
          <Media resource={heroImage} fill imgClassName="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8 md:pb-10">
            {categoryTag && (
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium text-white ring-1 ring-white/30">
                {categoryTag}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
              {title}
            </h1>
            {intro && (
              <p className="mt-3 text-sm md:text-base text-white/85 max-w-xl">{intro}</p>
            )}
          </div>
        </div>
      </section>

      {/* Quick details */}
      {quickInfo.length > 0 && (
        <section className="bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
              <span className="text-sm font-bold text-gray-900 shrink-0">Quick details</span>
              {quickInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <p className="text-[11px] text-gray-400 leading-tight">{item.label}</p>
                    <p className="text-sm font-medium text-gray-900 leading-tight">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 pt-12">
          {/* About */}
          <div>
            {aboutTitle && (
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{aboutTitle}</h2>
            )}
            {aboutParagraphs.length > 0 && (
              <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                {aboutParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}

            {highlights && highlights.length > 0 && (
              <div className="mt-8">
                {highlightsTitle && (
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{highlightsTitle}</h3>
                )}
                <ul className="space-y-3">
                  {highlights.map((h, i) => (
                    <li key={h.id || i} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Providers */}
          {providers && providers.length > 0 && (
            <div>
              {providersTitle && (
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{providersTitle}</h2>
              )}
              <div className="flex flex-col gap-4">
                {providers.map((provider, i) => {
                  const waNumber = provider.whatsapp?.replace(/[^0-9]/g, '')
                  return (
                    <div
                      key={provider.id || i}
                      className="flex gap-4 rounded-2xl border border-gray-100 bg-white shadow-sm p-4"
                    >
                      {provider.logo && typeof provider.logo === 'object' && (
                        <div className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-xl overflow-hidden">
                          <Media resource={provider.logo} fill imgClassName="object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900">{provider.name}</h3>
                          {provider.verified && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                              <BadgeCheck className="w-3.5 h-3.5" /> Verified
                            </span>
                          )}
                        </div>
                        {provider.description && (
                          <p className="text-xs text-gray-500 mt-1">{provider.description}</p>
                        )}

                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                          {provider.startingPrice && (
                            <span className="flex items-center gap-1">
                              <TagIcon className="w-3.5 h-3.5 text-gray-400" />
                              {provider.startingPrice}
                            </span>
                          )}
                          {provider.duration && (
                            <span className="flex items-center gap-1">
                              <Timer className="w-3.5 h-3.5 text-gray-400" />
                              {provider.duration}
                            </span>
                          )}
                        </div>

                        {provider.included && (
                          <p className="text-xs text-gray-500 mt-1">
                            Inclusions: {provider.included}
                          </p>
                        )}
                        {provider.availableTimes && (
                          <p className="text-xs text-gray-500 mt-1">
                            Available: {provider.availableTimes}
                          </p>
                        )}

                        <div className="flex items-center gap-2 mt-3">
                          {provider.phone && (
                            <a
                              href={`tel:${provider.phone}`}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              Call
                            </a>
                          )}
                          {waNumber && (
                            <a
                              href={`https://wa.me/${waNumber}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-xs font-medium text-white transition-colors"
                            >
                              WhatsApp
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Gallery + Before you go */}
        {((galleryImages && galleryImages.length > 0) ||
          (beforeYouGoItems && beforeYouGoItems.length > 0)) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-14">
            {galleryImages && galleryImages.length > 0 && (
              <div className="lg:col-span-2 grid grid-cols-3 gap-3">
                {galleryImages.slice(0, 3).map((img, i) =>
                  typeof img === 'object' && img ? (
                    <div key={img.id || i} className="relative aspect-square rounded-xl overflow-hidden">
                      <Media resource={img} fill imgClassName="object-cover" />
                    </div>
                  ) : null,
                )}
              </div>
            )}

            {beforeYouGoItems && beforeYouGoItems.length > 0 && (
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6">
                {beforeYouGoTitle && (
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{beforeYouGoTitle}</h3>
                )}
                <ul className="space-y-3">
                  {beforeYouGoItems.map((item, i) => {
                    const Icon = beforeYouGoIcons[item.icon || 'info'] || Info
                    return (
                      <li key={item.id || i} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <Icon className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                        <span>{item.label}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Location */}
        {(locationDescription || mapImage) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14 rounded-2xl bg-gray-50 border border-gray-100 p-6 md:p-8">
            <div>
              {locationTitle && (
                <h3 className="text-lg font-bold text-gray-900 mb-3">{locationTitle}</h3>
              )}
              {locationDescription && (
                <p className="text-sm text-gray-600 leading-relaxed mb-2">{locationDescription}</p>
              )}
              {locationNote && <p className="text-xs text-gray-400 mb-5">{locationNote}</p>}
              {mapLink && (
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-emerald-700 text-emerald-700 text-sm font-medium hover:bg-emerald-50 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  View on map
                </a>
              )}
            </div>
            <div className="relative aspect-[16/9] lg:aspect-auto rounded-xl overflow-hidden bg-gray-200">
              {mapImage && typeof mapImage === 'object' && (
                <Media resource={mapImage} fill imgClassName="object-cover" />
              )}
            </div>
          </div>
        )}

        {/* Related activities */}
        {relatedActivities && relatedActivities.length > 0 && (
          <div className="mt-16">
            {relatedTitle && (
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{relatedTitle}</h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedActivities.map((rel, i) => {
                if (typeof rel !== 'object' || !rel) return null
                const relImage = rel.heroImage
                const relIsland = typeof rel.island === 'object' && rel.island ? rel.island.name : undefined
                const relLocation = rel.locationLabel || relIsland

                return (
                  <a
                    key={rel.id || i}
                    href={`/${locale}/things-to-do/${rel.slug}`}
                    className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-40">
                      {relImage && typeof relImage === 'object' && (
                        <Media resource={relImage} fill imgClassName="object-cover" />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900">{rel.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {[relLocation, rel.priceRange].filter(Boolean).join(' · ')}
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 mt-3 group-hover:gap-2 transition-all">
                        View activity <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
